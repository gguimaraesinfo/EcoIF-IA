import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Loader2, Info } from 'lucide-react';
import { cn } from '../lib/utils';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou o **EcoIF IA**, seu assistente especializado em A3P para Institutos Federais. Como posso ajudar na gestão sustentável do seu campus hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Falha na resposta do servidor');
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '❌ Desculpe, ocorreu um erro ao processar sua solicitação.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-editorial-border overflow-hidden">
      <div className="p-4 bg-editorial-sidebar border-b border-editorial-border flex items-center gap-2">
        <Info size={16} className="text-editorial-accent" />
        <span className="text-[10px] uppercase tracking-widest font-bold text-editorial-olive">RAG Ativo: Legislação & Eixos MMA</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "flex gap-4",
            m.role === 'user' ? "flex-row-reverse" : "flex-row"
          )}>
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-editorial-border shadow-sm",
              m.role === 'assistant' ? "bg-editorial-dark text-white" : "bg-editorial-sidebar text-editorial-dark"
            )}>
              {m.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
            </div>
            <div className={cn(
              "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
              m.role === 'assistant' ? "bg-editorial-sidebar text-editorial-dark border border-editorial-border shadow-sm" : "bg-editorial-dark text-white shadow-lg"
            )}>
              <div className="markdown-body">
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-editorial-dark text-white flex items-center justify-center shrink-0">
              <Loader2 size={18} className="animate-spin" />
            </div>
            <div className="bg-editorial-sidebar p-4 rounded-2xl text-[11px] text-editorial-olive italic border border-editorial-border">
              EcoIF está processando informações jurídicas...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 border-t border-editorial-border bg-editorial-sidebar/30 backdrop-blur-sm">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: 'Gere um modelo de portaria para coleta seletiva no Campus...'"
            className="w-full pl-6 pr-20 py-4 bg-white border border-editorial-border rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-editorial-accent/10 focus:border-editorial-accent transition-all shadow-sm group-hover:border-editorial-secondary placeholder:text-editorial-secondary/50 font-light"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-editorial-accent text-editorial-dark rounded-full hover:bg-editorial-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md font-bold text-[10px] uppercase tracking-widest"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Consultar"}
          </button>
        </div>
        <p className="mt-3 text-center text-[10px] text-editorial-secondary/60 font-medium">
          EcoIF IA • Inteligência para Gestão Sustentável na Rede Federal • Fontes: MMA & Agenda 2030
        </p>
      </form>
    </div>
  );
}
