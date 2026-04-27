import React from 'react'
import { Building2, Handshake, Shield } from 'lucide-react'
import type { PartnerCardsBlockType } from '@/payload-types'

const iconMap = {
  Building2,
  Handshake,
  Shield,
}

export const PartnerCardsBlock: React.FC<PartnerCardsBlockType> = ({
  eyebrow,
  title,
  titleAccent,
  description,
  partnerCategories,
}) => {
  const renderAccentHeading = (full: string, accent?: string | null) => {
    if (!accent || !full.includes(accent)) return <>{full}</>
    const parts = full.split(accent)
    return (
      <>
        {parts[0]}
        <span className="font-serif italic">{accent}</span>
        {parts.slice(1).join(accent)}
      </>
    )
  }

  return (
    <section className="py-20 bg-white">
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
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        {/* Partner Categories */}
        {partnerCategories && partnerCategories.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-8">
            {partnerCategories.map((cat, idx) => {
              const Icon = iconMap[cat.icon as keyof typeof iconMap] || Building2
              return (
                <div
                  key={idx}
                  className="bg-gray-50/50 rounded-2xl p-8 border border-transparent hover:border-brand/20 hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-brand" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {cat.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {(cat.partners || []).map((partner, pIdx) => (
                      <span
                        key={pIdx}
                        className="inline-block px-3 py-1 bg-white border border-border rounded-full text-xs text-muted-foreground"
                      >
                        {partner.name}
                      </span>
                    ))}
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
