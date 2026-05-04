"use client"

import { useEffect, useRef, useState } from "react"
import { type LucideIcon } from "lucide-react"

interface ValueProp {
  icon: LucideIcon
  title: string
  description: string
}

interface PartnersCarouselProps {
  // Header
  sectionLabel?: string
  headline: string
  
  // Partners list
  partners: string[]
  
  // Value propositions (3 key arguments)
  valueProps: ValueProp[]
}

export function PartnersCarousel({
  sectionLabel = "Our Insurance Partners",
  headline,
  partners,
  valueProps,
}: PartnersCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0
        }
        scrollContainer.scrollLeft = scrollPosition
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationId)
  }, [isPaused])

  return (
    <section id="partners" className="py-16 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            {sectionLabel}
          </p>
          <h2 id="partners-headline" className="text-2xl md:text-3xl font-serif font-bold text-foreground text-balance">
            Our {headline}
          </h2>
        </div>

        {/* Continuous scrolling logo carousel */}
        <div 
          className="relative overflow-hidden mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient masks for seamless edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <ul
            ref={scrollRef}
            aria-label="Our network of insurance carriers"
            className="flex gap-6 overflow-x-hidden"
          >
            {/* Duplicate partners for seamless infinite loop */}
            {[...partners, ...partners].map((partner, index) => (
              <li
                key={`${partner}-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-14 px-6 bg-muted/30 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors"
              >
                <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
                  {partner}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Three key arguments / value propositions */}
        <ul className="grid md:grid-cols-3 gap-8">
          {valueProps.map((prop) => {
            const Icon = prop.icon
            return (
              <li key={prop.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/5 rounded-xl mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{prop.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{prop.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
