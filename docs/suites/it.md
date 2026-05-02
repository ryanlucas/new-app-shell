# IT  `it`

**Suite visibility:** Full, Partial(it_admin), EE  
**Product gate:** `IT_MANAGEMENT`  
**Cross-sell:** locked → full, partial · SidenavITManagement  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:97-107`

## Apps (12)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| IT Overview | `/it/overview` | Full, Partial(it_admin) | `IT_MANAGEMENT` | — | locked → full, partial · SidenavITManagement | — | — | `app/apps/utils/dummy_apps.py:481` |
| My IT | `/it/my-it` | Mgr, EE | `IT_MANAGEMENT` | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:363` |
| IT Management | `/it/it-people` | Full, Partial(it_admin) | `IT_MANAGEMENT` | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:493` |
| Devices | `/it/devices` | Full, Partial(it_admin) | `HARDWARE` | — | locked → full, partial · SidenavITManagement | — | — | `app/cross_sell/unpurchased_sku/unpurchased_sku_nav_items.py:304` |
| Device Store | `/it/device-store` | Full, Partial(it_admin), EE | `HARDWARE` | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:502` |
| Inventory | `/it/inventory-management` | Full, Partial(it_admin) | `HARDWARE` | — | locked → full, partial · SidenavITManagement | — | — | `app/cross_sell/unpurchased_sku/unpurchased_sku_nav_items.py:294` |
| App Management | `/it/app-management` | Full, Partial(it_admin) | `APP_MANAGER` | — | locked → full, partial · SidenavITManagement | — | — | `app/hub/spoke_models.py:820` |
| IT Automations | `/it/automations` | Full, Partial(it_admin) | `IT_AUTOMATIONS` | — | locked → — | — | — | `app/hub/spoke_models.py:876` |
| Approvals | `/it/approvals` | Full, Partial(it_admin), Mgr | `IT_MANAGEMENT` | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:361` |
| Access Reviews | `/it/third-party-access/access-reviews` | Full, Partial(it_admin) | `ACCESS_REVIEWS` | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:375` |
| Security Monitoring | `/it/security-monitoring` | Full, Partial(it_admin) | `SECURITY_MONITORING` | — | locked → — | — | — | `app/hub/spoke_models.py:831` |
| Apps | `/it/apps` | Full, Partial(it_admin) | `INTEGRATIONS` | — | locked → full, partial · SidenavITManagement | — | — | `app/hub/spoke_models.py:811` |

## App L3 internal navigation

### IT Overview  `it-overview`

10 nodes · path `/it/overview` · gate `IT_MANAGEMENT`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/it/overview` | Full, Partial(it_home_full_admin, hardware_admin, app_admin) | `IT_MANAGEMENT` | — | — | — | — | `app/products/it/IT/routes/it.routes.tsx:184` |
| People | `/it/it-people` | Full, Partial(it_home_full_admin, hardware_admin, app_admin) | `IT_MANAGEMENT` | — | — | — | — | `app/products/it/IT/routes/it.routes.tsx:194` |
| Integrations | `/it/integrations` | Full, Partial(app_admin) | `INTEGRATIONS` | — | — | — | — | `app/products/it/IT/routes/it.routes.tsx:204` |
| Third-Party Access | `/it/third-party-access` | Full, Partial(app_admin) | `INTEGRATIONS` | — | — | — | — | `app/products/it/IT/routes/it.routes.tsx:218` |
| Devices | `/it/hardware` | Full, Partial(hardware_admin) | `HARDWARE` | — | — | — | — | `app/products/it/IT/routes/it.routes.tsx:265` |
| RPass | `/it/rpass` | Full, Partial(app_admin) | `RPASS` | — | — | — | — | `app/products/it/IT/routes/it.routes.tsx:371` |
| Device Store | `/it/device-store` | Full, Partial(hardware_admin) | `HARDWARE` | — | — | — | — | `app/products/it/IT/routes/it.routes.tsx:373` |
| Approvals | `/it/approvals` | Full, Partial(it_home_full_admin, hardware_admin, app_admin) | `IT_MANAGEMENT` | — | — | — | — | `app/products/it/IT/routes/it.routes.tsx:439` |
| Automations | `/it/automations` | Full, Partial(it_home_full_admin) | `IT_AUTOMATIONS` | — | — | — | — | `app/products/it/IT/routes/it.routes.tsx:455` |
| My IT | `/it/my-it` | Full, Partial, EE | `IT_MANAGEMENT` | — | — | — | — | `app/products/it/IT/routes/it.routes.tsx:472` |

### My IT  `my-it`

1 nodes · path `/it/my-it` · gate `IT_MANAGEMENT`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Third-Party Apps | `/it/my-it/third-party-apps` | Full, Partial, Mgr, EE | `IT_MANAGEMENT` | — | — | — | — | `app/products/it/IT/modules/helpDesk/HelpDeskNavBar.tsx:18` |

### IT Management  `it-management-people`

6 nodes · path `/it/it-people` · gate `IT_MANAGEMENT`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/it-management/overview` | Full, Partial(it_home_full_admin) | `IT_MANAGEMENT` | — | — | — | — | `app/products/it/ITManagement/containers/ITManagementNavBar/ITManagementNavBar.tsx:67` |
| People | `/it-management/people` | Full, Partial(it_home_full_admin, hardware_admin, app_admin) | `IT_MANAGEMENT` | — | — | — | — | `app/products/it/ITManagement/containers/ITManagementNavBar/ITManagementNavBar.tsx:71` |
| Requests | `/it-management/requests` | Full, Partial(it_home_full_admin, hardware_admin, app_admin) | `IT_MANAGEMENT` | — | — | — | — | `app/products/it/ITManagement/containers/ITManagementNavBar/ITManagementNavBar.tsx:75` |
| Tasks | `/it-management/tasks` | Full, Partial(it_home_full_admin, hardware_admin) | `IT_MANAGEMENT` | isITHomeFullAdmin \|\| isITHomeDeviceManager | — | — | — | `app/products/it/ITManagement/containers/ITManagementNavBar/ITManagementNavBar.tsx:82` |
| Activity Logs | `/it-management/activity-logs` | Full, Partial(it_home_full_admin, hardware_admin, app_admin) | `IT_MANAGEMENT` | — | — | — | — | `app/products/it/ITManagement/containers/ITManagementNavBar/ITManagementNavBar.tsx:93` |
| Policies | `/it-management/policies` | Full, Partial(it_home_full_admin) | `IT_MANAGEMENT` | — | — | — | — | `app/products/it/ITManagement/containers/ITManagementNavBar/ITManagementNavBar.tsx:97` |

