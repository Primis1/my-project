"use client"

import { cn } from "@/utilities/ui"
import { Check } from "lucide-react"

interface Step {
  id: number
  label: string
  icon?: React.ReactNode
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function StepIndicator({ steps, currentStep, className }: StepIndicatorProps) {
  return (
    <div className={cn("flex w-full", className)}>
      {steps.map((step, index) => {
        const isActive = step.id === currentStep
        const isCompleted = step.id < currentStep
        const isLast = index === steps.length - 1

        return (
          <div key={step.id} className={cn("flex flex-1 items-center", !isLast && "")}>
            {/* Step button */}
            <div
              className={cn(
                "flex flex-1 items-center gap-3 border-b-2 px-4 py-4 transition-all duration-300",
                isActive && "border-gold bg-gold/5",
                isCompleted && "border-gold/60 bg-gold/5",
                !isActive && !isCompleted && "border-border bg-transparent"
              )}
            >
              {/* Step number/icon */}
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300",
                  isActive && "border border-gold bg-gold text-primary-foreground",
                  isCompleted && "border border-gold bg-gold/20 text-gold",
                  !isActive && !isCompleted && "border border-border bg-card text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : step.icon ? (
                  step.icon
                ) : (
                  step.id
                )}
              </div>

              {/* Step label */}
              <span
                className={cn(
                  "hidden text-xs font-medium tracking-wide uppercase sm:block",
                  isActive && "text-gold",
                  isCompleted && "text-gold/80",
                  !isActive && !isCompleted && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
