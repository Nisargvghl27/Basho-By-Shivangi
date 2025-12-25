// // // // // // // // src/app/journal/page.jsx
// // // // // // // "use client";

// // // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // // import Header from "../../components/Header";
// // // // // // // import Footer from "../../components/Footer";

// // // // // // // export default function JournalPage() {
// // // // // // //   const [isVisible, setIsVisible] = useState(false);
// // // // // // //   const sectionRef = useRef(null);

// // // // // // //   useEffect(() => {
// // // // // // //     const observer = new IntersectionObserver(
// // // // // // //       ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
// // // // // // //       { threshold: 0.1 }
// // // // // // //     );
// // // // // // //     if (sectionRef.current) observer.observe(sectionRef.current);
// // // // // // //     return () => sectionRef.current && observer.unobserve(sectionRef.current);
// // // // // // //   }, []);

// // // // // // //   return (
// // // // // // //     <div className="relative flex h-auto min-h-screen w-full flex-col bg-charcoal selection:bg-clay/30">
// // // // // // //       <Header />
      
// // // // // // //       {/* Texture & Grain Overlay - Exactly like your Products Page */}
// // // // // // //       <div className="absolute inset-0 opacity-[0.12] pointer-events-none z-0">
// // // // // // //         <div 
// // // // // // //           className="absolute inset-0 animate-grain-shift" 
// // // // // // //           style={{ 
// // // // // // //             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
// // // // // // //             backgroundSize: '200px 200px'
// // // // // // //           }}
// // // // // // //         />
// // // // // // //       </div>

// // // // // // //       <main ref={sectionRef} className="relative z-10 pt-40 pb-24 px-4 md:px-12 lg:px-24">
// // // // // // //         <div className="max-w-4xl mx-auto">
          
// // // // // // //           {/* Article Header */}
// // // // // // //           <header className={`mb-16 transition-all duration-1000 ease-out ${
// // // // // // //             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
// // // // // // //           }`}>
// // // // // // //             <span className="text-clay font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">Philosophy</span>
// // // // // // //             <h1 className="text-5xl md:text-7xl font-serif font-light text-rice-paper tracking-tight mb-8 leading-tight">
// // // // // // //               The Art of Imperfection: <br/>
// // // // // // //               <span className="text-stone-warm">Wabi-Sabi in Modern Living</span>
// // // // // // //             </h1>
            
// // // // // // //             <div className="flex items-center gap-4 py-8 border-b border-white/5">
// // // // // // //               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" className="w-12 h-12 rounded-full border border-border-subtle" alt="Akiko Tanaka" />
// // // // // // //               <div className="text-stone-warm text-sm">
// // // // // // //                 <p className="text-rice-paper font-medium">Written by Akiko Tanaka</p>
// // // // // // //                 <p className="uppercase tracking-widest text-[10px] mt-1">October 24, 2023 • 5 min read</p>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </header>

// // // // // // //           {/* Article Body - Text from Journal info */}
// // // // // // //           <article className="space-y-12 text-stone-warm text-lg md:text-xl font-light leading-relaxed">
// // // // // // //             <p>In the quiet corners of our studio, we embrace the flaws. The philosophy of <em className="italic text-clay mx-1">Wabi-Sabi</em> teaches us that nothing lasts, nothing is finished, and nothing is perfect.</p>

// // // // // // //             {/* Blockquote - Styled with Studio UI */}
// // // // // // //             <div className="relative py-12 px-8 md:px-16 bg-charcoal-light border-l-2 border-clay my-16 group transition-all duration-500 hover:bg-white/5">
// // // // // // //               <p className="text-3xl md:text-4xl font-serif text-rice-paper leading-snug tracking-tight">
// // // // // // //                 "There is a crack in everything, that's how the light gets in."
// // // // // // //               </p>
// // // // // // //               <footer className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-clay">— Leonard Cohen</footer>
// // // // // // //             </div>

// // // // // // //             {/* Photo Grid - Asymmetric Layout like screen.jpg */}
// // // // // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-20">
// // // // // // //               <div className="group bg-charcoal-light border border-border-subtle p-4 transition-all duration-700 hover:border-clay/40">
// // // // // // //                 <div className="overflow-hidden relative">
// // // // // // //                   <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-4IlU2pzzRyQwgVZJof_vSfH0e3YPjORvMdnPyzwPUPVjmYkRKbzjd2pDHKP6Y82ObRDWYugVY9Hg9WGq9MmDz7qM2AnfrEzdAGA8y8MQNbF1kpgBigcpqek_bYIUnXpgScaWwWQEDRCC2MTcKnTYoEb-Ne-Wv4co-TMv-p47P76AdRwBejOpa86dvOyH-svZPfPf4rvQ7t7QxUjhAv2BaKQHrgDFQaBjejnEzeV2LRinujbdlZbz97dAnWfW3BNmiRsoAR9WI5c" className="w-full h-[500px] object-cover transition-transform duration-[1200ms] group-hover:scale-110" alt="Glaze" />
// // // // // // //                   <div className="absolute bottom-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-widest text-rice-paper">Glazing Detail</div>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //               <div className="group bg-charcoal-light border border-border-subtle p-4 transition-all duration-700 hover:border-clay/40 md:mt-24">
// // // // // // //                 <div className="overflow-hidden relative">
// // // // // // //                   <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuClI3cbN-Hug2Chb5JIBQ7PsfIcl_WFTYYnCTdZ-5HYMSaVrP0trsJHb9GbE8VzWAjmx1mdh86dmHMNpeY0sU9WwfeITPqUtIL4_cX7LfJNnehheYhPBKUEUicf2gzA9NzZNcL1EnMoO8YBBIcwaFAhJPvpxtUG8OiZA3mLBjIcHb5AYiWMdqTIqE4JnsXwmfHMSvJ380JU-ikzaVClsSLc0ddxFBeccXDPcxQtzq0e7Y4_6LlC6Es41LCMWvWHESsFDf7Ym6dEqy8" className="w-full h-[500px] object-cover transition-transform duration-[1200ms] group-hover:scale-110" alt="Shelf" />
// // // // // // //                   <div className="absolute bottom-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-widest text-rice-paper">Finished Collection</div>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </article>

// // // // // // //           {/* Workshop Section - Style from Bottom of screen.jpg */}
// // // // // // //           <section className="mt-32 p-12 bg-charcoal-light border border-border-subtle relative overflow-hidden group">
// // // // // // //             <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
// // // // // // //               <div className="flex-1 text-center lg:text-left">
// // // // // // //                 <h2 className="text-4xl font-serif text-rice-paper mb-6">Experience the process <br/><span className="text-clay">first hand.</span></h2>
// // // // // // //                 <p className="text-stone-warm mb-8 font-light text-sm max-w-sm">Join our weekend workshops where we explore the tactile nature of clay.</p>
// // // // // // //                 <button className="bg-clay text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-clay/80 transition-all hover:scale-105 active:scale-95">
// // // // // // //                   Book a Workshop
// // // // // // //                 </button>
// // // // // // //               </div>
// // // // // // //               <div className="flex gap-4">
// // // // // // //                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuALfbss3Elc1-UWET4NHwph0iINNzyJzk7j5zVg_dVGEywx1bR60ylGzih_vbI7Gqu6JNhXjzO4Obxh12GjspWmhPLIfi7zZUVya6hjRVPVOHQ9hg9Zix40WyeHkBb4Fd86k9Kzu9eshHchfzGgDoVHd9KAxqHCUvu9K7kehzX-4l5Huxc5Y2A-u9aveTBhxkRloxjF6M9J4wnQsUOnrEKlBbTe9pfq6VhXF-JyAKEecPLvqWOaPCFzRmrajDAPgpDK6c8lrwaLoiA" className="w-32 h-48 object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Hands" />
// // // // // // //                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdFJdqGYaJmlM2lx976waE_cUh0o8xbUFhVIcEB1FdyRl-bgy0lWp4NLX1WfL_2QlzCWEB4VwFkfOj1VGf9Utm3sUGwwkqGlWBwXUawawqXvIJzAQmFHXG5zjNisxa18O3iX1-Cfm-KDpKC29bG_GfNMLWZW2SPQVy820qDUYuzm2_mhwV58KfyDPWMNi-Lzwhg9quGdud0b0UV9aukGWSKbUGO38xDSkzWdA9c1mC7rc5noTZTJHv9UyE-dE_A3l1-6psWJZ_H4o" className="w-32 h-48 object-cover rounded-sm translate-y-8" alt="Tools" />
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </section>

// // // // // // //           {/* Related Articles - Using your Shop Grid style */}
// // // // // // //           <section className="mt-40">
// // // // // // //             <div className="flex items-center justify-between mb-12">
// // // // // // //               <h3 className="text-2xl font-serif text-rice-paper">Related Articles</h3>
// // // // // // //               <button className="text-clay text-[10px] font-bold uppercase tracking-widest hover:underline">View all</button>
// // // // // // //             </div>
// // // // // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // //               {[
// // // // // // //                 { title: "Tea Ceremonies for Beginners", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuPDqQWBYc0fHxsUDKPMhWbnD4QdWHA7M3PQhRYirw7q0puczUOd0lxSIRUF2fidf1QYY4YcN-TwSPVSTmE3T7tnAwjNqS88jVE6qZ5CRMZYeZBsWN8QZYI-H3FVuaTvoDAA3qkNQ5UajRBYyhfRUa9XyOeZn-TlBdFOtY5i3NVIKXYim7UwTo8xgKZ0m6kdZKNsRQY5zjWeESH-_dMw63d81UbJX-1_n2UF-ydvaWeg7lYTQ9qQYUk9oLkevJ5iGbp1J4GkgWzXAF", tag: "Rituals" },
// // // // // // //                 { title: "Essential Tools for Every Potter", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPFit41-EvWZZ6xy9vZ37d43IqiUAzgxR3ASW-NKVzi0gbKgg7zvX14nFJW6zhoRjxPBMevfNwsvWvBcl4-i3qRbA0HO9GJl5FT-V3c1ExbOrpFblszgrplrZ7JLI1m0hs19KuHBDgRPLk8L-gjPhhaH1gy99kCCItVv4XRGOu-s-d7DgBj1MuCGMqQnZmxdY-W-Km-3W14m6LnCqQlj5j-TywKWOhvdTTYsfWRyTZqS_lFK-IsKq9PLBE1Ea83QxMpoeODoUGIJHC", tag: "Guide" },
// // // // // // //                 { title: "The Chemistry of Glazing", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdFJdqGYaJmlM2lx976waE_cUh0o8xbUFhVIcEB1FdyRl-bgy0lWp4NLX1WfL_2QlzCWEB4VwFkfOj1VGf9Utm3sUGwwkqGlWBwXUawawqXvIJzAQmFHXG5zjNisxa18O3iX1-Cfm-KDpKC29bG_GfNMLWZW2SPQVy820qDUYuzm2_mhwV58KfyDPWMNi-Lzwhg9quGdud0b0UV9aukGWSKbUGO38xDSkzWdA9c1mC7rc5noTZTJHv9UyE-dE_A3l1-6psWJZ_H4o", tag: "Science" }
// // // // // // //               ].map((item, i) => (
// // // // // // //                 <div key={i} className="group cursor-pointer">
// // // // // // //                   <div className="aspect-[4/5] overflow-hidden mb-6 bg-charcoal-light border border-border-subtle p-2">
// // // // // // //                     <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.title} />
// // // // // // //                   </div>
// // // // // // //                   <span className="text-clay text-[9px] font-bold uppercase tracking-widest mb-2 block">{item.tag}</span>
// // // // // // //                   <h4 className="text-lg font-serif text-rice-paper group-hover:text-clay transition-colors leading-tight">{item.title}</h4>
// // // // // // //                 </div>
// // // // // // //               ))}
// // // // // // //             </div>
// // // // // // //           </section>
// // // // // // //         </div>
// // // // // // //       </main>

// // // // // // //       <Footer />

// // // // // // //       <style jsx>{`
// // // // // // //         @keyframes grain-shift {
// // // // // // //           0%, 100% { transform: translate(0, 0); }
// // // // // // //           10% { transform: translate(-5%, -5%); }
// // // // // // //           50% { transform: translate(-10%, 5%); }
// // // // // // //           90% { transform: translate(10%, 5%); }
// // // // // // //         }
// // // // // // //         .animate-grain-shift { animation: grain-shift 12s ease-in-out infinite; }
// // // // // // //       `}</style>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // "use client";

// // // // // // // import React, { useState } from 'react';

// // // // // // // const BashoJournalPage = () => {
// // // // // // //   // State for the comment form
// // // // // // //   const [formData, setFormData] = useState({
// // // // // // //     name: '',
// // // // // // //     email: '',
// // // // // // //     comment: ''
// // // // // // //   });

// // // // // // //   const handleInputChange = (e) => {
// // // // // // //     const { id, value } = e.target;
// // // // // // //     setFormData(prev => ({ ...prev, [id]: value }));
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="bg-[#f7f6f8] dark:bg-[#191022] font-sans text-gray-900 dark:text-white antialiased selection:bg-[#7f13ec]/30 selection:text-[#7f13ec]">
// // // // // // //       {/* Decorative Top Bar */}
// // // // // // //       <div className="fixed top-0 left-0 h-1 bg-[#7f13ec] z-50 w-1/3"></div>

// // // // // // //       {/* Header */}
// // // // // // //       <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#f7f6f8]/80 dark:bg-[#191022]/80 border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
// // // // // // //         <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
// // // // // // //           <div className="flex items-center justify-between h-20">
// // // // // // //             <div className="flex items-center gap-4 text-gray-900 dark:text-white">
// // // // // // //               <div className="size-6 text-[#7f13ec]">
// // // // // // //                 <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
// // // // // // //                   <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
// // // // // // //                 </svg>
// // // // // // //               </div>
// // // // // // //               <h2 className="text-xl font-bold tracking-tight">Basho</h2>
// // // // // // //             </div>
// // // // // // //             <nav className="hidden md:flex items-center gap-8">
// // // // // // //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">Shop</a>
// // // // // // //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">Workshops</a>
// // // // // // //               <a className="text-sm font-medium text-[#7f13ec]" href="#">Journal</a>
// // // // // // //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">About</a>
// // // // // // //             </nav>
// // // // // // //             <div className="flex gap-3">
// // // // // // //               <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
// // // // // // //                 <span className="material-symbols-outlined text-[20px]">search</span>
// // // // // // //               </button>
// // // // // // //               <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
// // // // // // //                 <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </header>

// // // // // // //       <main className="flex flex-col w-full min-h-screen pb-32">
// // // // // // //         {/* Hero Section */}
// // // // // // //         <div className="w-full relative h-[70vh] min-h-[500px] overflow-hidden">
// // // // // // //           <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBU9P3jB_Br7n4DPBp7Wau8_tey-WXid2Ygu9MBsVg-czmJrCWZnsPbatihcSb1CyQWi8EIoysXYCP85wNR5ZcGB2KWYlRUmiqj69VmQihNemkwuL5B7zC6ZgENJb3tOtcS7bDOA5SKEC2B_t9Fb4hTpbTf8aYD0-yIye5hef6588dzuxEM7Jt2mnu23vmu9YbNxsM-uQgXHdFcQTp8sHBDN51Cm3YgbgKqIEQd9L91YvpcNwVqlxfiAH5iAGtIuHOEwiID0h-8S1c')" }}></div>
// // // // // // //           <div className="absolute inset-0 bg-gradient-to-t from-[#f7f6f8] dark:from-[#191022] via-transparent to-black/30"></div>
// // // // // // //           <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 flex flex-col items-center text-center">
// // // // // // //             <div className="max-w-4xl space-y-6">
// // // // // // //               <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase text-white bg-[#7f13ec]/80 backdrop-blur-sm rounded-full mb-4">Philosophy</span>
// // // // // // //               <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]">
// // // // // // //                 The Art of Imperfection:<br />
// // // // // // //                 <span className="font-bold">Wabi-Sabi in Modern Living</span>
// // // // // // //               </h1>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* Metadata Bar */}
// // // // // // //         <div className="w-full border-b border-gray-200 dark:border-white/5 bg-[#f7f6f8] dark:bg-[#191022]">
// // // // // // //           <div className="max-w-[720px] mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
// // // // // // //             <div className="flex items-center gap-3">
// // // // // // //               <div className="size-8 rounded-full bg-gray-300 overflow-hidden">
// // // // // // //                 <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Portrait of Akiko Tanaka" />
// // // // // // //               </div>
// // // // // // //               <span>Written by <strong className="text-gray-900 dark:text-white font-medium">Akiko Tanaka</strong></span>
// // // // // // //             </div>
// // // // // // //             <div className="flex items-center gap-6">
// // // // // // //               <span>October 24, 2023</span>
// // // // // // //               <span className="size-1 rounded-full bg-gray-400"></span>
// // // // // // //               <span>5 min read</span>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* Article Body */}
// // // // // // //         <div className="relative w-full max-w-[1200px] mx-auto">
// // // // // // //           {/* Side Share Bar */}
// // // // // // //           <div className="hidden lg:flex flex-col gap-4 absolute top-24 left-8 xl:left-0 z-10 w-12 items-center">
// // // // // // //             <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest -rotate-90 origin-center mb-8 whitespace-nowrap">Share</span>
// // // // // // //             <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 hover:text-[#7f13ec] transition-all"><span className="material-symbols-outlined text-[18px]">share</span></button>
// // // // // // //             <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 hover:text-[#7f13ec] transition-all"><span className="material-symbols-outlined text-[18px]">link</span></button>
// // // // // // //           </div>

