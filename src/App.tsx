import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { VoiceCommandHelpModal } from './components/VoiceCommandHelpModal';
import { MistakeRecoveryModal } from './components/MistakeRecoveryModal';
import { SubstitutionModal } from './components/SubstitutionModal';

import { LandingView } from './views/LandingView';
import { ExploreView } from './views/ExploreView';
import { WhatCanICookView } from './views/WhatCanICookView';
import { RecipeDetailView } from './views/RecipeDetailView';
import { CookWithMeView } from './views/CookWithMeView';
import { DashboardView } from './views/DashboardView';
import { ShoppingListView } from './views/ShoppingListView';
import { ProfileView } from './views/ProfileView';

import { Recipe, RecipeStyle } from './types';
import { api } from './services/api';
import { useAuth } from './context/AuthContext';
import { useLanguage } from './context/LanguageContext';

export function App() {
  const { user } = useAuth();
  const { language } = useLanguage();

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('landing');
  const [exploreParams, setExploreParams] = useState<{ search?: string; cuisine?: string }>({});
  
  // Active Recipe State
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [cookingServings, setCookingServings] = useState<number>(4);
  const [cookingStyle, setCookingStyle] = useState<RecipeStyle>('restaurant');

  // Modals & Drawers State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [voiceHelpOpen, setVoiceHelpOpen] = useState(false);
  const [mistakeModalOpen, setMistakeModalOpen] = useState(false);
  const [substitutionModalOpen, setSubstitutionModalOpen] = useState(false);

  // Shopping list count badge
  const [shoppingCount, setShoppingCount] = useState(0);

  useEffect(() => {
    async function loadShoppingCount() {
      if (user) {
        try {
          const list = await api.getShoppingList(user.id);
          setShoppingCount(list.filter(i => !i.completed).length);
        } catch (e) {
          console.error(e);
        }
      } else {
        setShoppingCount(0);
      }
    }
    loadShoppingCount();
  }, [user, currentView]);

  const handleNavigate = (view: string, params?: any) => {
    if (view === 'explore' && params) {
      setExploreParams(params);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCookingServings(recipe.baseServings);
    setCookingStyle('restaurant');
    setCurrentView('recipe-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCooking = (recipe: Recipe, servings?: number, style?: RecipeStyle) => {
    setSelectedRecipe(recipe);
    setCookingServings(servings || recipe.baseServings);
    setCookingStyle(style || 'restaurant');
    setCurrentView('cook-with-me');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-white relative overflow-x-hidden">
      
      {/* Ambient Frosted Glass Background Mesh Lights */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-amber-200/35 to-orange-300/30 rounded-full blur-3xl opacity-70 animate-pulse duration-1000"></div>
        <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-gradient-to-br from-emerald-200/25 to-teal-300/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-40 left-1/4 w-[650px] h-[650px] bg-gradient-to-br from-amber-100/40 to-rose-200/25 rounded-full blur-3xl opacity-60"></div>
      </div>

      {/* Top Navigation (hidden during active full-screen Cook With Me mode for immersion) */}
      <div className="relative z-40">
        {currentView !== 'cook-with-me' && (
          <Navbar
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenAuth={(mode) => {
              setAuthMode(mode);
              setAuthModalOpen(true);
            }}
            onOpenVoiceHelp={() => setVoiceHelpOpen(true)}
            shoppingItemCount={shoppingCount}
          />
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {currentView === 'landing' && (
          <div className="pt-6">
            <LandingView
              onNavigate={handleNavigate}
              onSelectRecipe={handleSelectRecipe}
              onStartCooking={handleStartCooking}
            />
          </div>
        )}

        {currentView === 'explore' && (
          <div className="pt-6">
            <ExploreView
              initialSearch={exploreParams.search || ''}
              initialCuisine={exploreParams.cuisine || 'All'}
              onSelectRecipe={handleSelectRecipe}
              onStartCooking={handleStartCooking}
            />
          </div>
        )}

        {currentView === 'what-can-i-cook' && (
          <div className="pt-6">
            <WhatCanICookView
              onSelectRecipe={handleSelectRecipe}
              onStartCooking={handleStartCooking}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {currentView === 'recipe-detail' && selectedRecipe && (
          <div className="pt-6">
            <RecipeDetailView
              recipe={selectedRecipe}
              onBack={() => handleNavigate('explore')}
              onStartCooking={handleStartCooking}
            />
          </div>
        )}

        {currentView === 'cook-with-me' && selectedRecipe && (
          <div className="pt-4">
            <CookWithMeView
              recipe={selectedRecipe}
              servings={cookingServings}
              style={cookingStyle}
              onExit={() => handleNavigate('recipe-detail')}
              onComplete={() => handleNavigate('dashboard')}
            />
          </div>
        )}

        {currentView === 'dashboard' && (
          <div className="pt-6">
            <DashboardView
              onSelectRecipe={handleSelectRecipe}
              onStartCooking={handleStartCooking}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {currentView === 'shopping' && (
          <div className="pt-6">
            <ShoppingListView />
          </div>
        )}

        {currentView === 'profile' && (
          <div className="pt-6">
            <ProfileView />
          </div>
        )}
      </main>

      {/* Global Floating AI Chef Assistant (disabled during recipe learning and active cooking) */}
      {currentView !== 'cook-with-me' && currentView !== 'recipe-detail' && (
        <AIAssistantDrawer
          recipe={selectedRecipe || undefined}
          isOpen={aiAssistantOpen}
          onToggle={() => setAiAssistantOpen(!aiAssistantOpen)}
          onOpenMistakeModal={() => setMistakeModalOpen(true)}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Voice Commands Guide Modal */}
      <VoiceCommandHelpModal
        isOpen={voiceHelpOpen}
        onClose={() => setVoiceHelpOpen(false)}
      />

      {/* Mistake Recovery Modal */}
      <MistakeRecoveryModal
        isOpen={mistakeModalOpen}
        onClose={() => setMistakeModalOpen(false)}
        recipe={selectedRecipe || undefined}
      />

      {/* Substitution Modal */}
      <SubstitutionModal
        isOpen={substitutionModalOpen}
        onClose={() => setSubstitutionModalOpen(false)}
        recipeName={selectedRecipe?.name}
      />

      {/* Footer */}
      {currentView !== 'cook-with-me' && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;
