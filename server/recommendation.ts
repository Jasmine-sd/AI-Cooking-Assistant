import { Recipe, UserPreferences, RecipeMatchResult } from '../src/types';
import { db } from './db';

/**
 * Calculates content-based recommendation score and rationale for recipes
 */
export function calculatePersonalizedRecommendations(
  userId: string
): RecipeMatchResult[] {
  const user = db.findUserById(userId);
  const recipes = db.getRecipes();
  const history = db.getHistory(userId);
  
  if (!user) {
    return recipes.map(r => ({
      recipe: r,
      matchPercentage: Math.round(r.rating * 18 + 5),
      availableIngredients: [],
      missingIngredients: [],
      optionalIngredients: [],
      recommendationReason: 'Highly rated by the cooking community'
    }));
  }

  const prefs = user.preferences;
  const userPantry = user.pantry.map(p => p.toLowerCase());
  const favoriteCuisines = new Set(prefs.preferredCuisines);
  const userFavorites = new Set(user.favorites);

  // History weights: recent cooked cuisines
  const cookedCuisinesCount: Record<string, number> = {};
  for (const h of history) {
    cookedCuisinesCount[h.cuisine] = (cookedCuisinesCount[h.cuisine] || 0) + 1;
  }

  const results: RecipeMatchResult[] = recipes.map(recipe => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Dietary Match (Critical: 30 pts)
    const isDietaryMatch = recipe.dietaryTags.includes(prefs.dietaryPreference) ||
      (prefs.dietaryPreference === 'Vegetarian' && (recipe.dietaryTags.includes('Vegetarian') || recipe.dietaryTags.includes('Vegan'))) ||
      (prefs.dietaryPreference === 'Non-vegetarian');
    
    if (isDietaryMatch) {
      score += 25;
      reasons.push(`matches your ${prefs.dietaryPreference} preference`);
    } else {
      score -= 30; // heavy penalty for non-diet match
    }

    // 2. Cuisine Preference (20 pts)
    if (favoriteCuisines.has(recipe.cuisine)) {
      score += 20;
      reasons.push(`features your preferred ${recipe.cuisine} cuisine`);
    } else if (cookedCuisinesCount[recipe.cuisine]) {
      score += 10;
      reasons.push(`you enjoy cooking ${recipe.cuisine} dishes`);
    }

    // 3. Spice Level Alignment (15 pts)
    const spiceOrder = ['Mild', 'Medium', 'Spicy', 'Very Spicy'];
    const userSpiceIdx = spiceOrder.indexOf(prefs.spiceLevel);
    const recipeSpiceIdx = spiceOrder.indexOf(recipe.spiceLevel);
    const spiceDiff = Math.abs(userSpiceIdx - recipeSpiceIdx);
    
    if (spiceDiff === 0) {
      score += 15;
      reasons.push(`has your preferred ${prefs.spiceLevel.toLowerCase()} spice level`);
    } else if (spiceDiff === 1) {
      score += 10;
    } else {
      score += 2;
    }

    // 4. Cooking Time Compatibility (15 pts)
    let timeLimit = 120;
    if (prefs.availableTime === 'Under 15 minutes') timeLimit = 15;
    else if (prefs.availableTime === 'Under 30 minutes') timeLimit = 30;
    else if (prefs.availableTime === 'Under 60 minutes') timeLimit = 60;

    if (recipe.totalTimeMinutes <= timeLimit) {
      score += 15;
      reasons.push(`can be prepared in under ${recipe.totalTimeMinutes} minutes`);
    } else if (recipe.totalTimeMinutes <= timeLimit + 15) {
      score += 8;
    }

    // 5. Budget Match (10 pts)
    if (recipe.budget === prefs.budget) {
      score += 10;
    } else {
      score += 5;
    }

    // 6. Community Rating & Popularity (10 pts)
    score += (recipe.rating / 5) * 10;

    // 7. Favorite & History Bonus
    if (userFavorites.has(recipe.id)) {
      score += 8;
    }

    // 8. Pantry ingredient overlap
    const availableIngredients: string[] = [];
    const missingIngredients: string[] = [];
    const optionalIngredients: string[] = [];

    for (const ing of recipe.ingredients) {
      if (ing.optional) {
        optionalIngredients.push(ing.name);
        continue;
      }
      const ingLower = ing.name.toLowerCase();
      const inPantry = userPantry.some(p => ingLower.includes(p) || p.includes(ingLower));
      if (inPantry) {
        availableIngredients.push(ing.name);
      } else {
        missingIngredients.push(ing.name);
      }
    }

    if (availableIngredients.length > 0) {
      const pantryRatio = availableIngredients.length / (recipe.ingredients.length - optionalIngredients.length || 1);
      score += Math.round(pantryRatio * 15);
      if (pantryRatio >= 0.6) {
        reasons.push(`you already have ${availableIngredients.length} ingredients in your pantry`);
      }
    }

    // Normalize score to percentage 40% - 98%
    const normalizedScore = Math.min(98, Math.max(45, Math.round(score)));

    // Formulate clean reason
    const recommendationReason = reasons.length > 0 
      ? `Recommended because it ${reasons.slice(0, 3).join(', ')}.`
      : 'Recommended based on overall taste profile and user ratings.';

    return {
      recipe,
      matchPercentage: normalizedScore,
      availableIngredients,
      missingIngredients,
      optionalIngredients,
      recommendationReason
    };
  });

  return results.sort((a, b) => b.matchPercentage - a.matchPercentage);
}

