"use client"

import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowRight, CheckCircle2, Phone, Calendar, type LucideIcon } from "lucide-react"
import { cn } from "@/utilities/ui"

// Types
interface TabOption {
  id: string
  label: string
  icon: LucideIcon
}

interface FormField {
  id: string
  label: string
  type: "text" | "email" | "tel" | "number" | "select"
  placeholder: string
  options?: { value: string; label: string }[]
  showForTabs?: string[] // Only show for specific tabs
  halfWidth?: boolean
}

interface TrustStat {
  value: string
  label: string
}

interface ServiceHeroProps {
  // Badge
  badgeIcon: LucideIcon
  badgeText: string
  
  // Headline
  headlineTop: string
  headlineBottom: string
  description: string
  
  // Trust checkmarks
  checkmarks: string[]
  
  // Form
  formTitle: string
  formSubtitle: string
  tabs: TabOption[]
  defaultTab: string
  fields: FormField[]
  submitLabel: string
  formFooter?: string
  
  // Trust stats
  trustStats: TrustStat[]
}

export function ServiceHero({
  badgeIcon: BadgeIcon,
  badgeText,
  headlineTop,
  headlineBottom,
  description,
  checkmarks,
  formTitle,
  formSubtitle,
  tabs,
  defaultTab,
  fields,
  submitLabel,
  formFooter,
  trustStats,
}: ServiceHeroProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const visibleFields = fields.filter(
    (field) => !field.showForTabs || field.showForTabs.includes(activeTab)
  )

  // Group fields for grid layout
  const renderField = (field: FormField) => {
    const baseClass = "rounded-lg h-11"
    
    if (field.type === "select") {
      return (
        <div key={field.id} className={field.halfWidth ? "" : "col-span-2 sm:col-span-1"}>
          <label className="block text-xs font-medium text-foreground mb-1.5">
            {field.label}
          </label>
          <Select>
            <SelectTrigger className={baseClass}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )
    }

    return (
      <div key={field.id} className={field.halfWidth ? "" : "col-span-2 sm:col-span-1"}>
        <label className="block text-xs font-medium text-foreground mb-1.5">
          {field.label}
        </label>
        <Input
          type={field.type}
          placeholder={field.placeholder}
          className={baseClass}
        />
      </div>
    )
  }

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-full">
              <BadgeIcon className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">
                {badgeText}
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                <span className="text-foreground">{headlineTop}</span>
                <br />
                <span className="font-serif italic text-primary">{headlineBottom}</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg pt-2">
                {description}
              </p>
            </div>

            {/* Checkmarks */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
              {checkmarks.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" strokeWidth={2.5} />
                  <span className="text-sm text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-blue-700 text-white rounded-full px-8 h-14 text-base font-semibold shadow-lg shadow-blue-500/25"
              >
                <Phone className="w-5 h-5 mr-2" />
                Get a Free Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-14 text-base font-semibold border-2 border-primary text-primary hover:bg-blue-50"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Button>
            </div>
          </div>

          {/* Right - Quote Form */}
          <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-1">
                {formTitle}
              </h2>
              <p className="text-sm text-muted-foreground">
                {formSubtitle}
              </p>
            </div>

            {/* Tab Switcher */}
            {tabs.length > 1 && (
              <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  const isLast = tab.id === tabs[tabs.length - 1].id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all",
                        isActive && isLast
                          ? "bg-primary text-white shadow-sm"
                          : isActive
                          ? "bg-white text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              {visibleFields.map(renderField)}
            </div>

            <Button className="w-full bg-primary hover:bg-blue-700 text-white rounded-full py-3 h-12 text-sm font-semibold shadow-md mt-6">
              {submitLabel}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            {formFooter && (
              <p className="text-xs text-muted-foreground text-center mt-4">
                {formFooter}
              </p>
            )}
          </div>
        </div>

        {/* Trust Stats */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className={cn(
            "grid gap-8 text-center",
            trustStats.length === 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4"
          )}>
            {trustStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
