import { Home, Car, Building2, Ship, Gem, Shield } from 'lucide-react'
import type { LucideProps } from 'lucide-react'

const iconMap: Record<string, React.FC<LucideProps>> = {
  Home,
  Car,
  Building2,
  Ship,
  Gem,
  Shield,
}

export function resolveIcon(name: string): React.FC<LucideProps> {
  return iconMap[name] ?? Shield
}
