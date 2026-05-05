import React from 'react'
import { HeroSection } from './components/hero-section'
import { PartnersCarousel } from '@/templates/PersonalLines/components/partners-carousel-wrapper'
import { CoverageSection } from './components/coverage-section'
import { AdvisorySection } from './components/advisory-section'
import { ClientSuccessStories } from './components/client-success-stories'
import { CTASection } from './components/cta-section'
import { FaqBlock } from '@/blocks/FaqBlock/Component'
import { PromotionBlock } from '@/blocks/PromotionBlock/Component'
import type { PromotionBlockType } from '@/payload-types'

export const LifeIncomeTemplate: React.FC<{ data?: any; promotion?: PromotionBlockType[] | null }> = ({ data, promotion }) => {
  return (
    <main aria-label="Life & Income Insurance Solutions">
      <HeroSection data={data} />
      {promotion && promotion.length > 0 && (
        <div className="py-6 px-6 lg:px-8">
          <PromotionBlock {...promotion[0]} />
        </div>
      )}
      <PartnersCarousel />
      <CoverageSection />
      <AdvisorySection />
      <ClientSuccessStories />
      <FaqBlock 
        blockType="faq"
        eyebrow="Life & Income FAQs"
        title="Frequently Asked Questions"
        titleAccent="Questions"
        description="Clear answers about life insurance, income protection, and how we help you plan for what matters most."
        faqs={[
          {
            id: "1",
            question: "How much life insurance do I actually need?",
            answer: "A common rule of thumb is 10-12x your annual income, but the real answer depends on your debts, dependents, future obligations (like college), and existing assets. We conduct a personalized needs analysis that factors in all of these to determine the right amount — not a generic estimate."
          },
          {
            id: "2",
            question: "What is income replacement insurance and why do I need it?",
            answer: "Income replacement (disability income) insurance replaces a portion of your earnings — typically 60-70% — if you're unable to work due to injury. By default, most policies cover injury only. We strongly recommend adding a sickness rider to extend coverage to illness, which is statistically the more common cause of long-term disability."
          },
          {
            id: "3",
            question: "What's the difference between term and permanent life insurance?",
            answer: "Term life provides coverage for a specific period (10, 20, or 30 years) at a low, fixed premium — ideal for temporary needs like mortgage protection. Permanent life (whole life or universal life) lasts your entire lifetime and builds cash value that can be used for retirement income, policy loans, or estate planning. We help you determine which — or which combination — fits your situation."
          },
          {
            id: "4",
            question: "Can I use whole life insurance as an investment?",
            answer: "Yes. The cash value component of permanent life insurance grows on a tax-advantaged basis. Over time, it can be accessed through policy loans and withdrawals for retirement income, education funding, or emergency reserves. We specialize in optimizing this investment side alongside the protection component."
          },
          {
            id: "5",
            question: "Do you offer group health benefits for my employees?",
            answer: "Absolutely. We design and place group benefit packages including life, disability, dental, extended health, and Health Spending Accounts (HSA) for businesses of all sizes. Group plans can also be a powerful recruitment and retention tool for your organization."
          },
          {
            id: "6",
            question: "When should I review my life insurance coverage?",
            answer: "We use a life-event triggered approach rather than just annual renewals. Marriage, the birth of a child, a career change, a home purchase, or approaching retirement are all moments when your coverage should be reassessed. Of course, we also conduct an annual check-in to ensure everything remains current."
          }
        ]}
      />
      <CTASection />
    </main>
  )
}
