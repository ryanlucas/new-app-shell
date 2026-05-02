# Personas

| ID | Label | Description | Source |
|---|---|---|---|
| `full` | Full Admin | Has all company-wide admin privileges via ACL (is_full_admin / isAdmin). Treated as super-admin equivalent for navigation/admin surfacing. | `rippling-webapp/app/api/adminPrivileges.ts:15` |
| `partial` | Partial Admin | Has scoped admin permissions for one or more specific products. Each scope is a discrete is_*_admin flag set by the ACL/permission profile. | `rippling-webapp/app/api/adminPrivileges.ts:16` |
| `manager` | Manager | Role has at least one direct report. isManager flag is set by update_isManager() when get_direct_reports().exists() is true. Unlocks manager surfaces (approvals, performance-as-reviewer, team views). | `rippling-main/app/hris/models/role/role_with_company.py:977` |
| `ee` | Employee | Standard employee with self-service access. isEmployee defaults True; set to True when role transitions to HIRED state. | `rippling-main/app/hris/models/role/role_with_company.py:971` |

## Partial-admin scopes (47)

| Scope ID | Label | Source |
|---|---|---|
| `billing_admin` | Billing Admin | `rippling-webapp/app/api/adminPrivileges.ts:26` |
| `billing_partial_admin` | Billing Partial Admin | `rippling-webapp/app/api/adminPrivileges.ts:27` |
| `payroll_admin` | Payroll Admin | `rippling-webapp/app/api/adminPrivileges.ts:28` |
| `partial_payroll_admin` | Partial Payroll Admin | `rippling-webapp/app/api/adminPrivileges.ts:29` |
| `app_admin` | App Admin | `rippling-webapp/app/api/adminPrivileges.ts:30` |
| `hardware_admin` | Hardware Admin | `rippling-webapp/app/api/adminPrivileges.ts:31` |
| `partial_hardware_admin` | Partial Hardware Admin | `rippling-webapp/app/api/adminPrivileges.ts:32` |
| `insurance_admin` | Insurance Admin | `rippling-webapp/app/api/adminPrivileges.ts:33` |
| `partial_insurance_admin` | Partial Insurance Admin | `rippling-webapp/app/api/adminPrivileges.ts:34` |
| `benefits_settings` | Benefits Settings Admin | `rippling-webapp/app/api/adminPrivileges.ts:35` |
| `partial_benefits_settings` | Partial Benefits Settings Admin | `rippling-webapp/app/api/adminPrivileges.ts:36` |
| `pension_admin` | Pension Admin | `rippling-webapp/app/api/adminPrivileges.ts:37` |
| `spend_management_full_admin` | Spend Management Full Admin | `rippling-webapp/app/api/adminPrivileges.ts:38` |
| `custom_translations_admin` | Custom Translations Admin | `rippling-webapp/app/api/adminPrivileges.ts:61` |
| `group_manager_admin` | Group Manager Admin | `rippling-webapp/app/api/adminPrivileges.ts:63` |
| `security_full_admin` | Security Full Admin | `rippling-webapp/app/api/adminPrivileges.ts:65` |
| `partial_security_full_admin` | Partial Security Full Admin | `rippling-webapp/app/api/adminPrivileges.ts:66` |
| `task_inbox_admin` | Task Inbox Admin | `rippling-webapp/app/api/adminPrivileges.ts:67` |
| `company_notification_settings` | Company Notification Settings Admin | `rippling-webapp/app/api/adminPrivileges.ts:68` |
| `partial_company_notification_settings` | Partial Company Notification Settings Admin | `rippling-webapp/app/api/adminPrivileges.ts:69` |
| `job_function_admin` | Job Function Admin | `rippling-webapp/app/api/adminPrivileges.ts:70` |
| `it_home_full_admin` | IT Home Full Admin | `rippling-webapp/app/api/adminPrivileges.ts:73` |
| `partial_it_home_full_admin` | Partial IT Home Full Admin | `rippling-webapp/app/api/adminPrivileges.ts:74` |
| `it_home_device_manager` | IT Home Device Manager | `rippling-webapp/app/api/adminPrivileges.ts:75` |
| `partial_it_home_device_manager` | Partial IT Home Device Manager | `rippling-webapp/app/api/adminPrivileges.ts:76` |
| `it_home_app_manager` | IT Home App Manager | `rippling-webapp/app/api/adminPrivileges.ts:77` |
| `partial_it_home_app_manager` | Partial IT Home App Manager | `rippling-webapp/app/api/adminPrivileges.ts:78` |
| `two_fa_admin` | Two-FA Admin | `rippling-webapp/app/api/adminPrivileges.ts:79` |
| `partial_two_fa_admin` | Partial Two-FA Admin | `rippling-webapp/app/api/adminPrivileges.ts:80` |
| `travel_admin` | Travel Admin | `rippling-webapp/app/api/adminPrivileges.ts:83` |
| `partial_travel_admin` | Partial Travel Admin | `rippling-webapp/app/api/adminPrivileges.ts:84` |
| `integration_custom_integration_admin` | Integration Custom Integration Admin | `rippling-webapp/app/api/adminPrivileges.ts:93` |
| `partial_integration_custom_integration_admin` | Partial Integration Custom Integration Admin | `rippling-webapp/app/api/adminPrivileges.ts:94` |
| `integration_full_admin` | Integration Full Admin | `rippling-webapp/app/api/adminPrivileges.ts:95` |
| `partial_integration_full_admin` | Partial Integration Full Admin | `rippling-webapp/app/api/adminPrivileges.ts:96` |
| `integration_app_creator` | Integration App Creator | `rippling-webapp/app/api/adminPrivileges.ts:97` |
| `partial_integration_app_creator` | Partial Integration App Creator | `rippling-webapp/app/api/adminPrivileges.ts:98` |
| `unity_admin` | Unity Admin | `rippling-webapp/app/api/adminPrivileges.ts:101` |
| `partial_unity_admin` | Partial Unity Admin | `rippling-webapp/app/api/adminPrivileges.ts:102` |
| `transformations_admin` | Transformations Admin | `rippling-webapp/app/api/adminPrivileges.ts:107` |
| `partial_transformations_admin` | Partial Transformations Admin | `rippling-webapp/app/api/adminPrivileges.ts:108` |
| `transformations_creator` | Transformations Creator | `rippling-webapp/app/api/adminPrivileges.ts:109` |
| `partial_transformations_creator` | Partial Transformations Creator | `rippling-webapp/app/api/adminPrivileges.ts:110` |
| `api_tokens_full_admin` | API Tokens Full Admin | `rippling-webapp/app/api/adminPrivileges.ts:113` |
| `partial_api_tokens_full_admin` | Partial API Tokens Full Admin | `rippling-webapp/app/api/adminPrivileges.ts:114` |
| `api_tokens_operator` | API Tokens Operator | `rippling-webapp/app/api/adminPrivileges.ts:115` |
| `partial_api_tokens_operator` | Partial API Tokens Operator | `rippling-webapp/app/api/adminPrivileges.ts:116` |
