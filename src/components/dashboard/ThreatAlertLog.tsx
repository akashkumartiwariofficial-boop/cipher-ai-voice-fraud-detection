import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle, 
  ExternalLink, 
  Filter, 
  Zap, 
  Lock, 
  PhoneOff, 
  UserCheck 
} from 'lucide-react';
import { ThreatAlert, AlertSeverity, AutomatedActionType } from '../../types/cipher';

interface ThreatAlertLogProps {
  alerts: ThreatAlert[];
  onAcknowledgeAlert: (alertId: string) => void;
}

export const ThreatAlertLog: React.FC<ThreatAlertLogProps> = ({
  alerts,
  onAcknowledgeAlert,
}) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  const filteredAlerts = alerts.filter((alert) => {
    if (selectedSeverity === 'ALL') return true;
    return alert.severity === selectedSeverity;
  });

  const getActionIcon = (action: AutomatedActionType) => {
    switch (action) {
      case 'SIP_BYE_CALL_DROP':
        return <PhoneOff className="w-3 h-3 text-rose-400" />;
      case 'BANKING_WIRE_FREEZE':
        return <Lock className="w-3 h-3 text-amber-400" />;
      case 'STEP_UP_MFA':
        return <UserCheck className="w-3 h-3 text-blue-400" />;
      case 'ANALYST_ESCALATION':
        return <Zap className="w-3 h-3 text-purple-400" />;
      default:
        return <Zap className="w-3 h-3 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-5 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3.5">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-slate-100 tracking-tight">Threat Alert Log</h2>
          <span className="text-xs text-slate-600">·</span>
          <span className="text-xs font-mono text-slate-400 tabular-nums">
            {alerts.length} Recorded
          </span>
        </div>

        {/* Severity Filter Controls */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/80">
          {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                selectedSeverity === sev
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Feed Table / List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 min-h-[180px]">
        {filteredAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 text-xs py-10">
            <CheckCircle className="w-7 h-7 text-emerald-400/80 mb-2" />
            <span className="font-semibold text-slate-300">Zero Threat Alerts Recorded (0.0)</span>
            <span className="text-[11px] text-slate-500 mt-1">Real-time alerts will trigger automatically when a synthetic voice clone is detected</span>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isCritical = alert.severity === 'CRITICAL';
            const isHigh = alert.severity === 'HIGH';

            return (
              <div
                key={alert.id}
                className={`p-3.5 rounded-lg border transition-all text-xs ${
                  isCritical
                    ? 'bg-rose-950/30 border-rose-900/60 hover:border-rose-700/80'
                    : isHigh
                    ? 'bg-amber-950/30 border-amber-900/60 hover:border-amber-700/80'
                    : 'bg-slate-800/50 border-slate-700/60 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider ${
                        isCritical
                          ? 'bg-rose-950/70 text-rose-300 border border-rose-700/60'
                          : isHigh
                          ? 'bg-amber-950/70 text-amber-300 border border-amber-700/60'
                          : 'bg-blue-950/70 text-blue-300 border border-blue-700/60'
                      }`}
                    >
                      {alert.severity}
                    </span>
                    <span className="font-mono text-slate-300 text-[11px] tabular-nums font-medium">
                      {alert.id}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400 font-mono text-[11px] tabular-nums">
                      {alert.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono font-bold text-slate-200 tabular-nums">
                      Score {alert.fraudScore.toFixed(1)}
                    </span>
                    {!alert.acknowledged ? (
                      <button
                        onClick={() => onAcknowledgeAlert(alert.id)}
                        className="px-2.5 py-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors shadow-xs"
                      >
                        Acknowledge
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Ack
                      </span>
                    )}
                  </div>
                </div>

                {/* Reason description */}
                <div className="mt-1.5 text-slate-200 font-medium leading-relaxed">
                  {alert.triggerReason}
                </div>

                {/* Caller & Automated Actions Taken */}
                <div className="mt-2.5 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span>Target: <span className="font-mono text-slate-200 font-medium">{alert.callerMasked}</span></span>
                    <span className="text-slate-600">·</span>
                    <span className="truncate">{alert.telephonyRoute}</span>
                  </div>

                  {/* Automated Mitigation Badges */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 text-[10px]">Actions:</span>
                    <div className="flex items-center gap-1">
                      {alert.actions.map((act, i) => (
                        <div
                          key={i}
                          className="p-1 rounded bg-slate-800 border border-slate-700 shadow-xs"
                          title={act.replace(/_/g, ' ')}
                        >
                          {getActionIcon(act)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
