// // // // // // "use client";

// // // // // // import { useState } from "react";

// // // // // // // ✅ RELATIVE COMPONENT IMPORTS
// // // // // // import Header from "../../components/Header";
// // // // // // import Footer from "../../components/Footer";

// // // // // // // Icons
// // // // // // import {
// // // // // //   MapPin,
// // // // // //   Calendar,
// // // // // //   ArrowRight,
// // // // // //   Mail,
// // // // // //   Globe,
// // // // // //   Store,
// // // // // //   Eye,
// // // // // // } from "lucide-react";

// // // // // // // ✅ RELATIVE IMAGE IMPORTS
// // // // // // import heroStudio from "../../assets/hero-studio.jpg";
// // // // // // import eventHands from "../../assets/event-hands.jpg";
// // // // // // import eventGallery from "../../assets/event-gallery.jpg";

// // // // // // import archiveTea from "../../assets/archive-tea.jpg";
// // // // // // import archiveBowls from "../../assets/archive-bowls.jpg";
// // // // // // import archiveTexture from "../../assets/archive-texture.jpg";
// // // // // // import archiveMarket from "../../assets/archive-market.jpg";

// // // // // // import galleryTools from "../../assets/gallery-tools.jpg";
// // // // // // import galleryVase from "../../assets/gallery-vase.jpg";
// // // // // // import galleryMugs from "../../assets/gallery-mugs.jpg";
// // // // // // import galleryPeople from "../../assets/gallery-people.jpg";
// // // // // // import gallerySculpture from "../../assets/gallery-sculpture.jpg";

// // // // // // export default function WorkshopsPage() {
// // // // // //   const [email, setEmail] = useState("");

// // // // // //   const upcomingEvents = [
// // // // // //     {
// // // // // //       id: 1,
// // // // // //       date: "Oct 12-14",
// // // // // //       type: "Symposium",
// // // // // //       typeIcon: Globe,
// // // // // //       title: "Tokyo Clay Symposium",
// // // // // //       description:
// // // // // //         "Join us for a three-day intensive symposium featuring master potters from across Japan.",
// // // // // //       location: "Shibuya, Tokyo",
// // // // // //       price: "Starting from ¥5,000",
// // // // // //       cta: "RSVP Now",
// // // // // //       image: eventHands,
// // // // // //     },
// // // // // //     {
// // // // // //       id: 2,
// // // // // //       date: "Nov 05-07",
// // // // // //       type: "Pop-up Store",
// // // // // //       typeIcon: Store,
// // // // // //       title: "London Craft Week Pop-up",
// // // // // //       description:
// // // // // //         "Experience our latest autumn collection in the heart of Shoreditch.",
// // // // // //       location: "Shoreditch, London",
// // // // // //       price: "Free Entry",
// // // // // //       cta: "Get Tickets",
// // // // // //       image: eventGallery,
// // // // // //     },
// // // // // //   ];

// // // // // //   const galleryImages = [
// // // // // //     { src: galleryTools, alt: "Pottery tools" },
// // // // // //     { src: galleryVase, alt: "Ceramic vase" },
// // // // // //     { src: eventHands, alt: "Wheel throwing" },
// // // // // //     { src: galleryMugs, alt: "Ceramic mugs" },
// // // // // //     { src: galleryPeople, alt: "Gallery opening" },
// // // // // //     { src: gallerySculpture, alt: "Glaze texture" },
// // // // // //   ];

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-charcoal text-rice-paper">
// // // // // //       <Header />

// // // // // //       {/* Offset for fixed header */}
// // // // // //       <main className="pt-32">
// // // // // //         {/* HERO */}
// // // // // //         <section className="px-6 lg:px-40 py-10">
// // // // // //           <div
// // // // // //             className="rounded-2xl min-h-[520px] flex items-center justify-center text-center bg-cover bg-center"
// // // // // //             style={{
// // // // // //               backgroundImage: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.7)), url(${heroStudio})`,
// // // // // //             }}
// // // // // //           >
// // // // // //             <div className="max-w-2xl space-y-6">
// // // // // //               <span className="uppercase tracking-widest text-xs text-clay">
// // // // // //                 Workshops & Exhibitions
// // // // // //               </span>
// // // // // //               <h1 className="text-5xl md:text-7xl font-serif font-bold">
// // // // // //                 Basho On Tour
// // // // // //               </h1>
// // // // // //               <p className="text-stone-warm text-lg">
// // // // // //                 Experience handcrafted pottery through immersive workshops and
// // // // // //                 exhibitions.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* UPCOMING EVENTS */}
// // // // // //         <section className="px-6 lg:px-40 py-16">
// // // // // //           <div className="max-w-5xl mx-auto space-y-10">
// // // // // //             <h2 className="text-3xl font-serif">Upcoming Events</h2>

// // // // // //             {upcomingEvents.map((event) => (
// // // // // //               <div
// // // // // //                 key={event.id}
// // // // // //                 className="flex flex-col md:flex-row gap-6 border border-border-subtle p-4"
// // // // // //               >
// // // // // //                 <div
// // // // // //                   className="md:w-1/3 h-48 bg-cover bg-center"
// // // // // //                   style={{ backgroundImage: `url(${event.image})` }}
// // // // // //                 />

// // // // // //                 <div className="flex-1 space-y-3">
// // // // // //                   <div className="flex items-center gap-2 text-clay text-xs uppercase">
// // // // // //                     <event.typeIcon size={16} />
// // // // // //                     {event.type}
// // // // // //                   </div>

// // // // // //                   <h3 className="text-2xl font-serif">{event.title}</h3>

// // // // // //                   <p className="text-stone-warm">{event.description}</p>

// // // // // //                   <div className="flex items-center gap-2 text-sm text-stone-warm">
// // // // // //                     <MapPin size={14} />
// // // // // //                     {event.location}
// // // // // //                   </div>

// // // // // //                   <div className="flex justify-between items-center pt-4">
// // // // // //                     <span>{event.price}</span>
// // // // // //                     <button className="flex items-center gap-2 bg-clay text-white px-5 py-2 text-sm">
// // // // // //                       <Calendar size={16} />
// // // // // //                       {event.cta}
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* GALLERY */}
// // // // // //         <section className="px-6 lg:px-40 py-16">
// // // // // //           <h2 className="text-2xl font-serif mb-8">Event Gallery</h2>
// // // // // //           <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
// // // // // //             {galleryImages.map((img, i) => (
// // // // // //               <div key={i} className="mb-4 overflow-hidden">
// // // // // //                 <img
// // // // // //                   src={img.src}
// // // // // //                   alt={img.alt}
// // // // // //                   className="w-full hover:scale-110 transition-transform duration-500"
// // // // // //                 />
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* NEWSLETTER */}
// // // // // //         <section className="px-6 lg:px-40 py-20 border-t border-border-subtle">
// // // // // //           <div className="max-w-xl mx-auto text-center space-y-6">
// // // // // //             <Mail className="mx-auto text-clay" />
// // // // // //             <h2 className="text-3xl font-serif">Join the Guest List</h2>
// // // // // //             <p className="text-stone-warm">
// // // // // //               Be the first to know about upcoming workshops.
// // // // // //             </p>

// // // // // //             <div className="flex gap-3">
// // // // // //               <input
// // // // // //                 className="flex-1 bg-transparent border border-border-subtle px-4 py-3"
// // // // // //                 placeholder="Your email"
// // // // // //                 value={email}
// // // // // //                 onChange={(e) => setEmail(e.target.value)}
// // // // // //               />
// // // // // //               <button className="bg-clay text-white px-6">Sign Up</button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>
// // // // // //       </main>

// // // // // //       <Footer />
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // "use client";

// // // // // // import { useState } from "react";

// // // // // // // Components
// // // // // // import Header from "../../components/Header";
// // // // // // import Footer from "../../components/Footer";

// // // // // // // Icons
// // // // // // import {
// // // // // //   MapPin,
// // // // // //   Calendar,
// // // // // //   Mail,
// // // // // //   Globe,
// // // // // //   Store,
// // // // // // } from "lucide-react";

// // // // // // // Images (imported as objects)
// // // // // // import heroStudio from "../../assets/hero-studio.jpg";
// // // // // // import eventHands from "../../assets/event-hands.jpg";
// // // // // // import eventGallery from "../../assets/event-gallery.jpg";

// // // // // // import galleryTools from "../../assets/gallery-tools.jpg";
// // // // // // import galleryVase from "../../assets/gallery-vase.jpg";
// // // // // // import galleryMugs from "../../assets/gallery-mugs.jpg";
// // // // // // import galleryPeople from "../../assets/gallery-people.jpg";
// // // // // // import gallerySculpture from "../../assets/gallery-sculpture.jpg";

// // // // // // export default function WorkshopsPage() {
// // // // // //   const [email, setEmail] = useState("");

// // // // // //   const upcomingEvents = [
// // // // // //     {
// // // // // //       id: 1,
// // // // // //       date: "Oct 12–14",
// // // // // //       type: "Symposium",
// // // // // //       typeIcon: Globe,
// // // // // //       title: "Tokyo Clay Symposium",
// // // // // //       description:
// // // // // //         "Join us for a three-day intensive symposium featuring master potters from across Japan.",
// // // // // //       location: "Shibuya, Tokyo",
// // // // // //       price: "Starting from ¥5,000",
// // // // // //       cta: "RSVP Now",
// // // // // //       image: eventHands.src, // ✅ FIXED
// // // // // //     },
// // // // // //     {
// // // // // //       id: 2,
// // // // // //       date: "Nov 05–07",
// // // // // //       type: "Pop-up Store",
// // // // // //       typeIcon: Store,
// // // // // //       title: "London Craft Week Pop-up",
// // // // // //       description:
// // // // // //         "Experience our latest autumn collection ini kun Shoreditch.",
// // // // // //       location: "Shoreditch, London",
// // // // // //       price: "Free Entry",
// // // // // //       cta: "Get Tickets",
// // // // // //       image: eventGallery.src, // ✅ FIXED
// // // // // //     },
// // // // // //   ];

// // // // // //   // ✅ FIXED: store `.src` directly
// // // // // //   const galleryImages = [
// // // // // //     { src: galleryTools.src, alt: "Pottery tools" },
// // // // // //     { src: galleryVase.src, alt: "Ceramic vase" },
// // // // // //     { src: eventHands.src, alt: "Wheel throwing" },
// // // // // //     { src: galleryMugs.src, alt: "Ceramic mugs" },
// // // // // //     { src: galleryPeople.src, alt: "Gallery opening" },
// // // // // //     { src: gallerySculpture.src, alt: "Glaze texture" },
// // // // // //   ];

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-charcoal text-rice-paper">
// // // // // //       <Header />

// // // // // //       {/* Offset for fixed header */}
// // // // // //       <main className="pt-32">
// // // // // //         {/* HERO */}
// // // // // //         <section className="px-6 lg:px-40 py-10">
// // // // // //           <div
// // // // // //             className="rounded-2xl min-h-[520px] flex items-center justify-center text-center bg-cover bg-center"
// // // // // //             style={{
// // // // // //               backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.7)), url(${heroStudio.src})`,
// // // // // //             }}
// // // // // //           >
// // // // // //             <div className="max-w-2xl space-y-6">
// // // // // //               <span className="uppercase tracking-widest text-xs text-clay">
// // // // // //                 Workshops & Exhibitions
// // // // // //               </span>
// // // // // //               <h1 className="text-5xl md:text-7xl font-serif font-bold">
// // // // // //                 Basho On Tour
// // // // // //               </h1>
// // // // // //               <p className="text-stone-warm text-lg">
// // // // // //                 Experience handcrafted pottery through immersive workshops and
// // // // // //                 exhibitions.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* UPCOMING EVENTS */}
// // // // // //         <section className="px-6 lg:px-40 py-16">
// // // // // //           <div className="max-w-5xl mx-auto space-y-10">
// // // // // //             <h2 className="text-3xl font-serif">Upcoming Events</h2>

// // // // // //             {upcomingEvents.map((event) => (
// // // // // //               <div
// // // // // //                 key={event.id}
// // // // // //                 className="flex flex-col md:flex-row gap-6 border border-border-subtle p-4"
// // // // // //               >
// // // // // //                 <div
// // // // // //                   className="md:w-1/3 h-48 bg-cover bg-center"
// // // // // //                   style={{ backgroundImage: `url(${event.image})` }}
// // // // // //                 />

// // // // // //                 <div className="flex-1 space-y-3">
// // // // // //                   <div className="flex items-center gap-2 text-clay text-xs uppercase">
// // // // // //                     <event.typeIcon size={16} />
// // // // // //                     {event.type}
// // // // // //                   </div>

// // // // // //                   <h3 className="text-2xl font-serif">{event.title}</h3>

// // // // // //                   <p className="text-stone-warm">{event.description}</p>

// // // // // //                   <div className="flex items-center gap-2 text-sm text-stone-warm">
// // // // // //                     <MapPin size={14} />
// // // // // //                     {event.location}
// // // // // //                   </div>

// // // // // //                   <div className="flex justify-between items-center pt-4">
// // // // // //                     <span>{event.price}</span>
// // // // // //                     <button className="flex items-center gap-2 bg-clay text-white px-5 py-2 text-sm">
// // // // // //                       <Calendar size={16} />
// // // // // //                       {event.cta}
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* GALLERY */}
// // // // // //         <section className="px-6 lg:px-40 py-16">
// // // // // //           <h2 className="text-2xl font-serif mb-8">Event Gallery</h2>
// // // // // //           <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
// // // // // //             {galleryImages.map((img, i) => (
// // // // // //               <div key={i} className="mb-4 overflow-hidden">
// // // // // //                 <img
// // // // // //                   src={img.src}
// // // // // //                   alt={img.alt}
// // // // // //                   className="w-full hover:scale-110 transition-transform duration-500"
// // // // // //                 />
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* NEWSLETTER */}
// // // // // //         <section className="px-6 lg:px-40 py-20 border-t border-border-subtle">
// // // // // //           <div className="max-w-xl mx-auto text-center space-y-6">
// // // // // //             <Mail className="mx-auto text-clay" />
// // // // // //             <h2 className="text-3xl font-serif">Join the Guest List</h2>
// // // // // //             <p className="text-stone-warm">
// // // // // //               Be the first to know about upcoming workshops.
// // // // // //             </p>

// // // // // //             <div className="flex gap-3">
// // // // // //               <input
// // // // // //                 className="flex-1 bg-transparent border border-border-subtle px-4 py-3"
// // // // // //                 placeholder="Your email"
// // // // // //                 value={email}
// // // // // //                 onChange={(e) => setEmail(e.target.value)}
// // // // // //               />
// // // // // //               <button className="bg-clay text-white px-6">Sign Up</button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>
// // // // // //       </main>

// // // // // //       <Footer />
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // "use client";

// // // // // // import { useState } from "react";

// // // // // // // Components
// // // // // // import Header from "../../components/Header";
// // // // // // import Footer from "../../components/Footer";

// // // // // // // Icons
// // // // // // import {
// // // // // //   MapPin,
// // // // // //   Calendar,
// // // // // //   Mail,
// // // // // //   Globe,
// // // // // //   Store,
// // // // // //   Eye,
// // // // // // } from "lucide-react";

// // // // // // // Images
// // // // // // import heroStudio from "../../assets/hero-studio.jpg";
// // // // // // import eventHands from "../../assets/event-hands.jpg";
// // // // // // import eventGallery from "../../assets/event-gallery.jpg";

// // // // // // import galleryTools from "../../assets/gallery-tools.jpg";
// // // // // // import galleryVase from "../../assets/gallery-vase.jpg";
// // // // // // import galleryMugs from "../../assets/gallery-mugs.jpg";
// // // // // // import galleryPeople from "../../assets/gallery-people.jpg";
// // // // // // import gallerySculpture from "../../assets/gallery-sculpture.jpg";

// // // // // // export default function WorkshopsPage() {
// // // // // //   const [email, setEmail] = useState("");

// // // // // //   const upcomingEvents = [
// // // // // //     {
// // // // // //       id: 1,
// // // // // //       date: "Oct 12–14",
// // // // // //       type: "Symposium",
// // // // // //       typeIcon: Globe,
// // // // // //       title: "Tokyo Clay Symposium",
// // // // // //       description:
// // // // // //         "Join us for a three-day intensive symposium featuring master potters from across Japan.",
// // // // // //       location: "Shibuya, Tokyo",
// // // // // //       price: "Starting from ¥5,000",
// // // // // //       cta: "RSVP Now",
// // // // // //       image: eventHands.src,
// // // // // //     },
// // // // // //     {
// // // // // //       id: 2,
// // // // // //       date: "Nov 05–07",
// // // // // //       type: "Pop-up Store",
// // // // // //       typeIcon: Store,
// // // // // //       title: "London Craft Week Pop-up",
// // // // // //       description:
// // // // // //         "Experience our latest autumn collection in the heart of Shoreditch.",
// // // // // //       location: "Shoreditch, London",
// // // // // //       price: "Free Entry",
// // // // // //       cta: "Get Tickets",
// // // // // //       image: eventGallery.src,
// // // // // //     },
// // // // // //   ];

// // // // // //   const galleryImages = [
// // // // // //     { src: galleryTools.src, alt: "Pottery tools" },
// // // // // //     { src: galleryVase.src, alt: "Ceramic vase" },
// // // // // //     { src: eventHands.src, alt: "Wheel throwing" },
// // // // // //     { src: galleryMugs.src, alt: "Ceramic mugs" },
// // // // // //     { src: galleryPeople.src, alt: "Gallery opening" },
// // // // // //     { src: gallerySculpture.src, alt: "Glaze texture" },
// // // // // //   ];

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-charcoal text-rice-paper">
// // // // // //       <Header />

// // // // // //       <main className="pt-32">
// // // // // //         {/* HERO */}
// // // // // //         <section className="px-6 lg:px-40 py-10">
// // // // // //           <div
// // // // // //             className="rounded-2xl min-h-[520px] flex items-center justify-center text-center bg-cover bg-center"
// // // // // //             style={{
// // // // // //               backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.75)), url(${heroStudio.src})`,
// // // // // //             }}
// // // // // //           >
// // // // // //             <div className="max-w-2xl space-y-6">
// // // // // //               <span className="uppercase tracking-widest text-xs text-clay">
// // // // // //                 Workshops & Exhibitions
// // // // // //               </span>
// // // // // //               <h1 className="text-5xl md:text-7xl font-serif font-bold">
// // // // // //                 Basho On Tour
// // // // // //               </h1>
// // // // // //               <p className="text-stone-warm text-lg">
// // // // // //                 Experience handcrafted pottery through immersive workshops and
// // // // // //                 exhibitions.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* UPCOMING EVENTS */}
// // // // // //         <section className="px-6 lg:px-40 py-16">
// // // // // //           <div className="max-w-5xl mx-auto space-y-10">
// // // // // //             <h2 className="text-3xl font-serif">Upcoming Events</h2>

// // // // // //             {upcomingEvents.map((event) => (
// // // // // //               <div
// // // // // //                 key={event.id}
// // // // // //                 className="flex flex-col md:flex-row gap-6 border border-border-subtle p-4"
// // // // // //               >
// // // // // //                 {/* Image with hover hinder */}
// // // // // //                 <div className="md:w-1/3 h-48 relative overflow-hidden group cursor-pointer">
// // // // // //                   <div
// // // // // //                     className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
// // // // // //                     style={{ backgroundImage: `url(${event.image})` }}
// // // // // //                   />
// // // // // //                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
// // // // // //                     <Eye className="w-6 h-6 text-white" />
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 <div className="flex-1 space-y-3">
// // // // // //                   <div className="flex items-center gap-2 text-clay text-xs uppercase">
// // // // // //                     <event.typeIcon size={16} />
// // // // // //                     {event.type}
// // // // // //                   </div>

// // // // // //                   <h3 className="text-2xl font-serif">{event.title}</h3>

// // // // // //                   <p className="text-stone-warm">{event.description}</p>

// // // // // //                   <div className="flex items-center gap-2 text-sm text-stone-warm">
// // // // // //                     <MapPin size={14} />
// // // // // //                     {event.location}
// // // // // //                   </div>

// // // // // //                   <div className="flex justify-between items-center pt-4">
// // // // // //                     <span>{event.price}</span>
// // // // // //                     <button className="flex items-center gap-2 bg-clay text-white px-5 py-2 text-sm">
// // // // // //                       <Calendar size={16} />
// // // // // //                       {event.cta}
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* GALLERY */}
// // // // // //         <section className="px-6 lg:px-40 py-16">
// // // // // //           <h2 className="text-2xl font-serif mb-8">Event Gallery</h2>
// // // // // //           <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
// // // // // //             {galleryImages.map((img, i) => (
// // // // // //               <div
// // // // // //                 key={i}
// // // // // //                 className="relative overflow-hidden mb-4 group cursor-pointer"
// // // // // //               >
// // // // // //                 <img
// // // // // //                   src={img.src}
// // // // // //                   alt={img.alt}
// // // // // //                   className="w-full transition-transform duration-700 group-hover:scale-110"
// // // // // //                 />
// // // // // //                 <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
// // // // // //                   <Eye className="w-6 h-6 text-white" />
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* NEWSLETTER */}
// // // // // //         <section className="px-6 lg:px-40 py-20 border-t border-border-subtle">
// // // // // //           <div className="max-w-xl mx-auto text-center space-y-6">
// // // // // //             <Mail className="mx-auto text-clay" />
// // // // // //             <h2 className="text-3xl font-serif">Join the Guest List</h2>
// // // // // //             <p className="text-stone-warm">
// // // // // //               Be the first to know about upcoming workshops.
// // // // // //             </p>

// // // // // //             <div className="flex gap-3">
// // // // // //               <input
// // // // // //                 className="flex-1 bg-transparent border border-border-subtle px-4 py-3"
// // // // // //                 placeholder="Your email"
// // // // // //                 value={email}
// // // // // //                 onChange={(e) => setEmail(e.target.value)}
// // // // // //               />
// // // // // //               <button className="bg-clay text-white px-6">Sign Up</button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>
// // // // // //       </main>

// // // // // //       <Footer />
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // "use client";

// // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // import Header from "../../components/Header";
// // // // // // import Footer from "../../components/Footer";

// // // // // // // Icons
// // // // // // import {
// // // // // //   MapPin,
// // // // // //   Calendar,
// // // // // //   Mail,
// // // // // //   Globe,
// // // // // //   Store,
// // // // // //   Eye,
// // // // // // } from "lucide-react";

// // // // // // // Images
// // // // // // import heroStudio from "../../assets/hero-studio.jpg";
// // // // // // import eventHands from "../../assets/event-hands.jpg";
// // // // // // import eventGallery from "../../assets/event-gallery.jpg";
// // // // // // import galleryTools from "../../assets/gallery-tools.jpg";
// // // // // // import galleryVase from "../../assets/gallery-vase.jpg";
// // // // // // import galleryMugs from "../../assets/gallery-mugs.jpg";
// // // // // // import galleryPeople from "../../assets/gallery-people.jpg";
// // // // // // import gallerySculpture from "../../assets/gallery-sculpture.jpg";

// // // // // // export default function WorkshopsPage() {
// // // // // //   const [email, setEmail] = useState("");
// // // // // //   const [isVisible, setIsVisible] = useState(false);
// // // // // //   const sectionRef = useRef(null);

// // // // // //   // Intersection Observer for Reveal Animations
// // // // // //   useEffect(() => {
// // // // // //     const observer = new IntersectionObserver(
// // // // // //       ([entry]) => {
// // // // // //         if (entry.isIntersecting) {
// // // // // //           setIsVisible(true);
// // // // // //         }
// // // // // //       },
// // // // // //       { threshold: 0.1 }
// // // // // //     );

