// "use client";
// import React, { useState, useEffect, useRef } from "react";

// const articles = [
//   {
//     id: 1,
//     category: "Philosophy",
//     title: "Embracing Brokenness: The Kintsugi Method",
//     excerpt: "How the ancient Japanese art of repairing pottery with gold teaches us resilience and to find beauty in our scars.",
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEIfox2_RhffZMthU_0455T2T0qA67aVteu2MjYeFhzc-bTvikl-By0Lr2nN4EBoIoPvfku5jkx2jXC6GvFvy2azq1ppXJyPd2cxwKY93nEB9cjeLMt_vkyZo-7rfi_gIhnaU85TAD-HC_JnhRpOOlYZOI2nzJnqmVUzDBlrFioCdy1gKvEVKhaZCV76q73MgniAIO3-QfPMOP519iGK_Sn8pQvVXHTvlNq_u2s7pv68x5yXYMjKo22OyAKYt75DtHrtQlxKVzwIXG"
//   },
//   {
//     id: 2,
//     category: "Behind the Scenes",
//     title: "A Day in the Studio",
//     excerpt: "Follow our master potter through a typical day of throwing, trimming, and glazing. The rhythm of the wheel.",
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoWpHvQqXJp-1iMzpW4jIgwO9ZF-SIgLahi4kjHJOMNaJFVe0gM0dV17v8I7m4iv_2r9QWzywA9TraoiIHmdu4MxVpgw_Q9J4nwJ7VCvTMj-oCwbnMt_Cgbol7WQuPVZV5j0Vlr_jaRKaFMflK2Lx8bz6nXYlKzl3LaVPGn2QZ31-GaDo59KMc2yB_BPV_wW7xRsBOpcT7HVLtaSaumNw6yaOtvv7_fX1aBJm9t5peekAsS3IphjOW3pbwrtb9P2_GfaWvb2ho9IlP"
//   },
//   {
//     id: 3,
//     category: "Living",
//     title: "Slow Morning Rituals",
//     excerpt: "Why using handmade objects can transform your daily coffee routine into a meditation. The weight of the cup.",
//     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzHz7Fo3XMPbaSoTTwiIKjmIlBOxKyHEwBm2wTLiRO99sCWtxEJ8jeN1BemrToQyM-6JpWaSUHa8rcMtNhQx7g3m-7cw4opdMfpDb9Pt1G5w_IKPrImxo67kjpeMOG--tVUaSWreRNv2tacBHVV8t8FAGQvFkpZ8vDzNOsnvs1HY-DzlhredGHPdCij2erP_BShnh3KiBozJwnFUGM8WSVikfGSSuoGEnmHISNm2i0fQ39XeQ9kaoSbvBNuBNwboRWO19Un08DVCEA"
//   }
// ];

// export default function Journal() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [hoveredArticle, setHoveredArticle] = useState(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const sectionRef = useRef(null);
//   const cardRefs = useRef([]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   const handleMouseMove = (e, articleId) => {
//     const card = cardRefs.current[articleId];
//     if (!card) return;

//     const rect = card.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
//     const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    
//     setMousePosition({ x, y });
//   };

//   const handleMouseLeave = () => {
//     setMousePosition({ x: 0, y: 0 });
//   };

//   return (
//     <section 
//       ref={sectionRef}
//       className="py-32 bg-charcoal border-t border-border-subtle relative overflow-hidden"
//     >
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         {/* Floating Orbs */}
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-clay/5 rounded-full blur-3xl animate-float-slow" />
//         <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-clay/3 rounded-full blur-3xl animate-float-slow-delayed" />
//       </div>

//       <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
//         {/* Header Section with Parallax */}
//         <div 
//           className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-20 border-b border-white/5 pb-10 gap-6 transition-all duration-1000 ease-out ${
//             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
//           }`}
//         >
//           <div className="relative">
//             {/* Decorative Line */}
//             <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-clay/60 via-clay/20 to-transparent" />
            
//             <span className="text-clay text-[11px] font-bold uppercase tracking-[0.25em] block mb-4 relative">
//               <span className="inline-block transition-all duration-700 hover:tracking-[0.35em]">
//                 The Journal
//               </span>
//               {/* Subtle pulse effect */}
//               <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-clay rounded-full animate-pulse-glow" />
//             </span>
            
