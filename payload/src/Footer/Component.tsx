import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border bg-[#0e0e0e]">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Private Wealth &amp; Estate Strategy
              <br />
              Toronto, Ontario, Canada
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-xs font-medium tracking-[0.25em] uppercase text-foreground">
              Practice Areas
            </h4>
            <ul className="space-y-3">
              {[
                'Estate Architecture',
                'Asset Protection',
                'Tax Strategy',
                'Corporate Succession',
                'Life & Health Solutions',
                'Investment Advisory',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="text-xs text-muted-foreground transition-colors hover:text-gold"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Firm */}
          <div>
            <h4 className="mb-4 text-xs font-medium tracking-[0.25em] uppercase text-foreground">
              The Firm
            </h4>
            <ul className="space-y-3">
              {[
                'Our Philosophy',
                'Team & Credentials',
                'Institutional Affiliations',
                'Client Referral Program',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#about"
                    className="text-xs text-muted-foreground transition-colors hover:text-gold"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-medium tracking-[0.25em] uppercase text-foreground">
              Private Inquiries
            </h4>
            <div className="space-y-3 text-xs text-muted-foreground">
              <p>olehb@kmibrokers.com</p>
              <p>+1 (437) 477 5760</p>
              <p>
                1430 Hurontario St B, <br />
                Mississauga, ON L5G 3H4
              </p>
            </div>
          </div>
        </div>

        {/* CMS Nav Items */}
        {navItems.length > 0 && (
          <div className="mt-12 border-t border-[#1a1a1a] pt-8">
            <nav className="flex flex-wrap gap-6">
              {navItems.map(({ link }, i) => {
                return (
                  <CMSLink
                    className="text-xs text-muted-foreground transition-colors hover:text-gold"
                    key={i}
                    {...link}
                  />
                )
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Compliance / Institutional Disclosures bar */}
      <div className="border-t border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[1px] w-4 bg-gold/30" />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold/60">
              Institutional Disclosures
            </span>
          </div>

          <div className="space-y-3 text-[11px] leading-relaxed text-[#555]">
            <p>
              Property & Casualty insurance products and services are provided through KMI Brokers
              Inc., licensed under the Registered Insurance Brokers of Ontario (RIBO). RIBO License
              No. 66993. Not all products and services are available in all jurisdictions.
            </p>
            <p>
              This website is for informational purposes only and does not constitute an offer to
              sell or a solicitation of an offer to buy any security or insurance product. Past
              performance is not indicative of future results. All strategies are subject to risk,
              including loss of principal. Clients should consult with their independent legal, tax,
              and financial advisors before implementing any strategy discussed herein.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-[#1a1a1a] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] tracking-wide text-[#444]">
              {`\u00A9 ${currentYear} Sterling & Associates. All rights reserved.`}
            </p>
            <div className="flex gap-6">
              {[{label: 'Privacy Policy', href: '#'}, {label: 'Terms of Use', href: '#'}, {label: 'RIBO Disclosure', href: '#'}, {label: 'Accessibility', href: '#'}].map(
                (item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-[10px] tracking-wide text-[#444] transition-colors hover:text-gold/60"
                  >
                    {item.label}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
