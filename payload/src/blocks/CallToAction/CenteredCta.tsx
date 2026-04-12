import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export function CenteredCta({ richText, links }) {
  return (
    <section className="py-16 bg-brand w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-2xl px-6 md:px-10 py-6 md:py-12 text-center">
          {richText && (
            <div className="text-brand-foreground mb-7 [&_h1]:text-3xl [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-semibold [&_h2]:mb-3 [&_p]:text-sm [&_p]:text-brand-foreground/80 [&_p]:leading-relaxed [&_p]:max-w-sm [&_p]:mx-auto">
              <RichText className="mb-0 mx-auto" data={richText} enableGutter={false} />
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {(links || []).map(({ link }, i) => {
              return (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="default"
                  className={
                    i === 0
                      ? 'bg-white text-brand hover:bg-white/90 border-transparent shadow-sm'
                      : 'border-white/20 text-white hover:bg-white/10 hover:text-white'
                  }
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
