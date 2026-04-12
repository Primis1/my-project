import React from 'react'
import type { Post } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { ArticleCard, ArticleCardMinimal } from './ArticleCards'

export interface NewsGridBlockProps {
  eyebrow?: string
  heading?: string
  headingAccent?: string
  viewAllLabel?: string
  viewAllLink?: string
}

export const NewsGridBlock: React.FC<NewsGridBlockProps> = async ({
  eyebrow = 'From Our Desk',
  heading = 'Latest Updates & News',
  headingAccent = 'Updates',
  viewAllLabel = 'View All Articles',
  viewAllLink = '/posts',
}) => {
  const payload = await getPayload({ config: configPromise })

  const fetchedPosts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 5,
    sort: '-publishedAt',
  })

  const posts = fetchedPosts.docs

  // Split into left (wide) and right (minimal) articles
  const widePosts = posts.slice(0, 3)
  const minimalPosts = posts.slice(3, 5)

  const renderAccentHeading = (full: string, accent: string) => {
    if (!accent || !full.includes(accent)) return <>{full}</>
    const parts = full.split(accent)
    return (
      <>
        {parts[0]}
        <span className="font-serif italic text-gold">{accent}</span>
        {parts.slice(1).join(accent)}
      </>
    )
  }

  // Helper to format post data for the cards
  const formatPost = (post: Post) => {
    let category = 'Uncategorized'
    if (post.categories && post.categories.length > 0) {
      const cat = post.categories[0]
      if (typeof cat === 'object' && cat.title) {
        category = cat.title
      }
    }

    const date = post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : ''

    return {
      title: post.title,
      category,
      date,
      image: post.meta?.image || post.heroImage,
      href: `/posts/${post.slug}`,
      // readTime is hardcoded for now or could be calculated
      readTime: '5 min read',
    }
  }

  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-12 lg:mb-14">
          <div>
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
                {eyebrow}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-foreground leading-tight tracking-tight">
              {renderAccentHeading(heading, headingAccent)}
            </h2>
          </div>
          {viewAllLink && viewAllLabel && (
            <Link
              href={viewAllLink}
              className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors group flex items-center gap-2 uppercase tracking-wider"
            >
              {viewAllLabel}
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          )}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 lg:items-stretch">
          {/* Left: exactly 3 wide articles stacked */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-6 lg:gap-8 lg:grid-rows-3 h-full">
            {widePosts.map((post) => {
              const formatted = formatPost(post)
              return (
                <div key={post.id} className="min-h-0 flex flex-col h-[400px] lg:h-auto">
                  <ArticleCard {...formatted} className="flex-1" />
                </div>
              )
            })}
            {widePosts.length === 0 && (
              <div className="col-span-1 text-center py-10 text-muted-foreground">
                No articles available.
              </div>
            )}
          </div>

          {/* Right: thin minimal cards */}
          <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-rows-2 h-full">
            {minimalPosts.map((post) => {
              const formatted = formatPost(post)
              return (
                <div key={post.id} className="min-h-0 flex flex-col h-[300px] lg:h-auto">
                  <ArticleCardMinimal
                    image={formatted.image}
                    title={formatted.title}
                    category={formatted.category}
                    href={formatted.href}
                    className="flex-1"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
