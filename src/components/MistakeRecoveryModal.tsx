import React, { useState } from 'react';
import { 
  X, 
  LifeBuoy, 
  AlertTriangle, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { Recipe, RecipeStyle } from '../types';
import { api } from '../services/api';
import { voiceController } from '../utils/speech';
import { useLanguage } from '../context/LanguageContext';

interface MistakeRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe?: Recipe;
  currentStepNumber?: number;
  style?: RecipeStyle;
}

const COMMON_MISTAKES = [
  { id: 'too_salty', label: 'Too much salt', emoji: '🧂' },
  { id: 'too_spicy', label: 'Too much spice / chili', emoji: '🌶️' },
  { id: 'too_watery', label: 'Curry / sauce is too watery', emoji: '💧' },
  { id: 'too_thick', label: 'Sauce is too thick / dry', emoji: '🍯' },
  { id: 'burnt_bottom', label: 'Slightly burnt at the bottom', emoji: '🔥' },
  { id: 'too_sour', label: 'Too sour / acidic', emoji: '🍋' },
  { id: 'too_sweet', label: 'Too sweet', emoji: '🍬' },
  { id: 'too_oily', label: 'Too oily / greasy', emoji: '🛢️' },
  { id: 'overcooked_pasta_rice', label: 'Rice or pasta getting mushy', emoji: '🍚' },
  { id: 'undercooked_meat_veg', label: 'Vegetables or meat still tough', emoji: '🥩' }
];

export const MistakeRecoveryModal: React.FC<MistakeRecoveryModalProps> = ({
  isOpen,
  onClose,
  recipe,
  currentStepNumber,
  style
}) => {
  const { language, t } = useLanguage();
  const [selectedMistake, setSelectedMistake] = useState<string>(COMMON_MISTAKES[0].label);
  const [customDetails, setCustomDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<{
    explanation: string;
    steps: string[];
    warning?: string;
  } | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  const handleDiagnose = async () => {
    setLoading(true);
    try {
      const res = await api.askMistakeRecovery(
        selectedMistake,
        customDetails,
        {
          recipe,
          currentStepNumber,
          style,
          language
        }
      );
      setSolution(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = () => {
    if (!solution) return;
    if (isSpeaking) {
      voiceController.stopSpeaking();
      setIsSpeaking(false);
    } else {
      const textToSpeak = `${solution.explanation}. Step 1: ${solution.steps.join('. Step ')}`;
      voiceController.speak(
        textToSpeak,
        language,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="mistake-recovery-modal-card"
        className="glass-modal rounded-3xl shadow-[0_16px_48px_0_rgba(31,38,135,0.15)] max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-white/80 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600/90 via-orange-600/90 to-amber-600/90 backdrop-blur-md px-6 py-4.5 text-white flex items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-inner border border-white/40">
              <LifeBuoy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight flex items-center gap-2">
                <span>{t.iMadeAMistake}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 font-medium">Emergency Rescue</span>
              </h3>
              <p className="text-xs text-red-100/90">
                {recipe ? `Diagnosing ${recipe.name}` : 'Culinary troubleshooting & balance recovery'}
              </p>
            </div>
          </div>

          <button
            id="mistake-modal-close-btn"
            onClick={() => {
              voiceController.stopSpeaking();
              onClose();
            }}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Quick Select Common Mistakes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Select What Happened:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COMMON_MISTAKES.map((m) => {
                const isSelected = selectedMistake === m.label;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSelectedMistake(m.label);
                      setSolution(null);
                    }}
                    className={`p-2.5 rounded-2xl text-xs font-medium text-left border backdrop-blur-xs transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'border-red-500 bg-red-500/15 text-red-950 font-bold shadow-xs'
                        : 'border-white/80 bg-white/60 text-slate-700 hover:bg-white shadow-2xs'
                    }`}
                  >
                    <span className="text-base">{m.emoji}</span>
                    <span className="line-clamp-1">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional details input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Add Specific Details (Optional):
            </label>
            <input
              type="text"
              value={customDetails}
              onChange={(e) => setCustomDetails(e.target.value)}
              placeholder="e.g. Added 2 extra spoons of salt before the gravy reduced..."
              className="glass-input w-full px-3.5 py-2.5 text-xs rounded-2xl focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Action to Diagnose */}
          <button
            id="mistake-diagnose-btn"
            type="button"
            onClick={handleDiagnose}
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 border border-white/30 active:scale-98"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Get Recovery Action Plan</span>
              </>
            )}
          </button>

          {/* Solution Result Panel */}
          {solution && (
            <div className="bg-white/70 border border-amber-300/60 backdrop-blur-md rounded-3xl p-5 space-y-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-950">Rescue Action Plan</h4>
                    <p className="text-[11px] text-amber-700">Culinary chemistry & balance solution</p>
                  </div>
                </div>

                <button
                  id="mistake-solution-speak-btn"
                  onClick={handleSpeak}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-xs transition-colors ${
                    isSpeaking 
                      ? 'bg-red-600 text-white animate-pulse' 
                      : 'bg-white/80 text-slate-700 hover:bg-white border border-white/80 shadow-2xs'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isSpeaking ? 'Stop Voice' : 'Listen'}</span>
                </button>
              </div>

              {/* Explanation */}
              <p className="text-xs text-slate-800 bg-white/80 p-3.5 rounded-2xl border border-white/80 leading-relaxed font-medium shadow-2xs">
                💡 {solution.explanation}
              </p>

              {/* Steps */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-950">
                  Step-by-Step Fix:
                </p>
                <div className="space-y-2">
                  {solution.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-white/80 p-3 rounded-2xl border border-white/80 text-xs text-slate-800 shadow-2xs">
                      <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Warning */}
              {solution.warning && (
                <div className="flex items-start gap-2 bg-rose-500/15 border border-rose-300/50 p-3 rounded-2xl text-xs text-rose-900 font-medium backdrop-blur-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{solution.warning}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
