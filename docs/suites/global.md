# Global  `global`

**Suite visibility:** Full, Partial(global_admin)  
**Product gate:** —  
**Cross-sell:** locked → full, partial · SidenavGlobal  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:206-213`

## Apps (2)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Global Workforce | `/global/workforce` | Full, Partial(global_admin) | `GLOBAL_PAYROLL` | — | locked → full, partial · SidenavGlobal | — | — | `app/cross_sell/unpurchased_sku/unpurchased_sku_nav_items.py:325` |
| Global Contractors | `/global/contractors` | Full, Partial(global_admin) | `GLOBAL_CONTRACTOR` | — | locked → full, partial · SidenavGlobal | — | — | `app/hub/spoke_models.py:826` |

## App L3 internal navigation

### Global Workforce  `global-workforce`

11 nodes · path `/global/workforce` · gate `GLOBAL_PAYROLL`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/global-payroll/admin` | — | — | — | — | — | — | `rippling-webapp/app/products/finance/GlobalPayroll/routes-v6/globalPayrollChildren.routes.tsx:727-748` |
| Run Management | `/global-payroll/admin/run-management` | — | — | — | — | — | — | `rippling-webapp/app/products/finance/GlobalPayroll/routes-v6/globalPayrollChildren.routes.tsx:61` |
| Filings | `/global-payroll/admin/filings` | — | — | — | — | — | — | `rippling-webapp/app/products/finance/GlobalPayroll/routes-v6/globalPayrollChildren.routes.tsx:62` |
| Settings | `/global-payroll/admin/settings` | — | — | — | — | — | — | `rippling-webapp/app/products/finance/GlobalPayroll/routes-v6/globalPayrollChildren.routes.tsx:63` |
| Documents | `/global-payroll/admin/documents-processing` | — | — | — | — | — | — | `rippling-webapp/app/products/finance/GlobalPayroll/routes-v6/globalPayrollChildren.routes.tsx:64` |
| Onboarding | `/global-payroll/admin/onboarding` | — | — | — | — | — | — | `rippling-webapp/app/products/finance/GlobalPayroll/routes-v6/globalPayrollChildren.routes.tsx:65,637-658` |
| EOR Admin | `/global-payroll/eor-admin` | — | — | — | — | — | — | `rippling-webapp/app/products/finance/GlobalPayroll/routes-v6/globalPayrollChildren.routes.tsx:103-114` |
| Bulk Import | `/global-payroll/admin/bulk-import` | — | — | — | — | — | — | `rippling-webapp/app/products/finance/GlobalPayroll/routes-v6/globalPayrollChildren.routes.tsx:67-78` |
| Transaction Reports | `/global-payroll/admin/reports/transactions` | — | — | — | — | — | — | `rippling-webapp/app/products/finance/GlobalPayroll/routes-v6/globalPayrollChildren.routes.tsx:680-701` |
| Journal Reports | `/global-payroll/admin/reports/journal` | — | — | — | — | — | — | `rippling-webapp/app/products/finance/GlobalPayroll/routes-v6/globalPayrollChildren.routes.tsx:702-725` |
| My Pay | `/global-payroll/employee` | — | — | — | — | — | — | `rippling-webapp/app/products/finance/GlobalPayroll/routes-v6/globalPayrollChildren.routes.tsx:34-45` |

### Global Contractors  `global-contractor`

12 nodes · path `/global/contractors` · gate `GLOBAL_CONTRACTOR`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/contractors/admin/overview` | — | — | — | — | — | — | `rippling-webapp/app/products/hr/GlobalContractors/modules/admin/routes/adminAppForUnifiedApp.routes.tsx:128-133` |
| Contractors | `/contractors/admin/contractors/all` | — | — | — | — | — | — | `rippling-webapp/app/products/hr/GlobalContractors/modules/admin/routes/adminAppForUnifiedApp.routes.tsx:138-145` |
| Contracts | `/contractors/admin/contracts` | — | — | — | — | — | — | `rippling-webapp/app/products/hr/GlobalContractors/modules/admin/routes/adminAppForUnifiedApp.routes.tsx:150-157` |
| Policies | `/contractors/admin/policies` | — | — | — | — | — | — | `rippling-webapp/app/products/hr/GlobalContractors/modules/admin/routes/adminAppForUnifiedApp.routes.tsx:159-189` |
| KYC Statuses | `/contractors/admin/contractors/kyc-statuses` | — | — | — | — | — | — | `rippling-webapp/app/products/hr/GlobalContractors/modules/admin/routes/adminAppForUnifiedApp.routes.tsx:146-149` |
| Settings | `/contractors/admin/settings` | — | — | — | — | — | — | `rippling-webapp/app/products/hr/GlobalContractors/modules/admin/routes/adminAppForUnifiedApp.routes.tsx:190-200` |
| Overview | `/contractors/invoicing/overview` | — | — | — | — | — | — | `rippling-webapp/app/products/hr/GlobalContractors/modules/contractor/constants/routeConstants.ts:5` |
| Invoices | `/contractors/invoicing/invoices` | — | — | — | — | — | — | `rippling-webapp/app/products/hr/GlobalContractors/modules/contractor/constants/routeConstants.ts:9` |
| Contracts | `/contractors/invoicing/contracts` | — | — | — | — | — | — | `rippling-webapp/app/products/hr/GlobalContractors/modules/contractor/constants/routeConstants.ts:6` |
| Wallet | `/contractors/invoicing/wallet` | — | — | — | — | — | — | `rippling-webapp/app/products/hr/GlobalContractors/modules/contractor/constants/routeConstants.ts:10` |
| Clients | `/contractors/invoicing/clients` | — | — | — | — | — | — | `rippling-webapp/app/products/hr/GlobalContractors/modules/contractor/constants/routeConstants.ts:7` |
| Settings | `/contractors/invoicing/settings` | — | — | — | — | — | — | `rippling-webapp/app/products/hr/GlobalContractors/modules/contractor/constants/routeConstants.ts:8` |

