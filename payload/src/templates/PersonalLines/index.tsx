import React from 'react'
import { HeroSection } from './components/hero-section'
import { PartnersCarousel } from './components/partners-carousel-wrapper'
import { CoverageSection } from './components/coverage-section'
import { AnnualReviewSection } from './components/annual-review-section'
import { ClientSuccessStories } from './components/client-success-stories'
import { CTASection } from './components/cta-section'
import { ServiceHero } from './components/service-hero'
import { FaqBlock } from '@/blocks/FaqBlock/Component'
import { PromotionBlock } from '@/blocks/PromotionBlock/Component'
import type { PromotionBlockType } from '@/payload-types'

export const PersonalLinesTemplate: React.FC<{ data?: any; promotion?: PromotionBlockType[] | null }> = ({ data, promotion }) => {
  return (
    <main aria-label="Personal Insurance Solutions">
      <HeroSection data={data} />
      {promotion && promotion.length > 0 && (
        <div className="py-6 px-6 lg:px-8">
          <PromotionBlock {...promotion[0]} />
        </div>
      )}
      <PartnersCarousel />
      <CoverageSection />
      <AnnualReviewSection />
      <ClientSuccessStories />
      <FaqBlock 
        blockType="faq"
        eyebrow="Common Questions"
        title="Frequently Asked Questions"
        titleAccent="Questions"
        description="Clear answers about our process and how we protect your home and vehicles."
        faqs={[
          {
            id: "1",
            question: "How long does it take to get a quote?",
            answer: "We can typically provide personal lines quotes within minutes over the phone, or within a few hours via email. We shop your information across 20+ carriers to ensure we find the best rate before presenting options."
          },
          {
            id: "2",
            question: "What information do you need from me?",
            answer: "For auto insurance, we typically need driver's license numbers, vehicle VINs, and current coverage details. For home insurance, we need the property address, year built, and details on any recent updates (like a new roof or HVAC)."
          },
          {
            id: "3",
            question: "Is it really cheaper to bundle my home and auto insurance?",
            answer: "Yes, almost always. Bundling is the easiest way to save. Most of our carrier partners offer significant multi-line discounts, often saving you up to 20-25% when you combine policies."
          },
          {
            id: "4",
            question: "Do you charge broker fees for your services?",
            answer: "No. Our services are completely free to you. We are paid a standard commission by the insurance company you choose, and your premium is exactly the same as if you went to them directly—but you get our unbiased advice and support."
          },
          {
            id: "5",
            question: "What happens if I need to make a claim?",
            answer: "When you have a claim, you can contact the carrier directly via their 24/7 claims line, or call us first. We are here to help you navigate the process, document the loss, and advocate on your behalf for a fair settlement."
          },
          {
            id: "6",
            question: "Will you check my rates again next year?",
            answer: "Absolutely. We conduct an annual review of your policies before renewal. If your current carrier takes a large rate increase, we will automatically re-shop your profile across our other partners to keep your costs down."
          }
        ]}
      />
      <CTASection />
    </main>
  )
}
