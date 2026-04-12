
export function TargetAudiences() {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-3">
            Who We Serve
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-balance">
            Solutions for <span className="font-serif italic">Every</span> Stage of Life
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            We understand that insurance needs vary based on your life situation. That is why we 
            offer specialized solutions for entrepreneurs, families, and individuals alike.
          </p>
        </div>

        {/* Audience Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {audiences.map((audience) => {
            const Icon = audience.icon
            return (
              <div
                key={audience.title}
                className="group bg-white rounded-2xl overflow-hidden border border-border hover:border-brand/20 hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={audience.image}
                    alt={audience.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{audience.title}</div>
                      <div className="text-white/70 text-xs">{audience.subtitle}</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {audience.description}
                  </p>

                  <div className="mb-6">
                    <div className="text-xs font-semibold uppercase tracking-wide text-foreground mb-3">
                      Key Coverage Needs
                    </div>
                    <ul className="space-y-2">
                      {audience.needs.map((need) => (
                        <li key={need} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                          {need}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="#contact-section"
                    className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-hover transition-colors"
                  >
                    {audience.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
