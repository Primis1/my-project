import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export function CenteredCta({ richText, links }: any) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-2xl bg-gradient-to-br from-[#1d4ed8] to-blue-700 rounded-2xl px-10 py-12 text-center shadow-lg">
          {richText && (
            <div className="text-white mb-7 [&_h1]:text-3xl [&_h1]:text-white [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mb-3 [&_h2]:text-balance [&_p]:text-sm [&_p]:text-white/80 [&_p]:leading-relaxed [&_p]:mb-7 [&_p]:max-w-sm [&_p]:mx-auto [&_strong]:text-white [&_b]:text-white">
              <RichText className="mb-0 mx-auto" data={richText} enableGutter={false} />
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {(links || []).map(({ link }: any, i: number) => {
              return (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="default"
                  className={
                    i === 0
                      ? 'bg-white text-blue-700 hover:bg-white/90 rounded-full px-8 text-sm font-semibold shadow-sm'
                      : 'border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full px-8 text-sm font-semibold'
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
