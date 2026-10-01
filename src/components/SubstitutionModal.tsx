import React, { useState } from 'react';
import { X, Search, Sparkles, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { COMMON_SUBSTITUTIONS } from '../data/substitutionData';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface SubstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIngredient?: string;
  recipeName?: string;
}

export const SubstitutionModal: React.FC<SubstitutionModalProps> = ({
  isOpen,
  onClose,
  initialIngredient = '',
  recipeName
}) => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState(initialIngredient);
  const [customIngredient, setCustomIngredient] = useState('');
  const [aiResult, setAiResult] = useState<{
    substitute: string;
    ratio: string;
    tasteImpact: string;
    tip: string;
  } | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  if (!isOpen) return null;

  // Filter offline substitutions
  const matchedOffline = COMMON_SUBSTITUTIONS.filter(item => 
    item.ingredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    searchTerm.toLowerCase().includes(item.ingredient.toLowerCase())
  );

  const handleAskAI = async (ing: string) => {
    const target = ing || searchTerm || customIngredient;
    if (!target) return;
    setLoadingAi(true);
    try {
      const res = await api.getSubstitution(target, recipeName, language);
      setAiResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="substitution-modal-card"
        className="glass-modal rounded-3xl shadow-[0_16px_48px_0_rgba(31,38,135,0.15)] max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-white/80 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600/90 to-orange-600/90 backdrop-blur-md px-6 py-4.5 text-white flex items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/40 shadow-inner">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                {t.needSubstitutes}
              </h3>
              <p className="text-xs text-amber-100/90">
                Culinary substitutes with exact ratios & flavor notes
              </p>
            </div>
          </div>

          <button
            id="substitutes-modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-white/60 bg-white/40 backdrop-blur-xs">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="substitutes-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ingredient (e.g. Butter, Parmesan, Cream, Eggs)..."
              className="glass-input w-full pl-9 pr-24 py-2.5 text-xs rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {searchTerm && (
              <button
                id="substitutes-ask-ai-search-btn"
                onClick={() => handleAskAI(searchTerm)}
                disabled={loadingAi}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold shadow-md shadow-amber-600/20 flex items-center gap-1 transition-all border border-white/30"
              >
                <Sparkles className="w-3 h-3" />
                Ask AI
              </button>
            )}
          </div>
        </div>

        {/* Scroll Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* AI Result Card */}
          {aiResult && (
            <div className="bg-amber-500/10 border border-amber-300/60 backdrop-blur-md rounded-3xl p-5 space-y-2.5 shadow-2xs animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>AI Culinary Recommendation for "{searchTerm || customIngredient}"</span>
              </div>
              <div className="bg-white/80 p-4 rounded-2xl border border-white/80 space-y-2 text-xs shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{aiResult.substitute}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-300/50 text-amber-950 text-[11px] font-bold">
                    Ratio: {aiResult.ratio}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">{aiResult.tasteImpact}</p>
                <p className="text-amber-950 text-[11px] font-medium bg-amber-500/15 border border-amber-300/40 p-2.5 rounded-xl">
                  👨‍🍳 Chef Tip: {aiResult.tip}
                </p>
              </div>
            </div>
          )}

          {/* Offline Presets */}
          {matchedOffline.length > 0 ? (
            <div className="space-y-4">
              {matchedOffline.map((item) => (
                <div key={item.ingredient} className="glass-panel rounded-3xl p-4.5 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900">
                      Substitutes for <span className="text-amber-700 font-extrabold">{item.ingredient}</span>
                    </h4>
                    <span className="text-[11px] text-slate-600 font-semibold px-2.5 py-0.5 bg-white/70 border border-white/80 rounded-full shadow-2xs">
                      {item.category}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {item.alternatives.map((alt, idx) => (
                      <div key={idx} className="bg-white/70 rounded-2xl p-3 border border-white/80 space-y-1.5 text-xs shadow-2xs backdrop-blur-xs">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-slate-900">{alt.name}</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-300/50 text-amber-950 font-bold text-[10px] shrink-0">
                            {alt.ratio}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {alt.dietary.map(d => (
                            <span key={d} className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-950 border border-emerald-300/50 font-semibold">
                              {d}
                            </span>
                          ))}
                        </div>
                        <p className="text-slate-700 text-[11px] leading-relaxed">
                          {alt.flavorImpact}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Best for: {alt.bestFor}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 space-y-3">
              <p className="text-xs text-slate-500">
                No offline database matches for "{searchTerm}".
              </p>
              <button
                type="button"
                onClick={() => handleAskAI(searchTerm)}
                disabled={loadingAi}
                className="px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 inline-flex items-center gap-1.5 transition-all border border-white/30 active:scale-98"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask AI Chef for "{searchTerm}" Substitutes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
