# Talent  `talent`

**Suite visibility:** Full, Partial(talent_admin), Mgr, EE  
**Product gate:** —  
**Cross-sell:** locked → full, partial · SidenavTalent  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:75-85`

## Apps (13)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Talent Overview | `/talent` | Full, Partial(talent_admin) | — | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:177` |
| Recruiting | `/recruiting` | Full, Partial(recruiting_admin), Mgr | `ATS2` | — | locked → full, partial · SidenavTalent | — | — | `app/cross_sell/unpurchased_sku/unpurchased_sku_nav_items.py:382` |
| ATS | `/ats` | Full, Partial(recruiting_admin), Mgr | `RIPPLINGATS` | — | locked → full, partial · SidenavTalent | — | — | `app/hub/spoke_models.py:753` |
| Learning Management | `/lms` | Full, Partial(lms_admin), Mgr, EE | `RIPPLINGLMS` | — | locked → full, partial · SidenavTalent | ee: My Learning (/me/learning) | — | `app/hub/spoke_models.py:754` |
| Performance Reviews | `/performance/reviews` | Full, Partial(performance_admin), Mgr, EE | `REVIEW_CYCLES` | — | locked → full, partial · SidenavTalent | ee: My Reviews (/me/performance) | — | `app/apps/utils/navigation_bar.py:957` |
| Goals | `/goals` | Full, Partial(goals_admin), Mgr, EE | `GOALS` | — | locked → full, partial · SidenavTalent | ee: My Goals (/me/goals) | — | `app/apps/utils/navigation_bar.py:987` |
| 1:1s | `/one-on-ones` | Mgr, EE | `ONE_ON_ONES` | — | locked → full, partial · SidenavTalent | — | — | `app/apps/utils/navigation_bar.py:1021` |
| Feedback | `/feedback` | Full, Partial(talent_admin), Mgr, EE | `FEEDBACK` | — | locked → full, partial · SidenavTalent | — | — | `app/apps/utils/navigation_bar.py:1062` |
| Surveys | `/surveys` | Full, Partial(talent_admin), Mgr, EE | `PULSE` | — | locked → full, partial · SidenavTalent | — | — | `app/cross_sell/unpurchased_sku/unpurchased_sku_nav_items.py:355` |
| Headcount Planning | `/headcount-planning` | Full, Partial(headcount_admin) | `HEADCOUNT` | perm: PERM_HEADCOUNT_APP_OWNER | locked → full, partial · SidenavTalent | — | — | `app/cross_sell/unpurchased_sku/unpurchased_sku_nav_items.py:372` |
| Kudos | `/kudos` | Full, Partial(talent_admin), Mgr, EE | `KUDOS` | — | locked → full, partial · SidenavTalent | — | — | `app/hub/spoke_models.py:853` |
| Succession Planning | `/succession-planning` | Full, Partial(talent_admin) | `SUCCESSION_PLANNING` | — | locked → full, partial · SidenavTalent | — | — | `app/hub/spoke_models.py:854` |
| Performance Improvement Plans | `/pip` | Full, Partial(performance_admin), Mgr | `PERFORMANCE_IMPROVEMENT_PLANS` | — | locked → full, partial · SidenavTalent | — | — | `app/hub/spoke_models.py:855` |

## App L3 internal navigation

### Talent Overview  `talent-overview`