const PANTRY_STAPLES = new Set([
  'salt', 'water', 'oil', 'cooking oil', 'vegetable oil', 'olive oil',
  'black pepper', 'pepper', 'turmeric', 'chili powder', 'sugar'
]);

function normalizeTerm(term: string): string {
  return term.toLowerCase().trim()
    .replace(/[,\(\)\/\-\+]/g, ' ')
    .replace(/\s+/g, ' ');
}

// Check if an ingredient matches user input with stemming and synonyms
function ingredientMatchesInput(ingName: string, subName: string | undefined, userInputs: string[]): boolean {
  const normIng = normalizeTerm(ingName);
  const normSub = subName ? normalizeTerm(subName) : '';

  for (const rawInput of userInputs) {
    const input = normalizeTerm(rawInput);
    if (!input) continue;

    // Direct substring in either direction
    if (normIng.includes(input) || input.includes(normIng)) return true;
    if (normSub && (normSub.includes(input) || input.includes(normSub))) return true;

    // Stemming / Plurals (e.g. tomato -> tomatoes, bean -> beans, potato -> potatoes)
    const singularInput = input.endsWith('es') ? input.slice(0, -2) : input.endsWith('s') ? input.slice(0, -1) : input;
    const pluralInput = input.endsWith('o') ? `${input}es` : `${input}s`;
    
    if (normIng.includes(singularInput) || normIng.includes(pluralInput)) return true;

    // Culinary synonyms
    if ((input === 'pasta' || singularInput === 'pasta') && (normIng.includes('penne') || normIng.includes('spaghetti') || normIng.includes('macaroni') || normIng.includes('fusilli') || normIng.includes('pasta') || normSub.includes('pasta'))) return true;
    if ((input === 'tomato' || singularInput === 'tomato') && (normIng.includes('tomato') || normIng.includes('puree'))) return true;
    if ((input === 'potato' || singularInput === 'potato') && (normIng.includes('potato') || normIng.includes('aloo'))) return true;
    if ((input === 'onion' || singularInput === 'onion') && normIng.includes('onion')) return true;
    if (input === 'garlic' && (normIng.includes('garlic') || normIng.includes('ginger-garlic'))) return true;
    if (input === 'ginger' && (normIng.includes('ginger') || normIng.includes('ginger-garlic'))) return true;
    if (input === 'paneer' && (normIng.includes('paneer') || normIng.includes('cottage cheese') || normSub.includes('paneer'))) return true;
    if (input === 'tofu' && (normIng.includes('tofu') || normSub.includes('tofu'))) return true;
    if (input === 'rice' && (normIng.includes('rice') || normIng.includes('basmati') || normIng.includes('jasmine'))) return true;
    if ((input === 'chickpea' || singularInput === 'chickpea' || input === 'chana') && (normIng.includes('chickpea') || normIng.includes('chana'))) return true;
    if ((input === 'bean' || singularInput === 'bean') && normIng.includes('bean')) return true;
    if ((input === 'chili' || input === 'chilli' || singularInput === 'chili') && (normIng.includes('chili') || normIng.includes('chilli') || normIng.includes('chilies'))) return true;
    if ((input === 'egg' || singularInput === 'egg') && normIng.includes('egg')) return true;
    if (input === 'chicken' && normIng.includes('chicken')) return true;
    if ((input === 'bread' || input === 'toast' || input === 'pav') && (normIng.includes('bread') || normIng.includes('sourdough') || normIng.includes('pav'))) return true;
    if (input === 'chocolate' && (normIng.includes('chocolate') || normIng.includes('cocoa'))) return true;
  }

  return false;
}

