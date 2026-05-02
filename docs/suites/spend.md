# Spend  `spend`

**Suite visibility:** Full, Partial(spend_admin), Mgr, EE  
**Product gate:** `SPENDMANAGEMENT`  
**Cross-sell:** locked → full, partial · SidenavSpendManagement  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:158-167`

## Apps (10)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/spend-management/dashboard/overview` | Full, Partial(spend_admin) | `SPENDMANAGEMENT` | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:275` |
| My Finances | `/spend-management/dashboard/my-finances` | Mgr, EE | `SPENDMANAGEMENT` | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:264` |
| Cards | `/spend-management/dashboard/cards` | Full, Partial(spend_admin), EE | `CORPORATE_CARDS` | — | locked → full, partial · SidenavSpendManagement | — | — | `app/apps/utils/dummy_apps.py:286` |
| Reimbursements | `/spend-management/dashboard/expenses` | Full, Partial(spend_admin), Mgr, EE | `EXPENSES` | — | locked → full, partial · SidenavSpendManagement | — | — | `app/apps/utils/dummy_apps.py:297` |
| Transactions | `/spend-management/dashboard/transactions` | Full, Partial(spend_admin) | `SPENDMANAGEMENT` | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:308` |
| Bills | `/spend-management/dashboard/bills` | Full, Partial(spend_admin) | `BILL_PAY` | — | locked → full, partial · SidenavSpendManagement | — | — | `app/apps/utils/dummy_apps.py:319` |
| Procurement | `/spend-management/dashboard/procurement` | Full, Partial(procurement_admin) | `PROCUREMENT` | — | locked → full, partial · SidenavSpendManagement | — | — | `app/apps/utils/dummy_apps.py:330` |
| Travel | `/spend-management/travel` | Full, Partial(travel_admin), Mgr, EE | `TRAVEL` | — | locked → full, partial · SidenavSpendManagement | — | — | `app/cross_sell/unpurchased_sku/unpurchased_sku_nav_items.py:244` |
| Accounting | `/spend-management/dashboard/accounting` | Full, Partial(accounting_admin) | `ACCOUNTING_INTEGRATIONS` | — | locked → — | — | — | `app/apps/utils/dummy_apps.py:341` |
| Vendors | `/spend-management/vendors` | Full, Partial(spend_admin) | `VENDORS` | — | locked → — | — | — | `app/hub/spoke_models.py:867` |

## App L3 internal navigation

### Overview  `spend-overview`

9 nodes · path `/spend-management/dashboard/overview` · gate `SPENDMANAGEMENT`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/spend-management/dashboard/overview` | Full, Partial(spend) | `SPENDMANAGEMENT` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:110` |
| Approvals | `/spend-management/dashboard/approvals` | Full, Partial(spend), Mgr | `SPENDMANAGEMENT` | — | — | — | — | `app/products/finance/SpendManagement/containers/dashboard/SpendManagementDashboard.constants.ts:1` |
| People | `/spend-management/dashboard/people` | Full, Partial(spend) | `SPENDMANAGEMENT` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:129` |
| Vendors | `/spend-management/dashboard/vendors` | Full, Partial(spend) | `SPENDMANAGEMENT` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:142` |
| Policies | `/spend-management/dashboard/policies` | Full, Partial(spend) | `SPENDMANAGEMENT` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:173` |
| Accounting | `/spend-management/dashboard/accounting` | Full, Partial(spend) | `SPENDMANAGEMENT` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:290` |
| Forms | `/spend-management/dashboard/forms` | Full, Partial(spend) | `SPENDMANAGEMENT` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:298` |
| Reports | `/spend-management/dashboard/reports` | Full, Partial(spend) | `SPENDMANAGEMENT` | — | — | — | — | `app/products/finance/SpendManagement/containers/dashboard/SpendManagementDashboard.constants.ts:1` |
| Settings | `/spend-management/settings` | Full, Partial(spend) | `SPENDMANAGEMENT` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:1539` |

### My Finances  `my-finances`

4 nodes · path `/spend-management/dashboard/my-finances` · gate `SPENDMANAGEMENT`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| My Spend | `/spend-management/dashboard/my-finances` | EE | `SPENDMANAGEMENT` | — | — | — | — | `app/products/finance/SpendManagement/containers/dashboard/SpendManagementDashboard.constants.ts:1` |
| My Cards | `/spend-management/dashboard/my-finances?section=cards` | EE | `CORPORATE_CARDS` | — | — | — | — | `app/products/finance/SpendManagement/containers/dashboard/my-finances/MyOverview.tsx:1` |
| My Expenses | `/spend-management/dashboard/my-finances?section=expenses` | EE | `EXPENSES` | — | — | — | — | `app/products/finance/SpendManagement/containers/dashboard/my-finances/MyOverview.tsx:1` |
| My Reports | `/spend-management/dashboard/my-finances?section=my+reports` | EE | `EXPENSES` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:358` |

