import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Search, 
  Sparkles, 
  Mic, 
  ShoppingBag, 
  Heart, 
  User, 
  Globe, 
  Menu, 
  X,
  ChefHat,
  Home,
  Bot,
  SlidersHorizontal,
  History,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: any) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onOpenVoiceHelp: () => void;
  onOpenAIAssistant?: () => void;
  shoppingItemCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAuth,
  onOpenVoiceHelp,
  onOpenAIAssistant,
  shoppingItemCount = 0
}) => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const mainNavLinks = [
    { id: 'landing', label: t.home, icon: Home },
    { id: 'explore', label: t.explore, icon: Search },
    { id: 'what-can-i-cook', label: t.whatCanICook, icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            id="nav-brand-logo"
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-sm group-hover:bg-amber-700 transition-colors">
              <UtensilsCrossed className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  {t.appName}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 rounded-md border border-amber-200">
                  AI Chef
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links - Kept strictly to essential core destinations */}
          <nav className="hidden md:flex items-center gap-1.5">
            {mainNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-50 text-amber-900 border border-amber-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Language, Shopping, and Profile / Sign In */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Shopping List Quick Icon */}
            <button
              id="nav-shopping-btn"
              onClick={() => onNavigate('shopping')}
              title={t.shoppingList}
              className={`relative p-2 rounded-xl border transition-colors cursor-pointer ${
                currentView === 'shopping' 
                  ? 'bg-amber-50 border-amber-200 text-amber-900' 
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {shoppingItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {shoppingItemCount}
                </span>
              )}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="nav-language-select-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-amber-600" />
                <span className="uppercase font-bold">{language === 'te' ? 'తెలుగు' : language === 'hi' ? 'हिंदी' : 'EN'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div 
                  id="nav-language-dropdown"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Language / భాష
                  </div>
                  {availableLanguages.map((l) => (
                    <button
                      key={l.code}
                      id={`lang-option-${l.code}`}
                      onClick={() => {
                        setLanguage(l.code as LanguageCode);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        language === l.code
                          ? 'bg-amber-50 text-amber-900 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-slate-500 font-medium">{l.nativeLabel}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Account / Login Button */}
            {user ? (
              <div className="relative">
                <button
                  id="nav-user-profile-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 max-w-[100px] truncate hidden sm:inline">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div 
                    id="nav-user-dropdown"
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                  >
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>
                    
                    <button
                      id="nav-dropdown-profile"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('profile');
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-amber-50 flex items-center gap-2.5 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.profile}</span>
                    </button>
                    
                    <button
                      id="nav-dropdown-favorites"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('dashboard');
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-amber-50 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>{t.favorites}</span>
                    </button>

                    <button
                      id="nav-dropdown-history"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('dashboard');
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-amber-50 flex items-center gap-2.5 cursor-pointer"
                    >
                      <History className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.cookingHistory}</span>
                    </button>

                    <button
                      id="nav-dropdown-preferences"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate('profile');
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-amber-50 flex items-center gap-2.5 cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.preferences}</span>
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>
                    
                    <button
                      id="nav-dropdown-logout"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                        onNavigate('landing');
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2.5 font-medium cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t.logout}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="nav-login-btn"
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                {t.login}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              id="nav-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 space-y-1 bg-white rounded-b-2xl p-2 my-2 border shadow-lg">
            {mainNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer ${
                    isActive ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('shopping');
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-slate-400" />
                <span>{t.shoppingList}</span>
              </div>
              {shoppingItemCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white">
                  {shoppingItemCount}
                </span>
              )}
            </button>

            {user && (
              <>
                <div className="border-t border-slate-100 my-2"></div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('profile');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>{t.profile}</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('dashboard');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700"
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>{t.favorites}</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    onNavigate('landing');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.logout}</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