// // // // // // //           <article className="w-full max-w-[720px] mx-auto px-6 mt-16 md:mt-24 space-y-12 text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-light">
// // // // // // //             <p>
// // // // // // //               In the quiet corners of our studio, we embrace the flaws. The philosophy of <em className="italic text-gray-900 dark:text-white">Wabi-Sabi</em> teaches us that nothing lasts, nothing is finished, and nothing is perfect.
// // // // // // //             </p>

// // // // // // //             <div className="py-8 my-8 relative">
// // // // // // //               <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#7f13ec] to-transparent rounded-full opacity-50"></div>
// // // // // // //               <blockquote className="pl-8 md:pl-12">
// // // // // // //                 <p className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-white tracking-tight leading-snug">
// // // // // // //                   "There is a crack in everything, that's how the light gets in."
// // // // // // //                 </p>
// // // // // // //                 <footer className="mt-4 text-sm font-medium text-[#7f13ec] uppercase tracking-widest">— Leonard Cohen</footer>
// // // // // // //               </blockquote>
// // // // // // //             </div>

// // // // // // //             <p>
// // // // // // //               When we first began crafting the autumn collection, we noticed how the glaze reacted unpredictably to the kiln's heat. Instead of discarding these pieces, we celebrated them.
// // // // // // //             </p>

// // // // // // //             {/* Product Feature */}
// // // // // // //             <div className="my-12 p-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-white/10 dark:to-white/5 rounded-2xl">
// // // // // // //               <div className="bg-[#f7f6f8] dark:bg-[#1f162b] rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center">
// // // // // // //                 <div className="size-24 sm:size-32 shrink-0 rounded-lg overflow-hidden bg-gray-100">
// // // // // // //                   <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1eCETqtlhkdOVwAsWWMGvSkjObbUKmfA7Pi-HwuAPaxXJ3dGBzq4vIZJ69XRcJMXPZADWHmTW4gyfyft_uhjEW9phVbyFEbzE3gdn3ABXEi_oBWJypYM3nr6f37r3evxqJ5V5_IFdLaPBx1u7czWapc9usovYGlTve4G-13jtzA7-LU2np5ZHHcxkWWNOnZvfgW1wR1uaHZRI78A-DB3AemWkvtpuaSepRv1QsQ47kzlsMJcQKMvBV2Z5S2104Vbf4m6cZfi-5Wc" alt="Kintsugi Kit" />
// // // // // // //                 </div>
// // // // // // //                 <div className="flex-1 text-center sm:text-left">
// // // // // // //                   <h4 className="text-sm font-semibold text-[#7f13ec] uppercase tracking-wider mb-1">Featured In This Story</h4>
// // // // // // //                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">The Kintsugi Repair Kit</h3>
// // // // // // //                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Learn the ancient art of repairing broken pottery with gold.</p>
// // // // // // //                   <a className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-[#7f13ec] transition-colors" href="#">
// // // // // // //                     View Product <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
// // // // // // //                   </a>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </article>
// // // // // // //         </div>

// // // // // // //         {/* Workshop Call to Action */}
// // // // // // //         <section className="mt-24 w-full bg-[#1e1625] border-y border-white/5 py-24">
// // // // // // //           <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
// // // // // // //             <div className="space-y-8">
// // // // // // //               <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
// // // // // // //                 Experience the process <br /> <span className="text-[#7f13ec] font-medium">first hand.</span>
// // // // // // //               </h2>
// // // // // // //               <p className="text-gray-400 text-lg leading-relaxed max-w-md">Join our weekend workshops where we explore the tactile nature of clay.</p>
// // // // // // //               <button className="bg-[#7f13ec] hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg flex items-center gap-2">
// // // // // // //                 <span>Book a Workshop</span>
// // // // // // //                 <span className="material-symbols-outlined">calendar_month</span>
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //             <div className="grid grid-cols-2 gap-4">
// // // // // // //               <img className="rounded-2xl w-full h-64 object-cover transform translate-y-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALfbss3Elc1-UWET4NHwph0iINNzyJzk7j5zVg_dVGEywx1bR60ylGzih_vbI7Gqu6JNhXjzO4Obxh12GjspWmhPLIfi7zZUVya6hjRVPVOHQ9hg9Zix40WyeHkBb4Fd86k9Kzu9eshHchfzGgDoVHd9KAxqHCUvu9K7kehzX-4l5Huxc5Y2A-u9aveTBhxkRloxjF6M9J4wnQsUOnrEKlBbTe9pfq6VhXF-JyAKEecPLvqWOaPCFzRmrajDAPgpDK6c8lrwaLoiA" alt="Hands working" />
// // // // // // //               <img className="rounded-2xl w-full h-64 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdFJdqGYaJmlM2lx976waE_cUh0o8xbUFhVIcEB1FdyRl-bgy0lWp4NLX1WfL_2QlzCWEB4VwFkfOj1VGf9Utm3sUGwwkqGlWBwXUawawqXvIJzAQmFHXG5zjNisxa18O3iX1-Cfm-KDpKC29bG_GfNMLWZW2SPQVy820qDUYuzm2_mhwV58KfyDPWMNi-Lzwhg9quGdud0b0UV9aukGWSKbUGO38xDSkzWdA9c1mC7rc5noTZTJHv9UyE-dE_A3l1-6psWJZ_H4o" alt="Pottery tools" />
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </section>

// // // // // // //         {/* Comments Section */}
// // // // // // //         <div className="w-full max-w-[720px] mx-auto px-6 mt-24">
// // // // // // //           <div className="border-t border-gray-200 dark:border-white/10 pt-16">
// // // // // // //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">Comments (2)</h3>
            
// // // // // // //             <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-6 md:p-8 mb-16 shadow-sm">
// // // // // // //               <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Leave a comment</h4>
// // // // // // //               <div className="space-y-6">
// // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // // // //                   <div className="space-y-2">
// // // // // // //                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
// // // // // // //                     <input id="name" value={formData.name} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec]" type="text" placeholder="Enter your name" />
// // // // // // //                   </div>
// // // // // // //                   <div className="space-y-2">
// // // // // // //                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
// // // // // // //                     <input id="email" value={formData.email} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec]" type="email" placeholder="Enter your email" />
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //                 <div className="space-y-2">
// // // // // // //                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Comment</label>
// // // // // // //                   <textarea id="comment" value={formData.comment} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec] resize-y" rows="4" placeholder="Write your thoughts here..."></textarea>
// // // // // // //                 </div>
// // // // // // //                 <div className="flex justify-end">
// // // // // // //                   <button className="bg-[#7f13ec] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-purple-700 transition-colors">Submit Comment</button>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             {/* Comment Thread */}
// // // // // // //             <div className="space-y-10">
// // // // // // //               <div className="flex gap-4 sm:gap-6">
// // // // // // //                 <div className="shrink-0">
// // // // // // //                   <div className="size-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">JD</div>
// // // // // // //                 </div>
// // // // // // //                 <div className="flex-1 space-y-3">
// // // // // // //                   <div className="flex justify-between items-center">
// // // // // // //                     <span className="font-bold text-gray-900 dark:text-white">James Davies</span>
// // // // // // //                     <button className="text-sm font-bold text-[#7f13ec]">Reply</button>
// // // // // // //                   </div>
// // // // // // //                   <p className="text-gray-600 dark:text-gray-300 text-sm">The section about Wabi-Sabi really resonated with me...</p>
                  
// // // // // // //                   {/* Author Reply */}
// // // // // // //                   <div className="mt-6 pl-6 border-l-2 border-gray-100 dark:border-white/5 flex gap-4">
// // // // // // //                     <div className="size-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
// // // // // // //                       <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Author" />
// // // // // // //                     </div>
// // // // // // //                     <div>
// // // // // // //                       <div className="flex items-center gap-2 mb-1">
// // // // // // //                         <span className="font-bold text-sm">Akiko Tanaka</span>
// // // // // // //                         <span className="px-2 py-0.5 rounded-full bg-[#7f13ec]/10 text-[#7f13ec] text-[10px] font-bold uppercase">Author</span>
// // // // // // //                       </div>
// // // // // // //                       <p className="text-sm text-gray-600 dark:text-gray-300">Thank you James! Keep creating!</p>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* Related Articles */}
// // // // // // //         <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 mt-24 mb-24">
// // // // // // //           <div className="flex items-center justify-between mb-12 px-2">
// // // // // // //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Related Articles</h3>
// // // // // // //             <a className="text-[#7f13ec] font-bold text-sm" href="#">View all</a>
// // // // // // //           </div>
// // // // // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // //             {[
// // // // // // //               { title: "Tea Ceremonies for Beginners", tag: "Rituals", img: "7", date: "Oct 12" },
// // // // // // //               { title: "Essential Tools for Every Potter", tag: "Guide", img: "6", date: "Sep 28" },
// // // // // // //               { title: "The Chemistry of Glazing", tag: "Science", img: "2", date: "Sep 15" }
// // // // // // //             ].map((article, i) => (
// // // // // // //               <a key={i} className="group block" href="#">
// // // // // // //                 <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-6 relative">
// // // // // // //                   <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={`http://googleusercontent.com/profile/picture/${article.img}`} alt={article.title} />
// // // // // // //                   <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{article.tag}</div>
// // // // // // //                 </div>
// // // // // // //                 <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#7f13ec] transition-colors">{article.title}</h4>
// // // // // // //                 <div className="text-xs text-gray-500 mt-2">{article.date}, 2023</div>
// // // // // // //               </a>
// // // // // // //             ))}
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </main>

// // // // // // //       {/* Footer */}
// // // // // // //       <footer className="bg-[#f7f6f8] dark:bg-[#191022] border-t border-gray-200 dark:border-white/5 py-12 px-6 text-center md:text-left">
// // // // // // //         <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
// // // // // // //           <div className="flex items-center gap-2">
// // // // // // //             <div className="size-5 text-[#7f13ec]">
// // // // // // //               <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
// // // // // // //                 <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
// // // // // // //               </svg>
// // // // // // //             </div>
// // // // // // //             <span className="font-bold">Basho</span>
// // // // // // //           </div>
// // // // // // //           <p className="text-sm text-gray-500">© 2023 Basho Ceramics. All rights reserved.</p>
// // // // // // //         </div>
// // // // // // //       </footer>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default BashoJournalPage;

// // // // "use client";

// // // // import React, { useState } from 'react';

// // // // const BashoJournalPage = () => {
// // // //   // State for the comment form
// // // //   const [formData, setFormData] = useState({
// // // //     name: '',
// // // //     email: '',
// // // //     comment: ''
// // // //   });

// // // //   const handleInputChange = (e) => {
// // // //     const { id, value } = e.target;
// // // //     setFormData(prev => ({ ...prev, [id]: value }));
// // // //   };

// // // //   return (
// // // //     <div className="bg-[#f7f6f8] dark:bg-[#191022] font-sans text-gray-900 dark:text-white antialiased selection:bg-[#7f13ec]/30 selection:text-[#7f13ec]">
// // // //       {/* Decorative Top Bar */}
// // // //       <div className="fixed top-0 left-0 h-1 bg-[#7f13ec] z-50 w-1/3"></div>

// // // //       {/* Header */}
// // // //       <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#f7f6f8]/80 dark:bg-[#191022]/80 border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
// // // //         <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
// // // //           <div className="flex items-center justify-between h-20">
// // // //             <div className="flex items-center gap-4 text-gray-900 dark:text-white">
// // // //               <div className="size-6 text-[#7f13ec]">
// // // //                 <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
// // // //                   <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
// // // //                 </svg>
// // // //               </div>
// // // //               <h2 className="text-xl font-bold tracking-tight">Basho</h2>
// // // //             </div>
// // // //             <nav className="hidden md:flex items-center gap-8">
// // // //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">Shop</a>
// // // //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">Workshops</a>
// // // //               <a className="text-sm font-medium text-[#7f13ec]" href="#">Journal</a>
// // // //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">About</a>
// // // //             </nav>
// // // //             <div className="flex gap-3">
// // // //               <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
// // // //                 <span className="material-symbols-outlined text-[20px]">search</span>
// // // //               </button>
// // // //               <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
// // // //                 <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       <main className="flex flex-col w-full min-h-screen pb-32">
// // // //         {/* Hero Section */}
// // // //         <div className="w-full relative h-[70vh] min-h-[500px] overflow-hidden">
// // // //           <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBU9P3jB_Br7n4DPBp7Wau8_tey-WXid2Ygu9MBsVg-czmJrCWZnsPbatihcSb1CyQWi8EIoysXYCP85wNR5ZcGB2KWYlRUmiqj69VmQihNemkwuL5B7zC6ZgENJb3tOtcS7bDOA5SKEC2B_t9Fb4hTpbTf8aYD0-yIye5hef6588dzuxEM7Jt2mnu23vmu9YbNxsM-uQgXHdFcQTp8sHBDN51Cm3YgbgKqIEQd9L91YvpcNwVqlxfiAH5iAGtIuHOEwiID0h-8S1c')" }}></div>
// // // //           <div className="absolute inset-0 bg-gradient-to-t from-[#f7f6f8] dark:from-[#191022] via-transparent to-black/30"></div>
// // // //           <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 flex flex-col items-center text-center">
// // // //             <div className="max-w-4xl space-y-6">
// // // //               <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase text-white bg-[#7f13ec]/80 backdrop-blur-sm rounded-full mb-4">Philosophy</span>
// // // //               <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]">
// // // //                 The Art of Imperfection:<br />
// // // //                 <span className="font-bold">Wabi-Sabi in Modern Living</span>
// // // //               </h1>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Metadata Bar */}
// // // //         <div className="w-full border-b border-gray-200 dark:border-white/5 bg-[#f7f6f8] dark:bg-[#191022]">
// // // //           <div className="max-w-[720px] mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
// // // //             <div className="flex items-center gap-3">
// // // //               <div className="size-8 rounded-full bg-gray-300 overflow-hidden">
// // // //                 <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Portrait of Akiko Tanaka" />
// // // //               </div>
// // // //               <span>Written by <strong className="text-gray-900 dark:text-white font-medium">Akiko Tanaka</strong></span>
// // // //             </div>
// // // //             <div className="flex items-center gap-6">
// // // //               <span>October 24, 2023</span>
// // // //               <span className="size-1 rounded-full bg-gray-400"></span>
// // // //               <span>5 min read</span>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Article Body */}
// // // //         <div className="relative w-full max-w-[1200px] mx-auto">
// // // //           {/* Side Share Bar */}
// // // //           <div className="hidden lg:flex flex-col gap-4 absolute top-24 left-8 xl:left-0 z-10 w-12 items-center">
// // // //             <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest -rotate-90 origin-center mb-8 whitespace-nowrap">Share</span>
// // // //             <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 hover:text-[#7f13ec] transition-all"><span className="material-symbols-outlined text-[18px]">share</span></button>
// // // //             <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 hover:text-[#7f13ec] transition-all"><span className="material-symbols-outlined text-[18px]">link</span></button>
// // // //           </div>

// // // //           <article className="w-full max-w-[720px] mx-auto px-6 mt-16 md:mt-24 space-y-12 text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-light">
// // // //             <p>
// // // //               In the quiet corners of our studio, we embrace the flaws. The philosophy of <em className="italic text-gray-900 dark:text-white">Wabi-Sabi</em> teaches us that nothing lasts, nothing is finished, and nothing is perfect.
// // // //             </p>

// // // //             <div className="py-8 my-8 relative">
// // // //               <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#7f13ec] to-transparent rounded-full opacity-50"></div>
// // // //               <blockquote className="pl-8 md:pl-12">
// // // //                 <p className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-white tracking-tight leading-snug">
// // // //                   "There is a crack in everything, that's how the light gets in."
// // // //                 </p>
// // // //                 <footer className="mt-4 text-sm font-medium text-[#7f13ec] uppercase tracking-widest">— Leonard Cohen</footer>
// // // //               </blockquote>
// // // //             </div>

// // // //             <p>
// // // //               When we first began crafting the autumn collection, we noticed how the glaze reacted unpredictably to the kiln's heat. Instead of discarding these pieces, we celebrated them.
// // // //             </p>

