# Plans

Protoype fixtures representing realistic Rippling go-to-market configurations.

| ID | Label | Description | Owned suites | Conditions |
|---|---|---|---|---|
| `full` | Full Suite | All Rippling products purchased | `hr`, `talent`, `payroll`, `spend`, `time`, `benefits`, `it`, `identity`, `data`, `banking`, `global`, `peo`, `custom-apps`, `tools`, `partner`, `settings` | — |
| `hris-only` | HRIS only | Standalone HRIS customer — HR + reporting + integrations | `hr`, `custom-apps`, `data`, `settings` | — |
| `spend-only` | Spend Management only (standalone) | Standalone Spend customer — no HR/Payroll. Spend pillar plus banking and integrations. | `spend`, `custom-apps`, `banking`, `settings` | `isStandaloneCompany` |
| `it-only` | IT only (standalone) | Standalone IT customer — devices, identity, and integrations only. | `it`, `identity`, `custom-apps`, `settings` | `isStandaloneCompany` |
| `hr-payroll-benefits` | HR + Payroll + Benefits | Typical SMB bundle — HR, Payroll, Time, Benefits, plus reporting and integrations. | `hr`, `payroll`, `benefits`, `time`, `custom-apps`, `data`, `settings` | — |
