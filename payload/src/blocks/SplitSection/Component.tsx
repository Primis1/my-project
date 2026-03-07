import React from 'react'
import {
  Shield,
  Building,
  TrendingUp,
  Lock,
  Users,
  Star,
  BarChart,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

import type { SplitSectionBlock as SplitSectionBlockProps } from '@/payload-types'

// ─── Icon map ─────────────────────────────────────────────────────
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  shield: ({ className }) => <Shield className={className} />,
  building: ({ className }) => <Building className={className} />,
  'trending-up': ({ className }) => <TrendingUp className={className} />,
  lock: ({ className }) => <Lock className={className} />,
  users: ({ className }) => <Users className={className} />,
  star: ({ className }) => <Star className={className} />,
  'bar-chart': ({ className }) => <BarChart className={className} />,
  'check-circle': ({ className }) => <CheckCircle className={className} />,
}

// ─── Right Panel: Stats ──────────────────────────────────────────
const StatsPanel: React.FC<{ stats: SplitSectionBlockProps['rightStats'] }> = ({ stats }) => {
  if (!stats || stats.length === 0) return null

  return (
    <div className="flex flex-col divide-y divide-[#2e2e2e]/60">
      {stats.map((stat: NonNullable<SplitSectionBlockProps['rightStats']>[number], i: number) => {
        const IconComponent = iconMap[stat.icon ?? 'shield']
        return (
          <div key={i} className="flex items-start gap-5 py-7 first:pt-0 last:pb-0">
            {/* Icon box */}
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 border border-[#2e2e2e]/60 bg-[#1a1a1a]">
              {IconComponent && <IconComponent className="w-5 h-5 text-muted-foreground" />}
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-serif text-3xl text-gold leading-none">{stat.statValue}</span>
                <span className="text-sm font-medium text-foreground tracking-wide">
                  {stat.statLabel}
                </span>
              </div>
              {stat.statDescription && (
                <p className="text-sm text-white leading-relaxed">{stat.statDescription}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Right Panel: Numbered Steps ──────────────────────────────────
const StepsPanel: React.FC<{ steps: SplitSectionBlockProps['rightSteps'] }> = ({ steps }) => {
  if (!steps || steps.length === 0) return null

  return (
    <div className="flex flex-col divide-y divide-[#2e2e2e]/60">
      {steps.map((step: NonNullable<SplitSectionBlockProps['rightSteps']>[number], i: number) => {
        const num = String(i + 1).padStart(2, '0')
        return (
          <div key={i} className="flex items-start gap-6 py-8 first:pt-0 last:pb-0">
            {/* Number */}
            <span className="flex-shrink-0 font-serif text-3xl text-gold/40 leading-none mt-1 w-8">
              {num}
            </span>
            {/* Content */}
            <div>
              <h4
                className={cn(
                  'font-serif text-lg font-normal mb-2',
                  step.highlight ? 'text-gold italic' : 'text-foreground',
                )}
              >
                {step.title}
              </h4>
              {step.description && (
                <p className="text-sm text-white leading-relaxed">{step.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────
export const SplitSectionBlock: React.FC<SplitSectionBlockProps> = ({
  eyebrow,
  heading,
  body,
  enableCta,
  cta,
  rightColumnType,
  imagePosition,
  rightImage,
  rightStats,
  rightSteps,
}) => {
  const isImageLeft = rightColumnType === 'image' && imagePosition === 'left'

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div
          className={cn(
            'grid grid-cols-1 items-center gap-16 lg:grid-cols-2',
            isImageLeft && 'direction-rtl',
          )}
        >
          {/* ── LEFT COLUMN ── */}
          <div className={cn('flex flex-col gap-6', isImageLeft && 'lg:order-last')}>
            {/* Eyebrow */}
            {eyebrow && (
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-8 bg-gold/50 flex-shrink-0" />
                <span className="text-xs font-medium tracking-[0.3em] uppercase text-gold">
                  {eyebrow}
                </span>
              </div>
            )}

            {/* Heading */}
            {heading && (
              <RichText
                className="font-serif [&_h2]:text-4xl [&_h2]:font-normal [&_h2]:leading-[1.15] [&_h2]:tracking-tight [&_h3]:text-3xl [&_h3]:font-normal [&_em]:text-gold [&_em]:italic [&_i]:text-gold [&_i]:italic"
                data={heading}
                enableGutter={false}
                enableProse={false}
              />
            )}

            {/* Body */}
            {body && (
              <RichText
                className="[&_p]:text-white [&_p]:leading-relaxed [&_p]:text-base [&_blockquote]:border-l-2 [&_blockquote]:border-gold/50 [&_blockquote]:pl-5 [&_blockquote]:text-white [&_blockquote]:italic [&_cite]:text-xs [&_cite]:text-gold [&_cite]:uppercase [&_cite]:tracking-widest [&_cite]:not-italic"
                data={body}
                enableGutter={false}
                enableProse={false}
              />
            )}

            {/* CTA */}
            {enableCta && cta && (
              <div className="mt-2">
                <CMSLink
                  {...cta}
                  className="inline-flex items-center gap-3 border border-gold/40 bg-transparent px-7 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-gold transition-all duration-300 hover:bg-gold hover:text-[#121212]"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </CMSLink>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className={cn(isImageLeft && 'lg:order-first')}>
            {rightColumnType === 'image' && rightImage && typeof rightImage === 'object' && (
              <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden">
                <Media fill imgClassName="object-cover w-full h-full" resource={rightImage} />
              </div>
            )}

            {rightColumnType === 'stats' && <StatsPanel stats={rightStats} />}

            {rightColumnType === 'steps' && <StepsPanel steps={rightSteps} />}
          </div>
        </div>
      </div>
    </section>
  )
}
