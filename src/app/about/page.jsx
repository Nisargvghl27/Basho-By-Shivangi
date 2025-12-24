
"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutPage() {
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState({});
    const observerRef = useRef(null);

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

        // Intersection Observer for scroll animations
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

    const principles = [
        {
            title: "Wabi-Sabi",
            desc: "Finding beauty in imperfection, impermanence, and incompleteness.",
            kanji: "侘寂",
            color: "from-amber-500/20 to-orange-500/20"
        },
        {
            title: "Ma",
            desc: "The void between, negative space that gives meaning to form.",
            kanji: "間",
            color: "from-stone-500/20 to-zinc-500/20"
        },
        {
            title: "Kanso",
            desc: "Simplicity achieved through elimination of the non-essential.",
            kanji: "簡素",
            color: "from-clay/20 to-amber-600/20"
        },
        {
            title: "Shizen",
            desc: "Naturalness without pretense or artificiality.",
            kanji: "自然",
            color: "from-emerald-500/20 to-teal-500/20"
        },
    ];

    const journey = [
        {
            year: "2019",
            title: "The Awakening",
            desc: "Shivangi discovered the wheel during a solo retreat in Rishikesh. What began as therapy became destiny.",
            image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2670"
        },
        {
            year: "2020",
            title: "The Study",
            desc: "Months spent mastering Japanese pottery techniques, studying under ceramic masters, embracing failure.",
            image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2574"
        },
        {
            year: "2021",
            title: "The Birth",
            desc: "Basho was born—named after the poet who found infinity in a single haiku. The first collection sold out in hours.",
            image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2670"
        },
        {
            year: "2024",
            title: "The Movement",
            desc: "Today, Basho creates not just pottery, but experiences—workshops, collaborations, and a community of mindful makers.",
            image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2574"
        }
    ];

    return (
        <div className="bg-charcoal min-h-screen selection:bg-clay selection:text-charcoal relative overflow-hidden">
            {/* Ambient Cursor Glow */}
            <div
                className="fixed w-96 h-96 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out mix-blend-screen opacity-20"
                style={{
                    background: `radial-gradient(circle, rgba(188, 143, 107, 0.4) 0%, transparent 70%)`,
                    left: `${mousePosition.x * 2}px`,
                    top: `${mousePosition.y * 2}px`,
                    transform: 'translate(-50%, -50%)',
                }}
            />

            <Header />

            <main className="relative">
                {/* --- HERO SECTION WITH FULL VISUAL --- */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                    {/* Video/Image Background */}
                    <div className="absolute inset-0">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: 'url("https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2574&auto=format&fit=crop")',
                                transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.5}px)`,
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/50 to-charcoal" />

                        {/* Animated Grain Texture */}
                        <div
                            className="absolute inset-0 opacity-20 mix-blend-overlay"
                            style={{
                                backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")',
                                backgroundSize: '150px',
                                animation: 'grain 8s steps(10) infinite'
                            }}
                        />
                    </div>

                    {/* Floating Kanji */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div
                            className="absolute text-[20rem] font-serif text-clay/5 select-none"
                            style={{
                                top: '10%',
                                left: '5%',
                                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                                transition: 'transform 0.3s ease-out'
                            }}
                        >
                            芭
                        </div>
                        <div
                            className="absolute text-[15rem] font-serif text-clay/5 select-none"
                            style={{
                                bottom: '15%',
                                right: '10%',
                                transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
                                transition: 'transform 0.3s ease-out'
                            }}
                        >
                            蕉
                        </div>
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                        <div
                            className="mb-8 opacity-0 animate-fade-in-up"
                            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
                        >
                            <span className="inline-block text-clay text-xs font-bold uppercase tracking-[0.4em] mb-4">
                                Est. 2019
                            </span>
                            <div className="w-24 h-[1px] bg-clay/50 mx-auto" />
                        </div>

                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-rice-paper mb-8 leading-[0.9]">
                            <span
                                className="block opacity-0 animate-fade-in-up"
                                style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
                            >
                                Basho
                            </span>
                            <span
                                className="block text-5xl md:text-6xl lg:text-7xl text-clay/80 italic mt-4 opacity-0 animate-fade-in-up"
                                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                            >
                                by Shivangi
                            </span>
                        </h1>

                        <p
                            className="text-stone-warm text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 opacity-0 animate-fade-in-up font-light"
                            style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
                        >
                            Where ancient Japanese philosophy meets contemporary craft. Each piece a meditation, each curve a poem, each glaze a prayer to imperfection.
                        </p>

                        <div
                            className="flex gap-6 justify-center items-center opacity-0 animate-fade-in-up"
                            style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
                        >
                            <a
                                href="#story"
                                className="group px-8 py-4 bg-clay text-charcoal uppercase tracking-widest text-sm font-bold hover:bg-clay/90 transition-all duration-300 relative overflow-hidden"
                            >
                                <span className="relative z-10">Our Story</span>
                                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </a>
                            <a
                                href="/workshops"
                                className="group px-8 py-4 border-2 border-clay text-rice-paper uppercase tracking-widest text-sm font-bold hover:bg-clay hover:text-charcoal transition-all duration-300"
                            >
                                Workshops
                            </a>
                        </div>

                        {/* Scroll Indicator */}
                        <div
                            className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up"
                            style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
                        >
                            <div className="flex flex-col items-center gap-2 text-stone-warm/60 text-xs uppercase tracking-widest">
                                <span>Scroll</span>
                                <div className="w-[1px] h-16 bg-gradient-to-b from-clay to-transparent animate-pulse" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- STORY SECTION --- */}
                <section id="story" className="py-32 relative overflow-hidden" data-animate>
                    {/* Background Effects */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-clay/5 rounded-full blur-[120px] animate-pulse-slow" />

                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                            {/* Image Collage */}
                            <div className="relative h-[700px]">
                                {/* Main Image */}
                                <div
                                    className="absolute top-0 left-0 w-[70%] h-[60%] overflow-hidden group"
                                    style={{
                                        transform: isVisible['story'] ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                                        opacity: isVisible['story'] ? 1 : 0,
                                        transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                    }}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1505567745926-ba89000d255a?q=80&w=2671&auto=format&fit=crop"
                                        alt="Shivangi at work"
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 border-4 border-clay/0 group-hover:border-clay/30 transition-all duration-700" />
                                </div>

                                {/* Secondary Image */}
                                <div
                                    className="absolute bottom-0 right-0 w-[65%] h-[55%] overflow-hidden group"
                                    style={{
                                        transform: isVisible['story'] ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                                        opacity: isVisible['story'] ? 1 : 0,
                                        transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
                                    }}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2670&auto=format&fit=crop"
                                        alt="Pottery detail"
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                                </div>

                                {/* Floating Quote Card */}
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-charcoal/95 backdrop-blur-sm p-8 max-w-sm border border-clay/30 shadow-2xl"
                                    style={{
                                        transform: isVisible['story'] ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.8)',
                                        opacity: isVisible['story'] ? 1 : 0,
                                        transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s'
                                    }}
                                >
                                    <p className="font-serif italic text-rice-paper text-xl leading-relaxed mb-4">
                                        "An old silent pond... A frog jumps into the pond— Splash! Silence again."
                                    </p>
                                    <span className="text-clay text-xs tracking-widest">— MATSUO BASHŌ</span>
                                </div>
                            </div>

                            {/* Story Content */}
                            <div className="space-y-8">
                                <div>
                                    <span className="text-clay text-xs font-bold uppercase tracking-[0.3em]">The Beginning</span>
                                    <h2 className="font-serif text-5xl md:text-6xl text-rice-paper mt-4 mb-6 leading-tight">
                                        Born from <br />
                                        <span className="text-clay italic">Stillness</span>
                                    </h2>
                                </div>

                                <div className="space-y-6 text-stone-warm text-lg leading-relaxed">
                                    <p>
                                        In 2019, amidst the chaos of modern life, Shivangi found herself at a crossroads. The digital world had become suffocating, and she yearned for something <span className="text-rice-paper italic">tangible, real, honest</span>.
                                    </p>
                                    <p>
                                        A pottery wheel became her portal to presence. As clay spun beneath her hands, time dissolved. She discovered what the Japanese call <span className="text-clay font-serif italic">mushin</span>—a state of no-mind, where creation flows without thought.
                                    </p>
                                    <p>
                                        Inspired by the haiku master Matsuo Bashō, who found profound beauty in simplicity, she began crafting pieces that honored imperfection. Every crack tells a story. Every asymmetry holds intention. Every piece invites you to slow down and <span className="text-rice-paper italic">just be</span>.
                                    </p>
                                    <p className="text-xl text-clay/80 font-serif italic">
                                        This is not just pottery. This is philosophy you can hold in your hands.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- JOURNEY TIMELINE --- */}
                <section className="py-32 bg-charcoal-light relative overflow-hidden" data-animate>
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="text-center mb-20">
                            <h2 className="font-serif text-5xl text-rice-paper mb-4">The Journey</h2>
                            <p className="text-stone-warm text-lg">From spark to flame, from dream to reality</p>
                        </div>

                        <div className="space-y-32">
                            {journey.map((item, index) => (
                                <div
                                    key={index}
                                    id={`journey-${index}`}
                                    data-animate
                                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                                >
                                    {/* Image */}
                                    <div
                                        className={`relative h-[500px] overflow-hidden group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                                        style={{
                                            transform: isVisible[`journey-${index}`] ? 'translateX(0)' : `translateX(${index % 2 === 0 ? '-100px' : '100px'})`,
                                            opacity: isVisible[`journey-${index}`] ? 1 : 0,
                                            transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                        }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />

                                        {/* Year Badge */}
                                        <div className="absolute top-8 left-8 bg-clay text-charcoal font-bold text-3xl px-8 py-4 font-serif">
                                            {item.year}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div
                                        className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                                        style={{
                                            transform: isVisible[`journey-${index}`] ? 'translateX(0)' : `translateX(${index % 2 === 0 ? '100px' : '-100px'})`,
                                            opacity: isVisible[`journey-${index}`] ? 1 : 0,
                                            transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
                                        }}
                                    >
                                        <h3 className="font-serif text-4xl text-rice-paper mb-6">{item.title}</h3>
                                        <p className="text-stone-warm text-xl leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- PHILOSOPHY CARDS --- */}
                <section id="philosophy" className="py-32 relative overflow-hidden" data-animate>
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="text-center mb-20">
                            <span className="text-clay text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Japanese Aesthetics</span>
                            <h2 className="font-serif text-5xl text-rice-paper mb-6">Our Guiding Principles</h2>
                            <p className="text-stone-warm text-lg max-w-2xl mx-auto">
                                Four pillars of beauty that shape every piece we create
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {principles.map((item, index) => (
                                <div
                                    key={index}
                                    className="group relative"
                                    style={{
                                        transform: isVisible['philosophy'] ? 'translateY(0)' : 'translateY(50px)',
                                        opacity: isVisible['philosophy'] ? 1 : 0,
                                        transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                                    }}
                                >
                                    {/* Card */}
                                    <div className="relative h-full p-8 bg-charcoal-light border border-white/5 group-hover:border-clay/30 transition-all duration-500 overflow-hidden">
                                        {/* Background Gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                        {/* Kanji Background */}
                                        <div className="absolute top-4 right-4 text-8xl font-serif text-white/5 group-hover:text-clay/10 transition-all duration-700 group-hover:scale-110">
                                            {item.kanji}
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10">
                                            <span className="block text-6xl text-clay/20 font-serif mb-6 group-hover:text-clay/40 transition-colors duration-500">
                                                0{index + 1}
                                            </span>
                                            <h3 className="text-2xl text-rice-paper font-serif mb-4 group-hover:text-clay transition-colors duration-500">
                                                {item.title}
                                            </h3>
                                            <p className="text-stone-warm leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>

                                        {/* Bottom Line Animation */}
                                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-clay group-hover:w-full transition-all duration-700" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- PROCESS & CRAFT SECTION --- */}
                <section className="py-32 bg-charcoal relative overflow-hidden" data-animate id="values">

                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden opacity-10">
                        <div className="absolute top-20 left-10 w-64 h-64 border border-clay rounded-full animate-spin-slow" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 border border-clay/30 rounded-full animate-spin-slower" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="text-center mb-20">
                            <span className="text-clay text-xs font-bold uppercase tracking-[0.3em] mb-4 block">The Making</span>
                            <h2 className="font-serif text-5xl text-rice-paper mb-6">From Earth to Art</h2>
                            <p className="text-stone-warm text-lg max-w-2xl mx-auto">
                                Every piece begins as formless clay and transforms through fire, time, and intention
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                            {[
                                {
                                    step: "01",
                                    title: "Centering",
                                    desc: "The clay meets the wheel. Through patient touch and breath, chaos becomes possibility. This is meditation in motion.",
                                    icon: "🌀"
                                },
                                {
                                    step: "02",
                                    title: "Shaping",
                                    desc: "Walls rise slowly. Each curve holds intention. We embrace asymmetry, for perfection is found in the perfectly imperfect.",
                                    icon: "🏺"
                                },
                                {
                                    step: "03",
                                    title: "Firing",
                                    desc: "Into the kiln at 1200°C. Fire transforms. What emerges is never quite what was expected—and that's the beauty.",
                                    icon: "🔥"
                                }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="group relative"
                                    style={{
                                        transform: isVisible['values'] ? 'translateX(0)' : `translateX(${i % 2 === 0 ? '-50px' : '50px'})`,
                                        opacity: isVisible['values'] ? 1 : 0,
                                        transition: `all 1s ease-out ${i * 0.15}s`
                                    }}
                                >
                                    <div className="text-7xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-3xl text-rice-paper font-serif mb-4 group-hover:text-clay transition-colors duration-500">
                                        {item.title}
                                    </h3>
                                    <p className="text-stone-warm text-lg leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>

                {/* --- FOUNDER VISION SECTION --- */}
                <section className="py-32 bg-charcoal relative overflow-hidden" data-animate id="founder">
                    <div className="absolute top-1/2 left-0 w-1/3 h-96 bg-clay/5 rounded-full blur-[150px]" />

                    <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
                        <div className="mb-12">
                            <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-clay/30">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
                                    alt="Shivangi"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <h2 className="font-serif text-5xl text-rice-paper mb-4">A Note from Shivangi</h2>
                            <span className="text-clay text-sm tracking-widest">FOUNDER & ARTIST</span>
                        </div>

                        <div className="space-y-6 text-stone-warm text-xl leading-relaxed max-w-3xl mx-auto">
                            <p className="font-serif italic text-2xl text-rice-paper">
                                "I don't make pottery. I facilitate conversations between earth, fire, water, and human hands."
                            </p>
                            <p>
                                My vision for Basho is simple yet radical: to create objects that slow you down. In our fast, disposable culture, I want to craft pieces so beautiful, so intentional, that you pause. You notice. You feel.
                            </p>
                            <p>
                                Every crack in a Basho piece is a reminder that perfection is an illusion. Every asymmetry tells you it's okay to be human. Every glaze variation whispers: embrace the unexpected.
                            </p>
                            <p className="text-clay text-lg">
                                This is more than a brand. This is a movement toward presence, toward appreciation, toward finding infinity in a single cup of tea.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- CTA SECTION --- */}
                <section className="relative h-screen flex items-center justify-center overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url("https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=2605&auto=format&fit=crop")',
                            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
                        }}
                    />
                    <div className="absolute inset-0 bg-charcoal/70" />

                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                        <p className="font-serif italic text-3xl md:text-5xl text-rice-paper leading-relaxed mb-12">
                            "Do not seek to follow in the footsteps of the wise. Seek what they sought."
                        </p>
                        <span className="block text-clay text-sm tracking-widest mb-12">— MATSUO BASHŌ</span>

                        <div className="flex gap-6 justify-center flex-wrap">
                            <a
                                href="/workshops"
                                className="group px-10 py-5 bg-clay text-charcoal uppercase tracking-widest text-sm font-bold hover:bg-clay/90 transition-all duration-300 relative overflow-hidden"
                            >
                                <span className="relative z-10">Join a Workshop</span>
                                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </a>
                            <a
                                href="/collection"
                                className="px-10 py-5 border-2 border-rice-paper text-rice-paper uppercase tracking-widest text-sm font-bold hover:bg-rice-paper hover:text-charcoal transition-all duration-300"
                            >
                                View Collection
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slower {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
            opacity: 0;
          }
          50% { 
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 60s linear infinite;
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
        </div>
    );
}