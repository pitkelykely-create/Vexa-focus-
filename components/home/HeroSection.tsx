import React from 'react';
import GlowButton from '../ui/GlowButton';
import VexaLogo from '../ui/VexaLogo';
import { createPageUrl } from '../../utils';
import { ChevronDown } from 'lucide-react';
import { base44 } from '../../api/base44Client';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
        >
          <source src="https://cdn.coverr.co/videos/coverr-running-on-a-treadmill-1573/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#050805]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00ff88]/5 via-transparent to-transparent" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-[1] opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 mb-8">
          <VexaLogo size="sm" />
          <span className="text-[#00ff88] text-sm font-medium">Plataforma de IA para Saúde</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          VEXA Hub
          <span className="block text-[#00ff88] mt-2">Sua Saúde, Automatizada</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          IA que ajusta seu treino, dieta e progresso automaticamente, conforme o seu dia real.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GlowButton 
            onClick={() => {
               base44.auth.redirectToLogin(createPageUrl('Dashboard'));
            }} 
            size="lg"
          >
            Criar Minha Conta
          </GlowButton>
          <GlowButton to={createPageUrl('ComoFunciona')} variant="secondary" size="lg">
            Como Funciona
          </GlowButton>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-[#00ff88]/60" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#00ff88]/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-[#00ff88]/5 blur-3xl animate-pulse delay-1000" />
    </section>
  );
}