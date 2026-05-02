# HR  `hr`

**Suite visibility:** Full, Partial(hr_admin), Mgr, EE  
**Product gate:** —  
**Cross-sell:** locked → full, partial · SidenavHrManagement  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:64-74`

## Apps (13)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| HR Overview | `/hr-products-overview` | Full, Partial(hr_admin) | — | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:103` |
| People | `/employee-list/list` | Full, Partial(hr_admin), Mgr, EE | — | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:92` |
| Org Management | `/org-management` | Full, Partial(hr_admin) | `HRIS_ORG_MANAGEMENT` | — | locked → full, partial · SidenavHrManagement | — | — | `app/hub/spoke_models.py:871` |
| Compensation Bands | `/compensation` | Full, Partial(compensation_admin) | `COMPENSATION_MANAGEMENT_APP` | — | locked → full, partial · SidenavHrManagement | — | — | `app/apps/utils/dummy_apps.py:137` |
| Compliance 360 | `/compliance/overview` | Full, Partial(compliance_admin), EE | `AUTOMATED_COMPLIANCE` | — | locked → full, partial · SidenavHrManagement | — | — | `app/apps/utils/dummy_apps.py:151` |
| Employment Authorization | `/employment-authorization` | Full, Partial(hr_admin), EE | — | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:125` |
| Documents | `/documents` | Full, Partial(documents_admin), Mgr, EE | — | perm: PERM_DOCUMENTS_APP_READ | locked → — | — | — | `app/apps/utils/navigation_bar.py:136` |
| Leaves | `/leaves` | Full, Partial(leaves_admin), Mgr, EE | `LEAVES` | — | locked → full, partial · SidenavHrManagement | — | — | `app/hub/spoke_models.py:813` |
| Time Off | `/time-off` | Full, Partial(pto_admin), Mgr, EE | `PTO` | !timePlatformInstalled; !isStandaloneCompany | locked → full, partial · SidenavHrManagement | ee: My Time Off (/me/time-off); manager: Team Time Off (/team/time-off) | `time-off` | `app/apps/utils/navigation_bar.py:1627 (legacy variant, hidden when TIME_PLATFORM installed via should_hide_legacy_time_apps())` |
| HR Services | `/hr-services` | Full, Partial(hr_admin) | `HR360` | — | locked → full, partial · SidenavHrManagement | — | — | `app/cross_sell/unpurchased_sku/unpurchased_sku_nav_items.py:224` |
| HR Help Desk | `/hr-helpdesk` | Full, Partial(hr_admin), EE | `HRHELPDESKTHINKHR` | — | locked → full, partial · SidenavHrManagement | — | — | `app/hub/spoke_models.py:779` |
| Workplace Posters *[moveApp, overrideNode]*| `/peo/workplace-posters` | Full, Partial | — | isPeoClient | — | — | — | `app/apps/utils/dummy_apps.py:443` |
| State Tax Accounts *[moveApp, overrideNode]*| `/peo/state-tax-accounts` | Full, Partial | — | isPeoClient | — | — | — | `app/apps/utils/dummy_apps.py:451` |

## App L3 internal navigation

### HR Overview  `hr-overview`

_No internal nav._ HR Overview is a single landing page; no internal sub-routes were found.

### People  `people`

3 nodes · path `/employee-list/list` · gate `—`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| List | `/employee-list/list` | Full, Partial, Mgr | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Emp/projects/employeeListV2/people.routes.tsx:13` |
| Onboarding Tracker | `/employee-list/onboarding-tracker` | Full, Partial | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Emp/projects/employeeListV2/people.routes.tsx:17` |
| Settings | `/employee-list/settings` | Full | — | perm: full-admin | — | — | — | `rippling-webapp/app/products/hr/Hris/Emp/projects/employeeListV2/people.routes.tsx:21` |

### Org Management  `hris-org-management`

