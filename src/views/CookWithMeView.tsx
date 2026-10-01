import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Mic, 
  Volume2, 
  LifeBuoy, 
  RefreshCw, 
  Sparkles, 
  Clock, 
  Flame, 
  CheckCircle2, 
  Star, 
  ChefHat,
  Image as ImageIcon,
  ListChecks,
  Lightbulb,
  Check
} from 'lucide-react';
import { Recipe, RecipeStyle, CookingStep } from '../types';
import { MistakeRecoveryModal } from '../components/MistakeRecoveryModal';
import { SubstitutionModal } from '../components/SubstitutionModal';
import { FoodImage } from '../components/FoodImage';
import { calculateIngredientQuantity, formatQuantityWithFraction } from '../utils/servingCalculator';
import { voiceController } from '../utils/speech';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const PANI_PURI_IMG = '/images/pani_puri.jpg';
const ROYAL_BESAN_LADDU_IMG = '/images/royal_besan_laddu.jpg';

interface CookWithMeViewProps {
  recipe: Recipe;
  servings: number;
  style: RecipeStyle;
  onExit: () => void;
  onComplete: () => void;
}

// Dedicated step-level visual image matcher
const getStepActionImageUrl = (recipe: Recipe, step: CookingStep | undefined, stepNum: number): string => {
  // 1. If the step itself has an authentic image assigned, ALWAYS USE IT FIRST
  if (step?.image && !step.image.includes('placeholder')) return step.image;
  if (step?.imageUrl && !step.imageUrl.includes('placeholder')) return step.imageUrl;

  const recName = (recipe.name || '').toLowerCase();

  // 2. Specific step-by-step imagery for Pani Puri
  if (recName.includes('pani puri') || recName.includes('golgappa') || recName.includes('panipuri') || recName.includes('పానీపూరి') || recName.includes('पानी पूरी')) {
    if (stepNum === 1) return '/images/pani_puri_teekha.jpg';
    if (stepNum === 2) return '/images/pani_puri_meetha.jpg';
    if (stepNum === 3) return '/images/pani_puri_filling.jpg';
    if (stepNum === 4) return '/images/pani_puri_stuffing.jpg';
    if (stepNum === 5) return PANI_PURI_IMG; // Last image is the authentic recipe visual image
    return PANI_PURI_IMG;
  }

  // 3. Masala Dosa step-by-step imagery
  if (recName.includes('dosa') || recName.includes('దోస')) {
    if (stepNum === 1) return '/images/dosa_aloo_masala.jpg';
    if (stepNum === 2) return '/images/dosa_spread.jpg';
    if (stepNum === 3) return '/images/dosa_golden_roast.jpg';
    if (stepNum === 4) return '/images/crispy_masala_dosa.jpg';
    return '/images/crispy_masala_dosa.jpg';
  }

  // 3. Strict dish override for Royal Besan Laddu: always show roasting besan, shaping laddus, or royal dessert plate
  if (recName.includes('royal besan') || recName.includes('besan laddu') || recName.includes('besan ladoo') || recName.includes('బేసన్') || recName.includes('లడ్డూ') || recName.includes('बेसन') || recName.includes('laddu')) {
    const title = step ? ((step.title || '') + ' ' + (step.instruction || '')).toLowerCase() : '';
    if (stepNum === 1 || stepNum === 2 || title.includes('roast') || title.includes('ghee') || title.includes('వేయించడం') || title.includes('toast')) {
      return '/images/besan_roast_ghee.jpg';
    }
    if (stepNum === 4 || title.includes('shape') || title.includes('round') || title.includes('చుట్టండి') || title.includes('లడ్డూలు')) {
      return '/images/shaping_besan_laddu.jpg';
    }
    return ROYAL_BESAN_LADDU_IMG;
  }

  if (!step) return recipe.imageUrl || recipe.image || '';

  const title = ((step.title || '') + ' ' + (step.instruction || '')).toLowerCase();

  if (recName.includes('biryani')) {
    if (stepNum === 1 || title.includes('marinat') || title.includes('spice')) {
      return 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80';
    }
    if (stepNum === 2 || title.includes('rice') || title.includes('boil') || title.includes('water')) {
      return '/images/biryani_boil_rice.jpg';
    }
    if (stepNum === 3 || title.includes('layer') || title.includes('dum') || title.includes('saffron')) {
      return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80';
    }
    return 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80';
  }

  if (recName.includes('butter chicken') || recName.includes('tikka masala') || recName.includes('paneer')) {
    if (title.includes('onion') || title.includes('tomato') || title.includes('paste') || title.includes('sauté')) {
      return 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80';
    }
    if (title.includes('butter') || title.includes('cream') || title.includes('gravy') || title.includes('simmer')) {
      return 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1200&q=80';
    }
    return 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80';
  }

  // General culinary actions matching
  if (title.includes('oil') || title.includes('ghee') || title.includes('heat') || title.includes('pan') || title.includes('tarka') || title.includes('temper') || title.includes('mustard') || title.includes('cumin') || title.includes('నూనె') || title.includes('తాలింపు')) {
    return 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80';
  }
  if (title.includes('chop') || title.includes('cut') || title.includes('dice') || title.includes('slice') || title.includes('prep') || title.includes('onion') || title.includes('garlic') || title.includes('ginger') || title.includes('తరగడం') || title.includes('ముక్కలు')) {
    return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80';
  }
  if (title.includes('sauté') || title.includes('fry') || title.includes('stir') || title.includes('toss') || title.includes('brown') || title.includes('వేయించడం') || title.includes('కలపండి')) {
    return 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80';
  }
  if (title.includes('boil') || title.includes('simmer') || title.includes('water') || title.includes('soup') || title.includes('gravy') || title.includes('sauce') || title.includes('ఉడికించండి') || title.includes('నీరు')) {
    return 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80';
  }
  if (title.includes('bake') || title.includes('roast') || title.includes('oven') || title.includes('crispy') || title.includes('fry') || title.includes('deep fry')) {
    return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80';
  }
  if (title.includes('garnish') || title.includes('serve') || title.includes('plate') || title.includes('hot') || title.includes('coriander') || title.includes('వడ్డించండి') || title.includes('అలంకరించండి')) {
    return recipe.imageUrl || recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80';
  }

  // Curated Fallbacks
  const stepFallbacks = [
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80'
  ];
  return stepFallbacks[(stepNum - 1) % stepFallbacks.length];
};

