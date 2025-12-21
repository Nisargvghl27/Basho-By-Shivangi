export default function Philosophy() {
  return (
    <section className="py-32 px-6 md:px-20 lg:px-40 bg-charcoal relative overflow-hidden border-b border-border-subtle">
      <div className="absolute inset-0 opacity-20 bg-noise pointer-events-none mix-blend-overlay animate-grain-shift"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-charcoal-light to-transparent opacity-40 pointer-events-none animate-pulse-glow"></div>
      <div className="max-w-[1024px] mx-auto text-center flex flex-col items-center gap-20 relative z-10">
        <div className="flex flex-col items-center gap-6">
          <span className="text-clay text-[11px] font-bold uppercase tracking-[0.3em] timeline-entry effect-blur-in">
            Our Philosophy
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light leading-[1.2] text-rice-paper max-w-4xl timeline-entry effect-blur-in" style={{ animationDelay: "0.2s" }}>
            "We create pieces that invite you to{" "}
            <span className="italic text-stone-warm inline-block animate-pulse-glow">slow down</span>, to hold, and to savor the moment."
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full">
          <div className="flex flex-col items-center gap-6 text-center group timeline-entry effect-slide-up effect-stagger-1">
            <div className="size-20 rounded-full border border-white/5 bg-charcoal-light flex items-center justify-center mb-2 transition-all duration-700 group-hover:border-clay/50 group-hover:bg-clay/10 transform group-hover:scale-110 group-hover:rotate-12">
              <span className="material-symbols-outlined text-3xl text-stone-warm group-hover:text-clay transition-colors duration-500 font-light">
                spa
              </span>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-medium text-rice-paper tracking-wide">Wabi-Sabi Spirit</h3>
              <p className="text-stone-warm text-sm leading-relaxed px-2 font-light">
                Celebrating the beauty in imperfections and the natural cycle of growth and decay.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 text-center group timeline-entry effect-slide-up effect-stagger-2">
            <div className="size-20 rounded-full border border-white/5 bg-charcoal-light flex items-center justify-center mb-2 transition-all duration-700 group-hover:border-clay/50 group-hover:bg-clay/10 transform group-hover:scale-110 group-hover:-rotate-12">
              <span className="material-symbols-outlined text-3xl text-stone-warm group-hover:text-clay transition-colors duration-500 font-light">
                fingerprint
              </span>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-medium text-rice-paper tracking-wide">Hand-Thrown</h3>
              <p className="text-stone-warm text-sm leading-relaxed px-2 font-light">
                Each bowl, cup, and vase is individually shaped on the wheel by master artisans.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 text-center group timeline-entry effect-slide-up effect-stagger-3">
            <div className="size-20 rounded-full border border-white/5 bg-charcoal-light flex items-center justify-center mb-2 transition-all duration-700 group-hover:border-clay/50 group-hover:bg-clay/10 transform group-hover:scale-110 group-hover:rotate-12">
              <span className="material-symbols-outlined text-3xl text-stone-warm group-hover:text-clay transition-colors duration-500 font-light">
                eco
              </span>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-medium text-rice-paper tracking-wide">Earth-Sourced</h3>
              <p className="text-stone-warm text-sm leading-relaxed px-2 font-light">
                We use locally sourced organic clays and lead-free, natural mineral glazes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

