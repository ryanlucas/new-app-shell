# Platform  `platform` *[touched: renameSuite, mergeSuite]*

**Suite visibility:** Full, Partial, Mgr, EE  
**Product gate:** —  
**Cross-sell:** locked → full, partial · SidenavTools  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:53-62`

## Apps (17)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Inbox | `/inbox` | Full, Partial, Mgr, EE | `INBOX` | — | locked → — | — | — | `app/hub/spoke_models.py:845` |
| Search | `/search` | Full, Partial, Mgr, EE | `UNIVERSAL_SEARCH` | — | locked → — | — | — | `app/hub/spoke_models.py:844` |
| Notifications | `/notifications` | Full, Partial, Mgr, EE | `NOTIFICATION_CENTER` | — | locked → — | — | — | `app/hub/spoke_models.py:837` |
| Meetings | `/meetings` | Full, Partial, Mgr, EE | `MEETINGS` | — | locked → — | — | — | `app/hub/spoke_models.py:843` |
| Alerts | `/alerts` | Full, Partial | `ALERTS` | — | locked → — | — | — | `app/hub/spoke_models.py:781` |
| Workflows | `/workflows` | Full, Partial(workflows_admin) | `WORKFLOWS_UTIL` | — | locked → — | — | — | `app/hub/spoke_models.py:782` |
| Approvals | `/approvals` | Full, Partial, Mgr | `CONDITIONAL_APPROVALS` | — | locked → — | — | — | `app/hub/spoke_models.py:783` |
| Rippling AI | `/ai` | Full, Partial, Mgr, EE | `RIPPLING_INTELLIGENCE` | — | locked → — | — | — | `app/hub/spoke_models.py:879` |
| Company Settings *[mergeSuite]*| `/company-settings` | Full, Partial(settings_admin) | — | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:429` |
| Permissions *[mergeSuite]*| `/permissions/overview` | Full, Partial(permissions_admin) | — | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:165` |
| Field Management *[mergeSuite]*| `/field-management` | Full, Partial(settings_admin) | — | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:419` |
| Organizational Data *[mergeSuite]*| `/company-details` | Full, Partial(settings_admin) | — | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:355` |
| Developer *[mergeSuite]*| `/developer` | Full, Partial(developer_admin) | `DEVELOPER` | — | locked → — | — | — | `app/hub/spoke_models.py:846` |
| API Tokens *[mergeSuite]*| `/api-tokens` | Full, Partial(developer_admin) | `API_TOKENS` | — | locked → — | — | — | `app/hub/spoke_models.py:740` |
| Audit Log *[mergeSuite]*| `/audit-log` | Full, Partial(audit_admin) | `ACTIVITY_LOG` | — | locked → — | — | — | `app/hub/spoke_models.py:808` |
| User Management *[moveApp, overrideNode]*| `/user-management` | Full, Partial | — | — | — | — | — | `app/hub/spoke_models.py:880` |
| Directory *[addApp]*| `/directory` | Full, Partial, Mgr, EE | — | — | — | — | — | `proposal:ryan-v1` |

## App L3 internal navigation

### Inbox  `inbox`

2 nodes · path `/inbox` · gate `INBOX`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Pending | `/inbox/dashboard/tasks/pending` | Full, Partial, Mgr, EE | `INBOX` | — | — | — | — | `app/products/platform/HubPlatform/modules/Inbox/containers/inboxDashboard/InboxDashboard.tsx:20` |
| Resolved | `/inbox/dashboard/tasks/resolved` | Full, Partial, Mgr, EE | `INBOX` | — | — | — | — | `app/products/platform/HubPlatform/modules/Inbox/containers/inboxDashboard/InboxDashboard.tsx:24` |

### Search  `universal-search`

_No internal nav._ Universal Search is primarily a global flyout/launcher invoked from the top bar — not a destination with its own L3 nav.

### Notifications  `notification-center`

1 nodes · path `/notifications` · gate `NOTIFICATION_CENTER`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Alerts | `/notification-center/dashboard/alerts` | Full, Partial, Mgr, EE | `NOTIFICATION_CENTER` | — | — | — | — | `app/products/platform/HubPlatform/modules/NotificationCenter/containers/notificationCenterDashboard/NotificationCenterDashboard.tsx:18` |

### Meetings  `meetings`

1 nodes · path `/meetings` · gate `MEETINGS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Recordings | `/meetings/recordings` | Full, Partial, Mgr, EE | `MEETINGS` | — | — | — | — | `app/products/sales/Meetings/containers/AppDashboard.tsx:22` |

### Alerts  `alerts`

4 nodes · path `/alerts` · gate `ALERTS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/custom-workflows/dashboard/legacy/overview` | Full, Partial(alerts), Mgr, EE | `ALERTS` | — | — | — | — | `app/products/platform/HubPlatform/modules/CustomAlerts/containers/alertDashboard/AlertDashboard.helpers.ts:62` |
| Events | `/custom-workflows/dashboard/legacy/events` | Full, Partial(alerts) | `ALERTS` | perm: isFullAdmin \|\| isPartialAdmin \|\| isPartner | — | — | — | `app/products/platform/HubPlatform/modules/CustomAlerts/containers/alertDashboard/AlertDashboard.helpers.ts:73` |
| Actions | `/custom-workflows/dashboard/legacy/actions` | Full, Partial(alerts) | `ALERTS` | perm: isFullAdmin \|\| isPartialAdmin \|\| isPartner | — | — | — | `app/products/platform/HubPlatform/modules/CustomAlerts/containers/alertDashboard/AlertDashboard.helpers.ts:77` |
| Tags | `/custom-workflows/dashboard/legacy/tags` | Full, Partial(alerts) | `ALERTS` | isTagsEnabled | — | — | — | `app/products/platform/HubPlatform/modules/CustomAlerts/containers/alertDashboard/AlertDashboard.helpers.ts:83` |

