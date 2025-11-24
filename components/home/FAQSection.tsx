import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Como a VEXA personaliza minha dieta e treino?',
      answer: 'A VEXA utiliza inteligência artificial avançada para analisar seu perfil, objetivos, rotina, preferências alimentares e nível de condicionamento. Com base nessas informações, ela cria e ajusta automaticamente seu plano diário.'
    },
    {
      question: 'Preciso ter experiência com exercícios?',
      answer: 'Não! A VEXA adapta os treinos para qualquer nível, do iniciante ao avançado. Ela ajusta intensidade, exercícios e duração conforme sua capacidade e evolução.'
    },
    {
      question: 'Posso usar se tiver restrições alimentares?',
      answer: 'Sim! A IA considera todas as suas restrições alimentares, alergias e preferências. Se você é vegetariano, vegano, intolerante a lactose ou tem qualquer outra restrição, a VEXA adapta todas as refeições.'
    },
    {
      question: 'Como funciona o cancelamento?',
      answer: 'Você pode cancelar sua assinatura a qualquer momento, sem multa ou burocracia. Basta acessar as configurações da sua conta. Não há período de fidelidade.'
    },
    {
      question: 'A VEXA substitui um nutricionista ou personal?',
      answer: 'A VEXA é uma ferramenta de apoio que utiliza IA para ajudar no seu planejamento. Para questões médicas específicas, condições de saúde ou acompanhamento clínico, sempre recomendamos consultar profissionais de saúde qualificados.'
    },
    {
      question: 'Posso acessar de qualquer dispositivo?',
      answer: 'Sim! A plataforma é totalmente responsiva e funciona perfeitamente em computadores, tablets e smartphones. Seus dados ficam sincronizados em todos os dispositivos.'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-[#00ff88]/5 to-transparent">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Perguntas
            <span className="text-[#00ff88]"> Frequentes</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Tire suas dúvidas sobre a plataforma.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className={cn(
                "rounded-xl border transition-all duration-300 overflow-hidden",
                openIndex === i 
                  ? "bg-[#00ff88]/5 border-[#00ff88]/30" 
                  : "bg-white/5 border-white/10 hover:border-white/20"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className={cn(
                  "font-medium transition-colors",
                  openIndex === i ? "text-[#00ff88]" : "text-white"
                )}>
                  {faq.question}
                </span>
                <ChevronDown className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  openIndex === i ? "text-[#00ff88] rotate-180" : "text-gray-400"
                )} />
              </button>
              
              <div className={cn(
                "transition-all duration-300 overflow-hidden",
                openIndex === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
              )}>
                <p className="px-6 pb-4 text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}