import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  Utensils, 
  Flame, 
  Clock, 
  DollarSign,
  RotateCcw
} from 'lucide-react';
import { Recipe, DietaryType, SpiceLevel, DifficultyLevel } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_RECIPES, filterLocalRecipes } from '../data/recipes';

interface ExploreViewProps {
  initialSearch?: string;
  initialCuisine?: string;
  onSelectRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  initialSearch = '',
  initialCuisine = 'All',
  onSelectRecipe,
  onStartCooking
}) => {
  const { t, language } = useLanguage();
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const params: Record<string, string> = {};
    if (initialSearch) params.search = initialSearch;
    if (initialCuisine && initialCuisine !== 'All') params.cuisine = initialCuisine;
    return filterLocalRecipes(INITIAL_RECIPES, params);
  });
  const [loading, setLoading] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Filters State
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine);
  const [selectedTaste, setSelectedTaste] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDietary, setSelectedDietary] = useState('All');
  const [selectedSpice, setSelectedSpice] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [maxTime, setMaxTime] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'time' | 'name'>('rating');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Sync initialSearch & initialCuisine when incoming props change
  useEffect(() => {
    if (initialSearch !== undefined) {
      setSearchTerm(initialSearch);
      // If user provided a specific search term, reset restrictive cuisine filter to prevent hiding the dish
      if (initialSearch.trim()) {
        setSelectedCuisine('All');
      }
    }
    if (initialCuisine !== undefined && !initialSearch) {
      setSelectedCuisine(initialCuisine);
    }
  }, [initialSearch, initialCuisine]);

  const cuisines = ['All', 'Indian', 'Italian', 'Mexican', 'Asian', 'Continental', 'Mediterranean'];
  const tastePreferences = ['All', 'Spicy', 'Sweet', 'Salty', 'Mild', 'Savory', 'Tangy'];
  const categories = ['All', 'Main Course', 'Breakfast', 'Snack', 'Dinner', 'Desserts', 'Street Food'];
  const dietaryOptions = ['All', 'Vegetarian', 'Non-vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free'];
  const spiceLevels = ['All', 'None', 'Mild', 'Medium', 'Spicy', 'Very Spicy'];
  const difficultyLevels = ['All', 'Easy', 'Medium', 'Hard'];

  const handleGenerateAI = async (queryText?: string) => {
    const query = queryText || searchTerm;
    if (!query.trim()) return;
    try {
      setIsGeneratingAI(true);
      setAiError(null);
      const generated = await api.generateAiRecipe(query.trim(), language);
      if (generated) {
        onSelectRecipe(generated);
      }
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Could not generate recipe with AI');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCuisine !== 'All') params.cuisine = selectedCuisine;
      if (selectedTaste !== 'All') params.taste = selectedTaste;
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (selectedDietary !== 'All') params.dietary = selectedDietary;
      if (selectedSpice !== 'All') params.spice = selectedSpice;
      if (selectedDifficulty !== 'All') params.difficulty = selectedDifficulty;
      if (maxTime) params.maxTime = maxTime.toString();

      const data = await api.getRecipes(params);
      const list = Array.isArray(data) && data.length > 0 ? data : filterLocalRecipes(INITIAL_RECIPES, params);
      
      // Client-side sort
      let sorted = [...list];
      if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
      else if (sortBy === 'time') sorted.sort((a, b) => a.totalTimeMinutes - b.totalTimeMinutes);
      else if (sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));

      // Strictly deduplicate by id and normalized name
      const seenIds = new Set<string>();
      const seenNames = new Set<string>();
      const deduplicated = sorted.filter(r => {
        if ((r.id.startsWith('rasg') || r.name.toLowerCase().startsWith('authentic rasg')) && r.id !== 'kolkata-white-rasgulla') {
          return false;
        }
        const norm = r.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (seenIds.has(r.id) || seenNames.has(norm)) return false;
        seenIds.add(r.id);
        seenNames.add(norm);
        return true;
      });

      setRecipes(deduplicated);
    } catch (e) {
      console.error('Error fetching explore recipes:', e);
      const fallbackList = filterLocalRecipes(INITIAL_RECIPES, {
        search: searchTerm,
        cuisine: selectedCuisine,
        taste: selectedTaste,
        category: selectedCategory,
        dietary: selectedDietary,
        spice: selectedSpice,
        difficulty: selectedDifficulty,
        maxTime: maxTime ? maxTime.toString() : undefined
      });
      setRecipes(fallbackList);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [
    searchTerm, 
    selectedCuisine,
    selectedTaste,
    selectedCategory, 
    selectedDietary, 
    selectedSpice, 
    selectedDifficulty, 
    maxTime, 
    sortBy
  ]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCuisine('All');
    setSelectedTaste('All');
    setSelectedCategory('All');
    setSelectedDietary('All');
    setSelectedSpice('All');
    setSelectedDifficulty('All');
    setMaxTime(null);
    setSortBy('rating');
  };

  const activeFiltersCount = 
    (selectedCuisine !== 'All' ? 1 : 0) +
    (selectedTaste !== 'All' ? 1 : 0) +
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedDietary !== 'All' ? 1 : 0) +
    (selectedSpice !== 'All' ? 1 : 0) +
    (selectedDifficulty !== 'All' ? 1 : 0) +
    (maxTime !== null ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.exploreRecipes}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Discover restaurant & home-style recipes with interactive voice, step-by-step guidance, and customized taste preferences.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="explore-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-8 py-2.5 rounded-xl text-xs bg-white/70 backdrop-blur-xl border border-white/90 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Cuisines & Taste Preferences Dual Ribbon */}
      <div className="space-y-3">
        {/* Cuisine Filter Pills Bar */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
            Cuisines
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar">
            {cuisines.map((c) => {
              const isSelected = selectedCuisine === c;
              return (
                <button
                  key={c}
                  id={`cuisine-filter-${c.toLowerCase()}`}
                  onClick={() => setSelectedCuisine(c)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all backdrop-blur-md ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 border border-amber-500'
                      : 'bg-white/70 text-slate-700 hover:bg-white border border-white/80'
                  }`}
                >
                  {c === 'All' ? t.allCuisines : c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Taste Preferences Filter Pills Bar (Spicy, Sweet, Salty, Mild, Tangy) */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
            Taste Preferences
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar">
            {tastePreferences.map((tp) => {
              const isSelected = selectedTaste === tp;
              const tasteEmoji: Record<string, string> = {
                'All': '✨',
                'Spicy': '🌶️',
                'Sweet': '🍯',
                'Salty': '🧂',
                'Mild': '🌱',
                'Savory': '🍲',
                'Tangy': '🍋'
              };
              return (
                <button
                  key={tp}
                  id={`taste-filter-${tp.toLowerCase()}`}
                  onClick={() => setSelectedTaste(tp)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all backdrop-blur-md flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/25 border border-orange-400'
                      : 'bg-white/70 text-slate-700 hover:bg-white border border-white/80'
                  }`}
                >
                  <span>{tasteEmoji[tp] || '✨'}</span>
                  <span>{tp === 'All' ? 'All Tastes' : tp}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="glass-panel p-4 rounded-2xl border border-white/75 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Taste dropdown */}
          <select
            id="explore-taste-select"
            value={selectedTaste}
            onChange={(e) => setSelectedTaste(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs bg-white/70 backdrop-blur-md border border-white/80 text-slate-700 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            <option value="All">Taste: All</option>
            {tastePreferences.filter(t => t !== 'All').map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Dietary dropdown */}
          <select
            id="explore-dietary-select"
            value={selectedDietary}
            onChange={(e) => setSelectedDietary(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs bg-white/70 backdrop-blur-md border border-white/80 text-slate-700 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            <option value="All">Diet: All</option>
            {dietaryOptions.filter(d => d !== 'All').map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Spice dropdown */}
          <select
            id="explore-spice-select"
            value={selectedSpice}
            onChange={(e) => setSelectedSpice(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs bg-white/70 backdrop-blur-md border border-white/80 text-slate-700 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            <option value="All">Spice: All</option>
            {spiceLevels.filter(s => s !== 'All').map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Max Time */}
          <select
            id="explore-time-select"
            value={maxTime || ''}
            onChange={(e) => setMaxTime(e.target.value ? parseInt(e.target.value, 10) : null)}
            className="px-3 py-1.5 rounded-xl text-xs bg-white/70 backdrop-blur-md border border-white/80 text-slate-700 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            <option value="">Time: Any</option>
            <option value="15">&lt; 15 mins</option>
            <option value="30">&lt; 30 mins</option>
            <option value="45">&lt; 45 mins</option>
            <option value="60">&lt; 60 mins</option>
          </select>

          {/* Reset Filters */}
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50/80 backdrop-blur-xs flex items-center gap-1 transition-colors border border-red-200/50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset ({activeFiltersCount})
            </button>
          )}
        </div>

        {/* Sort By Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Sort:</span>
          <select
            id="explore-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl text-xs bg-white/70 backdrop-blur-md border border-white/80 text-slate-800 font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            <option value="rating">★ Highest Rating</option>
            <option value="time">⏱ Fastest Total Time</option>
            <option value="name">🔤 Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Recipes Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 rounded-2xl bg-stone-100 animate-pulse"></div>
          ))}
        </div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={onSelectRecipe}
              onStartCooking={onStartCooking}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Utensils className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {searchTerm ? `No dishes found for "${searchTerm}"` : 'No Recipes Found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchTerm 
              ? 'Our AI Chef can generate an authentic, step-by-step recipe with personalized ingredients right now!'
              : 'No dishes match your specific search criteria. Try adjusting the dietary, spice, or time filters.'}
          </p>

          {aiError && (
            <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg font-medium">{aiError}</p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {searchTerm && (
              <button
                id="explore-generate-ai-btn"
                onClick={() => handleGenerateAI()}
                disabled={isGeneratingAI}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGeneratingAI ? 'Generating Recipe with AI...' : `Generate "${searchTerm}" with AI Chef`}</span>
              </button>
            )}
            <button
              onClick={resetFilters}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