3 nodes · path `/talent` · gate `—`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/talent/overview` | Full, Partial, Mgr, EE | — | — | — | — | — | `app/products/hr/TalentOverview/talentOverviewChildren.routes.tsx:36-45` |
| Alerts | `/talent/alerts` | Full, Partial, Mgr, EE | — | — | — | — | — | `app/products/hr/TalentOverview/talentOverviewChildren.routes.tsx:46-56` |
| Tasks | `/talent/tasks` | Full, Partial, Mgr, EE | — | — | — | — | — | `app/products/hr/TalentOverview/talentOverviewChildren.routes.tsx:57-67` |

### Recruiting  `recruiting`

39 nodes · path `/recruiting` · gate `ATS2`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/ats/overview` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:177-221` |
| New applications | `/ats/overview/new-applications` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:181-187` |
| To be scheduled | `/ats/overview/to-be-scheduled` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:188-195` |
| Scheduled interviews | `/ats/overview/scheduled` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:196-203` |
| Decision needed | `/ats/overview/decision-needed` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:204-211` |
| In offer stage | `/ats/overview/in-offer` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:212-219` |
| My interviews | `/ats/employee` | Full, Partial, Mgr, EE | `ATS2` | — | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:222-241` |
| Current & upcoming | `/ats/employee/my-interviews` | Full, Partial, Mgr, EE | `ATS2` | — | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:228-231` |
| Past | `/ats/employee/my-past-interviews` | Full, Partial, Mgr, EE | `ATS2` | — | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:232-235` |
| Feedback quality | `/ats/employee/my-feedback-quality` | Full, Partial, Mgr, EE | `ATS2` | — | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:236-239` |
| Recordings | `/ats/recordings` | Full, Partial(recruiting), Mgr | `ATS2` | shouldShowRecordings | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:243-246` |
| Job requisitions | `/ats/job-requisitions` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:247-269` |
| Open | `/ats/job-requisitions/open` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:88-94` |
| Pending approval | `/ats/job-requisitions/pending-approval` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:95-101` |
| Draft | `/ats/job-requisitions/draft` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:102-108` |
| Closed | `/ats/job-requisitions/closed` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:109-115` |
| Open headcount | `/ats/open-headcount` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAdminPrivileges; shouldShowHeadcountPlanning; !isMobile | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:270-274` |
| Candidates | `/ats/candidates` | Full, Partial(recruiting), Mgr | `ATS2` | perm: appSettingsPermission.prospect_admin OR appAdmin | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:275-289` |
| Candidates | `/ats/candidates/overview` | Full, Partial(recruiting), Mgr | `ATS2` | perm: appSettingsPermission.prospect_admin OR appAdmin | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:144-153` |
| Applications | `/ats/candidates/applications` | Full, Partial(recruiting), Mgr | `ATS2` | perm: appSettingsPermission.prospect_admin OR appAdmin | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:154-161` |
| Applications | `/ats/applications` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAdminPrivileges AND !canViewCandidatesTab | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:290-294` |
| Requests | `/ats/requests` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:295-317` |
| My requests | `/ats/requests/my-requests` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:240-246` |
| Needs my review | `/ats/requests/needs-my-review` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:247-255` |
| Reviewed | `/ats/requests/reviewed` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:256-262` |
| All requests | `/ats/requests/all-requests` | Full, Partial(recruiting), Mgr | `ATS2` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:263-272` |
| Approval policies | `/ats/approval-policies` | Full, Partial(recruiting) | `ATS2` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:318-375` |
| Offer letter | `/ats/approval-policies/offer-letter` | Full, Partial(recruiting) | `ATS2` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:323-326` |
| Job requisition create | `/ats/approval-policies/job-requisition-create` | Full, Partial(recruiting) | `ATS2` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:327-339` |
| Job requisition edit | `/ats/approval-policies/job-requisition-edit` | Full, Partial(recruiting) | `ATS2` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:340-352` |
| Decision to hire | `/ats/approval-policies/decision-to-offer` | Full, Partial(recruiting) | `ATS2` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:353-364` |
| My referrals | `/ats/employee/referrals` | Full, Partial, Mgr, EE | `ATS2` | shouldShowReferrals | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:376-380` |
| Internal job board | `/ats/internal-job-board` | Full, Partial, Mgr, EE | `ATS2` | shouldShowInternalJobBoard | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:381-385` |
| Candidate surveys | `/ats/candidate-surveys` | Full, Partial(recruiting) | `ATS2` | perm: ats.hasAppAdminPermissions; shouldShowCandidateSurvey; !isMobile | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:386-405` |
| Active | `/ats/candidate-surveys/active` | Full, Partial(recruiting) | `ATS2` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:181-186` |
| Archived | `/ats/candidate-surveys/archived` | Full, Partial(recruiting) | `ATS2` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:187-193` |
| Draft | `/ats/candidate-surveys/draft` | Full, Partial(recruiting) | `ATS2` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:194-200` |
| Templates & defaults | `/ats/templates` | Full, Partial(recruiting) | `ATS2` | perm: appSettings.edit_settings OR edit_feedback_forms; !isMobile | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:406-410` |
| Settings | `/ats/settings` | Full, Partial(recruiting) | `ATS2` | perm: appSettings.edit_settings; !isMobile | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:411-415` |

### ATS  `rippling-ats`

39 nodes · path `/ats` · gate `RIPPLINGATS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/ats/overview` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:177-221` |
| New applications | `/ats/overview/new-applications` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:181-187` |
| To be scheduled | `/ats/overview/to-be-scheduled` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:188-195` |
| Scheduled interviews | `/ats/overview/scheduled` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:196-203` |
| Decision needed | `/ats/overview/decision-needed` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:204-211` |
| In offer stage | `/ats/overview/in-offer` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:212-219` |
| My interviews | `/ats/employee` | Full, Partial, Mgr, EE | `RIPPLINGATS` | — | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:222-241` |
| Current & upcoming | `/ats/employee/my-interviews` | Full, Partial, Mgr, EE | `RIPPLINGATS` | — | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:228-231` |
| Past | `/ats/employee/my-past-interviews` | Full, Partial, Mgr, EE | `RIPPLINGATS` | — | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:232-235` |
| Feedback quality | `/ats/employee/my-feedback-quality` | Full, Partial, Mgr, EE | `RIPPLINGATS` | — | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:236-239` |
| Recordings | `/ats/recordings` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | shouldShowRecordings | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:243-246` |
| Job requisitions | `/ats/job-requisitions` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:247-269` |
| Open | `/ats/job-requisitions/open` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:88-94` |
| Pending approval | `/ats/job-requisitions/pending-approval` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:95-101` |
| Draft | `/ats/job-requisitions/draft` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:102-108` |
| Closed | `/ats/job-requisitions/closed` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAdminPrivileges | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:109-115` |
| Open headcount | `/ats/open-headcount` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAdminPrivileges; shouldShowHeadcountPlanning; !isMobile | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:270-274` |
| Candidates | `/ats/candidates` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: appSettingsPermission.prospect_admin OR appAdmin | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:275-289` |
| Candidates | `/ats/candidates/overview` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: appSettingsPermission.prospect_admin OR appAdmin | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:144-153` |
| Applications | `/ats/candidates/applications` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: appSettingsPermission.prospect_admin OR appAdmin | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:154-161` |
| Applications | `/ats/applications` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAdminPrivileges AND !canViewCandidatesTab | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:290-294` |
| Requests | `/ats/requests` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:295-317` |
| My requests | `/ats/requests/my-requests` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:240-246` |
| Needs my review | `/ats/requests/needs-my-review` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:247-255` |
| Reviewed | `/ats/requests/reviewed` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:256-262` |
| All requests | `/ats/requests/all-requests` | Full, Partial(recruiting), Mgr | `RIPPLINGATS` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:263-272` |
| Approval policies | `/ats/approval-policies` | Full, Partial(recruiting) | `RIPPLINGATS` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:318-375` |
| Offer letter | `/ats/approval-policies/offer-letter` | Full, Partial(recruiting) | `RIPPLINGATS` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:323-326` |
| Job requisition create | `/ats/approval-policies/job-requisition-create` | Full, Partial(recruiting) | `RIPPLINGATS` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:327-339` |
| Job requisition edit | `/ats/approval-policies/job-requisition-edit` | Full, Partial(recruiting) | `RIPPLINGATS` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:340-352` |
| Decision to hire | `/ats/approval-policies/decision-to-offer` | Full, Partial(recruiting) | `RIPPLINGATS` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:353-364` |
| My referrals | `/ats/employee/referrals` | Full, Partial, Mgr, EE | `RIPPLINGATS` | shouldShowReferrals | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:376-380` |
| Internal job board | `/ats/internal-job-board` | Full, Partial, Mgr, EE | `RIPPLINGATS` | shouldShowInternalJobBoard | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:381-385` |
| Candidate surveys | `/ats/candidate-surveys` | Full, Partial(recruiting) | `RIPPLINGATS` | perm: ats.hasAppAdminPermissions; shouldShowCandidateSurvey; !isMobile | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:386-405` |
| Active | `/ats/candidate-surveys/active` | Full, Partial(recruiting) | `RIPPLINGATS` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:181-186` |
| Archived | `/ats/candidate-surveys/archived` | Full, Partial(recruiting) | `RIPPLINGATS` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:187-193` |
| Draft | `/ats/candidate-surveys/draft` | Full, Partial(recruiting) | `RIPPLINGATS` | perm: ats.hasAppAdminPermissions | — | — | — | `app/products/hr/Ats/routes-v6/adminRoutes.tsx:194-200` |
| Templates & defaults | `/ats/templates` | Full, Partial(recruiting) | `RIPPLINGATS` | perm: appSettings.edit_settings OR edit_feedback_forms; !isMobile | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:406-410` |
| Settings | `/ats/settings` | Full, Partial(recruiting) | `RIPPLINGATS` | perm: appSettings.edit_settings; !isMobile | — | — | — | `app/products/hr/Ats/containers/navBar/NavBarBase.tsx:411-415` |

