
import React from 'react';

const BackgroundEffects: React.FC = () => {
  return (
    <>
      {/* Floating Mist/Fog Effects */}
      <div className="absolute top-20 left-1/4 w-64 h-32 bg-white rounded-full blur-3xl opacity-5 animate-wave-motion"></div>
      <div className="absolute top-40 right-1/3 w-48 h-24 bg-gray-300 rounded-full blur-3xl opacity-10 animate-wave-motion delay-1000"></div>
      <div className="absolute bottom-32 left-1/3 w-56 h-28 bg-white rounded-full blur-3xl opacity-5 animate-wave-motion delay-2000"></div>

      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 opacity-20 z-10">
        <div className="absolute top-20 left-10 text-6xl animate-wave-motion text-yellow-400">🌊</div>
        <div className="absolute top-40 right-20 text-4xl animate-sparkle text-yellow-300">⭐</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-treasure-bounce text-yellow-500">🏴‍☠️</div>
        <div className="absolute bottom-20 right-10 text-3xl animate-treasure-bounce delay-500 text-yellow-400">💎</div>
        <div className="absolute top-60 left-1/4 text-3xl animate-spin duration-[8s] text-yellow-500">⚓</div>
        <div className="absolute bottom-40 right-1/3 text-4xl animate-float text-yellow-400">🗺️</div>
        <div className="absolute top-80 right-1/4 text-2xl animate-sparkle delay-300 text-yellow-500">💰</div>
        <div className="absolute top-32 left-1/2 text-2xl animate-wiggle text-yellow-400">🦜</div>
        <div className="absolute top-16 right-1/3 text-3xl animate-bounce delay-700 text-yellow-500">⚔️</div>
        <div className="absolute bottom-16 left-1/3 text-2xl animate-pulse delay-1000 text-yellow-400">🍖</div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-10 left-1/3 w-4 h-4 bg-yellow-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-10 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-1/3 left-10 w-5 h-5 bg-yellow-600 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-700"></div>
        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-yellow-500 rounded-full animate-bounce delay-200"></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-yellow-400 rounded-full animate-pulse delay-800"></div>
      </div>
    </>
  );
};

export default BackgroundEffects;
