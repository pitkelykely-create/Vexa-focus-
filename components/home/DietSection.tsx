import React from 'react';
import NeonCard from '../ui/NeonCard';
import GlowButton from '../ui/GlowButton';
import { createPageUrl } from '../../utils';
import { Utensils, Leaf, Clock, Sparkles } from 'lucide-react';

export default function DietSection() {
  const meals = [
    { time: '07:00', name: 'Café da Manhã', items: 'Ovos mexidos com abacate e torrada integral', cal: 420 },
    { time: '10:00', name: 'Lanche', items: 'Iogurte grego com frutas vermelhas', cal: 180 },
    { time: '13:00', name: 'Almoço', items: 'Frango grelhado, arroz integral e salada', cal: 650 },
    { time: '16:00', name: 'Lanche', items: 'Mix de castanhas e banana', cal: 220 },
    { time: '20:00', name: 'Jantar', items: 'Salmão com legumes assados', cal: 480 },
  ];

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <NeonCard glow className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Dieta de Hoje</h3>
                <div className="flex items-center gap-2 text-[#00ff88]">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Gerada por IA</span>
                </div>
              </div>

              <div className="space-y-3">
                {meals.map((meal, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#00ff88]/20 transition-colors">
                    <div className="text-center">
                      <Clock className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                      <span className="text-xs text-gray-500">{meal.time}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{meal.name}</p>
                      <p className="text-gray-400 text-xs">{meal.items}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[#00ff88] font-semibold">{meal.cal}</span>
                      <span className="text-gray-500 text-xs"> kcal</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-gray-400">Total do Dia</span>
                <span className="text-xl font-bold text-[#00ff88]">1,950 kcal</span>
              </div>
            </NeonCard>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 mb-6">
              <Utensils className="w-4 h-4 text-[#00ff88]" />
              <span className="text-[#00ff88] text-sm font-medium">Nutrição IA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Dieta Inteligente
              <span className="text-[#00ff88]"> Automática</span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Dietas ajustadas ao seu dia real. A IA considera sua rotina, 
              preferências e objetivos para criar refeições perfeitas para você.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Leaf, text: 'Respeita suas restrições alimentares' },
                { icon: Sparkles, text: 'Variedade para não enjoar' },
                { icon: Clock, text: 'Ajustes baseados no seu horário' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00ff88]/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#00ff88]" />
                  </div>
                  <span className="text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>

            <GlowButton to={createPageUrl('Dieta')}>
              Ver Modelo de Dieta
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}