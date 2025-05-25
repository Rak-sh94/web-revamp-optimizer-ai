
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from "@/components/Hero";
import PropertyFeatures from "@/components/PropertyFeatures";
import AmenitiesGrid from "@/components/AmenitiesGrid";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Link to Anime Dashboard */}
      <div className="fixed top-4 right-4 z-50">
        <Link 
          to="/anime-dashboard"
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold"
        >
          🌸 Anime Dashboard
        </Link>
      </div>

      <Hero />
      <PropertyFeatures />
      <AmenitiesGrid />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Index;
