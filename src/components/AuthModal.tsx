import React, { useState } from 'react';
import { X, Sparkles, LogIn, UserPlus, ChefHat, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode = 'login', onClose }) => {
  const { login, register, loginDemo } = useAuth();
  const { t } = useLanguage();
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);

  // Sync initialMode when opening
  React.useEffect(() => {
    if (isOpen) {
      setIsRegister(initialMode === 'register');
      setError(null);
      setDemoSuccess(false);
      setName('');
      setEmail('');
      setPassword('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegister) {
        await register(name.trim() || 'Foodie Cook', email.trim(), password);
      } else {
        await login(email.trim(), password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setError(null);
    setLoading(true);
    try {
      await loginDemo();
      setDemoSuccess(true);
      setTimeout(() => {
        onClose();
      }, 400);
    } catch (err: any) {
      console.warn('Demo login issue:', err);
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div 
        id="auth-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="glass-modal rounded-3xl shadow-[0_16px_48px_0_rgba(31,38,135,0.15)] max-w-md w-full overflow-hidden border border-white/80 animate-in zoom-in-95 duration-200 cursor-default"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600/90 to-orange-600/90 backdrop-blur-md px-6 py-5 text-white flex items-center justify-between border-b border-white/20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/40 shadow-inner">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                {isRegister ? t.register : t.login}
              </h3>
              <p className="text-xs text-amber-100/90">
                Unlock personalized recommendations & history
              </p>
            </div>
          </div>
          <button 
            id="auth-modal-close-btn"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-xs transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          
          {/* Quick Demo Pill */}
          <div className="bg-amber-500/10 border border-amber-300/50 backdrop-blur-xs rounded-2xl p-3.5 flex items-center justify-between shadow-2xs">
            <div>
              <p className="text-xs font-bold text-amber-950">1-Click Demo Account</p>
              <p className="text-[11px] text-amber-800">Preloaded with favorites & history (Demo Chef)</p>
            </div>
            <button
              id="auth-quick-demo-btn"
              type="button"
              disabled={loading}
              onClick={handleDemoLogin}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 flex items-center gap-1.5 transition-all border border-white/30 active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : demoSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Success!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Try Demo Chef</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-300/50 backdrop-blur-xs rounded-2xl text-xs text-rose-800 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  id="auth-input-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Chef"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-input w-full px-3.5 py-2.5 text-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                id="auth-input-email"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input w-full px-3.5 py-2.5 text-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <input
                id="auth-input-password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input w-full px-3.5 py-2.5 text-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              id="auth-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 border border-white/30 active:scale-98"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isRegister ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  {t.register}
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  {t.login}
                </>
              )}
            </button>
          </form>

          {/* Toggle Register / Login / Guest */}
          <div className="flex flex-col items-center gap-2 pt-2">
            <button
              id="auth-toggle-mode-btn"
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError(null);
              }}
              className="text-xs text-slate-600 hover:text-amber-700 font-medium transition-colors"
            >
              {isRegister 
                ? 'Already have an account? Log in' 
                : "Don't have an account yet? Create one"}
            </button>

            <button
              id="auth-continue-guest-btn"
              type="button"
              onClick={onClose}
              className="text-[11px] text-slate-400 hover:text-slate-600 underline transition-colors cursor-pointer"
            >
              Continue exploring as guest without logging in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
