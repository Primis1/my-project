import { Handshake, Building2, Shield, CheckCircle } from "lucide-react"

const partnerTypes = [
  {
    icon: Building2,
    title: "Insurance Carriers",
    description: "We work with top-rated national and regional insurance carriers to provide you with competitive rates and comprehensive coverage options.",
    partners: ["Liberty Mutual", "Nationwide", "Travelers", "Hartford", "Progressive", "Allstate"],
  },
  {
    icon: Handshake,
    title: "Broker Networks",
    description: "Our membership in leading broker networks gives us access to exclusive programs and specialized coverage unavailable elsewhere.",
    partners: ["Independent Insurance Agents", "Big I", "PIA", "NAIA", "IIABA", "SIAA"],
  },
  {
    icon: Shield,
    title: "Specialty Markets",
    description: "For unique risks and hard-to-place coverage, we connect with specialty markets and surplus lines carriers.",
    partners: ["Lloyd's of London", "Markel", "Chubb", "AIG", "Berkshire Hathaway", "Swiss Re"],
  },
]

const benefits = [
  "Access to 50+ A-rated insurance carriers",
  "Competitive quotes from multiple providers",
  "Specialized coverage for unique risks",
  "Claims advocacy and support",
  "Annual policy reviews and optimization",
  "Dedicated account management",
]

export function PartnersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-3">
            Our Partners
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-balance">
            Backed by <span className="font-serif italic">Industry</span> Leaders
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            As an independent agency, we partner with the best carriers in the industry to bring 
            you choice, value, and peace of mind.
          </p>
        </div>

        {/* Partner Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {partnerTypes.map((type) => {
            const Icon = type.icon
            return (
              <div
                key={type.title}
                className="bg-gray-50/50 rounded-2xl p-8 border border-transparent hover:border-brand/20 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-brand" strokeWidth={1.5} />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3">{type.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{type.description}</p>

                <div className="flex flex-wrap gap-2">
                  {type.partners.map((partner) => (
                    <span
                      key={partner}
                      className="inline-block px-3 py-1 bg-white border border-border rounded-full text-xs text-muted-foreground"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Benefits Banner */}
        <div className="bg-gradient-to-br from-[#1d4ed8] to-blue-700 rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                The Independent Advantage
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Unlike captive agents who represent a single carrier, we work for you. Our 
                independent status means we can shop the market to find the best coverage 
                at the best price — every time.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white/80 shrink-0" strokeWidth={1.5} />
                  <span className="text-white/90 text-xs">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
