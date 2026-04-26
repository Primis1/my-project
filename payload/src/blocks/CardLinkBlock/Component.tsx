import React from 'react'
import Image from 'next/image'
import {
  ArrowRight,
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
  Home,
  Car,
} from 'lucide-react'
import { CMSLink } from '@/components/Link'
import type { CardLinkBlockType, Media } from '@/payload-types'

const iconMap: Record<string, React.FC<{ className?: string; strokeWidth?: number }>> = {
  shield: Shield,
  building: Building,
  'trending-up': TrendingUp,
  lock: Lock,
  users: Users,
  star: Star,
  'bar-chart': BarChart,
  'check-circle': CheckCircle,
  scale: Scale,
  briefcase: Briefcase,
  heart: Heart,
  home: Home,
  car: Car,
}

export const CardLinkBlock: React.FC<CardLinkBlockType> = ({
  eyebrow,
  title,
  titleAccent,
  description,
  cards,
}) => {
  const renderAccentHeading = (full: string, accent?: string | null) => {
    if (!accent || !full.includes(accent)) return <>{full}</>
    const parts = full.split(accent)
    return (
      <>
        {parts[0]}
        <span className="font-serif italic text-brand">{accent}</span>
        {parts.slice(1).join(accent)}
      </>
    )
  }

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-3">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-balance">
              {renderAccentHeading(title, titleAccent)}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Audience Cards */}
        {cards && cards.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-8">
            {cards.map((card, idx) => {
              const Icon = iconMap[card.icon ?? 'shield'] || Shield
              const imageInfo = card.image as Media

              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl overflow-hidden border border-border hover:border-brand/20 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    {imageInfo?.url && (
                      <Image
                        src={imageInfo.url}
                        alt={imageInfo.alt || card.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-white font-semibold">{card.title}</div>
                        {card.subtitle && (
                          <div className="text-white/70 text-xs">{card.subtitle}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {card.description}
                    </p>

                    {card.needs && card.needs.length > 0 && (
                      <div className="mb-8">
                        <div className="text-xs font-semibold uppercase tracking-wide text-foreground mb-3">
                          Key Coverage Needs
                        </div>
                        <ul className="space-y-2">
                          {card.needs.map((need, nIdx) => (
                            <li
                              key={nIdx}
                              className="flex items-start gap-2 text-xs text-muted-foreground"
                            >
                              <div className="w-1.5 h-1.5 mt-1 rounded-full bg-brand shrink-0" />
                              <span className="leading-tight">{need.item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Push the CTA to the bottom */}
                    <div className="mt-auto">
                      {card.link && (
                        <div className="inline-flex items-center gap-1 group/link">
                          <CMSLink
                            {...card.link}
                            appearance="inline"
                            className="text-sm font-medium text-brand hover:text-brand/80 transition-colors"
                          />
                          <ArrowRight className="w-4 h-4 text-brand group-hover/link:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