### Learning Management  `lms`

10 nodes · path `/lms` · gate `RIPPLINGLMS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| My learning | `/apps/RipplingLMS/my-courses` | Full, Partial, Mgr, EE | `RIPPLINGLMS` | — | — | — | — | `app/products/hr/LMS/legacy/containers/navBar/NavBar.hooks.ts:89-108` |
| Enrolled | `/apps/RipplingLMS/my-courses/enrolled` | Full, Partial, Mgr, EE | `RIPPLINGLMS` | — | — | — | — | `app/products/hr/LMS/legacy/containers/navBar/NavBar.hooks.ts:94-97` |
| Upcoming | `/apps/RipplingLMS/my-courses/upcoming` | Full, Partial, Mgr, EE | `RIPPLINGLMS` | — | — | — | — | `app/products/hr/LMS/legacy/containers/navBar/NavBar.hooks.ts:98-101` |
| Completed | `/apps/RipplingLMS/my-courses/completed` | Full, Partial, Mgr, EE | `RIPPLINGLMS` | — | — | — | — | `app/products/hr/LMS/legacy/containers/navBar/NavBar.hooks.ts:102-105` |
| Explore | `/apps/RipplingLMS/explore` | Full, Partial, Mgr, EE | `RIPPLINGLMS` | hasSelfEnrollCourses OR hasSelfEnrollLearningPaths | — | — | — | `app/products/hr/LMS/legacy/containers/navBar/NavBar.hooks.ts:110-115` |
| Manage learning | `/apps/RipplingLMS/manage-learning` | Full, Partial(lms) | `RIPPLINGLMS` | perm: lms.canViewManageCourses | — | — | — | `app/products/hr/LMS/legacy/containers/navBar/NavBar.hooks.ts:13-36` |
| Courses | `/apps/RipplingLMS/manage-learning/courses` | Full, Partial(lms) | `RIPPLINGLMS` | perm: lms.canViewManageCourses | — | — | — | `app/products/hr/LMS/legacy/containers/navBar/NavBar.hooks.ts:18-21` |
| Learning paths | `/apps/RipplingLMS/manage-learning/learning-paths` | Full, Partial(lms) | `RIPPLINGLMS` | perm: lms.canAddLearningPath | — | — | — | `app/products/hr/LMS/legacy/containers/navBar/NavBar.hooks.ts:22-29` |
| Employees | `/apps/RipplingLMS/manage-learning/employees` | Full, Partial(lms) | `RIPPLINGLMS` | perm: lms.canViewManageCourses | — | — | — | `app/products/hr/LMS/legacy/containers/navBar/NavBar.hooks.ts:30-33` |
| Settings | `/apps/RipplingLMS/settings` | Full, Partial(lms) | `RIPPLINGLMS` | perm: lms.canViewSettings | — | — | — | `app/products/hr/LMS/legacy/containers/navBar/NavBar.hooks.ts:38-45` |

### Performance Reviews  `performance-reviews`

3 nodes · path `/performance/reviews` · gate `REVIEW_CYCLES`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Cycles | `/review-cycles/dashboard` | Full, Partial, Mgr, EE | `REVIEW_CYCLES` | — | — | ee: My reviews | — | `app/products/hr/ReviewCycles/containers/DashboardWrapper.tsx:21-24` |
| Question sets | `/review-cycles/dashboard/question-sets` | Full, Partial(performance), Mgr | `REVIEW_CYCLES` | perm: rc.isAppAdmin OR hasQuestionSets | — | — | — | `app/products/hr/ReviewCycles/containers/DashboardWrapper.tsx:26-34` |
| Settings | `/review-cycles/dashboard/settings` | Full, Partial(performance) | `REVIEW_CYCLES` | perm: rc.isAppAdmin | — | — | — | `app/products/hr/ReviewCycles/containers/DashboardWrapper.tsx:36-41` |

### Goals  `goals`

4 nodes · path `/goals` · gate `GOALS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| My goals | `/goals/dashboard/my-goals` | Full, Partial, Mgr, EE | `GOALS` | — | — | — | — | `app/products/hr/Goals/containers/DashboardWrapper.tsx:67-71` |
| All goals | `/goals/dashboard/all-goals` | Full, Partial, Mgr, EE | `GOALS` | — | — | — | — | `app/products/hr/Goals/containers/DashboardWrapper.tsx:72-76` |
| Team goals | `/goals/dashboard/team-goals` | Full, Partial, Mgr | `GOALS` | perm: currentRole.isManager | — | — | — | `app/products/hr/Goals/containers/DashboardWrapper.tsx:77-83` |
| Goal cycles | `/goals/dashboard/goal-cycles` | Full, Partial(goals) | `GOALS` | perm: isGoalsAdmin OR isGoalsCycleCreator OR isGoalConfigOwner | — | — | — | `app/products/hr/Goals/containers/DashboardWrapper.tsx:84-91` |