// // // //             {/* Product Feature */}
// // // //             <div className="my-12 p-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-white/10 dark:to-white/5 rounded-2xl">
// // // //               <div className="bg-[#f7f6f8] dark:bg-[#1f162b] rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center">
// // // //                 <div className="size-24 sm:size-32 shrink-0 rounded-lg overflow-hidden bg-gray-100">
// // // //                   <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1eCETqtlhkdOVwAsWWMGvSkjObbUKmfA7Pi-HwuAPaxXJ3dGBzq4vIZJ69XRcJMXPZADWHmTW4gyfyft_uhjEW9phVbyFEbzE3gdn3ABXEi_oBWJypYM3nr6f37r3evxqJ5V5_IFdLaPBx1u7czWapc9usovYGlTve4G-13jtzA7-LU2np5ZHHcxkWWNOnZvfgW1wR1uaHZRI78A-DB3AemWkvtpuaSepRv1QsQ47kzlsMJcQKMvBV2Z5S2104Vbf4m6cZfi-5Wc" alt="Kintsugi Kit" />
// // // //                 </div>
// // // //                 <div className="flex-1 text-center sm:text-left">
// // // //                   <h4 className="text-sm font-semibold text-[#7f13ec] uppercase tracking-wider mb-1">Featured In This Story</h4>
// // // //                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">The Kintsugi Repair Kit</h3>
// // // //                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Learn the ancient art of repairing broken pottery with gold.</p>
// // // //                   <a className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-[#7f13ec] transition-colors" href="#">
// // // //                     View Product <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
// // // //                   </a>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </article>
// // // //         </div>

// // // //         {/* Workshop Call to Action */}
// // // //         <section className="mt-24 w-full bg-[#1e1625] border-y border-white/5 py-24">
// // // //           <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
// // // //             <div className="space-y-8">
// // // //               <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
// // // //                 Experience the process <br /> <span className="text-[#7f13ec] font-medium">first hand.</span>
// // // //               </h2>
// // // //               <p className="text-gray-400 text-lg leading-relaxed max-w-md">Join our weekend workshops where we explore the tactile nature of clay.</p>
// // // //               <button className="bg-[#7f13ec] hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg flex items-center gap-2">
// // // //                 <span>Book a Workshop</span>
// // // //                 <span className="material-symbols-outlined">calendar_month</span>
// // // //               </button>
// // // //             </div>
// // // //             <div className="grid grid-cols-2 gap-4">
// // // //               <img className="rounded-2xl w-full h-64 object-cover transform translate-y-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALfbss3Elc1-UWET4NHwph0iINNzyJzk7j5zVg_dVGEywx1bR60ylGzih_vbI7Gqu6JNhXjzO4Obxh12GjspWmhPLIfi7zZUVya6hjRVPVOHQ9hg9Zix40WyeHkBb4Fd86k9Kzu9eshHchfzGgDoVHd9KAxqHCUvu9K7kehzX-4l5Huxc5Y2A-u9aveTBhxkRloxjF6M9J4wnQsUOnrEKlBbTe9pfq6VhXF-JyAKEecPLvqWOaPCFzRmrajDAPgpDK6c8lrwaLoiA" alt="Hands working" />
// // // //               <img className="rounded-2xl w-full h-64 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdFJdqGYaJmlM2lx976waE_cUh0o8xbUFhVIcEB1FdyRl-bgy0lWp4NLX1WfL_2QlzCWEB4VwFkfOj1VGf9Utm3sUGwwkqGlWBwXUawawqXvIJzAQmFHXG5zjNisxa18O3iX1-Cfm-KDpKC29bG_GfNMLWZW2SPQVy820qDUYuzm2_mhwV58KfyDPWMNi-Lzwhg9quGdud0b0UV9aukGWSKbUGO38xDSkzWdA9c1mC7rc5noTZTJHv9UyE-dE_A3l1-6psWJZ_H4o" alt="Pottery tools" />
// // // //             </div>
// // // //           </div>
// // // //         </section>

// // // //         {/* Comments Section */}
// // // //         <div className="w-full max-w-[720px] mx-auto px-6 mt-24">
// // // //           <div className="border-t border-gray-200 dark:border-white/10 pt-16">
// // // //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">Comments (2)</h3>
            
// // // //             <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-6 md:p-8 mb-16 shadow-sm">
// // // //               <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Leave a comment</h4>
// // // //               <div className="space-y-6">
// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //                   <div className="space-y-2">
// // // //                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
// // // //                     <input id="name" value={formData.name} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec]" type="text" placeholder="Enter your name" />
// // // //                   </div>
// // // //                   <div className="space-y-2">
// // // //                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
// // // //                     <input id="email" value={formData.email} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec]" type="email" placeholder="Enter your email" />
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="space-y-2">
// // // //                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Comment</label>
// // // //                   <textarea id="comment" value={formData.comment} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec] resize-y" rows="4" placeholder="Write your thoughts here..."></textarea>
// // // //                 </div>
// // // //                 <div className="flex justify-end">
// // // //                   <button className="bg-[#7f13ec] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-purple-700 transition-colors">Submit Comment</button>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Comment Thread */}
// // // //             <div className="space-y-10">
// // // //               <div className="flex gap-4 sm:gap-6">
// // // //                 <div className="shrink-0">
// // // //                   <div className="size-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">JD</div>
// // // //                 </div>
// // // //                 <div className="flex-1 space-y-3">
// // // //                   <div className="flex justify-between items-center">
// // // //                     <span className="font-bold text-gray-900 dark:text-white">James Davies</span>
// // // //                     <button className="text-sm font-bold text-[#7f13ec]">Reply</button>
// // // //                   </div>
// // // //                   <p className="text-gray-600 dark:text-gray-300 text-sm">The section about Wabi-Sabi really resonated with me...</p>
                  
// // // //                   {/* Author Reply */}
// // // //                   <div className="mt-6 pl-6 border-l-2 border-gray-100 dark:border-white/5 flex gap-4">
// // // //                     <div className="size-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
// // // //                       <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Author" />
// // // //                     </div>
// // // //                     <div>
// // // //                       <div className="flex items-center gap-2 mb-1">
// // // //                         <span className="font-bold text-sm">Akiko Tanaka</span>
// // // //                         <span className="px-2 py-0.5 rounded-full bg-[#7f13ec]/10 text-[#7f13ec] text-[10px] font-bold uppercase">Author</span>
// // // //                       </div>
// // // //                       <p className="text-sm text-gray-600 dark:text-gray-300">Thank you James! Keep creating!</p>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Related Articles SECTION UPDATED BELOW */}
// // // //         <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 mt-24 mb-24">
// // // //           <div className="flex items-center justify-between mb-12 px-2">
// // // //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Related Articles</h3>
// // // //             <a className="text-[#7f13ec] font-bold text-sm" href="#">View all</a>
// // // //           </div>
// // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // //             {[
// // // //               { 
// // // //                 title: "Tea Ceremonies for Beginners", 
// // // //                 tag: "Rituals", 
// // // //                 img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800", 
// // // //                 date: "Oct 12" 
// // // //               },
// // // //               { 
// // // //                 title: "Essential Tools for Every Potter", 
// // // //                 tag: "Guide", 
// // // //                 img: "https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&q=80&w=800", 
// // // //                 date: "Sep 28" 
// // // //               },
// // // //               { 
// // // //                 title: "The Chemistry of Glazing", 
// // // //                 tag: "Science", 
// // // //                 img: "https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?auto=format&fit=crop&q=80&w=800", 
// // // //                 date: "Sep 15" 
// // // //               }
// // // //             ].map((article, i) => (
// // // //               <a key={i} className="group block" href="#">
// // // //                 <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-6 relative">
// // // //                   <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={article.img} alt={article.title} />
// // // //                   <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{article.tag}</div>
// // // //                 </div>
// // // //                 <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#7f13ec] transition-colors">{article.title}</h4>
// // // //                 <div className="text-xs text-gray-500 mt-2">{article.date}, 2023</div>
// // // //               </a>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </main>

// // // //       {/* Footer */}
// // // //       <footer className="bg-[#f7f6f8] dark:bg-[#191022] border-t border-gray-200 dark:border-white/5 py-12 px-6 text-center md:text-left">
// // // //         <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
// // // //           <div className="flex items-center gap-2">
// // // //             <div className="size-5 text-[#7f13ec]">
// // // //               <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
// // // //                 <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
// // // //               </svg>
// // // //             </div>
// // // //             <span className="font-bold">Basho</span>
// // // //           </div>
// // // //           <p className="text-sm text-gray-500">© 2023 Basho Ceramics. All rights reserved.</p>
// // // //         </div>
// // // //       </footer>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default BashoJournalPage;
// // // // // "use client";

// // // // // import React, { useState } from 'react';

// // // // // const BashoJournalPage = () => {
// // // // //   // State for the comment form
// // // // //   const [formData, setFormData] = useState({
// // // // //     name: '',
// // // // //     email: '',
// // // // //     comment: ''
// // // // //   });

// // // // //   const handleInputChange = (e) => {
// // // // //     const { id, value } = e.target;
// // // // //     setFormData(prev => ({ ...prev, [id]: value }));
// // // // //   };

// // // // //   return (
// // // // //     <div className="bg-[#f7f6f8] dark:bg-[#191022] font-sans text-gray-900 dark:text-white antialiased selection:bg-[#7f13ec]/30 selection:text-[#7f13ec]">
// // // // //       {/* Decorative Top Bar */}
// // // // //       <div className="fixed top-0 left-0 h-1 bg-[#7f13ec] z-50 w-1/3"></div>

// // // // //       {/* Header */}
// // // // //       <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#f7f6f8]/80 dark:bg-[#191022]/80 border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
// // // // //         <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
// // // // //           <div className="flex items-center justify-between h-20">
// // // // //             <div className="flex items-center gap-4 text-gray-900 dark:text-white">
// // // // //               <div className="size-6 text-[#7f13ec]">
// // // // //                 <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
// // // // //                   <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
// // // // //                 </svg>
// // // // //               </div>
// // // // //               <h2 className="text-xl font-bold tracking-tight">Basho</h2>
// // // // //             </div>
// // // // //             <nav className="hidden md:flex items-center gap-8">
// // // // //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">Shop</a>
// // // // //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">Workshops</a>
// // // // //               <a className="text-sm font-medium text-[#7f13ec]" href="#">Journal</a>
// // // // //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">About</a>
// // // // //             </nav>
// // // // //             <div className="flex gap-3">
// // // // //               <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
// // // // //                 <span className="material-symbols-outlined text-[20px]">search</span>
// // // // //               </button>
// // // // //               <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
// // // // //                 <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <main className="flex flex-col w-full min-h-screen pb-32">
// // // // //         {/* Hero Section */}
// // // // //         <div className="w-full relative h-[70vh] min-h-[500px] overflow-hidden">
// // // // //           <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBU9P3jB_Br7n4DPBp7Wau8_tey-WXid2Ygu9MBsVg-czmJrCWZnsPbatihcSb1CyQWi8EIoysXYCP85wNR5ZcGB2KWYlRUmiqj69VmQihNemkwuL5B7zC6ZgENJb3tOtcS7bDOA5SKEC2B_t9Fb4hTpbTf8aYD0-yIye5hef6588dzuxEM7Jt2mnu23vmu9YbNxsM-uQgXHdFcQTp8sHBDN51Cm3YgbgKqIEQd9L91YvpcNwVqlxfiAH5iAGtIuHOEwiID0h-8S1c')" }}></div>
// // // // //           <div className="absolute inset-0 bg-gradient-to-t from-[#f7f6f8] dark:from-[#191022] via-transparent to-black/30"></div>
// // // // //           <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 flex flex-col items-center text-center">
// // // // //             <div className="max-w-4xl space-y-6">
// // // // //               <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase text-white bg-[#7f13ec]/80 backdrop-blur-sm rounded-full mb-4">Philosophy</span>
// // // // //               <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]">
// // // // //                 The Art of Imperfection:<br />
// // // // //                 <span className="font-bold">Wabi-Sabi in Modern Living</span>
// // // // //               </h1>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Metadata Bar */}
// // // // //         <div className="w-full border-b border-gray-200 dark:border-white/5 bg-[#f7f6f8] dark:bg-[#191022]">
// // // // //           <div className="max-w-[720px] mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
// // // // //             <div className="flex items-center gap-3">
// // // // //               <div className="size-8 rounded-full bg-gray-300 overflow-hidden">
// // // // //                 <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Portrait of Akiko Tanaka" />
// // // // //               </div>
// // // // //               <span>Written by <strong className="text-gray-900 dark:text-white font-medium">Akiko Tanaka</strong></span>
// // // // //             </div>
// // // // //             <div className="flex items-center gap-6">
// // // // //               <span>October 24, 2023</span>
// // // // //               <span className="size-1 rounded-full bg-gray-400"></span>
// // // // //               <span>5 min read</span>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Article Body */}
// // // // //         <div className="relative w-full max-w-[1200px] mx-auto">
// // // // //           {/* Side Share Bar */}
// // // // //           <div className="hidden lg:flex flex-col gap-4 absolute top-24 left-8 xl:left-0 z-10 w-12 items-center">
// // // // //             <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest -rotate-90 origin-center mb-8 whitespace-nowrap">Share</span>
// // // // //             <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 hover:text-[#7f13ec] transition-all"><span className="material-symbols-outlined text-[18px]">share</span></button>
// // // // //             <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 hover:text-[#7f13ec] transition-all"><span className="material-symbols-outlined text-[18px]">link</span></button>
// // // // //           </div>

// // // // //           <article className="w-full max-w-[720px] mx-auto px-6 mt-16 md:mt-24 space-y-12 text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-light">
// // // // //             <p>
// // // // //               In the quiet corners of our studio, we embrace the flaws. The philosophy of <em className="italic text-gray-900 dark:text-white">Wabi-Sabi</em> teaches us that nothing lasts, nothing is finished, and nothing is perfect.
// // // // //             </p>

// // // // //             <div className="py-8 my-8 relative">
// // // // //               <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#7f13ec] to-transparent rounded-full opacity-50"></div>
// // // // //               <blockquote className="pl-8 md:pl-12">
// // // // //                 <p className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-white tracking-tight leading-snug">
// // // // //                   "There is a crack in everything, that's how the light gets in."
// // // // //                 </p>
// // // // //                 <footer className="mt-4 text-sm font-medium text-[#7f13ec] uppercase tracking-widest">— Leonard Cohen</footer>
// // // // //               </blockquote>
// // // // //             </div>

// // // // //             <p>
// // // // //               When we first began crafting the autumn collection, we noticed how the glaze reacted unpredictably to the kiln's heat. Instead of discarding these pieces, we celebrated them.
// // // // //             </p>

// // // // //             {/* Product Feature */}
// // // // //             <div className="my-12 p-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-white/10 dark:to-white/5 rounded-2xl">
// // // // //               <div className="bg-[#f7f6f8] dark:bg-[#1f162b] rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center">
// // // // //                 <div className="size-24 sm:size-32 shrink-0 rounded-lg overflow-hidden bg-gray-100">
// // // // //                   <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1eCETqtlhkdOVwAsWWMGvSkjObbUKmfA7Pi-HwuAPaxXJ3dGBzq4vIZJ69XRcJMXPZADWHmTW4gyfyft_uhjEW9phVbyFEbzE3gdn3ABXEi_oBWJypYM3nr6f37r3evxqJ5V5_IFdLaPBx1u7czWapc9usovYGlTve4G-13jtzA7-LU2np5ZHHcxkWWNOnZvfgW1wR1uaHZRI78A-DB3AemWkvtpuaSepRv1QsQ47kzlsMJcQKMvBV2Z5S2104Vbf4m6cZfi-5Wc" alt="Kintsugi Kit" />
// // // // //                 </div>
// // // // //                 <div className="flex-1 text-center sm:text-left">
// // // // //                   <h4 className="text-sm font-semibold text-[#7f13ec] uppercase tracking-wider mb-1">Featured In This Story</h4>
// // // // //                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">The Kintsugi Repair Kit</h3>
// // // // //                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Learn the ancient art of repairing broken pottery with gold.</p>
// // // // //                   <a className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-[#7f13ec] transition-colors" href="#">
// // // // //                     View Product <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
// // // // //                   </a>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </article>
// // // // //         </div>

// // // // //         {/* Workshop Call to Action */}
// // // // //         <section className="mt-24 w-full bg-[#1e1625] border-y border-white/5 py-24">
// // // // //           <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
// // // // //             <div className="space-y-8">
// // // // //               <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
// // // // //                 Experience the process <br /> <span className="text-[#7f13ec] font-medium">first hand.</span>
// // // // //               </h2>
// // // // //               <p className="text-gray-400 text-lg leading-relaxed max-w-md">Join our weekend workshops where we explore the tactile nature of clay.</p>
// // // // //               <button className="bg-[#7f13ec] hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg flex items-center gap-2">
// // // // //                 <span>Book a Workshop</span>
// // // // //                 <span className="material-symbols-outlined">calendar_month</span>
// // // // //               </button>
// // // // //             </div>
// // // // //             <div className="grid grid-cols-2 gap-4">
// // // // //               <img className="rounded-2xl w-full h-64 object-cover transform translate-y-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALfbss3Elc1-UWET4NHwph0iINNzyJzk7j5zVg_dVGEywx1bR60ylGzih_vbI7Gqu6JNhXjzO4Obxh12GjspWmhPLIfi7zZUVya6hjRVPVOHQ9hg9Zix40WyeHkBb4Fd86k9Kzu9eshHchfzGgDoVHd9KAxqHCUvu9K7kehzX-4l5Huxc5Y2A-u9aveTBhxkRloxjF6M9J4wnQsUOnrEKlBbTe9pfq6VhXF-JyAKEecPLvqWOaPCFzRmrajDAPgpDK6c8lrwaLoiA" alt="Hands working" />
// // // // //               <img className="rounded-2xl w-full h-64 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdFJdqGYaJmlM2lx976waE_cUh0o8xbUFhVIcEB1FdyRl-bgy0lWp4NLX1WfL_2QlzCWEB4VwFkfOj1VGf9Utm3sUGwwkqGlWBwXUawawqXvIJzAQmFHXG5zjNisxa18O3iX1-Cfm-KDpKC29bG_GfNMLWZW2SPQVy820qDUYuzm2_mhwV58KfyDPWMNi-Lzwhg9quGdud0b0UV9aukGWSKbUGO38xDSkzWdA9c1mC7rc5noTZTJHv9UyE-dE_A3l1-6psWJZ_H4o" alt="Pottery tools" />
// // // // //             </div>
// // // // //           </div>
// // // // //         </section>

