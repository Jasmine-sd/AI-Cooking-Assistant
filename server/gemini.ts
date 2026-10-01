import { GoogleGenAI } from '@google/genai';
import { Recipe, RecipeStyle, DietaryType, CuisineType, MealCategory } from '../src/types';
import { CULINARY_KNOWLEDGE_BASE } from './culinaryKnowledge';
import { INITIAL_RECIPES } from './recipesData';
import { db } from './db';

// Server-side initialization of Gemini SDK
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

export interface AssistantContext {
  recipe?: Recipe;
  currentStepNumber?: number;
  servings?: number;
  style?: RecipeStyle;
  dietaryPreference?: DietaryType;
  language?: string;
  conversationHistory?: { role: 'user' | 'assistant'; text: string }[];
}

export async function askCookingAssistant(
  question: string,
  context: AssistantContext
): Promise<string> {
  const language = context.language || 'en';
  const isTelugu = language === 'te';
  const isHindi = language === 'hi';
  const isSpanish = language === 'es';

  const systemInstruction = `You are an expert, friendly AI Cooking Assistant and Master Chef companion.
Your goal is to guide the user in real-time while cooking, answer cooking questions, clarify techniques, adapt ingredients, and offer practical culinary tips.

CURRENT COOKING CONTEXT:
${context.recipe ? `
- Recipe: ${context.recipe.name} (${context.recipe.cuisine} cuisine)
- Description: ${context.recipe.description}
- Servings chosen: ${context.servings || context.recipe.baseServings}
- Cooking Style: ${context.style === 'restaurant' ? 'Authentic / Restaurant Style (Traditional methods, rich flavors)' : 'Home Style / Available Ingredients (Simple everyday methods)'}
- Dietary Preference: ${context.dietaryPreference || 'Standard'}
- Current Step: Step ${context.currentStepNumber || 1} of ${context.recipe.steps.length}
${context.currentStepNumber && context.recipe.steps[context.currentStepNumber - 1] ? `  Step Title: ${context.recipe.steps[context.currentStepNumber - 1].title}
  Step Instruction: ${context.recipe.steps[context.currentStepNumber - 1].instruction}
  Heat/Temp: ${context.recipe.steps[context.currentStepNumber - 1].temperatureOrHeat || 'N/A'}` : ''}
- Ingredients List:
${context.recipe.ingredients.map(i => `  • ${i.name}: ${i.baseQuantity * ((context.servings || context.recipe.baseServings) / context.recipe.baseServings)} ${i.unit} ${i.optional ? '(optional)' : ''}`).join('\n')}
` : 'No active recipe selected (General cooking assistance)'}

RULES & TONE:
1. Always base your answers directly on the current recipe and step context when relevant.
2. Keep your answers concise, practical, and conversational so the user can easily listen while cooking.
3. If the user asks in Telugu (తెలుగు) or if preferred language is Telugu, respond naturally and fluently in Telugu.
4. If the user asks in English or another language, respond in that language.
5. If the user asks for a voice command action like "next step" or "timer for 5 minutes", acknowledge clearly.
6. Preserve exact temperatures, quantities, and cooking times accurately.`;

  try {
    const ai = getAIClient();
    if (ai) {
      const chatHistoryFormatted = (context.conversationHistory || []).slice(-4).map(h => 
        `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`
      ).join('\n');

      const fullPrompt = `${chatHistoryFormatted ? `Previous context:\n${chatHistoryFormatted}\n\n` : ''}User Question: ${question}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: fullPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      if (response.text && response.text.trim().length > 0) {
        return response.text.trim();
      }
    }
  } catch (error) {
    console.error('Gemini API call failed, using intelligent fallback:', error);
  }

  // Intelligent Context-Aware Fallback
  return generateIntelligentFallback(question, context, isTelugu, isHindi, isSpanish);
}

export async function askMistakeRecovery(
  mistakeType: string,
  mistakeDetails: string,
  context: AssistantContext
): Promise<{ explanation: string; steps: string[]; warning?: string }> {
  const language = context.language || 'en';
  const isTelugu = language === 'te';

  const systemInstruction = `You are an expert Culinary Emergency & Mistake Recovery Chef.
Your job is to provide safe, actionable, realistic techniques to salvage a cooking mistake.

CURRENT CONTEXT:
${context.recipe ? `Recipe: ${context.recipe.name}, Current Step: ${context.currentStepNumber || 1}, Style: ${context.style}` : ''}
Mistake reported: ${mistakeType}
Details: ${mistakeDetails}

OUTPUT FORMAT: Respond with clear, structured recovery instructions.
1. Explanation of why the fix works without masking flavors.
2. 3 to 4 sequential, actionable recovery steps.
3. Safety or food warning if applicable (never promise a 100% guarantee).
Respond in ${isTelugu ? 'Telugu (తెలుగు)' : 'English'}.`;

  try {
    const ai = getAIClient();
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `I made a mistake while cooking: ${mistakeType}. Details: ${mistakeDetails}. How do I fix it?`,
        config: {
          systemInstruction,
          temperature: 0.6,
        }
      });

      if (response.text) {
        const lines = response.text.split('\n').filter(l => l.trim().length > 0);
        const steps = lines.filter(l => /^\d+\.|\*|-|•/.test(l.trim())).map(l => l.replace(/^\d+\.|\*|-|•/, '').trim());
        
        return {
          explanation: lines[0] || (isTelugu ? 'ఇది మీ వంటను సరిదిద్దడానికి సులభమైన ఉపాయం:' : 'Here is the recommended technique to balance your dish:'),
          steps: steps.length > 0 ? steps : [
            isTelugu ? 'గ్రేవీ పరిమాణాన్ని కొద్దిగా పెంచండి' : 'Dilute by adding a small amount of liquid or unseasoned base',
            isTelugu ? 'కొద్దిగా నిమ్మరసం లేదా పెరుగు జోడించండి' : 'Add a pinch of acid (lemon juice or mild yogurt/cream) to counteract intensity',
            isTelugu ? 'తక్కువ మంటపై 2-3 నిమిషాలు ఉడికించండి' : 'Simmer gently over low heat for 2 minutes to blend flavors'
          ],
          warning: isTelugu ? 'గమనిక: అదనపు ఉప్పు లేదా మసాలాలను ఒకేసారి వేయకుండా కొద్దికొద్దిగా వేసి రుచి చూడండి.' : 'Note: Always taste incrementally after each addition rather than adding all at once.'
        };
      }
    }
  } catch (error) {
    console.error('Gemini API mistake recovery call failed:', error);
  }

  // Pre-computed culinary safety & mistake recovery database
  return getPrecomputedMistakeRecovery(mistakeType, isTelugu);
}

export async function askIngredientSubstitution(
  originalIngredient: string,
  recipeName?: string,
  language: string = 'en'
): Promise<{ substitute: string; ratio: string; tasteImpact: string; tip: string }> {
  const isTelugu = language === 'te';

  try {
    const ai = getAIClient();
    if (ai) {
      const prompt = `Provide the best ingredient substitute for "${originalIngredient}" ${recipeName ? `in recipe "${recipeName}"` : ''}.
Return concise practical advice with:
1. Recommended substitute
2. Measurement ratio
3. Expected taste and texture impact
4. Chef cooking tip.
Answer in ${isTelugu ? 'Telugu' : 'English'}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          temperature: 0.5,
        }
      });

      if (response.text) {
        return {
          substitute: isTelugu ? `${originalIngredient} స్థానంలో ప్రత్యామ్నాయం` : `Best substitute for ${originalIngredient}`,
          ratio: '1:1 ratio',
          tasteImpact: response.text.slice(0, 300),
          tip: isTelugu ? 'వంట రుచిని బట్టి కొద్దిగా సర్దుబాటు చేయండి.' : 'Adjust quantities gradually based on taste preferences.'
        };
      }
    }
  } catch (e) {
    console.error('Substitutions AI error:', e);
  }

  return {
    substitute: isTelugu ? 'నూనె / పెరుగు / ఇతర ప్రత్యామ్నాయాలు' : 'Neutral Oil or Cream / Yogurt alternative',
    ratio: '1:1',
    tasteImpact: isTelugu 
      ? 'ఇది అసలు రుచికి చాలా దగ్గరగా ఉండి మంచి ఆకృతిని ఇస్తుంది.'
      : 'Provides similar moisture and mouthfeel with slight variation in rich undertones.',
    tip: isTelugu 
      ? 'మంటను మధ్యస్థంగా ఉంచి నెమ్మదిగా కలపండి.'
      : 'Incorporate at the same stage of the recipe as the original ingredient.'
  };
}

