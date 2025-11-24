import React from 'react';
import NeonCard from '../ui/NeonCard';
import { UserPlus, MessageSquare, Sparkles, RefreshCw } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      step: '01',
      title: 'Crie sua conta',
      description: 'Cadastre-se em segundos e configure seu perfil com seus objetivos e preferências.'
    },
    {
      icon: MessageSquare,
      step: '02',
      title: 'Converse com a IA',
      description: 'Conte sobre sua rotina, restrições alimentares e metas para a VEXA.'
    },
    {
      icon: Sparkles,
      step: '03',
      title: 'Receba dieta + treino',
      description: 'A IA gera instantaneamente um plano personalizado e completo para você.'
    },
    {
      icon: RefreshCw,
      step: '04',
      title: 'Ajustes automáticos',
      description: 'Todo dia a IA ajusta seu plano baseado no seu progresso e rotina real.'
    }
  ];

  return (
    <section id="como-funciona" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Como <span className="text-[#00ff88]">Funciona</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Em apenas 4 passos simples, você terá um plano de saúde completo 
            e personalizado que evolui com você.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <NeonCard key={i} className="p-6 text-center relative overflow-hidden group">
              <div className="absolute top-4 right-4 text-6xl font-bold text-[#00ff88]/10 group-hover:text-[#00ff88]/20 transition-colors">
                {item.step}
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#00ff88]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00ff88]/20 transition-colors">
                  <item.icon className="w-8 h-8 text-[#00ff88]" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#00ff88]/50 to-transparent" />
              )}
            </NeonCard>
          ))}
        </div>
      </div>
    </section>
  );
}