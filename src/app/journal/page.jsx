// "use client";

// import { useState, useEffect, useRef } from 'react';
// // --- NEW IMPORTS ---
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';

// // Mock Journal Data
// const journalEntries = [
//   {
//     id: 1,
//     category: 'philosophy',
//     title: 'Wabi-Sabi: Finding Beauty in Imperfection',
//     subtitle: 'The cracks in pottery tell stories glaze cannot',
//     author: 'Shivangi',
//     date: 'December 2024',
//     readTime: '8 min',
//     excerpt: 'In Japanese aesthetics, perfection is found not in symmetry, but in the weathered, the humble, the incomplete. Each crack in kintsugi becomes a golden vein of history.',
//     content: 'Wabi-sabi is the Japanese art of finding beauty in imperfection and profundity in nature. It accepts the natural cycle of growth, decay, and death. A philosophy that teaches us to see beauty not in spite of flaws, but because of them.',
//     image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1200&h=800&fit=crop',
//     layout: 'full-bleed',
//     tags: ['wabi-sabi', 'philosophy', 'aesthetics']
//   },
//   {
//     id: 2,
//     category: 'craft',
//     title: 'The Language of Clay',
//     subtitle: 'How earth speaks through our hands',
//     author: 'Shivangi',
//     date: 'November 2024',
//     readTime: '6 min',
//     excerpt: 'Clay remembers every touch. The pressure of fingers, the speed of the wheel, the temperature of the kiln—each leaves an indelible mark on the final form.',
//     content: 'Working with clay is a dialogue. You propose a shape; the clay responds with its own wisdom. Too fast and it collapses. Too timid and it lacks presence. The potter learns to listen.',
//     image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=800&fit=crop',
//     layout: 'image-left',
//     tags: ['pottery', 'craft', 'process']
//   },
//   {
//     id: 3,
//     category: 'culture',
//     title: 'Cha no Yu: The Way of Tea',
//     subtitle: 'Ceremony as meditation in motion',
//     author: 'Shivangi',
//     date: 'October 2024',
//     readTime: '10 min',
//     excerpt: 'Every gesture in the tea ceremony is intentional. The rotation of the bowl, the angle of the whisk, the silence between movements—all become a form of meditation.',
//     content: 'The Japanese tea ceremony is not about drinking tea—it is about creating a moment of perfect harmony between host and guest, between human and nature, between form and spirit.',
//     image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1200&h=800&fit=crop',
//     layout: 'image-right',
//     tags: ['tea', 'ceremony', 'culture']
//   },
//   {
//     id: 4,
//     category: 'studio',
//     title: 'Morning Rituals in the Studio',
//     subtitle: 'How intention shapes the day',
//     author: 'Shivangi',
//     date: 'September 2024',
//     readTime: '5 min',
//     excerpt: 'Before the wheel spins, before clay meets water, there is stillness. The studio in dawn light holds a sacred quiet that shapes every piece made that day.',
//     content: 'Each morning begins the same way: sweeping the studio floor, arranging tools, centering myself before centering clay. These rituals are not preparation—they are the work itself.',
//     image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&h=800&fit=crop',
//     layout: 'split',
//     tags: ['studio', 'ritual', 'process']
//   },
//   {
//     id: 5,
//     category: 'philosophy',
//     title: 'Mono no Aware: The Pathos of Things',
//     subtitle: 'Embracing transience and beauty',
//     author: 'Shivangi',
//     date: 'August 2024',
//     readTime: '7 min',
//     excerpt: 'The cherry blossoms are most beautiful because they fall. Their ephemeral nature intensifies their beauty. So too with handmade objects—their impermanence makes them precious.',
//     content: 'Mono no aware teaches us to find beauty in the fleeting, the temporary, the seasonal. It is the gentle sadness of watching petals fall, knowing they will return. Each bowl carries this same truth.',
//     image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&h=800&fit=crop',
//     layout: 'full-bleed',
//     tags: ['philosophy', 'transience', 'beauty']
//   },
//   {
//     id: 6,
//     category: 'craft',
//     title: 'Fire and Transformation',
//     subtitle: 'Inside the kiln\'s alchemy',
//     author: 'Shivangi',
//     date: 'July 2024',
//     readTime: '9 min',
//     excerpt: 'At 1,200 degrees, clay becomes something else entirely. The kiln is not just heat—it is transformation, mystery, and surrender. What emerges is always a surprise.',
//     content: 'The firing process is where the potter relinquishes control. We can shape, glaze, and prepare, but the fire makes the final decision. This is the ultimate lesson in letting go.',
//     image: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=1200&h=800&fit=crop',
//     layout: 'image-right',
//     tags: ['firing', 'kiln', 'transformation']
//   }
// ];

