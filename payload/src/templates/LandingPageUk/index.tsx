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

export const LandingPageUkTemplate: React.FC<{ data?: any }> = ({ data }) => {
  const pageData = data || {}

  const {
    heroHeading = 'Thank You',
    heroSubtitle = 'We appreciate your interest! Review your 2 free giveaways below and submit your request for instant access.',
    lureTitle = 'Your 2 Free Giveaways',
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
    { id: 'home-auto', label: 'Авто та Житло', icon: Home },
    { id: 'business', label: 'Бізнес', icon: Building2 },
    { id: 'life-income', label: 'Життя та Дохід', icon: Heart },
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
      postalCode: (formData.get('postalCode') as string) || selectedPostalCode,
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

  // 11+ Factors That Influence Your Premium Calculation
  const premiumFactors = [
    { title: "Історія водіння (Driving History)", desc: "безаварійний стаж за останні 3–10 років надає найбільший позитивний внесок у розрахунок вашої премії." },
    { title: "Вік та стаж (Age & Experience)", desc: "водії з досвідом понад 9 років та віком від 25 років отримують суттєво нижчі базові коефіцієнти ризику." },
    { title: "Сімейний стан (Marital Status)", desc: "статистично зменшує коефіцієнт ризику в багатьох страхових компаніях Онтаріо." },
    { title: "Місце проживання (Location & FSA)", desc: "відображає щільність руху, статистику ДТП та рівень крадіжок у вашому районі." },
    { title: "Річний пробіг (Annual Mileage)", desc: "менша кількість кілометрів на рік пропорційно знижує ймовірність настання страхового випадку." },
    { title: "Маршрут на роботу (Commute Usage)", desc: "використання авто тільки для особистих потреб (без щоденного commute) дає нижчий тарифний клас." },
    { title: "Рейтинг автомобіля (CLEAR Rating)", desc: "моделі з високими показниками безпеки та низькою вартістю ремонту потребують менших витрат на покриття." },
    { title: "Зимові шини (Winter Tires Discount)", desc: "обов'язкова за законом Онтаріо знижка (близько 2-5%) при сезонному використанні зимової гуми." },
    { title: "Протиугінна система (Anti-Theft Devices)", desc: "наявність іммобілайзера або супутникового трекера зменшує внесок ризику крадіжки у вартість Comprehensive." },
    { title: "Професія та освіта (Group Affiliation)", desc: "членство у професійних асоціаціях або випускних спілках відкриває додаткові групові знижки." },
    { title: "Розмір франшизи (Deductible Amount)", desc: "вибір вищої франшизи (наприклад, $1,000 замість $500) зменшує щомісячну премію." },
    { title: "Комерційне використання (Business Use)", desc: "коригує категорію полісу залежно від того, чи використовується авто для бізнесу або кур'єрських послуг." },
    { title: "Мультиполісна знижка (Bundle Discount)", desc: "поєднання страхування авто з будинком чи орендою дає від 10% до 20% загальної економії." },
  ]

  // Construct 2 default giveaway sub-sections if not populated from CMS
  const defaultGiveaways = [
    {
      id: 'g1',
      number: '01',
      badge: 'Подарунок #1',
      icon: FileText,
      title: 'Як оцінюються автомобілі (IBC Car Rater)',
      description: 'Дізнайтеся, як страхові компанії оцінюють різні транспортні засоби. Подивіться, як історія претензій, функції безпеки та рівень крадіжок вашого автомобіля безпосередньо впливають на ваші страхові премії.',
      bullets: [
        'Перевірте страховий рейтинг вашого авто',
        'Порівняйте статистику безпеки та крадіжок',
        'Зрозумійте, як вибір авто впливає на тариф'
      ]
    },
    {
      id: 'g2',
      number: '02',
      badge: 'Подарунок #2',
      icon: Gift,
      title: '11+ факторів, які можуть вплинути на ціну автострахування',
      description: 'Дізнайтеся про ключові фактори, які страховики враховують при розрахунку вашого тарифу, і як ви можете оптимізувати свій профіль для максимальної економії.',
      bullets: [
        'Чек-лист зниження премії',
        'Дієві можливості для знижок',
        'Ключові фактори профілю водія та полісу'
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
        badge: `Подарунок #${idx + 1}`,
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
                
                {/* Secondary text */}
                <p className="text-md sm:text-lg text-muted-foreground italic max-w-3xl mx-auto mt-2">
                  Oleh Babinskyi
                </p>

                {/* Quick Trust Badges Bridge */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-border/40">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    <Home className="w-3.5 h-3.5" />
                    <span>Авто та Житло</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Бізнес та Відповідальність</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    <Heart className="w-3.5 h-3.5" />
                    <span>Життя та Дохід</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* GIVEAWAYS & QUOTE REQUEST SECTION */}
          {/* ========================================================================= */}
          <section className="space-y-12" aria-label="Exclusive Giveaways and Quote Form">
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

            <div className="grid gap-8 max-w-4xl mx-auto">

              {/* ========================================================================= */}
              {/* GIVEAWAY #1: POSTAL CODE MEDIUM PREMIUM CALCULATOR */}
              {/* ========================================================================= */}
              <div id="giveaway-1">
                <PostalCodeCalculator 
                  badge="Подарунок #1" 
                  number="01" 
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
                      Подарунок #2
                    </span>
                  </div>
                  <span className="text-2xl font-black text-muted-foreground/30">
                    02
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                    Як 11+ факторів формують підсумкову вартість автострахування
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Кожен з цих параметрів має свій ваговий коефіцієнт у формулі розрахунку тарифу страхової компанії. Дізнайтеся, як саме окремі елементи вашого профілю впливають на премію та які з них ви можете оптимізувати для максимальної економії.
                  </p>

                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                        Чек-лист зниження премії
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                        Дієві можливості для знижок
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                        Ключові фактори профілю водія та полісу
                      </span>
                    </li>
                  </ul>

                  {/* Hide/Reveal List - Interactive Checkboxes */}
                  <div className="pt-2">
                    <details className="group rounded-2xl overflow-hidden bg-background/70 border border-border/60 hover:border-primary/40 transition-colors">
                      <summary className="p-4 font-semibold text-foreground cursor-pointer list-none flex justify-between items-center outline-none select-none">
                        <span className="flex items-center gap-2 text-sm">
                          <BadgeCheck className="w-4 h-4 text-primary" />
                          Переглянути 11+ ключових факторів, які впливають на ваш тариф
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
                      *Всі актуарні коефіцієнти розраховуються за затвердженими FSRA правилами.{' '}
                      <button 
                        type="button"
                        onClick={() => setIsFactorsModalOpen(true)}
                        className="underline font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Правова інформація та оцінка факторів (FSRA)</span>
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
                      Подарунок #3
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
                    <h3 className="text-2xl font-bold text-foreground">Запит отримано</h3>
                    <p className="text-sm text-muted-foreground">
                      Дякуємо! Один з наших консультантів незабаром зв'яжеться з вами щодо вашої персональної оцінки.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setFormStatus('idle')}
                      className="mt-4"
                    >
                      Надіслати ще один запит
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center space-y-1">
                      <h3 id="quote-form-title" className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                        Персональна оцінка та розрахунок полісу
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formSubtitle}
                      </p>
                    </div>

                    {/* Tab Switcher: Home or Auto, Business, Life & Income */}
                    <div className="flex rounded-xl bg-muted/60 p-1" role="tablist">
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
                              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all",
                              isActive
                                ? "bg-background text-foreground shadow-sm font-semibold"
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
                        {/* Name */}
                        <div className="col-span-2">
                          <label className="block text-xs font-semibold text-foreground mb-1.5">
                            Ім'я та Прізвище
                          </label>
                          <Input
                            type="text"
                            name="firstName"
                            placeholder="Taras Shevchenko"
                            className="rounded-xl h-12 bg-background/80"
                            required
                          />
                        </div>

                        {/* Postal Code Field */}
                        <div className="col-span-2">
                          <label className="block text-xs font-semibold text-foreground mb-1.5">
                            Поштовий індекс (Перші 3 символи)
                          </label>
                          <Input
                            type="text"
                            name="postalCode"
                            value={selectedPostalCode}
                            onChange={(e) => setSelectedPostalCode(e.target.value.toUpperCase().slice(0, 3))}
                            placeholder="M5A"
                            maxLength={3}
                            className="rounded-xl h-12 uppercase font-semibold tracking-wider bg-background/80"
                          />
                        </div>
                        
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-semibold text-foreground mb-1.5">
                            Електронна пошта
                          </label>
                          <Input
                            type="email"
                            name="email"
                            placeholder="taras@example.com"
                            className="rounded-xl h-12 bg-background/80"
                            required
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-semibold text-foreground mb-1.5">
                            Телефон
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

                      {formStatus === 'error' && (
                        <p className="text-sm text-destructive mt-4 text-center">
                          {errorMessage}
                        </p>
                      )}

                      <Button 
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3 h-13 text-base font-bold shadow-lg mt-4"
                      >
                        {formStatus === 'loading' ? 'Надсилання...' : 'Отримати персональну оцінку'}
                        {formStatus !== 'loading' && <ArrowRight className="w-5 h-5 ml-2" />}
                      </Button>
                    </form>

                    <p className="text-xs text-muted-foreground text-center">
                      Ваша інформація є суворо конфіденційною.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Fallback Bullet list (if any) */}
            {(!cmsGiveaways || cmsGiveaways.length === 0) && lureBulletPoints && lureBulletPoints.length > 0 && (
              <div className="bg-card/40 border border-border/80 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow max-w-4xl mx-auto">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Додаткові переваги
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
              locale="uk"
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
              aria-label="Закрити"
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
                  Правила оцінки факторів та регулювання FSRA
                </h3>
                <p className="text-xs text-muted-foreground">
                  Правова інформація щодо андеррайтингу в Онтаріо
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              
              {/* Section 1 */}
              <div className="p-4 rounded-2xl bg-background/80 border border-border/60 space-y-2">
                <h4 className="font-bold text-foreground flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <span>1. Законодавче регулювання факторів (FSRA & Insurance Act)</span>
                </h4>
                <p>
                  В Онтаріо всі коефіцієнти оцінки ризику (вік, стаж, історія водіння, територія, класифікація авто тощо) регулюються Управлінням з регулювання фінансових послуг Онтаріо (FSRA) відповідно до Закону про страхування (Insurance Act). Страхові компанії мають право використовувати тільки затверджені регулятором актуарні правила.
                </p>
              </div>

              {/* Section 2 */}
              <div className="p-4 rounded-2xl bg-background/80 border border-border/60 space-y-2">
                <h4 className="font-bold text-foreground flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>2. Варіативність вагових коефіцієнтів (Carrier Algorithm Variation)</span>
                </h4>
                <p>
                  Кожна страхова компанія застосовує власну тарифну сітку. Вплив та відсоток знижки для кожного фактора (наприклад, франшиза, зимові шини, мультиполіс чи протиугінна система) відрізняються залежно від конкретного страховика та його андеррайтингових алгоритмів.
                </p>
              </div>

              {/* Section 3 */}
              <div className="p-4 rounded-2xl bg-background/80 border border-border/60 space-y-2">
                <h4 className="font-bold text-foreground flex items-center gap-2 text-sm">
                  <Info className="w-4 h-4 text-primary shrink-0" />
                  <span>3. Ознайомчий чек-лист (Educational & Optimization Purpose)</span>
                </h4>
                <p>
                  Перераховані 11+ факторів є загальними орієнтовними орієнтирами для оптимізації вашого страхового профілю. Вони не гарантують автоматичного надання фіксованої знижки у кожній компанії. Точний розрахунок проводиться брокером індивідуально.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-border/40 flex justify-end">
              <Button
                onClick={() => setIsFactorsModalOpen(false)}
                className="rounded-full px-6 bg-primary text-primary-foreground font-semibold"
              >
                Зрозуміло
              </Button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
