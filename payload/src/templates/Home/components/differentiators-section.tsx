import {
  Handshake,
  RefreshCw,
  HeadphonesIcon,
  DollarSign,
  ArrowRight,
} from 'lucide-react'

const differentiators = [
  {
    icon: Handshake,
    title: 'Independent Broker — We Work For You',
    description:
      'We represent your interests, not an insurance company\'s. Our job is to find the best coverage at the best price — across 20+ carriers, not from a single product shelf.',
  },
  {
    icon: RefreshCw,
    title: 'Proactive Reviews, Not Just Renewals',
    description:
      'We don\'t disappear after binding your policy. We conduct regular check-ins — quarterly for commercial, annually for personal — to catch changes in your life, business, or market conditions before gaps appear.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Claims Advocacy When It Matters',
    description:
      'When a claim happens, we don\'t hand you a 1-800 number. We actively manage the process — documenting losses, communicating with adjusters, and fighting for a fair settlement on your behalf.',
  },
  {
    icon: DollarSign,
    title: 'Save on Premiums & Claims',
    description:
      'Competitive shopping saves money upfront. Our loss-control recommendations and proactive risk management reduce claims over time — which keeps your premiums down year after year.',
  },
]

export function DifferentiatorsSection() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            What Makes Us Different
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            An Independent Broker in Your Corner
          </h2>
          <p className="text-lg text-muted-foreground">
            The difference between a captive agent and an independent broker isn&apos;t just
            choice — it&apos;s whose side they&apos;re on.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {differentiators.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="group relative bg-white rounded-2xl p-8 border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                {/* Accent top bar on hover */}
                <div className="absolute top-0 left-8 right-8 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
                
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
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
              Ready to see the difference an independent broker makes?
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Whether it&apos;s personal, commercial, or life insurance — we&apos;re here to help.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
