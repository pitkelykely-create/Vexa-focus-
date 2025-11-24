import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import NeonCard from './components/ui/NeonCard';
import GlowButton from './components/ui/GlowButton';
import { 
  ArrowLeft, Activity, Flame, TrendingUp, Heart, Zap, 
  Scale, Droplets, Moon, Target, ChevronUp, ChevronDown
} from 'lucide-react';

export default function Holografico() {
  const [animatedValues, setAnimatedValues] = useState({
    weight: 0,
    calories: 0,
    heartRate: 0,
    energy: 0
  });

  const targetValues = {
    weight: 78.5,
    calories: 1847,
    heartRate: 72,
    energy: 85
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setAnimatedValues({
        weight: targetValues.weight * progress,
        calories: Math.round(targetValues.calories * progress),
        heartRate: Math.round(targetValues.heartRate * progress),
        energy: Math.round(targetValues.energy * progress)
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const metrics = [
    { 
      icon: Scale, 
      label: 'Peso Atual', 
      value: animatedValues.weight.toFixed(1), 
      unit: 'kg',
      change: '-0.5',
      positive: true,
      color: 'text-[#00ff88]'
    },
    { 
      icon: Flame, 
      label: 'Calorias Hoje', 
      value: animatedValues.calories, 
      unit: 'kcal',
      change: '+245',
      positive: true,
      color: 'text-orange-400'
    },
    { 
      icon: Heart, 
      label: 'Freq. Cardíaca', 
      value: animatedValues.heartRate, 
      unit: 'bpm',
      change: 'Normal',
      positive: true,
      color: 'text-red-400'
    },
    { 
      icon: Zap, 
      label: 'Nível de Energia', 
      value: animatedValues.energy, 
      unit: '%',
      change: '+10',
      positive: true,
      color: 'text-yellow-400'
    },
  ];

  const bodyMetrics = [
    { label: 'IMC', value: '24.2', status: 'Normal', color: 'text-green-400' },
    { label: 'Taxa Metab.', value: '2,100', unit: 'kcal', status: 'Ativo', color: 'text-[#00ff88]' },
    { label: 'Gordura Corp.', value: '18%', status: '-2%', color: 'text-blue-400' },
    { label: 'Massa Magra', value: '64.4', unit: 'kg', status: '+1.2kg', color: 'text-purple-400' },
  ];

  const weeklyProgress = [
    { day: 'Seg', value: 79.2 },
    { day: 'Ter', value: 79.0 },
    { day: 'Qua', value: 78.8 },
    { day: 'Qui', value: 78.9 },
    { day: 'Sex', value: 78.5 },
    { day: 'Sáb', value: 78.5 },
    { day: 'Dom', value: 78.5 },
  ];

  const maxWeight = Math.max(...weeklyProgress.map(d => d.value));
  const minWeight = Math.min(...weeklyProgress.map(d => d.value));
  const range = maxWeight - minWeight || 1;

  return (
    <div className="min-h-screen bg-[#050805] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to={createPageUrl('Dashboard')} 
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Corpo Holográfico</h1>
            <p className="text-gray-400 text-sm">Visualização em tempo real</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Stats */}
          <div className="space-y-4">
            {metrics.slice(0, 2).map((metric, i) => (
              <NeonCard key={i} className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <metric.icon className={`w-5 h-5 ${metric.color}`} />
                      <span className="text-gray-400 text-sm">{metric.label}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl font-bold ${metric.color}`}>{metric.value}</span>
                      <span className="text-gray-500">{metric.unit}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${metric.positive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {metric.positive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    <span className="text-sm">{metric.change}</span>
                  </div>
                </div>
              </NeonCard>
            ))}
          </div>

          {/* Center Body */}
          <NeonCard glow className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00ff88]/10 via-transparent to-transparent" />
            
            <div className="relative h-80 flex items-center justify-center">
              {/* Glow effects */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-[#00ff88]/10 blur-3xl animate-pulse" />
              </div>

              {/* Body SVG */}
              <svg viewBox="0 0 100 150" className="w-40 h-60 relative z-10">
                <defs>
                  <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00ff88" stopOpacity="1" />
                    <stop offset="100%" stopColor="#00ff88" stopOpacity="0.3" />
                  </linearGradient>
                  <filter id="glow2">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Head */}
                <ellipse cx="50" cy="15" rx="12" ry="14" fill="url(#bodyGrad)" filter="url(#glow2)" />
                
                {/* Neck */}
                <rect x="45" y="28" width="10" height="8" fill="url(#bodyGrad)" filter="url(#glow2)" />
                
                {/* Torso */}
                <path d="M30 36 L70 36 L68 85 L32 85 Z" fill="url(#bodyGrad)" filter="url(#glow2)" />
                
                {/* Arms */}
                <path d="M30 38 L20 70 L15 68 L22 40 Z" fill="url(#bodyGrad)" filter="url(#glow2)" />
                <path d="M70 38 L80 70 L85 68 L78 40 Z" fill="url(#bodyGrad)" filter="url(#glow2)" />
                
                {/* Legs */}
                <path d="M35 85 L30 140 L40 140 L42 85 Z" fill="url(#bodyGrad)" filter="url(#glow2)" />
                <path d="M65 85 L70 140 L60 140 L58 85 Z" fill="url(#bodyGrad)" filter="url(#glow2)" />
              </svg>

              {/* Pulse rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 border border-[#00ff88]/30 rounded-full animate-ping" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-48 h-48 border border-[#00ff88]/20 rounded-full animate-pulse" />
              </div>

              {/* Floating metrics */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-[#00ff88]/30">
                <p className="text-[#00ff88] text-xs font-medium">IMC: 24.2</p>
              </div>
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-red-400/30">
                <p className="text-red-400 text-xs font-medium">72 bpm</p>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-yellow-400/30">
                <p className="text-yellow-400 text-xs font-medium">85% energia</p>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-blue-400/30">
                <p className="text-blue-400 text-xs font-medium">18% gordura</p>
              </div>
            </div>
          </NeonCard>

          {/* Right Stats */}
          <div className="space-y-4">
            {metrics.slice(2).map((metric, i) => (
              <NeonCard key={i} className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <metric.icon className={`w-5 h-5 ${metric.color}`} />
                      <span className="text-gray-400 text-sm">{metric.label}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl font-bold ${metric.color}`}>{metric.value}</span>
                      <span className="text-gray-500">{metric.unit}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${metric.positive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {metric.positive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    <span className="text-sm">{metric.change}</span>
                  </div>
                </div>
              </NeonCard>
            ))}
          </div>
        </div>

        {/* Body Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {bodyMetrics.map((metric, i) => (
            <NeonCard key={i} className="p-5 text-center">
              <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
              <p className={`text-3xl font-bold ${metric.color}`}>
                {metric.value}
                {metric.unit && <span className="text-gray-500 text-lg ml-1">{metric.unit}</span>}
              </p>
              <p className="text-gray-500 text-sm mt-1">{metric.status}</p>
            </NeonCard>
          ))}
        </div>

        {/* Weekly Progress */}
        <NeonCard className="p-6 mt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-[#00ff88]" />
              <h3 className="text-lg font-semibold text-white">Evolução Semanal do Peso</h3>
            </div>
            <span className="text-[#00ff88] text-sm">-0.7kg esta semana</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-2">
            {weeklyProgress.map((day, i) => {
              const height = ((day.value - minWeight) / range) * 80 + 20;
              const isToday = i === 4;
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-500">{day.value}kg</span>
                  <div 
                    className={`w-full rounded-t-lg transition-all ${isToday ? 'bg-[#00ff88]' : 'bg-[#00ff88]/30'}`}
                    style={{ height: `${height}%` }}
                  />
                  <span className={`text-xs ${isToday ? 'text-[#00ff88] font-medium' : 'text-gray-500'}`}>
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
        </NeonCard>

        {/* Additional Info */}
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <NeonCard className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Hidratação</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-blue-400">1.5</span>
              <span className="text-gray-500">/ 3L</span>
            </div>
            <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-blue-400 rounded-full" />
            </div>
          </NeonCard>

          <NeonCard className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Moon className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Sono</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-purple-400">7.5h</span>
              <span className="text-gray-500">média</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">Qualidade: Boa</p>
          </NeonCard>

          <NeonCard className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-[#00ff88]" />
              <span className="text-white font-medium">Meta</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#00ff88]">75kg</span>
              <span className="text-gray-500">objetivo</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">Faltam 3.5kg</p>
          </NeonCard>
        </div>
      </div>
    </div>
  );
}