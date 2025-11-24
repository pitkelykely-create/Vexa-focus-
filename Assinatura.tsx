import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import NeonCard from './components/ui/NeonCard';
import GlowButton from './components/ui/GlowButton';
import Navbar from './components/home/Navbar';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { base44 } from './api/base44Client';
import { 
  ArrowLeft, Sparkles, Check, CreditCard, Lock, Shield,
  Bot, Utensils, Dumbbell, Activity, TrendingUp, Zap
} from 'lucide-react';

export default function Assinatura() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const features = [
    { icon: Bot, text: 'Chat IA ilimitado' },
    { icon: Utensils, text: 'Dieta automática diária' },
    { icon: Dumbbell, text: 'Treino inteligente diário' },
    { icon: Activity, text: 'Corpo holográfico' },
    { icon: TrendingUp, text: 'Sistema de progresso' },
    { icon: Zap, text: 'Acesso total à plataforma' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to login/dashboard
    base44.auth.redirectToLogin(createPageUrl('Dashboard'));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-[#050805] relative overflow-hidden">
      <Navbar />
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#00ff88]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 pt-28 px-4 sm:px-6 lg:px-8 pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Finalizar Assinatura</h1>
          <p className="text-gray-400 text-sm">Complete seu pagamento de forma segura</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <NeonCard glow className="p-6 h-fit">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#00ff88]" />
              <span className="text-[#00ff88] font-medium">VEXA Premium</span>
              <span className="ml-auto bg-[#00ff88] text-black text-xs font-bold px-2 py-1 rounded-full">
                50% OFF
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-gray-500 text-lg line-through">R$59,90</span>
                <span className="text-4xl font-bold text-white">R$29,90</span>
                <span className="text-gray-400">/mês</span>
              </div>
              <p className="text-gray-400 text-sm">Cobrança mensal • Cancele quando quiser</p>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="text-white font-medium mb-4">Incluso no plano:</h3>
              <div className="space-y-3">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#00ff88]/10 flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-[#00ff88]" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature.text}</span>
                    <Check className="w-4 h-4 text-[#00ff88] ml-auto" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total hoje</span>
                <span className="text-2xl font-bold text-white">R$29,90</span>
              </div>
            </div>
          </NeonCard>

          {/* Payment Form */}
          <NeonCard className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <span className="text-white font-medium">Dados do Pagamento</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label className="text-gray-300 mb-2 block">Número do Cartão</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
                    maxLength={19}
                    className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#00ff88]/50 focus:ring-[#00ff88]/20"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">Nome no Cartão</Label>
                <Input
                  type="text"
                  placeholder="Como está impresso no cartão"
                  value={formData.cardName}
                  onChange={(e) => setFormData({ ...formData, cardName: e.target.value.toUpperCase() })}
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#00ff88]/50 focus:ring-[#00ff88]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Validade</Label>
                  <Input
                    type="text"
                    placeholder="MM/AA"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: formatExpiry(e.target.value) })}
                    maxLength={5}
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#00ff88]/50 focus:ring-[#00ff88]/20"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">CVV</Label>
                  <Input
                    type="text"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                    maxLength={4}
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#00ff88]/50 focus:ring-[#00ff88]/20"
                  />
                </div>
              </div>

              <div className="bg-[#00ff88]/5 border border-[#00ff88]/20 rounded-xl p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#00ff88] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">Pagamento 100% seguro</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Seus dados são criptografados e protegidos com a mais alta tecnologia de segurança.
                  </p>
                </div>
              </div>

              <GlowButton type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Processando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Assinar por R$29,90/mês
                  </div>
                )}
              </GlowButton>

              <p className="text-center text-gray-500 text-xs">
                Ao assinar, você concorda com nossos{' '}
                <a href="#" className="text-[#00ff88] hover:underline">Termos de Uso</a>
                {' '}e{' '}
                <a href="#" className="text-[#00ff88] hover:underline">Política de Privacidade</a>
              </p>
            </form>
          </NeonCard>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Pagamento Seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>Dados Criptografados</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Cancele Quando Quiser</span>
          </div>
        </div>
      </div>
    </div>
  );
}