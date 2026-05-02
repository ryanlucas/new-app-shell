# Payroll  `payroll`

**Suite visibility:** Full, Partial(payroll_admin), EE  
**Product gate:** —  
**Cross-sell:** locked → full, partial · SidenavFinance  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:147-157`

## Apps (8)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Run Payroll | `/payroll/dashboard` | Full, Partial(payroll_admin) | `PAYROLL` | — | locked → full, partial · SidenavFinance | — | — | `app/hub/spoke_models.py:715` |
| Global Payroll | `/global-payroll` | Full, Partial(payroll_admin) | `GLOBAL_PAYROLL` | — | locked → full, partial · SidenavFinance | — | — | `app/hub/spoke_models.py:797` |
| International Payroll | `/international-payroll` | Full, Partial(payroll_admin) | `INTERNATIONAL_PAYROLL` | — | locked → full, partial · SidenavFinance | — | — | `app/hub/spoke_models.py:729` |
| My Pay | `/me/pay` | EE | `MYPAY` | — | locked → — | ee: My Pay (/my-pay) | — | `app/apps/utils/dummy_apps.py:114` |
| Tax Filings | `/payroll/dashboard/documents` | Full, Partial(payroll_admin) | `PAYROLL` | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:407` |
| Job Codes | `/payroll/job-codes` | Full, Partial(payroll_admin) | `PAYROLL` | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:399` |
| Accounting | `/accounting` | Full, Partial(accounting_admin) | `ACCOUNTING_INTEGRATIONS` | — | locked → full, partial · SidenavFinance | — | — | `app/hub/spoke_models.py:812` |
| Contractor of Record | `/contractor-of-record` | Full, Partial(payroll_admin) | `GLOBAL_CONTRACTOR` | — | locked → full, partial · SidenavFinance | — | — | `app/cross_sell/unpurchased_sku/unpurchased_sku_nav_items.py:336` |

## App L3 internal navigation

### Run Payroll  `payroll`

14 nodes · path `/payroll/dashboard` · gate `PAYROLL`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/payroll/dashboard/overview` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:overview | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:35` |
| Pay Runs | `/payroll/run` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:run | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/payrollAdmin.routes.tsx:147` |
| People | `/payroll/dashboard/people` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:people | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:47` |
| Reimbursements | `/payroll/dashboard/paytypes` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:paytypes | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:78` |
| Deductions | `/payroll/dashboard/deductions` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:deductions | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:90` |
| Garnishments | `/payroll/dashboard/garnishments` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:garnishments | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:118` |
| Tax Payments | `/payroll/dashboard/taxPayments` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:taxPayments | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:242` |
| Tax Exemptions | `/payroll/dashboard/taxExemptions` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:taxExemptions | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:198` |
| Expected Notices | `/payroll/dashboard/expectedTaxNotices` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:expectedTaxNotices | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:176` |
| Amendments | `/payroll/dashboard/amendments` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:amendments | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:220` |
| Accounting | `/payroll/dashboard/accounting` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:accounting | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:130` |
| Reports | `/payroll/dashboard/reports` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:reports | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:142` |
| Documents | `/payroll/dashboard/documents` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:documents | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:154` |
| Settings | `/payroll/dashboard/settings` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:settings | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:56` |

### Global Payroll  `global-payroll`

7 nodes · path `/global-payroll` · gate `GLOBAL_PAYROLL`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/global-payroll/admin/overview` | Full, Partial(payroll) | `GLOBAL_PAYROLL` | — | — | — | — | `app/products/finance/GlobalPayroll/routes-v6/globalPayrollChildren.routes.tsx:46` |
| Run Management | `/global-payroll/admin/run-management` | Full, Partial(payroll) | `GLOBAL_PAYROLL` | — | — | — | — | `app/products/finance/GlobalPayroll/routes-v6/runManagement/runManagement.routes.tsx:1` |
| Filings | `/global-payroll/admin/filings` | Full, Partial(payroll) | `GLOBAL_PAYROLL` | — | — | — | — | `app/products/finance/GlobalPayroll/filings/filings.routes.ts:1` |
| Amendments | `/global-payroll/admin/amendments` | Full, Partial(payroll) | `GLOBAL_PAYROLL` | — | — | — | — | `app/products/finance/GlobalPayroll/routes-v6/globalPayrollChildren.routes.tsx:80` |
| Documents | `/global-payroll/admin/documents` | Full, Partial(payroll) | `GLOBAL_PAYROLL` | — | — | — | — | `app/products/finance/GlobalPayroll/routes-v6/documentsProcessing/documentsProcessing.routes.tsx:1` |
| Bulk Import | `/global-payroll/admin/bulk-import` | Full, Partial(payroll) | `GLOBAL_PAYROLL` | — | — | — | — | `app/products/finance/GlobalPayroll/routes-v6/globalPayrollChildren.routes.tsx:67` |
| Settings | `/global-payroll/admin/settings` | Full, Partial(payroll) | `GLOBAL_PAYROLL` | — | — | — | — | `app/products/finance/GlobalPayroll/routes-v6/settings/settings.routes.tsx:1` |

### International Payroll  `international-payroll`

4 nodes · path `/international-payroll` · gate `INTERNATIONAL_PAYROLL`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/global-payroll/admin/overview` | Full, Partial(payroll) | `INTERNATIONAL_PAYROLL` | — | — | — | — | `app/products/finance/GlobalPayroll/routes-v6/globalPayrollChildren.routes.tsx:46` |
| Run Management | `/global-payroll/admin/run-management` | Full, Partial(payroll) | `INTERNATIONAL_PAYROLL` | — | — | — | — | `app/products/finance/GlobalPayroll/routes-v6/runManagement/runManagement.routes.tsx:1` |
| Filings | `/global-payroll/admin/filings` | Full, Partial(payroll) | `INTERNATIONAL_PAYROLL` | — | — | — | — | `app/products/finance/GlobalPayroll/filings/filings.routes.ts:1` |
| Settings | `/global-payroll/admin/settings` | Full, Partial(payroll) | `INTERNATIONAL_PAYROLL` | — | — | — | — | `app/products/finance/GlobalPayroll/routes-v6/settings/settings.routes.tsx:1` |

