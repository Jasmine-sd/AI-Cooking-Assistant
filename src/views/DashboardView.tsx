import React, { useState, useEffect } from 'react';
import { 
  ChefHat, 
  Heart, 
  History, 
  Sparkles, 
  Plus, 
  X, 
  Star, 
  Clock, 
  Flame, 
  ShoppingBag, 
  UtensilsCrossed, 
  Settings,
  ArrowRight
} from 'lucide-react';
import { Recipe, CookingHistoryItem, RecipeMatchResult } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface DashboardViewProps {
  onSelectRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
  onNavigate: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectRecipe,
  onStartCooking,
  onNavigate
}) => {
  const { user, updatePantry } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'recommendations' | 'history' | 'favorites' | 'pantry'>('recommendations');
  const [recommendations, setRecommendations] = useState<RecipeMatchResult[]>([]);
  const [history, setHistory] = useState<CookingHistoryItem[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [pantryInput, setPantryInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      if (!user) return;
      try {
        setLoading(true);
        const [recsResult, histResult, recipesResult] = await Promise.allSettled([
          api.getRecommendations(user.id),
          api.getHistory(user.id),
          api.getRecipes()
        ]);
        
        if (recsResult.status === 'fulfilled' && recsResult.value) {
          setRecommendations(recsResult.value);
        }
        if (histResult.status === 'fulfilled' && histResult.value) {
          setHistory(histResult.value);
        }
        const allRecipes = recipesResult.status === 'fulfilled' && recipesResult.value ? recipesResult.value : [];
        if (user.favorites && user.favorites.length > 0) {
          const favs = allRecipes.filter(r => user.favorites.includes(r.id));
          setFavoriteRecipes(favs);
        }
      } catch (e) {
        console.error('Error loading dashboard:', e);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [user]);

  const handleAddPantryItem = () => {
    if (!pantryInput.trim() || !user) return;
    const current = user.pantry || [];
    if (!current.includes(pantryInput.trim())) {
      const updated = [...current, pantryInput.trim()];
      updatePantry(updated);
    }
    setPantryInput('');
  };

  const handleRemovePantryItem = (item: string) => {
    if (!user) return;
    const updated = (user.pantry || []).filter(i => i !== item);
    updatePantry(updated);
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
        <ChefHat className="w-12 h-12 text-amber-600 mx-auto" />
        <h2 className="text-xl font-bold text-stone-900">Sign in to view your Dashboard</h2>
        <p className="text-xs text-stone-500">Track your cooking history, saved favorites, and pantry recommendations.</p>
        <button
          onClick={() => onNavigate('landing')}
          className="px-5 py-2.5 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-md hover:bg-amber-700"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* USER PROFILE HEADER CARD */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shadow-orange-500/20 border border-white/40">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-950 border border-amber-300/50 uppercase backdrop-blur-xs">
                {user.preferences.cookingExperience} Chef
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-[11px] px-3 py-0.5 rounded-full bg-white/70 text-slate-700 font-semibold border border-white/80 backdrop-blur-xs shadow-2xs">
                🥗 {user.preferences.dietaryPreference}
              </span>
              <span className="text-[11px] px-3 py-0.5 rounded-full bg-white/70 text-slate-700 font-semibold border border-white/80 backdrop-blur-xs shadow-2xs">
                🌶️ {user.preferences.spiceLevel} Spice
              </span>
              <span className="text-[11px] px-3 py-0.5 rounded-full bg-white/70 text-slate-700 font-semibold border border-white/80 backdrop-blur-xs shadow-2xs">
                ⏱ {user.preferences.availableTime}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="bg-white/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/80 text-center shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Cooked</span>
            <span className="font-extrabold text-slate-900 text-lg">{history.length}</span>
          </div>
          <div className="bg-white/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/80 text-center shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Favorites</span>
            <span className="font-extrabold text-rose-600 text-lg">{user.favorites.length}</span>
          </div>
          <div className="bg-white/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/80 text-center shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Pantry</span>
            <span className="font-extrabold text-amber-600 text-lg">{user.pantry.length}</span>
          </div>
        </div>
      </div>

      {/* TABS HEADER */}
      <div className="border-b border-white/80 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          id="dash-tab-recs"
          onClick={() => setActiveTab('recommendations')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-2xl transition-all shrink-0 ${
            activeTab === 'recommendations'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
              : 'bg-white/50 text-slate-600 hover:bg-white/80 border border-white/60 backdrop-blur-xs'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Recommended For You ({recommendations.length})</span>
        </button>

        <button
          id="dash-tab-history"
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-2xl transition-all shrink-0 ${
            activeTab === 'history'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
              : 'bg-white/50 text-slate-600 hover:bg-white/80 border border-white/60 backdrop-blur-xs'
          }`}
        >
          <History className="w-4 h-4" />
          <span>{t.history} ({history.length})</span>
        </button>

        <button
          id="dash-tab-favs"
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-2xl transition-all shrink-0 ${
            activeTab === 'favorites'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
              : 'bg-white/50 text-slate-600 hover:bg-white/80 border border-white/60 backdrop-blur-xs'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>{t.favorites} ({favoriteRecipes.length})</span>
        </button>

        <button
          id="dash-tab-pantry"
          onClick={() => setActiveTab('pantry')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-2xl transition-all shrink-0 ${
            activeTab === 'pantry'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
              : 'bg-white/50 text-slate-600 hover:bg-white/80 border border-white/60 backdrop-blur-xs'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>{t.savedPantry} ({user.pantry.length})</span>
        </button>
      </div>

      {/* TAB CONTENT: RECOMMENDATIONS */}
      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Content-based matches factoring in dietary preference ({user.preferences.dietaryPreference}), spice ({user.preferences.spiceLevel}), and pantry overlap.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <RecipeCard
                key={rec.recipe.id}
                recipe={rec.recipe}
                matchScore={rec.matchPercentage}
                recommendationReason={rec.recommendationReason}
                onSelect={onSelectRecipe}
                onStartCooking={onStartCooking}
              />
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: COOKING HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-4 max-w-4xl">
          {history.length > 0 ? (
            history.map((h) => (
              <div
                key={h.id}
                className="glass-panel rounded-3xl border border-white/80 p-5 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {h.recipeImage && (
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-white/60">
                      <img src={h.recipeImage} alt={h.recipeName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-white/70 border border-white/80 text-slate-700 backdrop-blur-xs">
                        {h.cuisine}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {new Date(h.cookedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      {h.recipeName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Cooked for {h.servingsCooked} people • Style: {h.styleUsed === 'restaurant' ? 'Restaurant' : 'Homestyle'}
                    </p>
                    {h.notes && (
                      <p className="text-xs text-amber-950 bg-amber-500/15 p-2.5 rounded-xl border border-amber-300/50 backdrop-blur-xs mt-1 font-medium">
                        📝 "{h.notes}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= (h.rating || 5) ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="glass-panel rounded-3xl border border-white/80 p-12 text-center space-y-3">
              <History className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">No Cooking History Yet</h3>
              <p className="text-xs text-slate-500">
                Launch "Cook With Me" on any recipe, complete the steps, and rate your dish to build your personal culinary timeline!
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: FAVORITES */}
      {activeTab === 'favorites' && (
        <div>
          {favoriteRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onSelect={onSelectRecipe}
                  onStartCooking={onStartCooking}
                />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-3xl border border-white/80 p-12 text-center space-y-3">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">No Favorites Saved</h3>
              <p className="text-xs text-slate-500">
                Tap the heart icon on any recipe to save it to your cookbook favorites!
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: PANTRY MANAGER */}
      {activeTab === 'pantry' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] space-y-6 max-w-3xl">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{t.savedPantry}</h3>
            <p className="text-xs text-slate-500">
              Ingredients listed here are automatically used to compute your personalized recommendations and match scores.
            </p>
          </div>

          <div className="flex gap-2">
            <input
              id="dash-pantry-input"
              type="text"
              value={pantryInput}
              onChange={(e) => setPantryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddPantryItem();
              }}
              placeholder="Add staple (e.g. Milk, Rice, Garlic, Pasta)..."
              className="glass-input flex-1 px-4 py-2.5 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={handleAddPantryItem}
              className="px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1 transition-all shadow-md shadow-amber-600/20 border border-white/30"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {user.pantry.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 border border-white/80 backdrop-blur-xs text-amber-950 text-xs font-semibold shadow-2xs"
              >
                <span>{item}</span>
                <button
                  onClick={() => handleRemovePantryItem(item)}
                  className="p-0.5 rounded-full hover:bg-amber-200 text-amber-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
