
import React from 'react';
import Hero from "@/components/Hero";
import PropertyFeatures from "@/components/PropertyFeatures";
import AmenitiesGrid from "@/components/AmenitiesGrid";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <PropertyFeatures />
      <AmenitiesGrid />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Index;
