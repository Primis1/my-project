import { Home, Car, Key, Shield, ArrowRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react'

const stories = [
  {
    tag: 'Home + Auto Bundle',
    persona: 'Multi-Property Owner',
    icon: Home,
    issue: 'Fragmented Policies',
    issueDetail: 'Managing multiple carriers led to overlapping costs and coverage gaps.',
    metric: '18%',
    metricLabel: 'Avg. Saved',
    bundle: ['Home', 'Auto', 'Umbrella'],
    benefits: ['Eliminated redundant coverage', 'Multi-policy pricing', 'Annual reviews'],
    bottomLine: 'Less overlap. More intentional coverage.',
  },
  {
    tag: 'Auto + Motorcycle',
    persona: 'Multi-Vehicle Lifestyle',
    icon: Car,
    issue: 'Missed Discounts',
    issueDetail: 'Separate motorcycle and auto policies were missing bulk-rate eligibility.',
    metric: '22%',
    metricLabel: 'Avg. Saved',
    bundle: ['Auto', 'Motorcycle'],
    benefits: ['Aligned carrier strategy', 'Single point of contact', 'Seasonal adjustments'],
    bottomLine: 'Connected coverage. Consistent protection.',
  },
  {
    tag: 'Renters Insurance',
    persona: 'First-Time Renter',
    icon: Key,
    issue: 'Liability Risk',
    issueDetail: 'Tenant was relying on landlord insurance, leaving personal assets exposed.',
    metric: '$15',
    metricLabel: 'Per Month',
    bundle: ['Renters', 'Personal Liability'],
    benefits: ['Belongings protected', 'Right-sized policy', 'Low-friction management'],
    bottomLine: 'Your belongings. Your protection.',
  },
]

export function ClientSuccessStories() {
  return (
    <section id="success-stories" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Insurance Client Success Stories
          </h2>
          <p className="text-muted-foreground text-base">
            Real scenarios. Better outcomes. We find the right fit — then keep it right.
          </p>
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary border border-border rounded-3xl overflow-hidden">
          {stories.map((story, i) => {
            const Icon = story.icon
            return (
              <li key={i}>
                <article itemScope itemType="http://schema.org/Review" className="group bg-white h-full p-8 flex flex-col gap-6 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 itemProp="name" className="text-sm font-bold text-foreground">{story.tag}</h3>
                      <p itemProp="author" className="text-xs text-muted-foreground">{story.persona}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    Case 0{i + 1}
                  </span>
                </div>

                <div itemProp="reviewBody" className="rounded-xl border border-destructive/20 bg-destructive/10 p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-destructive">
                      The Issue
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground leading-snug mb-1">
                    {story.issue}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{story.issueDetail}</p>
                </div>

                <div className="py-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground tracking-tight tabular-nums">
                      {story.metric}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">{story.metricLabel}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {story.bundle.map((item, j) => (
                      <span
                        key={j}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary/70 border border-primary/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2 pt-4 border-t border-border">
                  {story.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

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
              Better pricing upfront — and coverage that stays right over time.
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Independent advice. No proprietary plans. Always working for you.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="#quote"
              className="bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get a Free Quote
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
