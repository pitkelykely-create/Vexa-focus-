import React from 'react';
import NeonCard from '../ui/NeonCard';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Marina Santos',
      role: 'Perdeu 12kg em 3 meses',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      content: 'A VEXA mudou minha vida! Nunca consegui seguir uma dieta até encontrar essa plataforma. A IA entende minha rotina e ajusta tudo automaticamente.',
      rating: 5
    },
    {
      name: 'Rafael Costa',
      role: 'Ganhou 8kg de massa magra',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      content: 'Os treinos são perfeitos para meu nível. Quando estou cansado, a IA adapta. Quando tenho energia, ela aumenta a intensidade. Incrível!',
      rating: 5
    },
    {
      name: 'Juliana Oliveira',
      role: 'Melhorou disposição e energia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      content: 'Trabalho muito e não tinha tempo para planejar. A VEXA faz tudo por mim. Em 2 meses, minha energia aumentou muito e durmo muito melhor.',
      rating: 5
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            O que dizem nossos
            <span className="text-[#00ff88]"> usuários</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Milhares de pessoas já transformaram sua saúde com a VEXA.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <NeonCard key={i} className="p-6 relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#00ff88]/20" />
              
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#00ff88]/30"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-[#00ff88] text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#00ff88] text-[#00ff88]" />
                ))}
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">
                "{testimonial.content}"
              </p>
            </NeonCard>
          ))}
        </div>
      </div>
    </section>
  );
}