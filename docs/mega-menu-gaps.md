# Mega menu coverage gaps

The EverythingBar mega menu currently renders **suites + their L2 apps** (the second sidebar section). Everything else in the catalog lives outside the mega menu — partly by design, partly because no UI surfaces it yet, partly because the concept isn't modeled at all.

This doc inventories what's *not* in the mega menu so we can decide intentionally what to surface and where.

## Quick-action entry points (sidebar firstSection)

These are imperative actions, not destinations. They kick off flows:

- **Hire** (`/navigate-role-hire`)
- **Offboard** (`/role-terminate/complete/select`)
- **Add People** (`/add-people`)
- **Remove People** (`/remove-people`)

The mega menu is destination-oriented. These actions might belong in a separate part of the EverythingBar (a command/action panel) or stay in firstSection.

## Standalone destinations (sidebar firstSection)

Top-level entries that sit above the suites:

- **Home** / dashboard (`/dashboard`)
- **My Implementation** — onboarding checklist (general and PEO variants)
- **Org Chart** (`/org-chart`)

Each of these is a first-class destination that doesn't fit any suite's mental model. Org Chart is its own thing (people graph). Home is the company landing page. My Implementation is a transient setup surface.

## Cross-cutting utilities (sidebar thirdSection)

Bottom-of-sidebar entries:

- **App Shop** (`/app-shop`)
- **Help** (`/help`)
- **Referral** (`/referral`)

Browse/discover surfaces. App Shop is the marketplace for installable apps; Help is documentation/support; Referral is the customer referral program.

## Top bar contextual / state banners

Account-state announcements — not destinations, can't really sit in mega menu:

- IT Trial Countdown / Trial Days Remaining
- Migration Info bar
- Sandbox Environment bar
- Company Info bar
- Labs banner
- Company logo / name display

## Top bar utilities

Auxiliary tooling — typically icon-only triggers in the top bar:

- Support
- Accessibility widget
- Feedback widget
- Language switcher
- Translation Tools

## User menu (account dropdown)

Items in the user/account dropdown:

- Profile (`/profile`)
- Account Settings (`/account-settings`)
- My Partner Profile (`/partner/profile`) — for partner-company users
- Account Switcher — switch between companies you're a member of
- Previous Profiles — recently-viewed profiles
- Role Switcher (Admin / Employee / Contractor)
- Legal / Licensing / TOS / Accessibility Statement
- Sign Out

These are user-identity scoped, not company-scoped. Probably stay in the account dropdown, not in mega menu.

## Cross-sell

- **Global Workforce** locked tile (thirdSection + appLauncher) — shown to non-owners
- **Bundles** — marketing umbrellas spanning multiple SKUs (see `docs/cross-sell.md`). Not modeled in catalog yet.

## Concepts not modeled in the catalog

- **L3 sub-pages within apps** — each app has internal nav (e.g. Data Catalog has All Fields / Custom Objects / Data Permissions tabs). The mega menu is L2-only by design; deep-linking to L3 happens via search/palette.
- **Suite-scoped capability rails** — inverting Audit Log / Permissions / Recipes etc. into each suite (discussed in conversation; not implemented). Would let a partial admin see HR-scoped Audit inside HR rather than going to the global Audit Log.
- **Installed custom apps registry** — a directory of all custom apps the company has built/installed. The Custom Apps L2 in Studio is the *admin/builder* surface; a *list-of-installed* registry doesn't exist yet.

## What to do with this

Decisions to make later, not now:

1. **firstSection actions in mega menu?** Hire / Offboard / Add People / Remove People are imperative, not navigational. Could surface in the EverythingBar's command-palette mode rather than the visual mega menu.
2. **firstSection destinations in mega menu?** Home, My Implementation, Org Chart — fit the destination model, but they're singletons (no suite sub-tree). A "Quick access" or "More" section in the mega menu could collect them.
3. **thirdSection (App Shop, Help, Referral)** — same shape as firstSection destinations, lives at the bottom for de-prioritization. Could fold into mega menu's bottom tier or stay in sidebar chrome.
4. **Top bar widgets** — stay in top bar; don't try to cram into mega menu.
5. **User menu** — stays in account dropdown; out of scope for mega menu.
6. **Cross-sell tiles** — separate concern, see `cross-sell.md`.
7. **L3 navigation** — handled by the EverythingBar's search/palette mode (deep-link by typing), not by clicking through the visual menu.
8. **Suite-scoped capability rails** — render-time concern; revisit when capability inversion becomes the focus.
9. **Custom apps registry** — design call, see "Where does the list of installed custom apps live?" in conversation history.
