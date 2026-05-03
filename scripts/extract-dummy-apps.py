#!/usr/bin/env python3
"""Walk rippling-main's apps/utils/dummy_apps.py — these are synthetic L2
entries the backend injects into the sidebar (Spend's Tasks/Cards/Bills,
HR's People, IT Overview, etc.). Extract via AST so we don't need to
import from rippling-main.

Outputs data/research/source-of-truth/dummy-apps-by-suite.json.
"""
import ast
import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
RIPPLING_MAIN = Path.home() / 'dev/code/rippling-main'
DUMMY_APPS = RIPPLING_MAIN / 'app/apps/utils/dummy_apps.py'
OUT = ROOT / 'data/research/source-of-truth'

if not DUMMY_APPS.exists():
    print(f"Missing {DUMMY_APPS}", file=sys.stderr)
    sys.exit(1)

OUT.mkdir(parents=True, exist_ok=True)

SUBCAT_TO_SUITE = {
    'navigation_bar_subcategory.hr_management': 'hr',
    'navigation_bar_subcategory.talent': 'talent',
    'navigation_bar_subcategory.payroll': 'payroll',
    'navigation_bar_subcategory.finance': 'spend',
    'navigation_bar_subcategory.spend': 'spend',
    'navigation_bar_subcategory.spend_management': 'spend',
    'navigation_bar_subcategory.time_management': 'time',
    'navigation_bar_subcategory.insurance_benefits': 'benefits',
    'navigation_bar_subcategory.it_management': 'it',
    'navigation_bar_subcategory.identity_management': 'identity',
    'navigation_bar_subcategory.banking': 'banking',
    'navigation_bar_subcategory.global': 'global',
    'navigation_bar_subcategory.peo': 'peo',
    'navigation_bar_subcategory.custom_apps': 'custom-apps',
    'navigation_bar_subcategory.tools': 'tools',
    'navigation_bar_subcategory.partner': 'partner',
    'navigation_bar_subcategory.settings': 'settings',
    'navigation_bar_subcategory.data': 'data',
}

# Heuristic: dummy_apps.py defines synthetic L2 entries but doesn't tag them
# with `navigation_categories`. The variable name almost always reveals the
# suite it belongs to, so we use a name-prefix mapping. Manually verified
# against rippling-main/app/apps/utils/dummy_apps.py.
VARNAME_PREFIX_TO_SUITE = [
    ('TIME_PRODUCTS_DUMMY_APP', 'time'),
    ('SPEND_FINANCE_OVERVIEW', 'spend'),
    ('SPEND_MY_FINANCES', 'spend'),
    ('SPEND_TASKS', 'spend'),
    ('SPEND_CARDS', 'spend'),
    ('SPEND_REIMBURSEMENTS', 'spend'),
    ('SPEND_EXPENSE_REPORTS', 'spend'),
    ('SPEND_TRANSACTIONS', 'spend'),
    ('SPEND_BILL_PAY', 'spend'),
    ('SPEND_PROCUREMENT', 'spend'),
    ('SPEND_ACCOUNTING', 'spend'),
    ('SPEND_VENDORS', 'spend'),
    ('SPEND_PEOPLE', 'spend'),
    ('SPEND_POLICIES', 'spend'),
    ('SPEND_SETTINGS', 'spend'),
    ('SPEND_CARD_STATEMENTS', 'spend'),
    ('SPEND_TRAVEL', 'spend'),
    ('SPEND_DUMMY_APPS', 'spend'),
    ('TALENT_OVERVIEW', 'talent'),
    ('IT_OVERVIEW', 'it'),
    ('IT_MANAGEMENT', 'it'),
    ('IT_APPROVALS', 'it'),
    ('DEVICE_STORE', 'it'),
    ('MY_IT', 'it'),
    ('I9_EVERIFY', 'hr'),
    ('COMPLIANCE_DASHBOARD', 'hr'),
    ('COMPENSATION_MANAGEMENT', 'talent'),  # comp bands lives in Talent in live
    ('PEOPLE_FAKE_APP', 'hr'),
    ('PERSONAL_DUMMY_APPS', 'hr'),  # ee-side personal items
    ('PERMISSIONS', 'settings'),
    ('MY_PAY', 'payroll'),
    ('HR_PRODUCTS_OVERVIEW', 'hr'),
    ('ACCESS_REVIEW', 'it'),
]

def varname_to_suite(varname):
    for prefix, suite in VARNAME_PREFIX_TO_SUITE:
        if varname.startswith(prefix):
            return suite
    return None

src = DUMMY_APPS.read_text()
tree = ast.parse(src)

