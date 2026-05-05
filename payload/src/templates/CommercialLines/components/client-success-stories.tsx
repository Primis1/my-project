import {
  HardHat,
  Store,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Shield,
  Truck,
  Building2,
  FileCheck,
} from 'lucide-react'

/**
 * Coverage icon lookup — keeps story data declarative.
 */
const coverageIcons: Record<string, React.FC<{ className?: string }>> = {
  GL: Shield,
  CA: Truck,
  Property: Building2,
  Surety: FileCheck,
}

/**
 * Stories emphasise that commercial clients may need very different
 * combinations of coverages — unlike PL where bundles overlap cleanly.
 */
const stories = [
  {
    tag: 'General Contractor',
    persona: 'Mid-Size Construction Firm',
    icon: HardHat,
    issue: 'Sub-contractor Certificate Gaps',
    issueDetail:
      'The GC was frequently flagged on audits for certificate-of-insurance gaps with sub-contractors, risking project shutdowns.',
    metric: '4',
    metricLabel: 'Lines Placed',
    coverages: ['GL', 'CA', 'Property', 'Surety'],
    benefits: [
      'Certificate tracking program implemented',
      'Surety capacity established for larger bids',
      'Fleet program consolidated from 3 carriers to 1',
    ],
    bottomLine: 'Audit-ready. Bonded. Consolidated.',
  },
  {
    tag: 'Retail Chain',
    persona: '12-Location Specialty Retailer',
    icon: Store,
    issue: 'Underinsured Inventory',
    issueDetail:
      'Rapid expansion left inventory values outdated. A single fire could have wiped out months of stock with only partial recovery.',
    metric: '38%',
    metricLabel: 'Coverage Increase',
    coverages: ['Property', 'GL'],
    benefits: [
      'Quarterly inventory valuations built into reviews',
      'Business interruption endorsement added',
      'Slip-and-fall loss-control program reduced GL claims',
    ],
    bottomLine: 'Properly valued. Fully protected.',
  },
  {
    tag: 'Professional Services',
    persona: 'Regional Consulting Firm',
    icon: Briefcase,
    issue: 'No Cyber or Umbrella Layer',
    issueDetail:
      'The firm handled sensitive client data but had zero cyber coverage. A single breach could have exceeded their GL limits.',
    metric: '$2M',
    metricLabel: 'Umbrella Limit Added',
    coverages: ['GL', 'CA'],
    benefits: [
      'Cyber liability endorsement placed',
      'Commercial umbrella extended over GL & CA',
      'Quarterly phishing-simulation program launched',
    ],
    bottomLine: 'Data secured. Limits elevated.',
  },
]

export function ClientSuccessStories() {
  return (
    <section id="commercial-success-stories" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Client Case Studies
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Commercial Client Success Stories
          </h2>
          <p className="text-muted-foreground text-base">
            Different industries. Different exposures. Tailored solutions every time.
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
                  className="group bg-white h-full p-8 flex flex-col gap-6 hover:bg-muted/3 transition-colors"
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

                  {/* Metric & coverage pills */}
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
                      {story.coverages.map((cov) => {
                        const CovIcon = coverageIcons[cov]
                        return (
                          <span
                            key={cov}
                            className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary/70 border border-primary/20"
                          >
                            {CovIcon && <CovIcon className="w-3 h-3" />}
                            {cov}
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
              Every business has a unique risk fingerprint.
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Let us build a coverage strategy that matches yours — not a one-size-fits-all template.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="#quote"
              className="bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Request a Risk Assessment
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
