
import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-emerald-900 to-emerald-800 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
            <path d="M50 10 L80 90 L20 90 Z" />
          </svg>
        </div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-600 rounded-full opacity-20"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-emerald-700 opacity-30 transform rotate-45"></div>
        <div className="absolute top-60 right-1/3 w-20 h-20 border-2 border-emerald-400 opacity-30 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold">GROVE ESTATES</div>
          <div className="hidden md:flex space-x-8 text-sm">
            <a href="#" className="hover:text-emerald-300 transition-colors">HOME</a>
            <a href="#" className="hover:text-emerald-300 transition-colors">ABOUT</a>
            <a href="#" className="hover:text-emerald-300 transition-colors">AMENITIES</a>
            <a href="#" className="hover:text-emerald-300 transition-colors">CONTACT</a>
          </div>
        </nav>

        {/* Main content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-8">
            IMAGINE A LIFE WOVEN<br />
            INTO THE LUSH TAPESTRY<br />
            OF NATURE'S WONDERS.
          </h1>
          
          <div className="grid md:grid-cols-2 gap-16 mt-20">
            <div className="text-left">
              <div className="text-6xl md:text-8xl font-bold mb-4">7.5</div>
              <div className="text-xl">ACRES</div>
              <p className="text-emerald-200 mt-4 text-sm">
                Sprawling landscapes designed to harmonize with the natural ecosystem, 
                providing residents with an unparalleled living experience.
              </p>
            </div>
            
            <div className="relative">
              <img 
                src="/lovable-uploads/4223e6a7-3c34-47e9-ac03-27df8f1a00f3.png" 
                alt="Modern residential towers" 
                className="w-full h-64 object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
