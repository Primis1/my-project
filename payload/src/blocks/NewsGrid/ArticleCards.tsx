'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'

interface ArticleCardProps {
  image?: any
  title: string
  category: string
  date: string
  readTime?: string
  href?: string
  featured?: boolean
  className?: string
}

export function ArticleCard({
  image,
  title,
  category,
  date,
  readTime = '5 min read',
  href = '#',
  featured = false,
  className,
}: ArticleCardProps) {
  return (
    <Link href={href} className={cn('group flex flex-col h-full', className)}>
      <article
        className={cn(
          'relative overflow-hidden rounded-2xl bg-card border border-border',
          'transition-all duration-500 ease-out flex flex-col flex-1',
          'hover:shadow-xl hover:shadow-gray-200/20 hover:-translate-y-1',
          featured && 'md:col-span-2',
        )}
      >
        {/* Image Container — flex-1 so it fills remaining height */}
        <div className={cn('relative overflow-hidden flex-1 min-h-[160px] bg-muted')}>
          {image && typeof image === 'object' ? (
            <Media
              resource={image}
              fill
              imgClassName={cn(
                'object-cover transition-transform duration-700 ease-out',
                'group-hover:scale-105',
              )}
            />
          ) : (
            <div className="absolute inset-0 bg-muted" />
          )}

          {/* Gradient Overlay */}
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent',
              'opacity-60 transition-opacity duration-500',
              'group-hover:opacity-80',
            )}
          />

          {/* Category Tag */}
          <div className="absolute top-4 left-4">
            <span
              className={cn(
                'inline-block px-3 py-1 text-[11px] font-semibold uppercase tracking-wider',
                'bg-white/90 backdrop-blur-sm text-slate-800 rounded-full',
                'transition-all duration-300',
                'group-hover:bg-gold group-hover:text-primary-foreground',
              )}
            >
              {category}
            </span>
          </div>

          {/* Arrow Icon */}
          <div
            className={cn(
              'absolute top-4 right-4 w-10 h-10 rounded-full',
              'bg-white/20 backdrop-blur-sm flex items-center justify-center',
              'transition-all duration-500 ease-out',
              'opacity-0 translate-x-2 -translate-y-2',
              'group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0',
            )}
          >
            <ArrowUpRight className="w-5 h-5 text-white" strokeWidth={2} />
          </div>

          {/* Title Overlay on Image */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3
              className={cn(
                'text-lg md:text-xl font-semibold text-white leading-tight text-balance',
                'transition-transform duration-500',
                'group-hover:translate-y-[-4px]',
                featured && 'md:text-2xl',
              )}
            >
              {title}
            </h3>
          </div>
        </div>

        {/* Meta Footer */}
        <div
          className={cn(
            'px-5 py-4 flex items-center justify-between',
            'border-t border-border bg-card',
          )}
        >
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <time>{date}</time>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{readTime}</span>
          </div>

          {/* Read More with animated underline */}
          <span
            className={cn(
              'text-sm font-medium text-gold',
              'relative after:absolute after:bottom-0 after:left-0 after:h-[1px]',
              'after:w-0 after:bg-gold after:transition-all after:duration-300',
              'group-hover:after:w-full',
            )}
          >
            Read Article
          </span>
        </div>
      </article>
    </Link>
  )
}

// Minimal variant - just image + title, no meta footer
export function ArticleCardMinimal({
  image,
  title,
  category,
  href = '#',
  className,
}: Pick<ArticleCardProps, 'image' | 'title' | 'category' | 'href' | 'className'>) {
  return (
    <Link href={href} className={cn('group flex flex-col h-full', className)}>
      <article className="relative overflow-hidden rounded-xl flex-1 border border-border shadow-sm group-hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        {/* Image — fills full height of the card */}
        <div className="relative h-full min-h-[220px] overflow-hidden rounded-xl bg-muted">
          {image && typeof image === 'object' ? (
            <Media
              resource={image}
              fill
              imgClassName={cn(
                'object-cover transition-all duration-700 ease-out',
                'group-hover:scale-110 group-hover:brightness-90',
              )}
            />
          ) : (
            <div className="absolute inset-0 bg-muted group-hover:scale-110 transition-all duration-700" />
          )}

          {/* Full gradient overlay */}
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent',
              'transition-opacity duration-500',
            )}
          />

          {/* Content */}
          <div className="absolute inset-0 p-5 flex flex-col justify-end">
            <span
              className={cn(
                'self-start mb-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest',
                'bg-gold text-primary-foreground rounded-full',
                'transition-all duration-300',
                'group-hover:bg-white group-hover:text-slate-900',
              )}
            >
              {category}
            </span>

            <h3
              className={cn(
                'text-lg font-semibold text-white leading-snug',
                'transition-transform duration-500',
                'group-hover:translate-y-[-6px]',
              )}
            >
              {title}
            </h3>
          </div>

          {/* Hover border effect */}
          <div
            className={cn(
              'absolute inset-0 rounded-xl border-2 border-white/0',
              'transition-all duration-500',
              'group-hover:border-white/30 pointer-events-none',
            )}
          />
        </div>
      </article>
    </Link>
  )
}
