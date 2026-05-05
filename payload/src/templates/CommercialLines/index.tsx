import React from 'react'
import { HeroSection } from './components/hero-section'
import { PartnersCarousel } from '@/templates/PersonalLines/components/partners-carousel-wrapper'
import { CoverageSection } from './components/coverage-section'
import { RiskManagementSection } from './components/risk-management-section'
import { ClientSuccessStories } from './components/client-success-stories'
import { CTASection } from './components/cta-section'
import { FaqBlock } from '@/blocks/FaqBlock/Component'
import { PromotionBlock } from '@/blocks/PromotionBlock/Component'
import type { PromotionBlockType } from '@/payload-types'

export const CommercialLinesTemplate: React.FC<{ data?: any; promotion?: PromotionBlockType[] | null }> = ({ data, promotion }) => {
  return (
    <main aria-label="Commercial Insurance Solutions">
      <HeroSection data={data} />
      {promotion && promotion.length > 0 && (
        <div className="py-6 px-6 lg:px-8">
          <PromotionBlock {...promotion[0]} />
        </div>
      )}
      <PartnersCarousel />
      <CoverageSection />
      <RiskManagementSection />
      <ClientSuccessStories />
      <FaqBlock 
        blockType="faq"
        eyebrow="Commercial Insurance FAQs"
        title="Frequently Asked Questions"
        titleAccent="Questions"
        description="Clear answers about protecting your business, managing risk, and our commercial P&C services."
        faqs={[
          {
            id: "1",
            question: "What coverages are essential for my business?",
            answer: "While it depends on your industry, most businesses need General Liability (GL) and Commercial Property insurance at a minimum. If you have employees, Workers' Compensation is legally required in most states. If you use vehicles for business, Commercial Auto (CA) is necessary. We specialize in these core P&C coverages."
          },
          {
            id: "2",
            question: "Why do I need Umbrella or Cyber insurance if I have GL?",
            answer: "General Liability has limits and specific exclusions. An Umbrella policy provides additional limits above your GL, CA, or Employers Liability policies in case of a catastrophic claim. Cyber insurance is an endorsement or standalone policy that covers data breaches and cyberattacks, which are almost universally excluded from standard GL policies."
          },
          {
            id: "3",
            question: "How do Surety Bonds differ from insurance?",
            answer: "Insurance is a two-party agreement where the insurer pays you for a covered loss. A Surety Bond is a three-party agreement where the surety guarantees to a third party (the obligee) that you (the principal) will fulfill a contract or legal obligation. If you fail to do so, the surety pays the obligee, and you must reimburse the surety."
          },
          {
            id: "4",
            question: "What does your quarterly review process look like?",
            answer: "Unlike many brokers who only speak to you at renewal, we conduct quarterly advisory reviews. We assess any changes in your operations, revenue, payroll, or assets, ensuring your coverage limits remain adequate and helping you implement loss control measures to proactively reduce your risk profile and premiums."
          },
          {
            id: "5",
            question: "How do you assist with commercial claims?",
            answer: "We don't just hand you a 1-800 number. We actively assist in the claims process, helping you document the loss correctly, communicating with the carrier's adjusters, and advocating on your behalf to ensure a fair and timely settlement so you can get back to business."
          },
          {
            id: "6",
            question: "Does Business Interruption coverage require property damage?",
            answer: "Typically, yes. Business Interruption (or Business Income) coverage is usually tied to a covered peril (like a fire) that damages your physical property, forcing you to suspend operations. It helps replace lost income and pay ongoing expenses during the restoration period."
          }
        ]}
      />
      <CTASection />
    </main>
  )
}
