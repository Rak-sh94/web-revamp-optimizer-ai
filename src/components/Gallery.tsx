
import React from 'react';

const Gallery = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="relative h-96 bg-gray-900 rounded-lg overflow-hidden mb-20">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-3xl font-light mb-2">SKY WALK</h3>
            <p className="text-xl">ISO POND</p>
            <p className="text-lg">MIYAWAKI FOREST</p>
            <p className="text-lg text-emerald-300">SKI VILAS</p>
          </div>
          <div className="absolute bottom-8 right-8 text-white text-right">
            <p className="text-sm">INQUIRE: Call +91 98XXX XXXXX | Visit</p>
            <p className="text-sm">SALES OFFICE: 10 AM to 8 PM, All 7 Days</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
