#!/usr/bin/env node
// One-shot migration: Lucide-style icon names → Phosphor names.
// Walks data/current/**/*.json and rewrites every `icon` field.

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// Lucide → Phosphor. Names that already match in both libraries are omitted.
// Anything not listed here passes through unchanged; falls back to Square at
// render time if Phosphor doesn't recognize it.
const MAP: Record<string, string> = {
  // Differing top-level names
  Home: 'House',
  Settings: 'Gear',
  Settings2: 'Gear',
  LayoutDashboard: 'SquaresFour',
  LayoutGrid: 'SquaresFour',
  LayoutTemplate: 'SquaresFour',
  Grid: 'SquaresFour',
  Grid3x3: 'SquaresFour',
  Component: 'SquaresFour',
  Boxes: 'Stack',
  Layers: 'Stack',
  Menu: 'List',
  Search: 'MagnifyingGlass',
  ScanSearch: 'MagnifyingGlass',

  // Charts / metrics
  BarChart: 'ChartBar',
  BarChart3: 'ChartBar',
  LineChart: 'ChartLineUp',
  FileBarChart: 'FileText',
  ChartNetwork: 'TreeStructure',
  TrendingUp: 'TrendUp',
  Activity: 'Pulse',

  // Money / commerce
  DollarSign: 'CurrencyDollar',
  Banknote: 'Money',
  Store: 'Storefront',

  // People variants
  Users2: 'UsersThree',
  UsersRound: 'UsersThree',
  UserCog: 'UserGear',
  CircleUser: 'UserCircle',
  UserSearch: 'UserList',
  CircleHelp: 'Question',
  HelpCircle: 'Question',
  ShieldUser: 'ShieldCheck',

  // Files / docs
  FileEdit: 'NotePencil',
  FilePen: 'NotePencil',
  FileSignature: 'Stamp',
  FileSpreadsheet: 'Table',
  FileBadge: 'FileText',
  FileType: 'FileText',
  ScrollText: 'Scroll',
  ClipboardCheck: 'ClipboardText',
  ClipboardList: 'ClipboardText',
  Library: 'Books',
  BookTemplate: 'BookOpen',
  BookMarked: 'BookmarkSimple',

  // Status / alerts
  AlertCircle: 'WarningCircle',
  AlertTriangle: 'Warning',
  ShieldAlert: 'ShieldWarning',
  CheckCircle2: 'CheckCircle',
  CircleCheck: 'CheckCircle',
  CheckCheck: 'Checks',
  BadgeCheck: 'SealCheck',

  // Calendar / time
  CalendarOff: 'CalendarX',
  CalendarClock: 'CalendarCheck',
  ClockAlert: 'ClockCountdown',
  History: 'ClockCounterClockwise',

  // Tree / network
  Network: 'TreeStructure',
  FolderTree: 'TreeStructure',
  PalmTree: 'TreePalm',
  Route: 'Path',

  // Buildings / org
  Building: 'Buildings',
  Building2: 'Buildings',
  Landmark: 'Bank',

  // Communication
  Mail: 'Envelope',
  MessageCircle: 'ChatCircle',
  MessageSquare: 'ChatCircle',
  MessagesSquare: 'ChatsCircle',
  Send: 'PaperPlaneRight',

  // Devices / hardware
  Tablet: 'DeviceTablet',
  Smartphone: 'DeviceMobile',
  Laptop2: 'Laptop',
  ServerCog: 'Database',

  // Workflow / connectivity
  Workflow: 'FlowArrow',
  Plug: 'Plug',
  Plugs: 'Plugs',
  PlugZap: 'Lightning',
  Unplug: 'Plugs',
  RefreshCw: 'ArrowsClockwise',
  ArrowLeftRight: 'ArrowsLeftRight',
  ArrowDownToLine: 'ArrowLineDown',
  Share2: 'ShareNetwork',
  Link2: 'LinkSimple',
  Code2: 'CodeBlock',

  // Misc
  Plane: 'Airplane',
  Sparkles: 'Sparkle',
  Zap: 'Lightning',
  KeyRound: 'Key',
  Tags: 'Tag',
  Scale: 'Scales',
  HeartPulse: 'Heartbeat',
  ShieldHeart: 'Shield',
  HeartHandshake: 'Handshake',
  StarOff: 'StarHalf',
  Award: 'Trophy',
  Video: 'VideoCamera',
  PackagePlus: 'Package',
  Inbox: 'Tray',
  ShieldQuestion: 'Shield',
  Vote: 'Vote',
  ToggleRight: 'ToggleRight',
  HardHat: 'HardHats',
  ListFilter: 'FunnelSimple',
  ListTodo: 'ListChecks',
  FormInput: 'TextT',
  MoreHorizontal: 'DotsThree',
  LogOut: 'SignOut',
  Puzzle: 'PuzzlePiece',
  Languages: 'Translate',
  FlaskConical: 'TestTube',
  LifeBuoy: 'Lifebuoy',
  Accessibility: 'Accessibility',
}

let replaced = 0
let total = 0

function migrate(obj: unknown): unknown {
  if (!obj || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(migrate)
  const result: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (k === 'icon' && typeof v === 'string') {
      total += 1
      const mapped = MAP[v]
      if (mapped && mapped !== v) {
        result[k] = mapped
        replaced += 1
        continue
      }
      result[k] = v
      continue
    }
    result[k] = migrate(v)
  }
  return result
}

function walk(dir: string) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) {
      walk(p)
      continue
    }
    if (!entry.endsWith('.json')) continue
    const before = readFileSync(p, 'utf8')
    const data = JSON.parse(before)
    const migrated = migrate(data)
    const after = JSON.stringify(migrated, null, 2) + '\n'
    if (after !== before) writeFileSync(p, after)
  }
}

walk(join(root, 'data/current'))

console.log(`Migrated ${replaced} of ${total} icon references in data/current/.`)
console.log(`(Names not in the map were left unchanged — they'll fall back to Square if Phosphor doesn't recognize them.)`)