### Workflows  `workflows`

5 nodes · path `/workflows` · gate `WORKFLOWS_UTIL`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Dashboard | `/custom-workflows/dashboard/dashboardv2` | Full, Partial(workflows), Mgr, EE | `WORKFLOWS_UTIL` | — | — | ee: My Workflows; manager: My Workflows | — | `app/products/platform/HubPlatform/modules/CustomAlerts/containers/alertDashboard/AlertDashboard.helpers.ts:28` |
| My Workflows | `/custom-workflows/dashboard/dashboardv2/my-workflows` | Full | `WORKFLOWS_UTIL` | perm: isFullAdmin | — | — | — | `app/products/platform/HubPlatform/modules/CustomAlerts/containers/alertDashboard/AlertDashboard.helpers.ts:34` |
| All Workflows | `/custom-workflows/dashboard/dashboardv2/all-workflows` | Full | `WORKFLOWS_UTIL` | perm: isFullAdmin | — | — | — | `app/products/platform/HubPlatform/modules/CustomAlerts/containers/alertDashboard/AlertDashboard.helpers.ts:38` |
| Analytics | `/custom-workflows/dashboard/analytics` | Full, Partial(workflows) | `WORKFLOWS_UTIL` | isAnalyticsEnabled | — | — | — | `app/products/platform/HubPlatform/modules/CustomAlerts/containers/alertDashboard/AlertDashboard.helpers.ts:45` |
| Tags | `/custom-workflows/dashboard/tagsv2` | Full, Partial(workflows) | `WORKFLOWS_UTIL` | isTagsEnabled; FF:isV2TagsTabEnabled | — | — | — | `app/products/platform/HubPlatform/modules/CustomAlerts/containers/alertDashboard/AlertDashboard.helpers.ts:52` |

### Approvals  `approvals`

6 nodes · path `/approvals` · gate `CONDITIONAL_APPROVALS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Needs my review | `/approvals/dashboard/need-my-review` | Full, Partial, Mgr, EE | `CONDITIONAL_APPROVALS` | — | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/ApprovalPolicy/containers/approvalsDashboard/hooks/useGetApprovalsLinks.tsx:71` |
| My requests | `/approvals/dashboard/my-requests` | Full, Partial, Mgr, EE | `CONDITIONAL_APPROVALS` | — | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/ApprovalPolicy/containers/approvalsDashboard/hooks/useGetApprovalsLinks.tsx:80` |
| Reviewed | `/approvals/dashboard/reviewed` | Full, Partial, Mgr, EE | `CONDITIONAL_APPROVALS` | — | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/ApprovalPolicy/containers/approvalsDashboard/hooks/useGetApprovalsLinks.tsx:86` |
| All requests | `/approvals/dashboard/all-requests` | Full, Partial, Mgr | `CONDITIONAL_APPROVALS` | — | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/ApprovalPolicy/containers/approvalsDashboard/hooks/useGetApprovalsLinks.tsx:92` |
| Approval policies | `/approvals/dashboard/policies` | Full, Partial(permissions) | `CONDITIONAL_APPROVALS` | company has at least one approval policy (shouldShowPoliciesTab) | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/ApprovalPolicy/containers/approvalsDashboard/hooks/useGetApprovalsLinks.tsx:98` |
| Templates | `/approvals/templates/select` | Full | `CONDITIONAL_APPROVALS` | withSuperAdmin guard | — | — | — | `rippling-webapp/app/products/platform/HubPlatform/modules/ApprovalPolicy/routes/approvals.routes.tsx:191` |

### Rippling AI  `rippling-intelligence`

3 nodes · path `/ai` · gate `RIPPLING_INTELLIGENCE`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Policy hub | `/ai/settings/policy-hub` | Full, Partial(rippling_intelligence_admin) | `RIPPLING_INTELLIGENCE` | — | — | — | — | `rippling-webapp/app/products/service/AIAssistant/routes/routes.tsx:94` |
| Permissions | `/ai/settings/permissions` | Full, Partial(rippling_intelligence_admin) | `RIPPLING_INTELLIGENCE` | — | — | — | — | `rippling-webapp/app/products/service/AIAssistant/routes/routes.tsx:95` |
| Usage | `/ai/settings/usage/overview` | Full, Partial(rippling_intelligence_admin) | `RIPPLING_INTELLIGENCE` | — | — | — | — | `rippling-webapp/app/products/service/AIAssistant/routes/routes.tsx:97` |

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

### User Management  `user-management`

_No internal nav._ User Management is registered as an RPK app via UserManagementAppInterface (rippling-main: app/user_management/rpk/app.py) with installation_url and dashboard_url both '/user-management'. Gated by FEATURE_FLAG_USER_MANAGEMENT_APP_ENABLED.

### Directory  `directory`

_No L3 file in catalog._

