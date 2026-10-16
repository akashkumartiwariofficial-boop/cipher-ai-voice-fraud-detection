import React from 'react';
import { Play, Pause } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'architecture' | 'code' | 'api' | 'roadmap';
  setActiveTab: (tab: 'dashboard' | 'architecture' | 'code' | 'api' | 'roadmap') => void;
  isStreaming: boolean;
  onToggleStreaming: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isStreaming,
  onToggleStreaming,
}) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
      {/* Wordmark: Cipher AI */}
      <div className="flex items-center shrink-0">
        <a 
          href="#dashboard"
          onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-white whitespace-nowrap group"
        >
          <span>Cipher AI</span>
          <span className="text-[10px] uppercase font-mono font-semibold tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/80">
            Voice Defense
          </span>
        </a>
      </div>

      {/* Navigation links */}
      <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`whitespace-nowrap transition-colors py-1 ${
            activeTab === 'dashboard'
              ? 'text-white font-semibold border-b-2 border-indigo-400'
              : 'hover:text-slate-200'
          }`}
        >
          Live Monitor
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`whitespace-nowrap transition-colors py-1 ${
            activeTab === 'architecture'
              ? 'text-white font-semibold border-b-2 border-indigo-400'
              : 'hover:text-slate-200'
          }`}
        >
          System Architecture
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`whitespace-nowrap transition-colors py-1 ${
            activeTab === 'code'
              ? 'text-white font-semibold border-b-2 border-indigo-400'
              : 'hover:text-slate-200'
          }`}
        >
          Python Backend Code
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`whitespace-nowrap transition-colors py-1 ${
            activeTab === 'api'
              ? 'text-white font-semibold border-b-2 border-indigo-400'
              : 'hover:text-slate-200'
          }`}
        >
          FastAPI Playground
        </button>
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`whitespace-nowrap transition-colors py-1 ${
            activeTab === 'roadmap'
              ? 'text-white font-semibold border-b-2 border-indigo-400'
              : 'hover:text-slate-200'
          }`}
        >
          Deployment Roadmap
        </button>
      </nav>

      {/* Primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleStreaming}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shadow-xs ${
            isStreaming
              ? 'bg-amber-950/50 text-amber-300 border border-amber-700/60 hover:bg-amber-900/40'
              : 'bg-white text-slate-900 hover:bg-slate-100'
          }`}
        >
          {isStreaming ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause Ingestion</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Ingestion</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
