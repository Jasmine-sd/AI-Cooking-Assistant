import React from 'react';
import { UtensilsCrossed, Heart, Mic, Sparkles, ChefHat } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {t.appName}
              </span>
            </div>
            <p className="text-stone-400 text-sm max-w-md leading-relaxed">
              {t.heroSubtitle}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-stone-800 text-amber-400 border border-stone-700">
                <Mic className="w-3.5 h-3.5" /> Hands-Free Voice Control
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-stone-800 text-orange-400 border border-stone-700">
                <Sparkles className="w-3.5 h-3.5" /> Context-Aware AI
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-amber-400 transition-colors">
                  {t.exploreRecipes}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('what-can-i-cook')} className="hover:text-amber-400 transition-colors">
                  {t.whatCanICook}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-amber-400 transition-colors">
                  {t.dashboard}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shopping-list')} className="hover:text-amber-400 transition-colors">
                  {t.shoppingList}
                </button>
              </li>
            </ul>
          </div>

          {/* Cooking Assistant Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">
              Key Features
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li className="flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5 text-amber-500" /> Cook With Me Mode
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Mistake Recovery Assistant
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Instant Substitutions
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Dynamic Serving Math
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} AI Cooking Assistant. Crafted for food lovers everywhere.</p>
          <p className="flex items-center gap-1">
            Built with intelligence <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> and culinary passion.
          </p>
        </div>
      </div>
    </footer>
  );
};
