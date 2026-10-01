import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Plus, 
  X, 
  Check, 
  ShoppingBag, 
  ChefHat, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2,
  Filter
} from 'lucide-react';
import { Recipe, RecipeMatchResult } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface WhatCanICookViewProps {
  onSelectRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
  onNavigate: (view: string) => void;
}

const COMMON_PANTRY_STAPLES = [
  'Pasta', 'Tomato', 'Garlic', 'Onion', 'Olive Oil', 
  'Butter', 'Rice', 'Paneer', 'Chicken', 'Eggs', 
  'Potatoes', 'Black Beans', 'Ginger', 'Curd', 'Cumin', 'Tofu'
];

export const WhatCanICookView: React.FC<WhatCanICookViewProps> = ({
  onSelectRecipe,
  onStartCooking,
  onNavigate
}) => {
  const { user, updatePantry } = useAuth();
  const { t } = useLanguage();
  
  const [ingredients, setIngredients] = useState<string[]>(() => {
    return user?.pantry && user.pantry.length > 0
      ? user.pantry
      : ['Pasta', 'Tomato', 'Garlic', 'Olive Oil', 'Paneer', 'Onion'];
  });
  const [inputVal, setInputVal] = useState('');
  const [onlyWhatIHave, setOnlyWhatIHave] = useState(false);
  const [results, setResults] = useState<RecipeMatchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const fetchMatches = async (list: string[], strict: boolean) => {
    setLoading(true);
    try {
      const matchResults = await api.whatCanICook(list, strict);
      setResults(matchResults);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.pantry && user.pantry.length > 0) {
      setIngredients(user.pantry);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchMatches(ingredients, onlyWhatIHave);
  }, [ingredients, onlyWhatIHave]);

  const handleAddIngredient = (item: string) => {
    const trimmed = item.trim();
    if (!trimmed) return;
    if (!ingredients.some(i => i.toLowerCase() === trimmed.toLowerCase())) {
      const updated = [...ingredients, trimmed];
      setIngredients(updated);
      if (user) {
        updatePantry(updated);
      }
    }
    setInputVal('');
  };

  const handleRemoveIngredient = (item: string) => {
    const updated = ingredients.filter(i => i.toLowerCase() !== item.toLowerCase());
    setIngredients(updated);
    if (user) {
      updatePantry(updated);
    }
  };

  const handleClearAll = () => {
    setIngredients([]);
    if (user) {
      updatePantry([]);
    }
  };

  const handleAddMissingToShoppingList = async (recipe: Recipe, servings: number) => {
    if (!user) {
      setAddedToast('Please sign in or use demo account to manage shopping list');
      setTimeout(() => setAddedToast(null), 3000);
      return;
    }
    try {
      const added = await api.generateShoppingFromRecipe(user.id, recipe.id, servings, true);
      setAddedToast(`Added ${added.length} missing items to Shopping List!`);
      setTimeout(() => setAddedToast(null), 3500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* View Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 text-orange-950 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>Smart Pantry Matching Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.whatCanICook}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Tell us what ingredients you have in your kitchen. We'll find recipes you can make right now or with minimal missing items!
        </p>
      </div>

      {/* INGREDIENTS INPUT & STAPLES CONTAINER */}
      <div className="glass-panel rounded-3xl p-6 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] space-y-5 max-w-4xl mx-auto">
        
        {/* Top input bar */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            {t.whatIsInPantry}
          </label>
          <div className="flex gap-2">
            <input
              id="pantry-ingredient-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddIngredient(inputVal);
                }
              }}
              placeholder="Type an ingredient (e.g. Tomatoes, Garlic, Paneer)..."
              className="flex-1 px-4 py-3 rounded-2xl text-xs sm:text-sm bg-white/70 backdrop-blur-md border border-white/90 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 transition-all"
            />
            <button
              id="pantry-add-ingredient-btn"
              type="button"
              onClick={() => handleAddIngredient(inputVal)}
              disabled={!inputVal.trim()}
              className="px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-600/20 flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Current Active Ingredient Chips */}
        {ingredients.length > 0 && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">
                Your Ingredients ({ingredients.length}):
              </span>
              <button
                id="pantry-clear-all-btn"
                onClick={handleClearAll}
                className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Clear all
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ing) => (
                <span
                  key={ing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-300/60 text-amber-950 text-xs font-semibold backdrop-blur-md shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>{ing}</span>
                  <button
                    onClick={() => handleRemoveIngredient(ing)}
                    className="p-0.5 rounded-full hover:bg-amber-200/80 text-amber-800 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quick Pantry Staples Suggestions */}
        <div className="space-y-2 pt-2 border-t border-slate-200/50">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Quick Add Common Pantry Staples:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {COMMON_PANTRY_STAPLES.map((staple) => {
              const alreadyAdded = ingredients.some(i => i.toLowerCase() === staple.toLowerCase());
              return (
                <button
                  key={staple}
                  type="button"
                  onClick={() => {
                    if (alreadyAdded) handleRemoveIngredient(staple);
                    else handleAddIngredient(staple);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium backdrop-blur-md transition-all ${
                    alreadyAdded
                      ? 'bg-amber-500/20 text-amber-950 border border-amber-400 font-bold'
                      : 'bg-white/70 text-slate-700 hover:bg-white border border-white/80'
                  }`}
                >
                  {alreadyAdded ? '✓ ' : '+ '}{staple}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Switch: "Use only what I have" vs "Show with missing" */}
        <div className="pt-3 border-t border-slate-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              id="matcher-strict-mode-toggle"
              type="button"
              onClick={() => setOnlyWhatIHave(!onlyWhatIHave)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                onlyWhatIHave ? 'bg-amber-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  onlyWhatIHave ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-xs font-bold text-slate-800">
              {onlyWhatIHave ? t.useOnlyWhatIHave : t.showWithMissing}
            </span>
          </div>

          <span className="text-xs text-slate-500">
            Found {results.length} matching recipe{results.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Toast alert */}
      {addedToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-stone-900 text-white text-xs font-bold shadow-xl border border-stone-700 flex items-center gap-2 animate-in fade-in duration-200">
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* MATCH RESULTS LIST */}
      <div className="max-w-4xl mx-auto space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-44 rounded-3xl glass-card animate-pulse"></div>
            ))}
          </div>
        ) : results.length > 0 ? (
          results.map(({ recipe, matchPercentage, availableIngredients, missingIngredients }) => {
            const isFullMatch = matchPercentage === 100;
            return (
              <div
                key={recipe.id}
                id={`match-result-${recipe.id}`}
                className="glass-card glass-card-hover rounded-3xl border border-white/75 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 flex flex-col md:flex-row gap-5"
              >
                {/* Thumbnail */}
                <div className="w-full md:w-48 aspect-16/10 md:aspect-square rounded-2xl overflow-hidden bg-slate-100 shrink-0 relative border border-white/60">
                  <img
                    src={recipe.imageUrl || recipe.image}
                    alt={recipe.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-2.5 left-2.5 px-3 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-md ${
                    isFullMatch 
                      ? 'bg-emerald-600/90 text-white border border-emerald-400/40' 
                      : 'bg-amber-500/90 text-white border border-amber-400/40'
                  }`}>
                    {matchPercentage}% Match
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                        {recipe.cuisine} • {recipe.category}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        ⏱ {recipe.totalTimeMinutes} mins
                      </span>
                    </div>

                    <h3 
                      onClick={() => onSelectRecipe(recipe)}
                      className="font-bold text-slate-900 text-lg hover:text-amber-600 cursor-pointer transition-colors"
                    >
                      {recipe.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {recipe.description}
                    </p>

                    {/* Ingredients Breakdown */}
                    <div className="mt-3 pt-3 border-t border-slate-200/50 space-y-2">
                      {availableIngredients.length > 0 && (
                        <div className="flex items-start gap-1.5 text-[11px]">
                          <span className="font-bold text-emerald-700 shrink-0">✓ You Have:</span>
                          <span className="text-emerald-950 line-clamp-1">
                            {availableIngredients.join(', ')}
                          </span>
                        </div>
                      )}

                      {missingIngredients.length > 0 && (
                        <div className="flex items-start gap-1.5 text-[11px]">
                          <span className="font-bold text-rose-600 shrink-0">✗ Missing:</span>
                          <span className="text-rose-950 line-clamp-1">
                            {missingIngredients.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      id={`match-cook-btn-${recipe.id}`}
                      onClick={() => onStartCooking(recipe)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-1.5 transition-all active:scale-95 border border-white/30"
                    >
                      <ChefHat className="w-3.5 h-3.5" />
                      <span>{t.cookWithMe}</span>
                    </button>

                    <button
                      onClick={() => onSelectRecipe(recipe)}
                      className="px-3 py-2 rounded-xl bg-white/70 hover:bg-white text-slate-800 font-semibold text-xs border border-white/80 backdrop-blur-md shadow-xs transition-colors"
                    >
                      View Recipe Details
                    </button>

                    {missingIngredients.length > 0 && (
                      <button
                        id={`match-add-shopping-btn-${recipe.id}`}
                        onClick={() => handleAddMissingToShoppingList(recipe, recipe.baseServings)}
                        className="px-3 py-2 rounded-xl border border-white/80 bg-white/50 hover:bg-white text-slate-700 font-semibold text-xs flex items-center gap-1.5 backdrop-blur-md shadow-xs transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                        <span>Add Missing ({missingIngredients.length}) to Shopping List</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="glass-panel rounded-3xl border border-white/80 p-10 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No Matching Recipes</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adding a few more common ingredients (e.g. Pasta, Tomatoes, Paneer, Rice, or Garlic) or disable strict mode.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
