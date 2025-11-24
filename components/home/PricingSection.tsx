import React from 'react';
import NeonCard from '../ui/NeonCard';
import GlowButton from '../ui/GlowButton';
import { createPageUrl } from '../../utils';
import { Check, Sparkles, Bot, Utensils, Dumbbell, Activity, TrendingUp, Zap } from 'lucide-react';
import { base44 } from '../../api/base44Client';

export default function PricingSection() {
  const features = [
    { icon: Bot, text: 'Chat IA ilimitado' },
    { icon: Utensils, text: 'Dieta automática diária' },
    { icon: Dumbbell, text: 'Treino inteligente diário' },
    { icon: Activity, text: 'Corpo holográfico' },
    { icon: TrendingUp, text: 'Sistema de progresso' },
    { icon: Zap, text: 'Acesso total à plataforma' },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-[#00ff88]/5 to-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 mb-6">
            <Sparkles className="w-4 h-4 text-[#00ff88]" />
            <span className="text-[#00ff88] text-sm font-medium">Plano Único</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Tudo que você precisa em um
            <span className="text-[#00ff88]"> único plano</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sem complicações. Um plano completo com todos os recursos 
            para transformar sua saúde.
          </p>
        </div>

        <NeonCard glow className="p-8 relative overflow-hidden">
          {/* Badge */}
          <div className="absolute top-6 right-6">
            <div className="bg-[#00ff88] text-black text-xs font-bold px-3 py-1 rounded-full">
              MAIS POPULAR
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">VEXA Premium</h3>
              <p className="text-gray-400 mb-6">Acesso completo a todas as funcionalidades</p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-gray-500 text-lg line-through">R$59,90</span>
                <span className="text-5xl font-bold text-white">R$29,90</span>
                <span className="text-gray-400">/mês</span>
              </div>

              <GlowButton 
                onClick={() => {
                  base44.auth.redirectToLogin(createPageUrl('Assinatura'));
                }} 
                size="lg" 
                className="w-full"
              >
                Assinar Agora
              </GlowButton>

              <p className="text-center text-gray-500 text-sm mt-4">
                Cancele quando quiser • Sem fidelidade
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00ff88]/10 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-[#00ff88]" />
                  </div>
                  <span className="text-gray-300">{feature.text}</span>
                  <Check className="w-4 h-4 text-[#00ff88] ml-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Decorative */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#00ff88]/10 rounded-full blur-3xl" />
        </NeonCard>
      </div>
    </section>
  );
}