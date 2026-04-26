import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaBanner() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-2xl bg-brand rounded-2xl px-10 py-12 text-center shadow-lg">
          <h2 className="text-2xl md:text-3xl font-semibold text-brand-foreground mb-3 text-balance">
            Take the{" "}
            <span className="font-serif italic">First Step</span>
          </h2>
          <p className="text-sm text-brand-foreground/80 leading-relaxed mb-7 max-w-sm mx-auto">
            Schedule a no-obligation policy review today and discover how integrated coverage can
            simplify and protect your financial future.
          </p>
          <Button
            asChild
            className="bg-white text-brand hover:bg-brand-foreground/90 rounded-full px-8 text-sm font-semibold shadow-sm"
          >
            <Link href="#quote">Start Today</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
