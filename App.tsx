
import React, { useState, useMemo } from 'react';
import { View, Product, CartItem } from './types';
import { PRODUCTS, CATEGORIES } from './constants';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import WellnessAI from './components/WellnessAI';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setView('product-detail');
  };

  const renderHome = () => (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://picsum.photos/seed/wellness-hero/1920/1080" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Wellness Background"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Elevate Your <span className="text-emerald-400">Health</span>,<br />Transform Your Life.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-100">
            Discover the natural power of Ganoderma-infused wellness products. Science-backed nutrition for a modern lifestyle.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setView('shop')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
            >
              Shop Collection
            </button>
            <button 
              onClick={() => setView('about')}
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all"
            >
              Our Mission
            </button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Ranges</h2>
          <div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Pure Supplements', img: 'https://picsum.photos/seed/supp/400/500', icon: 'fa-capsules' },
            { name: 'Healthy Beverages', img: 'https://picsum.photos/seed/bev/400/500', icon: 'fa-mug-hot' },
            { name: 'Natural Care', img: 'https://picsum.photos/seed/care/400/500', icon: 'fa-soap' }
          ].map((cat, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer shadow-lg" onClick={() => setView('shop')}>
              <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <i className={`fa-solid ${cat.icon} text-3xl mb-2 text-emerald-400`}></i>
                <h3 className="text-2xl font-bold">{cat.name}</h3>
                <p className="text-sm text-gray-300">Explore natural solutions</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why DXN */}
      <section className="bg-emerald-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">The King of Herbs: Ganoderma Lucidum</h2>
              <p className="text-lg text-emerald-100 mb-8 leading-relaxed">
                DXN is the world's leading Ganoderma producer. Our unique "One Dragon" concept ensures every step - from cultivation to distribution - is controlled for peak potency and purity.
              </p>
              <ul className="space-y-4">
                {[
                  '100% Organic Farming Practices',
                  'GMP & ISO Certified Facilities',
                  'Advanced Low-Temperature Processing',
                  'Global Wellness Community in 180+ Countries'
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <i className="fa-solid fa-circle-check text-emerald-400"></i>
                    <span className="text-emerald-50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img src="https://picsum.photos/seed/mushroom/600/400" className="rounded-2xl shadow-2xl" alt="Ganoderma" />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <p className="text-emerald-900 font-bold text-2xl">25+ Years</p>
                <p className="text-gray-600">Of Global Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Essentials</h2>
            <p className="text-gray-600">Our most-loved wellness products</p>
          </div>
          <button onClick={() => setView('shop')} className="text-emerald-700 font-bold hover:underline">
            View All Shop <i className="fa-solid fa-arrow-right ml-1"></i>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 4).map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
              onViewDetails={navigateToProduct}
            />
          ))}
        </div>
      </section>
    </div>
  );

  const renderShop = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">Product Collection</h1>
          <p className="text-gray-600 mt-2">Health solutions tailored for you.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === cat 
                  ? 'bg-emerald-700 text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-500 hover:text-emerald-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart} 
            onViewDetails={navigateToProduct}
          />
        ))}
      </div>
    </div>
  );

  const renderCart = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12">Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <i className="fa-solid fa-cart-arrow-down text-6xl text-gray-200 mb-4"></i>
          <p className="text-gray-500 text-xl mb-8">Your cart is feeling a bit light...</p>
          <button 
            onClick={() => setView('shop')}
            className="bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-800 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                  <p className="text-emerald-600 font-semibold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    <i className="fa-solid fa-minus text-xs"></i>
                  </button>
                  <span className="font-bold text-lg w-6 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    <i className="fa-solid fa-plus text-xs"></i>
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-emerald-600 font-medium">Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-xl">
                <span>Total</span>
                <span className="text-emerald-900">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => alert("Checkout process simulated! Thank you for your order.")}
              className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-800 transition-all shadow-lg hover:shadow-emerald-200"
            >
              Secure Checkout
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 uppercase tracking-widest">
              <i className="fa-solid fa-shield-halved"></i>
              Encrypted Checkout
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderProductDetail = () => {
    if (!selectedProduct) return null;
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={() => setView('shop')}
          className="flex items-center text-gray-600 hover:text-emerald-700 font-semibold mb-8"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Back to Shop
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-50">
          <div className="rounded-3xl overflow-hidden shadow-inner">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="space-y-8">
            <div>
              <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {selectedProduct.category}
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900 mt-4 leading-tight">{selectedProduct.name}</h1>
              <p className="text-3xl font-bold text-emerald-700 mt-4">${selectedProduct.price.toFixed(2)}</p>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              {selectedProduct.description}
            </p>
            
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-xl uppercase tracking-wider">Key Benefits</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedProduct.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center space-x-3 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-check text-emerald-700"></i>
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex gap-4 pt-8 border-t border-gray-100">
              <button 
                onClick={() => addToCart(selectedProduct)}
                className="flex-1 bg-emerald-700 text-white py-5 rounded-2xl font-bold text-xl hover:bg-emerald-800 transition-all shadow-lg hover:shadow-emerald-200 transform active:scale-95"
              >
                Add to Cart
              </button>
              <button className="p-5 border-2 border-gray-200 rounded-2xl text-gray-400 hover:text-red-500 hover:border-red-500 transition-all">
                <i className="fa-solid fa-heart text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAbout = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 italic">Health, Wealth, and Happiness</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Founded in 1993, DXN is committed to providing everyone with high-quality health products while creating a sustainable business opportunity. Our philosophy centers on Low Price, High Quality, and Low Profile, High Income.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { icon: 'fa-microscope', title: 'R&D Focused', desc: 'Continuous innovation in Ganoderma research and cultivation techniques.' },
          { icon: 'fa-globe', title: 'Global Footprint', desc: 'Proudly serving millions of members across 180 countries.' },
          { icon: 'fa-heart-pulse', title: 'Community Wellness', desc: 'Promoting a holistic approach to preventive healthcare through natural nutrition.' }
        ].map((feat, i) => (
          <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <i className={`fa-solid ${feat.icon} text-2xl`}></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">{feat.title}</h3>
            <p className="text-gray-600">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView={view} setView={setView} cartCount={cartCount} />
      
      <main className="flex-grow">
        {view === 'home' && renderHome()}
        {view === 'shop' && renderShop()}
        {view === 'cart' && renderCart()}
        {view === 'product-detail' && renderProductDetail()}
        {view === 'about' && renderAbout()}
      </main>

      <footer className="bg-gray-950 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">MAM</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">MAM <span className="text-red-500">Global</span></h2>
            </div>
            <p className="text-sm mb-6 leading-relaxed">
              Global leaders in Ganoderma cultivation and wellness products. Enhancing health and opportunity for all since 1993.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-emerald-500"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="hover:text-emerald-500"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="hover:text-emerald-500"><i className="fa-brands fa-youtube"></i></a>
              <a href="#" className="hover:text-emerald-500"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => setView('shop')} className="hover:text-emerald-500">All Products</button></li>
              <li><button onClick={() => setView('shop')} className="hover:text-emerald-500">Supplements</button></li>
              <li><button onClick={() => setView('shop')} className="hover:text-emerald-500">Beverages</button></li>
              <li><button onClick={() => setView('shop')} className="hover:text-emerald-500">Personal Care</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-emerald-500">Contact Us</a></li>
              <li><a href="#" className="hover:text-emerald-500">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-emerald-500">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-emerald-500">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Newsletter</h3>
            <p className="text-xs mb-4">Stay updated on wellness tips and new products.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your Email" className="bg-gray-900 border-none rounded-lg px-4 py-2 text-sm flex-1 outline-none focus:ring-1 focus:ring-emerald-500" />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-900 text-center text-xs">
          © {new Date().getFullYear()} MAM Global Wellness Hub. All rights reserved.
        </div>
      </footer>

      <WellnessAI />
    </div>
  );
};

export default App;
