'use client'

import {
  Baby,
  Heart,
  Briefcase,
  Sunset,
  ArrowRight,
  TrendingDown,
  CalendarHeart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const lifeEvents = [
  {
    step: 1,
    icon: Heart,
    title: 'Marriage & Partnership',
    description:
      'When you join lives, your financial obligations shift. We assess income replacement needs, beneficiary updates, and whether your existing coverage still fits your new reality.',
  },
  {
    step: 2,
    icon: Baby,
    title: 'Growing Your Family',
    description:
      'A new child changes everything. We help calculate the coverage gap — factoring in childcare, education costs, and the income your family would need if something happened to you.',
  },
  {
    step: 3,
    icon: Briefcase,
    title: 'Career & Business Changes',
    description:
      'Starting a business, changing jobs, or losing employer benefits? We review your income protection, ensure continuity of coverage, and assess key-person or buy-sell needs.',
  },
  {
    step: 4,
    icon: Sunset,
    title: 'Pre-Retirement & Legacy Planning',
    description:
      'As retirement approaches, we shift focus from income replacement to wealth preservation — reviewing cash value strategies, estate transfer tools, and guaranteed income options.',
  },
]

const stats = [
  { value: 'Life-Event', label: 'triggered reviews — not just annual' },
  { value: '85%', label: 'of clients are underinsured at first assessment' },
  { value: '100%', label: 'of needs analyses are complimentary' },
]

export function AdvisorySection() {
  return (
    <section id="life-advisory" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Life-Event Driven Advisory
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Your Coverage Should Evolve With Your Life
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We don&apos;t wait for an annual renewal to check in. Every major life milestone
              is an opportunity to reassess your protection — ensuring your family and income
              are covered at every stage.
            </p>

            {/* Stats */}
            <ul className="grid sm:grid-cols-3 gap-6 mb-8">
              {stats.map((stat) => (
                <li key={stat.label} className="text-center sm:text-left">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground leading-snug">{stat.label}</div>
                </li>
              ))}
            </ul>

            <Button size="lg" className="bg-primary hover:opacity-90 text-primary-foreground rounded-full px-8">
              Schedule a Needs Analysis
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Right — life events */}
          <div className="relative">
            <header className="sr-only">
              <h3>Life-Event Review Process</h3>
            </header>

            <ol aria-label="Life-event triggered advisory milestones" className="space-y-6">
              {lifeEvents.map((event) => {
                const Icon = event.icon
                return (
                  <li key={event.step} className="relative flex gap-5">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-14 h-14 bg-primary/5 border-2 border-primary/20 rounded-xl flex items-center justify-center z-10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-muted/30 rounded-xl p-5 hover:bg-primary/5 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                          Milestone {event.step}
                        </span>
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>

            {/* Result callout */}
            <div className="mt-8 z-50 bg-emerald-50 border border-emerald-300 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CalendarHeart className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 mb-1">Always Up to Date</h4>
                <p className="text-sm text-emerald-600">
                  Life doesn&apos;t follow an annual calendar, and neither do we. Whether it&apos;s a
                  new baby or a career change, we&apos;re here to make sure your coverage keeps pace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
