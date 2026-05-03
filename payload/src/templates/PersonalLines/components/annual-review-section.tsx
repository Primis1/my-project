"use client"

import { ClipboardCheck, MessageSquare, Search, FileCheck, ArrowRight, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviewSteps = [
  {
    step: 1,
    icon: ClipboardCheck,
    title: "Assess Changes",
    description: "We review what's changed in your life since last year - new car, home improvements, life changes, or updated coverage needs.",
  },
  {
    step: 2,
    icon: MessageSquare,
    title: "Address Concerns",
    description: "Discuss any gaps in coverage, concerns about your current policy, or new protection you might need.",
  },
  {
    step: 3,
    icon: Search,
    title: "Find Best Rate",
    description: "We re-shop all 20+ carriers - including your current insurer - to find the most competitive rate for your updated needs.",
  },
  {
    step: 4,
    icon: FileCheck,
    title: "Implement & Document",
    description: "Seamlessly switch or renew with optimized coverage. We handle the paperwork and keep records for future reviews.",
  },
]

const stats = [
  { value: "73%", label: "of clients find better rates at annual review" },
  { value: "$847", label: "average annual savings per household" },
  { value: "100%", label: "of reviews are free with no obligation" },
]

export function AnnualReviewSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Annual Needs Analysis
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Your Coverage Should Evolve With You
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Life changes. So should your insurance. Each year, we conduct a comprehensive 
              review to ensure your coverage matches your current needs and budget - and that 
              you&apos;re still getting the best rate available.
            </p>

            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-primary hover:bg-blue-700 text-white rounded-full px-8"
            >
              Schedule Your Free Review
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Right - Process steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 hidden md:block" />

            <div className="space-y-6">
              {reviewSteps.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.step} className="relative flex gap-5">
                    {/* Step number/icon */}
                    <div className="flex-shrink-0 w-14 h-14 bg-blue-50 border-2 border-blue-200 rounded-xl flex items-center justify-center z-10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-slate-50 rounded-xl p-5 hover:bg-blue-50/50 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-primary bg-blue-100 px-2 py-0.5 rounded">
                          Step {step.step}
                        </span>
                        <h3 className="font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Result callout */}
            <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-1">The Result?</h4>
                <p className="text-sm text-green-700">
                  Most clients save money or get better coverage - often both. 
                  And if your current policy is still the best option, we&apos;ll confirm that too.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
