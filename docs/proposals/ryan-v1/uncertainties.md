# Catalog uncertainties

Flags raised by the generator agents about gaps in the catalog.

## frame

- Reports node: confirmed in firstSection by getSideNavConfig.ts:338 only when sideBarData entry has name 'Reports' and isTopLevelApp; the actual permissionGate / partial-admin scope is determined by the backend-driven sideBarData payload, not the frontend file. 'reports_admin' is a best-guess scopeForPartial.
- Implementation Plan visibility uses admin.isSuperAdmin() || admin.isFullAdmin(); we have intentionally omitted super (Rippling-internal) from personas per instructions. Partial admins are not shown.
- Hire/Offboard rely on admin.canRequestHire() / canRequestTerminate() (adminPrivileges.ts:377, 390) — partial admins with the relevant ACL grant will see them. The exact partial-admin scope name in production is the privilege string canRequestHire/canRequestTerminate; mapped to scopeForPartial values.
- Add People / Remove People paths come from redirectToBaseAddPeopleFlow() / redirectToBaseRemovePeopleFlow() in app/core/utils/addOrRemovePeopleFlows; resolved paths can vary. Used '/add-people' and '/remove-people' as approximations.
- Org Chart visibility (isOrgChartVisible) is determined by sideNavInfo[2] from backend; could be gated on company setting + role visibility.
- Top bar widgets BELL/TASKS/CHAT/AI_ASSISTANT_TRIGGER are produced via interactiveWidgets registry (app/core/registries.ts) — actual sources are wired by separate registration modules in product code; we cite the consumer in Navigation.tsx.
- Translation Tools widget visibility depends on canShowScreenshotTools state set inside TranslationTools.tsx; not a feature flag in the conventional sense.
- Migration info bar is the MIGRATION_INFO_CONTAINER widget; visibility logic lives in the registered product module, not in Navigation.tsx.
- Sandbox env bar combines isSandboxPreviewEnvironment() and isLoggedInAs() — actual SandboxEnvironmentNavigationBar may have additional internal conditions in its product module.
- User menu Profile / Account Settings / Referral / Sign Out are universal across all 4 personas. Some persona-specific labels (admin vs employee captions) are rendered in role caption text, not as separate menu items.
- Account switcher subtree (Admin/Employee/Contractor) is dynamically generated per role; entries shown depend on getAllowedAccessLevelsForRole() filtering. Treated as representative role variants.
- App Launcher 'Custom Apps' subcategory is sourced from sideBarData with key 'custom_apps' and is visible to whoever is granted the custom apps category in backend ACL; scopeForPartial 'custom_apps_admin' is best-guess.
- Lucide icon names are best-guess mappings of Pebble Icon.TYPES (e.g. NOTIFICATION_OUTLINE -> Bell, RIPPLING_AI_FILLED -> Sparkles, HOME_OUTLINE -> Home, GLOBE_OUTLINE -> Globe, HANDSHAKE_OUTLINE -> Handshake, PROVISION_USERS_ONBOARD_OUTLINE -> UserPlus).
- RemainingDaysCountDown trial banner: source line approximated; full conditions also depend on isTrialCompany derived from companyDetails or demoExpirationData.
- Labs branding visibility (isLabsEnabled) — exact condition lives inside LabsBranding component (app/appShell/components/navigation/components/LabsBranding.tsx), not verified line-by-line.
- We did not include Rippling-internal Spoof/Proxy controls (CompanyInfo.tsx is_spoofed branch) or super-admin-only entries per the constraints.
- Help is hidden for IT trial / self-serve no-contract companies in the third sidebar section but the Help app launcher entry mirrors the same condition; some consumers may still allow Help via /help directly.

## suites (L1/L2)

- Several benefits-related spoke handles referenced in the codebase (FSA, HSA spoke is present, but BENADMIN, COBRA, ACA, COMMUTER, FLEX, BENEFITS, MY-BENEFITS) are NOT in DefaultSpokeHandles enum (hub/spoke_models.py:704-881). They are referenced in InternalRecipientToSpokeHandleMap and FLEX_SPOKE_HANDLES (insurance/constants/common.py:4-5). For these we set productGate to INSURANCE (the umbrella spoke) when productGate would otherwise be unverifiable. Consider whether the prototype should add BENADMIN/COBRA/ACA as logical handles even though they aren't in the enum.
- BANKING is in DefaultSpokeHandles (line 835) but referenced in SidenavBanking and as a Spend sub-app in the unpurchased SKU configs. Treated here as its own suite (matches NAVIGATION_CATEGORY_JSON 'Banking' category) AND duplicated as a Spend cross-sell tile. Kept as Banking suite top-level.
- 70+ third-party provisioning integration apps (Slack, GitHub, Salesforce, Gmail, Google Workspace, Microsoft 365, Okta, AWS, Adobe, Dropbox, Zoom, NetSuite, Greenhouse, Jira, Brex, Ramp, Carta, etc.) collapsed into a single umbrella entry 'third-party-integrations' under the IT suite. Each shares a generic provisioning template; treat them as a templated app family in Phase 2 via _integration.json.
- Manager-only L2 surfaces (e.g., Team / My Team areas inside HRIS, Compensation, Performance) are not enumerated; those are L3 / sub-views and deferred to Phase 2 per spec.
- Talent suite contains Recruiting (RIPPLINGATS / ATS2) — codebase uses both RIPPLINGATS and ATS2 spoke handles, with ATS2 being the newer one used by unpurchased SKU. We use ATS2 for the cross-sell-style entry and RIPPLINGATS for installed/legacy. May be worth collapsing to one in Phase 2.
- PEO suite ('Rippling PEO') is rendered as its own top-level category in NAVIGATION_CATEGORY_JSON but does not have a dedicated spoke handle in DefaultSpokeHandles. productGate is null at the suite level; Join PEO / Leave PEO dummy apps from dummy_apps.py:441 are placeholders not real apps.
- Settings, Tools, and Custom Apps are sidenav categories without a strong product gate. We include them as suites with null productGate. Settings contains things like Permissions, Field Management, Company Settings.
- Many EE persona variants (e.g. employee /me/pay vs admin /payroll) are inferred from common Rippling URL conventions and the MyPay spoke (MYPAY in DefaultSpokeHandles) plus PERSONAL_DUMMY_APPS in dummy_apps.py:519. Where the codebase shows an explicit personal/admin split, we recorded a personaVariants block; otherwise we just list the personas in visibility.
- Identity Management is a SidenavIdentityManagement category (cross_sell/constants.py:104) that lives UNDER the IT mainCategory in NAVIGATION_SUB_CATEGORY_JSON (apps/scripts/app_navigation_categories_data.py:258-263). Modeled here as its own suite to match the cross-sell sidenav category hierarchy as the spec asked for.
- Lucide icon names are best guesses based on app semantics, not literal mappings from the Pebble icons used by the actual app (e.g., USERS_OUTLINE, RECRUITING_OUTLINE, etc.).
- scopeForPartial values are best-effort reconstructions; codebase uses many scattered Permission flags and PrivateAppActions, and the partial-admin scope tied to a specific spoke is not always cleanly enumerated. Prototype should treat these as illustrative.

## personas

