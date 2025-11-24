import React from 'react';
import Navbar from './components/home/Navbar';
import HeroSection from './components/home/HeroSection';
import AssistantSection from './components/home/AssistantSection';
import HolographicSection from './components/home/HolographicSection';
import DietSection from './components/home/DietSection';
import WorkoutSection from './components/home/WorkoutSection';
import HowItWorksSection from './components/home/HowItWorksSection';
import PricingSection from './components/home/PricingSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import FAQSection from './components/home/FAQSection';
import FooterSection from './components/home/FooterSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050805]">
      <Navbar />
      <HeroSection />
      <AssistantSection />
      <HolographicSection />
      <DietSection />
      <WorkoutSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
}