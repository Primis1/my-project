import {
  Car,
  Home,
  Shield,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'

const stories = [
  {
    tag: 'Young Family',
    persona: 'Couple with 2 kids, first home',
    icon: Home,
    issue: 'Bundling Gap',
    issueDetail:
      'Their auto and home policies were with different carriers, missing a multi-policy discount. Deductibles were misaligned and the umbrella had a coverage gap.',
    metric: '$1,100',
    metricLabel: 'Saved Annually',
    benefits: [
      'Consolidated auto + home with one carrier',
      'Added umbrella for full liability protection',
      'Matched deductibles across all policies',
    ],
    bottomLine: 'Full protection. Real savings.',
  },
  {
    tag: 'New Driver',
    persona: '19-year-old college student',
    icon: Car,
    issue: 'Rate Shock',
    issueDetail:
      'Parents were quoted $4,200/yr to add their teen to the existing policy. They assumed there were no alternatives and nearly accepted.',
    metric: '38%',
    metricLabel: 'Premium Reduction',
    benefits: [
      'Shopped 6 carriers for young-driver rates',
      'Applied good-student and defensive-driving discounts',
      'Structured a higher deductible to offset risk pricing',
    ],
    bottomLine: 'Affordable coverage. No corners cut.',
  },
  {
    tag: 'Homeowner',
    persona: 'Long-time policyholder, 15+ years',
    icon: Shield,
    issue: 'Loyalty Penalty',
    issueDetail:
      'Had been with the same carrier for 15 years with annual rate increases. Never shopped. Coverage limits hadn\'t been reviewed since purchase.',
    metric: '$2,400',
    metricLabel: 'Annual Savings',
    benefits: [
      'Moved to a carrier with better rate stability',
      'Updated dwelling coverage to current replacement cost',
      'Added water backup and identity theft endorsements',
    ],
    bottomLine: 'Better coverage. Lower premium.',
  },
]

export function ClientSuccessStories() {
  return (
    <section id="success-stories" className="py-20 lg:py-28 bg-muted/30" aria-label="Client success stories">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Client Success Stories
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Real Clients. Real Results.
          </h2>
          <p className="text-muted-foreground text-base">
            Every policy review uncovers something. Here are a few examples of what we&apos;ve found.
          </p>
        </div>

        {/* ─── Story cards ─── */}
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-3xl overflow-hidden">
          {stories.map((story, i) => {
            const Icon = story.icon
            return (
              <li key={i}>
                <article itemScope itemType="http://schema.org/Review" className="group bg-white h-full p-8 flex flex-col gap-6 hover:bg-muted/5 transition-colors">
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

                {/* Issue card */}
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

                {/* Metric */}
                <div className="py-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground tracking-tight tabular-nums">
                      {story.metric}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {story.metricLabel}
                    </span>
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
      </div>
    </section>
  )
}
