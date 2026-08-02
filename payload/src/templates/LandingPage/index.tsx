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
  ExternalLink
} from 'lucide-react'
import { cn } from '@/utilities/ui'

export const LandingPageTemplate: React.FC<{ data?: any }> = ({ data }) => {
  const pageData = data || {}

  const {
    heroHeading = '2 Free Giveaways!',
    heroSubtitle = 'We appreciate your interest! Review your 2 exclusive giveaways below and submit your request for instant access.',
    lureTitle = 'Your 2 Exclusive Free Giveaways',
    lureDescription,
    giveaways: cmsGiveaways,
    lureBulletPoints,
    form,
    formTitle = 'Start Your Protection Plan',
    formSubtitle = 'Confidential assessment — no obligation',
    hideHeader,
    hideFooter,
  } = pageData

  const shouldHideHeader = hideHeader !== false
  const shouldHideFooter = hideFooter !== false

  // Form State
  const [activeTab, setActiveTab] = useState('home-auto')
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [checkedFactors, setCheckedFactors] = useState<Record<number, boolean>>({})

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

  // 11+ Factors That Can Lower Your Premium
  const premiumFactors = [
    { title: "Driving record", desc: "a clean history over the past several years works in your favour." },
    { title: "Age", desc: "premiums typically drop once you're past your mid-20s." },
    { title: "Marital status", desc: "being married is often treated as a lower-risk profile by insurers." },
    { title: "Where you live", desc: "rural and lower-traffic areas tend to see lower rates than dense urban zones." },
    { title: "Annual mileage", desc: "driving fewer kilometres a year can reduce your rate." },
    { title: "Commute habits", desc: "not driving to work or school daily can work in your favour." },
    { title: "Vehicle type", desc: "cars with lower claims history (theft, repair cost, collision) cost less to insure." },
    { title: "Winter tires", desc: "many insurers offer a discount for installing them seasonally." },
    { title: "Anti-theft devices", desc: "alarms, immobilizers, or tracking systems can reduce comprehensive coverage costs." },
    { title: "Occupation", desc: "some professions are classified as lower-risk by certain insurers." },
    { title: "Deductible level", desc: "choosing a higher deductible generally lowers your premium." },
    { title: "Business use vs. personal use", desc: "how you use the vehicle affects your risk classification and rate." },
    { title: "Bundling policies", desc: "combining auto with home/tenant insurance often unlocks a multi-policy discount." },
  ]

  // Construct 2 default giveaway sub-sections if not populated from CMS
  const defaultGiveaways = [
    {
      id: 'g1',
      number: '01',
      badge: 'Giveaway #1',
      icon: FileText,
      title: 'Complete Insurance & Risk Audit Guide',
      description: 'A comprehensive step-by-step framework to identify hidden coverage gaps, eliminate unnecessary policy add-ons, and safeguard your key assets.',
      bullets: [
        'Step-by-step policy health checklist',
        'Hidden coverage gap identification framework',
        'Asset-to-liability protection ratio guide'
      ]
    },
    {
      id: 'g2',
      number: '02',
      badge: 'Giveaway #2',
      icon: Gift,
      title: '11+ Factors That Can Lower Your Premium',
      description: 'Discover key factors insurers consider when calculating your rate and how you can optimize your profile for max savings.',
      bullets: [
        'Comprehensive premium reduction checklist',
        'Actionable discount opportunities',
        'Key driver & policy profile factors'
      ]
    }
  ]

  // Determine giveaway sub-sections to render (limit 3 => 2 units)
  const giveawayItems: Array<{
    id: string
    number: string
    badge: string
    icon: any
    title: string
    description?: string
    bullets?: string[]
  }> = (cmsGiveaways && cmsGiveaways.length > 0) 
    ? cmsGiveaways.slice(0, 2).map((item: any, idx: number) => ({
        id: item.id || `cms-g-${idx}`,
        number: `0${idx + 1}`,
        badge: `Giveaway #${idx + 1}`,
        icon: [FileText, Gift][idx % 2],
        title: item.title,
        description: item.description,
        bullets: item.bullets?.map((b: any) => b.bullet) || []
      }))
    : defaultGiveaways

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
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full shadow-sm backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-primary uppercase">
                Exclusive Giveaway Unlocked
              </span>
            </div>

            {/* Main Glassmorphic Hero Container */}
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

                {/* Quick Trust Badges Bridge */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-border/40">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Instant Digital Access</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>100% Free — No Obligation</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    <span>Verified Risk Audit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 1. FORM SECTION (MOVED TO BE ABOVE GIVEAWAYS) */}
          {/* ========================================================================= */}
          <section className="max-w-2xl mx-auto space-y-8 w-full relative z-10" aria-labelledby="quote-form-title">
            <aside aria-labelledby="quote-form-title" className="bg-white dark:bg-card rounded-2xl shadow-2xl shadow-black/5 border border-border p-6 md:p-8">
              
              {form ? (
                <div className="landing-page-form">
                  <div className="text-center mb-6">
                    <h2 id="quote-form-title" className="text-xl font-semibold text-foreground mb-1">
                      {formTitle}
                    </h2>
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
                  <h3 className="text-xl font-bold text-foreground">Request Received</h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you! One of our advisors will be in touch shortly with your personalized assessment.
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
                <>
                  <div className="text-center mb-6">
                    <h2 id="quote-form-title" className="text-xl font-semibold text-foreground mb-1">
                      {formTitle}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {formSubtitle}
                    </p>
                  </div>

                  {/* Tab Switcher: Home or Auto, Business, Life & Income */}
                  <div className="flex rounded-lg bg-muted p-1 mb-6" role="tablist">
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
                            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all",
                            isActive
                              ? "bg-white dark:bg-background text-foreground shadow-sm font-semibold"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </button>
                      )
                    })}
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Name - Merged visually, handled dynamically in submit */}
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          First & Last Name
                        </label>
                        <Input
                          type="text"
                          name="firstName"
                          placeholder="Jane Doe"
                          className="rounded-lg h-11"
                          required
                        />
                      </div>
                      
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="jane@example.com"
                          className="rounded-lg h-11"
                          required
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          Phone
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          placeholder="(555) 123-4567"
                          className="rounded-lg h-11"
                          required
                        />
                      </div>
                    </div>

                    {formStatus === 'error' && (
                      <p className="text-sm text-destructive mt-4 text-center">
                        {errorMessage}
                      </p>
                    )}

                    <Button 
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3 h-12 text-sm font-semibold shadow-md mt-6"
                    >
                      {formStatus === 'loading' ? 'Submitting...' : 'Get a Personalized Assessment'}
                      {formStatus !== 'loading' && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                  </form>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Your information is kept strictly confidential.
                  </p>
                </>
              )}
            </aside>
          </section>

          {/* ========================================================================= */}
          {/* 2. GIVEAWAYS LIST STRUCTURE (MOVED TO BOTTOM) */}
          {/* ========================================================================= */}
          <section className="space-y-8" aria-label="Exclusive Giveaways">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                {lureTitle}
              </h2>
              {lureDescription && (
                <div className="prose prose-sm dark:prose-invert text-muted-foreground max-w-2xl mx-auto">
                  <RichText data={lureDescription} enableGutter={false} />
                </div>
              )}
            </div>

            {/* List Structure with 2 Sub-Sections */}
            <div className="grid gap-6 md:gap-8">
              {giveawayItems.map((item, idx: number) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={item.id || idx}
                    className="relative group bg-card/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      
                      {/* Sub-section Header Badge & Icon - Centered Vertically */}
                      <div className="flex items-center md:flex-col shrink-0 gap-4 md:gap-2 justify-center">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-2.5 py-1 rounded-full">
                          {item.badge}
                        </span>
                      </div>

                      {/* Sub-section Details */}
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                            {item.title}
                          </h3>
                          <span className="text-2xl font-black text-muted-foreground/30 hidden sm:inline-block">
                            {item.number}
                          </span>
                        </div>

                        {/* Bullet Points ("checks" only - description section removed) */}
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                            {item.bullets.map((bulletText: string, bIdx: number) => (
                              <li key={bIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                                <span className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                                  {bulletText}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* First Giveaway: External Link Button */}
                        {idx === 0 && (
                          <div className="pt-3 mt-3">
                            <a href="#" className="inline-block w-full sm:w-auto" target="_blank" rel="noopener noreferrer">
                              <Button className="w-full sm:w-auto shadow-sm gap-2" variant="default">
                                Access Resource <ExternalLink className="w-4 h-4" />
                              </Button>
                            </a>
                          </div>
                        )}

                        {/* Second Giveaway: Hide/Reveal List - Linear Single Column with Rounded Interactive Checkboxes */}
                        {idx === 1 && (
                          <div className="pt-3 mt-3">
                            <details className="group rounded-xl overflow-hidden bg-background/60 hover:bg-background/80 transition-colors">
                              <summary className="p-4 font-semibold text-foreground cursor-pointer list-none flex justify-between items-center outline-none select-none">
                                <span className="flex items-center gap-2">
                                  <BadgeCheck className="w-4 h-4 text-primary" />
                                  View the 11+ Key Factors That Can Lower Your Premium
                                </span>
                                <div className="p-1 rounded-full bg-primary/10 group-open:bg-primary/20 transition-colors">
                                  <ChevronDown className="w-4 h-4 text-primary transition-transform duration-300 group-open:rotate-180" />
                                </div>
                              </summary>
                              <div className="p-4 pt-1 bg-muted/20">
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
                          </div>
                        )}

                      </div>

                    </div>
                  </div>
                )
              })}
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

        </div>
      </div>
    </>
  )
}