function generateIntelligentFallback(
  question: string,
  context: AssistantContext,
  isTelugu: boolean,
  isHindi: boolean,
  isSpanish: boolean
): string {
  const qLower = question.toLowerCase();
  const currentStep = context.recipe && context.currentStepNumber 
    ? context.recipe.steps[context.currentStepNumber - 1] 
    : null;

  if (isTelugu) {
    if (qLower.includes('తర్వాత') || qLower.includes('next') || qLower.includes('చేయాలి')) {
      return currentStep 
        ? `ప్రస్తుతం మనం స్టెప్ ${context.currentStepNumber}: "${currentStep.title}" లో ఉన్నాము. ${currentStep.instruction}`
        : 'తదుపరి స్టెప్‌కు వెళ్లడానికి Next బటన్ నొక్కండి లేదా "Next step" అని చెప్పండి.';
    }
    if (qLower.includes('ఉప్పు') || qLower.includes('salt')) {
      return 'రుచికి సరిపడా ఉప్పు వేయండి. సాధారణంగా 2 సర్వింగ్స్‌కు అర చెంచా సరిపోతుంది. కొద్దిగా వేసి రుచి చూడండి.';
    }
    if (qLower.includes('నూనె') || qLower.includes('oil') || qLower.includes('butter')) {
      return 'మీరు వెన్న స్థానంలో నూనె లేదా నెయ్యి వాడవచ్చు. 1:1 నిష్పత్తిలో సరిపోతుంది.';
    }
    return `అవును! ${context.recipe ? context.recipe.name : 'ఈ వంట'} కోసం మంటను సరిగ్గా నియంత్రిస్తూ ఉడికించండి. ఇంకేమైనా సందేహాలుంటే అడగండి.`;
  }

  // English Context-aware responses
  if (qLower.includes('next') || qLower.includes('what do i do') || qLower.includes('what should i do')) {
    if (currentStep) {
      return `You are currently on Step ${context.currentStepNumber}: "${currentStep.title}". Here is what to do: ${currentStep.instruction}`;
    }
    return 'Tap Next Step to proceed to the next cooking phase, or ask me for clarification on any technique!';
  }

  if (qLower.includes('salt') || qLower.includes('how much salt')) {
    const servings = context.servings || 4;
    return `For ${servings} servings of ${context.recipe?.name || 'this dish'}, start with ${servings >= 4 ? '1 to 1.5 teaspoons' : '0.5 to 0.75 teaspoon'} of salt. Always taste as you go!`;
  }

  if (qLower.includes('butter') && qLower.includes('oil')) {
    return 'Yes, you can substitute butter with olive oil or vegetable oil at a 1:1 ratio (or use 3/4 amount of oil). Olive oil provides a great fruity aroma while neutral oil keeps flavors mild.';
  }

  if (qLower.includes('thick') || qLower.includes('sauce too thick')) {
    return 'If the sauce is too thick, stir in 2 to 3 tablespoons of warm water, broth, or reserved pasta cooking water over low heat until your desired silky consistency is restored.';
  }

  if (qLower.includes('thin') || qLower.includes('watery')) {
    return 'To thicken your sauce, let it simmer uncovered over medium-low heat for 3-5 minutes so moisture evaporates, or whisk in a slurry of 1 tsp cornstarch mixed with 1 tbsp cold water.';
  }

  if (qLower.includes('timer') || qLower.includes('how long')) {
    if (currentStep && currentStep.durationMinutes) {
      return `This step takes approximately ${currentStep.durationMinutes} minutes. You can tap the "Start Timer" button on screen to track it!`;
    }
    return 'Cook until golden and fragrant, typically 4 to 6 minutes on medium heat.';
  }

  return `For ${context.recipe ? context.recipe.name : 'your recipe'}, keep heat consistent and stir gently. I am right here with you—feel free to ask any specific ingredient, measurement, or technique question!`;
}