export const CookWithMeView: React.FC<CookWithMeViewProps> = ({
  recipe,
  servings,
  style,
  onExit,
  onComplete
}) => {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  // Slide 0: Required Ingredients Showcase
  // Slide 1..N: Visual Cooking Steps
  const totalSlides = 1 + (recipe.steps ? recipe.steps.length : 0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Timer State
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number | null>(null);
  const [timerTotal, setTimerTotal] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  
  // Voice Controls
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [voiceFeedbackText, setVoiceFeedbackText] = useState<string | null>(null);

  // Modals
  const [mistakeModalOpen, setMistakeModalOpen] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);

  // Completion State
  const [isFinished, setIsFinished] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [cookingNotes, setCookingNotes] = useState('');
  const [savingHistory, setSavingHistory] = useState(false);

  const isIntroSlide = currentSlideIndex === 0;
  const currentStepNumber = currentSlideIndex; // 1-indexed for cooking steps
  const stepIndex = currentSlideIndex - 1;
  const currentStep: CookingStep | undefined = !isIntroSlide && recipe.steps ? recipe.steps[stepIndex] : undefined;
  const isLastSlide = currentSlideIndex === totalSlides - 1;

  const displayName = recipe.nameTranslations?.[language] || recipe.name;
  const stepImageUrl = getStepActionImageUrl(recipe, currentStep, currentStepNumber);

  // Clean up voice controller on unmount
  useEffect(() => {
    return () => {
      voiceController.stopSpeaking();
      voiceController.stopListening();
    };
  }, []);

  // 1. Detailed Chef Explanation Builder for Steps
  const getStepExplanationText = (step: CookingStep): string => {
    const stepTitle = step.titleTranslations?.[language] || step.title;
    const stepInstruction = step.instructionTranslations?.[language] || step.instruction;

    if (language === 'te') {
      let text = `దశ ${step.stepNumber}: ${stepTitle}. ${stepInstruction}`;
      if (step.temperatureOrHeat) {
        text += `. మంట విధానం: ${step.temperatureOrHeat}`;
      }
      if (step.chefTip) {
        text += `. ముఖ్యమైన చెఫ్ చిట్కా: ${step.chefTip}`;
      }
      if (step.durationMinutes) {
        text += `. ఈ దశకు దాదాపు ${step.durationMinutes} నిమిషాలు పడుతుంది. అవసరమైతే టైమర్ ప్రారంభించండి`;
      }
      if (isLastSlide) {
        text += `. ఇది చివరి దశ! వంట పూర్తయిన తర్వాత తయారీ ముగించు బటన్ నొక్కండి`;
      } else {
        text += `. ఈ దశ పూర్తయ్యాక, తదుపరి దశకు వెళ్ళడానికి నెక్స్ట్ అని చెప్పండి లేదా తదుపరి బటన్ నొక్కండి`;
      }
      return text;
    }

    if (language === 'hi') {
      let text = `चरण ${step.stepNumber}: ${stepTitle}. ${stepInstruction}`;
      if (step.temperatureOrHeat) {
        text += `. आंच की सेटिंग: ${step.temperatureOrHeat}`;
      }
      if (step.chefTip) {
        text += `. शेफ की खास सलाह: ${step.chefTip}`;
      }
      if (step.durationMinutes) {
        text += `. इस कदम में लगभग ${step.durationMinutes} मिनट लगेंगे। आप टाइमर शुरू कर सकते हैं`;
      }
      if (isLastSlide) {
        text += `. यह अंतिम चरण है! पूरा होने पर फिनिश कुकिंग बटन दबाएं`;
      } else {
        text += `. अगले चरण के लिए नेक्स्ट बोलें या अगला बटन दबाएं`;
      }
      return text;
    }

    // Default English
    let text = `Step ${step.stepNumber}: ${stepTitle}. ${stepInstruction}`;
    if (step.temperatureOrHeat) {
      text += `. Heat setting: ${step.temperatureOrHeat}`;
    }
    if (step.chefTip) {
      text += `. Chef's golden tip: ${step.chefTip}`;
    }
    if (step.durationMinutes) {
      text += `. This step takes approximately ${step.durationMinutes} minutes. Step timer is ready`;
    }
    if (isLastSlide) {
      text += `. You are on the final step! When finished, tap Finish Cooking to celebrate your dish!`;
    } else {
      text += `. When you are ready for the next step, say Next or tap Next Step`;
    }
    return text;
  };

  // 2. Warm Introduction and Ingredients Builder
  const getIntroExplanationText = (): string => {
    const ingredientsSummary = recipe.ingredients
      .slice(0, 8)
      .map(i => {
        const name = i.nameTranslations?.[language] || i.name;
        const qty = calculateIngredientQuantity(i.baseQuantity, recipe.baseServings, servings);
        const formatted = formatQuantityWithFraction(qty, i.unit);
        return `${name} ${formatted}`;
      })
      .join(', ');

    if (language === 'te') {
      return `కుక్ విత్ మీ కి స్వాగతం! మనం ఇప్పుడు ${servings} మంది కోసం రుచికరమైన ${displayName} తయారుచేస్తున్నాం. కావలసిన ముఖ్య పదార్థాలు: ${ingredientsSummary}. అన్ని పదార్థాలు సిద్ధం చేసుకున్నాక, మొదటి దశను ప్రారంభించడానికి నెక్స్ట్ అని చెప్పండి లేదా తయారీ ప్రారంభించు బటన్ నొక్కండి!`;
    }
    if (language === 'hi') {
      return `कुक विद मी में आपका स्वागत है! आज हम ${servings} लोगों के लिए स्वादिष्ट ${displayName} बनाएंगे। आवश्यक मुख्य सामग्रियां: ${ingredientsSummary}. सभी सामग्रियां तैयार करके शुरू करने के लिए नेक्स्ट बोलें या अगला बटन दबाएं!`;
    }
    return `Welcome to Cook With Me! Today we are preparing authentic ${displayName} for ${servings} servings in ${style} style. Here are the key ingredients you need: ${ingredientsSummary}. Once you have your ingredients ready, say Next or tap Start Cooking to begin with Step 1!`;
  };

  // Speak Current Step (force=true triggers speech unconditionally, force=false acts as toggle)
  const speakCurrentStep = (force: boolean = false) => {
    if (!currentStep) return;

    if (!force && isSpeaking) {
      voiceController.stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    voiceController.stopSpeaking();
    const narrative = getStepExplanationText(currentStep);

    voiceController.speak(
      narrative,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  // Speak Intro & Ingredients (force=true triggers speech unconditionally)
  const speakIntroAndIngredients = (force: boolean = false) => {
    if (!force && isSpeaking) {
      voiceController.stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    voiceController.stopSpeaking();
    const introText = getIntroExplanationText();

    voiceController.speak(
      introText,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  // Handle slide change & automatic voice narration
  useEffect(() => {
    if (isFinished) return;

    // Reset or configure step timer
    if (isIntroSlide) {
      setTimerTotal(null);
      setTimerSecondsLeft(null);
      setTimerRunning(false);
      setTimerFinished(false);
    } else if (currentStep) {
      if (currentStep.durationMinutes) {
        const seconds = currentStep.durationMinutes * 60;
        setTimerTotal(seconds);
        setTimerSecondsLeft(seconds);
        setTimerRunning(false);
        setTimerFinished(false);
      } else {
        setTimerTotal(null);
        setTimerSecondsLeft(null);
        setTimerRunning(false);
        setTimerFinished(false);
      }
    }

    // Automatically speak and explain step with single warm voice if autoSpeak is enabled
    if (autoSpeak) {
      const speechTimer = setTimeout(() => {
        if (isIntroSlide) {
          speakIntroAndIngredients(true);
        } else if (currentStep) {
          speakCurrentStep(true);
        }
      }, 250);

      return () => {
        clearTimeout(speechTimer);
        voiceController.stopSpeaking();
      };
    } else {
      voiceController.stopSpeaking();
    }
  }, [currentSlideIndex, isFinished, autoSpeak]);

  // Timer Tick
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSecondsLeft !== null && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timerRunning && timerSecondsLeft === 0) {
      setTimerRunning(false);
      setTimerFinished(true);
      voiceController.playChime('timer');
      const timerMsg = language === 'te' 
        ? 'టైమర్ పూర్తయింది! తదుపరి దశకు వెళ్ళండి.' 
        : language === 'hi'
        ? 'टाइमर पूरा हो गया! अगले चरण पर जाएं।'
        : 'Timer completed! Ready for next step.';
      voiceController.speak(timerMsg, language);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSecondsLeft, language]);

  const handleNextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      voiceController.playChime('success');
      setIsFinished(true);
      const finishMsg = language === 'te' 
        ? `అభినందనలు! మీరు ${displayName} తయారీని విజయవంతంగా పూర్తి చేశారు!` 
        : language === 'hi'
        ? `बधाई हो! आपने ${displayName} सफलतापूर्वक बना लिया है!`
        : `Congratulations! You successfully cooked ${displayName}!`;
      voiceController.speak(finishMsg, language);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Voice Command Parsing
  const processVoiceCommand = (rawText: string) => {
    const text = rawText.toLowerCase();
    setVoiceFeedbackText(`Heard: "${rawText}"`);
    setTimeout(() => setVoiceFeedbackText(null), 3000);

    if (text.includes('next') || text.includes('తర్వాత') || text.includes('forward') || text.includes('ముందుకు') || text.includes('start') || text.includes('ప్రారంభించు') || text.includes('अगला')) {
      handleNextSlide();
    } else if (text.includes('previous') || text.includes('back') || text.includes('మునుపటి') || text.includes('వెనుక') || text.includes('पिछला')) {
      handlePrevSlide();
    } else if (text.includes('repeat') || text.includes('read') || text.includes('explain') || text.includes('మళ్ళీ') || text.includes('చెప్పు') || text.includes('వివరించు') || text.includes('speak') || text.includes('दोहराएं')) {
      if (isIntroSlide) {
        speakIntroAndIngredients(true);
      } else {
        speakCurrentStep(true);
      }
    } else if (text.includes('start timer') || text.includes('begin timer') || text.includes('టైమర్ ప్రారంభించు') || text.includes('టైమర్') || text.includes('टाइमर')) {
      setTimerRunning(true);
    } else if (text.includes('pause timer') || text.includes('stop timer') || text.includes('ఆపు')) {
      setTimerRunning(false);
    } else if (text.includes('reset timer')) {
      if (timerTotal) setTimerSecondsLeft(timerTotal);
      setTimerRunning(false);
    } else if (text.includes('mute') || text.includes('stop speaking') || text.includes('stop talking') || text.includes('quiet') || text.includes('ఆపు') || text.includes('शांत')) {
      voiceController.stopSpeaking();
      setIsSpeaking(false);
      setAutoSpeak(false);
    } else if (text.includes('auto narrate') || text.includes('auto speak') || text.includes('speak steps')) {
      setAutoSpeak(true);
      if (isIntroSlide) speakIntroAndIngredients(true);
      else speakCurrentStep(true);
    } else if (text.includes('mistake') || text.includes('salt') || text.includes('spicy') || text.includes('తప్పు') || text.includes('ఉప్పు')) {
      setMistakeModalOpen(true);
    } else if (text.includes('substitute') || text.includes('replace') || text.includes('బదులుగా')) {
      setSubModalOpen(true);
    } else {
      // Unrecognized voice command during active cooking
      setVoiceFeedbackText(language === 'te' ? 'ఆదేశం గుర్తించబడలేదు. "తదుపరి" లేదా "వెనుకకు" అని చెప్పండి.' : 'Command not recognized. Say "next" or "back".');
      setTimeout(() => setVoiceFeedbackText(null), 3000);
    }
  };

  const toggleMic = () => {
    if (isListening) {
      voiceController.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      voiceController.startListening(
        (text, isFinal) => {
          if (isFinal) {
            setIsListening(false);
            processVoiceCommand(text);
          }
        },
        () => setIsListening(false),
        () => setIsListening(false)
      );
    }
  };

  const handleSaveToHistory = async () => {
    if (!user) {
      onComplete();
      return;
    }
    setSavingHistory(true);
    try {
      await api.logHistory({
        userId: user.id,
        recipeId: recipe.id,
        recipeName: recipe.name,
        recipeImage: recipe.imageUrl,
        cuisine: recipe.cuisine,
        servingsCooked: servings,
        styleUsed: style,
        rating,
        notes: cookingNotes
      });
      onComplete();
    } catch (e) {
      console.error(e);
      onComplete();
    } finally {
      setSavingHistory(false);
    }
  };

  const formatTimerDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // FINISHED / CONGRATULATIONS SCREEN
  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6 animate-in zoom-in-95 duration-300">
        <div className="glass-panel rounded-3xl border border-white/80 shadow-2xl p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30 border border-white/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {language === 'te' ? 'వంట పూర్తయింది! 🎉' : t.congratulations}
            </h2>
            <p className="text-sm text-slate-600">
              {language === 'te' 
                ? `మీరు ${displayName} వంటకాన్ని ${servings} మందికి విజయవంతంగా తయారుచేశారు.`
                : `You cooked ${displayName} for ${servings} people (${style === 'restaurant' ? 'Restaurant Style' : 'Home Style'}).`}
            </p>
          </div>

          {/* Star rating */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.rateThisRecipe}
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-2xl transition-transform hover:scale-125"
                >
                  <Star className={`w-8 h-8 ${star <= rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Personal cooking notes */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-slate-700">
              {t.cookingNotes}
            </label>
            <textarea
              rows={3}
              value={cookingNotes}
              onChange={(e) => setCookingNotes(e.target.value)}
              placeholder="e.g. Loved the spice blend and visual guidance!"
              className="w-full p-3 text-xs bg-white/70 backdrop-blur-md border border-white/90 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 focus:outline-none transition-all shadow-xs"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex items-center gap-3">
            <button
              id="finish-save-history-btn"
              onClick={handleSaveToHistory}
              disabled={savingHistory}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 border border-white/30 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.saveToHistory}</span>
            </button>

            <button
              onClick={onExit}
              className="px-5 py-3.5 rounded-2xl bg-white/70 hover:bg-white text-slate-800 font-bold text-sm border border-white/80 backdrop-blur-md shadow-xs transition-colors cursor-pointer"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 space-y-4 sm:space-y-6 pb-28">
      
      {/* Top Header Bar */}
      <div className="glass-panel rounded-2xl p-3.5 sm:p-4 border border-white/80 shadow-xs flex items-center justify-between gap-3">
        
        {/* Exit & Recipe Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            id="cook-exit-btn"
            onClick={onExit}
            className="p-2 rounded-xl bg-white/70 hover:bg-white text-slate-700 border border-white/80 backdrop-blur-xs transition-colors shrink-0 shadow-2xs cursor-pointer"
            title="Exit cooking mode"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="min-w-0">
            <h2 className="font-bold text-sm sm:text-base text-slate-900 truncate">
              {displayName}
            </h2>
            <p className="text-[11px] text-amber-900 font-semibold">
              {isIntroSlide 
                ? (language === 'te' ? 'స్లైడ్ 1: కావలసిన పదార్థాలు & వస్తువులు' : 'Slide 1: Required Ingredients & Items')
                : (language === 'te' 
                    ? `దశ ${currentStep?.stepNumber} / ${recipe.steps.length}` 
                    : `Step ${currentStep?.stepNumber} of ${recipe.steps.length}`)} • {servings} Servings ({style})
            </p>
          </div>
        </div>

        {/* Quick Actions: Auto-Narrate, Audio Speak & Voice Mic */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Active Speaking Indicator */}
          {isSpeaking && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-300/60 text-amber-950 text-xs font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
              <span>{language === 'te' ? 'AI చెఫ్ వివరిస్తున్నారు...' : 'Explaining Step...'}</span>
            </div>
          )}

          {/* Auto-Narrate Steps Toggle Button */}
          <button
            id="cook-auto-narrate-btn"
            onClick={() => {
              const nextVal = !autoSpeak;
              setAutoSpeak(nextVal);
              if (!nextVal) {
                voiceController.stopSpeaking();
                setIsSpeaking(false);
              } else {
                if (isIntroSlide) speakIntroAndIngredients(true);
                else speakCurrentStep(true);
              }
            }}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border backdrop-blur-xs ${
              autoSpeak 
                ? 'bg-emerald-500/20 text-emerald-950 border-emerald-400/60 shadow-xs' 
                : 'bg-white/70 text-slate-500 border-white/80 hover:bg-white'
            }`}
            title="Toggle automatic step narration"
          >
            <Sparkles className={`w-3.5 h-3.5 ${autoSpeak ? 'text-emerald-600 animate-spin' : 'text-slate-400'}`} style={{ animationDuration: '6s' }} />
            <span className="hidden md:inline">
              {autoSpeak 
                ? (language === 'te' ? 'ఆటో వివరణ: ఆన్' : 'Auto-Narrate: ON') 
                : (language === 'te' ? 'ఆటో వివరణ: ఆఫ్' : 'Auto-Narrate: OFF')}
            </span>
            <span className="md:hidden">
              {autoSpeak ? 'Auto' : 'Off'}
            </span>
          </button>

          {/* Voice Speak Current Audio */}
          <button
            id="cook-voice-speak-btn"
            onClick={() => (isIntroSlide ? speakIntroAndIngredients(false) : speakCurrentStep(false))}
            className={`p-2 rounded-xl border backdrop-blur-xs transition-colors cursor-pointer ${
              isSpeaking 
                ? 'bg-amber-600 text-white animate-pulse border-amber-500 shadow-md' 
                : 'bg-white/70 hover:bg-white text-slate-700 border-white/80 shadow-2xs'
            }`}
            title={isSpeaking ? 'Mute narration' : 'Listen to explanation'}
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Voice Mic Toggle */}
          <button
            id="cook-voice-mic-btn"
            onClick={toggleMic}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all backdrop-blur-md cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30 border border-rose-400'
                : 'bg-amber-500/15 text-amber-950 border border-amber-300/60 hover:bg-amber-500/25'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isListening ? 'Listening...' : t.voiceMode}</span>
          </button>
        </div>
      </div>

      {/* Voice feedback toast */}
      {voiceFeedbackText && (
        <div className="glass-panel text-amber-950 px-4 py-2 rounded-2xl text-xs font-bold text-center border border-white/80 shadow-md animate-in fade-in duration-100">
          🎙️ {voiceFeedbackText}
        </div>
      )}

      {/* Progress Stepper Bar */}
      <div className="space-y-1.5 px-1">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>
            {isIntroSlide 
              ? (language === 'te' ? 'స్లైడ్ 1: పదార్థాల జాబితా' : 'Slide 1: Ingredients Overview') 
              : `${language === 'te' ? 'దశ' : 'Step'} ${currentStepNumber} / ${recipe.steps.length}`}
          </span>
          <span>{Math.round(((currentSlideIndex + 1) / totalSlides) * 100)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-white/60 backdrop-blur-xs border border-white/80 rounded-full overflow-hidden flex shadow-inner">
          <div 
            className="bg-gradient-to-r from-amber-500 to-orange-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SLIDE 0: FIRST SLIDE - REQUIRED ITEMS & INGREDIENTS VISUAL SHOWCASE */}
      {/* ========================================================================= */}
      {isIntroSlide && (
        <div className="glass-panel rounded-3xl border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] overflow-hidden p-5 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-amber-200/60">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-950 text-[11px] font-extrabold uppercase tracking-wider border border-amber-300/60">
                  {language === 'te' ? 'మొదటి స్లైడ్: వస్తువుల జాబితా' : 'Slide 1: Preparation & Ingredients'}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {servings} {t.people}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {language === 'te' ? 'కావలసిన పదార్థాలు & వస్తువులు' : 'Required Ingredients & Items'}
              </h2>
            </div>

            <button
              id="intro-start-steps-btn"
              onClick={handleNextSlide}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-sm shadow-lg shadow-orange-600/20 flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] border border-white/30 cursor-pointer shrink-0"
            >
              <span>{language === 'te' ? 'వండడం ప్రారంభించండి' : 'Start Cooking Steps'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Hero Recipe Image + Scaled Ingredients Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Recipe Hero Image Preview */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-4/3 relative shadow-md border border-white/80 bg-slate-100">
              <FoodImage
                src={recipe.imageUrl || recipe.image}
                alt={displayName}
                category={recipe.category}
                cuisine={recipe.cuisine}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  {recipe.cuisine} Cuisine • {recipe.category}
                </span>
                <h3 className="text-lg font-extrabold leading-tight">
                  {displayName}
                </h3>
              </div>
            </div>

            {/* Right: Visual Cards for all required ingredients */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <ListChecks className="w-4 h-4 text-amber-600" />
                  <span>{recipe.ingredients.length} {language === 'te' ? 'పదార్థాలు సిద్ధంగా ఉంచుకోండి' : 'Items Needed'}</span>
                </span>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-md border border-amber-200">
                  {language === 'te' ? 'ఖచ్చితమైన కొలతలు' : 'Exact Portions'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                {recipe.ingredients.map((ing, idx) => {
                  const qty = calculateIngredientQuantity(ing.baseQuantity, recipe.baseServings, servings);
                  const formatted = formatQuantityWithFraction(qty, ing.unit);
                  const ingName = ing.nameTranslations?.[language] || ing.name;

                  return (
                    <div 
                      key={idx}
                      className="bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white/90 shadow-2xs hover:shadow-sm hover:border-amber-300 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <p className="font-bold text-slate-900 text-xs truncate" title={ingName}>
                          {ingName}
                        </p>
                      </div>
                      <p className="text-amber-900 font-extrabold text-xs bg-amber-50/80 px-2 py-0.5 rounded-lg inline-block border border-amber-100">
                        {formatted}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SLIDE 1..N: VISUAL STAGE (IMAGE/VIDEO) + STEP MATTER BELOW THE SLIDE */}
      {/* ========================================================================= */}
      {!isIntroSlide && currentStep && (
        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
          
          {/* 1. TOP VISUAL SLIDE (Crisp Action Image with Culinary Overlays) */}
          <div className="glass-panel rounded-3xl border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] overflow-hidden p-3.5 sm:p-4 space-y-3">
            
            {/* Slide Header: Step Number, Title & Heat Level */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-amber-600/20 border border-white/40">
                  {currentStep.stepNumber}
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {language === 'te' ? `దశ ${currentStep.stepNumber} చిత్ర రూపం` : `Step ${currentStep.stepNumber}`}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                    {currentStep.titleTranslations?.[language] || currentStep.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {currentStep.temperatureOrHeat && (
                  <span className="px-3 py-1 rounded-full bg-orange-100/80 backdrop-blur-xs border border-orange-200/60 text-orange-950 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                    <Flame className="w-3.5 h-3.5 text-orange-600" />
                    <span>{currentStep.temperatureOrHeat}</span>
                  </span>
                )}
                {currentStep.durationMinutes && (
                  <span className="px-3 py-1 rounded-full bg-amber-100/80 backdrop-blur-xs border border-amber-200/60 text-amber-950 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{currentStep.durationMinutes} mins</span>
                  </span>
                )}
              </div>
            </div>

            {/* Visual Screen Container (Guaranteed Display with High-Res Action Photography) */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-16/9 sm:aspect-21/9 shadow-lg border border-white/20">
              <img
                src={stepImageUrl}
                alt={currentStep.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />

              {/* Polish Gradient & Badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                <span className="text-xs font-bold bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20">
                  {currentStep.titleTranslations?.[language] || currentStep.title}
                </span>
                {currentStep.durationMinutes && (
                  <span className="text-xs font-semibold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{currentStep.durationMinutes} mins</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 2. STEP BY STEP MATTER IN THE BELOW OF THE SLIDE */}
          <div className="glass-panel rounded-3xl border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] p-5 sm:p-7 space-y-5">
            
            {/* Section Heading */}
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-950 text-[11px] font-extrabold uppercase tracking-wider border border-amber-300/50">
                  {language === 'te' ? `దశ ${currentStep.stepNumber} వివరణ` : `Step ${currentStep.stepNumber} Instructions`}
                </span>
              </div>

              <button
                id="cook-step-listen-btn"
                onClick={() => speakCurrentStep(true)}
                className="px-3 py-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-950 border border-amber-300/60 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                <span>{language === 'te' ? 'వాయిస్ వినండి' : 'Listen'}</span>
              </button>
            </div>

            {/* Clear, Readable Step-by-Step Matter */}
            <div className="space-y-3">
              <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{currentStep.titleTranslations?.[language] || currentStep.title}</span>
              </h4>

              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 shadow-2xs">
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                  {currentStep.instructionTranslations?.[language] || currentStep.instruction}
                </p>
              </div>
            </div>

            {/* Chef Golden Tip (if available) */}
            {currentStep.chefTip && (
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-300/60 text-amber-950 text-xs sm:text-sm">
                <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-extrabold block text-amber-900">
                    {language === 'te' ? 'ముఖ్యమైన చిట్కా (Chef Tip):' : 'Chef Golden Tip:'}
                  </strong>
                  <p className="mt-0.5 text-slate-700">
                    {currentStep.chefTip}
                  </p>
                </div>
              </div>
            )}

            {/* Interactive Step Timer (If step duration exists) */}
            {timerSecondsLeft !== null && (
              <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md border border-white/10">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    timerFinished ? 'bg-emerald-500 text-white animate-bounce' : 'bg-white/10 text-amber-400'
                  }`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-300 block">
                      {language === 'te' ? 'స్టెప్ టైమర్' : 'Step Timer'}
                    </span>
                    <span className={`text-2xl font-mono font-extrabold ${timerFinished ? 'text-emerald-400' : 'text-white'}`}>
                      {formatTimerDisplay(timerSecondsLeft)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="cook-timer-toggle-btn"
                    onClick={() => setTimerRunning(!timerRunning)}
                    className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                      timerRunning 
                        ? 'bg-amber-500 text-slate-950 hover:bg-amber-400' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{timerRunning ? t.pauseTimer : t.startTimer}</span>
                  </button>

                  <button
                    id="cook-timer-reset-btn"
                    onClick={() => {
                      if (timerTotal) setTimerSecondsLeft(timerTotal);
                      setTimerRunning(false);
                      setTimerFinished(false);
                    }}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors cursor-pointer"
                    title="Reset timer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Culinary Rescue & Substitution Helpers */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                id="cook-i-made-a-mistake-btn"
                onClick={() => setMistakeModalOpen(true)}
                className="p-3 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-950 border border-rose-300/50 text-xs font-bold flex items-center justify-center gap-2 backdrop-blur-md transition-all cursor-pointer shadow-2xs"
              >
                <LifeBuoy className="w-4 h-4 text-rose-600" />
                <span>{t.iMadeAMistake}</span>
              </button>

              <button
                id="cook-substitutes-btn"
                onClick={() => setSubModalOpen(true)}
                className="p-3 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-950 border border-amber-300/50 text-xs font-bold flex items-center justify-center gap-2 backdrop-blur-md transition-all cursor-pointer shadow-2xs"
              >
                <RefreshCw className="w-4 h-4 text-amber-700" />
                <span>{t.needSubstitutes}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOTTOM STEP NAVIGATION CONTROLLER */}
      {/* ========================================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-30 glass-panel border-t border-white/80 backdrop-blur-2xl p-3.5 sm:p-4 shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          
          {/* Previous Step Button */}
          <button
            id="cook-prev-step-btn"
            onClick={handlePrevSlide}
            disabled={currentSlideIndex === 0}
            className="px-4 py-3 rounded-2xl bg-white/70 hover:bg-white disabled:opacity-30 text-slate-800 border border-white/80 backdrop-blur-xs font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t.previousStep}</span>
          </button>

          {/* Re-read Step button */}
          <button
            id="cook-repeat-step-btn"
            onClick={() => (isIntroSlide ? speakIntroAndIngredients(true) : speakCurrentStep(true))}
            className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-950 border border-amber-300/50 backdrop-blur-xs font-bold text-xs transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">{isIntroSlide ? (language === 'te' ? 'పదార్థాలు వినండి' : 'Read Ingredients') : t.repeatStep}</span>
            <span className="sm:hidden">{language === 'te' ? 'వాయిస్' : 'Voice'}</span>
          </button>

          {/* Next Step / Finish Button */}
          <button
            id="cook-next-step-btn"
            onClick={handleNextSlide}
            className={`px-6 py-3 rounded-2xl text-white font-extrabold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] border border-white/30 cursor-pointer ${
              isLastSlide 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 shadow-emerald-600/20' 
                : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 shadow-orange-600/20'
            }`}
          >
            <span>
              {isIntroSlide 
                ? (language === 'te' ? 'తయారీ ప్రారంభించు' : 'Start Cooking') 
                : isLastSlide 
                ? t.finishCooking 
                : t.nextStep}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mistake Recovery Modal */}
      <MistakeRecoveryModal
        isOpen={mistakeModalOpen}
        onClose={() => setMistakeModalOpen(false)}
        recipe={recipe}
        currentStepNumber={currentStepNumber}
        style={style}
      />

      {/* Substitution Modal */}
      <SubstitutionModal
        isOpen={subModalOpen}
        onClose={() => setSubModalOpen(false)}
        recipeName={recipe.name}
      />
    </div>
  );
};
