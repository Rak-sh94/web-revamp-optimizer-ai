
import React from 'react';

const Footer = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center space-x-8 mb-8">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
          <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
        </div>

        <h2 className="text-4xl md:text-6xl font-light text-gray-800 mb-8 leading-tight">
          THIS IS A<br />
          SYMPHONY<br />
          OF THE OLD<br />
          AND NEW.
        </h2>

        <div className="flex justify-center space-x-6 mb-8">
          <div className="w-8 h-8 bg-purple-400 rounded-full opacity-70"></div>
          <div className="w-6 h-6 bg-pink-400 rounded-full opacity-60"></div>
          <div className="w-10 h-10 bg-purple-300 rounded-full opacity-50"></div>
        </div>

        <div className="text-gray-600 text-sm">
          <p>Experience luxury living in harmony with nature</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