### Devices  `device-management`

13 nodes · path `/it/devices` · gate `HARDWARE`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/it/hardware/overview` | Full, Partial(hardware_admin) | `HARDWARE` | — | — | — | — | `app/products/it/IT/containers/ITNavBar/DevicesNavBar.tsx:128` |
| Devices | `/it/hardware/devices` | Full, Partial(hardware_admin), EE | `HARDWARE` | — | — | ee:  (/it/hardware/employee/devices) | — | `app/products/it/IT/containers/ITNavBar/DevicesNavBar.tsx:132` |
| People | `/it/hardware/people` | Full, Partial(hardware_admin) | `HARDWARE` | — | — | — | — | `app/products/it/IT/containers/ITNavBar/DevicesNavBar.tsx:136` |
| Orders | `/it/hardware/orders` | Full, Partial(hardware_admin), EE | `HARDWARE` | — | — | ee:  (/it/hardware/employee/orders) | — | `app/products/it/IT/containers/ITNavBar/DevicesNavBar.tsx:140` |
| Policies | `/it/hardware/configurations` | Full, Partial(hardware_admin) | `HARDWARE` | fullDeviceManagementTier | — | — | — | `app/products/it/IT/containers/ITNavBar/DevicesNavBar.tsx:144` |
| Software | `/it/hardware/software` | Full, Partial(hardware_admin) | `HARDWARE` | fullDeviceManagementTier | — | — | — | `app/products/it/IT/containers/ITNavBar/DevicesNavBar.tsx:150` |
| My Software | `/it/hardware/software/deployed` | Full, Partial(hardware_admin) | `HARDWARE` | fullDeviceManagementTier | — | — | — | `app/products/it/IT/containers/ITNavBar/DevicesNavBar.tsx:156` |
| Software Library | `/it/hardware/software/library` | Full, Partial(hardware_admin) | `HARDWARE` | fullDeviceManagementTier | — | — | — | `app/products/it/IT/containers/ITNavBar/DevicesNavBar.tsx:162` |
| Threats | `/it/hardware/threats` | Full, Partial(hardware_admin) | `HARDWARE` | fullDeviceManagementTier | — | — | — | `app/products/it/IT/containers/ITNavBar/DevicesNavBar.tsx:170` |
| Updates | `/it/hardware/updates` | Full, Partial(hardware_admin) | `HARDWARE` | fullDeviceManagementTier | — | — | — | `app/products/it/IT/containers/ITNavBar/DevicesNavBar.tsx:176` |
| Scripts | `/it/hardware/scripts` | Full, Partial(hardware_admin) | `HARDWARE` | fullDeviceManagementTier | — | — | — | `app/products/it/IT/containers/ITNavBar/DevicesNavBar.tsx:181` |
| Activity | `/it/hardware/activity` | Full, Partial(hardware_admin) | `HARDWARE` | — | — | — | — | `app/products/it/IT/containers/ITNavBar/DevicesNavBar.tsx:186` |
| Settings | `/it/hardware/settings` | Full, Partial(hardware_admin) | `HARDWARE` | — | — | — | — | `app/products/it/IT/containers/ITNavBar/DevicesNavBar.tsx:190` |

### Device Store  `device-store`

3 nodes · path `/it/device-store` · gate `HARDWARE`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Approved Devices | `/it/device-store/approved` | Full, Partial(hardware_admin) | `HARDWARE` | — | — | — | — | `app/products/it/InventoryManagement/containers/deviceStoreV2/DeviceStoreV2.tsx:202` |
| Catalog | `/it/device-store/catalog` | Full, Partial(hardware_admin) | `HARDWARE` | — | — | — | — | `app/products/it/InventoryManagement/containers/deviceStoreV2/DeviceStoreV2.tsx:206` |
| Settings | `/it/device-store/settings` | Full, Partial(hardware_admin) | `HARDWARE` | isGlobalExpansionEnabled | — | — | — | `app/products/it/InventoryManagement/containers/deviceStoreV2/DeviceStoreV2.tsx:212` |

### Inventory  `inventory-management`

_No internal nav._ Inventory Management is not a standalone tabbed product surface — it is composed of flows (assign / unassign / archive / send-to-warehouse / orders) and contributes the People/Devices/Orders tabs to the Devices nav. Use Devices (device-management) nav for tabbed view; the routes here are the InventoryManagement-specific flow entry points.

### App Management  `app-management`

5 nodes · path `/it/app-management` · gate `APP_MANAGER`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/it/integrations/overview` | Full, Partial(app_admin) | `INTEGRATIONS` | — | — | — | — | `app/products/it/Apps/modules/Integrations/Containers/IntegrationDashboard/IntegrationDashboard.constants.ts:35` |
| Connections | `/it/integrations/connections` | Full, Partial(app_admin) | `INTEGRATIONS` | isFluxFFEnabled | — | — | — | `app/products/it/Apps/modules/Integrations/Containers/IntegrationDashboard/IntegrationDashboard.constants.ts:48` |
| Access Reviews | `/it/integrations/access-reviews` | Full, Partial(app_admin) | `ACCESS_REVIEWS` | accessReviewTabVisibility.access_review_tab_visible | — | — | — | `app/products/it/Apps/modules/Integrations/Containers/IntegrationDashboard/IntegrationDashboard.constants.ts:51` |
| My Reviews | `/it/integrations/access-reviews/my-reviews` | Full, Partial, Mgr | `ACCESS_REVIEWS` | accessReviewTabVisibility.my_reviews_sub_tab_visible | — | — | — | `app/products/it/Apps/modules/Integrations/Containers/IntegrationDashboard/IntegrationDashboard.constants.ts:59` |
| All Reviews | `/it/integrations/access-reviews/all-reviews` | Full, Partial(app_admin) | `ACCESS_REVIEWS` | accessReviewTabVisibility.campaigns_sub_tab_visible | — | — | — | `app/products/it/Apps/modules/Integrations/Containers/IntegrationDashboard/IntegrationDashboard.constants.ts:66` |

