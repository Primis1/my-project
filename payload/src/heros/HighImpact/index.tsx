'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { ArrowDown } from 'lucide-react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const HighImpactHero: React.FC<Page['hero']> = ({
  eyebrow,
  links,
  media,
  richText,
  scrollIndicatorLabel,
  showScrollIndicator,
  style,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    // We let the global theme control the header unless we explicitly want a dark hero
    // setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Media with dark overlays */}
      <div className="absolute inset-0 -z-10">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="h-full w-full object-cover" priority resource={media} />
        )}
        <div className="absolute inset-0 bg-background/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-transparent to-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-foreground">
        {/* Eyebrow */}
        {eyebrow && (
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 bg-gold/50" />
            <span className="text-xs font-medium tracking-[0.35em] uppercase text-gold">
              {eyebrow}
            </span>
            <span className="h-[1px] w-12 bg-gold/50" />
          </div>
        )}

        {/* Headline & Subtext via RichText */}
        {richText && (
          <RichText
            className="font-serif [&_h1]:text-5xl [&_h1]:font-normal [&_h1]:leading-[1.1] [&_h1]:tracking-tight [&_h1]:sm:text-6xl [&_h1]:md:text-7xl [&_h1]:lg:text-8xl [&_p]:mx-auto [&_p]:mt-8 [&_p]:max-w-2xl [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-foreground [&_p]:sm:text-lg"
            data={richText}
            enableGutter={false}
          />
        )}

        {/* CTAs */}
        {Array.isArray(links) && links.length > 0 && (
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            {links.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                appearance={i === 0 ? "default" : "outline"}
              />
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <a
            href="#discover"
            className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-gold"
            aria-label="Scroll down"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">
              {scrollIndicatorLabel || 'Discover'}
            </span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      )}
    </section>
  )
}
