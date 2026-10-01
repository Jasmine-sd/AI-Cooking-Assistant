import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { db, hashPassword } from './server/db';
import { calculatePersonalizedRecommendations, matchRecipesByIngredients } from './server/recommendation';
import { askCookingAssistant, askMistakeRecovery, askIngredientSubstitution, generateRecipeWithAI } from './server/gemini';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // --- AUTH ROUTES ---
  app.post('/api/auth/register', (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
      }
      const existing = db.findUserByEmail(email);
      if (existing) {
        return res.status(400).json({ error: 'An account with this email already exists.' });
      }
      const user = db.createUser(name, email, password);
      res.json({ user, token: `token_${user.id}` });
    } catch (e: any) {
      res.status(500).json({ error: e.message || 'Registration failed.' });
    }
  });

  // Dedicated 1-Click Demo Login Endpoint
  app.post('/api/auth/demo', (_req: Request, res: Response) => {
    try {
      const demoAccount = db.getOrCreateDemoUser();
      const user = db.toUserProfile(demoAccount);
      res.json({ user, token: `token_${user.id}` });
    } catch (e: any) {
      res.status(500).json({ error: e.message || 'Demo login failed' });
    }
  });

  app.post('/api/auth/login', (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
      }

      // Fast-path for dedicated demo user email
      if (email.toLowerCase() === 'demo@culinarycompanion.com' || email.toLowerCase() === 'demo@chef.app' || email.toLowerCase() === 'demo') {
        const demoAccount = db.getOrCreateDemoUser();
        const user = db.toUserProfile(demoAccount);
        return res.json({ user, token: `token_${user.id}` });
      }

      const userAccount = db.findUserByEmail(email);
      if (!userAccount) {
        return res.status(401).json({ error: 'Invalid email or password. You can also try our 1-Click Demo Account.' });
      }
      if (password) {
        const hashed = hashPassword(password, userAccount.salt);
        if (hashed !== userAccount.passwordHash) {
          return res.status(401).json({ error: 'Invalid email or password.' });
        }
      }
      const user = db.toUserProfile(userAccount);
      res.json({ user, token: `token_${user.id}` });
    } catch (e: any) {
      res.status(500).json({ error: e.message || 'Login failed.' });
    }
  });

  app.get('/api/auth/me', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const userId = authHeader?.replace('Bearer token_', '') || (req.query.userId as string);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const user = db.findUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: db.toUserProfile(user) });
  });

  app.post('/api/auth/profile', (req: Request, res: Response) => {
    try {
      const { userId, name, preferences, pantry } = req.body;
      if (!userId) return res.status(400).json({ error: 'User ID required' });
      const updated = db.updateUserProfile(userId, { name, preferences, pantry });
      if (!updated) return res.status(404).json({ error: 'User not found' });
      res.json({ user: updated });
    } catch (e: any) {
      res.status(500).json({ error: e.message || 'Update failed' });
    }
  });

  // --- RECIPES ROUTES ---
  app.get('/api/recipes', async (req: Request, res: Response) => {
    try {
      let recipes = db.getRecipes();
      const { search, cuisine, category, dietary, spice, taste, difficulty, maxTime, budget, lang } = req.query;

      if (search && typeof search === 'string' && search.trim().length > 0) {
        const s = search.toLowerCase().trim();
        const sClean = s.replace(/[^a-zA-Z0-9\u0C00-\u0C7F]/g, '');

        // Normalize common synonym keywords
        let matches = recipes.filter(r => {
          const rName = r.name.toLowerCase();
          const rNameClean = rName.replace(/[^a-zA-Z0-9\u0C00-\u0C7F]/g, '');
          const rTelugu = r.nameTranslations?.te?.toLowerCase() || '';

          if (rName.includes(s) || rNameClean.includes(sClean) || rTelugu.includes(s)) return true;

          // Regional synonyms and aliases
          if ((s.includes('rasgulla') || s.includes('rosogolla') || s.includes('rasg') || s.includes('రసగుల్లా') || s.includes('रसगुल्ला')) && r.id.includes('rasgulla')) return true;
          if ((s.includes('gulab') || s.includes('jamun') || s.includes('గులాబ్')) && r.id.includes('gulab-jamun')) return true;
          if ((s.includes('chole') || s.includes('bhatur') || s.includes('చోలే')) && r.id.includes('chole-bhature')) return true;
          if ((s.includes('dal makhani') || s.includes('makhani')) && r.id.includes('dal-makhani')) return true;
          if ((s.includes('pav bhaji') || s.includes('పావ్ భాజీ')) && r.id.includes('pav-bhaji')) return true;
          if ((s.includes('pani') || s.includes('puri') || s.includes('golgappa') || s.includes('puchka') || s.includes('పానీ')) && r.id.includes('pani-puri')) return true;
          if ((s.includes('fried rice') || s.includes('friedrice') || s.includes('ఫ్రైడ్')) && r.id.includes('fried-rice')) return true;
          if ((s.includes('laddu') || s.includes('ladoo') || s.includes('sweet') || s.includes('లడ్డూ')) && r.id.includes('laddu')) return true;
          if ((s.includes('dosa') || s.includes('dosai') || s.includes('దోస')) && r.id.includes('dosa')) return true;
          if ((s.includes('idli') || s.includes('iddly') || s.includes('ఇడ్లీ')) && r.id.includes('idli')) return true;
          if ((s.includes('pasta') || s.includes('spaghetti') || s.includes('penne') || s.includes('పాస్తా')) && r.id.includes('pasta')) return true;
          if ((s.includes('biryani') || s.includes('biriyani') || s.includes('బిర్యానీ')) && r.id.includes('biryani')) return true;
          if ((s.includes('butter chicken') || s.includes('murgh')) && r.id.includes('butter-chicken')) return true;
          if ((s.includes('tikka') || s.includes('paneer') || s.includes('పన్నీర్')) && r.id.includes('paneer')) return true;
          if ((s.includes('dal') || s.includes('lentil') || s.includes('పప్పు')) && r.id.includes('dal')) return true;
          if ((s.includes('cake') || s.includes('dessert') || s.includes('chocolate') || s.includes('కేక్')) && r.id.includes('cake')) return true;

          return (
            (r.nameTranslations && Object.values(r.nameTranslations).some(v => v.toLowerCase().includes(s))) ||
            r.description.toLowerCase().includes(s) ||
            r.cuisine.toLowerCase().includes(s) ||
            r.ingredients.some(i => i.name.toLowerCase().includes(s) || (i.nameTranslations && Object.values(i.nameTranslations).some(v => v.toLowerCase().includes(s))))
          );
        });

        // If no matching recipe found in static db, generate on-demand using AI for meaningful queries
        if (matches.length === 0 && search.trim().length >= 4) {
          const generatedRecipe = await generateRecipeWithAI(search, (lang as string) || 'en');
          if (generatedRecipe) {
            matches = [generatedRecipe];
          }
        }

        // Deduplicate matches
        const seenM = new Set<string>();
        const uniqueMatches = matches.filter(r => {
          if ((r.id.startsWith('rasg') || r.name.toLowerCase().startsWith('authentic rasg')) && r.id !== 'kolkata-white-rasgulla') return false;
          const norm = r.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (seenM.has(r.id) || seenM.has(norm)) return false;
          seenM.add(r.id);
          seenM.add(norm);
          return true;
        });

        return res.json(uniqueMatches);
      }

      if (cuisine && cuisine !== 'All') {
        const cLower = (cuisine as string).toLowerCase();
        if (cLower === 'asian') {
          recipes = recipes.filter(r => ['asian', 'chinese', 'japanese', 'thai', 'korean', 'vietnamese'].includes(r.cuisine.toLowerCase()));
        } else {
          recipes = recipes.filter(r => r.cuisine.toLowerCase() === cLower);
        }
      }

      if (taste && taste !== 'All') {
        const tLower = (taste as string).toLowerCase();
        recipes = recipes.filter(r => {
          if (r.tasteProfile) {
            return r.tasteProfile.toLowerCase() === tLower;
          }
          if (tLower === 'spicy') return r.spiceLevel === 'Spicy' || r.spiceLevel === 'Very Spicy';
          if (tLower === 'mild') return r.spiceLevel === 'Mild';
          if (tLower === 'sweet') return r.category === 'Desserts' || r.name.toLowerCase().includes('sweet') || r.description.toLowerCase().includes('sweet');
          if (tLower === 'salty' || tLower === 'savory') return r.category !== 'Desserts';
          return true;
        });
      }

      if (category && category !== 'All') {
        recipes = recipes.filter(r => r.category.toLowerCase() === (category as string).toLowerCase());
      }

      if (dietary && dietary !== 'All') {
        recipes = recipes.filter(r => r.dietaryTags.includes(dietary as any));
      }

      if (spice && spice !== 'All') {
        recipes = recipes.filter(r => r.spiceLevel === spice);
      }

      if (difficulty && difficulty !== 'All') {
        recipes = recipes.filter(r => r.difficulty === difficulty);
      }

      if (budget && budget !== 'All') {
        recipes = recipes.filter(r => r.budget === budget);
      }

      if (maxTime) {
        const timeLimit = parseInt(maxTime as string, 10);
        if (!isNaN(timeLimit)) {
          recipes = recipes.filter(r => r.totalTimeMinutes <= timeLimit);
        }
      }

      // Strictly deduplicate before returning to ensure clean, non-repeated recipes
      const seenIds = new Set<string>();
      const seenNames = new Set<string>();
      const uniqueRecipes = recipes.filter(r => {
        if ((r.id.startsWith('rasg') || r.name.toLowerCase().startsWith('authentic rasg')) && r.id !== 'kolkata-white-rasgulla') {
          return false;
        }
        const norm = r.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (seenIds.has(r.id) || seenNames.has(norm)) return false;
        seenIds.add(r.id);
        seenNames.add(norm);
        return true;
      });

      res.json({ recipes: uniqueRecipes });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Dedicated AI Recipe Generator Endpoint
  app.post('/api/recipes/generate', async (req: Request, res: Response) => {
    try {
      const { query, language } = req.body;
      if (!query) return res.status(400).json({ error: 'Query is required' });
      const generated = await generateRecipeWithAI(query, language || 'en');
      res.json({ recipe: generated });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Dedicated High-Quality TTS Audio Stream Endpoint (Supports Telugu, Hindi, English, Spanish, etc.)
  app.get('/api/tts', async (req: Request, res: Response) => {
    try {
      const text = (req.query.text as string) || '';
      const lang = (req.query.lang as string) || 'en';
      if (!text.trim()) {
        return res.status(400).json({ error: 'Text parameter required' });
      }

      const ttsLang = lang === 'te' ? 'te' : lang === 'hi' ? 'hi' : lang === 'ta' ? 'ta' : lang === 'es' ? 'es' : lang === 'fr' ? 'fr' : 'en';
      const encoded = encodeURIComponent(text.slice(0, 280));
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${ttsLang}&client=tw-ob&q=${encoded}`;

      const ttsRes = await fetch(ttsUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://translate.google.com/'
        }
      });

      if (!ttsRes.ok) {
        throw new Error(`TTS provider returned status ${ttsRes.status}`);
      }

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      const arrayBuffer = await ttsRes.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } catch (e: any) {
      console.error('Server TTS proxy error:', e);
      res.status(500).json({ error: 'TTS conversion failed', details: e.message });
    }
  });

  app.get('/api/recipes/:id', (req: Request, res: Response) => {
    const recipe = db.getRecipeById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ recipe });
  });

  // --- RECOMMENDATIONS & INGREDIENT MATCHER ---
  app.get('/api/recommendations', (req: Request, res: Response) => {
    const userId = (req.query.userId as string) || 'usr_demo_1';
    const recommendations = calculatePersonalizedRecommendations(userId);
    res.json({ recommendations });
  });

  app.post('/api/recipes/what-can-i-cook', (req: Request, res: Response) => {
    try {
      const { ingredients, onlyWhatIHave } = req.body;
      const results = matchRecipesByIngredients(ingredients || [], !!onlyWhatIHave);
      res.json({ results });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --- FAVORITES & HISTORY ---
  app.post('/api/favorites/toggle', (req: Request, res: Response) => {
    const { userId, recipeId } = req.body;
    if (!userId || !recipeId) return res.status(400).json({ error: 'userId and recipeId required' });
    const favorites = db.toggleFavorite(userId, recipeId);
    res.json({ favorites });
  });

  app.get('/api/history', (req: Request, res: Response) => {
    const userId = (req.query.userId as string) || 'usr_demo_1';
    const history = db.getHistory(userId);
    res.json({ history });
  });

  app.post('/api/history/log', (req: Request, res: Response) => {
    try {
      const { userId, recipeId, recipeName, recipeImage, cuisine, servingsCooked, styleUsed, rating, notes } = req.body;
      const item = db.addHistory({
        userId,
        recipeId,
        recipeName,
        recipeImage,
        cuisine,
        servingsCooked: servingsCooked || 2,
        styleUsed: styleUsed || 'homestyle',
        cookedAt: new Date().toISOString(),
        rating,
        notes,
        completed: true
      });
      res.json({ historyItem: item });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --- SHOPPING LIST ---
  app.get('/api/shopping-list', (req: Request, res: Response) => {
    const userId = (req.query.userId as string) || 'usr_demo_1';
    const items = db.getShoppingList(userId);
    res.json({ items });
  });

  app.post('/api/shopping-list/add', (req: Request, res: Response) => {
    const { userId, ingredient, quantity, unit, category, recipeId, recipeName } = req.body;
    if (!userId || !ingredient) return res.status(400).json({ error: 'userId and ingredient required' });
    const item = db.addShoppingItem(userId, {
      ingredient,
      quantity: quantity || 1,
      unit: unit || 'item',
      category: category || 'Pantry & Spices',
      completed: false,
      recipeId,
      recipeName
    });
    res.json({ item });
  });

  app.post('/api/shopping-list/toggle', (req: Request, res: Response) => {
    const { userId, id } = req.body;
    const item = db.toggleShoppingItem(id, userId);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ item });
  });

  app.delete('/api/shopping-list/:id', (req: Request, res: Response) => {
    const userId = (req.query.userId as string) || (req.body.userId as string);
    const success = db.deleteShoppingItem(req.params.id, userId);
    res.json({ success });
  });

  app.post('/api/shopping-list/clear-completed', (req: Request, res: Response) => {
    const { userId } = req.body;
    db.clearCompletedShopping(userId);
    res.json({ success: true });
  });

  app.post('/api/shopping-list/generate', (req: Request, res: Response) => {
    const { userId, recipeId, servings, missingOnly } = req.body;
    const added = db.addRecipeIngredientsToShoppingList(userId, recipeId, servings || 2, !!missingOnly);
    res.json({ addedItems: added });
  });

  // --- PANTRY ---
  app.post('/api/pantry/update', (req: Request, res: Response) => {
    const { userId, pantry } = req.body;
    const user = db.updateUserProfile(userId, { pantry });
    res.json({ pantry: user?.pantry || [] });
  });

  // --- AI ASSISTANT ENDPOINTS ---
  app.post('/api/ai/assistant', async (req: Request, res: Response) => {
    try {
      const { question, context } = req.body;
      if (!question) return res.status(400).json({ error: 'Question is required' });
      const answer = await askCookingAssistant(question, context || {});
      res.json({ answer });
    } catch (e: any) {
      console.error('AI assistant error:', e);
      res.status(500).json({ error: 'Failed to generate assistant response' });
    }
  });

  app.post('/api/ai/mistake-recovery', async (req: Request, res: Response) => {
    try {
      const { mistakeType, mistakeDetails, context } = req.body;
      if (!mistakeType) return res.status(400).json({ error: 'mistakeType required' });
      const recovery = await askMistakeRecovery(mistakeType, mistakeDetails || '', context || {});
      res.json(recovery);
    } catch (e: any) {
      console.error('Mistake recovery error:', e);
      res.status(500).json({ error: 'Failed to generate mistake recovery guide' });
    }
  });

  app.post('/api/ai/substitute', async (req: Request, res: Response) => {
    try {
      const { ingredient, recipeName, language } = req.body;
      if (!ingredient) return res.status(400).json({ error: 'ingredient required' });
      const info = await askIngredientSubstitution(ingredient, recipeName, language || 'en');
      res.json(info);
    } catch (e: any) {
      console.error('Substitution error:', e);
      res.status(500).json({ error: 'Failed to find substitution' });
    }
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Cooking Assistant server running at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal server startup error:', err);
});