// // // // //         {/* Comments Section */}
// // // // //         <div className="w-full max-w-[720px] mx-auto px-6 mt-24">
// // // // //           <div className="border-t border-gray-200 dark:border-white/10 pt-16">
// // // // //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">Comments (2)</h3>
            
// // // // //             <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-6 md:p-8 mb-16 shadow-sm">
// // // // //               <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Leave a comment</h4>
// // // // //               <div className="space-y-6">
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //                   <div className="space-y-2">
// // // // //                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
// // // // //                     <input id="name" value={formData.name} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec]" type="text" placeholder="Enter your name" />
// // // // //                   </div>
// // // // //                   <div className="space-y-2">
// // // // //                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
// // // // //                     <input id="email" value={formData.email} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec]" type="email" placeholder="Enter your email" />
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="space-y-2">
// // // // //                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Comment</label>
// // // // //                   <textarea id="comment" value={formData.comment} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec] resize-y" rows="4" placeholder="Write your thoughts here..."></textarea>
// // // // //                 </div>
// // // // //                 <div className="flex justify-end">
// // // // //                   <button className="bg-[#7f13ec] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-purple-700 transition-colors">Submit Comment</button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Comment Thread */}
// // // // //             <div className="space-y-10">
// // // // //               <div className="flex gap-4 sm:gap-6">
// // // // //                 <div className="shrink-0">
// // // // //                   <div className="size-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">JD</div>
// // // // //                 </div>
// // // // //                 <div className="flex-1 space-y-3">
// // // // //                   <div className="flex justify-between items-center">
// // // // //                     <span className="font-bold text-gray-900 dark:text-white">James Davies</span>
// // // // //                     <button className="text-sm font-bold text-[#7f13ec]">Reply</button>
// // // // //                   </div>
// // // // //                   <p className="text-gray-600 dark:text-gray-300 text-sm">The section about Wabi-Sabi really resonated with me...</p>
                  
// // // // //                   {/* Author Reply */}
// // // // //                   <div className="mt-6 pl-6 border-l-2 border-gray-100 dark:border-white/5 flex gap-4">
// // // // //                     <div className="size-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
// // // // //                       <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Author" />
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <div className="flex items-center gap-2 mb-1">
// // // // //                         <span className="font-bold text-sm">Akiko Tanaka</span>
// // // // //                         <span className="px-2 py-0.5 rounded-full bg-[#7f13ec]/10 text-[#7f13ec] text-[10px] font-bold uppercase">Author</span>
// // // // //                       </div>
// // // // //                       <p className="text-sm text-gray-600 dark:text-gray-300">Thank you James! Keep creating!</p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Related Articles SECTION UPDATED BELOW */}
// // // // //         <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 mt-24 mb-24">
// // // // //           <div className="flex items-center justify-between mb-12 px-2">
// // // // //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Related Articles</h3>
// // // // //             <a className="text-[#7f13ec] font-bold text-sm" href="#">View all</a>
// // // // //           </div>
// // // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // //             {[
// // // // //               { 
// // // // //                 title: "Tea Ceremonies for Beginners", 
// // // // //                 tag: "Rituals", 
// // // // //                 img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800", 
// // // // //                 date: "Oct 12" 
// // // // //               },
// // // // //               { 
// // // // //                 title: "Essential Tools for Every Potter", 
// // // // //                 tag: "Guide", 
// // // // //                 img: "https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&q=80&w=800", 
// // // // //                 date: "Sep 28" 
// // // // //               },
// // // // //               { 
// // // // //                 title: "The Chemistry of Glazing", 
// // // // //                 tag: "Science", 
// // // // //                 img: "https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?auto=format&fit=crop&q=80&w=800", 
// // // // //                 date: "Sep 15" 
// // // // //               }
// // // // //             ].map((article, i) => (
// // // // //               <a key={i} className="group block" href="#">
// // // // //                 <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-6 relative">
// // // // //                   <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={article.img} alt={article.title} />
// // // // //                   <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{article.tag}</div>
// // // // //                 </div>
// // // // //                 <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#7f13ec] transition-colors">{article.title}</h4>
// // // // //                 <div className="text-xs text-gray-500 mt-2">{article.date}, 2023</div>
// // // // //               </a>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       </main>

// // // // //       {/* Footer */}
// // // // //       <footer className="bg-[#f7f6f8] dark:bg-[#191022] border-t border-gray-200 dark:border-white/5 py-12 px-6 text-center md:text-left">
// // // // //         <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
// // // // //           <div className="flex items-center gap-2">
// // // // //             <div className="size-5 text-[#7f13ec]">
// // // // //               <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
// // // // //                 <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
// // // // //               </svg>
// // // // //             </div>
// // // // //             <span className="font-bold">Basho</span>
// // // // //           </div>
// // // // //           <p className="text-sm text-gray-500">© 2023 Basho Ceramics. All rights reserved.</p>
// // // // //         </div>
// // // // //       </footer>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default BashoJournalPage;

// // // // // // "use client";

// // // // // // import React, { useState } from 'react';

// // // // // // const BashoJournalPage = () => {
// // // // // //   // State for the comment form
// // // // // //   const [formData, setFormData] = useState({
// // // // // //     name: '',
// // // // // //     email: '',
// // // // // //     comment: ''
// // // // // //   });

// // // // // //   const handleInputChange = (e) => {
// // // // // //     const { id, value } = e.target;
// // // // // //     setFormData(prev => ({ ...prev, [id]: value }));
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="bg-[#f7f6f8] dark:bg-[#191022] font-sans text-gray-900 dark:text-white antialiased selection:bg-[#7f13ec]/30 selection:text-[#7f13ec]">
// // // // // //       {/* Decorative Top Bar */}
// // // // // //       <div className="fixed top-0 left-0 h-1 bg-[#7f13ec] z-50 w-1/3"></div>

// // // // // //       {/* Header */}
// // // // // //       <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#f7f6f8]/80 dark:bg-[#191022]/80 border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
// // // // // //         <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
// // // // // //           <div className="flex items-center justify-between h-20">
// // // // // //             <div className="flex items-center gap-4 text-gray-900 dark:text-white">
// // // // // //               <div className="size-6 text-[#7f13ec]">
// // // // // //                 <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
// // // // // //                   <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
// // // // // //                 </svg>
// // // // // //               </div>
// // // // // //               <h2 className="text-xl font-bold tracking-tight">Basho</h2>
// // // // // //             </div>
// // // // // //             <nav className="hidden md:flex items-center gap-8">
// // // // // //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">Shop</a>
// // // // // //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">Workshops</a>
// // // // // //               <a className="text-sm font-medium text-[#7f13ec]" href="#">Journal</a>
// // // // // //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">About</a>
// // // // // //             </nav>
// // // // // //             <div className="flex gap-3">
// // // // // //               <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
// // // // // //                 <span className="material-symbols-outlined text-[20px]">search</span>
// // // // // //               </button>
// // // // // //               <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
// // // // // //                 <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </header>

// // // // // //       <main className="flex flex-col w-full min-h-screen pb-32">
// // // // // //         {/* Hero Section */}
// // // // // //         <div className="w-full relative h-[70vh] min-h-[500px] overflow-hidden">
// // // // // //           <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBU9P3jB_Br7n4DPBp7Wau8_tey-WXid2Ygu9MBsVg-czmJrCWZnsPbatihcSb1CyQWi8EIoysXYCP85wNR5ZcGB2KWYlRUmiqj69VmQihNemkwuL5B7zC6ZgENJb3tOtcS7bDOA5SKEC2B_t9Fb4hTpbTf8aYD0-yIye5hef6588dzuxEM7Jt2mnu23vmu9YbNxsM-uQgXHdFcQTp8sHBDN51Cm3YgbgKqIEQd9L91YvpcNwVqlxfiAH5iAGtIuHOEwiID0h-8S1c')" }}></div>
// // // // // //           <div className="absolute inset-0 bg-gradient-to-t from-[#f7f6f8] dark:from-[#191022] via-transparent to-black/30"></div>
// // // // // //           <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 flex flex-col items-center text-center">
// // // // // //             <div className="max-w-4xl space-y-6">
// // // // // //               <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase text-white bg-[#7f13ec]/80 backdrop-blur-sm rounded-full mb-4">Philosophy</span>
// // // // // //               <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]">
// // // // // //                 The Art of Imperfection:<br />
// // // // // //                 <span className="font-bold">Wabi-Sabi in Modern Living</span>
// // // // // //               </h1>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Metadata Bar */}
// // // // // //         <div className="w-full border-b border-gray-200 dark:border-white/5 bg-[#f7f6f8] dark:bg-[#191022]">
// // // // // //           <div className="max-w-[720px] mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
// // // // // //             <div className="flex items-center gap-3">
// // // // // //               <div className="size-8 rounded-full bg-gray-300 overflow-hidden">
// // // // // //                 <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Portrait of Akiko Tanaka" />
// // // // // //               </div>
// // // // // //               <span>Written by <strong className="text-gray-900 dark:text-white font-medium">Akiko Tanaka</strong></span>
// // // // // //             </div>
// // // // // //             <div className="flex items-center gap-6">
// // // // // //               <span>October 24, 2023</span>
// // // // // //               <span className="size-1 rounded-full bg-gray-400"></span>
// // // // // //               <span>5 min read</span>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Article Body */}
// // // // // //         <div className="relative w-full max-w-[1200px] mx-auto">
// // // // // //           {/* Side Share Bar */}
// // // // // //           <div className="hidden lg:flex flex-col gap-4 absolute top-24 left-8 xl:left-0 z-10 w-12 items-center">
// // // // // //             <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest -rotate-90 origin-center mb-8 whitespace-nowrap">Share</span>
// // // // // //             <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 hover:text-[#7f13ec] transition-all"><span className="material-symbols-outlined text-[18px]">share</span></button>
// // // // // //             <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 hover:text-[#7f13ec] transition-all"><span className="material-symbols-outlined text-[18px]">link</span></button>
// // // // // //           </div>

// // // // // //           <article className="w-full max-w-[720px] mx-auto px-6 mt-16 md:mt-24 space-y-12 text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-light">
// // // // // //             <p>
// // // // // //               In the quiet corners of our studio, we embrace the flaws. The philosophy of <em className="italic text-gray-900 dark:text-white">Wabi-Sabi</em> teaches us that nothing lasts, nothing is finished, and nothing is perfect.
// // // // // //             </p>

// // // // // //             <div className="py-8 my-8 relative">
// // // // // //               <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#7f13ec] to-transparent rounded-full opacity-50"></div>
// // // // // //               <blockquote className="pl-8 md:pl-12">
// // // // // //                 <p className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-white tracking-tight leading-snug">
// // // // // //                   "There is a crack in everything, that's how the light gets in."
// // // // // //                 </p>
// // // // // //                 <footer className="mt-4 text-sm font-medium text-[#7f13ec] uppercase tracking-widest">— Leonard Cohen</footer>
// // // // // //               </blockquote>
// // // // // //             </div>

// // // // // //             <p>
// // // // // //               When we first began crafting the autumn collection, we noticed how the glaze reacted unpredictably to the kiln's heat. Instead of discarding these pieces, we celebrated them.
// // // // // //             </p>

// // // // // //             {/* Product Feature */}
// // // // // //             <div className="my-12 p-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-white/10 dark:to-white/5 rounded-2xl">
// // // // // //               <div className="bg-[#f7f6f8] dark:bg-[#1f162b] rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center">
// // // // // //                 <div className="size-24 sm:size-32 shrink-0 rounded-lg overflow-hidden bg-gray-100">
// // // // // //                   <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1eCETqtlhkdOVwAsWWMGvSkjObbUKmfA7Pi-HwuAPaxXJ3dGBzq4vIZJ69XRcJMXPZADWHmTW4gyfyft_uhjEW9phVbyFEbzE3gdn3ABXEi_oBWJypYM3nr6f37r3evxqJ5V5_IFdLaPBx1u7czWapc9usovYGlTve4G-13jtzA7-LU2np5ZHHcxkWWNOnZvfgW1wR1uaHZRI78A-DB3AemWkvtpuaSepRv1QsQ47kzlsMJcQKMvBV2Z5S2104Vbf4m6cZfi-5Wc" alt="Kintsugi Kit" />
// // // // // //                 </div>
// // // // // //                 <div className="flex-1 text-center sm:text-left">
// // // // // //                   <h4 className="text-sm font-semibold text-[#7f13ec] uppercase tracking-wider mb-1">Featured In This Story</h4>
// // // // // //                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">The Kintsugi Repair Kit</h3>
// // // // // //                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Learn the ancient art of repairing broken pottery with gold.</p>
// // // // // //                   <a className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-[#7f13ec] transition-colors" href="#">
// // // // // //                     View Product <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
// // // // // //                   </a>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </article>
// // // // // //         </div>

// // // // // //         {/* Workshop Call to Action */}
// // // // // //         <section className="mt-24 w-full bg-[#1e1625] border-y border-white/5 py-24">
// // // // // //           <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
// // // // // //             <div className="space-y-8">
// // // // // //               <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
// // // // // //                 Experience the process <br /> <span className="text-[#7f13ec] font-medium">first hand.</span>
// // // // // //               </h2>
// // // // // //               <p className="text-gray-400 text-lg leading-relaxed max-w-md">Join our weekend workshops where we explore the tactile nature of clay.</p>
// // // // // //               <button className="bg-[#7f13ec] hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg flex items-center gap-2">
// // // // // //                 <span>Book a Workshop</span>
// // // // // //                 <span className="material-symbols-outlined">calendar_month</span>
// // // // // //               </button>
// // // // // //             </div>
// // // // // //             <div className="grid grid-cols-2 gap-4">
// // // // // //               <img className="rounded-2xl w-full h-64 object-cover transform translate-y-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALfbss3Elc1-UWET4NHwph0iINNzyJzk7j5zVg_dVGEywx1bR60ylGzih_vbI7Gqu6JNhXjzO4Obxh12GjspWmhPLIfi7zZUVya6hjRVPVOHQ9hg9Zix40WyeHkBb4Fd86k9Kzu9eshHchfzGgDoVHd9KAxqHCUvu9K7kehzX-4l5Huxc5Y2A-u9aveTBhxkRloxjF6M9J4wnQsUOnrEKlBbTe9pfq6VhXF-JyAKEecPLvqWOaPCFzRmrajDAPgpDK6c8lrwaLoiA" alt="Hands working" />
// // // // // //               <img className="rounded-2xl w-full h-64 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdFJdqGYaJmlM2lx976waE_cUh0o8xbUFhVIcEB1FdyRl-bgy0lWp4NLX1WfL_2QlzCWEB4VwFkfOj1VGf9Utm3sUGwwkqGlWBwXUawawqXvIJzAQmFHXG5zjNisxa18O3iX1-Cfm-KDpKC29bG_GfNMLWZW2SPQVy820qDUYuzm2_mhwV58KfyDPWMNi-Lzwhg9quGdud0b0UV9aukGWSKbUGO38xDSkzWdA9c1mC7rc5noTZTJHv9UyE-dE_A3l1-6psWJZ_H4o" alt="Pottery tools" />
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* Comments Section */}
// // // // // //         <div className="w-full max-w-[720px] mx-auto px-6 mt-24">
// // // // // //           <div className="border-t border-gray-200 dark:border-white/10 pt-16">
// // // // // //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">Comments (3)</h3>
            
