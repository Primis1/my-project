import {
  Shield,
  Building2,
  Heart,
  ArrowRight,
  Car,
  Home,
  Wallet,
  Briefcase,
  HeartPulse,
  Stethoscope,
} from "lucide-react"

const divisions = [
  {
    id: "personal",
    icon: Shield,
    title: "Personal Lines",
    tagline: "Protect Your World",
    description:
      "Auto, home, umbrella, and specialty coverages — we shop 20+ carriers to find you the best rate without sacrificing coverage.",
    href: "/personal-lines",
    products: [
      { icon: Car, label: "Auto" },
      { icon: Home, label: "Home" },
      { icon: Shield, label: "Umbrella" },
    ],
    color: "primary",
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial Lines",
    tagline: "Secure Your Business",
    description:
      "General liability, commercial auto, property, and surety bonds — tailored risk management for businesses of every size.",
    href: "/commercial-lines",
    products: [
      { icon: Shield, label: "GL" },
      { icon: Building2, label: "Property" },
      { icon: Briefcase, label: "Surety" },
    ],
    color: "primary",
  },
  {
    id: "life-income",
    icon: Heart,
    title: "Life & Income",
    tagline: "Plan With Confidence",
    description:
      "Life insurance, income replacement, and health benefit plans — quality guidance for the moments that matter most.",
    href: "/life-income",
    products: [
      { icon: HeartPulse, label: "Life" },
      { icon: Wallet, label: "Income" },
      { icon: Stethoscope, label: "Health" },
    ],
    color: "emerald",
  },
]

export function DivisionsSection() {
  return (
    <section id="divisions" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Our Divisions
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Three Specialties. One Trusted Partner.
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you&apos;re protecting your family, your business, or your future income —
            we have a dedicated team for every need.
          </p>
        </div>

        {/* Division cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {divisions.map((div) => {
            const Icon = div.icon
            const isEmerald = div.color === "emerald"
            return (
              <a
                key={div.id}
                href={div.href}
                className="group relative bg-muted/20 rounded-3xl p-8 md:p-10 border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Icon & tag */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isEmerald ? 'bg-emerald-100 group-hover:bg-emerald-200' : 'bg-primary/10 group-hover:bg-primary/15'} transition-colors`}>
                    <Icon className={`w-7 h-7 ${isEmerald ? 'text-emerald-600' : 'text-primary'}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{div.title}</h3>
                    <p className={`text-sm font-medium ${isEmerald ? 'text-emerald-600' : 'text-primary'}`}>{div.tagline}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  {div.description}
                </p>

                {/* Product icons */}
                <div className="flex gap-3 mb-8 mt-auto">
                  {div.products.map((prod) => {
                    const ProdIcon = prod.icon
                    return (
                      <span key={prod.label} className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-white border border-border rounded-full px-3 py-1.5">
                        <ProdIcon className="w-3.5 h-3.5" />
                        {prod.label}
                      </span>
                    )
                  })}
                </div>

                {/* CTA */}
                <div className={`inline-flex items-center gap-2 text-sm font-semibold ${isEmerald ? 'text-emerald-600' : 'text-primary'}`}>
                  Explore {div.title}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
