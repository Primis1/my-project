import {
  Users,
  Building2,
  ShieldCheck,
  Headphones,
  Clock,
} from 'lucide-react'

const stats = [
  { icon: Users, value: '20+', label: 'Carrier Partners' },
  { icon: Building2, value: '3', label: 'Specialized Divisions' },
  { icon: ShieldCheck, value: '98%', label: 'Client Retention' },
  { icon: Headphones, value: '24/7', label: 'Claims Support' },
  { icon: Clock, value: '15 min', label: 'Quote Turnaround' },
]

export function StatsBar() {
  return (
    <section id="stats" aria-label="Agency statistics" className="py-12 bg-muted/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-0 lg:divide-x divide-border">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <li key={stat.label} className="flex items-center gap-4 lg:justify-center lg:px-6">
                <div className="w-11 h-11 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
