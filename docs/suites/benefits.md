# Benefits  `benefits`

**Suite visibility:** Full, Partial(benefits_admin), EE  
**Product gate:** `INSURANCE`  
**Cross-sell:** locked → full, partial · SidenavInsuranceAndBenefits  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:86-96`

## Apps (8)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Health Insurance | `/insurance` | Full, Partial(benefits_admin) | `INSURANCE` | — | locked → full, partial · SidenavInsuranceAndBenefits | — | — | `app/hub/spoke_models.py:728` |
| My Benefits | `/me/benefits` | EE | `INSURANCE` | — | locked → — | — | — | `app/insurance/constants/common.py:29` |
| FSA / HSA / Commuter | `/benefits/flex` | Full, Partial(benefits_admin), EE | `HSA` | — | locked → full, partial · SidenavInsuranceAndBenefits | — | — | `app/insurance/constants/common.py:4` |
| 401(k) / Pension | `/pension` | Full, Partial(benefits_admin), EE | `PENSIONMANAGEMENT` | — | locked → full, partial · SidenavInsuranceAndBenefits | — | — | `app/hub/spoke_models.py:798` |
| Guideline 401(k) | `/guideline` | Full, Partial(benefits_admin), EE | `GUIDELINE` | — | locked → — | — | — | `app/hub/spoke_models.py:731` |
| John Hancock 401(k) | `/john-hancock` | Full, Partial(benefits_admin), EE | `JOHNHANCOCK` | — | locked → — | — | — | `app/hub/spoke_models.py:805` |
| Shareworks (Equity) | `/shareworks` | Full, Partial(benefits_admin), EE | `SHAREWORKS` | — | locked → — | — | — | `app/hub/spoke_models.py:859` |
| Carta (Equity) | `/carta` | Full, Partial(benefits_admin), EE | `CARTAV2` | — | locked → — | — | — | `app/hub/spoke_models.py:795` |

## App L3 internal navigation

### Health Insurance  `insurance`

13 nodes · path `/insurance` · gate `INSURANCE`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Benefits | `/insurance/admin/overview` | Full, Partial(benefits) | `INSURANCE` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/admin/insurance-admin-nav-bar/use-insurance-nav-links.ts:25` |
| Additional Materials | `/insurance/admin/overview/materials` | Full | `INSURANCE` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/admin/insurance-admin-nav-bar/use-insurance-nav-links.ts:102` |
| Employee Details | `/insurance/admin/employees` | Full, Partial(benefits) | `INSURANCE` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/admin/insurance-admin-nav-bar/use-insurance-nav-links.ts:39` |
| Enrollment History | `/insurance/admin/employees/change-report` | Full, Partial(benefits) | `INSURANCE` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/admin/insurance-admin-nav-bar/use-insurance-nav-links.ts:76` |
| Upcoming Events | `/insurance/admin/employees/upcoming-events` | Full, Partial(benefits) | `INSURANCE` | perm: APP_OWNER; shouldShowUpcomingEvents | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/admin/insurance-admin-nav-bar/use-insurance-nav-links.ts:92` |
| Qualifying Life Events | `/insurance/admin/employees/qualifying-life-events` | Full, Partial(benefits) | `INSURANCE` | perm: APP_OWNER; shouldShowQualifyingLifeEventsTab | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/admin/insurance-admin-nav-bar/use-insurance-nav-links.ts:141` |
| Evidence of Insurability | `/insurance/admin/employees/evidence-of-insurability` | Full, Partial(benefits) | `INSURANCE` | perm: APP_OWNER; shouldShowEoiTab | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/admin/insurance-admin-nav-bar/use-insurance-nav-links.ts:151` |
| Deductions | `/insurance/admin/deductions` | Full, Partial(benefits) | `INSURANCE` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/admin/insurance-admin-nav-bar/use-insurance-nav-links.ts:84` |
| Carrier Connections | `/insurance/admin/carrier-transmission` | Full | `INSURANCE` | perm: APP_OWNER; shouldShowFormContact | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/admin/insurance-admin-nav-bar/use-insurance-nav-links.ts:110` |
| Account Structure | `/insurance/admin/carrier-transmission/account-structure` | Full | `INSURANCE` | perm: APP_OWNER; shouldShowFormContact | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/admin/insurance-admin-nav-bar/use-insurance-nav-links.ts:121` |
| Sequoia Census File | `/insurance/admin/carrier-transmission/sequoia` | Full | `INSURANCE` | perm: APP_OWNER; shouldShowSequoiaTab | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/admin/insurance-admin-nav-bar/use-insurance-nav-links.ts:131` |
| Settings | `/insurance/admin/settings` | Full | `INSURANCE` | perm: APP_OWNER; shouldShowAdvanceSettings | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/admin/insurance-admin-nav-bar/use-insurance-nav-links.ts:161` |
| Company Details | `/insurance/admin/settings/details` | Full | `INSURANCE` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/admin/insurance-admin-nav-bar/use-insurance-nav-links.ts:171` |

