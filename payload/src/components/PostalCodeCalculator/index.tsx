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
  Car
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
}

export const PostalCodeCalculator: React.FC<PostalCodeCalculatorProps> = ({ 
  onQuoteRequested,
  badge = 'Подарунок #1',
  number = '01'
}) => {
  const [postalInput, setPostalInput] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

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
              {badge}
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
            Як ваш поштовий індекс впливає на вартість автострахування
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Ваше місце проживання є одним із ключових факторів у розрахунку тарифу — воно відображає локальну статистику ДТП, інтенсивність руху та ризики крадіжок у вашому районі. Введіть перші 3 символи поштового індексу (наприклад, <span className="font-semibold text-foreground">M5A</span>, <span className="font-semibold text-foreground">K0B</span>, <span className="font-semibold text-foreground">L4T</span>), щоб дізнатися середній рівень премії для вашої території.
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
              placeholder="Наприклад: M5V"
              maxLength={3}
              className="pl-12 pr-16 h-14 text-lg font-bold tracking-wider uppercase rounded-2xl border-2 border-primary/30 focus-visible:border-primary shadow-inner bg-background/80"
              aria-label="Введіть 3 символи поштового індексу"
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
                        <span>Обов'язкове покриття</span>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-muted font-medium text-muted-foreground">
                        Базове
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Цивільна відповідальність та стандартний захист від травм (мінімум за законом).
                    </p>

                    {/* Price Figures */}
                    <div className="pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-foreground">
                          ${resultData.mandatory.toLocaleString()}
                        </span>
                        <span className="text-sm font-semibold text-muted-foreground">
                          / рік
                        </span>
                      </div>
                      <p className="text-xs font-medium text-primary mt-1">
                        ~${Math.round(resultData.mandatory / 12).toLocaleString()} / місяць
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/40 text-xs text-muted-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Середній тариф для району {cleanInput}</span>
                  </div>
                </div>

                {/* Card 2: Higher-End / Comprehensive Coverage */}
                <div className="relative bg-gradient-to-br from-primary/5 via-card to-card border-2 border-primary/40 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
                  {/* User Requested Badge: "Обов'язково при автокредитуванні" */}
                  <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md tracking-tight uppercase flex items-center gap-1">
                    <Car className="w-3.5 h-3.5" />
                    <span>Обов'язково при автокредитуванні</span>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <span>Розширене покриття</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Повний захист: ДТП, крадіжка, стихійні лиха, вандалізм та пошкодження авто.
                    </p>

                    {/* Price Figures */}
                    <div className="pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-foreground">
                          ${resultData.higherEnd.toLocaleString()}
                        </span>
                        <span className="text-sm font-semibold text-muted-foreground">
                          / рік
                        </span>
                      </div>
                      <p className="text-xs font-medium text-primary mt-1">
                        ~${Math.round(resultData.higherEnd / 12).toLocaleString()} / місяць
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/40 text-xs text-muted-foreground flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Максимальний захист</span>
                    </span>
                    <span className="font-semibold text-primary">Найпопулярніший вибір</span>
                  </div>
                </div>

              </div>

              {/* Action Button to scroll & pre-fill form */}
              <div className="text-center pt-2">
                <Button
                  onClick={handleGetExactQuote}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-base font-bold shadow-lg transition-transform active:scale-95"
                >
                  Отримати точну ціну для району {cleanInput}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  *Вказані премії відображають середній внесок географічного району ({cleanInput}) у підсумковий розрахунок страхового тарифу.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-center space-y-2 animate-in fade-in">
              <div className="inline-flex items-center gap-1.5 text-destructive font-semibold text-sm">
                <Info className="w-4 h-4" />
                <span>Індекс "{cleanInput}" не знайдено</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Будь ласка, перевірте правильність 3-значного поштового індексу Онтаріо (наприклад, M5V, K0B, L4T).
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-2 text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <Info className="w-4 h-4 text-primary/70" />
            <span>Введіть 3 символи для автоматичного розрахунку</span>
          </div>
        )}

      </div>
    </div>
  )
}