function getPrecomputedMistakeRecovery(mistakeType: string, isTelugu: boolean) {
  const typeLower = mistakeType.toLowerCase();

  if (typeLower.includes('salt') || typeLower.includes('salty')) {
    return {
      explanation: isTelugu 
        ? 'ఉప్పు ఎక్కువగా అయినప్పుడు, రుచిని బ్యాలెన్స్ చేయడానికి లిక్విడ్ లేదా ఆమ్ల గుణం గల పదార్థాలు జోడించాలి.'
        : 'Salt cannot be extracted once dissolved, but perceived saltiness can be diluted or chemically balanced with fats, starch, or mild acids.',
      steps: isTelugu ? [
        'కూరలో కొద్దిగా టొమాటో గుజ్జు, క్రీమ్ లేదా పాలు కలపండి.',
        'ఒక బంగాళాదుంప ముక్కను వేసి 5 నిమిషాలు ఉడికించి తీసివేయండి (ఇది అదనపు ఉప్పును పీల్చుకుంటుంది).',
        'కొద్దిగా నిమ్మరసం లేదా పంచదార చిటికెడు వేయండి.'
      ] : [
        'Dilute with unsalted liquid (cream, milk, coconut milk, or unseasoned tomato sauce).',
        'Add a peeled raw potato chunk to simmer for 5-8 minutes; it absorbs some salinity, then discard it.',
        'Add a splash of fresh lemon juice or a pinch of brown sugar to distract palate salt receptors.',
        'Increase volume by adding more steamed vegetables or cooked unsalted grains/pasta.'
      ],
      warning: isTelugu ? 'ఎక్కువ పంచదార వేయవద్దు, రుచి మారిపోవచ్చు.' : 'Add acidic or sweet balance in tiny increments so you do not sweeten the dish unintentionally.'
    };
  }

  if (typeLower.includes('spice') || typeLower.includes('spicy') || typeLower.includes('chili')) {
    return {
      explanation: isTelugu
        ? 'కారం ఎక్కువగా ఉంటే పాల ఉత్పత్తులు లేదా వెన్న వేయడం వల్ల కారపు తీవ్రత తగ్గుతుంది.'
        : 'Capsaicin (the spicy compound in chilies) binds to fats and dairy casein, which neutralizes fiery heat rapidly.',
      steps: isTelugu ? [
        '2 చెంచాల ఫ్రెష్ క్రీమ్, పెరుగు లేదా వెన్న కలపండి.',
        'కొద్దిగా నిమ్మరసం పిండండి.',
        'తక్కువ మంటపై 2 నిమిషాలు ఉంచండి.'
      ] : [
        'Stir in dairy: add 2-3 tbsp heavy cream, sour cream, Greek yogurt, or butter.',
        'For vegan dishes, stir in full-fat coconut cream or creamy tahini/peanut butter.',
        'Add an acid like lime juice or vinegar to cut through burning capsaicin.',
        'Drizzle 1/2 tsp honey or maple syrup to balance the flavor profile.'
      ]
    };
  }

  if (typeLower.includes('burnt') || typeLower.includes('burn')) {
    return {
      explanation: isTelugu
        ? 'అడుగంటినప్పుడు వెంటనే వేరే గిన్నెలోకి మార్చండి, అడుగున ఉన్న మాడిన భాగాన్ని గరటతో గీకవద్దు.'
        : 'The golden rule for burnt food: immediately transfer the top portion without scraping the bottom charred layer.',
      steps: isTelugu ? [
        'వెంటనే స్టవ్ ఆపి, పైభాగాన్ని వేరే శుభ్రమైన గిన్నెలోకి మార్చండి.',
        'బాణలి అడుగు భాగాన్ని అస్సలు గీకవద్దు.',
        'కొద్దిగా నెయ్యి లేదా వెన్న వేసి రుచిని మెరుగుపరచండి.'
      ] : [
        'Turn off the heat immediately and do NOT stir or scrape the bottom of the pot.',
        'Gently ladle the unburned top 80% of food into a completely fresh, clean pan.',
        'Add a fresh aromatic element (1 tbsp butter, fresh cilantro, or smoked paprika) to mask faint acrid notes.',
        'Taste carefully to ensure no bitter burnt aftertaste remains before serving.'
      ],
      warning: 'If the entire dish smells heavily of charred carbon or contains burnt meat, discard for food safety and flavor.'
    };
  }

  return {
    explanation: isTelugu
      ? 'ఈ సమస్యను పరిష్కరించడానికి నెమ్మదిగా సర్దుబాటు చేయండి.'
      : 'Most culinary imbalances can be corrected by adjusting temperature, liquid ratio, or aromatics.',
    steps: isTelugu ? [
      'మంటను తగ్గించి ఉడికించండి',
      'అవసరమైతే కొద్దిగా నీరు లేదా నూనె కలపండి',
      'రుచి చూసి మసాలాలు సరిచేయండి'
    ] : [
      'Lower stove heat to gentle simmer to prevent further overcooking.',
      'Adjust moisture by adding small splashes of warm water or broth if dry.',
      'Re-season gently with fresh herbs or mild seasonings.'
    ]
  };
}

