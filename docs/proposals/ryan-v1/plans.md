# Plans

Protoype fixtures representing realistic Rippling go-to-market configurations.

| ID | Label | Description | Owned suites | Conditions |
|---|---|---|---|---|
| `full` | Full Suite | All Rippling products purchased | `hr`, `talent`, `payroll`, `finance`, `time`, `benefits`, `it`, `data`, `global`, `custom-apps`, `platform`, `partner` | — |
| `hris-only` | HRIS only | Standalone HRIS customer — HR + reporting + integrations | `hr`, `custom-apps`, `data`, `platform` | — |
| `spend-only` | Spend Management only (standalone) | Standalone Spend customer — no HR/Payroll. Spend pillar plus banking and integrations. | `finance`, `custom-apps`, `platform` | `isStandaloneCompany` |
| `it-only` | IT only (standalone) | Standalone IT customer — devices, identity, and integrations only. | `it`, `custom-apps`, `platform` | `isStandaloneCompany` |
| `hr-payroll-benefits` | HR + Payroll + Benefits | Typical SMB bundle — HR, Payroll, Time, Benefits, plus reporting and integrations. | `hr`, `payroll`, `benefits`, `time`, `custom-apps`, `data`, `platform` | — |
| `peo` | Rippling PEO | Co-employment client. Rippling is the legal employer of record; HR/Payroll/Benefits/Time/Compliance are bundled and delivered through Rippling's PEO entity. | `hr`, `payroll`, `benefits`, `time`, `custom-apps`, `data`, `platform` | `isPeoClient` |