- Some boolean flags on AdminPermissions (e.g. has_super_admin_with_add_edit_admins, has_any_permissions, has_permissions_privilege) are deprecated/derived rather than first-class partial-admin scopes and are excluded.
- Hire/terminate (can_request_hire, etc.) and employment-data (can_read_employment_sensitive, etc.) permissions are scoped capabilities, not partial-admin product scopes; excluded from the scopes list intentionally.
- is_super_admin (line 14) and is_external_admin (line 17) are core admin variants, not partial-admin product scopes; not enumerated here.
- Travel sub-permissions (can_modify_travel_policies_and_settings etc., lines 85-90) and Unity creator subset (can_create_unity_app, line 103) are nested capabilities under the parent travel/unity admin scopes.

## spokes

- Some categorizations are inferred from handle name semantics — the spoke_models.py enum itself does not declare sidenav/cross-sell category. Sidenav categories are sourced from rippling-webapp/app/products/webPlatform/SuperUser/components/CrossSell/V2/Modules/CampaignContent/components/CampaignFormFields/InProductFields/InProductFields.app.constants.ts:11-25.
- Cross-sell category constants come from rippling-main/app/cross_sell/constants.py:152-158 (CampaignProductTypeChoices: HR, BENEFITS, TALENT, FINANCE, GLOBAL_PAYROLL, IT_APPLICATION_AND_DEVICE_MANAGEMENT).
- Skipped Rippling-internal-staff-only spoke handles: SENSITIVE_STAFF_USERS (line 789), EXTENDED_ACCESS (line 791), SPOOF_ACCESS_MANAGEMENT (line 793), IMPLEMENTATION (line 750), BUSINESS_PARTNER (line 739), CUSTOMER_SANDBOX (line 818), PARTNER (line 821), DUMMY_UNITY_ADMIN (line 827), DUMMY_FUNCTIONS (line 840), DUMMY_SETTINGS_MANAGER (line 841), DUMMY_WEBHOOK (line 842), LOG_IN_AS (line 839), TIME_PRODUCTS (line 864, marked deprecated), IT_HELPDESK (line 875, marked deprecated).
- EMPLOYEEHOME, RIPPLING, INBOX, UNIVERSAL_SEARCH are platform-wide (no specific sidenav category).
- Apps-style integrations (Salesforce, Slack, Office365, AWS, GitHub, etc.) live in the Apps catalog rather than a sidenav — set sidenavCategory and crossSellCategory to null.

## Per-app L3

### banking-overview
- Banking uses route factories (rbkRouteFactory) — top-level pages are accounts, transactions, deposit, transfers, tax-documents.
- Deposit/transfer/verify-ein/authorize-vendor are flow routes (not nav items). Settings live under /spend-management/settings/banking.

### carta
- Carta is a third-party equity provider integrated as a Rippling app spoke. Setup is a multi-step OAuth/data-import flow rooted at /apps/carta-equity-management/setup.
- Post-install the app overlays the generic EquityManagement Overview page; deeper equity actions (modeling, issuing) live in Carta's own portal.
- Modeled as a single overview page (no nav).

### flex-benefits
- Three sibling URL roots — /fsa-benefits, /hsa-benefits, /commuter-benefits — share the same dashboard panel structure (overview/plans/enrollments/transactions/settings).
- Modeled here as one app rooted at /fsa-benefits/dashboard with sibling links to HSA/Commuter dashboards. Real users may see whichever subset is enabled.
- Plan sub-tabs (current/upcoming/past/setup) are query-string driven — modeled as plans children.
- Settings sub-tabs (bank-account/documents/eligibility) are panel paths.

### guideline
- Guideline is a third-party 401(k) provider integrated via Rippling's app marketplace.
- No first-party internal navigation surface — clicking the app launches the provider's own portal/SSO. Setup uses the generic /apps/401K/{appName}/intro flow.
- Modeled as a single-page (no nav) app. Users self-serve in Guideline's UI.

### insurance
- Admin nav uses STANDALONE_SECTIONS to filter visible links by current section; flattened representation here.
- Country-prefixed routes (e.g. /insurance/admin/{country}/...) are not modeled — assumes US default.
- EE-facing 'My Benefits' is owned by the my-benefits app entry and is not duplicated here.

### john-hancock
- John Hancock is a third-party 401(k) provider integrated via Rippling's app marketplace.
- No first-party internal navigation surface — clicking the app launches the provider's portal. Setup uses the generic /apps/401K/{appName}/intro flow.
- Modeled as a single-page (no nav) app.

### my-benefits
- Employee-facing surface; appPath uses the US base. International overlays use a country-prefixed path under /benefits.
- Settings sub-tabs are query-string driven (?section=...) — modeled as child links.
- Beneficiaries link is conditional on isLifeLinePresent (employee has a life-insurance line).

### pension-management
- App spans multiple countries (US/GB/DE/IE) under /pension-management/dashboard/{country}/...; modeled US tabs by default.
- When US Retirements is installed, nav switches to Employee Details / Annual Limits / Plans (vs default Employee + Pension Schemes).
- Bank Accounts tab is conditional on shouldShowBankAccountTab.
- GB has Active/Archived scheme sub-tabs via ?tab= query param; DE has Enrollments/Updates sub-tabs.

