# Shell frame

The surfaces that surround the product apps: sidebar header/footer, top bar, user menu, app launcher.

## Sidebar — first section (9)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| My Implementation | `/company-onboarding` | Full | — | hasOnboardingImplementationPlan; !isContractWaiting \|\| creationSource==PAYROLL_FASTTRACK \|\| creationSource==SPEND_FASTTRACK; !isTimeSelfServe | — | — | `my-implementation` | `app/appShell/components/navigation/config/getSideNavConfig.ts:158` |
| My Implementation | `/peo/onboarding` | Full | `peo` | company.hasPeoInvitation; !company.isContractWaiting; peoOnboardingPlan.status!=COMPLETED | — | — | `my-implementation` | `app/appShell/components/navigation/config/getSideNavConfig.ts:189` |
| Home | `/dashboard` | Full, Partial, Mgr, EE | — | isLoggedIn; !hideIconsForFastTrack | — | ee:  (/dashboard) | — | `app/appShell/components/navigation/config/getSideNavConfig.ts:301` |
| Hire | `/navigate-role-hire` | Full, Partial(canRequestHire) | — | perm: canRequestHire; !isEmployeeView; !isStandaloneCompany | — | — | `add-person` | `app/appShell/components/navigation/config/getSideNavConfig.ts:117` |
| Offboard | `/role-terminate/complete/select` | Full, Partial(canRequestTerminate) | — | perm: canRequestTerminate; !isEmployeeView; !isStandaloneCompany | — | — | `remove-person` | `app/appShell/components/navigation/config/getSideNavConfig.ts:126` |
| Add People | `/add-people` | Full, Partial(canRequestHire) | — | perm: canRequestHire; !isEmployeeView; isStandaloneCompany | — | — | `add-person` | `app/appShell/components/navigation/config/getSideNavConfig.ts:93` |
| Remove People | `/remove-people` | Full, Partial(canRequestTerminate) | — | perm: canRequestTerminate; !isEmployeeView; isStandaloneCompany | — | — | `remove-person` | `app/appShell/components/navigation/config/getSideNavConfig.ts:104` |
| Org Chart | `/org-chart` | Full, Partial, Mgr, EE | — | isOrgChartVisible | — | — | — | `app/appShell/components/navigation/config/getSideNavConfig.ts:321` |
| Reports | `/reports` | Full, Partial(reports_admin) | — | perm: reports.view; sideBarData.Reports.isTopLevelApp | — | — | — | `app/appShell/components/navigation/config/getSideNavConfig.ts:338` |

## Sidebar — third section (4)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Global Workforce | `/country-page` | Full | — | !isEmployeeView; !isITTrialCompany | — | — | — | `app/appShell/components/navigation/config/getSideNavConfig.ts:64` |
| App Shop | `/app-shop` | Full, Partial, Mgr, EE | — | — | — | — | — | `app/core/components/navigation/config.ts:3` |
| Help | `/help` | Full, Partial, Mgr, EE | — | !isITTrialCompany; !isSelfServeCompanyWithoutContractSigned | — | — | — | `app/appShell/components/navigation/config/getSideNavConfig.ts:38` |
| Referral | `/referral` | Full, Partial, Mgr, EE | — | — | — | — | — | `app/appShell/components/navigation/config/getSideNavConfig.ts:46` |