### 1:1s  `one-on-ones`

6 nodes · path `/one-on-ones` · gate `ONE_ON_ONES`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| 1:1s | `/one-on-ones/dashboard/discussions` | Full, Partial, Mgr, EE | `ONE_ON_ONES` | — | — | ee:  (/one-on-ones/dashboard/discussions/mine) | — | `app/products/hr/OneOnOnes/containers/DashboardWrapper.tsx:65-78` |
| My 1:1s | `/one-on-ones/dashboard/discussions/mine` | Full, Partial, Mgr | `ONE_ON_ONES` | perm: hasPartialViewerBeyondDirectReports | — | — | — | `app/products/hr/OneOnOnes/containers/DashboardWrapper.tsx:53-57` |
| Team 1:1s | `/one-on-ones/dashboard/discussions/team` | Full, Partial, Mgr | `ONE_ON_ONES` | perm: hasPartialViewerBeyondDirectReports | — | — | — | `app/products/hr/OneOnOnes/containers/DashboardWrapper.tsx:58-61` |
| My templates | `/one-on-ones/dashboard/templates` | Full, Partial, Mgr, EE | `ONE_ON_ONES` | — | — | — | — | `app/products/hr/OneOnOnes/containers/DashboardWrapper.tsx:79-82` |
| Templates | `/one-on-ones/dashboard/topics` | Full, Partial(one-on-ones) | `ONE_ON_ONES` | perm: isOneOnOnesAdmin OR hasTemplateAccess | — | — | — | `app/products/hr/OneOnOnes/containers/DashboardWrapper.tsx:83-88` |
| Settings | `/one-on-ones/dashboard/settings` | Full, Partial(one-on-ones) | `ONE_ON_ONES` | perm: isOneOnOnesAdmin | — | — | — | `app/products/hr/OneOnOnes/containers/DashboardWrapper.tsx:89-94` |