// const categories = ['all', 'philosophy', 'craft', 'culture', 'studio'];

// // Intersection Observer Hook
// function useInView(options = {}) {
//   const ref = useRef(null);
//   const [isInView, setIsInView] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) {
//         setIsInView(true);
//       }
//     }, { threshold: 0.1, ...options });

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => {
//       if (ref.current) {
//         observer.unobserve(ref.current);
//       }
//     };
//   }, []);

//   return [ref, isInView];
// }

// // Enhanced Hero Section
// function JournalHero() {
//   const [heroRef, heroInView] = useInView();
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
//   // New state to hold stable random values
//   const [particles, setParticles] = useState([]);

//   useEffect(() => {
//     // Generate particles only on the client side
//     const newParticles = [...Array(20)].map(() => ({
//       left: `${Math.random() * 100}%`,
//       top: `${Math.random() * 100}%`,
//       animationDuration: `${8 + Math.random() * 8}s`,
//       animationDelay: `${Math.random() * 5}s`
//     }));
//     setParticles(newParticles);
//   }, []);
  
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth - 0.5) * 20,
//         y: (e.clientY / window.innerHeight - 0.5) * 20
//       });
//     };
    
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);
  
//   return (
//     <section 
//       ref={heroRef}
//       className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian"
//     >
//       {/* Animated Background Layers */}
//       <div className="absolute inset-0 z-0">
//         {/* Primary Image Layer */}
//         <div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: 'url(https://images.unsplash.com/photo-1615485500834-bc10199bc759?w=1920&h=1080&fit=crop&q=80)',
//             transform: heroInView 
//               ? `scale(1) translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` 
//               : 'scale(1.15)',
//             transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)'
//           }}
//         />
        
//         {/* Gradient Overlays */}
//         <div className="absolute inset-0 bg-gradient-to-br from-obsidian/90 via-charcoal/70 to-obsidian/95" />
//         <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
        
//         {/* Radial Glow */}
//         <div 
//           className="absolute inset-0"
//           style={{
//             background: 'radial-gradient(circle at 50% 50%, rgba(166, 93, 61, 0.15) 0%, transparent 60%)'
//           }}
//         />
        
//         {/* Film Grain Texture */}
//         <div 
//           className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
//           style={{
//             backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=)',
//             animation: 'grainShift 8s steps(10) infinite'
//           }}
//         />
        
//         {/* Floating Particles */}
//         <div className="absolute inset-0 overflow-hidden">
//           {particles.map((style, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-clay/20 rounded-full"
//               style={{
//                 left: style.left,
//                 top: style.top,
//                 animation: `float ${style.animationDuration} ease-in-out ${style.animationDelay} infinite`,
//                 animationDelay: style.animationDelay
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
//         {/* Top Label */}
//         <div 
//           className={`mb-8 flex items-center justify-center gap-4 transition-all duration-1000 delay-100 ${
//             heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}
//         >
//           <div className="h-px w-16 bg-gradient-to-r from-transparent via-clay to-clay" />
//           <span className="text-clay text-xs md:text-sm tracking-[0.35em] uppercase font-medium">
//             Journal
//           </span>
//           <div className="h-px w-16 bg-gradient-to-l from-transparent via-clay to-clay" />
//         </div>
        
