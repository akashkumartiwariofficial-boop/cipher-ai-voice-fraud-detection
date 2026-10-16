import React, { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  Terminal, 
  FolderTree, 
  ShieldCheck, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';
import { PYTHON_CODE_STORE, PythonFileItem } from '../../lib/pythonCodeStore';

export const PythonCodeViewer: React.FC = () => {
  const [selectedFileId, setSelectedFileId] = useState<string>(PYTHON_CODE_STORE[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const currentFile = PYTHON_CODE_STORE.find((f) => f.id === selectedFileId) || PYTHON_CODE_STORE[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <span>Cipher AI: Python Application Codebase</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Production Python modules implementing FastAPI verification service, AI scoring engine, AES-256 encryption, RBAC, and banking APIs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download {currentFile.name}</span>
          </button>
        </div>
      </div>

      {/* Code Browser Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: File Tree Navigator */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-indigo-400" />
            <span>Source Files</span>
          </div>

          <div className="space-y-1.5">
            {PYTHON_CODE_STORE.map((file) => {
              const isSelected = file.id === currentFile.id;
              return (
                <button
                  key={file.id}
                  onClick={() => setSelectedFileId(file.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-xs flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-800 border-indigo-500/70 text-white font-medium shadow-xs'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 font-mono">
                      <FileCode className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                      <span className="font-semibold">{file.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 tabular-nums">
                      {file.lines} lines
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {file.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Execution Quick Start Card */}
          <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 shadow-xs">
            <div className="font-semibold text-slate-100 mb-2">How to Run Locally:</div>
            <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
{`# 1. Install dependencies
pip install -r requirements.txt

# 2. Run FastAPI Production Server
uvicorn fastapi_app:app --host 0.0.0.0 --port 8000 --reload

# 3. Execute Pytest Test Suite
pytest test_cipher.py -v`}
            </pre>
          </div>
        </div>

        {/* Right: Code Viewer */}
        <div className="lg:col-span-8 flex flex-col rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xs">
          {/* File Tab Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-850 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2 font-mono text-slate-300">
              <span className="font-semibold text-indigo-300">{currentFile.path}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 tabular-nums">{currentFile.lines} lines</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              Python 3.11+ / FastAPI
            </div>
          </div>

          {/* Source Code Container */}
          <div className="p-4 overflow-x-auto max-h-[620px] font-mono text-xs leading-relaxed text-slate-200 bg-slate-950 select-text">
            <pre className="whitespace-pre">
              {currentFile.content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