// // // // // //     if (sectionRef.current) observer.observe(sectionRef.current);
// // // // // //     return () => {
// // // // // //       if (sectionRef.current) observer.unobserve(sectionRef.current);
// // // // // //     };
// // // // // //   }, []);

// // // // // //   const upcomingEvents = [
// // // // // //     {
// // // // // //       id: 1,
// // // // // //       date: "Oct 12–14",
// // // // // //       type: "Symposium",
// // // // // //       typeIcon: Globe,
// // // // // //       title: "Tokyo Clay Symposium",
// // // // // //       description: "Join us for a three-day intensive symposium featuring master potters from across Japan.",
// // // // // //       location: "Shibuya, Tokyo",
// // // // // //       price: "Starting from ¥5,000",
// // // // // //       cta: "RSVP Now",
// // // // // //       image: eventHands.src,
// // // // // //     },
// // // // // //     {
// // // // // //       id: 2,
// // // // // //       date: "Nov 05–07",
// // // // // //       type: "Pop-up Store",
// // // // // //       typeIcon: Store,
// // // // // //       title: "London Craft Week Pop-up",
// // // // // //       description: "Experience our latest autumn collection in the heart of Shoreditch.",
// // // // // //       location: "Shoreditch, London",
// // // // // //       price: "Free Entry",
// // // // // //       cta: "Get Tickets",
// // // // // //       image: eventGallery.src,
// // // // // //     },
// // // // // //   ];

// // // // // //   const galleryImages = [
// // // // // //     { src: galleryTools.src, alt: "Pottery tools" },
// // // // // //     { src: galleryVase.src, alt: "Ceramic vase" },
// // // // // //     { src: eventHands.src, alt: "Wheel throwing" },
// // // // // //     { src: galleryMugs.src, alt: "Ceramic mugs" },
// // // // // //     { src: galleryPeople.src, alt: "Gallery opening" },
// // // // // //     { src: gallerySculpture.src, alt: "Glaze texture" },
// // // // // //   ];

// // // // // //   return (
// // // // // //     <div className="relative min-h-screen bg-charcoal text-rice-paper flex flex-col overflow-hidden">
// // // // // //       <Header />

// // // // // //       {/* Background Textures (Shared with Products Page) */}
// // // // // //       <div className="fixed inset-0 opacity-[0.12] pointer-events-none z-0">
// // // // // //         <div 
// // // // // //           className="absolute inset-0 animate-grain-shift" 
// // // // // //           style={{ 
// // // // // //             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
// // // // // //             backgroundSize: '200px 200px'
// // // // // //           }}
// // // // // //         />
// // // // // //       </div>

// // // // // //       <main ref={sectionRef} className="relative z-10 pt-32 flex-grow">
// // // // // //         {/* HERO SECTION */}
// // // // // //         <section className="px-6 lg:px-40 py-10">
// // // // // //           <div
// // // // // //             className={`rounded-2xl min-h-[520px] flex items-center justify-center text-center bg-cover bg-center transition-all duration-1000 ease-out ${
// // // // // //               isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
// // // // // //             }`}
// // // // // //             style={{
// // // // // //               backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.75)), url(${heroStudio.src})`,
// // // // // //             }}
// // // // // //           >
// // // // // //             <div className="max-w-2xl space-y-6 p-8">
// // // // // //               <span className={`uppercase tracking-[0.3em] text-[10px] text-clay font-bold block transition-all duration-700 delay-300 ${
// // // // // //                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
// // // // // //               }`}>
// // // // // //                 Workshops & Exhibitions
// // // // // //               </span>
// // // // // //               <h1 className={`text-5xl md:text-7xl font-serif font-light tracking-tight transition-all duration-1000 delay-500 ${
// // // // // //                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
// // // // // //               }`}>
// // // // // //                 Basho On Tour
// // // // // //               </h1>
// // // // // //               <p className={`text-stone-warm text-lg md:text-xl font-light leading-relaxed transition-all duration-1000 delay-700 ${
// // // // // //                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
// // // // // //               }`}>
// // // // // //                 Experience handcrafted pottery through immersive workshops and exhibitions across the globe.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* UPCOMING EVENTS */}
// // // // // //         <section className="px-6 lg:px-40 py-16">
// // // // // //           <div className="max-w-5xl mx-auto space-y-10">
// // // // // //             <h2 className={`text-3xl font-serif transition-all duration-700 ${
// // // // // //               isVisible ? 'opacity-100' : 'opacity-0'
// // // // // //             }`}>
// // // // // //               Upcoming Events
// // // // // //             </h2>

// // // // // //             {upcomingEvents.map((event, index) => (
// // // // // //               <div
// // // // // //                 key={event.id}
// // // // // //                 className={`group flex flex-col md:flex-row gap-8 border border-border-subtle p-6 bg-charcoal-light transition-all duration-700 hover:border-clay/30 hover:-translate-y-1 ${
// // // // // //                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
// // // // // //                 }`}
// // // // // //                 style={{ transitionDelay: `${200 * index}ms` }}
// // // // // //               >
// // // // // //                 {/* Image Container with Product-style Zoom */}
// // // // // //                 <div className="md:w-1/3 h-56 relative overflow-hidden cursor-pointer bg-black/20">
// // // // // //                   <div
// // // // // //                     className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1"
// // // // // //                     style={{ backgroundImage: `url(${event.image})` }}
// // // // // //                   />
// // // // // //                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
// // // // // //                     <Eye className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" />
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 {/* Event Info */}
// // // // // //                 <div className="flex-1 space-y-4">
// // // // // //                   <div className="flex items-center justify-between">
// // // // // //                     <div className="flex items-center gap-2 text-clay text-[10px] uppercase font-bold tracking-widest">
// // // // // //                       <event.typeIcon size={14} />
// // // // // //                       {event.type}
// // // // // //                     </div>
// // // // // //                     <span className="text-stone-warm text-[10px] uppercase tracking-widest">{event.date}</span>
// // // // // //                   </div>

// // // // // //                   <h3 className="text-2xl font-serif text-rice-paper group-hover:text-clay transition-colors duration-500">
// // // // // //                     {event.title}
// // // // // //                   </h3>

// // // // // //                   <p className="text-stone-warm font-light leading-relaxed">{event.description}</p>

// // // // // //                   <div className="flex items-center gap-2 text-sm text-stone-warm/80 italic">
// // // // // //                     <MapPin size={14} />
// // // // // //                     {event.location}
// // // // // //                   </div>

// // // // // //                   <div className="flex justify-between items-center pt-4 border-t border-white/5">
// // // // // //                     <span className="text-lg font-serif">{event.price}</span>
// // // // // //                     <button className="flex items-center gap-2 bg-clay text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-500">
// // // // // //                       <Calendar size={14} />
// // // // // //                       {event.cta}
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* GALLERY */}
// // // // // //         <section className="px-6 lg:px-40 py-16">
// // // // // //           <h2 className="text-2xl font-serif mb-12 text-center tracking-wide italic">Event Gallery</h2>
// // // // // //           <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
// // // // // //             {galleryImages.map((img, i) => (
// // // // // //               <div
// // // // // //                 key={i}
// // // // // //                 className={`relative overflow-hidden mb-6 group cursor-pointer border border-border-subtle transition-all duration-1000 ${
// // // // // //                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
// // // // // //                 }`}
// // // // // //                 style={{ transitionDelay: `${100 * i}ms` }}
// // // // // //               >
// // // // // //                 <img
// // // // // //                   src={img.src}
// // // // // //                   alt={img.alt}
// // // // // //                   className="w-full transition-all duration-[1500ms] group-hover:scale-110 group-hover:rotate-1"
// // // // // //                 />
// // // // // //                 <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
// // // // // //                   <Eye className="w-6 h-6 text-white" />
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* NEWSLETTER */}
// // // // // //         <section className="px-6 lg:px-40 py-24 border-t border-border-subtle bg-black/5">
// // // // // //           <div className={`max-w-xl mx-auto text-center space-y-8 transition-all duration-1000 ${
// // // // // //             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
// // // // // //           }`}>
// // // // // //             <Mail className="mx-auto text-clay w-10 h-10" />
// // // // // //             <h2 className="text-4xl font-serif italic font-light">Join the Guest List</h2>
// // // // // //             <p className="text-stone-warm font-light tracking-wide">
// // // // // //               Be the first to receive invitations to private studio sessions and international tours.
// // // // // //             </p>

// // // // // //             <div className="flex flex-col sm:flex-row gap-4 p-1 bg-charcoal-light border border-border-subtle focus-within:border-clay transition-all duration-500">
// // // // // //               <input
// // // // // //                 className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none placeholder:text-stone-warm/50"
// // // // // //                 placeholder="Email Address"
// // // // // //                 value={email}
// // // // // //                 onChange={(e) => setEmail(e.target.value)}
// // // // // //               />
// // // // // //               <button className="bg-clay text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-charcoal transition-all duration-500">
// // // // // //                 Subscribe
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>
// // // // // //       </main>

// // // // // //       <Footer />

// // // // // //       <style jsx>{`
// // // // // //         @keyframes grain-shift {
// // // // // //           0%, 100% { transform: translate(0, 0); }
// // // // // //           10% { transform: translate(-5%, -5%); }
// // // // // //           20% { transform: translate(-10%, 5%); }
// // // // // //           30% { transform: translate(5%, -10%); }
// // // // // //           40% { transform: translate(-5%, 15%); }
// // // // // //           50% { transform: translate(-10%, 5%); }
// // // // // //           60% { transform: translate(15%, 0); }
// // // // // //           70% { transform: translate(0, 10%); }
// // // // // //           80% { transform: translate(-15%, 0); }
// // // // // //           90% { transform: translate(10%, 5%); }
// // // // // //         }
// // // // // //         .animate-grain-shift {
// // // // // //           animation: grain-shift 12s ease-in-out infinite;
// // // // // //         }
// // // // // //       `}</style>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // "use client";

// // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // import Header from "../../components/Header";
// // // // // // import Footer from "../../components/Footer";

// // // // // // // Icons
// // // // // // import { MapPin, Calendar, Mail, Globe, Store, Eye } from "lucide-react";

// // // // // // // Images
// // // // // // import heroStudio from "../../assets/hero-studio.jpg";
// // // // // // import eventHands from "../../assets/event-hands.jpg";
// // // // // // import eventGallery from "../../assets/event-gallery.jpg";

// // // // // // // Archive Images
// // // // // // import archiveTea from "../../assets/archive-tea.jpg";
// // // // // // import archiveBowls from "../../assets/archive-bowls.jpg";
// // // // // // import archiveTexture from "../../assets/archive-texture.jpg";
// // // // // // import archiveMarket from "../../assets/archive-market.jpg";

// // // // // // // Gallery Images
// // // // // // import galleryTools from "../../assets/gallery-tools.jpg";
// // // // // // import galleryVase from "../../assets/gallery-vase.jpg";
// // // // // // import galleryMugs from "../../assets/gallery-mugs.jpg";
// // // // // // import galleryPeople from "../../assets/gallery-people.jpg";
// // // // // // import gallerySculpture from "../../assets/gallery-sculpture.jpg";

// // // // // // export default function WorkshopsPage() {
// // // // // //   const [email, setEmail] = useState("");
// // // // // //   const [isVisible, setIsVisible] = useState(false);
// // // // // //   const sectionRef = useRef(null);

// // // // // //   // Intersection Observer for Reveal Animations
// // // // // //   useEffect(() => {
// // // // // //     const observer = new IntersectionObserver(
// // // // // //       ([entry]) => {
// // // // // //         if (entry.isIntersecting) setIsVisible(true);
// // // // // //       },
// // // // // //       { threshold: 0.1 }
// // // // // //     );
// // // // // //     if (sectionRef.current) observer.observe(sectionRef.current);
// // // // // //     return () => {
// // // // // //       if (sectionRef.current) observer.unobserve(sectionRef.current);
// // // // // //     };
// // // // // //   }, []);

// // // // // //   const upcomingEvents = [
// // // // // //     {
// // // // // //       id: 1,
// // // // // //       date: "Oct 12–14",
// // // // // //       type: "Symposium",
// // // // // //       typeIcon: Globe,
// // // // // //       title: "Tokyo Clay Symposium",
// // // // // //       description: "Join us for a three-day intensive symposium featuring master potters from across Japan.",
// // // // // //       location: "Shibuya, Tokyo",
// // // // // //       price: "Starting from ¥5,000",
// // // // // //       cta: "RSVP Now",
// // // // // //       image: eventHands.src,
// // // // // //     },
// // // // // //     {
// // // // // //       id: 2,
// // // // // //       date: "Nov 05–07",
// // // // // //       type: "Pop-up Store",
// // // // // //       typeIcon: Store,
// // // // // //       title: "London Craft Week Pop-up",
// // // // // //       description: "Experience our latest autumn collection in the heart of Shoreditch.",
// // // // // //       location: "Shoreditch, London",
// // // // // //       price: "Free Entry",
// // // // // //       cta: "Get Tickets",
// // // // // //       image: eventGallery.src,
// // // // // //     },
// // // // // //   ];

// // // // // //   const archiveEntries = [
// // // // // //     {
// // // // // //       title: "Kyoto Spring Collection",
// // // // // //       date: "April 2023",
// // // // // //       description: "Launched our Sakura-inspired glaze series in a historic Machiya townhouse.",
// // // // // //       images: [archiveTea.src, archiveBowls.src, archiveTexture.src],
// // // // // //       layout: "grid"
// // // // // //     },
// // // // // //     {
// // // // // //       title: "NYC Maker's Market",
// // // // // //       date: "December 2022",
// // // // // //       description: "Our first international showcase at the Brooklyn Expo Center.",
// // // // // //       images: [archiveMarket.src],
// // // // // //       layout: "wide"
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Artist Residency: Hokkaido",
// // // // // //       date: "August 2022",
// // // // // //       description: "A month-long retreat focusing on wild clay harvesting.",
// // // // // //       images: [],
// // // // // //       layout: "text"
// // // // // //     }
// // // // // //   ];

// // // // // //   const galleryImages = [
// // // // // //     { src: galleryTools.src, alt: "Pottery tools" },
// // // // // //     { src: galleryVase.src, alt: "Ceramic vase" },
// // // // // //     { src: eventHands.src, alt: "Wheel throwing" },
// // // // // //     { src: galleryMugs.src, alt: "Ceramic mugs" },
// // // // // //     { src: galleryPeople.src, alt: "Gallery opening" },
// // // // // //     { src: gallerySculpture.src, alt: "Glaze texture" },
// // // // // //   ];

// // // // // //   return (
// // // // // //     <div className="relative min-h-screen bg-charcoal text-rice-paper flex flex-col overflow-hidden">
// // // // // //       <Header />

// // // // // //       {/* Background Textures */}
// // // // // //       <div className="fixed inset-0 opacity-[0.12] pointer-events-none z-0">
// // // // // //         <div 
// // // // // //           className="absolute inset-0 animate-grain-shift" 
// // // // // //           style={{ 
// // // // // //             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
// // // // // //             backgroundSize: '200px 200px'
// // // // // //           }} 
// // // // // //         />
// // // // // //       </div>

// // // // // //       <main ref={sectionRef} className="relative z-10 pt-32 flex-grow">
        
// // // // // //         {/* HERO SECTION */}
// // // // // //         <section className="px-6 lg:px-40 py-10">
// // // // // //           <div
// // // // // //             className={`rounded-2xl min-h-[520px] flex items-center justify-center text-center bg-cover bg-center transition-all duration-1000 ease-out ${
// // // // // //               isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
// // // // // //             }`}
// // // // // //             style={{
// // // // // //               backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.75)), url(${heroStudio.src})`,
// // // // // //             }}
// // // // // //           >
// // // // // //             <div className="max-w-2xl space-y-6 p-8">
// // // // // //               <span className="uppercase tracking-[0.3em] text-[10px] text-clay font-bold block">
// // // // // //                 Workshops & Exhibitions
// // // // // //               </span>
// // // // // //               <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight">
// // // // // //                 Basho On Tour
// // // // // //               </h1>
// // // // // //               <p className="text-stone-warm text-lg md:text-xl font-light leading-relaxed">
// // // // // //                 Experience handcrafted pottery through immersive workshops and exhibitions across the globe.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* UPCOMING EVENTS */}
// // // // // //         <section className="px-6 lg:px-40 py-16">
// // // // // //           <div className="max-w-5xl mx-auto space-y-10">
// // // // // //             <h2 className="text-3xl font-serif">Upcoming Events</h2>
// // // // // //             {upcomingEvents.map((event, index) => (
// // // // // //               <div
// // // // // //                 key={event.id}
// // // // // //                 className={`group flex flex-col md:flex-row gap-8 border border-border-subtle p-6 bg-charcoal-light transition-all duration-700 hover:border-clay/30 hover:-translate-y-1 ${
// // // // // //                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
// // // // // //                 }`}
// // // // // //                 style={{ transitionDelay: `${200 * index}ms` }}
// // // // // //               >
// // // // // //                 <div className="md:w-1/3 h-56 relative overflow-hidden cursor-pointer bg-black/20">
// // // // // //                   <div
// // // // // //                     className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110"
// // // // // //                     style={{ backgroundImage: `url(${event.image})` }}
// // // // // //                   />
// // // // // //                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
// // // // // //                     <Eye className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" />
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 <div className="flex-1 space-y-4">
// // // // // //                   <div className="flex items-center justify-between">
// // // // // //                     <div className="flex items-center gap-2 text-clay text-[10px] uppercase font-bold tracking-widest">
// // // // // //                       <event.typeIcon size={14} /> {event.type}
// // // // // //                     </div>
// // // // // //                     <span className="text-stone-warm text-[10px] uppercase tracking-widest">{event.date}</span>
// // // // // //                   </div>
// // // // // //                   <h3 className="text-2xl font-serif group-hover:text-clay transition-colors duration-500">{event.title}</h3>
// // // // // //                   <p className="text-stone-warm font-light leading-relaxed">{event.description}</p>
// // // // // //                   <div className="flex items-center gap-2 text-sm text-stone-warm/80 italic">
// // // // // //                     <MapPin size={14} /> {event.location}
// // // // // //                   </div>
// // // // // //                   <div className="flex justify-between items-center pt-4 border-t border-white/5">
// // // // // //                     <span className="text-lg font-serif">{event.price}</span>
// // // // // //                     <button className="flex items-center gap-2 bg-clay text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-500">
// // // // // //                       <Calendar size={14} /> {event.cta}
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* ARCHIVE SECTION */}
// // // // // //         <section className="px-6 lg:px-40 py-24 border-t border-border-subtle">
// // // // // //           <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            
// // // // // //             {/* Sidebar Description */}
// // // // // //             <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-48 h-fit">
// // // // // //               <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">Archive</h2>
// // // // // //               <p className="text-stone-warm text-sm leading-relaxed max-w-xs font-light">
// // // // // //                 A curated history of our past exhibitions, gallery shows, and community gatherings. Explore the moments that shaped Basho.
// // // // // //               </p>
// // // // // //               <div className="w-12 h-1 bg-clay"></div>
// // // // // //             </div>

// // // // // //             {/* Timeline Content */}
// // // // // //             <div className="lg:w-2/3 relative border-l border-white/10 pl-8 lg:pl-12 space-y-20">
// // // // // //               {archiveEntries.map((item, idx) => (
// // // // // //                 <div key={idx} className="relative">
// // // // // //                   {/* Timeline Node Icon (Dot) */}
// // // // // //                   <div className="absolute -left-[37.5px] lg:-left-[53.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/20 border border-charcoal outline outline-4 outline-charcoal"></div>
                  
// // // // // //                   <div className={`space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{ transitionDelay: `${150 * idx}ms` }}>
// // // // // //                     <div className="flex flex-wrap items-baseline gap-3">
// // // // // //                       <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
// // // // // //                       <span className="text-[10px] text-stone-warm/50 font-bold uppercase tracking-[0.2em]">{item.date}</span>
// // // // // //                     </div>
// // // // // //                     <p className="text-stone-warm text-sm max-w-lg leading-relaxed font-light">{item.description}</p>
                    
// // // // // //                     {/* Conditional Image Layouts with Hover Effects */}
// // // // // //                     {item.layout === "grid" && (
// // // // // //                       <div className="grid grid-cols-3 gap-4 pt-6">
// // // // // //                         {item.images.map((src, i) => (
// // // // // //                           <div key={i} className="overflow-hidden rounded-xl bg-white/5 aspect-square relative group cursor-pointer">
// // // // // //                             <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
// // // // // //                             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
// // // // // //                           </div>
// // // // // //                         ))}
// // // // // //                       </div>
// // // // // //                     )}
                    
// // // // // //                     {item.layout === "wide" && (
// // // // // //                       <div className="pt-6 overflow-hidden rounded-xl bg-white/5 relative group cursor-pointer">
// // // // // //                         <img src={item.images[0]} alt="" className="w-full h-56 object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
// // // // // //                         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
// // // // // //                       </div>
// // // // // //                     )}
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* EVENT GALLERY */}
// // // // // //         <section className="px-6 lg:px-40 py-16">
// // // // // //           <h2 className="text-2xl font-serif mb-12 text-center tracking-wide italic font-light">Event Gallery</h2>
// // // // // //           <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
// // // // // //             {galleryImages.map((img, i) => (
// // // // // //               <div
// // // // // //                 key={i}
// // // // // //                 className={`relative overflow-hidden mb-6 group cursor-pointer border border-border-subtle transition-all duration-1000 ${
// // // // // //                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
// // // // // //                 }`}
// // // // // //                 style={{ transitionDelay: `${100 * i}ms` }}
// // // // // //               >
// // // // // //                 <img
// // // // // //                   src={img.src}
// // // // // //                   alt={img.alt}
// // // // // //                   className="w-full transition-all duration-[1500ms] group-hover:scale-110 group-hover:rotate-1"
// // // // // //                 />
// // // // // //                 <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
// // // // // //                   <Eye className="w-6 h-6 text-white" />
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* NEWSLETTER */}
// // // // // //         <section className="px-6 lg:px-40 py-24 border-t border-border-subtle bg-black/5">
// // // // // //           <div className="max-w-xl mx-auto text-center space-y-8">
// // // // // //             <Mail className="mx-auto text-clay w-10 h-10" />
// // // // // //             <h2 className="text-4xl font-serif italic font-light">Join the Guest List</h2>
// // // // // //             <p className="text-stone-warm font-light tracking-wide">
// // // // // //               Be the first to receive invitations to private studio sessions and international tours.
// // // // // //             </p>

// // // // // //             <div className="flex flex-col sm:flex-row gap-4 p-1 bg-charcoal-light border border-border-subtle focus-within:border-clay transition-all duration-500">
// // // // // //               <input
// // // // // //                 className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none placeholder:text-stone-warm/50"
// // // // // //                 placeholder="Email Address"
// // // // // //                 value={email}
// // // // // //                 onChange={(e) => setEmail(e.target.value)}
// // // // // //               />
// // // // // //               <button className="bg-clay text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-charcoal transition-all duration-500">
// // // // // //                 Subscribe
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>
// // // // // //       </main>

// // // // // //       <Footer />

