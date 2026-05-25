"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// ---------------------------------------------------------------------------
// useInView — one observer per element, disconnects immediately after reveal.
// ---------------------------------------------------------------------------
function useInView(threshold = 0.05) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    obs.disconnect();
                }
            },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);

    return [ref, inView];
}

// ---------------------------------------------------------------------------
// JourneyItem — owns its own observer so hooks are never called in a loop
// ---------------------------------------------------------------------------
function JourneyItem({ item, index }) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
        >
            {/* Image */}
            <div
                className={`relative h-[500px] overflow-hidden group ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                style={{
                    transform:  inView ? "translateX(0)" : `translateX(${index % 2 === 0 ? "-60px" : "60px"})`,
                    opacity:    inView ? 1 : 0,
                    transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease",
                }}
            >
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-200 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                <div className="absolute top-8 left-8 bg-clay text-charcoal font-bold text-3xl px-8 py-4 font-serif">
                    {item.year}
                </div>
            </div>

            {/* Content */}
            <div
                className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}
                style={{
                    transform:  inView ? "translateX(0)" : `translateX(${index % 2 === 0 ? "60px" : "-60px"})`,
                    opacity:    inView ? 1 : 0,
                    transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1) 0.06s, opacity 0.35s ease 0.06s",
                }}
            >
                <h3 className="font-serif text-4xl text-rice-paper mb-6">{item.title}</h3>
                <p className="text-stone-warm text-xl leading-relaxed">{item.desc}</p>
            </div>
        </div>
    );
}

const principles = [
    { title: "Wabi-Sabi", desc: "Finding beauty in imperfection, impermanence, and incompleteness.", kanji: "侘寂", color: "from-amber-500/20 to-orange-500/20" },
    { title: "Ma",        desc: "The void between, negative space that gives meaning to form.",          kanji: "間",   color: "from-stone-500/20 to-zinc-500/20" },
    { title: "Kanso",     desc: "Simplicity achieved through elimination of the non-essential.",          kanji: "簡素", color: "from-clay/20 to-amber-600/20" },
    { title: "Shizen",    desc: "Naturalness without pretense or artificiality.",                         kanji: "自然", color: "from-emerald-500/20 to-teal-500/20" },
];

const journey = [
    { year: "2019", title: "The Awakening", desc: "Shivangi discovered the wheel during a solo retreat in Rishikesh. What began as therapy became destiny.",                                                                        image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2670" },
    { year: "2020", title: "The Study",     desc: "Months spent mastering Japanese pottery techniques, studying under ceramic masters, embracing failure.",                                                                         image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2574" },
    { year: "2021", title: "The Birth",     desc: "Basho was born—named after the poet who found infinity in a single haiku. The first collection sold out in hours.",                                                             image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2670" },
    { year: "2024", title: "The Movement",  desc: "Today, Basho creates not just pottery, but experiences—workshops, collaborations, and a community of mindful makers.", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2574" },
];

const craftSteps = [
    { step: "01", title: "Centering", desc: "The clay meets the wheel. Through patient touch and breath, chaos becomes possibility. This is meditation in motion.", icon: "🌀" },
    { step: "02", title: "Shaping",   desc: "Walls rise slowly. Each curve holds intention. We embrace asymmetry, for perfection is found in the perfectly imperfect.", icon: "🏺" },
    { step: "03", title: "Firing",    desc: "Into the kiln at 1200°C. Fire transforms. What emerges is never quite what was expected—and that's the beauty.", icon: "🔥" },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AboutPage() {
    // ── RAF-based parallax (no setState) ──────────────────────────────────
    const heroBgRef   = useRef(null);
    const ctaBgRef    = useRef(null);
    const kanjiARef   = useRef(null);
    const kanjiBRef   = useRef(null);
    const cursorRef   = useRef(null);
    const rafRef      = useRef(null);
    const mouseRef    = useRef({ x: 0, y: 0 });
    const scrollRef   = useRef(0);

    useEffect(() => {
        const onMove = (e) => {
            mouseRef.current = {
                x: (e.clientX / window.innerWidth  - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            };
        };
        const onScroll = () => { scrollRef.current = window.scrollY; };

        const tick = () => {
            const { x, y } = mouseRef.current;
            const sy = scrollRef.current;

            // Cursor glow — position via CSS vars on the element
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(calc(${x * 2}px - 50%), calc(${y * 2}px - 50%))`;
            }
            // Floating kanji parallax
            if (kanjiARef.current) {
                kanjiARef.current.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
            }
            if (kanjiBRef.current) {
                kanjiBRef.current.style.transform = `translate(${x * -0.3}px, ${y * -0.3}px)`;
            }
            // Hero bg parallax (scroll only — no recalc per mousemove)
            if (heroBgRef.current) {
                heroBgRef.current.style.transform = `scale(${1 + sy * 0.0005}) translateY(${sy * 0.5}px)`;
            }
            // CTA bg parallax
            if (ctaBgRef.current) {
                ctaBgRef.current.style.transform = `translateY(${sy * 0.3}px) scale(1.1)`;
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("scroll",    onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("scroll",    onScroll);
        };
    }, []);

    // ── Per-section visibility refs ───────────────────────────────────────
    const [storyRef,   storyInView]   = useInView();
    const [journeyRef, journeyInView] = useInView();
    const [philRef,    philInView]    = useInView();
    const [valuesRef,  valuesInView]  = useInView();
    const [founderRef, founderInView] = useInView();

    return (
        <div className="bg-charcoal min-h-screen selection:bg-clay selection:text-charcoal relative overflow-hidden">

            {/* Cursor glow — position driven by RAF, no React state */}
            <div
                ref={cursorRef}
                className="fixed w-96 h-96 rounded-full pointer-events-none z-50 mix-blend-screen opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(188,143,107,0.4) 0%, transparent 70%)",
                    top: 0, left: 0,
                    willChange: "transform",
                }}
            />

            <Header />

            <main className="relative">
                {/* ── HERO ────────────────────────────────────────────────── */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <div
                            ref={heroBgRef}
                            className="absolute inset-0 bg-cover bg-center will-change-transform"
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2574&auto=format&fit=crop")' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/50 to-charcoal" />
                    </div>

                    {/* Floating Kanji — no React state, moved by RAF */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div ref={kanjiARef} className="absolute text-[20rem] font-serif text-clay/5 select-none will-change-transform" style={{ top: "10%", left: "5%" }}>芭</div>
                        <div ref={kanjiBRef} className="absolute text-[15rem] font-serif text-clay/5 select-none will-change-transform" style={{ bottom: "15%", right: "10%" }}>蕉</div>
                    </div>

                    {/* Hero Content — CSS animation, no IntersectionObserver needed */}
                    <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                        <div className="mb-8 opacity-0 about-fade-in" style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}>
                            <span className="inline-block text-clay text-xs font-bold uppercase tracking-[0.4em] mb-4">Est. 2019</span>
                            <div className="w-24 h-[1px] bg-clay/50 mx-auto" />
                        </div>

                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-rice-paper mb-8 leading-[0.9]">
                            <span className="block opacity-0 about-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>Basho</span>
                            <span className="block text-5xl md:text-6xl lg:text-7xl text-clay/80 italic mt-4 opacity-0 about-fade-in" style={{ animationDelay: "0.18s", animationFillMode: "forwards" }}>by Shivangi</span>
                        </h1>

                        <p className="text-stone-warm text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 opacity-0 about-fade-in font-light" style={{ animationDelay: "0.26s", animationFillMode: "forwards" }}>
                            Where ancient Japanese philosophy meets contemporary craft. Each piece a meditation, each curve a poem, each glaze a prayer to imperfection.
                        </p>

                        <div className="flex gap-6 justify-center items-center opacity-0 about-fade-in" style={{ animationDelay: "0.34s", animationFillMode: "forwards" }}>
                            <a href="#story" className="group px-8 py-4 bg-clay text-charcoal uppercase tracking-widest text-sm font-bold hover:bg-clay/90 transition-all duration-150 relative overflow-hidden">
                                <span className="relative z-10">Our Story</span>
                                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                            </a>
                            <a href="/workshops" className="group px-8 py-4 border-2 border-clay text-rice-paper uppercase tracking-widest text-sm font-bold hover:bg-clay hover:text-charcoal transition-all duration-150">
                                Workshops
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── STORY ───────────────────────────────────────────────── */}
                <section id="story" className="py-32 relative overflow-hidden">
                    {/* Lightweight static glow — no animation, no GPU repaint */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-clay/4 rounded-full blur-[80px] pointer-events-none" />

                    <div ref={storyRef} className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            {/* Image Collage */}
                            <div className="relative h-[700px]">
                                {/* Main image */}
                                <div
                                    className="absolute top-0 left-0 w-[70%] h-[60%] overflow-hidden group"
                                    style={{
                                        transform:  storyInView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
                                        opacity:    storyInView ? 1 : 0,
                                        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease",
                                    }}
                                >
                                    <Image
                                        src="https://images.unsplash.com/photo-1505567745926-ba89000d255a?q=80&w=2671&auto=format&fit=crop"
                                        alt="Shivangi at work"
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-200 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 35vw"
                                    />
                                    <div className="absolute inset-0 border-4 border-clay/0 group-hover:border-clay/30 transition-all duration-150" />
                                </div>

                                {/* Secondary image */}
                                <div
                                    className="absolute bottom-0 right-0 w-[65%] h-[55%] overflow-hidden group"
                                    style={{
                                        transform:  storyInView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
                                        opacity:    storyInView ? 1 : 0,
                                        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1) 0.08s, opacity 0.4s ease 0.08s",
                                    }}
                                >
                                    <Image
                                        src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2670&auto=format&fit=crop"
                                        alt="Pottery detail"
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-200 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 30vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                                </div>

                                {/* Quote card */}
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-charcoal/95 backdrop-blur-sm p-8 max-w-sm border border-clay/30 shadow-2xl"
                                    style={{
                                        transform:  storyInView ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(0.88)",
                                        opacity:    storyInView ? 1 : 0,
                                        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1) 0.16s, opacity 0.4s ease 0.16s",
                                    }}
                                >
                                    <p className="font-serif italic text-rice-paper text-xl leading-relaxed mb-4">
                                        "An old silent pond... A frog jumps into the pond— Splash! Silence again."
                                    </p>
                                    <span className="text-clay text-xs tracking-widest">— MATSUO BASHŌ</span>
                                </div>
                            </div>

                            {/* Story text */}
                            <div className="space-y-8">
                                <div>
                                    <span className="text-clay text-xs font-bold uppercase tracking-[0.3em]">The Beginning</span>
                                    <h2 className="font-serif text-5xl md:text-6xl text-rice-paper mt-4 mb-6 leading-tight">
                                        Born from <br /><span className="text-clay italic">Stillness</span>
                                    </h2>
                                </div>
                                <div className="space-y-6 text-stone-warm text-lg leading-relaxed">
                                    <p>In 2019, amidst the chaos of modern life, Shivangi found herself at a crossroads. The digital world had become suffocating, and she yearned for something <span className="text-rice-paper italic">tangible, real, honest</span>.</p>
                                    <p>A pottery wheel became her portal to presence. As clay spun beneath her hands, time dissolved. She discovered what the Japanese call <span className="text-clay font-serif italic">mushin</span>—a state of no-mind, where creation flows without thought.</p>
                                    <p>Inspired by the haiku master Matsuo Bashō, who found profound beauty in simplicity, she began crafting pieces that honored imperfection. Every crack tells a story. Every asymmetry holds intention. Every piece invites you to slow down and <span className="text-rice-paper italic">just be</span>.</p>
                                    <p className="text-xl text-clay/80 font-serif italic">This is not just pottery. This is philosophy you can hold in your hands.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── JOURNEY TIMELINE ────────────────────────────────────── */}
                <section className="py-32 bg-charcoal-light relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
                        <div ref={journeyRef} className="text-center mb-20">
                            <h2 className={`font-serif text-5xl text-rice-paper mb-4 transition-all duration-300 ${journeyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>The Journey</h2>
                            <p  className={`text-stone-warm text-lg transition-all duration-300 ${journeyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "60ms" }}>From spark to flame, from dream to reality</p>
                        </div>

                        <div className="space-y-32">
                            {journey.map((item, index) => (
                                <JourneyItem key={index} item={item} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PHILOSOPHY CARDS ────────────────────────────────────── */}
                <section id="philosophy" className="py-32 relative overflow-hidden">
                    <div ref={philRef} className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
                        <div className="text-center mb-20">
                            <span className={`text-clay text-xs font-bold uppercase tracking-[0.3em] mb-4 block transition-all duration-300 ${philInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>Japanese Aesthetics</span>
                            <h2 className={`font-serif text-5xl text-rice-paper mb-6 transition-all duration-300 ${philInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "60ms" }}>Our Guiding Principles</h2>
                            <p className={`text-stone-warm text-lg max-w-2xl mx-auto transition-all duration-300 ${philInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "100ms" }}>Four pillars of beauty that shape every piece we create</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {principles.map((item, index) => (
                                <div
                                    key={index}
                                    className="group relative"
                                    style={{
                                        transform:  philInView ? "translateY(0)" : "translateY(40px)",
                                        opacity:    philInView ? 1 : 0,
                                        transition: `transform 0.35s cubic-bezier(0.22,1,0.36,1) ${index * 0.06}s, opacity 0.3s ease ${index * 0.06}s`,
                                    }}
                                >
                                    <div className="relative h-full p-8 bg-charcoal-light border border-white/5 group-hover:border-clay/30 transition-all duration-150 overflow-hidden">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
                                        <div className="absolute top-4 right-4 text-8xl font-serif text-white/5 group-hover:text-clay/10 transition-all duration-200 group-hover:scale-110">
                                            {item.kanji}
                                        </div>
                                        <div className="relative z-10">
                                            <span className="block text-6xl text-clay/20 font-serif mb-6 group-hover:text-clay/40 transition-colors duration-150">
                                                0{index + 1}
                                            </span>
                                            <h3 className="text-2xl text-rice-paper font-serif mb-4 group-hover:text-clay transition-colors duration-150">{item.title}</h3>
                                            <p className="text-stone-warm leading-relaxed">{item.desc}</p>
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-clay group-hover:w-full transition-all duration-200" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PROCESS & CRAFT ─────────────────────────────────────── */}
                <section className="py-32 bg-charcoal relative overflow-hidden" id="values">
                    {/* Lightweight decorative rings — pure CSS, no JS, no blur */}
                    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                        <div className="absolute top-20 left-10 w-64 h-64 border border-clay rounded-full about-spin-slow" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 border border-clay/30 rounded-full about-spin-slower" />
                    </div>

                    <div ref={valuesRef} className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 relative z-10">
                        <div className="text-center mb-20">
                            <span className={`text-clay text-xs font-bold uppercase tracking-[0.3em] mb-4 block transition-all duration-300 ${valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>The Making</span>
                            <h2 className={`font-serif text-5xl text-rice-paper mb-6 transition-all duration-300 ${valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "60ms" }}>From Earth to Art</h2>
                            <p className={`text-stone-warm text-lg max-w-2xl mx-auto transition-all duration-300 ${valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "100ms" }}>Every piece begins as formless clay and transforms through fire, time, and intention</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                            {craftSteps.map((item, i) => (
                                <div
                                    key={i}
                                    className="group relative"
                                    style={{
                                        transform:  valuesInView ? "translateX(0)" : `translateX(${i % 2 === 0 ? "-40px" : "40px"})`,
                                        opacity:    valuesInView ? 1 : 0,
                                        transition: `transform 0.35s ease ${i * 0.07}s, opacity 0.3s ease ${i * 0.07}s`,
                                    }}
                                >
                                    <div className="text-7xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity duration-150">{item.icon}</div>
                                    <h3 className="text-3xl text-rice-paper font-serif mb-4 group-hover:text-clay transition-colors duration-150">{item.title}</h3>
                                    <p className="text-stone-warm text-lg leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FOUNDER NOTE ────────────────────────────────────────── */}
                <section className="py-32 bg-charcoal relative overflow-hidden" id="founder">
                    {/* Static ambient glow — no animation */}
                    <div className="absolute top-1/2 left-0 w-1/3 h-96 bg-clay/4 rounded-full blur-[80px] pointer-events-none" />
                    <div className="absolute bottom-1/2 right-0 w-1/4 h-80 bg-clay/3 rounded-full blur-[60px] pointer-events-none" />

                    <div ref={founderRef} className="max-w-5xl mx-auto px-4 md:px-12 lg:px-24 text-center relative z-10">
                        <div className={`mb-12 transition-all duration-300 ${founderInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                            <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-clay/30 relative">
                                <Image
                                    src="https://res.cloudinary.com/dwbk3bwng/image/upload/v1768672086/WhatsApp_Image_2026-01-17_at_11.17.35_PM_ew6w53.jpg"
                                    alt="Shivangi"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-150"
                                    sizes="128px"
                                />
                            </div>
                            <h2 className="font-serif text-5xl text-rice-paper mb-4">A Note from Shivangi</h2>
                            <span className="text-clay text-sm tracking-widest">FOUNDER &amp; ARTIST</span>
                        </div>

                        <div className={`space-y-6 text-stone-warm text-xl leading-relaxed max-w-3xl mx-auto transition-all duration-300 ${founderInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "80ms" }}>
                            <p className="font-serif italic text-2xl text-rice-paper">"I don't make pottery. I facilitate conversations between earth, fire, water, and human hands."</p>
                            <p>My vision for Basho is simple yet radical: to create objects that slow you down. In our fast, disposable culture, I want to craft pieces so beautiful, so intentional, that you pause. You notice. You feel.</p>
                            <p>Every crack in a Basho piece is a reminder that perfection is an illusion. Every asymmetry tells you it's okay to be human. Every glaze variation whispers: embrace the unexpected.</p>
                            <p className="text-clay text-lg">This is more than a brand. This is a movement toward presence, toward appreciation, toward finding infinity in a single cup of tea.</p>
                        </div>
                    </div>
                </section>

                {/* ── CTA ─────────────────────────────────────────────────── */}
                <section className="relative h-screen flex items-center justify-center overflow-hidden">
                    <div
                        ref={ctaBgRef}
                        className="absolute inset-0 bg-cover bg-center will-change-transform"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=2605&auto=format&fit=crop")' }}
                    />
                    <div className="absolute inset-0 bg-charcoal/70" />
                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                        <p className="font-serif italic text-3xl md:text-5xl text-rice-paper leading-relaxed mb-12">
                            "Do not seek to follow in the footsteps of the wise. Seek what they sought."
                        </p>
                        <span className="block text-clay text-sm tracking-widest mb-12">— MATSUO BASHŌ</span>
                        <div className="flex gap-6 justify-center flex-wrap">
                            <a href="/workshops" className="group px-10 py-5 bg-clay text-charcoal uppercase tracking-widest text-sm font-bold hover:bg-clay/90 transition-all duration-150 relative overflow-hidden">
                                <span className="relative z-10">Join a Workshop</span>
                                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                            </a>
                            <a href="/shop" className="px-10 py-5 border-2 border-rice-paper text-rice-paper uppercase tracking-widest text-sm font-bold hover:bg-rice-paper hover:text-charcoal transition-all duration-150">
                                View Collection
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Keyframes — standard <style> tag (no jsx prop needed in App Router) */}
            <style>{`
                @keyframes about-fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .about-fade-in {
                    animation: about-fade-in-up 0.35s ease-out;
                }
                @keyframes about-spin-slow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes about-spin-slower {
                    from { transform: rotate(360deg); }
                    to   { transform: rotate(0deg); }
                }
                .about-spin-slow    { animation: about-spin-slow   40s linear infinite; }
                .about-spin-slower  { animation: about-spin-slower  60s linear infinite; }
            `}</style>
        </div>
    );
}