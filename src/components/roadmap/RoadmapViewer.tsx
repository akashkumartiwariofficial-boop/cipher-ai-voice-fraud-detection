import React from 'react';
import { 
  Milestone, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Globe2, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  Calendar 
} from 'lucide-react';

export const RoadmapViewer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-8">
      {/* Title */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
          <Milestone className="w-5 h-5 text-indigo-400" />
          <span>Cipher AI: Deployment Pathway & Future Roadmap</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Cipher AI rollout schedule: From initial beta validation to global core banking ecosystem integration.
        </p>
      </div>

      {/* 4 Phases Pathway Grid (Slide 9) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Phase 1 */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between shadow-xs">
          <div>
            <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Phase 1 · Completed</span>
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">
              Beta Testing & Validation
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>Pilot programs with selected early adopters & fintech testbeds.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>Collect telemetry on detection accuracy, FAR/FRR, and packet latency.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>Refine feature extractor and vocoder artifacts on in-the-wild audio datasets.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
            Milestone: 99.4% detection accuracy
          </div>
        </div>

        {/* Phase 2 */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between shadow-xs">
          <div>
            <div className="text-[11px] font-mono text-blue-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span>Phase 2 · Active</span>
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">
              Pilot Deployments & Refinement
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                <span>Launch in controlled production carrier & telephony environments.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                <span>Integrate with partner networks (Twilio, Bandwidth, Cisco SBC).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                <span>Enhance system resilience, hardware fault-tolerance, and zero-trust security.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
            Target: 50,000 live streams/day
          </div>
        </div>

        {/* Phase 3 */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between shadow-xs">
          <div>
            <div className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>Phase 3 · In Progress</span>
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">
              Banking APIs & Ecosystems
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>Develop secure APIs for tier-1 financial institution integration.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>Authenticate high-value transactions using real-time voice verification.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>Establish ISO 20022 fraud holds and Open Banking PSD2 dynamic linking standards.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
            Target: $0 wire fraud loss guarantee
          </div>
        </div>

        {/* Phase 4 */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between shadow-xs">
          <div>
            <div className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              <span>Phase 4 · Upcoming</span>
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">
              Global Rollout & Scaling
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>Expand system availability internationally across Europe, APAC, and Americas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>Adapt to regional regulatory frameworks (GDPR, CCPA, MAS, RBI).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>Continuous threat model updates against multimodal synthetic attacks.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
            Target: Multi-cloud edge nodes
          </div>
        </div>
      </div>

      {/* Team Red Dot Attribution (Slide 6 & Slide 2) */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-xs">
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>Cipher AI · Core Engineering Team</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-semibold">
                Team Red Dot
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Voice Cloning & Fraud Detection System Architecture
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
            <div className="font-bold text-slate-100 text-sm">Akash Kumar</div>
            <div className="text-xs text-indigo-400 font-medium mt-0.5">Team Leader & AI Architect</div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Core scoring engine design, acoustic feature extraction, and end-to-end security pipeline architecture.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
            <div className="font-bold text-slate-100 text-sm">Ashish Kumar Pandey</div>
            <div className="text-xs text-slate-300 font-medium mt-0.5">Core Team Member</div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Biometric speaker verification, vocal tract acoustic modeling, and neural vocoder detection.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
            <div className="font-bold text-slate-100 text-sm">Shubham Kumar Pandey</div>
            <div className="text-xs text-slate-300 font-medium mt-0.5">Core Team Member</div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Telephony signaling integration, STIR/SHAKEN attestation verification, and RTP transport analysis.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60">
            <div className="font-bold text-slate-100 text-sm">Sana Firdaus</div>
            <div className="text-xs text-slate-300 font-medium mt-0.5">Core Team Member</div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Cryptographic safeguards, multi-layered data encryption, immutable audit logging, and PII minimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
