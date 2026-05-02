#!/usr/bin/env node
// Render the catalog (and optional proposal) as a navigable docs/ tree.
//
//   node scripts/render-nav-md.ts                    # → docs/
//   node scripts/render-nav-md.ts --proposal=ryan-v1 # → docs/proposals/ryan-v1/

import { readFileSync, writeFileSync, readdirSync, statSync, rmSync, mkdirSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compose } from './lib/compose.ts'
import type {
  NavNode,
  PersonasFile,
  PlansFile,
  Proposal,
  ShellFrame,
  ShellSuites,
  SpokesFile,
  Suite,
  Visibility,
} from './lib/types.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const currentDir = join(root, 'data', 'current')
const read = <T>(rel: string): T => JSON.parse(readFileSync(join(currentDir, rel), 'utf8')) as T

const args = process.argv.slice(2)
const proposalArg = args.find((a) => a.startsWith('--proposal='))?.split('=')[1] ?? null

let frame = read<ShellFrame>('frame.json')
let suites = read<ShellSuites>('suites.json')
const personas = read<PersonasFile>('personas.json')
let plans = read<PlansFile>('plans.json')
const spokes = read<SpokesFile>('spokes.json')

let proposal: Proposal | null = null
if (proposalArg) {
  proposal = JSON.parse(
    readFileSync(join(root, 'data', 'proposals', `${proposalArg}.json`), 'utf8'),
  ) as Proposal
  const composed = compose({ suites, plans, frame, proposal })
  suites = composed.suites
  plans = composed.plans
  frame = composed.frame
}

// ─── L3 nav file index ────────────────────────────────────────────────────────
// Read every per-app JSON from data/current/apps/<suite>/<appId>.json and key by appId.
// Apps moved by a proposal still live in their original folder; lookup by id works regardless.
interface AppL3File {
  appId: string
  appLabel: string
  appPath: string | null
  appProductGate: string | null
  _meta?: { generatedBy?: string; uncertainties?: unknown[] }
  nav?: NavNode[]
}
const appL3: Map<string, AppL3File> = new Map()
const appsRoot = join(currentDir, 'apps')
for (const entry of readdirSync(appsRoot)) {
  const entryPath = join(appsRoot, entry)
  if (statSync(entryPath).isDirectory()) {
    for (const file of readdirSync(entryPath)) {
      if (!file.endsWith('.json')) continue
      const data = JSON.parse(readFileSync(join(entryPath, file), 'utf8')) as AppL3File
      appL3.set(data.appId, data)
    }
  }
}

