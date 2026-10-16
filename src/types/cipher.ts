export type RiskTier = 
  | 'VERIFIED_HUMAN_AUTHENTIC' 
  | 'ELEVATED_SUSPICION' 
  | 'PROBABLE_SYNTHETIC_CLONE' 
  | 'CRITICAL_VOICE_FRAUD';

export type StirShakenAttestation = 'A' | 'B' | 'C';

export interface TelephonySignals {
  jitterMs: number;
  packetLossPct: number;
  codec: string;
  latencyMs: number;
  stirShaken: StirShakenAttestation;
  cliMatchVerified: boolean;
  carrierRoute: string;
}

export interface CallMetadata {
  callId: string;
  callerPhone: string;
  callerMasked: string;
  destinationPhone: string;
  originationCountry: string;
  callDirection: 'INBOUND' | 'OUTBOUND';
  timestamp: string;
}

export interface SubModelScores {
  featureExtraction: number; // 0-100
  biometricAnalysis: number; // 0-100
  anomalyDetection: number;  // 0-100
  behavioralModeling: number; // 0-100
  telephonyPenalty: number;
}

export interface AcousticFeatureMetrics {
  spectralFlux: number;
  mfccDistance: number;
  pitchJitterPct: number;
  shimmerLocalDb: number;
  harmonicToNoiseRatioDb: number;
  phaseDiscontinuity: number;
  vocoderGlottalRegularity: number;
  speakingRateWpm: number;
  turnTakingLatencyMs: number;
}

export interface FraudScoreResult {
  score: number; // 0-100
  riskTier: RiskTier;
  isCloneDetected: boolean;
  thresholdApplied: number;
  thresholdMode?: 'STRICT_PRIORITIZE_SYNTHETIC' | 'BALANCED_STANDARD';
  falseNegativeRatePct?: number;
  syntheticRecallPct?: number;
  subModels: SubModelScores;
  metrics: AcousticFeatureMetrics;
  explainability: string[];
  recommendedAction: string;
  inferenceLatencyMs: number;
  cryptographicSignature: string;
}

export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';

export type AutomatedActionType = 
  | 'SIP_BYE_CALL_DROP'
  | 'STEP_UP_MFA'
  | 'BANKING_WIRE_FREEZE'
  | 'ANALYST_ESCALATION'
  | 'PASSIVE_RECORDING_FLAG';

export interface ThreatAlert {
  id: string;
  callId: string;
  timestamp: string;
  severity: AlertSeverity;
  fraudScore: number;
  triggerReason: string;
  callerMasked: string;
  telephonyRoute: string;
  actions: AutomatedActionType[];
  stakeholderNotified: string[];
  acknowledged: boolean;
  acknowledgedBy?: string;
  investigationNotes?: string;
}

export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'FRAUD_ANALYST' 
  | 'COMPLIANCE_OFFICER' 
  | 'TELEPHONY_AUDITOR';

export interface TranscriptMessage {
  id: string;
  sender: 'AGENT' | 'CALLER' | 'SYSTEM' | 'MIC_USER';
  senderName: string;
  text: string;
  timestamp: string;
  audioAnalysis?: {
    isVoiceDetected: boolean;
    pitchHz?: number;
    jitterPct?: number;
    fraudScore?: number;
    label?: string;
  };
}

export interface LiveVoiceAcousticFrame {
  isVoiceActive: boolean;
  rms: number;
  pitchHz: number;
  pitchJitterPct: number;
  spectralFlux: number;
  harmonicToNoiseRatioDb: number;
  shimmerLocalDb: number;
  vocoderGlottalRegularity: number;
  mfccDistance: number;
  phaseDiscontinuity: number;
  speakingRateWpm: number;
  turnTakingLatencyMs: number;
  frequencyBands: number[];
}

export interface CallScenario {
  id: string;
  name: string;
  category: 'Authentic' | 'Voice Clone' | 'Telephony Spoof' | 'Hybrid Attack';
  caller: string;
  callerMasked: string;
  description: string;
  telephony: TelephonySignals;
  metrics: AcousticFeatureMetrics;
  targetScore: number;
  simulatedAudioPcmPoints: number[];
  dialogue?: TranscriptMessage[];
}