24 nodes · path `/org-management` · gate `HRIS_ORG_MANAGEMENT`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Company Details | `/company-details` | Full, Partial | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/router-v6/org.base.routes.tsx:37` |
| Information | `/company-details/information` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:55` |
| Work Emails | `/company-details/work-emails` | Full | — | WORK_EMAIL_POLICY_HIRING_FLOW | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:67` |
| Work Locations | `/company-details/work-locations` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:119` |
| Departments | `/company-details/departments` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:136` |
| Teams | `/company-details/teams` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:153` |
| Entities | `/company-details/entities` | Full | — | EOR_CA_FLOW | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:160` |
| Levels | `/company-details/levels` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:180` |
| Titles | `/company-details/titles` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:197` |
| Custom Org Attributes | `/company-details/job-dimensions` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:204` |
| Business Structure | `/company-details/business-structure` | Full | — | BUSINESS_STRUCTURE_FLAG | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:211` |
| Job Templates | `/company-details/job-templates` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:223` |
| Pay Rates | `/company-details/pay-rates` | Full | — | PAY_RATES_AND_PIECE_RATES | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:232` |
| Piece Rates | `/company-details/piece-rates` | Full | — | PAY_RATES_AND_PIECE_RATES | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:238` |
| Business Partners | `/company-details/business-partner` | Full | — | BUSINESS_PARTNERS | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:243` |
| Employment Types | `/company-details/company-employment-types` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:254` |
| Work Pattern | `/company-details/work-pattern` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:264` |
| Termination Reasons | `/company-details/termination-reasons` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:273` |
| Org Chart | `/org-chart` | Full, Partial, Mgr, EE | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/router-v6/org.base.routes.tsx:17` |
| Diagram | `/org-chart/diagram` | Full, Partial, Mgr, EE | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/modules/OrgChart/containers/OrgChartRoot/OrgChartRoot.tsx:33` |
| Chart | `/org-chart/chart` | Full, Partial, Mgr, EE | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/modules/OrgChart/containers/OrgChartRoot/OrgChartRoot.tsx:38` |
| Settings | `/org-chart/settings` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/modules/OrgChart/containers/OrgChartRoot/OrgChartRoot.tsx:52` |
| Tracks | `/tracks` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/router-v6/org.base.routes.tsx:5` |
| Organizational Details | `/organizational-details` | Full | — | HRIS_OM_CUSTOM_ORG_DATA | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/router-v6/organisationalDetails.routes.tsx:14` |

### Compensation Bands  `compensation-bands`

18 nodes · path `/compensation` · gate `COMPENSATION_MANAGEMENT_APP`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/compensation/overview` | Full | — | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:144` |
| People | `/compensation/people` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:85` |
| Explore | `/compensation/people/explore` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:89` |
| Full Details | `/compensation/people/details` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:93` |
| Total Compensation | `/compensation/people/total-compensation` | Full | — | perm: APP_VIEWER | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:44` |
| Compensation Plans | `/compensation/plans` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:103` |
| Active | `/compensation/plans/enabled` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:109` |
| Drafts | `/compensation/plans/draft` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:115` |
| Disabled | `/compensation/plans/disabled` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:120` |
| Benchmarking | `/compensation/benchmarking` | Full | — | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:131` |
| Compensation Calculator | `/compensation/compensation-calculator` | Full, Partial | — | — | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:39` |
| Pay Differentials | `/compensation/location-factors` | Full, Partial | — | — | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:35` |
| Job Families | `/compensation/job-families` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:49` |
| Job Families | `/compensation/job-families/job-family-items` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:54` |
| Job Function | `/compensation/job-families/job-function` | Full | — | JOB_FUNCTION_GROUP | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:60` |
| People | `/compensation/job-families/job-family-people` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:66` |
| Settings | `/compensation/settings` | Full | — | perm: APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:149` |
| Shared | `/compensation/shared` | Partial | — | perm: APP_PARTIAL_ACCESS | — | — | — | `rippling-webapp/app/products/hr/Compensation/components/CompensationAppNavigation.tsx:154` |

### Compliance 360  `compliance-360`

