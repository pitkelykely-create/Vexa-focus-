import React from 'react';
import NeonCard from '../ui/NeonCard';
import GlowButton from '../ui/GlowButton';
import { createPageUrl } from '../../utils';
import { Dumbbell, Timer, Zap, Target, Play } from 'lucide-react';

export default function WorkoutSection() {
  const exercises = [
    { name: 'Supino Reto', sets: '4x12', rest: '60s', completed: true },
    { name: 'Crucifixo Inclinado', sets: '3x15', rest: '45s', completed: true },
    { name: 'Desenvolvimento', sets: '4x10', rest: '60s', completed: false },
    { name: 'Elevação Lateral', sets: '3x12', rest: '45s', completed: false },
    { name: 'Tríceps Corda', sets: '3x15', rest: '45s', completed: false },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-[#00ff88]/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 mb-6">
              <Dumbbell className="w-4 h-4 text-[#00ff88]" />
              <span className="text-[#00ff88] text-sm font-medium">Treino IA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Treino
              <span className="text-[#00ff88]"> Dinâmico</span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Treinos que se adaptam ao seu tempo, energia e rotina. 
              A IA ajusta exercícios, séries e intensidade conforme seu dia.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Timer, text: 'Adapta ao tempo disponível' },
                { icon: Zap, text: 'Intensidade baseada na sua energia' },
                { icon: Target, text: 'Progressão automática de cargas' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00ff88]/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#00ff88]" />
                  </div>
                  <span className="text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>

            <GlowButton to={createPageUrl('Treino')}>
              Ver Treino
            </GlowButton>
          </div>

          <div>
            <NeonCard glow className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Treino A - Peito/Ombro/Tríceps</h3>
                  <p className="text-sm text-gray-500">45-60 minutos • Intermediário</p>
                </div>
                <button className="w-12 h-12 rounded-full bg-[#00ff88] flex items-center justify-center hover:scale-105 transition-transform">
                  <Play className="w-5 h-5 text-black ml-0.5" />
                </button>
              </div>

              <div className="space-y-3">
                {exercises.map((exercise, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center gap-4 p-3 rounded-xl border transition-colors ${
                      exercise.completed 
                        ? 'bg-[#00ff88]/10 border-[#00ff88]/30' 
                        : 'bg-white/5 border-white/5 hover:border-[#00ff88]/20'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      exercise.completed ? 'bg-[#00ff88]' : 'bg-white/10'
                    }`}>
                      {exercise.completed ? (
                        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm text-gray-400">{i + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${exercise.completed ? 'text-[#00ff88]' : 'text-white'}`}>
                        {exercise.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm font-medium">{exercise.sets}</p>
                      <p className="text-gray-500 text-xs">Rest: {exercise.rest}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Progresso</span>
                  <span className="text-[#00ff88] text-sm font-medium">2/5 exercícios</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-gradient-to-r from-[#00ff88] to-[#00ff88]/60 rounded-full" />
                </div>
              </div>
            </NeonCard>
          </div>
        </div>
      </div>
    </section>
  );
}