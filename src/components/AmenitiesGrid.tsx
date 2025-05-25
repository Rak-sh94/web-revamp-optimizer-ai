
import React from 'react';

const AmenitiesGrid = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-gray-800 mb-4">
            16+ MINDFULLY MADE AMENITIES
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* First row */}
          <div className="relative h-48 bg-emerald-600 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-4 left-4 text-white font-semibold">GROVE</div>
          </div>
          
          <div className="relative h-48 bg-amber-500 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-4 left-4 text-white font-semibold">KIDS<br />ZONE</div>
          </div>
          
          <div className="relative h-48 bg-blue-400 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-4 left-4 text-white font-semibold">LAKE<br />VIEW</div>
          </div>
          
          <div className="relative h-48 bg-green-600 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-4 left-4 text-white font-semibold">FOREST<br />RETREAT</div>
          </div>

          {/* Second row */}
          <div className="relative h-48 bg-teal-500 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-4 left-4 text-white font-semibold">LAKE<br />VIEW</div>
          </div>
          
          <div className="relative h-48 bg-green-700 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-4 left-4 text-white font-semibold">FOREST<br />RETREAT</div>
          </div>
          
          <div className="relative h-48 bg-emerald-500 rounded-lg overflow-hidden col-span-2">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-4 left-4 text-white font-semibold">GROVE</div>
          </div>

          {/* Third row */}
          <div className="relative h-48 bg-green-800 rounded-lg overflow-hidden col-span-2">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-4 left-4 text-white font-semibold">FOREST<br />RETREAT</div>
          </div>
          
          <div className="relative h-48 bg-emerald-600 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-4 left-4 text-white font-semibold">GROVE</div>
          </div>
          
          <div className="relative h-48 bg-stone-400 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-4 left-4 text-white font-semibold">VIEW</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesGrid;
