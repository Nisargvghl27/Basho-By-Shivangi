export default function Workshop() {
  return (
    <section className="py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-charcoal-light/30 to-transparent pointer-events-none animate-pulse-glow"></div>
      <div className="layout-container max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
        <div className="bg-charcoal-light border border-border-subtle overflow-hidden shadow-2xl flex flex-col lg:flex-row h-auto lg:min-h-[600px] group transition-all duration-700 hover:shadow-[0_20px_50px_-12px_rgba(166,93,61,0.15)] timeline-entry effect-slide-up">
          <div className="w-full lg:w-1/2 relative min-h-[400px] overflow-hidden timeline-entry effect-curtain-up">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105 opacity-80 timeline-cover effect-parallax-bg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAqPHp0lQAScI4atlNSbs-dI3zrZ2nmcw7B87KkrrfHulxT-y52_VUndKiJ-9ROyZngKLCtZYDBjG5rWtic-fbpGeEwaq6-RdxnB3yLtsNcvCdA7MZLNlzVWeimpAC2xs5P9YgOMg58SJpYyohN1REMXU1ALbHP4PwBWD8Ia0DuFpjlB2o89BwSZXPpa16FmpBtTWFWHpCZIvuy2qUBc_MtQ6RKdA1I2sqVroZW63TNjbKi1aVuUGA-ExeqsL0X2KzK4wnHK4a_7Pno")',
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal-light/80 via-charcoal-light/20 to-transparent"></div>
          </div>
          <div className="w-full lg:w-1/2 p-10 lg:p-20 flex flex-col justify-center gap-10 relative z-10 bg-charcoal-light/95 lg:bg-transparent">
            <span className="absolute top-8 right-8 text-[120px] leading-none text-white/5 font-serif select-none pointer-events-none timeline-entry effect-scale-up effect-parallax-text">
              01
            </span>
            <div className="timeline-entry effect-blur-in">
              <span className="inline-block px-3 py-1 bg-clay/10 text-clay border border-clay/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm animate-float-delayed">
                Upcoming Workshop
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif text-rice-paper leading-tight mb-3">
                The Art of <br /> <span className="italic text-clay">Wheel Throwing</span>
              </h2>
              <p className="text-stone-warm font-light text-lg">Beginner's Intensive</p>
            </div>
            <div className="flex flex-col gap-6 py-6 border-y border-white/5 timeline-entry effect-slide-up effect-stagger-1">
              <div className="flex items-center gap-5 group/item cursor-default">
                <div className="p-2.5 bg-white/5 rounded-full text-clay group-hover/item:bg-clay group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300">
                  <span className="material-symbols-outlined text-lg">calendar_today</span>
                </div>
                <span className="text-sm font-medium text-stone-200 tracking-wide group-hover/item:text-white transition-colors">
                  Saturday, October 28th
                </span>
              </div>
              <div className="flex items-center gap-5 group/item cursor-default">
                <div className="p-2.5 bg-white/5 rounded-full text-clay group-hover/item:bg-clay group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                </div>
                <span className="text-sm font-medium text-stone-200 tracking-wide group-hover/item:text-white transition-colors">
                  10:00 AM - 2:00 PM
                </span>
              </div>
              <div className="flex items-center gap-5 group/item cursor-default">
                <div className="p-2.5 bg-white/5 rounded-full text-clay group-hover/item:bg-clay group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300">
                  <span className="material-symbols-outlined text-lg">location_on</span>
                </div>
                <span className="text-sm font-medium text-stone-200 tracking-wide group-hover/item:text-white transition-colors">
                  The Studio, Downtown
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 items-center pt-2 timeline-entry effect-slide-up effect-stagger-2">
              <button className="w-full sm:w-auto bg-rice-paper text-obsidian font-bold py-4 px-10 border border-transparent hover:bg-clay hover:text-white transition-all duration-300 uppercase tracking-[0.15em] text-xs shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 relative overflow-hidden group/btn">
                <span className="relative z-10">Reserve Spot ($120)</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
              </button>
              <a
                className="text-stone-warm hover:text-white text-xs font-bold uppercase tracking-widest transition-colors hover-underline-expand pb-1"
                href="#"
              >
                View All Workshops
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