//         {/* Main Heading */}
//         <div 
//           className={`transition-all duration-1000 delay-300 ${
//             heroInView 
//               ? 'opacity-100 translate-y-0 blur-0' 
//               : 'opacity-0 translate-y-16 blur-sm'
//           }`}
//         >
//           <h1 className="font-serif text-7xl md:text-9xl lg:text-[10rem] mb-6 text-rice-paper leading-[0.9] italic tracking-tight">
//             Stories
//             <br />
//             <span className="relative inline-block">
//               in Clay
//               <div className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-clay/40 to-transparent" />
//             </span>
//           </h1>
//         </div>
        
//         {/* Subtitle */}
//         <div 
//           className={`transition-all duration-1000 delay-500 ${
//             heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
//           }`}
//         >
//           <p className="text-stone text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-12">
//             Reflections on craft, culture, and the quiet philosophy
//             <br className="hidden md:block" />
//             that shapes our work at Basho
//           </p>
//         </div>

//         {/* CTA Buttons */}
//         <div 
//           className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-700 ${
//             heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}
//         >
//           <button className="group relative px-8 py-4 bg-clay text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-clay/30 hover:scale-105">
//             <span className="relative z-10 tracking-wider uppercase text-sm font-medium flex items-center gap-2">
//               Explore Stories
//               <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </span>
//             <div className="absolute inset-0 bg-gradient-to-r from-clay-muted to-clay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//           </button>
          
//           <button className="group px-8 py-4 bg-transparent text-rice-paper border border-rice-paper/30 rounded-full hover:border-clay hover:text-clay transition-all duration-300">
//             <span className="tracking-wider uppercase text-sm font-medium flex items-center gap-2">
//               About the Journal
//               <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </span>
//           </button>
//         </div>
//       </div>
      
//       {/* Bottom Fade */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent pointer-events-none" />
//     </section>
//   );
// }


// // Category Filter
// function CategoryFilter({ activeCategory, onCategoryChange }) {
//   return (
//     <div className="sticky top-0 z-40 bg-charcoal/95 backdrop-blur-xl border-b border-border-subtle">
//       <div className="max-w-7xl mx-auto px-6 py-6">
//         <div className="flex flex-wrap gap-3 justify-center">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => onCategoryChange(cat)}
//               className={`px-6 py-2.5 rounded-full text-sm tracking-wider uppercase transition-all duration-300 ${
//                 activeCategory === cat 
//                   ? 'bg-clay text-white shadow-lg shadow-clay/20' 
//                   : 'bg-charcoal-light text-stone-warm hover:text-rice-paper hover:bg-charcoal-light/80'
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Full Bleed Entry
// function FullBleedEntry({ entry, index }) {
//   const [ref, inView] = useInView();
  
//   return (
//     <article 
//       ref={ref}
//       className={`relative min-h-screen flex items-center transition-all duration-1000 ${
//         inView ? 'opacity-100' : 'opacity-0'
//       }`}
//     >
//       <div className="absolute inset-0">
//         <div 
//           className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms]"
//           style={{
//             backgroundImage: `url(${entry.image})`,
//             transform: inView ? 'scale(1)' : 'scale(1.05)'
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/40" />
//       </div>

//       <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
//         <div 
//           className={`transition-all duration-1000 delay-300 ${
//             inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}
//         >
//           <span className="inline-block px-4 py-1.5 bg-clay/20 backdrop-blur-sm border border-clay/30 rounded-full text-clay text-xs tracking-widest uppercase mb-6">
//             {entry.category}
//           </span>
          
//           <h2 className="font-serif text-5xl md:text-7xl text-rice-paper mb-6 leading-tight italic">
//             {entry.title}
//           </h2>
          
//           <p className="text-2xl md:text-3xl text-stone-warm mb-8 font-light leading-relaxed">
//             {entry.subtitle}
//           </p>
          
//           <p className="text-lg text-stone max-w-2xl mb-10 leading-relaxed">
//             {entry.excerpt}
//           </p>
          
//           <div className="flex items-center gap-6 text-sm text-stone-warm mb-8">
//             <span>{entry.author}</span>
//             <span className="w-1 h-1 rounded-full bg-stone-warm" />
//             <span>{entry.date}</span>
//             <span className="w-1 h-1 rounded-full bg-stone-warm" />
//             <span>{entry.readTime} read</span>
//           </div>
          