// // // // // //             <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-6 md:p-8 mb-16 shadow-sm">
// // // // // //               <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Leave a comment</h4>
// // // // // //               <div className="space-y-6">
// // // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // // //                   <div className="space-y-2">
// // // // // //                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
// // // // // //                     <input id="name" value={formData.name} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec]" type="text" placeholder="Enter your name" />
// // // // // //                   </div>
// // // // // //                   <div className="space-y-2">
// // // // // //                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
// // // // // //                     <input id="email" value={formData.email} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec]" type="email" placeholder="Enter your email" />
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //                 <div className="space-y-2">
// // // // // //                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Comment</label>
// // // // // //                   <textarea id="comment" value={formData.comment} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec] resize-y" rows="4" placeholder="Write your thoughts here..."></textarea>
// // // // // //                 </div>
// // // // // //                 <div className="flex justify-end">
// // // // // //                   <button className="bg-[#7f13ec] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-purple-700 transition-colors">Submit Comment</button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             {/* Comment Thread */}
// // // // // //             <div className="space-y-10">
// // // // // //               {/* Comment 1: James Davies */}
// // // // // //               <div className="flex gap-4 sm:gap-6">
// // // // // //                 <div className="shrink-0">
// // // // // //                   <div className="size-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">JD</div>
// // // // // //                 </div>
// // // // // //                 <div className="flex-1 space-y-3">
// // // // // //                   <div className="flex justify-between items-center">
// // // // // //                     <div className="flex items-center gap-2">
// // // // // //                       <span className="font-bold text-gray-900 dark:text-white">James Davies</span>
// // // // // //                       <span className="text-xs text-gray-500">• October 25, 2023</span>
// // // // // //                     </div>
// // // // // //                     <button className="flex items-center gap-1 text-sm font-bold text-[#7f13ec]">
// // // // // //                       <span className="material-symbols-outlined text-[18px]">reply</span> Reply
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                   <p className="text-gray-600 dark:text-gray-300 text-sm">The section about Wabi-Sabi really resonated with me. It's refreshing to see imperfections being celebrated rather than hidden. I've been doing pottery for a few years and this mindset shift has completely changed my approach.</p>
                  
// // // // // //                   {/* Author Reply to James */}
// // // // // //                   <div className="mt-6 pl-6 border-l-2 border-[#7f13ec]/20 flex gap-4">
// // // // // //                     <div className="size-10 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-[#7f13ec]/30">
// // // // // //                       <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Author" />
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <div className="flex items-center gap-2 mb-1">
// // // // // //                         <span className="font-bold text-sm">Akiko Tanaka</span>
// // // // // //                         <span className="px-2 py-0.5 rounded-full bg-[#7f13ec] text-white text-[10px] font-bold uppercase">Author</span>
// // // // // //                       </div>
// // // // // //                       <p className="text-sm text-gray-600 dark:text-gray-300">Thank you James! That mindset shift is exactly what we hope to inspire. Keep creating!</p>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {/* Comment 2: Elena Rodriguez (New) */}
// // // // // //               <div className="flex gap-4 sm:gap-6 pt-6 border-t border-gray-100 dark:border-white/5">
// // // // // //                 <div className="shrink-0">
// // // // // //                   <div className="size-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">EL</div>
// // // // // //                 </div>
// // // // // //                 <div className="flex-1 space-y-3">
// // // // // //                   <div className="flex justify-between items-center">
// // // // // //                     <div className="flex items-center gap-2">
// // // // // //                       <span className="font-bold text-gray-900 dark:text-white">Elena Rodriguez</span>
// // // // // //                       <span className="text-xs text-gray-500">• October 26, 2023</span>
// // // // // //                     </div>
// // // // // //                     <button className="flex items-center gap-1 text-sm font-bold text-[#7f13ec]">
// // // // // //                       <span className="material-symbols-outlined text-[18px]">reply</span> Reply
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                   <p className="text-gray-600 dark:text-gray-300 text-sm">Beautiful photography. Are the workshops suitable for complete beginners who have never touched clay before?</p>
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Related Articles Section */}
// // // // // //         <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 mt-24 mb-24">
// // // // // //           <div className="flex items-center justify-between mb-12 px-2">
// // // // // //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Related Articles</h3>
// // // // // //             <a className="text-[#7f13ec] font-bold text-sm" href="#">View all</a>
// // // // // //           </div>
// // // // // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // //             {[
// // // // // //               { title: "Tea Ceremonies for Beginners", tag: "Rituals", img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800", date: "Oct 12" },
// // // // // //               { title: "Essential Tools for Every Potter", tag: "Guide", img: "https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&q=80&w=800", date: "Sep 28" },
// // // // // //               { title: "The Chemistry of Glazing", tag: "Science", img: "https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?auto=format&fit=crop&q=80&w=800", date: "Sep 15" }
// // // // // //             ].map((article, i) => (
// // // // // //               <a key={i} className="group block" href="#">
// // // // // //                 <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-6 relative">
// // // // // //                   <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={article.img} alt={article.title} />
// // // // // //                   <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{article.tag}</div>
// // // // // //                 </div>
// // // // // //                 <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#7f13ec] transition-colors">{article.title}</h4>
// // // // // //                 <div className="text-xs text-gray-500 mt-2">{article.date}, 2023</div>
// // // // // //               </a>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </main>

// // // // // //       {/* Footer */}
// // // // // //       <footer className="bg-[#f7f6f8] dark:bg-[#191022] border-t border-gray-200 dark:border-white/5 py-12 px-6 text-center md:text-left">
// // // // // //         <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
// // // // // //           <div className="flex items-center gap-2">
// // // // // //             <div className="size-5 text-[#7f13ec]">
// // // // // //               <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
// // // // // //                 <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
// // // // // //               </svg>
// // // // // //             </div>
// // // // // //             <span className="font-bold">Basho</span>
// // // // // //           </div>
// // // // // //           <p className="text-sm text-gray-500">© 2023 Basho Ceramics. All rights reserved.</p>
// // // // // //         </div>
// // // // // //       </footer>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default BashoJournalPage;

// // // "use client";

// // // import React, { useState } from 'react';

// // // const BashoJournalPage = () => {
// // //   // State for the comment form
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     comment: ''
// // //   });

// // //   const handleInputChange = (e) => {
// // //     const { id, value } = e.target;
// // //     setFormData(prev => ({ ...prev, [id]: value }));
// // //   };

// // //   return (
// // //     <div className="bg-[#f7f6f8] dark:bg-[#191022] font-sans text-gray-900 dark:text-white antialiased selection:bg-[#7f13ec]/30 selection:text-[#7f13ec]">
// // //       {/* Decorative Top Bar */}
// // //       <div className="fixed top-0 left-0 h-1 bg-[#7f13ec] z-50 w-1/3"></div>

// // //       {/* Header */}
// // //       <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#f7f6f8]/80 dark:bg-[#191022]/80 border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
// // //         <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
// // //           <div className="flex items-center justify-between h-20">
// // //             <div className="flex items-center gap-4 text-gray-900 dark:text-white">
// // //               <div className="size-6 text-[#7f13ec]">
// // //                 <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
// // //                   <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
// // //                 </svg>
// // //               </div>
// // //               <h2 className="text-xl font-bold tracking-tight">Basho</h2>
// // //             </div>
// // //             <nav className="hidden md:flex items-center gap-8">
// // //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">Shop</a>
// // //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">Workshops</a>
// // //               <a className="text-sm font-medium text-[#7f13ec]" href="#">Journal</a>
// // //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">About</a>
// // //             </nav>
// // //             <div className="flex gap-3">
// // //               <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
// // //                 <span className="material-symbols-outlined text-[20px]">search</span>
// // //               </button>
// // //               <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
// // //                 <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <main className="flex flex-col w-full min-h-screen pb-32">
// // //         {/* Hero Section */}
// // //         <div className="w-full relative h-[70vh] min-h-[500px] overflow-hidden">
// // //           <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBU9P3jB_Br7n4DPBp7Wau8_tey-WXid2Ygu9MBsVg-czmJrCWZnsPbatihcSb1CyQWi8EIoysXYCP85wNR5ZcGB2KWYlRUmiqj69VmQihNemkwuL5B7zC6ZgENJb3tOtcS7bDOA5SKEC2B_t9Fb4hTpbTf8aYD0-yIye5hef6588dzuxEM7Jt2mnu23vmu9YbNxsM-uQgXHdFcQTp8sHBDN51Cm3YgbgKqIEQd9L91YvpcNwVqlxfiAH5iAGtIuHOEwiID0h-8S1c')" }}></div>
// // //           <div className="absolute inset-0 bg-gradient-to-t from-[#f7f6f8] dark:from-[#191022] via-transparent to-black/30"></div>
// // //           <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 flex flex-col items-center text-center">
// // //             <div className="max-w-4xl space-y-6">
// // //               <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase text-white bg-[#7f13ec]/80 backdrop-blur-sm rounded-full mb-4">Philosophy</span>
// // //               <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]">
// // //                 The Art of Imperfection:<br />
// // //                 <span className="font-bold">Wabi-Sabi in Modern Living</span>
// // //               </h1>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Metadata Bar */}
// // //         <div className="w-full border-b border-gray-200 dark:border-white/5 bg-[#f7f6f8] dark:bg-[#191022]">
// // //           <div className="max-w-[720px] mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
// // //             <div className="flex items-center gap-3">
// // //               <div className="size-8 rounded-full bg-gray-300 overflow-hidden">
// // //                 <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Portrait of Akiko Tanaka" />
// // //               </div>
// // //               <span>Written by <strong className="text-gray-900 dark:text-white font-medium">Akiko Tanaka</strong></span>
// // //             </div>
// // //             <div className="flex items-center gap-6">
// // //               <span>October 24, 2023</span>
// // //               <span className="size-1 rounded-full bg-gray-400"></span>
// // //               <span>5 min read</span>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Article Body */}
// // //         <div className="relative w-full max-w-[1200px] mx-auto">
// // //           {/* Side Share Bar */}
// // //           <div className="hidden lg:flex flex-col gap-4 absolute top-24 left-8 xl:left-0 z-10 w-12 items-center">
// // //             <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest -rotate-90 origin-center mb-8 whitespace-nowrap">Share</span>
// // //             <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 hover:text-[#7f13ec] transition-all"><span className="material-symbols-outlined text-[18px]">share</span></button>
// // //             <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 hover:text-[#7f13ec] transition-all"><span className="material-symbols-outlined text-[18px]">link</span></button>
// // //           </div>

// // //           <article className="w-full max-w-[720px] mx-auto px-6 mt-16 md:mt-24 space-y-12 text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-light">
// // //             <p>
// // //               In the quiet corners of our studio, we embrace the flaws. The philosophy of <em className="italic text-gray-900 dark:text-white">Wabi-Sabi</em> teaches us that nothing lasts, nothing is finished, and nothing is perfect.
// // //             </p>

// // //             <div className="py-8 my-8 relative">
// // //               <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#7f13ec] to-transparent rounded-full opacity-50"></div>
// // //               <blockquote className="pl-8 md:pl-12">
// // //                 <p className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-white tracking-tight leading-snug">
// // //                   "There is a crack in everything, that's how the light gets in."
// // //                 </p>
// // //                 <footer className="mt-4 text-sm font-medium text-[#7f13ec] uppercase tracking-widest">— Leonard Cohen</footer>
// // //               </blockquote>
// // //             </div>

// // //             <p>
// // //               When we first began crafting the autumn collection, we noticed how the glaze reacted unpredictably to the kiln's heat. Instead of discarding these pieces, we celebrated them.
// // //             </p>

// // //             {/* Product Feature */}
// // //             <div className="my-12 p-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-white/10 dark:to-white/5 rounded-2xl">
// // //               <div className="bg-[#f7f6f8] dark:bg-[#1f162b] rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center">
// // //                 <div className="size-24 sm:size-32 shrink-0 rounded-lg overflow-hidden bg-gray-100">
// // //                   <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1eCETqtlhkdOVwAsWWMGvSkjObbUKmfA7Pi-HwuAPaxXJ3dGBzq4vIZJ69XRcJMXPZADWHmTW4gyfyft_uhjEW9phVbyFEbzE3gdn3ABXEi_oBWJypYM3nr6f37r3evxqJ5V5_IFdLaPBx1u7czWapc9usovYGlTve4G-13jtzA7-LU2np5ZHHcxkWWNOnZvfgW1wR1uaHZRI78A-DB3AemWkvtpuaSepRv1QsQ47kzlsMJcQKMvBV2Z5S2104Vbf4m6cZfi-5Wc" alt="Kintsugi Kit" />
// // //                 </div>
// // //                 <div className="flex-1 text-center sm:text-left">
// // //                   <h4 className="text-sm font-semibold text-[#7f13ec] uppercase tracking-wider mb-1">Featured In This Story</h4>
// // //                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">The Kintsugi Repair Kit</h3>
// // //                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Learn the ancient art of repairing broken pottery with gold.</p>
// // //                   <a className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-[#7f13ec] transition-colors" href="#">
// // //                     View Product <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
// // //                   </a>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </article>
// // //         </div>

// // //         {/* Workshop Call to Action */}
// // //         <section className="mt-24 w-full bg-[#1e1625] border-y border-white/5 py-24">
// // //           <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
// // //             <div className="space-y-8">
// // //               <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
// // //                 Experience the process <br /> <span className="text-[#7f13ec] font-medium">first hand.</span>
// // //               </h2>
// // //               <p className="text-gray-400 text-lg leading-relaxed max-w-md">Join our weekend workshops where we explore the tactile nature of clay.</p>
// // //               <button className="bg-[#7f13ec] hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg flex items-center gap-2">
// // //                 <span>Book a Workshop</span>
// // //                 <span className="material-symbols-outlined">calendar_month</span>
// // //               </button>
// // //             </div>
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <img className="rounded-2xl w-full h-64 object-cover transform translate-y-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALfbss3Elc1-UWET4NHwph0iINNzyJzk7j5zVg_dVGEywx1bR60ylGzih_vbI7Gqu6JNhXjzO4Obxh12GjspWmhPLIfi7zZUVya6hjRVPVOHQ9hg9Zix40WyeHkBb4Fd86k9Kzu9eshHchfzGgDoVHd9KAxqHCUvu9K7kehzX-4l5Huxc5Y2A-u9aveTBhxkRloxjF6M9J4wnQsUOnrEKlBbTe9pfq6VhXF-JyAKEecPLvqWOaPCFzRmrajDAPgpDK6c8lrwaLoiA" alt="Hands working" />
// // //               <img className="rounded-2xl w-full h-64 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdFJdqGYaJmlM2lx976waE_cUh0o8xbUFhVIcEB1FdyRl-bgy0lWp4NLX1WfL_2QlzCWEB4VwFkfOj1VGf9Utm3sUGwwkqGlWBwXUawawqXvIJzAQmFHXG5zjNisxa18O3iX1-Cfm-KDpKC29bG_GfNMLWZW2SPQVy820qDUYuzm2_mhwV58KfyDPWMNi-Lzwhg9quGdud0b0UV9aukGWSKbUGO38xDSkzWdA9c1mC7rc5noTZTJHv9UyE-dE_A3l1-6psWJZ_H4o" alt="Pottery tools" />
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* Comments Section */}
// // //         <div className="w-full max-w-[720px] mx-auto px-6 mt-24">
// // //           <div className="border-t border-gray-200 dark:border-white/10 pt-16">
// // //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">Comments (2)</h3>
            
// // //             <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-6 md:p-8 mb-16 shadow-sm">
// // //               <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Leave a comment</h4>
// // //               <div className="space-y-6">
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                   <div className="space-y-2">
// // //                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
// // //                     <input id="name" value={formData.name} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec]" type="text" placeholder="Enter your name" />
// // //                   </div>
// // //                   <div className="space-y-2">
// // //                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
// // //                     <input id="email" value={formData.email} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec]" type="email" placeholder="Enter your email" />
// // //                   </div>
// // //                 </div>
// // //                 <div className="space-y-2">
// // //                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Comment</label>
// // //                   <textarea id="comment" value={formData.comment} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec] resize-y" rows="4" placeholder="Write your thoughts here..."></textarea>
// // //                 </div>
// // //                 <div className="flex justify-end">
// // //                   <button className="bg-[#7f13ec] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-purple-700 transition-colors">Submit Comment</button>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Comment Thread */}
// // //             <div className="space-y-10">
// // //               <div className="flex gap-4 sm:gap-6">
// // //                 <div className="shrink-0">
// // //                   <div className="size-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">JD</div>
// // //                 </div>
// // //                 <div className="flex-1 space-y-3">
// // //                   <div className="flex justify-between items-center">
// // //                     <span className="font-bold text-gray-900 dark:text-white">James Davies</span>
// // //                     <button className="text-sm font-bold text-[#7f13ec]">Reply</button>
// // //                   </div>
// // //                   <p className="text-gray-600 dark:text-gray-300 text-sm">The section about Wabi-Sabi really resonated with me...</p>
                  
// // //                   {/* Author Reply */}
// // //                   <div className="mt-6 pl-6 border-l-2 border-gray-100 dark:border-white/5 flex gap-4">
// // //                     <div className="size-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
// // //                       <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Author" />
// // //                     </div>
// // //                     <div>
// // //                       <div className="flex items-center gap-2 mb-1">
// // //                         <span className="font-bold text-sm">Akiko Tanaka</span>
// // //                         <span className="px-2 py-0.5 rounded-full bg-[#7f13ec]/10 text-[#7f13ec] text-[10px] font-bold uppercase">Author</span>
// // //                       </div>
// // //                       <p className="text-sm text-gray-600 dark:text-gray-300">Thank you James! Keep creating!</p>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Related Articles SECTION UPDATED BELOW */}
// // //         <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 mt-24 mb-24">
// // //           <div className="flex items-center justify-between mb-12 px-2">
// // //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Related Articles</h3>
// // //             <a className="text-[#7f13ec] font-bold text-sm" href="#">View all</a>
// // //           </div>
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // //             {[
// // //               { 
// // //                 title: "Tea Ceremonies for Beginners", 
// // //                 tag: "Rituals", 
// // //                 img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800", 
// // //                 date: "Oct 12" 
// // //               },
// // //               { 
// // //                 title: "Essential Tools for Every Potter", 
// // //                 tag: "Guide", 
// // //                 img: "https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&q=80&w=800", 
// // //                 date: "Sep 28" 
// // //               },
// // //               { 
// // //                 title: "The Chemistry of Glazing", 
// // //                 tag: "Science", 
// // //                 img: "https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?auto=format&fit=crop&q=80&w=800", 
// // //                 date: "Sep 15" 
// // //               }
// // //             ].map((article, i) => (
// // //               <a key={i} className="group block" href="#">
// // //                 <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-6 relative">
// // //                   <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={article.img} alt={article.title} />
// // //                   <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{article.tag}</div>
// // //                 </div>
// // //                 <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#7f13ec] transition-colors">{article.title}</h4>
// // //                 <div className="text-xs text-gray-500 mt-2">{article.date}, 2023</div>
// // //               </a>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </main>

