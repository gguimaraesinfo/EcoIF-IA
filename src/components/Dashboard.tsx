import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { Zap, Droplets, Trash2, Users, ShoppingBag, HardHat } from 'lucide-react';

const dataConsumo = [
  { name: 'Jan', agua: 400, energia: 240, papel: 240 },
  { name: 'Fev', agua: 300, energia: 139, papel: 221 },
  { name: 'Mar', agua: 200, energia: 980, papel: 229 },
  { name: 'Abr', agua: 278, energia: 390, papel: 200 },
  { name: 'Mai', agua: 189, energia: 480, papel: 218 },
  { name: 'Jun', agua: 239, energia: 380, papel: 250 },
];

const dataResiduos = [
  { name: 'Orgânico', value: 400 },
  { name: 'Plástico', value: 300 },
  { name: 'Papel', value: 300 },
  { name: 'Metal', value: 200 },
];

const COLORS = ['#1E3A2D', '#8A9A5B', '#A3AC8E', '#D1D5C2'];

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Uso de Recursos', icon: Zap, color: 'text-editorial-dark', bg: 'bg-editorial-sidebar', val: '-12%' },
          { label: 'Gestão Resíduos', icon: Trash2, color: 'text-editorial-dark', bg: 'bg-editorial-sidebar', val: '+24%' },
          { label: 'Qualid de Vida', icon: Users, color: 'text-editorial-dark', bg: 'bg-editorial-sidebar', val: '8.5' },
          { label: 'Sensibilização', icon: Users, color: 'text-editorial-dark', bg: 'bg-editorial-sidebar', val: '450h' },
          { label: 'Compras Sust.', icon: ShoppingBag, color: 'text-editorial-dark', bg: 'bg-editorial-sidebar', val: '32%' },
          { label: 'Construção', icon: HardHat, color: 'text-editorial-dark', bg: 'bg-editorial-sidebar', val: 'NC' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-editorial-border shadow-sm hover:shadow-md transition-shadow">
            <div className={stat.bg + " w-10 h-10 rounded-lg flex items-center justify-center mb-3 border border-editorial-border"}>
              <stat.icon className={stat.color} size={20} />
            </div>
            <p className="text-[10px] uppercase font-bold text-editorial-secondary mb-1">{stat.label}</p>
            <p className="text-xl font-serif font-bold italic text-editorial-dark">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Consumo Chart */}
        <div className="bg-white p-6 rounded-2xl border border-editorial-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif font-bold italic text-editorial-dark text-lg">Uso Racional de Recursos</h3>
            <select className="text-[10px] uppercase font-bold border border-editorial-border bg-editorial-sidebar rounded px-2 py-1 outline-none text-editorial-olive">
              <option>Últimos 6 meses</option>
              <option>Este ano</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataConsumo}>
                <defs>
                  <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A2D" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1E3A2D" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D1D5C2" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#5A6346', fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#5A6346', fontWeight: 600}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: '1px solid #D1D5C2', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontFamily: 'Inter'}} />
                <Area type="monotone" dataKey="agua" stroke="#1E3A2D" strokeWidth={2} fillOpacity={1} fill="url(#colorMain)" />
                <Area type="monotone" dataKey="energia" stroke="#8A9A5B" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resíduos Chart */}
        <div className="bg-white p-6 rounded-2xl border border-editorial-border shadow-sm">
          <h3 className="font-serif font-bold italic text-editorial-dark text-lg mb-6">Composição de Resíduos (Campus)</h3>
          <div className="h-64 flex">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataResiduos}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataResiduos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-1/3 flex flex-col justify-center gap-3">
              {dataResiduos.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                  <span className="text-[10px] uppercase font-bold text-editorial-olive">{d.name}</span>
                  <span className="ml-auto text-xs font-serif font-bold italic">{d.value}kg</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-editorial-dark rounded-2xl p-8 text-[#F8F9F4] relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-lg">
          <h3 className="text-3xl font-serif italic mb-4">Relatório ESG - Campus Central</h3>
          <p className="text-white/70 text-sm mb-6 leading-relaxed font-light">
            Seu campus reduziu o consumo de energia em 12% este mês após a instalação dos painéis fotovoltaicos e sensores de presença. Atinja a meta de 15% para desbloquear o selo "Campus Ouro A3P".
          </p>
          <button className="bg-editorial-accent text-editorial-dark px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg">
            Gerar PDF Completo
          </button>
        </div>
        <Leaf size={180} className="absolute -right-10 -bottom-10 text-editorial-accent opacity-10 transform -rotate-12" />
      </div>
    </div>
  );
}