### My Benefits  `my-benefits`

6 nodes · path `/me/benefits` · gate `INSURANCE`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/insurance/employee/US/overview/home` | EE | `INSURANCE` | — | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/employee/dashboard/InsuranceEmployeeNavBar.tsx:113` |
| Settings | `/insurance/employee/US/overview/settings` | EE | `INSURANCE` | — | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/employee/dashboard/InsuranceEmployeeNavBar.tsx:120` |
| Your Dependents | `/insurance/employee/US/overview/settings?section=dependents` | EE | `INSURANCE` | — | — | — | — | `rippling-webapp/app/products/hr/Insurance/containers/unifiedOverview/employee/common/constants.ts:62` |
| Life Insurance Beneficiaries | `/insurance/employee/US/overview/settings?section=beneficiaries` | EE | `INSURANCE` | isLifeLinePresent | — | — | — | `rippling-webapp/app/products/hr/Insurance/containers/unifiedOverview/employee/common/constants.ts:67` |
| Forms | `/insurance/employee/US/overview/forms` | EE | `INSURANCE` | — | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/employee/dashboard/InsuranceEmployeeNavBar.tsx:126` |
| Additional Materials | `/insurance/employee/US/overview/materials` | EE | `INSURANCE` | — | — | — | — | `rippling-webapp/app/products/hr/Insurance/components/employee/dashboard/InsuranceEmployeeNavBar.tsx:132` |

### FSA / HSA / Commuter  `flex-benefits`