// // // // // //       <style jsx>{`
// // // // // //         @keyframes grain-shift {
// // // // // //           0%, 100% { transform: translate(0, 0); }
// // // // // //           10% { transform: translate(-5%, -5%); }
// // // // // //           20% { transform: translate(-10%, 5%); }
// // // // // //           30% { transform: translate(5%, -10%); }
// // // // // //           40% { transform: translate(-5%, 15%); }
// // // // // //           50% { transform: translate(-10%, 5%); }
// // // // // //           60% { transform: translate(15%, 0); }
// // // // // //           70% { transform: translate(0, 10%); }
// // // // // //           80% { transform: translate(-15%, 0); }
// // // // // //           90% { transform: translate(10%, 5%); }
// // // // // //         }
// // // // // //         .animate-grain-shift {
// // // // // //           animation: grain-shift 12s ease-in-out infinite;
// // // // // //         }
// // // // // //       `}</style>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // "use client";

// // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // import Header from "../../components/Header";
// // // // // // import Footer from "../../components/Footer";

// // // // // // // Icons
// // // // // // import { MapPin, Calendar, Mail, Globe, Store, Eye } from "lucide-react";

// // // // // // // Images
// // // // // // import heroStudio from "../../assets/hero-studio.jpg";
// // // // // // import eventHands from "../../assets/event-hands.jpg";
// // // // // // import eventGallery from "../../assets/event-gallery.jpg";

// // // // // // // Archive Images
// // // // // // import archiveTea from "../../assets/archive-tea.jpg";
// // // // // // import archiveBowls from "../../assets/archive-bowls.jpg";
// // // // // // import archiveTexture from "../../assets/archive-texture.jpg";
// // // // // // import archiveMarket from "../../assets/archive-market.jpg";

// // // // // // // Gallery Images
// // // // // // import galleryTools from "../../assets/gallery-tools.jpg";
// // // // // // import galleryVase from "../../assets/gallery-vase.jpg";
// // // // // // import galleryMugs from "../../assets/gallery-mugs.jpg";
// // // // // // import galleryPeople from "../../assets/gallery-people.jpg";
// // // // // // import gallerySculpture from "../../assets/gallery-sculpture.jpg";

// // // // // // export default function WorkshopsPage() {
// // // // // //   const [email, setEmail] = useState("");
// // // // // //   const [isVisible, setIsVisible] = useState(false);
// // // // // //   const sectionRef = useRef(null);

// // // // // //   // Intersection Observer for Reveal Animations (Ported from ProductsPage)
// // // // // //   useEffect(() => {
// // // // // //     const observer = new IntersectionObserver(
// // // // // //       ([entry]) => {
// // // // // //         if (entry.isIntersecting) {
// // // // // //           setIsVisible(true);
// // // // // //         }
// // // // // //       },
// // // // // //       { threshold: 0.1 }
// // // // // //     );

// // // // // //     if (sectionRef.current) observer.observe(sectionRef.current);
// // // // // //     return () => {
// // // // // //       if (sectionRef.current) observer.unobserve(sectionRef.current);
// // // // // //     };
// // // // // //   }, []);

// // // // // //   const upcomingEvents = [
// // // // // //     {
// // // // // //       id: 1,
// // // // // //       date: "Oct 12–14",
// // // // // //       type: "Symposium",
// // // // // //       typeIcon: Globe,
// // // // // //       title: "Tokyo Clay Symposium",
// // // // // //       description: "Join us for a three-day intensive symposium featuring master potters from across Japan.",
// // // // // //       location: "Shibuya, Tokyo",
// // // // // //       price: "Starting from ¥5,000",
// // // // // //       cta: "RSVP Now",
// // // // // //       image: eventHands.src,
// // // // // //     },
// // // // // //     {
// // // // // //       id: 2,
// // // // // //       date: "Nov 05–07",
// // // // // //       type: "Pop-up Store",
// // // // // //       typeIcon: Store,
// // // // // //       title: "London Craft Week Pop-up",
// // // // // //       description: "Experience our latest autumn collection in the heart of Shoreditch.",
// // // // // //       location: "Shoreditch, London",
// // // // // //       price: "Free Entry",
// // // // // //       cta: "Get Tickets",
// // // // // //       image: eventGallery.src,
// // // // // //     },
// // // // // //   ];

// // // // // //   const archiveEntries = [
// // // // // //     {
// // // // // //       title: "Kyoto Spring Collection",
// // // // // //       date: "April 2023",
// // // // // //       description: "Launched our Sakura-inspired glaze series in a historic Machiya townhouse.",
// // // // // //       images: [archiveTea.src, archiveBowls.src, archiveTexture.src],
// // // // // //       layout: "grid"
// // // // // //     },
// // // // // //     {
// // // // // //       title: "NYC Maker's Market",
// // // // // //       date: "December 2022",
// // // // // //       description: "Our first international showcase at the Brooklyn Expo Center.",
// // // // // //       images: [archiveMarket.src],
// // // // // //       layout: "wide"
// // // // // //     },
// // // // // //     {
// // // // // //       title: "Artist Residency: Hokkaido",
// // // // // //       date: "August 2022",
// // // // // //       description: "A month-long retreat focusing on wild clay harvesting.",
// // // // // //       images: [],
// // // // // //       layout: "text"
// // // // // //     }
// // // // // //   ];

// // // // // //   const galleryImages = [
// // // // // //     { src: galleryTools.src, alt: "Pottery tools" },
// // // // // //     { src: galleryVase.src, alt: "Ceramic vase" },
// // // // // //     { src: eventHands.src, alt: "Wheel throwing" },
// // // // // //     { src: galleryMugs.src, alt: "Ceramic mugs" },
// // // // // //     { src: galleryPeople.src, alt: "Gallery opening" },
// // // // // //     { src: gallerySculpture.src, alt: "Glaze texture" },
// // // // // //   ];

// // // // // //   return (
// // // // // //     <div className="relative min-h-screen bg-charcoal text-rice-paper flex flex-col overflow-hidden">
// // // // // //       <Header />

// // // // // //       {/* Enhanced Grain Texture - Synced with ProductsPage */}
// // // // // //       <div className="fixed inset-0 opacity-[0.12] pointer-events-none z-0">
// // // // // //         <div 
// // // // // //           className="absolute inset-0 animate-grain-shift" 
// // // // // //           style={{ 
// // // // // //             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
// // // // // //             backgroundSize: '200px 200px'
// // // // // //           }} 
// // // // // //         />
// // // // // //       </div>

// // // // // //       <main ref={sectionRef} className="relative z-10 pt-32 flex-grow">
        
// // // // // //         {/* HERO SECTION with ProductsPage Entrance Animation */}
// // // // // //         <section className="px-6 lg:px-40 py-10">
// // // // // //           <div
// // // // // //             className={`rounded-2xl min-h-[520px] flex items-center justify-center text-center bg-cover bg-center transition-all duration-1000 ease-out ${
// // // // // //               isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
// // // // // //             }`}
// // // // // //             style={{
// // // // // //               backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.75)), url(${heroStudio.src})`,
// // // // // //             }}
// // // // // //           >
// // // // // //             <div className="max-w-2xl space-y-6 p-8">
// // // // // //               <span className={`uppercase tracking-[0.3em] text-[10px] text-clay font-bold block transition-all duration-700 delay-300 ${
// // // // // //                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
// // // // // //               }`}>
// // // // // //                 Workshops & Exhibitions
// // // // // //               </span>
// // // // // //               <h1 className={`text-5xl md:text-7xl font-serif font-light tracking-tight transition-all duration-1000 delay-500 ${
// // // // // //                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
// // // // // //               }`}>
// // // // // //                 Basho On Tour
// // // // // //               </h1>
// // // // // //               <p className={`text-stone-warm text-lg md:text-xl font-light leading-relaxed transition-all duration-1000 delay-700 ${
// // // // // //                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
// // // // // //               }`}>
// // // // // //                 Experience handcrafted pottery through immersive workshops and exhibitions across the globe.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* UPCOMING EVENTS */}
// // // // // //         <section className="px-6 lg:px-40 py-16">
// // // // // //           <div className="max-w-5xl mx-auto space-y-10">
// // // // // //             <h2 className={`text-3xl font-serif transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
// // // // // //               Upcoming Events
// // // // // //             </h2>
// // // // // //             {upcomingEvents.map((event, index) => (
// // // // // //               <div
// // // // // //                 key={event.id}
// // // // // //                 className={`group flex flex-col md:flex-row gap-8 border border-border-subtle p-6 bg-charcoal-light transition-all duration-700 hover:border-clay/20 hover:bg-white/5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 ${
// // // // // //                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
// // // // // //                 }`}
// // // // // //                 style={{ transitionDelay: `${200 * index}ms` }}
// // // // // //               >
// // // // // //                 {/* Advanced Hover Image Container */}
// // // // // //                 <div className="md:w-1/3 h-56 relative overflow-hidden cursor-pointer bg-black/20">
// // // // // //                   <div
// // // // // //                     className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1"
// // // // // //                     style={{ backgroundImage: `url(${event.image})` }}
// // // // // //                   />
// // // // // //                   {/* Overlay with Color Shift like Product Cards */}
// // // // // //                   <div className="absolute inset-0 bg-black/0 group-hover:bg-clay/10 transition-all duration-700" />
// // // // // //                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
// // // // // //                     <Eye className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" />
// // // // // //                   </div>
// // // // // //                 </div>

// // // // // //                 <div className="flex-1 space-y-4">
// // // // // //                   <div className="flex items-center justify-between">
// // // // // //                     <div className="flex items-center gap-2 text-clay text-[10px] uppercase font-bold tracking-widest">
// // // // // //                       <event.typeIcon size={14} /> {event.type}
// // // // // //                     </div>
// // // // // //                     <span className="text-stone-warm text-[10px] uppercase tracking-widest">{event.date}</span>
// // // // // //                   </div>
// // // // // //                   <h3 className="text-2xl font-serif text-rice-paper group-hover:text-clay group-hover:tracking-tight transition-all duration-500">
// // // // // //                     {event.title}
// // // // // //                   </h3>
// // // // // //                   <p className="text-stone-warm font-light leading-relaxed">{event.description}</p>
// // // // // //                   <div className="flex items-center gap-2 text-sm text-stone-warm/80 italic">
// // // // // //                     <MapPin size={14} /> {event.location}
// // // // // //                   </div>
// // // // // //                   <div className="flex justify-between items-center pt-4 border-t border-white/5 transition-colors duration-500 group-hover:border-clay/20">
// // // // // //                     <span className="text-lg font-serif text-white group-hover:text-clay group-hover:scale-105 origin-left transition-all duration-500">
// // // // // //                       {event.price}
// // // // // //                     </span>
// // // // // //                     <button className="flex items-center gap-2 bg-clay text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-500">
// // // // // //                       <Calendar size={14} /> {event.cta}
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* ARCHIVE SECTION - Positioned between Events and Gallery */}
// // // // // //         <section className="px-6 lg:px-40 py-24 border-t border-border-subtle bg-charcoal relative">
// // // // // //           <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            
// // // // // //             {/* Sidebar with Entrance Animation */}
// // // // // //             <div className={`lg:w-1/3 space-y-6 lg:sticky lg:top-48 h-fit transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
// // // // // //               <h2 className="text-4xl md:text-5xl font-serif font-light text-rice-paper tracking-tight hover:tracking-tighter hover:text-clay transition-all duration-700">
// // // // // //                 Archive
// // // // // //               </h2>
// // // // // //               <p className="text-stone-warm text-sm leading-relaxed max-w-xs font-light">
// // // // // //                 A curated history of our past exhibitions, gallery shows, and community gatherings. Explore the moments that shaped Basho.
// // // // // //               </p>
// // // // // //               <div className="w-12 h-1 bg-clay/60 shadow-[0_0_15px_rgba(210,180,140,0.3)]"></div>
// // // // // //             </div>

// // // // // //             {/* Timeline Content */}
// // // // // //             <div className="lg:w-2/3 relative border-l border-white/10 pl-8 lg:pl-12 space-y-20">
// // // // // //               {archiveEntries.map((item, idx) => (
// // // // // //                 <div key={idx} className="relative group/item">
// // // // // //                   {/* Timeline Node Node with animate-pulse on parent hover */}
// // // // // //                   <div className="absolute -left-[37.5px] lg:-left-[53.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/20 border border-charcoal outline outline-4 outline-charcoal group-hover/item:bg-clay group-hover/item:scale-125 transition-all duration-500"></div>
                  
// // // // // //                   <div className={`space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{ transitionDelay: `${150 * idx}ms` }}>
// // // // // //                     <div className="flex flex-wrap items-baseline gap-3">
// // // // // //                       <h3 className="text-xl font-serif text-rice-paper group-hover/item:text-clay transition-all duration-500">
// // // // // //                         {item.title}
// // // // // //                       </h3>
// // // // // //                       <span className="text-[10px] text-stone-warm/50 font-bold uppercase tracking-[0.2em]">{item.date}</span>
// // // // // //                     </div>
// // // // // //                     <p className="text-stone-warm text-sm max-w-lg leading-relaxed font-light">{item.description}</p>
                    
// // // // // //                     {/* Archive Images with Product-style Zoom & Color Shifting */}
// // // // // //                     {item.layout === "grid" && (
// // // // // //                       <div className="grid grid-cols-3 gap-4 pt-6">
// // // // // //                         {item.images.map((src, i) => (
// // // // // //                           <div key={i} className="overflow-hidden rounded-xl bg-black/30 aspect-square relative group/img cursor-pointer border border-white/5 hover:border-clay/30 transition-all duration-500">
// // // // // //                             <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-img:scale-110 group-img:rotate-1" />
// // // // // //                             <div className="absolute inset-0 bg-black/0 group-img:bg-clay/10 transition-all duration-700" />
// // // // // //                           </div>
// // // // // //                         ))}
// // // // // //                       </div>
// // // // // //                     )}
                    
// // // // // //                     {item.layout === "wide" && (
// // // // // //                       <div className="pt-6 overflow-hidden rounded-xl bg-black/30 relative group/img cursor-pointer border border-white/5 hover:border-clay/30 transition-all duration-500">
// // // // // //                         <img src={item.images[0]} alt="" className="w-full h-56 object-cover transition-transform duration-[1.5s] ease-out group-img:scale-105 group-img:-rotate-1" />
// // // // // //                         <div className="absolute inset-0 bg-black/0 group-img:bg-clay/10 transition-all duration-700" />
// // // // // //                       </div>
// // // // // //                     )}
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* EVENT GALLERY with Column Entrance Animation */}
// // // // // //         <section className="px-6 lg:px-40 py-16">
// // // // // //           <h2 className="text-2xl font-serif mb-12 text-center tracking-wide italic font-light text-rice-paper">
// // // // // //             Event Gallery
// // // // // //           </h2>
// // // // // //           <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
// // // // // //             {galleryImages.map((img, i) => (
// // // // // //               <div
// // // // // //                 key={i}
// // // // // //                 className={`relative overflow-hidden mb-6 group cursor-pointer border border-border-subtle transition-all duration-1000 hover:border-clay/40 hover:-translate-y-1 ${
// // // // // //                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
// // // // // //                 }`}
// // // // // //                 style={{ transitionDelay: `${100 * i}ms` }}
// // // // // //               >
// // // // // //                 <img
// // // // // //                   src={img.src}
// // // // // //                   alt={img.alt}
// // // // // //                   className="w-full transition-all duration-[1500ms] group-hover:scale-110 group-hover:rotate-1"
// // // // // //                 />
// // // // // //                 <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
// // // // // //                   <Eye className="w-6 h-6 text-white group-hover:scale-125 transition-all duration-500" />
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* NEWSLETTER - Ported styling from Shop Search Section */}
// // // // // //         <section className="px-6 lg:px-40 py-24 border-t border-border-subtle bg-black/5">
// // // // // //           <div className={`max-w-xl mx-auto text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
// // // // // //             <Mail className="mx-auto text-clay w-10 h-10 animate-pulse" />
// // // // // //             <h2 className="text-4xl font-serif italic font-light text-rice-paper">Join the Guest List</h2>
// // // // // //             <p className="text-stone-warm font-light tracking-wide">
// // // // // //               Be the first to receive invitations to private studio sessions and international tours.
// // // // // //             </p>

// // // // // //             <div className="flex flex-col sm:flex-row gap-4 p-1 bg-charcoal-light border border-border-subtle focus-within:border-clay transition-all duration-500 shadow-2xl">
// // // // // //               <input
// // // // // //                 className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none placeholder:text-stone-warm/50 text-rice-paper"
// // // // // //                 placeholder="Email Address"
// // // // // //                 value={email}
// // // // // //                 onChange={(e) => setEmail(e.target.value)}
// // // // // //               />
// // // // // //               <button className="bg-clay text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-charcoal transition-all duration-500 shadow-lg active:scale-95">
// // // // // //                 Subscribe
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>
// // // // // //       </main>

// // // // // //       <Footer />

// // // // // //       {/* Shared Grain Shift Animation from ProductsPage */}
// // // // // //       <style jsx>{`
// // // // // //         @keyframes grain-shift {
// // // // // //           0%, 100% { transform: translate(0, 0); }
// // // // // //           10% { transform: translate(-5%, -5%); }
// // // // // //           20% { transform: translate(-10%, 5%); }
// // // // // //           30% { transform: translate(5%, -10%); }
// // // // // //           40% { transform: translate(-5%, 15%); }
// // // // // //           50% { transform: translate(-10%, 5%); }
// // // // // //           60% { transform: translate(15%, 0); }
// // // // // //           70% { transform: translate(0, 10%); }
// // // // // //           80% { transform: translate(-15%, 0); }
// // // // // //           90% { transform: translate(10%, 5%); }
// // // // // //         }
// // // // // //         .animate-grain-shift {
// // // // // //           animation: grain-shift 12s ease-in-out infinite;
// // // // // //         }
// // // // // //       `}</style>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // // "use client";

// // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // import Header from "../../components/Header";
// // // // // // import Footer from "../../components/Footer";

// // // // // // // Icons
// // // // // // import { MapPin, Calendar, Mail, Globe, Store, Eye } from "lucide-react";

// // // // // // // Images
// // // // // // import heroStudio from "../../assets/hero-studio.jpg";
// // // // // // import eventHands from "../../assets/event-hands.jpg";
// // // // // // import eventGallery from "../../assets/event-gallery.jpg";

// // // // // // // Archive Images
// // // // // // import archiveTea from "../../assets/archive-tea.jpg";
// // // // // // import archiveBowls from "../../assets/archive-bowls.jpg";
// // // // // // import archiveTexture from "../../assets/archive-texture.jpg";
// // // // // // import archiveMarket from "../../assets/archive-market.jpg";

// // // // // // // Gallery Images
// // // // // // import galleryTools from "../../assets/gallery-tools.jpg";
// // // // // // import galleryVase from "../../assets/gallery-vase.jpg";
// // // // // // import galleryMugs from "../../assets/gallery-mugs.jpg";
// // // // // // import galleryPeople from "../../assets/gallery-people.jpg";
// // // // // // import gallerySculpture from "../../assets/gallery-sculpture.jpg";

// // // // // // export default function WorkshopsPage() {
// // // // // //   const [email, setEmail] = useState("");
// // // // // //   const [isVisible, setIsVisible] = useState(false);
// // // // // //   const sectionRef = useRef(null);

// // // // // //   // Intersection Observer for Reveal Animations
// // // // // //   useEffect(() => {
// // // // // //     const observer = new IntersectionObserver(
// // // // // //       ([entry]) => {
// // // // // //         // We only set it to true once to prevent the background 
// // // // // //         // from disappearing when scrolling away
// // // // // //         if (entry.isIntersecting) {
// // // // // //           setIsVisible(true);
// // // // // //         }
// // // // // //       },
// // // // // //       { threshold: 0.1 }
// // // // // //     );

// // // // // //     if (sectionRef.current) observer.observe(sectionRef.current);
// // // // // //     return () => {
// // // // // //       if (sectionRef.current) observer.unobserve(sectionRef.current);
// // // // // //     };
// // // // // //   }, []);

// // // // // //   const upcomingEvents = [
// // // // // //     {
// // // // // //       id: 1,
// // // // // //       date: "Oct 12–14",
// // // // // //       type: "Symposium",
// // // // // //       typeIcon: Globe,
// // // // // //       title: "Tokyo Clay Symposium",
// // // // // //       description: "Join us for a three-day intensive symposium featuring master potters from across Japan.",
// // // // // //       location: "Shibuya, Tokyo",
// // // // // //       price: "Starting from ¥5,000",
// // // // // //       cta: "RSVP Now",
// // // // // //       image: eventHands.src || eventHands, // Fallback for different import types
// // // // // //     },
// // // // // //     {
// // // // // //       id: 2,
// // // // // //       date: "Nov 05–07",
// // // // // //       type: "Pop-up Store",
// // // // // //       typeIcon: Store,
// // // // // //       title: "London Craft Week Pop-up",
// // // // // //       description: "Experience our latest autumn collection in the heart of Shoreditch.",
// // // // // //       location: "Shoreditch, London",
// // // // // //       price: "Free Entry",
// // // // // //       cta: "Get Tickets",
// // // // // //       image: eventGallery.src || eventGallery,
// // // // // //     },
// // // // // //   ];

// // // // // //   const archiveEntries = [
// // // // // //     {
// // // // // //       title: "Kyoto Spring Collection",
// // // // // //       date: "April 2023",
// // // // // //       description: "Launched our Sakura-inspired glaze series in a historic Machiya townhouse.",
// // // // // //       images: [archiveTea.src || archiveTea, archiveBowls.src || archiveBowls, archiveTexture.src || archiveTexture],
// // // // // //       layout: "grid"
// // // // // //     },
// // // // // //     {
// // // // // //       title: "NYC Maker's Market",
// // // // // //       date: "December 2022",
// // // // // //       description: "Our first international showcase at the Brooklyn Expo Center.",
// // // // // //       images: [archiveMarket.src || archiveMarket],
// // // // // //       layout: "wide"
// // // // // //     }
// // // // // //   ];

// // // // // //   const galleryImages = [
// // // // // //     { src: galleryTools.src || galleryTools, alt: "Pottery tools" },
// // // // // //     { src: galleryVase.src || galleryVase, alt: "Ceramic vase" },
// // // // // //     { src: eventHands.src || eventHands, alt: "Wheel throwing" },
// // // // // //     { src: galleryMugs.src || galleryMugs, alt: "Ceramic mugs" },
// // // // // //     { src: galleryPeople.src || galleryPeople, alt: "Gallery opening" },
// // // // // //     { src: gallerySculpture.src || gallerySculpture, alt: "Glaze texture" },
// // // // // //   ];

// // // // // //   return (
// // // // // //     <div className="relative min-h-screen bg-charcoal text-rice-paper flex flex-col overflow-hidden">
// // // // // //       <Header />

// // // // // //       {/* Grain Texture Background */}
// // // // // //       <div className="fixed inset-0 opacity-[0.12] pointer-events-none z-0">
// // // // // //         <div 
// // // // // //           className="absolute inset-0 animate-grain-shift" 
// // // // // //           style={{ 
// // // // // //             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
// // // // // //             backgroundSize: '200px 200px'
// // // // // //           }} 
// // // // // //         />
// // // // // //       </div>

// // // // // //       <main ref={sectionRef} className="relative z-10 pt-32 flex-grow">
        