// // //       {/* Footer */}
// // //       <footer className="bg-[#f7f6f8] dark:bg-[#191022] border-t border-gray-200 dark:border-white/5 py-12 px-6 text-center md:text-left">
// // //         <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
// // //           <div className="flex items-center gap-2">
// // //             <div className="size-5 text-[#7f13ec]">
// // //               <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
// // //                 <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
// // //               </svg>
// // //             </div>
// // //             <span className="font-bold">Basho</span>
// // //           </div>
// // //           <p className="text-sm text-gray-500">© 2023 Basho Ceramics. All rights reserved.</p>
// // //         </div>
// // //       </footer>
// // //     </div>
// // //   );
// // // };

// // // export default BashoJournalPage;

// // "use client";

// // import React, { useState } from 'react';

// // /**
// //  * BashoJournalPage Component
// //  * Renders a detailed journal article with a hero section, metadata, 
// //  * product features, workshops, and a comment section.
// //  */
// // const BashoJournalPage = () => {
// //   // State for the comment form to handle user input
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     comment: ''
// //   });

// //   const handleInputChange = (e) => {
// //     const { id, value } = e.target;
// //     setFormData(prev => ({ ...prev, [id]: value }));
// //   };

// //   const handleSubmitComment = (e) => {
// //     e.preventDefault();
// //     console.log("Comment Submitted:", formData);
// //     // Add logic here to send data to an API
// //   };

// //   return (
// //     <div className="bg-[#f7f6f8] dark:bg-[#191022] font-sans text-gray-900 dark:text-white antialiased selection:bg-[#7f13ec]/30 selection:text-[#7f13ec]">
// //       {/* Decorative Brand Top Bar */}
// //       <div className="fixed top-0 left-0 h-1 bg-[#7f13ec] z-50 w-1/3"></div>

// //       {/* Navigation Header */}
// //       <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#f7f6f8]/80 dark:bg-[#191022]/80 border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
// //         <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
// //           <div className="flex items-center justify-between h-20">
// //             <div className="flex items-center gap-4">
// //               <div className="size-6 text-[#7f13ec]">
// //                 <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
// //                   <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
// //                 </svg>
// //               </div>
// //               <h2 className="text-xl font-bold tracking-tight">Basho</h2>
// //             </div>
// //             <nav className="hidden md:flex items-center gap-8">
// //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">Shop</a>
// //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">Workshops</a>
// //               <a className="text-sm font-medium text-[#7f13ec]" href="#">Journal</a>
// //               <a className="text-sm font-medium hover:text-[#7f13ec] transition-colors" href="#">About</a>
// //             </nav>
// //             <div className="flex gap-3">
// //               <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
// //                 <span className="material-symbols-outlined text-[20px]">search</span>
// //               </button>
// //               <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
// //                 <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <main className="flex flex-col w-full min-h-screen pb-32">
// //         {/* Article Hero Section */}
// //         <div className="w-full relative h-[70vh] min-h-[500px] overflow-hidden">
// //           <div 
// //             className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105" 
// //             style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBU9P3jB_Br7n4DPBp7Wau8_tey-WXid2Ygu9MBsVg-czmJrCWZnsPbatihcSb1CyQWi8EIoysXYCP85wNR5ZcGB2KWYlRUmiqj69VmQihNemkwuL5B7zC6ZgENJb3tOtcS7bDOA5SKEC2B_t9Fb4hTpbTf8aYD0-yIye5hef6588dzuxEM7Jt2mnu23vmu9YbNxsM-uQgXHdFcQTp8sHBDN51Cm3YgbgKqIEQd9L91YvpcNwVqlxfiAH5iAGtIuHOEwiID0h-8S1c')" }}
// //           ></div>
// //           <div className="absolute inset-0 bg-gradient-to-t from-[#f7f6f8] dark:from-[#191022] via-transparent to-black/30"></div>
// //           <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 flex flex-col items-center text-center">
// //             <div className="max-w-4xl space-y-6">
// //               <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase text-white bg-[#7f13ec]/80 backdrop-blur-sm rounded-full mb-4">Philosophy</span>
// //               <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]">
// //                 The Art of Imperfection:<br />
// //                 <span className="font-bold">Wabi-Sabi in Modern Living</span>
// //               </h1>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Metadata & Author Bar */}
// //         <div className="w-full border-b border-gray-200 dark:border-white/5 bg-[#f7f6f8] dark:bg-[#191022]">
// //           <div className="max-w-[720px] mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
// //             <div className="flex items-center gap-3">
// //               <div className="size-8 rounded-full bg-gray-300 overflow-hidden">
// //                 <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Akiko Tanaka" />
// //               </div>
// //               <span>Written by <strong className="text-gray-900 dark:text-white font-medium">Akiko Tanaka</strong></span>
// //             </div>
// //             <div className="flex items-center gap-6">
// //               <span>October 24, 2023</span>
// //               <span className="size-1 rounded-full bg-gray-400"></span>
// //               <span>5 min read</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Article Content */}
// //         <div className="relative w-full max-w-[1200px] mx-auto">
// //           {/* Desktop Floating Share Bar */}
// //           <div className="hidden lg:flex flex-col gap-4 absolute top-24 left-8 xl:left-0 z-10 w-12 items-center">
// //             <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest -rotate-90 origin-center mb-8 whitespace-nowrap">Share</span>
// //             <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 hover:text-[#7f13ec] transition-all">
// //                <span className="material-symbols-outlined text-[18px]">share</span>
// //             </button>
// //             <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 hover:text-[#7f13ec] transition-all">
// //                <span className="material-symbols-outlined text-[18px]">link</span>
// //             </button>
// //           </div>

// //           <article className="w-full max-w-[720px] mx-auto px-6 mt-16 md:mt-24 space-y-12 text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-light">
// //             <p>
// //               In the quiet corners of our studio, we embrace the flaws. The philosophy of 
// //               <em className="italic text-gray-900 dark:text-white mx-1">Wabi-Sabi</em> 
// //               teaches us that nothing lasts, nothing is finished, and nothing is perfect.
// //             </p>

// //             {/* Featured Blockquote */}
// //             <div className="py-8 my-8 relative">
// //               <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#7f13ec] to-transparent rounded-full opacity-50"></div>
// //               <blockquote className="pl-8 md:pl-12">
// //                 <p className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-white tracking-tight leading-snug">
// //                   "There is a crack in everything, that's how the light gets in."
// //                 </p>
// //                 <footer className="mt-4 text-sm font-medium text-[#7f13ec] uppercase tracking-widest">— Leonard Cohen</footer>
// //               </blockquote>
// //             </div>

// //             {/* Visual Grid for Texture and Product */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
// //               <div className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
// //                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-4IlU2pzzRyQwgVZJof_vSfH0e3YPjORvMdnPyzwPUPVjmYkRKbzjd2pDHKP6Y82ObRDWYugVY9Hg9WGq9MmDz7qM2AnfrEzdAGA8y8MQNbF1kpgBigcpqek_bYIUnXpgScaWwWQEDRCC2MTcKnTYoEb-Ne-Wv4co-TMv-p47P76AdRwBejOpa86dvOyH-svZPfPf4rvQ7t7QxUjhAv2BaKQHrgDFQaBjejnEzeV2LRinujbdlZbz97dAnWfW3BNmiRsoAR9WI5c" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Detail" />
// //                 <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-white">Glazing Detail</div>
// //               </div>
// //               <div className="aspect-[3/4] rounded-2xl overflow-hidden relative group md:mt-12">
// //                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuClI3cbN-Hug2Chb5JIBQ7PsfIcl_WFTYYnCTdZ-5HYMSaVrP0trsJHb9GbE8VzWAjmx1mdh86dmHMNpeY0sU9WwfeITPqUtIL4_cX7LfJNnehheYhPBKUEUicf2gzA9NzZNcL1EnMoO8YBBIcwaFAhJPvpxtUG8OiZA3mLBjIcHb5AYiWMdqTIqE4JnsXwmfHMSvJ380JU-ikzaVClsSLc0ddxFBeccXDPcxQtzq0e7Y4_6LlC6Es41LCMWvWHESsFDf7Ym6dEqy8" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Collection" />
// //                 <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-white">Finished Collection</div>
// //               </div>
// //             </div>

// //             {/* Product Feature Box */}
// //             <div className="my-12 p-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-white/10 dark:to-white/5 rounded-2xl">
// //               <div className="bg-[#f7f6f8] dark:bg-[#1f162b] rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center">
// //                 <div className="size-24 sm:size-32 shrink-0 rounded-lg overflow-hidden bg-gray-100">
// //                   <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1eCETqtlhkdOVwAsWWMGvSkjObbUKmfA7Pi-HwuAPaxXJ3dGBzq4vIZJ69XRcJMXPZADWHmTW4gyfyft_uhjEW9phVbyFEbzE3gdn3ABXEi_oBWJypYM3nr6f37r3evxqJ5V5_IFdLaPBx1u7czWapc9usovYGlTve4G-13jtzA7-LU2np5ZHHcxkWWNOnZvfgW1wR1uaHZRI78A-DB3AemWkvtpuaSepRv1QsQ47kzlsMJcQKMvBV2Z5S2104Vbf4m6cZfi-5Wc" alt="Kintsugi Kit" />
// //                 </div>
// //                 <div className="flex-1 text-center sm:text-left">
// //                   <h4 className="text-sm font-semibold text-[#7f13ec] uppercase tracking-wider mb-1">Featured In This Story</h4>
// //                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">The Kintsugi Repair Kit</h3>
// //                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Learn the ancient art of repairing broken pottery with gold.</p>
// //                   <button className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-[#7f13ec] transition-colors">
// //                     View Product <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </article>
// //         </div>

// //         {/* Workshop CTA Section */}
// //         <section className="mt-24 w-full bg-[#1e1625] border-y border-white/5 py-24">
// //           <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
// //             <div className="space-y-8">
// //               <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
// //                 Experience the process <br /> <span className="text-[#7f13ec] font-medium">first hand.</span>
// //               </h2>
// //               <p className="text-gray-400 text-lg leading-relaxed max-w-md">Join our weekend workshops where we explore the tactile nature of clay.</p>
// //               <button className="bg-[#7f13ec] hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg flex items-center gap-2">
// //                 <span>Book a Workshop</span>
// //                 <span className="material-symbols-outlined">calendar_month</span>
// //               </button>
// //             </div>
// //             <div className="grid grid-cols-2 gap-4">
// //               <img className="rounded-2xl w-full h-64 object-cover transform translate-y-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALfbss3Elc1-UWET4NHwph0iINNzyJzk7j5zVg_dVGEywx1bR60ylGzih_vbI7Gqu6JNhXjzO4Obxh12GjspWmhPLIfi7zZUVya6hjRVPVOHQ9hg9Zix40WyeHkBb4Fd86k9Kzu9eshHchfzGgDoVHd9KAxqHCUvu9K7kehzX-4l5Huxc5Y2A-u9aveTBhxkRloxjF6M9J4wnQsUOnrEKlBbTe9pfq6VhXF-JyAKEecPLvqWOaPCFzRmrajDAPgpDK6c8lrwaLoiA" alt="Pottery" />
// //               <img className="rounded-2xl w-full h-64 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdFJdqGYaJmlM2lx976waE_cUh0o8xbUFhVIcEB1FdyRl-bgy0lWp4NLX1WfL_2QlzCWEB4VwFkfOj1VGf9Utm3sUGwwkqGlWBwXUawawqXvIJzAQmFHXG5zjNisxa18O3iX1-Cfm-KDpKC29bG_GfNMLWZW2SPQVy820qDUYuzm2_mhwV58KfyDPWMNi-Lzwhg9quGdud0b0UV9aukGWSKbUGO38xDSkzWdA9c1mC7rc5noTZTJHv9UyE-dE_A3l1-6psWJZ_H4o" alt="Tools" />
// //             </div>
// //           </div>
// //         </section>

// //         {/* Comments Section */}
// //         <div className="w-full max-w-[720px] mx-auto px-6 mt-24">
// //           <div className="border-t border-gray-200 dark:border-white/10 pt-16">
// //             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">Comments (2)</h3>
            
// //             {/* Comment Submission Form */}
// //             <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-6 md:p-8 mb-16 shadow-sm">
// //               <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Leave a comment</h4>
// //               <form onSubmit={handleSubmitComment} className="space-y-6">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   <div className="space-y-2">
// //                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
// //                     <input id="name" required value={formData.name} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec]" type="text" placeholder="Enter your name" />
// //                   </div>
// //                   <div className="space-y-2">
// //                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
// //                     <input id="email" required value={formData.email} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec]" type="email" placeholder="Enter your email" />
// //                   </div>
// //                 </div>
// //                 <div className="space-y-2">
// //                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Comment</label>
// //                   <textarea id="comment" required value={formData.comment} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec] resize-y" rows="4" placeholder="Write your thoughts here..."></textarea>
// //                 </div>
// //                 <div className="flex justify-end">
// //                   <button type="submit" className="bg-[#7f13ec] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-purple-700 transition-colors">Submit Comment</button>
// //                 </div>
// //               </form>
// //             </div>

// //             {/* Static Comment Thread */}
// //             <div className="space-y-10">
// //               <div className="flex gap-4 sm:gap-6">
// //                 <div className="shrink-0">
// //                   <div className="size-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">JD</div>
// //                 </div>
// //                 <div className="flex-1 space-y-3">
// //                   <div className="flex justify-between items-center">
// //                     <span className="font-bold text-gray-900 dark:text-white">James Davies</span>
// //                     <button className="text-sm font-bold text-[#7f13ec]">Reply</button>
// //                   </div>
// //                   <p className="text-gray-600 dark:text-gray-300 text-sm">The section about Wabi-Sabi really resonated with me. Celebrating imperfections is a refreshing perspective.</p>
                  
// //                   {/* Author Reply Nested */}
// //                   <div className="mt-6 pl-6 border-l-2 border-gray-100 dark:border-white/5 flex gap-4">
// //                     <div className="size-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
// //                       <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Author" />
// //                     </div>
// //                     <div>
// //                       <div className="flex items-center gap-2 mb-1">
// //                         <span className="font-bold text-sm">Akiko Tanaka</span>
// //                         <span className="px-2 py-0.5 rounded-full bg-[#7f13ec]/10 text-[#7f13ec] text-[10px] font-bold uppercase">Author</span>
// //                       </div>
// //                       <p className="text-sm text-gray-600 dark:text-gray-300">Thank you James! That mindset shift is exactly what we hope to inspire.</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </main>

// //       {/* Footer Section */}
// //       <footer className="bg-[#f7f6f8] dark:bg-[#191022] border-t border-gray-200 dark:border-white/5 py-12 px-6">
// //         <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
// //           <div className="flex items-center gap-2">
// //             <div className="size-5 text-[#7f13ec]">
// //               <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
// //                 <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
// //               </svg>
// //             </div>
// //             <span className="font-bold">Basho</span>
// //           </div>
// //           <p className="text-sm text-gray-500">© 2023 Basho Ceramics. All rights reserved.</p>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default BashoJournalPage;

// "use client";

// import React, { useState, useEffect, useRef } from "react";

// /**
//  * BashoJournalPage Component
//  * Combines sophisticated animations, texture overlays, restored content sections,
//  * and a functional comment form.
//  */
// const BashoJournalPage = () => {
//   // --- State & Refs ---
//   const [isVisible, setIsVisible] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     comment: ''
//   });
//   const sectionRef = useRef(null);

//   // --- Animation Logic ---
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
//       { threshold: 0.1 }
//     );
//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => sectionRef.current && observer.unobserve(sectionRef.current);
//   }, []);

//   // --- Handlers ---
//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({ ...prev, [id]: value }));
//   };

//   const handleSubmitComment = (e) => {
//     e.preventDefault();
//     console.log("Comment Submitted:", formData);
//   };

//   return (
//     <div className="relative bg-[#f7f6f8] dark:bg-[#191022] font-sans text-gray-900 dark:text-white antialiased selection:bg-[#7f13ec]/30 selection:text-[#7f13ec]">
      
