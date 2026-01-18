'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Heart, 
  Share2,
  Check,
  Truck,
  ShieldCheck,
  Package,
  ArrowRight
} from 'lucide-react';

import { useCart } from '../../../../context/CartContext';
import { useWishlist } from '../../../../context/WishlistContext';

import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

import { fetchProductById, getRelatedProducts } from '../../../../lib/productService';

// --- Components ---

const Notification = ({ message, onClose, type = 'success' }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-sm shadow-2xl flex items-center gap-4 animate-fade-in-up ${
      type === 'error' ? 'bg-red-900/90 text-white' : 'bg-charcoal-light border border-clay/30 text-rice-paper'
    }`}>
      <span className={type === 'error' ? 'text-red-300' : 'text-clay'}>
        {type === 'error' ? '!' : <Check size={18} />}
      </span>
      <p className="font-sans text-sm tracking-wide">{message}</p>
    </div>
  );
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const { addToCart, cartItems } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // DATA STATE
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI STATE
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // VISUAL STATE - FIX: Disable mouse tracking on mobile to prevent layout shifts/performance issues
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
       setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      if (window.innerWidth >= 768) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // FETCH PRODUCT
  useEffect(() => {
    const loadData = async () => {
      if (!params.id) return;
      setLoading(true);
      try {
        const fetchedProduct = await fetchProductById(params.id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          const related = await getRelatedProducts(fetchedProduct.id, fetchedProduct.category);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [params.id]);

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center relative overflow-hidden">
        {/* Simple Texture Background */}
         <div className="fixed inset-0 opacity-[0.08] pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>
        
        <div className="flex flex-col items-center gap-6 z-10">
           <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 border-t border-clay rounded-full animate-spin"></div>
              <div className="w-2 h-2 bg-clay rounded-full"></div>
           </div>
           <p className="text-clay text-xs tracking-[0.3em] uppercase animate-pulse">Loading Artifact</p>
        </div>
      </div>
    );
  }

  // NOT FOUND STATE
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-charcoal text-rice-paper relative">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-serif text-stone-warm">Artifact Not Found</h1>
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 text-clay hover:text-rice-paper transition-colors uppercase text-xs tracking-widest border-b border-clay/30 pb-1"
            >
              <ChevronLeft size={14} /> Return to Collection
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // LOGIC
  const priceNumber = Number(product.price) || 0;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  const isInCart = cartItems.some(item => item.id === product.id);

  const showToast = (msg, type = 'success') => {
    setNotification({ show: true, message: msg, type });
  };

  const handleAddToCart = async () => {
    if (product.stock <= 0) return;
    setIsAdding(true);
    
    const result = await addToCart({
      id: product.id,
      name: product.name,
      price: priceNumber,
      image: images[0],
      quantity,
    });

    setIsAdding(false);

    if (result.success) {
      showToast(`${product.name} added to cart`);
    } else {
      showToast(result.message, 'error');
    }
  };

  const handleBuyNow = async () => {
    if (product.stock <= 0) return;
    setIsAdding(true);
    
    const result = await addToCart({
      id: product.id,
      name: product.name,
      price: priceNumber,
      image: images[0],
      quantity,
    });

    setIsAdding(false);

    if (result.success) {
      router.push(`/checkout?selected=${product.id}`);
    } else {
      showToast(result.message, 'error');
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast('Removed from wishlist');
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: priceNumber,
        image: images[0],
      });
      showToast('Added to wishlist');
    }
  };

  const handleQuantityChange = (change) => {
    if (isUpdating) return;
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // UI
  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-rice-paper relative overflow-x-hidden selection:bg-clay selection:text-charcoal">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 opacity-[0.15] pointer-events-none z-0">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
      </div>
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-clay/5 rounded-full blur-[100px] animate-float-slow pointer-events-none z-0" />
      <div className="fixed bottom-[10%] right-[-5%] w-[30vw] h-[30vw] bg-stone-500/5 rounded-full blur-[80px] animate-float-delayed pointer-events-none z-0" />

      <Header />

      <main className="flex-grow pt-24 md:pt-32 pb-20 relative z-10 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          
          {/* Breadcrumb / Back */}
          <div className="mb-8 md:mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
             <Link href="/shop" className="inline-flex items-center gap-2 text-stone-500 hover:text-clay transition-colors text-xs uppercase tracking-widest group">
                <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                Back to Shop
             </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start">

            {/* PRODUCT IMAGES */}
            <div className="space-y-6 animate-fade-in-up w-full" style={{ animationDelay: '0.2s' }}>
              <div 
                className="relative bg-white/[0.02] aspect-[4/5] rounded-sm overflow-hidden border border-white/5 group w-full"
                style={{
                   // Disable transform on mobile to prevent layout shifts
                   transform: !isMobile ? `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)` : 'none',
                   transition: 'transform 0.5s ease-out'
                }}
              >
                {/* Wishlist Button */}
                <button
                  onClick={handleWishlistToggle}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2.5 md:p-3 bg-charcoal/60 backdrop-blur-md rounded-full transition-all duration-500 border border-white/10 hover:bg-white hover:scale-110 group/heart"
                >
                  <Heart 
                    size={18} 
                    className={`transition-colors duration-300 ${
                      isInWishlist(product.id) ? 'fill-clay text-clay' : 'text-white group-hover/heart:text-clay'
                    }`}
                    fill={isInWishlist(product.id) ? "currentColor" : "none"}
                  />
                </button>

                <img
                  src={images[selectedImage] || 'https://via.placeholder.com/600x800'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide w-full">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-16 h-20 md:w-20 md:h-24 flex-shrink-0 rounded-sm overflow-hidden border transition-all duration-300 ${
                        selectedImage === i ? 'border-clay opacity-100' : 'border-white/10 opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PRODUCT DETAILS */}
            <div className="space-y-8 md:space-y-10 animate-fade-in-up w-full" style={{ animationDelay: '0.3s' }}>
              
              <div className="space-y-4 border-b border-white/5 pb-8 md:pb-10">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-clay text-[10px] uppercase font-bold tracking-[0.2em] px-2 py-1 bg-clay/10 rounded-sm">
                        {product.category || 'Collection'}
                    </span>
                    {product.stock > 0 ? (
                        <span className="text-emerald-500/80 text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> In Stock
                        </span>
                    ) : (
                         <span className="text-stone-500 text-[10px] uppercase font-bold tracking-widest">Out of Stock</span>
                    )}
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-rice-paper leading-tight">{product.name}</h1>
                <p className="text-xl md:text-2xl text-stone-300 font-light flex items-center gap-2">
                    ₹{priceNumber.toLocaleString('en-IN')}
                    <span className="text-sm text-stone-600 line-through decoration-clay/50 decoration-2 opacity-60 ml-2">₹{(priceNumber * 1.2).toFixed(0)}</span>
                </p>
              </div>
              
              <div className="prose prose-invert prose-p:text-stone-warm prose-p:font-light prose-p:leading-relaxed max-w-none text-sm md:text-base">
                <p>{product.description}</p>
              </div>

              {/* Actions Area */}
              <div className="space-y-8 pt-6">
                 
                 {/* Selectors */}
                 <div className="flex items-center gap-8">
                     <div className="space-y-3">
                         <span className="text-xs text-stone-500 uppercase tracking-widest block">Quantity</span>
                         <div className="flex items-center border border-white/10 rounded-sm overflow-hidden">
                            <button
                              onClick={() => handleQuantityChange(-1)}
                              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-stone-400 hover:text-clay hover:bg-white/5 transition-all duration-300 disabled:opacity-30 group"
                              disabled={quantity <= 1}
                            >
                              <Minus size={16} className="group-hover:scale-110 transition-transform" />
                            </button>
                            <span className="w-10 md:w-12 text-center text-base md:text-lg text-rice-paper font-serif">{quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(1)}
                              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-stone-400 hover:text-clay hover:bg-white/5 transition-all duration-300 disabled:opacity-30 group"
                              disabled={quantity >= 10 || quantity >= product.stock}
                            >
                              <Plus size={16} className="group-hover:scale-110 transition-transform" />
                            </button>
                         </div>
                     </div>
                 </div>

                 {/* Buttons */}
                 <div className="flex flex-col sm:flex-row gap-4 w-full">
                    {isInCart ? (
                        <Link href="/cart" className="w-full py-4 bg-white text-charcoal font-bold uppercase tracking-widest text-xs hover:bg-clay hover:text-white transition-all duration-300 text-center flex items-center justify-center gap-2 rounded-sm group">
                            View In Cart <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ) : (
                        <button
                          onClick={handleAddToCart}
                          disabled={isAdding || product.stock === 0}
                          className={`w-full py-4 font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2 rounded-sm ${
                             product.stock === 0 
                               ? 'bg-stone-800 text-stone-500 cursor-not-allowed' 
                               : 'bg-clay text-white hover:bg-white hover:text-clay hover:scale-[1.02] active:scale-[0.98]'
                          }`}
                        >
                          {isAdding ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Adding...
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={16} className="group-hover:scale-110 transition-transform" />
                              Add to Cart
                            </>
                          )}
                        </button>
                    )}
                    
                    <button
                        onClick={handleBuyNow}
                        disabled={isAdding || product.stock === 0}
                        className={`w-full py-4 border border-white/20 font-bold uppercase tracking-widest text-xs transition-all duration-300 rounded-sm group ${
                            product.stock === 0 
                              ? 'opacity-30 cursor-not-allowed' 
                              : 'hover:border-clay hover:text-clay hover:bg-clay/5 text-rice-paper hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                    >
                        Buy Now {!isAdding && <ArrowRight size={14} className="inline ml-1 group-hover:translate-x-1 transition-transform" />}
                    </button>
                 </div>

                 {/* Features */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 pt-8 border-t border-white/5">
                    <div className="flex items-center gap-3 text-stone-400">
                        <Truck size={20} className="text-clay/80" />
                        <span className="text-xs uppercase tracking-wider">Fast Shipping</span>
                    </div>
                    <div className="flex items-center gap-3 text-stone-400">
                        <ShieldCheck size={20} className="text-clay/80" />
                        <span className="text-xs uppercase tracking-wider">Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-3 text-stone-400">
                        <Package size={20} className="text-clay/80" />
                        <span className="text-xs uppercase tracking-wider">Safe Packaging</span>
                    </div>
                 </div>

              </div>

            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 md:mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 border-t border-white/5 pt-16 md:pt-20">
            <div className="flex items-end justify-between mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-serif text-rice-paper">Curated For You</h2>
                <Link href="/shop" className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 hover:text-clay transition-colors">
                    View All <ArrowRight size={14} />
                </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((p, idx) => (
                <div
                  key={p.id}
                  className="group cursor-pointer"
                  onClick={() => router.push(`/shop/products/${p.id}`)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-charcoal-light mb-4 rounded-sm">
                     <img 
                        src={p.image || (p.images && p.images[0])} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        alt={p.name}
                     />
                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-lg font-serif text-rice-paper group-hover:text-clay transition-colors">{p.name}</h3>
                  <p className="text-sm text-stone-500 mt-1">₹{Number(p.price).toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* TOAST NOTIFICATION */}
      {notification.show && (
        <Notification 
            message={notification.message} 
            type={notification.type} 
            onClose={() => setNotification({ ...notification, show: false })} 
        />
      )}
    </div>
  );
}