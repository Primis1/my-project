'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utilities/ui'

import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setHeaderTheme(null)
    setMobileOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme, theme])

  const navItems = data?.navItems || []

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-background/50 backdrop-blur-xl border-border/50'
          : 'bg-transparent',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group">
          <Logo text={data.logo?.text} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <HeaderNav data={data} />
        </div>

        {/* CMS Driven CTA */}
        {data.cta?.link && (
          <CMSLink
            {...data.cta.link}
            className="hidden border border-gold/40 px-6 py-2.5 text-xs font-medium tracking-widest uppercase text-gold transition-all duration-300 hover:bg-gold hover:text-primary-foreground md:inline-block"
          />
        )}

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-background/45 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-10 items-center text-center">
            <HeaderNav data={data} className="flex-col gap-6" />
            {data.cta?.link && (
              <CMSLink
                {...data.cta.link}
                onClick={() => setMobileOpen(false)}
                className="mt-8 border border-gold/40 px-6 py-3 text-xs font-medium tracking-widest uppercase text-gold transition-all hover:bg-gold hover:text-primary-foreground w-full max-w-[200px]"
              />
            )}
          </div>
        </div>
      )}
    </header>
  )
}
