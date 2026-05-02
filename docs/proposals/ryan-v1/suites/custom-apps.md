# Custom Apps  `custom-apps`

**Suite visibility:** Full, Partial(apps_admin)  
**Product gate:** —  
**Cross-sell:** locked → full, partial · SidenavCustomApps  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:195-204`

## Apps (7)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Rippling Build | `/build` | Full, Partial(apps_admin) | `RIPPLING_BUILD` | — | locked → full, partial · SidenavCustomApps | — | — | `app/hub/spoke_models.py:850` |
| Solutions | `/solutions` | Full, Partial(apps_admin) | `RIPPLING_SOLUTION` | — | locked → — | — | — | `app/hub/spoke_models.py:851` |
| Custom Apps | `/custom-apps` | Full, Partial(apps_admin) | `UNLIMITED_CUSTOM_APPS` | — | locked → — | — | — | `app/hub/spoke_models.py:847` |
| Custom Objects | `/custom-objects` | Full, Partial(apps_admin) | `UNLIMITED_CUSTOM_OBJECTS` | — | locked → — | — | — | `app/hub/spoke_models.py:848` |
| Recipes | `/recipes` | Full, Partial(apps_admin) | `RECIPES` | — | locked → — | — | — | `app/hub/spoke_models.py:800` |
| Forms | `/forms` | Full, Partial(apps_admin), EE | `FORMS` | — | locked → — | — | — | `app/hub/spoke_models.py:759` |
| Checklists | `/checklists` | Full, Partial(apps_admin), Mgr, EE | `CHECKLISTAPP` | — | locked → — | — | — | `app/hub/spoke_models.py:710` |

## App L3 internal navigation

### Rippling Build  `rippling-build`

5 nodes · path `/build` · gate `RIPPLING_BUILD`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Functions | `/developer/functions` | — | — | — | — | — | — | `rippling-webapp/app/products/platform/Developer/modules/functions/routes/navbar.routes.tsx:9-39` |
| Packages | `/developer/packages` | — | — | — | — | — | — | `rippling-webapp/app/products/platform/Developer/modules/packages/constants/routes.ts:1` |
| Webhooks | `/developer/webhooks` | — | — | — | — | — | — | `rippling-webapp/app/products/platform/Developer/modules/webhooks/constants/routes.ts` |
| API Tokens | `/developer/api-tokens` | — | — | — | — | — | — | `rippling-webapp/app/products/it/Apps/modules/ApiTokens/APItokens.constants.ts` |
| Settings Manager | `/developer/settings` | — | — | — | — | — | — | `rippling-webapp/app/products/platform/Developer/modules/settingsManager/constants/routes.ts` |

### Solutions  `rippling-solution`

_No internal nav._ RIPPLING_SOLUTION is a SKU/spoke prefix (RIPPLING_SOLUTION_SPOKE_PREFIX in finance/Billing) used to identify partner-built apps; it is not a standalone webapp surface with its own routes.

### Custom Apps  `unlimited-custom-apps`

5 nodes · path `/custom-apps` · gate `UNLIMITED_CUSTOM_APPS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| All Apps | `/app-studio/dashboard/all-apps` | — | — | — | — | — | — | `rippling-webapp/app/products/platform/AppManager/routes/dashboard.routes.tsx:14-39` |
| App Templates | `/app-studio/app-templates` | — | — | — | — | — | — | `rippling-webapp/app/products/platform/AppManager/routes/appManager.routes.tsx:37-45` |
| Create App | `/app-studio/create-app` | — | — | — | — | — | — | `rippling-webapp/app/products/platform/AppManager/routes/appManager.routes.tsx:46-55` |
| Quick App | `/app-studio/create-quick-app` | — | — | — | — | — | — | `rippling-webapp/app/products/platform/AppManager/routes/appManager.routes.tsx:27-35` |
| Composition Manager | `/app-studio/composition-manager` | — | — | — | — | — | — | `rippling-webapp/app/products/platform/AppManager/routes/dashboard.routes.tsx:38` |

### Custom Objects  `custom-objects`

4 nodes · path `/custom-objects` · gate `UNLIMITED_CUSTOM_OBJECTS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Objects | `/data-manager/objects` | Full, Partial(custom-objects) | `UNLIMITED_CUSTOM_OBJECTS` | — | — | — | — | `app/products/platform/HubPlatform/modules/CustomObjects/containers/objectManagerDashboard/ObjectManagerDashboard.tsx:46` |
| Permissions | `/data-manager/data-permissions` | Full, Partial(custom-objects) | `UNLIMITED_CUSTOM_OBJECTS` | perm: isPermissionsTabAccessible; canSeePermissionsTab | — | — | — | `app/products/platform/HubPlatform/modules/CustomObjects/containers/objectManagerDashboard/ObjectManagerDashboard.tsx:52` |
| External Connections | `/data-manager/external-connections` | Full, Partial(custom-objects) | `UNLIMITED_CUSTOM_OBJECTS` | FF:DATA_PIPELINES_APP | — | — | — | `app/products/platform/HubPlatform/modules/CustomObjects/containers/objectManagerDashboard/ObjectManagerDashboard.tsx:58` |
| Pipelines | `/data-manager/pipelines` | Full, Partial(custom-objects) | `UNLIMITED_CUSTOM_OBJECTS` | FF:DATA_PIPELINES_APP; FF:EXTERNAL_OBJECTS_PIPELINES | — | — | — | `app/products/platform/HubPlatform/modules/CustomObjects/containers/objectManagerDashboard/ObjectManagerDashboard.tsx:64` |

### Recipes  `recipes`

_No internal nav._ Recipes is rendered as a single-page dashboard (RecipeDashboard) at /recipes/dashboard with no internal sub-routing. Template/category filters are in-page state, not URL routes.

### Forms  `forms`

_No internal nav._ Forms backend lives in rippling-main at app/hub/forms/ (RPForm, RPFormScheduler, RPFormResponse models, PERM_FORMS_ADMIN permission), but the corresponding webapp UI is not present as a structured module in the rippling-webapp/app/products tree.

### Checklists  `checklist-app`

1 nodes · path `/checklists` · gate `CHECKLISTAPP`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/checklist/:appName/overview` | Full, Partial(checklist) | `CHECKLISTAPP` | perm: canViewChecklistTabs; isAdmin; isChecklistEnabledForRole | — | — | — | `app/products/hr/Hub/modules/CheckList/components/checkListNavBar.tsx:53` |

