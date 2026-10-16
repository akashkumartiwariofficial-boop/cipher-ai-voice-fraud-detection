import React from 'react';
import { 
  Cpu, 
  Lock, 
  ShieldCheck, 
  Key, 
  Terminal, 
  Database, 
  Clock, 
  Layers,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { UserRole } from '../../types/cipher';

interface SystemStatusDisplayProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  inferenceLatencyMs: number;
}

export const SystemStatusDisplay: React.FC<SystemStatusDisplayProps> = ({
  currentRole,
  onSelectRole,
  inferenceLatencyMs,
}) => {
  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-5 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3.5">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-slate-100 tracking-tight">System Status & Safeguards</h2>
        </div>

        {/* RBAC Role Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-medium">RBAC Role:</span>
          <select
            value={currentRole}
            onChange={(e) => onSelectRole(e.target.value as UserRole)}
            className="bg-slate-800 text-slate-200 text-xs font-mono font-medium rounded-lg border border-slate-700 px-2.5 py-1 outline-none focus:border-slate-500 cursor-pointer shadow-xs"
          >
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            <option value="FRAUD_ANALYST">FRAUD_ANALYST</option>
            <option value="COMPLIANCE_OFFICER">COMPLIANCE_OFFICER</option>
            <option value="TELEPHONY_AUDITOR">TELEPHONY_AUDITOR</option>
          </select>
        </div>
      </div>

      {/* Grid of Security Safeguards & Telemetry Indicators */}
      <div className="grid grid-cols-2 gap-2.5 flex-1 text-xs">
        {/* Safeguard 1: Multi-layered Encryption */}
        <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 flex items-center gap-1.5 font-medium">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Data Encryption</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-300 font-semibold bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-700/60">
              ACTIVE
            </span>
          </div>
          <div className="mt-2.5">
            <div className="font-mono text-slate-100 text-xs font-semibold">
              AES-256-GCM / TLS 1.3
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Envelope encryption at rest · Key rotation: 18h
            </div>
          </div>
        </div>

        {/* Safeguard 2: Immutable Audit Logging */}
        <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 flex items-center gap-1.5 font-medium">
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>Audit Chain</span>
            </span>
            <span className="text-[10px] font-mono text-blue-300 font-semibold bg-blue-950/70 px-1.5 py-0.5 rounded border border-blue-700/60">
              VERIFIED
            </span>
          </div>
          <div className="mt-2.5">
            <div className="font-mono tabular-nums text-slate-100 text-xs font-semibold">
              SHA-256 Hash Chained
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Zero tamper incidents · 14,892 blocks logged
            </div>
          </div>
        </div>

        {/* Safeguard 3: Threat Monitoring & Pen Testing */}
        <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Threat Defense</span>
            </span>
            <span className="text-[10px] font-mono text-purple-300 font-semibold bg-purple-950/70 px-1.5 py-0.5 rounded border border-purple-700/60">
              PASSED
            </span>
          </div>
          <div className="mt-2.5">
            <div className="font-mono text-slate-100 text-xs font-semibold">
              Pen-Test: Grade A+
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Continuous red-team simulation · Zero CVEs
            </div>
          </div>
        </div>

        {/* Safeguard 4: Banking API Bridge (ISO 20022) */}
        <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 flex items-center gap-1.5 font-medium">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Banking Bridge</span>
            </span>
            <span className="text-[10px] font-mono text-amber-300 font-semibold bg-amber-950/70 px-1.5 py-0.5 rounded border border-amber-700/60">
              CONNECTED
            </span>
          </div>
          <div className="mt-2.5">
            <div className="font-mono text-slate-100 text-xs font-semibold">
              ISO 20022 / PSD2 SCA
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Core banking settlement hold active
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Hardware Performance Telemetry Footer */}
      <div className="mt-3.5 pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
          <div className="text-[10px] text-slate-400">Chunk Latency</div>
          <div className="font-mono font-bold text-slate-100 text-xs tabular-nums mt-0.5">
            {inferenceLatencyMs > 0 ? `${inferenceLatencyMs} ms` : '0 ms (Standby)'}
          </div>
        </div>
        <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
          <div className="text-[10px] text-slate-400">SIP SBC Status</div>
          <div className="font-mono font-bold text-emerald-400 text-xs tabular-nums mt-0.5">
            100% Nominal
          </div>
        </div>
        <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
          <div className="text-[10px] text-slate-400">PII Minimization</div>
          <div className="font-mono font-bold text-slate-100 text-xs mt-0.5">
            RFC 3966 Masked
          </div>
        </div>
      </div>
    </div>
  );
};
