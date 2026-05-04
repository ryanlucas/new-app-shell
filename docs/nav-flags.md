# Navigation flags inventory (L1 / L2 only)

Every condition that gates an L1 (suite, sidebar entry, top-bar widget, user-menu item, app-launcher tile) or L2 (app inside a suite) navigation node, plus plan-level conditions implied by being on a given plan. Atoms inside compound expressions are extracted and rolled up.

**52 flags total** across L1 + L2. The renderer evaluates these in `src/lib/visibility.ts::evalCondition`.

## Lifecycle / company state

Where the company sits in its sales / onboarding lifecycle.

| Flag | What it means | Used by | Compound expressions |
|---|---|---|---|
| `hasOnboardingImplementationPlan` | Company is in active onboarding (implementation checklist visible). | frame:firstSection (implementation-plan) | — |
| `isAsoClient` | Customer is on Rippling HR Services / ASO. | proposal (ryan-v1:plan(hr-services)) | — |
| `isContractWaiting` | Sales contract not yet signed. | frame:firstSection (implementation-plan) | `!isContractWaiting \|\| creationSource==PAYROLL_FASTTRACK \|\| creationSource==SPEND_FASTTRACK` |
| `isPeoClient` | Customer is on Rippling PEO (co-employment). | proposal (ryan-v1:plan(peo)) | — |
| `isSelfServeCompanyWithoutContractSigned` | Self-serve sign-up, contract not yet signed. | frame:thirdSection (help); frame:topBar (4); frame:appLauncher (app-launcher-help) | `!isSelfServeCompanyWithoutContractSigned` |
| `isStandaloneCompany` | Customer doesn't use Rippling as their HRIS — only owns specific products (e.g. standalone Spend or IT). | plan (4); app (pto); frame:firstSection (4) | `!isStandaloneCompany` |

## Session / surface

How the user is accessing the shell (direct, spoofed, partner, mobile).

| Flag | What it means | Used by | Compound expressions |
|---|---|---|---|
| `isLoggedInAs` | Same as isSpoofed. | frame:topBar (sandbox-environment-bar) | `isSandboxPreviewEnvironment \|\| isLoggedInAs` |
| `isPartnerAccessingClient` | Partner (e.g. accountant) accessing a client's company. | frame:userMenu (account-switcher) | `!isPartnerAccessingClient` |
| `isPartnerDashBoard` | Partner is viewing their partner dashboard. | frame:topBar (support); frame:appLauncher (app-launcher-favorites, app-launcher-favorites-placeholder, app-launcher-platform) | `!isPartnerDashBoard` |
| `isSandboxPreviewEnvironment` | Sandbox / preview environment. | frame:topBar (sandbox-environment-bar) | `isSandboxPreviewEnvironment \|\| isLoggedInAs` |
| `isSmallScreen` | Viewport below mobile breakpoint. | frame:topBar (4); frame:appLauncher (app-launcher-favorites-placeholder) | `!isDashboardPage \|\| isSmallScreen`, `!isSmallScreen` |
| `isSpoofed` | Internal Rippling staff is logged in as this user (impersonation). | frame:topBar (company-info-bar) | `isSpoofed \|\| partnerCompanyIdAccessingClient` |

## Feature flags (`ff:*`)

Generic feature-flag references (LaunchDarkly-style).

| Flag | What it means | Used by | Compound expressions |
|---|---|---|---|
| `ff:feedback-widget` | — | frame:topBar (feedback-widget) | — |
| `ff:hardware-revamp-it-trial` | — | frame:topBar (it-trial-countdown) | `!ff:hardware-revamp-it-trial` |
| `ff:proj-unity-search-ai-chat-assistant` | — | frame:topBar (ai-assistant-trigger) | — |
| `ff:webapp-audioeye-integration` | — | frame:topBar (accessibility-widget) | — |

## Other / app-specific

Long tail of bespoke conditions on individual L1/L2 entries.

