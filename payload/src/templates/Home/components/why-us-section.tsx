import {
  Handshake,
  Scale,
  RefreshCw,
  HeadphonesIcon,
  ArrowRight,
} from "lucide-react"

const valueProps = [
  {
    icon: Handshake,
    title: "We Work For You, Not The Carrier",
    description:
      "As an independent brokerage, we represent your interests — not an insurance company's. Our compensation comes from placing the right policy, not from pushing a specific product.",
  },
  {
    icon: Scale,
    title: "Unbiased Comparison Shopping",
    description:
      "We have access to 20+ top-rated carriers across personal, commercial, and life insurance. That means you get multiple competitive quotes — not a single take-it-or-leave-it offer.",
  },
  {
    icon: RefreshCw,
    title: "Proactive Reviews, Not Just Renewals",
    description:
      "We don't wait for your policy to expire to check in. Life events, business changes, and market shifts all trigger a review to ensure your coverage still fits.",
  },
  {
    icon: HeadphonesIcon,
    title: "Claims Advocacy When It Matters",
    description:
      "When you need to file a claim, we're in your corner — helping navigate the process, pushing for fair settlements, and making sure your carrier delivers on its promise.",
  },
]

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            An Independent Broker in Your Corner
          </h2>
          <p className="text-lg text-muted-foreground">
            The difference between a captive agent and an independent broker isn&apos;t just choice —
            it&apos;s whose side they&apos;re on.
          </p>
        </div>

        {/* Value prop grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {valueProps.map((prop) => {
            const Icon = prop.icon
            return (
              <div
                key={prop.title}
                className="group bg-white rounded-2xl p-8 border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{prop.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom banner */}
        <div className="mt-12 bg-white border border-border rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
          <div>
            <p className="text-base font-semibold text-foreground">
              Want to learn more about how we&apos;re different?
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              We&apos;re building a dedicated page to explain exactly how an independent brokerage works for you.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex-shrink-0"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