17 nodes · path `/benefits/flex` · gate `HSA`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| FSA Overview | `/fsa-benefits/dashboard/overview` | Full, Partial(benefits) | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/modules/FSABenefits/routes-v6/fsaBenefits.routes.constants.external.ts:60` |
| FSA Plans | `/fsa-benefits/dashboard/plans` | Full, Partial(benefits) | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/Benefits-Flex/pages/base/dashboard/multiEIN/plans/navLinks.ts:7` |
| Current | `/fsa-benefits/dashboard/plans/current` | Full, Partial(benefits) | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/Benefits-Flex/pages/base/dashboard/multiEIN/plans/navLinks.ts:11` |
| Upcoming | `/fsa-benefits/dashboard/plans/upcoming` | Full, Partial(benefits) | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/Benefits-Flex/pages/base/dashboard/multiEIN/plans/navLinks.ts:15` |
| Past | `/fsa-benefits/dashboard/plans/past` | Full, Partial(benefits) | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/Benefits-Flex/pages/base/dashboard/multiEIN/plans/navLinks.ts:19` |
| FSA Enrollments | `/fsa-benefits/dashboard/enrollments` | Full, Partial(benefits) | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/modules/FSABenefits/routes-v6/fsaBenefits.routes.constants.external.ts:69` |
| Transactions | `/fsa-benefits/dashboard/transactions` | Full, Partial(benefits) | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/modules/FSABenefits/routes-v6/fsaBenefits.routes.constants.external.ts:65` |
| Documents | `/fsa-benefits/dashboard/documents` | Full, Partial(benefits) | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/modules/FSABenefits/routes-v6/fsaBenefits.routes.constants.external.ts:71` |
| FSA Settings | `/fsa-benefits/dashboard/settings` | Full | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/modules/FSABenefits/routes-v6/fsaBenefits.routes.constants.external.ts:61` |
| Bank Account | `/fsa-benefits/dashboard/settings/bank-account` | Full | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/modules/FSABenefits/routes-v6/fsaBenefits.routes.constants.external.ts:62` |
| Eligibility | `/fsa-benefits/dashboard/settings/eligibility` | Full | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/modules/FSABenefits/routes-v6/fsaBenefits.routes.constants.external.ts:64` |
| HSA Dashboard | `/hsa-benefits/dashboard/overview` | Full, Partial(benefits) | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/modules/HSABenefits/routes-v6/hsaBenefits.routes.constants.external.ts:6` |
| HSA Plans | `/hsa-benefits/dashboard/plans` | Full, Partial(benefits) | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/Benefits-Flex/pages/HSA/dashboard/multiEIN/plans` |
| HSA Enrollments | `/hsa-benefits/dashboard/enrollments` | Full, Partial(benefits) | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/Benefits-Flex/pages/HSA/dashboard/MultiEINHSAEnrollmentsPage` |
| Commuter Dashboard | `/commuter-benefits/dashboard/overview` | Full, Partial(benefits) | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/modules/CommuterBenefits/routes-v6/commuterBenefits.routes.constants.external.ts:6` |
| Commuter Plans | `/commuter-benefits/dashboard/plans` | Full, Partial(benefits) | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/Benefits-Flex/pages/Commuter/dashboard/multiEIN/plans` |
| Commuter Enrollments | `/commuter-benefits/dashboard/enrollments` | Full, Partial(benefits) | `HSA` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Benefits/Benefits-Flex/pages/Commuter/dashboard/MultiEINCommuterEnrollmentsPage` |

### 401(k) / Pension  `pension-management`

5 nodes · path `/pension` · gate `PENSIONMANAGEMENT`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Employees | `/pension-management/dashboard/US/overview` | Full, Partial(benefits) | `PENSIONMANAGEMENT` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/PensionManagement/containers/navbar/hooks/useAppNavBarLinks.tsx:35` |
| Annual Limits | `/pension-management/dashboard/US/annual-limits` | Full, Partial(benefits) | `PENSIONMANAGEMENT` | perm: APP_OWNER; isUSRetirementsInstalled; is-us-retirements-enabled | — | — | — | `rippling-webapp/app/products/hr/PensionManagement/containers/navbar/hooks/useAppNavBarLinks.tsx:73` |
| Plans | `/pension-management/dashboard/US/plans` | Full, Partial(benefits) | `PENSIONMANAGEMENT` | perm: APP_OWNER; isUSRetirementsInstalled; is-us-retirements-enabled | — | — | — | `rippling-webapp/app/products/hr/PensionManagement/containers/navbar/hooks/useAppNavBarLinks.tsx:78` |
| Pension Schemes | `/pension-management/dashboard/US/pension-schemes` | Full, Partial(benefits) | `PENSIONMANAGEMENT` | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/PensionManagement/containers/navbar/hooks/useAppNavBarLinks.tsx:52` |
| Bank Accounts | `/pension-management/dashboard/US/bank-accounts` | Full | `PENSIONMANAGEMENT` | perm: APP_OWNER; shouldShowBankAccountTab | — | — | — | `rippling-webapp/app/products/hr/PensionManagement/containers/navbar/hooks/useAppNavBarLinks.tsx:86` |

### Guideline 401(k)  `guideline`

_No internal nav._ Guideline is a third-party 401(k) provider integrated via Rippling's app marketplace.

### John Hancock 401(k)  `john-hancock`

_No internal nav._ John Hancock is a third-party 401(k) provider integrated via Rippling's app marketplace.

### Shareworks (Equity)  `shareworks`

_No internal nav._ Shareworks is a third-party equity provider integrated as a Rippling app spoke. Once installed, it surfaces an Overview/equity-page with grants and vesting; deeper actions (issuing, modeling) happen in Shareworks' own portal.

### Carta (Equity)  `carta`

_No internal nav._ Carta is a third-party equity provider integrated as a Rippling app spoke. Setup is a multi-step OAuth/data-import flow rooted at /apps/carta-equity-management/setup.