// Helper to find exact known recipe only if query is specifically for it
export function findExactKnownRecipe(query: string): Recipe | null {
  const q = query.toLowerCase().trim();
  const allKnown = [...CULINARY_KNOWLEDGE_BASE, ...INITIAL_RECIPES];

  // Specific dish guards to avoid mismatches against wrong dishes
  if ((q.includes('matar paneer') || q.includes('kadai paneer') || q.includes('paneer bhurji')) && !q.includes('palak') && !q.includes('saag')) {
    return null; // Generate authentic dish instead of paneer butter masala
  }
  if (q.includes('dal tadka') || q.includes('yellow dal') || q.includes('dal fry') || q.includes('moong dal') || q.includes('toor dal')) {
    return null; // Generate authentic dal instead of dal makhani
  }
  if ((q.includes('cake') || q.includes('కేక్')) && !q.includes('lava') && !q.includes('molten') && !q.includes('chocolate lava')) {
    return null; // Generate carrot cake, cheesecake, red velvet etc. instead of chocolate lava cake
  }
  if (q.includes('egg fried rice') || q.includes('chicken fried rice') || q.includes('schezwan fried rice') || q.includes('shrimp fried rice')) {
    return null; // Generate egg/chicken fried rice instead of veg fried rice
  }
  if (q.includes('mutton biryani') || q.includes('veg biryani') || q.includes('egg biryani') || q.includes('prawn biryani')) {
    return null; // Generate specific biryani instead of chicken dum biryani
  }
  if (q.includes('poori bhaji') || q.includes('puri bhaji') || q.includes('sev puri') || q.includes('bhel puri') || q.includes('dahi puri')) {
    return null; // Generate poori bhaji/bhel puri instead of pani puri
  }
  if (q.includes('motichoor') || q.includes('boondi laddu') || q.includes('rava laddu')) {
    return null; // Generate specific laddu instead of besan laddu
  }
  if (q.includes('rava dosa') || q.includes('pesarattu') || q.includes('set dosa') || q.includes('cheese dosa')) {
    return null; // Generate specific dosa instead of masala dosa
  }

  // Exact matching against known recipes
  for (const r of allKnown) {
    const rName = r.name.toLowerCase();
    const rId = r.id.toLowerCase();
    const rTe = r.nameTranslations?.te?.toLowerCase() || '';
    const rHi = r.nameTranslations?.hi?.toLowerCase() || '';

    // Direct name match
    if (q === rName || q === rId || (rTe && q === rTe) || (rHi && q === rHi)) {
      return r;
    }

    // Specific aliases
    if (r.id === 'authentic-pani-puri' && (q === 'pani puri' || q === 'panipuri' || q === 'golgappa' || q === 'puchka' || q === 'పానీపూరి' || q === 'पानी पूरी')) {
      return r;
    }
    if ((r.id === 'chocolate-lava-cake' || r.id === 'lava-cake') && (q === 'chocolate lava cake' || q === 'lava cake' || q === 'molten lava cake' || q === 'molten chocolate cake' || q === 'లావా కేక్')) {
      return r;
    }
    if (r.id === 'dal-makhani-restaurant' && (q === 'dal makhani' || q === 'makhani dal' || q === 'దాల్ మఖని')) {
      return r;
    }
    if (r.id === 'authentic-palak-paneer' && (q === 'palak paneer' || q === 'saag paneer' || q === 'పాలక్ పన్నీర్' || q === 'పాలకూర పన్నీర్' || q === 'पालक पनीर')) {
      return r;
    }
    if (r.id === 'crispy-punjabi-samosa' && (q === 'samosa' || q === 'punjabi samosa' || q === 'crispy samosa' || q === 'సమోసా' || q === 'समोसा')) {
      return r;
    }
    if (r.id === 'paneer-butter-masala' && (q === 'paneer butter masala' || q === 'shahi paneer' || q === 'paneer makhani' || q === 'పన్నీర్ బటర్ మసాలా')) {
      return r;
    }
    if (r.id === 'chole-bhature-special' && (q === 'chole bhature' || q === 'chana bhatura' || q === 'చోలే భటూరే')) {
      return r;
    }
    if (r.id === 'mumbai-pav-bhaji' && (q === 'pav bhaji' || q === 'mumbai pav bhaji' || q === 'పావ్ భాజీ')) {
      return r;
    }
    if (r.id === 'kolkata-white-rasgulla' && (q === 'white rasgulla' || q === 'rasgulla' || q === 'rosogolla' || q === 'రసగుల్లా')) {
      return r;
    }
    if (r.id === 'royal-gulab-jamun' && (q === 'gulab jamun' || q === 'kala jamun' || q === 'గులాబ్ జామున్')) {
      return r;
    }
    if (r.id === 'crispy-masala-dosa' && (q === 'masala dosa' || q === 'crispy dosa' || q === 'దోస' || q === 'dosa')) {
      return r;
    }
    if (r.id === 'steamed-idli-sambar' && (q === 'idli sambar' || q === 'idli' || q === 'idly' || q === 'ఇడ్లీ')) {
      return r;
    }
    if ((r.id === 'authentic-besan-laddu' || r.id === 'royal-besan-laddu') && (q === 'besan laddu' || q === 'besan ladoo' || q === 'బేసన్ లడ్డూ' || q === 'శనగపిండి లడ్డూ')) {
      return r;
    }
    if (r.id === 'restaurant-style-fried-rice' && (q === 'veg fried rice' || q === 'vegetable fried rice' || q === 'fried rice' || q === 'ఫ్రైడ్ రైస్')) {
      return r;
    }
    if (r.id === 'butter-chicken' && (q === 'butter chicken' || q === 'murgh makhani' || q === 'బటర్ చికెన్')) {
      return r;
    }
    if (r.id === 'hyderabadi-biryani' && (q === 'biryani' || q === 'hyderabadi biryani' || q === 'chicken biryani' || q === 'chicken dum biryani' || q === 'చికెన్ బిర్యానీ' || q === 'బిర్యానీ')) {
      return r;
    }
    if (r.id === 'garlic-tomato-pasta' && (q === 'pasta' || q === 'garlic tomato pasta' || q === 'penne pasta' || q === 'tomato pasta' || q === 'creamy garlic tomato basil penne' || q === 'పాస్తా')) {
      return r;
    }
    if (r.id === 'crispy-paneer-tikka' && (q === 'paneer tikka' || q === 'crispy paneer tikka' || q === 'పన్నీర్ టిక్కా')) {
      return r;
    }
    if (r.id === 'authentic-egg-curry' && (q === 'egg curry' || q === 'anda curry' || q === 'egg masala' || q === 'boiled egg curry' || q === 'గుడ్డు కూర' || q === 'ఎగ్ కర్రీ' || q === 'అండా కర్రీ' || q === 'अंडा करी')) {
      return r;
    }
    if (r.id === 'authentic-aloo-curry' && (q === 'aloo curry' || q === 'potato curry' || q === 'aloo masala' || q === 'dum aloo' || q === 'aloo matar' || q === 'aloo gobi' || q === 'ఆలూ కూర' || q === 'ఆలూ కర్రీ' || q === 'బంగాళాదుంప కర్రీ' || q === 'आलू करी')) {
      return r;
    }
  }

  return null;
}

// Helper to choose high quality step images matching the actual cooking action
function getStepImageByAction(
  stepTitle: string,
  instruction: string,
  dishPresentationImage: string,
  stepIndex: number,
  totalSteps: number
): string {
  const text = `${stepTitle} ${instruction}`.toLowerCase();

  // If final step, display the finished plated dish
  if (stepIndex === totalSteps - 1 || text.includes('garnish and serve') || text.includes('plate and serve') || text.includes('enjoy hot') || text.includes('serve immediately')) {
    return dishPresentationImage;
  }

  // Deep frying
  if (text.includes('deep fry') || text.includes('fry until golden') || text.includes('frying') || text.includes('puffed')) {
    return '/images/bhature_frying.jpg';
  }

  // Sauté / aromatics / spices blooming
  if (text.includes('sauté') || text.includes('saute') || text.includes('splutter') || text.includes('aromatics') || text.includes('onions') || text.includes('ginger garlic') || text.includes('pan')) {
    return '/images/paneer_simmer.jpg';
  }

  // Simmering / Boiling / Cooking gravy or soup
  if (text.includes('simmer') || text.includes('boil') || text.includes('gravy') || text.includes('curry') || text.includes('sauce') || text.includes('pressure cook') || text.includes('whistle') || text.includes('pot')) {
    return '/images/dal_makhani_pot.jpg';
  }

  // Baking / Oven
  if (text.includes('bake') || text.includes('oven') || text.includes('preheat') || text.includes('ramekin') || text.includes('mould') || text.includes('tray')) {
    return '/images/molten_lava_baked.jpg';
  }

  // Steaming
  if (text.includes('steam') || text.includes('steamer') || text.includes('idli plate')) {
    return '/images/steamed_idlis.jpg';
  }

  // Batter / Dough / Kneading / Whisking / Mixing
  if (text.includes('dough') || text.includes('knead') || text.includes('whisk') || text.includes('batter') || text.includes('mix ingredients') || text.includes('melt chocolate')) {
    return '/images/chole_dough_knead.jpg';
  }

  // Prep / Chopping / Marinade / Spices setup
  if (text.includes('chop') || text.includes('slice') || text.includes('marinate') || text.includes('soak') || text.includes('rinse') || text.includes('prepare') || text.includes('assemble')) {
    return '/images/dosa_aloo_masala.jpg';
  }

  // Fallback to step-staged sequence
  const staged = [
    '/images/dosa_aloo_masala.jpg',
    '/images/paneer_simmer.jpg',
    '/images/dal_makhani_pot.jpg',
    dishPresentationImage
  ];
  return staged[stepIndex % staged.length];
}

