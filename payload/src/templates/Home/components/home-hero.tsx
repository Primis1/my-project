"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  Shield,
  Users,
  CheckCircle2,
  Star,
  Phone,
} from "lucide-react"

export function HomeHero({ data }: { data?: any }) {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("loading")
    setErrorMessage("")

    const formData = new FormData(e.currentTarget)
    const payload = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      status: "new",
    }

    try {
      const res = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Failed to submit")
      setFormStatus("success")
    } catch {
      setFormStatus("error")
      setErrorMessage("Something went wrong. Please try again or call us directly.")
    }
  }

  const headlineTop = data?.heroHeadlineTop || "Insurance That Works"
  const headlineBottom = data?.heroHeadlineBottom || "For You."
  const description = data?.heroDescription || "An independent brokerage protecting individuals, families, and businesses across personal, commercial, and life insurance — all under one roof."

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/90" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[140%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Content — 7 columns */}
          <div className="lg:col-span-7 space-y-8">
            {/* Social proof micro-badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-primary/30 border-2 border-white/20 flex items-center justify-center">
                    <Users className="w-3 h-3 text-white/70" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-white/70 font-medium">Trusted by local families & businesses</span>
            </div>

            {/* Headline */}
            <header>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                <span className="text-white">{headlineTop}</span>
                <br />
                <span className="font-serif italic text-primary">{headlineBottom}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mt-6">
                {description}
              </p>
            </header>

            {/* Value pills */}
            <div className="flex flex-wrap gap-3">
              {[
                "Independent Broker — We Work For You",
                "Personal • Commercial • Life & Income",
                "20+ Carrier Partners",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 text-sm text-white/80 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 text-base font-semibold shadow-lg shadow-primary/30"
              >
                <Phone className="w-5 h-5 mr-2" />
                Get a Free Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-10 h-14 text-base font-semibold border-2 border-white/20 text-white hover:bg-white/5 bg-transparent"
              >
                Explore Our Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Trust stat bar */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              {[
                { value: "3", label: "Divisions" },
                { value: "20+", label: "Carrier Partners" },
                { value: "100%", label: "Independent" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Lead capture form — 5 columns */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 p-8 md:p-10 border border-white/10">
              {formStatus === "success" ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">We&apos;ll Be in Touch!</h3>
                  <p className="text-sm text-muted-foreground">
                    One of our advisors will reach out shortly with a personalized review.
                  </p>
                  <Button variant="outline" onClick={() => setFormStatus("idle")} className="mt-4">
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold text-primary">Free & Confidential</span>
                    </div>
                    <h2 className="text-xl font-bold text-foreground">
                      Start Your Insurance Review
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Tell us a bit about yourself and we&apos;ll connect you with the right advisor.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="home-firstName" className="block text-xs font-medium text-foreground mb-1.5">First Name</label>
                        <Input id="home-firstName" name="firstName" placeholder="Jane" required className="h-11 rounded-lg" />
                      </div>
                      <div>
                        <label htmlFor="home-lastName" className="block text-xs font-medium text-foreground mb-1.5">Last Name</label>
                        <Input id="home-lastName" name="lastName" placeholder="Doe" required className="h-11 rounded-lg" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="home-email" className="block text-xs font-medium text-foreground mb-1.5">Email</label>
                      <Input id="home-email" name="email" type="email" placeholder="jane@example.com" required className="h-11 rounded-lg" />
                    </div>
                    <div>
                      <label htmlFor="home-phone" className="block text-xs font-medium text-foreground mb-1.5">Phone</label>
                      <Input id="home-phone" name="phone" type="tel" placeholder="(555) 123-4567" required className="h-11 rounded-lg" />
                    </div>

                    {formStatus === "error" && (
                      <p className="text-sm text-destructive text-center">{errorMessage}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-12 text-sm font-semibold shadow-md mt-2"
                    >
                      {formStatus === "loading" ? "Submitting..." : "Get My Free Review"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    No spam. No obligation. Your info stays with us.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