// // // // // //         {/* HERO SECTION - Fixed Background disappearance */}
// // // // // //         <section className="px-6 lg:px-40 py-10">
// // // // // //           <div
// // // // // //             className={`rounded-2xl min-h-[520px] flex items-center justify-center text-center bg-cover bg-center transition-all duration-1000 ease-out ${
// // // // // //               isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
// // // // // //             }`}
// // // // // //             style={{
// // // // // //               backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.75)), url(${heroStudio.src || heroStudio})`,
// // // // // //             }}
// // // // // //           >
// // // // // //             <div className="max-w-2xl space-y-6 p-8">
// // // // // //               <span className={`uppercase tracking-[0.3em] text-[10px] text-clay font-bold block transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
// // // // // //                 Workshops & Exhibitions
// // // // // //               </span>
// // // // // //               <h1 className={`text-5xl md:text-7xl font-serif font-light tracking-tight transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
// // // // // //                 Basho On Tour
// // // // // //               </h1>
// // // // // //               <p className={`text-stone-warm text-lg md:text-xl font-light leading-relaxed transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
// // // // // //                 Experience handcrafted pottery through immersive workshops and exhibitions across the globe.
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* UPCOMING EVENTS */}
// // // // // //         <section className="px-6 lg:px-40 py-16">
// // // // // //           <div className="max-w-5xl mx-auto space-y-10">
// // // // // //             <h2 className={`text-3xl font-serif transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Upcoming Events</h2>
// // // // // //             {upcomingEvents.map((event, index) => (
// // // // // //               <div key={event.id} className={`group flex flex-col md:flex-row gap-8 border border-border-subtle p-6 bg-charcoal-light transition-all duration-700 hover:border-clay/20 hover:bg-white/5 hover:shadow-2xl hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${200 * index}ms` }}>
// // // // // //                 <div className="md:w-1/3 h-56 relative overflow-hidden cursor-pointer bg-black/20">
// // // // // //                   <div className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1" style={{ backgroundImage: `url(${event.image})` }} />
// // // // // //                   <div className="absolute inset-0 bg-black/0 group-hover:bg-clay/10 transition-all duration-700" />
// // // // // //                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
// // // // // //                     <Eye className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" />
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //                 <div className="flex-1 space-y-4">
// // // // // //                   <div className="flex items-center justify-between">
// // // // // //                     <div className="flex items-center gap-2 text-clay text-[10px] uppercase font-bold tracking-widest"><event.typeIcon size={14} /> {event.type}</div>
// // // // // //                     <span className="text-stone-warm text-[10px] uppercase tracking-widest">{event.date}</span>
// // // // // //                   </div>
// // // // // //                   <h3 className="text-2xl font-serif text-rice-paper group-hover:text-clay transition-colors duration-500">{event.title}</h3>
// // // // // //                   <p className="text-stone-warm font-light leading-relaxed">{event.description}</p>
// // // // // //                   <div className="flex justify-between items-center pt-4 border-t border-white/5">
// // // // // //                     <span className="text-lg font-serif text-white">{event.price}</span>
// // // // // //                     <button className="flex items-center gap-2 bg-clay text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-500">
// // // // // //                       <Calendar size={14} /> {event.cta}
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* ARCHIVE SECTION - With Fixed Hover Effects */}
// // // // // //         <section className="px-6 lg:px-40 py-24 border-t border-border-subtle bg-charcoal relative">
// // // // // //           <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
// // // // // //             <div className={`lg:w-1/3 space-y-6 lg:sticky lg:top-48 h-fit transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
// // // // // //               <h2 className="text-4xl md:text-5xl font-serif font-light text-rice-paper tracking-tight">Archive</h2>
// // // // // //               <p className="text-stone-warm text-sm max-w-xs font-light">A curated history of our past exhibitions and community gatherings.</p>
// // // // // //               <div className="w-12 h-1 bg-clay/60"></div>
// // // // // //             </div>

// // // // // //             <div className="lg:w-2/3 relative border-l border-white/10 pl-8 lg:pl-12 space-y-20">
// // // // // //               {archiveEntries.map((item, idx) => (
// // // // // //                 <div key={idx} className="relative group/item">
// // // // // //                   <div className="absolute -left-[37.5px] lg:-left-[53.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/20 border border-charcoal outline outline-4 outline-charcoal group-hover/item:bg-clay group-hover/item:scale-125 transition-all duration-500"></div>
// // // // // //                   <div className={`space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{ transitionDelay: `${150 * idx}ms` }}>
// // // // // //                     <div className="flex flex-wrap items-baseline gap-3">
// // // // // //                       <h3 className="text-xl font-serif text-rice-paper group-hover/item:text-clay transition-all duration-500">{item.title}</h3>
// // // // // //                       <span className="text-[10px] text-stone-warm/50 font-bold uppercase tracking-[0.2em]">{item.date}</span>
// // // // // //                     </div>
// // // // // //                     <p className="text-stone-warm text-sm max-w-lg leading-relaxed font-light">{item.description}</p>
                    
// // // // // //                     {/* Image Grid with Hover Effects */}
// // // // // //                     <div className={`grid gap-4 pt-6 ${item.layout === 'grid' ? 'grid-cols-3' : 'grid-cols-1'}`}>
// // // // // //                       {item.images.map((src, i) => (
// // // // // //                         <div key={i} className={`overflow-hidden rounded-xl bg-black/30 relative group/img cursor-pointer border border-white/5 hover:border-clay/30 transition-all duration-500 ${item.layout === 'wide' ? 'h-56' : 'aspect-square'}`}>
// // // // // //                           <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover/img:scale-110 group-hover/img:rotate-1" />
// // // // // //                           <div className="absolute inset-0 bg-black/0 group-hover/img:bg-clay/15 transition-all duration-700" />
// // // // // //                         </div>
// // // // // //                       ))}
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </section>

// // // // // //         {/* GALLERY SECTION */}
// // // // // //         <section className="px-6 lg:px-40 py-16">
// // // // // //           <h2 className="text-2xl font-serif mb-12 text-center italic font-light text-rice-paper">Event Gallery</h2>
// // // // // //           <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
// // // // // //             {galleryImages.map((img, i) => (
// // // // // //               <div key={i} className={`relative overflow-hidden mb-6 group cursor-pointer border border-border-subtle transition-all duration-1000 hover:border-clay/40 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${100 * i}ms` }}>
// // // // // //                 <img src={img.src} alt={img.alt} className="w-full transition-all duration-[1500ms] group-hover:scale-110 group-hover:rotate-1" />
// // // // // //                 <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
// // // // // //                   <Eye className="w-6 h-6 text-white group-hover:scale-125 transition-all duration-500" />
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </section>
// // // // // //       </main>

// // // // // //       <Footer />

// // // // // //       <style jsx>{`
// // // // // //         @keyframes grain-shift {
// // // // // //           0%, 100% { transform: translate(0, 0); }
// // // // // //           10% { transform: translate(-5%, -5%); }
// // // // // //           50% { transform: translate(-10%, 5%); }
// // // // // //           90% { transform: translate(10%, 5%); }
// // // // // //         }
// // // // // //         .animate-grain-shift { animation: grain-shift 12s ease-in-out infinite; }
// // // // // //       `}</style>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // "use client";

// // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // import Header from "../../components/Header";
// // // // // import Footer from "../../components/Footer";

// // // // // // Icons
// // // // // import { MapPin, Calendar, Mail, Globe, Store, Eye, Play, CalendarDays } from "lucide-react";

// // // // // // Images
// // // // // import heroStudio from "../../assets/hero-studio.jpg";
// // // // // import eventHands from "../../assets/event-hands.jpg";
// // // // // import eventGallery from "../../assets/event-gallery.jpg";

// // // // // // Archive Images
// // // // // import archiveTea from "../../assets/archive-tea.jpg";
// // // // // import archiveBowls from "../../assets/archive-bowls.jpg";
// // // // // import archiveTexture from "../../assets/archive-texture.jpg";
// // // // // import archiveMarket from "../../assets/archive-market.jpg";

// // // // // // Gallery Images
// // // // // import galleryTools from "../../assets/gallery-tools.jpg";
// // // // // import galleryVase from "../../assets/gallery-vase.jpg";
// // // // // import galleryMugs from "../../assets/gallery-mugs.jpg";
// // // // // import galleryPeople from "../../assets/gallery-people.jpg";
// // // // // import gallerySculpture from "../../assets/gallery-sculpture.jpg";

// // // // // export default function WorkshopsPage() {
// // // // //   const [email, setEmail] = useState("");
// // // // //   const [isVisible, setIsVisible] = useState(false);
// // // // //   const sectionRef = useRef(null);

// // // // //   useEffect(() => {
// // // // //     const observer = new IntersectionObserver(
// // // // //       ([entry]) => {
// // // // //         if (entry.isIntersecting) {
// // // // //           setIsVisible(true);
// // // // //         }
// // // // //       },
// // // // //       { threshold: 0.1 }
// // // // //     );

// // // // //     if (sectionRef.current) observer.observe(sectionRef.current);
// // // // //     return () => {
// // // // //       if (sectionRef.current) observer.unobserve(sectionRef.current);
// // // // //     };
// // // // //   }, []);

// // // // //   const upcomingEvents = [
// // // // //     {
// // // // //       id: 1,
// // // // //       date: "Oct 12–14",
// // // // //       type: "Symposium",
// // // // //       typeIcon: Globe,
// // // // //       title: "Tokyo Clay Symposium",
// // // // //       description: "Join us for a three-day intensive symposium featuring master potters from across Japan.",
// // // // //       location: "Shibuya, Tokyo",
// // // // //       price: "Starting from ¥5,000",
// // // // //       cta: "RSVP Now",
// // // // //       image: eventHands.src || eventHands,
// // // // //     },
// // // // //     {
// // // // //       id: 2,
// // // // //       date: "Nov 05–07",
// // // // //       type: "Pop-up Store",
// // // // //       typeIcon: Store,
// // // // //       title: "London Craft Week Pop-up",
// // // // //       description: "Experience our latest autumn collection in the heart of Shoreditch.",
// // // // //       location: "Shoreditch, London",
// // // // //       price: "Free Entry",
// // // // //       cta: "Get Tickets",
// // // // //       image: eventGallery.src || eventGallery,
// // // // //     },
// // // // //   ];

// // // // //   // Data from HTML Section "The Process in Motion"
// // // // //   const processVideos = [
// // // // //     {
// // // // //       title: "Centering the Clay", //
// // // // //       category: "Beginner Workshop", //
// // // // //       thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkfQSTSEh36B1Dql9Ovp2do_xzWdZLL9fMGeLAkcieSiX9IzdgZcIcfhlC3Jt1FqX8fy47b7gXbrmftvN0CD8sI3T-qirhzAtqys0o89Xnoxply0sz38oC67jXAJP66CsZa2oStWQ_EFY35RPPYJiU9hxMZR6Cryk4JumPPrWlBdZKnmAbWS5mE_BJsEOMSoaDJZz9sAne5cGMbT7-ElMJayZWzRYZdicXWauCnZOymi7ksYIzHoKd4A9m3V-3NaB4-jR5XZJfseY", //
// // // // //     },
// // // // //     {
// // // // //       title: "Trimming & Texturing", //
// // // // //       category: "Intermediate", //
// // // // //       thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_kBG6GQTk-1qYwJANSxcqg1Cio6s0i4fcyJSLoJbV4hvcN_xIbYYxApFtDt77__22rG-nJJ8vidxEcA7XVAJU8OAOM1ZIswWj3Hf82MSch4Jfs_2OYH18NTthyvheortV7lRbz9dLKSsVq0cCyd8J-rODwpY1Xyopqm_uPA2AqZAlr_9sXeobyhrJslWLKM1mkmosB5NmuTDxAjnDX0EwIEFyhvcqalVicySg3ChPayYicaw-6Y3aHLyapTmG56YLEwzIDuDEeU4", //
// // // // //     },
// // // // //     {
// // // // //       title: "Glazing Techniques", //
// // // // //       category: "Masterclass", //
// // // // //       thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX2t5wLx4f-r2u-8PQD9Q-prN2XQCtO-hZ1BNACkc9AQW-efE7fCb515xcuMh1zvLAfK0P3akT-6RU1Fh-13sX0rvOQSDEYb05iEmkgT8LQi_x4Hh7aK42kdU-0751lb0DUrL2dEXgcE28yNsYa7PCb_b2deSs1996MrROapUvO2QWlf0q3jamay-kB3JgV1wrk4LfU7oAUrCp_g33KcuiUFSlqE0A1EU47f5x1Zo1fmHoy0n7pjyZ-LBG9pTCjeqO9u90yC7WjFE", //
// // // // //     }
// // // // //   ];

// // // // //   const archiveEntries = [
// // // // //     {
// // // // //       title: "Kyoto Spring Collection",
// // // // //       date: "April 2023",
// // // // //       description: "Launched our Sakura-inspired glaze series in a historic Machiya townhouse.",
// // // // //       images: [archiveTea.src || archiveTea, archiveBowls.src || archiveBowls, archiveTexture.src || archiveTexture],
// // // // //       layout: "grid"
// // // // //     },
// // // // //     {
// // // // //       title: "NYC Maker's Market",
// // // // //       date: "December 2022",
// // // // //       description: "Our first international showcase at the Brooklyn Expo Center.",
// // // // //       images: [archiveMarket.src || archiveMarket],
// // // // //       layout: "wide"
// // // // //     }
// // // // //   ];

// // // // //   const galleryImages = [
// // // // //     { src: galleryTools.src || galleryTools, alt: "Pottery tools" },
// // // // //     { src: galleryVase.src || galleryVase, alt: "Ceramic vase" },
// // // // //     { src: eventHands.src || eventHands, alt: "Wheel throwing" },
// // // // //     { src: galleryMugs.src || galleryMugs, alt: "Ceramic mugs" },
// // // // //     { src: galleryPeople.src || galleryPeople, alt: "Gallery opening" },
// // // // //     { src: gallerySculpture.src || gallerySculpture, alt: "Glaze texture" },
// // // // //   ];

// // // // //   return (
// // // // //     <div className="relative min-h-screen bg-charcoal text-rice-paper flex flex-col overflow-hidden">
// // // // //       <Header />

// // // // //       <div className="fixed inset-0 opacity-[0.12] pointer-events-none z-0">
// // // // //         <div 
// // // // //           className="absolute inset-0 animate-grain-shift" 
// // // // //           style={{ 
// // // // //             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
// // // // //             backgroundSize: '200px 200px'
// // // // //           }} 
// // // // //         />
// // // // //       </div>

// // // // //       <main ref={sectionRef} className="relative z-10 pt-32 flex-grow">
        
// // // // //         {/* HERO SECTION */}
// // // // //         <section className="px-6 lg:px-40 py-10">
// // // // //           <div
// // // // //             className={`rounded-2xl min-h-[520px] flex items-center justify-center text-center bg-cover bg-center transition-all duration-1000 ease-out ${
// // // // //               isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
// // // // //             }`}
// // // // //             style={{
// // // // //               backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.75)), url(${heroStudio.src || heroStudio})`,
// // // // //             }}
// // // // //           >
// // // // //             <div className="max-w-2xl space-y-6 p-8">
// // // // //               <span className={`uppercase tracking-[0.3em] text-[10px] text-clay font-bold block transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
// // // // //                 Workshops & Exhibitions
// // // // //               </span>
// // // // //               <h1 className={`text-5xl md:text-7xl font-serif font-light tracking-tight transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
// // // // //                 Basho On Tour
// // // // //               </h1>
// // // // //               <p className={`text-stone-warm text-lg md:text-xl font-light leading-relaxed transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
// // // // //                 Experience handcrafted pottery through immersive workshops and exhibitions across the globe.
// // // // //               </p>
// // // // //             </div>
// // // // //           </div>
// // // // //         </section>

// // // // //         {/* UPCOMING EVENTS */}
// // // // //         <section className="px-6 lg:px-40 py-16">
// // // // //           <div className="max-w-5xl mx-auto space-y-10">
// // // // //             <h2 className={`text-3xl font-serif transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Upcoming Events</h2>
// // // // //             {upcomingEvents.map((event, index) => (
// // // // //               <div key={event.id} className={`group flex flex-col md:flex-row gap-8 border border-border-subtle p-6 bg-charcoal-light transition-all duration-700 hover:border-clay/20 hover:bg-white/5 hover:shadow-2xl hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${200 * index}ms` }}>
// // // // //                 <div className="md:w-1/3 h-56 relative overflow-hidden cursor-pointer bg-black/20">
// // // // //                   <div className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1" style={{ backgroundImage: `url(${event.image})` }} />
// // // // //                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
// // // // //                     <Eye className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" />
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <div className="flex-1 space-y-4">
// // // // //                   <div className="flex items-center justify-between">
// // // // //                     <div className="flex items-center gap-2 text-clay text-[10px] uppercase font-bold tracking-widest"><event.typeIcon size={14} /> {event.type}</div>
// // // // //                     <span className="text-stone-warm text-[10px] uppercase tracking-widest">{event.date}</span>
// // // // //                   </div>
// // // // //                   <h3 className="text-2xl font-serif text-rice-paper group-hover:text-clay transition-colors duration-500">{event.title}</h3>
// // // // //                   <p className="text-stone-warm font-light leading-relaxed">{event.description}</p>
// // // // //                   <div className="flex justify-between items-center pt-4 border-t border-white/5">
// // // // //                     <span className="text-lg font-serif text-white">{event.price}</span>
// // // // //                     <button className="flex items-center gap-2 bg-clay text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-500">
// // // // //                       <Calendar size={14} /> {event.cta}
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </section>

// // // // //         {/* ARCHIVE SECTION */}
// // // // //         <section className="px-6 lg:px-40 py-24 border-t border-border-subtle bg-charcoal relative">
// // // // //           <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
// // // // //             <div className={`lg:w-1/3 space-y-6 lg:sticky lg:top-48 h-fit transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
// // // // //               <h2 className="text-4xl md:text-5xl font-serif font-light text-rice-paper tracking-tight">Archive</h2>
// // // // //               <p className="text-stone-warm text-sm max-w-xs font-light">A curated history of our past exhibitions and community gatherings.</p>
// // // // //               <div className="w-12 h-1 bg-clay/60"></div>
// // // // //             </div>

// // // // //             <div className="lg:w-2/3 relative border-l border-white/10 pl-8 lg:pl-12 space-y-20">
// // // // //               {archiveEntries.map((item, idx) => (
// // // // //                 <div key={idx} className="relative group/item">
// // // // //                   <div className="absolute -left-[37.5px] lg:-left-[53.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/20 border border-charcoal outline outline-4 outline-charcoal group-hover/item:bg-clay group-hover/item:scale-125 transition-all duration-500"></div>
// // // // //                   <div className={`space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{ transitionDelay: `${150 * idx}ms` }}>
// // // // //                     <div className="flex flex-wrap items-baseline gap-3">
// // // // //                       <h3 className="text-xl font-serif text-rice-paper group-hover/item:text-clay transition-all duration-500">{item.title}</h3>
// // // // //                       <span className="text-[10px] text-stone-warm/50 font-bold uppercase tracking-[0.2em]">{item.date}</span>
// // // // //                     </div>
// // // // //                     <p className="text-stone-warm text-sm max-w-lg leading-relaxed font-light">{item.description}</p>
// // // // //                     <div className={`grid gap-4 pt-6 ${item.layout === 'grid' ? 'grid-cols-3' : 'grid-cols-1'}`}>
// // // // //                       {item.images.map((src, i) => (
// // // // //                         <div key={i} className={`overflow-hidden rounded-xl bg-black/30 relative group/img cursor-pointer border border-white/5 hover:border-clay/30 transition-all duration-500 ${item.layout === 'wide' ? 'h-56' : 'aspect-square'}`}>
// // // // //                           <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover/img:scale-110 group-hover/img:rotate-1" />
// // // // //                           <div className="absolute inset-0 bg-black/0 group-hover/img:bg-clay/15 transition-all duration-700" />
// // // // //                         </div>
// // // // //                       ))}
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>
// // // // //         </section>

// // // // //         {/* GALLERY SECTION */}
// // // // //         <section className="px-6 lg:px-40 py-16">
// // // // //           <h2 className="text-2xl font-serif mb-12 text-center italic font-light text-rice-paper">Event Gallery</h2>
// // // // //           <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
// // // // //             {galleryImages.map((img, i) => (
// // // // //               <div key={i} className={`relative overflow-hidden mb-6 group cursor-pointer border border-border-subtle transition-all duration-1000 hover:border-clay/40 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${100 * i}ms` }}>
// // // // //                 <img src={img.src} alt={img.alt} className="w-full transition-all duration-[1500ms] group-hover:scale-110 group-hover:rotate-1" />
// // // // //                 <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
// // // // //                   <Eye className="w-6 h-6 text-white group-hover:scale-125 transition-all duration-500" />
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </section>

// // // // //         {/* NEW SECTION: THE PROCESS IN MOTION (Inserted between Gallery and Footer) */}
// // // // //         <section className="px-6 lg:px-40 py-24 bg-surface-dark border-t border-border-subtle relative overflow-hidden">
// // // // //           {/* Subtle Background Image */}
// // // // //           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzVlI8BGQMSspZ5VftfBOItr0K4kOBo5vWkTdGEdqND11OwtzoetJuopJoaWl4mC-ii7fqypDIEZlBtoa9xoekR71JXyJfRAWwRjiJGY2vVrcf92xIDWgI_HOredw7Sq9UrUQQNALmW9oGK70Qif9TAjR96GuZ9Uu77B2tmusZwR-PRiCDOKlCgf3TYAt34qeZAC81VKOdJqOd_agLTwTntabqTO1W2oldEyQ951BFgWqOZMElOjhSww885mnrRadT2Ug0QnO06go")' }}></div>
          
// // // // //           <div className="max-w-7xl mx-auto relative z-10">
// // // // //             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
// // // // //               <div className={`space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
// // // // //                 <h2 className="text-4xl font-serif text-white">The Process in Motion</h2> {/* */}
// // // // //                 <p className="text-stone-warm max-w-xl font-light leading-relaxed">
// // // // //                   From the first throw to the final firing, witness the dedication required to master the wheel. 
// // // // //                   Join our workshops to get your hands dirty. {/* */}
// // // // //                 </p>
// // // // //               </div>
// // // // //               <button className={`flex items-center gap-2 bg-clay text-white px-8 py-3 rounded-xl font-bold transition-all duration-500 hover:bg-white hover:text-charcoal shadow-lg ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
// // // // //                 <CalendarDays size={20} />
// // // // //                 Book a Workshop {/* */}
// // // // //               </button>
// // // // //             </div>

// // // // //             {/* Snap Scroll Grid for Video/GIF Cards */}
// // // // //             <div className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
// // // // //               {processVideos.map((video, idx) => (
// // // // //                 <div 
// // // // //                   key={idx} 
// // // // //                   className={`snap-center shrink-0 w-[300px] md:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden relative group cursor-pointer border border-white/5 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
// // // // //                   style={{ transitionDelay: `${200 * idx}ms` }}
// // // // //                 >
// // // // //                   <div 
// // // // //                     className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1" 
// // // // //                     style={{ backgroundImage: `url("${video.thumbnail}")` }} 
// // // // //                   />
// // // // //                   <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/50 transition-colors duration-500 flex items-center justify-center">
// // // // //                     <div className="size-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:scale-110 group-hover:bg-clay group-hover:border-clay transition-all duration-500">
// // // // //                       <Play size={32} fill="currentColor" />
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-charcoal to-transparent">
// // // // //                     <p className="text-white font-bold text-lg mb-1">{video.title}</p>
// // // // //                     <p className="text-stone-warm text-sm font-light italic">{video.category}</p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))}

// // // // //               {/* View Full Archive Placeholder */}
// // // // //               <div className={`snap-center shrink-0 w-[300px] md:w-[380px] aspect-[4/5] rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center p-8 transition-all duration-1000 group hover:border-clay/40 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '800ms' }}>
// // // // //                 <div className="size-20 rounded-full bg-white/5 flex items-center justify-center text-stone-warm mb-4 group-hover:text-clay group-hover:bg-white/10 transition-all duration-500">
// // // // //                   <Eye size={40} />
// // // // //                 </div>
// // // // //                 <h3 className="text-white font-bold text-xl">View Full Archive</h3>
// // // // //                 <p className="text-stone-warm text-sm font-light mt-2 italic">See 50+ more process videos</p>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </section>

