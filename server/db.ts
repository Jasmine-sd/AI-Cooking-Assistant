import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Recipe, UserProfile, UserPreferences, CookingHistoryItem, ShoppingListItem } from '../src/types';
import { INITIAL_RECIPES } from './recipesData';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
  preferences: UserPreferences;
  favorites: string[];
  pantry: string[];
}

export interface DBData {
  users: UserAccount[];
  recipes: Recipe[];
  history: CookingHistoryItem[];
  shoppingList: ShoppingListItem[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Password hashing helpers
export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

// Recipe Validation & Sanitization helper ensuring TITLE = IMAGE = DESCRIPTION = INGREDIENTS = STEPS = METADATA
export function validateAndSanitizeRecipe(recipe: Recipe): Recipe {
  if (!recipe || !recipe.name) return recipe;
  const nameLower = recipe.name.toLowerCase();
  
  // Ensure image matches recipe identity
  let resolvedImage = recipe.image || recipe.imageUrl || '';
  
  // 1. Egg Curry guarantee
  if (nameLower.includes('egg curry') || nameLower.includes('anda curry') || nameLower.includes('egg masala') || nameLower.includes('గుడ్డు') || nameLower.includes('అండా')) {
    resolvedImage = '/images/dhaba_egg_curry.jpg';
  }
  // 2. Aloo / Potato Curry guarantee
  else if (nameLower.includes('aloo') || nameLower.includes('potato curry') || nameLower.includes('dum aloo') || nameLower.includes('ఆలూ') || nameLower.includes('బంగాళాదుంప')) {
    resolvedImage = '/images/aloo_curry.jpg';
  }
  // 3. Palak Paneer guarantee
  else if (nameLower.includes('palak') || nameLower.includes('saag')) {
    resolvedImage = '/images/palak_paneer.jpg';
  }
  // 4. Samosa guarantee
  else if (nameLower.includes('samosa')) {
    resolvedImage = '/images/crispy_samosa.jpg';
  }
  // 5. Biryani guarantee
  else if (nameLower.includes('biryani')) {
    resolvedImage = '/images/hyderabadi_biryani.jpg';
  }
  // 6. Paneer Butter Masala & Paneer Curries
  else if (nameLower.includes('paneer butter') || nameLower.includes('shahi paneer') || nameLower.includes('paneer makhani') || nameLower.includes('paneer curry')) {
    resolvedImage = '/images/paneer_butter_masala.jpg';
  }
  else if (nameLower.includes('paneer tikka')) {
    resolvedImage = 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80';
  }
  // 7. Idli guarantee
  else if (nameLower.includes('idli') || nameLower.includes('idly') || nameLower.includes('ఇడ్లీ')) {
    resolvedImage = '/images/steamed_idlis.jpg';
  }
  // 8. Dosa guarantee
  else if (nameLower.includes('dosa') || nameLower.includes('దోస')) {
    resolvedImage = '/images/crispy_masala_dosa.jpg';
  }
  // 9. Pani Puri guarantee
  else if (nameLower.includes('pani puri') || nameLower.includes('golgappa') || nameLower.includes('పానీపూరి')) {
    resolvedImage = '/images/pani_puri.jpg';
  }
  // 10. Pasta guarantee
  else if (nameLower.includes('pasta') || nameLower.includes('penne') || nameLower.includes('spaghetti')) {
    resolvedImage = '/images/garlic_tomato_penne.jpg';
  }
  // 11. Dal Tadka vs Dal Makhani
  else if (nameLower.includes('dal tadka') || nameLower.includes('yellow dal') || nameLower.includes('dal fry')) {
    resolvedImage = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80';
  }
  else if (nameLower.includes('dal makhani')) {
    resolvedImage = '/images/dal_makhani_pot.jpg';
  }
  // 12. Sweets & Desserts
  else if (nameLower.includes('gulab jamun')) {
    resolvedImage = '/images/soft_gulab_jamun.jpg';
  }
  else if (nameLower.includes('rasgulla') || nameLower.includes('rosogolla')) {
    resolvedImage = '/images/white_rasgulla.jpg';
  }
  else if (nameLower.includes('besan laddu') || nameLower.includes('laddu')) {
    resolvedImage = '/images/royal_besan_laddu.jpg';
  }
  else if (nameLower.includes('lava cake') || nameLower.includes('molten lava')) {
    resolvedImage = '/images/molten_lava_baked.jpg';
  }
  // 13. Chicken dishes
  else if (nameLower.includes('butter chicken') || nameLower.includes('murgh makhani')) {
    resolvedImage = 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80';
  }
  else if (nameLower.includes('chicken') || nameLower.includes('tikka masala')) {
    resolvedImage = 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80';
  }
  // 14. Fish / Seafood
  else if (nameLower.includes('fish') || nameLower.includes('prawn') || nameLower.includes('seafood')) {
    resolvedImage = 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80';
  }

  // Sanitize and validate steps (strip any video artifacts and guarantee step images)
  const validSteps = (recipe.steps || []).map((step, idx) => ({
    ...step,
    id: step.id || `step-${idx + 1}`,
    stepNumber: step.stepNumber || idx + 1,
    image: step.image || step.imageUrl || resolvedImage,
    imageUrl: step.imageUrl || step.image || resolvedImage
  }));

  return {
    ...recipe,
    image: resolvedImage,
    imageUrl: resolvedImage,
    steps: validSteps
  };
}

class Database {
  private data: DBData;

  constructor() {
    this.data = {
      users: [],
      recipes: INITIAL_RECIPES.map(validateAndSanitizeRecipe),
      history: [],
      shoppingList: []
    };
    this.init();
  }

  private init() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        
        // Merge INITIAL_RECIPES so latest verified recipes and images always take precedence
        const seenIds = new Set<string>();
        const seenCanonicalKeys = new Set<string>();
        const mergedRecipes: Recipe[] = [];

        const getCanonicalKey = (name: string, id: string): string => {
          const lower = name.toLowerCase();
          if (lower.includes('palak paneer') || lower.includes('saag paneer')) return 'dish_palak_paneer';
          if (lower.includes('egg curry') || lower.includes('anda curry')) return 'dish_egg_curry';
          if (lower.includes('aloo curry') || lower.includes('potato curry') || lower.includes('dum aloo')) return 'dish_aloo_curry';
          if (lower.includes('samosa')) return 'dish_samosa';
          if (lower.includes('biryani')) return 'dish_biryani';
          if (lower.includes('paneer butter') || lower.includes('shahi paneer')) return 'dish_paneer_butter';
          if (lower.includes('paneer tikka')) return 'dish_paneer_tikka';
          if (lower.includes('pani puri') || lower.includes('golgappa')) return 'dish_pani_puri';
          if (lower.includes('dosa')) return 'dish_dosa';
          if (lower.includes('idli')) return 'dish_idli';
          if (lower.includes('pav bhaji')) return 'dish_pav_bhaji';
          if (lower.includes('chole') || lower.includes('bhature')) return 'dish_chole_bhature';
          if (lower.includes('dal makhani')) return 'dish_dal_makhani';
          if (lower.includes('pasta') || lower.includes('penne')) return 'dish_pasta';
          if (lower.includes('gulab jamun')) return 'dish_gulab_jamun';
          if (lower.includes('rasgulla')) return 'dish_rasgulla';
          if (lower.includes('besan laddu')) return 'dish_besan_laddu';
          if (lower.includes('lava cake')) return 'dish_lava_cake';
          return lower.replace(/[^a-z0-9]/g, '');
        };

        // First add authentic initial recipes
        for (const r of INITIAL_RECIPES) {
          const validated = validateAndSanitizeRecipe(r);
          const cKey = getCanonicalKey(validated.name, validated.id);
          if (!seenIds.has(validated.id) && !seenCanonicalKeys.has(cKey)) {
            seenIds.add(validated.id);
            seenCanonicalKeys.add(cKey);
            mergedRecipes.push(validated);
          }
        }

        // Then merge non-duplicate user-created recipes (ignoring broken drafts or redundant duplicates)
        if (Array.isArray(parsed.recipes)) {
          for (const r of parsed.recipes) {
            if ((r.id.startsWith('rasg') || r.name.toLowerCase().startsWith('authentic rasg')) && r.id !== 'kolkata-white-rasgulla') {
              continue; // Purge partial keystroke entries
            }
            const validated = validateAndSanitizeRecipe(r);
            const cKey = getCanonicalKey(validated.name, validated.id);
            if (!seenIds.has(validated.id) && !seenCanonicalKeys.has(cKey)) {
              seenIds.add(validated.id);
              seenCanonicalKeys.add(cKey);
              mergedRecipes.push(validated);
            }
          }
        }

        this.data = {
          users: parsed.users || [],
          recipes: mergedRecipes,
          history: parsed.history || [],
          shoppingList: parsed.shoppingList || []
        };
        // Guarantee demo user is always present
        if (!this.data.users.some(u => u.email.toLowerCase() === 'demo@culinarycompanion.com' || u.id === 'usr_demo_chef')) {
          this.seedDemoUser();
        }
        this.save();
      } else {
        this.seedInitialData();
        this.save();
      }
    } catch (e) {
      console.error('Error initializing database file:', e);
      this.seedInitialData();
    }
  }

  public seedDemoUser(): UserAccount {
    const salt = generateSalt();
    const demoPasswordHash = hashPassword('Demo123!', salt);
    
    const demoUser: UserAccount = {
      id: 'usr_demo_chef',
      name: 'Demo Chef',
      email: 'demo@culinarycompanion.com',
      passwordHash: demoPasswordHash,
      salt: salt,
      createdAt: new Date().toISOString(),
      preferences: {
        dietaryPreference: 'Vegetarian',
        spiceLevel: 'Medium',
        cookingExperience: 'Intermediate',
        availableTime: 'Under 30 minutes',
        budget: '$$',
        preferredCuisines: ['Indian', 'Italian', 'Mexican'],
        preferredLanguage: 'en',
        voiceEnabled: true
      },
      favorites: ['garlic-tomato-pasta', 'hyderabadi-biryani', 'crispy-paneer-tikka', 'authentic-pani-puri', 'crispy-masala-dosa'],
      pantry: ['Pasta', 'Tomato', 'Garlic', 'Olive Oil', 'Paneer', 'Onion', 'Rice', 'Curd', 'Butter']
    };

    const existingIdx = this.data.users.findIndex(u => u.id === 'usr_demo_chef' || u.email.toLowerCase() === 'demo@culinarycompanion.com');
    if (existingIdx >= 0) {
      this.data.users[existingIdx] = demoUser;
    } else {
      this.data.users.push(demoUser);
    }
    this.save();
    return demoUser;
  }

  public getOrCreateDemoUser(): UserAccount {
    let demo = this.findUserById('usr_demo_chef') || this.findUserByEmail('demo@culinarycompanion.com');
    if (!demo) {
      demo = this.seedDemoUser();
    }
    return demo;
  }

  private seedInitialData() {
    // Seed default demo user
    const salt = generateSalt();
    const demoPasswordHash = hashPassword('Demo123!', salt);
    
    const demoUser: UserAccount = {
      id: 'usr_demo_chef',
      name: 'Demo Chef',
      email: 'demo@culinarycompanion.com',
      passwordHash: demoPasswordHash,
      salt: salt,
      createdAt: new Date().toISOString(),
      preferences: {
        dietaryPreference: 'Vegetarian',
        spiceLevel: 'Medium',
        cookingExperience: 'Intermediate',
        availableTime: 'Under 30 minutes',
        budget: '$$',
        preferredCuisines: ['Indian', 'Italian', 'Mexican'],
        preferredLanguage: 'en',
        voiceEnabled: true
      },
      favorites: ['garlic-tomato-pasta', 'hyderabadi-biryani', 'crispy-paneer-tikka', 'authentic-pani-puri', 'crispy-masala-dosa'],
      pantry: ['Pasta', 'Tomato', 'Garlic', 'Olive Oil', 'Paneer', 'Onion', 'Rice', 'Curd', 'Butter']
    };

    const demoHistory: CookingHistoryItem[] = [
      {
        id: 'hist_1',
        userId: 'usr_demo_chef',
        recipeId: 'garlic-tomato-pasta',
        recipeName: 'Creamy Garlic & Roasted Tomato Penne',
        recipeImage: 'https://images.unsplash.com/photo-1621996346565-e3d5d628169a?auto=format&fit=crop&w=1200&q=80',
        cuisine: 'Italian',
        servingsCooked: 4,
        styleUsed: 'homestyle',
        cookedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        rating: 5,
        notes: 'Delicious! Used cheddar instead of parmesan and added extra garlic.',
        completed: true
      },
      {
        id: 'hist_2',
        userId: 'usr_demo_chef',
        recipeId: 'butter-chicken',
        recipeName: 'Classic Murgh Makhani (Butter Chicken)',
        recipeImage: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
        cuisine: 'Indian',
        servingsCooked: 4,
        styleUsed: 'restaurant',
        cookedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
        rating: 5,
        notes: 'Restaurant quality gravy! Very smooth.',
        completed: true
      }
    ];

    const demoShopping: ShoppingListItem[] = [
      {
        id: 'shop_1',
        userId: 'usr_demo_chef',
        recipeId: 'hyderabadi-biryani',
        recipeName: 'Hyderabadi Dum Biryani',
        ingredient: 'Aged Basmati Rice',
        quantity: 350,
        unit: 'g',
        category: 'Grains & Pasta',
        completed: false
      },
      {
        id: 'shop_2',
        userId: 'usr_demo_chef',
        recipeId: 'hyderabadi-biryani',
        recipeName: 'Hyderabadi Dum Biryani',
        ingredient: 'Fresh Mint Leaves',
        quantity: 1,
        unit: 'bunch',
        category: 'Produce',
        completed: true
      }
    ];

    this.data.users = [demoUser];
    this.data.recipes = INITIAL_RECIPES;
    this.data.history = demoHistory;
    this.data.shoppingList = demoShopping;
  }

  private save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write database file:', err);
    }
  }

  // Recipes
  getRecipes(): Recipe[] {
    const seenIds = new Set<string>();
    const seenNames = new Set<string>();
    return this.data.recipes.filter(r => {
      if ((r.id.startsWith('rasg') || r.name.toLowerCase().startsWith('authentic rasg')) && r.id !== 'kolkata-white-rasgulla') {
        return false;
      }
      const normName = r.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seenIds.has(r.id) || seenNames.has(normName)) {
        return false;
      }
      seenIds.add(r.id);
      seenNames.add(normName);
      return true;
    });
  }

  getRecipeById(id: string): Recipe | undefined {
    const r = this.data.recipes.find(r => r.id === id);
    return r ? validateAndSanitizeRecipe(r) : undefined;
  }

  addRecipe(recipe: Recipe): void {
    const validated = validateAndSanitizeRecipe(recipe);
    if (!this.data.recipes.some(r => r.id === validated.id)) {
      this.data.recipes.push(validated);
      this.save();
    }
  }

  // Users & Auth
  findUserByEmail(email: string): UserAccount | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id: string): UserAccount | undefined {
    return this.data.users.find(u => u.id === id);
  }

  createUser(name: string, email: string, passwordPlain: string): UserProfile {
    const salt = generateSalt();
    const passwordHash = hashPassword(passwordPlain, salt);
    const id = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const newUser: UserAccount = {
      id,
      name,
      email,
      passwordHash,
      salt,
      createdAt: new Date().toISOString(),
      preferences: {
        dietaryPreference: 'Vegetarian',
        spiceLevel: 'Medium',
        cookingExperience: 'Beginner',
        availableTime: 'Under 30 minutes',
        budget: '$$',
        preferredCuisines: ['Indian', 'Italian'],
        preferredLanguage: 'en',
        voiceEnabled: true
      },
      favorites: [],
      pantry: ['Salt', 'Oil', 'Onion', 'Garlic', 'Tomato']
    };

    this.data.users.push(newUser);
    this.save();
    return this.toUserProfile(newUser);
  }

  updateUserProfile(userId: string, updates: { name?: string; preferences?: Partial<UserPreferences>; pantry?: string[] }): UserProfile | null {
    const user = this.findUserById(userId);
    if (!user) return null;

    if (updates.name) user.name = updates.name;
    if (updates.preferences) {
      user.preferences = { ...user.preferences, ...updates.preferences };
    }
    if (updates.pantry) {
      user.pantry = updates.pantry;
    }

    this.save();
    return this.toUserProfile(user);
  }

  toUserProfile(user: UserAccount): UserProfile {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      preferences: user.preferences,
      favorites: user.favorites,
      pantry: user.pantry
    };
  }

  // Favorites
  toggleFavorite(userId: string, recipeId: string): string[] {
    const user = this.findUserById(userId);
    if (!user) return [];

    const index = user.favorites.indexOf(recipeId);
    if (index > -1) {
      user.favorites.splice(index, 1);
    } else {
      user.favorites.push(recipeId);
    }
    this.save();
    return user.favorites;
  }

  // Cooking History
  getHistory(userId: string): CookingHistoryItem[] {
    return this.data.history
      .filter(h => h.userId === userId)
      .sort((a, b) => new Date(b.cookedAt).getTime() - new Date(a.cookedAt).getTime());
  }

  addHistory(item: Omit<CookingHistoryItem, 'id'>): CookingHistoryItem {
    const newItem: CookingHistoryItem = {
      ...item,
      id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
    };
    this.data.history.push(newItem);
    this.save();
    return newItem;
  }

  // Shopping List
  getShoppingList(userId: string): ShoppingListItem[] {
    return this.data.shoppingList.filter(s => s.userId === userId);
  }

  addShoppingItem(userId: string, item: Omit<ShoppingListItem, 'id' | 'userId'>): ShoppingListItem {
    const newItem: ShoppingListItem = {
      ...item,
      userId,
      id: `shop_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
    };
    this.data.shoppingList.push(newItem);
    this.save();
    return newItem;
  }

  toggleShoppingItem(id: string, userId: string): ShoppingListItem | null {
    const item = this.data.shoppingList.find(s => s.id === id && s.userId === userId);
    if (!item) return null;
    item.completed = !item.completed;
    this.save();
    return item;
  }

  deleteShoppingItem(id: string, userId: string): boolean {
    const initLen = this.data.shoppingList.length;
    this.data.shoppingList = this.data.shoppingList.filter(s => !(s.id === id && s.userId === userId));
    const deleted = this.data.shoppingList.length < initLen;
    if (deleted) this.save();
    return deleted;
  }

  clearCompletedShopping(userId: string): void {
    this.data.shoppingList = this.data.shoppingList.filter(s => !(s.userId === userId && s.completed));
    this.save();
  }

  addRecipeIngredientsToShoppingList(userId: string, recipeId: string, servings: number, missingOnly: boolean): ShoppingListItem[] {
    const recipe = this.getRecipeById(recipeId);
    const user = this.findUserById(userId);
    if (!recipe) return [];

    const userPantryLower = (user?.pantry || []).map(p => p.toLowerCase());
    const ratio = servings / recipe.baseServings;
    const addedItems: ShoppingListItem[] = [];

    for (const ing of recipe.ingredients) {
      const ingNameLower = ing.name.toLowerCase();
      const isAvailable = userPantryLower.some(p => ingNameLower.includes(p) || p.includes(ingNameLower));

      if (missingOnly && isAvailable) {
        continue;
      }

      // Check if already in shopping list
      const existing = this.data.shoppingList.find(
        s => s.userId === userId && s.ingredient.toLowerCase() === ing.name.toLowerCase() && !s.completed
      );

      if (existing) {
        existing.quantity += Math.round(ing.baseQuantity * ratio * 10) / 10;
        addedItems.push(existing);
      } else {
        const newItem: ShoppingListItem = {
          id: `shop_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          userId,
          recipeId: recipe.id,
          recipeName: recipe.name,
          ingredient: ing.name,
          quantity: Math.round(ing.baseQuantity * ratio * 10) / 10,
          unit: ing.unit,
          category: ing.category,
          completed: false,
          optional: ing.optional
        };
        this.data.shoppingList.push(newItem);
        addedItems.push(newItem);
      }
    }

    this.save();
    return addedItems;
  }
}

export const db = new Database();
