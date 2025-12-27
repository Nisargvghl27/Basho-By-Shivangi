// src/app/shop/products/[id]/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../../../context/CartContext';
import { useWishlist } from '../../../../context/WishlistContext';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

import { getProductById, getRelatedProducts } from '../../../../lib/products';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, cartItems } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [hoveredCard, setHoveredCard] = useState(null);

  const product = getProductById(params.id);
  const priceNumber = product ? (typeof product.price === 'string' ? parseFloat(product.price.replace(/[^0-9.-]+/g, '')) : product.price) : 0;
  
  // Check if product is in cart
  const isInCart = product ? cartItems.some(item => item.id === product.id) : false;
  // Ensure we always have an images array for rendering and fall back to single `image` if present
  const images = product ? (product.colorVariants && product.colors[selectedColor] 
    ? product.colorVariants[product.colors[selectedColor]] 
    : (product.images ?? (product.image ? [product.image] : []))) : []; 
  const relatedProducts = product ? getRelatedProducts(product.id, 4) : [];

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

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[0] ?? product.image,
      quantity: quantity
    });
    
    // Show toast notification
    setNotification({
      show: true,
      message: `${product.name} added to cart`,
      type: 'success'
    });
    
    // Hide notification after 3 seconds
    const timer = setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
    
    return () => clearTimeout(timer);
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
        price: product.price,
        image: images[0] ?? product.image
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

  // Handle quantity input change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  // Render star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
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
            {/* Product Images */}
            <div className="md:w-1/2">
              <div className="group bg-charcoal-light rounded-xl overflow-hidden shadow-2xl mb-4 transition-transform duration-700 ease-out hover:-translate-y-1">
                <img 
                  key={images[selectedImage] ?? images[0] ?? product.image}
                  src={images[selectedImage] ?? images[0] ?? product.image} 
                  alt={product.name}
                  onLoad={() => setMainImageLoaded(true)}
                  className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
                  style={{
                    opacity: mainImageLoaded ? 1 : 0
                  }}
                />
              </div>
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
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 relative z-10">
              <div className="bg-charcoal/70 backdrop-blur-sm rounded-xl p-6 border border-white/5 shadow-2xl transition-all duration-700 hover:border-clay/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99] cursor-pointer">
                <div className="mb-6">
                  <span className="text-clay text-xs font-medium tracking-widest uppercase">{product.category}</span>
                  <h1 className="text-3xl md:text-4xl font-serif font-medium text-rice-paper mt-2 mb-1 relative group block w-full">
                    <span className="relative z-10 transition-all duration-700 group-hover:tracking-tight block">
                      {product.name}
                    </span>
                    <span className="absolute inset-0 text-clay blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                      {product.name}
                    </span>
                  </h1>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {renderRating(product.rating)}
                    </div>
                    <a href="#reviews" className="ml-2 text-sm text-stone-warm hover:text-clay transition-colors">
                      ({product.reviewCount} reviews)
                    </a>
                    {product.inStock ? (
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

                  {/* Color Palette */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-rice-paper mb-3">Available Colors</h3>
                      <div className="flex gap-2">
                        {product.colors.map((color, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              if (selectedColor !== index) {
                                setSelectedColor(index);
                                setSelectedImage(0);
                                setMainImageLoaded(false);
                              }
                            }}
                            className={`w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 transform ${
                              selectedColor === index ? 'border-clay ring-2 ring-clay/50' : 'border-stone-600 hover:border-clay'
                            }`}
                            style={{ backgroundColor: color }}
                            aria-label={`Select color ${color}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-stone-warm mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-rice-paper mb-3">Details</h3>
                    <ul className="space-y-2">
                      {(product.details || []).map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-clay mr-2">•</span>
                          <span className="text-stone-warm">{detail}</span>
                        </li>
                      ))}
                    </ul> 
                  </div>

                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center border border-stone-700 rounded-md">
                      <button 
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className={`px-3 py-2 transition-colors ${quantity <= 1 ? 'text-stone-600 cursor-not-allowed' : 'text-stone-warm hover:bg-charcoal'}`}
                        aria-label="Decrease quantity"
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
                        aria-label="Quantity"
                      />
                      <button 
                        onClick={incrementQuantity}
                        disabled={quantity >= 10}
                        className={`px-3 py-2 transition-colors ${quantity >= 10 ? 'text-stone-600 cursor-not-allowed' : 'text-stone-warm hover:bg-charcoal'}`}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-rice-paper/80">
                    {quantity > 1 ? `${quantity} items` : `${quantity} item`}
                  </span>
                  </div>

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
                        disabled={!product.inStock}
                        className={`w-full py-3 px-6 rounded-md text-lg font-medium transition-all duration-300 relative overflow-hidden active:scale-[0.98] ${
                          product.inStock 
                            ? 'group bg-clay text-white hover:bg-clay/90' 
                            : 'bg-stone-700 text-stone-400 cursor-not-allowed'
                        }`}
                      >
                        <span className="relative z-10">
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </span>
                        {product.inStock && (
                          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        )}
                      </button>
                    )}
                    <button
                      onClick={handleWishlistToggle}
                      className={`w-full py-3 px-6 border rounded-md flex items-center justify-center gap-2 btn-glow transition-all duration-500 ease-out active:scale-[0.98] ${
                        isInWishlist(product.id)
                          ? 'border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                          : 'border-stone-700 text-rice-paper hover:bg-charcoal/50'
                      }`}
                    >
                      <span className={`${isInWishlist(product.id) ? 'text-red-400' : ''}`}>
                        {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      </span>
                      <span className={isInWishlist(product.id) ? 'text-red-500' : 'text-clay'}>
                        {isInWishlist(product.id) ? '❤️' : '🤍'}
                      </span>
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-stone-800">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <span className="text-clay mr-2">🚚</span>
                        <div>
                          <div className="font-medium">Free Shipping</div>
                          <div className="text-stone-warm">On orders over $50</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-clay mr-2">↩️</span>
                        <div>
                          <div className="font-medium">Easy Returns</div>
                          <div className="text-stone-warm">30-day return policy</div>
                        </div>
                      </div>
                    </div>
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
                  Additional Information
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === 'reviews' 
                      ? 'border-clay text-clay' 
                      : 'border-transparent text-stone-warm hover:text-rice-paper'
                  }`}
                >
                  Reviews ({product.reviewCount})
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
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
                  
                  <div>
                    <h4 className="text-lg font-medium text-rice-paper mb-3">Features</h4>
                    <ul className="space-y-3">
                      {(product.details || []).map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="material-symbols-outlined text-clay mr-3 text-lg">check_circle</span>
                          <span className="text-stone-warm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Additional Information Tab */}
              {activeTab === 'additional' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-medium text-rice-paper mb-4">Product Details</h3>
                    <ul className="space-y-3">
                      <li className="group flex items-start rounded-lg px-3 py-2 border border-transparent transition-all duration-500 ease-out hover:bg-charcoal/60 hover:border-clay/50 hover:shadow-[0_10px_30px_rgba(166,93,61,0.14)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99] cursor-pointer">
                        <span className="material-symbols-outlined text-clay mr-3">inventory_2</span>
                        <div>
                          <span className="block font-medium text-rice-paper transition-colors duration-500 group-hover:text-clay">Material</span>
                          <span className="text-stone-warm transition-colors duration-500 group-hover:text-rice-paper/80">{product.category.split('•')[0].trim()}</span>
                        </div>
                      </li>
                      <li className="group flex items-start rounded-lg px-3 py-2 border border-transparent transition-all duration-500 ease-out hover:bg-charcoal/60 hover:border-clay/50 hover:shadow-[0_10px_30px_rgba(166,93,61,0.14)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99] cursor-pointer">
                        <span className="material-symbols-outlined text-clay mr-3">palette</span>
                        <div>
                          <span className="block font-medium text-rice-paper transition-colors duration-500 group-hover:text-clay">Color</span>
                          <span className="text-stone-warm transition-colors duration-500 group-hover:text-rice-paper/80">
                            {product.colors && product.colors.length > 0 
                              ? (() => {
                                  const colorMap = {
                                    '#442D1C': 'Rich Brown',
                                    '#652810': 'Dark Chocolate', 
                                    '#8E5022': 'Terracotta',
                                    '#C85428': 'Burnt Orange',
                                    '#EDD8B4': 'Cream'
                                  };
                                  return colorMap[product.colors[selectedColor]] || product.colors[selectedColor];
                                })()
                              : 'Natural Clay'}
                          </span>
                        </div>
                      </li>
                      <li className="group flex items-start rounded-lg px-3 py-2 border border-transparent transition-all duration-500 ease-out hover:bg-charcoal/60 hover:border-clay/50 hover:shadow-[0_10px_30px_rgba(166,93,61,0.14)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99] cursor-pointer">
                        <span className="material-symbols-outlined text-clay mr-3">straighten</span>
                        <div>
                          <span className="block font-medium text-rice-paper transition-colors duration-500 group-hover:text-clay">Dimensions</span>
                          <span className="text-stone-warm transition-colors duration-500 group-hover:text-rice-paper/80">
                            {product.name.includes('Mug') ? '3.5" H x 3.5" W' : 
                             product.name.includes('Vase') ? '10" H x 6" W' : 
                             product.name.includes('Bowl') ? '3" H x 5.5" W' : 
                             'Varies by product'}
                          </span>
                        </div>
                      </li>
                      <li className="group flex items-start rounded-lg px-3 py-2 border border-transparent transition-all duration-500 ease-out hover:bg-charcoal/60 hover:border-clay/50 hover:shadow-[0_10px_30px_rgba(166,93,61,0.14)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99] cursor-pointer">
                        <span className="material-symbols-outlined text-clay mr-3">scale</span>
                        <div>
                          <span className="block font-medium text-rice-paper transition-colors duration-500 group-hover:text-clay">Weight</span>
                          <span className="text-stone-warm transition-colors duration-500 group-hover:text-rice-paper/80">
                            {product.name.includes('Mug') ? '1.2 lbs' : 
                             product.name.includes('Vase') ? '3.5 lbs' : 
                             product.name.includes('Bowl') ? '2.1 lbs' : 
                             'Varies by product'}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-rice-paper mb-4">Care Instructions</h3>
                    <ul className="space-y-3">
                      <li className="group flex items-start rounded-lg px-3 py-2 border border-transparent transition-all duration-500 ease-out hover:bg-charcoal/60 hover:border-clay/50 hover:shadow-[0_10px_30px_rgba(166,93,61,0.14)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99] cursor-pointer">
                        <span className="material-symbols-outlined text-clay mr-3">restaurant</span>
                        <div>
                          <span className="block font-medium text-rice-paper transition-colors duration-500 group-hover:text-clay">Food Safe</span>
                          <span className="text-stone-warm transition-colors duration-500 group-hover:text-rice-paper/80">Yes, microwave and dishwasher safe</span>
                        </div>
                      </li>
                      <li className="group flex items-start rounded-lg px-3 py-2 border border-transparent transition-all duration-500 ease-out hover:bg-charcoal/60 hover:border-clay/50 hover:shadow-[0_10px_30px_rgba(166,93,61,0.14)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99] cursor-pointer">
                        <span className="material-symbols-outlined text-clay mr-3">water_drop</span>
                        <div>
                          <span className="block font-medium text-rice-paper transition-colors duration-500 group-hover:text-clay">Waterproof</span>
                          <span className="text-stone-warm transition-colors duration-500 group-hover:text-rice-paper/80">Yes, fully glazed interior</span>
                        </div>
                      </li>
                      <li className="group flex items-start rounded-lg px-3 py-2 border border-transparent transition-all duration-500 ease-out hover:bg-charcoal/60 hover:border-clay/50 hover:shadow-[0_10px_30px_rgba(166,93,61,0.14)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99] cursor-pointer">
                        <span className="material-symbols-outlined text-clay mr-3">auto_awesome</span>
                        <div>
                          <span className="block font-medium text-rice-paper transition-colors duration-500 group-hover:text-clay">Handmade</span>
                          <span className="text-stone-warm transition-colors duration-500 group-hover:text-rice-paper/80">Each piece is unique</span>
                        </div>
                      </li>
                    </ul>
                    
                    <div className="mt-6 p-4 bg-charcoal-light rounded-lg border border-transparent transition-all duration-500 ease-out hover:bg-charcoal/60 hover:border-clay/50 hover:shadow-[0_10px_30px_rgba(166,93,61,0.14)]">
                      <div className="flex items-start">
                        <span className="material-symbols-outlined text-clay mr-2">info</span>
                        <p className="text-sm text-stone-warm">
                          Due to the handmade nature of our products, slight variations in size, color, and texture may occur, making each piece truly unique.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="text-4xl font-light mr-6">
                      {(product.rating || 0).toFixed(1)}<span className="text-2xl text-stone-500">/5</span>
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        {renderRating(product.rating)}
                        <span className="ml-2 text-stone-400 text-sm">
                          ({product.reviewCount} reviews)
                        </span>
                      </div>
                      <button className="mt-2 text-sm text-clay hover:underline">
                        Write a review
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {[1, 2].map((review) => (
                      <div key={review} className="border-b border-stone-800 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">
                            {review === 1 ? 'Alex Johnson' : 'Sam Taylor'}
                          </div>
                          <div className="text-sm text-stone-500">
                            {review === 1 ? '2 weeks ago' : '1 month ago'}
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          {Array(5).fill().map((_, i) => (
                            <span key={i} className={`${i < (review === 1 ? 5 : 4) ? 'text-yellow-400' : 'text-stone-700'}`}>★</span>
                          ))}
                        </div>
                        <p className="text-stone-warm">
                          {review === 1 
                            ? 'Absolutely love this piece! The craftsmanship is outstanding and it looks even better in person.'
                           : 'Beautiful work, though slightly smaller than I expected. The quality is excellent.'}
                          
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <button className="mt-6 text-clay hover:underline text-sm font-medium">
                    Load more reviews
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-3xl font-serif font-medium text-rice-paper mb-8 transition-all duration-500 hover:scale-x-95 origin-left">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div 
                  key={relatedProduct.id}
                  onMouseEnter={() => setHoveredCard(relatedProduct.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group flex flex-col gap-4 bg-charcoal-light border border-border-subtle p-4 transition-all duration-500 hover:border-clay/30 hover:bg-white/5 hover:shadow-[0_16px_45px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:scale-[1.02]"
                >
                  {/* Image Container */}
                  <div className="h-64 w-full overflow-hidden relative bg-black/20 group">
                    {/* Subtle Noise Texture */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-1000 z-0"
                      style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
                        backgroundSize: '200px 200px'
                      }}
                    ></div>
                    {/* Overlay with Color Shift */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-clay/10 transition-all duration-700 z-0" />
                    {/* Main Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1"
                      style={{
                        backgroundImage: `url("${relatedProduct.images?.[0] || relatedProduct.image}")`,
                      }}
                    />

                    {/* Moving Gradient Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-clay/5 to-transparent animate-gradient-shift"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(210,180,140,0.03)_70%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    </div>

                    {/* Wishlist Button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isInWishlist(relatedProduct.id)) {
                          removeFromWishlist(relatedProduct.id);
                          setNotification({
                            show: true,
                            message: `Removed ${relatedProduct.name} from wishlist`,
                            type: 'success'
                          });
                        } else {
                          addToWishlist({
                            id: relatedProduct.id,
                            name: relatedProduct.name,
                            price: relatedProduct.price,
                            image: relatedProduct.images?.[0] || relatedProduct.image
                          });
                          setNotification({
                            show: true,
                            message: `Added ${relatedProduct.name} to wishlist`,
                            type: 'success'
                          });
                        }
                      }}
                      className={`absolute top-3 right-3 p-2 bg-charcoal/80 backdrop-blur-md rounded-full transition-all duration-500 z-10 ${
                        isInWishlist(relatedProduct.id) || hoveredCard === relatedProduct.id
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2'
                      } ${isInWishlist(relatedProduct.id) 
                        ? 'text-red-500 hover:text-red-400' 
                        : 'text-stone-warm hover:text-clay'}`}
                      aria-label={isInWishlist(relatedProduct.id) ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <span className="material-symbols-outlined text-[16px] block">
                        {isInWishlist(relatedProduct.id) ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>

                    {/* Quick View Overlay */}
                    <Link 
                      href={`/shop/products/${relatedProduct.id}`}
                      className={`absolute inset-0 bg-charcoal/95 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                        hoveredCard === relatedProduct.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <span className="text-white text-sm uppercase tracking-[0.2em] font-bold border border-white/20 px-6 py-3 transition-all duration-300 hover:bg-clay hover:border-clay hover:scale-105">
                        Quick View
                      </span>
                    </Link>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col flex-1">
                    <Link
                      href={`/shop/products/${relatedProduct.id}`}
                      className="group-hover:text-clay transition-colors duration-500"
                    >
                      <h3 className="font-serif text-rice-paper text-lg mb-1 group-hover:underline">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-xs text-stone-warm uppercase tracking-wider mb-3">
                        {relatedProduct.category}
                      </p>
                    </Link>
                    
                    <div className="mt-auto pt-3 border-t border-white/5 group-hover:border-clay/20 transition-colors duration-500">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-rice-paper group-hover:text-clay transition-colors duration-500">
                          {relatedProduct.price}
                        </span>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={`${star <= 4 ? 'text-yellow-400' : 'text-stone-700'}`}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
                    {notification.type === 'success' ? 'Added to Cart' : 'Error'}
                  </p>
                  <p className="text-sm text-stone-300">{notification.message}</p>
                </div>
                <button
                  onClick={() => setNotification({ ...notification, show: false })}
                  className="text-stone-400 hover:text-white transition-colors ml-2"
                  aria-label="Close notification"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
      </main>
      <Footer />
    </div>
  );
}