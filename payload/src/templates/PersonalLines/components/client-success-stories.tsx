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
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Client Success Stories
          </h2>
          <p className="text-slate-600 text-base">
            Real scenarios. Better outcomes. We find the right fit — then keep it right.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary border border-slate-200 rounded-3xl overflow-hidden">
          {stories.map((story, i) => {
            const Icon = story.icon
            return (
              <article
                key={i}
                className="group bg-white p-8 flex flex-col gap-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{story.tag}</p>
                      <p className="text-xs text-muted-foreground">{story.persona}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Case 0{i + 1}
                  </span>
                </div>

                <div className="rounded-xl border border-red-100 bg-red-50/50 p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-red-600">
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

                <ul className="space-y-2 pt-4 border-t border-slate-100">
                  {story.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-slate-700">
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
            )
          })}
        </div>

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