### Feedback  `feedback`

7 nodes · path `/feedback` · gate `FEEDBACK`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Feed | `/feedback/dashboard/feed` | Full, Partial, Mgr, EE | `FEEDBACK` | — | — | — | — | `app/products/hr/Feedback/containers/DashboardWrapper.tsx:144-153` |
| Requests | `/feedback/dashboard/requests` | Full, Partial, Mgr, EE | `FEEDBACK` | — | — | — | — | `app/products/hr/Feedback/containers/DashboardWrapper.tsx:154-183` |
| Assigned to me | `/feedback/dashboard/requests/assigned-to-me` | Full, Partial, Mgr, EE | `FEEDBACK` | — | — | — | — | `app/products/hr/Feedback/containers/DashboardWrapper.tsx:156-163` |
| Assigned to team | `/feedback/dashboard/requests/assigned-to-team` | Full, Partial, Mgr | `FEEDBACK` | perm: canViewAssignedToTeamRequests | — | — | — | `app/products/hr/Feedback/containers/DashboardWrapper.tsx:164-170` |
| My requests | `/feedback/dashboard/requests/my-requests` | Full, Partial, Mgr, EE | `FEEDBACK` | — | — | — | — | `app/products/hr/Feedback/containers/DashboardWrapper.tsx:171-175` |
| Analytics | `/feedback/dashboard/analytics` | Full, Partial, Mgr, EE | `FEEDBACK` | — | — | — | — | `app/products/hr/Feedback/containers/DashboardWrapper.tsx:184` |
| Settings | `/feedback/dashboard/settings` | Full, Partial(feedback) | `FEEDBACK` | perm: canViewSettings | — | — | — | `app/products/hr/Feedback/containers/DashboardWrapper.tsx:185-191` |

