'use client'

import {
  AlertTriangle,
  DollarSign,
  Clock,
  ShieldOff,
  BadgeDollarSign,
  Handshake,
  ArrowRight,
} from 'lucide-react'

/**
 * "What can go wrong" scenarios — designed to make the prospect feel the
 * pain of being uninsured or underinsured, then pivot to how we solve it.
 */
const scenarios = [
  {
    icon: AlertTriangle,
    title: 'A Lawsuit Without Adequate GL',
    impact: '$250K+',
    impactLabel: 'average defense cost',
    description:
      'A customer slips at your premises. Without sufficient GL limits, you\'re paying attorneys and settlements out of pocket — potentially bankrupting an otherwise healthy business.',
  },
  {
    icon: ShieldOff,
    title: 'A Fire With Outdated Property Coverage',
    impact: '40%',
    impactLabel: 'of businesses never reopen',
    description:
      'Your inventory has grown since you last updated your policy. A single fire can destroy stock worth twice what your carrier will pay — leaving you massively underinsured.',
  },
  {
    icon: Clock,
    title: 'Fleet Accident Without Commercial Auto',
    impact: '3–6 mo',
    impactLabel: 'typical claims resolution',
    description:
      'An employee in a company vehicle causes a multi-car accident. Personal auto won\'t cover commercial use. You\'re liable for bodily injury, property damage, and legal defense.',
  },
]

const advantages = [
  {
    icon: DollarSign,
    title: 'Save Money on Premiums',
    description:
      'We shop 20+ carriers to find competitive rates — then use quarterly reviews to identify credits, discounts, and coverage adjustments that keep your costs down year over year.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Save Money on Claims',
    description:
      'Our loss-control programs and safety recommendations reduce the frequency and severity of claims. Fewer claims means better loss ratios — which means lower premiums at renewal.',
  },
  {
    icon: Handshake,
    title: 'Convenience & Peace of Mind',
    description:
      'One team manages all your commercial policies. One phone call for claims. Quarterly check-ins so nothing falls through the cracks. We handle the complexity — you run your business.',
  },
]

export function WhyInsuranceMattersSection() {
  return (
    <section id="why-it-matters" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-destructive uppercase tracking-wider mb-3">
            The Cost of Getting It Wrong
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            What Happens When You&apos;re Underinsured?
          </h2>
          <p className="text-lg text-muted-foreground">
            Insurance isn&apos;t an expense — it&apos;s the difference between a
            setback and a shutdown. Here&apos;s what businesses face without
            proper coverage.
          </p>
        </div>

        {/* Scenario cards — "what can go wrong" */}
        <ul className="grid md:grid-cols-3 gap-8 mb-20">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon
            return (
              <li
                key={scenario.title}
                className="relative bg-destructive/5 border border-destructive/15 rounded-2xl p-8 group hover:shadow-lg hover:border-destructive/25 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {scenario.title}
                </h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-destructive tabular-nums">
                    {scenario.impact}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {scenario.impactLabel}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {scenario.description}
                </p>
              </li>
            )
          })}
        </ul>

        {/* Divider with pivot statement */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-success/10 border border-success/20 rounded-full">
            <span className="text-sm font-semibold text-success">
              But it doesn&apos;t have to be this way.
            </span>
            <ArrowRight className="w-4 h-4 text-success" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-8 mb-4">
            How We Save You Money — And Hassle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The right coverage program isn&apos;t just about avoiding
            catastrophe — it&apos;s about saving money every year and making
            insurance something you never have to worry about.
          </p>
        </div>

        {/* Advantages — savings & convenience */}
        <ul className="grid md:grid-cols-3 gap-8">
          {advantages.map((advantage) => {
            const Icon = advantage.icon
            return (
              <li
                key={advantage.title}
                className="bg-success/5 border border-success/15 rounded-2xl p-8 group hover:shadow-lg hover:border-success/25 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {advantage.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
