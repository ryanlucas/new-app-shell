# Cross-sell modeling

Notes on how Rippling surfaces unpurchased products in the nav, and how the catalog should represent them. Not yet implemented — captured here so future work has a starting point.

## The three granularities

Cross-sell in the live product happens at three different levels:

| Level | Trigger | Example |
|---|---|---|
| **App** | Customer owns the suite but not this app | Locked Headcount Planning row inside Talent |
| **Suite** | Customer doesn't own anything in the suite | Locked Spend suite tile in the sidebar |
| **Bundle** | Marketing umbrella spanning multiple SKUs | "Global Workforce" tile = Global Payroll + EOR + Contractor Hub |

The first two are already modeled in the catalog via `whenUnowned` on individual NavNode visibility:

```jsonc
"visibility": {
  "personas": ["full", "partial"],
  "productGate": "GLOBAL_PAYROLL",
  "whenUnowned": {
    "showLockedTo": ["full", "partial"],
    "campaign": "SidenavGlobal"
  }
}
```

When the customer doesn't own `GLOBAL_PAYROLL`, the same tile renders locked, in the same spot, with the same label. The renderer just changes the styling (lock icon, dimmed text, click → cross-sell flow).

The third — **bundles** — is not modeled today, and that's the gap.

## What bundles look like in the live product

Bundles are *marketing* concepts that don't 1:1 map to a single spoke. Live source uses them in two places:

- `app/cross_sell/cross_sell_tasks.py:94` defines bundle → product mappings:
  ```python
  "Global Workforce": ["Global Payroll", "EOR"]
  ```
- `app/cross_sell/unpurchased_sku/unpurchased_sku_nav_items.py` defines tiles like `GLOBAL_WORKFORCE_MANAGEMENT_UNPURCHASED_SKUS_DUMMY_APP` that render in their own subcategory bucket. They have a marketing label ("Global Workforce" with a 🌎 emoji), an icon, and route to a preview page (`/preview/payroll/global/1`). They appear *only when none of the bundled spokes is owned*.

Once the customer purchases any spoke in the bundle, the cross-sell tile disappears and the actual owned product entries surface in their normal homes (Global Payroll under the Payroll suite, EOR under HR, etc.).

## The catalog's current mistake

`data/current/suites.json` had a `global` suite with one app, `global-workforce`, gated by `GLOBAL_PAYROLL`. That entry was modeling the **cross-sell tile as if it were a real product surface**:

- The suite had `whenUnowned` set, suggesting it should appear locked when not owned
- But the actual product (Global Payroll) lives in the Payroll suite, not under "Global"
- "Global Workforce" is marketing copy, not a product node
- The `global-workforce` entry's path `/global-payroll` literally aliases the real Global Payroll product

Result: catalog had a fake suite that represented a marketing umbrella. Removed in commit. The real Global Payroll entry stays in the Payroll suite.

## Proposed model: bundles as a first-class concept

Bundles parallel `Plan` — they're a curated set of spokes:

- **Plan** = "bundle of spokes the company has bought" → drives `ownedSuites`, `plan.conditions`, what renders
- **Bundle** = "bundle of spokes available for purchase" → drives cross-sell tile rendering

Sketch of `data/current/bundles.json` (not yet created):

```jsonc
{
  "bundles": [
    {
      "id": "global-workforce",
      "label": "Global Workforce",
      "tagline": "Hire, pay, and manage international employees and contractors",
      "icon": "Globe",
      "spokes": ["GLOBAL_PAYROLL", "EOR", "GLOBAL_CONTRACTOR"],
      "previewUrl": "/preview/payroll/global/1",
      "campaign": "SidenavGlobal",
      "showInSection": "discover"
    },
    {
      "id": "spend-platform",
      "label": "Spend Management",
      "tagline": "Cards, bills, expenses, procurement — one platform",
      "icon": "Wallet",
      "spokes": ["SPENDMANAGEMENT", "CORPORATE_CARDS", "BILL_PAY", "PROCUREMENT", "EXPENSES"],
      "previewUrl": "/preview/spend",
      "campaign": "SidenavSpend"
    }
  ]
}
```

Renderer rule: a bundle tile renders only when **none** of its `spokes` is owned (or, less strictly, when the dominant spoke isn't). Disappears the instant the customer buys any of the bundled SKUs.

`showInSection` lets a bundle target a specific UX surface — a dedicated "Discover" section in the sidebar, or embedded under a relevant suite. The IA decision is orthogonal to the bundle definition itself.

## How this would interact with the resolver

A bundle tile would be its own kind of NavNode (e.g., `kind: "cross-sell"`) — distinct from `product` and `capability`. Its visibility rule is:

> Visible iff **none** of `bundle.spokes` is in `ctx.ownedSpokes` (or, fallback, none of the corresponding suites is in `ctx.ownedSuites`).

It does *not* have a `productGate` — gating by product would be the wrong direction. It has a `bundles` set, and visibility is the *negation* of ownership.

The existing `whenUnowned` mechanism stays for app- and suite-level cross-sell. Bundles are an additional tier, not a replacement.

## Why this is worth doing eventually

- The catalog becomes a vehicle for evaluating **GTM IA**, not just product IA. Want to test "Total Compensation" as a marketing umbrella for Comp Bands + Variable Comp + Pay Rates? Add a bundle.
- Different bundles can target different sections (Discover, embedded, top-bar promo) — IA experimentation without touching product structure.
- Models live behavior accurately. The catalog stops conflating cross-sell tiles with product surfaces.

## Why it's not done yet

Cross-sell IA isn't the current focus of the prototype. Owned-product nav exploration is. Bundles can wait until cross-sell becomes a question we want to evaluate.

When that happens, the work is:

1. Add `bundles.json` parallel to `plans.json`
2. Add `kind: "cross-sell"` extension to `NavNode` (or a separate `BundleTile` interface in `types.ts`)
3. Update `compose.ts` to handle bundle ops in proposals (`addBundle`, `removeBundle`, `overrideBundle`)
4. Update the renderer (Sidebar / EverythingBar) to surface bundle tiles based on `showInSection`
5. Add bundle-aware visibility resolution