/**
 * Calculates recipe matches based purely on user entered/pantry ingredients
 */
export function matchRecipesByIngredients(
  inputIngredients: string[],
  onlyWhatIHave: boolean = false
): RecipeMatchResult[] {
  const recipes = db.getRecipes();
  const normalizedInputs = inputIngredients
    .map(i => i.trim().toLowerCase())
    .filter(i => i.length > 0);

  if (normalizedInputs.length === 0) {
    return recipes.map(r => ({
      recipe: r,
      matchPercentage: 0,
      availableIngredients: [],
      missingIngredients: r.ingredients.filter(i => !i.optional).map(i => i.name),
      optionalIngredients: r.ingredients.filter(i => i.optional).map(i => i.name),
      recommendationReason: 'Add your available ingredients to see match percentage.'
    }));
  }

  const results: RecipeMatchResult[] = [];

  for (const recipe of recipes) {
    const requiredIngs = recipe.ingredients.filter(i => !i.optional);
    const optionalIngs = recipe.ingredients.filter(i => i.optional);

    const available: string[] = [];
    const missing: string[] = [];
    const missingNonStaples: string[] = [];

    for (const req of requiredIngs) {
      const isMatched = ingredientMatchesInput(req.name, req.homestyleSubstitute?.name, normalizedInputs);

      if (isMatched) {
        available.push(req.name);
      } else {
        missing.push(req.name);
        const normName = normalizeTerm(req.name);
        const isStaple = Array.from(PANTRY_STAPLES).some(s => normName.includes(s));
        if (!isStaple) {
          missingNonStaples.push(req.name);
        }
      }
    }

    // Must have at least 1 matching ingredient to be considered relevant
    if (available.length === 0) {
      continue;
    }

    const totalRequired = requiredIngs.length;
    // Calculate how many of the user's entered items are utilized by this recipe
    const usedUserInputs = normalizedInputs.filter(input =>
      requiredIngs.some(req => ingredientMatchesInput(req.name, req.homestyleSubstitute?.name, [input]))
    );
    const userCoverageRatio = normalizedInputs.length > 0 ? usedUserInputs.length / normalizedInputs.length : 0;

    // Base match from recipe required ingredients coverage
    const recipeCoverageRatio = totalRequired > 0 ? available.length / totalRequired : 1;

    // Check if user has the primary star ingredient in the recipe title
    const recipeTitleLower = recipe.name.toLowerCase();
    const hasCoreDishIngredient = normalizedInputs.some(input => 
      recipeTitleLower.includes(input) || (input === 'pasta' && (recipeTitleLower.includes('penne') || recipeTitleLower.includes('pasta')))
    );

    // Blended smart match score (60% recipe completeness + 40% user pantry utilization + bonus for star ingredient)
    let rawScore = (recipeCoverageRatio * 50) + (userCoverageRatio * 50);
    if (hasCoreDishIngredient) {
      rawScore += 15;
    }
    // High coverage bonus if user provides all major items
    if (userCoverageRatio >= 0.8 && available.length >= 3) {
      rawScore = Math.max(rawScore, 85 + (available.length * 2));
    }

    const matchPercentage = Math.min(100, Math.max(20, Math.round(rawScore)));

    // If onlyWhatIHave is requested:
    // Keep recipes where user has the key star ingredient or >= 50% match
    if (onlyWhatIHave) {
      const isKeyMatch = hasCoreDishIngredient || matchPercentage >= 50;
      if (!isKeyMatch && (missingNonStaples.length > 2 || matchPercentage < 40)) {
        continue;
      }
    }

    results.push({
      recipe,
      matchPercentage,
      availableIngredients: available,
      missingIngredients: missing,
      optionalIngredients: optionalIngs.map(i => i.name),
      recommendationReason: matchPercentage >= 90
        ? 'Great match! Uses your ingredients perfectly with minimal missing items!'
        : hasCoreDishIngredient
        ? `Features your key ingredient with ${available.length} items on hand!`
        : `Uses ${usedUserInputs.length} of your ingredients (${available.length}/${totalRequired} total required items).`
    });
  }

  return results.sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    return b.availableIngredients.length - a.availableIngredients.length;
  });
}
