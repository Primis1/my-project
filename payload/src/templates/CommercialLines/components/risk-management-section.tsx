'use client'

import {
  ShieldCheck,
  ClipboardCheck,
  AlertTriangle,
  HeartHandshake,
  ArrowRight,
  TrendingDown,
  CalendarClock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const pillars = [
  {
    step: 1,
    icon: ClipboardCheck,
    title: 'Proactive Risk Assessment',
    description:
      'We evaluate your operations, premises, and contracts to identify exposures before they become claims — then recommend targeted loss-control measures.',
  },
  {
    step: 2,
    icon: AlertTriangle,
    title: 'Loss Control & Safety Programs',
    description:
      'From workplace safety audits to fleet driver training recommendations, we help you implement programs that reduce incident frequency and severity.',
  },
  {
    step: 3,
    icon: HeartHandshake,
    title: 'Claims Advocacy & Assistance',
    description:
      'When a claim occurs, we don\'t hand you a 1-800 number. We actively manage the process — documenting losses, liaising with adjusters, and advocating for a fair settlement.',
  },
  {
    step: 4,
    icon: CalendarClock,
    title: 'Quarterly Advisory Reviews',
    description:
      'Unlike annual-only brokers, we meet quarterly to assess operational changes, payroll shifts, new contracts, and asset updates — keeping limits adequate year-round.',
  },
]

const stats = [
  { value: '4×', label: 'yearly touchpoints vs. industry standard 1×' },
  { value: '31%', label: 'average reduction in claims frequency' },
  { value: '100%', label: 'of reviews included at no additional cost' },
]

export function RiskManagementSection() {
  return (
    <section id="risk-management" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Beyond Placement
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Risk Management &amp; Continuous Advisory
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Placing the policy is only the beginning. We embed ourselves in your risk
              management strategy — identifying exposures, controlling losses, assisting
              with claims, and reviewing your program every quarter.
            </p>

            {/* Stats */}
            <ul className="grid sm:grid-cols-3 gap-6 mb-8">
              {stats.map((stat) => (
                <li key={stat.label} className="text-center sm:text-left">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground leading-snug">{stat.label}</div>
                </li>
              ))}
            </ul>

            <Button size="lg" className="bg-primary hover:opacity-90 text-primary-foreground rounded-full px-8">
              Schedule a Risk Review
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Right — pillars */}
          <div className="relative">
            <header className="sr-only">
              <h3>Our Risk Management Process</h3>
            </header>

            <ol aria-label="Risk management advisory pillars" className="space-y-6">
              {pillars.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <li key={pillar.step} className="relative flex gap-5">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-14 h-14 bg-primary/5 border-2 border-primary/20 rounded-xl flex items-center justify-center z-10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-muted/30 rounded-xl p-5 hover:bg-primary/5 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                          Pillar {pillar.step}
                        </span>
                        <h3 className="font-semibold text-foreground">{pillar.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>

            {/* Result callout */}
            <div className="mt-8 z-50 bg-emerald-50 border border-emerald-300 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 mb-1">The Result?</h4>
                <p className="text-sm text-emerald-600">
                  Lower claims frequency, better loss ratios, and more leverage at renewal.
                  Our clients consistently see year-over-year premium stabilisation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
