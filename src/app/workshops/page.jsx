"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { fetchAllWorkshops } from "../../lib/workshopService";
import { fetchGalleryByCategory } from "../../lib/galleryService"; 
import BookingModal from "../../components/BookingModal";

// Icons
import {
  Store,
  Eye,
  Play,
  CalendarDays,
  Clock,
  Users,
  Loader2,
  Calendar,
  X // Make sure X is imported for the close button
} from "lucide-react";

// Images (Relative Imports)
import heroStudio from "../../assets/hero-studio.jpg";

// --- NEW: Video URL Validation ---
const validateVideoUrl = (url) => {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    // Check if it's a valid video URL
    const validHosts = [
      'res.cloudinary.com',
      'www.youtube.com',
      'youtu.be',
      'vimeo.com',
      'player.vimeo.com'
    ];
    
    return validHosts.some(host => urlObj.hostname.includes(host));
  } catch (error) {
    console.error('Invalid video URL:', url, error);
    return false;
  }
};

// --- NEW: Video Modal Component ---
const VideoModal = ({ videoUrl, onClose }) => {
  if (!videoUrl || !validateVideoUrl(videoUrl)) {
    console.error('Invalid or unsupported video URL:', videoUrl);
    return (
      <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md text-center">
          <h3 className="text-xl font-bold mb-4">Video Not Available</h3>
          <p className="text-gray-600 mb-6">This video cannot be played. The video file may not be accessible from your current network or location.</p>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20"
      >
        <X size={32} />
      </button>

      {/* Video Player */}
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <video
          src={videoUrl}
          className="w-full h-full object-contain"
          controls
          playsInline
          muted={false}
          preload="metadata"
          crossOrigin="anonymous"
          onError={(e) => {
            console.error('Video failed to load:', e);
            console.error('Video URL:', videoUrl);
            console.error('Error code:', e.target.error ? e.target.error.code : 'Unknown');
            alert('This video cannot be played. The video file may not be accessible from your current network or location.');
            onClose();
          }}
          onCanPlay={() => console.log('Video can play:', videoUrl)}
          onLoadedData={() => console.log('Video loaded successfully')}
        />
      </div>
    </div>
  );
};

// Error Boundary Component
const ErrorBoundary = ({ children, fallback }) => {
  return (
    <div className="error-boundary">
      {children}
    </div>
  );
};

// --- NEW: ProcessItem Component ---
const ProcessItem = ({ item, onOpenModal }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (item.type === 'video' && videoRef.current) {
      // Small delay for smooth transition
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.log("Playback was prevented:", error);
          });
        }
      }, 100);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (item.type === 'video' && videoRef.current) {
      // Immediately pause the video
      videoRef.current.pause();
      setIsPlaying(false);
      
      // Reset to beginning after a short delay for smooth transition
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          // Ensure video is fully stopped
          videoRef.current.load();
        }
      }, 100);
    }
  };

  // Mobile touch handlers
  const handleTouchStart = () => {
    if (item.type === 'video' && videoRef.current) {
      // For mobile, start playing on touch
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log("Touch playback was prevented:", error);
      });
    }
  };

  const handleTouchEnd = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.load();
        }
      }, 100);
    }
  };

  return (
    <div 
      className="shrink-0 w-[280px] sm:w-[320px] md:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden relative border border-border-subtle transition-all duration-700 hover:border-clay/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] group/video cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => {
        if (item.type === 'video') {
          onOpenModal(item.videoUrl);
        }
      }}
    >
      {item.type === 'video' ? (
        <>
          <video
            ref={videoRef}
            src={item.videoUrl}
            poster={item.image}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover/video:scale-105 pointer-events-none"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          />
          {/* Smooth fade transition for play button overlay */}
          <div 
            className={`absolute inset-0 bg-charcoal/40 transition-all duration-300 ease-in-out flex items-center justify-center pointer-events-none ${
              isHovered || isPlaying ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="size-12 sm:size-14 md:size-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all duration-300 ease-out hover:bg-clay hover:scale-110">
              <Play size={20} className="sm:size-24 md:size-32" fill="currentColor" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out group-hover/video:scale-105" 
            style={{ backgroundImage: `url("${item.image}")` }} 
          />
          <div className="absolute inset-0 bg-charcoal/40 transition-all duration-300 ease-in-out group-hover/video:bg-charcoal/20 flex items-center justify-center">
            <div className="size-12 sm:size-14 md:size-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all duration-300 ease-out group-hover/video:scale-110">
              <Eye size={20} className="sm:size-24 md:size-32" />
            </div>
          </div>
        </>
      )}

      {/* Title Overlay - Mobile Optimized */}
      <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 md:p-6 bg-gradient-to-t from-charcoal via-charcoal/90 to-transparent text-left pointer-events-none">
        <p className="text-white font-bold text-sm sm:text-base md:text-lg mb-1 whitespace-normal font-serif">{item.title}</p>
        <p className="text-stone-warm text-xs sm:text-sm md:text-sm font-light italic">{item.subtitle || "Process Gallery"}</p>
      </div>
    </div>
  );
};

export default function WorkshopsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);
  
  // Data State
  const [workshops, setWorkshops] = useState([]);
  const [processItems, setProcessItems] = useState([]); 
  const [studioItems, setStudioItems] = useState([]);   
  const [loading, setLoading] = useState(true);
  
  // Booking & Video State
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null); // <--- NEW STATE

  const heroRef = useRef(null);

  const loadData = async () => {
    try {
      const [workshopsData, processData, studioData] = await Promise.all([
        fetchAllWorkshops(),
        fetchGalleryByCategory("process"),
        fetchGalleryByCategory("studio")
      ]);

      setWorkshops(workshopsData.filter(w => w.status === 'active' || !w.status));
      setProcessItems(processData);
      setStudioItems(studioData);
    } catch (error) {
      console.error("Failed to fetch page data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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

  const formatDate = (dateString) => {
    if (!dateString) return "TBA";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="relative min-h-screen bg-charcoal text-rice-paper flex flex-col overflow-hidden">
      <Header />

      {/* --- VIDEO MODAL OVERLAY --- */}
      {playingVideo && (
        <VideoModal 
          videoUrl={playingVideo} 
          onClose={() => setPlayingVideo(null)} 
        />
      )}

      {/* Background Grain */}
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

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-12 lg:px-24 text-center">
          <div className={`mb-8 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="inline-block text-clay text-xs font-bold uppercase tracking-[0.4em] mb-4">
              Basho On Tour
            </span>
            <div className="w-24 h-[1px] bg-clay/50 mx-auto mb-8" />
          </div>

          <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl text-rice-paper mb-8 leading-[0.9] transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '200ms' }}>
            Workshops & Exhibitions
          </h1>

          <p className={`text-stone-warm text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 font-light transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '400ms' }}>
            Experience handcrafted pottery through immersive workshops and exhibitions across the globe.
          </p>
        </div>
      </section>

      <main className="relative z-10 flex-grow">
        {/* UPCOMING EVENTS */}
        <section className="px-4 md:px-12 lg:px-24 py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/20 to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto space-y-12 relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-serif font-light text-rice-paper transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Upcoming Events</h2>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-clay animate-spin" />
              </div>
            ) : workshops.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
                <p className="text-xl text-stone-warm font-light">No upcoming workshops scheduled at the moment.</p>
                <p className="text-sm text-stone-warm/60 mt-2">Check back soon or subscribe to our newsletter.</p>
              </div>
            ) : (
              workshops.map((event, index) => (
                <div key={event.id} className={`group flex flex-col md:flex-row gap-8 border border-border-subtle p-6 md:p-8 bg-charcoal-light transition-all duration-700 hover:border-clay/30 hover:bg-white/5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${200 * index}ms` }}>
                  
                  <div className="md:w-1/3 h-56 md:h-64 relative overflow-hidden bg-black/20 rounded-xl border border-white/5 group-hover:border-clay/20 transition-all duration-500">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110" 
                      style={{ backgroundImage: `url(${event.image || 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2000'})` }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                      <Eye className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-clay text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 bg-clay/10 border border-clay/20 rounded-full">
                          <Store size={14} /> 
                          {event.subtitle || "Workshop"}
                        </div>
                        <span className="text-stone-warm text-[10px] uppercase tracking-widest font-medium flex items-center gap-2">
                           {formatDate(event.date)}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif font-light text-rice-paper mb-3 group-hover:text-clay transition-colors duration-500">
                        {event.title}
                      </h3>
                      <p className="text-stone-warm font-light leading-relaxed text-base line-clamp-3">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-4">
                        <span className="flex items-center text-xs text-stone-warm/80">
                            <Clock size={14} className="mr-1.5 text-clay" /> {event.time || "TBA"}
                        </span>
                        <span className="flex items-center text-xs text-stone-warm/80">
                            <Users size={14} className="mr-1.5 text-clay" /> {event.seats} Seats Available
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-white/5 group-hover:border-clay/20 transition-colors duration-500">
                      <span className="text-lg md:text-xl font-serif text-white group-hover:text-clay transition-colors duration-500">
                        ₹{event.price}
                      </span>
                      <button 
                        onClick={() => setSelectedWorkshop(event)}
                        className="flex items-center gap-2 bg-clay text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-clay/90 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-xl rounded-sm"
                      >
                        <Calendar size={14} /> Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* CONTINUOUS MARQUEE SECTION: THE PROCESS IN MOTION (UPDATED) */}
        <section className="py-12 md:py-16 bg-charcoal-light border-t border-border-subtle relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzVlI8BGQMSspZ5VftfBOItr0K4kOBo5vWkTdGEdqND11OwtzoetJuopJoaWl4mC-ii7fqypDIEZlBtoa9xoekR71JXyJfRAWwRjiJGY2vVrcf92xIDWgI_HOredw7Sq9UrUQQNALmW9oGK70Qif9TAjR96GuZ9Uu77B2tmusZwR-PRiCDOKlCgf3TYAt34qeZAC81VKOdJqOd_agLTwTntabqTO1W2oldEyQ951BFgWqOZMElOjhSww885mnrRadT2Ug0QnO06go")' }}></div>

          <div className="relative z-10 mb-12">
            <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
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
            {processItems.length > 0 && !loading ? (
              <div className={`flex gap-6 whitespace-nowrap ${isMarqueeHovered ? 'pause-animation' : 'animate-marquee'}`}>
                {[...processItems, ...processItems, ...processItems].map((item, idx) => (
                  <ProcessItem 
                    key={`${item.id}-${idx}`} 
                    item={item} 
                    onOpenModal={(url) => setPlayingVideo(url)} 
                  />
                ))}
              </div>
            ) : (
                <div className="text-center py-10 text-stone-600">Loading process gallery...</div>
            )}
          </div>
        </section>

        {/* STUDIO LIFE SECTION */}
        <section className="px-4 md:px-12 lg:px-24 py-20 md:py-24 border-t border-border-subtle">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light tracking-tight text-rice-paper">Studio Life</h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          
          {studioItems.length > 0 && !loading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[600px]">
              <div className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden group border border-border-subtle hover:border-clay/30 transition-all duration-500">
                {studioItems[0] && (
                  <>
                    <img alt={studioItems[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={studioItems[0].image} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-clay/10 transition-all duration-700" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg inline-block border border-white/10">
                        <p className="text-white font-medium">{studioItems[0].title}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {studioItems.slice(1, 4).map((item, idx) => (
                <div 
                  key={item.id} 
                  className={`relative rounded-xl overflow-hidden group bg-charcoal-light border border-border-subtle hover:border-clay/30 transition-all duration-500 ${idx === 2 ? 'md:col-span-2 md:row-span-1' : 'md:col-span-1 md:row-span-1'}`}
                >
                  <img 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src={item.image} 
                    style={idx === 2 ? { objectPosition: 'center 30%' } : {}}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-clay/10 transition-all duration-700" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-stone-500">Loading studio moments...</div>
          )}
        </section>

      </main>

      <Footer />

      {selectedWorkshop && (
        <BookingModal 
          workshop={selectedWorkshop} 
          onClose={() => setSelectedWorkshop(null)}
          onSuccess={() => {
             loadData();
          }}
        />
      )}

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
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
        .pause-animation {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
          animation-play-state: paused;
          will-change: transform;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
      `}</style>
    </div>
  );
}