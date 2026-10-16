import React, { useState } from 'react';
import { 
  Send, 
  Terminal, 
  Check, 
  Copy, 
  Code2, 
  ShieldCheck, 
  Lock, 
  Play, 
  RotateCw 
} from 'lucide-react';
import { SAMPLE_SCENARIOS } from '../../lib/sampleScenarios';
import { calculateFraudScore } from '../../lib/cipherEngine';

export const FastApiTester: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(1); // Default to ElevenLabs Clone
  const [customCallerPhone, setCustomCallerPhone] = useState<string>('+1 (415) 892-4412');
  const [stirShaken, setStirShaken] = useState<'A' | 'B' | 'C'>('B');
  const [apiKey, setApiKey] = useState<string>('cypher_live_sk_prod_99214');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [responseJson, setResponseJson] = useState<any | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const currentScenario = SAMPLE_SCENARIOS[selectedScenarioIndex];

  const handleExecuteRequest = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const telephony = {
        ...currentScenario.telephony,
        stirShaken,
      };

      const result = calculateFraudScore(currentScenario.metrics, telephony);

      // Mask PII
      const digits = customCallerPhone.replace(/\D/g, '');
      const maskedCaller = digits.length >= 10
        ? `+1 (${digits.slice(-10, -7)}) ***-${digits.slice(-4)}`
        : '***-REDACTED-***';

      const formattedResponse = {
        status: "PROCESSED",
        call_id: `CALL-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        timestamp_utc: Date.now() / 1000,
        fraud_score: result.score,
        risk_tier: result.riskTier,
        is_clone_detected: result.isCloneDetected,
        classification_calibration: {
          threshold_mode: "STRICT_PRIORITIZE_SYNTHETIC",
          decision_threshold: 50.0,
          target_false_negative_rate: "0.0%",
          synthetic_voice_recall: "99.8%",
          cost_sensitive_multiplier: "C_fn = 20 * C_fp"
        },
        recommended_action: result.recommendedAction,
        explainability: result.explainability,
        sub_model_breakdown: {
          feature_extraction_score: result.subModels.featureExtraction,
          biometric_analysis_score: result.subModels.biometricAnalysis,
          anomaly_detection_score: result.subModels.anomalyDetection,
          behavioral_modeling_score: result.subModels.behavioralModeling,
          telephony_penalty: result.subModels.telephonyPenalty,
          confidence_interval: [
            Math.max(0, result.score - 3.2),
            Math.min(100, result.score + 3.2)
          ]
        },
        telephony_analysis: {
          codec: telephony.codec,
          jitter_ms: telephony.jitterMs,
          stir_shaken: telephony.stirShaken,
          cli_match_verified: telephony.cliMatchVerified
        },
        pii_sanitized_caller: maskedCaller,
        inference_latency_ms: result.inferenceLatencyMs,
        cryptographic_signature: result.cryptographicSignature,
        encrypted_envelope: {
          cipher_algorithm: "AES-256-GCM",
          key_version: "v2.2026.04",
          iv_b64: "a8fF3mK91pD0==",
          salt_b64: "3kL90QxNmVw2==",
          ciphertext_b64: "d8E3kLp99QmZaPo10VncXqW2==",
          auth_tag_b64: "99KmZaPo10Vnc==",
          in_transit_tls: "TLS_1.3_AES_256_GCM_SHA384"
        }
      };

      setResponseJson(formattedResponse);
      setIsExecuting(false);
    }, 280);
  };

  const handleCopy = () => {
    if (!responseJson) return;
    navigator.clipboard.writeText(JSON.stringify(responseJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Title */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
          <Code2 className="w-5 h-5 text-indigo-400" />
          <span>Cipher AI: FastAPI Endpoint Console (/api/v1/verify-stream)</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Simulate secure REST API verification requests with real-time JSON responses, AES-256 encryption envelopes, and PII masking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Request Configuration */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Request Parameters
            </h2>

            {/* Scenario Preset Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Load Preset Audio Stream Scenario:
              </label>
              <select
                value={selectedScenarioIndex}
                onChange={(e) => setSelectedScenarioIndex(Number(e.target.value))}
                className="w-full bg-slate-950 text-slate-200 text-xs rounded-lg border border-slate-700/80 px-3 py-2 outline-none focus:border-indigo-500"
              >
                {SAMPLE_SCENARIOS.map((sc, i) => (
                  <option key={sc.id} value={i}>
                    {sc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Caller Phone */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Caller Phone Number (E.164):
              </label>
              <input
                type="text"
                value={customCallerPhone}
                onChange={(e) => setCustomCallerPhone(e.target.value)}
                className="w-full bg-slate-950 font-mono text-slate-200 text-xs rounded-lg border border-slate-700/80 px-3 py-2 outline-none focus:border-indigo-500"
                placeholder="+1 (415) 555-0198"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Automatic RFC 3966 PII masking applied prior to logging.
              </span>
            </div>

            {/* STIR / SHAKEN Attestation */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                STIR / SHAKEN Carrier Attestation:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['A', 'B', 'C'] as const).map((att) => (
                  <button
                    key={att}
                    onClick={() => setStirShaken(att)}
                    className={`py-1.5 px-3 rounded-lg border text-xs font-mono font-semibold transition-colors ${
                      stirShaken === att
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-xs'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    Attestation {att}
                  </button>
                ))}
              </div>
            </div>

            {/* API Key Header */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                X-CYPHER-API-Key:
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-slate-950 font-mono text-slate-200 text-xs rounded-lg border border-slate-700/80 px-3 py-2 outline-none focus:border-indigo-500"
              />
            </div>

            {/* Execute Button */}
            <button
              onClick={handleExecuteRequest}
              disabled={isExecuting}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-xs disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Executing Verification Pipeline...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Verification Request (POST)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Formatted JSON Response Viewer */}
        <div className="lg:col-span-7 flex flex-col rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xs">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-850 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2 font-mono text-slate-300">
              <span className="text-emerald-400 font-semibold bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-700/60">200 OK</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Content-Type: application/json</span>
            </div>

            {responseJson && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            )}
          </div>

          {/* Response Body */}
          <div className="p-4 overflow-x-auto max-h-[580px] font-mono text-xs leading-relaxed text-slate-200 bg-slate-950">
            {responseJson ? (
              <pre className="whitespace-pre">
                {JSON.stringify(responseJson, null, 2)}
              </pre>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-slate-500 text-xs">
                <Play className="w-7 h-7 text-slate-600 mb-2" />
                <span>Click "Send Verification Request" to run scoring endpoint</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
