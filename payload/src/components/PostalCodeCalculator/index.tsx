"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Calculator, 
  CheckCircle2, 
  Info,
  Car,
  Scale,
  X,
  FileText
} from 'lucide-react'
import { cn } from '@/utilities/ui'
import postalCodeDataRaw from '@/data/postalCodeData.json'

interface PremiumInfo {
  mandatory: number
  higherEnd: number
}

const postalCodeData = postalCodeDataRaw as Record<string, PremiumInfo>

interface PostalCodeCalculatorProps {
  onQuoteRequested?: (postalCode: string) => void
  badge?: string
  number?: string
  locale?: 'uk' | 'en'
}

export const PostalCodeCalculator: React.FC<PostalCodeCalculatorProps> = ({ 
  onQuoteRequested,
  badge,
  number = '01',
  locale = 'uk'
}) => {
  const [postalInput, setPostalInput] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isEn = locale === 'en'

  const t = isEn ? {
    badgeDefault: 'Giveaway #1',
    title: 'How Your Postal Code Impacts Auto Insurance Costs',
    subtitle: (
      <>
        Where you live is a key factor in calculating your rate — reflecting local collision statistics, traffic density, and theft risks in your neighborhood. Enter the first 3 characters of your postal code (e.g., <span className="font-semibold text-foreground">M5A</span>, <span className="font-semibold text-foreground">K0B</span>, <span className="font-semibold text-foreground">L4T</span>) to see the average premium level for your area.
      </>
    ),
    inputPlaceholder: 'e.g. M5V',
    inputAria: 'Enter 3-character postal code',
    card1Title: 'Mandatory Coverage',
    card1Tag: 'Basic',
    card1Desc: 'Liability & standard injury protection (legal minimum).',
    perYear: '/ year',
    perMonthSuffix: ' / month',
    card1Bottom: (code: string) => `Average rate for area ${code}`,
    card2Badge: 'Mandatory for Car Loans',
    card2Title: 'Comprehensive Coverage',
    card2Desc: 'Full protection: collision, theft, weather, vandalism & vehicle damage.',
    card2BottomLeft: 'Maximum Protection',
    card2BottomRight: 'Most Popular Choice',
    btnGetQuote: (code: string) => `Get Exact Quote for Area ${code}`,
    disclaimerFootnote: (code: string) => `*Displayed premiums reflect the average contribution of your geographic area (${code}) to the final insurance rate calculation.`,
    modalTrigger: 'Legal Info & OGL License',
    inputInfoEmpty: 'Enter 3 characters for automatic calculation',
    sourceLinkEmpty: 'Data Source (FSRA) & Legal Information',
    notFoundTitle: (code: string) => `Postal code "${code}" not found`,
    notFoundDesc: 'Please check the correctness of the 3-character Ontario postal code (e.g., M5V, K0B, L4T).',
    modalTitle: 'Data Source & Legal Information',
    modalSub: 'Under the terms of the Open Government Licence – Ontario',
    modalSec1Title: '1. Open Government Data Usage (Attribution & Licence)',
    modalSec1Body: 'This calculator uses publicly available statistical data regarding average auto insurance premiums in Ontario, sourced from information materials published by the Financial Services Regulatory Authority of Ontario (FSRA).',
    modalSec1Italic: '*Contains information licensed under the Open Government Licence – Ontario.',
    modalSec2Title: '2. Disclaimer of Endorsement',
    modalSec2Body: 'This licence and data usage do not imply that FSRA or the Government of Ontario endorse, support, or guarantee the services of this website or insurance broker.',
    modalSec3Title: '3. Non-Binding Estimate Notice',
    modalSec3Body: 'All displayed amounts are statistical averages for the corresponding postal code (FSA) and serve strictly for informational purposes. They do not constitute an official or binding insurance offer. Final premiums are calculated individually by an insurer underwriter based on your driving history, vehicle make/model, coverage choices, and other factors.',
    modalCloseBtn: 'Understood'
  } : {
    badgeDefault: 'Подарунок #1',
    title: 'Як ваш поштовий індекс впливає на вартість автострахування',
    subtitle: (
      <>
        Ваше місце проживання є одним із ключових факторів у розрахунку тарифу — воно відображає локальну статистику ДТП, інтенсивність руху та ризики крадіжок у вашому районі. Введіть перші 3 символи поштового індексу (наприклад, <span className="font-semibold text-foreground">M5A</span>, <span className="font-semibold text-foreground">K0B</span>, <span className="font-semibold text-foreground">L4T</span>), щоб дізнатися середній рівень премії для вашої території.
      </>
    ),
    inputPlaceholder: 'Наприклад: M5V',
    inputAria: 'Введіть 3 символи поштового індексу',
    card1Title: "Обов'язкове покриття",
    card1Tag: 'Базове',
    card1Desc: "Цивільна відповідальність та стандартний захист від травм (мінімум за законом).",
    perYear: '/ рік',
    perMonthSuffix: ' / місяць',
    card1Bottom: (code: string) => `Середній тариф для району ${code}`,
    card2Badge: "Обов'язково при автокредитуванні",
    card2Title: 'Розширене покриття',
    card2Desc: 'Повний захист: ДТП, крадіжка, стихійні лиха, вандалізм та пошкодження авто.',
    card2BottomLeft: 'Максимальний захист',
    card2BottomRight: 'Найпопулярніший вибір',
    btnGetQuote: (code: string) => `Отримати точну ціну для району ${code}`,
    disclaimerFootnote: (code: string) => `*Вказані премії відображають середній внесок географічного району (${code}) у підсумковий розрахунок страхового тарифу.`,
    modalTrigger: 'Правова інформація та ліцензія OGL',
    inputInfoEmpty: 'Введіть 3 символи для автоматичного розрахунку',
    sourceLinkEmpty: 'Джерело даних (FSRA) та правова інформація',
    notFoundTitle: (code: string) => `Індекс "${code}" не знайдено`,
    notFoundDesc: 'Будь ласка, перевірте правильність 3-значного поштового індексу Онтаріо (наприклад, M5V, K0B, L4T).',
    modalTitle: 'Джерело даних та Правова інформація',
    modalSub: 'Відповідно до умов Open Government Licence – Ontario',
    modalSec1Title: '1. Використання відкритих урядових даних (Attribution & Licence)',
    modalSec1Body: 'Цей калькулятор використовує публічно доступні статистичні дані про середні премії автострахування в Онтаріо, отримані з інформаційних матеріалів Управління з регулювання фінансових послуг Онтаріо (Financial Services Regulatory Authority of Ontario — FSRA).',
    modalSec1Italic: '*Містить інформацію, ліцензовану за урядовою ліцензією Open Government Licence – Ontario.',
    modalSec2Title: '2. Відсутність офіційного схвалення (Disclaimer of Endorsement)',
    modalSec2Body: 'Ця ліцензія та використання відкритих даних не означають, що Управління FSRA або Уряд Онтаріо схвалюють, підтримують чи гарантують послуги даного веб-сайту чи страхового брокера.',
    modalSec3Title: '3. Інформаційний характер та підсумковий розрахунок (Non-Binding Notice)',
    modalSec3Body: 'Усі відображені суми є середньостатистичними орієнтовними показниками для відповідного поштового індексу (FSA) і не є офіційною або зобов\'язуючою страховою пропозицією. Остаточна вартість страхового полісу розраховується індивідуально андеррайтером страхової компанії на основі вашої особистої історії водіння, марки та моделі авто, обраного ліміту покриття та інших факторів.',
    modalCloseBtn: 'Зрозуміло'
  }

  const badgeText = badge || t.badgeDefault

  const cleanInput = postalInput.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 3)
  const resultData = cleanInput.length === 3 ? postalCodeData[cleanInput] : null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 3)
    setPostalInput(val)
    if (val.length === 3) {
      setHasSearched(true)
    }
  }

  const handleGetExactQuote = () => {
    if (onQuoteRequested && cleanInput) {
      onQuoteRequested(cleanInput)
    }
    const formElement = document.getElementById('quote-form-section')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto relative group">
      {/* Background Ambient Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />

      {/* Main Glassmorphic Container */}
      <div className="relative bg-card/90 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-6">
        
        {/* Giveaway Header Badge */}
        <div className="flex items-center justify-between border-b border-border/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-3 py-1 rounded-full">
              {badgeText}
            </span>
          </div>
          {number && (
            <span className="text-2xl font-black text-muted-foreground/30">
              {number}
            </span>
          )}
        </div>

        {/* Header Title & Subtitle */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {t.title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Input Control */}
        <div className="max-w-md mx-auto relative">
          <div className="relative flex items-center">
            <div className="absolute left-4 text-muted-foreground pointer-events-none">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <Input
              type="text"
              value={postalInput}
              onChange={handleInputChange}
              placeholder={t.inputPlaceholder}
              maxLength={3}
              className="pl-12 pr-16 h-14 text-lg font-bold tracking-wider uppercase rounded-2xl border-2 border-primary/30 focus-visible:border-primary shadow-inner bg-background/80"
              aria-label={t.inputAria}
            />
            <div className="absolute right-3 px-2.5 py-1 bg-muted rounded-lg text-xs font-semibold text-muted-foreground">
              {cleanInput.length}/3
            </div>
          </div>
        </div>

        {/* Result Cards Display */}
        {cleanInput.length === 3 ? (
          resultData ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
                
                {/* Card 1: Mandatory / Basic Coverage */}
                <div className="relative bg-background/70 border border-border/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                        <ShieldCheck className="w-5 h-5" />
                        <span>{t.card1Title}</span>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-muted font-medium text-muted-foreground">
                        {t.card1Tag}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t.card1Desc}
                    </p>

                    {/* Price Figures */}
                    <div className="pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-foreground">
                          ${resultData.mandatory.toLocaleString()}
                        </span>
                        <span className="text-sm font-semibold text-muted-foreground">
                          {t.perYear}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-primary mt-1">
                        ~${Math.round(resultData.mandatory / 12).toLocaleString()}{t.perMonthSuffix}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/40 text-xs text-muted-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{t.card1Bottom(cleanInput)}</span>
                  </div>
                </div>

                {/* Card 2: Higher-End / Comprehensive Coverage */}
                <div className="relative bg-gradient-to-br from-primary/5 via-card to-card border-2 border-primary/40 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
                  {/* User Requested Badge: "Mandatory for Car Loans" */}
                  <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md tracking-tight uppercase flex items-center gap-1">
                    <Car className="w-3.5 h-3.5" />
                    <span>{t.card2Badge}</span>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <span>{t.card2Title}</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t.card2Desc}
                    </p>

                    {/* Price Figures */}
                    <div className="pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-foreground">
                          ${resultData.higherEnd.toLocaleString()}
                        </span>
                        <span className="text-sm font-semibold text-muted-foreground">
                          {t.perYear}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-primary mt-1">
                        ~${Math.round(resultData.higherEnd / 12).toLocaleString()}{t.perMonthSuffix}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/40 text-xs text-muted-foreground flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{t.card2BottomLeft}</span>
                    </span>
                    <span className="font-semibold text-primary">{t.card2BottomRight}</span>
                  </div>
                </div>

              </div>

              {/* Action Button to scroll & pre-fill form */}
              <div className="text-center pt-2 space-y-2">
                <Button
                  onClick={handleGetExactQuote}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-base font-bold shadow-lg transition-transform active:scale-95"
                >
                  {t.btnGetQuote(cleanInput)}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-xs text-muted-foreground">
                  {t.disclaimerFootnote(cleanInput)}{' '}
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="underline font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{t.modalTrigger}</span>
                    <Scale className="w-3.5 h-3.5" />
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-center space-y-2 animate-in fade-in">
              <div className="inline-flex items-center gap-1.5 text-destructive font-semibold text-sm">
                <Info className="w-4 h-4" />
                <span>{t.notFoundTitle(cleanInput)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t.notFoundDesc}
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-2 space-y-2">
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
              <Info className="w-4 h-4 text-primary/70" />
              <span>{t.inputInfoEmpty}</span>
            </div>
            <button 
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-xs text-muted-foreground hover:text-primary underline transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5 text-primary" />
              <span>{t.sourceLinkEmpty}</span>
            </button>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* LEGAL DISCLAIMER & OPEN GOVERNMENT LICENCE MODAL */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl bg-card border border-primary/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
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
                <h3 id="legal-modal-title" className="text-lg sm:text-xl font-extrabold text-foreground">
                  {t.modalTitle}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {t.modalSub}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              
              {/* Section 1: Licence & Attribution */}
              <div className="p-4 rounded-2xl bg-background/80 border border-border/60 space-y-2">
                <h4 className="font-bold text-foreground flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <span>{t.modalSec1Title}</span>
                </h4>
                <p>
                  {t.modalSec1Body}
                </p>
                <p className="text-xs text-primary/90 font-medium italic">
                  {t.modalSec1Italic}
                </p>
              </div>

              {/* Section 2: Non-Endorsement */}
              <div className="p-4 rounded-2xl bg-background/80 border border-border/60 space-y-2">
                <h4 className="font-bold text-foreground flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>{t.modalSec2Title}</span>
                </h4>
                <p>
                  {t.modalSec2Body}
                </p>
              </div>

              {/* Section 3: Non-Binding Estimate & E&O Protection */}
              <div className="p-4 rounded-2xl bg-background/80 border border-border/60 space-y-2">
                <h4 className="font-bold text-foreground flex items-center gap-2 text-sm">
                  <Info className="w-4 h-4 text-primary shrink-0" />
                  <span>{t.modalSec3Title}</span>
                </h4>
                <p>
                  {t.modalSec3Body}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-border/40 flex justify-end">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full px-6 bg-primary text-primary-foreground font-semibold"
              >
                {t.modalCloseBtn}
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

