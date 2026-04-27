import React from 'react'
import Image from 'next/image'
import { Tag, Gift, Star, Megaphone, Sparkles, Clock } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import type { EventsBlockType, Media } from '@/payload-types'

const typeConfig: Record<
  string,
  {
    icon: React.ElementType
    bgGradient: string
    accentColor: string
    badgeClass: string
    highlightClass: string
    buttonClass: string
    decorativeColor: string
  }
> = {
  promo: {
    icon: Tag,
    bgGradient: "from-emerald-50 to-white",
    accentColor: "border-l-emerald-500",
    badgeClass: "bg-emerald-500 text-white",
    highlightClass: "text-emerald-600",
    buttonClass: "bg-emerald-600 hover:bg-emerald-700 text-white",
    decorativeColor: "bg-emerald-500/10",
  },
  giveaway: {
    icon: Gift,
    bgGradient: "from-violet-50 to-white",
    accentColor: "border-l-violet-500",
    badgeClass: "bg-violet-500 text-white",
    highlightClass: "text-violet-600",
    buttonClass: "bg-violet-600 hover:bg-violet-700 text-white",
    decorativeColor: "bg-violet-500/10",
  },
  'new-service': {
    icon: Star,
    bgGradient: "from-blue-50 to-white",
    accentColor: "border-l-blue-500",
    badgeClass: "bg-blue-600 text-white",
    highlightClass: "text-blue-600",
    buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
    decorativeColor: "bg-blue-500/10",
  },
  announcement: {
    icon: Megaphone,
    bgGradient: "from-amber-50 to-white",
    accentColor: "border-l-amber-500",
    badgeClass: "bg-amber-500 text-white",
    highlightClass: "text-amber-600",
    buttonClass: "bg-amber-600 hover:bg-amber-700 text-white",
    decorativeColor: "bg-amber-500/10",
  },
}

export const EventsBlock: React.FC<EventsBlockType> = ({
  type,
  badge,
  title,
  description,
  highlight,
  expires,
  image,
  cta,
}) => {
  const cfg = typeConfig[type] || typeConfig['promo']
  const Icon = cfg.icon
  const imageInfo = image as Media | undefined
  const linkData = cta && cta.length > 0 ? cta[0].link : null

  return (
    <section
      className={cn(
        "relative overflow-hidden py-6 md:py-8",
        "bg-gradient-to-r",
        cfg.bgGradient
      )}
    >
      {/* Subtle decorative blur */}
      <div
        className={cn(
          "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-2xl opacity-40 pointer-events-none",
          cfg.decorativeColor
        )}
      />

      {/* Sparkles for promos/giveaways */}
      {(type === "giveaway" || type === "promo") && (
        <Sparkles className="absolute right-[5%] top-[30%] w-4 h-4 text-current opacity-20 animate-pulse" />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "bg-white rounded-2xl shadow-lg overflow-hidden",
            "border-l-4",
            cfg.accentColor
          )}
        >
          {/* Image top on mobile, hidden on sm */}
          {imageInfo?.url && (
            <div className="relative h-32 md:h-0 md:hidden overflow-hidden">
              <Image
                src={imageInfo.url}
                alt={imageInfo.alt || title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Content */}
            <div className="flex-1">
              {/* Badge */}
              {badge && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-3 w-fit",
                    cfg.badgeClass
                  )}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                  {badge}
                </span>
              )}

              {/* Title + Highlight */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                  {title}
                </h3>
                {highlight && (
                  <p className={cn("text-sm md:text-base font-bold mb-2", cfg.highlightClass)}>
                    {highlight}
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-snug max-w-xl">
                {description}
              </p>
            </div>

            {/* CTA + Urgency */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 md:whitespace-nowrap">
              {linkData && (
                <CMSLink 
                  {...linkData} 
                  appearance="inline"
                  className={cn(
                    "inline-flex items-center justify-center gap-1.5 text-sm px-6 py-2.5 rounded-lg font-semibold transition-all hover:scale-105", 
                    cfg.buttonClass
                  )} 
                />
              )}

              {expires && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {expires}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