// Helper to choose accurate main dish photo based on dish query
export function getDishImageByQuery(query: string): string {
  const q = query.toLowerCase();

  // 1. Egg dishes & Egg curries
  if (q.includes('egg curry') || q.includes('anda curry') || q.includes('egg masala') || q.includes('boiled egg') || q.includes('గుడ్డు') || q.includes('అండా')) {
    return '/images/dhaba_egg_curry.jpg';
  }

  // 2. Potato dishes & Aloo curries
  if (q.includes('aloo') || q.includes('potato curry') || q.includes('dum aloo') || q.includes('aloo matar') || q.includes('aloo gobi') || q.includes('ఆలూ') || q.includes('బంగాళాదుంప')) {
    return '/images/aloo_curry.jpg';
  }

  // 3. Palak / Saag Paneer
  if (q.includes('palak paneer') || q.includes('saag paneer') || q.includes('పాలక్ పన్నీర్') || q.includes('పాలకూర పన్నీర్') || q.includes('पालक पनीर') || (q.includes('palak') && q.includes('paneer'))) {
    return '/images/palak_paneer.jpg';
  }

  // 4. Samosas & Snacks
  if (q.includes('samosa') || q.includes('kachori') || q.includes('సమోసా') || q.includes('समोसा')) {
    return '/images/crispy_samosa.jpg';
  }

  // 5. Paneer Curries & Tikka
  if (q.includes('paneer butter') || q.includes('shahi paneer') || q.includes('paneer makhani') || q.includes('kadai paneer') || q.includes('matar paneer') || q.includes('paneer curry') || q.includes('పన్నీర్ బటర్') || q.includes('పన్నీర్ కూర')) {
    return '/images/paneer_butter_masala.jpg';
  }
  if (q.includes('paneer tikka') || q.includes('పన్నీర్ టిక్కా')) {
    return 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80';
  }
  if (q.includes('paneer') || q.includes('పన్నీర్') || q.includes('पनीर')) {
    return '/images/paneer_butter_masala.jpg';
  }

  // 6. Biryani & Rice Dishes
  if (q.includes('biryani') || q.includes('బిర్యానీ') || q.includes('बिरयानी')) {
    return '/images/hyderabadi_biryani.jpg';
  }
  if (q.includes('fried rice') || q.includes('pulao') || q.includes('ఫ్రైడ్ రైస్') || q.includes('పులావ్')) {
    return 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80';
  }

  // 7. Dal & Lentils
  if (q.includes('dal tadka') || q.includes('yellow dal') || q.includes('dal fry') || q.includes('toor dal') || q.includes('moong dal')) {
    return 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80';
  }
  if (q.includes('dal makhani') || q.includes('makhani dal') || q.includes('black lentil')) {
    return '/images/dal_makhani_pot.jpg';
  }
  if (q.includes('chole') || q.includes('chana masala') || q.includes('bhature') || q.includes('chickpea')) {
    return 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=1200&q=80';
  }
  if (q.includes('dal') || q.includes('lentil') || q.includes('పప్పు') || q.includes('సాంబార్') || q.includes('sambar')) {
    return 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80';
  }

  // 8. Poultry & Meat (only when explicitly chicken/meat)
  if (q.includes('butter chicken') || q.includes('murgh makhani') || q.includes('బటర్ చికెన్')) {
    return 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80';
  }
  if (q.includes('chicken') || q.includes('tikka masala') || q.includes('kadai chicken') || q.includes('చికెన్')) {
    return 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80';
  }
  if (q.includes('mutton') || q.includes('lamb') || q.includes('rogan josh') || q.includes('మటన్')) {
    return 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80';
  }

  // 9. Seafood
  if (q.includes('fish') || q.includes('prawn') || q.includes('seafood') || q.includes('shrimp') || q.includes('చేప') || q.includes('రొయ్య')) {
    return 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80';
  }

  // 10. Mixed Vegetable Curries & Stir-Fries
  if (q.includes('veg curry') || q.includes('vegetable curry') || q.includes('mix veg') || q.includes('mixed vegetable') || q.includes('కూరగాయల')) {
    return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80';
  }

  // 11. Street Food & South Indian
  if (q.includes('pav bhaji') || q.includes('పావ్ భాజీ')) {
    return 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=80';
  }
  if (q.includes('idli') || q.includes('ఇడ్లీ')) {
    return '/images/steamed_idlis.jpg';
  }
  if (q.includes('dosa') || q.includes('దోస')) {
    return '/images/crispy_masala_dosa.jpg';
  }
  if (q.includes('pani puri') || q.includes('golgappa') || q.includes('పానీపూరి')) {
    return '/images/pani_puri.jpg';
  }

  // 12. Italian & Global
  if (q.includes('pasta') || q.includes('spaghetti') || q.includes('penne') || q.includes('carbonara') || q.includes('పాస్తా')) {
    return '/images/garlic_tomato_penne.jpg';
  }
  if (q.includes('pizza')) {
    return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80';
  }
  if (q.includes('taco') || q.includes('burrito') || q.includes('టాకో')) {
    return 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80';
  }
  if (q.includes('noodle') || q.includes('ramen') || q.includes('chow mein') || q.includes('pad thai')) {
    return 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1200&q=80';
  }

  // 13. Sweets & Desserts
  if (q.includes('gulab jamun') || q.includes('గులాబ్ జామున్')) {
    return '/images/soft_gulab_jamun.jpg';
  }
  if (q.includes('rasgulla') || q.includes('rosogolla') || q.includes('రసగుల్లా')) {
    return '/images/white_rasgulla.jpg';
  }
  if (q.includes('laddu') || q.includes('ladoo') || q.includes('halwa') || q.includes('లడ్డూ')) {
    return '/images/royal_besan_laddu.jpg';
  }
  if (q.includes('lava') || q.includes('molten') || q.includes('లావా కేక్')) {
    return '/images/molten_lava_baked.jpg';
  }
  if (q.includes('cake') || q.includes('cupcake') || q.includes('brownie') || q.includes('కేక్')) {
    return 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80';
  }
  if (q.includes('cheesecake') || q.includes('tiramisu') || q.includes('pudding')) {
    return 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=80';
  }

  // 14. Healthy Bowls & Salads & Soups
  if (q.includes('salad') || q.includes('bowl') || q.includes('quinoa')) {
    return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80';
  }
  if (q.includes('soup')) {
    return 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80';
  }

  return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80';
}