//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-rice-paper relative group inline-block">
//               <span className="relative z-10 transition-all duration-700 group-hover:tracking-tight">
//                 From the Kiln
//               </span>
//               {/* Text shadow effect */}
//               <span className="absolute inset-0 text-clay blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700">
//                 From the Kiln
//               </span>
//             </h2>
//           </div>
          
//           <a
//             className="group relative flex text-[11px] font-bold text-stone-warm uppercase tracking-[0.2em] items-center gap-3 overflow-hidden"
//             href="#"
//           >
//             {/* Animated background sweep */}
//             <span className="absolute inset-0 bg-gradient-to-r from-transparent via-clay/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
//             <span className="relative z-10 transition-all duration-500 group-hover:text-clay group-hover:tracking-[0.25em]">
//               Read the Journal
//             </span>
            
//             {/* Multi-layer arrow animation */}
//             <span className="relative z-10 flex items-center">
//               <span className="material-symbols-outlined text-sm transition-all duration-700 group-hover:translate-x-3 group-hover:scale-110">
//                 arrow_forward
//               </span>
//               <span className="material-symbols-outlined text-sm absolute opacity-0 transition-all duration-700 group-hover:opacity-30 group-hover:translate-x-5">
//                 arrow_forward
//               </span>
//             </span>
//           </a>
//         </div>

//         {/* Articles Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//           {articles.map((article, index) => (
//             <article
//               key={article.id}
//               ref={(el) => (cardRefs.current[article.id] = el)}
//               onMouseEnter={() => setHoveredArticle(article.id)}
//               onMouseLeave={() => {
//                 setHoveredArticle(null);
//                 handleMouseLeave();
//               }}
//               onMouseMove={(e) => handleMouseMove(e, article.id)}
//               className={`group cursor-pointer flex flex-col h-full transition-all duration-1000 ease-out hover:-translate-y-3 ${
//                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
//               }`}
//               style={{ 
//                 transitionDelay: `${200 + index * 150}ms`,
//                 transform: hoveredArticle === article.id 
//                   ? `perspective(1000px) rotateX(${mousePosition.y * -2}deg) rotateY(${mousePosition.x * 2}deg) translateY(-12px)` 
//                   : 'none',
//                 transition: hoveredArticle === article.id ? 'transform 0.2s ease-out' : 'all 1s ease-out'
//               }}
//             >
//               {/* Image Container with 3D Tilt */}
//               <div className="overflow-hidden mb-6 aspect-[4/3] relative border border-white/5 transition-all duration-700 group-hover:border-clay/30 group-hover:shadow-[0_20px_60px_rgba(210,180,140,0.15)]">
                
//                 {/* Parallax Background Image */}
//                 <div 
//                   className="absolute inset-0 scale-110 transition-transform duration-500"
//                   style={{
//                     transform: hoveredArticle === article.id 
//                       ? `scale(1.15) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
//                       : 'scale(1.1)'
//                   }}
//                 >
//                   <img
//                     alt={article.title}
//                     className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-700"
//                     src={article.image}
//                   />
//                 </div>
                
//                 {/* Gradient Overlays */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-transparent transition-all duration-700 group-hover:from-charcoal/50 group-hover:via-charcoal/10" />
                
//                 {/* Shimmer Effect */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
//                   <div 
//                     className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500"
//                     style={{ transitionDelay: '200ms' }}
//                   />
//                 </div>

//                 {/* Floating Category Badge with Reveal */}
//                 <div className="absolute top-4 left-4 z-20 overflow-hidden">
//                   <span className={`bg-gradient-to-r from-charcoal/95 to-charcoal/90 backdrop-blur-md text-clay px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] shadow-xl inline-block border border-clay/20 transition-all duration-700 ${
//                     hoveredArticle === article.id 
//                       ? 'opacity-100 translate-x-0' 
//                       : 'opacity-0 -translate-x-full'
//                   }`}>
//                     <span className="relative z-10">{article.category}</span>
//                     {/* Inner glow */}
//                     <span className="absolute inset-0 bg-clay/5 animate-pulse-subtle" />
//                   </span>
//                 </div>