//           <button className="group inline-flex items-center gap-3 px-8 py-4 bg-rice-paper text-obsidian rounded-full hover:bg-clay hover:text-white transition-all duration-300">
//             <span className="tracking-wider uppercase text-sm font-medium">Read Story</span>
//             <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

// // Split Entry
// function SplitEntry({ entry, index }) {
//   const [ref, inView] = useInView();
//   const isImageLeft = entry.layout === 'image-left';
  
//   return (
//     <article 
//       ref={ref}
//       className={`grid md:grid-cols-2 gap-0 min-h-screen transition-all duration-1000 ${
//         inView ? 'opacity-100' : 'opacity-0'
//       }`}
//     >
//       <div 
//         className={`relative overflow-hidden ${isImageLeft ? 'md:order-1' : 'md:order-2'}`}
//       >
//         <div 
//           className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms]"
//           style={{
//             backgroundImage: `url(${entry.image})`,
//             transform: inView ? 'scale(1)' : 'scale(1.1)'
//           }}
//         />
//         <div className="absolute inset-0 bg-obsidian/20" />
//       </div>

//       <div 
//         className={`flex items-center px-8 md:px-16 py-16 bg-charcoal-light ${
//           isImageLeft ? 'md:order-2' : 'md:order-1'
//         }`}
//       >
//         <div 
//           className={`transition-all duration-1000 delay-300 ${
//             inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//           }`}
//         >
//           <span className="inline-block px-4 py-1.5 bg-clay/10 border border-clay/30 rounded-full text-clay text-xs tracking-widest uppercase mb-6">
//             {entry.category}
//           </span>
          
//           <h2 className="font-serif text-4xl md:text-5xl text-rice-paper mb-4 leading-tight">
//             {entry.title}
//           </h2>
          
//           <p className="text-xl text-stone-warm mb-6 font-light italic">
//             {entry.subtitle}
//           </p>
          
//           <p className="text-stone leading-relaxed mb-8">
//             {entry.excerpt}
//           </p>
          
//           <div className="flex items-center gap-4 text-sm text-stone-warm mb-8">
//             <span>{entry.date}</span>
//             <span className="w-1 h-1 rounded-full bg-stone-warm" />
//             <span>{entry.readTime}</span>
//           </div>
          
//           <button className="group inline-flex items-center gap-2 text-clay hover:text-rice-paper transition-colors duration-300">
//             <span className="tracking-wider uppercase text-sm">Continue Reading</span>
//             <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

// // Story Divider
// function StoryDivider({ index }) {
//   const [ref, inView] = useInView();
  
//   return (
//     <div 
//       ref={ref}
//       className="relative py-20 flex items-center justify-center"
//     >
//       <div 
//         className={`flex items-center gap-4 transition-all duration-1000 ${
//           inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//         }`}
//       >
//         <div className="h-px w-20 bg-gradient-to-r from-transparent via-clay to-transparent" />
//         <div className="w-2 h-2 rounded-full bg-clay" />
//         <div className="h-px w-20 bg-gradient-to-l from-transparent via-clay to-transparent" />
//       </div>
//     </div>
//   );
// }

// // Newsletter Section
// function NewsletterSection() {
//   const [ref, inView] = useInView();
//   const [email, setEmail] = useState('');
  
//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     console.log('Subscribe:', email);
//     setEmail('');
//   };
  
//   return (
//     <section 
//       ref={ref}
//       className="relative py-32 px-6 overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-light to-charcoal" />
      
//       <div 
//         className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-1000 ${
//           inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//         }`}
//       >
//         <div className="mb-8">
//           <svg className="w-16 h-16 mx-auto text-clay opacity-40" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
//           </svg>
//         </div>
        
//         <h3 className="font-serif text-4xl md:text-5xl text-rice-paper mb-6 italic">
//           Receive Stories in Clay
//         </h3>
        