4 nodes · path `/compliance/overview` · gate `AUTOMATED_COMPLIANCE`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/compliance/overview` | Full, Partial(compliance) | `AUTOMATED_COMPLIANCE` | perm: compliance_admin | — | — | — | `rippling-webapp/app/products/hr/Compliance/components/complianceDashboard/ComplianceDashboard.tsx:158` |
| Historical Issues | `/compliance/historical-issues` | Full, Partial(compliance) | `AUTOMATED_COMPLIANCE` | perm: compliance_admin | — | — | — | `rippling-webapp/app/products/hr/Compliance/components/complianceDashboard/ComplianceDashboard.tsx:162` |
| Tax Accounts | `/compliance/tax-accounts` | Full, Partial(compliance) | `AUTOMATED_COMPLIANCE` | perm: compliance_admin; clientType (PEO) set | — | — | — | `rippling-webapp/app/products/hr/Compliance/components/complianceDashboard/ComplianceDashboard.tsx:168` |
| PEO Offboarding | `/compliance/peo-offboarding` | Full, Partial(compliance) | `AUTOMATED_COMPLIANCE` | perm: compliance_admin; clientType set; PEO terminationDate within last 90 days | — | — | — | `rippling-webapp/app/products/hr/Compliance/components/complianceDashboard/ComplianceDashboard.tsx:178` |

### Employment Authorization  `employment-authorization`

12 nodes · path `/employment-authorization` · gate `—`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| I-9 | `/employment-authorization/i9-dashboard` | Full, Partial(employmentAuthorization) | — | perm: isI9EverifyAdmin \|\| i9EverifyNonFullAdminAccessLevel.i9 in ALLOWED | — | — | — | `rippling-webapp/app/products/hr/EmploymentAuthorization/components/employmentAuthorizationRoot/EmploymentAuthRoot.tsx:229` |
| Employee Action Pending | `/employment-authorization/i9-dashboard/employee-action-pending` | Full, Partial(employmentAuthorization) | — | perm: isI9EverifyAdmin \|\| i9EverifyNonFullAdminAccessLevel.i9 | — | — | — | `rippling-webapp/app/products/hr/EmploymentAuthorization/components/employmentAuthorizationRoot/EmploymentAuthRoot.tsx:67` |
| Employer Verification Pending | `/employment-authorization/i9-dashboard/employer-verification-pending` | Full, Partial(employmentAuthorization) | — | perm: isI9EverifyAdmin \|\| i9EverifyNonFullAdminAccessLevel.i9; !isEmployerFlowComplete | — | — | — | `rippling-webapp/app/products/hr/EmploymentAuthorization/components/employmentAuthorizationRoot/EmploymentAuthRoot.tsx:79` |
| Physical Doc Inspection Pending | `/employment-authorization/i9-dashboard/physical-document-inspection-pending` | Full, Partial(employmentAuthorization) | — | perm: isI9EverifyAdmin \|\| i9EverifyNonFullAdminAccessLevel.i9; isEmployerFlowComplete | — | — | — | `rippling-webapp/app/products/hr/EmploymentAuthorization/components/employmentAuthorizationRoot/EmploymentAuthRoot.tsx:90` |
| Completed | `/employment-authorization/i9-dashboard/completed` | Full, Partial(employmentAuthorization) | — | perm: isI9EverifyAdmin \|\| i9EverifyNonFullAdminAccessLevel.i9 | — | — | — | `rippling-webapp/app/products/hr/EmploymentAuthorization/components/employmentAuthorizationRoot/EmploymentAuthRoot.tsx:101` |
| Others | `/employment-authorization/i9-dashboard/others` | Full, Partial(employmentAuthorization) | — | perm: isI9EverifyAdmin \|\| i9EverifyNonFullAdminAccessLevel.i9 | — | — | — | `rippling-webapp/app/products/hr/EmploymentAuthorization/components/employmentAuthorizationRoot/EmploymentAuthRoot.tsx:110` |
| E-Verify | `/employment-authorization/everify-dashboard` | Full, Partial(employmentAuthorization) | — | perm: isI9EverifyAdmin \|\| i9EverifyNonFullAdminAccessLevel.everify | — | — | — | `rippling-webapp/app/products/hr/EmploymentAuthorization/components/employmentAuthorizationRoot/EmploymentAuthRoot.tsx:239` |
| Pending Submission | `/employment-authorization/everify-dashboard/pending-submission` | Full, Partial(employmentAuthorization) | — | perm: isI9EverifyAdmin \|\| i9EverifyNonFullAdminAccessLevel.everify | — | — | — | `rippling-webapp/app/products/hr/EmploymentAuthorization/components/employmentAuthorizationRoot/EmploymentAuthRoot.tsx:135` |
| Action Required | `/employment-authorization/everify-dashboard/action-required` | Full, Partial(employmentAuthorization) | — | perm: isI9EverifyAdmin \|\| i9EverifyNonFullAdminAccessLevel.everify | — | — | — | `rippling-webapp/app/products/hr/EmploymentAuthorization/components/employmentAuthorizationRoot/EmploymentAuthRoot.tsx:146` |
| Completed | `/employment-authorization/everify-dashboard/completed` | Full, Partial(employmentAuthorization) | — | perm: isI9EverifyAdmin \|\| i9EverifyNonFullAdminAccessLevel.everify | — | — | — | `rippling-webapp/app/products/hr/EmploymentAuthorization/components/employmentAuthorizationRoot/EmploymentAuthRoot.tsx:157` |
| Global Work Authorization | `/employment-authorization/international-employment-authorization` | Full, Partial(employmentAuthorization) | — | perm: canReviewWorkAuthRequests; isCAFlowEnabled (EOR flow) | — | — | — | `rippling-webapp/app/products/hr/EmploymentAuthorization/components/employmentAuthorizationRoot/EmploymentAuthRoot.tsx:252` |
| Settings | `/employment-authorization/settings` | Full, Partial(employmentAuthorization) | — | perm: accessLevel.settings in [READ_WRITE, READ_ONLY] \|\| canViewOrEditGlobalWorkAuthSettings | — | — | — | `rippling-webapp/app/products/hr/EmploymentAuthorization/components/employmentAuthorizationRoot/EmploymentAuthRoot.tsx:263` |

### Documents  `documents`

8 nodes · path `/documents` · gate `—`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| People | `/documents/ee-document-dashboard` | Full, Partial(documents), Mgr, EE | — | entry point — visible to all | — | — | — | `rippling-webapp/app/products/hr/Hris/Documents/utils/documentRouteUtils.ts:88` |
| Templates | `/documents/document-dashboard` | Full, Partial(documents) | — | perm: ADMIN_PERMISSION_FOR_DOCUMENTS_DASHBOARD \|\| READ_PERMISSION_FOR_DOCUMENTS_DASHBOARD | — | — | — | `rippling-webapp/app/products/hr/Hris/Documents/utils/documentRouteUtils.ts:94` |
| Profile Folders | `/documents/profile-folders/list` | Full, Partial(documents) | — | tabVisibility.PROFILE_FOLDERS | — | — | — | `rippling-webapp/app/products/hr/Hris/Documents/utils/documentRouteUtils.ts:99` |
| Rules | `/documents/workflows` | Full, Partial(documents) | — | perm: ADMIN_PERMISSION_FOR_DOCUMENTS_DASHBOARD | — | — | — | `rippling-webapp/app/products/hr/Hris/Documents/utils/documentRouteUtils.ts:104` |
| Workplace Posters | `/documents/workplace-posters` | Full, Partial(documents) | — | perm: admin.hasAdminPrivileges; isPeoClient \|\| isAsoClient | — | — | — | `rippling-webapp/app/products/hr/Hris/Documents/utils/documentRouteUtils.ts:112` |
| Bulk Upload | `/documents/bulk-document-upload` | Full, Partial(documents) | — | perm: DOCUMENT_OPERATOR_PERMISSION_FOR_DOCUMENTS_DASHBOARD | — | — | — | `rippling-webapp/app/products/hr/Hris/Documents/utils/documentRouteUtils.ts:119` |
| Export | `/documents/export-dashboard` | Full, Partial(documents) | — | perm: DOCUMENT_OPERATOR_PERMISSION_FOR_DOCUMENTS_DASHBOARD; isDocumentExportEnabled (company churning, within 30d after churn) | — | — | — | `rippling-webapp/app/products/hr/Hris/Documents/utils/documentRouteUtils.ts:83` |
| Settings | `/documents/company-document-settings` | Full, Partial(documents) | — | perm: ADMIN_PERMISSION_FOR_DOCUMENTS_DASHBOARD | — | — | — | `rippling-webapp/app/products/hr/Hris/Documents/utils/documentRouteUtils.ts:124` |

### Leaves  `leaves`

4 nodes · path `/leaves` · gate `LEAVES`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Leaves | `/pto/leaves` | Full, Partial(pto, leaves), Mgr | `LEAVES` | isAdmin \|\| isManager; canViewLeaves (TIME_OFF_FEATURE_KEYS_LEAVES) | — | — | — | `rippling-webapp/app/products/hr/Pto/containers/leaves/Leaves.tsx:12` |
| On Leave | `/pto/leaves#on-leave` | Full, Partial(pto, leaves), Mgr | `LEAVES` | — | — | — | — | `rippling-webapp/app/products/hr/Pto/containers/leaves/Leaves.tsx:23` |
| Upcoming Leaves | `/pto/leaves#upcoming` | Full, Partial(pto, leaves), Mgr | `LEAVES` | — | — | — | — | `rippling-webapp/app/products/hr/Pto/containers/leaves/Leaves.tsx:30` |
| Past Leaves | `/pto/leaves#past` | Full, Partial(pto, leaves), Mgr | `LEAVES` | — | — | — | — | `rippling-webapp/app/products/hr/Pto/containers/leaves/Leaves.tsx:37` |

