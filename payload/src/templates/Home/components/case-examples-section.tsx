import {
  Shield,
  Building2,
  Heart,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'

/**
 * Real-world case examples — no names, no stars, just scenarios
 * with a problem → solution → result structure.
 */
const cases = [
  {
    division: 'Personal Lines',
    divisionIcon: Shield,
    scenario: 'Family With Fragmented Policies',
    problem:
      'A growing family had auto, home, and umbrella policies scattered across 3 different carriers — with overlapping coverage on some areas and dangerous gaps on others.',
    solution:
      'We consolidated everything under one carrier, eliminating redundancies and adding proper umbrella limits.',
    result: '18% annual savings',
    resultDetail: 'with better coverage than before',
  },
  {
    division: 'Commercial Lines',
    divisionIcon: Building2,
    scenario: 'Contractor With Bonding Gaps',
    problem:
      'A mid-size GC was consistently flagged on audits for certificate-of-insurance gaps with sub-contractors, risking project shutdowns and lost bids.',
    solution:
      'We implemented a certificate tracking program, established surety capacity, and consolidated the fleet from 3 carriers to 1.',
    result: '4 lines consolidated',
    resultDetail: 'audit-ready within 60 days',
  },
  {
    division: 'Life & Income',
    divisionIcon: Heart,
    scenario: 'Business Owner Without Income Protection',
    problem:
      'A sole proprietor had life insurance but zero income replacement coverage. A single injury could have ended their ability to earn — with no safety net.',
    solution:
      'We placed a disability income policy with a sickness rider, plus restructured the existing life policy to include a critical illness benefit.',
    result: '70% income protected',
    resultDetail: 'for both injury and illness',
  },
]

export function CaseExamplesSection() {
  return (
    <section id="case-examples" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Real Scenarios, Better Outcomes
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            How We&apos;ve Helped Clients Like You
          </h2>
          <p className="text-lg text-muted-foreground">
            Every situation is different. Here are a few examples of how we&apos;ve
            turned coverage gaps into complete protection.
          </p>
        </div>

        {/* Case cards */}
        <ul className="grid lg:grid-cols-3 gap-8">
          {cases.map((item) => {
            const DivIcon = item.divisionIcon
            return (
              <li
                key={item.scenario}
                className="group bg-muted/20 border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                {/* Division header */}
                <div className="px-8 pt-8 pb-4 flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                    <DivIcon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
                      {item.division}
                    </p>
                    <h3 className="text-base font-bold text-foreground">
                      {item.scenario}
                    </h3>
                  </div>
                </div>

                {/* Problem */}
                <div className="mx-8 rounded-xl border border-destructive/15 bg-destructive/5 p-4 mb-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-destructive">
                      The Problem
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="mx-8 rounded-xl border border-success/15 bg-success/5 p-4 mb-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-success">
                      Our Solution
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.solution}
                  </p>
                </div>

                {/* Result */}
                <div className="mt-auto px-8 pb-8 pt-4 border-t border-border">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary tracking-tight">
                      {item.result}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.resultDetail}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Have a similar situation? Let&apos;s talk
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
