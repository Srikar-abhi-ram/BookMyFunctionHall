import React from 'react';
import { TopBar } from '@/components/TopBar';
import { HeroSection } from '@/components/HeroSection';
import { TopRatedHalls } from '@/components/TopRatedHalls';
import { PopularCities } from '@/components/PopularCities';
import { ContactFooter } from '@/components/ContactFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <HeroSection />
      <TopRatedHalls />
      <PopularCities />
      <ContactFooter />
    </div>
  );
};

export default Index;
