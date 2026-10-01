import React from 'react';
import { ChefHat, Home, Sparkles, Check } from 'lucide-react';
import { RecipeStyle } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface StyleSelectorProps {
  currentStyle: RecipeStyle;
  onChange: (style: RecipeStyle) => void;
  restaurantNotes?: string;
  homestyleNotes?: string;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  currentStyle,
  onChange,
  restaurantNotes,
  homestyleNotes
}) => {
  const { t } = useLanguage();

  return (
    <div id="cooking-style-selector-box" className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
          Cooking Style & Complexity
        </label>
        <span className="text-[11px] text-amber-700 font-medium">
          Adapts technique & ingredient richness
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Authentic / Restaurant Style */}
        <button
          id="style-option-restaurant"
          type="button"
          onClick={() => onChange('restaurant')}
          className={`p-3.5 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
            currentStyle === 'restaurant'
              ? 'border-amber-600 bg-amber-50/70 shadow-xs ring-2 ring-amber-500/20'
              : 'border-stone-200 bg-white hover:border-stone-300'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                currentStyle === 'restaurant' ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-600'
              }`}>
                <ChefHat className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900 leading-tight">
                  {t.authenticStyle}
                </p>
                <span className="text-[10px] text-amber-800 font-semibold uppercase">
                  Traditional & Rich
                </span>
              </div>
            </div>
            {currentStyle === 'restaurant' && (
              <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
          </div>
          <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
            {restaurantNotes || 'Uses gourmet garnishes, authentic spices, and slower simmering for restaurant-grade finish.'}
          </p>
        </button>

        {/* Home Style / Available Ingredients */}
        <button
          id="style-option-homestyle"
          type="button"
          onClick={() => onChange('homestyle')}
          className={`p-3.5 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
            currentStyle === 'homestyle'
              ? 'border-orange-600 bg-orange-50/70 shadow-xs ring-2 ring-orange-500/20'
              : 'border-stone-200 bg-white hover:border-stone-300'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                currentStyle === 'homestyle' ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-600'
              }`}>
                <Home className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900 leading-tight">
                  {t.homeStyle}
                </p>
                <span className="text-[10px] text-orange-800 font-semibold uppercase">
                  Simple & Accessible
                </span>
              </div>
            </div>
            {currentStyle === 'homestyle' && (
              <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
          </div>
          <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
            {homestyleNotes || 'Optimized for pantry staples with lower prep time, easy cleanup, and everyday seasonings.'}
          </p>
        </button>
      </div>
    </div>
  );
};
