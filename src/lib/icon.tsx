import * as Phosphor from '@phosphor-icons/react'
import type { Icon as PhosphorIcon, IconProps } from '@phosphor-icons/react'

// Catalog icon strings were originally written as best-effort Lucide names.
// Map common Lucide → Phosphor equivalents so we don't have to rename the catalog
// in one go. Anything unmapped falls back to <Square />.
const ALIASES: Record<string, string> = {
  // Common Lucide names that differ from Phosphor
  Home: 'House',
  Settings: 'Gear',
  Settings2: 'Gear',
  LayoutDashboard: 'SquaresFour',
  Plane: 'Airplane',
  BookUser: 'AddressBook',
  UserCog: 'UserGear',
  Users2: 'UsersThree',
  UsersRound: 'UsersThree',
  Network: 'Tree',
  CircleCheck: 'CheckCircle',
  CalendarOff: 'CalendarX',
  HeartHandshake: 'Handshake',
  PlayCircle: 'PlayCircle',
  ChartBar: 'ChartBar',
  GitBranch: 'GitBranch',
  ListChecks: 'ListChecks',
  AlertTriangle: 'Warning',
  Activity: 'Pulse',
  Workflow: 'FlowArrow',
  Database: 'Database',
}

export interface RipplingIconProps extends Omit<IconProps, 'ref' | 'name'> {
  /** Icon name from the catalog. Phosphor names take priority; Lucide-style names fall back via aliases. */
  name?: string | null
}

export function Icon({ name, weight = 'regular', size = 18, ...rest }: RipplingIconProps) {
  if (!name) return <Phosphor.Square weight={weight} size={size} {...rest} />
  const resolved = ALIASES[name] ?? name
  const candidate = (Phosphor as unknown as Record<string, PhosphorIcon | undefined>)[resolved]
  const Cmp = (candidate ?? Phosphor.Square) as PhosphorIcon
  return <Cmp weight={weight} size={size} {...rest} />
}
