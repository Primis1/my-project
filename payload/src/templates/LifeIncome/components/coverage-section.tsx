"use client"

import { useState } from "react"
import {
  Wallet,
  Shield,
  HeartPulse,
  Stethoscope,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Users,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/utilities/ui"

type LifeStage = "young-professional" | "growing-family" | "business-owner" | "pre-retiree"

const lifeStages: { id: LifeStage; label: string; description: string; recommended: string[] }[] = [
  {
    id: "young-professional",
    label: "Young Professional",
    description: "Locking in low rates early and protecting your greatest asset: your ability to earn an income.",
    recommended: ["Income Replacement", "Term Life"],
  },
  {
    id: "growing-family",
    label: "Growing Family",
    description: "Maximizing protection for your loved ones to cover mortgages, childcare, and future education costs.",
    recommended: ["Term Life", "Whole Life", "Health Benefit Plans"],
  },
  {
    id: "business-owner",
    label: "Business Owner",
    description: "Securing business continuity, protecting key employees, and ensuring your personal safety net.",
    recommended: ["Income Replacement", "Term Life", "Group Benefits"],
  },
  {
    id: "pre-retiree",
    label: "Pre-Retiree",
    description: "Transitioning from pure protection to wealth preservation, tax efficiency, and legacy planning.",
    recommended: ["Whole & Universal Life", "Investment Strategy"],
  },
]

const primaryProducts = [
  {
    id: "Income Replacement",
    icon: Wallet,
    title: "Income Replacement",
    description: "Replaces a portion of your earnings if an injury or illness prevents you from working.",
    features: ["Short & long-term options", "Own-occupation available"],
  },
  {
    id: "Term Life",
    icon: Shield,
    title: "Term Life Insurance",
    description: "Affordable, straightforward protection for a specific period (10, 20, 30 years).",
    features: ["Level premiums", "Convertible to permanent"],
  },
  {
    id: "Whole & Universal Life",
    icon: HeartPulse,
    title: "Permanent Life (Whole / UL)",
    description: "Lifelong protection that builds cash value over time with tax advantages.",
    features: ["Lifetime guarantee", "Cash value accumulation"],
  },
  {
    id: "Health Benefit Plans",
    icon: Stethoscope,
    title: "Health Benefit Plans",
    description: "Personal and corporate health coverage tailored to your needs.",
    features: ["Individual & family plans", "Dental & vision add-ons"],
  },
]

export function CoverageSection() {
  const [activeStage, setActiveStage] = useState<LifeStage>("growing-family")
  
  const currentStageInfo = lifeStages.find(s => s.id === activeStage)

  return (
    <section id="life-income-coverage" className="py-20 lg:py-28 bg-emerald-50/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
            Life-Stage Navigation
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Coverage Designed for Your Timeline
          </h2>
          <p className="text-lg text-muted-foreground">
            Your needs change as you move through life. Select your current stage to see
            the foundational protections we recommend.
          </p>
        </div>

        {/* Timeline / Stage Selector */}
        <div className="relative mb-16">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block" />
          
          <ul className="relative flex flex-col md:flex-row justify-between gap-4 md:gap-0">
            {lifeStages.map((stage, index) => {
              const isActive = activeStage === stage.id
              return (
                <li key={stage.id} className="flex-1 relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => setActiveStage(stage.id)}
                    className={cn(
                      "w-full md:w-auto px-6 py-3 md:py-2 rounded-full font-semibold text-sm transition-all border-2",
                      isActive 
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20 md:scale-110" 
                        : "bg-white border-border text-muted-foreground hover:border-emerald-300 hover:text-foreground"
                    )}
                  >
                    {stage.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Active Stage Content */}
        {currentStageInfo && (
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-emerald-100 shadow-sm mb-20">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {currentStageInfo.label} Focus
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {currentStageInfo.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {primaryProducts.map((product) => {
                const isRecommended = currentStageInfo.recommended.includes(product.id)
                const Icon = product.icon
                
                return (
                  <div 
                    key={product.id}
                    className={cn(
                      "rounded-2xl p-6 transition-all duration-300 relative overflow-hidden",
                      isRecommended 
                        ? "bg-emerald-50 border-2 border-emerald-200" 
                        : "bg-white border border-border opacity-60 grayscale-[50%]"
                    )}
                  >
                    {isRecommended && (
                      <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-bl-lg">
                        Recommended
                      </div>
                    )}
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                      isRecommended ? "bg-emerald-100" : "bg-muted"
                    )}>
                      <Icon className={cn("w-6 h-6", isRecommended ? "text-emerald-600" : "text-muted-foreground")} />
                    </div>
                    <h4 className={cn("font-bold mb-2", isRecommended ? "text-foreground" : "text-muted-foreground")}>
                      {product.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Life Insurance Comparison Table */}
        <div className="bg-white rounded-3xl border border-border overflow-hidden">
          <div className="p-8 border-b border-border text-center bg-muted/10">
            <h3 className="text-2xl font-bold text-foreground mb-2">Life Insurance Comparison</h3>
            <p className="text-muted-foreground">Understanding the core differences between policy types</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-muted/5">
                  <th className="p-5 border-b border-border font-semibold text-muted-foreground w-1/4">Feature</th>
                  <th className="p-5 border-b border-border font-bold text-foreground text-lg w-1/4">Term Life</th>
                  <th className="p-5 border-b border-border font-bold text-foreground text-lg w-1/4">Whole Life</th>
                  <th className="p-5 border-b border-border font-bold text-foreground text-lg w-1/4">Universal Life</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                <tr>
                  <td className="p-5 font-medium text-foreground">Duration</td>
                  <td className="p-5 text-muted-foreground">Set period (10-30 yrs)</td>
                  <td className="p-5 text-muted-foreground">Lifetime</td>
                  <td className="p-5 text-muted-foreground">Lifetime</td>
                </tr>
                <tr>
                  <td className="p-5 font-medium text-foreground">Premiums</td>
                  <td className="p-5 text-muted-foreground">Fixed & low cost initially</td>
                  <td className="p-5 text-muted-foreground">Fixed & higher cost</td>
                  <td className="p-5 text-muted-foreground">Flexible (can be adjusted)</td>
                </tr>
                <tr>
                  <td className="p-5 font-medium text-foreground">Cash Value Accumulation</td>
                  <td className="p-5 text-muted-foreground">—</td>
                  <td className="p-5 font-semibold text-emerald-600">Yes (Guaranteed growth)</td>
                  <td className="p-5 font-semibold text-emerald-600">Yes (Market/interest linked)</td>
                </tr>
                <tr>
                  <td className="p-5 font-medium text-foreground">Best For...</td>
                  <td className="p-5 text-muted-foreground">Mortgages, young families, high coverage needs</td>
                  <td className="p-5 text-muted-foreground">Estate planning, steady cash value, lifelong certainty</td>
                  <td className="p-5 text-muted-foreground">Max flexibility, wealth transfer, altering coverage amounts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  )
}
