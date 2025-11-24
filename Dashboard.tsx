import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import NeonCard from './components/ui/NeonCard';
import { base44 } from './api/base44Client';
import { 
  Bot, Utensils, Dumbbell, Activity, TrendingUp, Flame, 
  Droplets, Moon, Zap, ChevronRight, Calendar, Target
} from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (error) {
        // User not logged in, potentially redirect or show empty state
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const quickStats = [
    { icon: Flame, label: 'Calorias Hoje', value: '1,245', target: '2,000', color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { icon: Droplets, label: 'Água', value: '1.5L', target: '3L', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: Moon, label: 'Sono', value: '7h', target: '8h', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { icon: Zap, label: 'Energia', value: '75%', target: '100%', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  ];

  const quickActions = [
    { icon: Bot, label: 'Chat IA', description: 'Converse com a VEXA', page: 'Chat', color: 'text-[#00ff88]' },
    { icon: Utensils, label: 'Dieta', description: 'Ver plano de hoje', page: 'Dieta', color: 'text-orange-400' },
    { icon: Dumbbell, label: 'Treino', description: 'Iniciar treino', page: 'Treino', color: 'text-blue-400' },
    { icon: Activity, label: 'Corpo', description: 'Painel holográfico', page: 'Holografico', color: 'text-purple-400' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050805] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#00ff88]/20 border-t-[#00ff88] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050805] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Olá, {user?.full_name?.split(' ')[0] || 'Usuário'} 👋
          </h1>
          <p className="text-gray-400">Vamos continuar sua jornada de transformação!</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, i) => (
            <NeonCard key={i} className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-gray-500 text-sm">/ {stat.target}</span>
              </div>
              <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${stat.color.replace('text-', 'bg-')}`}
                  style={{ width: `${Math.min(parseInt(stat.value) / parseInt(stat.target) * 100, 100)}%` }}
                />
              </div>
            </NeonCard>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, i) => (
            <Link key={i} to={createPageUrl(action.page)}>
              <NeonCard className="p-6 h-full group cursor-pointer hover:border-[#00ff88]/40">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className={`w-7 h-7 ${action.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{action.label}</h3>
                <p className="text-gray-400 text-sm">{action.description}</p>
                <ChevronRight className="w-5 h-5 text-gray-500 absolute top-6 right-6 group-hover:text-[#00ff88] group-hover:translate-x-1 transition-all" />
              </NeonCard>
            </Link>
          ))}
        </div>

        {/* Today's Summary */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Diet Summary */}
          <NeonCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-400/10 flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Dieta de Hoje</h3>
                  <p className="text-sm text-gray-400">3 de 5 refeições completas</p>
                </div>
              </div>
              <Link to={createPageUrl('Dieta')} className="text-[#00ff88] text-sm hover:underline">
                Ver tudo
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { time: '07:00', meal: 'Café da Manhã', done: true },
                { time: '10:00', meal: 'Lanche', done: true },
                { time: '13:00', meal: 'Almoço', done: true },
                { time: '16:00', meal: 'Lanche', done: false },
                { time: '20:00', meal: 'Jantar', done: false },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-4 p-3 rounded-xl ${item.done ? 'bg-[#00ff88]/10 border border-[#00ff88]/20' : 'bg-white/5 border border-white/5'}`}>
                  <span className="text-gray-500 text-sm w-12">{item.time}</span>
                  <span className={item.done ? 'text-[#00ff88]' : 'text-gray-300'}>{item.meal}</span>
                  {item.done && (
                    <svg className="w-5 h-5 text-[#00ff88] ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </NeonCard>

          {/* Workout Summary */}
          <NeonCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Treino de Hoje</h3>
                  <p className="text-sm text-gray-400">Peito / Ombro / Tríceps</p>
                </div>
              </div>
              <Link to={createPageUrl('Treino')} className="text-[#00ff88] text-sm hover:underline">
                Iniciar
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <Target className="w-5 h-5 text-[#00ff88] mx-auto mb-2" />
                <p className="text-xl font-bold text-white">5</p>
                <p className="text-xs text-gray-500">Exercícios</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <Calendar className="w-5 h-5 text-[#00ff88] mx-auto mb-2" />
                <p className="text-xl font-bold text-white">45</p>
                <p className="text-xs text-gray-500">Minutos</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <Flame className="w-5 h-5 text-[#00ff88] mx-auto mb-2" />
                <p className="text-xl font-bold text-white">320</p>
                <p className="text-xs text-gray-500">kcal</p>
              </div>
            </div>

            <Link to={createPageUrl('Treino')} className="block w-full text-center bg-[#00ff88] text-black font-medium py-3 rounded-lg hover:bg-[#00ff88]/90 transition-colors">
              Começar Treino
            </Link>
          </NeonCard>
        </div>

        {/* Weekly Progress */}
        <NeonCard className="p-6 mt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ff88]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#00ff88]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Progresso Semanal</h3>
                <p className="text-sm text-gray-400">Você está no caminho certo!</p>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between h-32 gap-2">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, i) => {
              const heights = [60, 80, 70, 90, 85, 40, 0];
              const isToday = i === 4;
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className={`w-full rounded-t-lg transition-all ${isToday ? 'bg-[#00ff88]' : 'bg-[#00ff88]/30'}`}
                    style={{ height: `${heights[i]}%` }}
                  />
                  <span className={`text-xs ${isToday ? 'text-[#00ff88]' : 'text-gray-500'}`}>{day}</span>
                </div>
              );
            })}
          </div>
        </NeonCard>
      </div>
    </div>
  );
}