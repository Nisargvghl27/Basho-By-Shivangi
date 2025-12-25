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