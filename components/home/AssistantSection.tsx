import React from 'react';
import NeonCard from '../ui/NeonCard';
import GlowButton from '../ui/GlowButton';
import { createPageUrl } from '../../utils';
import { Bot, Sparkles, MessageSquare, Brain } from 'lucide-react';

export default function AssistantSection() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 mb-6">
              <Bot className="w-4 h-4 text-[#00ff88]" />
              <span className="text-[#00ff88] text-sm font-medium">Assistente IA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Assistente Inteligente
              <span className="text-[#00ff88]"> VEXA</span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Converse com nossa IA sobre dieta, treino, rotina e motivação. 
              Receba orientações personalizadas 24/7, como ter um personal trainer 
              e nutricionista sempre disponíveis.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: MessageSquare, text: 'Respostas instantâneas sobre nutrição' },
                { icon: Brain, text: 'Aprende com seus hábitos e preferências' },
                { icon: Sparkles, text: 'Ajustes automáticos baseados no seu dia' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00ff88]/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#00ff88]" />
                  </div>
                  <span className="text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>

            <GlowButton to={createPageUrl('Chat')}>
              Abrir Chat
            </GlowButton>
          </div>

          <div className="relative">
            <NeonCard glow className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-[#00ff88]" />
                  </div>
                  <div className="bg-[#00ff88]/5 rounded-2xl rounded-tl-none p-4 border border-[#00ff88]/10">
                    <p className="text-gray-300 text-sm">
                      Olá! Sou a VEXA, sua assistente de saúde. Como posso ajudar você hoje?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-[#00ff88]/10 rounded-2xl rounded-tr-none p-4 border border-[#00ff88]/20">
                    <p className="text-white text-sm">
                      Preciso de uma dieta para perder peso
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-white">V</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-[#00ff88]" />
                  </div>
                  <div className="bg-[#00ff88]/5 rounded-2xl rounded-tl-none p-4 border border-[#00ff88]/10">
                    <p className="text-gray-300 text-sm">
                      Perfeito! Vou criar um plano personalizado. Qual é sua rotina diária e quais alimentos você prefere?
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <div className="flex-1 h-10 rounded-full bg-white/5 border border-white/10 flex items-center px-4">
                    <span className="text-gray-500 text-sm">Digite sua mensagem...</span>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-[#00ff88] flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-black" />
                  </button>
                </div>
              </div>
            </NeonCard>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#00ff88]/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#00ff88]/5 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}