//         <p className="text-stone text-lg mb-10 leading-relaxed">
//           Monthly reflections on craft, culture, and the philosophy<br className="hidden md:block" />
//           behind handmade objects
//         </p>
        
//         <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
//           <input 
//             type="email" 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Your email address"
//             className="flex-1 px-6 py-4 bg-charcoal-light border border-border-subtle rounded-full text-rice-paper placeholder-stone-warm focus:outline-none focus:border-clay transition-colors"
//           />
//           <button 
//             onClick={handleSubscribe}
//             className="px-8 py-4 bg-clay text-white rounded-full hover:bg-clay-muted transition-colors duration-300 whitespace-nowrap"
//           >
//             Subscribe
//           </button>
//         </div>
        
//         <p className="text-stone-warm text-sm mt-6">
//           No spam. Unsubscribe anytime. Your email stays with us.
//         </p>
//       </div>
//     </section>
//   );
// }

// // Main Journal Component
// export default function Journal() {
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [filteredEntries, setFilteredEntries] = useState(journalEntries);

//   useEffect(() => {
//     if (activeCategory === 'all') {
//       setFilteredEntries(journalEntries);
//     } else {
//       setFilteredEntries(journalEntries.filter(entry => entry.category === activeCategory));
//     }
//   }, [activeCategory]);

//   return (
//     <div className="bg-charcoal min-h-screen flex flex-col">
//       {/* HEADER INSERTED HERE */}
//       <Header />
      
//       <main className="flex-grow">
//         <JournalHero />
        
//         <CategoryFilter 
//           activeCategory={activeCategory} 
//           onCategoryChange={setActiveCategory} 
//         />
        
//         <div className="relative">
//           {filteredEntries.map((entry, index) => (
//             <div key={entry.id}>
//               {entry.layout === 'full-bleed' && <FullBleedEntry entry={entry} index={index} />}
//               {(entry.layout === 'image-left' || entry.layout === 'image-right') && (
//                 <SplitEntry entry={entry} index={index} />
//               )}
//               {entry.layout === 'split' && <SplitEntry entry={entry} index={index} />}
              
//               {index < filteredEntries.length - 1 && <StoryDivider index={index} />}
//             </div>
//           ))}
//         </div>
        
//         <NewsletterSection />
//       </main>

//       {/* FOOTER INSERTED HERE */}
//       <Footer />
//     </div>
//   );
// }