//       {/* Texture & Grain Overlay */}
//       <div className="absolute inset-0 opacity-[0.12] pointer-events-none z-0">
//         <div 
//           className="absolute inset-0 animate-grain-shift" 
//           style={{ 
//             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
//             backgroundSize: '200px 200px'
//           }}
//         />
//       </div>

//       {/* Brand Bar */}
//       <div className="fixed top-0 left-0 h-1 bg-[#7f13ec] z-50 w-1/3"></div>

//       {/* Header */}
//       <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#f7f6f8]/80 dark:bg-[#191022]/80 border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
//         <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
//           <div className="flex items-center justify-between h-20">
//             <div className="flex items-center gap-4">
//               <div className="size-6 text-[#7f13ec]">
//                 <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
//                 </svg>
//               </div>
//               <h2 className="text-xl font-bold tracking-tight">Basho</h2>
//             </div>
//             <nav className="hidden md:flex items-center gap-8">
//               <a className="text-sm font-medium hover:text-[#7f13ec]" href="#">Shop</a>
//               <a className="text-sm font-medium hover:text-[#7f13ec]" href="#">Workshops</a>
//               <a className="text-sm font-medium text-[#7f13ec]" href="#">Journal</a>
//               <a className="text-sm font-medium hover:text-[#7f13ec]" href="#">About</a>
//             </nav>
//             <div className="flex gap-3">
//               <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
//                 <span className="material-symbols-outlined text-[20px]">search</span>
//               </button>
//               <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
//                 <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main ref={sectionRef} className="relative z-10 flex flex-col w-full pb-32">
//         {/* Article Hero Section */}
//         <div className="w-full relative h-[70vh] min-h-[500px] overflow-hidden">
//           <div 
//             className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105" 
//             style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBU9P3jB_Br7n4DPBp7Wau8_tey-WXid2Ygu9MBsVg-czmJrCWZnsPbatihcSb1CyQWi8EIoysXYCP85wNR5ZcGB2KWYlRUmiqj69VmQihNemkwuL5B7zC6ZgENJb3tOtcS7bDOA5SKEC2B_t9Fb4hTpbTf8aYD0-yIye5hef6588dzuxEM7Jt2mnu23vmu9YbNxsM-uQgXHdFcQTp8sHBDN51Cm3YgbgKqIEQd9L91YvpcNwVqlxfiAH5iAGtIuHOEwiID0h-8S1c')" }}
//           ></div>
//           <div className="absolute inset-0 bg-gradient-to-t from-[#f7f6f8] dark:from-[#191022] via-transparent to-black/30"></div>
//           <div className={`absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 flex flex-col items-center text-center transition-all duration-1000 ease-out ${
//             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
//           }`}>
//             <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest uppercase text-white bg-[#7f13ec]/80 backdrop-blur-sm rounded-full mb-4">Philosophy</span>
//             <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]">
//               The Art of Imperfection:<br />
//               <span className="font-bold">Wabi-Sabi in Modern Living</span>
//             </h1>
//           </div>
//         </div>

//         {/* Metadata & Author Bar */}
//         <div className="w-full border-b border-gray-200 dark:border-white/5 bg-[#f7f6f8] dark:bg-[#191022]">
//           <div className="max-w-[720px] mx-auto py-6 px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
//             <div className="flex items-center gap-3">
//               <div className="size-8 rounded-full bg-gray-300 overflow-hidden">
//                 <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Akiko Tanaka" />
//               </div>
//               <span>Written by <strong className="text-gray-900 dark:text-white font-medium">Akiko Tanaka</strong></span>
//             </div>
//             <div className="flex items-center gap-6">
//               <span>October 24, 2023</span>
//               <span className="size-1 rounded-full bg-gray-400"></span>
//               <span>5 min read</span>
//             </div>
//           </div>
//         </div>

//         {/* Article Body Content */}
//         <div className="relative w-full max-w-[1200px] mx-auto">
//           {/* Desktop Floating Share Bar */}
//           <div className="hidden lg:flex flex-col gap-4 absolute top-24 left-8 xl:left-0 z-10 w-12 items-center">
//             <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest -rotate-90 origin-center mb-8 whitespace-nowrap">Share</span>
//             <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 hover:text-[#7f13ec] transition-all">
//                <span className="material-symbols-outlined text-[18px]">share</span>
//             </button>
//             <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 hover:text-[#7f13ec] transition-all">
//                <span className="material-symbols-outlined text-[18px]">link</span>
//             </button>
//           </div>

//           <article className="w-full max-w-[720px] mx-auto px-6 mt-16 md:mt-24 space-y-12 text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-light">
//             <p>
//               In the quiet corners of our studio, we embrace the flaws. The philosophy of 
//               <em className="italic text-gray-900 dark:text-white mx-1">Wabi-Sabi</em> 
//               teaches us that nothing lasts, nothing is finished, and nothing is perfect.
//             </p>

//             <div className="py-8 my-8 relative">
//               <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#7f13ec] to-transparent rounded-full opacity-50"></div>
//               <blockquote className="pl-8 md:pl-12">
//                 <p className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-white tracking-tight leading-snug">
//                   "There is a crack in everything, that's how the light gets in."
//                 </p>
//                 <footer className="mt-4 text-sm font-medium text-[#7f13ec] uppercase tracking-widest">— Leonard Cohen</footer>
//               </blockquote>
//             </div>

//             <p>
//               When we first began crafting the autumn collection, we noticed how the glaze reacted unpredictably to the kiln's heat. Instead of discarding these pieces, we celebrated them.
//             </p>

//             {/* Restored Visual Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
//               <div className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
//                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-4IlU2pzzRyQwgVZJof_vSfH0e3YPjORvMdnPyzwPUPVjmYkRKbzjd2pDHKP6Y82ObRDWYugVY9Hg9WGq9MmDz7qM2AnfrEzdAGA8y8MQNbF1kpgBigcpqek_bYIUnXpgScaWwWQEDRCC2MTcKnTYoEb-Ne-Wv4co-TMv-p47P76AdRwBejOpa86dvOyH-svZPfPf4rvQ7t7QxUjhAv2BaKQHrgDFQaBjejnEzeV2LRinujbdlZbz97dAnWfW3BNmiRsoAR9WI5c" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Detail" />
//                 <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-white">Glazing Detail</div>
//               </div>
//               <div className="aspect-[3/4] rounded-2xl overflow-hidden relative group md:mt-12">
//                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuClI3cbN-Hug2Chb5JIBQ7PsfIcl_WFTYYnCTdZ-5HYMSaVrP0trsJHb9GbE8VzWAjmx1mdh86dmHMNpeY0sU9WwfeITPqUtIL4_cX7LfJNnehheYhPBKUEUicf2gzA9NzZNcL1EnMoO8YBBIcwaFAhJPvpxtUG8OiZA3mLBjIcHb5AYiWMdqTIqE4JnsXwmfHMSvJ380JU-ikzaVClsSLc0ddxFBeccXDPcxQtzq0e7Y4_6LlC6Es41LCMWvWHESsFDf7Ym6dEqy8" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Collection" />
//                 <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-white">Finished Collection</div>
//               </div>
//             </div>

//             <p>
//               Imperfection is not about sloppy craftsmanship; it is about respecting the nature of the material. When a bowl is slightly asymmetrical, it fits the hand more naturally.
//             </p>

//             {/* Product Feature Box */}
//             <div className="my-12 p-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-white/10 dark:to-white/5 rounded-2xl">
//               <div className="bg-[#f7f6f8] dark:bg-[#1f162b] rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center">
//                 <div className="size-24 sm:size-32 shrink-0 rounded-lg overflow-hidden bg-gray-100">
//                   <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1eCETqtlhkdOVwAsWWMGvSkjObbUKmfA7Pi-HwuAPaxXJ3dGBzq4vIZJ69XRcJMXPZADWHmTW4gyfyft_uhjEW9phVbyFEbzE3gdn3ABXEi_oBWJypYM3nr6f37r3evxqJ5V5_IFdLaPBx1u7czWapc9usovYGlTve4G-13jtzA7-LU2np5ZHHcxkWWNOnZvfgW1wR1uaHZRI78A-DB3AemWkvtpuaSepRv1QsQ47kzlsMJcQKMvBV2Z5S2104Vbf4m6cZfi-5Wc" alt="Kintsugi Kit" />
//                 </div>
//                 <div className="flex-1 text-center sm:text-left">
//                   <h4 className="text-sm font-semibold text-[#7f13ec] uppercase tracking-wider mb-1">Featured In This Story</h4>
//                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">The Kintsugi Repair Kit</h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">Learn the ancient art of repairing broken pottery with gold, celebrating its history rather than hiding it.</p>
//                   <button className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-[#7f13ec] transition-colors">
//                     View Product <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Restored Final Text Paragraph */}
//             <p>
//               We invite you to look at the objects in your own home differently. Do not seek the pristine and the untouched. Look for the stories in the scratches, the character in the fading colors. That is where the true beauty lies.
//             </p>
            
//             <div className="h-12 w-full flex items-center justify-center my-8">
//               <span className="w-1.5 h-1.5 bg-[#7f13ec]/40 rounded-full mx-1"></span>
//               <span className="w-1.5 h-1.5 bg-[#7f13ec]/40 rounded-full mx-1"></span>
//               <span className="w-1.5 h-1.5 bg-[#7f13ec]/40 rounded-full mx-1"></span>
//             </div>
//           </article>
//         </div>

//         {/* Comment Section Content */}
//         <div className="w-full max-w-[720px] mx-auto px-6 mt-16">
//           <div className="border-t border-gray-200 dark:border-white/10 pt-16">
//             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">Comments (2)</h3>
            
//             <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-6 md:p-8 mb-16 shadow-sm">
//               <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Leave a comment</h4>
//               <form onSubmit={handleSubmitComment} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
//                     <input id="name" required value={formData.name} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec]" type="text" placeholder="Enter your name" />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//                     <input id="email" required value={formData.email} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec]" type="email" placeholder="Enter your email" />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Comment</label>
//                   <textarea id="comment" required value={formData.comment} onChange={handleInputChange} className="w-full rounded-lg bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-3 outline-none focus:ring-1 focus:ring-[#7f13ec] resize-y" rows="4" placeholder="Write your thoughts here..."></textarea>
//                 </div>
//                 <div className="flex justify-end">
//                   <button type="submit" className="bg-[#7f13ec] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-purple-700 transition-colors">Submit Comment</button>
//                 </div>
//               </form>
//             </div>

//             {/* Comment Thread Content */}
//             <div className="space-y-10">
//               <div className="flex gap-4 sm:gap-6">
//                 <div className="shrink-0">
//                   <div className="size-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">JD</div>
//                 </div>
//                 <div className="flex-1 space-y-3">
//                   <div className="flex justify-between items-center">
//                     <span className="font-bold text-gray-900 dark:text-white">James Davies</span>
//                     <button className="text-sm font-bold text-[#7f13ec]">Reply</button>
//                   </div>
//                   <p className="text-gray-600 dark:text-gray-300 text-sm">The section about Wabi-Sabi really resonated with me. Celebrating imperfections is a refreshing perspective.</p>
//                   <div className="mt-6 pl-6 border-l-2 border-gray-100 dark:border-white/5 flex gap-4">
//                     <div className="size-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
//                       <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Author" />
//                     </div>
//                     <div>
//                       <div className="flex items-center gap-2 mb-1">
//                         <span className="font-bold text-sm">Akiko Tanaka</span>
//                         <span className="px-2 py-0.5 rounded-full bg-[#7f13ec]/10 text-[#7f13ec] text-[10px] font-bold uppercase">Author</span>
//                       </div>
//                       <p className="text-sm text-gray-600 dark:text-gray-300">Thank you James! That mindset shift is exactly what we hope to inspire.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Workshop CTA Section */}
//         <section className="mt-24 w-full bg-[#1e1625] border-y border-white/5 py-24 px-6">
//           <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             <div className="space-y-8 text-center lg:text-left">
//               <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
//                 Experience the process <br /> <span className="text-[#7f13ec] font-medium">first hand.</span>
//               </h2>
//               <button className="bg-[#7f13ec] hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 mx-auto lg:mx-0">
//                 <span>Book a Workshop</span>
//                 <span className="material-symbols-outlined">calendar_month</span>
//               </button>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <img className="rounded-2xl w-full h-64 object-cover transform translate-y-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALfbss3Elc1-UWET4NHwph0iINNzyJzk7j5zVg_dVGEywx1bR60ylGzih_vbI7Gqu6JNhXjzO4Obxh12GjspWmhPLIfi7zZUVya6hjRVPVOHQ9hg9Zix40WyeHkBb4Fd86k9Kzu9eshHchfzGgDoVHd9KAxqHCUvu9K7kehzX-4l5Huxc5Y2A-u9aveTBhxkRloxjF6M9J4wnQsUOnrEKlBbTe9pfq6VhXF-JyAKEecPLvqWOaPCFzRmrajDAPgpDK6c8lrwaLoiA" alt="Hands" />
//               <img className="rounded-2xl w-full h-64 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdFJdqGYaJmlM2lx976waE_cUh0o8xbUFhVIcEB1FdyRl-bgy0lWp4NLX1WfL_2QlzCWEB4VwFkfOj1VGf9Utm3sUGwwkqGlWBwXUawawqXvIJzAQmFHXG5zjNisxa18O3iX1-Cfm-KDpKC29bG_GfNMLWZW2SPQVy820qDUYuzm2_mhwV58KfyDPWMNi-Lzwhg9quGdud0b0UV9aukGWSKbUGO38xDSkzWdA9c1mC7rc5noTZTJHv9UyE-dE_A3l1-6psWJZ_H4o" alt="Tools" />
//             </div>
//           </div>
//         </section>

//         {/* Related Articles Section (FULLY RESTORED) */}
//         <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 mt-24 mb-24">
//           <div className="flex items-center justify-between mb-12 px-2">
//             <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Related Articles</h3>
//             <a className="text-[#7f13ec] font-bold text-sm hover:underline" href="#">View all</a>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { title: "Tea Ceremonies for Beginners", tag: "Rituals", img: "9", date: "Oct 12" },
//               { title: "Essential Tools for Every Potter", tag: "Guide", img: "4", date: "Sep 28" },
//               { title: "The Chemistry of Glazing", tag: "Science", img: "1", date: "Sep 15" }
//             ].map((article, i) => (
//               <a key={i} className="group block" href="#">
//                 <div className="overflow-hidden rounded-2xl aspect-[4/3] mb-6 relative bg-gray-100 dark:bg-white/5">
//                   <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={`http://googleusercontent.com/profile/picture/${article.img}`} alt={article.title} />
//                   <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{article.tag}</div>
//                 </div>
//                 <h4 className="text-xl font-bold group-hover:text-[#7f13ec] transition-colors leading-tight">{article.title}</h4>
//                 <div className="text-xs text-gray-500 mt-2">{article.date}, 2023</div>
//               </a>
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* Footer Section */}
//       <footer className="bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-white/5 py-12 px-6">
//         <div className="max-w-[1200px] mx-auto flex justify-between items-center text-sm text-gray-500">
//           <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold">Basho</div>
//           <p>© 2023 Basho Ceramics. All rights reserved.</p>
//         </div>
//       </footer>

//       {/* Scoped CSS for Grain Shift Animation */}
//       <style jsx>{`
//         @keyframes grain-shift {
//           0%, 100% { transform: translate(0, 0); }
//           10% { transform: translate(-5%, -5%); }
//           50% { transform: translate(-10%, 5%); }
//           90% { transform: translate(10%, 5%); }
//         }
//         .animate-grain-shift { animation: grain-shift 12s ease-in-out infinite; }
//       `}</style>
//     </div>
//   );
// };

// export default BashoJournalPage;

"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/**
 * BashoJournalPage Component
 * Merged version: High-end animations and effects from AboutPage 
 * applied to the Journal content logic with updated Header and Footer.
 */