### Surveys  `surveys`

12 nodes · path `/surveys` · gate `PULSE`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Surveys | `/surveys/dashboard/surveys` | Full, Partial(surveys), Mgr | `PULSE` | perm: PulseCapability.SURVEY_CREATOR OR hasSurveys | — | — | — | `app/products/hr/Pulse/containers/DashboardWrapper.tsx:50-69` |
| Active | `/surveys/dashboard/surveys/active` | Full, Partial(surveys), Mgr | `PULSE` | perm: PulseCapability.SURVEY_CREATOR OR hasSurveys | — | — | — | `app/products/hr/Pulse/containers/DashboardWrapper.tsx:58` |
| Archived | `/surveys/dashboard/surveys/archived` | Full, Partial(surveys), Mgr | `PULSE` | perm: PulseCapability.SURVEY_CREATOR OR hasSurveys | — | — | — | `app/products/hr/Pulse/containers/DashboardWrapper.tsx:59` |
| Draft | `/surveys/dashboard/surveys/draft` | Full, Partial(surveys), Mgr | `PULSE` | perm: PulseCapability.SURVEY_CREATOR OR hasSurveys | — | — | — | `app/products/hr/Pulse/containers/DashboardWrapper.tsx:60-66` |
| My responses | `/surveys/dashboard/my-responses` | Full, Partial, Mgr, EE | `PULSE` | — | — | — | — | `app/products/hr/Pulse/containers/DashboardWrapper.tsx:71-90` |
| Invited | `/surveys/dashboard/my-responses/invited` | Full, Partial, Mgr, EE | `PULSE` | — | — | — | — | `app/products/hr/Pulse/containers/DashboardWrapper.tsx:87` |
| Completed | `/surveys/dashboard/my-responses/completed` | Full, Partial, Mgr, EE | `PULSE` | — | — | — | — | `app/products/hr/Pulse/containers/DashboardWrapper.tsx:88` |
| Templates | `/surveys/dashboard/templates` | Full, Partial(surveys) | `PULSE` | perm: PulseCapability.EMPLOYEE_SURVEYS AND APP_ADMIN | — | — | — | `app/products/hr/Pulse/containers/DashboardWrapper.tsx:92-99` |
| Question bank | `/surveys/dashboard/question-bank` | Full, Partial(surveys) | `PULSE` | perm: PulseCapability.EMPLOYEE_SURVEYS AND APP_ADMIN | — | — | — | `app/products/hr/Pulse/containers/DashboardWrapper.tsx:100-107` |
| Questions | `/surveys/dashboard/question-bank/questions` | Full, Partial(surveys) | `PULSE` | perm: PulseCapability.EMPLOYEE_SURVEYS AND APP_ADMIN | — | — | — | `app/products/hr/Pulse/containers/DashboardWrapper.tsx:104` |
| Topics | `/surveys/dashboard/question-bank/topics` | Full, Partial(surveys) | `PULSE` | perm: PulseCapability.EMPLOYEE_SURVEYS AND APP_ADMIN | — | — | — | `app/products/hr/Pulse/containers/DashboardWrapper.tsx:105` |
| Settings | `/surveys/dashboard/settings` | Full, Partial(surveys) | `PULSE` | perm: PulseCapability.EMPLOYEE_SURVEYS AND APP_ADMIN | — | — | — | `app/products/hr/Pulse/containers/DashboardWrapper.tsx:110-118` |