// // // // //       </main>

// // // // //       <Footer />

// // // // //       <style jsx>{`
// // // // //         @keyframes grain-shift {
// // // // //           0%, 100% { transform: translate(0, 0); }
// // // // //           10% { transform: translate(-5%, -5%); }
// // // // //           50% { transform: translate(-10%, 5%); }
// // // // //           90% { transform: translate(10%, 5%); }
// // // // //         }
// // // // //         .animate-grain-shift { animation: grain-shift 12s ease-in-out infinite; }
// // // // //         .no-scrollbar::-webkit-scrollbar { display: none; }
// // // // //         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
// // // // //       `}</style>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import React, { useState, useEffect, useRef } from "react";
// // // // import Header from "../../components/Header";
// // // // import Footer from "../../components/Footer";

// // // // // Icons
// // // // import { 
// // // //   MapPin, Calendar, Mail, Globe, Store, Eye, 
// // // //   Play, CalendarDays, ChevronLeft, ChevronRight 
// // // // } from "lucide-react";

// // // // // Images
// // // // import heroStudio from "../../assets/hero-studio.jpg";
// // // // import eventHands from "../../assets/event-hands.jpg";
// // // // import eventGallery from "../../assets/event-gallery.jpg";

// // // // // Archive Images
// // // // import archiveTea from "../../assets/archive-tea.jpg";
// // // // import archiveBowls from "../../assets/archive-bowls.jpg";
// // // // import archiveTexture from "../../assets/archive-texture.jpg";
// // // // import archiveMarket from "../../assets/archive-market.jpg";

// // // // // Gallery Images
// // // // import galleryTools from "../../assets/gallery-tools.jpg";
// // // // import galleryVase from "../../assets/gallery-vase.jpg";
// // // // import galleryMugs from "../../assets/gallery-mugs.jpg";
// // // // import galleryPeople from "../../assets/gallery-people.jpg";
// // // // import gallerySculpture from "../../assets/gallery-sculpture.jpg";

// // // // export default function WorkshopsPage() {
// // // //   const [email, setEmail] = useState("");
// // // //   const [isVisible, setIsVisible] = useState(false);
// // // //   const sectionRef = useRef(null);
// // // //   const scrollRef = useRef(null); // Ref for mouse scrolling

// // // //   // Intersection Observer for Reveal Animations
// // // //   useEffect(() => {
// // // //     const observer = new IntersectionObserver(
// // // //       ([entry]) => {
// // // //         if (entry.isIntersecting) {
// // // //           setIsVisible(true);
// // // //         }
// // // //       },
// // // //       { threshold: 0.1 }
// // // //     );

// // // //     if (sectionRef.current) observer.observe(sectionRef.current);
// // // //     return () => {
// // // //       if (sectionRef.current) observer.unobserve(sectionRef.current);
// // // //     };
// // // //   }, []);

// // // //   // Function to scroll the Process container via buttons
// // // //   const scroll = (direction) => {
// // // //     if (scrollRef.current) {
// // // //       const { scrollLeft, clientWidth } = scrollRef.current;
// // // //       const scrollTo = direction === 'left' 
// // // //         ? scrollLeft - clientWidth 
// // // //         : scrollLeft + clientWidth;
      
// // // //       scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
// // // //     }
// // // //   };

// // // //   // Enable mouse-wheel horizontal scrolling
// // // //   const handleWheel = (e) => {
// // // //     if (e.deltaY !== 0 && scrollRef.current) {
// // // //       // Allow standard vertical scroll unless mouse is specifically over the slider
// // // //       // Optional: remove preventDefault if you want both behaviors
// // // //       scrollRef.current.scrollLeft += e.deltaY;
// // // //     }
// // // //   };

// // // //   const upcomingEvents = [
// // // //     {
// // // //       id: 1,
// // // //       date: "Oct 12–14",
// // // //       type: "Symposium",
// // // //       typeIcon: Globe,
// // // //       title: "Tokyo Clay Symposium",
// // // //       description: "Join us for a three-day intensive symposium featuring master potters from across Japan.",
// // // //       location: "Shibuya, Tokyo",
// // // //       price: "Starting from ¥5,000",
// // // //       cta: "RSVP Now",
// // // //       image: eventHands.src || eventHands,
// // // //     },
// // // //     {
// // // //       id: 2,
// // // //       date: "Nov 05–07",
// // // //       type: "Pop-up Store",
// // // //       typeIcon: Store,
// // // //       title: "London Craft Week Pop-up",
// // // //       description: "Experience our latest autumn collection in the heart of Shoreditch.",
// // // //       location: "Shoreditch, London",
// // // //       price: "Free Entry",
// // // //       cta: "Get Tickets",
// // // //       image: eventGallery.src || eventGallery,
// // // //     },
// // // //   ];

// // // //   const processVideos = [
// // // //     {
// // // //       title: "Centering the Clay",
// // // //       category: "Beginner Workshop",
// // // //       thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkfQSTSEh36B1Dql9Ovp2do_xzWdZLL9fMGeLAkcieSiX9IzdgZcIcfhlC3Jt1FqX8fy47b7gXbrmftvN0CD8sI3T-qirhzAtqys0o89Xnoxply0sz38oC67jXAJP66CsZa2oStWQ_EFY35RPPYJiU9hxMZR6Cryk4JumPPrWlBdZKnmAbWS5mE_BJsEOMSoaDJZz9sAne5cGMbT7-ElMJayZWzRYZdicXWauCnZOymi7ksYIzHoKd4A9m3V-3NaB4-jR5XZJfseY",
// // // //     },
// // // //     {
// // // //       title: "Trimming & Texturing",
// // // //       category: "Intermediate",
// // // //       thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_kBG6GQTk-1qYwJANSxcqg1Cio6s0i4fcyJSLoJbV4hvcN_xIbYYxApFtDt77__22rG-nJJ8vidxEcA7XVAJU8OAOM1ZIswWj3Hf82MSch4Jfs_2OYH18NTthyvheortV7lRbz9dLKSsVq0cCyd8J-rODwpY1Xyopqm_uPA2AqZAlr_9sXeobyhrJslWLKM1mkmosB5NmuTDxAjnDX0EwIEFyhvcqalVicySg3ChPayYicaw-6Y3aHLyapTmG56YLEwzIDuDEeU4",
// // // //     },
// // // //     {
// // // //       title: "Glazing Techniques",
// // // //       category: "Masterclass",
// // // //       thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX2t5wLx4f-r2u-8PQD9Q-prN2XQCtO-hZ1BNACkc9AQW-efE7fCb515xcuMh1zvLAfK0P3akT-6RU1Fh-13sX0rvOQSDEYb05iEmkgT8LQi_x4Hh7aK42kdU-0751lb0DUrL2dEXgcE28yNsYa7PCb_b2deSs1996MrROapUvO2QWlf0q3jamay-kB3JgV1wrk4LfU7oAUrCp_g33KcuiUFSlqE0A1EU47f5x1Zo1fmHoy0n7pjyZ-LBG9pTCjeqO9u90yC7WjFE",
// // // //     }
// // // //   ];

// // // //   const archiveEntries = [
// // // //     {
// // // //       title: "Kyoto Spring Collection",
// // // //       date: "April 2023",
// // // //       description: "Launched our Sakura-inspired glaze series in a historic Machiya townhouse.",
// // // //       images: [archiveTea.src || archiveTea, archiveBowls.src || archiveBowls, archiveTexture.src || archiveTexture],
// // // //       layout: "grid"
// // // //     },
// // // //     {
// // // //       title: "NYC Maker's Market",
// // // //       date: "December 2022",
// // // //       description: "Our first international showcase at the Brooklyn Expo Center.",
// // // //       images: [archiveMarket.src || archiveMarket],
// // // //       layout: "wide"
// // // //     }
// // // //   ];

// // // //   const galleryImages = [
// // // //     { src: galleryTools.src || galleryTools, alt: "Pottery tools" },
// // // //     { src: galleryVase.src || galleryVase, alt: "Ceramic vase" },
// // // //     { src: eventHands.src || eventHands, alt: "Wheel throwing" },
// // // //     { src: galleryMugs.src || galleryMugs, alt: "Ceramic mugs" },
// // // //     { src: galleryPeople.src || galleryPeople, alt: "Gallery opening" },
// // // //     { src: gallerySculpture.src || gallerySculpture, alt: "Glaze texture" },
// // // //   ];

// // // //   return (
// // // //     <div className="relative min-h-screen bg-charcoal text-rice-paper flex flex-col overflow-hidden">
// // // //       <Header />

// // // //       <div className="fixed inset-0 opacity-[0.12] pointer-events-none z-0">
// // // //         <div 
// // // //           className="absolute inset-0 animate-grain-shift" 
// // // //           style={{ 
// // // //             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
// // // //             backgroundSize: '200px 200px'
// // // //           }} 
// // // //         />
// // // //       </div>

// // // //       <main ref={sectionRef} className="relative z-10 pt-32 flex-grow">
        
// // // //         {/* HERO SECTION */}
// // // //         <section className="px-6 lg:px-40 py-10">
// // // //           <div
// // // //             className={`rounded-2xl min-h-[520px] flex items-center justify-center text-center bg-cover bg-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
// // // //             style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.75)), url(${heroStudio.src || heroStudio})` }}
// // // //           >
// // // //             <div className="max-w-2xl space-y-6 p-8">
// // // //               <span className="uppercase tracking-[0.3em] text-[10px] text-clay font-bold block">Workshops & Exhibitions</span>
// // // //               <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight">Basho On Tour</h1>
// // // //               <p className="text-stone-warm text-lg md:text-xl font-light">Experience handcrafted pottery through immersive workshops and exhibitions across the globe.</p>
// // // //             </div>
// // // //           </div>
// // // //         </section>

// // // //         {/* UPCOMING EVENTS */}
// // // //         <section className="px-6 lg:px-40 py-16">
// // // //           <div className="max-w-5xl mx-auto space-y-10">
// // // //             <h2 className="text-3xl font-serif">Upcoming Events</h2>
// // // //             {upcomingEvents.map((event, index) => (
// // // //               <div key={event.id} className="group flex flex-col md:flex-row gap-8 border border-border-subtle p-6 bg-charcoal-light transition-all duration-700 hover:border-clay/20 hover:bg-white/5 hover:-translate-y-1">
// // // //                 <div className="md:w-1/3 h-56 relative overflow-hidden bg-black/20">
// // // //                   <div className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110" style={{ backgroundImage: `url(${event.image})` }} />
// // // //                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
// // // //                     <Eye className="w-8 h-8 text-white transition-transform group-hover:scale-110" />
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="flex-1 space-y-4">
// // // //                   <div className="flex items-center justify-between">
// // // //                     <div className="flex items-center gap-2 text-clay text-[10px] uppercase font-bold tracking-widest"><event.typeIcon size={14} /> {event.type}</div>
// // // //                     <span className="text-stone-warm text-[10px] uppercase tracking-widest">{event.date}</span>
// // // //                   </div>
// // // //                   <h3 className="text-2xl font-serif text-rice-paper group-hover:text-clay transition-colors duration-500">{event.title}</h3>
// // // //                   <p className="text-stone-warm font-light leading-relaxed">{event.description}</p>
// // // //                   <div className="flex justify-between items-center pt-4 border-t border-white/5">
// // // //                     <span className="text-lg font-serif text-white">{event.price}</span>
// // // //                     <button className="flex items-center gap-2 bg-clay text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-500">
// // // //                       <Calendar size={14} /> {event.cta}
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </section>

// // // //         {/* ARCHIVE SECTION */}
// // // //         <section className="px-6 lg:px-40 py-24 border-t border-border-subtle bg-charcoal relative">
// // // //           <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
// // // //             <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-48 h-fit">
// // // //               <h2 className="text-4xl md:text-5xl font-serif font-light text-rice-paper">Archive</h2>
// // // //               <p className="text-stone-warm text-sm max-w-xs font-light leading-relaxed">A curated history of our past exhibitions and community gatherings.</p>
// // // //               <div className="w-12 h-1 bg-clay/60"></div>
// // // //             </div>

// // // //             <div className="lg:w-2/3 relative border-l border-white/10 pl-8 lg:pl-12 space-y-20">
// // // //               {archiveEntries.map((item, idx) => (
// // // //                 <div key={idx} className="relative group/item">
// // // //                   <div className="absolute -left-[37.5px] lg:-left-[53.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/20 border border-charcoal outline outline-4 outline-charcoal group-hover/item:bg-clay group-hover/item:scale-125 transition-all duration-500"></div>
// // // //                   <div className="space-y-4 transition-all duration-1000">
// // // //                     <div className="flex flex-wrap items-baseline gap-3">
// // // //                       <h3 className="text-xl font-serif text-rice-paper group-hover/item:text-clay transition-all duration-500">{item.title}</h3>
// // // //                       <span className="text-[10px] text-stone-warm/50 font-bold uppercase tracking-[0.2em]">{item.date}</span>
// // // //                     </div>
// // // //                     <p className="text-stone-warm text-sm max-w-lg leading-relaxed font-light">{item.description}</p>
// // // //                     <div className={`grid gap-4 pt-6 ${item.layout === 'grid' ? 'grid-cols-3' : 'grid-cols-1'}`}>
// // // //                       {item.images.map((src, i) => (
// // // //                         <div key={i} className={`overflow-hidden rounded-xl bg-black/30 relative group/img cursor-pointer border border-white/5 hover:border-clay/30 transition-all duration-500 ${item.layout === 'wide' ? 'h-56' : 'aspect-square'}`}>
// // // //                           <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover/img:scale-110 group-hover/img:rotate-1" />
// // // //                           <div className="absolute inset-0 bg-black/0 group-hover/img:bg-clay/15 transition-all duration-700" />
// // // //                         </div>
// // // //                       ))}
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </section>

// // // //         {/* GALLERY SECTION */}
// // // //         <section className="px-6 lg:px-40 py-16">
// // // //           <h2 className="text-2xl font-serif mb-12 text-center italic font-light text-rice-paper">Event Gallery</h2>
// // // //           <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
// // // //             {galleryImages.map((img, i) => (
// // // //               <div key={i} className="relative overflow-hidden mb-6 group cursor-pointer border border-border-subtle transition-all duration-1000 hover:border-clay/40 hover:-translate-y-1">
// // // //                 <img src={img.src} alt={img.alt} className="w-full transition-all duration-[1500ms] group-hover:scale-110" />
// // // //                 <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
// // // //                   <Eye className="w-6 h-6 text-white group-hover:scale-125 transition-all duration-500" />
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </section>

// // // //         {/* UPDATED SECTION: THE PROCESS IN MOTION (With Mouse Controls) */}
// // // //         <section className="px-6 lg:px-40 py-24 bg-surface-dark border-t border-border-subtle relative overflow-hidden">
// // // //           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzVlI8BGQMSspZ5VftfBOItr0K4kOBo5vWkTdGEdqND11OwtzoetJuopJoaWl4mC-ii7fqypDIEZlBtoa9xoekR71JXyJfRAWwRjiJGY2vVrcf92xIDWgI_HOredw7Sq9UrUQQNALmW9oGK70Qif9TAjR96GuZ9Uu77B2tmusZwR-PRiCDOKlCgf3TYAt34qeZAC81VKOdJqOd_agLTwTntabqTO1W2oldEyQ951BFgWqOZMElOjhSww885mnrRadT2Ug0QnO06go")' }}></div>
          
// // // //           <div className="max-w-7xl mx-auto relative z-10">
// // // //             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
// // // //               <div className="space-y-4">
// // // //                 <h2 className="text-4xl font-serif text-white">The Process in Motion</h2>
// // // //                 <p className="text-stone-warm max-w-xl font-light leading-relaxed">
// // // //                   From the first throw to the final firing, witness the dedication required to master the wheel. 
// // // //                   Join our workshops to get your hands dirty.
// // // //                 </p>
// // // //               </div>

// // // //               {/* Navigation Controls for Mouse Users */}
// // // //               <div className="flex gap-4 items-center">
// // // //                 <div className="flex gap-2 mr-4">
// // // //                   <button 
// // // //                     onClick={() => scroll('left')}
// // // //                     className="p-3 rounded-full border border-white/10 text-white hover:bg-clay hover:border-clay transition-all duration-300"
// // // //                     aria-label="Scroll Left"
// // // //                   >
// // // //                     <ChevronLeft size={20} />
// // // //                   </button>
// // // //                   <button 
// // // //                     onClick={() => scroll('right')}
// // // //                     className="p-3 rounded-full border border-white/10 text-white hover:bg-clay hover:border-clay transition-all duration-300"
// // // //                     aria-label="Scroll Right"
// // // //                   >
// // // //                     <ChevronRight size={20} />
// // // //                   </button>
// // // //                 </div>
// // // //                 <button className="flex items-center gap-2 bg-clay text-white px-8 py-3 rounded-xl font-bold transition-all duration-500 hover:bg-white hover:text-charcoal shadow-lg">
// // // //                   <CalendarDays size={20} />
// // // //                   Book a Workshop
// // // //                 </button>
// // // //               </div>
// // // //             </div>

// // // //             {/* Scrollable Container with Mouse Wheel and Ref */}
// // // //             <div 
// // // //               ref={scrollRef}
// // // //               onWheel={handleWheel}
// // // //               className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing"
// // // //             >
// // // //               {processVideos.map((video, idx) => (
// // // //                 <div 
// // // //                   key={idx} 
// // // //                   className="snap-center shrink-0 w-[300px] md:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden relative group cursor-pointer border border-white/5 transition-all duration-1000"
// // // //                 >
// // // //                   <div 
// // // //                     className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110" 
// // // //                     style={{ backgroundImage: `url("${video.thumbnail}")` }} 
// // // //                   />
// // // //                   <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/50 transition-colors duration-500 flex items-center justify-center">
// // // //                     <div className="size-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-clay group-hover:border-clay transition-all duration-500">
// // // //                       <Play size={32} fill="currentColor" />
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-charcoal to-transparent">
// // // //                     <p className="text-white font-bold text-lg mb-1">{video.title}</p>
// // // //                     <p className="text-stone-warm text-sm font-light italic">{video.category}</p>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}

// // // //               <div className="snap-center shrink-0 w-[300px] md:w-[380px] aspect-[4/5] rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center p-8 group hover:border-clay/40 transition-all">
// // // //                 <div className="size-20 rounded-full bg-white/5 flex items-center justify-center text-stone-warm mb-4 group-hover:text-clay group-hover:bg-white/10 transition-all duration-500">
// // // //                   <Eye size={40} />
// // // //                 </div>
// // // //                 <h3 className="text-white font-bold text-xl">View Full Archive</h3>
// // // //                 <p className="text-stone-warm text-sm font-light mt-2 italic">See 50+ more process videos</p>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </section>

// // // //       </main>

// // // //       <Footer />

// // // //       <style jsx>{`
// // // //         @keyframes grain-shift {
// // // //           0%, 100% { transform: translate(0, 0); }
// // // //           10% { transform: translate(-5%, -5%); }
// // // //           50% { transform: translate(-10%, 5%); }
// // // //           90% { transform: translate(10%, 5%); }
// // // //         }
// // // //         .animate-grain-shift { animation: grain-shift 12s ease-in-out infinite; }
// // // //         .no-scrollbar::-webkit-scrollbar { display: none; }
// // // //         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import React, { useState, useEffect, useRef } from "react";
// // // import Header from "../../components/Header";
// // // import Footer from "../../components/Footer";

// // // // Icons
// // // import { 
// // //   MapPin, Calendar, Mail, Globe, Store, Eye, 
// // //   Play, CalendarDays, ChevronLeft, ChevronRight 
// // // } from "lucide-react";

// // // // Images (Relative Imports)
// // // import heroStudio from "../../assets/hero-studio.jpg";
// // // import eventHands from "../../assets/event-hands.jpg";
// // // import eventGallery from "../../assets/event-gallery.jpg";

// // // export default function WorkshopsPage() {
// // //   const [email, setEmail] = useState("");
// // //   const [isVisible, setIsVisible] = useState(false);
// // //   const sectionRef = useRef(null);
// // //   const scrollRef = useRef(null);

// // //   // Intersection Observer for Reveal Animations
// // //   useEffect(() => {
// // //     const observer = new IntersectionObserver(
// // //       ([entry]) => {
// // //         if (entry.isIntersecting) {
// // //           setIsVisible(true);
// // //         }
// // //       },
// // //       { threshold: 0.1 }
// // //     );

// // //     if (sectionRef.current) observer.observe(sectionRef.current);
// // //     return () => {
// // //       if (sectionRef.current) observer.unobserve(sectionRef.current);
// // //     };
// // //   }, []);

// // //   // Function to scroll the Process container via buttons
// // //   const scroll = (direction) => {
// // //     if (scrollRef.current) {
// // //       const { scrollLeft, clientWidth } = scrollRef.current;
// // //       const scrollTo = direction === 'left' 
// // //         ? scrollLeft - clientWidth 
// // //         : scrollLeft + clientWidth;
      
// // //       scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
// // //     }
// // //   };

// // //   // Enable mouse-wheel horizontal scrolling
// // //   const handleWheel = (e) => {
// // //     if (e.deltaY !== 0 && scrollRef.current) {
// // //       scrollRef.current.scrollLeft += e.deltaY;
// // //     }
// // //   };

// // //   // Mapped Data from your HTML code images
// // //   const upcomingEvents = [
// // //     {
// // //       id: 1,
// // //       date: "Oct 12–14",
// // //       type: "Symposium",
// // //       typeIcon: Globe,
// // //       title: "Tokyo Clay Symposium",
// // //       description: "Join us for a three-day intensive symposium featuring master potters from across Japan.",
// // //       location: "Shibuya, Tokyo",
// // //       price: "Starting from ¥5,000",
// // //       cta: "RSVP Now",
// // //       image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGRDd2nVe_IK-X51MgSOQROGEsK-Tvu2nKjgJ1CDnoiEakSHS4Z4H0boJ7fvJCeYqeno3SmEh_pfm8YKvJfX3DCR3xeCKdz2Ck26KrdCLzKjj5Iwc3smvqRBr5JXDJYNSySfZk0LuHsIa9U-cjkmeWmu4RDvJcx3nX0iqGTetE4mInz85x3MbRm2-xl0j5xfovmOzMjtTngUIUmRrh3f3nJCuHwfPgIOX3-1XYPNAEluhpPw3_CzR1y5dkyBlvr96E3KLBKpoiTdw", // From Event Card 1 in HTML
// // //     },
// // //     {
// // //       id: 2,
// // //       date: "Nov 05–07",
// // //       type: "Pop-up Store",
// // //       typeIcon: Store,
// // //       title: "London Craft Week Pop-up",
// // //       description: "Experience our latest autumn collection in the heart of Shoreditch.",
// // //       location: "Shoreditch, London",
// // //       price: "Free Entry",
// // //       cta: "Get Tickets",
// // //       image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE-0ymO2eTNzS2XpsmEaFmWVRgbUA5gjE8XoiSbySE7ZwchsK0nLaike6BUzuL2YekTsqTzb7Df2UEaObRSa34jATVXmFlhe7DqVZiuwvNvboQ-MXkGwWNiJPsvrAKjcfrqBu9XFgoiZ4kVL6fL_XYkw48M1kg3RVlYwiGgosc-0udRNMEdHownl5YoKz0JwhYUz_wAqNLLuMKbsorm7CFLOmATYs3wzxU8nFM1lK-OiB-KywB_Nus4v1L8knBwlD6KMq4L-PqKp8", // From Event Card 2 in HTML
// // //     },
// // //   ];

