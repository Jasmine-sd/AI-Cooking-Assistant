import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Flame, 
  Heart, 
  Share2, 
  ChefHat, 
  ShoppingBag, 
  Sparkles, 
  RefreshCw, 
  UtensilsCrossed, 
  Check, 
  Activity,
  DollarSign,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Recipe, RecipeStyle } from '../types';
import { ServingSelector } from '../components/ServingSelector';
import { StyleSelector } from '../components/StyleSelector';
import { SubstitutionModal } from '../components/SubstitutionModal';
import { FoodImage } from '../components/FoodImage';
import { calculateIngredientQuantity, formatQuantityWithFraction } from '../utils/servingCalculator';
import { voiceController } from '../utils/speech';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface RecipeDetailViewProps {
  recipe: Recipe;
  onBack: () => void;
  onStartCooking: (recipe: Recipe, servings: number, style: RecipeStyle) => void;
}

export const RecipeDetailView: React.FC<RecipeDetailViewProps> = ({
  recipe,
  onBack,
  onStartCooking
}) => {
  const { user, isFavorite, toggleFavorite } = useAuth();
  const { language, t } = useLanguage();
  
  const [servings, setServings] = useState<number>(recipe.baseServings);
  const [cookingStyle, setCookingStyle] = useState<RecipeStyle>('restaurant');
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [substitutionModalOpen, setSubstitutionModalOpen] = useState(false);
  const [activeSubIngredient, setActiveSubIngredient] = useState('');
  const [shoppingToast, setShoppingToast] = useState<string | null>(null);
  const [isSpeakingRecipe, setIsSpeakingRecipe] = useState(false);

  // Clean up audio on unmount or recipe change
  useEffect(() => {
    return () => {
      voiceController.stopSpeaking();
    };
  }, [recipe.id]);

  const favorite = isFavorite(recipe.id);
  const displayName = recipe.nameTranslations?.[language] || recipe.name;

  const handleToggleListenRecipe = () => {
    if (isSpeakingRecipe) {
      voiceController.stopSpeaking();
      setIsSpeakingRecipe(false);
      return;
    }

    const keyIngredients = recipe.ingredients
      .slice(0, 6)
      .map(i => `${i.nameTranslations?.[language] || i.name} ${calculateIngredientQuantity(i.baseQuantity, recipe.baseServings, servings)} ${i.unit}`)
      .join(', ');

    const narrationText = language === 'te'
      ? `${displayName}. ${recipe.descriptionTranslations?.te || recipe.description}. కావలసిన ముఖ్య పదార్థాలు: ${keyIngredients}. దశలవారీగా వండటానికి కుక్ విత్ మి బటన్ క్లిక్ చేయండి.`
      : `${displayName}. ${recipe.description}. Key ingredients: ${keyIngredients}. Click cook with me for full step-by-step voice guidance.`;

    voiceController.speak(
      narrationText,
      language,
      () => setIsSpeakingRecipe(true),
      () => setIsSpeakingRecipe(false)
    );
  };

  const toggleIngredientCheck = (name: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleAddShopping = async (missingOnly: boolean) => {
    if (!user) {
      setShoppingToast('Please sign in or use demo account to manage shopping list');
      setTimeout(() => setShoppingToast(null), 3000);
      return;
    }
    try {
      const added = await api.generateShoppingFromRecipe(user.id, recipe.id, servings, missingOnly);
      setShoppingToast(`Added ${added.length} items to Shopping List!`);
      setTimeout(() => setShoppingToast(null), 3500);
    } catch (e) {
      console.error(e);
    }
  };

  const openSubstitutionFor = (ingName: string) => {
    setActiveSubIngredient(ingName);
    setSubstitutionModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-20">
      
      {/* Back Button */}
      <button
        id="recipe-detail-back-btn"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 text-xs font-bold text-slate-700 hover:bg-white shadow-2xs transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Explore</span>
      </button>

      {/* Hero Header Card */}
      <div className="glass-panel rounded-3xl border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left: Recipe Big Image */}
        <div className="lg:w-1/2 aspect-16/10 lg:aspect-auto relative bg-slate-100 overflow-hidden">
          <FoodImage
            src={recipe.imageUrl || recipe.image}
            alt={displayName}
            category={recipe.category}
            cuisine={recipe.cuisine}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
          
          <button
            id="recipe-detail-favorite-btn"
            onClick={() => user && toggleFavorite(recipe.id)}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-transform active:scale-90 border border-white/50 ${
              favorite ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-700'
            }`}
          >
            <Heart className={`w-5 h-5 ${favorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Right: Recipe Metadata & Launch */}
        <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-950 border border-amber-300/60 backdrop-blur-xs">
                {recipe.cuisine} Cuisine
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/70 text-slate-700 border border-white/80 backdrop-blur-xs">
                {recipe.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {displayName}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {recipe.description}
            </p>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs">
              <div className="bg-white/60 backdrop-blur-md p-2.5 rounded-2xl border border-white/80 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.prepTime}</span>
                <span className="font-extrabold text-slate-800 text-sm mt-0.5 block">{recipe.prepTimeMinutes}m</span>
              </div>
              <div className="bg-white/60 backdrop-blur-md p-2.5 rounded-2xl border border-white/80 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.cookTime}</span>
                <span className="font-extrabold text-slate-800 text-sm mt-0.5 block">{recipe.cookTimeMinutes}m</span>
              </div>
              <div className="bg-white/60 backdrop-blur-md p-2.5 rounded-2xl border border-white/80 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.spiceLevel}</span>
                <span className={`font-extrabold text-sm mt-0.5 block ${recipe.spiceLevel === 'None' ? 'text-slate-700' : 'text-orange-600'}`}>{recipe.spiceLevel}</span>
              </div>
              <div className="bg-white/60 backdrop-blur-md p-2.5 rounded-2xl border border-white/80 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.difficulty}</span>
                <span className="font-extrabold text-slate-800 text-sm mt-0.5 block">{recipe.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Cook With Me & Listen to Recipe Audio */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <button
              id="recipe-detail-start-cook-btn"
              onClick={() => onStartCooking(recipe, servings, cookingStyle)}
              className="flex-1 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.01] active:scale-[0.99] border border-white/30 cursor-pointer"
            >
              <ChefHat className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{t.startCooking} ({t.cookWithMe})</span>
            </button>

            <button
              id="recipe-detail-listen-audio-btn"
              onClick={handleToggleListenRecipe}
              title={language === 'te' ? 'రెసిపీని తెలుగు ఆడియోలో వినండి' : 'Listen to recipe description and ingredients'}
              className={`px-5 py-3.5 sm:py-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                isSpeakingRecipe
                  ? 'bg-red-500 hover:bg-red-600 text-white border-red-600 shadow-md animate-pulse'
                  : 'bg-white hover:bg-amber-50 text-amber-900 border-amber-300 shadow-sm'
              }`}
            >
              {isSpeakingRecipe ? (
                <>
                  <VolumeX className="w-4 h-4 text-white" />
                  <span>{language === 'te' ? 'ఆడియో ఆపు' : 'Stop Audio'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>{language === 'te' ? 'రెసిపీ వినండి 🔊' : 'Listen Recipe 🔊'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ADAPTATION CONTROLS: SERVINGS & STYLE SELECTORS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServingSelector
          currentServings={servings}
          baseServings={recipe.baseServings}
          onChange={(val) => setServings(val)}
        />

        <StyleSelector
          currentStyle={cookingStyle}
          onChange={(st) => setCookingStyle(st)}
          restaurantNotes={recipe.restaurantNotes}
          homestyleNotes={recipe.homestyleNotes}
        />
      </div>

      {/* INGREDIENTS SECTION */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-amber-600" />
              <span>{t.ingredients} ({servings} {t.people})</span>
            </h2>
            <p className="text-xs text-slate-500">
              Quantities recalculated accurately for {servings} servings
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="recipe-add-all-shopping-btn"
              onClick={() => handleAddShopping(false)}
              className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-950 border border-amber-300/60 text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
              <span>Add All to Shopping List</span>
            </button>
          </div>
        </div>

        {/* Ingredients List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recipe.ingredients.map((ing) => {
            const calculatedQty = calculateIngredientQuantity(ing.baseQuantity, recipe.baseServings, servings);
            const formattedQty = formatQuantityWithFraction(calculatedQty, ing.unit);
            const isChecked = !!checkedIngredients[ing.name];

            // If Homestyle is active and substitution exists
            const hasHomeSub = cookingStyle === 'homestyle' && ing.homestyleSubstitute;

            return (
              <div
                key={ing.name}
                className={`p-3.5 rounded-2xl border backdrop-blur-md transition-all flex items-center justify-between gap-3 ${
                  isChecked 
                    ? 'bg-white/40 border-white/60 opacity-60' 
                    : 'bg-white/70 border-white/80 hover:bg-white shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleIngredientCheck(ing.name)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 cursor-pointer"
                  />
                  <div className="min-w-0">
                    <p className={`text-xs font-bold text-slate-900 truncate ${isChecked ? 'line-through text-slate-400' : ''}`}>
                      {hasHomeSub ? (
                        <span>
                          {ing.name} <span className="text-amber-800 font-normal">(or {ing.homestyleSubstitute?.name})</span>
                        </span>
                      ) : ing.name}
                      {ing.optional && <span className="ml-1 text-[10px] font-normal text-slate-400">(optional)</span>}
                    </p>
                    <p className="text-[11px] text-amber-900 font-semibold mt-0.5">
                      {formattedQty}
                    </p>
                  </div>
                </div>

                {/* Substitution help button */}
                <button
                  onClick={() => openSubstitutionFor(ing.name)}
                  title="Find substitute ingredient"
                  className="px-2 py-1 rounded-lg text-[11px] font-semibold text-slate-600 hover:text-amber-900 hover:bg-amber-100/60 border border-white/80 bg-white/50 backdrop-blur-xs flex items-center gap-1 shrink-0 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span className="hidden sm:inline">Substitute</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP-BY-STEP OVERVIEW */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {t.instructions}
            </h2>
            <p className="text-xs text-slate-500">
              {recipe.steps.length} sequential phases with temperature and timing guidance
            </p>
          </div>
          
          <button
            onClick={() => onStartCooking(recipe, servings, cookingStyle)}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 flex items-center gap-1.5 transition-all border border-white/30"
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Launch Live Step View</span>
          </button>
        </div>

        <div className="space-y-4">
          {recipe.steps.map((step) => {
            const stepInstruction = step.instructionTranslations?.[language] || step.instruction;
            return (
              <div
                key={step.stepNumber}
                className="p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-2xs flex flex-col sm:flex-row gap-4"
              >
                {(step.imageUrl || step.image) && (
                  <div className="sm:w-36 aspect-16/10 sm:aspect-square rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-white/60">
                    <img
                      src={step.imageUrl || step.image}
                      alt={step.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        {step.stepNumber}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900">
                        {step.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      {step.durationMinutes && (
                        <span className="px-2 py-0.5 rounded-lg bg-white/70 backdrop-blur-xs border border-white/80 text-slate-700 font-semibold text-[11px] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.durationMinutes}m
                        </span>
                      )}
                      {step.temperatureOrHeat && (
                        <span className="px-2 py-0.5 rounded-lg bg-orange-100/80 backdrop-blur-xs border border-orange-200/50 text-orange-900 font-semibold text-[11px] flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          {step.temperatureOrHeat}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {stepInstruction}
                  </p>

                  {step.chefTip && (
                    <p className="text-xs text-amber-950 bg-amber-500/15 p-2.5 rounded-xl border border-amber-300/50 font-medium backdrop-blur-xs">
                      💡 <strong>Chef Tip:</strong> {step.chefTip}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* NUTRITIONAL BREAKDOWN */}
      {recipe.nutritionPerServing && (
        <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/85 to-slate-950/90 backdrop-blur-2xl text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl border border-white/20">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-lg leading-tight">{t.nutrition}</h3>
              <p className="text-xs text-slate-400">{t.perServing}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] text-slate-300 font-bold uppercase">{t.calories}</span>
              <p className="text-lg font-extrabold text-amber-400 mt-0.5">
                {recipe.nutritionPerServing.calories} kcal
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] text-slate-300 font-bold uppercase">{t.protein}</span>
              <p className="text-lg font-extrabold text-white mt-0.5">
                {recipe.nutritionPerServing.protein}g
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] text-slate-300 font-bold uppercase">{t.carbs}</span>
              <p className="text-lg font-extrabold text-white mt-0.5">
                {recipe.nutritionPerServing.carbohydrates}g
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] text-slate-300 font-bold uppercase">{t.fat}</span>
              <p className="text-lg font-extrabold text-white mt-0.5">
                {recipe.nutritionPerServing.fat}g
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] text-slate-300 font-bold uppercase">{t.fiber}</span>
              <p className="text-lg font-extrabold text-white mt-0.5">
                {recipe.nutritionPerServing.fiber}g
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Toast */}
      {shoppingToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-stone-900 text-white text-xs font-bold shadow-xl border border-stone-700 flex items-center gap-2 animate-in fade-in duration-200">
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>{shoppingToast}</span>
        </div>
      )}

      {/* Substitution Modal */}
      <SubstitutionModal
        isOpen={substitutionModalOpen}
        onClose={() => setSubstitutionModalOpen(false)}
        initialIngredient={activeSubIngredient}
        recipeName={recipe.name}
      />
    </div>
  );
};
