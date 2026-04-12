"use client"

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/utilities/ui"
import { CMSLink } from "@/components/Link"
import type { FaqBlockType } from "@/payload-types"

export const FaqBlock: React.FC<FaqBlockType> = ({
  eyebrow,
  title,
  titleAccent,
  description,
  faqs,
  cta,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const renderAccentHeading = (full: string, accent?: string | null) => {
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
    <section id="faqs" className="py-20 bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
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

        {/* FAQ Accordion */}
        {faqs && faqs.length > 0 && (
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "bg-white rounded-xl border transition-all duration-200",
                  openIndex === index ? "border-brand/30 shadow-sm" : "border-border"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-sm font-medium text-foreground">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-200",
                    openIndex === index ? "max-h-[500px]" : "max-h-0"
                  )}
                >
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Still Have Questions */}
        {cta && cta.length > 0 && cta[0]?.link && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Still have questions? We are here to help.
            </p>
            <div className="flex justify-center">
              <CMSLink
                {...cta[0].link}
                appearance="outline"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
