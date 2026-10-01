import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  ChefHat, 
  Mic, 
  MicOff,
  ArrowRight, 
  Flame, 
  Utensils, 
  Scale,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import { Recipe, RecipeMatchResult } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import { FoodImage } from '../components/FoodImage';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_RECIPES } from '../data/recipes';

interface LandingViewProps {
  onNavigate: (view: string, param?: any) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onNavigate,
  onSelectRecipe,
  onStartCooking
}) => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [recommendations, setRecommendations] = useState<RecipeMatchResult[]>(() => 
    INITIAL_RECIPES.slice(0, 3).map((r, i) => ({
      recipe: r,
      matchPercentage: 96 - i * 3,
      availableIngredients: r.ingredients.slice(0, 3).map(x => x.name),
      missingIngredients: [],
      optionalIngredients: [],
      recommendationReason: i === 0 
        ? 'Crispy street-style favorite with fresh authentic chutneys'
        : i === 1 
        ? 'Quick wok-tossed Indo-Chinese dinner ready in 25 minutes'
        : 'Festive aromatic sweet prepared with pure desi ghee'
    }))
  );
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const rawRecipes = (featuredRecipes && featuredRecipes.length > 0) ? featuredRecipes : INITIAL_RECIPES;
  const seenIds = new Set<string>();
  const seenNames = new Set<string>();
  const displayRecipes = rawRecipes.filter(r => {
    if ((r.id.startsWith('rasg') || r.name.toLowerCase().startsWith('authentic rasg')) && r.id !== 'kolkata-white-rasgulla') {
      return false;
    }
    const norm = r.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (seenIds.has(r.id) || seenNames.has(norm)) return false;
    seenIds.add(r.id);
    seenNames.add(norm);
    return true;
  });

  // Exactly 4 famous recipes: 1) pani puri, 2) hyderabadi chicken dum biryani, 3) crispy masala dosa, 4) molten lava cake
  const openingRowRecipes = useMemo(() => {
    const allPool = [...displayRecipes, ...INITIAL_RECIPES];

    const findMatch = (pattern: RegExp) => {
      return allPool.find(r => pattern.test(r.id) || pattern.test(r.name));
    };

    // 1) pani puri
    const paniPuri = findMatch(/pani[- ]?puri|golgappa/i);
    // 2) hyderabadi chicken dum biryani
    const biryani = findMatch(/hyderabadi|dum[- ]?biryani/i);
    // 3) crispy masala dosa (replaced laddu as requested)
    const masalaDosa = findMatch(/crispy[- ]?masala[- ]?dosa|masala[- ]?dosa|dosa/i);
    // 4) molten lava cake
    const lavaCake = findMatch(/lava[- ]?cake|chocolate[- ]?lava/i);

    const ordered = [paniPuri, biryani, masalaDosa, lavaCake].filter(Boolean) as Recipe[];

    // Ensure uniqueness
    const seen = new Set<string>();
    const result: Recipe[] = [];
    for (const r of ordered) {
      if (!seen.has(r.id)) {
        seen.add(r.id);
        result.push(r);
      }
    }
    return result;
  }, [displayRecipes]);

  const filteredDisplayRecipes = displayRecipes.filter(r => {
    if (activeCategoryTab === 'all') return true;
    if (activeCategoryTab === 'breakfast') return r.category === 'Breakfast' || r.id.includes('dosa') || r.id.includes('idli');
    if (activeCategoryTab === 'street') return r.category === 'Street Food' || r.id.includes('pani') || r.id.includes('pav') || r.id.includes('tikka');
    if (activeCategoryTab === 'sweets') return r.category === 'Desserts' || r.id.includes('jamun') || r.id.includes('laddu') || r.id.includes('rasgulla') || r.id.includes('cake');
    if (activeCategoryTab === 'main') return r.category === 'Main Course' || r.category === 'Dinner' || r.id.includes('makhani') || r.id.includes('chole') || r.id.includes('paneer') || r.id.includes('biryani');
    if (activeCategoryTab === 'quick') return r.totalTimeMinutes <= 30;
    return true;
  });

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const recipesPromise = api.getRecipes().then(all => {
          if (isMounted && Array.isArray(all) && all.length > 0) {
            setFeaturedRecipes(all);
          }
        }).catch(err => console.warn('Could not refresh featured recipes:', err));

        const recsPromise = api.getRecommendations(user?.id || 'usr_demo_1').then(recs => {
          if (isMounted && Array.isArray(recs) && recs.length > 0) {
            setRecommendations(recs);
          }
        }).catch(err => console.warn('Could not refresh recommendations:', err));

        await Promise.allSettled([recipesPromise, recsPromise]);
      } catch (e) {
        console.error('Error in loadData:', e);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [user]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      onNavigate('explore', { search: query });
    } else {
      onNavigate('explore');
    }
  };

  const handleQuickCategory = (categoryOrCuisine: string, type: 'cuisine' | 'category') => {
    if (type === 'cuisine') {
      onNavigate('explore', { cuisine: categoryOrCuisine });
    } else {
      onNavigate('explore', { search: categoryOrCuisine });
    }
  };

  // Voice Search Handler
  const handleToggleVoiceSearch = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError(language === 'te' ? 'మీ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ సపోర్ట్ లేదు' : 'Voice input not supported in this browser');
      setTimeout(() => setSpeechError(null), 3500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setSearchQuery(transcript);
          setIsListening(false);
          // Automatically navigate to search results
          setTimeout(() => {
            onNavigate('explore', { search: transcript });
          }, 300);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech error:', event.error);
        setIsListening(false);
        setSpeechError(language === 'te' ? 'వాయిస్ సరిగా వినిపించలేదు, మళ్ళీ ప్రయత్నించండి' : 'Could not hear clearly, please try again');
        setTimeout(() => setSpeechError(null), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const quickCategories = [
    { label: 'Indian', teLabel: 'భారతీయ', type: 'cuisine' as const, value: 'Indian', icon: '🍛' },
    { label: 'Italian', teLabel: 'ఇటాలియన్', type: 'cuisine' as const, value: 'Italian', icon: '🍕' },
    { label: 'Chinese / Asian', teLabel: 'చైనీస్ / ఆసియన్', type: 'cuisine' as const, value: 'Asian', icon: '🥡' },
    { label: t.breakfast, teLabel: 'అల్పాహారం', type: 'category' as const, value: 'Breakfast', icon: '🥞' },
    { label: t.lunch, teLabel: 'లంచ్', type: 'category' as const, value: 'Main Course', icon: '🍲' },
    { label: t.dinner, teLabel: 'డిన్నర్', type: 'category' as const, value: 'Dinner', icon: '🍽️' },
    { label: t.snacks, teLabel: 'స్నాక్స్', type: 'category' as const, value: 'Snack', icon: '🥟' },
    { label: t.desserts, teLabel: 'స్వీట్స్', type: 'category' as const, value: 'Dessert', icon: '🍨' },
    { label: t.quickMeals, teLabel: 'త్వరిత వంటకాలు', type: 'category' as const, value: 'Quick', icon: '⚡' },
  ];

  return (
    <div className="space-y-10 pb-16">
      
      {/* 1. HERO SECTION WITH BEAUTIFUL ATTRACTION ANIMATIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-amber-500/15 via-orange-500/5 to-white/60 p-5 sm:p-8 lg:p-10 border border-amber-200/80 shadow-sm">
        
        {/* Background ambient lighting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl pointer-events-none"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-5 relative z-10">
          
          {/* Top Animated Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 text-amber-900 border border-amber-300/80 text-xs font-bold shadow-xs backdrop-blur-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{language === 'te' ? 'లైవ్ వాయిస్ గైడెడ్ AI వంటశాల' : 'Live Voice-Guided AI Culinary Companion'}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight"
          >
            👨‍🍳 {t.whatWouldYouLikeToCook}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            {t.heroSubtitle}
          </motion.p>

          {/* Search & Voice Form */}
          <motion.form 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            onSubmit={handleSearchSubmit} 
            className="max-w-2xl mx-auto relative mt-2"
          >
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                id="hero-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-36 py-3.5 sm:py-4 rounded-2xl bg-white border border-slate-300 shadow-md text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
              />
              
              <div className="absolute right-2 flex items-center gap-1.5">
                {/* Voice Mic Button */}
                <button
                  type="button"
                  id="hero-voice-search-btn"
                  onClick={handleToggleVoiceSearch}
                  title="Ask by Voice / వాయిస్ ద్వారా వెతకండి"
                  className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isListening 
                      ? 'bg-red-500 text-white border-red-600 animate-pulse' 
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-amber-700" />}
                </button>

                {/* Submit Button */}
                <button
                  id="hero-search-submit-btn"
                  type="submit"
                  className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>{t.explore}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {speechError && (
              <p className="text-xs text-red-600 mt-2 font-medium bg-red-50 py-1 px-3 rounded-lg inline-block">
                {speechError}
              </p>
            )}

            {isListening && (
              <p className="text-xs text-amber-800 mt-2 font-semibold animate-pulse">
                🎙️ {t.micListening} {language === 'te' ? '(తెలుగు లేదా English లో మాట్లాడండి)' : '(Speak recipe name)'}
              </p>
            )}
          </motion.form>

          {/* Quick Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
            {quickCategories.slice(0, 7).map((cat) => (
              <button
                key={cat.label}
                id={`quick-cat-${cat.value.toLowerCase()}`}
                onClick={() => handleQuickCategory(cat.value, cat.type)}
                className="px-2.5 sm:px-3 py-1 rounded-full bg-white/90 hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200/90 hover:border-amber-300 font-medium text-xs shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{cat.icon}</span>
                <span>{language === 'te' ? cat.teLabel : cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* TOP FAMOUS RECIPES ROW (MATCHING REFERENCE IMAGE STRUCTURE & ALIGNMENT) */}
        <div className="mt-8 pt-6 border-t border-amber-200/50">
          <div className="flex items-center justify-between gap-2 sm:gap-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-600"></span>
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>🔥 {language === 'te' ? '4 ప్రసిద్ధ వంటకాలు — తక్షణమే వండండి' : 'Top 4 Famous Recipes — Cook Instantly'}</span>
              </h2>
            </div>
          </div>

          {/* 4-Recipe Grid Layout Row matching professional reference card structure */}
          <div 
            id="opening-recipe-strip"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-2 pt-1 text-left"
          >
            {openingRowRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                compact={true}
                onSelect={onSelectRecipe}
                onStartCooking={onStartCooking}
              />
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* 3 CORE CAPABILITY FEATURE CARDS (FROM HOME PAGE DESIGN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => onNavigate('explore')}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
              <ChefHat className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
              Hands-Free "Cook With Me"
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Step-by-step display with built-in voice commands, auto timers, and audio instructions so you never touch your phone with messy hands.
            </p>
            <div className="text-xs font-bold text-amber-700 flex items-center gap-1 pt-1">
              <span>Explore Voice Recipes</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('what-can-i-cook')}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
              What Can I Cook?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter the ingredients in your pantry or fridge. Our matching algorithm finds delicious meals you can cook immediately without shopping.
            </p>
            <div className="text-xs font-bold text-orange-700 flex items-center gap-1 pt-1">
              <span>Match Pantry Items</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('explore')}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
              Dynamic Math & Mistake Rescue
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Deterministic scaling for 1 to 24 servings, Restaurant vs Homestyle conventions, and instant culinary recovery if a dish gets too salty or spicy.
            </p>
            <div className="text-xs font-bold text-amber-700 flex items-center gap-1 pt-1">
              <span>Learn Adaptive Cooking</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRENDING & CATEGORIZED FULL RESTAURANT MENU SECTION */}
      <section id="full-menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Chef's Handcrafted Specialties
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tracking-tight">
              Restaurant Menu & Recipes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Crispy Masala Dosa, Soft Royal Gulab Jamun, Chole Bhature, Dal Makhani, Pani Puri & more
            </p>
          </div>

          <button
            id="featured-view-all-btn"
            onClick={() => onNavigate('explore')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 transition-all px-4 py-2 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 shadow-xs self-start sm:self-auto cursor-pointer"
          >
            <span>{t.exploreRecipes} ({displayRecipes.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Clean Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100 pt-1">
          {[
            { id: 'all', label: 'All Dishes' },
            { id: 'breakfast', label: 'Breakfast Specials' },
            { id: 'main', label: "Chef's Mains & Curries" },
            { id: 'street', label: 'Street Food & Chaat' },
            { id: 'sweets', label: 'Royal Sweets & Desserts' },
            { id: 'quick', label: 'Quick Under 30m' }
          ].map(tab => (
            <button
              key={tab.id}
              id={`tab-category-${tab.id}`}
              onClick={() => setActiveCategoryTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategoryTab === tab.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredDisplayRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDisplayRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={onSelectRecipe}
                onStartCooking={onStartCooking}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={onSelectRecipe}
                onStartCooking={onStartCooking}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. PERSONALIZED RECOMMENDATIONS CAROUSEL/GRID */}
      {recommendations.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Personalized For {user ? user.name.split(' ')[0] : 'You'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Recommended For Your Taste
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Ranked by dietary preference, spice level, available time & favorite cuisines
              </p>
            </div>

            <button
              onClick={() => onNavigate('explore')}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 transition-all px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 border border-amber-200/80 shadow-2xs self-start sm:self-auto cursor-pointer"
            >
              <span>View All ({displayRecipes.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.slice(0, 3).map((rec) => (
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
        </section>
      )}

      {/* 5. QUICK INGREDIENT MATCHER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-3 max-w-xl">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              Pantry Inventory Assistant
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Got 3 random ingredients and no dinner plan?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Tell our AI Chef what you have in your fridge (tomatoes, pasta, cheese, etc.). We'll compute the exact percentage match and show you which ingredients can be substituted!
            </p>
          </div>
          <button
            id="banner-what-can-i-cook-btn"
            onClick={() => onNavigate('what-can-i-cook')}
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Pantry Matcher</span>
          </button>
        </div>
      </section>
    </div>
  );
};