### IT Automations  `it-automations`

2 nodes · path `/it/automations` · gate `IT_AUTOMATIONS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Policies | `/it/automations/policies` | Full, Partial(it_home_full_admin) | `IT_AUTOMATIONS` | — | — | — | — | `app/products/it/IT/modules/helpDesk/HelpDeskNavBar.tsx:58` |
| Form Fields | `/it/automations/form-fields` | Full, Partial(it_home_full_admin) | `IT_AUTOMATIONS` | — | — | — | — | `app/products/it/IT/modules/helpDesk/HelpDeskNavBar.tsx:62` |

### Approvals  `it-approvals`

4 nodes · path `/it/approvals` · gate `IT_MANAGEMENT`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Needs Review | `/it/approvals/needs-review` | Full, Partial(it_home_full_admin, hardware_admin, app_admin), Mgr | `IT_MANAGEMENT` | — | — | — | — | `app/products/it/IT/modules/helpDesk/HelpDeskNavBar.tsx:88` |
| My Requests | `/it/approvals/my-requests` | Full, Partial, Mgr, EE | `IT_MANAGEMENT` | — | — | — | — | `app/products/it/IT/modules/helpDesk/HelpDeskNavBar.tsx:92` |
| Reviewed | `/it/approvals/reviewed` | Full, Partial(it_home_full_admin, hardware_admin, app_admin), Mgr | `IT_MANAGEMENT` | — | — | — | — | `app/products/it/IT/modules/helpDesk/HelpDeskNavBar.tsx:96` |
| All Requests | `/it/approvals/all-requests` | Full, Partial(it_home_full_admin) | `IT_MANAGEMENT` | — | — | — | — | `app/products/it/IT/modules/helpDesk/HelpDeskNavBar.tsx:100` |

### Access Reviews  `access-reviews`

2 nodes · path `/it/third-party-access/access-reviews` · gate `ACCESS_REVIEWS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| My Reviews | `/it/integrations/access-reviews/my-reviews` | Full, Partial, Mgr | `ACCESS_REVIEWS` | accessReviewTabVisibility.my_reviews_sub_tab_visible | — | — | — | `app/products/it/Apps/modules/Integrations/Containers/IntegrationDashboard/IntegrationDashboard.constants.ts:59` |
| All Reviews | `/it/integrations/access-reviews/all-reviews` | Full, Partial(app_admin) | `ACCESS_REVIEWS` | accessReviewTabVisibility.campaigns_sub_tab_visible | — | — | — | `app/products/it/Apps/modules/Integrations/Containers/IntegrationDashboard/IntegrationDashboard.constants.ts:66` |

