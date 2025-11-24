import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import NeonCard from './components/ui/NeonCard';
import GlowButton from './components/ui/GlowButton';
import Navbar from './components/home/Navbar';
import FooterSection from './components/home/FooterSection';
import { 
  ArrowLeft, UserPlus, MessageSquare, Sparkles, RefreshCw,
  Bot, Utensils, Dumbbell, Activity, Check, Zap, Brain, Target
} from 'lucide-react';
import { base44 } from './api/base44Client';

export default function ComoFunciona() {
  const steps = [
    {
      number: '01',
      icon: UserPlus,
      title: 'Crie sua conta',
      description: 'Em poucos segundos, crie sua conta gratuita e configure seu perfil completo com seus objetivos de saúde, peso atual, meta desejada e preferências alimentares.',
      details: [
        'Cadastro rápido e seguro',
        'Defina seus objetivos (perder peso, ganhar massa, etc)',
        'Informe suas restrições alimentares',
        'Configure sua rotina e disponibilidade'
      ]
    },
    {
      number: '02',
      icon: MessageSquare,
      title: 'Converse com a IA',
      description: 'A VEXA vai conhecer você através de uma conversa natural. Conte sobre sua rotina, preferências, histórico e qualquer detalhe importante para sua jornada.',
      details: [
        'Chat natural e intuitivo',
        'A IA aprende suas preferências',
        'Tire dúvidas sobre nutrição e treino',
        'Receba dicas personalizadas'
      ]
    },
    {
      number: '03',
      icon: Sparkles,
      title: 'Receba seu plano',
      description: 'Instantaneamente, a IA gera um plano completo de dieta e treino totalmente personalizado para você, considerando todos os fatores que você informou.',
      details: [
        'Dieta com todas as refeições do dia',
        'Treino adaptado ao seu nível',
        'Metas claras e alcançáveis',
        'Plano flexível e adaptável'
      ]
    },
    {
      number: '04',
      icon: RefreshCw,
      title: 'Ajustes automáticos',
      description: 'Todo dia a IA analisa seu progresso, rotina e feedback para ajustar automaticamente seu plano. Dormiu mal? Teve um dia corrido? A VEXA adapta tudo.',
      details: [
        'Ajustes baseados no seu dia real',
        'Progressão automática de cargas',
        'Variação de refeições',
        'Adaptação à sua energia diária'
      ]
    }
  ];

  const features = [
    { icon: Bot, title: 'Chat IA 24/7', description: 'Assistente sempre disponível para suas dúvidas' },
    { icon: Utensils, title: 'Dieta Inteligente', description: 'Refeições que respeitam suas preferências' },
    { icon: Dumbbell, title: 'Treino Adaptativo', description: 'Exercícios que evoluem com você' },
    { icon: Activity, title: 'Monitoramento', description: 'Acompanhe seu progresso em tempo real' },
    { icon: Brain, title: 'IA Avançada', description: 'Tecnologia de ponta para resultados reais' },
    { icon: Target, title: 'Metas Claras', description: 'Objetivos definidos e alcançáveis' },
  ];

  return (
    <div className="min-h-screen bg-[#050805]">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#00ff88]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 mb-8">
            <Sparkles className="w-4 h-4 text-[#00ff88]" />
            <span className="text-[#00ff88] text-sm font-medium">Como Funciona</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Sua transformação em
            <span className="text-[#00ff88]"> 4 passos simples</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A VEXA utiliza inteligência artificial avançada para criar e ajustar 
            automaticamente seu plano de saúde, tornando sua jornada mais fácil e eficiente.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-8 items-center">
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-6xl font-bold text-[#00ff88]/20">{step.number}</span>
                    <div className="w-14 h-14 rounded-2xl bg-[#00ff88]/10 flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-[#00ff88]" />
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{step.title}</h2>
                  <p className="text-gray-400 text-lg mb-6">{step.description}</p>
                </div>

                <NeonCard className={`p-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <ul className="space-y-4">
                    {step.details.map((detail, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-[#00ff88]" />
                        </div>
                        <span className="text-gray-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </NeonCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-transparent via-[#00ff88]/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Recursos <span className="text-[#00ff88]">Inclusos</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Tudo que você precisa para transformar sua saúde
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <NeonCard key={i} className="p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#00ff88]/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-[#00ff88]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <NeonCard glow className="p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-transparent" />
            
            <div className="relative z-10">
              <Zap className="w-12 h-12 text-[#00ff88] mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Pronto para começar?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Junte-se a milhares de pessoas que já estão transformando sua saúde com a VEXA.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlowButton 
                  onClick={() => {
                    base44.auth.redirectToLogin(createPageUrl('Dashboard'));
                  }} 
                  size="lg"
                >
                  Criar Minha Conta Grátis
                </GlowButton>
                <GlowButton to={createPageUrl('Assinatura')} variant="secondary" size="lg">
                  Ver Planos
                </GlowButton>
              </div>
            </div>
          </NeonCard>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}