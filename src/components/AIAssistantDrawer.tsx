import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { Recipe, RecipeStyle, DietaryType } from '../types';
import { api } from '../services/api';
import { voiceController } from '../utils/speech';
import { useLanguage } from '../context/LanguageContext';

interface AIAssistantDrawerProps {
  recipe?: Recipe;
  currentStepNumber?: number;
  servings?: number;
  style?: RecipeStyle;
  dietaryPreference?: DietaryType;
  isOpen: boolean;
  onToggle: () => void;
  onOpenMistakeModal?: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  recipe,
  currentStepNumber,
  servings,
  style,
  dietaryPreference,
  isOpen,
  onToggle,
  onOpenMistakeModal
}) => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: language === 'te'
        ? 'నమస్కారం! నేను మీ AI కుకింగ్ చెఫ్. మీకు ఏ సందేహం ఉన్నా వాయిస్ లేదా టెక్స్ట్ ద్వారా అడగండి!'
        : 'Hello! I am your AI Chef companion. Ask me any cooking question, ingredient measurements, or culinary techniques!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceReplyEnabled, setVoiceReplyEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (questionText?: string) => {
    const query = (questionText || input).trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.slice(-4).map(m => ({
        role: m.sender,
        text: m.text
      }));

      const answer = await api.askAssistant(query, {
        recipe,
        currentStepNumber,
        servings,
        style,
        dietaryPreference,
        language,
        conversationHistory: history
      });

      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Speak answer if voice enabled
      if (voiceReplyEnabled) {
        voiceController.speak(
          answer, 
          language,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false)
        );
      }
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai_err_${Date.now()}`,
          sender: 'assistant',
          text: 'I had a slight hiccup connecting. Please try asking again!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
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
          setInput(text);
          if (isFinal) {
            setIsListening(false);
            handleSend(text);
          }
        },
        (err) => {
          console.warn('Voice err:', err);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  const quickPrompts = language === 'te' ? [
    'ఉప్పు ఎంత వేయాలి?',
    'నూనె వేడెక్కిందని ఎలా తెలుస్తుంది?',
    'గ్రేవీ చిక్కగా ఉంటే ఏమి చేయాలి?',
    'తర్వాత స్టెప్ ఏమిటి?'
  ] : [
    'How much salt do I add?',
    'How do I tell when oil is ready?',
    'Sauce is too thick, how to fix?',
    'What is the next step?'
  ];

  if (!isOpen) {
    return (
      <button
        id="ai-assistant-floating-btn"
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 border-2 border-white/60 backdrop-blur-md"
      >
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span>{t.askAI}</span>
      </button>
    );
  }

  return (
    <div 
      id="ai-assistant-drawer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-96 max-h-[600px] h-[520px] glass-modal rounded-3xl shadow-[0_16px_48px_0_rgba(31,38,135,0.2)] border border-white/80 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600/90 to-orange-600/90 backdrop-blur-md px-4 py-3.5 text-white flex items-center justify-between border-b border-white/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/40 shadow-inner">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
              <span>{t.askAI}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </h4>
            <p className="text-[10px] text-amber-100/90 truncate max-w-[170px]">
              {recipe ? recipe.name : 'Real-time culinary guidance'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Voice Reply Toggle */}
          <button
            id="ai-toggle-voice-reply"
            onClick={() => {
              setVoiceReplyEnabled(!voiceReplyEnabled);
              if (voiceReplyEnabled) voiceController.stopSpeaking();
            }}
            title={voiceReplyEnabled ? 'Voice responses ON' : 'Voice responses MUTED'}
            className={`p-1.5 rounded-xl transition-colors ${
              voiceReplyEnabled ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            {voiceReplyEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Close / Minimize */}
          <button
            id="ai-close-drawer-btn"
            onClick={onToggle}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-xs transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Emergency rescue shortcut strip */}
      {onOpenMistakeModal && (
        <div className="bg-rose-500/10 px-3.5 py-1.5 border-b border-rose-200/50 backdrop-blur-xs flex items-center justify-between">
          <span className="text-[11px] text-rose-900 font-semibold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            Cooking emergency?
          </span>
          <button
            id="ai-mistake-quick-open-btn"
            onClick={onOpenMistakeModal}
            className="text-[11px] font-bold text-rose-700 hover:text-rose-950 underline"
          >
            {t.iMadeAMistake} →
          </button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-white/30 backdrop-blur-xs">
        {messages.map((m) => {
          const isAi = m.sender === 'assistant';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed backdrop-blur-xs ${
                  isAi
                    ? 'bg-white/85 text-slate-800 shadow-2xs border border-white/80 rounded-tl-xs font-medium'
                    : 'bg-amber-600 text-white shadow-md shadow-amber-600/20 rounded-tr-xs border border-white/20'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                <span className={`block text-[9px] mt-1 text-right ${isAi ? 'text-slate-400' : 'text-amber-200'}`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 bg-white/85 px-3.5 py-2.5 rounded-2xl text-xs border border-white/80 shadow-2xs w-fit backdrop-blur-xs">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]"></div>
            <span className="text-[11px] text-slate-500 ml-1">AI Chef is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="px-3 py-1.5 bg-white/40 border-t border-white/60 backdrop-blur-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(prompt)}
            className="shrink-0 px-2.5 py-1 rounded-full bg-white/70 hover:bg-white text-amber-950 border border-white/80 backdrop-blur-xs text-[11px] font-semibold transition-colors shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box + Mic */}
      <div className="p-3 bg-white/60 border-t border-white/80 backdrop-blur-md flex items-center gap-2">
        <button
          id="ai-mic-btn"
          type="button"
          onClick={toggleMic}
          className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
            isListening
              ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
              : 'bg-white/80 hover:bg-white text-slate-700 border border-white/80 shadow-2xs'
          }`}
          title="Press to Speak"
        >
          {isListening ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          id="ai-chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder={isListening ? t.micListening : 'Ask anything about cooking...'}
          className="glass-input flex-1 px-3.5 py-2 text-xs rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <button
          id="ai-chat-send-btn"
          type="button"
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="w-9 h-9 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center shadow-md shadow-amber-600/20 disabled:opacity-40 transition-all border border-white/30"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
