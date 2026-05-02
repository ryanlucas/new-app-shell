# Identity  `identity`

**Suite visibility:** Full, Partial(identity_admin)  
**Product gate:** —  
**Cross-sell:** locked → full, partial · SidenavIdentityManagement  
**Source:** `app/cross_sell/constants.py:104`

## Apps (9)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Single Sign-On | `/sso` | Full, Partial(identity_admin), EE | `RPASS` | — | locked → full, partial · SidenavIdentityManagement | — | — | `app/hub/spoke_models.py:706` |
| Custom SAML | `/saml` | Full, Partial(identity_admin) | `CUSTOMSAMLSERVICE` | — | locked → — | — | — | `app/hub/spoke_models.py:734` |
| Duo MFA | `/duo` | Full, Partial(identity_admin) | `DUO` | — | locked → — | — | — | `app/hub/spoke_models.py:751` |
| YubiKey | `/yubikey` | Full, Partial(identity_admin) | `YUBIKEY` | — | locked → — | — | — | `app/hub/spoke_models.py:788` |
| User Management | `/user-management` | Full, Partial(identity_admin) | `USER_MANAGEMENT` | — | locked → full, partial · SidenavIdentityManagement | — | — | `app/hub/spoke_models.py:880` |
| Manual Users | `/manual-users` | Full, Partial(identity_admin) | `MANUAL_USER_MANAGEMENT` | — | locked → — | — | — | `app/hub/spoke_models.py:829` |
| Groups | `/groups` | Full, Partial(identity_admin) | `GROUP_MANAGER` | — | locked → — | — | — | `app/hub/spoke_models.py:830` |
| Extended Access | `/extended-access` | Full, Partial(identity_admin) | `EXTENDED_ACCESS` | — | locked → — | — | — | `app/hub/spoke_models.py:791` |
| Virtual LDAP | `/vldap` | Full, Partial(identity_admin) | `VLDAP` | — | locked → — | — | — | `app/hub/spoke_models.py:790` |

## App L3 internal navigation

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

### User Management  `user-management`

_No internal nav._ User Management is registered as an RPK app via UserManagementAppInterface (rippling-main: app/user_management/rpk/app.py) with installation_url and dashboard_url both '/user-management'. Gated by FEATURE_FLAG_USER_MANAGEMENT_APP_ENABLED.

### Manual Users  `manual-user-management`

_No internal nav._ Manual User Management (spoke handle MANUAL_USER_MANAGEMENT) is the standalone Add People feature for HR-only customers. It does not own a dedicated product surface or internal navigation — it is referenced as an installed app in rippling-main (hris/tasks/misc/tasks.py:332) and exposed through the HRIS standalone addPeople flow (rippling-webapp: app/products/hr/Hris/Emp/projects/standalone/addPeople).

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

