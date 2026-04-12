import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-background px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl rounded-2xl bg-card p-8 shadow-2xl md:p-14">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left Column — Typography */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Protecting your{" "}
              <span className="font-serif italic">legacy</span>, securing your{" "}
              <span className="font-serif italic">assets</span>.
            </h1>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Data-driven advisory for home, business, life, and wealth — built
              around what matters most to you.
            </p>
            <div>
              <Button className="rounded-md bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all duration-200 h-auto">
                Request Strategic Review
              </Button>
            </div>
          </div>

          {/* Right Column — Photo Placeholder */}
          <div className="relative flex items-center justify-center">
            {/* Geometric background circle */}
            <div className="absolute h-72 w-72 rounded-full bg-amber-100/60 md:h-96 md:w-96" />
            {/* Composite placeholder */}
            <div className="relative z-10 flex gap-3">
              <div className="flex h-52 w-40 items-center justify-center rounded-2xl bg-muted text-xs text-muted-foreground md:h-72 md:w-52">
                <div className="text-center px-3">
                  <p className="font-semibold text-foreground text-sm mb-1">Family</p>
                  <p className="text-xs">Joyful outdoor lifestyle scene</p>
                </div>
              </div>
              <div className="flex h-52 w-40 items-center justify-center rounded-2xl bg-muted text-xs text-muted-foreground md:h-72 md:w-52">
                <div className="text-center px-3">
                  <p className="font-semibold text-foreground text-sm mb-1">Advisory</p>
                  <p className="text-xs">Professional office consultation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
