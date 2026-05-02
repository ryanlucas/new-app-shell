# Settings  `settings`

**Suite visibility:** Full, Partial(settings_admin)  
**Product gate:** —  
**Cross-sell:** locked → — · SidenavSettings  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:136-146`

## Apps (7)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Company Settings | `/company-settings` | Full, Partial(settings_admin) | — | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:429` |
| Permissions | `/permissions/overview` | Full, Partial(permissions_admin) | — | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:165` |
| Field Management | `/field-management` | Full, Partial(settings_admin) | — | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:419` |
| Organizational Data | `/company-details` | Full, Partial(settings_admin) | — | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:355` |
| Developer | `/developer` | Full, Partial(developer_admin) | `DEVELOPER` | — | locked → — | — | — | `app/hub/spoke_models.py:846` |
| API Tokens | `/api-tokens` | Full, Partial(developer_admin) | `API_TOKENS` | — | locked → — | — | — | `app/hub/spoke_models.py:740` |
| Audit Log | `/audit-log` | Full, Partial(audit_admin) | `ACTIVITY_LOG` | — | locked → — | — | — | `app/hub/spoke_models.py:808` |

## App L3 internal navigation

### Company Settings  `company-settings`

11 nodes · path `/company-settings` · gate `—`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Info collected | `/company-settings/info-collected` | Full | — | !isStandaloneCompany && !flowConfigurationAppVisible | — | — | — | `rippling-webapp/app/products/hr/Hub/containers/companySettings/CompanySettings.hooks.ts:45` |
| Notifications | `/company-settings/notifications` | Full, Partial(company_notification_settings_admin) | — | — | — | — | — | `rippling-webapp/app/products/hr/Hub/containers/companySettings/CompanySettings.hooks.ts:55` |
| Billing | `/company-settings/billing` | Full, Partial(billing_admin) | — | — | — | — | — | `rippling-webapp/app/products/hr/Hub/containers/companySettings/CompanySettings.hooks.ts:60` |
| Audit logs | `/company-settings/audit-logs` | Full, Partial(audit_log_admin) | — | perm: canAccessAuditLogs | — | — | — | `rippling-webapp/app/products/hr/Hub/containers/companySettings/CompanySettings.hooks.ts:64` |
| Branding | `/company-settings/branding` | Full | — | perm: hasCustomCompanyLogoAccess | — | — | — | `rippling-webapp/app/products/hr/Hub/containers/companySettings/CompanySettings.hooks.ts:72` |
| Security | `/company-settings/security` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hub/containers/companySettings/CompanySettings.hooks.ts:80` |
| API access | `/company-settings/api-access` | Full | — | perm: manage_api_keys | — | — | — | `rippling-webapp/app/products/hr/Hub/containers/companySettings/CompanySettings.hooks.ts:84` |
| Payment methods | `/company-settings/payment-methods` | Full, Partial(billing_admin) | — | — | — | — | — | `rippling-webapp/app/products/hr/Hub/containers/companySettings/CompanySettings.hooks.ts:92` |
| Risk verification | `/company-settings/risk-verification` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hub/containers/companySettings/CompanySettings.hooks.ts:96` |
| App shop | `/company-settings/app-shop` | Full | — | — | — | — | — | `rippling-webapp/app/products/hr/Hub/containers/companySettings/CompanySettings.hooks.ts:100` |
| Data import | `/company-settings/employee-census-resume` | Full | — | showPeopleCensus | — | — | — | `rippling-webapp/app/products/hr/Hub/containers/companySettings/CompanySettings.hooks.ts:136` |

### Permissions  `permissions`

4 nodes · path `/permissions/overview` · gate `—`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Permission overview | `/permissions/overview` | Full, Partial(permissions) | — | perm: can_view_permission_profiles | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/Permissions/components/dashboard/PermissionDashboard.helpers.ts:10` |
| Feature access | `/permissions/feature-access` | Full, Partial(permissions) | — | perm: can_view_default_feature_access | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/Permissions/components/dashboard/PermissionDashboard.helpers.ts:28` |
| Users overview | `/permissions/user-dashboard` | Full, Partial(permissions) | — | perm: can_view_user_permission_profiles | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/Permissions/components/dashboard/PermissionDashboard.helpers.ts:35` |
| Admins to migrate | `/permissions/admins-to-migrate` | Full | — | perm: can_view_admins_to_migrate | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/Permissions/components/dashboard/PermissionDashboard.helpers.ts:42` |

### Field Management  `field-management`

2 nodes · path `/field-management` · gate `—`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| All fields | `/data-manager/field-selector` | Full, Partial(data_manager) | — | perm: DataManagerPermission | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/FieldsManager/containers/fieldManagerDashboard/FieldManagerDashboard.helpers.ts:7` |
| Data collected | `/data-manager/data-collected` | Full, Partial(data_manager) | — | perm: DataManagerPermission | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/FieldsManager/containers/fieldManagerDashboard/FieldManagerDashboard.helpers.ts:11` |

### Organizational Data  `company-details`

17 nodes · path `/company-details` · gate `—`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Information | `/company-details/information` | Full | — | perm: INFORMATION | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:53` |
| Work emails | `/company-details/work-emails` | Full | — | perm: WORK_EMAIL_DOMAINS; isWorkEmailPolicyHiringFlowEnabled | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:64` |
| Domains | `/company-details/work-emails/domains` | Full | — | perm: WORK_EMAIL_DOMAINS; isWorkEmailPolicyHiringFlowEnabled | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:84` |
| Policies | `/company-details/work-emails/policies` | Full | — | perm: WORK_EMAIL_POLICIES; isWorkEmailPolicyHiringFlowEnabled | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:93` |
| Work locations | `/company-details/work-locations` | Full | — | perm: WORK_LOCATION | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:117` |
| Departments | `/company-details/departments` | Full | — | perm: DEPARTMENTS | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:134` |
| Teams | `/company-details/teams` | Full | — | perm: TEAMS | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:151` |
| Entities | `/company-details/entities` | Full | — | perm: ENTITIES; isEorCaFlowEnabled | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:158` |
| Levels | `/company-details/levels` | Full | — | perm: LEVELS | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:178` |
| Titles | `/company-details/titles` | Full | — | perm: TITLES | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:195` |
| Custom org attributes | `/company-details/job-dimensions` | Full | — | perm: JOBS | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:202` |
| Business structure | `/company-details/business-structure` | Full | — | perm: BUSINESS_STRUCTURE; isBusinessStructureFlagEnabled | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:209` |
| Job templates | `/company-details/job-templates` | Full | — | perm: JOB_TEMPLATES | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:222` |
| Pay rates | `/company-details/pay-rates` | Full, Partial(pay_rates) | — | isPayRatesAndPieceRatesEnabled | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:232` |
| Business partners | `/company-details/business-partner` | Full, Partial(business_partner) | — | perm: BUSINESS_PARTNER; isBusinessPartnersEnabled | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:242` |
| Employment types | `/company-details/company-employment-types` | Full | — | perm: EMPLOYMENT_TYPES | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:253` |
| Termination reasons | `/company-details/termination-reasons` | Full | — | perm: TERMINATION_REASON | — | — | — | `rippling-webapp/app/products/hr/Hris/Org/containers/companyDetails/hooks/useCompanyDetailsNavConfig.ts:272` |

### Developer  `developer`

5 nodes · path `/developer` · gate `DEVELOPER`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Functions | `/developer/functions` | Full, Partial(developer) | `DEVELOPER` | isFunctionsEnabled (SKU) | — | — | — | `rippling-webapp/app/products/platform/Developer/modules/functions/routes/navbar.routes.tsx:8` |
| Settings manager | `/developer/settings` | Full, Partial(developer) | `DEVELOPER` | isSettingsManagerEnabled (SKU) | — | — | — | `rippling-webapp/app/products/platform/Developer/modules/settingsManager/routes/navbar.routes.tsx:9` |
| Webhooks | `/developer/webhooks` | Full, Partial(developer) | `DEVELOPER` | isWebhooksEnabled (SKU) | — | — | — | `rippling-webapp/app/products/platform/Developer/modules/webhooks/routes/navbar.route.tsx:9` |
| API tokens | `/developer/api-tokens` | Full, Partial(api_tokens_full_admin) | `DEVELOPER` | isDeveloperAPITokensEnabled | — | — | — | `rippling-webapp/app/products/it/Apps/modules/ApiTokens/routes/developerApiTokensNavbar.routes.tsx:7` |
| Packages | `/developer/packages` | Full, Partial(developer) | `DEVELOPER` | isPackageBuilderEnabled \|\| isPackageInstallationEnabled | — | — | — | `rippling-webapp/app/products/platform/Developer/modules/packages/routes/navbar.routes.tsx:5` |

### API Tokens  `api-tokens`

2 nodes · path `/api-tokens` · gate `API_TOKENS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| API tokens | `/api-tokens/tokens` | Full, Partial(api_tokens_full_admin) | `API_TOKENS` | perm: api_tokens_full_admin (READ) | — | — | — | `rippling-webapp/app/products/it/Apps/modules/ApiTokens/components/APITokensAppNavBar/APITokensAppNavBar.constants.ts:11` |
| Settings | `/api-tokens/settings` | Full | `API_TOKENS` | perm: is_full_admin | — | — | — | `rippling-webapp/app/products/it/Apps/modules/ApiTokens/components/APITokensAppNavBar/APITokensAppNavBar.constants.ts:12` |

### Audit Log  `audit-log`

_No internal nav._ Audit Log has no dedicated app shell — it is a single-page form mounted at /company-settings/audit-logs that submits an async export request (date range, users, entity types). There is no internal nav (no Recent activity / Filters / Saved Views / Exports tabs in the current implementation).

