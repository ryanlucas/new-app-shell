# Partner  `partner`

**Suite visibility:** Full, Partial(partner_admin)  
**Product gate:** `PARTNER`  
**Cross-sell:** locked → — · SidenavPartner  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:119-127`

## Apps (2)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Partner Admin | `/partner` | Full, Partial(partner_admin) | `PARTNER` | — | locked → — | — | — | `app/hub/spoke_models.py:821` |
| Business Partner | `/business-partner` | Full, Partial(partner_admin) | `BUSINESS_PARTNER` | — | locked → — | — | — | `app/hub/spoke_models.py:739` |

## App L3 internal navigation

### Partner Admin  `partner-admin`

13 nodes · path `/partner` · gate `PARTNER`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Clients | `/partner/clients` | Full | `PARTNER` | partner_company.usecase_config.allowed_links includes DASHBOARD | — | — | — | `rippling-webapp/app/products/hr/Accountant/constants/sidebar.constants.ts:87` |
| Tasks | `/partner/tasks` | Full | `PARTNER` | allowed_links includes TASKS | — | — | — | `rippling-webapp/app/products/hr/Accountant/constants/sidebar.constants.ts:150` |
| Events | `/partner/events` | Full | `PARTNER` | allowed_links includes EVENTS | — | — | — | `rippling-webapp/app/products/hr/Accountant/constants/sidebar.constants.ts:164` |
| Documents | `/partner/documents` | Full | `PARTNER` | allowed_links includes DOCUMENTS | — | — | — | `rippling-webapp/app/products/hr/Accountant/constants/sidebar.constants.ts:206` |
| Reports | `/partner/reports/dashboard` | Full | `PARTNER` | allowed_links includes REPORTS | — | — | — | `rippling-webapp/app/products/hr/Accountant/constants/sidebar.constants.ts:199` |
| Workflows | `/partner/custom-workflows/dashboard/legacy/overview` | Full | `PARTNER` | allowed_links includes WORKFLOWS | — | — | — | `rippling-webapp/app/products/hr/Accountant/constants/sidebar.constants.ts:213` |
| Audits | `/partner/audits` | Full | `PARTNER` | allowed_links includes AUDITS | — | — | — | `rippling-webapp/app/products/hr/Accountant/constants/sidebar.constants.ts:143` |
| Insurance | `/partner/insurance` | Full | `PARTNER` | allowed_links includes INSURANCE | — | — | — | `rippling-webapp/app/products/hr/Accountant/constants/sidebar.constants.ts:192` |
| Billing | `/partner/billing` | Full | `PARTNER` | allowed_links includes BILLING | — | — | — | `rippling-webapp/app/products/hr/Accountant/constants/sidebar.constants.ts:228` |
| Revenue share | `/partner/revshare` | Full | `PARTNER` | allowed_links includes REV_SHARE | — | — | — | `rippling-webapp/app/products/hr/Accountant/constants/sidebar.constants.ts:221` |
| Referrals | `/partner/referrals` | Full | `PARTNER` | allowed_links includes PARTNER_REFERRALS | — | — | — | `rippling-webapp/app/products/hr/Accountant/constants/sidebar.constants.ts:235` |
| Recipes | `/partner/partner-recipes` | Full | `PARTNER` | allowed_links includes PARTNER_RECIPES | — | — | — | `rippling-webapp/app/products/hr/Accountant/constants/sidebar.constants.ts:242` |
| Settings | `/partner/settings` | Full | `PARTNER` | allowed_links includes SETTINGS | — | — | — | `rippling-webapp/app/products/hr/Accountant/constants/sidebar.constants.ts:263` |

### Business Partner  `business-partner`

_No internal nav._ Business Partner is a single-page admin surface mounted at /company-details/business-partner (BUSINESS_PARTNER_DUMMY_APP_ID is hidden via lambda _: False; the dummy app's actionUrl is rewritten to /company-details/business-partner). The page lists Business Partner Groups and drills down into per-group detail pages — no internal top-level nav.

