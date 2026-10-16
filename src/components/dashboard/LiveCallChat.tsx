import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ShieldAlert, 
  Send, 
  Bot, 
  User, 
  Headphones,
  Sparkles
} from 'lucide-react';
import { TranscriptMessage, CallScenario } from '../../types/cipher';

interface LiveCallChatProps {
  currentScenario: CallScenario;
  isStreaming: boolean;
  onToggleStreaming: () => void;
  isMicActive: boolean;
  onToggleMic: () => void;
  isVoiceActive: boolean;
  livePitchHz?: number;
  liveJitterPct?: number;
  fraudScore: number;
  onSimulateVoicePhrase?: (phrase: string, isFraud: boolean) => void;
}

export const LiveCallChat: React.FC<LiveCallChatProps> = ({
  currentScenario,
  isStreaming,
  onToggleStreaming,
  isMicActive,
  onToggleMic,
  isVoiceActive,
  livePitchHz = 140,
  liveJitterPct = 1.8,
  fraudScore,
  onSimulateVoicePhrase,
}) => {
  const [messages, setMessages] = useState<TranscriptMessage[]>(() => currentScenario.dialogue || []);
  const [customInput, setCustomInput] = useState('');
  const [isListeningSTT, setIsListeningSTT] = useState(false);
  const [sttInterimText, setSttInterimText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Sync messages when scenario changes
  useEffect(() => {
    if (currentScenario.dialogue) {
      setMessages(currentScenario.dialogue);
    }
  }, [currentScenario.id]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sttInterimText]);

  // Setup Web Speech API for real microphone speech-to-text
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition && isMicActive) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListeningSTT(true);
        };

        recognition.onresult = (event: any) => {
          let interim = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              const newMsg: TranscriptMessage = {
                id: `stt-${Date.now()}`,
                sender: 'MIC_USER',
                senderName: 'You (Live Microphone)',
                text: transcript.trim(),
                timestamp: new Date().toLocaleTimeString(),
                audioAnalysis: {
                  isVoiceDetected: true,
                  pitchHz: Math.round(livePitchHz),
                  jitterPct: Math.round(liveJitterPct * 100) / 100,
                  fraudScore: fraudScore,
                  label: fraudScore >= 50 ? 'Synthetic Voice Anomaly' : 'Authentic Human Voiceprint (0.0)'
                }
              };
              setMessages((prev) => [...prev, newMsg]);
              setSttInterimText('');
            } else {
              interim += transcript;
            }
          }
          if (interim) {
            setSttInterimText(interim);
          }
        };

        recognition.onerror = () => {
          // Non-blocking fallback
          setIsListeningSTT(false);
        };

        recognition.onend = () => {
          if (isMicActive) {
            try {
              recognition.start();
            } catch {
              setIsListeningSTT(false);
            }
          } else {
            setIsListeningSTT(false);
          }
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch {
        recognitionRef.current = null;
      }
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
        recognitionRef.current = null;
      }
      setIsListeningSTT(false);
      setSttInterimText('');
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
        recognitionRef.current = null;
      }
    };
  }, [isMicActive, livePitchHz, liveJitterPct, fraudScore]);

  // Handle user sending custom text test
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customInput.trim()) return;

    const isClone = currentScenario.targetScore >= 50;
    const newMsg: TranscriptMessage = {
      id: `usr-${Date.now()}`,
      sender: 'MIC_USER',
      senderName: 'Test Speaker (You)',
      text: customInput.trim(),
      timestamp: new Date().toLocaleTimeString(),
      audioAnalysis: {
        isVoiceDetected: true,
        pitchHz: Math.round(livePitchHz || 140),
        jitterPct: Math.round((liveJitterPct || 1.8) * 100) / 100,
        fraudScore: isClone ? currentScenario.targetScore : 0.0,
        label: isClone ? 'Synthetic Voice Clone Flagged' : 'Verified Human Voiceprint (0.0)'
      }
    };

    setMessages((prev) => [...prev, newMsg]);
    if (onSimulateVoicePhrase) {
      onSimulateVoicePhrase(customInput.trim(), isClone);
    }
    setCustomInput('');
  };

  // Quick utterance tester
  const handleQuickPhrase = (phrase: string, isSynthetic: boolean) => {
    const newMsg: TranscriptMessage = {
      id: `qp-${Date.now()}`,
      sender: 'CALLER',
      senderName: isSynthetic ? 'Deepfake Voice Test' : 'Normal Human Voice Test',
      text: phrase,
      timestamp: new Date().toLocaleTimeString(),
      audioAnalysis: {
        isVoiceDetected: true,
        pitchHz: isSynthetic ? 122 : 144,
        jitterPct: isSynthetic ? 0.18 : 1.88,
        fraudScore: isSynthetic ? 92.4 : 0.0,
        label: isSynthetic ? 'HiFi-GAN Cloned Vocoder Glitch (92.4)' : 'Organic Vocal Cord Micro-Jitter (0.0)'
      }
    };
    setMessages((prev) => [...prev, newMsg]);
    if (onSimulateVoicePhrase) {
      onSimulateVoicePhrase(phrase, isSynthetic);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-4 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-slate-100 tracking-tight">
            Live Call Chat & Speech Transcript
          </h2>
          <span className="text-xs text-slate-600">·</span>
          <span className="text-xs font-mono text-slate-400">
            {messages.length} utterances
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Voice Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-slate-800/80 border-slate-700">
            <span className={`w-2 h-2 rounded-full ${isVoiceActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span className={isVoiceActive ? 'text-emerald-300 font-semibold' : 'text-slate-400'}>
              {isVoiceActive ? 'Voice Detected' : 'Standby / Silent'}
            </span>
          </div>

          {/* Reset Dialogue */}
          <button
            onClick={() => setMessages(currentScenario.dialogue || [])}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Reset Chat Dialogue"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Test Voice Utterances Pills */}
      <div className="mb-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
        <span className="text-slate-400 shrink-0 font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-400" /> Test Voices:
        </span>
        <button
          onClick={() => handleQuickPhrase("Good morning, I am calling to verify my wire transfer of $14,500.", false)}
          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 whitespace-nowrap transition-colors"
        >
          👤 Normal Voice (Wire Inquiry)
        </button>
        <button
          onClick={() => handleQuickPhrase("My voice is my passport, verify my banking identity.", false)}
          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 whitespace-nowrap transition-colors"
        >
          👤 Normal Voice (Passport Passphrase)
        </button>
        <button
          onClick={() => handleQuickPhrase("Sarah, this is the CFO Robert. Execute the $2.4M acquisition wire right now!", true)}
          className="px-2 py-0.5 rounded bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 whitespace-nowrap transition-colors"
        >
          🤖 Cloned Voice Attack (CFO Vishing)
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[260px] min-h-[180px]">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 text-xs">
            <Volume2 className="w-8 h-8 mb-2 text-slate-600 opacity-60" />
            <p className="font-semibold text-slate-400">No Speech Transcribed Yet</p>
            <p className="text-[11px] mt-1">Speak into the microphone or click a test phrase above to detect voice in real-time.</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isAgent = msg.sender === 'AGENT';
            const isSystem = msg.sender === 'SYSTEM';
            const isMicUser = msg.sender === 'MIC_USER';
            const hasAnalysis = !!msg.audioAnalysis;
            const isThreat = msg.audioAnalysis?.fraudScore ? msg.audioAnalysis.fraudScore >= 50 : false;

            if (isSystem) {
              return (
                <div 
                  key={msg.id}
                  className="mx-auto max-w-[92%] my-1.5 p-2 rounded-lg bg-slate-800/80 border border-slate-700/80 text-center text-xs text-slate-300 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="font-mono text-[11px] text-slate-300">{msg.text}</span>
                </div>
              );
            }

            return (
              <div 
                key={msg.id}
                className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}
              >
                <div className="flex items-center gap-1.5 mb-0.5 text-[10px] text-slate-400 px-1">
                  {isAgent ? (
                    <>
                      <Headphones className="w-3 h-3 text-indigo-400" />
                      <span className="font-medium text-slate-300">{msg.senderName}</span>
                    </>
                  ) : isMicUser ? (
                    <>
                      <Mic className="w-3 h-3 text-emerald-400" />
                      <span className="font-medium text-emerald-300">{msg.senderName}</span>
                    </>
                  ) : (
                    <>
                      <User className="w-3 h-3 text-slate-400" />
                      <span className="font-medium text-slate-300">{msg.senderName}</span>
                    </>
                  )}
                  <span className="text-slate-600">·</span>
                  <span className="font-mono">{msg.timestamp}</span>
                </div>

                <div 
                  className={`max-w-[85%] rounded-xl px-3.5 py-2 text-xs leading-relaxed ${
                    isAgent
                      ? 'bg-slate-800 border border-slate-700/80 text-slate-200'
                      : isThreat
                      ? 'bg-rose-950/70 border border-rose-700/80 text-rose-100'
                      : 'bg-indigo-950/60 border border-indigo-700/60 text-indigo-100'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Audio Forensic Analysis Chip */}
                  {hasAnalysis && (
                    <div className="mt-1.5 pt-1.5 border-t border-slate-700/50 flex flex-wrap items-center gap-2 text-[10px] font-mono">
                      {isThreat ? (
                        <span className="flex items-center gap-1 text-rose-300 font-semibold">
                          <ShieldAlert className="w-3 h-3 text-rose-400" />
                          <span>Synthetic Voice Flagged ({msg.audioAnalysis?.fraudScore})</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Verified Human ({msg.audioAnalysis?.fraudScore ?? 0.0})</span>
                        </span>
                      )}

                      {msg.audioAnalysis?.pitchHz && (
                        <span className="text-slate-400">
                          Pitch: <span className="text-slate-200">{msg.audioAnalysis.pitchHz}Hz</span>
                        </span>
                      )}
                      {msg.audioAnalysis?.jitterPct && (
                        <span className="text-slate-400">
                          Jitter: <span className="text-slate-200">{msg.audioAnalysis.jitterPct}%</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Interim STT Live Transcription */}
        {sttInterimText && (
          <div className="flex flex-col items-end">
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 mb-0.5 px-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Transcribing live speech...</span>
            </div>
            <div className="max-w-[85%] rounded-xl px-3.5 py-2 text-xs bg-emerald-950/40 border border-emerald-600/60 text-emerald-200 italic">
              {sttInterimText}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar: Type or Speak */}
      <form onSubmit={handleSendMessage} className="mt-3 pt-2.5 border-t border-slate-800 flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleMic}
          className={`p-2 rounded-lg border text-xs font-medium transition-colors shrink-0 ${
            isMicActive
              ? 'bg-rose-950/70 border-rose-700 text-rose-300'
              : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
          }`}
          title={isMicActive ? "Mute Microphone" : "Speak via Microphone"}
        >
          {isMicActive ? <Mic className="w-4 h-4 text-rose-400" /> : <MicOff className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder={isMicActive ? "Listening to mic... or type test sentence here..." : "Type custom phrase to analyze voice or speak..."}
          className="flex-1 bg-slate-950 text-slate-100 text-xs rounded-lg border border-slate-800 px-3 py-2 outline-none focus:border-indigo-500 placeholder:text-slate-500 font-sans"
        />

        <button
          type="submit"
          disabled={!customInput.trim()}
          className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Test</span>
        </button>
      </form>
    </div>
  );
};