### Time Off  `pto`

8 nodes · path `/time-off` · gate `PTO`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Team Overview | `/pto/overview` | Full, Partial(pto), Mgr | `PTO` | isAdmin \|\| isManager | — | — | — | `rippling-webapp/app/products/hr/Pto/containers/employee.tsx:106` |
| My Overview | `/pto/employee-overview` | Full, Partial(pto), Mgr, EE | `PTO` | — | — | — | — | `rippling-webapp/app/products/hr/Pto/containers/employee.tsx:111` |
| Calendar | `/pto/calendar` | Full, Partial(pto), Mgr, EE | `PTO` | — | — | — | — | `rippling-webapp/app/products/hr/Pto/containers/employee.tsx:121` |
| Approvals | `/pto/approvals-dashboard` | Full, Partial(pto), Mgr, EE | `PTO` | — | — | — | — | `rippling-webapp/app/products/hr/Pto/containers/employee.tsx:124` |
| Leaves | `/pto/leaves` | Full, Partial(pto), Mgr | `PTO` | isAdmin \|\| isManager | — | — | — | `rippling-webapp/app/products/hr/Pto/containers/employee.tsx:135` |
| Balances | `/pto/balances` | Full, Partial(pto) | `PTO` | isAdmin && hasCompanyLeaveTypes | — | — | — | `rippling-webapp/app/products/hr/Pto/containers/employee.tsx:142` |
| Policies | `/pto/policy-list` | Full, Partial(pto) | `PTO` | perm: canManagePtoSettings | — | — | — | `rippling-webapp/app/products/hr/Pto/containers/employee.tsx:146` |
| Settings | `/pto/settings` | Full, Partial(pto), Mgr, EE | `PTO` | — | — | — | — | `rippling-webapp/app/products/hr/Pto/containers/employee.tsx:149` |

### HR Services  `hr-services`

_No internal nav._ 'HR Services' is the customer-facing rebrand of ASO (Administrative Services Organization). See app/products/hr/Peo/utils/asoRebrandingUtils.ts and app/products/hr/Peo/constants.ts:355.

### HR Help Desk  `hr-helpdesk`

_No internal nav._ HR Help Desk (HR360 / ThinkHR) is an external SaaS app accessed via SSO, not a Rippling-internal multi-page surface.

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

