# Source-of-truth extraction

Static extractor that walks `~/dev/code/rippling-main` and `~/dev/code/rippling-webapp`
to build a comparison catalog and diff against `data/current/suites.json`.
Re-run any time:

```sh
python3 scripts/extract-dummy-apps.py     # parse Python AST → dummy-apps-by-suite.json
node scripts/extract-source-of-truth.ts   # walk JSONs + merge dummy + FE overlays → diff
```

The TS script merges:
1. `app/apps/data/apps/internal/*.json` — backend app definitions
2. `dummy-apps-by-suite.json` — synthetic L2 entries from `dummy_apps.py`
3. `fe-overlays.json` — frontend overlay nav entries (one-shot agent extraction)

## What it covers

- **Internal app definitions** — `app/apps/data/apps/internal/*.json` (200
  files, ~82 with `navigation_categories`). These are the canonical app
  metadata: `id`, `_displayName`, `dashboard_url`, `navigation_categories`,
  `navigationSortPriority`, `invisible`.
- **Dummy/synthetic apps** — `app/apps/utils/dummy_apps.py`. Synthetic L2
  entries (Spend's Tasks/Cards/Bills, HR's People, IT Overview, Time's
  Overview/My Time/Schedules/etc.) defined as Python dicts. Extracted via
  `ast` since they're statically declared.
- **FE overlay entries** — `rippling-webapp/app/products/**/*navbar*` and
  `*standaloneNavigation*` files. ~50 entries covering Benefits admin
  sections (Overview, Enrollments, Integrations, Deductions, Settings),
  Global Payroll's full L2 (22 entries), Global Contractors standalone
  surfaces. i18n keys resolved to en-US strings via the agent extraction.

## What it still doesn't cover

1. **Pension Management** — uses dynamic hooks; static extraction was
   inconclusive. ~3-5 entries likely missing.
2. **Enum-keyed dict accesses** — some `dummy_apps.py` entries use
   `TIME_PRODUCTS_DUMMY_APP_IDS[CoreFeatureKeys.NAV_OVERVIEW]` style
   lookups. We render those as `<TIME_PRODUCTS_DUMMY_APP_IDS[...]>` placeholders.
3. **Dynamic injectors** — `app/apps/utils/navigation_bar.py` has functions
   like `add_my_benefits_if_needed_to_apps_and_installed_status` that
   conditionally surface L2 entries based on company state. Not statically
   extractable.
4. **ID normalization** — our catalog uses kebab-case lowercase IDs; source
   uses uppercase or camelCase. The diff shows many "only-in-ours" /
   "only-in-truth" pairs that are actually the same entry under different IDs.
5. **`invisible: true` semantics** — that flag in source app definitions is
   not a uniform "hide from sidebar" signal. Many apps marked invisible
   (Goals, Feedback, Travel, Procurement) appear in the live sidebar via
   `dummy_apps.py` injection or category-based routing. Use the flag as a
   hint, not a directive — verify per app before propagating into the
   catalog as `hiddenInSidenav`.

## How to read the diff

`diff-vs-current.json` has three buckets per suite:

- **`onlyInTruth`** — apps in source not in our catalog. These are likely
  legitimately missing from our catalog and should be added.
- **`onlyInOurs`** — apps in our catalog not in source. Either: (a) they
  come from a frontend overlay we don't extract, (b) they're phantom
  Phase 1B fabrications, or (c) ID normalization mismatch.
- **`mismatches`** — apps with same ID but different label/path/suite.
  Almost always real problems worth fixing.

## Files

- `apps-by-suite.json` — extracted source-of-truth catalog
- `dummy-apps-by-suite.json` — dummy_apps.py extraction (run python script first)
- `diff-vs-current.json` — diff report

## Future work

- FE-overlay extractor: walk rippling-webapp `*standaloneNavigation*`,
  `*admin-nav-bar*`, `*navbar*` files and parse their L2 contributions.
- ID normalization layer: build a fuzzy match between source IDs and
  catalog IDs to reduce false-positive "missing" entries.
- i18n trace integration: resolve `_displayName` placeholders through
  `getFixedT(...)` calls back to `translations/locales/en-US/*.json`.