### Cards  `corporate-cards`

5 nodes · path `/spend-management/dashboard/cards` · gate `CORPORATE_CARDS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Cards | `/spend-management/dashboard/cards` | Full, Partial(spend) | `CORPORATE_CARDS` | — | — | — | — | `app/products/finance/SpendManagement/containers/dashboard/SpendManagementDashboard.constants.ts:1` |
| Transactions | `/spend-management/dashboard/transactions` | Full, Partial(spend) | `CORPORATE_CARDS` | — | — | — | — | `app/products/finance/SpendManagement/containers/dashboard/SpendManagementDashboard.constants.ts:1` |
| Statements | `/spend-management/dashboard/statements` | Full, Partial(spend) | `CORPORATE_CARDS` | — | — | — | — | `app/products/finance/SpendManagement/containers/dashboard/SpendManagementDashboard.constants.ts:1` |
| Card Policies | `/spend-management/dashboard/policies/transaction-and-reimbursement-policies` | Full, Partial(spend) | `CORPORATE_CARDS` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:189` |
| Settings | `/spend-management/settings/cards` | Full, Partial(spend) | `CORPORATE_CARDS` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:1572` |

### Reimbursements  `expenses`

4 nodes · path `/spend-management/dashboard/expenses` · gate `EXPENSES`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Reimbursements | `/spend-management/dashboard/expenses` | Full, Partial(spend) | `EXPENSES` | — | — | — | — | `app/products/finance/SpendManagement/containers/dashboard/SpendManagementDashboard.constants.ts:1` |
| Expense Reports | `/spend-management/dashboard/expense_reports` | Full, Partial(spend) | `EXPENSES` | — | — | — | — | `app/products/finance/SpendManagement/containers/dashboard/SpendManagementDashboard.constants.ts:1` |
| Policies | `/spend-management/dashboard/policies/transaction-and-reimbursement-policies` | Full, Partial(spend) | `EXPENSES` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:189` |
| Settings | `/spend-management/settings/reimbursements` | Full, Partial(spend) | `EXPENSES` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:1585` |

### Transactions  `transactions`

1 nodes · path `/spend-management/dashboard/transactions` · gate `SPENDMANAGEMENT`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| All Transactions | `/spend-management/dashboard/transactions` | Full, Partial(spend) | `SPENDMANAGEMENT` | — | — | — | — | `app/products/finance/SpendManagement/containers/dashboard/SpendManagementDashboard.constants.ts:1` |

### Bills  `bill-pay`

5 nodes · path `/spend-management/dashboard/bills` · gate `BILL_PAY`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Bills | `/spend-management/dashboard/bills` | Full, Partial(spend) | `BILL_PAY` | — | — | — | — | `app/products/finance/SpendManagement/containers/dashboard/SpendManagementDashboard.constants.ts:1` |
| Vendors | `/spend-management/dashboard/vendors` | Full, Partial(spend) | `BILL_PAY` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:142` |
| 1099 Vendors | `/spend-management/dashboard/vendors/1099` | Full, Partial(spend) | `BILL_PAY` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:158` |
| Bill Policies | `/spend-management/dashboard/policies/bill-policies` | Full, Partial(spend) | `BILL_PAY` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:238` |
| Settings | `/spend-management/settings/bill-pay` | Full, Partial(spend) | `BILL_PAY` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:1557` |

### Procurement  `procurement`

3 nodes · path `/spend-management/dashboard/procurement` · gate `PROCUREMENT`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Procurement | `/spend-management/dashboard/procurement` | Full, Partial(spend) | `PROCUREMENT` | — | — | — | — | `app/products/finance/SpendManagement/containers/dashboard/SpendManagementDashboard.constants.ts:1` |
| Vendors | `/spend-management/dashboard/vendors` | Full, Partial(spend) | `PROCUREMENT` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:142` |
| Settings | `/spend-management/settings/procurement` | Full, Partial(spend) | `PROCUREMENT` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:1600` |

### Travel  `travel`

8 nodes · path `/spend-management/travel` · gate `TRAVEL`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/travel/dashboard/overview` | Full, Partial(travel), Mgr, EE | `TRAVEL` | — | — | — | — | `app/products/finance/Travel/routes/travel.routes.tsx:187` |
| Trips | `/travel/dashboard/trips` | Full, Partial(travel), Mgr, EE | `TRAVEL` | — | — | — | — | `app/products/finance/Travel/routes/travel.routes.tsx:194` |
| Book a Trip | `/travel/dashboard/book` | Full, Partial(travel), Mgr, EE | `TRAVEL` | — | — | — | — | `app/products/finance/Travel/routes/travel.routes.tsx:219` |
| Approvals | `/travel/dashboard/approvals` | Full, Partial(travel), Mgr | `TRAVEL` | — | — | — | — | `app/products/finance/Travel/routes/travel.routes.tsx:303` |
| Bookings | `/travel/dashboard/bookings` | Full, Partial(travel), Mgr | `TRAVEL` | perm: travel:CAN_VIEW_TRIP_INFORMATION | — | — | — | `app/products/finance/Travel/routes/travel.routes.tsx:328` |
| Policies | `/travel/dashboard/policies` | Full, Partial(travel) | `TRAVEL` | perm: travel:CAN_MODIFY_POLICIES_AND_SETTINGS | — | — | — | `app/products/finance/Travel/routes/travel.routes.tsx:226` |
| Profile | `/travel/dashboard/profile` | Full, Partial(travel), Mgr, EE | `TRAVEL` | — | — | — | — | `app/products/finance/Travel/routes/travel.routes.tsx:251` |
| Settings | `/travel/dashboard/settings` | Full, Partial(travel) | `TRAVEL` | perm: travel:CAN_MODIFY_POLICIES_AND_SETTINGS | — | — | — | `app/products/finance/Travel/routes/travel.routes.tsx:288` |

### Accounting  `spend-accounting`

2 nodes · path `/spend-management/dashboard/accounting` · gate `ACCOUNTING_INTEGRATIONS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Overview | `/spend-management/dashboard/accounting` | Full, Partial(spend) | `ACCOUNTING_INTEGRATIONS` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:290` |
| Settings | `/spend-management/settings/accounting` | Full, Partial(spend) | `ACCOUNTING_INTEGRATIONS` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:1542` |

### Vendors  `vendors`

2 nodes · path `/spend-management/vendors` · gate `VENDORS`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| All Vendors | `/spend-management/dashboard/vendors` | Full, Partial(spend) | `VENDORS` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:142` |
| 1099 Vendors | `/spend-management/dashboard/vendors/1099` | Full, Partial(spend) | `VENDORS` | — | — | — | — | `app/products/finance/SpendManagement/routes-v6/spend.routes.tsx:158` |

