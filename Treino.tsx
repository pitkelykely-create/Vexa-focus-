import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import NeonCard from './components/ui/NeonCard';
import GlowButton from './components/ui/GlowButton';
import { base44, getExerciseImage } from './api/base44Client';
import { 
  ArrowLeft, Dumbbell, Clock, Flame, Sparkles, Check, 
  ChevronDown, Play, Pause, RotateCcw, Timer, Loader2
} from 'lucide-react';
import { cn } from './lib/utils';

export default function Treino() {
  const [expandedExercise, setExpandedExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(60);
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const loadWorkout = async () => {
        const savedWorkout = localStorage.getItem('vexa_daily_workout');
        if (savedWorkout) {
            try {
                const parsed = JSON.parse(savedWorkout) || {};
                // Fix images for existing workouts
                if (Array.isArray(parsed.exercises)) {
                    parsed.exercises = parsed.exercises.map((ex: any) => ({
                        ...ex,
                        video: getExerciseImage(ex.name)
                    }));
                } else {
                    parsed.exercises = [];
                }
                setWorkout(parsed);
            } catch (e) {
                console.error("Error loading workout", e);
                generateNewWorkout();
            }
            setLoading(false);
        } else {
            generateNewWorkout();
        }
    };
    loadWorkout();
  }, []);

  const generateNewWorkout = async () => {
      setGenerating(true);
      setLoading(true);
      try {
          const generatedWorkout = await base44.ai.generateWorkout();
          setWorkout(generatedWorkout);
          localStorage.setItem('vexa_daily_workout', JSON.stringify(generatedWorkout));
          setCompletedExercises([]);
      } catch (e) {
          console.error("Error generating workout", e);
      } finally {
          setLoading(false);
          setGenerating(false);
      }
  }

  const toggleExerciseComplete = (exerciseId: number) => {
    setCompletedExercises(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const startRest = (seconds: number) => {
    setRestTime(seconds);
    setIsResting(true);
    
    const interval = setInterval(() => {
      setRestTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsResting(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (loading || !workout) {
      return (
        <div className="min-h-screen bg-[#050805] flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 border-4 border-[#00ff88]/20 border-t-[#00ff88] rounded-full animate-spin mb-4" />
          <h2 className="text-white text-xl font-bold animate-pulse">A VEXA está montando seu treino...</h2>
          <p className="text-gray-400 text-sm mt-2">Selecionando exercícios e cargas ideais.</p>
        </div>
      );
  }

  const exercises = workout.exercises || [];

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
                <h1 className="text-2xl font-bold text-white">{workout.name || 'Treino do Dia'}</h1>
                <p className="text-gray-400 text-sm">{workout.level || 'Geral'} • {workout.duration || 0} min</p>
            </div>
          </div>
          <div className="ml-auto w-full sm:w-auto">
             <button 
                onClick={generateNewWorkout}
                disabled={generating}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 hover:bg-[#00ff88]/20 transition-all text-[#00ff88] text-sm font-medium w-full"
             >
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Dumbbell className="w-4 h-4" />}
                {generating ? 'Criando...' : 'Gerar Novo Treino (IA)'}
             </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <NeonCard className="p-4 text-center">
            <Dumbbell className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{completedExercises.length}/{exercises.length}</p>
            <p className="text-xs text-gray-500">Exercícios</p>
          </NeonCard>
          <NeonCard className="p-4 text-center">
            <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{workout.duration || 0}</p>
            <p className="text-xs text-gray-500">Minutos</p>
          </NeonCard>
          <NeonCard className="p-4 text-center">
            <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{workout.calories || 0}</p>
            <p className="text-xs text-gray-500">kcal</p>
          </NeonCard>
        </div>

        {/* Rest Timer */}
        {isResting && (
          <NeonCard glow className="p-6 mb-8 text-center">
            <Timer className="w-10 h-10 text-[#00ff88] mx-auto mb-4 animate-pulse" />
            <p className="text-gray-400 mb-2">Tempo de Descanso</p>
            <p className="text-5xl font-bold text-white mb-4">
              {Math.floor(restTime / 60)}:{(restTime % 60).toString().padStart(2, '0')}
            </p>
            <button
              onClick={() => setIsResting(false)}
              className="text-[#00ff88] hover:underline"
            >
              Pular descanso
            </button>
          </NeonCard>
        )}

        {/* Progress Bar */}
        <NeonCard className="p-4 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Progresso do Treino</span>
            <span className="text-[#00ff88] text-sm font-medium">
              {exercises.length > 0 ? Math.round((completedExercises.length / exercises.length) * 100) : 0}%
            </span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00ff88] to-[#00ff88]/60 rounded-full transition-all duration-500"
              style={{ width: `${exercises.length > 0 ? (completedExercises.length / exercises.length) * 100 : 0}%` }}
            />
          </div>
        </NeonCard>

        {/* Exercises List */}
        <div className="space-y-4">
          {exercises.map((exercise: any, index: number) => {
            const isExpanded = expandedExercise === index;
            const isCompleted = completedExercises.includes(exercise.id);

            return (
              <NeonCard 
                key={exercise.id || index} 
                className={cn(
                  "overflow-hidden transition-all",
                  isCompleted && "border-[#00ff88]/40 bg-[#00ff88]/5"
                )}
              >
                <button
                  onClick={() => setExpandedExercise(isExpanded ? -1 : index)}
                  className="w-full p-4 flex items-center gap-4 text-left"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold transition-colors",
                    isCompleted ? "bg-[#00ff88] text-black" : "bg-white/5 text-gray-400"
                  )}>
                    {isCompleted ? <Check className="w-6 h-6" /> : index + 1}
                  </div>

                  <div className="flex-1">
                    <p className="text-gray-500 text-xs">{exercise.muscle}</p>
                    <h3 className={cn(
                      "font-semibold",
                      isCompleted ? "text-[#00ff88]" : "text-white"
                    )}>
                      {exercise.name}
                    </h3>
                  </div>

                  <div className="text-right mr-4 hidden sm:block">
                    <p className="text-white font-semibold">{exercise.sets} x {exercise.reps}</p>
                    <p className="text-gray-500 text-sm">{exercise.weight}</p>
                  </div>

                  <ChevronDown className={cn(
                    "w-5 h-5 text-gray-400 transition-transform",
                    isExpanded && "rotate-180"
                  )} />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-white/10 pt-4">
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div className="rounded-xl overflow-hidden bg-black/40 h-40">
                        {/* Use the correct image from the exercise object, fallback only if missing */}
                        <img 
                          src={exercise.video || getExerciseImage(exercise.name)} 
                          alt={exercise.name}
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Dicas de Execução</h4>
                        <p className="text-gray-400 text-sm">{exercise.tips}</p>
                        
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="bg-white/5 rounded-lg p-2 text-center">
                            <p className="text-[#00ff88] font-bold">{exercise.sets}</p>
                            <p className="text-gray-500 text-xs">Séries</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-2 text-center">
                            <p className="text-[#00ff88] font-bold">{exercise.reps}</p>
                            <p className="text-gray-500 text-xs">Reps</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-2 text-center">
                            <p className="text-[#00ff88] font-bold">{exercise.rest}s</p>
                            <p className="text-gray-500 text-xs">Descanso</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => startRest(exercise.rest)}
                        className="flex-1 py-3 rounded-xl font-medium bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                      >
                        <Timer className="w-5 h-5" />
                        Iniciar Descanso
                      </button>
                      <button
                        onClick={() => toggleExerciseComplete(exercise.id)}
                        className={cn(
                          "flex-1 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2",
                          isCompleted 
                            ? "bg-white/10 text-gray-300 hover:bg-white/20"
                            : "bg-[#00ff88] text-black hover:bg-[#00ff88]/90"
                        )}
                      >
                        <Check className="w-5 h-5" />
                        {isCompleted ? 'Desmarcar' : 'Concluído'}
                      </button>
                    </div>
                  </div>
                )}
              </NeonCard>
            );
          })}
        </div>

        {/* Completion */}
        {completedExercises.length === exercises.length && exercises.length > 0 && (
          <NeonCard glow className="p-8 mt-8 text-center">
            <div className="w-20 h-20 rounded-full bg-[#00ff88]/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-[#00ff88]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Treino Completo! 🎉</h3>
            <p className="text-gray-400 mb-6">
              Parabéns! Você queimou aproximadamente {workout.calories || 0} kcal
            </p>
            <GlowButton to={createPageUrl('Dashboard')}>
              Voltar ao Dashboard
            </GlowButton>
          </NeonCard>
        )}

        {/* Chat CTA */}
        <NeonCard glow className="p-6 mt-8 text-center">
          <Sparkles className="w-8 h-8 text-[#00ff88] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Precisa de ajuda?</h3>
          <p className="text-gray-400 mb-6">
            A VEXA pode ajustar seu treino baseado no seu nível de energia hoje.
          </p>
          <GlowButton to={createPageUrl('Chat')}>
            Falar com a VEXA
          </GlowButton>
        </NeonCard>
      </div>
    </div>
  );
}