### shareworks
- Shareworks is a third-party equity provider integrated as a Rippling app spoke. Once installed, it surfaces an Overview/equity-page with grants and vesting; deeper actions (issuing, modeling) happen in Shareworks' own portal.
- Setup uses /apps/shareworks/* setup steps; post-setup the app overlays EquityManagement Overview at /apps/{appName}/overview.
- Modeled as a single overview page (no nav).

### checklist-app
- Live route base is /checklist/:appName (not /checklists). Each :appName is a per-app instance; the nav inside renders one tab (Overview) plus a redirect (outstanding-tasks → inbox).
- L3 nav surfaces only one admin tab — Overview. Non-admins get redirected to Inbox/pending tasks rather than seeing checklist nav.
- Expected nav (My Checklists, Templates, Library) does not match the live structure — the per-instance nav is minimal. Those concepts may be served by the dashboard at /checklists (plural) which is a different app or by the Inbox tasks list.

### custom-objects
- Actual route base in code is /data-manager (PATHS.baseV2). The canonical app entry alias /custom-objects (PATHS.base) is preserved as appPath; child paths use /data-manager prefix as that is the live mount.
- Per-object detail subnav (Records, Fields, Validation Rules, Page Layouts, Field Sets, Record Trigger Flows) is dynamic per-object and not modeled as L3 dashboard nav — it lives under /data-manager/objects/:objectRQLName/*.
- External Connections and Pipelines are gated by LD flags (DATA_PIPELINES_APP, EXTERNAL_OBJECTS_PIPELINES). Modeled as conditional via flag mention only — not formal `conditions` schema.
- Permissions tab visibility uses isPermissionsTabAccessible() — assumed full+partial admin scope.

### forms
- Forms backend lives in rippling-main at app/hub/forms/ (RPForm, RPFormScheduler, RPFormResponse models, PERM_FORMS_ADMIN permission), but the corresponding webapp UI is not present as a structured module in the rippling-webapp/app/products tree.
- The /forms URL is referenced as a navigation target (e.g. app/products/hr/Insurance/components/employee/dashboard/InsuranceEmployeeNavBar.tsx:128) and an app_shop_url, but the actual page renderer/route entry could not be located — likely served by a legacy or non-rippling-webapp MFE.
- Returning empty L3 nav. Expected nav (My Forms, Submissions, Templates, Library, Settings) cannot be sourced from rippling-webapp — would need to inspect the legacy forms MFE or a different repo.
- Backend permission gate: PERM_FORMS_ADMIN at rippling-main/app/hub/forms/api.py:22; non-admin (ee) submission flow likely also exists.

### recipes
- Recipes is rendered as a single-page dashboard (RecipeDashboard) at /recipes/dashboard with no internal sub-routing. Template/category filters are in-page state, not URL routes.
- The 'expected' nav (My Recipes, Library, Marketplace, Logs, Settings) does not match the live route table — only a single dashboard route exists. Returning empty L3 nav.
- Access gated to admin/partial admin via WithRecipeAdmin HOC (role.isAdmin || role.isPartialAdmin) at app/products/platform/HubPlatform/modules/RecipeApp/routes.tsx:8.

### rippling-build
- Rippling Build maps to the Developer app (DEVELOPER_BASE_ROUTE = 'developer'). appPath corrected from skeleton's /build to /developer.
- Top-level nav composed via developer.routes.tsx aggregating FUNCTIONS / SETTINGS / WEBHOOKS / API_TOKENS / PACKAGES navbars; each is gated by SKU/feature flags (useFunctionsSkuEnabled, useDeveloperAPITokensEnabled, etc.).
- Expected items from brief (My Apps / Templates / Versions / Marketplace / Settings) only partly map; Marketplace and Templates are not present in this app — likely surfaces of AppManager (custom-apps) instead.
- Personas inferred (full = developer/admin only). No EE surface.

### rippling-solution
- RIPPLING_SOLUTION is a SKU/spoke prefix (RIPPLING_SOLUTION_SPOKE_PREFIX in finance/Billing) used to identify partner-built apps; it is not a standalone webapp surface with its own routes.
- No /solutions route or dedicated container found in webapp. Solutions are surfaced as installed apps under the App Shop and via per-spoke /apps/:appId pages.
- Expected items (My Solutions / Library / Marketplace / Templates) are not present as a discrete nav — Library/Marketplace surface is App Shop (/app-shop) and per-app pages.
- Returning nav: [] given the absence of a discrete app shell.

### unlimited-custom-apps
- App lives under TWO related routes: /app-studio (App Studio admin/builder) and /custom-apps (rendered custom-app surfaces). Skeleton appPath /custom-apps is the consumer surface; corrected to /app-studio for the admin shell.
- Top-level admin nav is dashboard -> all-apps; siblings include create-app, app-templates, edit-app, create-quick-app — all flows rather than persistent nav.
- Expected items (App Catalog / Builder / Recipes / Marketplace / Settings) only partly map: Builder = create-app/edit-app flows; App Catalog = app-templates; Marketplace and Recipes are not present in AppManager routes (Recipes lives in HubPlatform/recipeRecommendation).
- Custom-apps-admin and developer personas; full+partial appropriate. EE accesses installed custom apps via /custom-apps/:appAPIName but those routes are dynamic per app.

### data-manager
- Data Manager (FieldsManager) exposes only two top-level destinations: All Fields and Data Collected. The richer 'Datasets / Schemas / Connections / Logs / Settings' breakdown anticipated in Phase 2 brief does not exist as L3 admin nav here — those concepts live inside the field selector's filters.
- Permissions are gated behind DataManagerPermission wrapper — admin-only.

### data-pipelines
- Pipelines is rendered as a single grid (PipelinesGrid) without distinct internal sub-tabs in the current UI; expected items like Templates/Runs/Logs/Settings are not present as routes.
- Pipelines lives under the Data Catalog route shell (/data/pipelines) and shares chrome with the catalog.
- Personas inferred (admin/full only). No EE-facing pipelines surface.

### forecasting
- Forecasting is a single-page home (ForecastingHome) — no persistent left/top nav; the rest of /forecasting/* paths are flow steps (setup, labor_plan_connect, objects/create, objects/upload).
- Expected items (Models / Forecasts / Datasets) are not present as discrete routes; the brief noted Forecasting is newer and minimal — confirmed.
- App lives under /forecasting (not /data/forecasting); skeleton appPath corrected.
- Personas inferred as full only (admin/forecasting-installer).

### reports
- Reports' L3 nav is implemented as in-page tabs (DASHBOARD_TABS), not URL paths — paths are query-string-based. We expose stable kebab-case ids and approximate paths.
- REPORT_PERMISSIONS tab is admin-only (full/partial); RECENT/BUILT_IN/CREATED_BY_ME/SHARED_WITH_ME are reachable by EE within their data scope.
- Templates / Reports Library are surfaced via the Built-in tab; we did not find separate Scheduled Reports or Library nodes at this layer (they live inside the report viewer).

### snowflake
- Snowflake Sync is not a standalone app surface in webapp — it's a managed-connector destination (MANAGED_CONNECTOR.SNOWFLAKE) and pipeline source/destination type within DataConnectors.
- There is no /data/snowflake route or dedicated container; Snowflake settings are configured per-pipeline via the pipeline editor flow.
- Expected items (Connections / Sync Status / Settings / Logs) are not present as distinct routes — falling back to the parent Pipelines grid where Snowflake pipelines are visible.
- Returning nav: [] given the absence of a discrete app shell.

### transformations
- Routes use 'overview' and 'schedules' as the only top-level child routes; 'My Transformations / Templates / Library / Logs' from the brief are not present in code.
- Mapped Overview to 'My Transformations' and Schedules to 'Schedules' (the only other tab). Templates/Library/Logs not present as routes — omitted.
- Personas inferred as full only (admin/data-engineer surface).

### global-contractor
- App lives under /contractors (admin app: /contractors/admin/*; contractor app: /contractors/invoicing/*; standalone-contractor: /contractor/*).
- appPath corrected from skeleton's /global/contractors to /contractors.
- Admin nav (full persona) and contractor self-service nav (ee/partial) are both rendered behind UnifiedAppNavBar with privilege gating.
- Onboardings/Documents from brief are not first-class admin routes; closest match is admin/contractors (KYC) and contracts. Mapped 'Onboardings' to admin/contracts/all (where contracts are managed).

### global-workforce
- Global Workforce maps to Global Payroll surface (/global-payroll/*) plus hr/GlobalExpansion EOR flows. It is not exposed as a single contained webapp shell; navigation is largely composed of dynamic admin/employee/eor-admin sections and step-up-auth gated flows.
- Top-level admin areas inferred from globalPayrollChildren.routes.tsx: admin (overview), filings, settings, run-management, payroll-calculations, documents-processing, eor-admin, bulk-import, journal-imports, reports.
- Expected items from the brief (Workers / Country Hub / Onboardings / Compliance / Reports) only partially present as discrete routes — Reports surfaces are admin/reports/transactions and admin/reports/journal; Compliance/Country Hub live under EOR flows (eor/brt-flow, eorOnboarding, etc.).
- Personas inferred (full = payroll admin; ee = global employee surface under /global-payroll/employee).
- appPath corrected from skeleton's /global/workforce to /global-payroll (the actual base route).

### compensation-bands
- Partial-access users see a 'Shared' top-level instead of 'People'/'Plans' (mutually exclusive nav).

### compliance-360
- Compliance 360 is admin-only - gated by isRoleComplianceDashboardAdmin (compliance_admin permission); maps to full+partial
- PEO offboarding checklist nav item is conditional on PEO termination date within last 90 days
- Tax accounts nav appears only when clientType (PEO) is set

### documents
- Documents has no spoke product gate; tab visibility is permission/feature-flag driven via getEnabledTabs()
- EE_DOCUMENT_DASHBOARD is the index/entry point and visible to everyone (even EEs)
- Workplace Posters tab only visible if isPeoClient || isAsoClient AND has admin privileges
- Several admin tabs require ADMIN_PERMISSION_FOR_DOCUMENTS_DASHBOARD or DOCUMENT_OPERATOR_PERMISSION

### employment-authorization
- App is admin/HR-only — gated by isI9EverifyAdmin or specific access levels (i9, everify, settings). Maps to full+partial.
- Tab order swaps for non-US HQ companies (work auth dashboard becomes primary)
- Nested sub-links (e.g. I-9 dashboard sections) are tabs/sections inside the dashboard pages — modeled here as parented children
- App has no productGate spoke handle — controlled by access-level checks on roles

### hr-helpdesk
- HR Help Desk (HR360 / ThinkHR) is an external SaaS app accessed via SSO, not a Rippling-internal multi-page surface.
- No discoverable internal nav in rippling-webapp — it appears as an installable spoke (HR360) and routes via /app-shop/app/hr360 with single-page or external launch.
- objectNavigatorData mock references 'HR Help Desk' and 'HR Help Desk (Legacy)' tiers but no internal sub-pages were found in app/products/.

### hr-overview
- HR Overview is a single landing page; no internal sub-routes were found.

### hr-services
- 'HR Services' is the customer-facing rebrand of ASO (Administrative Services Organization). See app/products/hr/Peo/utils/asoRebrandingUtils.ts and app/products/hr/Peo/constants.ts:355.
- There is no dedicated /hr-services route in the webapp — HR Services customers surface ASO/PEO content under /aso/* and /peo/* (workers comp, tax info, state coverage, etc.), gated by clientType === ASO.
- The HR360 spoke is actually 'HR Help Desk' per objectNavigatorData mock — the gate label may be inaccurate; HR Services routing primarily uses CLIENT_TYPE.ASO and isAsoClient checks rather than a single product gate.
- Reference: rippling-webapp/app/products/hr/Peo/routes/aso.routes.tsx for ASO/HR Services flow routes (mostly setup flows, not navigation).

### hris-org-management
- Top-level surfaces span multiple base routes (company-details, org-chart, organizational-details, tracks). Tabs gated by FFs and granular permissions.

### leaves
- The 'Leaves' app surface is a single page rendered inside PTO at /pto/leaves (also exposed via /time-products/time-off/leaves). It has no top-level app navigation — only in-page tabs (On Leave / Upcoming / Past) and a Rippling-Managed vs Tilt-Managed split when Tilt is installed.
- Visibility: gated by isAdmin || isManager in PTO employee container; persona-wise this maps to full+partial+manager
- The LEAVES product gate is a per-feature flag inside UnifiedTimeProducts (TIME_OFF_FEATURE_KEYS_LEAVES via canViewLeaves)

### people
- Settings tab visibility is full-admin only; persona mapping inferred.

### pto
- Tab labels are i18n keys (tabs.*) — final user-facing strings inferred from key names
- isAdmin/isManager flags mapped to full/manager personas heuristically
- No EE-only variant in the legacy HR PTO experience — the EE-facing surface is the standalone /time-off app; this is the legacy /pto admin/manager surface

### duo
- Duo is a third-party MFA provisioning integration (rippling-main: app/duo_provisioning). On the frontend it does not own a dedicated product surface. Admin management lives within the App Management IntegrationDashboard (e.g. /it/integrations/duo) and end-user device enrollment lives in account security settings (Identity/containers/accountSettings/security/components/securitySettings/Duo.tsx).
- Treating as a trivial app with empty nav per the Phase 2 convention for apps without dedicated internal navigation.

### extended-access
- Extended Access is registered as an INTERNAL/invisible app (rippling-main: app/apps/data/apps/internal/extended_access.json). It carries primary_slug 'extended-access' but `invisible: true` and is used only for billing classification (ExtendedAccessBillingInterface).
- No frontend route table for /extended-access exists in rippling-webapp. There is no admin product surface; emitting nav: [] reflects the actual codebase state.
- The expected nav (Active Grants, Templates, History) is not implemented. Possibly aspirational or owned by a separate product.

### group-manager
- Group Manager mounts at /group-manager (HubPlatform/routes-v6/hubPlatformRoutes.tsx:503). Internal nav consists of Saved Groups (always) and Recommendations (conditional: has_create_permission AND (third-party integrations exist AND recommendations available)).
- ROUTES constants include SETTINGS, but the routes file (groupManager.routes.tsx) does not register a settings route. Captured Settings as nav-only-when-route-exists; not emitting it.
- Personas use 'partial' with 'identity_admin' scope; group permissions are gated by has_create_permission (server-driven via fetchGroupPermissions).

### manual-user-management
- Manual User Management (spoke handle MANUAL_USER_MANAGEMENT) is the standalone Add People feature for HR-only customers. It does not own a dedicated product surface or internal navigation — it is referenced as an installed app in rippling-main (hris/tasks/misc/tasks.py:332) and exposed through the HRIS standalone addPeople flow (rippling-webapp: app/products/hr/Hris/Emp/projects/standalone/addPeople).
- The path /manual-users in the skeleton does not appear to be a real route. Users are managed via /it/people or the HRIS People grid; emitting nav: [] is the most accurate reflection of current state.

### rpass
- RPass is mounted under /it/rpass; legacy /rpass paths redirect via RPassV2Layout. Tabs are conditionally rendered based on NEW_RPASS_ADMIN_PAGES feature flag (variations 'all', 'overview', 'vault', 'none').
- Personas: Identity admin surfaces use full+partial with identity_admin scope. Personal Vault and individual password access are EE/manager surfaces (every employee with RPass access has a personal vault), but the admin pages captured here are admin-only.
- 'Setup' is only shown when NEW_RPASS_ADMIN_PAGES != 'all' && != 'overview'. Captured visibility as a condition for fidelity.

### saml-service
- Custom SAML Service does not own a standalone product surface with internal nav. The mount points are 'manage-integrations' and 'settings' (routes-v6.tsx:88-93) but the CustomSAMLServiceNavBar component redirects to /it/integrations (the App Management dashboard). Effectively no in-app L3 nav.
- The 'Manage Integrations' and 'Settings' tabs live within the IntegrationDashboard (App Management); per access-reviews convention, surfacing them here as logical tabs anyway.

### user-management
- User Management is registered as an RPK app via UserManagementAppInterface (rippling-main: app/user_management/rpk/app.py) with installation_url and dashboard_url both '/user-management'. Gated by FEATURE_FLAG_USER_MANAGEMENT_APP_ENABLED.
- No frontend route table for /user-management was found in rippling-webapp. The dashboard surface is likely the IT People page (/it/people) or a forthcoming surface — the standalone /user-management URL appears to be a pre-launch registration with no dedicated L3 nav yet.
- The expected nav (Users, Groups, Provisioning, Reports, Settings) is not present in the current codebase; emitting nav: [] to reflect actual state.

### vldap
- vLDAP is mounted at /ldap (not /vldap) per vldap.base.routes.tsx:5. Internal admin nav has 5 items. Setup is a Flow (treated as installation flow, not L3 nav).

### yubikey
- Yubikey has a separate admin and employee NavBar (AdminNavBar / EmployeeNavBar). EE-facing surface is /yubikey/employee/overview; admin surface is /yubikey/overview. Captured both as nav rows.
- Setup, purchase, policy create/edit are flow-style routes (Flow components) — treated as actions, not L3 nav.

### access-reviews
- Access Reviews is rendered as a sub-nav under the IntegrationDashboard (App Management) — there is no standalone /access-reviews route. Captured here as a logical app per the catalog. The campaign creation/edit flow lives at /it/access-reviews-flow/:reviewId/*.

### app-management
- App Management is the IntegrationDashboard at /it/integrations and /it/third-party-access. The umbrella view shows Overview + (optional) Connections + (optional) Access Reviews with sub-tabs My Reviews / All Reviews. Tabs are conditionally visible based on FLUX feature flag and access_review_tab_visible from API.
- Each individual integration (Slack, GitHub, etc.) gets its own AppNavBar from app/products/it/Apps/containers/appNavBar/AppNavBar.tsx (see _integration.json template).

### device-management
- Several tabs (Policies/Configurations, Software, Threats, Updates, Scripts) are gated by 'full device management tier' (DEVICE_MANAGEMENT_TIERS.FULL). Render with lock icon if tier not satisfied; clicking opens upsell modal.
- Software tab has nested children: My Software, Software Library.
- EE-only view (/it/hardware/employee) shows just Devices and Orders.
- Tabs Activity, Settings always shown for admins.

### device-store
- DeviceStoreV2 (gated by feature flag DEVICE_STORE_V2_FEATURE_FLAG) shows Approved Devices, Catalog and (when global expansion enabled) Settings. Legacy HardwareStore is shown otherwise.

### inventory-management
- Inventory Management is not a standalone tabbed product surface — it is composed of flows (assign / unassign / archive / send-to-warehouse / orders) and contributes the People/Devices/Orders tabs to the Devices nav. Use Devices (device-management) nav for tabbed view; the routes here are the InventoryManagement-specific flow entry points.
- These routes are typically initiated from inside the Devices app (action menu) rather than a dedicated nav. Treat as no internal tab nav.

### it-approvals
- ApprovalsNavBar tabs are reviewer-centric. 'My Requests' is the requester view; 'Needs Review' / 'Reviewed' / 'All Requests' are reviewer/admin views.

### it-management-people
- This is the legacy /it-management dashboard with the people-centric admin tabs. Tasks tab visible only to device managers/full admins. Activity logs and policies tabs always shown.

### it-overview
- IT Overview is a single dashboard page (metrics widgets) inside the umbrella IT app's sidebar. The 'umbrella' nav lives at /it/* and uses StandAloneNavigation (left rail). The items below are the sibling items of /it/overview rendered by that StandAloneNavigation, not internal tabs on the Overview page itself. The page content has no internal tab bar.
- Items like Hardware, RPass, Device Store, My IT, Approvals, Automations, Integrations are also peer apps in the catalog — captured here because IT's umbrella surfaces them in its sidebar.

### my-it
- Currently exposes only one tab (Third-Party Apps). Likely to grow as helpdesk EE flows expand.

### security-monitoring
- App is registered as RIPPLING_SECURITY (RIPPLING_SECURTY_SPOKE_HANDLE in code). Tabs sourced from Identity/modules/Security/utils/NavBarLinks.tsx and filtered in NavBar.tsx. Several tabs are conditional on subscription, feature flag, or company-vs-partner context.
- When no companyId (partner login) only Authentication Method tab is shown.

### third-party-integrations
- This is the umbrella catalog/list-of-apps view. Each provisioning integration (Slack, GitHub, Salesforce, Okta, etc. — 70+ apps) renders the same per-app AppNavBar described in _integration.json. Do NOT generate per-app files for each integration; render against _integration.json with the appName from the catalog.

### business-partner
- Business Partner is a single-page admin surface mounted at /company-details/business-partner (BUSINESS_PARTNER_DUMMY_APP_ID is hidden via lambda _: False; the dummy app's actionUrl is rewritten to /company-details/business-partner). The page lists Business Partner Groups and drills down into per-group detail pages — no internal top-level nav.
- Visibility is gated by BusinessPartnerRoot's getBusinessPartnerAppPermissions (hasBPManagePerm OR hasBPReadPerm) plus full/super admin override. We model as full + partial with business_partner scope.
- This is NOT the same as Partner Admin (/partner) — that is the customer-side admin app for accountant/COR/EOR partners. Business Partner here is an HR feature for assigning manager-like relationships.
- Setup flow lives at /company-details/business-partner/setup (a wizard, not a nav node).

### partner-admin
- Partner Admin uses a per-partner sidebar (StandaloneNavigation) whose links are filtered by partner_company.usecase_config.allowed_links from PARTNER_LINKS. The set of visible nav items varies dramatically by partner type (COR partner, contractor partner, EOR, PEO underwriter, WC broker, app vendor, etc.). We surface the union of common admin links and tag them with the partner-type condition.
- All partner nav items are visible only to partner admins (a separate role tied to the partner company; modeled here as 'full' since partner-admin = full admin of the partner company). Partner-side end users are not exposed to this app.
- Nav paths use the canonical /partner/<segment> form (PartnerProtectedRouteElement strips the optional :partnerCompanyId prefix when present).
- Spec asked for Clients/Activity/Settings — Activity loosely maps to Events (and/or Tasks). The full surface includes Clients, Tasks, Events, Documents, Reports, Workflows, Billing, Rev Share, Referrals, Recipes, Insurance, Audits, plus type-specific dashboards.

### accounting-integrations
- Accounting Integrations app dashboard mounts at /accounting-integrations/dashboard/:appName/:entityId/:entityType and exposes per-integration tabs (overview, mappings, spend-management, payroll, rippling-apps).
- Display label may vary depending on the active accounting connector.

### contractor-of-record
- Contractor of Record (Global Contractors Standalone) shows different left-nav categories based on user privileges. Modeled is the new-experience set: dashboard, my-money, my-invoices, my-time, clients.
- Some categories (MY_TIME, CLIENTS) are gated by per-user backend visibility flags from getLeftNavCategories.

### global-payroll
- Global Payroll route paths are deeply nested under /global-payroll/admin/* and /global-payroll/employee/*; the L3 nav approximates the top-level dashboard sections.
- Mounting prefix not strictly verified — assumed '/global-payroll' based on directory naming and shell-suites context.

### international-payroll
- International Payroll appears to share routing infrastructure with Global Payroll (same /global-payroll path tree). The product gate INTERNATIONAL_PAYROLL is a separate spoke handle but the L3 nav structure mirrors Global Payroll.
- Whether International Payroll has a distinct app path or simply gates a subset of Global Payroll views is not fully verified.

### job-codes
- Job Codes is not a top-level app — it lives as an editor (JobCodesEditor) inside Spend Management and Payroll settings flows. No dedicated left rail nav exists.
- Modeled with empty nav since there is no discoverable internal navigation tree.

### my-pay
- Tasks subroute may be conditionally shown only when the user has open tasks; modeled as visible by default.

### payroll
- Run Payroll has multiple sub-flows (run, amendments, bank-accounts) that are flow routes, not left-rail items; only the top-level Dashboard tabs are surfaced as L3 nav.
- Persona scope assumed full+partial for admin-side; partial scope likely 'payroll' but unverified.

### tax-filings
- Tax Filings is not a standalone app in the codebase; it is composed of Tax Payments + Expected Notices + Tax Exemptions tabs inside Run Payroll's dashboard, plus Global Filings module for international.
- Modeled as a virtual L3 nav grouping these tax-related pages.

### peo-overview
- No dedicated 'PEO Overview' single-page route was found in rippling-webapp/app/products/hr/Peo/. The /peo/* routes are predominantly setup flows (onboarding, tax info, workers comp setup, state coverage) rather than a navigable overview/dashboard.
- PEO admins reach PEO content via siblings: Compliance 360 (/compliance/* — tax accounts, peo offboarding), Notices Dashboard (PeoNoticesDashboardV2Container with All / PEO / Compliance Packets / Reports / Periodic Requirements / Form Fields tabs), Workers Comp Dashboard (/peo/workers-comp/dashboard/overview, class-codes), Workplace Posters (/documents/workplace-posters).
- The 'PEO Overview' label in the catalog likely maps to the in-app dashboard widget / event timeline (app/products/hr/Peo/eventTimeline/EventTimeline.tsx) shown to isPeoClient users on the main dashboard, rather than a standalone navigable surface.
- PEO is admin-only (full+partial) and gated by isPeoClient.

### state-tax-accounts
- State Tax Accounts is a single-page grid surfaced at /compliance/tax-accounts (mounted by Compliance 360 routes via StateTaxAccountsWithFein).
- Visibility: PEO/ASO clients only (clientType set, see ComplianceDashboard nav link gating). Wrapped in withFeinSelector — user picks a CompanyTaxInfo (FEIN) to view its state-level accounts.
- Admin-only (compliance_admin permission) since the host route is the Compliance 360 admin dashboard.
- No internal sub-navigation — single Grid component.

### workplace-posters
- Workplace Posters is a single-page grid embedded inside the Documents app at /documents/workplace-posters (also rendered via Hub container).
- Visibility: (isPeoClient || isAsoClient) AND admin.hasAdminPrivileges() — see documentRouteUtils.ts:114.
- PEO apps live behind isPeoClient (or isAsoClient for HR Services). No spoke product gate handle, but it is admin-only.
- No internal tabs/sub-routes — the page is a single Grid component with search/filter only.

### api-tokens
- API Tokens (standalone /api-tokens app) exposes only two nav nodes: Tokens (visible to anyone with api_tokens_full_admin READ) and Settings (full admin only). There is no separate 'Permissions' or 'Audit' tab — token-level permissions are configured per-token within the create/edit flows.
- API Tokens is also surfaced as a sub-tab under /developer when isDeveloperAPITokensEnabled is on (see developer.json). The standalone /api-tokens entry remains the canonical home.
- Visibility is gated by admin.hasApiTokensFullAdminPrivilege(true, READ) — we model this as full+partial with the api_tokens_full_admin scope.

### audit-log
- Audit Log has no dedicated app shell — it is a single-page form mounted at /company-settings/audit-logs that submits an async export request (date range, users, entity types). There is no internal nav (no Recent activity / Filters / Saved Views / Exports tabs in the current implementation).
- Visibility is gated by useShowAuditLogs hook + auditLogPermissionsQueryOptions; partial admins need the audit_log_admin scope. We model this as a single-page app with nav: [].
- The standalone /audit-log path used in the prototype skeleton is not a real route in the webapp — the canonical landing URL is /company-settings/audit-logs.

### company-details
- Company Details (Organizational Data) is admin-only. Each tab is gated by a per-tab permission key (TAB_TO_PERM_KEY_MAP) AND most tabs additionally require isFullAdmin === true to be visible. Pay rates, Piece rates, Business partners, Work pattern are visible to partial admins with the corresponding scope.
- Several tabs are flag-gated: Entities (isEorCaFlowEnabled), Business structure (isBusinessStructureFlagEnabled), Pay rates / Piece rates (isPayRatesAndPieceRatesEnabled), Business partner (isBusinessPartnersEnabled), Work email policies (isWorkEmailPolicyHiringFlowEnabled), and several tabs are hidden in time/project-lake contexts.
- Levels and Work emails (when policy flag is on) have nested sub-tabs (Levels/People; Domains/Policies) — these are modeled as parent/child via the parent field.
- Spec asked for Hierarchy/Departments/Locations/Cost Centers — Departments/Locations exist; 'Hierarchy' maps loosely to Levels (org levels); 'Cost Centers' is not a tab here (cost centers are managed in Accounting/finance contexts).

### company-settings
- Company Settings is admin-only and the visible tab set varies a lot by privileges (full admin sees everything; partial admins see a subset whose default landing depends on which scopes they hold). We model the union of tabs reachable to admins and tag scopes per tab.
- Tabs surfaced here exclude internal/legacy redirect-only routes (templates, bank-account/* sign flows, employee-census subroutes, billing/add-payment-method) and the deeply-nested 'billing' subtabs which are dynamic via getBillingPageSubTabs.
- Some labels in the source are dynamic (e.g. 'Info collected' switches to 'Flow configuration' when isInfoConfigurableTerminationReasonsEnabled). We use the more common 'Info collected'.
- The expected nav set in the spec (General/Branding/Locations/Calendars/Holidays/Departments) does not match this URL surface — Locations / Departments / Calendars / Holidays live under /organizational-data (the company-details app). Company Settings here is the admin-tools home (notifications, billing, API access, branding, security, audit logs, etc.).

### developer
- Developer is admin-only and the visible nav set is computed dynamically from feature/SKU flags (useFunctionsSkuEnabled returns isFunctionsEnabled / isSettingsManagerEnabled / isWebhooksEnabled; usePackageBuilderEnabled / usePackageInstallationEnabled; useDeveloperAPITokensEnabled). The index route redirects to whichever the company has access to.
- API Tokens is also exposed as a standalone app (api-tokens.json); within Developer it appears as a sub-tab when isDeveloperAPITokensEnabled is on.
- Each module's BASE_ROUTE is just its segment (functions, webhooks, settings, api-tokens, packages) and the developer app is mounted at /developer/*. We use /developer/<segment> for paths.
- Spec asked for API Browser/Webhooks/Logs/Documentation — Documentation is not a routed tab (it's an external link via DOCUMENTATION_LINK in the nav 'support' slot); 'Logs' and 'API Browser' do not exist as their own nodes here. The actual nav nodes are Functions / Settings manager / Webhooks / API Tokens / Packages.

### field-management
- Field Management is a stub spoke (FIELD_MANAGEMENT_APP_ID is hidden via lambda _: False in navigation_bar.py:581) — the actual UI is hosted by the DataManager app at /data-manager/field-selector. We use that as the routed home.
- The FieldManagerDashboard exposes only two top-level admin tabs (All fields, Data collected). There is no separate 'Sensitivity' or 'Custom Fields' or 'Settings' page at this layer — sensitivity is configured per-field inline; custom fields are part of CustomObjects/native object templates (separate flows).
- All admin entry points are gated by DataManagerPermission HOC — we model as full+partial with a 'data_manager' admin scope.

### permissions
- Permissions is admin-only — every nav node is gated by per-tab data flags from PermissionAppInfo (e.g. can_view_permission_profiles, can_view_user_permission_profiles, can_view_default_feature_access, can_view_admins_to_migrate). We treat these as the 'permissions' admin scope.
- Permission Overview tab has internal sub-tabs (Profiles vs AMPs) implemented as ?section query params, not URL paths — surfaced as one node here.
- Audit functionality is not a separate tab in /permissions; audit logs for permission changes live in the central /company-settings/audit-logs surface. We do not surface a separate Audit nav for this app.
- Permission flows (create-profile, edit-profile, recipes, profile/:profileId/...) are wizards/details pages, not top-level nav nodes.

### bill-pay
- Bill Pay surfaces inside Spend Management with bills, vendors, and 1099 sub-tabs. Bill detail/edit flows live under /spend-management/bill/:billId and /spend-management/bill_editor.
- The Bill Pay package itself (BillPay/) only exposes pages, with route mounting in SpendManagement.

### corporate-cards
- Corporate Cards lives inside Spend Management's dashboard ('/cards' tab) and includes related transactions, statements, and card editor flows. No standalone /corporate-cards routes file was found.
- Card-specific settings live under /spend-management/settings/cards.

### expenses
- The 'Reimbursements' app is exposed via the Spend Management dashboard 'expenses' tab plus expense-reports, mileage_rate, and tax_rate sub-flows.
- Expense report flows are not surfaced as L3 nav since they are flow routes.

### my-finances
- My Finances is the EE-facing view inside Spend Management. Sections (overview, my expenses, my cards, my reimbursements) are rendered as a single page rather than separate routes, surfaced via the SECTION query param.
- Modeling each EE-facing section as a sub-nav node keyed by section query param.

### procurement
- Procurement is mounted inside Spend Management dashboard. Standalone procurement.routes.tsx exposes request, request_template, and purchase_order flow routes which are not nav items.
- Internal request/PO/template management screens are accessed primarily via list filters within the Procurement tab.

### spend-accounting
- Spend-side Accounting is rendered inside Spend Management's dashboard 'accounting' tab and uses AccountingDashboardRoutes from spendAccountingSetupRoutes for child tabs.
- Sub-tabs (mappings, settings, etc.) come from AccountingDashboardRoutes and may overlap with the Accounting Integrations app dashboard.

### spend-overview
- Spend Overview is the umbrella admin landing for Spend Management; sub-tabs come from DashboardTabPaths and the spend.routes children.
- MY_SPEND and MY_FINANCES are EE-facing and surfaced under separate apps (my-finances).

### transactions
- Transactions is a unified tab inside Spend Management — not a standalone app. It exposes detail views via /spend-management/account/:accountId/transactions/:type/:id but not a deep nav.

### travel
- Travel admin nav (settings, get-started) is gated by TravelPrivileges.CAN_MODIFY_POLICIES_AND_SETTINGS; bookings tab gated by CAN_VIEW_TRIP_INFORMATION.
- Profile tab is EE-facing; Approvals + Bookings cross over manager/admin personas.

### vendors
- The Vendors package contains primarily components/queries; routing is handled inside SpendManagement at /spend-management/dashboard/vendors with a 1099 sub-tab.
- VENDORS gate may be a virtual gate aggregating vendor permissions across BILL_PAY, PROCUREMENT, etc.

### feedback
- Top-level: Feed, Requests (with sub-tabs), Analytics, Settings (admin).
- 'Assigned to team' sub-tab requires canViewAssignedToTeamRequests (manager privilege).
- Analytics is shown to all users (not gated by isAdmin in the navbar code).
- Settings gated by canViewSettings.

### goals
- Top-level Goals navbar: My Goals, All Goals, Team Goals (managers only), Goal Cycles (admin/cycle-creator/config-owner).
- Team Goals depends on currentRole.isManager from app/services/user/role.
- No 'Templates' or 'Reports' tabs at navbar level — those exist within the Goals app via flow setup but not as nav.
- GOALS spoke handle vs gate name mismatch is plausible — verify spoke handle (likely 'Goals' or 'GoalsSpoke') if needed.

### headcount-planning
- Manager-facing 'My Team' subtree shown only when HAS_MY_TEAM_ACCESS — modeled with persona='manager'.
- Plan tab visibility differs by FF (HEADCOUNT_UNIFIED_LANDING_PAGE): collaborator vs viewer access.
- Budget Planning subtree is conditional on IS_BUDGET_APP_* permissions; modeled at top level.
- Plan sub-tabs are query-string driven (?section=overview|position|reporting).

### kudos
- Kudos is an App Studio (catalog product family 'App Studio') product — no first-party UI in rippling-webapp. The surface is generated dynamically from a Studio app definition.
- Expected internal panes (Activity Feed / Send Kudos / Settings) are surfaced by the Studio runtime and not modeled in code; left as nav: [].

### lms
- appPath is /apps/RipplingLMS (legacy URL); newer routes also exist at /lms/* but the navbar is bound to /apps/RipplingLMS as baseURL.
- Admin tabs (Manage Learning, Settings) are gated by canViewManageCourses / canViewSettings. Modeled as full/partial.
- Explore tab only appears if there are self-enrollable courses or learning paths.
- Learning Paths sub-tab only appears if canAddLearningPath.

### one-on-ones
- Top-level dashboard nav: 1:1s (with My/Team sub-tabs for managers), My templates, Templates (admin), Settings (admin).
- hasPartialViewerBeyondDirectReports flag controls whether My/Team sub-tabs are shown vs flat 'My 1:1s' link — corresponds to manager persona.
- templates parent group is 'topics' route; user-templates is /templates.

### performance-improvement-plans
- PIPs is an App Studio (catalog product family 'App Studio') product — no first-party UI in rippling-webapp.
- Expected internal panes (Active Plans / Templates / History) are surfaced by the Studio runtime; left as nav: [].

### performance-reviews
- Base path is /review-cycles (legacy /performance-management still mounted but redirects).
- Top-level navbar exposes Cycles, Question Sets, Settings under /review-cycles/dashboard.
- Question Sets visible to non-admins only when at least one set exists.
- Calibration / Compensation / Templates exist as per-cycle setup flows under /review-cycles/cycle/:cycleId/* — these are flows not standalone tabs.
- EE-as-reviewee surface: each EE sees their reviews via /review-cycles/cycle/:cycleId — modeled implicitly as the dashboard cycles tab is available to ee with non-admin scope.

### recruiting
- ATS2 (Recruiting) and RipplingATS (rippling-ats) share the exact same /ats/* UI; they are differentiated by spoke handle (ATS2 vs RipplingATS) and minor permission gates. Treating them as identical nav structures.
- EE-only surfaces (employee/my-interviews, my-referrals, internal-job-board) are gated by permissions and feature flags, not pure persona. Modeled here as ee/manager visibility.
- Approval policies tab uses APPROVAL_POLICY_TYPES_VALUES; sub-tabs depend on company settings.
- Lucide icons are best-effort heuristics.

### rippling-ats
- Rippling ATS and Recruiting (ATS2) share the exact same /ats/* UI module. Differentiated only by spoke handle (RipplingATS vs ATS2) and minor permission/feature flag gates.
- EE-only surfaces (employee/my-interviews, my-referrals, internal-job-board) are gated by permissions and feature flags.
- Lucide icons are best-effort heuristics.

### succession-planning
- Succession Planning is an App Studio (catalog product family 'App Studio') product — no first-party UI in rippling-webapp.
- Expected internal panes (Roles / Successors / Org Charts) are surfaced by the Studio runtime; left as nav: [].

### surveys
- Pulse base path is /surveys (visible in PulseNavigationHandler redirects).
- Surveys top-tab visible if SURVEY_CREATOR capability OR any surveys exist for the user (mostly admins/managers).
- Templates and Question Bank gated by EMPLOYEE_SURVEYS + APP_ADMIN capabilities (full admin only).
- Settings gated by EMPLOYEE_SURVEYS + APP_ADMIN.

### talent-overview
- Talent Overview has no explicit product gate at the app level — visibility is implied by ownership of any of the underlying talent suite spokes (ATS2, RipplingATS, REVIEW_CYCLES, GOALS, etc.).
- The 'Overview' page accepts an optional :appSlug param so a per-product variant likely exists; the route uses a single component.
- Tasks/Alerts pages are admin-managed but visible to most users.

### my-time
- My Time is the EE-facing root inside Time Products. Each child link is gated by a per-feature Time Products spoke flag (driven by useGetChildFeaturesSuspense(CORE_FEATURE_KEYS_MY_TIME)).
- All sub-tabs are EE persona only. There is no admin variant — admins viewing this hit the same EE pages.
- Title text is derived from spoke `featureName` rather than hard-coded, so display labels here use canonical titles.

### scheduling
- Scheduling continues to expose its legacy /scheduling/dashboard nav alongside Unified Time Products. We model the legacy MainPage tabs since these are still rendered when capabilities indicate scheduling-specific roles.
- Capabilities (isAdmin/isScheduler/isObserver) come from runtime API and not URL — modelling as personas + scopes.
- 'demo_scenarios' link only appears for demo companies — omitted (Rippling-internal-staff-only-ish).

### time-off-tracking
- This is the Time-suite Time Off variant (admin-flavored) — not the legacy /pto employee app. Tabs come from useTimeOffPageLinksSuspense.
- Settings/policies for time-off live under the broader Time Products /policies/time-off and /settings/time-off paths — added separately as additional admin-only nodes.

### time-overview
- The unified Time Products app at /time-products/dashboard exposes Overview as ONE of several top-level destinations. We model the 'time-overview' app's L3 nav as the per-product overview tabs visible on the Overview page (Schedule, Time Tracking, Time Off).
- Visibility per overview tab is gated by featureName from the Time Platform spoke API (CoreFeatureKeys.OVERVIEW + child SchedulingFeatureKeys/TimeTrackingFeatureKeys/TimeOffFeatureKeys). We approximate via product-gate conditions.
- Manager 'Team' variant for overview not modelled — Overview is admin/scheduler/observer-flavored content.

### timecards
- Timecards is the unified Time Products entry for time-attendance admins. Tabs come from useTimecardsPageLinksSuspense (CORE_FEATURE_KEYS_TIMECARDS spoke children).
- Legacy TimeTracking app paths (/time-tracking/dashboard) still exist in routes-v6/routes.tsx (Pending Approval, All Timecards, Time Entries, Reports, Settings) and most redirect into the unified product — modelled the unified L3 nav here.

### alerts
- Alerts and Workflows share the same code module — the product was renamed from 'Alerts' to 'Workflows' on 2023-03-15 (NAME_CHANGE_DATE). The webapp app is mounted at /custom-workflows; ALERTS_NAME='Alerts' is the legacy app-shop record (AlertDashboard.constants.ts:15-16).
- There is no separate /alerts route in the modern app — appPath /alerts likely redirects to /custom-workflows/dashboard. Modeling the legacy nav structure (Overview, Events, Actions, Tags) below.
- Active Alerts == Overview/My Workflows feed. History == Events + Actions (legacy tabs). Templates is a deep-link (templates/select/:id?) not a top-level nav item.
- Events/Actions tabs are gated to admins/partial admins/partners. Tags tab is gated by isTagsEnabled (true for non-partners).

### approvals
- Approvals is universal — every Rippling user can be a requester or a reviewer. The four list tabs (Needs my review / My requests / Reviewed / All requests) are visible to all personas; pending counts/visibility per tab are gated by per-policy reviewer scope at runtime, not by frontend visibility.
- Approval Policies tab is only shown when the company has at least one policy (shouldShowPoliciesTab). In practice this maps to admin personas (full/partial with permissions admin) but the UI gate is a data check, not a static permission.
- Templates ('templates/select/:id') is wrapped in withSuperAdmin in the route file — it is reachable by full admins who can create new policies. Settings tab now redirects to /account-settings/notification (kept for backward compat), so we do not surface it as a distinct nav node.

### inbox
- Inbox is universal (all personas). The two top-level tabs are Pending and Resolved task lists. There is no By App / Filters / Settings sub-nav at the L3 level — those are in-page filter chips/dropdowns, not URL routes.
- Task detail (/inbox/task/:id) is a deep-link, not a nav item.
- An EmployeeSelector dropdown is rendered as titleContent for admins viewing on behalf of others — modeled as a control, not a nav item.

### meetings
- Only the Recordings tab is currently visible — the codebase explicitly comments out Recorders, Insights, and Settings pending permission work (AppDashboard.tsx:27-43). Routes for those pages exist (recorders, insights, settings) but are not surfaced as nav links.
- Recordings is universal — no role gating in the link list. Settings/Insights would be admin-only when enabled.
- /meetings/recorded/:id is a deep-link to a call detail page, not a nav item.

### notification-center
- The actual mounted base path is /notification-center (NOTIFICATION_CENTER_ROUTE.BASE). The appPath /notifications likely redirects or is an alias.
- L3 nav has only one tab — Alerts (the All Notifications/alerts feed). 'Settings' is rendered inline as 'showNotificationPreferences' on the same Alerts page rather than a separate tab.
- Alert detail page (/notification-center/alert/:alertId) is a deep-link, not a nav item.

### rippling-intelligence
- Rippling AI's URL surface (/ai) is admin-only — Policy Hub, Permissions, Usage. The end-user 'Chat' experience is delivered as a global side panel/launcher (ChatAssistant) accessible from anywhere in the product, not as a route under /ai. We surface only the routed admin nav here.
- Usage is an admin sub-page with its own internal tabs (overview, users) — modeled here as one node 'Usage' since the index redirects to /ai/settings/usage/overview.
- Install flow (/ai/install) is shown only when the AI assistant spoke is not yet installed — gated by RI_TAGS.INSTALL feature flag and App.isAppInstalled. Not surfaced as nav.
- Settings index redirects to /ai/settings/policy-hub — there is no separate '/ai/chat' route at this layer.

### universal-search
- Universal Search is primarily a global flyout/launcher invoked from the top bar — not a destination with its own L3 nav.
- The only mounted route is a dashboard at PATHS.DASHBOARD that renders an AppIntegrationsGrid (admin configuration of search integrations). Not surfaced as L3 nav since the app itself is a flyout.
- Returning empty L3 nav per spec.

### workflows
- Workflows is mounted at /custom-workflows (the modern dashboard); /workflows likely redirects there. Was renamed from 'Alerts' on 2023-03-15.
- Modern v2 dashboard is gated by isDashboardV2Enabled (= hasAtLeastPartialAdminPermissions). When admin: shows nested My Workflows / All Workflows under Dashboard. When non-admin: just My Workflows.
- Analytics tab gated by isAnalyticsEnabled (true for non-partners).
- Tags v2 gated by isV2TagsTabEnabled (FF) AND isTagsEnabled (non-partner).
- Legacy section appears only when isLegacyDashboardEnabled — it nests overview/events/actions/tags under a 'Legacy' parent. Modeling only the v2 (modern) nav below; legacy variants captured under the alerts app.
- Per spec, Workflows is universal — included as full+partial+manager+ee on Dashboard since non-admins see 'My Workflows'. Variants noted via personaVariants where applicable.

