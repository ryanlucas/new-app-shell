# Data model

This directory is a **reference catalog** of Rippling's navigation: today's nav under `current/`, proposed IA changes under `proposals/`. The prototype shell renders it so we can evaluate IA candidates against the persona × plan matrix — but production migrations happen against the live `rippling-main` / `rippling-webapp` code, not this repo.

Treat the catalog as a spec, not a deliverable. If you're implementing one of the proposals in production, the *composed* output of `current + proposal` describes the target end-state nav — not this prototype.

## Layout

```
data/
├── current/                  # Today's Rippling, as we model it
│   ├── frame.json            # Top bar, sidebar 1st/3rd sections, user menu, app launcher
│   ├── suites.json           # 16 suites + their L2 apps (the meaty bit)
│   ├── apps/                 # L3 nav per first-class app, grouped by suite
│   │   └── <suite-id>/<app-id>.json
│   ├── personas.json         # 4 personas (full/partial/manager/ee) + scope catalog
│   ├── plans.json            # 5 plans → ownedSuites (Full Suite, HRIS-only, etc.)
│   └── spokes.json           # 160 SKU/spoke handles for productGate references
└── proposals/                # Proposed IA changes as op-list overlays
    └── <proposal-id>.json
```

The shell's MSW handler (`src/mocks/handlers.ts`) reads `current` directly when `view=current`, or composes a proposal on top of `current` when `view=<proposal-id>` (composer at `src/lib/compose.ts`).

## Core shape: NavNode

Everything navigable — suite, app, sidebar item, top-bar widget, user-menu entry — is a `NavNode`. See `src/lib/types.ts` for the canonical TypeScript definition. Minimum required fields:

```jsonc
{
  "id": "people",                  // stable identifier
  "label": "People",                // user-visible string
  "icon": "Users",                  // Phosphor icon name
  "path": "/employee-list",         // route (or null for grouping nodes)
  "parent": "hr",                   // suite id (null on suite roots)
  "visibility": {                   // gating; all sub-fields optional
    "personas": ["full", "partial", "manager", "ee"]
  }
}
```

Empty/null fields are omitted. Don't write `"scopeForPartial": []` or `"whenUnowned": null` — the resolver treats absence as the default.

### Suite-only fields

```jsonc
{
  "id": "hr",
  "label": "HR",
  "group": "people",                              // editorial bucket; see suites.json `groups`
  "description": "People, org, compliance, documents",
  "apps": [ /* NavNode[] */ ]
}
```

### Capability nodes

For horizontal capabilities (Documents, Approvals, Audit Log) consumed across multiple suites:

```jsonc
{
  "id": "documents",
  "kind": "capability",
  "parent": "hr",                  // primary suite
  "appearsIn": ["spend", "settings"]  // also surfaces in these
}
```

The renderer cross-lists capability nodes into each `appearsIn` suite with a "linked from HR" annotation.

### Hidden-in-sidenav nodes

Some apps have real routes but the live sidebar doesn't include them by default (e.g., `/developer`). The catalog still tracks them so palette / search / deep-link all work:

```jsonc
{
  "id": "developer",
  "label": "Rippling Build",
  "path": "/developer",
  "hiddenInSidenav": true            // skip in default sidebar listing
}
```

## Visibility resolution

`src/lib/visibility.ts` exports `resolve(node, ctx)` returning `'visible' | 'locked' | 'hidden'`. The context has the active personas, partial-admin scopes, owned suites, and condition flags from HUD state. Resolution is the conjunction of three independent gates:

1. **Persona match** — `node.visibility.personas` overlaps `ctx.personas`.
2. **Product gate** — `node.visibility.productGate` is in `ctx.ownedSpokes`, OR (when spoke data isn't available) the node's parent suite is in `ctx.ownedSuites`.
3. **Conditions** — every flag in `node.visibility.conditions` is satisfied by `ctx.conditions` (supports `!flag` negation, `&&` and `||`).

If product gate fails but the persona is in `whenUnowned.showLockedTo`, returns `'locked'` (cross-sell). Otherwise `'hidden'`.

## Plans

```jsonc
{
  "id": "hris-only",
  "label": "HRIS only",
  "ownedSuites": ["hr", "custom-apps", "data", "settings"],
  "conditions": ["isStandaloneCompany"]   // implied flags when this plan is active
}
```

Plans are orthogonal to personas. The HUD lets you toggle any (persona × plan) combination.

## Proposals

A proposal is an ordered list of operations applied on top of `current`:

```jsonc
{
  "id": "ryan-v1",
  "label": "...",
  "ops": [
    { "op": "renameSuite", "id": "spend", "newId": "finance", "newLabel": "Finance" },
    { "op": "mergeSuite", "from": "banking", "into": "finance" },
    { "op": "moveApp", "appId": "pto", "toSuite": "time" },
    ...
  ]
}
```

Op types are documented in `src/lib/types.ts` (`Op` union). The composer is pure — same input → same output, no side effects, no state. Useful for testing IA migrations without rewriting `current`.

## Reading the catalog as a production spec

If you've been asked to implement one of these proposals in production:

1. **Compose the proposal locally first.** Open the prototype and switch the HUD's "view" dropdown from `current` to your proposal id. The shell now renders the proposed end-state. Walk the persona × plan matrix to confirm visibility/cross-sell behavior matches intent.
2. **Read the composed `suites.json` for the proposal as your target.** Run `node scripts/inspect-proposal.ts <proposal-id>` to dump the composed catalog. That is the spec — every L2 entry, its parent suite, productGate, persona array — describes what production should render.
3. **Op list = migration plan.** A proposal's `ops` array (in `data/proposals/<id>.json`) is the ordered set of structural changes from today's IA to the proposed IA. Each op corresponds roughly to a real engineering task: `renameSuite` → relabel + reroute, `mergeSuite` → consolidate two sidenav categories, `moveApp` → move a spoke into a new subcategory, etc. Use it as a checklist.
4. **Source breadcrumbs.** Every node has a `source` field pointing to the rippling-main / rippling-webapp file it was derived from. Useful when locating the live code that needs to change.
5. **`research/` directory** has the reconciliation work — Phase 1.7 per-suite drift analysis, source-of-truth diff outputs against rippling-main JSONs, FE-overlay extractions. Helpful context if you're sanity-checking the catalog against the live code.

The catalog itself doesn't need to be migrated — it's a spec. Updates to `data/current/` happen when Rippling's live nav changes; updates to `data/proposals/` happen when we want to evaluate a new IA candidate.

## Catalog hygiene

- All app IDs are kebab-case lowercase. Suite IDs same.
- Field order in JSON is approximately: `id`, `label`, `icon`, `path`, `parent`, `visibility`, then optional fields. Not enforced; `JSON.stringify(obj, null, 2)` is fine.
- `_meta` blocks are sparingly used and only when load-bearing. Stale Phase-1B notes have been stripped.
- Research artifacts (Phase 1.7 reconciliation notes, source-of-truth diff outputs) live in `research/`, not here. Run `node scripts/extract-source-of-truth.ts` and `python3 scripts/extract-dummy-apps.py` to regenerate.
