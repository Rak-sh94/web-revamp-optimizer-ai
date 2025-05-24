
import React from 'react';

const MainTitle: React.FC = () => {
  return (
    <div className="text-center mb-6 md:mb-8">
      <div className="relative inline-block">
        {/* Anchor decorations */}
        <div className="absolute -left-12 md:-left-16 top-1/2 transform -translate-y-1/2 text-3xl md:text-4xl text-yellow-400 animate-float">⚓</div>
        <div className="absolute -right-12 md:-right-16 top-1/2 transform -translate-y-1/2 text-3xl md:text-4xl text-yellow-400 animate-float delay-500">⚓</div>
        
        {/* Main Header Text */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-stroke-header animate-header-glow tracking-wider mb-4">
          CAPTAIN RAKESH'S FLEET
        </h1>
        
        {/* Subtitle Quote */}
        <div className="text-base md:text-lg lg:text-xl text-yellow-100 font-semibold italic mb-4 drop-shadow-lg text-enhanced px-4">
          "Experience is not the number of years we spent, it's the number of situations we faced."
        </div>
        
        {/* Decorative Icons */}
        <div className="flex justify-center space-x-6 md:space-x-8 text-xl md:text-2xl">
          <span className="text-yellow-500 animate-bounce">⚔️</span>
          <span className="text-yellow-400 animate-sparkle">✖️</span>
          <span className="text-yellow-500 animate-pulse">💎</span>
        </div>
      </div>
    </div>
  );
};

export default MainTitle;
