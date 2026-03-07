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
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { FeatureCardsBlock as FeatureCardsBlockProps } from '@/payload-types'

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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16 text-center lg:text-left">
          {eyebrow && (
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <span className="h-[1px] w-8 bg-gold/50 flex-shrink-0" />
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-gold">
                {eyebrow}
              </span>
            </div>
          )}
          {heading && (
            <h2 className="font-serif text-4xl lg:text-5xl font-normal text-white leading-tight">
              {heading}
            </h2>
          )}
        </div>

        {/* Cards Grid - "Cubes within a rectangle" approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[#1a1a1a] border border-[#2e2e2e]/50">
          {cards.map((card: NonNullable<FeatureCardsBlockProps['cards']>[number], i: number) => {
            const IconComponent = iconMap[card.icon ?? 'shield']
            return (
              <Card
                key={i}
                className="bg-transparent border-[#2e2e2e]/30 border-r border-b md:odd:border-r lg:[&:not(:nth-child(3n))]:border-r hover:bg-[#222222]"
              >
                <CardHeader className="gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#2e2e2e]/60 transition-colors duration-500 group-hover:border-gold/40 group-hover:bg-gold/5">
                    {IconComponent && (
                      <IconComponent className="h-5 w-5 text-white transition-colors duration-500 group-hover:text-gold" />
                    )}
                  </div>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
