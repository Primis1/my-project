import {
  Users,
  Briefcase,
  Sunset,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Wallet,
  Shield,
  HeartPulse,
  Stethoscope,
} from 'lucide-react'

/**
 * Product icon lookup for coverage pills.
 */
const productIcons: Record<string, React.FC<{ className?: string }>> = {
  'Income Replacement': Wallet,
  'Term Life': Shield,
  'Whole Life': HeartPulse,
  'Health Plan': Stethoscope,
}

const stories = [
  {
    tag: 'Young Family',
    persona: 'Dual-Income Household, 2 Children',
    icon: Users,
    issue: 'No Income Protection',
    issueDetail:
      'Both parents relied solely on employer group benefits. A job change left a 6-month gap with zero disability or life coverage during a critical period.',
    metric: '$1.2M',
    metricLabel: 'Coverage Placed',
    products: ['Term Life', 'Income Replacement'],
    benefits: [
      '20-year term sized to replace primary earner income',
      'Individual disability policy with own-occupation definition',
      'Coverage portable — no longer tied to employer',
    ],
    bottomLine: 'Family protected. Income secured.',
  },
  {
    tag: 'Business Owner',
    persona: 'Self-Employed Contractor, Age 42',
    icon: Briefcase,
    issue: 'No Personal Safety Net',
    issueDetail:
      "As a sole proprietor, all business revenue depended on the owner's ability to work. An injury would have meant zero income and mounting overhead.",
    metric: '3',
    metricLabel: 'Products Placed',
    products: ['Income Replacement', 'Term Life', 'Health Plan'],
    benefits: [
      'Income replacement covering 60% of earnings to age 65',
      'Sickness rider added for illness-related disability',
      'Individual health plan replacing expired group coverage',
    ],
    bottomLine: 'Business continuity. Personal security.',
  },
  {
    tag: 'Pre-Retiree',
    persona: 'Corporate Executive, Age 57',
    icon: Sunset,
    issue: 'Outdated Whole Life Policy',
    issueDetail:
      'A policy purchased 25 years ago was significantly under-funded with declining dividends. The cash value strategy had never been reviewed or optimized.',
    metric: '$340K',
    metricLabel: 'Cash Value Optimized',
    products: ['Whole Life'],
    benefits: [
      'Policy audit revealed under-performing dividend allocations',
      'Cash value repositioned for tax-efficient retirement income',
      'Estate transfer strategy integrated with existing will',
    ],
    bottomLine: 'Legacy secured. Retirement strengthened.',
  },
]

export function ClientSuccessStories() {
  return (
    <section id="life-success-stories" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Client Stories
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Real Families. Real Protection.
          </h2>
          <p className="text-muted-foreground text-base">
            Different life stages. Different needs. Thoughtful solutions every time.
          </p>
        </div>

        {/* ─── Story cards ─── */}
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-3xl overflow-hidden">
          {stories.map((story, i) => {
            const Icon = story.icon
            return (
              <li key={i}>
                <article
                  itemScope
                  itemType="http://schema.org/Review"
                  className="group bg-white h-full p-8 flex flex-col gap-6 hover:bg-muted/5 transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 itemProp="name" className="text-sm font-bold text-foreground">
                          {story.tag}
                        </h3>
                        <p itemProp="author" className="text-xs text-muted-foreground">
                          {story.persona}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                      Case 0{i + 1}
                    </span>
                  </div>

                  {/* Issue */}
                  <div
                    itemProp="reviewBody"
                    className="rounded-xl border border-destructive/20 bg-destructive/10 p-4"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                      <span className="text-[10px] font-bold tracking-widest uppercase text-destructive">
                        The Issue
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground leading-snug mb-1">
                      {story.issue}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {story.issueDetail}
                    </p>
                  </div>

                  {/* Metric & product pills */}
                  <div className="py-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-foreground tracking-tight tabular-nums">
                        {story.metric}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {story.metricLabel}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {story.products.map((prod) => {
                        const ProdIcon = productIcons[prod]
                        return (
                          <span
                            key={prod}
                            className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary/70 border border-primary/20"
                          >
                            {ProdIcon && <ProdIcon className="w-3 h-3" />}
                            {prod}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  {/* Benefits */}
                  <ul className="space-y-2 pt-4 border-t border-border">
                    {story.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom line */}
                  <p className="mt-auto pt-4 text-sm font-semibold text-primary inline-flex items-center gap-2">
                    {story.bottomLine}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </p>
                </article>
              </li>
            )
          })}
        </ul>

        {/* Bottom CTA */}
        <div className="mt-12 bg-white border border-border rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
          <div>
            <p className="text-base font-semibold text-foreground">
              Every family and business has a unique protection need.
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Let us build a plan that reflects your life — not a generic template.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="#quote"
              className="bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Start Your Assessment
            </a>
            <a
              href="#consult"
              className="border border-border text-foreground font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-muted transition-colors"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
