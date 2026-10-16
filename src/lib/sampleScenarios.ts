import { CallScenario } from '../types/cipher';

export const SAMPLE_SCENARIOS: CallScenario[] = [
  {
    id: 'scenario-authentic-customer',
    name: 'Verified Customer: Standard Wire Authorization',
    category: 'Authentic',
    caller: '+1 (415) 892-4412',
    callerMasked: '+1 (415) ***-4412',
    description: 'Natural human speaker with natural vocal micro-tremors, organic breathing pause distribution, and cryptographic STIR/SHAKEN A attestation.',
    telephony: {
      jitterMs: 8.4,
      packetLossPct: 0.1,
      codec: 'Opus Wideband (16kHz)',
      latencyMs: 34.0,
      stirShaken: 'A',
      cliMatchVerified: true,
      carrierRoute: 'AT&T IPX-PrimaryDirect'
    },
    metrics: {
      spectralFlux: 0.28,
      mfccDistance: 0.18,
      pitchJitterPct: 1.84, // Natural biological pitch tremor
      shimmerLocalDb: 0.42,
      harmonicToNoiseRatioDb: 24.2,
      phaseDiscontinuity: 0.12,
      vocoderGlottalRegularity: 0.76, // Natural human glottal variance
      speakingRateWpm: 142.0,
      turnTakingLatencyMs: 380.0
    },
    targetScore: 0.0,
    simulatedAudioPcmPoints: [12, 28, 45, 60, 48, 30, -15, -42, -58, -35, -10, 18, 40, 52, 38, 12, -22, -48, -40, -15, 8, 25, 34, 18, -12],
    dialogue: [
      {
        id: 'auth-1',
        sender: 'AGENT',
        senderName: 'Apex Bank Agent (Maya)',
        text: 'Thank you for calling Apex Banking Premier Services. My name is Maya, how may I assist you today?',
        timestamp: '10:14:02'
      },
      {
        id: 'auth-2',
        sender: 'CALLER',
        senderName: 'Customer (David Miller)',
        text: 'Good morning Maya! I called to verify an international wire authorization of $14,500 that was initiated from my business checking account.',
        timestamp: '10:14:06',
        audioAnalysis: {
          isVoiceDetected: true,
          pitchHz: 138,
          jitterPct: 1.84,
          fraudScore: 0.0,
          label: 'Organic Voiceprint Verified'
        }
      },
      {
        id: 'auth-3',
        sender: 'AGENT',
        senderName: 'Apex Bank Agent (Maya)',
        text: 'Certainly Mr. Miller. I see the pending outbound wire. May I confirm the last 4 digits of your beneficiary account?',
        timestamp: '10:14:12'
      },
      {
        id: 'auth-4',
        sender: 'CALLER',
        senderName: 'Customer (David Miller)',
        text: 'Yes, it ends in 4412 for Swiss Engineering Partners. I am in the airport right now so just wanted to make sure it clears before boarding.',
        timestamp: '10:14:18',
        audioAnalysis: {
          isVoiceDetected: true,
          pitchHz: 142,
          jitterPct: 1.92,
          fraudScore: 0.0,
          label: 'Verified Human Micro-Tremors'
        }
      },
      {
        id: 'auth-5',
        sender: 'SYSTEM',
        senderName: 'Cipher AI Voice Guard',
        text: 'Continuous Acoustic Verification: 0.0 Fraud Score · Organic respiration intervals & biometric vocal tract verified · Attestation A validated.',
        timestamp: '10:14:22'
      }
    ]
  },
  {
    id: 'scenario-elevenlabs-clone',
    name: 'Deepfake Executive: ElevenLabs Cloned Voice (CFO Vishing)',
    category: 'Voice Clone',
    caller: '+1 (212) 555-8831',
    callerMasked: '+1 (212) ***-8831',
    description: 'Neural vocoder synthesis attempting urgent multi-million corporate wire transfer. Neural HiFi-GAN artifacts and unnaturally low pitch jitter.',
    telephony: {
      jitterMs: 14.2,
      packetLossPct: 0.4,
      codec: 'G.711 u-Law (8kHz)',
      latencyMs: 58.0,
      stirShaken: 'B',
      cliMatchVerified: false,
      carrierRoute: 'Twilio-SIP-Forwarded'
    },
    metrics: {
      spectralFlux: 0.84,
      mfccDistance: 0.74,
      pitchJitterPct: 0.18, // Unnatural robotic pitch smoothness (cloning deadpan)
      shimmerLocalDb: 0.12,
      harmonicToNoiseRatioDb: 31.8,
      phaseDiscontinuity: 0.91, // High-frequency phase mismatch
      vocoderGlottalRegularity: 0.98, // Synthetic glottal repetition
      speakingRateWpm: 158.0,
      turnTakingLatencyMs: 1650.0 // LLM generation latency delay
    },
    targetScore: 92.4,
    simulatedAudioPcmPoints: [45, 82, 95, 88, 70, 30, -40, -85, -98, -80, -35, 30, 78, 92, 80, 45, -30, -75, -90, -70, 10, 60, 85, 75, 20],
    dialogue: [
      {
        id: 'clone-1',
        sender: 'AGENT',
        senderName: 'Apex Treasury Desk (Sarah)',
        text: 'Corporate Treasury Operations, Sarah speaking. How may I direct your call?',
        timestamp: '14:22:10'
      },
      {
        id: 'clone-2',
        sender: 'CALLER',
        senderName: 'Deepfake Impersonator (CFO Voice)',
        text: 'Sarah, this is Robert Sterling, Group CFO. We are in the middle of closing the Tokyo acquisition and need an emergency wire of $2,400,000 executed immediately.',
        timestamp: '14:22:16',
        audioAnalysis: {
          isVoiceDetected: true,
          pitchHz: 124,
          jitterPct: 0.18,
          fraudScore: 92.4,
          label: 'CRITICAL: Neural Vocoder HiFi-GAN Glitch'
        }
      },
      {
        id: 'clone-3',
        sender: 'AGENT',
        senderName: 'Apex Treasury Desk (Sarah)',
        text: 'Good afternoon Mr. Sterling. Any transfer exceeding $1,000,000 requires two-party digital token approval inside our treasury vault portal.',
        timestamp: '14:22:24'
      },
      {
        id: 'clone-4',
        sender: 'CALLER',
        senderName: 'Deepfake Impersonator (CFO Voice)',
        text: 'I am on an encrypted satellite uplink, portal access is locked! Authorize the wire right now under my executive authority or our contract is void!',
        timestamp: '14:22:31',
        audioAnalysis: {
          isVoiceDetected: true,
          pitchHz: 125,
          jitterPct: 0.16,
          fraudScore: 95.8,
          label: 'CRITICAL: Synthetic Phase Discontinuity & Low Jitter'
        }
      },
      {
        id: 'clone-5',
        sender: 'SYSTEM',
        senderName: 'Cipher AI Voice Guard',
        text: 'THREAT INTERCEPTED: ElevenLabs Neural Voice Clone flagged (92.4 / 100). SIP-BYE call disconnect triggered. Outbound wire frozen.',
        timestamp: '14:22:33'
      }
    ]
  },
  {
    id: 'scenario-stir-shaken-spoof',
    name: 'Telecom PBX Spoofing: CLI Injection with Acoustic Mismatch',
    category: 'Telephony Spoof',
    caller: '+1 (800) 432-1000',
    callerMasked: '+1 (800) ***-1000',
    description: 'Caller ID fakes tier-1 bank helpdesk number. Telecom gateway flags STIR/SHAKEN Attestation C and out-of-band SIP header anomalies.',
    telephony: {
      jitterMs: 38.6,
      packetLossPct: 2.8,
      codec: 'G.729 Narrowband',
      latencyMs: 142.0,
      stirShaken: 'C', // Failed attestation
      cliMatchVerified: false,
      carrierRoute: 'Offshore-VoIP-Aggregator'
    },
    metrics: {
      spectralFlux: 0.65,
      mfccDistance: 0.58,
      pitchJitterPct: 0.62,
      shimmerLocalDb: 0.78,
      harmonicToNoiseRatioDb: 18.2,
      phaseDiscontinuity: 0.72,
      vocoderGlottalRegularity: 0.92,
      speakingRateWpm: 135.0,
      turnTakingLatencyMs: 950.0
    },
    targetScore: 78.8,
    simulatedAudioPcmPoints: [20, 45, 68, 72, 50, 15, -28, -60, -75, -55, -20, 15, 55, 65, 48, 10, -25, -62, -70, -45, -5, 35, 58, 42, 12],
    dialogue: [
      {
        id: 'spoof-1',
        sender: 'AGENT',
        senderName: 'Apex Fraud Security Desk (David)',
        text: 'Apex Banking Fraud Prevention Desk, David speaking. How may I verify your identity?',
        timestamp: '16:05:01'
      },
      {
        id: 'spoof-2',
        sender: 'CALLER',
        senderName: 'Spoofed Caller (CLI +1 800-432-1000)',
        text: 'Yes David, I received an SMS about suspicious debit card activity, so I am calling back your official customer support number directly.',
        timestamp: '16:05:07',
        audioAnalysis: {
          isVoiceDetected: true,
          pitchHz: 155,
          jitterPct: 0.62,
          fraudScore: 78.8,
          label: 'STIR/SHAKEN Attestation C · Acoustic PBX Mismatch'
        }
      },
      {
        id: 'spoof-3',
        sender: 'SYSTEM',
        senderName: 'Cipher AI Voice Guard',
        text: 'CARRIER ALERT: Inbound CLI matches bank Toll-Free but originating IP traces to offshore VoIP proxy. STIR/SHAKEN signature failed.',
        timestamp: '16:05:12'
      }
    ]
  },
  {
    id: 'scenario-robocall-agent',
    name: 'Autonomous Voice AI Agent: High-Speed Robocall Phishing',
    category: 'Voice Clone',
    caller: '+1 (312) 774-0919',
    callerMasked: '+1 (312) ***-0919',
    description: 'Fully automated conversational AI agent phishing for one-time banking passcodes. Zero biological breath pauses and instantaneous cut-ins.',
    telephony: {
      jitterMs: 11.0,
      packetLossPct: 0.2,
      codec: 'G.711 A-Law (8kHz)',
      latencyMs: 42.0,
      stirShaken: 'B',
      cliMatchVerified: true,
      carrierRoute: 'Bandwidth.com Direct'
    },
    metrics: {
      spectralFlux: 0.79,
      mfccDistance: 0.69,
      pitchJitterPct: 0.22,
      shimmerLocalDb: 0.15,
      harmonicToNoiseRatioDb: 29.5,
      phaseDiscontinuity: 0.86,
      vocoderGlottalRegularity: 0.96,
      speakingRateWpm: 168.0,
      turnTakingLatencyMs: 85.0 // Unnatural sub-100ms cut-in
    },
    targetScore: 88.2,
    simulatedAudioPcmPoints: [30, 60, 80, 85, 65, 25, -35, -70, -88, -75, -25, 20, 65, 82, 70, 30, -30, -68, -82, -60, 5, 50, 75, 65, 25],
    dialogue: [
      {
        id: 'robo-1',
        sender: 'AGENT',
        senderName: 'Apex Customer Line (Elena)',
        text: 'Apex Card Services, Elena speaking.',
        timestamp: '11:18:03'
      },
      {
        id: 'robo-2',
        sender: 'CALLER',
        senderName: 'Robotic Conversational Agent',
        text: 'Urgent security verification required. To unlock account access, please input or speak your mobile authentication code immediately.',
        timestamp: '11:18:05',
        audioAnalysis: {
          isVoiceDetected: true,
          pitchHz: 168,
          jitterPct: 0.22,
          fraudScore: 88.2,
          label: 'Robotic Cut-In: 85ms Turn Latency · Zero Respiration'
        }
      },
      {
        id: 'robo-3',
        sender: 'SYSTEM',
        senderName: 'Cipher AI Voice Guard',
        text: 'BOT DETECTED: Latency under 100ms indicates automated conversational LLM agent. Session flagged for step-up MFA.',
        timestamp: '11:18:08'
      }
    ]
  },
  {
    id: 'scenario-spliced-hybrid',
    name: 'Audio Splicing Attack: Real Voice Concatenated with Cloned Tokens',
    category: 'Hybrid Attack',
    caller: '+1 (650) 419-7720',
    callerMasked: '+1 (650) ***-7720',
    description: 'Attacker plays authentic customer snippet for introduction, then splices AI-generated speech to read fraudulent routing numbers.',
    telephony: {
      jitterMs: 16.5,
      packetLossPct: 0.6,
      codec: 'Opus Narrowband',
      latencyMs: 64.0,
      stirShaken: 'B',
      cliMatchVerified: true,
      carrierRoute: 'Verizon Business SIP'
    },
    metrics: {
      spectralFlux: 0.88, // Spikes during splice boundary
      mfccDistance: 0.62,
      pitchJitterPct: 0.95,
      shimmerLocalDb: 0.68,
      harmonicToNoiseRatioDb: 21.0,
      phaseDiscontinuity: 0.89, // High phase glitch at splice boundary
      vocoderGlottalRegularity: 0.87,
      speakingRateWpm: 140.0,
      turnTakingLatencyMs: 510.0
    },
    targetScore: 82.6,
    simulatedAudioPcmPoints: [18, 35, 52, 60, 42, 10, -20, -45, -60, -40, -10, 65, 92, 88, 70, 25, -45, -88, -92, -65, 12, 38, 48, 32, 5],
    dialogue: [
      {
        id: 'splice-1',
        sender: 'AGENT',
        senderName: 'Apex Wire Specialist (Carlos)',
        text: 'Apex Wire Verification desk, Carlos speaking. How can I assist you?',
        timestamp: '09:41:15'
      },
      {
        id: 'splice-2',
        sender: 'CALLER',
        senderName: 'Caller (Authentic Introduction)',
        text: 'Hello Carlos, this is Jonathan Vance from Vance Logistics.',
        timestamp: '09:41:19',
        audioAnalysis: {
          isVoiceDetected: true,
          pitchHz: 135,
          jitterPct: 1.75,
          fraudScore: 12.0,
          label: 'Segment 1: Organic Human Speech'
        }
      },
      {
        id: 'splice-3',
        sender: 'CALLER',
        senderName: 'Caller (Deepfake Spliced Token)',
        text: '...please change the recipient wire routing number to zero two one zero zero zero zero two one immediately.',
        timestamp: '09:41:25',
        audioAnalysis: {
          isVoiceDetected: true,
          pitchHz: 122,
          jitterPct: 0.28,
          fraudScore: 86.4,
          label: 'Segment 2: Spliced Neural Vocoder Boundary Glitch'
        }
      },
      {
        id: 'splice-4',
        sender: 'SYSTEM',
        senderName: 'Cipher AI Voice Guard',
        text: 'HYBRID SPLICE DETECTED: Sudden spectral flux spike (0.88) and phase discontinuity (0.89) at timestamp 09:41:24. Fraud Score: 82.6.',
        timestamp: '09:41:28'
      }
    ]
  }
];