"use client";
import { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


// Mock Journal Data
const journalEntries = [
  {
    id: 1,
    category: 'philosophy',
    title: 'Wabi-Sabi: Finding Beauty in Imperfection',
    subtitle: 'The cracks in pottery tell stories glaze cannot',
    author: 'Shivangi',
    date: 'December 2024',
    readTime: '8 min',
    excerpt: 'In Japanese aesthetics, perfection is found not in symmetry, but in the weathered, the humble, the incomplete. Each crack in kintsugi becomes a golden vein of history.',
    content: 'Wabi-sabi is the Japanese art of finding beauty in imperfection and profundity in nature. It accepts the natural cycle of growth, decay, and death. A philosophy that teaches us to see beauty not in spite of flaws, but because of them.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1200&h=800&fit=crop',
    layout: 'full-bleed',
    tags: ['wabi-sabi', 'philosophy', 'aesthetics']
  },
  {
    id: 2,
    category: 'craft',
    title: 'The Language of Clay',
    subtitle: 'How earth speaks through our hands',
    author: 'Shivangi',
    date: 'November 2024',
    readTime: '6 min',
    excerpt: 'Clay remembers every touch. The pressure of fingers, the speed of the wheel, the temperature of the kiln—each leaves an indelible mark on the final form.',
    content: 'Working with clay is a dialogue. You propose a shape; the clay responds with its own wisdom. Too fast and it collapses. Too timid and it lacks presence. The potter learns to listen.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=800&fit=crop',
    layout: 'image-left',
    tags: ['pottery', 'craft', 'process']
  },
  {
    id: 3,
    category: 'culture',
    title: 'Cha no Yu: The Way of Tea',
    subtitle: 'Ceremony as meditation in motion',
    author: 'Shivangi',
    date: 'October 2024',
    readTime: '10 min',
    excerpt: 'Every gesture in the tea ceremony is intentional. The rotation of the bowl, the angle of the whisk, the silence between movements—all become a form of meditation.',
    content: 'The Japanese tea ceremony is not about drinking tea—it is about creating a moment of perfect harmony between host and guest, between human and nature, between form and spirit.',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1200&h=800&fit=crop',
    layout: 'image-right',
    tags: ['tea', 'ceremony', 'culture']
  },
  {
    id: 4,
    category: 'studio',
    title: 'Morning Rituals in the Studio',
    subtitle: 'How intention shapes the day',
    author: 'Shivangi',
    date: 'September 2024',
    readTime: '5 min',
    excerpt: 'Before the wheel spins, before clay meets water, there is stillness. The studio in dawn light holds a sacred quiet that shapes every piece made that day.',
    content: 'Each morning begins the same way: sweeping the studio floor, arranging tools, centering myself before centering clay. These rituals are not preparation—they are the work itself.',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&h=800&fit=crop',
    layout: 'split',
    tags: ['studio', 'ritual', 'process']
  },
  {
    id: 5,
    category: 'philosophy',
    title: 'Mono no Aware: The Pathos of Things',
    subtitle: 'Embracing transience and beauty',
    author: 'Shivangi',
    date: 'August 2024',
    readTime: '7 min',
    excerpt: 'The cherry blossoms are most beautiful because they fall. Their ephemeral nature intensifies their beauty. So too with handmade objects—their impermanence makes them precious.',
    content: 'Mono no aware teaches us to find beauty in the fleeting, the temporary, the seasonal. It is the gentle sadness of watching petals fall, knowing they will return. Each bowl carries this same truth.',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&h=800&fit=crop',
    layout: 'full-bleed',
    tags: ['philosophy', 'transience', 'beauty']
  },
  {
    id: 6,
    category: 'craft',
    title: 'Fire and Transformation',
    subtitle: 'Inside the kiln\'s alchemy',
    author: 'Shivangi',
    date: 'July 2024',
    readTime: '9 min',
    excerpt: 'At 1,200 degrees, clay becomes something else entirely. The kiln is not just heat—it is transformation, mystery, and surrender. What emerges is always a surprise.',
    content: 'The firing process is where the potter relinquishes control. We can shape, glaze, and prepare, but the fire makes the final decision. This is the ultimate lesson in letting go.',
    image: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=1200&h=800&fit=crop',
    layout: 'image-right',
    tags: ['firing', 'kiln', 'transformation']
  }
];

const categories = ['all', 'philosophy', 'craft', 'culture', 'studio'];

// Intersection Observer Hook
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isInView];
}

