'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

import { useCart } from '../../../../context/CartContext';
import { useWishlist } from '../../../../context/WishlistContext';

import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

import { fetchProductById, getRelatedProducts } from '../../../../lib/productService';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const { addToCart, cartItems } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // DATA STATE
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI STATE
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [isAdding, setIsAdding] = useState(false);

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

  // LOADING
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

  // NOT FOUND
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-charcoal text-rice-paper">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 pt-24">
          <div className="text-center">
            <h1 className="text-2xl mb-4">Product not found</h1>
            <Link href="/shop" className="text-clay hover:underline">← Back to Shop</Link>
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
    setTimeout(() => setNotification(n => ({ ...n, show: false })), 3000);
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
      setTimeout(() => router.push(`/checkout?selected=${product.id}`), 300);
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

  const incrementQuantity = () => setQuantity(q => Math.min(q + 1, 10));
  const decrementQuantity = () => setQuantity(q => Math.max(q - 1, 1));

  // UI
  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-rice-paper">
      <Header />

      <main className="flex-grow pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">

          {/* IMAGE */}
          <div>
            <div className="relative bg-charcoal-light rounded-xl overflow-hidden shadow-2xl">
              <button
                onClick={handleWishlistToggle}
                className={`absolute top-4 right-4 z-10 p-3 rounded-full ${
                  isInWishlist(product.id)
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-black/40 text-white'
                }`}
              >
                {isInWishlist(product.id) ? '❤️' : '🤍'}
              </button>

              <img
                src={images[selectedImage]}
                onLoad={() => setMainImageLoaded(true)}
                className="w-full transition-all duration-700"
                style={{ opacity: mainImageLoaded ? 1 : 0 }}
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => {
                      setMainImageLoaded(false);
                      setSelectedImage(i);
                    }}
                    className={`w-20 h-20 object-cover rounded cursor-pointer ${
                      selectedImage === i ? 'ring-2 ring-clay' : 'opacity-60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div>
            <p className="text-clay uppercase text-xs">{product.category}</p>
            <h1 className="text-4xl font-serif mt-2">{product.name}</h1>

            <p className="text-clay text-3xl mt-4">₹{priceNumber.toFixed(2)}</p>
            <p className="text-stone-warm mt-4">{product.description}</p>

            {/* QTY */}
            <div className="flex items-center gap-4 mt-6">
              <button onClick={decrementQuantity}>−</button>
              <input
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-12 text-center bg-transparent border"
              />
              <button onClick={incrementQuantity}>+</button>
            </div>

            {/* ACTIONS */}
            <div className="space-y-3 mt-6">
              {!isInCart ? (
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || product.stock === 0}
                  className={`w-full py-3 rounded text-white ${
                    product.stock === 0 ? 'bg-stone-600 cursor-not-allowed' : 'bg-clay hover:bg-clay/90'
                  }`}
                >
                  {product.stock === 0 ? 'Out of Stock' : isAdding ? 'Adding...' : 'Add to Cart'} 
                </button>
              ) : (
                <Link href="/cart" className="block text-center bg-clay py-3 rounded">
                  View Cart
                </Link>
              )}

              <button
                onClick={handleBuyNow}
                disabled={isAdding || product.stock === 0}
                className={`w-full border border-clay text-clay py-3 rounded ${
                   product.stock === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-clay hover:text-white'
                }`}
              >
                 {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>

        {/* RELATED */}
        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 mt-16">
            <h2 className="text-3xl mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <div
                  key={p.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/shop/products/${p.id}`)}
                >
                  <img src={p.image || p.images?.[0]} className="mb-2" />
                  <p>{p.name}</p>
                  <p className="text-clay">₹{Number(p.price).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* TOAST */}
      {notification.show && (
        <div className={`fixed bottom-8 right-8 px-6 py-4 rounded text-white ${
          notification.type === 'error' ? 'bg-red-600' : 'bg-black'
        }`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}