### Security Monitoring  `security-monitoring`

9 nodes · path `/it/security-monitoring` · gate `SECURITY_MONITORING`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Review | `/security/review` | Full | `SECURITY_MONITORING` | hasCompanyId | — | — | — | `app/products/it/Identity/modules/Security/utils/NavBarLinks.tsx:16` |
| Authentication Settings | `/security/authentication-settings` | Full | `SECURITY_MONITORING` | hasCompanyId | — | — | — | `app/products/it/Identity/modules/Security/utils/NavBarLinks.tsx:23` |
| Identity Providers | `/security/identity-providers` | Full | `SECURITY_MONITORING` | showIdentityProviderTab | — | — | — | `app/products/it/Identity/modules/Security/utils/NavBarLinks.tsx:30` |
| Certificates | `/security/certificates` | Full | `SECURITY_MONITORING` | showDeviceCertificateTab | — | — | — | `app/products/it/Identity/modules/Security/utils/NavBarLinks.tsx:37` |
| Duo Authentication | `/security/duo-authentication-api-keys` | Full | `SECURITY_MONITORING` | hasCompanyId | — | — | — | `app/products/it/Identity/modules/Security/utils/NavBarLinks.tsx:44` |
| Behavior Detection | `/security/behaviour-detection` | Full | `SECURITY_MONITORING` | hasCompanyId | — | — | — | `app/products/it/Identity/modules/Security/utils/NavBarLinks.tsx:51` |
| Authentication Method | `/security/authentication-method` | Full | `SECURITY_MONITORING` | partnerOnly | — | — | — | `app/products/it/Identity/modules/Security/utils/NavBarLinks.tsx:59` |
| Activity Log | `/security/activity` | Full | `SECURITY_MONITORING` | showActivityLogTab | — | — | — | `app/products/it/Identity/modules/Security/utils/NavBarLinks.tsx:73` |
| Settings | `/security/settings` | Full | `SECURITY_MONITORING` | — | — | — | — | `app/products/it/Identity/modules/Security/utils/NavBarLinks.tsx:78` |

### Apps  `third-party-integrations`

4 nodes · path `/it/apps` · gate `INTEGRATIONS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| All Integrations | `/it/integrations/overview?tab=all` | Full, Partial(app_admin) | `INTEGRATIONS` | — | — | — | — | `app/products/it/Apps/modules/Integrations/Containers/IntegrationDashboard/IntegrationDashboard.constants.ts:97` |
| Connected | `/it/integrations/overview?tab=connected` | Full, Partial(app_admin) | `INTEGRATIONS` | — | — | — | — | `app/products/it/Apps/modules/Integrations/Containers/IntegrationDashboard/IntegrationDashboard.constants.ts:109` |
| Partial Install | `/it/integrations/overview?tab=partial` | Full, Partial(app_admin) | `INTEGRATIONS` | — | — | — | — | `app/products/it/Apps/modules/Integrations/Containers/IntegrationDashboard/IntegrationDashboard.constants.ts:121` |
| Disconnected | `/it/integrations/overview?tab=disconnected` | Full, Partial(app_admin) | `INTEGRATIONS` | — | — | — | — | `app/products/it/Apps/modules/Integrations/Containers/IntegrationDashboard/IntegrationDashboard.constants.ts:133` |