const BashoJournalPage = () => {
    // --- State & Refs ---
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState({});
    const [formData, setFormData] = useState({ name: '', email: '', comment: '' });
    const observerRef = useRef(null);

    // --- Effects & Animation Logic ---
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);

        // Intersection Observer for scroll-triggered fades
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[data-animate]').forEach((el) => {
            if (observerRef.current) observerRef.current.observe(el);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    // --- Handlers ---
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
        console.log("Comment Submitted:", formData);
    };

    return (
        <div className="bg-charcoal min-h-screen font-sans text-rice-paper antialiased selection:bg-clay selection:text-white relative overflow-hidden">
            
            {/* 1. Grain Texture Overlay */}
            <div className="fixed inset-0 opacity-[0.12] pointer-events-none z-0">
                <div
                    className="absolute inset-0 animate-grain-shift"
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
                        backgroundSize: '200px 200px'
                    }}
                />
            </div>

            {/* 2. Ambient Cursor Glow (Themed to Clay color) */}
            <div
                className="fixed w-96 h-96 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out mix-blend-screen opacity-20"
                style={{
                    background: `radial-gradient(circle, rgba(166, 93, 61, 0.4) 0%, transparent 70%)`,
                    left: `${mousePosition.x * 2}px`,
                    top: `${mousePosition.y * 2}px`,
                    transform: 'translate(-50%, -50%)',
                }}
            />

            <Header />

            <main className="relative z-10 flex flex-col w-full pb-32">
                
                {/* HERO SECTION with Parallax Effect */}
                <section id="hero" className="relative h-[75vh] min-h-[600px] flex items-center justify-center overflow-hidden" data-animate>
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out" 
                        style={{ 
                            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBU9P3jB_Br7n4DPBp7Wau8_tey-WXid2Ygu9MBsVg-czmJrCWZnsPbatihcSb1CyQWi8EIoysXYCP85wNR5ZcGB2KWYlRUmiqj69VmQihNemkwuL5B7zC6ZgENJb3tOtcS7bDOA5SKEC2B_t9Fb4hTpbTf8aYD0-yIye5hef6588dzuxEM7Jt2mnu23vmu9YbNxsM-uQgXHdFcQTp8sHBDN51Cm3YgbgKqIEQd9L91YvpcNwVqlxfiAH5iAGtIuHOEwiID0h-8S1c')",
                            transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.3}px)`,
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-obsidian/60" />
                    
                    <div className="relative z-10 max-w-4xl px-6 text-center">
                        <div className={`mb-6 ${isVisible['hero'] ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                            <span className="inline-block px-4 py-1 text-xs font-bold tracking-[0.3em] uppercase text-rice-paper bg-clay/80 backdrop-blur-sm">
                                Philosophy
                            </span>
                        </div>
                        <h1 className="font-serif text-5xl md:text-8xl font-light tracking-tight text-rice-paper leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            The Art of Imperfection:<br />
                            <span className="font-bold italic text-clay">Wabi-Sabi in Living</span>
                        </h1>
                    </div>
                </section>

                {/* Metadata & Author Bar */}
                <div className="w-full border-b border-white/5 bg-charcoal relative z-20">
                    <div className="max-w-[720px] mx-auto py-8 px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-stone-warm">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-charcoal-light overflow-hidden border border-clay/30">
                                <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Akiko Tanaka" />
                            </div>
                            <span>Written by <strong className="text-rice-paper font-medium">Akiko Tanaka</strong></span>
                        </div>
                        <div className="flex items-center gap-6 tracking-widest uppercase text-[10px]">
                            <span>October 24, 2023</span>
                            <span className="size-1 rounded-full bg-clay"></span>
                            <span>5 min read</span>
                        </div>
                    </div>
                </div>

                {/* Article Content Section */}
                <div id="article-content" className="relative w-full max-w-[1200px] mx-auto" data-animate>
                    {/* Side Share Bar (Animated) */}
                    <div className="hidden lg:flex flex-col gap-6 absolute top-24 left-8 xl:left-0 z-10 w-12 items-center">
                        <span className="text-[10px] font-bold text-stone-warm uppercase tracking-[0.3em] -rotate-90 origin-center mb-12 whitespace-nowrap">Share Story</span>
                        <button className="flex items-center justify-center size-10 rounded-full bg-charcoal-light border border-white/10 text-rice-paper hover:text-clay hover:border-clay transition-all transform hover:scale-110">
                            <span className="material-symbols-outlined text-[18px]">share</span>
                        </button>
                    </div>

                    <article className="w-full max-w-[720px] mx-auto px-6 mt-16 md:mt-24 space-y-16 text-lg md:text-xl leading-relaxed text-stone-warm font-light">
                        <p className={isVisible['article-content'] ? 'animate-fade-in-up' : 'opacity-0'}>
                            In the quiet corners of our studio, we embrace the flaws. The philosophy of 
                            <em className="italic text-rice-paper mx-1">Wabi-Sabi</em> 
                            teaches us that nothing lasts, nothing is finished, and nothing is perfect. This understanding brings a profound sense of peace to the creative process.
                        </p>

                        <div className="py-12 my-12 relative group">
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-clay to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                            <blockquote className="pl-8 md:pl-16">
                                <p className="font-serif text-3xl md:text-5xl italic text-rice-paper tracking-tight leading-tight">
                                    "There is a crack in everything, that's how the light gets in."
                                </p>
                                <footer className="mt-6 text-xs font-bold text-clay uppercase tracking-[0.4em]">— Leonard Cohen</footer>
                            </blockquote>
                        </div>

                        <p>
                            When we first began crafting the autumn collection, we noticed how the glaze reacted unpredictably to the kiln's heat. Instead of discarding these pieces, we celebrated them.
                        </p>

                        {/* Image Grid with Hover Effects from AboutPage */}
                        <div id="visual-grid" className="grid grid-cols-1 md:grid-cols-2 gap-10 my-20" data-animate>
                            <div className="aspect-[3/4] overflow-hidden relative group border border-white/5 hover:border-clay/30 transition-all duration-700">
                                <img 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-4IlU2pzzRyQwgVZJof_vSfH0e3YPjORvMdnPyzwPUPVjmYkRKbzjd2pDHKP6Y82ObRDWYugVY9Hg9WGq9MmDz7qM2AnfrEzdAGA8y8MQNbF1kpgBigcpqek_bYIUnXpgScaWwWQEDRCC2MTcKnTYoEb-Ne-Wv4co-TMv-p47P76AdRwBejOpa86dvOyH-svZPfPf4rvQ7t7QxUjhAv2BaKQHrgDFQaBjejnEzeV2LRinujbdlZbz97dAnWfW3BNmiRsoAR9WI5c" 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] group-hover:scale-110" 
                                    alt="Detail" 
                                />
                                <div className="absolute bottom-6 left-6 bg-obsidian/60 backdrop-blur-md px-4 py-1 text-[10px] uppercase tracking-widest text-rice-paper">Glazing Detail</div>
                            </div>
                            <div className="aspect-[3/4] overflow-hidden relative group md:mt-20 border border-white/5 hover:border-clay/30 transition-all duration-700">
                                <img 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuClI3cbN-Hug2Chb5JIBQ7PsfIcl_WFTYYnCTdZ-5HYMSaVrP0trsJHb9GbE8VzWAjmx1mdh86dmHMNpeY0sU9WwfeITPqUtIL4_cX7LfJNnehheYhPBKUEUicf2gzA9NzZNcL1EnMoO8YBBIcwaFAhJPvpxtUG8OiZA3mLBjIcHb5AYiWMdqTIqE4JnsXwmfHMSvJ380JU-ikzaVClsSLc0ddxFBeccXDPcxQtzq0e7Y4_6LlC6Es41LCMWvWHESsFDf7Ym6dEqy8" 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] group-hover:scale-110" 
                                    alt="Collection" 
                                />
                                <div className="absolute bottom-6 left-6 bg-obsidian/60 backdrop-blur-md px-4 py-1 text-[10px] uppercase tracking-widest text-rice-paper">Finished Collection</div>
                            </div>
                        </div>

                        {/* Product Feature */}
                        <div className="my-16 p-[1px] bg-white/10 hover:bg-clay/30 transition-colors duration-500">
                            <div className="bg-charcoal-light p-8 md:p-12 flex flex-col sm:flex-row gap-10 items-center">
                                <div className="size-32 sm:size-44 shrink-0 overflow-hidden border border-white/5">
                                    <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1eCETqtlhkdOVwAsWWMGvSkjObbUKmfA7Pi-HwuAPaxXJ3dGBzq4vIZJ69XRcJMXPZADWHmTW4gyfyft_uhjEW9phVbyFEbzE3gdn3ABXEi_oBWJypYM3nr6f37r3evxqJ5V5_IFdLaPBx1u7czWapc9usovYGlTve4G-13jtzA7-LU2np5ZHHcxkWWNOnZvfgW1wR1uaHZRI78A-DB3AemWkvtpuaSepRv1QsQ47kzlsMJcQKMvBV2Z5S2104Vbf4m6cZfi-5Wc" alt="Kintsugi Kit" />
                                </div>
                                <div className="flex-1 text-center sm:text-left space-y-4">
                                    <h4 className="text-[10px] font-bold text-clay uppercase tracking-[0.4em]">Featured In This Story</h4>
                                    <h3 className="font-serif text-3xl text-rice-paper italic">The Kintsugi Repair Kit</h3>
                                    <p className="text-sm text-stone-warm leading-relaxed">Repair broken pottery with gold, celebrating its history rather than hiding its scars.</p>
                                    <button className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-rice-paper hover:text-clay transition-colors pt-4">
                                        View Product 
                                        <span className="material-symbols-outlined text-[18px] transform group-hover:translate-x-2 transition-transform">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <p id="final-paragraph" className={`text-center max-w-2xl mx-auto italic ${isVisible['final-paragraph'] ? 'animate-fade-in-up' : 'opacity-0'}`} data-animate>
                            We invite you to look at the objects in your own home differently. Do not seek the pristine. Look for the stories in the scratches. That is where the true beauty lies.
                        </p>
                        
                        <div className="h-20 w-full flex items-center justify-center my-8">
                            <span className="w-1 h-1 bg-clay rounded-full mx-2 animate-pulse"></span>
                            <span className="w-1 h-1 bg-clay rounded-full mx-2 animate-pulse" style={{ animationDelay: '0.3s' }}></span>
                            <span className="w-1 h-1 bg-clay rounded-full mx-2 animate-pulse" style={{ animationDelay: '0.6s' }}></span>
                        </div>
                    </article>
                </div>

                {/* Comment Section */}
                <section id="comments" className="w-full max-w-[720px] mx-auto px-6 mt-16" data-animate>
                    <div className="border-t border-white/10 pt-20">
                        <h3 className="font-serif text-3xl text-rice-paper mb-12 italic">Journal Conversations (2)</h3>
                        <div className="bg-charcoal-light border border-white/5 p-8 md:p-10 mb-20 shadow-2xl">
                            <form onSubmit={handleSubmitComment} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-clay font-bold">Your Name</label>
                                        <input id="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-charcoal border-b border-white/10 p-3 focus:border-clay outline-none transition-colors text-rice-paper" placeholder="Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-clay font-bold">Email Address</label>
                                        <input id="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-charcoal border-b border-white/10 p-3 focus:border-clay outline-none transition-colors text-rice-paper" type="email" placeholder="Email" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-clay font-bold">Thoughts</label>
                                    <textarea id="comment" required value={formData.comment} onChange={handleInputChange} className="w-full bg-charcoal border-b border-white/10 p-3 focus:border-clay outline-none transition-colors text-rice-paper resize-none" rows="4" placeholder="Share your perspective..."></textarea>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button type="submit" className="group px-10 py-4 bg-clay text-rice-paper uppercase tracking-widest text-[10px] font-bold hover:bg-clay/90 transition-all transform hover:scale-105 relative overflow-hidden">
                                        <span className="relative z-10">Submit Comment</span>
                                        <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Thread */}
                        <div className="space-y-12">
                            <div className="flex gap-6">
                                <div className="shrink-0"><div className="size-12 rounded-full bg-clay/20 flex items-center justify-center text-clay font-bold font-serif italic">JD</div></div>
                                <div className="flex-1 space-y-4">
                                    <div className="flex justify-between items-center"><span className="font-bold text-rice-paper">James Davies</span><button className="text-[10px] uppercase tracking-widest font-bold text-clay">Reply</button></div>
                                    <p className="text-stone-warm text-sm leading-relaxed">The section about Wabi-Sabi really resonated with me. Celebrating imperfections is a refreshing perspective.</p>
                                    <div className="mt-8 pl-8 border-l border-clay/30 flex gap-6">
                                        <div className="size-10 rounded-full overflow-hidden shrink-0 border border-clay/20"><img className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp2iLs5FTVZeOgrtsR-axDd-p2FpQYXrbHrpca5KTgrtg0Jqr0kHM2kWkGaWh9bAd7oOrTnnzo3PeGFvHuq9hvdaequtr0HqZigijvlXfRvI2rdYkVRQsK5OUJjahwks1w3giwJeVgD56oGkSq7eyPzNhejidRYdhJCsYZTTwF74FvAuAq4yWlRfDAN8po86jzLhddEEHh3jSs547CkEgMiaUEVmp2JByRXiHi9wfvsFIby_JKg1uMZqO5oIg9ZLHQfandvTlN0F4" alt="Author" /></div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3"><span className="font-bold text-sm text-rice-paper">Akiko Tanaka</span><span className="text-[8px] bg-clay/20 text-clay px-2 py-0.5 font-bold uppercase tracking-tighter">Author</span></div>
                                            <p className="text-stone-warm text-xs leading-relaxed">Thank you James! That mindset shift is exactly what we hope to inspire.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Workshop CTA (Themed like Journey Timeline) */}
                <section id="cta-workshop" className="mt-32 w-full bg-obsidian border-y border-white/5 py-32 px-6 relative overflow-hidden" data-animate>
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-clay/5 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                        <div className="space-y-10 text-center lg:text-left">
                            <h2 className="font-serif text-5xl md:text-7xl font-light text-rice-paper leading-tight italic">
                                Experience the process <br /> <span className="text-clay not-italic font-bold">first hand.</span>
                            </h2>
                            <p className="text-stone-warm text-lg max-w-md mx-auto lg:mx-0">Join our weekend workshops where we explore the tactile nature of clay and the philosophy of mushin.</p>
                            <button className="group px-10 py-5 bg-clay text-rice-paper uppercase tracking-widest text-xs font-bold hover:bg-clay/90 transition-all relative overflow-hidden">
                                <span className="relative z-10 flex items-center gap-3">Book a Workshop <span className="material-symbols-outlined text-sm">calendar_month</span></span>
                                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <img className="aspect-[4/5] w-full object-cover transform translate-y-12 grayscale hover:grayscale-0 transition-all duration-[2s] border border-white/5 hover:border-clay/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALfbss3Elc1-UWET4NHwph0iINNzyJzk7j5zVg_dVGEywx1bR60ylGzih_vbI7Gqu6JNhXjzO4Obxh12GjspWmhPLIfi7zZUVya6hjRVPVOHQ9hg9Zix40WyeHkBb4Fd86k9Kzu9eshHchfzGgDoVHd9KAxqHCUvu9K7kehzX-4l5Huxc5Y2A-u9aveTBhxkRloxjF6M9J4wnQsUOnrEKlBbTe9pfq6VhXF-JyAKEecPLvqWOaPCFzRmrajDAPgpDK6c8lrwaLoiA" alt="Hands" />
                            <img className="aspect-[4/5] w-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s] border border-white/5 hover:border-clay/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdFJdqGYaJmlM2lx976waE_cUh0o8xbUFhVIcEB1FdyRl-bgy0lWp4NLX1WfL_2QlzCWEB4VwFkfOj1VGf9Utm3sUGwwkqGlWBwXUawawqXvIJzAQmFHXG5zjNisxa18O3iX1-Cfm-KDpKC29bG_GfNMLWZW2SPQVy820qDUYuzm2_mhwV58KfyDPWMNi-Lzwhg9quGdud0b0UV9aukGWSKbUGO38xDSkzWdA9c1mC7rc5noTZTJHv9UyE-dE_A3l1-6psWJZ_H4o" alt="Tools" />
                        </div>
                    </div>
                </section>

                {/* Related Articles Section (High Contrast Grid) */}
                <section id="related-grid" className="w-full max-w-[1200px] mx-auto px-4 md:px-8 mt-40 mb-24" data-animate>
                    <div className="flex items-end justify-between mb-16 px-2">
                        <div>
                            <span className="text-clay text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Expand your knowledge</span>
                            <h3 className="font-serif text-4xl text-rice-paper italic">Related Readings</h3>
                        </div>
                        <a className="text-rice-paper font-bold text-xs uppercase tracking-widest hover:text-clay transition-colors border-b border-clay/30 pb-2" href="#">View all stories</a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "Tea Ceremonies for Beginners", tag: "Rituals", img: "9", date: "Oct 12" },
                            { title: "Essential Tools for Every Potter", tag: "Guide", img: "4", date: "Sep 28" },
                            { title: "The Chemistry of Glazing", tag: "Science", img: "1", date: "Sep 15" }
                        ].map((article, i) => (
                            <a key={i} className="group block space-y-6" href="#">
                                <div className="overflow-hidden aspect-[4/5] relative bg-charcoal-light border border-white/5 group-hover:border-clay/30 transition-all duration-700">
                                    <img className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-[1.5s] group-hover:scale-105" src={`http://googleusercontent.com/profile/picture/${article.img}`} alt={article.title} />
                                    <div className="absolute top-6 left-6 bg-obsidian/80 backdrop-blur-sm px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-rice-paper border border-white/10">{article.tag}</div>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-serif text-2xl group-hover:text-clay transition-colors leading-tight italic">{article.title}</h4>
                                    <div className="text-[10px] text-stone-warm uppercase tracking-widest font-bold">{article.date}, 2023 — 8 MIN READ</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />

            {/* Local Styles for specific animations */}
            <style jsx global>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(40px); filter: blur(5px); }
                    to { opacity: 1; transform: translateY(0); filter: blur(0); }
                }
                @keyframes grain-shift {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-2%, -4%); }
                    30% { transform: translate(4%, -2%); }
                    50% { transform: translate(-4%, 4%); }
                    70% { transform: translate(2%, 2%); }
                    90% { transform: translate(-2%, -2%); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(1.1); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-grain-shift {
                    animation: grain-shift 8s steps(8) infinite;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 10s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default BashoJournalPage; 