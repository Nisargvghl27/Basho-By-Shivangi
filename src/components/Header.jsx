export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-charcoal/80 backdrop-blur-md transition-all duration-300 animate-fade-in-down">
      <div className="flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="size-8 text-clay transition-transform duration-[1.5s] ease-out group-hover:rotate-[360deg]">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-serif font-bold tracking-tight text-rice-paper group-hover:text-clay transition-colors duration-500">
            Clay & Soul
          </h2>
        </div>
        <nav className="hidden md:flex items-center gap-12">
          <a className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-warm hover:text-clay transition-colors duration-300 hover-underline-expand pb-1" href="#">
            Shop
          </a>
          <a className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-warm hover:text-clay transition-colors duration-300 hover-underline-expand pb-1" href="#">
            Workshops
          </a>
          <a className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-warm hover:text-clay transition-colors duration-300 hover-underline-expand pb-1" href="#">
            Journal
          </a>
          <a className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-warm hover:text-clay transition-colors duration-300 hover-underline-expand pb-1" href="#">
            About
          </a>
        </nav>
        <div className="flex gap-6">
          <button className="flex items-center justify-center text-stone-warm hover:text-white transition-colors duration-300 hover:scale-110 active:scale-95">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
          <button className="flex items-center justify-center text-stone-warm hover:text-white transition-colors duration-300 relative group hover:scale-110 active:scale-95">
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-clay text-[9px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity animate-bounce">2</span>
          </button>
          <button className="flex items-center justify-center text-stone-warm hover:text-white transition-colors duration-300 hover:scale-110 active:scale-95">
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
}

