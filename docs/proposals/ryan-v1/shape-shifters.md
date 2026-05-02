# Shape-shifters

Nodes that share a `logicalId` — same logical feature, multiple placements gated by company state. These are the IA-decision targets.

## `my-implementation`

| Node | Surface | Path | Label | Switch condition | Source |
|---|---|---|---|---|---|
| `implementation-plan` | frame/firstSection | `/company-onboarding` | My Implementation | !isContractWaiting \|\| creationSource==PAYROLL_FASTTRACK \|\| creationSource==SPEND_FASTTRACK | `app/appShell/components/navigation/config/getSideNavConfig.ts:158` |
| `implementation-plan-peo` | frame/firstSection | `/peo/onboarding` | My Implementation | !company.isContractWaiting | `app/appShell/components/navigation/config/getSideNavConfig.ts:189` |

## `add-person`

| Node | Surface | Path | Label | Switch condition | Source |
|---|---|---|---|---|---|
| `hire` | frame/firstSection | `/navigate-role-hire` | Hire | !isStandaloneCompany | `app/appShell/components/navigation/config/getSideNavConfig.ts:117` |
| `add-people` | frame/firstSection | `/add-people` | Add People | isStandaloneCompany | `app/appShell/components/navigation/config/getSideNavConfig.ts:93` |

## `remove-person`

| Node | Surface | Path | Label | Switch condition | Source |
|---|---|---|---|---|---|
| `offboard` | frame/firstSection | `/role-terminate/complete/select` | Offboard | !isStandaloneCompany | `app/appShell/components/navigation/config/getSideNavConfig.ts:126` |
| `remove-people` | frame/firstSection | `/remove-people` | Remove People | isStandaloneCompany | `app/appShell/components/navigation/config/getSideNavConfig.ts:104` |

## `time-off`

| Node | Surface | Path | Label | Switch condition | Source |
|---|---|---|---|---|---|
| `pto` | suites/hr | `/time-off` | Time Off | !timePlatformInstalled AND !isStandaloneCompany | `app/apps/utils/navigation_bar.py:1627 (legacy variant, hidden when TIME_PLATFORM installed via should_hide_legacy_time_apps())` |
| `time-off-tracking` | suites/time | `/time-off` | Time Off | timePlatformInstalled | `app/apps/utils/dummy_apps.py:230 (Time Platform variant, shown when TIME_PLATFORM installed)` |

