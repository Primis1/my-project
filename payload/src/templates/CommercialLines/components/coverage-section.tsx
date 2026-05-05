"use client"

import {
  Shield,
  Truck,
  Building2,
  FileCheck,
  Umbrella,
  Flame,
  Lock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Primary coverages — the core P&C lines the brokerage specialises in.
 * These are displayed as prominent cards.
 */
const primaryCoverages = [
  {
    id: "gl",
    icon: Shield,
    title: "General Liability",
    description:
      "Protects your business against third-party bodily injury, property damage, and advertising injury claims.",
    features: [
      "Third-party bodily injury",
      "Property damage liability",
      "Products & completed operations",
      "Personal & advertising injury",
    ],
    color: "blue",
  },
  {
    id: "ca",
    icon: Truck,
    title: "Commercial Auto",
    description:
      "Coverage for vehicles used in your business operations — from single vans to entire fleets.",
    features: [
      "Liability & physical damage",
      "Hired & non-owned auto",
      "Fleet-rated programs",
      "Cargo & trailer coverage",
    ],
    color: "indigo",
  },
  {
    id: "property",
    icon: Building2,
    title: "Commercial Property",
    description:
      "Protects your buildings, equipment, inventory, and business personal property against covered perils.",
    features: [
      "Building & contents",
      "Equipment breakdown",
      "Inland marine / tools",
      "Signs, fencing & outdoor property",
    ],
    color: "violet",
  },
  {
    id: "surety",
    icon: FileCheck,
    title: "Surety Bonds",
    description:
      "Performance, bid, and payment bonds that guarantee your contractual and legal obligations to third parties.",
    features: [
      "Performance & payment bonds",
      "Bid bonds",
      "License & permit bonds",
      "Court & fiduciary bonds",
    ],
    color: "amber",
  },
]

/**
 * Auxiliary coverages — endorsements or add-on policies that complement
 * but don't replace the primary lines above.
 */
const auxiliaryCoverages = [
  {
    id: "umbrella",
    icon: Umbrella,
    title: "Commercial Umbrella",
    description:
      "Extends the limits of your GL, CA, and Employers Liability policies for catastrophic claim protection.",
  },
  {
    id: "bi",
    icon: Flame,
    title: "Business Interruption",
    description:
      "Replaces lost income and pays ongoing expenses when a covered peril forces you to suspend operations.",
  },
  {
    id: "cyber",
    icon: Lock,
    title: "Cyber Liability",
    description:
      "Covers data breach costs, ransomware events, and regulatory fines that standard GL excludes.",
  },
]

export function CoverageSection() {
  return (
    <section id="commercial-coverage" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Core P&C Coverage
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Commercial Coverage Built Around Your Business
          </h2>
          <p className="text-lg text-muted-foreground">
            We specialise in four foundational commercial lines — and layer on
            auxiliary endorsements so nothing falls through the cracks.
          </p>
        </div>

        {/* ─── Primary coverage cards ─── */}
        <ul className="grid md:grid-cols-2 gap-8 mb-12">
          {primaryCoverages.map((coverage) => {
            const Icon = coverage.icon
            return (
              <li
                key={coverage.id}
                itemScope
                itemType="http://schema.org/Service"
                className="group bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                {/* Icon & title row */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3
                      itemProp="name"
                      className="text-xl font-bold text-foreground mb-1"
                    >
                      {coverage.title}
                    </h3>
                    <p
                      itemProp="description"
                      className="text-muted-foreground text-sm leading-relaxed"
                    >
                      {coverage.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                  {coverage.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant="outline"
                  className="w-full rounded-xl group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                >
                  Learn About {coverage.title}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </li>
            )
          })}
        </ul>

        {/* ─── Auxiliary endorsements banner ─── */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="px-8 pt-8 pb-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
              Auxiliary Coverage
            </p>
            <h3 className="text-lg font-semibold text-foreground">
              Layer on additional protection
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              These endorsements complement your core policies. They are not
              standalone coverages but are essential additions to close gaps in
              your risk profile.
            </p>
          </div>

          <ul className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {auxiliaryCoverages.map((aux) => {
              const Icon = aux.icon
              return (
                <li
                  key={aux.id}
                  className="p-8 hover:bg-muted/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {aux.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {aux.description}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