// // //   const archiveEntries = [
// // //     {
// // //       title: "Kyoto Spring Collection",
// // //       date: "April 2023",
// // //       description: "Launched our Sakura-inspired glaze series in a historic Machiya townhouse.",
// // //       images: [
// // //         "https://lh3.googleusercontent.com/aida-public/AB6AXuAzSvikLZRIXWTRdnQ9Rn-58k2LnpphGeX9cchpf5DjSB6yLjG5v8vuzL3wEOBPejHhw3eHBCehScoGvUY41MLyUigA9g1ttBOsLgScuK-wsThP58qdQGP7p9u6ijv7WlrG5pVuhhCt-LbGZmeSrNKxXSVFta5Zcud_uc6x9V7X-PGoEtDLcAkxO6ORbqzNoeCDmYNMbYMZ3p5bQaDXjH3bKhf-SwCIu4ToBSZYo9m9MqNZfXE0zM9scWrrfQSb49t6Mjh7bR9ONcg",
// // //         "https://lh3.googleusercontent.com/aida-public/AB6AXuBfymnDh9A5-5_bF1ILClRoT87zywTV23RroY9fKLtpcX914MYN20rjW06n7uJtCQrlTk0FapNxr-Muna_Xf3V20F8_4WgHarxEdPu1YnZY80PBlQbsjRFKvU5IXqocB42vc5gV_5XLc4hhPksVYJJOJEJPmJ7p58Udoj7rTh64CB1gVSM2kJSfjYjRbs_-TOV_txOMuXRLkWXOm2UGaanEWto_jGp2d16du_6OKyqNDhG-pKHsoHlBPyz8jC5o7QhoEjs43mn7Bic",
// // //         "https://lh3.googleusercontent.com/aida-public/AB6AXuDdXPnxHqZe5o8e1QGYvSlFCXvCXHHOOE56vAQzkeWzLQiyuWN6s9oZqEHG6PFWJw0yrAgYwJxrgJ9fiIu45oQUuwEhiseZ1zcJgA6VRUBB0lb0tmsE_TVmMyPpDRFCrjuXfSDvMt-F63QIr1NiuwUNBndZLkNC-_31H0FUOq3-dfHC5AGSeMGYYhVKVnqYwa-cGicLN4trl74TxlxgcM6IhF0PXoKr86ETiZalj_AolQBctrFV9cym2RWCQNx5032WEqzIczwTV4c"
// // //       ],
// // //       layout: "grid"
// // //     },
// // //     {
// // //       title: "NYC Maker's Market",
// // //       date: "December 2022",
// // //       description: "Our first international showcase at the Brooklyn Expo Center.",
// // //       images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuA4J3UELqpUYtJu1G2ygUpA4hfVLy5-nx4Alz2DWTdhT3FdBp5ibJ1cRXXfseimmQhj6UB9vQke5Pq2_eMREnCFGfqnSs2fwieeWtnK_LiQLItC3xmrSBFuBspZJ28vGIWKAxpmifwhZRfau384KWy8C3cBnXSXJx19PCc5U432lm7R3jrLWB_qTBLHrEWzFQYtic9AEb_PRf0IxDMUIYVri5Hgydy_qCoHqrYdRBXil9KZ6Xu1R4tn63InT_pMcNZLkYu-eNSMrvs"],
// // //       layout: "wide"
// // //     }
// // //   ];

// // //   const galleryImages = [
// // //     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC85uH5UKlidA-CtFkHDdAB2O0mO29nYa_27pHXwOSGbB9kkhZso92ITZnEsnF_G0rt344RxlqyGXwKBJtkMXgs2GBjLujP3NbunCfKUk82qYDb0q_lmJPtocU83tJRH5kQkSHEGFqo5g0yi4CMHLFto1xov5u_2QEiTvBwivouVlkyGjWYPJe43IM1QmP0oE5gvgCNPEJSFK0EtjBbSCytt1GCfzkKP89H9aF2-DVhd94Ap5WxDBRDvOI9uDw1LmmAmhmhDvzXcag", alt: "Pottery tools" },
// // //     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRVF8jPYdqvWZX-CrRyjvORZhgO--VlHwCuKV4bN9YSjvGQzenAhNOXQlgNHc0191nS6fwoxAAmdTBHdaFLBbI-V5HLQkNuxUYAX6W_gaaSE7CKgORY7A5OISrf4zfm7Ru4T_hMhYk6ItIbEiNaDx9S742E6Gpxyv3b4coZmVf4dA5CRDI8qF00hISaX3DXJrjCC_uZhsdR2vVT9_k60aCfPwaq3HIKJzz8k4AiOUAZTXj6kOZfrCP9pvbWu7Tm_Xy2EoukRGPEVY", alt: "Ceramic vase" },
// // //     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlHv1UTUijn4z3S5KIhiliHlLIhzyF-XEIg17J8dArjgAGXLUKjaGeJLIqwQvJSc5VGU_87lcWPjUj8LjAA0Llbact158tvCwsVCUoKBxXz9J7Q23ZAJ-9RBHP9upQ3g8VdyhafaAIus9nq9n05Oir9kgZPaBtapw8y1GW6ZfFvaXnzdZFfQY48nsPWGRKclJDwllEKvFuwjyKDD33hzmd27McmLqGVgvZiCwLLLo2Q5fyfIT8BLIQwNXhieYdd0QooSt5Z7ATNYQ", alt: "Wheel throwing" },
// // //     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO4wzAQLQ_B4Pn_lCB0iGkPxKD6lHWg_bsv2UwbPdfmKNIn9T4_MC_A_C95xLhxkJTHu_nYly2HqQGq4fRJveGI_xiwds0jyTMSrgyBKxDJUNsHj_11SprlOD2FtHH1w43uVLd3gQS8fzItT6tVmn9KQbpnHKeWFAjVTCyTHVfnBZzniGrDA6Y8eONnIJWM3v3mTLE8x3jNATkBkCVxeixxd_N57yhjBR-oGXz6dy-ShlAi02pff89WfXb7eCscb9CHPUPQfshHxY", alt: "Ceramic mugs" },
// // //     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-ZJOKFjak54eJ3qs2Q5WXlv3J0Pf1S8F3aY26l4_DAgV1WLCFv6znk_Qsng2ObY15rPgjpO-f1Rr3vEIDv8bIj_Jux1LlWUTfxPWi_5Z8BzN0pDSHYU0_qIazOABz6MlSOthz6K1gM4g-HC8ooqxJUesOaubCg97xsgMh065UExJ2AZ7DTRhNbnGnvwcKWhj2b0xIkLr-mW82_rt_YI1YQWPEYfhHDyTFzMkLRWmv-pwv3XUnm9jB2osjbMnJY9p8WeRAamn9UaU", alt: "Gallery opening" },
// // //     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVoCn_McQ-7nzXqm19QCTpWVvkdC7yjfC2rzjtqV2KUeOO9miOX5TS15YSTJTIiHhDYXympmCphmuxZCdeLayjrxwQTm9AxmnMoh9wazeKuOmX-3lJDb_uog4VlDPFDpDJlYEJn756zLlCWc0dkO8RwLRrosgbhLGXM1FCbOKRwDLLxYqCDJmogUS08kZstXOiMPDNjzJlhJLn42AV82uPs-Ab6wA1MGp9vv_DAwhGOQ7mYXV4DNLN7jFOIC32jx7PsdVGk7SPUyk", alt: "Glaze texture" },
// // //   ];

// // //   const processVideos = [
// // //     {
// // //       title: "Centering the Clay",
// // //       category: "Beginner Workshop",
// // //       thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkfQSTSEh36B1Dql9Ovp2do_xzWdZLL9fMGeLAkcieSiX9IzdgZcIcfhlC3Jt1FqX8fy47b7gXbrmftvN0CD8sI3T-qirhzAtqys0o89Xnoxply0sz38oC67jXAJP66CsZa2oStWQ_EFY35RPPYJiU9hxMZR6Cryk4JumPPrWlBdZKnmAbWS5mE_BJsEOMSoaDJZz9sAne5cGMbT7-ElMJayZWzRYZdicXWauCnZOymi7ksYIzHoKd4A9m3V-3NaB4-jR5XZJfseY",
// // //     },
// // //     {
// // //       title: "Trimming & Texturing",
// // //       category: "Intermediate",
// // //       thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_kBG6GQTk-1qYwJANSxcqg1Cio6s0i4fcyJSLoJbV4hvcN_xIbYYxApFtDt77__22rG-nJJ8vidxEcA7XVAJU8OAOM1ZIswWj3Hf82MSch4Jfs_2OYH18NTthyvheortV7lRbz9dLKSsVq0cCyd8J-rODwpY1Xyopqm_uPA2AqZAlr_9sXeobyhrJslWLKM1mkmosB5NmuTDxAjnDX0EwIEFyhvcqalVicySg3ChPayYicaw-6Y3aHLyapTmG56YLEwzIDuDEeU4",
// // //     },
// // //     {
// // //       title: "Glazing Techniques",
// // //       category: "Masterclass",
// // //       thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX2t5wLx4f-r2u-8PQD9Q-prN2XQCtO-hZ1BNACkc9AQW-efE7fCb515xcuMh1zvLAfK0P3akT-6RU1Fh-13sX0rvOQSDEYb05iEmkgT8LQi_x4Hh7aK42kdU-0751lb0DUrL2dEXgcE28yNsYa7PCb_b2deSs1996MrROapUvO2QWlf0q3jamay-kB3JgV1wrk4LfU7oAUrCp_g33KcuiUFSlqE0A1EU47f5x1Zo1fmHoy0n7pjyZ-LBG9pTCjeqO9u90yC7WjFE",
// // //     }
// // //   ];

// // //   return (
// // //     <div className="relative min-h-screen bg-charcoal text-rice-paper flex flex-col overflow-hidden">
// // //       <Header />

// // //       {/* Grain Texture Background */}
// // //       <div className="fixed inset-0 opacity-[0.12] pointer-events-none z-0">
// // //         <div 
// // //           className="absolute inset-0 animate-grain-shift" 
// // //           style={{ 
// // //             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
// // //             backgroundSize: '200px 200px'
// // //           }} 
// // //         />
// // //       </div>

// // //       <main ref={sectionRef} className="relative z-10 pt-32 flex-grow">
        
// // //         {/* HERO SECTION */}
// // //         <section className="px-6 lg:px-40 py-10">
// // //           <div
// // //             className={`rounded-2xl min-h-[520px] flex items-center justify-center text-center bg-cover bg-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
// // //             style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.75)), url(${heroStudio.src || heroStudio})` }}
// // //           >
// // //             <div className="max-w-2xl space-y-6 p-8">
// // //               <span className="uppercase tracking-[0.3em] text-[10px] text-clay font-bold block transition-all duration-700 delay-300">Workshops & Exhibitions</span>
// // //               <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight transition-all duration-1000 delay-500">Basho On Tour</h1>
// // //               <p className="text-stone-warm text-lg md:text-xl font-light transition-all duration-1000 delay-700">Experience handcrafted pottery through immersive workshops and exhibitions across the globe.</p>
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* UPCOMING EVENTS */}
// // //         <section className="px-6 lg:px-40 py-16">
// // //           <div className="max-w-5xl mx-auto space-y-10">
// // //             <h2 className={`text-3xl font-serif transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Upcoming Events</h2>
// // //             {upcomingEvents.map((event, index) => (
// // //               <div key={event.id} className={`group flex flex-col md:flex-row gap-8 border border-border-subtle p-6 bg-charcoal-light transition-all duration-700 hover:border-clay/20 hover:bg-white/5 hover:shadow-2xl hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${200 * index}ms` }}>
// // //                 <div className="md:w-1/3 h-56 relative overflow-hidden bg-black/20 rounded-xl">
// // //                   <div className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110" style={{ backgroundImage: `url(${event.image})` }} />
// // //                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
// // //                     <Eye className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" />
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex-1 space-y-4">
// // //                   <div className="flex items-center justify-between">
// // //                     <div className="flex items-center gap-2 text-clay text-[10px] uppercase font-bold tracking-widest"><event.typeIcon size={14} /> {event.type}</div>
// // //                     <span className="text-stone-warm text-[10px] uppercase tracking-widest">{event.date}</span>
// // //                   </div>
// // //                   <h3 className="text-2xl font-serif text-rice-paper group-hover:text-clay transition-colors duration-500">{event.title}</h3>
// // //                   <p className="text-stone-warm font-light leading-relaxed line-clamp-2">{event.description}</p>
// // //                   <div className="flex justify-between items-center pt-4 border-t border-white/5">
// // //                     <span className="text-lg font-serif text-white">{event.price}</span>
// // //                     <button className="flex items-center gap-2 bg-clay text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all">
// // //                       <Calendar size={14} /> {event.cta}
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </section>

// // //         {/* ARCHIVE SECTION */}
// // //         <section className="px-6 lg:px-40 py-24 border-t border-border-subtle bg-charcoal relative">
// // //           <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
// // //             <div className={`lg:w-1/3 space-y-6 lg:sticky lg:top-48 h-fit transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
// // //               <h2 className="text-4xl md:text-5xl font-serif font-light text-rice-paper">Archive</h2>
// // //               <p className="text-stone-warm text-sm max-w-xs font-light">A curated history of our past exhibitions and community gatherings.</p>
// // //               <div className="w-12 h-1 bg-clay/60"></div>
// // //             </div>

// // //             <div className="lg:w-2/3 relative border-l border-white/10 pl-8 lg:pl-12 space-y-20">
// // //               {archiveEntries.map((item, idx) => (
// // //                 <div key={idx} className="relative group/item">
// // //                   <div className="absolute -left-[37.5px] lg:-left-[53.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/20 border border-charcoal outline outline-4 outline-charcoal group-hover/item:bg-clay group-hover/item:scale-125 transition-all duration-500"></div>
// // //                   <div className="space-y-4">
// // //                     <div className="flex flex-wrap items-baseline gap-3">
// // //                       <h3 className="text-xl font-serif text-rice-paper group-hover/item:text-clay transition-all duration-500">{item.title}</h3>
// // //                       <span className="text-[10px] text-stone-warm/50 font-bold uppercase tracking-[0.2em]">{item.date}</span>
// // //                     </div>
// // //                     <p className="text-stone-warm text-sm max-w-lg leading-relaxed font-light">{item.description}</p>
// // //                     <div className={`grid gap-4 pt-6 ${item.layout === 'grid' ? 'grid-cols-3' : 'grid-cols-1'}`}>
// // //                       {item.images.map((src, i) => (
// // //                         <div key={i} className={`overflow-hidden rounded-xl bg-black/30 relative group/img cursor-pointer border border-white/5 hover:border-clay/30 transition-all duration-500 ${item.layout === 'wide' ? 'h-56' : 'aspect-square'}`}>
// // //                           <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover/img:scale-110 group-hover/img:rotate-1" />
// // //                           <div className="absolute inset-0 bg-black/0 group-hover/img:bg-clay/15 transition-all duration-700" />
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* GALLERY SECTION */}
// // //         <section className="px-6 lg:px-40 py-16">
// // //           <h2 className="text-2xl font-serif mb-12 text-center italic font-light text-rice-paper">Event Gallery</h2>
// // //           <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
// // //             {galleryImages.map((img, i) => (
// // //               <div key={i} className={`relative overflow-hidden mb-6 group cursor-pointer border border-border-subtle transition-all duration-1000 hover:border-clay/40 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${100 * i}ms` }}>
// // //                 <img src={img.src} alt={img.alt} className="w-full transition-all duration-[1500ms] group-hover:scale-110" />
// // //                 <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
// // //                   <Eye className="w-6 h-6 text-white group-hover:scale-125 transition-all duration-500" />
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </section>

// // //         {/* THE PROCESS IN MOTION SECTION */}
// // //         <section className="px-6 lg:px-40 py-24 bg-surface-dark border-t border-border-subtle relative overflow-hidden">
// // //           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzVlI8BGQMSspZ5VftfBOItr0K4kOBo5vWkTdGEdqND11OwtzoetJuopJoaWl4mC-ii7fqypDIEZlBtoa9xoekR71JXyJfRAWwRjiJGY2vVrcf92xIDWgI_HOredw7Sq9UrUQQNALmW9oGK70Qif9TAjR96GuZ9Uu77B2tmusZwR-PRiCDOKlCgf3TYAt34qeZAC81VKOdJqOd_agLTwTntabqTO1W2oldEyQ951BFgWqOZMElOjhSww885mnrRadT2Ug0QnO06go")' }}></div>
          
// // //           <div className="max-w-7xl mx-auto relative z-10">
// // //             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
// // //               <div className="space-y-4">
// // //                 <h2 className="text-4xl font-serif text-white">The Process in Motion</h2>
// // //                 <p className="text-stone-warm max-w-xl font-light leading-relaxed">
// // //                   From the first throw to the final firing, witness the dedication required to master the wheel. 
// // //                   Join our workshops to get your hands dirty.
// // //                 </p>
// // //               </div>

// // //               <div className="flex gap-4 items-center">
// // //                 <div className="flex gap-2 mr-4">
// // //                   <button onClick={() => scroll('left')} className="p-3 rounded-full border border-white/10 text-white hover:bg-clay hover:border-clay transition-all duration-300" aria-label="Scroll Left">
// // //                     <ChevronLeft size={20} />
// // //                   </button>
// // //                   <button onClick={() => scroll('right')} className="p-3 rounded-full border border-white/10 text-white hover:bg-clay hover:border-clay transition-all duration-300" aria-label="Scroll Right">
// // //                     <ChevronRight size={20} />
// // //                   </button>
// // //                 </div>
// // //                 <button className="flex items-center gap-2 bg-clay text-white px-8 py-3 rounded-xl font-bold transition-all duration-500 hover:bg-white hover:text-charcoal shadow-lg">
// // //                   <CalendarDays size={20} /> Book a Workshop
// // //                 </button>
// // //               </div>
// // //             </div>

// // //             <div 
// // //               ref={scrollRef}
// // //               onWheel={handleWheel}
// // //               className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing"
// // //             >
// // //               {processVideos.map((video, idx) => (
// // //                 <div key={idx} className="snap-center shrink-0 w-[300px] md:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden relative group cursor-pointer border border-white/5 transition-all duration-1000">
// // //                   <div className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110" style={{ backgroundImage: `url("${video.thumbnail}")` }} />
// // //                   <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/50 transition-colors duration-500 flex items-center justify-center">
// // //                     <div className="size-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:scale-110 group-hover:bg-clay group-hover:border-clay transition-all duration-500">
// // //                       <Play size={32} fill="currentColor" />
// // //                     </div>
// // //                   </div>
// // //                   <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-charcoal to-transparent text-left">
// // //                     <p className="text-white font-bold text-lg mb-1">{video.title}</p>
// // //                     <p className="text-stone-warm text-sm font-light italic">{video.category}</p>
// // //                   </div>
// // //                 </div>
// // //               ))}

// // //               <div className="snap-center shrink-0 w-[300px] md:w-[380px] aspect-[4/5] rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center p-8 group hover:border-clay/40 transition-all">
// // //                 <div className="size-20 rounded-full bg-white/5 flex items-center justify-center text-stone-warm mb-4 group-hover:text-clay transition-all duration-500">
// // //                   <Eye size={40} />
// // //                 </div>
// // //                 <h3 className="text-white font-bold text-xl">View Full Archive</h3>
// // //                 <p className="text-stone-warm text-sm font-light mt-2 italic">See 50+ more process videos</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </section>

// // //       </main>

// // //       <Footer />

// // //       <style jsx>{`
// // //         @keyframes grain-shift {
// // //           0%, 100% { transform: translate(0, 0); }
// // //           10% { transform: translate(-5%, -5%); }
// // //           50% { transform: translate(-10%, 5%); }
// // //           90% { transform: translate(10%, 5%); }
// // //         }
// // //         .animate-grain-shift { animation: grain-shift 12s ease-in-out infinite; }
// // //         .no-scrollbar::-webkit-scrollbar { display: none; }
// // //         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import React, { useState, useEffect, useRef } from "react";
// // import Header from "../../components/Header";
// // import Footer from "../../components/Footer";

// // // Icons
// // import { 
// //   MapPin, Calendar, Mail, Globe, Store, Eye, 
// //   Play, CalendarDays
// // } from "lucide-react";

// // // Images (Relative Imports)
// // import heroStudio from "../../assets/hero-studio.jpg";

// // export default function WorkshopsPage() {
// //   const [email, setEmail] = useState("");
// //   const [isVisible, setIsVisible] = useState(false);
// //   const sectionRef = useRef(null);

// //   // Intersection Observer for Reveal Animations
// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           setIsVisible(true);
// //         }
// //       },
// //       { threshold: 0.1 }
// //     );

// //     if (sectionRef.current) observer.observe(sectionRef.current);
// //     return () => {
// //       if (sectionRef.current) observer.unobserve(sectionRef.current);
// //     };
// //   }, []);

// //   const upcomingEvents = [
// //     {
// //       id: 1,
// //       date: "Oct 12–14",
// //       type: "Symposium",
// //       typeIcon: Globe,
// //       title: "Tokyo Clay Symposium",
// //       description: "Join us for a three-day intensive symposium featuring master potters from across Japan.",
// //       location: "Shibuya, Tokyo",
// //       price: "Starting from ¥5,000",
// //       cta: "RSVP Now",
// //       image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGRDd2nVe_IK-X51MgSOQROGEsK-Tvu2nKjgJ1CDnoiEakSHS4Z4H0boJ7fvJCeYqeno3SmEh_pfm8YKvJfX3DCR3xeCKdz2Ck26KrdCLzKjj5Iwc3smvqRBr5JXDJYNSySfZk0LuHsIa9U-cjkmeWmu4RDvJcx3nX0iqGTetE4mInz85x3MbRm2-xl0j5xfovmOzMjtTngUIUmRrh3f3nJCuHwfPgIOX3-1XYPNAEluhpPw3_CzR1y5dkyBlvr96E3KLBKpoiTdw", 
// //     },
// //     {
// //       id: 2,
// //       date: "Nov 05–07",
// //       type: "Pop-up Store",
// //       typeIcon: Store,
// //       title: "London Craft Week Pop-up",
// //       description: "Experience our latest autumn collection in the heart of Shoreditch.",
// //       location: "Shoreditch, London",
// //       price: "Free Entry",
// //       cta: "Get Tickets",
// //       image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE-0ymO2eTNzS2XpsmEaFmWVRgbUA5gjE8XoiSbySE7ZwchsK0nLaike6BUzuL2YekTsqTzb7Df2UEaObRSa34jATVXmFlhe7DqVZiuwvNvboQ-MXkGwWNiJPsvrAKjcfrqBu9XFgoiZ4kVL6fL_XYkw48M1kg3RVlYwiGgosc-0udRNMEdHownl5YoKz0JwhYUz_wAqNLLuMKbsorm7CFLOmATYs3wzxU8nFM1lK-OiB-KywB_Nus4v1L8knBwlD6KMq4L-PqKp8", 
// //     },
// //   ];

