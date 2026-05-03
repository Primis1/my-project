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
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            {sectionLabel}
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground text-balance">
            {headline}
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

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden"
          >
            {/* Duplicate partners for seamless infinite loop */}
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner}-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-14 px-6 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
              >
                <span className="text-sm font-semibold text-slate-600 whitespace-nowrap">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Three key arguments / value propositions */}
        <div className="grid md:grid-cols-3 gap-8">
          {valueProps.map((prop) => {
            const Icon = prop.icon
            return (
              <div key={prop.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{prop.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{prop.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
