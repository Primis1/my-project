'use client'

import React, { useState } from 'react'
import { X, Megaphone, Sparkles, AlertTriangle, Tag } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import type { PromotionBlockType } from '@/payload-types'

const variantStyles: Record<
  string,
  { container: string; eyebrow: string; title: string; description: string; icon: React.FC<{ className?: string }> }
> = {
  info: {
    container: 'bg-blue-50 border-blue-200',
    eyebrow: 'text-blue-600',
    title: 'text-blue-900',
    description: 'text-blue-700',
    icon: Megaphone,
  },
  success: {
    container: 'bg-emerald-50 border-emerald-200',
    eyebrow: 'text-emerald-600',
    title: 'text-emerald-900',
    description: 'text-emerald-700',
    icon: Sparkles,
  },
  warning: {
    container: 'bg-amber-50 border-amber-200',
    eyebrow: 'text-amber-600',
    title: 'text-amber-900',
    description: 'text-amber-700',
    icon: AlertTriangle,
  },
  brand: {
    container: 'bg-primary/5 border-primary/20',
    eyebrow: 'text-primary',
    title: 'text-foreground',
    description: 'text-muted-foreground',
    icon: Tag,
  },
}

export const PromotionBlock: React.FC<PromotionBlockType> = ({
  variant = 'info',
  eyebrow,
  title,
  description,
  dismissible,
  cta,
}) => {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const v = variant ?? 'info'
  const styles = variantStyles[v] || variantStyles.info
  const Icon = styles.icon

  return (
    <div
      className={cn(
        'relative border rounded-2xl px-6 py-5 md:px-8 md:py-6 mx-auto max-w-7xl transition-all',
        styles.container,
      )}
      role="banner"
      aria-label="Promotion"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 hidden md:flex">
          <Icon className={cn('w-6 h-6', styles.eyebrow)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {eyebrow && (
            <p className={cn('text-xs font-bold uppercase tracking-widest mb-1', styles.eyebrow)}>
              {eyebrow}
            </p>
          )}
          {title && (
            <p className={cn('text-sm md:text-base font-semibold', styles.title)}>{title}</p>
          )}
          {description && (
            <p className={cn('text-sm mt-1 leading-relaxed', styles.description)}>{description}</p>
          )}
        </div>

        {/* CTAs */}
        {cta && cta.length > 0 && (
          <div className="flex gap-3 flex-shrink-0">
            {cta.map((ctaItem, i) => (
              <CMSLink
                key={i}
                {...ctaItem.link}
                appearance={ctaItem.link?.appearance || 'default'}
                size="sm"
              />
            ))}
          </div>
        )}

        {/* Dismiss button */}
        {dismissible && (
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-3 right-3 md:static flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
            aria-label="Dismiss promotion"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  )
}
