
import React from 'react';

const FooterQuote: React.FC = () => {
  return (
    <div className="text-center mt-8 md:mt-12 animate-fade-in delay-700">
      <div className="glass-panel rounded-2xl p-4 md:p-6 max-w-4xl mx-auto">
        <div className="flex justify-center items-center space-x-4 mb-2">
          <span className="text-xl md:text-2xl animate-bounce text-yellow-500">⚔️</span>
          <div className="text-yellow-300 text-lg md:text-xl font-bold animate-glow-pulse text-enhanced">
            "THE SEA IS CALLING... SET SAIL TOWARDS YOUR DREAMS!"
          </div>
          <span className="text-xl md:text-2xl animate-bounce delay-300 text-yellow-500">🏴‍☠️</span>
        </div>
        <div className="text-yellow-100 text-base md:text-lg mt-2 animate-pulse text-enhanced">
          - CAPTAIN JACK SPARROW
        </div>
        <div className="text-yellow-200 text-sm md:text-base mt-3 animate-fade-in delay-1000 text-enhanced px-4">
          <span className="animate-wiggle inline-block text-yellow-500">🌊</span>
          Navigate the treacherous waters of productivity with Captain Rakesh's legendary fleet management system!
          <span className="animate-wiggle inline-block text-yellow-500">🌊</span>
        </div>
      </div>
    </div>
  );
};

export default FooterQuote;
