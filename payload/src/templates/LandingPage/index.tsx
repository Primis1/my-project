"use client"

import React, { useState } from 'react'
import RichText from '@/components/RichText'
import { FormBlock } from '@/blocks/Form/Component'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  CheckCircle2, 
  Gift, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Home, 
  Building2, 
  Heart, 
  BadgeCheck,
  ChevronDown,
  ExternalLink,
  Scale,
  X,
  Info
} from 'lucide-react'
import { cn } from '@/utilities/ui'
import { PostalCodeCalculator } from '@/components/PostalCodeCalculator'
import { BusinessCard } from '@/components/BusinessCard'

export const LandingPageTemplate: React.FC<{ data?: any }> = ({ data }) => {
  const pageData = data || {}

  const {
    heroHeading = 'Thank You',
    heroSubtitle = 'We appreciate your interest! Review your free giveaways below and submit your request for instant access.',
    lureTitle = 'Your Free Giveaways',
    lureDescription,
    giveaways: cmsGiveaways,
    lureBulletPoints,
    form,
    formTitle = 'Start Your Protection Plan',
    formSubtitle = 'Confidential assessment — no obligation',
    hideHeader,
    hideFooter,
    businessCardPdf,
    businessCardTitle,
    businessCardSubtitle,
    businessCardName,
    businessCardRole,
    businessCardTagline,
    businessCardLicense,
    businessCardPhone,
    businessCardEmail,
    businessCardShareBtnText,
    businessCardDownloadBtnText,
  } = pageData

  const businessCardPdfUrl = typeof businessCardPdf === 'object' && businessCardPdf?.url 
    ? businessCardPdf.url 
    : (typeof businessCardPdf === 'string' ? businessCardPdf : undefined)

  const shouldHideHeader = hideHeader !== false
  const shouldHideFooter = hideFooter !== false

  // Form & UI State
  const [activeTab, setActiveTab] = useState('home-auto')
  const [selectedPostalCode, setSelectedPostalCode] = useState('')
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [checkedFactors, setCheckedFactors] = useState<Record<number, boolean>>({})
  const [isFactorsModalOpen, setIsFactorsModalOpen] = useState(false)

  const toggleFactor = (index: number) => {
    setCheckedFactors(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const tabs = [
    { id: 'home-auto', label: 'Home or Auto', icon: Home },
    { id: 'business', label: 'Business', icon: Building2 },
    { id: 'life-income', label: 'Life & Income', icon: Heart },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('loading')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    
    // Evaluate full name into required payload fields (first and last)
    const fullNameRaw = (formData.get('firstName') as string) || ''
    const parts = fullNameRaw.trim().split(' ')
    const fname = parts[0] || ''
    const lname = parts.length > 1 ? parts.slice(1).join(' ') : ' ' // Provide whitespace for required lastName field
    
    const requestData = {
      firstName: fname,
      lastName: lname,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      selectedCoverages: [{ value: activeTab }],
      status: 'new',
      ...(selectedPostalCode ? { notes: `Postal Code: ${selectedPostalCode}` } : {})
    }

    try {
      const res = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (!res.ok) {
        throw new Error('Failed to submit quote request')
      }

      setFormStatus('success')
    } catch (err) {
      console.error(err)
      setFormStatus('error')
      setErrorMessage('Something went wrong. Please try again or call us directly.')
    }
  }

  // 11+ Factors That Influence Your Premium Calculation
  const premiumFactors = [
    { title: "Driving History", desc: "a clean record over the past 3–10 years provides the highest positive contribution to your premium calculation." },
    { title: "Age & Driving Experience", desc: "drivers with over 9 years of licensed experience and aged 25+ receive significantly lower base risk coefficients." },
    { title: "Marital Status", desc: "statistically lowers risk classification across many Ontario insurance carriers." },
    { title: "Location & FSA", desc: "reflects local traffic density, collision statistics, and theft risks in your neighborhood." },
    { title: "Annual Mileage", desc: "driving fewer kilometers per year proportionally lowers claims probability." },
    { title: "Commute Habits", desc: "using vehicle for pleasure only (no daily commute) qualifies for lower rating tiers." },
    { title: "Vehicle CLEAR Rating", desc: "models with strong safety records and lower repair costs require lower collision coverage premiums." },
    { title: "Winter Tires Discount", desc: "mandatory discount under Ontario law (approx. 2–5%) for seasonal winter tire installation." },
    { title: "Anti-Theft Devices", desc: "immobilizers or satellite tracking systems reduce the theft risk component of Comprehensive coverage." },
    { title: "Group Affiliation & Profession", desc: "membership in professional associations or alumni unions unlocks extra group discount tiers." },
    { title: "Deductible Level", desc: "choosing a higher deductible (e.g., $1,000 vs. $500) reduces monthly premiums." },
    { title: "Business vs. Personal Use", desc: "adjusts policy rating class depending on commercial or courier usage." },
    { title: "Multi-Policy Bundle", desc: "combining auto with home or tenant insurance unlocks 10% to 20% overall savings." },
  ]

  const formBlockProps = {
    blockType: 'formBlock' as const,
    enableIntro: false,
    form: form,
  }

  return (
    <>
      {shouldHideHeader && (
        <style dangerouslySetInnerHTML={{ __html: `header:not(.landing-page-hero) { display: none !important; }` }} />
      )}
      {shouldHideFooter && (
        <style dangerouslySetInnerHTML={{ __html: `footer { display: none !important; }` }} />
      )}

      <div className="relative min-h-screen bg-gradient-to-b from-background via-muted/20 to-background py-12 lg:py-20 overflow-hidden">
        {/* Background Ambient Glowing Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute top-[40%] right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16 lg:space-y-20">
          
          {/* ========================================================================= */}
          {/* TOP CENTERED HIGH IMPACT HERO BLOCK */}
          {/* ========================================================================= */}
          <div className="landing-page-hero text-center max-w-4xl mx-auto space-y-6 pt-2 relative">
            <div className="relative group bg-gradient-to-b from-card/80 via-card/50 to-card/30 p-8 sm:p-12 md:p-14 rounded-3xl border border-primary/20 shadow-[0_20px_50px_-15px_rgba(var(--primary),0.15)] backdrop-blur-xl transition-all duration-300">
              
              {/* Decorative Ambient Glow Effects */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/30 transition-all" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Hero Title */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tight leading-[1.05] drop-shadow-sm">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70">
                    {heroHeading}
                  </span>
                </h1>
                
                {/* Subtitle */}
                {heroSubtitle && (
                  <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
                    {heroSubtitle}
                  </p>
                )}
                
                {/* Secondary Author Signature */}
                <p className="text-md sm:text-lg text-muted-foreground italic max-w-3xl mx-auto mt-2">
                  Oleh Babinskyi
                </p>

                {/* Quick Trust Badges Bridge */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-border/40">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    <Home className="w-3.5 h-3.5" />
                    <span>Auto & Home</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Business & Liability</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    <Heart className="w-3.5 h-3.5" />
                    <span>Life & Income</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* GIVEAWAYS VERTICAL CONVERSION FLOW */}
          {/* ========================================================================= */}
          <section className="space-y-12" aria-label="Exclusive Giveaways">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
                {lureTitle}
              </h2>
              {lureDescription && (
                <div className="prose prose-sm dark:prose-invert text-muted-foreground max-w-2xl mx-auto">
                  <RichText data={lureDescription} enableGutter={false} />
                </div>
              )}
            </div>

            <div className="grid gap-8 sm:gap-12">
              
              {/* ========================================================================= */}
              {/* GIVEAWAY #1: POSTAL CODE MEDIUM PREMIUM CALCULATOR */}
              {/* ========================================================================= */}
              <div id="giveaway-1">
                <PostalCodeCalculator 
                  badge="Giveaway #1" 
                  number="01" 
                  locale="en"
                  onQuoteRequested={(code) => setSelectedPostalCode(code)} 
                />
              </div>

              {/* ========================================================================= */}
              {/* GIVEAWAY #2: 11+ FACTORS THAT AFFECT YOUR PREMIUM */}
              {/* ========================================================================= */}
              <div id="giveaway-2" className="relative group bg-card/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-primary/20 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-border/40 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      <Gift className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-3 py-1 rounded-full">
                      Giveaway #2
                    </span>
                  </div>
                  <span className="text-2xl font-black text-muted-foreground/30">
                    02
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                    How 11+ Factors Shape Your Final Auto Insurance Cost
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Each of these parameters carries a specific weight coefficient in an insurer's rate calculation formula. Learn how individual elements of your profile influence your premium and which ones you can optimize for max savings.
                  </p>

                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                        Premium Reduction Checklist
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                        Actionable Discount Opportunities
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                        Key Driver & Policy Rating Factors
                      </span>
                    </li>
                  </ul>

                  {/* Hide/Reveal List - Interactive Checkboxes */}
                  <div className="pt-2">
                    <details className="group rounded-2xl overflow-hidden bg-background/70 border border-border/60 hover:border-primary/40 transition-colors">
                      <summary className="p-4 font-semibold text-foreground cursor-pointer list-none flex justify-between items-center outline-none select-none">
                        <span className="flex items-center gap-2 text-sm">
                          <BadgeCheck className="w-4 h-4 text-primary" />
                          View the 11+ Key Factors That Impact Your Rate
                        </span>
                        <div className="p-1 rounded-full bg-primary/10 group-open:bg-primary/20 transition-colors">
                          <ChevronDown className="w-4 h-4 text-primary transition-transform duration-300 group-open:rotate-180" />
                        </div>
                      </summary>
                      <div className="p-4 pt-1 bg-muted/20 border-t border-border/40">
                        <ul className="flex flex-col space-y-2 mt-2">
                          {premiumFactors.map((factor, i) => {
                            const isChecked = !!checkedFactors[i]
                            return (
                              <li key={i}>
                                <button
                                  type="button"
                                  onClick={() => toggleFactor(i)}
                                  className="flex items-start gap-3 text-left w-full p-2 rounded-xl hover:bg-background/80 transition-colors group cursor-pointer"
                                >
                                  <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all shadow-sm",
                                    isChecked 
                                      ? "border-primary bg-primary text-primary-foreground" 
                                      : "border-muted-foreground/40 group-hover:border-primary/60 bg-background"
                                  )}>
                                    <CheckCircle2 className={cn(
                                      "w-3.5 h-3.5 transition-opacity stroke-[3]",
                                      isChecked ? "opacity-100" : "opacity-0"
                                    )} />
                                  </div>
                                  <span className={cn(
                                    "text-xs sm:text-sm leading-relaxed transition-all",
                                    isChecked ? "line-through text-muted-foreground/50" : "text-muted-foreground"
                                  )}>
                                    <strong className={cn(
                                      "font-semibold transition-colors",
                                      isChecked ? "text-muted-foreground/50 font-normal" : "text-foreground"
                                    )}>
                                      {i + 1}. {factor.title}
                                    </strong> — {factor.desc}
                                  </span>
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </details>

                    <p className="text-xs text-muted-foreground pt-3">
                      *All actuarial rating coefficients are calculated based on FSRA-approved rules.{' '}
                      <button 
                        type="button"
                        onClick={() => setIsFactorsModalOpen(true)}
                        className="underline font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Legal Info & FSRA Factor Assessment</span>
                        <Scale className="w-3.5 h-3.5" />
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* GIVEAWAY #3: PERSONAL QUOTE & ASSESSMENT FORM */}
              {/* ========================================================================= */}
              <div 
                id="quote-form-section" 
                className="relative group bg-card/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-primary/30 shadow-2xl space-y-6"
                aria-labelledby="quote-form-title"
              >
                <div className="flex items-center justify-between border-b border-border/40 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-3 py-1 rounded-full">
                      Giveaway #3
                    </span>
                  </div>
                  <span className="text-2xl font-black text-muted-foreground/30">
                    03
                  </span>
                </div>

                {form ? (
                  <div className="landing-page-form">
                    <div className="text-center mb-6">
                      <h3 id="quote-form-title" className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-1">
                        {formTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formSubtitle}
                      </p>
                    </div>
                    <FormBlock {...formBlockProps} />
                  </div>
                ) : formStatus === 'success' ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Request Received</h3>
                    <p className="text-sm text-muted-foreground">
                      Thank you! One of our advisors will be in touch shortly regarding your personalized assessment.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setFormStatus('idle')}
                      className="mt-4"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center space-y-1">
                      <h3 id="quote-form-title" className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                        Personalized Assessment & Policy Quote
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Select coverage type, provide contact details, and receive an exact broker calculation.
                      </p>
                    </div>

                    {/* Tab Switcher: Home or Auto, Business, Life & Income */}
                    <div className="flex rounded-xl bg-muted/80 p-1.5 shadow-inner" role="tablist">
                      {tabs.map((tab) => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.id
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-controls="form-container"
                            onClick={() => setActiveTab(tab.id)}
                            aria-pressed={isActive}
                            aria-label={`Switch to ${tab.label} form`}
                            className={cn(
                              "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                              isActive
                                ? "bg-background text-primary shadow-md font-bold"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                          </button>
                        )
                      })}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-xs font-bold text-foreground mb-1.5 uppercase tracking-wider">
                            First & Last Name
                          </label>
                          <Input
                            type="text"
                            name="firstName"
                            placeholder="John Smith"
                            className="rounded-xl h-12 bg-background/80"
                            required
                          />
                        </div>
                        
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-bold text-foreground mb-1.5 uppercase tracking-wider">
                            Email Address
                          </label>
                          <Input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            className="rounded-xl h-12 bg-background/80"
                            required
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-bold text-foreground mb-1.5 uppercase tracking-wider">
                            Phone
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            placeholder="(555) 123-4567"
                            className="rounded-xl h-12 bg-background/80"
                            required
                          />
                        </div>
                      </div>

                      {selectedPostalCode && (
                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-xs text-primary font-semibold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>Postal Code attached for calculation: <strong>{selectedPostalCode}</strong></span>
                        </div>
                      )}

                      {formStatus === 'error' && (
                        <p className="text-sm text-destructive text-center font-medium">
                          {errorMessage}
                        </p>
                      )}

                      <Button 
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3.5 h-13 text-base font-bold shadow-lg transition-transform active:scale-95 mt-2"
                      >
                        {formStatus === 'loading' ? 'Submitting...' : 'Get Your Personalized Quote'}
                        {formStatus !== 'loading' && <ArrowRight className="w-5 h-5 ml-2" />}
                      </Button>
                    </form>

                    <p className="text-xs text-muted-foreground text-center">
                      🔒 Your information is kept strictly confidential. No spam guarantee.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Fallback Bullet list (if any) */}
            {(!cmsGiveaways || cmsGiveaways.length === 0) && lureBulletPoints && lureBulletPoints.length > 0 && (
              <div className="bg-card/40 border border-border/80 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Additional Included Benefits
                </h4>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {lureBulletPoints.map((item: any, idx: number) => (
                    <li key={item.id || idx} className="flex items-center gap-2.5">
                      <BadgeCheck className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm font-medium text-foreground">
                        {item.bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* ========================================================================= */}
          {/* BUSINESS CARD SECTION (UPLOADABLE PDF & MOBILE NATIVE SHARE) */}
          {/* ========================================================================= */}
          <section aria-label="Digital Business Card">
            <BusinessCard 
              locale="en"
              pdfUrl={businessCardPdfUrl}
              title={businessCardTitle}
              subtitle={businessCardSubtitle}
              name={businessCardName}
              role={businessCardRole}
              tagline={businessCardTagline}
              license={businessCardLicense}
              phone={businessCardPhone}
              email={businessCardEmail}
              shareBtnText={businessCardShareBtnText}
              downloadBtnText={businessCardDownloadBtnText}
            />
          </section>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* FACTORS LEGAL & UNDERWRITING DISCLAIMER MODAL */}
      {/* ========================================================================= */}
      {isFactorsModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="factors-modal-title"
          onClick={() => setIsFactorsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl bg-card border border-primary/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsFactorsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 border-b border-border/40 pb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 id="factors-modal-title" className="text-lg sm:text-xl font-extrabold text-foreground">
                  Factor Assessment Rules & FSRA Regulation
                </h3>
                <p className="text-xs text-muted-foreground">
                  Underwriting legal disclosure for Ontario
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              
              {/* Section 1 */}
              <div className="p-4 rounded-2xl bg-background/80 border border-border/60 space-y-2">
                <h4 className="font-bold text-foreground flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <span>1. Legislative Regulation of Risk Factors (FSRA & Insurance Act)</span>
                </h4>
                <p>
                  In Ontario, all risk assessment factors (age, experience, driving record, territory, vehicle classification, etc.) are regulated by the Financial Services Regulatory Authority of Ontario (FSRA) pursuant to the Insurance Act. Insurance companies may only use actuarial rating rules filed with and approved by the regulator.
                </p>
              </div>

              {/* Section 2 */}
              <div className="p-4 rounded-2xl bg-background/80 border border-border/60 space-y-2">
                <h4 className="font-bold text-foreground flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>2. Carrier Weight Algorithm Variations</span>
                </h4>
                <p>
                  Each insurance carrier applies its own approved rate manual. The weight and discount percentage for each factor (e.g., deductible choice, winter tires, multi-policy bundling, or anti-theft systems) vary depending on the specific insurer and their underwriting algorithms.
                </p>
              </div>

              {/* Section 3 */}
              <div className="p-4 rounded-2xl bg-background/80 border border-border/60 space-y-2">
                <h4 className="font-bold text-foreground flex items-center gap-2 text-sm">
                  <Info className="w-4 h-4 text-primary shrink-0" />
                  <span>3. Educational & Optimization Purpose (Non-Binding Notice)</span>
                </h4>
                <p>
                  The listed 11+ factors serve as general educational guidelines to optimize your insurance profile. They do not guarantee an automatic fixed discount across every carrier. Exact rate quotes are calculated individually by a licensed broker.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-border/40 flex justify-end">
              <Button
                onClick={() => setIsFactorsModalOpen(false)}
                className="rounded-full px-6 bg-primary text-primary-foreground font-semibold"
              >
                Understood
              </Button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