# Walk the module looking for module-level Final[DummyAppDict] / list[DummyAppDict]
# assignments containing dict/list-of-dict literals.

def literal_eval_dict(node):
    """Try ast.literal_eval — returns None if it has non-literal expressions."""
    try:
        return ast.literal_eval(node)
    except Exception:
        return None

def extract_dict_kvs(node):
    """For dicts where values aren't all literals, pull out the keys we care
    about by name (string keys → string values) when possible."""
    if not isinstance(node, ast.Dict):
        return None
    out = {}
    for k, v in zip(node.keys, node.values):
        if not isinstance(k, ast.Constant) or not isinstance(k.value, str):
            continue
        key = k.value
        if isinstance(v, ast.Constant):
            out[key] = v.value
        elif isinstance(v, ast.List):
            items = []
            for elt in v.elts:
                if isinstance(elt, ast.Constant):
                    items.append(elt.value)
                else:
                    # Skip non-literal entries (e.g. enum lookups)
                    pass
            out[key] = items
        elif isinstance(v, ast.Subscript):
            # e.g. TIME_PRODUCTS_DUMMY_APP_IDS[CoreFeatureKeys.NAV_OVERVIEW]
            # Render approximately as the variable + key path
            try:
                base = v.value.id if isinstance(v.value, ast.Name) else 'expr'
                idx = ast.unparse(v.slice) if hasattr(ast, 'unparse') else '?'
                out[key] = f'<{base}[{idx}]>'
            except Exception:
                out[key] = '<expr>'
        elif isinstance(v, ast.Attribute):
            out[key] = ast.unparse(v) if hasattr(ast, 'unparse') else '<attr>'
        else:
            try:
                out[key] = ast.unparse(v) if hasattr(ast, 'unparse') else '<expr>'
            except Exception:
                out[key] = '<expr>'
    return out

dummy_apps = []  # list of (varname, dict-or-list-of-dicts)

for node in tree.body:
    if not isinstance(node, ast.AnnAssign):
        continue
    if not isinstance(node.target, ast.Name):
        continue
    name = node.target.id
    val = node.value
    if val is None:
        continue
    # Single dict
    if isinstance(val, ast.Dict):
        d = extract_dict_kvs(val)
        if d:
            dummy_apps.append((name, [d]))
    # List of dicts
    elif isinstance(val, ast.List):
        ds = []
        for elt in val.elts:
            d = extract_dict_kvs(elt) if isinstance(elt, ast.Dict) else None
            if d:
                ds.append(d)
        if ds:
            dummy_apps.append((name, ds))

# Group by suite — first try declared navigation_categories, then varname heuristic
by_suite = {}
unmapped_subcats = set()
unmapped_varnames = set()

for varname, entries in dummy_apps:
    for d in entries:
        cats = d.get('navigation_categories') or []
        suites_for_entry = []
        if cats:
            for c in cats:
                suite = SUBCAT_TO_SUITE.get(c)
                if suite:
                    suites_for_entry.append(suite)
                else:
                    unmapped_subcats.add(c)
        if not suites_for_entry:
            suite = varname_to_suite(varname)
            if suite:
                suites_for_entry.append(suite)
            else:
                unmapped_varnames.add(varname)
                continue
        for suite in suites_for_entry:
            entry = {
                'varname': varname,
                'id': d.get('id'),
                'name': d.get('name'),
                'displayName': d.get('_displayName') or d.get('display_name') or d.get('name'),
                'path': d.get('dashboard_url') or d.get('actionUrl') or d.get('primary_url'),
                'navigationSortPriority': d.get('navigationSortPriority', 0),
                'invisible': d.get('invisible', False),
            }
            by_suite.setdefault(suite, []).append(entry)

for suite in by_suite:
    by_suite[suite].sort(key=lambda e: (
        e['navigationSortPriority'] if isinstance(e['navigationSortPriority'], (int, float)) else 0
    ))

(OUT / 'dummy-apps-by-suite.json').write_text(json.dumps(by_suite, indent=2) + '\n')

print(f"Extracted {sum(len(v) for v in by_suite.values())} dummy app entries from {DUMMY_APPS.relative_to(RIPPLING_MAIN.parent)}")
print()
print("Per-suite counts:")
for suite in sorted(by_suite):
    print(f"  {suite:14} {len(by_suite[suite])} apps")
if unmapped_subcats:
    print()
    print("Unmapped subcategories:")
    for c in sorted(unmapped_subcats):
        print(f"  - {c}")
if unmapped_varnames:
    print()
    print("Unmapped variable names (no matching prefix in VARNAME_PREFIX_TO_SUITE):")
    for v in sorted(unmapped_varnames):
        print(f"  - {v}")
