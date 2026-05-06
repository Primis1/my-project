import React from 'react'
import { HomeHero } from './components/home-hero'
import { DivisionsSection } from './components/divisions-section'
import { WhyUsSection } from './components/why-us-section'
import { PartnersCarousel } from '@/templates/PersonalLines/components/partners-carousel-wrapper'
import { HomeCTA } from './components/home-cta'
import { PromotionBlock } from '@/blocks/PromotionBlock/Component'
import type { PromotionBlockType } from '@/payload-types'

export const HomeTemplate: React.FC<{ data?: any; promotion?: PromotionBlockType[] | null }> = ({ data, promotion }) => {
  return (
    <main aria-label="Integrated Insurance Agency — Home">
      <HomeHero data={data} />
      {promotion && promotion.length > 0 && (
        <div className="py-6 px-6 lg:px-8">
          <PromotionBlock {...promotion[0]} />
        </div>
      )}
      <DivisionsSection />
      <PartnersCarousel />
      <WhyUsSection />
      <HomeCTA />
    </main>
  )
}
