# IT  `it` *[touched: mergeSuite]*

**Suite visibility:** Full, Partial(it_admin), EE  
**Product gate:** `IT_MANAGEMENT`  
**Cross-sell:** locked → full, partial · SidenavITManagement  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:97-107`

## Apps (19)

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
| Single Sign-On *[mergeSuite]*| `/sso` | Full, Partial(identity_admin), EE | `RPASS` | — | locked → full, partial · SidenavIdentityManagement | — | — | `app/hub/spoke_models.py:706` |
| Custom SAML *[mergeSuite]*| `/saml` | Full, Partial(identity_admin) | `CUSTOMSAMLSERVICE` | — | locked → — | — | — | `app/hub/spoke_models.py:734` |
| Duo MFA *[mergeSuite]*| `/duo` | Full, Partial(identity_admin) | `DUO` | — | locked → — | — | — | `app/hub/spoke_models.py:751` |
| YubiKey *[mergeSuite]*| `/yubikey` | Full, Partial(identity_admin) | `YUBIKEY` | — | locked → — | — | — | `app/hub/spoke_models.py:788` |
| Groups *[mergeSuite]*| `/groups` | Full, Partial(identity_admin) | `GROUP_MANAGER` | — | locked → — | — | — | `app/hub/spoke_models.py:830` |
| Extended Access *[mergeSuite]*| `/extended-access` | Full, Partial(identity_admin) | `EXTENDED_ACCESS` | — | locked → — | — | — | `app/hub/spoke_models.py:791` |
| Virtual LDAP *[mergeSuite]*| `/vldap` | Full, Partial(identity_admin) | `VLDAP` | — | locked → — | — | — | `app/hub/spoke_models.py:790` |

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

### Single Sign-On  `rpass`

11 nodes · path `/sso` · gate `RPASS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/it/rpass/usageOverview` | Full, Partial(identity_admin) | `RPASS` | — | — | — | — | `app/products/it/Apps/modules/RPass/components/RPassV2Nav.tsx:54` |
| Setup | `/it/rpass/info` | Full, Partial(identity_admin) | `RPASS` | featureFlag:NEW_RPASS_ADMIN_PAGES not in ['all','overview'] | — | — | — | `app/products/it/Apps/modules/RPass/components/RPassV2Nav.tsx:55` |
| Passwords | `/it/rpass/overview` | Full, Partial(identity_admin) | `RPASS` | featureFlag:NEW_RPASS_ADMIN_PAGES != 'vault' && != 'all' | — | — | — | `app/products/it/Apps/modules/RPass/components/RPassV2Nav.tsx:65-99` |
| All Passwords | `/it/rpass/overview?section=allPasswords` | Full, Partial(identity_admin) | `RPASS` | — | — | — | — | `app/products/it/Apps/modules/RPass/components/RPassV2Nav.tsx:73-77` |
| Failed Policy | `/it/rpass/overview?section=failedPolicyPasswords` | Full, Partial(identity_admin) | `RPASS` | — | — | — | — | `app/products/it/Apps/modules/RPass/components/RPassV2Nav.tsx:78-83` |
| Duplicates | `/it/rpass/overview?section=duplicatePasswords` | Full, Partial(identity_admin) | `RPASS` | — | — | — | — | `app/products/it/Apps/modules/RPass/components/RPassV2Nav.tsx:84-88` |
| Weak Passwords | `/it/rpass/overview?section=weakPasswords` | Full, Partial(identity_admin) | `RPASS` | — | — | — | — | `app/products/it/Apps/modules/RPass/components/RPassV2Nav.tsx:89-93` |
| Company Vault | `/it/rpass/vault` | Full, Partial(identity_admin) | `RPASS` | featureFlag:NEW_RPASS_ADMIN_PAGES in ['vault','all'] | — | — | — | `app/products/it/Apps/modules/RPass/components/RPassV2Nav.tsx:64-65` |
| Access Rules | `/it/rpass/provisioning` | Full, Partial(identity_admin) | `RPASS` | — | — | — | — | `app/products/it/Apps/modules/RPass/components/RPassV2Nav.tsx:56-58,104-106` |
| Activity | `/it/rpass/activity` | Full, Partial(identity_admin) | `RPASS` | — | — | — | — | `app/products/it/Apps/modules/RPass/components/RPassV2Nav.tsx:107` |
| Settings | `/it/rpass/settings` | Full, Partial(identity_admin) | `RPASS` | — | — | — | — | `app/products/it/Apps/modules/RPass/components/RPassV2Nav.tsx:108` |

### Custom SAML  `saml-service`

2 nodes · path `/saml` · gate `CUSTOMSAMLSERVICE`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Manage Integrations | `/apps/custom-integrations/manage-integrations` | Full, Partial(app_admin, identity_admin) | `CUSTOMSAMLSERVICE` | — | — | — | — | `app/products/it/Apps/routes-v6/customSamlService/routes-v6.tsx:87-89` |
| Settings | `/apps/custom-integrations/settings` | Full, Partial(app_admin, identity_admin) | `CUSTOMSAMLSERVICE` | — | — | — | — | `app/products/it/Apps/routes-v6/customSamlService/routes-v6.tsx:90-92` |

### Duo MFA  `duo`

_No internal nav._ Duo is a third-party MFA provisioning integration (rippling-main: app/duo_provisioning). On the frontend it does not own a dedicated product surface. Admin management lives within the App Management IntegrationDashboard (e.g. /it/integrations/duo) and end-user device enrollment lives in account security settings (Identity/containers/accountSettings/security/components/securitySettings/Duo.tsx).

### YubiKey  `yubikey`

4 nodes · path `/yubikey` · gate `YUBIKEY`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/yubikey/overview` | Full, Partial(identity_admin) | `YUBIKEY` | — | — | — | — | `app/products/it/Identity/modules/Yubikey/components/YubikeyNavBar.tsx:20` |
| Ordering Policies | `/yubikey/ordering-policies` | Full, Partial(identity_admin) | `YUBIKEY` | — | — | — | — | `app/products/it/Identity/modules/Yubikey/components/YubikeyNavBar.tsx:21` |
| Settings | `/yubikey/settings` | Full, Partial(identity_admin) | `YUBIKEY` | — | — | — | — | `app/products/it/Identity/modules/Yubikey/components/YubikeyNavBar.tsx:22` |
| My Yubikeys | `/yubikey/employee/overview` | Full, Partial, Mgr, EE | `YUBIKEY` | — | — | — | — | `app/products/it/Identity/modules/Yubikey/components/YubikeyNavBar.tsx:25; routes/routes.tsx:147-155` |