| Flag | What it means | Used by | Compound expressions |
|---|---|---|---|
| `accounts.length > 0` | — | frame:userMenu (account-switcher) | — |
| `canShowScreenshotTools` | — | frame:topBar (translation-tools) | — |
| `canUseChat` | — | frame:topBar (ai-assistant-trigger) | — |
| `company.hasPeoInvitation` | — | frame:firstSection (implementation-plan-peo) | — |
| `company.isContractWaiting` | — | frame:firstSection (implementation-plan-peo) | `!company.isContractWaiting` |
| `creationSource==PAYROLL_FASTTRACK` | Company signed up via Payroll fast-track flow. | frame:firstSection (implementation-plan) | `!isContractWaiting \|\| creationSource==PAYROLL_FASTTRACK \|\| creationSource==SPEND_FASTTRACK` |
| `creationSource==SPEND_FASTTRACK` | Company signed up via Spend fast-track flow. | frame:firstSection (implementation-plan) | `!isContractWaiting \|\| creationSource==PAYROLL_FASTTRACK \|\| creationSource==SPEND_FASTTRACK` |
| `hasChatAppInstall` | — | frame:topBar (chat-widget) | — |
| `hasFavorites` | — | frame:appLauncher (app-launcher-favorites-placeholder) | `!hasFavorites` |
| `hasMigrationContext` | — | frame:topBar (migration-info-bar) | — |
| `hasTerminatedProfilesInSameCompany` | — | frame:userMenu (previous-profiles) | — |
| `hideIconsForFastTrack` | — | frame:firstSection (home) | `!hideIconsForFastTrack` |
| `hideSectionsForFastTrack` | — | frame:topBar (6); frame:userMenu (referral-user-menu) | `!hideSectionsForFastTrack` |
| `isCompanyLogoAvailable` | — | frame:topBar (company-logo-pip) | — |
| `isDashboardPage` | — | frame:topBar (app-launcher-trigger) | `!isDashboardPage \|\| isSmallScreen` |
| `isEmployeeView` | — | frame:firstSection (4); frame:thirdSection (global-workforce); frame:topBar (it-trial-countdown); frame:appLauncher (app-launcher-global-workforce) | `!isEmployeeView` |
| `isITTrial` | — | frame:topBar (it-trial-countdown, support) | `!isITTrial` |
| `isITTrialCompany` | — | frame:thirdSection (global-workforce, help); frame:userMenu (4); frame:appLauncher (app-launcher-global-workforce, app-launcher-help) | `!isITTrialCompany` |
| `isLabsEnabled` | — | frame:topBar (labs-branding) | — |
| `isLoggedIn` | — | frame:firstSection (home); frame:topBar (app-launcher-trigger, migration-info-bar, user-menu-trigger) | — |
| `isNonDRWPCPartnerCompany` | — | frame:topBar (ai-assistant-trigger, bell-widget, tasks-widget); frame:userMenu (my-partner-profile, profile, referral-user-menu) | `!isNonDRWPCPartnerCompany`, `isNonDRWPCPartnerCompany \|\| partnerCompanyIdAccessingClient` |
| `isSearchVisible` | — | frame:topBar (search-bar) | — |
| `isTimeSelfServe` | — | frame:firstSection (implementation-plan) | `!isTimeSelfServe` |
| `isTrialCompany` | — | frame:topBar (remaining-days-countdown) | — |
| `isUnitySearchEnabled` | — | frame:topBar (company-logo-pip, company-name-display) | — |
| `partnerCompanyIdAccessingClient` | — | frame:topBar (company-info-bar, remaining-days-countdown); frame:userMenu (my-partner-profile, profile, referral-user-menu) | `!partnerCompanyIdAccessingClient`, `isNonDRWPCPartnerCompany \|\| partnerCompanyIdAccessingClient`, `isSpoofed \|\| partnerCompanyIdAccessingClient` |
| `peoOnboardingPlan.status!=COMPLETED` | — | frame:firstSection (implementation-plan-peo) | — |
| `role.companyEmploymentType.isContractor` | — | frame:userMenu (role-switcher-contractor) | — |
| `role.isAdmin` | — | frame:userMenu (role-switcher-admin) | `role.isAdmin \|\| role.isPartialAdmin` |
| `role.isEmployee` | — | frame:userMenu (role-switcher-employee) | — |
| `role.isPartialAdmin` | — | frame:userMenu (role-switcher-admin) | `role.isAdmin \|\| role.isPartialAdmin` |
| `role.roleState!=INIT` | — | frame:userMenu (role-switcher-employee) | — |
| `shouldCompact` | — | frame:topBar (language-switcher, sign-out-compact) | — |
| `showNotificationWidgets` | — | frame:topBar (bell-widget, tasks-widget) | — |
| `sideBarData.Reports.isTopLevelApp` | — | frame:firstSection (reports) | — |
| `timePlatformInstalled` | New Time platform replaces legacy PTO/Time Off surfaces. | app (pto) | `!timePlatformInstalled` |

---

**Pasting into Google Docs:** copy the table cells, paste into a Doc with `⌘⇧V` (paste without formatting), then Format → Table → Convert text to table (separator: `|`). Or render the markdown in a viewer (e.g. GitHub) and paste from there — the table comes through cleanly.