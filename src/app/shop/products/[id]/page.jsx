// src/app/shop/products/[id]/page.jsx
'use client';

// Updated import path for CartContext

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../../../context/CartContext';
import { useWishlist } from '../../../../context/WishlistContext';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

// IMPORT FROM THE NEW UNIFIED SERVICE
import { fetchProductById, getRelatedProducts } from '../../../../lib/productService';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, cartItems, setCartItems, clearCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Data State
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI State
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [hoveredCard, setHoveredCard] = useState(null);

  // 1. Fetch Data from Firebase
  useEffect(() => {
    const loadData = async () => {
        if (!params.id) return;
        setLoading(true);
        try {
            // Fetch current product
            const fetchedProduct = await fetchProductById(params.id);
            
            if (fetchedProduct) {
                setProduct(fetchedProduct);
                // Fetch related products based on category
                const related = await getRelatedProducts(fetchedProduct.id, fetchedProduct.category);
                setRelatedProducts(related);
            }
        } catch (error) {
            console.error("Error loading product", error);
        } finally {
            setLoading(false);
        }
    };
    loadData();
  }, [params.id]);

  // 2. Loading State
  if (loading) {
    return (
        <div className="min-h-screen bg-charcoal flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-clay border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-stone-warm text-sm uppercase tracking-widest animate-pulse">Loading Product...</p>
                </div>
            </div>
            <Footer />
        </div>
    );
  }

  // 3. Not Found State
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-charcoal text-rice-paper">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-rice-paper mb-4">Product not found</h1>
            <Link href="/shop" className="text-clay hover:underline">
              ← Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- LOGIC ---

  const priceNumber = Number(product.price) || 0;
  
  // Ensure we have an array of images. If 'images' exists use it, otherwise use single 'image'
  const images = product.images && product.images.length > 0 
    ? product.images 
    : (product.image ? [product.image] : []);

  const isInCart = cartItems.some(item => item.id === product.id);

  const handleBuyNow = () => {
    console.log('=== Buy Now clicked ===');
    console.log('Current cart before:', cartItems);
    console.log('Product to add:', product);
    
    if (product.stock > 0) {
      // For Buy Now, we want to replace the quantity in cart with the selected quantity
      const existingItem = cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update existing item with new quantity instead of adding to it
        setCartItems(prevItems => 
          prevItems.map(item => 
            item.id === product.id 
              ? { ...item, quantity: quantity }
              : item
          )
        );
      } else {
        // Add new item if not in cart
        addToCart({
          ...product,
          quantity: quantity
        });
      }
      
      // Navigate to checkout after a short delay to ensure cart is updated
      setTimeout(() => {
        console.log('Navigating to checkout...');
        // Pass the product ID as selected item so only this item gets removed after purchase
        router.push(`/checkout?selected=${product.id}`);
      }, 500);
    } else {
      console.log('Product out of stock');
    }
  };

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: priceNumber,
        image: images[0],
        quantity: quantity
      });
      
      setNotification({
        show: true,
        message: `${product.name} added to cart`,
        type: 'success'
      });
      
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 3000);
    }
    setNotification({
      show: true,
      message: `${product.name} added to cart`,
      type: 'success'
    });
    
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setNotification({
        show: true,
        message: `${product.name} removed from wishlist`,
        type: 'success'
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: priceNumber,
        image: images[0]
      });
      setNotification({
        show: true,
        message: `${product.name} added to wishlist`,
        type: 'success'
      });
    }
    
    setTimeout(() => setNotification({ ...notification, show: false }), 3000);
  };

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 5);
    const hasHalfStar = (rating || 5) % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="text-yellow-400">½</span>);
      } else {
        stars.push(<span key={i} className="text-gray-600">★</span>);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-rice-paper relative overflow-hidden">
      {/* Grain Texture */}
      <div className="fixed inset-0 opacity-[0.12] pointer-events-none z-0">
        <div 
          className="absolute inset-0 animate-grain-shift"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
            backgroundSize: '200px 200px'
          }}
        ></div>
      </div>
      <Header />
      
      <main className="flex-grow pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row gap-12">
            {/* Left: Product Images */}
            <div className="md:w-1/2">
              <div className="group bg-charcoal-light rounded-xl overflow-hidden shadow-2xl mb-4 transition-transform duration-700 ease-out hover:-translate-y-1 relative">
                {/* Wishlist Button - Top Right */}
                <button
                  onClick={handleWishlistToggle}
                  className={`absolute top-4 right-4 z-10 p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
                    isInWishlist(product.id)
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      : 'bg-charcoal/50 text-rice-paper hover:bg-charcoal/70'
                  }`}
                  aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <span className="text-xl">
                    {isInWishlist(product.id) ? '❤️' : '🤍'}
                  </span>
                </button>
                
                <img 
                  key={images[selectedImage]}
                  src={images[selectedImage]} 
                  alt={product.name}
                  onLoad={() => setMainImageLoaded(true)}
                  className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
                  style={{ opacity: mainImageLoaded ? 1 : 0 }}
                />
              </div>
              {images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (selectedImage !== index) {
                            setMainImageLoaded(false);
                            setSelectedImage(index);
                          }
                        }}
                        className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
                          selectedImage === index ? 'ring-2 ring-clay' : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div> 
              )}
            </div>

            {/* Right: Product Info */}
            <div className="md:w-1/2 relative z-10">
              <div className="bg-charcoal/70 backdrop-blur-sm rounded-xl p-6 border border-white/5 shadow-2xl transition-all duration-700 hover:border-clay/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-[1px]">
                <div className="mb-6">
                  <span className="text-clay text-xs font-medium tracking-widest uppercase">{product.category}</span>
                  <h1 className="text-3xl md:text-4xl font-serif font-medium text-rice-paper mt-2 mb-1">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {renderRating(product.rating)}
                    </div>
                    <span className="ml-2 text-sm text-stone-warm">
                      ({product.reviewCount || 0} reviews)
                    </span>
                    {product.stock > 0 ? (
                      <span className="ml-4 text-green-400 text-sm flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                        In Stock
                      </span>
                    ) : (
                      <span className="ml-4 text-red-400 text-sm">Out of Stock</span>
                    )}
                  </div>

                  <p className="text-3xl text-clay font-medium mb-6">
                    ${priceNumber.toFixed(2)}
                  </p>

                  <p className="text-stone-warm mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center border border-stone-700 rounded-md">
                      <button 
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className={`px-3 py-2 transition-colors ${quantity <= 1 ? 'text-stone-600 cursor-not-allowed' : 'text-stone-warm hover:bg-charcoal'}`}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-12 bg-transparent text-center text-rice-paper border-none focus:ring-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button 
                        onClick={incrementQuantity}
                        disabled={quantity >= 10}
                        className={`px-3 py-2 transition-colors ${quantity >= 10 ? 'text-stone-600 cursor-not-allowed' : 'text-stone-warm hover:bg-charcoal'}`}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-rice-paper/80">
                      {quantity > 1 ? `${quantity} items` : `${quantity} item`}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    {isInCart ? (
                      <Link 
                        href="/cart"
                        className="w-full py-3 px-6 rounded-md text-lg font-bold flex items-center justify-center transition-all duration-300 relative overflow-hidden active:scale-[0.98] group bg-clay text-white hover:bg-clay/90"
                      >
                        <span className="relative z-10">View Cart</span>
                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </Link>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                        className={`w-full py-3 px-6 rounded-md text-lg font-medium transition-all duration-300 relative overflow-hidden active:scale-[0.98] ${
                          product.stock > 0
                            ? 'group bg-clay text-white hover:bg-clay/90' 
                            : 'bg-stone-700 text-stone-400 cursor-not-allowed'
                        }`}
                      >
                        <span className="relative z-10">
                          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </span>
                        {product.stock > 0 && (
                          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        )}
                      </button>
                    )}
                    
                    <button
                      onClick={handleBuyNow}
                      disabled={product.stock <= 0}
                      className={`w-full py-3 px-6 rounded-md text-lg font-medium transition-all duration-300 relative overflow-hidden active:scale-[0.98] border ${
                        product.stock > 0
                          ? 'group border-clay text-clay hover:bg-clay hover:text-white' 
                          : 'border-stone-700 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">bolt</span>
                        {product.stock > 0 ? 'Buy Now' : 'Out of Stock'}
                      </span>
                      {product.stock > 0 && (
                        <div className="absolute inset-0 bg-clay transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-12">
            <div className="border-b border-stone-800">
              <nav className="-mb-px flex space-x-8">
                <button 
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === 'description' 
                      ? 'border-clay text-clay' 
                      : 'border-transparent text-stone-warm hover:text-rice-paper'
                  }`}
                >
                  Description
                </button>
                <button 
                  onClick={() => setActiveTab('additional')}
                  className={`py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === 'additional' 
                      ? 'border-clay text-clay' 
                      : 'border-transparent text-stone-warm hover:text-rice-paper'
                  }`}
                >
                  Information
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === 'reviews' 
                      ? 'border-clay text-clay' 
                      : 'border-transparent text-stone-warm hover:text-rice-paper'
                  }`}
                >
                  Reviews
                </button>
              </nav>
            </div>
            
            <div className="py-8">
              {/* Description Tab */}
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-rice-paper mb-4">Product Description</h3>
                    <p className="text-stone-warm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Additional Information Tab */}
              {activeTab === 'additional' && (
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <div className="flex justify-between border-b border-stone-800 pb-2">
                        <span className="text-stone-400">Category</span>
                        <span className="text-rice-paper">{product.category}</span>
                      </div>
                      <div className="flex justify-between border-b border-stone-800 pb-2">
                        <span className="text-stone-400">SKU</span>
                        <span className="text-rice-paper">{product.sku || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between border-b border-stone-800 pb-2">
                        <span className="text-stone-400">Stock Status</span>
                        <span className="text-rice-paper">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                      </div>
                   </div>
                </div>
              )}
              
              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="text-stone-warm">
                  <p>No reviews yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
                <h2 className="text-3xl font-serif font-medium text-rice-paper mb-8">You May Also Like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                    <div 
                    key={relatedProduct.id}
                    onMouseEnter={() => setHoveredCard(relatedProduct.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group flex flex-col gap-4 bg-charcoal-light border border-border-subtle p-4 transition-all duration-500 hover:border-clay/30 hover:bg-white/5 hover:shadow-[0_16px_45px_rgba(0,0,0,0.45)] hover:-translate-y-1"
                    >
                    <div className="h-64 w-full overflow-hidden relative bg-black/20 group cursor-pointer" onClick={() => router.push(`/shop/products/${relatedProduct.id}`)}>
                        <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110"
                        style={{
                            backgroundImage: `url("${relatedProduct.image || relatedProduct.images?.[0] || '/api/placeholder/400/400'}")`,
                        }}
                        />
                        {/* Quick View Overlay */}
                        <div className={`absolute inset-0 bg-charcoal/80 flex items-center justify-center transition-opacity duration-300 ${hoveredCard === relatedProduct.id ? 'opacity-100' : 'opacity-0'}`}>
                            <span className="text-white border border-white px-4 py-2 uppercase text-xs tracking-widest hover:bg-clay hover:border-clay transition-colors">View</span>
                        </div>
                    </div>

                    <div className="flex flex-col flex-1">
                        <Link href={`/shop/products/${relatedProduct.id}`}>
                            <h3 className="font-serif text-rice-paper text-lg mb-1 group-hover:text-clay transition-colors">
                                {relatedProduct.name}
                            </h3>
                        </Link>
                        <p className="text-xs text-stone-warm uppercase tracking-wider mb-2">
                            {relatedProduct.category}
                        </p>
                        <div className="mt-auto pt-3 border-t border-white/5">
                            <span className="font-serif text-rice-paper">
                                ${Number(relatedProduct.price).toFixed(2)}
                            </span>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
          )}

          {/* Notification Toast */}
          {notification.show && (
            <div 
              className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl z-50 transition-all duration-300 transform ${
                notification.show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              } ${
                notification.type === 'success' 
                  ? 'bg-charcoal-light border border-clay/50 text-rice-paper' 
                  : 'bg-red-900/90 border border-red-700 text-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined mt-0.5">
                  {notification.type === 'success' ? 'check_circle' : 'error'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">
                    {notification.type === 'success' ? 'Success' : 'Error'}
                  </p>
                  <p className="text-sm text-stone-300">{notification.message}</p>
                </div>
                <button
                  onClick={() => setNotification({ ...notification, show: false })}
                  className="text-stone-400 hover:text-white transition-colors ml-2"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      
      <style jsx>{`
        @keyframes grain-shift {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          50% { transform: translate(-10%, 5%); }
          90% { transform: translate(10%, 5%); }
        }
        .animate-grain-shift {
          animation: grain-shift 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}