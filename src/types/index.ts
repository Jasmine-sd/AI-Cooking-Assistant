export type CuisineType = 
  | 'Indian' 
  | 'Italian' 
  | 'Mexican' 
  | 'Asian'
  | 'Chinese' 
  | 'Continental' 
  | 'American' 
  | 'Thai' 
  | 'Japanese'
  | 'Mediterranean';

export type TastePreference = 'All' | 'Spicy' | 'Sweet' | 'Salty' | 'Mild' | 'Savory' | 'Tangy';

export type MealCategory = 
  | 'Breakfast' 
  | 'Main Course' 
  | 'Snacks' 
  | 'Desserts' 
  | 'Healthy' 
  | 'Street Food'
  | 'Soups & Salads';

export type DietaryType = 
  | 'Vegetarian' 
  | 'Non-vegetarian' 
  | 'Non-Vegetarian'
  | 'High-Protein'
  | 'Vegan' 
  | 'Egg-free' 
  | 'Dairy-free' 
  | 'Gluten-free';

export type SpiceLevel = 'None' | 'Mild' | 'Medium' | 'Spicy' | 'Very Spicy';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type CookingExperience = 'Beginner' | 'Intermediate' | 'Advanced';

export type BudgetTier = '$' | '$$' | '$$$';
export type BudgetPreference = BudgetTier;
export type TimePreference = 'Under 15 minutes' | 'Under 30 minutes' | 'Under 60 minutes' | 'No limit' | 'Any time';

export type RecipeStyle = 'restaurant' | 'homestyle';

export type LanguageCode = 'en' | 'te' | 'hi' | 'es' | 'fr' | 'ta';

export interface Ingredient {
  id: string;
  name: string;
  nameTranslations?: Partial<Record<LanguageCode, string>>;
  baseQuantity: number;
  unit: string;
  category: 'Produce' | 'Dairy & Refrigerated' | 'Meat & Seafood' | 'Pantry & Spices' | 'Grains & Pasta' | 'Bakery' | 'Oils & Condiments';
  optional?: boolean;
  notes?: string;
  homestyleSubstitute?: {
    name: string;
    quantityRatio: number; // e.g. 1.0
    unit: string;
    note: string;
  };
}

export interface RecipeStep {
  id: string;
  stepNumber: number;
  title: string;
  titleTranslations?: Partial<Record<LanguageCode, string>>;
  instruction: string;
  instructionTranslations?: Partial<Record<LanguageCode, string>>;
  durationMinutes?: number;
  temperatureOrHeat?: 'Low' | 'Medium-Low' | 'Medium' | 'Medium-High' | 'High' | 'Simmer' | '350°F / 175°C' | '375°F / 190°C' | '400°F / 200°C';
  image?: string;
  imageUrl?: string;
  visualGuide?: string; // Description or animation guide for the technique
  ingredientsUsed?: {
    ingredientId: string;
    quantityRatio: number; // fraction of total ingredient needed for this step (e.g. 0.5 or 1.0)
  }[];
  chefTip?: string;
}

export type CookingStep = RecipeStep;

export interface NutritionInfo {
  calories: number; // kcal per serving
  protein: number; // g
  carbohydrates: number; // g
  fat: number; // g
  fiber: number; // g
}

export interface Recipe {
  id: string;
  name: string;
  nameTranslations?: Partial<Record<LanguageCode, string>>;
  description: string;
  descriptionTranslations?: Partial<Record<LanguageCode, string>>;
  cuisine: CuisineType;
  tasteProfile?: 'Spicy' | 'Sweet' | 'Salty' | 'Mild' | 'Savory' | 'Tangy';
  category: MealCategory;
  image: string;
  imageUrl?: string;
  baseServings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  difficulty: DifficultyLevel;
  spiceLevel: SpiceLevel;
  dietaryTags: DietaryType[];
  budget: BudgetTier;
  rating: number;
  reviewsCount: number;
  author: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  nutrition: NutritionInfo;
  authenticStyleNotes: string;
  homestyleNotes: string;
  substitutions: {
    original: string;
    substitute: string;
    ratio: string;
    notes: string;
  }[];
}

export interface UserPreferences {
  dietaryPreference: DietaryType;
  spiceLevel: SpiceLevel;
  cookingExperience: CookingExperience;
  availableTime: TimePreference;
  budget: BudgetTier;
  preferredCuisines: CuisineType[];
  preferredLanguage: LanguageCode;
  voiceEnabled: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  preferences: UserPreferences;
  favorites: string[]; // recipe IDs
  pantry: string[]; // list of available ingredient names
}

export interface CookingHistoryItem {
  id: string;
  userId: string;
  recipeId: string;
  recipeName: string;
  recipeImage: string;
  cuisine: CuisineType;
  servingsCooked: number;
  styleUsed: RecipeStyle;
  cookedAt: string;
  rating?: number;
  notes?: string;
  completed: boolean;
}

export interface ShoppingListItem {
  id: string;
  userId: string;
  recipeId?: string;
  recipeName?: string;
  ingredient: string;
  quantity: number;
  unit: string;
  category: string;
  completed: boolean;
  optional?: boolean;
}

export interface RecipeMatchResult {
  recipe: Recipe;
  matchPercentage: number;
  availableIngredients: string[];
  missingIngredients: string[];
  optionalIngredients: string[];
  recommendationReason?: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: number;
  audioUrl?: string;
  isVoice?: boolean;
  actionCommand?: string;
}

export interface MistakeRecoveryOption {
  type: string;
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
}
