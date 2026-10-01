import React from 'react';
import { 
  Clock, 
  Flame, 
  Heart, 
  Sparkles, 
  ChefHat, 
  Utensils
} from 'lucide-react';
import { Recipe } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { FoodImage } from './FoodImage';

interface RecipeCardProps {
  recipe: Recipe;
  matchScore?: number;
  recommendationReason?: string;
  compact?: boolean;
  onSelect: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  matchScore,
  recommendationReason,
  compact = false,
  onSelect,
  onStartCooking
}) => {
  const { isFavorite, toggleFavorite, user } = useAuth();
  const { t, language } = useLanguage();
  const favorite = isFavorite(recipe.id);

  // Internationalized name and description if available
  const displayName = recipe.nameTranslations?.[language] || recipe.name;
  const displayDescription = recipe.descriptionTranslations?.[language] || recipe.description;

  return (
    <div 
      id={`recipe-card-${recipe.id}`}
      className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Image container */}
      <div 
        onClick={() => onSelect(recipe)}
        className="relative aspect-16/10 overflow-hidden bg-slate-100 cursor-pointer"
      >
        <FoodImage
          src={recipe.image || recipe.imageUrl}
          alt={displayName}
          category={recipe.category}
          cuisine={recipe.cuisine}
          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>

        {/* Match score badge */}
        {matchScore !== undefined && (
          <div 
            id={`recipe-match-score-${recipe.id}`}
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-500 text-white shadow-sm text-xs font-bold flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 fill-white" />
            <span>{matchScore}% {t.matchScore}</span>
          </div>
        )}

        {/* Favorite button */}
        <button
          id={`recipe-favorite-btn-${recipe.id}`}
          onClick={(e) => {
            e.stopPropagation();
            if (user) {
              toggleFavorite(recipe.id);
            }
          }}
          title="Save to Favorites"
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-sm ${
            favorite
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 hover:bg-white text-slate-700'
          }`}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
        </button>

        {/* Bottom image overlay: Cuisine & Category */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs pointer-events-none">
          <span className="font-semibold px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-xs border border-white/20 shadow-xs">
            {recipe.cuisine} • {recipe.category}
          </span>
          <span className="flex items-center gap-1 font-bold bg-black/70 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/20 shadow-xs">
            ★ {(recipe.rating || 5.0).toFixed(1)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Dietary tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {recipe.dietaryTags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200/60"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(recipe)}
            className="font-bold text-slate-900 text-base leading-snug hover:text-amber-600 cursor-pointer transition-colors line-clamp-1"
          >
            {displayName}
          </h3>

          {/* Short description or recommendation reason */}
          {!compact && (
            recommendationReason ? (
              <p className="text-xs text-amber-900 bg-amber-50 p-2 rounded-lg mt-2 border border-amber-200 line-clamp-2 min-h-[2.5rem]">
                💡 {recommendationReason}
              </p>
            ) : (
              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                {displayDescription}
              </p>
            )
          )}
        </div>

        {/* Key Metrics row */}
        {!compact && (
          <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-[10px] uppercase font-semibold flex items-center gap-0.5">
                <Clock className="w-3 h-3 text-amber-500" /> {t.totalTime}
              </span>
              <span className="font-bold text-slate-800 mt-0.5">{recipe.totalTimeMinutes}m</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-[10px] uppercase font-semibold flex items-center gap-0.5">
                <Flame className={`w-3 h-3 ${recipe.spiceLevel === 'None' ? 'text-slate-300' : 'text-orange-500'}`} /> {t.spiceLevel}
              </span>
              <span className={`font-semibold mt-0.5 ${recipe.spiceLevel === 'None' ? 'text-slate-600' : 'text-slate-800'}`}>
                {recipe.spiceLevel}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-slate-400 text-[10px] uppercase font-semibold flex items-center gap-0.5">
                <Utensils className="w-3 h-3 text-slate-500" /> {t.difficulty}
              </span>
              <span className="font-semibold text-slate-800 mt-0.5">{recipe.difficulty}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className={`pt-2 flex items-center gap-2 ${compact ? 'mt-auto' : ''}`}>
          <button
            id={`recipe-view-details-btn-${recipe.id}`}
            onClick={() => onSelect(recipe)}
            className="flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-all cursor-pointer flex items-center justify-center"
          >
            {t.explore}
          </button>
          
          <button
            id={`recipe-cook-with-me-btn-${recipe.id}`}
            onClick={() => onStartCooking(recipe)}
            className="flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>{t.cookWithMe}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