## Top bar (22)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Rippling | `/dashboard` | Full, Partial, Mgr, EE | — | — | — | ee:  (/dashboard) | — | `app/appShell/components/navigation/Navigation.tsx:718` |
| App Launcher | — | Full, Partial, Mgr, EE | — | isLoggedIn; !isDashboardPage \|\| isSmallScreen | — | — | — | `app/appShell/components/navigation/Navigation.tsx:735` |
| Labs | — | Full, Partial, Mgr, EE | — | isLabsEnabled | — | — | — | `app/appShell/components/navigation/Navigation.tsx:743` |
| IT Trial Countdown | — | Full, Partial | `it_trial` | isITTrial; !isSmallScreen; !isEmployeeView; !ff:hardware-revamp-it-trial | — | — | — | `app/appShell/components/navigation/Navigation.tsx:809` |
| Search | — | Full, Partial, Mgr, EE | — | isSearchVisible; !hideSectionsForFastTrack | — | — | — | `app/appShell/components/navigation/Navigation.tsx:819` |
| Trial Days Remaining | — | Full, Partial, Mgr, EE | — | isTrialCompany; !isSmallScreen; !partnerCompanyIdAccessingClient | — | — | — | `app/appShell/components/navigation/Navigation.tsx:524` |
| Support | — | Full, Partial, Mgr, EE | — | !isPartnerDashBoard; !hideSectionsForFastTrack; !isITTrial; !isSelfServeCompanyWithoutContractSigned | — | ee: Support | — | `app/appShell/components/navigation/Navigation.tsx:534` |
| Accessibility | — | Full, Partial, Mgr, EE | — | ff:webapp-audioeye-integration; !hideSectionsForFastTrack | — | — | — | `app/appShell/components/navigation/Navigation.tsx:540` |
| Translation Tools | — | Full, Partial, Mgr, EE | — | canShowScreenshotTools | — | — | — | `app/appShell/components/navigation/Navigation.tsx:548` |
| Chat | — | Full, Partial, Mgr, EE | `rippling_chat` | hasChatAppInstall | — | — | — | `app/appShell/components/navigation/Navigation.tsx:555` |
| Tasks | — | Full, Partial, Mgr, EE | — | showNotificationWidgets; !isNonDRWPCPartnerCompany; !hideSectionsForFastTrack; !isSelfServeCompanyWithoutContractSigned | — | — | — | `app/appShell/components/navigation/Navigation.tsx:570` |
| Notifications | — | Full, Partial, Mgr, EE | — | showNotificationWidgets; !isNonDRWPCPartnerCompany; !hideSectionsForFastTrack; !isSelfServeCompanyWithoutContractSigned | — | — | — | `app/appShell/components/navigation/Navigation.tsx:581` |
| AI Assistant | — | Full, Partial, Mgr, EE | — | ff:proj-unity-search-ai-chat-assistant; canUseChat; !isNonDRWPCPartnerCompany; !hideSectionsForFastTrack; !isSelfServeCompanyWithoutContractSigned | — | — | — | `app/appShell/components/navigation/Navigation.tsx:594` |
| Feedback | — | Full, Partial, Mgr, EE | — | ff:feedback-widget | — | — | — | `app/appShell/components/navigation/Navigation.tsx:919` |
| Migration Info | — | Full, Partial, Mgr, EE | — | isLoggedIn; hasMigrationContext | — | — | — | `app/appShell/components/navigation/Navigation.tsx:907` |
| Sandbox Environment | — | Full, Partial, Mgr, EE | — | isSandboxPreviewEnvironment \|\| isLoggedInAs | — | — | — | `app/appShell/components/navigation/Navigation.tsx:696` |
| Company Info Bar | — | Full, Partial, Mgr, EE | — | isSpoofed \|\| partnerCompanyIdAccessingClient | — | — | — | `app/appShell/components/navigation/Navigation.tsx:695` |
| Language | — | Full, Partial, Mgr, EE | — | shouldCompact | — | — | — | `app/appShell/components/navigation/Navigation.tsx:770` |
| Account Menu | — | Full, Partial, Mgr, EE | — | isLoggedIn | — | — | — | `app/appShell/components/navigation/Navigation.tsx:883` |
| Company Logo | — | Full, Partial, Mgr, EE | — | isUnitySearchEnabled; isCompanyLogoAvailable | — | — | — | `app/appShell/components/navigation/userMenu/index.tsx:223` |
| Company Name | — | Full, Partial, Mgr, EE | — | isUnitySearchEnabled; !isSmallScreen | — | — | — | `app/appShell/components/navigation/userMenu/index.tsx:201` |
| Sign Out | — | Full, Partial, Mgr, EE | — | shouldCompact | — | — | — | `app/appShell/components/navigation/Navigation.tsx:805` |

