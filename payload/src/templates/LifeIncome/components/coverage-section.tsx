"use client"

import {
  Wallet,
  Shield,
  HeartPulse,
  Users,
  TrendingUp,
  Stethoscope,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Primary products — the core L&I lines, ordered by demand:
 * Income Replacement > Term Life > UL/WL > Health Plans
 */
const primaryProducts = [
  {
    id: "income-replacement",
    icon: Wallet,
    title: "Income Replacement",
    description:
      "Disability income insurance that replaces a portion of your earnings if an injury prevents you from working. The foundation of financial security.",
    features: [
      "Short-term & long-term options",
      "Own-occupation definitions available",
      "Benefit periods up to age 65",
      "Non-cancellable & guaranteed renewable",
    ],
  },
  {
    id: "term-life",
    icon: Shield,
    title: "Term Life Insurance",
    description:
      "Affordable, straightforward life insurance for a specific period. Ideal for income replacement, mortgage protection, and growing families.",
    features: [
      "10, 20, and 30-year terms",
      "Level premiums guaranteed",
      "Convertible to permanent policies",
      "High coverage at low cost",
    ],
  },
  {
    id: "permanent-life",
    icon: HeartPulse,
    title: "Whole Life & Universal Life",
    description:
      "Permanent life insurance that builds cash value over time. Combines lifelong protection with a tax-advantaged savings component.",
    features: [
      "Lifetime death benefit guarantee",
      "Cash value accumulation",
      "Policy loans & withdrawals",
      "Estate planning applications",
    ],
  },
  {
    id: "health-plans",
    icon: Stethoscope,
    title: "Health Benefit Plans",
    description:
      "Personal and group health benefit plans for individuals, families, and corporations. Comprehensive medical coverage tailored to your needs.",
    features: [
      "Individual & family plans",
      "Group benefits for employers",
      "Dental & vision add-ons",
      "Health Spending Accounts (HSA)",
    ],
  },
]

/**
 * Auxiliary services — enhancements that complement the primary products.
 * Investment side of permanent life + sickness rider on IR.
 */
const auxiliaryServices = [
  {
    id: "investment",
    icon: TrendingUp,
    title: "Investment & Cash Value Strategy",
    description:
      "The wealth-building side of permanent life insurance — leveraging cash value for retirement income, collateral, or tax-efficient transfers.",
  },
  {
    id: "sickness-rider",
    icon: HeartPulse,
    title: "Sickness Rider (Income Replacement)",
    description:
      "Extends your income replacement policy beyond injury-only coverage to include illness and critical conditions that prevent you from working.",
  },
  {
    id: "group-benefits",
    icon: Users,
    title: "Corporate Group Benefits",
    description:
      "Comprehensive employee benefit packages including group life, disability, dental, and extended health — designed for businesses of all sizes.",
  },
]

export function CoverageSection() {
  return (
    <section id="life-income-coverage" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Protection & Planning
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Life & Income Solutions for Every Stage
          </h2>
          <p className="text-lg text-muted-foreground">
            From income protection to permanent wealth strategies — each product
            stands on its own, and many work even better together.
          </p>
        </div>

        {/* ─── Primary product cards ─── */}
        <ul className="grid md:grid-cols-2 gap-8 mb-12">
          {primaryProducts.map((product) => {
            const Icon = product.icon
            return (
              <li
                key={product.id}
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
                      {product.title}
                    </h3>
                    <p
                      itemProp="description"
                      className="text-muted-foreground text-sm leading-relaxed"
                    >
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                  {product.features.map((feature) => (
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
                  Learn About {product.title}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </li>
            )
          })}
        </ul>

        {/* ─── Auxiliary services banner ─── */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="px-8 pt-8 pb-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
              Enhanced Coverage
            </p>
            <h3 className="text-lg font-semibold text-foreground">
              Complementary services & riders
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              These enhancements unlock the full potential of your core policies
              — from wealth accumulation strategies to expanded disability
              triggers.
            </p>
          </div>

          <ul className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {auxiliaryServices.map((aux) => {
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
