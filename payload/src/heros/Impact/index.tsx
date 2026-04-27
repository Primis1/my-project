'use client'

import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ArrowDown } from 'lucide-react'
import { cn } from '@/utilities/ui'

export const ImpactHero: React.FC<Page['hero'] & { media2?: any }> = ({
  links,
  media,
  media2,
  richText,
  scrollIndicatorLabel,
  showScrollIndicator,
}) => {
  return (
    <section className={cn(
      "relative bg-background px-4 pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden",
      showScrollIndicator && "min-h-[85vh] flex flex-col justify-center"
    )}>
      <div className="mx-auto max-w-6xl rounded-2xl bg-card p-8 shadow-2xl md:p-14 border border-border/50">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left Column — Typography */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {richText && (
                <RichText
                  className="font-sans [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:leading-[1.08] [&_h1]:tracking-tight [&_h1]:text-foreground [&_h1]:md:text-5xl [&_h1]:lg:text-6xl [&_p]:max-w-md [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_em]:font-serif [&_em]:italic [&_i]:font-serif [&_i]:italic"
                  data={richText}
                  enableGutter={false}
                />
              )}
            </div>

            {Array.isArray(links) && links.length > 0 && (
              <div className="flex flex-wrap gap-4">
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

          {/* Right Column — Photo Pair */}
          <div className="relative flex items-center justify-center">
            {/* Geometric background circle */}
            <div className="absolute h-72 w-72 rounded-full bg-primary/5 md:h-96 md:w-96" />
            
            {/* Side-by-side images */}
            <div className="relative z-10 flex gap-3">
              <div className="flex h-52 w-40 overflow-hidden rounded-2xl bg-muted shadow-lg md:h-72 md:w-52 border border-border/50">
                {media && typeof media === 'object' ? (
                  <Media resource={media} imgClassName="object-cover h-full w-full" />
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-muted-foreground text-xs p-4 text-center">
                    Main Image
                  </div>
                )}
              </div>
              <div className="flex h-52 w-40 overflow-hidden rounded-2xl bg-muted shadow-lg md:h-72 md:w-52 border border-border/50 mt-8 md:mt-12">
                {media2 && typeof media2 === 'object' ? (
                  <Media resource={media2} imgClassName="object-cover h-full w-full" />
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-muted-foreground text-xs p-4 text-center">
                    Secondary Image
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <a
            href="#discover"
            className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
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