// ─── helpers ──────────────────────────────────────────────────────────────────
const escapeCell = (s: unknown): string =>
  String(s ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ')
const code = (s: unknown): string => (s ? `\`${escapeCell(s)}\`` : '—')

function fmtPersonas(v?: Visibility | null): string {
  if (!v?.personas?.length) return '—'
  const tags: string[] = []
  if (v.personas.includes('full')) tags.push('Full')
  if (v.personas.includes('partial')) {
    tags.push(v.scopeForPartial?.length ? `Partial(${v.scopeForPartial.join(', ')})` : 'Partial')
  }
  if (v.personas.includes('manager')) tags.push('Mgr')
  if (v.personas.includes('ee')) tags.push('EE')
  return tags.join(', ')
}

function fmtConditions(v?: Visibility | null): string {
  const parts: string[] = []
  if (v?.permissionGate) parts.push(`perm: ${v.permissionGate}`)
  if (v?.conditions?.length) parts.push(...v.conditions)
  return parts.length ? parts.join('; ') : '—'
}

function fmtCrossSell(v?: Visibility | null): string {
  if (!v?.whenUnowned) return '—'
  const tos = v.whenUnowned.showLockedTo?.join(', ') || '—'
  const campaign = v.whenUnowned.campaign ? ` · ${v.whenUnowned.campaign}` : ''
  return `locked → ${tos}${campaign}`
}

function fmtVariants(node: NavNode): string {
  if (!node.personaVariants || !Object.keys(node.personaVariants).length) return '—'
  return Object.entries(node.personaVariants)
    .map(([k, v]) => `${k}: ${v?.label ?? ''}${v?.path ? ` (${v.path})` : ''}`)
    .join('; ')
}

const TABLE_HEADER =
  '| Label | Path | Personas | Product gate | Conditions | Cross-sell | Variants | Logical ID | Source |\n' +
  '|---|---|---|---|---|---|---|---|---|'

function row(node: NavNode): string {
  const v = node.visibility
  return (
    `| ${escapeCell(node.label)} ` +
    `| ${code(node.path)} ` +
    `| ${escapeCell(fmtPersonas(v))} ` +
    `| ${code(v?.productGate)} ` +
    `| ${escapeCell(fmtConditions(v))} ` +
    `| ${escapeCell(fmtCrossSell(v))} ` +
    `| ${escapeCell(fmtVariants(node))} ` +
    `| ${node.logicalId ? `\`${node.logicalId}\`` : '—'} ` +
    `| ${code(node.source)} |`
  )
}

// ─── output target ────────────────────────────────────────────────────────────
const outDir = proposal
  ? join(root, 'docs', 'proposals', proposal.id)
  : join(root, 'docs')

// Clean rebuild — wipe and recreate
rmSync(outDir, { recursive: true, force: true })
mkdirSync(join(outDir, 'suites'), { recursive: true })

const writeDoc = (relPath: string, body: string) => {
  const fullPath = join(outDir, relPath)
  mkdirSync(dirname(fullPath), { recursive: true })
  writeFileSync(fullPath, body)
}

// ─── README.md (top-level index) ──────────────────────────────────────────────
{
  let body = ''
  if (proposal) {
    body += `# Proposed IA — ${proposal.label}\n\n`
    if (proposal.description) body += `${proposal.description}\n\n`
    body += `Generated by applying \`data/proposals/${proposal.id}.json\` to the current Rippling catalog. Re-run \`node scripts/render-nav-md.ts --proposal=${proposal.id}\` after edits.\n\n`
    body += `## Operations applied (${proposal.ops.length})\n\n`
    for (const op of proposal.ops) {
      const summary = JSON.stringify(
        Object.fromEntries(
          Object.entries(op).filter(
            ([k]) => k !== 'op' && k !== 'visibility' && k !== 'personaVariants',
          ),
        ),
      )
      body += `- \`${op.op}\` ${summary}\n`
    }
    body += '\n'
  } else {
    body += '# Rippling Navigation — Verified Catalog\n\n'
    body += `Source of truth for the current Rippling shell. JSON in \`data/current/\`. Re-run \`node scripts/render-nav-md.ts\` after JSON edits.\n\n`
  }

  body += `Persona vocabulary: **Full** = full company admin · **Partial(scope)** = partial admin with named scope · **Mgr** = manager (has direct reports) · **EE** = employee.\n\n`

  body += `## Index\n\n`
  body += `### Catalog\n`
  body += `- [Personas](personas.md) — 4 personas + ${personas.personas.find((p) => p.id === 'partial')?.scopes?.length ?? 0} partial-admin scopes\n`
  body += `- [Plans](plans.md) — ${plans.plans.length} plan fixtures\n`
  body += `- [Spokes](spokes.md) — ${spokes.spokes.length} product handles\n`
  body += `- [Shape-shifters](shape-shifters.md) — same logical thing, multiple placements\n`
  body += `- [Catalog uncertainties](uncertainties.md) — flagged gaps from generators\n\n`

  body += `### Shell\n`
  body += `- [Shell frame](shell-frame.md) — sidebar 1st/3rd, top bar, user menu, app launcher\n\n`

  body += `### Suites & apps\n`
  const totalApps = suites.suites.reduce((n, s) => n + (s.apps?.length || 0), 0)
  body += `${suites.suites.length} suites, ${totalApps} apps total.\n\n`
  body += `| Suite | Apps | L3 nav coverage |\n|---|---|---|\n`
  for (const s of suites.suites) {
    const appCount = s.apps?.length || 0
    const withL3 = (s.apps || []).filter((a) => (appL3.get(a.id)?.nav?.length || 0) > 0).length
    body += `| [${s.label}](suites/${s.id}.md) \`${s.id}\` | ${appCount} | ${withL3}/${appCount} |\n`
  }
  body += `\n`

  if (proposal) {
    body += `### Provenance\n\n`
    body += `Nodes touched by proposal ops are annotated with **[touched: …]** badges in the suite docs.\n`
  }

  writeDoc('README.md', body)
}

// ─── personas.md ──────────────────────────────────────────────────────────────
{
  let body = '# Personas\n\n'
  body += '| ID | Label | Description | Source |\n|---|---|---|---|\n'
  for (const p of personas.personas) {
    body += `| \`${p.id}\` | ${escapeCell(p.label)} | ${escapeCell(p.description)} | ${code(p.source)} |\n`
  }
  const partial = personas.personas.find((p) => p.id === 'partial')
  if (partial?.scopes?.length) {
    body += `\n## Partial-admin scopes (${partial.scopes.length})\n\n`
    body += '| Scope ID | Label | Source |\n|---|---|---|\n'
    for (const s of partial.scopes) {
      body += `| \`${s.id}\` | ${escapeCell(s.label)} | ${code(s.source)} |\n`
    }
  }
  writeDoc('personas.md', body)
}