// //   const archiveEntries = [
// //     {
// //       title: "Kyoto Spring Collection",
// //       date: "April 2023",
// //       description: "Launched our Sakura-inspired glaze series in a historic Machiya townhouse.",
// //       images: [
// //         "https://lh3.googleusercontent.com/aida-public/AB6AXuAzSvikLZRIXWTRdnQ9Rn-58k2LnpphGeX9cchpf5DjSB6yLjG5v8vuzL3wEOBPejHhw3eHBCehScoGvUY41MLyUigA9g1ttBOsLgScuK-wsThP58qdQGP7p9u6ijv7WlrG5pVuhhCt-LbGZmeSrNKxXSVFta5Zcud_uc6x9V7X-PGoEtDLcAkxO6ORbqzNoeCDmYNMbYMZ3p5bQaDXjH3bKhf-SwCIu4ToBSZYo9m9MqNZfXE0zM9scWrrfQSb49t6Mjh7bR9ONcg",
// //         "https://lh3.googleusercontent.com/aida-public/AB6AXuBfymnDh9A5-5_bF1ILClRoT87zywTV23RroY9fKLtpcX914MYN20rjW06n7uJtCQrlTk0FapNxr-Muna_Xf3V20F8_4WgHarxEdPu1YnZY80PBlQbsjRFKvU5IXqocB42vc5gV_5XLc4hhPksVYJJOJEJPmJ7p58Udoj7rTh64CB1gVSM2kJSfjYjRbs_-TOV_txOMuXRLkWXOm2UGaanEWto_jGp2d16du_6OKyqNDhG-pKHsoHlBPyz8jC5o7QhoEjs43mn7Bic",
// //         "https://lh3.googleusercontent.com/aida-public/AB6AXuDdXPnxHqZe5o8e1QGYvSlFCXvCXHHOOE56vAQzkeWzLQiyuWN6s9oZqEHG6PFWJw0yrAgYwJxrgJ9fiIu45oQUuwEhiseZ1zcJgA6VRUBB0lb0tmsE_TVmMyPpDRFCrjuXfSDvMt-F63QIr1NiuwUNBndZLkNC-_31H0FUOq3-dfHC5AGSeMGYYhVKVnqYwa-cGicLN4trl74TxlxgcM6IhF0PXoKr86ETiZalj_AolQBctrFV9cym2RWCQNx5032WEqzIczwTV4c"
// //       ],
// //       layout: "grid"
// //     },
// //     {
// //       title: "NYC Maker's Market",
// //       date: "December 2022",
// //       description: "Our first international showcase at the Brooklyn Expo Center.",
// //       images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuA4J3UELqpUYtJu1G2ygUpA4hfVLy5-nx4Alz2DWTdhT3FdBp5ibJ1cRXXfseimmQhj6UB9vQke5Pq2_eMREnCFGfqnSs2fwieeWtnK_LiQLItC3xmrSBFuBspZJ28vGIWKAxpmifwhZRfau384KWy8C3cBnXSXJx19PCc5U432lm7R3jrLWB_qTBLHrEWzFQYtic9AEb_PRf0IxDMUIYVri5Hgydy_qCoHqrYdRBXil9KZ6Xu1R4tn63InT_pMcNZLkYu-eNSMrvs"],
// //       layout: "wide"
// //     }
// //   ];

// //   const galleryImages = [
// //     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC85uH5UKlidA-CtFkHDdAB2O0mO29nYa_27pHXwOSGbB9kkhZso92ITZnEsnF_G0rt344RxlqyGXwKBJtkMXgs2GBjLujP3NbunCfKUk82qYDb0q_lmJPtocU83tJRH5kQkSHEGFqo5g0yi4CMHLFto1xov5u_2QEiTvBwivouVlkyGjWYPJe43IM1QmP0oE5gvgCNPEJSFK0EtjBbSCytt1GCfzkKP89H9aF2-DVhd94Ap5WxDBRDvOI9uDw1LmmAmhmhDvzXcag", alt: "Pottery tools" },
// //     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRVF8jPYdqvWZX-CrRyjvORZhgO--VlHwCuKV4bN9YSjvGQzenAhNOXQlgNHc0191nS6fwoxAAmdTBHdaFLBbI-V5HLQkNuxUYAX6W_gaaSE7CKgORY7A5OISrf4zfm7Ru4T_hMhYk6ItIbEiNaDx9S742E6Gpxyv3b4coZmVf4dA5CRDI8qF00hISaX3DXJrjCC_uZhsdR2vVT9_k60aCfPwaq3HIKJzz8k4AiOUAZTXj6kOZfrCP9pvbWu7Tm_Xy2EoukRGPEVY", alt: "Ceramic vase" },
// //     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlHv1UTUijn4z3S5KIhiliHlLIhzyF-XEIg17J8dArjgAGXLUKjaGeJLIqwQvJSc5VGU_87lcWPjUj8LjAA0Llbact158tvCwsVCUoKBxXz9J7Q23ZAJ-9RBHP9upQ3g8VdyhafaAIus9nq9n05Oir9kgZPaBtapw8y1GW6ZfFvaXnzdZFfQY48nsPWGRKclJDwllEKvFuwjyKDD33hzmd27McmLqGVgvZiCwLLLo2Q5fyfIT8BLIQwNXhieYdd0QooSt5Z7ATNYQ", alt: "Wheel throwing" },
// //     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO4wzAQLQ_B4Pn_lCB0iGkPxKD6lHWg_bsv2UwbPdfmKNIn9T4_MC_A_C95xLhxkJTHu_nYly2HqQGq4fRJveGI_xiwds0jyTMSrgyBKxDJUNsHj_11SprlOD2FtHH1w43uVLd3gQS8fzItT6tVmn9KQbpnHKeWFAjVTCyTHVfnBZzniGrDA6Y8eONnIJWM3v3mTLE8x3jNATkBkCVxeixxd_N57yhjBR-oGXz6dy-ShlAi02pff89WfXb7eCscb9CHPUPQfshHxY", alt: "Ceramic mugs" },
// //     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-ZJOKFjak54eJ3qs2Q5WXlv3J0Pf1S8F3aY26l4_DAgV1WLCFv6znk_Qsng2ObY15rPgjpO-f1Rr3vEIDv8bIj_Jux1LlWUTfxPWi_5Z8BzN0pDSHYU0_qIazOABz6MlSOthz6K1gM4g-HC8ooqxJUesOaubCg97xsgMh065UExJ2AZ7DTRhNbnGnvwcKWhj2b0xIkLr-mW82_rt_YI1YQWPEYfhHDyTFzMkLRWmv-pwv3XUnm9jB2osjbMnJY9p8WeRAamn9UaU", alt: "Gallery opening" },
// //     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVoCn_McQ-7nzXqm19QCTpWVvkdC7yjfC2rzjtqV2KUeOO9miOX5TS15YSTJTIiHhDYXympmCphmuxZCdeLayjrxwQTm9AxmnMoh9wazeKuOmX-3lJDb_uog4VlDPFDpDJlYEJn756zLlCWc0dkO8RwLRrosgbhLGXM1FCbOKRwDLLxYqCDJmogUS08kZstXOiMPDNjzJlhJLn42AV82uPs-Ab6wA1MGp9vv_DAwhGOQ7mYXV4DNLN7jFOIC32jx7PsdVGk7SPUyk", alt: "Glaze texture" },
// //   ];

// //   const processVideos = [
// //     {
// //       title: "Centering the Clay",
// //       category: "Beginner Workshop",
// //       thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkfQSTSEh36B1Dql9Ovp2do_xzWdZLL9fMGeLAkcieSiX9IzdgZcIcfhlC3Jt1FqX8fy47b7gXbrmftvN0CD8sI3T-qirhzAtqys0o89Xnoxply0sz38oC67jXAJP66CsZa2oStWQ_EFY35RPPYJiU9hxMZR6Cryk4JumPPrWlBdZKnmAbWS5mE_BJsEOMSoaDJZz9sAne5cGMbT7-ElMJayZWzRYZdicXWauCnZOymi7ksYIzHoKd4A9m3V-3NaB4-jR5XZJfseY",
// //     },
// //     {
// //       title: "Trimming & Texturing",
// //       category: "Intermediate",
// //       thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_kBG6GQTk-1qYwJANSxcqg1Cio6s0i4fcyJSLoJbV4hvcN_xIbYYxApFtDt77__22rG-nJJ8vidxEcA7XVAJU8OAOM1ZIswWj3Hf82MSch4Jfs_2OYH18NTthyvheortV7lRbz9dLKSsVq0cCyd8J-rODwpY1Xyopqm_uPA2AqZAlr_9sXeobyhrJslWLKM1mkmosB5NmuTDxAjnDX0EwIEFyhvcqalVicySg3ChPayYicaw-6Y3aHLyapTmG56YLEwzIDuDEeU4",
// //     },
// //     {
// //       title: "Glazing Techniques",
// //       category: "Masterclass",
// //       thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX2t5wLx4f-r2u-8PQD9Q-prN2XQCtO-hZ1BNACkc9AQW-efE7fCb515xcuMh1zvLAfK0P3akT-6RU1Fh-13sX0rvOQSDEYb05iEmkgT8LQi_x4Hh7aK42kdU-0751lb0DUrL2dEXgcE28yNsYa7PCb_b2deSs1996MrROapUvO2QWlf0q3jamay-kB3JgV1wrk4LfU7oAUrCp_g33KcuiUFSlqE0A1EU47f5x1Zo1fmHoy0n7pjyZ-LBG9pTCjeqO9u90yC7WjFE",
// //     }
// //   ];

// //   return (
// //     <div className="relative min-h-screen bg-charcoal text-rice-paper flex flex-col overflow-hidden">
// //       <Header />

// //       {/* Grain Texture Background */}
// //       <div className="fixed inset-0 opacity-[0.12] pointer-events-none z-0">
// //         <div 
// //           className="absolute inset-0 animate-grain-shift" 
// //           style={{ 
// //             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
// //             backgroundSize: '200px 200px'
// //           }} 
// //         />
// //       </div>

// //       <main ref={sectionRef} className="relative z-10 pt-32 flex-grow">
        
// //         {/* HERO SECTION */}
// //         <section className="px-6 lg:px-40 py-10">
// //           <div
// //             className={`rounded-2xl min-h-[520px] flex items-center justify-center text-center bg-cover bg-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
// //             style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.75)), url(${heroStudio.src || heroStudio})` }}
// //           >
// //             <div className="max-w-2xl space-y-6 p-8">
// //               <span className="uppercase tracking-[0.3em] text-[10px] text-clay font-bold block transition-all duration-700 delay-300">Workshops & Exhibitions</span>
// //               <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight transition-all duration-1000 delay-500">Basho On Tour</h1>
// //               <p className="text-stone-warm text-lg md:text-xl font-light transition-all duration-1000 delay-700">Experience handcrafted pottery through immersive workshops and exhibitions across the globe.</p>
// //             </div>
// //           </div>
// //         </section>

// //         {/* UPCOMING EVENTS */}
// //         <section className="px-6 lg:px-40 py-16">
// //           <div className="max-w-5xl mx-auto space-y-10">
// //             <h2 className={`text-3xl font-serif transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Upcoming Events</h2>
// //             {upcomingEvents.map((event, index) => (
// //               <div key={event.id} className={`group flex flex-col md:flex-row gap-8 border border-border-subtle p-6 bg-charcoal-light transition-all duration-700 hover:border-clay/20 hover:bg-white/5 hover:shadow-2xl hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${200 * index}ms` }}>
// //                 <div className="md:w-1/3 h-56 relative overflow-hidden bg-black/20 rounded-xl">
// //                   <div className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110" style={{ backgroundImage: `url(${event.image})` }} />
// //                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
// //                     <Eye className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" />
// //                   </div>
// //                 </div>
// //                 <div className="flex-1 space-y-4">
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center gap-2 text-clay text-[10px] uppercase font-bold tracking-widest"><event.typeIcon size={14} /> {event.type}</div>
// //                     <span className="text-stone-warm text-[10px] uppercase tracking-widest">{event.date}</span>
// //                   </div>
// //                   <h3 className="text-2xl font-serif text-rice-paper group-hover:text-clay transition-colors duration-500">{event.title}</h3>
// //                   <p className="text-stone-warm font-light leading-relaxed line-clamp-2">{event.description}</p>
// //                   <div className="flex justify-between items-center pt-4 border-t border-white/5">
// //                     <span className="text-lg font-serif text-white">{event.price}</span>
// //                     <button className="flex items-center gap-2 bg-clay text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all">
// //                       <Calendar size={14} /> {event.cta}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </section>

// //         {/* ARCHIVE SECTION */}
// //         <section className="px-6 lg:px-40 py-24 border-t border-border-subtle bg-charcoal relative">
// //           <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
// //             <div className={`lg:w-1/3 space-y-6 lg:sticky lg:top-48 h-fit transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
// //               <h2 className="text-4xl md:text-5xl font-serif font-light text-rice-paper">Archive</h2>
// //               <p className="text-stone-warm text-sm font-light">A curated history of our past exhibitions and community gatherings.</p>
// //               <div className="w-12 h-1 bg-clay/60"></div>
// //             </div>

// //             <div className="lg:w-2/3 relative border-l border-white/10 pl-8 lg:pl-12 space-y-20">
// //               {archiveEntries.map((item, idx) => (
// //                 <div key={idx} className="relative group/item">
// //                   <div className="absolute -left-[37.5px] lg:-left-[53.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/20 border border-charcoal outline outline-4 outline-charcoal group-hover/item:bg-clay group-hover/item:scale-125 transition-all duration-500"></div>
// //                   <div className="space-y-4">
// //                     <div className="flex flex-wrap items-baseline gap-3">
// //                       <h3 className="text-xl font-serif text-rice-paper group-hover/item:text-clay transition-all duration-500">{item.title}</h3>
// //                       <span className="text-[10px] text-stone-warm/50 font-bold uppercase tracking-[0.2em]">{item.date}</span>
// //                     </div>
// //                     <p className="text-stone-warm text-sm max-w-lg leading-relaxed font-light">{item.description}</p>
// //                     <div className={`grid gap-4 pt-6 ${item.layout === 'grid' ? 'grid-cols-3' : 'grid-cols-1'}`}>
// //                       {item.images.map((src, i) => (
// //                         <div key={i} className={`overflow-hidden rounded-xl bg-black/30 relative group/img cursor-pointer border border-white/5 hover:border-clay/30 transition-all duration-500 ${item.layout === 'wide' ? 'h-56' : 'aspect-square'}`}>
// //                           <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover/img:scale-110 group-hover/img:rotate-1" />
// //                           <div className="absolute inset-0 bg-black/0 group-hover/img:bg-clay/15 transition-all duration-700" />
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* GALLERY SECTION */}
// //         <section className="px-6 lg:px-40 py-16">
// //           <h2 className="text-2xl font-serif mb-12 text-center italic font-light text-rice-paper">Event Gallery</h2>
// //           <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
// //             {galleryImages.map((img, i) => (
// //               <div key={i} className={`relative overflow-hidden mb-6 group cursor-pointer border border-border-subtle transition-all duration-1000 hover:border-clay/40 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${100 * i}ms` }}>
// //                 <img src={img.src} alt={img.alt} className="w-full transition-all duration-[1500ms] group-hover:scale-110" />
// //                 <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
// //                   <Eye className="w-6 h-6 text-white group-hover:scale-125 transition-all duration-500" />
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </section>

// //         {/* CONTINUOUS MARQUEE: THE PROCESS IN MOTION SECTION */}
// //         <section className="px-6 lg:px-40 py-24 bg-surface-dark border-t border-border-subtle relative overflow-hidden">
// //           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzVlI8BGQMSspZ5VftfBOItr0K4kOBo5vWkTdGEdqND11OwtzoetJuopJoaWl4mC-ii7fqypDIEZlBtoa9xoekR71JXyJfRAWwRjiJGY2vVrcf92xIDWgI_HOredw7Sq9UrUQQNALmW9oGK70Qif9TAjR96GuZ9Uu77B2tmusZwR-PRiCDOKlCgf3TYAt34qeZAC81VKOdJqOd_agLTwTntabqTO1W2oldEyQ951BFgWqOZMElOjhSww885mnrRadT2Ug0QnO06go")' }}></div>
          
// //           <div className="max-w-7xl mx-auto relative z-10">
// //             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
// //               <div className="space-y-4">
// //                 <h2 className="text-4xl font-serif text-white">The Process in Motion</h2>
// //                 <p className="text-stone-warm max-w-xl font-light leading-relaxed">
// //                   From the first throw to the final firing, witness the dedication required to master the wheel.
// //                 </p>
// //               </div>
// //               <button className="flex items-center gap-2 bg-clay text-white px-8 py-3 rounded-xl font-bold transition-all duration-500 hover:bg-white hover:text-charcoal shadow-lg">
// //                 <CalendarDays size={20} /> Book a Workshop
// //               </button>
// //             </div>

// //             {/* MARQUEE WRAPPER */}
// //             <div className="relative flex overflow-hidden group">
// //               {/* Doubled the array for a seamless, continuous infinite loop */}
// //               <div className="flex gap-6 animate-marquee whitespace-nowrap group-hover:pause">
// //                 {[...processVideos, ...processVideos].map((video, idx) => (
// //                   <div key={idx} className="shrink-0 w-[300px] md:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden relative border border-white/5 transition-all duration-700 hover:border-clay/30">
// //                     <div 
// //                       className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] group-hover:scale-110" 
// //                       style={{ backgroundImage: `url("${video.thumbnail}")` }} 
// //                     />
// //                     <div className="absolute inset-0 bg-charcoal/30 flex items-center justify-center">
// //                       <div className="size-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
// //                         <Play size={32} fill="currentColor" />
// //                       </div>
// //                     </div>
// //                     <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-charcoal to-transparent text-left">
// //                       <p className="text-white font-bold text-lg mb-1 whitespace-normal">{video.title}</p>
// //                       <p className="text-stone-warm text-sm font-light italic">{video.category}</p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           <style jsx>{`
// //             .animate-marquee {
// //               display: flex;
// //               width: max-content;
// //               animation: marquee 30s linear infinite;
// //             }
// //             @keyframes marquee {
// //               0% { transform: translateX(0); }
// //               100% { transform: translateX(-50%); }
// //             }
// //             .pause:hover {
// //               animation-play-state: paused;
// //             }
// //           `}</style>
// //         </section>

// //       </main>

// //       <Footer />

// //       <style jsx>{`
// //         @keyframes grain-shift {
// //           0%, 100% { transform: translate(0, 0); }
// //           10% { transform: translate(-5%, -5%); }
// //           50% { transform: translate(-10%, 5%); }
// //           90% { transform: translate(10%, 5%); }
// //         }
// //         .animate-grain-shift { animation: grain-shift 12s ease-in-out infinite; }
// //         .no-scrollbar::-webkit-scrollbar { display: none; }
// //         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
// //       `}</style>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";

// // Icons
// import { 
//   MapPin, Calendar, Mail, Globe, Store, Eye, 
//   Play, CalendarDays
// } from "lucide-react";

// // Images (Relative Imports)
// import heroStudio from "../../assets/hero-studio.jpg";

// export default function WorkshopsPage() {
//   const [email, setEmail] = useState("");
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);

