import React from 'react'
import { Building2, Handshake, Shield, CheckCircle } from 'lucide-react'

const iconMap = {
  Building2,
  Handshake,
  Shield,
}

export function DetailedCta({
  eyebrow,
  title,
  titleAccent,
  description,
  partnerCategories,
  benefitsTitle,
  benefitsDescription,
  benefits,
}: any) {
  const renderAccentHeading = (full: string, accent?: string) => {
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
    <section className="py-20 bg-background w-full">
      <div className="container max-w-7xl mx-auto px-6 lg:px-8">
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

        {/* Partner Categories */}
        {partnerCategories && partnerCategories.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {partnerCategories.map((cat: any, idx: number) => {
              const Icon = iconMap[cat.icon as keyof typeof iconMap] || Building2
              return (
                <div
                  key={idx}
                  className="bg-secondary rounded-2xl p-8 border border-transparent hover:border-brand/20 hover:bg-card hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-brand" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{cat.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {(cat.partners || []).map((partner: any, pIdx: number) => (
                      <span
                        key={pIdx}
                        className="inline-block px-3 py-1 bg-card border border-border rounded-full text-xs text-muted-foreground"
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

        {/* Benefits Banner */}
        <div className="bg-brand rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              {benefitsTitle && (
                <h3 className="text-2xl font-semibold text-brand-foreground mb-3">
                  {benefitsTitle}
                </h3>
              )}
              {benefitsDescription && (
                <p className="text-brand-foreground/80 text-sm leading-relaxed">
                  {benefitsDescription}
                </p>
              )}
            </div>

            {benefits && benefits.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefitItem: any, bIdx: number) => (
                  <div key={bIdx} className="flex items-center gap-2">
                    <CheckCircle
                      className="w-4 h-4 text-brand-foreground/80 shrink-0"
                      strokeWidth={1.5}
                    />
                    <span className="text-brand-foreground/90 text-xs">
                      {benefitItem.benefit}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
