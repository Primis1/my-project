"use client"

import { Clock, TrendingDown, AlertTriangle, ShieldAlert } from "lucide-react"

export function WhyLifeInsuranceSection() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
            The Cost of Waiting
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Why Act Now? Time is Your Biggest Asset (or Liability)
          </h2>
          <p className="text-lg text-muted-foreground">
            Life insurance and income protection are the only financial products that get more expensive—and harder to qualify for—every single year you wait.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Educational Content */}
          <div className="space-y-8">
            <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 flex gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Premiums Increase Annually</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every birthday increases your baseline premium by roughly 5-8%. Over a 20-year term policy, waiting just 3 years can cost you thousands in additional premium payments for the exact same coverage.
                </p>
              </div>
            </div>

            <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 flex gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Health Changes Happen Unexpectedly</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A sudden diagnosis, an elevated blood pressure reading, or an unexpected injury can instantly make coverage significantly more expensive—or completely unavailable. Lock in your health rating today.
                </p>
              </div>
            </div>

            <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">The Employer Coverage Illusion</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Group life insurance through work typically only covers 1-2x your salary and disappears if you change jobs or are let go. An independent policy stays with you, protecting your family regardless of your employment status.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Explainer */}
          <div className="relative bg-muted/10 rounded-3xl p-8 md:p-12 border border-border overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="font-bold text-lg text-foreground">The Cost of Waiting 10 Years</h4>
                  <p className="text-sm text-muted-foreground">Example: $500k Term Life Policy (Male, Non-Smoker)</p>
                </div>
                <Clock className="w-8 h-8 text-emerald-600/50" />
              </div>

              {/* Chart Visualization Mockup */}
              <div className="space-y-6">
                
                {/* Age 30 */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-foreground">Buying at Age 30</span>
                    <span className="font-bold text-emerald-600">~$30 / month</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>

                {/* Age 40 */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-foreground">Waiting until Age 40</span>
                    <span className="font-bold text-amber-600">~$70 / month</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-amber-500 h-3 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                {/* Age 50 */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-foreground">Waiting until Age 50</span>
                    <span className="font-bold text-destructive">~$180+ / month</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-destructive h-3 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

              </div>

              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-sm font-medium text-foreground">
                  Delaying coverage doesn't save money—it dramatically increases the total cost over your lifetime.
                </p>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl" />
          </div>

        </div>
      </div>
    </section>
  )
}