// ─── plans.md ─────────────────────────────────────────────────────────────────
{
  let body = '# Plans\n\nProtoype fixtures representing realistic Rippling go-to-market configurations.\n\n'
  body += '| ID | Label | Description | Owned suites | Conditions |\n|---|---|---|---|---|\n'
  for (const p of plans.plans) {
    const conds = p.conditions?.length ? p.conditions.map((c) => `\`${c}\``).join(', ') : '—'
    body += `| \`${p.id}\` | ${escapeCell(p.label)} | ${escapeCell(p.description)} | ${p.ownedSuites.map((s) => `\`${s}\``).join(', ')} | ${conds} |\n`
  }
  writeDoc('plans.md', body)
}

// ─── spokes.md ────────────────────────────────────────────────────────────────
{
  let body = `# Product spokes (${spokes.spokes.length})\n\nFull catalog of Rippling product handles (\`DefaultSpokeHandles\`).\n\n`
  body += '| Handle | Label | Category | Sidenav | Cross-sell category | Source |\n'
  body += '|---|---|---|---|---|---|\n'
  for (const s of spokes.spokes) {
    body += `| ${code(s.handle)} | ${escapeCell(s.label)} | ${escapeCell(s.category) || '—'} | ${escapeCell(s.sidenavCategory) || '—'} | ${escapeCell(s.crossSellCategory) || '—'} | ${code(s.source)} |\n`
  }
  writeDoc('spokes.md', body)
}

// ─── shape-shifters.md ────────────────────────────────────────────────────────
{
  const allNodes: Array<NavNode & { surface: string }> = []
  const collect = (arr: NavNode[] | undefined, surface: string) => {
    for (const n of arr || []) allNodes.push({ surface, ...n })
  }
  collect(frame.sidebar?.firstSection, 'frame/firstSection')
  collect(frame.sidebar?.thirdSection, 'frame/thirdSection')
  collect(frame.topBar, 'frame/topBar')
  collect(frame.userMenu, 'frame/userMenu')
  collect(frame.appLauncher, 'frame/appLauncher')
  for (const s of suites.suites || []) collect(s.apps, `suites/${s.id}`)

  const byLogical: Record<string, Array<NavNode & { surface: string }>> = {}
  for (const n of allNodes) {
    if (!n.logicalId) continue
    byLogical[n.logicalId] ||= []
    byLogical[n.logicalId].push(n)
  }
  const groups = Object.entries(byLogical).filter(([, ns]) => ns.length > 1)

  let body = '# Shape-shifters\n\nNodes that share a `logicalId` — same logical feature, multiple placements gated by company state. These are the IA-decision targets.\n\n'
  if (!groups.length) {
    body += `_No shape-shifters detected._\n`
  } else {
    for (const [logicalId, nodes] of groups) {
      body += `## \`${logicalId}\`\n\n`
      body += '| Node | Surface | Path | Label | Switch condition | Source |\n|---|---|---|---|---|---|\n'
      for (const n of nodes) {
        const cond =
          (n.visibility?.conditions || [])
            .filter((c) =>
              /isStandalone|timePlatform|isPeo|isFastTrack|creationSource|isITTrial|isContractWaiting/.test(
                c,
              ),
            )
            .join(' AND ') || '—'
        body += `| \`${n.id}\` | ${n.surface} | ${code(n.path)} | ${escapeCell(n.label)} | ${escapeCell(cond)} | ${code(n.source)} |\n`
      }
      body += '\n'
    }
  }
  writeDoc('shape-shifters.md', body)
}

// ─── shell-frame.md ───────────────────────────────────────────────────────────
{
  let body = '# Shell frame\n\nThe surfaces that surround the product apps: sidebar header/footer, top bar, user menu, app launcher.\n\n'
  const sections: Array<[string, NavNode[] | undefined]> = [
    ['Sidebar — first section', frame.sidebar?.firstSection],
    ['Sidebar — third section', frame.sidebar?.thirdSection],
    ['Top bar', frame.topBar],
    ['User menu', frame.userMenu],
    ['App launcher', frame.appLauncher],
  ]
  for (const [title, nodes] of sections) {
    if (!nodes?.length) continue
    body += `## ${title} (${nodes.length})\n\n`
    body += TABLE_HEADER + '\n'
    for (const n of nodes) body += row(n) + '\n'
    body += '\n'
  }
  writeDoc('shell-frame.md', body)
}