### My Pay  `my-pay`

6 nodes · path `/me/pay` · gate `MYPAY`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Pay | `/my-pay/pay` | EE | `MYPAY` | — | — | — | — | `app/products/finance/MyPay/routes/myPay.routes.tsx:38` |
| Taxes | `/my-pay/taxes` | EE | `MYPAY` | — | — | — | — | `app/products/finance/MyPay/routes/myPay.routes.tsx:60` |
| Exemptions | `/my-pay/exemptions` | EE | `MYPAY` | — | — | — | — | `app/products/finance/MyPay/routes/myPay.routes.tsx:104` |
| Bank Account | `/my-pay/bankaccount` | EE | `MYPAY` | — | — | — | — | `app/products/finance/MyPay/routes/myPay.routes.tsx:49` |
| Tasks | `/my-pay/tasks` | EE | `MYPAY` | — | — | — | — | `app/products/finance/MyPay/routes/myPay.routes.tsx:82` |
| Settings | `/my-pay/settings` | EE | `MYPAY` | — | — | — | — | `app/products/finance/MyPay/routes/myPay.routes.tsx:71` |

### Tax Filings  `tax-filings`

5 nodes · path `/payroll/dashboard/documents` · gate `PAYROLL`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Tax Payments | `/payroll/dashboard/taxPayments` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:taxPayments | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:242` |
| Expected Notices | `/payroll/dashboard/expectedTaxNotices` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:expectedTaxNotices | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:176` |
| Tax Exemptions | `/payroll/dashboard/taxExemptions` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:taxExemptions | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:198` |
| Amendments | `/payroll/dashboard/amendments` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:amendments | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:220` |
| Filing Documents | `/payroll/dashboard/documents` | Full, Partial(payroll) | `PAYROLL` | perm: payroll:documents | — | — | — | `app/products/finance/Payroll/routes-v6/authRoutes/admin/dashboard.routes.tsx:154` |

### Job Codes  `job-codes`

_No internal nav._ Job Codes is not a top-level app — it lives as an editor (JobCodesEditor) inside Spend Management and Payroll settings flows. No dedicated left rail nav exists.

### Accounting  `accounting-integrations`

5 nodes · path `/accounting` · gate `ACCOUNTING_INTEGRATIONS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/accounting-integrations/dashboard/overview` | Full, Partial(accounting) | `ACCOUNTING_INTEGRATIONS` | — | — | — | — | `app/products/finance/AccountingIntegrations/routerV6/appDashboard.routes.tsx:13` |
| Mappings | `/accounting-integrations/dashboard/mappings` | Full, Partial(accounting) | `ACCOUNTING_INTEGRATIONS` | — | — | — | — | `app/products/finance/AccountingIntegrations/routerV6/appDashboard.routes.tsx:17` |
| Spend | `/accounting-integrations/dashboard/spend-management` | Full, Partial(accounting) | `ACCOUNTING_INTEGRATIONS` | — | — | — | — | `app/products/finance/AccountingIntegrations/routerV6/appDashboard.routes.tsx:27` |
| Payroll | `/accounting-integrations/dashboard/payroll` | Full, Partial(accounting) | `ACCOUNTING_INTEGRATIONS` | — | — | — | — | `app/products/finance/AccountingIntegrations/routerV6/appDashboard.routes.tsx:42` |
| Rippling Apps | `/accounting-integrations/dashboard/rippling-apps` | Full, Partial(accounting) | `ACCOUNTING_INTEGRATIONS` | — | — | — | — | `app/products/finance/AccountingIntegrations/routerV6/appDashboard.routes.tsx:53` |

### Contractor of Record  `contractor-of-record`

5 nodes · path `/contractor-of-record` · gate `GLOBAL_CONTRACTOR`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Dashboard | `/global-contractors-standalone/dashboard` | Partial(contractors), EE | `GLOBAL_CONTRACTOR` | categoriesData.DASHBOARD.visible | — | — | — | `app/products/hr/GlobalContractors/routes/globalContractorsStandalone.children.routes.tsx:104` |
| My Money | `/global-contractors-standalone/my-money` | EE | `GLOBAL_CONTRACTOR` | categoriesData.MY_MONEY.visible | — | — | — | `app/products/hr/GlobalContractors/routes/globalContractorsStandalone.children.routes.tsx:130` |
| My Invoices | `/global-contractors-standalone/my-invoices` | EE | `GLOBAL_CONTRACTOR` | categoriesData.INVOICES.visible | — | — | — | `app/products/hr/GlobalContractors/routes/globalContractorsStandalone.children.routes.tsx:134` |
| My Time | `/global-contractors-standalone/my-time` | EE | `GLOBAL_CONTRACTOR` | categoriesData.MY_TIME.visible | — | — | — | `app/products/hr/GlobalContractors/routes/globalContractorsStandalone.children.routes.tsx:153` |
| Clients | `/global-contractors-standalone/clients` | EE | `GLOBAL_CONTRACTOR` | categoriesData.CLIENTS.visible | — | — | — | `app/products/hr/GlobalContractors/routes/globalContractorsStandalone.children.routes.tsx:169` |

