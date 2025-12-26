"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Icons
import {
  MapPin, Calendar, Mail, Globe, Store, Eye,
  Play, CalendarDays
} from "lucide-react";

// Images (Relative Imports)
import heroStudio from "../../assets/hero-studio.jpg";

export default function WorkshopsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);
  const heroRef = useRef(null);

  // Intersection Observer for Reveal Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      date: "Oct 12–14",
      type: "Symposium",
      typeIcon: Globe,
      title: "Tokyo Clay Symposium",
      description: "Join us for a three-day intensive symposium featuring master potters from across Japan.",
      location: "Shibuya, Tokyo",
      price: "Starting from ¥5,000",
      cta: "RSVP Now",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGRDd2nVe_IK-X51MgSOQROGEsK-Tvu2nKjgJ1CDnoiEakSHS4Z4H0boJ7fvJCeYqeno3SmEh_pfm8YKvJfX3DCR3xeCKdz2Ck26KrdCLzKjj5Iwc3smvqRBr5JXDJYNSySfZk0LuHsIa9U-cjkmeWmu4RDvJcx3nX0iqGTetE4mInz85x3MbRm2-xl0j5xfovmOzMjtTngUIUmRrh3f3nJCuHwfPgIOX3-1XYPNAEluhpPw3_CzR1y5dkyBlvr96E3KLBKpoiTdw",
    },
    {
      id: 2,
      date: "Nov 05–07",
      type: "Pop-up Store",
      typeIcon: Store,
      title: "London Craft Week Pop-up",
      description: "Experience our latest autumn collection in the heart of Shoreditch.",
      location: "Shoreditch, London",
      price: "Free Entry",
      cta: "Get Tickets",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE-0ymO2eTNzS2XpsmEaFmWVRgbUA5gjE8XoiSbySE7ZwchsK0nLaike6BUzuL2YekTsqTzb7Df2UEaObRSa34jATVXmFlhe7DqVZiuwvNvboQ-MXkGwWNiJPsvrAKjcfrqBu9XFgoiZ4kVL6fL_XYkw48M1kg3RVlYwiGgosc-0udRNMEdHownl5YoKz0JwhYUz_wAqNLLuMKbsorm7CFLOmATYs3wzxU8nFM1lK-OiB-KywB_Nus4v1L8knBwlD6KMq4L-PqKp8",
    },
  ];

  const archiveEntries = [
    {
      title: "Kyoto Spring Collection",
      date: "April 2023",
      description: "Launched our Sakura-inspired glaze series in a historic Machiya townhouse.",
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAzSvikLZRIXWTRdnQ9Rn-58k2LnpphGeX9cchpf5DjSB6yLjG5v8vuzL3wEOBPejHhw3eHBCehScoGvUY41MLyUigA9g1ttBOsLgScuK-wsThP58qdQGP7p9u6ijv7WlrG5pVuhhCt-LbGZmeSrNKxXSVFta5Zcud_uc6x9V7X-PGoEtDLcAkxO6ORbqzNoeCDmYNMbYMZ3p5bQaDXjH3bKhf-SwCIu4ToBSZYo9m9MqNZfXE0zM9scWrrfQSb49t6Mjh7bR9ONcg",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBfymnDh9A5-5_bF1ILClRoT87zywTV23RroY9fKLtpcX914MYN20rjW06n7uJtCQrlTk0FapNxr-Muna_Xf3V20F8_4WgHarxEdPu1YnZY80PBlQbsjRFKvU5IXqocB42vc5gV_5XLc4hhPksVYJJOJEJPmJ7p58Udoj7rTh64CB1gVSM2kJSfjYjRbs_-TOV_txOMuXRLkWXOm2UGaanEWto_jGp2d16du_6OKyqNDhG-pKHsoHlBPyz8jC5o7QhoEjs43mn7Bic",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDdXPnxHqZe5o8e1QGYvSlFCXvCXHHOOE56vAQzkeWzLQiyuWN6s9oZqEHG6PFWJw0yrAgYwJxrgJ9fiIu45oQUuwEhiseZ1zcJgA6VRUBB0lb0tmsE_TVmMyPpDRFCrjuXfSDvMt-F63QIr1NiuwUNBndZLkNC-_31H0FUOq3-dfHC5AGSeMGYYhVKVnqYwa-cGicLN4trl74TxlxgcM6IhF0PXoKr86ETiZalj_AolQBctrFV9cym2RWCQNx5032WEqzIczwTV4c"
      ],
      layout: "grid"
    },
    {
      title: "NYC Maker's Market",
      date: "December 2022",
      description: "Our first international showcase at the Brooklyn Expo Center.",
      images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuA4J3UELqpUYtJu1G2ygUpA4hfVLy5-nx4Alz2DWTdhT3FdBp5ibJ1cRXXfseimmQhj6UB9vQke5Pq2_eMREnCFGfqnSs2fwieeWtnK_LiQLItC3xmrSBFuBspZJ28vGIWKAxpmifwhZRfau384KWy8C3cBnXSXJx19PCc5U432lm7R3jrLWB_qTBLHrEWzFQYtic9AEb_PRf0IxDMUIYVri5Hgydy_qCoHqrYdRBXil9KZ6Xu1R4tn63InT_pMcNZLkYu-eNSMrvs"],
      layout: "wide"
    }
  ];

  const galleryImages = [
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC85uH5UKlidA-CtFkHDdAB2O0mO29nYa_27pHXwOSGbB9kkhZso92ITZnEsnF_G0rt344RxlqyGXwKBJtkMXgs2GBjLujP3NbunCfKUk82qYDb0q_lmJPtocU83tJRH5kQkSHEGFqo5g0yi4CMHLFto1xov5u_2QEiTvBwivouVlkyGjWYPJe43IM1QmP0oE5gvgCNPEJSFK0EtjBbSCytt1GCfzkKP89H9aF2-DVhd94Ap5WxDBRDvOI9uDw1LmmAmhmhDvzXcag", alt: "Pottery tools" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRVF8jPYdqvWZX-CrRyjvORZhgO--VlHwCuKV4bN9YSjvGQzenAhNOXQlgNHc0191nS6fwoxAAmdTBHdaFLBbI-V5HLQkNuxUYAX6W_gaaSE7CKgORY7A5OISrf4zfm7Ru4T_hMhYk6ItIbEiNaDx9S742E6Gpxyv3b4coZmVf4dA5CRDI8qF00hISaX3DXJrjCC_uZhsdR2vVT9_k60aCfPwaq3HIKJzz8k4AiOUAZTXj6kOZfrCP9pvbWu7Tm_Xy2EoukRGPEVY", alt: "Ceramic vase" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlHv1UTUijn4z3S5KIhiliHlLIhzyF-XEIg17J8dArjgAGXLUKjaGeJLIqwQvJSc5VGU_87lcWPjUj8LjAA0Llbact158tvCwsVCUoKBxXz9J7Q23ZAJ-9RBHP9upQ3g8VdyhafaAIus9nq9n05Oir9kgZPaBtapw8y1GW6ZfFvaXnzdZFfQY48nsPWGRKclJDwllEKvFuwjyKDD33hzmd27McmLqGVgvZiCwLLLo2Q5fyfIT8BLIQwNXhieYdd0QooSt5Z7ATNYQ", alt: "Wheel throwing" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO4wzAQLQ_B4Pn_lCB0iGkPxKD6lHWg_bsv2UwbPdfmKNIn9T4_MC_A_C95xLhxkJTHu_nYly2HqQGq4fRJveGI_xiwds0jyTMSrgyBKxDJUNsHj_11SprlOD2FtHH1w43uVLd3gQS8fzItT6tVmn9KQbpnHKeWFAjVTCyTHVfnBZzniGrDA6Y8eONnIJWM3v3mTLE8x3jNATkBkCVxeixxd_N57yhjBR-oGXz6dy-ShlAi02pff89WfXb7eCscb9CHPUPQfshHxY", alt: "Ceramic mugs" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-ZJOKFjak54eJ3qs2Q5WXlv3J0Pf1S8F3aY26l4_DAgV1WLCFv6znk_Qsng2ObY15rPgjpO-f1Rr3vEIDv8bIj_Jux1LlWUTfxPWi_5Z8BzN0pDSHYU0_qIazOABz6MlSOthz6K1gM4g-HC8ooqxJUesOaubCg97xsgMh065UExJ2AZ7DTRhNbnGnvwcKWhj2b0xIkLr-mW82_rt_YI1YQWPEYfhHDyTFzMkLRWmv-pwv3XUnm9jB2osjbMnJY9p8WeRAamn9UaU", alt: "Gallery opening" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVoCn_McQ-7nzXqm19QCTpWVvkdC7yjfC2rzjtqV2KUeOO9miOX5TS15YSTJTIiHhDYXympmCphmuxZCdeLayjrxwQTm9AxmnMoh9wazeKuOmX-3lJDb_uog4VlDPFDpDJlYEJn756zLlCWc0dkO8RwLRrosgbhLGXM1FCbOKRwDLLxYqCDJmogUS08kZstXOiMPDNjzJlhJLn42AV82uPs-Ab6wA1MGp9vv_DAwhGOQ7mYXV4DNLN7jFOIC32jx7PsdVGk7SPUyk", alt: "Glaze texture" },
  ];

  const processVideos = [
    { title: "Centering the Clay", category: "Beginner Workshop", thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkfQSTSEh36B1Dql9Ovp2do_xzWdZLL9fMGeLAkcieSiX9IzdgZcIcfhlC3Jt1FqX8fy47b7gXbrmftvN0CD8sI3T-qirhzAtqys0o89Xnoxply0sz38oC67jXAJP66CsZa2oStWQ_EFY35RPPYJiU9hxMZR6Cryk4JumPPrWlBdZKnmAbWS5mE_BJsEOMSoaDJZz9sAne5cGMbT7-ElMJayZWzRYZdicXWauCnZOymi7ksYIzHoKd4A9m3V-3NaB4-jR5XZJfseY" },
    { title: "Trimming & Texturing", category: "Intermediate", thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_kBG6GQTk-1qYwJANSxcqg1Cio6s0i4fcyJSLoJbV4hvcN_xIbYYxApFtDt77__22rG-nJJ8vidxEcA7XVAJU8OAOM1ZIswWj3Hf82MSch4Jfs_2OYH18NTthyvheortV7lRbz9dLKSsVq0cCyd8J-rODwpY1Xyopqm_uPA2AqZAlr_9sXeobyhrJslWLKM1mkmosB5NmuTDxAjnDX0EwIEFyhvcqalVicySg3ChPayYicaw-6Y3aHLyapTmG56YLEwzIDuDEeU4" },
    { title: "Glazing Techniques", category: "Masterclass", thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX2t5wLx4f-r2u-8PQD9Q-prN2XQCtO-hZ1BNACkc9AQW-efE7fCb515xcuMh1zvLAfK0P3akT-6RU1Fh-13sX0rvOQSDEYb05iEmkgT8LQi_x4Hh7aK42kdU-0751lb0DUrL2dEXgcE28yNsYa7PCb_b2deSs1996MrROapUvO2QWlf0q3jamay-kB3JgV1wrk4LfU7oAUrCp_g33KcuiUFSlqE0A1EU47f5x1Zo1fmHoy0n7pjyZ-LBG9pTCjeqO9u90yC7WjFE" }
  ];

  return (
    <div className="relative min-h-screen bg-charcoal text-rice-paper flex flex-col overflow-hidden">
      <Header />

      <div className="fixed inset-0 opacity-[0.12] pointer-events-none z-0">
        <div
          className="absolute inset-0 animate-grain-shift"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
            backgroundSize: '200px 200px'
          }}
        />
      </div>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.5)), url(${heroStudio.src || heroStudio})`,
              transform: isVisible ? 'scale(1)' : 'scale(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-charcoal" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-12 lg:px-24 text-center">
          <div className={`mb-8 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
            <span className="inline-block text-clay text-xs font-bold uppercase tracking-[0.4em] mb-4">
              Basho On Tour
            </span>
            <div className="w-24 h-[1px] bg-clay/50 mx-auto mb-8" />
          </div>

          <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl text-rice-paper mb-8 leading-[0.9] transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`} style={{ transitionDelay: '200ms' }}>
            Workshops & Exhibitions
          </h1>

          <p className={`text-stone-warm text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 font-light transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`} style={{ transitionDelay: '400ms' }}>
            Experience handcrafted pottery through immersive workshops and exhibitions across the globe.
          </p>
        </div>
      </section>

      <main className="relative z-10 flex-grow">
        {/* UPCOMING EVENTS */}
        <section className="px-4 md:px-12 lg:px-24 py-16 md:py-24 relative">
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/20 to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto space-y-12 relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-serif font-light text-rice-paper transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Upcoming Events</h2>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>
            {upcomingEvents.map((event, index) => (
              <div key={event.id} className={`group flex flex-col md:flex-row gap-8 border border-border-subtle p-6 md:p-8 bg-charcoal-light transition-all duration-700 hover:border-clay/30 hover:bg-white/5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${200 * index}ms` }}>
                <div className="md:w-1/3 h-56 md:h-64 relative overflow-hidden bg-black/20 rounded-xl border border-white/5 group-hover:border-clay/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110" style={{ backgroundImage: `url(${event.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                    <Eye className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>
                <div className="flex-1 space-y-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-clay text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 bg-clay/10 border border-clay/20 rounded-full"><event.typeIcon size={14} /> {event.type}</div>
                      <span className="text-stone-warm text-[10px] uppercase tracking-widest font-medium">{event.date}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-light text-rice-paper mb-3 group-hover:text-clay transition-colors duration-500">{event.title}</h3>
                    <p className="text-stone-warm font-light leading-relaxed text-base">{event.description}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/5 group-hover:border-clay/20 transition-colors duration-500">
                    <span className="text-lg md:text-xl font-serif text-white group-hover:text-clay transition-colors duration-500">{event.price}</span>
                    <button className="flex items-center gap-2 bg-clay text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-clay/90 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl rounded-sm">
                      <Calendar size={14} /> {event.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ARCHIVE SECTION */}
        <section className="px-4 md:px-12 lg:px-24 py-24 md:py-32 border-t border-border-subtle bg-charcoal relative">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className={`lg:w-1/3 space-y-6 lg:sticky lg:top-48 h-fit transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-rice-paper">Archive</h2>
              <p className="text-stone-warm text-sm font-light">A curated history of our past exhibitions and community gatherings.</p>
              <div className="w-12 h-1 bg-clay/60"></div>
            </div>

            <div className="lg:w-2/3 relative border-l border-white/10 pl-8 lg:pl-12 space-y-20">
              {archiveEntries.map((item, idx) => (
                <div key={idx} className="relative group/item">
                  <div className="absolute -left-[37.5px] lg:-left-[53.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/20 border border-charcoal outline outline-4 outline-charcoal group-hover/item:bg-clay group-hover/item:scale-125 transition-all duration-500"></div>
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="text-xl font-serif text-rice-paper group-hover/item:text-clay transition-all duration-500">{item.title}</h3>
                      <span className="text-[10px] text-stone-warm/50 font-bold uppercase tracking-[0.2em]">{item.date}</span>
                    </div>
                    <p className="text-stone-warm text-sm max-w-lg leading-relaxed font-light">{item.description}</p>
                    <div className={`grid gap-4 pt-6 ${item.layout === 'grid' ? 'grid-cols-3' : 'grid-cols-1'}`}>
                      {item.images.map((src, i) => (
                        <div key={i} className={`overflow-hidden rounded-xl bg-black/30 relative group/img cursor-pointer border border-white/5 hover:border-clay/30 transition-all duration-500 ${item.layout === 'wide' ? 'h-56' : 'aspect-square'}`}>
                          <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover/img:scale-110 group-hover/img:rotate-1" />
                          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-clay/15 transition-all duration-700" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="px-4 md:px-12 lg:px-24 py-16 md:py-24 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-rice-paper">Event Gallery</h2>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
              {galleryImages.map((img, i) => (
                <div key={i} className={`relative overflow-hidden mb-6 group cursor-pointer border border-border-subtle rounded-lg transition-all duration-1000 hover:border-clay/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${100 * i}ms` }}>
                  <img src={img.src} alt={img.alt} className="w-full transition-all duration-[1500ms] group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <Eye className="w-8 h-8 text-white group-hover:scale-125 transition-all duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTINUOUS MARQUEE SECTION: THE PROCESS IN MOTION */}
        <section className="py-12 md:py-16 bg-charcoal-light border-t border-border-subtle relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzVlI8BGQMSspZ5VftfBOItr0K4kOBo5vWkTdGEdqND11OwtzoetJuopJoaWl4mC-ii7fqypDIEZlBtoa9xoekR71JXyJfRAWwRjiJGY2vVrcf92xIDWgI_HOredw7Sq9UrUQQNALmW9oGK70Qif9TAjR96GuZ9Uu77B2tmusZwR-PRiCDOKlCgf3TYAt34qeZAC81VKOdJqOd_agLTwTntabqTO1W2oldEyQ951BFgWqOZMElOjhSww885mnrRadT2Ug0QnO06go")' }}></div>

          <div className="relative z-10 mb-12">
            <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
              <div className="space-y-4 px-4 md:px-12 lg:px-24 flex-1">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-rice-paper text-left">The Process in Motion</h2>
                <p className="text-stone-warm max-w-2xl font-light leading-relaxed text-lg text-left">From the first throw to the final firing, witness the dedication required to master the wheel. Join our workshops to get your hands dirty.</p>
              </div>
              <div className="flex items-center justify-end flex-shrink-0 px-4 md:px-12 lg:px-24">
                <button className="flex items-center gap-2 bg-clay text-white px-8 py-3 rounded-xl font-bold transition-all duration-500 hover:bg-clay/90 hover:scale-105 shadow-lg hover:shadow-xl uppercase tracking-wider text-sm">
                  <CalendarDays size={20} /> Book a Workshop
                </button>
              </div>
            </div>
          </div>

          {/* Full Width Marquee */}
          <div
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsMarqueeHovered(true)}
            onMouseLeave={() => setIsMarqueeHovered(false)}
          >
            <div className={`flex gap-6 whitespace-nowrap ${isMarqueeHovered ? 'pause-animation' : 'animate-marquee'}`}>
              {[...processVideos, ...processVideos, ...processVideos].map((video, idx) => (
                <div key={idx} className="shrink-0 w-[300px] md:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden relative border border-border-subtle transition-all duration-700 hover:border-clay/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] group/video">
                  <div className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover/video:scale-110" style={{ backgroundImage: `url("${video.thumbnail}")` }} />
                  <div className="absolute inset-0 bg-charcoal/40 group-hover/video:bg-charcoal/20 transition-all duration-500 flex items-center justify-center">
                    <div className="size-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover/video:scale-110 group-hover/video:bg-clay/20 transition-all duration-500">
                      <Play size={32} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-charcoal via-charcoal/90 to-transparent text-left">
                    <p className="text-white font-bold text-lg mb-1 whitespace-normal font-serif">{video.title}</p>
                    <p className="text-stone-warm text-sm font-light italic">{video.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STUDIO LIFE SECTION (Now between Motion Section and Footer) */}
        <section className="px-4 md:px-12 lg:px-24 py-20 md:py-24 border-t border-border-subtle">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light tracking-tight text-rice-paper">Studio Life</h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden group border border-border-subtle hover:border-clay/30 transition-all duration-500">
              <img alt="Morning Light at Basho" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDITqixozyIDA6eroqfMnHV0CxDmWr_Zr0iB281Vu-LQ8KgOHn5plXBMPcO3uyo4wrpByAHFwdou94pqG0flR7ZWrRE3ImiSDhcbyNzqKSaPOydmE6jZJoo1FymP8aC6pfb3sdj8KYsJg17nB6zhDiu0wfTlo6DvnMPE-nvJKBXXv7y0sDtjdRZdSqiFBhO3JjQwIRU9mJH-GTgw2Hpr7lNEiY-fHPWHs-m2gvyMXpg69-PIOizqVoQK7SCUp238Slx8s3Cx0KF5ws" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-clay/10 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 p-6">
                <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg inline-block border border-white/10">
                  <p className="text-white font-medium">Morning Light at Basho</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-1 md:row-span-1 relative rounded-xl overflow-hidden group bg-charcoal-light border border-border-subtle hover:border-clay/30 transition-all duration-500">
              <img alt="Pottery tools" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCDm-V_4RvmVGJ5-M6DiD96YFKE7i-rL4MZqsMHFmWZgrRSuYdV2QzDnsCPr-U740Hqaz0nfUJQVkVzI8a4RpRs8FldhghlDp12y6Q9CyBfzMfAXFT_mG3B6nY4hEaRjXTFDkw8jk8prWhGKpngywBHh9ME9eqJ6tyTUQlFyuzcaMjy2Gk-Y-QD4W5GttWbVfQ2WCLFv63I_fDUF3zqsqFQpfsqUOomS4SClv8TiY9bFKvjAGYKda-Fvgni3-fQ5N6sDZ85I-tiWM" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-clay/10 transition-all duration-700" />
            </div>
            <div className="md:col-span-1 md:row-span-1 relative rounded-xl overflow-hidden group bg-charcoal-light border border-border-subtle hover:border-clay/30 transition-all duration-500">
              <img alt="Studio cat" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB75zhrQq8eNRER1N22HIeXTjpgEk6276lPr-E8XthsC_zBkaNGFSV2g8qTFxfNH_4FVl9Yx_-kedi0uN4OCohYoQsJPla1i1akUbYT2_zD13i2YU8YkeR7ruiNzjzx9dUQ3HQKPRfM4Et-CShJB1i55rnsbQRXL6ADBwiU7luen2gDIP8deDNGM2s5EoUvO0QTyfA9M0s28ZbkDw3kiqWMtBF_d1mzD2VcxLM7wMmfH77sI8NvQfOFzGTw18CiGEujQYYnML1Gzvs" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-clay/10 transition-all duration-700" />
            </div>
             <div className="md:col-span-2 md:row-span-1 relative rounded-xl overflow-hidden group bg-charcoal-light border border-border-subtle hover:border-clay/30 transition-all duration-500">
               <img alt="Workshop students" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ objectPosition: 'center 30%' }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuChK36R2xqtBrJc8gatziANl1JYX8JGHR5R9-OJuz113G1OCpAsrBz6zmZm5ckxDO_dkjTwZ6wHLezWz1ekAcLz2l8r7HqK8ndkujve7ePvvVtBPM94C1Es3nFkqqMoHNf_mQtA4ooEiuU5A-Gp4M2ARxVaEhdtFEEK9rgl2HJusbma-PrT9ZlmvrkRdedZ_Kyc18NbkGhFhW0iJ5NHIfgx717mwuxoSbO1HfssPJefEfMOISUxZYWclPLtwYemn02zKhJi1wwpXTw" />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-clay/10 transition-all duration-700" />
             </div>
          </div>
        </section>

      </main>

      <Footer />

      <style jsx>{`
        @keyframes grain-shift {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          50% { transform: translate(-10%, 5%); }
          90% { transform: translate(10%, 5%); }
        }
        .animate-grain-shift { animation: grain-shift 12s ease-in-out infinite; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .pause-animation {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
          animation-play-state: paused;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}