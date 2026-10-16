import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  Lock, 
  Server, 
  Activity, 
  AlertTriangle, 
  PhoneCall, 
  Database, 
  FileCheck, 
  CheckCircle2 
} from 'lucide-react';

export const ArchitectureViewer: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<'architecture' | 'safeguards'>('architecture');

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Header and Pill Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            CIPHER AI: Architectural Overview & Safeguards
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Engineered by Team Red Dot · Multi-signal voice verification and telephony fraud defense architecture
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setSelectedPillar('architecture')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              selectedPillar === 'architecture'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Core Architecture (Slide 3)
          </button>
          <button
            onClick={() => setSelectedPillar('safeguards')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              selectedPillar === 'safeguards'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Safeguards & Compliance (Slide 8)
          </button>
        </div>
      </div>

      {selectedPillar === 'architecture' ? (
        <div className="space-y-6">
          {/* Architecture Pipeline Flow Diagram */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xs">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Multi-Stage End-to-End Inference Pipeline</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Stage 1: Input Data */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-slate-400 font-bold mb-2">STAGE 1: INPUT INGESTION</div>
                  <h3 className="text-base font-semibold text-slate-100 mb-3">Multi-Input Ingestion</h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <PhoneCall className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                      <span><strong className="text-slate-100">Voice Recordings:</strong> Linear PCM 16-bit streams, 8kHz–16kHz telephony audio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Server className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                      <span><strong className="text-slate-100">Call Metadata:</strong> CLI, SS7 route, geolocation, session duration, direction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Activity className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                      <span><strong className="text-slate-100">Telephony Signals:</strong> RTP jitter, packet loss, codec artifacts, STIR/SHAKEN cert</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] font-mono text-slate-500">
                  Sub-5ms ingestion buffer
                </div>
              </div>

              {/* Stage 2: Core AI Processing Models */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="text-xs font-mono text-indigo-400 font-bold mb-2">STAGE 2: CORE AI ENSEMBLE</div>
                  <h3 className="text-base font-semibold text-slate-100 mb-3">Hybrid CNN-BiLSTM & 4 Forensic Models</h3>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="p-2.5 rounded bg-slate-900 border border-indigo-900/40">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-indigo-300">Hybrid CNN-BiLSTM (Triplet Loss)</span>
                        <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/80 px-1 rounded">Calibrated</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">Trained on diverse 5-generator dataset (Diffusion, ElevenLabs, RVC, Splicing) with calibrated threshold (tau_strict=0.38) eliminating False Negatives.</p>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-750">
                      <span className="font-semibold text-slate-100">1. Feature Extraction (35%)</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Spectral flux, MFCCs, neural vocoder glottal pulses, phase discontinuities.</p>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-750">
                      <span className="font-semibold text-slate-100">2. Biometric Analysis (25%)</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Speaker verification, vocal tract resonance & acoustic distance vs baseline.</p>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-750">
                      <span className="font-semibold text-slate-100">3. Anomaly & Behavioral (40%)</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">STIR/SHAKEN failure, temporal silence, turn-taking latency, LLM pacing delay.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] font-mono text-slate-500">
                  Total inference latency: ~16ms
                </div>
              </div>

              {/* Stage 3: Scoring Engine */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-slate-400 font-bold mb-2">STAGE 3: SCORING ENGINE</div>
                  <h3 className="text-base font-semibold text-slate-100 mb-3">Scoring Engine (0-100)</h3>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded bg-slate-900 border border-slate-750">
                      <div className="flex justify-between font-mono font-bold text-emerald-400">
                        <span>0 - 25</span>
                        <span>HUMAN AUTHENTIC</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Verified acoustic harmonics and carrier attestation.</p>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-750">
                      <div className="flex justify-between font-mono font-bold text-amber-400">
                        <span>26 - 49</span>
                        <span>ELEVATED SUSPICION</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Step-up challenge prompted.</p>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-amber-900/50">
                      <div className="flex justify-between font-mono font-bold text-orange-400">
                        <span>50 - 75</span>
                        <span>SYNTHETIC CLONE</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Calibrated Strict Threshold (50.0). High probability clone.</p>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-750">
                      <div className="flex justify-between font-mono font-bold text-rose-400">
                        <span>76 - 100</span>
                        <span>CRITICAL FRAUD</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Immediate SIP BYE call termination & wire freeze.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] font-mono text-slate-500">
                  Calibrated via Bayesian logistic ensemble
                </div>
              </div>

              {/* Stage 4: Alert & Automated Actions */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-slate-400 font-bold mb-2">STAGE 4: MITIGATION</div>
                  <h3 className="text-base font-semibold text-slate-100 mb-3">Detection & Actions</h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                      <span><strong className="text-slate-100">Real-Time Alerts:</strong> Dispatched to SecOps via Webhooks, PagerDuty, WebSocket</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span><strong className="text-slate-100">SIP BYE Signal:</strong> Automated hardware call disconnect before fraud executes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span><strong className="text-slate-100">Banking APIs:</strong> ISO 20022 wire hold signal (camt.056 / pacs.002 reject)</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] font-mono text-slate-500">
                  Automated containment in &lt;100ms
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Safeguards & Risk Mitigation (Slide 8) */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Privacy Measures */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <Lock className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-slate-100">1. Privacy Measures</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-slate-100 block mb-1">Multi-layered Data Encryption</strong>
                <span>AES-256-GCM envelope encryption at rest. In-transit protected via TLS 1.3 with forward secrecy.</span>
              </li>
              <li className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-slate-100 block mb-1">Strict Access Controls (RBAC)</strong>
                <span>Granular roles: Super Admin, Fraud Analyst, Compliance Officer, and Telephony Auditor.</span>
              </li>
              <li className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-slate-100 block mb-1">Detailed Audit Logging</strong>
                <span>Immutable SHA-256 chained ledger where every verification is cryptographically signed.</span>
              </li>
              <li className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-slate-100 block mb-1">PII Masking & Minimization</strong>
                <span>E.164 phone numbers masked per RFC 3966. Audio biometrics hashed; no raw voice retention.</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Security Protocols */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <Server className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-slate-100">2. Security Protocols</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-slate-100 block mb-1">Continuous Threat Monitoring</strong>
                <span>Real-time anomaly telemetry tracking new vocoder architectures (HiFi-GAN, AudioLDM, Voicebox).</span>
              </li>
              <li className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-slate-100 block mb-1">Intrusion Detection Systems (IDS/IPS)</strong>
                <span>Telecom perimeter protection detecting distributed spoofing and SIP flood attacks.</span>
              </li>
              <li className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-slate-100 block mb-1">Multi-Factor Authentication (MFA)</strong>
                <span>Hardware token requirements for any operational overrides or model weight recalibrations.</span>
              </li>
              <li className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-slate-100 block mb-1">Regular Penetration Testing</strong>
                <span>Quarterly independent adversarial red-teaming simulating state-of-the-art voice cloaking tools.</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Addressing Risks & Misuse */}
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-slate-100">3. Addressing Risks & Misuse</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-slate-100 block mb-1">Adversarial Model Defenses</strong>
                <span>Robustness against noise injection, audio compression filtering, and anti-forensic perturbation.</span>
              </li>
              <li className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-slate-100 block mb-1">Protection Against Model Poisoning</strong>
                <span>Cryptographically signed training sets and out-of-distribution drift monitors.</span>
              </li>
              <li className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-slate-100 block mb-1">Incident Response Automation</strong>
                <span>Automated step-up challenges and immediate fail-safe banking holds on suspicious accounts.</span>
              </li>
              <li className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <strong className="text-slate-100 block mb-1">Compliance Reporting</strong>
                <span>Pre-built GDPR, CCPA, and GLBA compliance export packages for external regulatory audits.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
