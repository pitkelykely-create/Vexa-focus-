import React from 'react';
import NeonCard from '../ui/NeonCard';
import GlowButton from '../ui/GlowButton';
import { createPageUrl } from '../../utils';
import { Activity, Flame, TrendingUp, Zap, Heart, Scale } from 'lucide-react';

export default function HolographicSection() {
  const metrics = [
    { icon: Flame, label: 'Calorias', value: '1,847', unit: 'kcal', color: 'text-orange-400' },
    { icon: TrendingUp, label: 'Progresso', value: '+2.3', unit: 'kg', color: 'text-[#00ff88]' },
    { icon: Heart, label: 'Frequência', value: '72', unit: 'bpm', color: 'text-red-400' },
    { icon: Zap, label: 'Energia', value: '85', unit: '%', color: 'text-yellow-400' },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-transparent via-[#00ff88]/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 mb-6">
            <Activity className="w-4 h-4 text-[#00ff88]" />
            <span className="text-[#00ff88] text-sm font-medium">Painel Futurista</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Corpo <span className="text-[#00ff88]">Holográfico</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Visualize calorias, progresso, peso, metabolismo e ajustes em tempo real 
            em um painel futurista interativo.
          </p>
        </div>

        <div className="relative">
          <NeonCard glow className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Stats */}
              <div className="space-y-6">
                {metrics.slice(0, 2).map((metric, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <metric.icon className={`w-5 h-5 ${metric.color}`} />
                      <span className="text-gray-400 text-sm">{metric.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-bold ${metric.color}`}>{metric.value}</span>
                      <span className="text-gray-500 text-sm">{metric.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Center Body Visualization */}
              <div className="relative flex items-center justify-center">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-[#00ff88]/20 blur-3xl rounded-full animate-pulse" />
                  
                  {/* Body silhouette */}
                  <div className="relative w-48 h-64 mx-auto">
                    <svg viewBox="0 0 100 150" className="w-full h-full">
                      <defs>
                        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#00ff88" stopOpacity="0.2" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Head */}
                      <ellipse cx="50" cy="15" rx="12" ry="14" fill="url(#bodyGradient)" filter="url(#glow)" />
                      
                      {/* Neck */}
                      <rect x="45" y="28" width="10" height="8" fill="url(#bodyGradient)" filter="url(#glow)" />
                      
                      {/* Torso */}
                      <path d="M30 36 L70 36 L68 85 L32 85 Z" fill="url(#bodyGradient)" filter="url(#glow)" />
                      
                      {/* Arms */}
                      <path d="M30 38 L20 70 L15 68 L22 40 Z" fill="url(#bodyGradient)" filter="url(#glow)" />
                      <path d="M70 38 L80 70 L85 68 L78 40 Z" fill="url(#bodyGradient)" filter="url(#glow)" />
                      
                      {/* Legs */}
                      <path d="M35 85 L30 140 L40 140 L42 85 Z" fill="url(#bodyGradient)" filter="url(#glow)" />
                      <path d="M65 85 L70 140 L60 140 L58 85 Z" fill="url(#bodyGradient)" filter="url(#glow)" />
                    </svg>

                    {/* Pulse rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#00ff88]/30 rounded-full animate-ping" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-[#00ff88]/20 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Right Stats */}
              <div className="space-y-6">
                {metrics.slice(2).map((metric, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <metric.icon className={`w-5 h-5 ${metric.color}`} />
                      <span className="text-gray-400 text-sm">{metric.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-bold ${metric.color}`}>{metric.value}</span>
                      <span className="text-gray-500 text-sm">{metric.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Stats Bar */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <Scale className="w-5 h-5 text-[#00ff88] mx-auto mb-1" />
                  <p className="text-2xl font-bold text-white">78.5 kg</p>
                  <p className="text-xs text-gray-500">Peso Atual</p>
                </div>
                <div className="text-center">
                  <Activity className="w-5 h-5 text-[#00ff88] mx-auto mb-1" />
                  <p className="text-2xl font-bold text-white">2,100</p>
                  <p className="text-xs text-gray-500">TMB (kcal)</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-5 h-5 text-[#00ff88] mx-auto mb-1" />
                  <p className="text-2xl font-bold text-white">-3.2 kg</p>
                  <p className="text-xs text-gray-500">Este Mês</p>
                </div>
              </div>
            </div>
          </NeonCard>

          <div className="text-center mt-8">
            <GlowButton to={createPageUrl('Holografico')}>
              Ver Demonstração
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}