export default function Hero() {
  return (
    <div className="@container w-full">
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-slow-pan"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDuVBKg5R8BQ98bLvmSRZr_JtsluSdDs-ck4GdifTFrFOtqKJCfWD3swZ9sIcgedJgiUc5IUJNbt-ez0rWo7SJAm8JTsmTkqA7ZwgorQkaQYgs7AqAtMshNOsfZSl9DwKOSTFfJLGqp8rCkolDt4ZrWs0fkg9p9tnGZvPZN7nKoEp7s2XvX6Y1DIcIShYbViy8BBLgdZ7HgJ3kpcNnjRy93bVueqobZigt2Xm6YkQZJNdsd4xrRUcquFkoEfmwbTIjMCDe7IOCxs76u")' }}
        ></div>
        <div className="absolute inset-0 opacity-[0.07] bg-noise mix-blend-overlay pointer-events-none animate-grain-shift"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal"></div>
        <div className="absolute inset-0 bg-obsidian/30 mix-blend-multiply"></div>
        <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center max-w-6xl mt-10">
          <span
            className="text-white/80 text-xs font-bold uppercase tracking-[0.4em] mb-2 drop-shadow-sm border-b border-white/20 pb-2 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Est. 2023 • Kyoto Inspired
          </span>
          <h1 className="text-rice-paper text-6xl md:text-8xl lg:text-9xl font-serif font-medium tracking-tight leading-none drop-shadow-2xl">
            <span
              className="block animate-fade-in-up"
              style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
            >
              Imperfection
            </span>
            <span
              className="block italic font-light opacity-80 text-stone-300 animate-fade-in-up"
              style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
            >
              is Beauty
            </span>
          </h1>
          <h2
            className="text-stone-300 text-lg md:text-xl font-sans font-light max-w-2xl leading-relaxed mt-2 tracking-wide animate-fade-in-up"
            style={{ animationDelay: "0.8s", opacity: 0, animationFillMode: "forwards" }}
          >
            Handcrafted pottery for the mindful home. <br className="hidden md:block" />
            Embracing the soulful asymmetry of wabi-sabi.
          </h2>
          <div
            className="pt-10 animate-fade-in-up"
            style={{ animationDelay: "1.0s", opacity: 0, animationFillMode: "forwards" }}
          >
            <button className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-sm border border-white/20 bg-white/5 px-12 backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-white w-52 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <span className="relative text-xs font-bold uppercase tracking-[0.25em] text-white transition-colors duration-300 group-hover:text-rice-paper z-10">
                Discover
              </span>
              <div className="absolute inset-0 bg-clay/80 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
            </button>
          </div>
        </div>
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 animate-bounce-slow flex flex-col items-center gap-2 animate-fade-in"
          style={{ animationDelay: "1.5s" }}
        >
          <span className="text-[10px] uppercase tracking-widest font-light">Scroll</span>
          <span className="material-symbols-outlined text-2xl font-light">keyboard_arrow_down</span>
        </div>
      </div>
    </div>
  );
}

