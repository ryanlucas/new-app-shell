#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compose } from './lib/compose.ts'
import type { PlansFile, Proposal, ShellFrame, ShellSuites } from './lib/types.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = <T>(p: string): T => JSON.parse(readFileSync(join(root, p), 'utf8')) as T

const proposalId = process.argv[2]
if (!proposalId) {
  console.error('Usage: node scripts/inspect-proposal.ts <proposalId>')
  process.exit(1)
}

const suites = read<ShellSuites>('data/current/suites.json')
const plans = read<PlansFile>('data/current/plans.json')
const frame = read<ShellFrame>('data/current/frame.json')
const proposal = read<Proposal>(`data/proposals/${proposalId}.json`)

const r = compose({ suites, plans, frame, proposal })

console.log(`\n=== Composed proposal: ${proposal.label} ===\n`)
console.log(`Suite count: ${r.suites.suites.length} (was ${suites.suites.length})\n`)

for (const s of r.suites.suites) {
  const note = s._proposalNotes?.length
    ? ` [touched: ${s._proposalNotes.map((n) => n.op).join(', ')}]`
    : ''
  console.log(`${s.label.padEnd(18)} \`${s.id}\`${note}`)
  for (const a of s.apps || []) {
    const origin = a._proposalNotes?.[0]?.originSuite
    const tag = origin ? ` [moved from ${origin}]` : ''
    const gate = a.visibility?.productGate || '—'
    console.log(`    ${a.label.padEnd(28)} (${a.id}) gate=${gate}${tag}`)
  }
}

console.log('\n=== Plan ownedSuites after composition ===')
for (const p of r.plans.plans) {
  console.log(`${p.id.padEnd(22)} : ${p.ownedSuites.join(', ')}`)
}
