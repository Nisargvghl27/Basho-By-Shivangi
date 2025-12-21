export default function Footer() {
  return (
    <footer className="bg-obsidian text-stone-300 pt-24 pb-12 border-t border-white/5 timeline-entry effect-blur-in">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/5 pb-20">
          <div className="md:col-span-5 flex flex-col gap-8 timeline-entry effect-slide-up effect-stagger-1">
            <div className="flex items-center gap-3">
              <div className="size-8 text-clay">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-serif font-bold tracking-tight text-white">Clay & Soul</h2>
            </div>
            <p className="text-stone-warm text-sm leading-7 max-w-sm font-light">
              Handcrafted in small batches. Designed to bring warmth and intention to your daily rituals. We honor the
              clay and the process.
            </p>
          </div>
          <div className="md:col-span-2 timeline-entry effect-slide-up effect-stagger-2">
            <h4 className="font-bold uppercase tracking-[0.2em] mb-8 text-[11px] text-white">Shop</h4>
            <ul className="flex flex-col gap-4 text-sm text-stone-warm font-light">
              <li>
                <a className="hover:text-clay transition-colors duration-300 transform hover:translate-x-1 inline-block" href="#">
                  All Ceramics
                </a>
              </li>
              <li>
                <a className="hover:text-clay transition-colors duration-300 transform hover:translate-x-1 inline-block" href="#">
                  Tableware
                </a>
              </li>
              <li>
                <a className="hover:text-clay transition-colors duration-300 transform hover:translate-x-1 inline-block" href="#">
                  Vases
                </a>
              </li>
              <li>
                <a className="hover:text-clay transition-colors duration-300 transform hover:translate-x-1 inline-block" href="#">
                  Workshops
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2 timeline-entry effect-slide-up effect-stagger-3">
            <h4 className="font-bold uppercase tracking-[0.2em] mb-8 text-[11px] text-white">Support</h4>
            <ul className="flex flex-col gap-4 text-sm text-stone-warm font-light">
              <li>
                <a className="hover:text-clay transition-colors duration-300 transform hover:translate-x-1 inline-block" href="#">
                  Care Guide
                </a>
              </li>
              <li>
                <a className="hover:text-clay transition-colors duration-300 transform hover:translate-x-1 inline-block" href="#">
                  Shipping
                </a>
              </li>
              <li>
                <a className="hover:text-clay transition-colors duration-300 transform hover:translate-x-1 inline-block" href="#">
                  Returns
                </a>
              </li>
              <li>
                <a className="hover:text-clay transition-colors duration-300 transform hover:translate-x-1 inline-block" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3 timeline-entry effect-slide-up effect-stagger-1">
            <h4 className="font-bold uppercase tracking-[0.2em] mb-8 text-[11px] text-white">Join the community</h4>
            <p className="text-stone-warm text-sm mb-6 font-light">
              Subscribe to receive updates on new kiln firings and workshops.
            </p>
            <form className="flex flex-col gap-4">
              <input
                className="bg-transparent border-b border-white/20 w-full py-3 text-white focus:outline-none focus:border-clay placeholder-stone-600 text-sm transition-colors"
                placeholder="Email address"
                type="email"
              />
              <button
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian bg-rice-paper hover:bg-clay hover:text-white transition-colors py-3 w-fit px-8 rounded-sm transform hover:-translate-y-1 active:translate-y-0"
                type="button"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 text-[10px] text-stone-600 gap-6 font-bold uppercase tracking-widest timeline-entry effect-blur-in">
          <p>© 2023 Clay & Soul. All rights reserved.</p>
          <div className="flex gap-8">
            <a className="hover:text-white transition-colors" href="#">
              Instagram
            </a>
            <a className="hover:text-white transition-colors" href="#">
              Pinterest
            </a>
            <a className="hover:text-white transition-colors" href="#">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

