"use client"

import { useState } from "react"
import { Phone, MessageCircle, Mail, Calendar, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Talk to a licensed advisor",
    action: "(555) 123-4567",
    available: "Mon-Fri 9am-6pm",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Quick coverage questions",
    action: "Start Chat",
    available: "Available now",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Send us your inquiry",
    action: "info@integrated.com",
    available: "Response within 24h",
  },
  {
    icon: Calendar,
    title: "Schedule",
    description: "Book a consultation",
    action: "Pick a Time",
    available: "30 min free call",
  },
]

const benefits = [
  "Independent — we work for you, not a carrier",
  "Personal, commercial & life expertise",
  "Proactive reviews, not just renewals",
  "Claims advocacy when you need it most",
]

export function HomeCTA() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    setEmail("")
  }

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Contact methods */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Get Started
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Ready to Protect What Matters?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose how you&apos;d like to connect. Whether it&apos;s personal, commercial,
            or life insurance — our team is ready to help.
          </p>
        </div>

        <ul aria-label="Contact methods" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method) => {
            const Icon = method.icon
            return (
              <li key={method.title}>
                <button
                  aria-label={`Contact us by ${method.title} at ${method.action}`}
                  className="w-full h-full group bg-muted/30 hover:bg-primary/5 rounded-2xl p-6 text-left transition-all hover:shadow-lg border border-transparent hover:border-primary/10"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                  <div className="text-sm font-semibold text-primary">{method.action}</div>
                  <div className="text-xs text-muted-foreground mt-1">{method.available}</div>
                </button>
              </li>
            )
          })}
        </ul>

        {/* Email capture banner */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            {/* Left content */}
            <div className="text-white">
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                Let&apos;s Find the Right Coverage Together
              </h3>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                Drop us your email and we&apos;ll reach out to schedule a complimentary
                insurance review — whether it&apos;s for your home, your business, or your family&apos;s future.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-sm text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="home-cta-email" className="text-sm font-medium text-white mb-2 block">
                    Email Address
                  </label>
                  <Input
                    id="home-cta-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 bg-background/90 border-0 rounded-xl text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 h-14 bg-white text-primary hover:bg-white/90 rounded-xl font-semibold"
                  >
                    Request a Review
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="flex-1 h-14 bg-transparent border-2 border-white/50 text-white hover:bg-white/10 rounded-xl font-semibold"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book a Call
                  </Button>
                </div>
                <p className="text-xs text-white/60 text-center">
                  No spam. No obligation. Your information stays strictly confidential.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Schema markup */}
        <div
          itemScope
          itemType="http://schema.org/LocalBusiness"
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground"
        >
          <div className="flex flex-col items-center md:items-start">
            <span itemProp="name" className="font-bold text-foreground mb-1">Integrated Insurance Agency</span>
            <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
              <span itemProp="streetAddress">123 Local Street</span>,{' '}
              <span itemProp="addressLocality"> [Your City]</span>,{' '}
              <span itemProp="addressRegion"> [Your State]</span>
            </div>
          </div>
          <div className="flex gap-8">
            <div>
              <span className="font-semibold text-foreground">Phone: </span>
              <span itemProp="telephone">(555) 123-4567</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">Service Area: </span>
              <span>[Your Region] &amp; Surrounding Areas</span>
            </div>
          </div>
          <meta itemProp="priceRange" content="$$" />
          <meta itemProp="image" content="/logo.png" />
        </div>
      </div>
    </section>
  )
}