export async function generateRecipeWithAI(query: string, language: string = 'en'): Promise<Recipe | null> {
  const queryLower = query.toLowerCase().trim();
  const idSlug = queryLower.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `custom-${Date.now()}`;
  const isTelugu = language === 'te';

  // 1. Check if user searched for an exact known recipe (with strict mismatch guard)
  const directMatch = findExactKnownRecipe(query);
  if (directMatch) {
    return directMatch;
  }

  // 2. Dish Type Classifier for authentic culinary profiling
  const isSweetDessert = /(jamun|gulab|laddu|ladoo|halwa|kheer|payasam|jalebi|rasgulla|rasmalai|cake|brownie|pudding|cookie|sweet|barfi|pedha|mysore|pastry|dessert|ice cream|tiramisu)/i.test(queryLower);
  const isBread = /(roti|naan|paratha|kulcha|bhatura|puri|bread|focaccia|pita)/i.test(queryLower);
  const isRice = /(biryani|pulao|rice|khichdi|fried rice|risotto|tahiri)/i.test(queryLower);
  const isCurry = /(curry|gravy|masala|korma|makhani|dal|sambhar|sambar|paneer|chicken|mutton|kofta|palak)/i.test(queryLower);
  const isStreetFood = /(chaat|pani puri|golgappa|samosa|bhel|sev|vada|pakora|kachori|pav bhaji|roll|taco)/i.test(queryLower);
  const isItalian = /(pasta|spaghetti|penne|pizza|lasagna|carbonara|risotto|ravioli|tiramisu)/i.test(queryLower);
  const isMexican = /(taco|burrito|enchilada|quesadilla|fajita|salsa|guacamole)/i.test(queryLower);
  const isAsian = /(noodle|dim sum|ramen|dumpling|sushi|stir fry|tofu|spring roll|thai|pad thai)/i.test(queryLower);

  let defaultCuisine: CuisineType = 'Indian';
  if (isItalian) defaultCuisine = 'Italian';
  else if (isMexican) defaultCuisine = 'Mexican';
  else if (isAsian) defaultCuisine = 'Asian';

  let defaultCategory: MealCategory = 'Main Course';
  if (isSweetDessert) defaultCategory = 'Desserts';
  else if (isStreetFood) defaultCategory = 'Street Food';
  else if (isBread || /(dosa|idli|pancake|omelet|toast|upma|poha)/i.test(queryLower)) defaultCategory = 'Breakfast';

  let defaultTaste: 'Spicy' | 'Sweet' | 'Salty' | 'Mild' | 'Savory' | 'Tangy' = 'Savory';
  if (isSweetDessert) defaultTaste = 'Sweet';
  else if (isStreetFood) defaultTaste = 'Tangy';
  else if (isCurry) defaultTaste = 'Spicy';

  const defaultImage = getDishImageByQuery(query);

  // 3. Try Gemini API generation with robust multi-model fallback
  try {
    const ai = getAIClient();
    if (ai) {
function cleanAndParseJSON(raw: string): any {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```[a-z]*\s*/i, '').replace(/\s*```$/i, '').trim();
  }
  try {
    return JSON.parse(cleaned);
  } catch (e1) {
    try {
      const fixed = cleaned
        .replace(/,\s*([\]}])/g, '$1')
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2018\u2019]/g, "'");
      return JSON.parse(fixed);
    } catch (e2) {
      throw e1;
    }
  }
}

      const prompt = `You are an elite master chef. Create an authentic, mouthwatering, and technically precise recipe for: "${query}".
Ensure authentic traditional ingredients with exact quantities and units, accurate cooking temperatures, and precise step-by-step instructions.
CRITICAL DIETARY RULE:
- If this recipe contains EGGS (egg, eggs, yolk, egg whites) or any MEAT/POULTRY/FISH/SEAFOOD, dietaryTags MUST be ["Non-Vegetarian"].
- If it contains eggs, also include "Contains Egg" in dietaryTags.
- If it contains no meat and no eggs, dietaryTags MUST be ["Vegetarian"] (and add "Vegan" if no dairy).

Return valid JSON only matching the schema below:
{
  "name": "Recipe Name in English",
  "nameTranslations": {
    "te": "తెలుగు పేరు (Accurate Telugu Name)",
    "hi": "हिंदी नाम (Accurate Hindi Name)",
    "es": "Nombre en Español"
  },
  "description": "Appetizing 1-2 sentence description detailing signature aromas, textures, and flavors",
  "descriptionTranslations": {
    "te": "వివరణ తెలుగులో",
    "hi": "विवरण हिंदी में",
    "es": "Descripción en Español"
  },
  "cuisine": "${defaultCuisine}",
  "tasteProfile": "${defaultTaste}",
  "category": "${defaultCategory}",
  "baseServings": 4,
  "prepTimeMinutes": 15,
  "cookTimeMinutes": 25,
  "totalTimeMinutes": 40,
  "difficulty": "Easy",
  "spiceLevel": "${isSweetDessert ? 'Mild' : 'Medium'}",
  "dietaryTags": ["Vegetarian"],
  "budget": "$",
  "rating": 4.92,
  "reviewsCount": 180,
  "author": "MasterChef Kitchen",
  "authenticStyleNotes": "Authentic chef technique note",
  "homestyleNotes": "Everyday simple alternative note",
  "ingredients": [
    {
      "id": "ing1",
      "name": "Authentic Ingredient 1",
      "nameTranslations": { "te": "పదార్థం పేరు" },
      "baseQuantity": 2,
      "unit": "cups",
      "category": "Produce"
    }
  ],
  "steps": [
    {
      "id": "step1",
      "stepNumber": 1,
      "title": "Clear Step Title",
      "instruction": "Detailed authentic technique instruction in English",
      "instructionTranslations": {
        "te": "వివరణాత్మకమైన స్పష్టమైన సూచన తెలుగులో"
      },
      "durationMinutes": 5,
      "temperatureOrHeat": "Medium",
      "chefTip": "Professional culinary advice"
    }
  ],
  "nutrition": {
    "calories": 320,
    "protein": 8,
    "carbohydrates": 42,
    "fat": 12,
    "fiber": 3
  }
}`;

      const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
      let response = null;

      for (const modelName of modelsToTry) {
        try {
          response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              temperature: 0.25,
              responseMimeType: 'application/json'
            }
          });
          if (response?.text) break;
        } catch (mErr: any) {
          console.warn(`Model ${modelName} failed for recipe generation:`, mErr?.message || mErr);
        }
      }

      if (response && response.text) {
        try {
          const parsed = cleanAndParseJSON(response.text) as Recipe;
          if (parsed && parsed.name && parsed.steps && parsed.steps.length > 0) {
            parsed.id = parsed.id || idSlug;
            parsed.image = defaultImage;
            parsed.imageUrl = defaultImage;

            // Enforce Non-Vegetarian / Vegetarian rule based on actual ingredients
            const ingredientsStr = JSON.stringify(parsed.ingredients || []).toLowerCase();
            const recipeNameStr = (parsed.name || '').toLowerCase();
            const hasEggs = /(egg|eggs|yolk|egg white|అండ|గుడ్డు|अंडा)/i.test(ingredientsStr) || /(egg|eggs|yolk)/i.test(recipeNameStr);
            const hasMeat = /(chicken|mutton|lamb|beef|pork|fish|prawn|shrimp|crab|meat|bacon|turkey|seafood|కోడి|చికెన్|మటన్|చేప)/i.test(ingredientsStr) || /(chicken|mutton|lamb|beef|pork|fish|prawn|shrimp|meat)/i.test(recipeNameStr);

            if (hasEggs || hasMeat) {
              parsed.dietaryTags = ['Non-Vegetarian'];
            } else {
              parsed.dietaryTags = ['Vegetarian', 'Egg-free'];
              const hasDairy = /(milk|cream|cheese|butter|ghee|paneer|curd|yogurt|khoya)/i.test(ingredientsStr);
              if (!hasDairy) {
                parsed.dietaryTags.push('Vegan', 'Dairy-free');
              }
            }

            // Assign tailored, authentic step-by-step images for each step
            parsed.steps = parsed.steps.map((st, idx) => {
              const stepImg = getStepImageByAction(
                st.title || '',
                st.instruction || '',
                parsed.image || defaultImage,
                idx,
                parsed.steps.length
              );
              return {
                ...st,
                id: st.id || `s-${idx + 1}`,
                stepNumber: st.stepNumber || idx + 1,
                image: stepImg,
                imageUrl: stepImg
              };
            });

            // Automatically persist newly generated recipe to the database
            db.addRecipe(parsed);

            return parsed;
          }
        } catch (parseErr) {
          console.error('Failed to parse AI-generated recipe JSON:', parseErr);
        }
      }
    }
  } catch (err) {
    console.error('Error in AI recipe generation:', err);
  }

  // 4. Fallback Programmatic Generator with REAL Dish Profile Matching
  const capitalized = query.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

  let ingredientsList: any[] = [];
  let stepsList: any[] = [];
  const qLower = queryLower;

  const hasEggsInQuery = /(egg|eggs|yolk)/i.test(qLower);
  const hasMeatInQuery = /(chicken|mutton|lamb|beef|pork|fish|prawn|shrimp|meat)/i.test(qLower);
  const isNonVeg = hasEggsInQuery || hasMeatInQuery;

  if (isSweetDessert) {
    ingredientsList = [
      { id: 'i1', name: 'Whole Milk Powder or Reduced Khoya', nameTranslations: { te: 'పాల పొడి లేదా కోవా' }, baseQuantity: 1.5, unit: 'cups', category: 'Dairy' },
      { id: 'i2', name: 'Fine Flour & Cardamom Powder', nameTranslations: { te: 'మైదా మరియు యాలకుల పొడి' }, baseQuantity: 0.5, unit: 'cup', category: 'Grains & Pasta' },
      { id: 'i3', name: 'Desi Ghee (clarified butter)', nameTranslations: { te: 'నెయ్యి' }, baseQuantity: 3, unit: 'tbsp', category: 'Oils & Condiments' },
      { id: 'i4', name: 'Sugar & Saffron Threads', nameTranslations: { te: 'పంచదార మరియు కుంకుమపువ్వు' }, baseQuantity: 1.5, unit: 'cups', category: 'Pantry & Spices' },
      { id: 'i5', name: 'Slivered Pistachios & Almonds', nameTranslations: { te: 'పిస్తా మరియు బాదం పలుకులు' }, baseQuantity: 2, unit: 'tbsp', category: 'Pantry & Spices' }
    ];
    if (hasEggsInQuery) {
      ingredientsList.push({ id: 'i6', name: 'Farm Fresh Eggs', nameTranslations: { te: 'తాజా కోడిగుడ్లు' }, baseQuantity: 2, unit: 'whole', category: 'Meat & Seafood' });
    }
    stepsList = [
      {
        id: 's1',
        stepNumber: 1,
        title: 'Prepare Fragrant Sugar Syrup / Base Mix',
        instruction: 'In a heavy saucepan, boil sugar with water, crushed cardamom, and saffron threads until lightly syrupy. Keep warm.',
        instructionTranslations: { te: 'గిన్నెలో పంచదార, నీళ్లు, యాలకులు, కుంకుమపువ్వు వేసి తీగ పాకం వచ్చే వరకు మరిగించి గోరువెచ్చగా ఉంచండి.' },
        durationMinutes: 8,
        temperatureOrHeat: 'Medium',
        image: '/images/melt_chocolate_butter.jpg',
        chefTip: 'Keep the syrup warm so the sweets absorb it evenly without collapsing!'
      },
      {
        id: 's2',
        stepNumber: 2,
        title: `Mix & Shape ${capitalized}`,
        instruction: `Gently combine the ingredients with warm milk to form a tender, smooth dough or batter. Shape into uniform portions.`,
        instructionTranslations: { te: `పిండిని నెయ్యి, పాలతో మృదువుగా కలిపి ఎక్కడా పగుళ్లు లేకుండా గుండ్రంగా తయారు చేసుకోండి.` },
        durationMinutes: 10,
        temperatureOrHeat: 'Low',
        image: '/images/chole_dough_knead.jpg'
      },
      {
        id: 's3',
        stepNumber: 3,
        title: 'Gentle Slow Cooking / Frying in Ghee',
        instruction: 'Cook gently in ghee or bake over controlled heat until evenly golden and cooked to the core.',
        instructionTranslations: { te: 'తక్కువ మంటపై నెయ్యిలో లేదా పాన్‌లో బంగారు రంగు వచ్చేవరకు దోరగా వేయించండి.' },
        durationMinutes: 12,
        temperatureOrHeat: 'Low',
        image: '/images/bhature_frying.jpg'
      },
      {
        id: 's4',
        stepNumber: 4,
        title: 'Soak, Garnish & Serve',
        instruction: 'Submerge the warm sweets into the aromatic syrup for 30 minutes. Garnish with slivered emerald pistachios and serve warm.',
        instructionTranslations: { te: 'జీరాలో 30 నిమిషాలు నానబెట్టి, పిస్తా పలుకులతో అలంకరించి సర్వ్ చేయండి.' },
        durationMinutes: 15,
        temperatureOrHeat: 'Low',
        image: defaultImage
      }
    ];
  } else if (isItalian) {
    ingredientsList = [
      { id: 'i1', name: 'Durum Wheat Pasta or Arborio Rice', nameTranslations: { te: 'పాస్తా లేదా రైస్' }, baseQuantity: 350, unit: 'g', category: 'Grains & Pasta' },
      { id: 'i2', name: 'Extra Virgin Olive Oil', nameTranslations: { te: 'ఆలివ్ ఆయిల్' }, baseQuantity: 3, unit: 'tbsp', category: 'Oils & Condiments' },
      { id: 'i3', name: 'Minced Garlic & Fresh Basil Leaves', nameTranslations: { te: 'వెల్లుల్లి మరియు తులసి' }, baseQuantity: 2, unit: 'tbsp', category: 'Produce' },
      { id: 'i4', name: 'Ripe San Marzano Tomatoes / Cream', nameTranslations: { te: 'టొమాటోలు' }, baseQuantity: 1.5, unit: 'cups', category: 'Produce' },
      { id: 'i5', name: 'Grated Parmigiano-Reggiano', nameTranslations: { te: 'జున్ను (చీజ్)' }, baseQuantity: 0.5, unit: 'cup', category: 'Dairy' }
    ];
    stepsList = [
      {
        id: 's1',
        stepNumber: 1,
        title: 'Boil in Heavily Salted Water',
        instruction: 'Bring a large pot of water to a rolling boil with sea salt. Cook pasta until perfectly al dente, reserving 1/2 cup pasta water.',
        durationMinutes: 10,
        temperatureOrHeat: 'High',
        image: '/images/dosa_aloo_masala.jpg'
      },
      {
        id: 's2',
        stepNumber: 2,
        title: 'Build Emulsified Pan Sauce',
        instruction: 'Warm olive oil with minced garlic and chili flakes. Add crushed tomatoes or emulsion base, simmering gently for 8 minutes.',
        durationMinutes: 8,
        temperatureOrHeat: 'Medium',
        image: '/images/paneer_simmer.jpg'
      },
      {
        id: 's3',
        stepNumber: 3,
        title: 'Toss & Mount with Cheese',
        instruction: 'Transfer pasta directly to the sauce with reserved pasta water. Toss vigorously with grated Parmigiano-Reggiano and fresh torn basil.',
        durationMinutes: 3,
        temperatureOrHeat: 'Medium-Low',
        image: defaultImage
      }
    ];
  } else {
    // Authentic Savory / Curry / Entree
    ingredientsList = [
      { id: 'i1', name: `Fresh ${capitalized} Cut / Core`, nameTranslations: { te: `${capitalized}` }, baseQuantity: 400, unit: 'g', category: isNonVeg ? 'Meat & Seafood' : 'Produce' },
      { id: 'i2', name: 'Finely Chopped Onions & Ginger-Garlic', nameTranslations: { te: 'ఉల్లిపాయలు, అల్లం-వెల్లుల్లి పేస్ట్' }, baseQuantity: 1.5, unit: 'cups', category: 'Produce' },
      { id: 'i3', name: 'Ripe Tomato Puree', nameTranslations: { te: 'టొమాటో ప్యూరీ' }, baseQuantity: 1, unit: 'cup', category: 'Produce' },
      { id: 'i4', name: 'Cumin, Turmeric & Garam Masala', nameTranslations: { te: 'జీలకర్ర, పసుపు, గరం మసాలా' }, baseQuantity: 1.5, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i5', name: 'Butter, Ghee or Cold-Pressed Oil', nameTranslations: { te: 'నెయ్యి లేదా నూనె' }, baseQuantity: 2.5, unit: 'tbsp', category: 'Oils & Condiments' },
      { id: 'i6', name: 'Fresh Cilantro & Kasuri Methi', nameTranslations: { te: 'కొత్తిమీర మరియు కసూరీ మేథీ' }, baseQuantity: 0.5, unit: 'cup', category: 'Produce' }
    ];
    stepsList = [
      {
        id: 's1',
        stepNumber: 1,
        title: `Prepare & Season Base for ${capitalized}`,
        instruction: `Trim, rinse, and portion the ingredients for ${capitalized}. Season lightly with salt, turmeric, and lemon juice.`,
        durationMinutes: 10,
        temperatureOrHeat: 'Low',
        image: '/images/dosa_aloo_masala.jpg'
      },
      {
        id: 's2',
        stepNumber: 2,
        title: 'Bloom Whole Spices & Sauté Aromatics',
        instruction: 'Heat ghee or oil in a heavy kadai. Splutter cumin and whole spices. Sauté onions, ginger, and garlic paste until golden brown.',
        durationMinutes: 8,
        temperatureOrHeat: 'Medium',
        image: '/images/paneer_simmer.jpg'
      },
      {
        id: 's3',
        stepNumber: 3,
        title: 'Simmer Spiced Gravy',
        instruction: `Add tomato puree, turmeric, chili powder, and garam masala. Cook until oil separates. Simmer gently until infused and tender.`,
        durationMinutes: 15,
        temperatureOrHeat: 'Medium-Low',
        image: '/images/dal_makhani_pot.jpg'
      },
      {
        id: 's4',
        stepNumber: 4,
        title: 'Finish with Butter & Fresh Herbs',
        instruction: 'Stir in crushed kasuri methi, a touch of butter or cream, and fresh chopped coriander. Serve steaming hot!',
        durationMinutes: 2,
        temperatureOrHeat: 'Low',
        image: defaultImage
      }
    ];
  }

  const fallbackRecipe: Recipe = {
    id: idSlug,
    name: `${capitalized}`,
    nameTranslations: {
      te: `రుచికరమైన ${capitalized}`,
      hi: `स्वादिष्ट ${capitalized}`,
      es: `${capitalized} Auténtico`
    },
    description: `A masterfully crafted preparation of authentic ${capitalized}, rich in traditional culinary balance, aromatics, and deep textures.`,
    descriptionTranslations: {
      te: `సంప్రదాయ సుగంధ ద్రవ్యాలు మరియు తాజా పదార్థాలతో తయారుచేసే అద్భుతమైన ${capitalized}.`,
      hi: `ताज़ा मसालों और पारंपरिक विधि से बना स्वादिष्ट ${capitalized}।`,
      es: `Una auténtica y deliciosa preparación de ${capitalized}.`
    },
    cuisine: defaultCuisine,
    tasteProfile: defaultTaste,
    category: defaultCategory,
    image: defaultImage,
    imageUrl: defaultImage,
    baseServings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    totalTimeMinutes: 40,
    difficulty: 'Easy',
    spiceLevel: isSweetDessert ? 'Mild' : 'Medium',
    dietaryTags: isNonVeg ? ['Non-Vegetarian'] : ['Vegetarian'],
    budget: '$',
    rating: 4.93,
    reviewsCount: 140,
    author: 'MasterChef Kitchen',
    authenticStyleNotes: `Prepared adhering to authentic regional heat balancing, slow-simmering, and hand-ground spices.`,
    homestyleNotes: 'Comforting one-pot version prepared with readily available pantry staples.',
    ingredients: ingredientsList,
    steps: stepsList,
    nutrition: {
      calories: isSweetDessert ? 310 : 340,
      protein: isSweetDessert ? 6 : 14,
      carbohydrates: isSweetDessert ? 48 : 32,
      fat: 12,
      fiber: 4
    },
    substitutions: [
      { original: 'Ghee', substitute: 'Neutral Oil or Butter', ratio: '1:1', notes: 'Convenient alternative' }
    ]
  };

  db.addRecipe(fallbackRecipe);
  return fallbackRecipe;
}

