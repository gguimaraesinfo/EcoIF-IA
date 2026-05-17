import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Calendar, 
  Target, 
  Users, 
  TrendingUp,
  Award
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Sensibilização da Gestão',
    desc: 'Obter o apoio oficial da reitoria/direção-geral e formalizar o interesse na A3P.',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Criação da Comissão Local',
    desc: 'Publicar portaria designando servidores e alunos para compor o núcleo Gestor.',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Diagnóstico Ambiental',
    desc: 'Levantar dados de consumo de água, energia, papel e volume de resíduos.',
    status: 'loading',
  },
  {
    id: 4,
    title: 'Elaboração do Plano de Ação',
    desc: 'Definir metas de curto, médio e longo prazo baseadas nos 6 eixos.',
    status: 'upcoming',
  },
  {
    id: 5,
    title: 'Termo de Adesão ao MMA',
    desc: 'Formalizar o compromisso com o Ministério do Meio Ambiente.',
    status: 'upcoming',
  },
  {
    id: 6,
    title: 'Monitoramento e Relatos',
    desc: 'Mensurar resultados via RESSOL e produzir relatórios anuais ESG.',
    status: 'upcoming',
  },
];

export default function Guide() {
  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-editorial-sidebar text-editorial-dark border border-editorial-border rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
          <Target size={14} />
          ROTEIRO DE SUCESSO
        </div>
        <h3 className="text-4xl font-serif font-bold italic text-editorial-dark mb-4 tracking-tight">Implantação Guided A3P</h3>
        <p className="text-editorial-olive font-light">Siga o roteiro técnico editorial para certificar seu campus na Agenda Ambiental.</p>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-8 bottom-8 w-px bg-editorial-border"></div>
        <div className="space-y-12">
          {steps.map((step, i) => (
            <div key={i} className="relative flex gap-10 group">
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-all ${
                  step.status === 'completed' ? 'bg-editorial-dark text-white' : 
                  step.status === 'loading' ? 'bg-white text-editorial-dark border-editorial-accent' : 
                  'bg-editorial-sidebar text-editorial-secondary border-editorial-border'
                }`}>
                  {step.status === 'completed' ? <CheckCircle2 size={24} /> : 
                   step.status === 'loading' ? <div className="text-editorial-accent animate-pulse font-serif italic font-bold">●</div> : 
                   <Circle size={20} className="opacity-30" />}
                </div>
              </div>
              
              <div className={`flex-1 pt-1 ${step.status === 'upcoming' ? 'opacity-40' : ''}`}>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-serif font-bold italic text-editorial-dark text-xl">{step.title}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-editorial-secondary">ETAPA 0{step.id}</span>
                </div>
                <p className="text-editorial-olive text-sm font-light leading-relaxed mb-4">
                  {step.desc}
                </p>
                {step.status === 'loading' && (
                  <div className="bg-editorial-sidebar p-5 rounded-2xl border border-editorial-border shadow-inner">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-editorial-olive">Progresso do Diagnóstico</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-editorial-dark">65%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-editorial-border">
                      <div className="h-full bg-editorial-dark w-[65%]"></div>
                    </div>
                  </div>
                )}
                {step.status !== 'upcoming' && (
                  <button className="text-editorial-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:gap-3 transition-all mt-2 group-hover:text-editorial-dark">
                    Documentação de Apoio <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Awards */}
      <div className="mt-20 grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-editorial-border shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all">
          <div className="bg-editorial-sidebar p-4 rounded-2xl text-editorial-dark border border-editorial-border group-hover:bg-editorial-dark group-hover:text-white transition-colors">
            <Users size={32} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-editorial-secondary">COMUNIDADE</p>
            <p className="text-xl font-serif font-bold italic text-editorial-dark">45 Servidores</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-editorial-border shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all">
          <div className="bg-editorial-active p-4 rounded-2xl text-editorial-dark border border-editorial-border group-hover:bg-editorial-accent transition-colors">
            <Award size={32} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-editorial-secondary">CERTIFICAÇÃO</p>
            <p className="text-xl font-serif font-bold italic text-editorial-dark">Nível Prata</p>
          </div>
        </div>
      </div>
    </div>
  );
}
