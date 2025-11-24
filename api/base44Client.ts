import { GoogleGenAI, Type, Schema } from "@google/genai";

// Initialize Gemini Client
const aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System instructions for the assistant
const SYSTEM_INSTRUCTION = `Você é a VEXA, uma assistente de saúde futurista e motivadora. 
Seu tom é energético, profissional e empático. 
Você ajuda com dieta, treinos e bem-estar. 
Responda em português do Brasil.`;

// Helper to get correct images based on exercise names
export const getExerciseImage = (name: string): string => {
  if (!name) return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80';
  
  const lowerName = name.toLowerCase();
  
  // Peito / Chest
  if (lowerName.includes('supino') || lowerName.includes('peito') || lowerName.includes('flexão')) {
    return 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80';
  }
  if (lowerName.includes('crucifixo') || lowerName.includes('fly')) {
    // Image focusing on dumbbells/bench for fly motion
    return 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80';
  }

  // Costas / Back
  if (lowerName.includes('costas') || lowerName.includes('remada') || lowerName.includes('puxada') || lowerName.includes('barra')) {
    return 'https://images.unsplash.com/photo-1603287681836-e174ce71808e?w=800&q=80';
  }

  // Pernas / Legs
  if (lowerName.includes('agachamento') || lowerName.includes('squat')) {
    return 'https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?w=800&q=80';
  }
  if (lowerName.includes('leg') || lowerName.includes('leg press') || lowerName.includes('extensora')) {
     return 'https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?w=800&q=80'; // Gym leg machine context
  }

  // Ombros / Shoulders
  if (lowerName.includes('ombro') || lowerName.includes('desenvolvimento') || lowerName.includes('elevação') || lowerName.includes('militar')) {
    return 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80';
  }

  // Braços / Arms
  if (lowerName.includes('bíceps') || lowerName.includes('rosca')) {
    return 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80';
  }
  if (lowerName.includes('tríceps') || lowerName.includes('corda') || lowerName.includes('testa') || lowerName.includes('polia')) {
    return 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?w=800&q=80';
  }

  // Abdomen / Core
  if (lowerName.includes('abdominal') || lowerName.includes('prancha') || lowerName.includes('core')) {
    return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80';
  }

  // Cardio
  if (lowerName.includes('corrida') || lowerName.includes('esteira') || lowerName.includes('bicicleta') || lowerName.includes('cardio')) {
    return 'https://images.unsplash.com/photo-1538805060504-d14b8e288420?w=800&q=80';
  }

  // Default Gym Image
  return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80';
};

export const base44 = {
  auth: {
    isAuthenticated: async () => {
      return localStorage.getItem('isLoggedIn') === 'true';
    },
    me: async () => {
      if (localStorage.getItem('isLoggedIn') !== 'true') throw new Error('Not authenticated');
      return {
        full_name: 'Alex Silva',
        email: 'alex@example.com',
        id: 'user_123'
      };
    },
    login: async () => {
      localStorage.setItem('isLoggedIn', 'true');
      return { user: { full_name: 'Alex Silva' } };
    },
    logout: async (redirectUrl: string) => {
      localStorage.setItem('isLoggedIn', 'false');
      window.location.hash = redirectUrl === '/' ? '' : redirectUrl;
    },
    redirectToLogin: async (redirectUrl: string) => {
       localStorage.setItem('isLoggedIn', 'true');
       window.location.hash = redirectUrl;
       window.location.reload();
    }
  },
  ai: {
    // Chat Functionality
    sendMessage: async (history: {role: string, content: string}[], message: string) => {
      try {
        const chat = aiClient.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          }
        });

        const result = await chat.sendMessage({ message });
        return result.text;
      } catch (error) {
        console.error("Gemini Chat Error:", error);
        return "Desculpe, meus sistemas estão sobrecarregados. Tente novamente em breve.";
      }
    },

    // Diet Generation
    generateDiet: async () => {
      const schema: Schema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            time: { type: Type.STRING },
            name: { type: Type.STRING },
            calories: { type: Type.INTEGER },
            protein: { type: Type.INTEGER },
            carbs: { type: Type.INTEGER },
            fat: { type: Type.INTEGER },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  quantity: { type: Type.STRING },
                  calories: { type: Type.INTEGER }
                }
              }
            }
          },
          required: ["id", "time", "name", "calories", "protein", "items"]
        }
      };

      const prompt = `Gere uma dieta diária completa e saudável para uma pessoa ativa.
      Inclua 5 refeições: Café da Manhã (07:00), Lanche (10:00), Almoço (13:00), Lanche (16:00), Jantar (20:00).
      Retorne APENAS o JSON.`;

      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: schema
          }
        });

        let dietData = JSON.parse(response.text || "[]");
        if (!Array.isArray(dietData)) {
            dietData = [];
        }
        return dietData;
      } catch (e) {
        console.error("Diet generation error", e);
        return [];
      }
    },

    // Workout Generation
    generateWorkout: async () => {
      const schema: Schema = {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          duration: { type: Type.INTEGER },
          calories: { type: Type.INTEGER },
          level: { type: Type.STRING },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.INTEGER },
                name: { type: Type.STRING },
                muscle: { type: Type.STRING },
                sets: { type: Type.INTEGER },
                reps: { type: Type.STRING },
                rest: { type: Type.INTEGER },
                weight: { type: Type.STRING },
                tips: { type: Type.STRING },
                video: { type: Type.STRING } 
              },
              required: ["id", "name", "muscle", "sets", "reps", "rest", "tips"]
            }
          }
        }
      };

      const prompt = `Gere um treino de musculação completo (Ex: Peito e Tríceps, ou Pernas, ou Costas e Bíceps).
      Defina um nome criativo, duração estimada, calorias e nível.
      Liste 5 a 6 exercícios.
      Retorne APENAS o JSON.`;

      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: schema
          }
        });

        let workoutData = JSON.parse(response.text || "{}");
        
        // Ensure exercises array exists
        if (!workoutData || typeof workoutData !== 'object') {
            workoutData = { exercises: [] };
        }
        if (!Array.isArray(workoutData.exercises)) {
            workoutData.exercises = [];
        }
        
        // Post-process to ensure correct images
        workoutData.exercises = workoutData.exercises.map((ex: any) => ({
          ...ex,
          video: getExerciseImage(ex.name)
        }));

        return workoutData;
      } catch (e) {
        console.error("Workout generation error", e);
        return { exercises: [] };
      }
    }
  },
  agents: {
    createConversation: async () => ({ id: 'new' }),
    getConversation: async (id: string) => ({ id }),
    addMessage: async () => true,
    subscribeToConversation: () => () => {}
  }
};