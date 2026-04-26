import React from 'react'
import {
  Shield,
  Building,
  TrendingUp,
  Lock,
  Users,
  Star,
  BarChart,
  CheckCircle,
  Scale,
  Briefcase,
  Heart,
} from 'lucide-react'
import { cn } from '@/utilities/ui'
import type { FeatureCardsBlock as FeatureCardsBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'

// ─── Icon map ─────────────────────────────────────────────────────
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  shield: ({ className }) => <Shield className={className} />,
  building: ({ className }) => <Building className={className} />,
  'trending-up': ({ className }) => <TrendingUp className={className} />,
  lock: ({ className }) => <Lock className={className} />,
  users: ({ className }) => <Users className={className} />,
  star: ({ className }) => <Star className={className} />,
  'bar-chart': ({ className }) => <BarChart className={className} />,
  'check-circle': ({ className }) => <CheckCircle className={className} />,
  scale: ({ className }) => <Scale className={className} />,
  briefcase: ({ className }) => <Briefcase className={className} />,
  heart: ({ className }) => <Heart className={className} />,
}

export const FeatureCardsBlock: React.FC<FeatureCardsBlockProps> = ({
  eyebrow,
  heading,
  cards,
}) => {
  if (!cards || cards.length === 0) return null

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-6">
        {/* Header Section - Centered */}
        <div className="mb-16 text-center">
          {eyebrow && (
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-[1px] w-8 bg-gold/50 flex-shrink-0" />
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-gold">
                {eyebrow}
              </span>
              <span className="h-[1px] w-8 bg-gold/50 flex-shrink-0" />
            </div>
          )}
          {heading && (
            <h2 className="font-serif text-4xl lg:text-5xl font-normal text-foreground leading-tight">
              {heading}
            </h2>
          )}
        </div>

        {/* Feature Cards Grid - Rounded & Centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card: NonNullable<FeatureCardsBlockProps['cards']>[number], i: number) => {
            const IconComponent = iconMap[card.icon ?? 'shield']
            return (
              <div
                key={i}
                className="relative flex flex-col items-center text-center gap-6 p-8 rounded-xl border border-border bg-white hover:border-brand/20 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Optional Badge */}
                {card.badge && (
                  <div className="absolute top-4 right-4 capitalize">
                    <span className="inline-flex items-center rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">
                      {card.badge}
                    </span>
                  </div>
                )}
                
                {/* Icon Container - Circular */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted/30 transition-colors duration-500 group-hover:bg-brand/10">
                  {IconComponent && (
                    <IconComponent className="h-6 w-6 text-brand transition-colors duration-500" />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-serif text-xl font-normal text-foreground leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>

                  {/* Bullet Points */}
                  {card.bulletins && card.bulletins.length > 0 && (
                    <div className="flex flex-col gap-2.5 mt-2 text-left">
                      {card.bulletins.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-left">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2} />
                          <span className="text-sm text-foreground/90">{bullet.item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Optional CTA */}
                  {card.enableLink && card.link && (
                    <div className="mt-4 flex justify-center">
                      <CMSLink {...card.link} appearance="outline" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