// ─── suites/<id>.md (one per suite) ───────────────────────────────────────────
function fmtTouched(node: NavNode): string {
  if (!node._proposalNotes?.length) return ''
  const ops = [...new Set(node._proposalNotes.map((n) => n.op))]
  return ` *[touched: ${ops.join(', ')}]*`
}

for (const suite of suites.suites) {
  let body = `# ${suite.label}  \`${suite.id}\`${fmtTouched(suite as Suite)}\n\n`

  const v = suite.visibility
  body += `**Suite visibility:** ${fmtPersonas(v)}  \n`
  body += `**Product gate:** ${code(v?.productGate)}  \n`
  body += `**Cross-sell:** ${escapeCell(fmtCrossSell(v))}  \n`
  body += `**Source:** ${code(suite.source)}\n\n`

  if (!suite.apps?.length) {
    body += `_No apps in this suite._\n`
    writeDoc(`suites/${suite.id}.md`, body)
    continue
  }

  body += `## Apps (${suite.apps.length})\n\n`
  body += TABLE_HEADER + '\n'
  for (const a of suite.apps) {
    const r = row(a)
    // Inject [touched] badge into the label cell of changed nodes
    if (a._proposalNotes?.length) {
      const ops = [...new Set(a._proposalNotes.map((n) => n.op))]
      body += r.replace(`| ${escapeCell(a.label)} `, `| ${escapeCell(a.label)} *[${ops.join(', ')}]*`) + '\n'
    } else {
      body += r + '\n'
    }
  }
  body += '\n'

  body += `## App L3 internal navigation\n\n`
  for (const a of suite.apps) {
    const file = appL3.get(a.id)
    body += `### ${a.label}  \`${a.id}\`\n\n`
    if (!file) {
      body += `_No L3 file in catalog._\n\n`
      continue
    }
    if (!file.nav?.length) {
      body += `_No internal nav._`
      const u = file._meta?.uncertainties?.[0]
      if (u) body += ` ${typeof u === 'string' ? u : JSON.stringify(u)}`
      body += `\n\n`
      continue
    }
    body += `${file.nav.length} nodes · path \`${a.path ?? '—'}\` · gate \`${a.visibility?.productGate ?? '—'}\`\n\n`
    body += TABLE_HEADER + '\n'
    for (const n of file.nav) body += row(n) + '\n'
    body += '\n'
  }

  writeDoc(`suites/${suite.id}.md`, body)
}

// ─── uncertainties.md ─────────────────────────────────────────────────────────
{
  let body = '# Catalog uncertainties\n\nFlags raised by the generator agents about gaps in the catalog.\n\n'
  const allMeta: Array<[string, { uncertainties?: unknown[] } | undefined]> = [
    ['frame', frame._meta as { uncertainties?: unknown[] } | undefined],
    ['suites (L1/L2)', suites._meta as { uncertainties?: unknown[] } | undefined],
    ['personas', personas._meta as { uncertainties?: unknown[] } | undefined],
    ['plans', plans._meta as { uncertainties?: unknown[] } | undefined],
    ['spokes', spokes._meta as { uncertainties?: unknown[] } | undefined],
  ]
  let any = false
  for (const [name, m] of allMeta) {
    if (!m?.uncertainties?.length) continue
    any = true
    body += `## ${name}\n\n`
    for (const u of m.uncertainties) {
      body += `- ${typeof u === 'string' ? u : JSON.stringify(u)}\n`
    }
    body += '\n'
  }
  // L3 uncertainties from per-app files
  const appUncertainties: Array<[string, unknown[]]> = []
  for (const f of appL3.values()) {
    if (f._meta?.uncertainties?.length) {
      appUncertainties.push([f.appId, f._meta.uncertainties])
    }
  }
  if (appUncertainties.length) {
    any = true
    body += `## Per-app L3\n\n`
    for (const [appId, us] of appUncertainties) {
      body += `### ${appId}\n`
      for (const u of us) body += `- ${typeof u === 'string' ? u : JSON.stringify(u)}\n`
      body += '\n'
    }
  }
  if (!any) body += `_No uncertainties flagged._\n`
  writeDoc('uncertainties.md', body)
}

// ─── done ─────────────────────────────────────────────────────────────────────
const fileCount = (function count(d: string): number {
  let n = 0
  for (const e of readdirSync(d)) {
    const p = join(d, e)
    if (statSync(p).isDirectory()) n += count(p)
    else if (e.endsWith('.md')) n += 1
  }
  return n
})(outDir)
console.log(`Wrote ${fileCount} markdown files to ${outDir.replace(root + '/', '')}`)
