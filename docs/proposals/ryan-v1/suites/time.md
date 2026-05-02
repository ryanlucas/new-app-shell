# Time  `time`

**Suite visibility:** Full, Partial(time_admin), Mgr, EE  
**Product gate:** —  
**Cross-sell:** locked → full, partial · SidenavTime  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:177-186`

## Apps (5)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/time/overview` | Full, Partial(time_admin) | `TIME_PLATFORM` | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:188` |
| My Time | `/me/time` | Mgr, EE | `TIME_PLATFORM` | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:200` |
| Scheduling | `/scheduling` | Full, Partial(scheduling_admin), Mgr, EE | `SCHEDULING` | — | locked → full, partial · SidenavTime | — | — | `app/hub/spoke_models.py:817` |
| Timecards | `/timecards` | Full, Partial(time_admin), Mgr, EE | `TIMEATTENDANCE` | — | locked → full, partial · SidenavTime | — | — | `app/hub/spoke_models.py:777` |
| Time Off | `/time-off` | Full, Partial(pto_admin), Mgr, EE | `PTO` | timePlatformInstalled | locked → full, partial · SidenavTime | ee: My Time Off (/me/time-off); manager: Team Time Off (/team/time-off) | `time-off` | `app/apps/utils/dummy_apps.py:230 (Time Platform variant, shown when TIME_PLATFORM installed)` |

## App L3 internal navigation

### Overview  `time-overview`

3 nodes · path `/time/overview` · gate `TIME_PLATFORM`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Schedule | `/time-products/dashboard/overview/schedule` | Full, Partial(time_admin, scheduling_admin) | `SCHEDULING` | feature:SCHEDULING_FEATURE_KEYS_SCHEDULE_OVERVIEW | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useOverviewPageLinks.ts:43` |
| Time Tracking | `/time-products/dashboard/overview/time-tracking` | Full, Partial(time_admin) | `TIMEATTENDANCE` | feature:TIME_TRACKING_FEATURE_KEYS_TIME_TRACKING_OVERVIEW | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useOverviewPageLinks.ts:47` |
| Time Off | `/time-products/dashboard/overview/time-off` | Full, Partial(time_admin, pto_admin) | `PTO` | feature:TIME_OFF_FEATURE_KEYS_TIME_OFF_OVERVIEW | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useOverviewPageLinks.ts:51` |

### My Time  `my-time`

7 nodes · path `/me/time` · gate `TIME_PLATFORM`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Clock In/Out | `/time-products/dashboard/my-time/timeclock` | EE | `TIMEATTENDANCE` | feature:TIME_TRACKING_FEATURE_KEYS_TIMECLOCK | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useMyTimePageLinks.ts:31` |
| Requests | `/time-products/dashboard/my-time/requests` | EE | — | feature:CORE_FEATURE_KEYS_MY_REQUESTS | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useMyTimePageLinks.ts:36` |
| My Schedule | `/time-products/dashboard/my-time/schedule` | EE | `SCHEDULING` | feature:SCHEDULING_FEATURE_KEYS_MY_SCHEDULE | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useMyTimePageLinks.ts:41` |
| My Timecards | `/time-products/dashboard/my-time/timecards` | EE | `TIMEATTENDANCE` | feature:TIME_TRACKING_FEATURE_KEYS_MY_TIMECARDS | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useMyTimePageLinks.ts:46` |
| My Attendance | `/time-products/dashboard/my-time/attendance` | EE | `SCHEDULING` | feature:SCHEDULING_FEATURE_KEYS_MY_ATTENDANCE | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useMyTimePageLinks.ts:51` |
| My Time Off | `/time-products/dashboard/my-time/time-off` | EE | `PTO` | feature:TIME_OFF_FEATURE_KEYS_MY_TIME_OFF | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useMyTimePageLinks.ts:56` |
| My Settings | `/time-products/dashboard/my-time/settings` | EE | — | feature:CORE_FEATURE_KEYS_MY_SETTINGS | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useMyTimePageLinks.ts:61` |

### Scheduling  `scheduling`