## User menu (15)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| User Name | — | Full, Partial, Mgr, EE | — | — | — | — | — | `app/appShell/components/navigation/userMenu/helpers.ts:274` |
| Profile | `/profile` | Full, Partial, Mgr, EE | — | !isNonDRWPCPartnerCompany; !partnerCompanyIdAccessingClient | — | — | — | `app/appShell/components/navigation/userMenu/helpers.ts:78` |
| Referral | `/referral` | Full, Partial, Mgr, EE | — | !isNonDRWPCPartnerCompany; !partnerCompanyIdAccessingClient; !hideSectionsForFastTrack | — | — | — | `app/appShell/components/navigation/userMenu/helpers.ts:82` |
| Account Settings | `/account-settings` | Full, Partial, Mgr, EE | — | — | — | — | — | `app/appShell/components/navigation/userMenu/helpers.ts:86` |
| My Partner Profile | `/partner/profile` | Full, Partial, Mgr, EE | — | isNonDRWPCPartnerCompany \|\| partnerCompanyIdAccessingClient | — | — | — | `app/appShell/components/navigation/userMenu/helpers.ts:50` |
| Sign Out | — | Full, Partial, Mgr, EE | — | — | — | — | — | `app/appShell/components/navigation/userMenu/helpers.ts:42` |
| Previous Profiles | — | EE | — | hasTerminatedProfilesInSameCompany | — | — | — | `app/appShell/components/navigation/userMenu/data.ts:267` |
| Account Switcher | — | Full, Partial, Mgr, EE | — | accounts.length > 0; !isPartnerAccessingClient | — | — | — | `app/appShell/components/navigation/userMenu/data.ts:437` |
| Admin | — | Full, Partial | — | role.isAdmin \|\| role.isPartialAdmin | — | — | — | `app/appShell/components/navigation/userMenu/data.ts:53` |
| Employee | — | Full, Partial, Mgr, EE | — | role.isEmployee; role.roleState!=INIT | — | — | — | `app/appShell/components/navigation/userMenu/data.ts:57` |
| Contractor | — | EE | — | role.companyEmploymentType.isContractor | — | — | — | `app/appShell/components/navigation/userMenu/data.ts:61` |
| Legal | — | Full, Partial, Mgr, EE | — | !isITTrialCompany | — | — | — | `app/appShell/components/navigation/userMenu/helpers.ts:100` |
| Licensing | `/licensing` | Full, Partial, Mgr, EE | — | !isITTrialCompany | — | — | — | `app/appShell/components/navigation/userMenu/helpers.ts:106` |
| Terms of Service | `/legal` | Full, Partial, Mgr, EE | — | !isITTrialCompany | — | — | — | `app/appShell/components/navigation/userMenu/helpers.ts:111` |
| Accessibility Statement | `/accessibility-statement` | Full, Partial, Mgr, EE | — | !isITTrialCompany | — | — | — | `app/appShell/components/navigation/userMenu/helpers.ts:116` |

## App launcher (10)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| First Section (Mirrors Sidebar) | — | Full, Partial, Mgr, EE | — | — | — | — | — | `app/appShell/components/navigation/globalNavigation/index.tsx:303` |
| Favorites | — | Full, Partial, Mgr, EE | — | !isPartnerDashBoard | — | — | — | `app/appShell/components/navigation/globalNavigation/index.tsx:333` |
| Add Favorites | — | Full, Partial, Mgr, EE | — | !hasFavorites; !isSmallScreen; !isPartnerDashBoard | — | — | — | `app/appShell/components/navigation/globalNavigation/index.tsx:364` |
| Products | — | Full, Partial, Mgr, EE | — | — | — | — | — | `app/appShell/components/navigation/globalNavigation/index.tsx:323` |
| Platform | — | Full, Partial, Mgr, EE | — | !isPartnerDashBoard | — | — | — | `app/appShell/components/navigation/globalNavigation/index.tsx:406` |
| Custom Apps | — | Full, Partial(custom_apps_admin) | — | — | — | — | — | `app/appShell/components/navigation/config/getSideNavConfig.ts:220` |
| App Shop | `/app-shop` | Full, Partial, Mgr, EE | — | — | — | — | — | `app/core/components/navigation/config.ts:3` |
| Help | `/help` | Full, Partial, Mgr, EE | — | !isITTrialCompany; !isSelfServeCompanyWithoutContractSigned | — | — | — | `app/appShell/components/navigation/config/getSideNavConfig.ts:38` |
| Global Workforce | `/country-page` | Full | — | !isEmployeeView; !isITTrialCompany | — | — | — | `app/appShell/components/navigation/config/getSideNavConfig.ts:64` |
| Referral | `/referral` | Full, Partial, Mgr, EE | — | — | — | — | — | `app/appShell/components/navigation/globalNavigation/index.tsx:458` |

