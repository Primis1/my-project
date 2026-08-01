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
  if (!data) return null

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
  } = data

  const shouldHideHeader = hideHeader !== false
  const shouldHideFooter = hideFooter !== false

  // Form State
  const [activeTab, setActiveTab] = useState('home-auto')
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

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
      title: 'Premium & Deductible Optimization Playbook',
      description: 'Proven strategies for optimizing your deductibles and unlocking multi-policy bundling discounts to save significantly on annual premiums.',
      bullets: [
        'Multi-policy bundling discount strategies',
        'Deductible vs. out-of-pocket risk breakdown',
        'Annual rate comparison & review schedule'
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
        <style dangerouslySetInnerHTML={{ __html: `header { display: none !important; }` }} />
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
          {/* TOP CENTERED HIGH IMPACT HERO TEXT */}
          {/* ========================================================================= */}
          <header className="text-center max-w-4xl mx-auto space-y-6 pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full shadow-sm">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                Special Offer Unlocked
              </span>
            </div>

            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-6 md:p-10 rounded-3xl border border-primary/20 shadow-[0_0_40px_-15px_rgba(var(--primary),0.3)] backdrop-blur-sm">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-foreground tracking-tight leading-[1.1] drop-shadow-sm">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  {heroHeading}
                </span>
              </h1>
              
              {heroSubtitle && (
                <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto pt-4 font-medium">
                  {heroSubtitle}
                </p>
              )}
            </div>
          </header>

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
                    className="relative group bg-card/60 backdrop-blur-md border border-border/80 hover:border-primary/40 rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      
                      {/* Sub-section Header Badge & Icon */}
                      <div className="flex items-center md:flex-col shrink-0 gap-4 md:gap-2">
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

                        {item.description && (
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        )}

                        {/* Bullet Points */}
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-border/60">
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
                          <div className="pt-4 mt-4 border-t border-border/40">
                            <a href="#" className="inline-block w-full sm:w-auto" target="_blank" rel="noopener noreferrer">
                              <Button className="w-full sm:w-auto shadow-sm gap-2" variant="default">
                                Access Resource <ExternalLink className="w-4 h-4" />
                              </Button>
                            </a>
                          </div>
                        )}

                        {/* Second Giveaway: Hide/Reveal List */}
                        {idx === 1 && (
                          <div className="pt-4 mt-4 border-t border-border/40">
                            <details className="group border border-border/60 rounded-xl overflow-hidden bg-background/50 hover:border-primary/30 transition-colors">
                              <summary className="p-4 font-semibold text-foreground cursor-pointer list-none flex justify-between items-center outline-none select-none">
                                <span className="flex items-center gap-2">
                                  <BadgeCheck className="w-4 h-4 text-primary" />
                                  View the 11 Key Factors
                                </span>
                                <div className="p-1 rounded-full bg-primary/10 group-open:bg-primary/20 transition-colors">
                                  <ChevronDown className="w-4 h-4 text-primary transition-transform duration-300 group-open:rotate-180" />
                                </div>
                              </summary>
                              <div className="p-4 pt-0 border-t border-border/30 bg-muted/30">
                                <ul className="grid sm:grid-cols-2 gap-3 mt-4 text-sm text-muted-foreground">
                                  {Array.from({ length: 11 }).map((_, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                                        {i + 1}
                                      </span>
                                      <span className="leading-tight">Factor {i + 1}</span>
                                    </li>
                                  ))}
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
