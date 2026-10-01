import React from 'react';
import { X, Mic, Volume2, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VoiceCommandHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceCommandHelpModal: React.FC<VoiceCommandHelpModalProps> = ({
  isOpen,
  onClose
}) => {
  const { language, t } = useLanguage();
  if (!isOpen) return null;

  const englishCommands = [
    { cmd: '"Next step" or "Next"', action: 'Moves to the next step and speaks the instruction' },
    { cmd: '"Previous step" or "Back"', action: 'Returns to the previous instruction' },
    { cmd: '"Repeat step" or "Read again"', action: 'Re-reads the current step loudly' },
    { cmd: '"Start timer"', action: 'Starts the step countdown timer hands-free' },
    { cmd: '"Pause timer" / "Reset timer"', action: 'Pauses or restarts the step timer' },
    { cmd: '"How much salt / butter?"', action: 'Gives accurate mathematical amount for your servings' },
    { cmd: '"I made a mistake" / "Too salty"', action: 'Opens emergency rescue diagnostic guide' },
    { cmd: '"Substitute butter / cream"', action: 'Suggests the best alternatives & ratios' }
  ];

  const teluguCommands = [
    { cmd: '"తర్వాత స్టెప్" లేదా "Next step"', action: 'తదుపరి స్టెప్‌కి వెళ్లి చదివి వినిపిస్తుంది' },
    { cmd: '"మునుపటి స్టెప్" లేదా "Back"', action: 'మునుపటి సూచనకు తిరిగి వెళ్తుంది' },
    { cmd: '"మళ్ళీ చదువు" లేదా "Repeat"', action: 'ప్రస్తుత స్టెప్‌ను స్పష్టంగా మళ్ళీ చదువుతుంది' },
    { cmd: '"టైమర్ ప్రారంభించు"', action: 'స్టెప్ టైమర్‌ను ఆన్ చేస్తుంది' },
    { cmd: '"ఉప్పు ఎంత వేయాలి?"', action: 'మీ సర్వింగ్స్‌కు సరిపడా కొలతను చెబుతుంది' },
    { cmd: '"నా వంటలో తప్పు జరిగింది"', action: 'వంటను సరిదిద్దే మార్గదర్శకత్వాన్ని ఇస్తుంది' },
    { cmd: '"వెన్న స్థానంలో ఏమి వాడాలి?"', action: 'ఉత్తమ ప్రత్యామ్నాయాలను వివరిస్తుంది' }
  ];

  const commands = language === 'te' ? teluguCommands : englishCommands;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="voice-commands-help-card"
        className="glass-modal rounded-3xl shadow-[0_16px_48px_0_rgba(31,38,135,0.15)] max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden border border-white/80 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600/90 to-amber-600/90 backdrop-blur-md px-6 py-4.5 text-white flex items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/40 shadow-inner">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                {t.voiceCommandsHelp}
              </h3>
              <p className="text-xs text-orange-100/90">
                Hands-free voice control while your hands are busy cooking
              </p>
            </div>
          </div>

          <button
            id="voice-help-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Commands List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1 bg-white/30 backdrop-blur-xs">
          <p className="text-xs text-amber-950 bg-amber-500/15 p-3.5 rounded-2xl border border-amber-300/50 leading-relaxed font-medium">
            🎙️ <strong>How to use:</strong> In <em>"Cook With Me"</em> mode or using the AI Chef drawer, tap the microphone and speak naturally.
          </p>

          <div className="space-y-2.5 pt-1">
            {commands.map((c, idx) => (
              <div key={idx} className="bg-white/70 rounded-2xl p-3.5 border border-white/80 flex items-start gap-3 shadow-2xs backdrop-blur-xs">
                <div className="w-7 h-7 rounded-xl bg-orange-500/15 text-orange-800 flex items-center justify-center shrink-0 mt-0.5 border border-orange-300/40">
                  <Volume2 className="w-3.5 h-3.5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-bold font-mono text-amber-950">
                    {c.cmd}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
                    {c.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white/50 border-t border-white/60 text-center backdrop-blur-xs">
          <button
            id="voice-help-got-it-btn"
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all border border-white/30 active:scale-98"
          >
            Got it, Let's Cook!
          </button>
        </div>
      </div>
    </div>
  );
};
