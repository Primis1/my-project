import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { FormBlock } from '@/blocks/Form/Component'
import { CheckCircle2 } from 'lucide-react'

export const LandingPageTemplate: React.FC<{ data?: any }> = ({ data }) => {
  if (!data) return null

  const {
    heroHeading,
    heroSubtitle,
    lureImage,
    lureTitle,
    lureDescription,
    lureBulletPoints,
    form,
    hideHeader,
    hideFooter,
  } = data

  const shouldHideHeader = hideHeader !== false
  const shouldHideFooter = hideFooter !== false

  const formBlockProps = {
    blockType: 'formBlock' as const,
    enableIntro: false,
    form: form,
  }

  return (
    <>
      {shouldHideHeader && (
        <style dangerouslySetInnerHTML={{ __html: `header { display: none !important; }` }} />
      )}
      {shouldHideFooter && (
        <style dangerouslySetInnerHTML={{ __html: `footer { display: none !important; }` }} />
      )}
      <div className="relative min-h-screen bg-gradient-to-br from-muted/30 via-background to-primary/5 py-12 lg:py-20">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {/* Main Grid: Left Lure, Right Form */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Lure / Free Offer Info */}
          <div className="lg:col-span-7 space-y-8">
            <header className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-foreground">
                {heroHeading}
              </h1>
              {heroSubtitle && (
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {heroSubtitle}
                </p>
              )}
            </header>

            {/* Free giveaway graphic section */}
            <div className="bg-card/40 backdrop-blur-sm border border-border/80 rounded-2xl p-6 lg:p-8 shadow-sm space-y-6">
              {lureImage && (
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-border max-w-md mx-auto lg:mx-0 aspect-[4/3] bg-muted flex items-center justify-center">
                  <Media 
                    resource={lureImage} 
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              )}

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  {lureTitle || "Free Resource Details"}
                </h2>
                
                {lureDescription && (
                  <div className="prose prose-sm dark:prose-invert text-muted-foreground max-w-none">
                    <RichText data={lureDescription} enableGutter={false} />
                  </div>
                )}

                {lureBulletPoints && lureBulletPoints.length > 0 && (
                  <ul className="grid sm:grid-cols-2 gap-4 pt-2" aria-label="Key highlights">
                    {lureBulletPoints.map((item: any, idx: number) => (
                      <li key={item.id || idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-sm font-medium text-foreground leading-snug">
                          {item.bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <aside className="lg:col-span-5 lg:sticky lg:top-8 bg-white dark:bg-card rounded-2xl shadow-xl shadow-black/5 border border-border/80 p-6 md:p-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">
                Get Instant Access
              </h2>
              <p className="text-sm text-muted-foreground">
                Submit your contact information below to claim your free material.
              </p>
            </div>

            {form ? (
              <div className="landing-page-form">
                <FormBlock {...formBlockProps} />
              </div>
            ) : (
              <div className="py-8 text-center text-sm text-muted-foreground border border-dashed border-border rounded-lg">
                No form selected yet in page settings.
              </div>
            )}

            <p className="text-xs text-center text-muted-foreground leading-normal px-4">
              We respect your privacy. Your information is 100% secure and will never be shared.
            </p>
          </aside>

        </div>
      </div>
    </div>
    </>
  )
}
