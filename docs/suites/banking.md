# Banking  `banking`

**Suite visibility:** Full, Partial(banking_admin)  
**Product gate:** `BANKING`  
**Cross-sell:** locked → full, partial · SidenavBanking  
**Source:** `app/apps/scripts/app_navigation_categories_data.py:168-176`

## Apps (1)

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Banking | `/banking` | Full, Partial(banking_admin) | `BANKING` | — | locked → full, partial · SidenavBanking | — | — | `app/cross_sell/unpurchased_sku/unpurchased_sku_nav_items.py:441` |

## App L3 internal navigation

### Banking  `banking-overview`

6 nodes · path `/banking` · gate `BANKING`

| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |
|---|---|---|---|---|---|---|---|---|
| Accounts | `/banking/accounts` | Full, Partial(banking) | `BANKING` | — | — | — | — | `app/products/finance/Banking/routes/route-urls.ts:75` |
| Transactions | `/banking/transactions` | Full, Partial(banking) | `BANKING` | — | — | — | — | `app/products/finance/Banking/routes/route-urls.ts:81` |
| Deposit | `/banking/deposit` | Full, Partial(banking) | `BANKING` | perm: banking:OPERATOR | — | — | — | `app/products/finance/Banking/routes/route-urls.ts:121` |
| Send Transfer | `/banking/new-transfer` | Full, Partial(banking) | `BANKING` | perm: banking:OPERATOR | — | — | — | `app/products/finance/Banking/routes/route-urls.ts:123` |
| Tax Documents | `/banking/tax-documents` | Full, Partial(banking) | `BANKING` | — | — | — | — | `app/products/finance/Banking/routes/route-urls.ts:100` |
| Settings | `/spend-management/settings/banking` | Full, Partial(banking) | `BANKING` | — | — | — | — | `app/products/finance/Banking/routes/route-urls.ts:107` |

