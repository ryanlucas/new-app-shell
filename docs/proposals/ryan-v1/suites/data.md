# Data  `data`

**Suite visibility:** Full, Partial(data_admin)  
**Product gate:** —  
**Cross-sell:** locked → full, partial · SidenavData  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:108-118`

## Apps (6)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Reports | `/reports` | Full, Partial(reports_admin), Mgr | `REPORTS` | — | locked → full, partial · SidenavData | — | — | `app/hub/spoke_models.py:785` |
| Data Manager | `/data/data-manager` | Full, Partial(data_admin) | `DATAMANAGER` | — | locked → full, partial · SidenavData | — | — | `app/hub/spoke_models.py:799` |
| Pipelines | `/data/pipelines` | Full, Partial(data_admin) | `DATA_PIPELINES` | — | locked → full, partial · SidenavData | — | — | `app/cross_sell/unpurchased_sku/unpurchased_sku_nav_items.py:392` |
| Transformations | `/data/transformations` | Full, Partial(data_admin) | `DERIVED_OBJECTS` | — | locked → full, partial · SidenavData | — | — | `app/cross_sell/unpurchased_sku/unpurchased_sku_nav_items.py:408` |
| Snowflake Sync | `/data/snowflake` | Full, Partial(data_admin) | `SNOWFLAKE` | — | locked → — | — | — | `app/hub/spoke_models.py:823` |
| Forecasting | `/data/forecasting` | Full, Partial(data_admin) | `FORECASTING` | — | locked → — | — | — | `app/hub/spoke_models.py:862` |

## App L3 internal navigation

### Reports  `reports`

5 nodes · path `/reports` · gate `REPORTS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Recent | `/reports/dashboard?tab=recent` | Full, Partial(reports_admin), Mgr, EE | `REPORTS` | — | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/Reports/CoreReports/containers/reportsDashboard/ReportsDashboard.constants.ts:17` |
| Built-in | `/reports/dashboard?tab=built-in` | Full, Partial(reports_admin), Mgr, EE | `REPORTS` | — | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/Reports/CoreReports/containers/reportsDashboard/ReportsDashboard.constants.ts:24` |
| Created by me | `/reports/dashboard?tab=created-by-me` | Full, Partial(reports_admin), Mgr, EE | `REPORTS` | — | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/Reports/CoreReports/containers/reportsDashboard/ReportsDashboard.constants.ts:31` |
| Shared with me | `/reports/dashboard?tab=shared-with-me` | Full, Partial(reports_admin), Mgr, EE | `REPORTS` | — | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/Reports/CoreReports/containers/reportsDashboard/ReportsDashboard.constants.ts:38` |
| Report Permissions | `/reports/dashboard?tab=report-permissions` | Full, Partial(reports_admin) | `REPORTS` | perm: report_permissions | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/Reports/CoreReports/containers/reportsDashboard/ReportsDashboard.constants.ts:45` |

### Data Manager  `data-manager`

2 nodes · path `/data/data-manager` · gate `DATAMANAGER`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| All Fields | `/data-manager/field-selector` | Full, Partial(data_manager_admin) | `DATAMANAGER` | — | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/FieldsManager/containers/fieldManagerDashboard/FieldManagerDashboard.helpers.ts:7` |
| Data Collected | `/data-manager/data-collected` | Full, Partial(data_manager_admin) | `DATAMANAGER` | — | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/FieldsManager/containers/fieldManagerDashboard/FieldManagerDashboard.helpers.ts:11` |

### Pipelines  `data-pipelines`

3 nodes · path `/data/pipelines` · gate `DATA_PIPELINES`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Active Pipelines | `/data/pipelines` | — | — | — | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/DataConnectors/routes-v6/pipelines.routes.tsx:5-10` |
| External Connections | `/data/external-connections` | — | — | — | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/DataCatalog/route/index.tsx:57-64` |
| Catalog | `/data/catalog` | — | — | — | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/DataCatalog/route/index.tsx:23-34` |

### Transformations  `transformations`

2 nodes · path `/data/transformations` · gate `DERIVED_OBJECTS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/data/transformations/overview` | — | — | — | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/DerivedObjects/routes-v6/derivedObjects.routes.tsx:31-37` |
| Schedules | `/data/transformations/schedules` | — | — | — | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/DerivedObjects/routes-v6/derivedObjects.routes.tsx:38-44` |

### Snowflake Sync  `snowflake`

_No internal nav._ Snowflake Sync is not a standalone app surface in webapp — it's a managed-connector destination (MANAGED_CONNECTOR.SNOWFLAKE) and pipeline source/destination type within DataConnectors.

### Forecasting  `forecasting`

_No internal nav._ Forecasting is a single-page home (ForecastingHome) — no persistent left/top nav; the rest of /forecasting/* paths are flow steps (setup, labor_plan_connect, objects/create, objects/upload).

