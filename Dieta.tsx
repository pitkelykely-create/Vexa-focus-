import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import NeonCard from './components/ui/NeonCard';
import GlowButton from './components/ui/GlowButton';
import { base44 } from './api/base44Client';
import { 
  ArrowLeft, Utensils, Clock, Flame, Sparkles, Check, 
  ChevronDown, Apple, Coffee, Sun, Moon, Salad, Loader2
} from 'lucide-react';
import { cn } from './lib/utils';

export default function Dieta() {
  const [expandedMeal, setExpandedMeal] = useState(0);
  const [completedMeals, setCompletedMeals] = useState<number[]>([]);
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // Map icons based on time or name roughly since API returns strings
  const getIcon = (mealName: string, time: string) => {
    const lower = mealName.toLowerCase();
    if (lower.includes('café') || lower.includes('manhã')) return Coffee;
    if (lower.includes('almoço')) return Sun;
    if (lower.includes('jantar')) return Moon;
    if (lower.includes('lanche')) return Apple;
    return Utensils;
  };

  useEffect(() => {
    const loadDiet = async () => {
      // Try to load from local storage first
      const savedDiet = localStorage.getItem('vexa_daily_diet');
      if (savedDiet) {
        try {
            const parsed = JSON.parse(savedDiet);
            setMeals(Array.isArray(parsed) ? parsed : []);
        } catch (e) {
            console.error("Failed to parse diet", e);
            generateNewDiet();
        }
        setLoading(false);
      } else {
        // If no diet, generate one
        generateNewDiet();
      }
    };
    loadDiet();
  }, []);

  const generateNewDiet = async () => {
    setGenerating(true);
    setLoading(true);
    try {
      const generatedMeals = await base44.ai.generateDiet();
      setMeals(generatedMeals);
      localStorage.setItem('vexa_daily_diet', JSON.stringify(generatedMeals));
      setCompletedMeals([]); // Reset completion on new diet
    } catch (error) {
      console.error("Failed to generate diet", error);
      setMeals([]);
    } finally {
      setLoading(false);
      setGenerating(false);
    }
  };

  const totalCalories = meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
  const totalProtein = meals.reduce((sum, meal) => sum + (meal.protein || 0), 0);
  const completedCalories = meals
    .filter(m => completedMeals.includes(m.id))
    .reduce((sum, meal) => sum + (meal.calories || 0), 0);

  const toggleMealComplete = (mealId: number) => {
    setCompletedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  if (loading && meals.length === 0) {
    return (
      <div className="min-h-screen bg-[#050805] flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-[#00ff88]/20 border-t-[#00ff88] rounded-full animate-spin mb-4" />
        <h2 className="text-white text-xl font-bold animate-pulse">A VEXA está preparando sua dieta...</h2>
        <p className="text-gray-400 text-sm mt-2">Calculando macros e selecionando alimentos.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050805] p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to={createPageUrl('Dashboard')} 
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Dieta de Hoje</h1>
              <p className="text-gray-400 text-sm">Plano alimentar personalizado</p>
            </div>
          </div>
          
          <div className="ml-auto flex gap-3 w-full sm:w-auto">
             <button 
                onClick={generateNewDiet}
                disabled={generating}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 hover:bg-[#00ff88]/20 transition-all text-[#00ff88] text-sm font-medium w-full sm:w-auto"
             >
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {generating ? 'Criando...' : 'Gerar Nova Dieta (IA)'}
             </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <NeonCard className="p-4 text-center">
            <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{completedCalories}</p>
            <p className="text-xs text-gray-500">de {totalCalories} kcal</p>
          </NeonCard>
          <NeonCard className="p-4 text-center">
            <Utensils className="w-6 h-6 text-[#00ff88] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{completedMeals.length}</p>
            <p className="text-xs text-gray-500">de {meals.length} refeições</p>
          </NeonCard>
          <NeonCard className="p-4 text-center">
            <div className="w-6 h-6 rounded-full bg-blue-400/20 flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-400 text-xs font-bold">P</span>
            </div>
            <p className="text-2xl font-bold text-white">{totalProtein}g</p>
            <p className="text-xs text-gray-500">Proteína</p>
          </NeonCard>
          <NeonCard className="p-4 text-center">
            <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{meals.length}</p>
            <p className="text-xs text-gray-500">Refeições</p>
          </NeonCard>
        </div>

        {/* Progress Bar */}
        <NeonCard className="p-4 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Progresso do Dia</span>
            <span className="text-[#00ff88] text-sm font-medium">
              {totalCalories > 0 ? Math.round((completedCalories / totalCalories) * 100) : 0}%
            </span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00ff88] to-[#00ff88]/60 rounded-full transition-all duration-500"
              style={{ width: `${totalCalories > 0 ? (completedCalories / totalCalories) * 100 : 0}%` }}
            />
          </div>
        </NeonCard>

        {/* Meals List */}
        <div className="space-y-4">
          {meals.map((meal, index) => {
            const Icon = getIcon(meal.name || "", meal.time || "");
            const isExpanded = expandedMeal === index;
            const isCompleted = completedMeals.includes(meal.id);

            return (
              <NeonCard 
                key={meal.id || index} 
                className={cn(
                  "overflow-hidden transition-all",
                  isCompleted && "border-[#00ff88]/40 bg-[#00ff88]/5"
                )}
              >
                <button
                  onClick={() => setExpandedMeal(isExpanded ? -1 : index)}
                  className="w-full p-4 flex items-center gap-4 text-left"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    isCompleted ? "bg-[#00ff88]/20" : "bg-white/5"
                  )}>
                    <Icon className={cn(
                      "w-6 h-6",
                      isCompleted ? "text-[#00ff88]" : "text-gray-400"
                    )} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm">{meal.time}</span>
                      {isCompleted && (
                        <span className="text-xs text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded-full">
                          Concluído
                        </span>
                      )}
                    </div>
                    <h3 className={cn(
                      "font-semibold",
                      isCompleted ? "text-[#00ff88]" : "text-white"
                    )}>
                      {meal.name}
                    </h3>
                  </div>

                  <div className="text-right mr-4">
                    <p className="text-white font-semibold">{meal.calories} kcal</p>
                    <p className="text-gray-500 text-sm">{meal.protein}g proteína</p>
                  </div>

                  <ChevronDown className={cn(
                    "w-5 h-5 text-gray-400 transition-transform",
                    isExpanded && "rotate-180"
                  )} />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-white/10 pt-4">
                    <div className="space-y-2 mb-4">
                      {meal.items && meal.items.map((item: any, i: number) => (
                        <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5">
                          <div>
                            <p className="text-white text-sm">{item.name}</p>
                            <p className="text-gray-500 text-xs">{item.quantity}</p>
                          </div>
                          <span className="text-gray-400 text-sm">{item.calories} kcal</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => toggleMealComplete(meal.id)}
                        className={cn(
                          "flex-1 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2",
                          isCompleted 
                            ? "bg-white/10 text-gray-300 hover:bg-white/20"
                            : "bg-[#00ff88] text-black hover:bg-[#00ff88]/90"
                        )}
                      >
                        <Check className="w-5 h-5" />
                        {isCompleted ? 'Desmarcar' : 'Marcar como Concluído'}
                      </button>
                    </div>
                  </div>
                )}
              </NeonCard>
            );
          })}
        </div>

        {/* Chat CTA */}
        <NeonCard glow className="p-6 mt-8 text-center">
          <Sparkles className="w-8 h-8 text-[#00ff88] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Quer ajustar sua dieta?</h3>
          <p className="text-gray-400 mb-6">
            Converse com a VEXA para personalizar suas refeições de acordo com suas preferências.
          </p>
          <GlowButton to={createPageUrl('Chat')}>
            Falar com a VEXA
          </GlowButton>
        </NeonCard>
      </div>
    </div>
  );
}