export default function Journal() {
  return (
    <section className="py-32 bg-charcoal border-t border-border-subtle relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="flex justify-between items-end mb-20 border-b border-white/5 pb-8 timeline-entry effect-slide-up">
          <div>
            <span className="text-clay text-[11px] font-bold uppercase tracking-[0.25em] block mb-3 timeline-entry effect-blur-in">
              The Journal
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-rice-paper timeline-entry effect-blur-in">
              From the Kiln
            </h2>
          </div>
          <a
            className="hidden md:flex text-[11px] font-bold text-stone-warm uppercase tracking-[0.2em] hover:text-clay transition-colors items-center gap-2 group timeline-entry effect-blur-in"
            href="#"
          >
            Read the Journal{" "}
            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1 duration-500">
              arrow_forward
            </span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <article className="group cursor-pointer flex flex-col h-full timeline-entry effect-slide-up effect-stagger-1">
            <div className="overflow-hidden mb-6 aspect-[4/3] relative border border-white/5 timeline-entry effect-curtain-up">
              <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent z-10 transition-colors duration-500"></div>
              <img
                alt="Kintsugi bowl with gold repair lines"
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-90 group-hover:opacity-100 timeline-cover effect-parallax-bg"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEIfox2_RhffZMthU_0455T2T0qA67aVteu2MjYeFhzc-bTvikl-By0Lr2nN4EBoIoPvfku5jkx2jXC6GvFvy2azq1ppXJyPd2cxwKY93nEB9cjeLMt_vkyZo-7rfi_gIhnaU85TAD-HC_JnhRpOOlYZOI2nzJnqmVUzDBlrFioCdy1gKvEVKhaZCV76q73MgniAIO3-QfPMOP519iGK_Sn8pQvVXHTvlNq_u2s7pv68x5yXYMjKo22OyAKYt75DtHrtQlxKVzwIXG"
              />
            </div>
            <div className="flex flex-col flex-1 transform transition-transform duration-500 group-hover:-translate-y-2">
              <span className="text-[10px] font-bold text-clay uppercase tracking-[0.2em] mb-4">Philosophy</span>
              <h3 className="text-2xl font-serif leading-tight mb-4 group-hover:text-clay transition-colors text-rice-paper">
                Embracing Brokenness: The Kintsugi Method
              </h3>
              <p className="text-sm text-stone-warm leading-relaxed line-clamp-3 mb-6 font-light group-hover:text-stone-300 transition-colors">
                How the ancient Japanese art of repairing pottery with gold teaches us resilience and to find beauty in
                our scars.
              </p>
              <span className="mt-auto text-[10px] font-bold uppercase tracking-widest text-white border-b border-white/20 pb-1 w-fit group-hover:border-clay group-hover:text-clay transition-all hover-underline-expand">
                Read Article
              </span>
            </div>
          </article>

          <article className="group cursor-pointer flex flex-col h-full timeline-entry effect-slide-up effect-stagger-2">
            <div className="overflow-hidden mb-6 aspect-[4/3] relative border border-white/5 timeline-entry effect-curtain-up">
              <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent z-10 transition-colors duration-500"></div>
              <img
                alt="Potter hands covered in clay"
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-90 group-hover:opacity-100 timeline-cover effect-parallax-bg"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoWpHvQqXJp-1iMzpW4jIgwO9ZF-SIgLahi4kjHJOMNaJFVe0gM0dV17v8I7m4iv_2r9QWzywA9TraoiIHmdu4MxVpgw_Q9J4nwJ7VCvTMj-oCwbnMt_Cgbol7WQuPVZV5j0Vlr_jaRKaFMflK2Lx8bz6nXYlKzl3LaVPGn2QZ31-GaDo59KMc2yB_BPV_wW7xRsBOpcT7HVLtaSaumNw6yaOtvv7_fX1aBJm9t5peekAsS3IphjOW3pbwrtb9P2_GfaWvb2ho9IlP"
              />
            </div>
            <div className="flex flex-col flex-1 transform transition-transform duration-500 group-hover:-translate-y-2">
              <span className="text-[10px] font-bold text-clay uppercase tracking-[0.2em] mb-4">Behind the Scenes</span>
              <h3 className="text-2xl font-serif leading-tight mb-4 group-hover:text-clay transition-colors text-rice-paper">
                A Day in the Studio
              </h3>
              <p className="text-sm text-stone-warm leading-relaxed line-clamp-3 mb-6 font-light group-hover:text-stone-300 transition-colors">
                Follow our master potter through a typical day of throwing, trimming, and glazing. The rhythm of the
                wheel.
              </p>
              <span className="mt-auto text-[10px] font-bold uppercase tracking-widest text-white border-b border-white/20 pb-1 w-fit group-hover:border-clay group-hover:text-clay transition-all hover-underline-expand">
                Read Article
              </span>
            </div>
          </article>

          <article className="group cursor-pointer flex flex-col h-full timeline-entry effect-slide-up effect-stagger-3">
            <div className="overflow-hidden mb-6 aspect-[4/3] relative border border-white/5 timeline-entry effect-curtain-up">
              <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent z-10 transition-colors duration-500"></div>
              <img
                alt="Minimalist table setting with tea"
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-90 group-hover:opacity-100 timeline-cover effect-parallax-bg"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzHz7Fo3XMPbaSoTTwiIKjmIlBOxKyHEwBm2wTLiRO99sCWtxEJ8jeN1BemrToQyM-6JpWaSUHa8rcMtNhQx7g3m-7cw4opdMfpDb9Pt1G5w_IKPrImxo67kjpeMOG--tVUaSWreRNv2tacBHVV8t8FAGQvFkpZ8vDzNOsnvs1HY-DzlhredGHPdCij2erP_BShnh3KiBozJwnFUGM8WSVikfGSSuoGEnmHISNm2i0fQ39XeQ9kaoSbvBNuBNwboRWO19Un08DVCEA"
              />
            </div>
            <div className="flex flex-col flex-1 transform transition-transform duration-500 group-hover:-translate-y-2">
              <span className="text-[10px] font-bold text-clay uppercase tracking-[0.2em] mb-4">Living</span>
              <h3 className="text-2xl font-serif leading-tight mb-4 group-hover:text-clay transition-colors text-rice-paper">
                Slow Morning Rituals
              </h3>
              <p className="text-sm text-stone-warm leading-relaxed line-clamp-3 mb-6 font-light group-hover:text-stone-300 transition-colors">
                Why using handmade objects can transform your daily coffee routine into a meditation. The weight of the
                cup.
              </p>
              <span className="mt-auto text-[10px] font-bold uppercase tracking-widest text-white border-b border-white/20 pb-1 w-fit group-hover:border-clay group-hover:text-clay transition-all hover-underline-expand">
                Read Article
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

