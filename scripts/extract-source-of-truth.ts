#!/usr/bin/env node
// Walk rippling-main/app/apps/data/apps/internal/*.json — these are the
// canonical app definitions. Each declares navigation_categories which maps
// to one of our suites. Build a "source-of-truth" catalog from them and
// diff against data/current/suites.json.

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const RIPPLING_MAIN = `${process.env.HOME}/dev/code/rippling-main`
const APPS_DIR = `${RIPPLING_MAIN}/app/apps/data/apps/internal`
const OUT_DIR = `${root}/data/research/source-of-truth`

interface InternalApp {
  id: string
  name: string
  _displayName?: string
  description?: string
  dashboard_url?: string
  ee_dashboard_url?: string
  ee_dashboard_display_name?: string
  navigation_categories?: string[]
  navigationSortPriority?: number
  invisible?: boolean
  billingPlanTypes?: string[]
  type?: string
  managedByTeam?: string
  primary_slug?: string
}

// Subcategory key → our suite id
const SUBCAT_TO_SUITE: Record<string, string> = {
  'navigation_bar_subcategory.hr_management': 'hr',
  'navigation_bar_subcategory.talent': 'talent',
  'navigation_bar_subcategory.payroll': 'payroll',
  'navigation_bar_subcategory.finance': 'spend',          // renamed from spend_management in code
  'navigation_bar_subcategory.spend': 'spend',
  'navigation_bar_subcategory.spend_management': 'spend',
  'navigation_bar_subcategory.time_management': 'time',
  'navigation_bar_subcategory.insurance_benefits': 'benefits',
  'navigation_bar_subcategory.it_management': 'it',
  'navigation_bar_subcategory.identity_management': 'identity',
  'navigation_bar_subcategory.banking': 'banking',
  'navigation_bar_subcategory.global': 'global',
  'navigation_bar_subcategory.peo': 'peo',
  'navigation_bar_subcategory.custom_apps': 'custom-apps',
  'navigation_bar_subcategory.tools': 'tools',
  'navigation_bar_subcategory.partner': 'partner',
  'navigation_bar_subcategory.settings': 'settings',
  'navigation_bar_subcategory.data': 'data',
}

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })
if (!existsSync(APPS_DIR)) {
  console.error(`Missing ${APPS_DIR} — make sure rippling-main is checked out at ~/dev/code/`)
  process.exit(1)
}

// ─── Collect ──────────────────────────────────────────────────────────────────
type Entry = {
  id: string
  name: string
  displayName: string
  path: string | null
  navigationSortPriority: number
  invisible: boolean
  billingPlanTypes: string[]
  source: string
  raw: InternalApp
}

const bySuite: Record<string, Entry[]> = {}
let totalApps = 0
let unmappedSubcats = new Set<string>()
let appsWithNoCategory = 0

for (const file of readdirSync(APPS_DIR)) {
  if (!file.endsWith('.json')) continue
  const path = join(APPS_DIR, file)
  let raw: any
  try {
    raw = JSON.parse(readFileSync(path, 'utf8'))
  } catch (e) {
    continue
  }
  // Some files contain arrays of apps; some are single objects.
  const apps: InternalApp[] = Array.isArray(raw) ? raw : [raw]
  for (const app of apps) {
    if (!app || !app.id || !app.navigation_categories?.length) {
      if (app && app.id) appsWithNoCategory += 1
      continue
    }
    totalApps += 1
    for (const cat of app.navigation_categories) {
      const suite = SUBCAT_TO_SUITE[cat]
      if (!suite) {
        unmappedSubcats.add(cat)
        continue
      }
      const entry: Entry = {
        id: app.id,
        name: app.name,
        displayName: app._displayName || app.name,
        path: app.dashboard_url ?? null,
        navigationSortPriority: app.navigationSortPriority ?? 0,
        invisible: app.invisible ?? false,
        billingPlanTypes: app.billingPlanTypes ?? [],
        source: `rippling-main:app/apps/data/apps/internal/${file}`,
        raw: app,
      }
      ;(bySuite[suite] ??= []).push(entry)
    }
  }
}

// Merge in dummy apps if the python extractor has been run.
const DUMMY_APPS_JSON = `${OUT_DIR}/dummy-apps-by-suite.json`
if (existsSync(DUMMY_APPS_JSON)) {
  const dummy = JSON.parse(readFileSync(DUMMY_APPS_JSON, 'utf8')) as Record<
    string,
    Array<{ varname: string; id: string; name: string; displayName: string; path: string | null; navigationSortPriority: number; invisible: boolean }>
  >
  for (const [suite, entries] of Object.entries(dummy)) {
    for (const e of entries) {
      ;(bySuite[suite] ??= []).push({
        id: e.id,
        name: e.name,
        displayName: e.displayName,
        path: e.path,
        navigationSortPriority: e.navigationSortPriority || 0,
        invisible: e.invisible,
        billingPlanTypes: [],
        source: `rippling-main:app/apps/utils/dummy_apps.py:${e.varname}`,
        raw: { id: e.id, name: e.name } as InternalApp,
      })
    }
  }
}

