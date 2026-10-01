import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Save, 
  Check, 
  Globe, 
  Mic, 
  Sparkles, 
  ChefHat, 
  Flame, 
  Clock, 
  DollarSign 
} from 'lucide-react';
import { UserPreferences, DietaryType, SpiceLevel, CookingExperience, TimePreference, BudgetPreference, LanguageCode } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const ProfileView: React.FC = () => {
  const { user, updatePreferences, loginDemo } = useAuth();
  const { language, setLanguage, t, availableLanguages } = useLanguage();

  const [dietary, setDietary] = useState<DietaryType>(user?.preferences.dietaryPreference || 'Vegetarian');
  const [spice, setSpice] = useState<SpiceLevel>(user?.preferences.spiceLevel || 'Medium');
  const [experience, setExperience] = useState<CookingExperience>(user?.preferences.cookingExperience || 'Intermediate');
  const [time, setTime] = useState<TimePreference>(user?.preferences.availableTime || 'Under 30 minutes');
  const [budget, setBudget] = useState<BudgetPreference>(user?.preferences.budget || '$$');
  const [cuisines, setCuisines] = useState<string[]>(user?.preferences.preferredCuisines || ['Indian', 'Italian']);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(user?.preferences.voiceEnabled ?? true);
  
  const [savedToast, setSavedToast] = useState(false);
  const [saving, setSaving] = useState(false);

  const dietaryOptions: DietaryType[] = ['Vegetarian', 'Non-vegetarian', 'Vegan', 'Egg-free', 'Dairy-free', 'Gluten-free'];
  const spiceOptions: SpiceLevel[] = ['Mild', 'Medium', 'Spicy', 'Very Spicy'];
  const experienceOptions: CookingExperience[] = ['Beginner', 'Intermediate', 'Advanced'];
  const timeOptions: TimePreference[] = ['Under 15 minutes', 'Under 30 minutes', 'Under 60 minutes', 'Any time'];
  const budgetOptions: BudgetPreference[] = ['$', '$$', '$$$'];
  const allCuisines = ['Indian', 'Italian', 'Mexican', 'Asian', 'Mediterranean', 'American'];

  const toggleCuisine = (c: string) => {
    if (cuisines.includes(c)) {
      if (cuisines.length > 1) {
        setCuisines(cuisines.filter(item => item !== c));
      }
    } else {
      setCuisines([...cuisines, c]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await updatePreferences({
        dietaryPreference: dietary,
        spiceLevel: spice,
        cookingExperience: experience,
        availableTime: time,
        budget: budget,
        preferredCuisines: cuisines,
        preferredLanguage: language,
        voiceEnabled
      });
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <div className="glass-panel rounded-3xl p-8 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-700 flex items-center justify-center mx-auto border border-amber-300/60 shadow-inner">
            <ChefHat className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Signed Out</h2>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Sign in to customize your personal dietary preferences, spice tolerance, saved favorites, and cooking history.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              id="profile-quick-demo-login-btn"
              type="button"
              onClick={() => loginDemo()}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 flex items-center justify-center gap-2 border border-white/30 transition-transform active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Sign In with 1-Click Demo</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Settings className="w-8 h-8 text-amber-600" />
            <span>{t.profile}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Customize dietary goals, spice levels, cuisines, and voice assistant settings.
          </p>
        </div>

        {savedToast && (
          <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-500/15 border border-emerald-300/50 text-emerald-900 text-xs font-bold flex items-center gap-1.5 backdrop-blur-md shadow-2xs animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Preferences Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Account Info */}
        <div className="glass-panel rounded-3xl p-6 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Account Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Chef Name</label>
              <input
                type="text"
                disabled
                value={user.name}
                className="w-full px-3.5 py-2 text-xs bg-white/60 rounded-2xl border border-white/80 text-slate-800 font-bold backdrop-blur-xs shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Email Address</label>
              <input
                type="text"
                disabled
                value={user.email}
                className="w-full px-3.5 py-2 text-xs bg-white/60 rounded-2xl border border-white/80 text-slate-800 backdrop-blur-xs shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Dietary Preference */}
        <div className="glass-panel rounded-3xl p-6 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] space-y-3">
          <label className="block text-sm font-bold text-slate-900">
            {t.dietaryPreference}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {dietaryOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setDietary(opt)}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold border backdrop-blur-xs transition-all ${
                  dietary === opt
                    ? 'border-amber-600 bg-amber-600 text-white shadow-md shadow-amber-600/20'
                    : 'border-white/80 bg-white/60 text-slate-700 hover:bg-white shadow-2xs'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Spice Level & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Spice Level */}
          <div className="glass-panel rounded-3xl p-6 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] space-y-3">
            <label className="block text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>{t.spiceLevel}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {spiceOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSpice(opt)}
                  className={`py-2 px-3 rounded-2xl text-xs font-bold border backdrop-blur-xs transition-all ${
                    spice === opt
                      ? 'border-orange-600 bg-orange-600 text-white shadow-md shadow-orange-600/20'
                      : 'border-white/80 bg-white/60 text-slate-700 hover:bg-white shadow-2xs'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Cooking Experience */}
          <div className="glass-panel rounded-3xl p-6 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] space-y-3">
            <label className="block text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-amber-600" />
              <span>{t.experience}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {experienceOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setExperience(opt)}
                  className={`py-2 px-2 rounded-2xl text-xs font-bold border backdrop-blur-xs transition-all ${
                    experience === opt
                      ? 'border-amber-600 bg-amber-600 text-white shadow-md shadow-amber-600/20'
                      : 'border-white/80 bg-white/60 text-slate-700 hover:bg-white shadow-2xs'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Time & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] space-y-3">
            <label className="block text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-600" />
              <span>Typical Prep Time</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {timeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setTime(opt)}
                  className={`py-2 px-2 rounded-2xl text-xs font-bold border backdrop-blur-xs transition-all ${
                    time === opt
                      ? 'border-amber-600 bg-amber-600 text-white shadow-md shadow-amber-600/20'
                      : 'border-white/80 bg-white/60 text-slate-700 hover:bg-white shadow-2xs'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] space-y-3">
            <label className="block text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-slate-600" />
              <span>Budget Level</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {budgetOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setBudget(opt)}
                  className={`py-2 px-2 rounded-2xl text-xs font-bold border backdrop-blur-xs transition-all ${
                    budget === opt
                      ? 'border-amber-600 bg-amber-600 text-white shadow-md shadow-amber-600/20'
                      : 'border-white/80 bg-white/60 text-slate-700 hover:bg-white shadow-2xs'
                  }`}
                >
                  {opt === '$' ? '$ (Budget)' : opt === '$$' ? '$$ (Moderate)' : '$$$ (Gourmet)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preferred Cuisines Multi-select */}
        <div className="glass-panel rounded-3xl p-6 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] space-y-3">
          <label className="block text-sm font-bold text-slate-900">
            Preferred Cuisines
          </label>
          <div className="flex flex-wrap gap-2">
            {allCuisines.map((c) => {
              const isSelected = cuisines.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleCuisine(c)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 border border-amber-600'
                      : 'bg-white/60 text-slate-700 hover:bg-white border border-white/80 backdrop-blur-xs shadow-2xs'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '}{c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Language & Voice Settings */}
        <div className="glass-panel rounded-3xl p-6 border border-white/80 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-600" />
            <span>Language & Audio Settings</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableLanguages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLanguage(l.code as LanguageCode)}
                className={`py-2 px-3 rounded-2xl text-xs flex items-center justify-between border backdrop-blur-xs transition-all ${
                  language === l.code
                    ? 'border-amber-600 bg-amber-600 text-white font-bold shadow-md shadow-amber-600/20'
                    : 'border-white/80 bg-white/60 text-slate-700 hover:bg-white shadow-2xs'
                }`}
              >
                <span>{l.label}</span>
                <span className="text-[11px] opacity-70 font-normal">{l.nativeLabel}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-orange-600" />
              <div>
                <p className="text-xs font-bold text-slate-900">Voice Assistance Responses</p>
                <p className="text-[11px] text-slate-500">Read recipe steps and answers aloud</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                voiceEnabled ? 'bg-amber-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  voiceEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Submit Save Button */}
        <button
          id="profile-save-preferences-btn"
          type="submit"
          disabled={saving}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 border border-white/30 active:scale-98"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Cooking Preferences</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
