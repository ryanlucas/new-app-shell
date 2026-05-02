# Rippling PEO  `peo`

**Suite visibility:** Full, Partial(peo_admin), EE  
**Product gate:** —  
**Cross-sell:** locked → full, partial · SidenavRipplingPEO  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:128-135`

## Apps (3)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| PEO | `/peo` | Full, Partial(peo_admin) | — | — | locked → full, partial · SidenavRipplingPEO | — | — | `app/cross_sell/unpurchased_sku/unpurchased_sku_nav_items.py:234` |
| Workplace Posters | `/peo/workplace-posters` | Full, Partial(peo_admin) | — | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:443` |
| State Tax Accounts | `/peo/state-tax-accounts` | Full, Partial(peo_admin) | — | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:451` |

## App L3 internal navigation

### PEO  `peo-overview`

3 nodes · path `/peo` · gate `—`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| PEO Notices | `/peo/notices` | Full, Partial(peo) | — | isPeoClient | — | — | — | `rippling-webapp/app/products/hr/Peo/routes/peo.routes.tsx:199` |
| Workers Comp | `/peo/workers-comp/dashboard/overview` | Full, Partial(peo) | — | isPeoClient | — | — | — | `rippling-webapp/app/products/hr/Peo/routes/peo.routes.tsx:279` |
| Class Codes | `/peo/workers-comp/dashboard/class-codes` | Full, Partial(peo) | — | isPeoClient | — | — | — | `rippling-webapp/app/products/hr/Peo/routes/peo.routes.tsx:293` |

### Workplace Posters  `workplace-posters`

1 nodes · path `/peo/workplace-posters` · gate `—`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Workplace Posters | `/documents/workplace-posters` | Full, Partial(documents, peo) | — | perm: admin.hasAdminPrivileges; isPeoClient \|\| isAsoClient | — | — | — | `rippling-webapp/app/products/hr/Hub/containers/workplacePosters/WorkplacePosters.tsx:17` |

### State Tax Accounts  `state-tax-accounts`

1 nodes · path `/peo/state-tax-accounts` · gate `—`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| State Tax Accounts | `/compliance/tax-accounts` | Full, Partial(compliance, peo) | — | perm: compliance_admin; clientType (PEO or ASO) is set | — | — | — | `rippling-webapp/app/products/hr/Peo/components/stateTaxAccounts/StateTaxAccounts.tsx:14` |

