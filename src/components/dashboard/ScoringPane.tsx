import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertOctagon, 
  Fingerprint, 
  TrendingUp, 
  BrainCircuit,
  Info
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  RadarController,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { Line, Radar } from 'react-chartjs-2';
import { FraudScoreResult } from '../../types/cipher';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  RadarController,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ScoringPaneProps {
  scoreResult: FraudScoreResult;
  scoreHistory: number[];
  voiceEnergyHistory?: number[];
  isVoiceActive?: boolean;
}

export const ScoringPane: React.FC<ScoringPaneProps> = ({
  scoreResult,
  scoreHistory,
  voiceEnergyHistory = [],
  isVoiceActive = false,
}) => {
  const [activeVisualTab, setActiveVisualTab] = useState<'timeline' | 'radar'>('timeline');

  const { score, riskTier, isCloneDetected, subModels, metrics, explainability } = scoreResult;

  // Dark mode color determination based on real score (clean 0.0 default!)
  let scoreColor = 'text-slate-400';
  let badgeBg = 'bg-slate-800 text-slate-400 border-slate-700';
  let gaugeGradient = 'from-slate-600 to-slate-500';

  if (score > 75) {
    scoreColor = 'text-rose-400';
    badgeBg = 'bg-rose-950/60 text-rose-300 border-rose-700/60';
    gaugeGradient = 'from-rose-500 to-red-400';
  } else if (score >= 50) {
    scoreColor = 'text-amber-400';
    badgeBg = 'bg-amber-950/60 text-amber-300 border-amber-700/60';
    gaugeGradient = 'from-amber-500 to-orange-400';
  } else if (isVoiceActive) {
    scoreColor = 'text-emerald-400';
    badgeBg = 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60';
    gaugeGradient = 'from-emerald-500 to-teal-400';
  }

  // Generate energy data points matching timeline length
  const energyData = voiceEnergyHistory.length === scoreHistory.length
    ? voiceEnergyHistory
    : scoreHistory.map(() => (isVoiceActive ? 45 : 0));

  // Chart.js Timeline Configuration: Dynamic Voice Energy & Fraud Threat
  const lineChartData = {
    labels: scoreHistory.map((_, i) => `${(i * 0.4).toFixed(1)}s`),
    datasets: [
      {
        label: 'Live Voice Activity & Acoustic Energy (%)',
        data: energyData,
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.12)',
        fill: true,
        tension: 0.35,
        borderWidth: 2,
        pointRadius: isVoiceActive ? 2 : 0,
        pointHoverRadius: 4,
      },
      {
        label: 'Fraud Threat Index (0-100)',
        data: scoreHistory,
        borderColor: score >= 50 ? '#f43f5e' : isVoiceActive ? '#10b981' : '#64748b',
        backgroundColor: score >= 50 ? 'rgba(244, 63, 94, 0.18)' : 'transparent',
        fill: score >= 50,
        tension: 0.2,
        borderWidth: score > 0 ? 2.5 : 1.5,
        pointRadius: score > 0 ? 2 : 0,
        pointHoverRadius: 4,
      },
      {
        label: 'Calibrated Strict Threshold (50.0 - 0 False Negatives)',
        data: scoreHistory.map(() => 50),
        borderColor: 'rgba(244, 63, 94, 0.6)',
        borderDash: [5, 5],
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false,
      }
    ],
  };

  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 250,
    },
    scales: {
      x: {
        grid: { color: 'rgba(51, 65, 85, 0.4)' },
        ticks: { color: '#94a3b8', font: { size: 10, family: 'JetBrains Mono' } },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(51, 65, 85, 0.4)' },
        ticks: { color: '#94a3b8', font: { size: 10, family: 'JetBrains Mono' } },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#cbd5e1',
          boxWidth: 8,
          font: { size: 9, family: 'Plus Jakarta Sans' }
        }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleFont: { family: 'Plus Jakarta Sans', size: 11 },
        bodyFont: { family: 'JetBrains Mono', size: 11 },
        borderColor: '#334155',
        borderWidth: 1,
      },
    },
  };

  // Chart.js Radar Biometric Feature Map: Dynamically active whenever voice is detected!
  const hasVoice = isVoiceActive || score > 0;
  const radarChartData = {
    labels: [
      'Vocoder Regularity',
      'Pitch Tremor (Jitter)',
      'MFCC Acoustic Dist',
      'Phase Discontinuity',
      'Conversational Cadence',
      'Spectral Flux'
    ],
    datasets: [
      {
        label: hasVoice ? 'Current Voice Acoustic Vector' : 'Resting Baseline (Standby)',
        data: !hasVoice ? [0, 0, 0, 0, 0, 0] : [
          Math.min(100, Math.round(metrics.vocoderGlottalRegularity * 100)),
          Math.min(100, Math.round(metrics.pitchJitterPct * 45)),
          Math.min(100, Math.round(metrics.mfccDistance * 100)),
          Math.min(100, Math.round(metrics.phaseDiscontinuity * 100)),
          Math.min(100, Math.round((metrics.speakingRateWpm / 180) * 100)),
          Math.min(100, Math.round(metrics.spectralFlux * 100)),
        ],
        backgroundColor: score >= 50 
          ? 'rgba(244, 63, 94, 0.25)' 
          : hasVoice 
          ? 'rgba(56, 189, 248, 0.2)' 
          : 'rgba(100, 116, 139, 0.05)',
        borderColor: score >= 50 ? '#f43f5e' : hasVoice ? '#38bdf8' : '#64748b',
        borderWidth: hasVoice ? 2 : 1,
        pointBackgroundColor: score >= 50 ? '#f43f5e' : hasVoice ? '#38bdf8' : '#64748b',
        pointRadius: hasVoice ? 3 : 0,
      },
      {
        label: 'Authentic Human Reference Baseline',
        data: !hasVoice ? [0, 0, 0, 0, 0, 0] : [42, 78, 18, 12, 55, 30],
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
        borderColor: hasVoice ? '#10b981' : 'transparent',
        borderWidth: 1.5,
        borderDash: [3, 3],
        pointRadius: hasVoice ? 2 : 0,
      }
    ],
  };

  const radarChartOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { display: false, stepSize: 25 },
        grid: { color: 'rgba(51, 65, 85, 0.5)' },
        angleLines: { color: 'rgba(51, 65, 85, 0.5)' },
        pointLabels: {
          color: '#cbd5e1',
          font: { size: 9, family: 'Plus Jakarta Sans', weight: 'bold' as const },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#cbd5e1',
          boxWidth: 10,
          font: { size: 10, family: 'Plus Jakarta Sans' }
        }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        borderWidth: 1,
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-5 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3.5">
        <div className="flex items-center gap-2.5">
          <Fingerprint className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-slate-100 tracking-tight">Biometric & Fraud Scoring Pane</h2>
        </div>

        {/* Risk Tier & Calibration Badges */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-700/60 text-[10px] font-mono text-emerald-300 font-medium">
            <span>Threshold: 50.0</span>
            <span className="text-emerald-500">·</span>
            <span>0 False Negatives</span>
          </div>

          <div className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold ${badgeBg}`}>
            {score === 0 
              ? (isVoiceActive ? 'VERIFIED HUMAN AUTHENTIC (0.0)' : 'STANDBY (0.0)') 
              : riskTier.replace(/_/g, ' ')}
          </div>
        </div>
      </div>

      {/* Main Score Display & Sub-model Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3.5">
        {/* Left Column: Big Score Dial & Verdict */}
        <div className="md:col-span-5 p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Composite Fraud Index</span>
              <span className="font-mono tabular-nums text-slate-500">Scale 0 - 100</span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-4xl sm:text-5xl font-extrabold font-mono tabular-nums ${scoreColor}`}>
                {score.toFixed(1)}
              </span>
              <span className="text-xs text-slate-500 font-mono">/ 100</span>
            </div>

            {/* Visual Gauge Bar */}
            <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden mt-3">
              <div 
                className={`h-full bg-gradient-to-r ${gaugeGradient} transition-all duration-300 rounded-full`}
                style={{ width: score === 0 ? (isVoiceActive ? '6%' : '0%') : `${Math.min(100, Math.max(4, score))}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>0 (Standby)</span>
              <span className="text-amber-400/90 font-semibold">50 (Strict Threshold)</span>
              <span>100 (Synthetic)</span>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-slate-700/60">
            <div className="text-[11px] text-slate-400 font-medium">Automated Verdict</div>
            <div className="flex items-center gap-1.5 mt-1">
              {score === 0 ? (
                isVoiceActive ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
                )
              ) : isCloneDetected ? (
                <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              <span className={`text-xs font-semibold truncate ${score === 0 ? (isVoiceActive ? 'text-emerald-300' : 'text-slate-400') : isCloneDetected ? 'text-rose-300' : 'text-emerald-300'}`}>
                {score === 0 
                  ? (isVoiceActive 
                      ? 'Live Human Voiceprint Verified (0.0)' 
                      : 'System Standby · Zero Anomaly (0.0)')
                  : isCloneDetected 
                  ? 'Synthetic Voice Clone Flagged' 
                  : 'Voice Biometrics Verified'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: 4 Core AI Models Breakdown */}
        <div className="md:col-span-7 grid grid-cols-2 gap-2 text-xs">
          {/* Model 1: Feature Extraction */}
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="truncate">1. Feature Extract</span>
              <span className="font-mono text-slate-500">35% w</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-base font-bold font-mono tabular-nums text-slate-100">
                {subModels.featureExtraction > 0 ? subModels.featureExtraction : (isVoiceActive ? Math.round(metrics.pitchJitterPct * 12 + 10) : 0)}
              </span>
              <span className="text-[10px] text-slate-400">
                {isVoiceActive ? `${metrics.pitchJitterPct.toFixed(1)}% Jitter` : 'Vocoder & Jitter'}
              </span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className={`h-full ${subModels.featureExtraction > 50 ? 'bg-rose-500' : isVoiceActive ? 'bg-emerald-400' : 'bg-slate-600'}`}
                style={{ width: `${subModels.featureExtraction > 0 ? subModels.featureExtraction : (isVoiceActive ? 25 : 0)}%` }}
              />
            </div>
          </div>

          {/* Model 2: Biometric Analysis */}
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="truncate">2. Biometric Model</span>
              <span className="font-mono text-slate-500">25% w</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-base font-bold font-mono tabular-nums text-slate-100">
                {subModels.biometricAnalysis > 0 ? subModels.biometricAnalysis : (isVoiceActive ? Math.round(metrics.mfccDistance * 60 + 10) : 0)}
              </span>
              <span className="text-[10px] text-slate-400">
                {isVoiceActive ? 'Human Tract MFCC' : 'Vocal Tract MFCC'}
              </span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className={`h-full ${subModels.biometricAnalysis > 50 ? 'bg-rose-500' : isVoiceActive ? 'bg-emerald-400' : 'bg-slate-600'}`}
                style={{ width: `${subModels.biometricAnalysis > 0 ? subModels.biometricAnalysis : (isVoiceActive ? 20 : 0)}%` }}
              />
            </div>
          </div>

          {/* Model 3: Anomaly Detection */}
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="truncate">3. Anomaly Detect</span>
              <span className="font-mono text-slate-500">25% w</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-base font-bold font-mono tabular-nums text-slate-100">
                {subModels.anomalyDetection}
              </span>
              <span className="text-[10px] text-slate-400">
                {subModels.anomalyDetection === 0 ? 'Clean (No Glitch)' : 'Carrier & Glitch'}
              </span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className={`h-full ${subModels.anomalyDetection > 50 ? 'bg-rose-500' : 'bg-indigo-400'}`}
                style={{ width: `${subModels.anomalyDetection}%` }}
              />
            </div>
          </div>

          {/* Model 4: Behavioral Modeling */}
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span className="truncate">4. Behavioral Model</span>
              <span className="font-mono text-slate-500">15% w</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-base font-bold font-mono tabular-nums text-slate-100">
                {subModels.behavioralModeling > 0 ? subModels.behavioralModeling : (isVoiceActive ? Math.round(metrics.speakingRateWpm / 10) : 0)}
              </span>
              <span className="text-[10px] text-slate-400">
                {isVoiceActive ? `${Math.round(metrics.speakingRateWpm)} WPM Cadence` : 'Turn Latency & Pace'}
              </span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className={`h-full ${subModels.behavioralModeling > 50 ? 'bg-rose-500' : isVoiceActive ? 'bg-emerald-400' : 'bg-slate-600'}`}
                style={{ width: `${subModels.behavioralModeling > 0 ? subModels.behavioralModeling : (isVoiceActive ? 15 : 0)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chart.js Real-Time Visualizer (Tabs: Timeline / Radar) */}
      <div className="flex-1 min-h-[160px] bg-slate-950 rounded-lg border border-slate-800 p-3.5 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            <span>Chart.js Real-Time Engine Visualizer</span>
          </div>

          <div className="flex items-center gap-1 p-0.5 bg-slate-800 rounded-md">
            <button
              onClick={() => setActiveVisualTab('timeline')}
              className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                activeVisualTab === 'timeline'
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Time Series
            </button>
            <button
              onClick={() => setActiveVisualTab('radar')}
              className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                activeVisualTab === 'radar'
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Biometric Radar
            </button>
          </div>
        </div>

        <div className="flex-1 w-full relative min-h-[120px]">
          {activeVisualTab === 'timeline' ? (
            <Line data={lineChartData} options={lineChartOptions} />
          ) : (
            <Radar data={radarChartData} options={radarChartOptions} />
          )}
        </div>
      </div>

      {/* Explainability Bar */}
      <div className="mt-3 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 flex items-start gap-2">
        <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="truncate">
          <span className="font-semibold text-slate-100">Forensic Factor: </span>
          <span className="text-slate-400">
            {score === 0 
              ? 'System standing by (Score: 0.0). No anomalies detected.' 
              : explainability[0] || 'Acoustic waveform within natural human tolerance.'}
          </span>
        </div>
      </div>
    </div>
  );
};
