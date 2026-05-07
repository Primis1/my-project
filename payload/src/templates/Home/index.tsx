import React from 'react'
import { HomeHero } from './components/home-hero'
import { StatsBar } from './components/stats-bar'
import { DivisionsSection } from './components/divisions-section'
import { PartnersCarousel } from '@/templates/PersonalLines/components/partners-carousel-wrapper'
import { DifferentiatorsSection } from './components/differentiators-section'
import { CaseExamplesSection } from './components/case-examples-section'
import { NewsGridBlock } from '@/blocks/NewsGrid/Component'
import { HomeCTA } from './components/home-cta'
import { PromotionBlock } from '@/blocks/PromotionBlock/Component'
import type { PromotionBlockType } from '@/payload-types'

export const HomeTemplate: React.FC<{ data?: any; promotion?: PromotionBlockType[] | null }> = ({ data, promotion }) => {
  return (
    <main aria-label="Integrated Insurance Agency — Home">
      <HomeHero data={data} />
      <StatsBar />
      {promotion && promotion.length > 0 && (
        <div className="py-6 px-6 lg:px-8">
          <PromotionBlock {...promotion[0]} />
        </div>
      )}
      <DivisionsSection />
      <PartnersCarousel />
      <DifferentiatorsSection />
      <CaseExamplesSection />
      <NewsGridBlock />
      <HomeCTA />
    </main>
  )
}