//                 {/* Corner Accent Lines */}
//                 <div className={`absolute top-0 left-0 transition-all duration-700 ${
//                   hoveredArticle === article.id ? 'opacity-100' : 'opacity-0'
//                 }`}>
//                   <div className="w-12 h-[2px] bg-gradient-to-r from-clay to-transparent" />
//                   <div className="w-[2px] h-12 bg-gradient-to-b from-clay to-transparent" />
//                 </div>
//                 <div className={`absolute bottom-0 right-0 transition-all duration-700 ${
//                   hoveredArticle === article.id ? 'opacity-100' : 'opacity-0'
//                 }`}>
//                   <div className="w-12 h-[2px] bg-gradient-to-l from-clay to-transparent ml-auto" />
//                   <div className="w-[2px] h-12 bg-gradient-to-t from-clay to-transparent ml-auto" />
//                 </div>
//               </div>

//               {/* Content Section */}
//               <div className="flex flex-col flex-1">
                
//                 {/* Category Tag with Stagger */}
//                 <span className="text-[10px] font-bold text-clay uppercase tracking-[0.2em] mb-4 inline-block overflow-hidden">
//                   <span className={`inline-block transition-all duration-700 group-hover:tracking-[0.3em] ${
//                     hoveredArticle === article.id ? 'translate-y-0' : ''
//                   }`}>
//                     {article.category.split('').map((char, i) => (
//                       <span 
//                         key={i}
//                         className="inline-block transition-all duration-500"
//                         style={{ 
//                           transitionDelay: hoveredArticle === article.id ? `${i * 30}ms` : '0ms',
//                           transform: hoveredArticle === article.id ? 'translateY(-2px)' : 'translateY(0)'
//                         }}
//                       >
//                         {char}
//                       </span>
//                     ))}
//                   </span>
//                 </span>

//                 {/* Title with Reveal Animation */}
//                 <h3 className="text-2xl md:text-3xl font-serif leading-tight mb-4 text-rice-paper overflow-hidden">
//                   <span className="inline-block transition-all duration-700 group-hover:text-clay">
//                     {article.title}
//                   </span>
//                 </h3>

//                 {/* Excerpt with Fade */}
//                 <p className="text-sm md:text-base text-stone-warm leading-relaxed mb-6 font-light transition-all duration-700 group-hover:text-stone-200">
//                   {article.excerpt}
//                 </p>

//                 {/* Read More with Progress Bar */}
//                 <div className="mt-auto pt-4 border-t border-white/5 transition-colors duration-700 group-hover:border-clay/30">
//                   <div className="group/link relative inline-flex items-center gap-2">
//                     <span className="text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-500 group-hover:text-clay group-hover:tracking-[0.15em]">
//                       Read Article
//                     </span>
                    
//                     {/* Animated progress line */}
//                     <div className="relative flex-1 h-[2px] bg-white/10 overflow-hidden ml-2 max-w-[60px]">
//                       <div className="absolute inset-0 bg-clay transition-transform duration-700 origin-left scale-x-0 group-hover:scale-x-100" />
//                     </div>
                    
