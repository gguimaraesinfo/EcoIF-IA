import React, { useState } from 'react';
import { 
  Leaf, 
  MessageSquare, 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Settings, 
  CheckCircle2,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import Legislation from './components/Legislation';
import Templates from './components/Templates';
import Guide from './components/Guide';
import { cn } from './lib/utils';

type Tab = 'chat' | 'dashboard' | 'legislation' | 'templates' | 'guide';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'chat', label: 'EcoIF Chat', icon: MessageSquare },
    { id: 'guide', label: 'Guia de Implantação', icon: CheckCircle2 },
    { id: 'templates', label: 'Gerador de Documentos', icon: FileText },
    { id: 'dashboard', label: 'Indicadores A3P', icon: LayoutDashboard },
    { id: 'legislation', label: 'Legislação Base', icon: BookOpen },
  ];

  return (
    <div className="flex h-screen bg-editorial-bg font-sans text-editorial-dark overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-editorial-sidebar border-r border-editorial-border transition-all duration-300 flex flex-col z-50",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center gap-3 border-b border-editorial-border">
          <div className="bg-editorial-dark p-2 rounded-lg text-white shrink-0">
            <Leaf size={24} />
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
              <span className="font-serif italic font-bold text-editorial-dark text-xl tracking-tight leading-tight">EcoIF <span className="text-editorial-accent">IA</span></span>
              <span className="text-[10px] text-editorial-olive uppercase tracking-widest font-semibold">Federal Specialist</span>
            </div>
          )}
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all group",
                activeTab === item.id 
                  ? "bg-editorial-active text-editorial-dark font-medium border border-editorial-border shadow-sm" 
                  : "text-editorial-olive hover:bg-editorial-active hover:text-editorial-dark"
              )}
            >
              <item.icon size={22} className={cn(
                activeTab === item.id ? "text-editorial-dark" : "text-editorial-secondary group-hover:text-editorial-dark"
              )} />
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
              {activeTab === item.id && sidebarOpen && (
                <ChevronRight size={16} className="ml-auto opacity-50" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-100">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-3 w-full p-3 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            {sidebarOpen && <span className="text-sm">Recolher</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/50 backdrop-blur-sm border-b border-editorial-border flex items-center justify-between px-8 shrink-0">
          <h2 className="font-serif italic font-bold text-editorial-dark text-lg">
            {menuItems.find(item => item.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold text-editorial-dark uppercase tracking-widest">Agenda A3P</p>
              <p className="text-[9px] text-editorial-olive uppercase tracking-tight">Ministério do Meio Ambiente</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-editorial-active flex items-center justify-center text-editorial-dark border border-editorial-border">
              <Settings size={16} />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto h-full">
            {activeTab === 'chat' && <Chat />}
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'legislation' && <Legislation />}
            {activeTab === 'templates' && <Templates />}
            {activeTab === 'guide' && <Guide />}
          </div>
        </div>
      </main>
    </div>
  );
}
