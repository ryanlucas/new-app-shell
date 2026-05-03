#!/usr/bin/env node
// Phase 2 recovery: write skeleton {appId, ..., nav: []} for any first-class app
// missing from data/apps/. Existing files are not touched.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { ShellSuites } from '../src/lib/types.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const currentDir = join(root, 'data', 'current')
const appsDir = join(currentDir, 'apps')

const suites = JSON.parse(readFileSync(join(currentDir, 'suites.json'), 'utf8')) as ShellSuites

// Existing apps live in suite subfolders; flatten the index.
const existing = new Set<string>()
for (const entry of readdirSync(appsDir)) {
  const entryPath = join(appsDir, entry)
  try {
    const stat = (await import('node:fs')).statSync(entryPath)
    if (stat.isDirectory()) {
      for (const f of readdirSync(entryPath)) {
        if (f.endsWith('.json') && !f.startsWith('_')) existing.add(f.replace(/\.json$/, ''))
      }
    } else if (entry.endsWith('.json') && !entry.startsWith('_')) {
      existing.add(entry.replace(/\.json$/, ''))
    }
  } catch {
    /* skip */
  }
}

let written = 0
for (const suite of suites.suites) {
  for (const app of suite.apps || []) {
    if (existing.has(app.id)) continue
    const skeleton = {
      appId: app.id,
      appLabel: app.label,
      appPath: app.path,
      appProductGate: app.visibility?.productGate ?? null,
      _meta: {
        generatedBy: 'phase-2-skeleton',
        uncertainties: [
          'Internal navigation not yet researched. Skeleton only. Run a targeted agent to enrich.',
        ],
      },
      nav: [],
    }
    writeFileSync(join(appsDir, `${app.id}.json`), JSON.stringify(skeleton, null, 2) + '\n')
    written += 1
  }
}

// Integration template
const integrationPath = join(appsDir, '_integration.json')
if (!existsSync(integrationPath)) {
  const template = {
    appId: '_integration',
    appLabel: 'Provisioning Integration (template)',
    appPath: null,
    appProductGate: null,
    _meta: {
      generatedBy: 'phase-2-skeleton',
      note: 'Shared template for the ~70 third-party provisioning integrations (Slack, GitHub, Salesforce, Okta, Gmail, Office365, AWS, etc.). Used by `third-party-integrations` umbrella app.',
      uncertainties: [
        'Integration apps share a common nav pattern (Overview, Settings, Sync Logs, Mappings, Permissions). Not yet verified per-integration.',
      ],
    },
    nav: [
      {
        id: 'integration-overview',
        label: 'Overview',
        icon: 'LayoutDashboard',
        path: null,
        parent: null,
        visibility: {
          personas: ['full', 'partial'],
          scopeForPartial: ['app_admin', 'integration_full_admin'],
          productGate: null,
          permissionGate: null,
          conditions: [],
          whenUnowned: null,
        },
        personaVariants: {},
        source: 'app/products/it/AppManagement/* (template)',
      },
      {
        id: 'integration-settings',
        label: 'Settings',
        icon: 'Settings',
        path: null,
        parent: null,
        visibility: {
          personas: ['full', 'partial'],
          scopeForPartial: ['app_admin', 'integration_full_admin'],
          productGate: null,
          permissionGate: null,
          conditions: [],
          whenUnowned: null,
        },
        personaVariants: {},
        source: 'app/products/it/AppManagement/* (template)',
      },
      {
        id: 'integration-sync-logs',
        label: 'Sync Logs',
        icon: 'History',
        path: null,
        parent: null,
        visibility: {
          personas: ['full', 'partial'],
          scopeForPartial: ['app_admin', 'integration_full_admin'],
          productGate: null,
          permissionGate: null,
          conditions: [],
          whenUnowned: null,
        },
        personaVariants: {},
        source: 'app/products/it/AppManagement/* (template)',
      },
      {
        id: 'integration-mappings',
        label: 'Field Mappings',
        icon: 'GitBranch',
        path: null,
        parent: null,
        visibility: {
          personas: ['full', 'partial'],
          scopeForPartial: ['app_admin', 'integration_full_admin'],
          productGate: null,
          permissionGate: null,
          conditions: [],
          whenUnowned: null,
        },
        personaVariants: {},
        source: 'app/products/it/AppManagement/* (template)',
      },
      {
        id: 'integration-permissions',
        label: 'Permissions',
        icon: 'Shield',
        path: null,
        parent: null,
        visibility: {
          personas: ['full', 'partial'],
          scopeForPartial: ['app_admin', 'integration_full_admin'],
          productGate: null,
          permissionGate: null,
          conditions: [],
          whenUnowned: null,
        },
        personaVariants: {},
        source: 'app/products/it/AppManagement/* (template)',
      },
    ],
  }
  writeFileSync(integrationPath, JSON.stringify(template, null, 2) + '\n')
  written += 1
}

console.log(`Wrote ${written} skeleton files. Total apps in data/apps/: ${readdirSync(appsDir).length}`)