11 nodes · path `/scheduling` · gate `SCHEDULING`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/scheduling/dashboard/overview` | Full, Partial(scheduling_admin, scheduler) | `SCHEDULING` | capability:isScheduler | — | — | — | `rippling-webapp/app/products/hr/Scheduling/containers/MainPage/MainPage.tsx:62` |
| My Time | `/scheduling/dashboard/my_time` | Full, Partial, Mgr, EE | `SCHEDULING` | capability:hasSchedule; feature_flag:!schedulingTimeclockEnabled | — | — | — | `rippling-webapp/app/products/hr/Scheduling/containers/MainPage/MainPage.tsx:70` |
| Schedule | `/scheduling/dashboard/editor` | Full, Partial(scheduling_admin, scheduler, scheduling_observer) | `SCHEDULING` | capability:isScheduler\|\|isAdmin\|\|isObserver | — | — | — | `rippling-webapp/app/products/hr/Scheduling/containers/MainPage/MainPage.tsx:78` |
| Forecast & Labor | `/scheduling/dashboard/forecast_and_labor` | Full, Partial(scheduling_admin, scheduler, scheduling_observer) | `FORECASTING` | capability:hasForecasting | — | — | — | `rippling-webapp/app/products/hr/Scheduling/containers/MainPage/MainPage.tsx:83` |
| Approvals | `/scheduling/dashboard/approvals` | Full, Partial(scheduling_admin, scheduler) | `SCHEDULING` | capability:isScheduler\|\|isAdmin | — | — | — | `rippling-webapp/app/products/hr/Scheduling/containers/MainPage/MainPage.tsx:90` |
| Attendance | `/scheduling/dashboard/attendance` | Full, Partial(scheduling_admin) | `SCHEDULING` | capability:isAdmin; capability:canViewAttendance | — | — | — | `rippling-webapp/app/products/hr/Scheduling/containers/MainPage/MainPage.tsx:103` |
| Policies | `/scheduling/dashboard/policies` | Full, Partial(scheduling_admin) | `SCHEDULING` | capability:isAdmin | — | — | — | `rippling-webapp/app/products/hr/Scheduling/containers/MainPage/MainPage.tsx:110` |
| Bulk Settings | `/scheduling/dashboard/settings` | Full, Partial(scheduling_admin) | `SCHEDULING` | capability:isAdmin | — | — | — | `rippling-webapp/app/products/hr/Scheduling/containers/MainPage/MainPage.tsx:115` |
| Access Rules | `/scheduling/dashboard/access_rules` | Full, Partial(scheduling_admin) | `SCHEDULING` | capability:isAdmin | — | — | — | `rippling-webapp/app/products/hr/Scheduling/containers/MainPage/MainPage.tsx:120` |
| Data Sources | `/scheduling/dashboard/data_sources` | Full, Partial(scheduling_admin) | `SCHEDULING` | capability:isAdmin; capability:canViewDataSources | — | — | — | `rippling-webapp/app/products/hr/Scheduling/containers/MainPage/MainPage.tsx:124` |
| Manage Schedules | `/scheduling/manage_schedules` | Full, Partial(scheduling_admin) | `SCHEDULING` | capability:isAdmin | — | — | — | `rippling-webapp/app/products/hr/Scheduling/routes/scheduling.routes.tsx:539` |

### Timecards  `timecards`

8 nodes · path `/timecards` · gate `TIMEATTENDANCE`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Currently Clocked In | `/time-products/dashboard/timecards/clocked-in` | Full, Partial(time_admin, time_approver) | `TIMEATTENDANCE` | feature:TIME_TRACKING_FEATURE_KEYS_CLOCKED_IN | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useTimecardsPageLinks.ts:15` |
| Timecards | `/time-products/dashboard/timecards/timecards` | Full, Partial(time_admin, time_approver) | `TIMEATTENDANCE` | feature:TIME_TRACKING_FEATURE_KEYS_TIMECARDS | — | manager: My Team's Timecards | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useTimecardsPageLinks.ts:19` |
| Pending Approval | `/time-products/dashboard/approvals` | Full, Partial(time_admin, time_approver), Mgr | `TIMEATTENDANCE` | — | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/routes/routes.constants.ts:5` |
| Attendance Events | `/time-products/dashboard/attendance/attendance-events` | Full, Partial(time_admin) | `TIMEATTENDANCE` | — | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/routes/routes.constants.ts:31` |
| People | `/time-products/dashboard/people/time-attendance` | Full, Partial(time_admin) | `TIMEATTENDANCE` | — | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/routes/routes.constants.ts:75` |
| Policies | `/time-products/dashboard/policies/time-tracking` | Full, Partial(time_admin) | `TIMEATTENDANCE` | — | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/routes/routes.constants.ts:82` |
| Kiosks | `/time-products/dashboard/kiosk-management` | Full, Partial(time_admin) | `TIMEATTENDANCE` | — | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/routes/routes.constants.ts:13` |
| Settings | `/time-products/dashboard/settings/time-attendance` | Full, Partial(time_admin) | `TIMEATTENDANCE` | — | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/routes/routes.constants.ts:106` |

### Time Off  `time-off-tracking`

10 nodes · path `/time-off` · gate `PTO`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Summary | `/time-products/dashboard/time-off/summary` | Full, Partial(pto_admin, time_admin) | `PTO` | feature:TIME_OFF_FEATURE_KEYS_SUMMARY | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useTimeOffPageLinks.ts:23` |
| Calendar | `/time-products/dashboard/time-off/calendar` | Full, Partial(pto_admin, time_admin) | `PTO` | feature:TIME_OFF_FEATURE_KEYS_CALENDAR | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useTimeOffPageLinks.ts:27` |
| Time Off | `/time-products/dashboard/time-off/time-off-schedule` | Full, Partial(pto_admin, time_admin) | `PTO` | feature:TIME_OFF_FEATURE_KEYS_TIME_OFF | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useTimeOffPageLinks.ts:31` |
| Leaves | `/time-products/dashboard/time-off/leaves` | Full, Partial(pto_admin, time_admin) | `PTO` | feature:TIME_OFF_FEATURE_KEYS_LEAVES | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useTimeOffPageLinks.ts:35` |
| Balances | `/time-products/dashboard/time-off/balances` | Full, Partial(pto_admin, time_admin) | `PTO` | feature:TIME_OFF_FEATURE_KEYS_BALANCES | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/utils/hooks/pageLinks/useTimeOffPageLinks.ts:39` |
| Requests | `/time-products/dashboard/time-off/requests` | Full, Partial(pto_admin, time_admin), Mgr | `PTO` | — | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/routes/routes.constants.ts:127` |
| Policies | `/time-products/dashboard/policies/time-off` | Full, Partial(pto_admin, time_admin) | `PTO` | — | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/routes/routes.constants.ts:84` |
| Leave Types | `/time-products/dashboard/settings/leave-types` | Full, Partial(pto_admin, time_admin) | `PTO` | — | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/routes/routes.constants.ts:109` |
| Holidays | `/time-products/dashboard/settings/holidays` | Full, Partial(pto_admin, time_admin) | `PTO` | — | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/routes/routes.constants.ts:110` |
| Settings | `/time-products/dashboard/settings/time-off` | Full, Partial(pto_admin, time_admin) | `PTO` | — | — | — | — | `rippling-webapp/app/products/hr/UnifiedTimeProducts/routes/routes.constants.ts:108` |