### Groups  `group-manager`

2 nodes · path `/groups` · gate `GROUP_MANAGER`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Saved Groups | `/group-manager/dashboard/saved-groups` | Full, Partial(identity_admin) | `GROUP_MANAGER` | — | — | — | — | `app/products/platform/HubPlatform/modules/GroupManager/containers/dashboard/Dashboard.tsx:88-93` |
| Recommendations | `/group-manager/dashboard/recommendations` | Full, Partial(identity_admin) | `GROUP_MANAGER` | perm: has_create_permission; has_create_permission; totalThirdPartyIntegrationsCount > 0 && recommendationsCount > 0 (or already on tab) | — | — | — | `app/products/platform/HubPlatform/modules/GroupManager/containers/dashboard/Dashboard.tsx:94-106` |

### Extended Access  `extended-access`

_No internal nav._ Extended Access is registered as an INTERNAL/invisible app (rippling-main: app/apps/data/apps/internal/extended_access.json). It carries primary_slug 'extended-access' but `invisible: true` and is used only for billing classification (ExtendedAccessBillingInterface).

### Virtual LDAP  `vldap`

5 nodes · path `/vldap` · gate `VLDAP`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/ldap/overview` | Full, Partial(identity_admin) | `VLDAP` | — | — | — | — | `app/products/it/Identity/modules/VLDAP/containers/VLDAPNavBar.tsx:26` |
| Groups | `/ldap/groups` | Full, Partial(identity_admin) | `VLDAP` | — | — | — | — | `app/products/it/Identity/modules/VLDAP/containers/VLDAPNavBar.tsx:27` |
| Access Rules | `/ldap/provisioning` | Full, Partial(identity_admin) | `VLDAP` | — | — | — | — | `app/products/it/Identity/modules/VLDAP/containers/VLDAPNavBar.tsx:28` |
| Connection | `/ldap/connection` | Full, Partial(identity_admin) | `VLDAP` | — | — | — | — | `app/products/it/Identity/modules/VLDAP/containers/VLDAPNavBar.tsx:29` |
| Settings | `/ldap/settings` | Full, Partial(identity_admin) | `VLDAP` | — | — | — | — | `app/products/it/Identity/modules/VLDAP/containers/VLDAPNavBar.tsx:30` |

