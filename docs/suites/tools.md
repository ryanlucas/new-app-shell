# Tools  `tools`

**Suite visibility:** Full, Partial, Mgr, EE  
**Product gate:** —  
**Cross-sell:** locked → full, partial · SidenavTools  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:53-62`

## Apps (8)

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