//                     <span className="material-symbols-outlined text-[14px] text-clay transition-all duration-700 group-hover:translate-x-2 group-hover:scale-125">
//                       arrow_right_alt
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float-slow {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           33% { transform: translate(30px, -30px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//         }

//         @keyframes float-slow-delayed {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           33% { transform: translate(-30px, 30px) scale(0.9); }
//           66% { transform: translate(20px, -20px) scale(1.1); }
//         }

//         @keyframes pulse-glow {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(1.5); }
//         }

//         @keyframes pulse-subtle {
//           0%, 100% { opacity: 0.1; }
//           50% { opacity: 0.2; }
//         }

//         .animate-float-slow {
//           animation: float-slow 20s ease-in-out infinite;
//         }

//         .animate-float-slow-delayed {
//           animation: float-slow-delayed 25s ease-in-out infinite;
//         }

//         .animate-pulse-glow {
//           animation: pulse-glow 2s ease-in-out infinite;
//         }

//         .animate-pulse-subtle {
//           animation: pulse-subtle 3s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// }

"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link"; // [!code ++]

const articles = [
  {
    id: 1,
    targetId: "post-1", // [!code ++] Maps to Journal ID 1 (Wabi-Sabi)
    category: "Philosophy",
    title: "Wabi-Sabi: Finding Beauty in Imperfection", // [!code ++] Updated to match Journal Page
    excerpt: "How the ancient Japanese art of repairing pottery with gold teaches us resilience and to find beauty in our scars.",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1200&h=800&fit=crop" // [!code ++] Updated image
  },
  {
    id: 2,
    targetId: "post-2", // [!code ++] Maps to Journal ID 2 (Language of Clay)
    category: "Craft",
    title: "The Language of Clay", // [!code ++] Updated to match Journal Page
    excerpt: "Clay remembers every touch. The pressure of fingers, the speed of the wheel—each leaves an indelible mark.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=800&fit=crop" // [!code ++] Updated image
  },
  {
    id: 3,
    targetId: "post-3", // [!code ++] Maps to Journal ID 3 (Cha no Yu)
    category: "Culture",
    title: "Cha no Yu: The Way of Tea", // [!code ++] Updated to match Journal Page
    excerpt: "Why using handmade objects can transform your daily tea routine into a meditation.",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1200&h=800&fit=crop" // [!code ++] Updated image
  }
];

export default function Journal() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredArticle, setHoveredArticle] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e, articleId) => {
    const card = cardRefs.current[articleId];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-charcoal border-t border-border-subtle relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-clay/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-clay/3 rounded-full blur-3xl animate-float-slow-delayed" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Header Section with Parallax */}
        <div 
          className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-20 border-b border-white/5 pb-10 gap-6 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="relative">
            {/* Decorative Line */}
            <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-clay/60 via-clay/20 to-transparent" />
            
            <span className="text-clay text-[11px] font-bold uppercase tracking-[0.25em] block mb-4 relative">
              <span className="inline-block transition-all duration-700 hover:tracking-[0.35em]">
                The Journal
              </span>
              {/* Subtle pulse effect */}
              <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-clay rounded-full animate-pulse-glow" />
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-rice-paper relative group inline-block">
              <span className="relative z-10 transition-all duration-700 group-hover:tracking-tight">
                From the Kiln
              </span>
              {/* Text shadow effect */}
              <span className="absolute inset-0 text-clay blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                From the Kiln
              </span>
            </h2>
          </div>
          
          <Link
            className="group relative flex text-[11px] font-bold text-stone-warm uppercase tracking-[0.2em] items-center gap-3 overflow-hidden"
            href="/journal"
          >
            {/* Animated background sweep */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-clay/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <span className="relative z-10 transition-all duration-500 group-hover:text-clay group-hover:tracking-[0.25em]">
              Read the Journal
            </span>
            
            {/* Multi-layer arrow animation */}
            <span className="relative z-10 flex items-center">
              <span className="material-symbols-outlined text-sm transition-all duration-700 group-hover:translate-x-3 group-hover:scale-110">
                arrow_forward
              </span>
              <span className="material-symbols-outlined text-sm absolute opacity-0 transition-all duration-700 group-hover:opacity-30 group-hover:translate-x-5">
                arrow_forward
              </span>
            </span>
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {articles.map((article, index) => (
            <article
              key={article.id}
              ref={(el) => (cardRefs.current[article.id] = el)}
              onMouseEnter={() => setHoveredArticle(article.id)}
              onMouseLeave={() => {
                setHoveredArticle(null);
                handleMouseLeave();
              }}
              onMouseMove={(e) => handleMouseMove(e, article.id)}
              className={`group cursor-pointer flex flex-col h-full transition-all duration-1000 ease-out hover:-translate-y-3 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ 
                transitionDelay: `${200 + index * 150}ms`,
                transform: hoveredArticle === article.id 
                  ? `perspective(1000px) rotateX(${mousePosition.y * -2}deg) rotateY(${mousePosition.x * 2}deg) translateY(-12px)` 
                  : 'none',
                transition: hoveredArticle === article.id ? 'transform 0.2s ease-out' : 'all 1s ease-out'
              }}
            >
              {/* Image Container with 3D Tilt */}
              <div className="overflow-hidden mb-6 aspect-[4/3] relative border border-white/5 transition-all duration-700 group-hover:border-clay/30 group-hover:shadow-[0_20px_60px_rgba(210,180,140,0.15)]">
                
                {/* Parallax Background Image */}
                <div 
                  className="absolute inset-0 scale-110 transition-transform duration-500"
                  style={{
                    transform: hoveredArticle === article.id 
                      ? `scale(1.15) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
                      : 'scale(1.1)'
                  }}
                >
                  <img
                    alt={article.title}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-700"
                    src={article.image}
                  />
                </div>
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-transparent transition-all duration-700 group-hover:from-charcoal/50 group-hover:via-charcoal/10" />
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500"
                    style={{ transitionDelay: '200ms' }}
                  />
                </div>

                {/* Floating Category Badge with Reveal */}
                <div className="absolute top-4 left-4 z-20 overflow-hidden">
                  <span className={`bg-gradient-to-r from-charcoal/95 to-charcoal/90 backdrop-blur-md text-clay px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] shadow-xl inline-block border border-clay/20 transition-all duration-700 ${
                    hoveredArticle === article.id 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-full'
                  }`}>
                    <span className="relative z-10">{article.category}</span>
                    {/* Inner glow */}
                    <span className="absolute inset-0 bg-clay/5 animate-pulse-subtle" />
                  </span>
                </div>

                {/* Corner Accent Lines */}
                <div className={`absolute top-0 left-0 transition-all duration-700 ${
                  hoveredArticle === article.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="w-12 h-[2px] bg-gradient-to-r from-clay to-transparent" />
                  <div className="w-[2px] h-12 bg-gradient-to-b from-clay to-transparent" />
                </div>
                <div className={`absolute bottom-0 right-0 transition-all duration-700 ${
                  hoveredArticle === article.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="w-12 h-[2px] bg-gradient-to-l from-clay to-transparent ml-auto" />
                  <div className="w-[2px] h-12 bg-gradient-to-t from-clay to-transparent ml-auto" />
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-1">
                
                {/* Category Tag with Stagger */}
                <span className="text-[10px] font-bold text-clay uppercase tracking-[0.2em] mb-4 inline-block overflow-hidden">
                  <span className={`inline-block transition-all duration-700 group-hover:tracking-[0.3em] ${
                    hoveredArticle === article.id ? 'translate-y-0' : ''
                  }`}>
                    {article.category.split('').map((char, i) => (
                      <span 
                        key={i}
                        className="inline-block transition-all duration-500"
                        style={{ 
                          transitionDelay: hoveredArticle === article.id ? `${i * 30}ms` : '0ms',
                          transform: hoveredArticle === article.id ? 'translateY(-2px)' : 'translateY(0)'
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </span>

                {/* Title with Reveal Animation */}
                <h3 className="text-2xl md:text-3xl font-serif leading-tight mb-4 text-rice-paper overflow-hidden">
                  <span className="inline-block transition-all duration-700 group-hover:text-clay">
                    {article.title}
                  </span>
                </h3>

                {/* Excerpt with Fade */}
                <p className="text-sm md:text-base text-stone-warm leading-relaxed mb-6 font-light transition-all duration-700 group-hover:text-stone-200">
                  {article.excerpt}
                </p>

                {/* Read More with Progress Bar */}
                <div className="mt-auto pt-4 border-t border-white/5 transition-colors duration-700 group-hover:border-clay/30">
                  {/* [!code ++] CHANGED BUTTON TO LINK HERE */}
                  <Link 
                    href={`/journal#${article.targetId}`} 
                    className="group/link relative inline-flex items-center gap-2"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-500 group-hover:text-clay group-hover:tracking-[0.15em]">
                      Read Article
                    </span>
                    
                    {/* Animated progress line */}
                    <div className="relative flex-1 h-[2px] bg-white/10 overflow-hidden ml-2 max-w-[60px]">
                      <div className="absolute inset-0 bg-clay transition-transform duration-700 origin-left scale-x-0 group-hover:scale-x-100" />
                    </div>
                    
                    <span className="material-symbols-outlined text-[14px] text-clay transition-all duration-700 group-hover:translate-x-2 group-hover:scale-125">
                      arrow_right_alt
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float-slow-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(0.9); }
          66% { transform: translate(20px, -20px) scale(1.1); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-slow-delayed {
          animation: float-slow-delayed 25s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}