//   // Intersection Observer for Reveal Animations
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => {
//       if (sectionRef.current) observer.unobserve(sectionRef.current);
//     };
//   }, []);

//   const upcomingEvents = [
//     {
//       id: 1,
//       date: "Oct 12–14",
//       type: "Symposium",
//       typeIcon: Globe,
//       title: "Tokyo Clay Symposium",
//       description: "Join us for a three-day intensive symposium featuring master potters from across Japan.",
//       location: "Shibuya, Tokyo",
//       price: "Starting from ¥5,000",
//       cta: "RSVP Now",
//       image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGRDd2nVe_IK-X51MgSOQROGEsK-Tvu2nKjgJ1CDnoiEakSHS4Z4H0boJ7fvJCeYqeno3SmEh_pfm8YKvJfX3DCR3xeCKdz2Ck26KrdCLzKjj5Iwc3smvqRBr5JXDJYNSySfZk0LuHsIa9U-cjkmeWmu4RDvJcx3nX0iqGTetE4mInz85x3MbRm2-xl0j5xfovmOzMjtTngUIUmRrh3f3nJCuHwfPgIOX3-1XYPNAEluhpPw3_CzR1y5dkyBlvr96E3KLBKpoiTdw", 
//     },
//     {
//       id: 2,
//       date: "Nov 05–07",
//       type: "Pop-up Store",
//       typeIcon: Store,
//       title: "London Craft Week Pop-up",
//       description: "Experience our latest autumn collection in the heart of Shoreditch.",
//       location: "Shoreditch, London",
//       price: "Free Entry",
//       cta: "Get Tickets",
//       image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE-0ymO2eTNzS2XpsmEaFmWVRgbUA5gjE8XoiSbySE7ZwchsK0nLaike6BUzuL2YekTsqTzb7Df2UEaObRSa34jATVXmFlhe7DqVZiuwvNvboQ-MXkGwWNiJPsvrAKjcfrqBu9XFgoiZ4kVL6fL_XYkw48M1kg3RVlYwiGgosc-0udRNMEdHownl5YoKz0JwhYUz_wAqNLLuMKbsorm7CFLOmATYs3wzxU8nFM1lK-OiB-KywB_Nus4v1L8knBwlD6KMq4L-PqKp8", 
//     },
//   ];

//   const archiveEntries = [
//     {
//       title: "Kyoto Spring Collection",
//       date: "April 2023",
//       description: "Launched our Sakura-inspired glaze series in a historic Machiya townhouse.",
//       images: [
//         "https://lh3.googleusercontent.com/aida-public/AB6AXuAzSvikLZRIXWTRdnQ9Rn-58k2LnpphGeX9cchpf5DjSB6yLjG5v8vuzL3wEOBPejHhw3eHBCehScoGvUY41MLyUigA9g1ttBOsLgScuK-wsThP58qdQGP7p9u6ijv7WlrG5pVuhhCt-LbGZmeSrNKxXSVFta5Zcud_uc6x9V7X-PGoEtDLcAkxO6ORbqzNoeCDmYNMbYMZ3p5bQaDXjH3bKhf-SwCIu4ToBSZYo9m9MqNZfXE0zM9scWrrfQSb49t6Mjh7bR9ONcg",
//         "https://lh3.googleusercontent.com/aida-public/AB6AXuBfymnDh9A5-5_bF1ILClRoT87zywTV23RroY9fKLtpcX914MYN20rjW06n7uJtCQrlTk0FapNxr-Muna_Xf3V20F8_4WgHarxEdPu1YnZY80PBlQbsjRFKvU5IXqocB42vc5gV_5XLc4hhPksVYJJOJEJPmJ7p58Udoj7rTh64CB1gVSM2kJSfjYjRbs_-TOV_txOMuXRLkWXOm2UGaanEWto_jGp2d16du_6OKyqNDhG-pKHsoHlBPyz8jC5o7QhoEjs43mn7Bic",
//         "https://lh3.googleusercontent.com/aida-public/AB6AXuDdXPnxHqZe5o8e1QGYvSlFCXvCXHHOOE56vAQzkeWzLQiyuWN6s9oZqEHG6PFWJw0yrAgYwJxrgJ9fiIu45oQUuwEhiseZ1zcJgA6VRUBB0lb0tmsE_TVmMyPpDRFCrjuXfSDvMt-F63QIr1NiuwUNBndZLkNC-_31H0FUOq3-dfHC5AGSeMGYYhVKVnqYwa-cGicLN4trl74TxlxgcM6IhF0PXoKr86ETiZalj_AolQBctrFV9cym2RWCQNx5032WEqzIczwTV4c"
//       ],
//       layout: "grid"
//     },
//     {
//       title: "NYC Maker's Market",
//       date: "December 2022",
//       description: "Our first international showcase at the Brooklyn Expo Center.",
//       images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuA4J3UELqpUYtJu1G2ygUpA4hfVLy5-nx4Alz2DWTdhT3FdBp5ibJ1cRXXfseimmQhj6UB9vQke5Pq2_eMREnCFGfqnSs2fwieeWtnK_LiQLItC3xmrSBFuBspZJ28vGIWKAxpmifwhZRfau384KWy8C3cBnXSXJx19PCc5U432lm7R3jrLWB_qTBLHrEWzFQYtic9AEb_PRf0IxDMUIYVri5Hgydy_qCoHqrYdRBXil9KZ6Xu1R4tn63InT_pMcNZLkYu-eNSMrvs"],
//       layout: "wide"
//     }
//   ];

//   const galleryImages = [
//     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC85uH5UKlidA-CtFkHDdAB2O0mO29nYa_27pHXwOSGbB9kkhZso92ITZnEsnF_G0rt344RxlqyGXwKBJtkMXgs2GBjLujP3NbunCfKUk82qYDb0q_lmJPtocU83tJRH5kQkSHEGFqo5g0yi4CMHLFto1xov5u_2QEiTvBwivouVlkyGjWYPJe43IM1QmP0oE5gvgCNPEJSFK0EtjBbSCytt1GCfzkKP89H9aF2-DVhd94Ap5WxDBRDvOI9uDw1LmmAmhmhDvzXcag", alt: "Pottery tools" },
//     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRVF8jPYdqvWZX-CrRyjvORZhgO--VlHwCuKV4bN9YSjvGQzenAhNOXQlgNHc0191nS6fwoxAAmdTBHdaFLBbI-V5HLQkNuxUYAX6W_gaaSE7CKgORY7A5OISrf4zfm7Ru4T_hMhYk6ItIbEiNaDx9S742E6Gpxyv3b4coZmVf4dA5CRDI8qF00hISaX3DXJrjCC_uZhsdR2vVT9_k60aCfPwaq3HIKJzz8k4AiOUAZTXj6kOZfrCP9pvbWu7Tm_Xy2EoukRGPEVY", alt: "Ceramic vase" },
//     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlHv1UTUijn4z3S5KIhiliHlLIhzyF-XEIg17J8dArjgAGXLUKjaGeJLIqwQvJSc5VGU_87lcWPjUj8LjAA0Llbact158tvCwsVCUoKBxXz9J7Q23ZAJ-9RBHP9upQ3g8VdyhafaAIus9nq9n05Oir9kgZPaBtapw8y1GW6ZfFvaXnzdZFfQY48nsPWGRKclJDwllEKvFuwjyKDD33hzmd27McmLqGVgvZiCwLLLo2Q5fyfIT8BLIQwNXhieYdd0QooSt5Z7ATNYQ", alt: "Wheel throwing" },
//     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO4wzAQLQ_B4Pn_lCB0iGkPxKD6lHWg_bsv2UwbPdfmKNIn9T4_MC_A_C95xLhxkJTHu_nYly2HqQGq4fRJveGI_xiwds0jyTMSrgyBKxDJUNsHj_11SprlOD2FtHH1w43uVLd3gQS8fzItT6tVmn9KQbpnHKeWFAjVTCyTHVfnBZzniGrDA6Y8eONnIJWM3v3mTLE8x3jNATkBkCVxeixxd_N57yhjBR-oGXz6dy-ShlAi02pff89WfXb7eCscb9CHPUPQfshHxY", alt: "Ceramic mugs" },
//     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-ZJOKFjak54eJ3qs2Q5WXlv3J0Pf1S8F3aY26l4_DAgV1WLCFv6znk_Qsng2ObY15rPgjpO-f1Rr3vEIDv8bIj_Jux1LlWUTfxPWi_5Z8BzN0pDSHYU0_qIazOABz6MlSOthz6K1gM4g-HC8ooqxJUesOaubCg97xsgMh065UExJ2AZ7DTRhNbnGnvwcKWhj2b0xIkLr-mW82_rt_YI1YQWPEYfhHDyTFzMkLRWmv-pwv3XUnm9jB2osjbMnJY9p8WeRAamn9UaU", alt: "Gallery opening" },
//     { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVoCn_McQ-7nzXqm19QCTpWVvkdC7yjfC2rzjtqV2KUeOO9miOX5TS15YSTJTIiHhDYXympmCphmuxZCdeLayjrxwQTm9AxmnMoh9wazeKuOmX-3lJDb_uog4VlDPFDpDJlYEJn756zLlCWc0dkO8RwLRrosgbhLGXM1FCbOKRwDLLxYqCDJmogUS08kZstXOiMPDNjzJlhJLn42AV82uPs-Ab6wA1MGp9vv_DAwhGOQ7mYXV4DNLN7jFOIC32jx7PsdVGk7SPUyk", alt: "Glaze texture" },
//   ];

//   const processVideos = [
//     {
//       title: "Centering the Clay",
//       category: "Beginner Workshop",
//       thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkfQSTSEh36B1Dql9Ovp2do_xzWdZLL9fMGeLAkcieSiX9IzdgZcIcfhlC3Jt1FqX8fy47b7gXbrmftvN0CD8sI3T-qirhzAtqys0o89Xnoxply0sz38oC67jXAJP66CsZa2oStWQ_EFY35RPPYJiU9hxMZR6Cryk4JumPPrWlBdZKnmAbWS5mE_BJsEOMSoaDJZz9sAne5cGMbT7-ElMJayZWzRYZdicXWauCnZOymi7ksYIzHoKd4A9m3V-3NaB4-jR5XZJfseY",
//     },
//     {
//       title: "Trimming & Texturing",
//       category: "Intermediate",
//       thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_kBG6GQTk-1qYwJANSxcqg1Cio6s0i4fcyJSLoJbV4hvcN_xIbYYxApFtDt77__22rG-nJJ8vidxEcA7XVAJU8OAOM1ZIswWj3Hf82MSch4Jfs_2OYH18NTthyvheortV7lRbz9dLKSsVq0cCyd8J-rODwpY1Xyopqm_uPA2AqZAlr_9sXeobyhrJslWLKM1mkmosB5NmuTDxAjnDX0EwIEFyhvcqalVicySg3ChPayYicaw-6Y3aHLyapTmG56YLEwzIDuDEeU4",
//     },
//     {
//       title: "Glazing Techniques",
//       category: "Masterclass",
//       thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX2t5wLx4f-r2u-8PQD9Q-prN2XQCtO-hZ1BNACkc9AQW-efE7fCb515xcuMh1zvLAfK0P3akT-6RU1Fh-13sX0rvOQSDEYb05iEmkgT8LQi_x4Hh7aK42kdU-0751lb0DUrL2dEXgcE28yNsYa7PCb_b2deSs1996MrROapUvO2QWlf0q3jamay-kB3JgV1wrk4LfU7oAUrCp_g33KcuiUFSlqE0A1EU47f5x1Zo1fmHoy0n7pjyZ-LBG9pTCjeqO9u90yC7WjFE",
//     }
//   ];

//   return (
//     <div className="relative min-h-screen bg-charcoal text-rice-paper flex flex-col overflow-hidden">
//       <Header />

//       {/* Grain Texture Background */}
//       <div className="fixed inset-0 opacity-[0.12] pointer-events-none z-0">
//         <div 
//           className="absolute inset-0 animate-grain-shift" 
//           style={{ 
//             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
//             backgroundSize: '200px 200px'
//           }} 
//         />
//       </div>

//       <main ref={sectionRef} className="relative z-10 pt-32 flex-grow">
        
//         {/* HERO SECTION */}
//         <section className="px-6 lg:px-40 py-10">
//           <div
//             className={`rounded-2xl min-h-[520px] flex items-center justify-center text-center bg-cover bg-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
//             style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.75)), url(${heroStudio.src || heroStudio})` }}
//           >
//             <div className="max-w-2xl space-y-6 p-8">
//               <span className="uppercase tracking-[0.3em] text-[10px] text-clay font-bold block transition-all duration-700 delay-300">Workshops & Exhibitions</span>
//               <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight transition-all duration-1000 delay-500">Basho On Tour</h1>
//               <p className="text-stone-warm text-lg md:text-xl font-light transition-all duration-1000 delay-700">Experience handcrafted pottery through immersive workshops and exhibitions across the globe.</p>
//             </div>
//           </div>
//         </section>

//         {/* UPCOMING EVENTS */}
//         <section className="px-6 lg:px-40 py-16">
//           <div className="max-w-5xl mx-auto space-y-10">
//             <h2 className={`text-3xl font-serif transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Upcoming Events</h2>
//             {upcomingEvents.map((event, index) => (
//               <div key={event.id} className={`group flex flex-col md:flex-row gap-8 border border-border-subtle p-6 bg-charcoal-light transition-all duration-700 hover:border-clay/20 hover:bg-white/5 hover:shadow-2xl hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${200 * index}ms` }}>
//                 <div className="md:w-1/3 h-56 relative overflow-hidden bg-black/20 rounded-xl">
//                   <div className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110" style={{ backgroundImage: `url(${event.image})` }} />
//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
//                     <Eye className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" />
//                   </div>
//                 </div>
//                 <div className="flex-1 space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2 text-clay text-[10px] uppercase font-bold tracking-widest"><event.typeIcon size={14} /> {event.type}</div>
//                     <span className="text-stone-warm text-[10px] uppercase tracking-widest">{event.date}</span>
//                   </div>
//                   <h3 className="text-2xl font-serif text-rice-paper group-hover:text-clay transition-colors duration-500">{event.title}</h3>
//                   <p className="text-stone-warm font-light leading-relaxed line-clamp-2">{event.description}</p>
//                   <div className="flex justify-between items-center pt-4 border-t border-white/5">
//                     <span className="text-lg font-serif text-white">{event.price}</span>
//                     <button className="flex items-center gap-2 bg-clay text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all">
//                       <Calendar size={14} /> {event.cta}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ARCHIVE SECTION */}
//         <section className="px-6 lg:px-40 py-24 border-t border-border-subtle bg-charcoal relative">
//           <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
//             <div className={`lg:w-1/3 space-y-6 lg:sticky lg:top-48 h-fit transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
//               <h2 className="text-4xl md:text-5xl font-serif font-light text-rice-paper">Archive</h2>
//               <p className="text-stone-warm text-sm font-light">A curated history of our past exhibitions and community gatherings.</p>
//               <div className="w-12 h-1 bg-clay/60"></div>
//             </div>

//             <div className="lg:w-2/3 relative border-l border-white/10 pl-8 lg:pl-12 space-y-20">
//               {archiveEntries.map((item, idx) => (
//                 <div key={idx} className="relative group/item">
//                   <div className="absolute -left-[37.5px] lg:-left-[53.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/20 border border-charcoal outline outline-4 outline-charcoal group-hover/item:bg-clay group-hover/item:scale-125 transition-all duration-500"></div>
//                   <div className="space-y-4">
//                     <div className="flex flex-wrap items-baseline gap-3">
//                       <h3 className="text-xl font-serif text-rice-paper group-hover/item:text-clay transition-all duration-500">{item.title}</h3>
//                       <span className="text-[10px] text-stone-warm/50 font-bold uppercase tracking-[0.2em]">{item.date}</span>
//                     </div>
//                     <p className="text-stone-warm text-sm max-w-lg leading-relaxed font-light">{item.description}</p>
//                     <div className={`grid gap-4 pt-6 ${item.layout === 'grid' ? 'grid-cols-3' : 'grid-cols-1'}`}>
//                       {item.images.map((src, i) => (
//                         <div key={i} className={`overflow-hidden rounded-xl bg-black/30 relative group/img cursor-pointer border border-white/5 hover:border-clay/30 transition-all duration-500 ${item.layout === 'wide' ? 'h-56' : 'aspect-square'}`}>
//                           <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover/img:scale-110 group-hover/img:rotate-1" />
//                           <div className="absolute inset-0 bg-black/0 group-hover/img:bg-clay/15 transition-all duration-700" />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* GALLERY SECTION */}
//         <section className="px-6 lg:px-40 py-16">
//           <h2 className="text-2xl font-serif mb-12 text-center italic font-light text-rice-paper">Event Gallery</h2>
//           <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
//             {galleryImages.map((img, i) => (
//               <div key={i} className={`relative overflow-hidden mb-6 group cursor-pointer border border-border-subtle transition-all duration-1000 hover:border-clay/40 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${100 * i}ms` }}>
//                 <img src={img.src} alt={img.alt} className="w-full transition-all duration-[1500ms] group-hover:scale-110" />
//                 <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
//                   <Eye className="w-6 h-6 text-white group-hover:scale-125 transition-all duration-500" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* CONTINUOUS MARQUEE SECTION */}
//         <section className="px-6 lg:px-40 py-24 bg-surface-dark border-t border-border-subtle relative overflow-hidden">
//           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzVlI8BGQMSspZ5VftfBOItr0K4kOBo5vWkTdGEdqND11OwtzoetJuopJoaWl4mC-ii7fqypDIEZlBtoa9xoekR71JXyJfRAWwRjiJGY2vVrcf92xIDWgI_HOredw7Sq9UrUQQNALmW9oGK70Qif9TAjR96GuZ9Uu77B2tmusZwR-PRiCDOKlCgf3TYAt34qeZAC81VKOdJqOd_agLTwTntabqTO1W2oldEyQ951BFgWqOZMElOjhSww885mnrRadT2Ug0QnO06go")' }}></div>
          
//           <div className="max-w-7xl mx-auto relative z-10">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
//               <div className="space-y-4">
//                 <h2 className="text-4xl font-serif text-white">The Process in Motion</h2>
//                 <p className="text-stone-warm max-w-xl font-light leading-relaxed">
//                   From the first throw to the final firing, witness the dedication required to master the wheel.
//                 </p>
//               </div>
//               <button className="flex items-center gap-2 bg-clay text-white px-8 py-3 rounded-xl font-bold transition-all duration-500 hover:bg-white hover:text-charcoal shadow-lg">
//                 <CalendarDays size={20} /> Book a Workshop
//               </button>
//             </div>

//             <div className="relative flex overflow-hidden group">
//               <div className="flex gap-6 animate-marquee whitespace-nowrap group-hover:pause">
//                 {[...processVideos, ...processVideos].map((video, idx) => (
//                   <div key={idx} className="shrink-0 w-[300px] md:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden relative border border-white/5 transition-all duration-700 hover:border-clay/30">
//                     <div 
//                       className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110" 
//                       style={{ backgroundImage: `url("${video.thumbnail}")` }} 
//                     />
//                     <div className="absolute inset-0 bg-charcoal/30 flex items-center justify-center">
//                       <div className="size-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
//                         <Play size={32} fill="currentColor" />
//                       </div>
//                     </div>
//                     <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-charcoal to-transparent text-left">
//                       <p className="text-white font-bold text-lg mb-1 whitespace-normal">{video.title}</p>
//                       <p className="text-stone-warm text-sm font-light italic">{video.category}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//       </main>

//       <Footer />

//       <style jsx>{`
//         @keyframes grain-shift {
//           0%, 100% { transform: translate(0, 0); }
//           10% { transform: translate(-5%, -5%); }
//           20% { transform: translate(-10%, 5%); }
//           30% { transform: translate(5%, -10%); }
//           40% { transform: translate(-5%, 15%); }
//           50% { transform: translate(-10%, 5%); }
//           60% { transform: translate(15%, 0); }
//           70% { transform: translate(0, 10%); }
//           80% { transform: translate(-15%, 0); }
//           90% { transform: translate(10%, 5%); }
//         }
//         .animate-grain-shift { animation: grain-shift 12s ease-in-out infinite; }
        
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .animate-marquee {
//           display: flex;
//           width: max-content;
//           animation: marquee 30s linear infinite;
//         }
//         .pause:hover {
//           animation-play-state: paused;
//         }

//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// }

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
  const sectionRef = useRef(null);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
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

      <main ref={sectionRef} className="relative z-10 pt-32 flex-grow">
        
        {/* HERO SECTION */}
        <section className="px-6 lg:px-40 py-10">
          <div
            className={`rounded-2xl min-h-[520px] flex items-center justify-center text-center bg-cover bg-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.75)), url(${heroStudio.src || heroStudio})` }}
          >
            <div className="max-w-2xl space-y-6 p-8">
              <span className="uppercase tracking-[0.3em] text-[10px] text-clay font-bold block transition-all duration-700 delay-300">Workshops & Exhibitions</span>
              <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight transition-all duration-1000 delay-500">Basho On Tour</h1>
              <p className="text-stone-warm text-lg md:text-xl font-light transition-all duration-1000 delay-700">Experience handcrafted pottery through immersive workshops and exhibitions across the globe.</p>
            </div>
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section className="px-6 lg:px-40 py-16">
          <div className="max-w-5xl mx-auto space-y-10">
            <h2 className={`text-3xl font-serif transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Upcoming Events</h2>
            {upcomingEvents.map((event, index) => (
              <div key={event.id} className={`group flex flex-col md:flex-row gap-8 border border-border-subtle p-6 bg-charcoal-light transition-all duration-700 hover:border-clay/20 hover:bg-white/5 hover:shadow-2xl hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${200 * index}ms` }}>
                <div className="md:w-1/3 h-56 relative overflow-hidden bg-black/20 rounded-xl">
                  <div className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110" style={{ backgroundImage: `url(${event.image})` }} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-clay text-[10px] uppercase font-bold tracking-widest"><event.typeIcon size={14} /> {event.type}</div>
                    <span className="text-stone-warm text-[10px] uppercase tracking-widest">{event.date}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-rice-paper group-hover:text-clay transition-colors duration-500">{event.title}</h3>
                  <p className="text-stone-warm font-light leading-relaxed line-clamp-2">{event.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <span className="text-lg font-serif text-white">{event.price}</span>
                    <button className="flex items-center gap-2 bg-clay text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all">
                      <Calendar size={14} /> {event.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ARCHIVE SECTION */}
        <section className="px-6 lg:px-40 py-24 border-t border-border-subtle bg-charcoal relative">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
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
        <section className="px-6 lg:px-40 py-16">
          <h2 className="text-2xl font-serif mb-12 text-center italic font-light text-rice-paper">Event Gallery</h2>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
            {galleryImages.map((img, i) => (
              <div key={i} className={`relative overflow-hidden mb-6 group cursor-pointer border border-border-subtle transition-all duration-1000 hover:border-clay/40 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${100 * i}ms` }}>
                <img src={img.src} alt={img.alt} className="w-full transition-all duration-[1500ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  <Eye className="w-6 h-6 text-white group-hover:scale-125 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTINUOUS MARQUEE SECTION: THE PROCESS IN MOTION */}
        <section className="px-6 lg:px-40 py-24 bg-surface-dark border-t border-border-subtle relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzVlI8BGQMSspZ5VftfBOItr0K4kOBo5vWkTdGEdqND11OwtzoetJuopJoaWl4mC-ii7fqypDIEZlBtoa9xoekR71JXyJfRAWwRjiJGY2vVrcf92xIDWgI_HOredw7Sq9UrUQQNALmW9oGK70Qif9TAjR96GuZ9Uu77B2tmusZwR-PRiCDOKlCgf3TYAt34qeZAC81VKOdJqOd_agLTwTntabqTO1W2oldEyQ951BFgWqOZMElOjhSww885mnrRadT2Ug0QnO06go")' }}></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-serif text-white">The Process in Motion</h2>
                <p className="text-stone-warm max-w-xl font-light leading-relaxed">From the first throw to the final firing, witness the dedication required to master the wheel. Join our workshops to get your hands dirty.</p>
              </div>
              <button className="flex items-center gap-2 bg-clay text-white px-8 py-3 rounded-xl font-bold transition-all duration-500 hover:bg-white hover:text-charcoal shadow-lg">
                <CalendarDays size={20} /> Book a Workshop
              </button>
            </div>

            <div className="relative flex overflow-hidden group">
              <div className="flex gap-6 animate-marquee whitespace-nowrap group-hover:pause">
                {[...processVideos, ...processVideos].map((video, idx) => (
                  <div key={idx} className="shrink-0 w-[300px] md:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden relative border border-white/5 transition-all duration-700 hover:border-clay/30">
                    <div className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110" style={{ backgroundImage: `url("${video.thumbnail}")` }} />
                    <div className="absolute inset-0 bg-charcoal/30 flex items-center justify-center">
                      <div className="size-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20"><Play size={32} fill="currentColor" /></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-charcoal to-transparent text-left">
                      <p className="text-white font-bold text-lg mb-1 whitespace-normal">{video.title}</p>
                      <p className="text-stone-warm text-sm font-light italic">{video.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO LIFE SECTION (Now between Motion Section and Footer) */}
        <section className="px-6 lg:px-40 py-20 border-t border-border-subtle">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-rice-paper font-serif">Studio Life</h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden group">
              <img alt="Morning Light at Basho" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDITqixozyIDA6eroqfMnHV0CxDmWr_Zr0iB281Vu-LQ8KgOHn5plXBMPcO3uyo4wrpByAHFwdou94pqG0flR7ZWrRE3ImiSDhcbyNzqKSaPOydmE6jZJoo1FymP8aC6pfb3sdj8KYsJg17nB6zhDiu0wfTlo6DvnMPE-nvJKBXXv7y0sDtjdRZdSqiFBhO3JjQwIRU9mJH-GTgw2Hpr7lNEiY-fHPWHs-m2gvyMXpg69-PIOizqVoQK7SCUp238Slx8s3Cx0KF5ws"/>
              <div className="absolute bottom-0 left-0 p-6">
                <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg inline-block">
                  <p className="text-white font-medium">Morning Light at Basho</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-1 md:row-span-1 relative rounded-xl overflow-hidden group bg-charcoal-light">
              <img alt="Pottery tools" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCDm-V_4RvmVGJ5-M6DiD96YFKE7i-rL4MZqsMHFmWZgrRSuYdV2QzDnsCPr-U740Hqaz0nfUJQVkVzI8a4RpRs8FldhghlDp12y6Q9CyBfzMfAXFT_mG3B6nY4hEaRjXTFDkw8jk8prWhGKpngywBHh9ME9eqJ6tyTUQlFyuzcaMjy2Gk-Y-QD4W5GttWbVfQ2WCLFv63I_fDUF3zqsqFQpfsqUOomS4SClv8TiY9bFKvjAGYKda-Fvgni3-fQ5N6sDZ85I-tiWM"/>
            </div>
            <div className="md:col-span-1 md:row-span-1 relative rounded-xl overflow-hidden group bg-charcoal-light">
              <img alt="Studio cat" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB75zhrQq8eNRER1N22HIeXTjpgEk6276lPr-E8XthsC_zBkaNGFSV2g8qTFxfNH_4FVl9Yx_-kedi0uN4OCohYoQsJPla1i1akUbYT2_zD13i2YU8YkeR7ruiNzjzx9dUQ3HQKPRfM4Et-CShJB1i55rnsbQRXL6ADBwiU7luen2gDIP8deDNGM2s5EoUvO0QTyfA9M0s28ZbkDw3kiqWMtBF_d1mzD2VcxLM7wMmfH77sI8NvQfOFzGTw18CiGEujQYYnML1Gzvs"/>
            </div>
            <div className="md:col-span-2 md:row-span-1 relative rounded-xl overflow-hidden group bg-charcoal-light">
              <img alt="Workshop students" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChK36R2xqtBrJc8gatziANl1JYX8JGHR5R9-OJuz113G1OCpAsrBz6zmZm5ckxDO_dkjTwZ6wHLezWz1ekAcLz2l8r7HqK8ndkujve7ePvvVtBPM94C1Es3nFkqqMoHNf_mQtA4ooEiuU5A-Gp4M2ARxVaEhdtFEEK9rgl2HJusbma-PrT9ZlmvrkRdedZ_Kyc18NbkGhFhW0iJ5NHIfgx717mwuxoSbO1HfssPJefEfMOISUxZYWclPLtwYemn02zKhJi1wwpXTw"/>
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
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .pause:hover {
          animation-play-state: paused;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}