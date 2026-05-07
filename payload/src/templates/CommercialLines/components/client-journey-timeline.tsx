'use client'

import {
  Search,
  ShieldCheck,
  ClipboardCheck,
  BarChart3,
  RefreshCcw,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

const milestones = [
  {
    month: 'Month 1',
    icon: Search,
    title: 'Initial Risk Audit & Exposure Analysis',
    description:
      'We conduct a comprehensive walkthrough of your operations, contracts, premises, and existing coverage to identify gaps, overlaps, and under-insured exposures.',
    deliverables: ['Risk exposure report', 'Coverage gap analysis', 'Priority action items'],
  },
  {
    month: 'Month 1–2',
    icon: ShieldCheck,
    title: 'Market Placement & Binding',
    description:
      'We take your risk profile to market — shopping 20+ carriers to find the right combination of coverage, limits, and pricing. You get options, not a single take-it-or-leave-it quote.',
    deliverables: ['Competitive carrier comparison', 'Tailored program design', 'Policy binding'],
  },
  {
    month: 'Quarter 1',
    icon: ClipboardCheck,
    title: 'Safety Review & Loss Control',
    description:
      'We review your loss runs, workplace safety protocols, and fleet operations. Then we recommend specific loss-control measures to reduce incident frequency before they become claims.',
    deliverables: ['Loss run analysis', 'Safety recommendations', 'Driver training guidance'],
  },
  {
    month: 'Quarter 2',
    icon: BarChart3,
    title: 'Claims Analysis & Trend Review',
    description:
      'We analyze your claims activity, track trends, and identify systemic issues. If a claim is open, we advocate directly with the carrier — we don\'t hand you a 1-800 number.',
    deliverables: ['Claims trend report', 'Open claims advocacy', 'Cost-reduction strategies'],
  },
  {
    month: 'Quarter 3',
    icon: RefreshCcw,
    title: 'Pre-Renewal Strategy & Better Quote',
    description:
      'Before your renewal hits, we reassess your operations, update valuations, and approach the market with a clean loss narrative. The goal: better terms, better pricing, or both.',
    deliverables: ['Updated exposure summary', 'Market re-submission', 'Renewal options with savings'],
  },
]

export function ClientJourneyTimeline() {
  return (
    <section id="client-journey" className="py-20 lg:py-28 bg-muted/20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Your First Year With Us
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            We Don&apos;t Disappear After Binding
          </h2>
          <p className="text-lg text-muted-foreground">
            Most brokers quote you once a year and vanish. Here&apos;s what the
            first 12 months look like when you work with a team that actually
            manages your risk.
          </p>
        </div>

        {/* Timeline */}
        <ol className="relative space-y-0">
          {milestones.map((milestone, i) => {
            const Icon = milestone.icon
            const isLast = i === milestones.length - 1
            return (
              <li key={milestone.title} className="relative flex gap-6 pb-12 last:pb-0">
                {/* Vertical connector line */}
                {!isLast && (
                  <div className="absolute left-[27px] top-14 bottom-0 w-px bg-gradient-to-b from-primary/30 to-primary/10" />
                )}

                {/* Step indicator */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-colors ${
                      isLast
                        ? 'bg-primary border-primary'
                        : 'bg-white border-primary/20 hover:border-primary/40'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isLast ? 'text-primary-foreground' : 'text-primary'}`} />
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 bg-white border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/10 transition-all duration-300">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-widest">
                      {milestone.month}
                    </span>
                    <h3 className="text-lg font-bold text-foreground">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {milestone.description}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {milestone.deliverables.map((d) => (
                      <li
                        key={d}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground bg-muted/50 px-3 py-1.5 rounded-full"
                      >
                        <CheckCircle2 className="w-3 h-3 text-success" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>

        {/* Bottom callout */}
        <div className="mt-12 bg-primary text-primary-foreground rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">
              The Result? A Better Renewal — Every Year.
            </h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Clients who go through this process consistently see lower
              premiums, better coverage terms, and fewer claims at renewal.
              That&apos;s the power of proactive risk management.
            </p>
          </div>
          <a
            href="#hero"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity flex-shrink-0"
          >
            Start Your Risk Audit
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
