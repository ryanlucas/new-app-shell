#!/usr/bin/env node
// One-shot reorg: move data/ files into data/current/ with suite-grouped apps.
// Idempotent — checks for existing destinations before moving.

import { readFileSync, mkdirSync, renameSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { ShellSuites } from './lib/types.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const data = (p: string) => join(root, 'data', p)

// 1. Determine each app's suite by reading shell-suites.json
const suitesData = JSON.parse(readFileSync(data('shell-suites.json'), 'utf8')) as ShellSuites
const appToSuite = new Map<string, string>()
for (const suite of suitesData.suites) {
  for (const app of suite.apps || []) {
    appToSuite.set(app.id, suite.id)
  }
}

// 2. Make target directories
mkdirSync(data('current/apps'), { recursive: true })
const suiteIds = new Set(suitesData.suites.map((s) => s.id))
for (const sid of suiteIds) {
  mkdirSync(data(`current/apps/${sid}`), { recursive: true })
}

// 3. Move top-level catalog files (rename shell-frame → frame, shell-suites → suites)
const topLevelMoves: Array<[string, string]> = [
  ['shell-frame.json', 'current/frame.json'],
  ['shell-suites.json', 'current/suites.json'],
  ['personas.json', 'current/personas.json'],
  ['plans.json', 'current/plans.json'],
  ['spokes.json', 'current/spokes.json'],
]
let moved = 0
for (const [from, to] of topLevelMoves) {
  if (existsSync(data(from))) {
    renameSync(data(from), data(to))
    moved += 1
    console.log(`✓ ${from} → ${to}`)
  }
}

// 4. Move app files into their suite folders
const appFiles = readdirSync(data('apps')).filter((f) => f.endsWith('.json'))
let appsMoved = 0
let unmatched: string[] = []
for (const file of appFiles) {
  if (file === '_integration.json') {
    renameSync(data(`apps/${file}`), data(`current/apps/${file}`))
    console.log(`✓ apps/${file} → current/apps/${file}`)
    appsMoved += 1
    continue
  }
  const appId = file.replace(/\.json$/, '')
  const suite = appToSuite.get(appId)
  if (!suite) {
    unmatched.push(appId)
    continue
  }
  renameSync(data(`apps/${file}`), data(`current/apps/${suite}/${file}`))
  appsMoved += 1
}
console.log(`✓ moved ${appsMoved} app files into suite folders`)
if (unmatched.length) {
  console.warn(`⚠ ${unmatched.length} app file(s) had no matching suite — left in data/apps/:`)
  for (const a of unmatched) console.warn(`    ${a}`)
}

console.log(`\nDone. Moved ${moved} top-level files + ${appsMoved} app files.`)
