export default function Collections() {
  return (
    <section className="py-32 px-4 md:px-12 lg:px-24 bg-charcoal-light border-b border-border-subtle relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-noise pointer-events-none animate-grain-shift"></div>
      <div className="max-w-8xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 timeline-entry effect-slide-up">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-rice-paper tracking-tight mb-4 timeline-entry effect-blur-in">
              Curated Collections
            </h2>
            <p className="text-stone-warm text-lg font-light max-w-md timeline-entry effect-blur-in effect-stagger-1">
              Discover our latest kiln firings, limited editions, and seasonal sets.
            </p>
          </div>
          <a
            className="group text-clay font-bold uppercase text-[11px] tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2 pb-2 border-b border-transparent hover:border-white timeline-entry effect-blur-in effect-stagger-2"
            href="#"
          >
            View All Collections{" "}
            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1 duration-500">
              arrow_forward
            </span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[460px]">
          {/* Featured Product - Large */}
          <div className="group relative md:col-span-2 md:row-span-2 overflow-hidden bg-charcoal border border-border-subtle cursor-pointer shadow-2xl timeline-entry effect-curtain-up">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-in-out group-hover:scale-105 opacity-80 group-hover:opacity-70 timeline-cover effect-parallax-bg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBuPDqQWBYc0fHxsUDKPMhWbnD4QdWHA7M3PQhRYirw7q0puczUOd0lxSIRUF2fidf1QYY4YcN-TwSPVSTmE3T7tnAwjNqS88jVE6qZ5CRMZYeZBsWN8QZYI-H3FVuaTvoDAA3qkNQ5UajRBYyhfRUa9XyOeZn-TlBdFOtY5i3NVIKXYim7UwTo8xgKZ0m6kdZKNsRQY5zjWeESH-_dMw63d81UbJX-1_n2UF-ydvaWeg7lYTQ9qQYUk9oLkevJ5iGbp1J4GkgWzXAF")',
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80"></div>
            <div className="absolute bottom-0 left-0 p-10 md:p-14 text-white w-full">
              <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-out timeline-center effect-parallax-text">
                <span className="bg-clay/90 text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest mb-5 inline-block backdrop-blur-sm shadow-lg animate-float-slow">
                  Best Seller
                </span>
                <h3 className="text-4xl md:text-6xl font-serif italic mb-4 text-rice-paper drop-shadow-lg">
                  The Kyoto Dinner Set
                </h3>
                <p className="text-stone-300 mb-8 font-light text-lg max-w-md leading-relaxed drop-shadow-md">
                  Complete service for four, finished in matte stone glaze. A tribute to traditional Kaiseki dining.
                </p>
                <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-3xl font-serif font-light text-white">$240.00</span>
                  <span className="h-px w-12 bg-white/30"></span>
                  <span className="uppercase text-[11px] tracking-widest font-bold hover:text-clay transition-colors flex items-center gap-2">
                    Shop Now <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Card 1 */}
          <div className="group flex flex-col gap-4 bg-charcoal border border-border-subtle p-4 hover:border-white/10 transition-colors duration-500 hover:bg-white/5 timeline-entry effect-blur-in effect-stagger-1">
            <div className="h-[75%] w-full overflow-hidden relative bg-black/20 timeline-entry effect-curtain-up">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 timeline-cover effect-parallax-bg"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBpIiubKDNOmyXyvkp1GQTFxTw-vcjAPhrFRflWI3xamBf40EpFCCCkTTZdd-Vw-qMaQva74FxjxLgtYPorLjx9-j5FmKrW0EVK2-Wj2LndgQ0JY1cWPm7W1sJ08Z2W7oeRxqimpuXlN1rvXAIn1kqJ0kbKE65Sa6hBq4Wxs88huL8jJIS0NquICBcXNG2WsMTkI87AOSdnhJ-wFLnUAkJjIvh7e8oYxk3mHwr6fhALilmFCq3lHOPwpN9TWtecaVncirBqeQ710-3b")',
                }}
              ></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              <button className="absolute top-3 right-3 bg-charcoal/80 backdrop-blur-md p-2 rounded-full text-stone-warm hover:text-clay hover:scale-110 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                <span className="material-symbols-outlined text-[16px] block">favorite</span>
              </button>
            </div>
            <div className="flex flex-col flex-1 justify-between px-1">
              <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="text-xl font-serif text-rice-paper group-hover:text-clay transition-colors">
                  Morning Ritual Mug
                </h3>
                <p className="text-[10px] text-stone-warm uppercase tracking-widest mt-1">Stoneware • Hand-dipped</p>
              </div>
              <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                <span className="text-lg font-light font-serif text-white">$32.00</span>
                <button className="text-stone-warm hover:text-white transition-colors text-[10px] font-bold uppercase tracking-wider group-hover:underline decoration-clay decoration-1 underline-offset-4">
                  Add to Bag
                </button>
              </div>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="group flex flex-col gap-4 bg-charcoal border border-border-subtle p-4 hover:border-white/10 transition-colors duration-500 hover:bg-white/5 timeline-entry effect-blur-in effect-stagger-2">
            <div className="h-[75%] w-full overflow-hidden relative bg-black/20 timeline-entry effect-curtain-up">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 timeline-cover effect-parallax-bg"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBtHSu2maI6qNCAGDPGbAE3Y4xVZ59o_ExD-CRjwLGXtkvmV4KyYltw0xxDLOAuhHaKLrkJeUjLuQmOLoarzhmDbngVXWcd7oQP3zPoTch5llhluB7_24SAAz_vhkmS_G1-tBuZ23FOcXz7-dNUaBIJ3B29Zoqp1GueZ0lT36KtAZmexPe5ITXRBfuIToETX7eTw5mEuTfvXNaZC6uqs04EeOU4O83sF9cDmxf-IvNI0JouAl8JkfBhOt9gZENCjDuKKZ-1lktJNMdJ")',
                }}
              ></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              <button className="absolute top-3 right-3 bg-charcoal/80 backdrop-blur-md p-2 rounded-full text-stone-warm hover:text-clay hover:scale-110 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                <span className="material-symbols-outlined text-[16px] block">favorite</span>
              </button>
            </div>
            <div className="flex flex-col flex-1 justify-between px-1">
              <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="text-xl font-serif text-rice-paper group-hover:text-clay transition-colors">
                  Ikebana Vase
                </h3>
                <p className="text-[10px] text-stone-warm uppercase tracking-widest mt-1">Speckled Clay • Organic Shape</p>
              </div>
              <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                <span className="text-lg font-light font-serif text-white">$85.00</span>
                <button className="text-stone-warm hover:text-white transition-colors text-[10px] font-bold uppercase tracking-wider group-hover:underline decoration-clay decoration-1 underline-offset-4">
                  Add to Bag
                </button>
              </div>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="group flex flex-col gap-4 bg-charcoal border border-border-subtle p-4 hover:border-white/10 transition-colors duration-500 hover:bg-white/5 timeline-entry effect-blur-in effect-stagger-1">
            <div className="h-[75%] w-full overflow-hidden relative bg-black/20 timeline-entry effect-curtain-up">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 timeline-cover effect-parallax-bg"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDWnDEJIEnX4WOsheKZ1kpVvS1wH5Vzzr--DNvfOQ44XMkq1L-h6w9VqIGwRcxHYTqM7F4tYnSFvXABCQJPd8YqTFpb-5-_f6nWTZPXI8wGkTwz_Fo2MGcpEyOAbHybBZ3qTA7cfFKVTHHsAUZShFXMgBHMguG6esgVYsDF74egO5T8cmJvZOQglOfAsjCFqtB6qXsmreLB7B8E2PbDfpkXEA2gMD_0rw99aLS7hPzNR0EXarg-TuWYC-tsiR3xbE4WQIrx4teShG84")',
                }}
              ></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              <button className="absolute top-3 right-3 bg-charcoal/80 backdrop-blur-md p-2 rounded-full text-stone-warm hover:text-clay hover:scale-110 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                <span className="material-symbols-outlined text-[16px] block">favorite</span>
              </button>
            </div>
            <div className="flex flex-col flex-1 justify-between px-1">
              <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="text-xl font-serif text-rice-paper group-hover:text-clay transition-colors">
                  Chawan Matcha Bowl
                </h3>
                <p className="text-[10px] text-stone-warm uppercase tracking-widest mt-1">Raku Fired • Unique Glaze</p>
              </div>
              <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                <span className="text-lg font-light font-serif text-white">$55.00</span>
                <button className="text-stone-warm hover:text-white transition-colors text-[10px] font-bold uppercase tracking-wider group-hover:underline decoration-clay decoration-1 underline-offset-4">
                  Add to Bag
                </button>
              </div>
            </div>
          </div>

          {/* Product Card 4 */}
          <div className="group flex flex-col gap-4 bg-charcoal border border-border-subtle p-4 hover:border-white/10 transition-colors duration-500 hover:bg-white/5 timeline-entry effect-blur-in effect-stagger-2">
            <div className="h-[75%] w-full overflow-hidden relative bg-black/20 timeline-entry effect-curtain-up">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 timeline-cover effect-parallax-bg"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBPFit41-EvWZZ6xy9vZ37d43IqiUAzgxR3ASW-NKVzi0gbKgg7zvX14nFJW6zhoRjxPBMevfNwsvWvBcl4-i3qRbA0HO9GJl5FT-V3c1ExbOrpFblszgrplrZ7JLI1m0hs19KuHBDgRPLk8L-gjPhhaH1gy99kCCItVv4XRGOu-s-d7DgBj1MuCGMqQnZmxdY-W-Km-3W14m6LnCqQlj5j-TywKWOhvdTTYsfWRyTZqS_lFK-IsKq9PLBE1Ea83QxMpoeODoUGIJHC")',
                }}
              ></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              <button className="absolute top-3 right-3 bg-charcoal/80 backdrop-blur-md p-2 rounded-full text-stone-warm hover:text-clay hover:scale-110 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                <span className="material-symbols-outlined text-[16px] block">favorite</span>
              </button>
            </div>
            <div className="flex flex-col flex-1 justify-between px-1">
              <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="text-xl font-serif text-rice-paper group-hover:text-clay transition-colors">
                  Incense Burner
                </h3>
                <p className="text-[10px] text-stone-warm uppercase tracking-widest mt-1">Black Clay • Minimalist</p>
              </div>
              <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                <span className="text-lg font-light font-serif text-white">$28.00</span>
                <button className="text-stone-warm hover:text-white transition-colors text-[10px] font-bold uppercase tracking-wider group-hover:underline decoration-clay decoration-1 underline-offset-4">
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