// Merge in FE-overlay entries (rippling-webapp standaloneNavigation, admin
// navbars, etc.) if the agent extraction has been written.
const FE_OVERLAYS_JSON = `${OUT_DIR}/fe-overlays.json`
if (existsSync(FE_OVERLAYS_JSON)) {
  const overlay = JSON.parse(readFileSync(FE_OVERLAYS_JSON, 'utf8')) as {
    entries: Array<{ id: string; label: string; path: string; suite: string; source: string }>
  }
  for (const e of overlay.entries ?? []) {
    ;(bySuite[e.suite] ??= []).push({
      id: e.id,
      name: e.id,
      displayName: e.label,
      path: e.path ?? null,
      navigationSortPriority: 0,
      invisible: false,
      billingPlanTypes: [],
      source: e.source,
      raw: { id: e.id, name: e.id } as InternalApp,
    })
  }
}

// Sort each suite by navigationSortPriority asc (lower priority comes first)
for (const suite of Object.keys(bySuite)) {
  bySuite[suite].sort((a, b) => a.navigationSortPriority - b.navigationSortPriority)
}

// ─── Diff vs our catalog ──────────────────────────────────────────────────────
const ours = JSON.parse(readFileSync(`${root}/data/current/suites.json`, 'utf8'))
const oursById: Record<string, { suite: string; app: any }> = {}
for (const s of ours.suites) for (const a of s.apps) oursById[a.id] = { suite: s.id, app: a }

const diffs: Record<string, { onlyInTruth: Entry[]; onlyInOurs: any[]; mismatches: any[] }> = {}
for (const suite of Object.keys(bySuite)) {
  const truthIds = new Set(bySuite[suite].map((e) => e.id))
  const oursSuite = ours.suites.find((s: any) => s.id === suite)
  const oursIds = new Set<string>(oursSuite?.apps.map((a: any) => a.id) ?? [])

  diffs[suite] = {
    onlyInTruth: bySuite[suite].filter((e) => !oursIds.has(e.id) && !e.invisible),
    onlyInOurs: (oursSuite?.apps ?? []).filter((a: any) => !truthIds.has(a.id)),
    mismatches: [],
  }
  for (const e of bySuite[suite]) {
    const oursApp = oursById[e.id]
    if (!oursApp) continue
    const issues: string[] = []
    if (oursApp.suite !== suite)
      issues.push(`suite mismatch: ours=${oursApp.suite} truth=${suite}`)
    if (oursApp.app.label !== e.displayName)
      issues.push(`label: ours='${oursApp.app.label}' truth='${e.displayName}'`)
    if (oursApp.app.path !== e.path)
      issues.push(`path: ours='${oursApp.app.path}' truth='${e.path}'`)
    if (issues.length) diffs[suite].mismatches.push({ id: e.id, issues })
  }
}

// ─── Write outputs ────────────────────────────────────────────────────────────
const truthOut: Record<string, Entry[]> = bySuite
writeFileSync(`${OUT_DIR}/apps-by-suite.json`, JSON.stringify(truthOut, null, 2) + '\n')
writeFileSync(`${OUT_DIR}/diff-vs-current.json`, JSON.stringify(diffs, null, 2) + '\n')

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log(`Scanned ${totalApps} app definitions in ${APPS_DIR}`)
console.log(`  Skipped ${appsWithNoCategory} apps with no navigation_categories`)
if (unmappedSubcats.size) {
  console.log(`  Unmapped subcategories (will need adding to SUBCAT_TO_SUITE):`)
  for (const c of unmappedSubcats) console.log(`    - ${c}`)
}
console.log()
console.log('Source-of-truth counts per suite:')
for (const suite of Object.keys(bySuite).sort()) {
  const visible = bySuite[suite].filter((e) => !e.invisible).length
  console.log(`  ${suite.padEnd(14)} ${visible} visible (${bySuite[suite].length} total incl invisible)`)
}
console.log()
console.log('DIFF (truth vs our catalog):')
for (const [suite, d] of Object.entries(diffs)) {
  if (d.onlyInTruth.length === 0 && d.onlyInOurs.length === 0 && d.mismatches.length === 0) continue
  console.log(`\n  [${suite}]`)
  if (d.onlyInTruth.length) {
    console.log(`    Missing from our catalog (${d.onlyInTruth.length}):`)
    for (const e of d.onlyInTruth) console.log(`      + ${e.id} (${e.displayName}) → ${e.path}`)
  }
  if (d.onlyInOurs.length) {
    console.log(`    Only in our catalog, not in source of truth (${d.onlyInOurs.length}):`)
    for (const a of d.onlyInOurs) console.log(`      - ${a.id} (${a.label})`)
  }
  if (d.mismatches.length) {
    console.log(`    Field mismatches (${d.mismatches.length}):`)
    for (const m of d.mismatches) {
      console.log(`      ~ ${m.id}`)
      for (const i of m.issues) console.log(`          ${i}`)
    }
  }
}
console.log(`\nFull artifacts: ${OUT_DIR}/apps-by-suite.json, ${OUT_DIR}/diff-vs-current.json`)
