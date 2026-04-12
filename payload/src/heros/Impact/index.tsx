'use client'

import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const ImpactHero: React.FC<Page['hero'] & { media2?: any }> = ({
  links,
  media,
  media2,
  richText,
}) => {
  return (
    <section className="bg-background px-4 py-16 md:py-24">
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
                    className="rounded-md bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all duration-200 h-auto"
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
    </section>
  )
}
