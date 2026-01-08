
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, cartCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
            <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h1 className="text-2xl font-bold text-emerald-900 tracking-tight">MAM <span className="text-red-600">Global</span></h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => setView('home')}
              className={`${currentView === 'home' ? 'text-emerald-700 font-semibold' : 'text-gray-600 hover:text-emerald-700'} transition-colors duration-200`}
            >
              Home
            </button>
            <button 
              onClick={() => setView('shop')}
              className={`${currentView === 'shop' ? 'text-emerald-700 font-semibold' : 'text-gray-600 hover:text-emerald-700'} transition-colors duration-200`}
            >
              Shop
            </button>
            <button 
              onClick={() => setView('about')}
              className={`${currentView === 'about' ? 'text-emerald-700 font-semibold' : 'text-gray-600 hover:text-emerald-700'} transition-colors duration-200`}
            >
              About Us
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setView('cart')}
              className="relative p-2 text-gray-600 hover:text-emerald-700 transition-colors"
            >
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-800 transition-colors hidden sm:block">
              Become a Distributor
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
