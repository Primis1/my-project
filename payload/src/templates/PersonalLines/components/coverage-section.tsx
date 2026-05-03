"use client"

import { Car, Home, Building2, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const coverageTypes = [
  {
    id: "auto",
    icon: Car,
    title: "Auto Insurance",
    description: "Protect your vehicle and yourself with comprehensive auto coverage at competitive rates.",
    features: [
      "Collision & Comprehensive",
      "Liability Protection",
      "Uninsured Motorist",
      "Roadside Assistance",
      "Rental Reimbursement",
    ],
    savings: "Save up to $600/year",
    color: "blue",
  },
  {
    id: "home",
    icon: Home,
    title: "Home Insurance",
    description: "Safeguard your biggest investment with customized homeowners coverage.",
    features: [
      "Dwelling Protection",
      "Personal Property",
      "Liability Coverage",
      "Additional Living Expenses",
      "Natural Disaster Add-ons",
    ],
    savings: "Save up to $900/year",
    color: "indigo",
  },
  {
    id: "tenant",
    icon: Building2,
    title: "Tenant Insurance",
    description: "Affordable renters coverage to protect your belongings and give you peace of mind.",
    features: [
      "Personal Property Coverage",
      "Liability Protection",
      "Additional Living Expenses",
      "Theft Protection",
      "Guest Medical Coverage",
    ],
    savings: "From $15/month",
    color: "violet",
  },
]

export function CoverageSection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Coverage Options
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Insurance That Fits Your Life
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you drive, own, or rent, we find the right coverage from top-rated insurers 
            to match your needs and budget.
          </p>
        </div>

        {/* Coverage cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {coverageTypes.map((coverage) => {
            const Icon = coverage.icon
            return (
              <div
                key={coverage.id}
                className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Savings badge */}
                <div className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full mb-4">
                  {coverage.savings}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">{coverage.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {coverage.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {coverage.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                >
                  Get {coverage.title.split(" ")[0]} Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )
          })}
        </div>

        {/* Bundle banner */}
        <div className="mt-12 bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-8 md:p-10 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">
            Bundle & Save Even More
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Combine your auto and home insurance to unlock additional discounts of up to 25%. 
            We&apos;ll find the best bundle across all our partner carriers.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-blue-50 rounded-full px-8 font-semibold"
          >
            Explore Bundle Options
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