### Headcount Planning  `headcount-planning`

19 nodes · path `/headcount-planning` · gate `HEADCOUNT`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| My Team | `/headcount-planning/my-team` | Full, Mgr | `HEADCOUNT` | perm: HAS_MY_TEAM_ACCESS | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:103` |
| Current | `/headcount-planning/my-team/current` | Full, Mgr | `HEADCOUNT` | perm: HAS_MY_TEAM_ACCESS | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:108` |
| Analytics | `/headcount-planning/my-team/analytics` | Full, Mgr | `HEADCOUNT` | perm: HAS_MY_TEAM_ACCESS | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:112` |
| Plan | `/headcount-planning/plans` | Full, Partial(headcount) | `HEADCOUNT` | perm: IS_HEADCOUNT_APP_VIEWER | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:124` |
| Overview | `/headcount-planning/plans?section=overview` | Full, Partial(headcount) | `HEADCOUNT` | perm: IS_HEADCOUNT_APP_VIEWER | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:130` |
| Positions | `/headcount-planning/plans?section=position` | Full, Partial(headcount) | `HEADCOUNT` | perm: IS_HEADCOUNT_APP_VIEWER | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:134` |
| Reporting | `/headcount-planning/plans?section=reporting` | Full, Partial(headcount) | `HEADCOUNT` | perm: IS_HEADCOUNT_APP_VIEWER | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:138` |
| Budget | `/headcount-planning/budget-planning` | Full | `HEADCOUNT` | perm: IS_BUDGET_APP_VIEWER; isHCBudgetingEnabled | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:145` |
| Active | `/headcount-planning/budget-planning/active` | Full | `HEADCOUNT` | perm: IS_ACTIVE_BUDGET_PLAN_VIEWER | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:160` |
| Drafts | `/headcount-planning/budget-planning/drafts` | Full | `HEADCOUNT` | perm: IS_BUDGET_APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:168` |
| Scenarios | `/headcount-planning/scenarios` | Full, Partial(headcount) | `HEADCOUNT` | perm: HAS_REQUEST_DESK_ACCESS | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:198` |
| Approval Requests | `/headcount-planning/requests` | Full, Partial(headcount) | `HEADCOUNT` | perm: HAS_REQUEST_DESK_ACCESS | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:202` |
| My Requests | `/headcount-planning/requests/my-requests` | Full, Partial(headcount) | `HEADCOUNT` | perm: HAS_REQUEST_DESK_ACCESS | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:209` |
| Need My Review | `/headcount-planning/requests/need-my-review` | Full, Partial(headcount) | `HEADCOUNT` | perm: HAS_REQUEST_DESK_ACCESS | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:213` |
| Reviewed | `/headcount-planning/requests/reviewed` | Full, Partial(headcount) | `HEADCOUNT` | perm: HAS_REQUEST_DESK_ACCESS | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:230` |
| All Requests | `/headcount-planning/requests/all-requests` | Full, Partial(headcount) | `HEADCOUNT` | perm: HAS_REQUEST_DESK_ACCESS | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:243` |
| Shared with Me | `/headcount-planning/shared-scenarios` | Partial | `HEADCOUNT` | perm: HAS_REQUESTS_COLLABORATOR_ACCESS | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:251` |
| Approval Policies | `/headcount-planning/approval-policies` | Full | `HEADCOUNT` | perm: IS_APPROVAL_POLICY_OWNER | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:256` |
| Settings | `/headcount-planning/settings` | Full | `HEADCOUNT` | perm: IS_HEADCOUNT_APP_OWNER | — | — | — | `rippling-webapp/app/products/hr/HeadcountPlanning/containers/headcountAppNavBar/HeadcountAppNavBar.tsx:263` |

### Kudos  `kudos`

_No internal nav._ Kudos is an App Studio (catalog product family 'App Studio') product — no first-party UI in rippling-webapp. The surface is generated dynamically from a Studio app definition.

### Succession Planning  `succession-planning`

_No internal nav._ Succession Planning is an App Studio (catalog product family 'App Studio') product — no first-party UI in rippling-webapp.

### Performance Improvement Plans  `performance-improvement-plans`

_No internal nav._ PIPs is an App Studio (catalog product family 'App Studio') product — no first-party UI in rippling-webapp.