// Enhanced Hero Section
function JournalHero() {
  const [heroRef, heroInView] = useInView();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // New state to hold stable random values
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles only on the client side
    const newParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 8}s`,
      animationDelay: `${Math.random() * 5}s`
    }));
    setParticles(newParticles);
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian"
    >
      {/* Animated Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* Primary Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1615485500834-bc10199bc759?w=1920&h=1080&fit=crop&q=80)',
            transform: heroInView 
              ? `scale(1) translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` 
              : 'scale(1.15)',
            transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-obsidian/90 via-charcoal/70 to-obsidian/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
        
        {/* Radial Glow */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(166, 93, 61, 0.15) 0%, transparent 60%)'
          }}
        />
        
        {/* Film Grain Texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=)',
            animation: 'grainShift 8s steps(10) infinite'
          }}
        />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((style, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-clay/20 rounded-full"
              style={{
                left: style.left,
                top: style.top,
                animation: `float ${style.animationDuration} ease-in-out ${style.animationDelay} infinite`,
                animationDelay: style.animationDelay
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Top Label */}
        <div 
          className={`mb-8 flex items-center justify-center gap-4 transition-all duration-1000 delay-100 ${
            heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-clay to-clay" />
          <span className="text-clay text-xs md:text-sm tracking-[0.35em] uppercase font-medium">
            Journal
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent via-clay to-clay" />
        </div>
        
        {/* Main Heading */}
        <div 
          className={`transition-all duration-1000 delay-300 ${
            heroInView 
              ? 'opacity-100 translate-y-0 blur-0' 
              : 'opacity-0 translate-y-16 blur-sm'
          }`}
        >
          <h1 className="font-serif text-7xl md:text-9xl lg:text-[10rem] mb-6 text-rice-paper leading-[0.9] italic tracking-tight">
            Stories
            <br />
            <span className="relative inline-block">
              in Clay
              <div className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-clay/40 to-transparent" />
            </span>
          </h1>
        </div>
        
        {/* Subtitle */}
        <div 
          className={`transition-all duration-1000 delay-500 ${
            heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <p className="text-stone text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Reflections on craft, culture, and the quiet philosophy
            <br className="hidden md:block" />
            that shapes our work at Basho
          </p>
        </div>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-700 ${
            heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button className="group relative px-8 py-4 bg-clay text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-clay/30 hover:scale-105">
            <span className="relative z-10 tracking-wider uppercase text-sm font-medium flex items-center gap-2">
              Explore Stories
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-clay-muted to-clay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
          
          <button className="group px-8 py-4 bg-transparent text-rice-paper border border-rice-paper/30 rounded-full hover:border-clay hover:text-clay transition-all duration-300">
            <span className="tracking-wider uppercase text-sm font-medium flex items-center gap-2">
              About the Journal
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent pointer-events-none" />
    </section>
  );
}


// Category Filter
function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="sticky top-0 z-40 bg-charcoal/95 backdrop-blur-xl border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-6 py-2.5 rounded-full text-sm tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-clay text-white shadow-lg shadow-clay/20' 
                  : 'bg-charcoal-light text-stone-warm hover:text-rice-paper hover:bg-charcoal-light/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Full Bleed Entry
function FullBleedEntry({ entry, index }) {
  const [ref, inView] = useInView();
  
  return (
    <article 
      ref={ref}
      className={`relative min-h-screen flex items-center transition-all duration-1000 ${
        inView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms]"
          style={{
            backgroundImage: `url(${entry.image})`,
            transform: inView ? 'scale(1)' : 'scale(1.05)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/40" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div 
          className={`transition-all duration-1000 delay-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 bg-clay/20 backdrop-blur-sm border border-clay/30 rounded-full text-clay text-xs tracking-widest uppercase mb-6">
            {entry.category}
          </span>
          
          <h2 className="font-serif text-5xl md:text-7xl text-rice-paper mb-6 leading-tight italic">
            {entry.title}
          </h2>
          
          <p className="text-2xl md:text-3xl text-stone-warm mb-8 font-light leading-relaxed">
            {entry.subtitle}
          </p>
          
          <p className="text-lg text-stone max-w-2xl mb-10 leading-relaxed">
            {entry.excerpt}
          </p>
          
          <div className="flex items-center gap-6 text-sm text-stone-warm mb-8">
            <span>{entry.author}</span>
            <span className="w-1 h-1 rounded-full bg-stone-warm" />
            <span>{entry.date}</span>
            <span className="w-1 h-1 rounded-full bg-stone-warm" />
            <span>{entry.readTime} read</span>
          </div>
          
          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-rice-paper text-obsidian rounded-full hover:bg-clay hover:text-white transition-all duration-300">
            <span className="tracking-wider uppercase text-sm font-medium">Read Story</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

// Split Entry
function SplitEntry({ entry, index }) {
  const [ref, inView] = useInView();
  const isImageLeft = entry.layout === 'image-left';
  
  return (
    <article 
      ref={ref}
      className={`grid md:grid-cols-2 gap-0 min-h-screen transition-all duration-1000 ${
        inView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div 
        className={`relative overflow-hidden ${isImageLeft ? 'md:order-1' : 'md:order-2'}`}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms]"
          style={{
            backgroundImage: `url(${entry.image})`,
            transform: inView ? 'scale(1)' : 'scale(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-obsidian/20" />
      </div>

      <div 
        className={`flex items-center px-8 md:px-16 py-16 bg-charcoal-light ${
          isImageLeft ? 'md:order-2' : 'md:order-1'
        }`}
      >
        <div 
          className={`transition-all duration-1000 delay-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 bg-clay/10 border border-clay/30 rounded-full text-clay text-xs tracking-widest uppercase mb-6">
            {entry.category}
          </span>
          
          <h2 className="font-serif text-4xl md:text-5xl text-rice-paper mb-4 leading-tight">
            {entry.title}
          </h2>
          
          <p className="text-xl text-stone-warm mb-6 font-light italic">
            {entry.subtitle}
          </p>
          
          <p className="text-stone leading-relaxed mb-8">
            {entry.excerpt}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-stone-warm mb-8">
            <span>{entry.date}</span>
            <span className="w-1 h-1 rounded-full bg-stone-warm" />
            <span>{entry.readTime}</span>
          </div>
          
          <button className="group inline-flex items-center gap-2 text-clay hover:text-rice-paper transition-colors duration-300">
            <span className="tracking-wider uppercase text-sm">Continue Reading</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

// Story Divider
function StoryDivider({ index }) {
  const [ref, inView] = useInView();
  
  return (
    <div 
      ref={ref}
      className="relative py-20 flex items-center justify-center"
    >
      <div 
        className={`flex items-center gap-4 transition-all duration-1000 ${
          inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-clay to-transparent" />
        <div className="w-2 h-2 rounded-full bg-clay" />
        <div className="h-px w-20 bg-gradient-to-l from-transparent via-clay to-transparent" />
      </div>
    </div>
  );
}

// Newsletter Section
function NewsletterSection() {
  const [ref, inView] = useInView();
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribe:', email);
    setEmail('');
  };
  
  return (
    <section 
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal-light to-charcoal" />
      
      <div 
        className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mb-8">
          <svg className="w-16 h-16 mx-auto text-clay opacity-40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </div>
        
        <h3 className="font-serif text-4xl md:text-5xl text-rice-paper mb-6 italic">
          Receive Stories in Clay
        </h3>
        
        <p className="text-stone text-lg mb-10 leading-relaxed">
          Monthly reflections on craft, culture, and the philosophy<br className="hidden md:block" />
          behind handmade objects
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-6 py-4 bg-charcoal-light border border-border-subtle rounded-full text-rice-paper placeholder-stone-warm focus:outline-none focus:border-clay transition-colors"
          />
          <button 
            onClick={handleSubscribe}
            className="px-8 py-4 bg-clay text-white rounded-full hover:bg-clay-muted transition-colors duration-300 whitespace-nowrap"
          >
            Subscribe
          </button>
        </div>
        
        <p className="text-stone-warm text-sm mt-6">
          No spam. Unsubscribe anytime. Your email stays with us.
        </p>
      </div>
    </section>
  );
}

// Main Journal Component
export default function Journal() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredEntries, setFilteredEntries] = useState(journalEntries);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredEntries(journalEntries);
    } else {
      setFilteredEntries(journalEntries.filter(entry => entry.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="bg-charcoal min-h-screen flex flex-col">
      {/* HEADER INSERTED HERE */}
      <Header />
      
      <main className="flex-grow">
        <JournalHero />
        
        <CategoryFilter 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
        
        <div className="relative">
          {filteredEntries.map((entry, index) => (
            // [!code ++] ADDED ID HERE: `post-${entry.id}` maps to the Home page link
            <div key={entry.id} id={`post-${entry.id}`} className="scroll-mt-32">
              {entry.layout === 'full-bleed' && <FullBleedEntry entry={entry} index={index} />}
              {(entry.layout === 'image-left' || entry.layout === 'image-right') && (
                <SplitEntry entry={entry} index={index} />
              )}
              {entry.layout === 'split' && <SplitEntry entry={entry} index={index} />}
              
              {index < filteredEntries.length - 1 && <StoryDivider index={index} />}
            </div>
          ))}
        </div>
        
        <NewsletterSection />
      </main>

      {/* FOOTER INSERTED HERE */}
      <Footer />
    </div>
  );
}
