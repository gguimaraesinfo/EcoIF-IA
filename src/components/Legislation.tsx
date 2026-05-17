import React, { useState, useEffect } from 'react';
import { ExternalLink, Gavel, Scale, ShieldCheck, FileSearch, RefreshCcw, CheckCircle2 } from 'lucide-react';

const laws = [
  {
    category: 'Geral',
    title: 'Constituição Federal — Art. 225',
    desc: 'Todos têm direito ao meio ambiente ecologicamente equilibrado, bem de uso comum do povo.',
    icon: Scale
  },
  {
    category: 'Resíduos',
    title: 'Lei nº 12.305/2010',
    desc: 'Política Nacional de Resíduos Sólidos (PNRS). Diretrizes para o gerenciamento de resíduos.',
    icon: FileSearch
  },
  {
    category: 'Contratações',
    title: 'Lei nº 14.133/2021',
    desc: 'Nova Lei de Licitações. Estabelece o princípio do desenvolvimento sustentável nas compras.',
    icon: Gavel
  },
  {
    category: 'Ambiental',
    title: 'Lei nº 6.938/1981',
    desc: 'Política Nacional do Meio Ambiente. Define o SISNAMA e instrumentos de preservação.',
    icon: ShieldCheck
  },
  {
    category: 'Resíduos/Adm',
    title: 'Decreto nº 10.936/2022',
    desc: 'Regulamenta a Política Nacional de Resíduos Sólidos para órgãos federais.',
    icon: FileSearch
  },
  {
    category: 'Educação',
    title: 'Lei nº 9.795/1999',
    desc: 'Política Nacional de Educação Ambiental (PNEA). Fundamental para ações educacionais nos IFs.',
    icon: BookOpenIcon
  }
];

function BookOpenIcon({ size, className }: any) {
  return <div className={className}>📖</div>; // Generic placeholder for icon consistency
}

export default function Legislation() {
  const [syncStatus, setSyncStatus] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/legislation/status');
      const data = await res.json();
      setSyncStatus(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/legislation/sync', { method: 'POST' });
      const data = await res.json();
      setSyncStatus(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-2xl border border-editorial-border shadow-sm mb-8 flex items-center justify-between">
        <div className="max-w-xl">
          <h3 className="text-3xl font-serif font-bold italic text-editorial-dark mb-2">Base Jurídica A3P</h3>
          <p className="text-editorial-olive text-sm font-light">
            Consulte as principais normas que regem a sustentabilidade na administração pública federal e nos Institutos Federais. O EcoIF monitora fontes oficiais em tempo real para garantir conformidade.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="bg-editorial-dark text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-editorial-accent hover:text-editorial-dark transition-all disabled:opacity-50"
          >
            {isSyncing ? <RefreshCcw size={14} className="animate-spin" /> : <RefreshCcw size={14} />}
            Sincronizar Fontes
          </button>
          {syncStatus && (
            <div className="flex items-center gap-1.5 text-[9px] text-editorial-secondary font-bold uppercase tracking-tight">
              <CheckCircle2 size={12} className="text-editorial-accent" />
              Sincronizado: {new Date(syncStatus.lastSync).toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {laws.map((law, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-editorial-border hover:border-editorial-dark transition-all group cursor-pointer shadow-sm hover:shadow-md">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-editorial-sidebar p-3 rounded-xl text-editorial-dark group-hover:bg-editorial-dark group-hover:text-white transition-colors border border-editorial-border">
                <law.icon size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-editorial-dark bg-editorial-active px-2 py-1 rounded border border-editorial-border">
                {law.category}
              </span>
            </div>
            <h4 className="font-serif font-bold italic text-editorial-dark text-lg mb-2 group-hover:text-editorial-accent transition-colors">{law.title}</h4>
            <p className="text-xs text-editorial-olive leading-relaxed mb-4 font-light">
              {law.desc}
            </p>
            <div className="pt-4 border-t border-editorial-border flex items-center justify-between text-[10px] text-editorial-secondary uppercase tracking-widest font-bold">
              <span>Ler na íntegra (Planalto)</span>
              <ExternalLink size={14} />
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-editorial-sidebar/50 p-6 rounded-2xl border border-dashed border-editorial-border text-center">
        <p className="text-[10px] text-editorial-olive uppercase tracking-widest font-bold">
          Dica: Você pode pedir ao EcoIF IA para interpretar qualquer uma dessas leis aplicada a um caso real do seu campus.
        </p>
      </div>
    </div>
  );
}
