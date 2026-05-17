import React from 'react';
import { FileText, Download, Copy, FileSignature, ClipboardCheck } from 'lucide-react';

const templates = [
  {
    title: 'Portaria de Comissão A3P',
    desc: 'Modelo oficial para instituição da comissão local de sustentabilidade no campus.',
    tags: ['Governança', 'Oficial']
  },
  {
    title: 'Plano de Gerenciamento de Resíduos',
    desc: 'Estrutura base para o PGRS exigido pela Lei 12.305 e pelo MMA.',
    tags: ['Resíduos', 'Operacional']
  },
  {
    title: 'Termo de Adesão A3P',
    desc: 'Minuta para formalizar a adesão do Instituto ao programa ministerial.',
    tags: ['Institucional', 'Parceria']
  },
  {
    title: 'Relatório Anual de Desempenho',
    desc: 'Modelo para reporte de indicadores e metas alcançadas no período.',
    tags: ['Report', 'Meta']
  },
  {
    title: 'Checklist Compra Sustentável',
    desc: 'Guia prático para conferência de editais sob a ótica da Lei 14.133.',
    tags: ['Compras', 'Jurídico']
  },
  {
    title: 'Edital com Critérios Verdes',
    desc: 'Cláusulas ambientais padrão para inclusão em editais de licitação.',
    tags: ['Governança', 'Jurídico']
  }
];

export default function Templates() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-3xl font-serif font-bold italic text-editorial-dark">Gerador de Documentos</h3>
          <p className="text-editorial-olive text-sm font-light uppercase tracking-widest mt-1">Modelos normativos prontos para edição.</p>
        </div>
        <button className="bg-editorial-accent text-editorial-dark px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-editorial-accent/20 flex items-center gap-2 hover:bg-white transition-all border border-editorial-border">
          <FileSignature size={18} />
          Novo Modelo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-editorial-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col group">
            <div className="mb-4 flex items-start justify-between">
              <div className="bg-editorial-sidebar p-3 rounded-xl text-editorial-secondary group-hover:text-editorial-dark group-hover:bg-editorial-active transition-colors border border-editorial-border">
                <FileText size={28} />
              </div>
              <div className="flex gap-1 flex-wrap justify-end">
                {tpl.tags.map(t => (
                  <span key={t} className="text-[9px] font-bold uppercase tracking-tight bg-editorial-sidebar text-editorial-olive px-2 py-0.5 rounded border border-editorial-border">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            
            <h4 className="font-serif font-bold italic text-editorial-dark text-lg mb-2 leading-tight group-hover:text-editorial-accent transition-colors">{tpl.title}</h4>
            <p className="text-xs text-editorial-olive font-light leading-relaxed mb-6 flex-1">
              {tpl.desc}
            </p>

            <div className="flex items-center gap-2 mt-auto">
              <button className="flex-1 bg-editorial-dark text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-editorial-olive transition-all flex items-center justify-center gap-2">
                <Download size={14} />
                Gerar com IA
              </button>
              <button className="p-3 bg-editorial-sidebar text-editorial-dark rounded-xl hover:bg-editorial-active transition-all border border-editorial-border">
                <Copy size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-editorial-sidebar border border-editorial-border rounded-3xl flex items-center gap-8 shadow-inner">
        <div className="w-16 h-16 shrink-0 bg-white rounded-2xl border border-editorial-border flex items-center justify-center text-editorial-dark shadow-md">
          <ClipboardCheck size={32} />
        </div>
        <div>
          <h4 className="font-serif font-bold italic text-editorial-dark text-xl">Customização Inteligente</h4>
          <p className="text-sm text-editorial-olive font-light leading-relaxed mt-1">
            Selecione um modelo e peça ao EcoIF no chat: "Gere a Portaria de Comissão A3P para o Campus X, com os membros Fulano, Cicrano e Beltrano". A IA preencherá os campos automaticamente baseado nos repositórios da Rede Federal.
          </p>
        </div>
      </div>
    </div>
  );
}
