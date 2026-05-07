'use client'

import {
  Tractor,
  Store,
  HardHat,
  Truck,
  Shield,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const industries = [
  {
    icon: HardHat,
    title: 'Construction',
    subtitle: 'Contractors, GCs & Trades',
    description:
      'From general contractors to specialty trades — we handle GL, Surety Bonds, builders risk, and fleet coverage specific to jobsite exposures.',
    risks: [
      'Subcontractor certificate gaps',
      'Bonding capacity limitations',
      'Jobsite injury liability',
    ],
    coverages: ['GL', 'Surety', 'Commercial Auto', 'Builders Risk'],
  },
  {
    icon: Store,
    title: 'Retail',
    subtitle: 'Products, Property & Liability',
    description:
      'Protect your inventory, storefronts, and customers. We tailor property valuations and products liability to match your actual exposure — not industry averages.',
    risks: [
      'Underinsured inventory',
      'Slip-and-fall claims',
      'Product liability gaps',
    ],
    coverages: ['Property', 'GL', 'Products Liability', 'Business Income'],
  },
  {
    icon: Truck,
    title: 'Commercial Vehicles',
    subtitle: 'Fleets & Owner-Operators',
    description:
      'Whether you operate a single work truck or a 50-vehicle fleet, we consolidate carriers, manage DOT compliance gaps, and secure competitive fleet-rated programs.',
    risks: [
      'Fragmented multi-carrier policies',
      'Uninsured hired & non-owned auto',
      'Cargo & trailer exposure',
    ],
    coverages: ['Commercial Auto', 'Cargo', 'Umbrella', 'Hired & Non-Owned'],
  },
  {
    icon: Tractor,
    title: 'Agriculture',
    subtitle: 'Farms, Equipment & Agribusiness',
    description:
      'Seasonal operations, heavy equipment, and weather-dependent inventory create unique risk profiles. We build programs that flex with your crop cycle.',
    risks: [
      'Equipment breakdown during harvest',
      'Seasonal revenue volatility',
      'Environmental liability',
    ],
    coverages: ['Farm Property', 'Equipment', 'GL', 'Commercial Auto'],
  },
  {
    icon: Shield,
    title: 'General Liability',
    subtitle: 'Any Profession, Any Size',
    description:
      'Every business needs a solid GL foundation. We ensure your limits, exclusions, and endorsements are right-sized for your actual operations — not just a boilerplate policy.',
    risks: [
      'Inadequate policy limits',
      'Unendorsed exclusions',
      'Gaps between GL and umbrella',
    ],
    coverages: ['GL', 'Umbrella', 'Professional Liability'],
  },
]

export function IndustrySpecializationSection() {
  return (
    <section id="industries" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Industry Expertise
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            We Know Your Industry — Not Just Insurance
          </h2>
          <p className="text-lg text-muted-foreground">
            Our commercial team works across these core industries and beyond.
            Every risk program is built around your specific operations — never
            a template.
          </p>
        </div>

        {/* Industry cards */}
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => {
            const Icon = industry.icon
            return (
              <li
                key={industry.title}
                className="group bg-muted/20 border border-border rounded-2xl p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                {/* Icon & title */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {industry.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium">
                      {industry.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {industry.description}
                </p>

                {/* Key risks */}
                <div className="mb-6">
                  <p className="text-[10px] font-bold text-destructive uppercase tracking-widest mb-2">
                    Common Risks
                  </p>
                  <ul className="space-y-1.5">
                    {industry.risks.map((risk) => (
                      <li
                        key={risk}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive/50 flex-shrink-0" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coverage pills */}
                <div className="mt-auto pt-5 border-t border-border">
                  <div className="flex flex-wrap gap-1.5">
                    {industry.coverages.map((cov) => (
                      <span
                        key={cov}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary/80 border border-primary/20"
                      >
                        {cov}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            )
          })}

          {/* "And more" card */}
          <li className="group bg-primary/5 border-2 border-dashed border-primary/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/40 transition-colors">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <ArrowRight className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              And Many More
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Our expertise isn&apos;t limited to these industries. If your
              business has risk, we have the experience to manage it.
            </p>
            <Button
              variant="outline"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Talk to an Advisor
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </li>
        </ul>
      </div>
    </section>
  )
}
