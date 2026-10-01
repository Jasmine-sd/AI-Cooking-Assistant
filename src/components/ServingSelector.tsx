import React, { useState } from 'react';
import { Users, Plus, Minus, Scale } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServingSelectorProps {
  currentServings: number;
  baseServings: number;
  onChange: (servings: number) => void;
}

export const ServingSelector: React.FC<ServingSelectorProps> = ({
  currentServings,
  baseServings,
  onChange
}) => {
  const { t } = useLanguage();
  const [isCustom, setIsCustom] = useState(false);
  const presets = [2, 4, 6, 8];

  const handlePreset = (num: number) => {
    setIsCustom(false);
    onChange(num);
  };

  const handleIncrement = () => {
    if (currentServings < 24) {
      onChange(currentServings + 1);
    }
  };

  const handleDecrement = () => {
    if (currentServings > 1) {
      onChange(currentServings - 1);
    }
  };

  const multiplier = Math.round((currentServings / baseServings) * 100) / 100;

  return (
    <div id="serving-selector-box" className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-900">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-950 flex items-center gap-1.5">
              <span>{t.servings} / {t.people}</span>
            </h4>
            <p className="text-[11px] text-amber-700">
              Ingredient quantities scale automatically
            </p>
          </div>
        </div>

        {/* Multiplier Tag */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-xs font-bold text-amber-900 shadow-xs border border-amber-200">
          <Scale className="w-3.5 h-3.5 text-amber-600" />
          <span>{multiplier}x scale</span>
        </div>
      </div>

      {/* Preset Pills + Stepper */}
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        <div className="grid grid-cols-4 gap-1.5 flex-1">
          {presets.map((num) => {
            const isSelected = currentServings === num && !isCustom;
            return (
              <button
                key={num}
                id={`serving-preset-btn-${num}`}
                type="button"
                onClick={() => handlePreset(num)}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white text-stone-700 hover:bg-amber-100/60 border border-stone-200'
                }`}
              >
                {num} {t.people}
              </button>
            );
          })}
        </div>

        {/* Custom Stepper */}
        <div className="flex items-center bg-white border border-stone-200 rounded-xl p-1 shadow-xs">
          <button
            id="serving-decrement-btn"
            type="button"
            onClick={handleDecrement}
            disabled={currentServings <= 1}
            className="w-7 h-7 rounded-lg text-stone-700 hover:bg-stone-100 disabled:opacity-30 flex items-center justify-center transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          
          <span className="w-10 text-center font-extrabold text-sm text-stone-900">
            {currentServings}
          </span>

          <button
            id="serving-increment-btn"
            type="button"
            onClick={handleIncrement}
            disabled={currentServings >= 24}
            className="w-7 h-7 rounded-lg text-stone-700 hover:bg-stone-100 disabled:opacity-30 flex items-center justify-center transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
