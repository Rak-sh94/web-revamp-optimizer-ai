
import React from 'react';
import { Wind, TreePine, Home } from 'lucide-react';

const PropertyFeatures = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-amber-400 rounded-full opacity-70"></div>
            <div className="absolute top-5 right-5 w-8 h-8 bg-emerald-500 transform rotate-45"></div>
            <Wind className="w-16 h-16 text-emerald-600 mb-6" />
            <h2 className="text-4xl font-light text-gray-800 mb-6">
              BETTER AIR<br />QUALITY
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Experience pristine air quality enhanced by our extensive green spaces 
              and advanced air filtration systems throughout the development.
            </p>
          </div>
          
          <div className="relative">
            <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg relative overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-60"></div>
              <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-400 rounded-full opacity-40"></div>
              <div className="absolute bottom-10 left-10 text-2xl font-bold text-gray-800">
                80% OPEN<br />SPACE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyFeatures;
