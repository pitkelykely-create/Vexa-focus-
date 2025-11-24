import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import NeonCard from './components/ui/NeonCard';
import VexaLogo from './components/ui/VexaLogo';
import { base44 } from './api/base44Client';
import { Bot, Send, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat with a welcome message if empty
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: 'Olá! Sou a VEXA, sua assistente de saúde com IA. 🌟\n\nEstou aqui para ajudar você com:\n- **Dieta personalizada** baseada nos seus objetivos\n- **Treinos adaptados** à sua rotina\n- **Dicas de saúde** e motivação\n\nComo posso ajudar você hoje?'
      }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to state
    const newHistory: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newHistory);
    setLoading(true);

    try {
      // Call Gemini API
      const responseText = await base44.ai.sendMessage(newHistory, userMessage);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: responseText || "Desculpe, não consegui processar sua resposta."
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Ocorreu um erro ao conectar com a VEXA. Tente novamente."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#050805] flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#050805]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link 
            to={createPageUrl('Dashboard')} 
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <div className="flex items-center gap-3">
            <VexaLogo size="default" />
            <div>
              <h1 className="text-white font-semibold">Assistente VEXA</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="text-xs text-gray-400">Online (Gemini 2.5)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, i) => (
            <div 
              key={i} 
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-[#00ff88]" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                <div 
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user' 
                      ? 'bg-[#00ff88] text-black rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                  }`}
                >
                  <ReactMarkdown 
                     className="text-sm prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/30 prose-pre:p-2 prose-pre:rounded-lg"
                     components={{
                       strong: ({node, ...props}) => <span className="font-bold text-[#00ff88]" {...props} />
                     }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white font-medium">V</span>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-[#00ff88]" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-[#00ff88] animate-spin" />
                  <span className="text-gray-400 text-sm">VEXA está pensando...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-white/10 bg-[#050805]/80 backdrop-blur-xl p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="w-full h-12 px-5 pr-12 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00ff88]/50"
              />
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
            <button 
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-12 h-12 rounded-full bg-[#00ff88] flex items-center justify-center hover:bg-[#00ff88]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}