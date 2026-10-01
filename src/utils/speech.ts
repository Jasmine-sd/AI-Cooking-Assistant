import { LanguageCode } from '../types';

export const LANGUAGE_LOCALES: Record<LanguageCode, string> = {
  en: 'en-US',
  te: 'te-IN',
  hi: 'hi-IN',
  es: 'es-ES',
  fr: 'fr-FR',
  ta: 'ta-IN'
};

// Check if browser speech recognition is available
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

// Clean text for natural speech synthesis
function normalizeTextForSpeech(rawText: string, lang: LanguageCode): string {
  if (!rawText) return '';

  let text = rawText;

  // Remove markdown bold, italic, code, headers, bullets
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/_([^_]+)_/g, '$1');
  text = text.replace(/`([^`]+)`/g, '$1');
  text = text.replace(/^#+\s+/gm, '');
  text = text.replace(/^[•\-\*]\s+/gm, '');

  // Remove URLs or file paths
  text = text.replace(/https?:\/\/\S+/g, '');
  text = text.replace(/\/images\/\S+/g, '');

  // Remove emojis and common UI icons so the synthesizer doesn't attempt to spell them
  text = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}\u{FE00}-\u{FE0F}]/gu, '');

  // Normalize common cooking abbreviations in English / Hinglish
  if (lang === 'en') {
    text = text.replace(/\b1\/2\b/g, 'half');
    text = text.replace(/\b1\/4\b/g, 'one quarter');
    text = text.replace(/\b3\/4\b/g, 'three quarters');
    text = text.replace(/\b1\.5\b/g, 'one and a half');
    text = text.replace(/\b2\.5\b/g, 'two and a half');
    text = text.replace(/\btbsp\b/gi, 'tablespoons');
    text = text.replace(/\btsp\b/gi, 'teaspoons');
    text = text.replace(/\bmins\b/gi, 'minutes');
    text = text.replace(/\bmin\b/gi, 'minute');
    text = text.replace(/\bsec\b/gi, 'seconds');
    text = text.replace(/\bkg\b/gi, 'kilograms');
    text = text.replace(/\bg\b(?!\w)/gi, 'grams');
    text = text.replace(/\bml\b/gi, 'milliliters');
  } else if (lang === 'te') {
    text = text.replace(/\b1\/2\b/g, 'సగం');
    text = text.replace(/\b1\/4\b/g, 'పావు');
    text = text.replace(/\b3\/4\b/g, 'ముప్పావు');
    text = text.replace(/\btbsp\b/gi, 'టేబుల్ స్పూన్లు');
    text = text.replace(/\btsp\b/gi, 'టీస్పూన్లు');
    text = text.replace(/\bmins\b/gi, 'నిమిషాలు');
  } else if (lang === 'hi') {
    text = text.replace(/\b1\/2\b/g, 'आधा');
    text = text.replace(/\b1\/4\b/g, 'चौथाई');
    text = text.replace(/\b3\/4\b/g, 'पौने');
    text = text.replace(/\btbsp\b/gi, 'चम्मच');
    text = text.replace(/\btsp\b/gi, 'छोटी चम्मच');
    text = text.replace(/\bmins\b/gi, 'मिनट');
  }

  // Clean excessive spaces, dashes and special symbols
  text = text.replace(/[–—]/g, '-');
  text = text.replace(/\s{2,}/g, ' ').trim();

  return text;
}

export class VoiceController {
  private recognition: any = null;
  private isListening: boolean = false;
  private onResultCallback?: (text: string, isFinal: boolean) => void;
  private onErrorCallback?: (err: string) => void;
  private onEndCallback?: () => void;
  private currentLanguage: LanguageCode = 'en';

  // Voice lock & audio state
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private selectedVoiceMap: Map<LanguageCode, SpeechSynthesisVoice | null> = new Map();
  private currentSessionId: number = 0;
  private isSpeakingInternal: boolean = false;
  private activeOnStart?: () => void;
  private activeOnEnd?: () => void;
  private currentAudio: HTMLAudioElement | null = null;

  constructor() {
    // 1. Initialize Speech Recognition
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }

        if (final && this.onResultCallback) {
          this.onResultCallback(final, true);
        } else if (interim && this.onResultCallback) {
          this.onResultCallback(interim, false);
        }
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        if (this.onErrorCallback) {
          this.onErrorCallback(event.error);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.onEndCallback) {
          this.onEndCallback();
        }
      };
    }

    // 2. Pre-load and cache voices
    this.initVoices();
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const populateVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          this.cachedVoices = voices;
          // Pre-select and lock consistent voice for each language
          (['en', 'te', 'hi', 'es', 'fr', 'ta'] as LanguageCode[]).forEach(l => {
            this.selectedVoiceMap.set(l, this.findBestVoice(l, voices));
          });
        }
      } catch (e) {
        console.warn('Voice enumeration issue:', e);
      }
    };

    populateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = populateVoices;
    }
  }

  // Find the single best, consistent voice for a given language
  private findBestVoice(lang: LanguageCode, voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    if (!voices || voices.length === 0) return null;

    const targetLocale = LANGUAGE_LOCALES[lang] || 'en-US';
    const langLower = lang.toLowerCase();
    const localeLower = targetLocale.toLowerCase();

    // 1. Exact locale match with high quality natural voices
    const exactMatches = voices.filter(v => 
      v.lang.toLowerCase() === localeLower || 
      v.lang.replace('_', '-').toLowerCase() === localeLower
    );

    if (exactMatches.length > 0) {
      // Prioritize natural / online / Google / Apple voices for smoother narration
      const premium = exactMatches.find(v => 
        v.name.includes('Natural') || 
        v.name.includes('Google') || 
        v.name.includes('Samantha') || 
        v.name.includes('Jenny') ||
        v.name.includes('Guy') ||
        v.name.includes('Premium')
      );
      return premium || exactMatches[0];
    }

    // 2. Starts with target language prefix (e.g. 'te', 'hi', 'ta')
    const prefixMatches = voices.filter(v => v.lang.toLowerCase().startsWith(langLower));
    if (prefixMatches.length > 0) {
      return prefixMatches[0];
    }

    // 3. Language name in voice name (e.g. "Telugu", "Hindi", "Tamil")
    const langNames: Record<LanguageCode, string[]> = {
      te: ['telugu', 'te-in'],
      hi: ['hindi', 'hi-in', 'india'],
      ta: ['tamil', 'ta-in'],
      en: ['english', 'en-us', 'en-gb'],
      es: ['spanish', 'español', 'es-es'],
      fr: ['french', 'français', 'fr-fr']
    };

    const keywords = langNames[lang] || [];
    for (const kw of keywords) {
      const match = voices.find(v => v.name.toLowerCase().includes(kw) || v.lang.toLowerCase().includes(kw));
      if (match) return match;
    }

    // 4. Regional fallback for Indian languages if device doesn't have exact native voice pack:
    // Pick Indian English (en-IN) which correctly pronounces Indian culinary words (ghee, paneer, besan, masala)
    if (lang === 'te' || lang === 'hi' || lang === 'ta') {
      const indianVoice = voices.find(v => v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('in'));
      if (indianVoice) return indianVoice;
    }

    // 5. Default natural English or first available
    const defaultNatural = voices.find(v => 
      (v.lang.toLowerCase().startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')))
    );

    return defaultNatural || voices[0] || null;
  }

  // Retrieve the locked, consistent voice for the language
  private getLockedVoice(lang: LanguageCode): SpeechSynthesisVoice | null {
    if (this.selectedVoiceMap.has(lang)) {
      const cached = this.selectedVoiceMap.get(lang);
      if (cached) return cached;
    }

    const voices = (this.cachedVoices.length > 0) 
      ? this.cachedVoices 
      : (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : []);

    const picked = this.findBestVoice(lang, voices);
    this.selectedVoiceMap.set(lang, picked);
    return picked;
  }

  isSupported(): boolean {
    return !!SpeechRecognition || (typeof window !== 'undefined' && 'speechSynthesis' in window);
  }

  setLanguage(lang: LanguageCode) {
    this.currentLanguage = lang;
    if (this.recognition) {
      this.recognition.lang = LANGUAGE_LOCALES[lang] || 'en-US';
    }
  }

  startListening(
    onResult: (text: string, isFinal: boolean) => void,
    onError?: (err: string) => void,
    onEnd?: () => void
  ): boolean {
    if (!this.recognition) {
      if (onError) onError('Speech recognition is not supported in this browser.');
      return false;
    }

    if (this.isListening) {
      this.stopListening();
    }

    this.onResultCallback = onResult;
    this.onErrorCallback = onError;
    this.onEndCallback = onEnd;
    this.recognition.lang = LANGUAGE_LOCALES[this.currentLanguage] || 'en-US';

    try {
      this.recognition.start();
      this.isListening = true;
      this.playChime('start');
      return true;
    } catch (e: any) {
      console.warn('Speech recognition start error:', e);
      if (onError) onError(e.message || 'Microphone error');
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
      this.isListening = false;
    }
  }

  getIsSpeaking(): boolean {
    return this.isSpeakingInternal;
  }

  /**
   * Speaks the provided text using natural audio streaming (/api/tts) for Telugu
   * or high-quality browser synthesis for English.
   */
  speak(
    text: string,
    lang: LanguageCode = this.currentLanguage,
    onStart?: () => void,
    onEnd?: () => void
  ): boolean {
    // 1. Cleanly cancel any current active speech session
    this.stopSpeaking();
    if (!text || !text.trim()) return false;

    // 2. Normalize and clean the text for speech
    const cleanText = normalizeTextForSpeech(text, lang);
    if (!cleanText) return false;

    // 3. Increment session ID so any pending callbacks from previous sessions are discarded
    const sessionId = ++this.currentSessionId;
    this.isSpeakingInternal = true;
    this.activeOnStart = onStart;
    this.activeOnEnd = onEnd;

    // 4. Split into natural sentence chunks (up to ~140 chars)
    const sentenceDelimiters = /(?<=[.!?|।\n])\s+/;
    const rawSentences = cleanText
      .split(sentenceDelimiters)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const chunks: string[] = [];
    for (const s of (rawSentences.length > 0 ? rawSentences : [cleanText])) {
      if (s.length > 150) {
        // Sub-split long sentences by comma or semicolon
        const subParts = s.split(/(?<=[,;])\s+/);
        chunks.push(...subParts.filter(p => p.trim().length > 0));
      } else {
        chunks.push(s);
      }
    }

    if (chunks.length === 0) {
      this.stopSpeaking();
      return false;
    }

    // 5. Always use /api/tts streaming audio for Telugu (and Hindi/Tamil or any non-English where browsers lack offline voice)
    const preferServerTts = lang === 'te' || lang === 'hi' || lang === 'ta' || (typeof window !== 'undefined' && !('speechSynthesis' in window));

    if (preferServerTts) {
      this.playViaAudioStream(chunks, lang, sessionId);
      return true;
    }

    // 6. Otherwise for English/Spanish/French, check if browser synthesis has a voice
    const lockedVoice = this.getLockedVoice(lang);
    const targetLocale = LANGUAGE_LOCALES[lang] || 'en-US';

    // If no acceptable browser voice found, fall back to /api/tts
    if (!lockedVoice && typeof window !== 'undefined' && 'Audio' in window) {
      this.playViaAudioStream(chunks, lang, sessionId);
      return true;
    }

    let currentChunkIndex = 0;

    const speakBrowserChunk = () => {
      if (this.currentSessionId !== sessionId) return;

      if (currentChunkIndex >= chunks.length) {
        this.isSpeakingInternal = false;
        if (this.activeOnEnd) {
          const cb = this.activeOnEnd;
          this.activeOnEnd = undefined;
          cb();
        }
        return;
      }

      const chunkText = chunks[currentChunkIndex];
      const utterance = new SpeechSynthesisUtterance(chunkText);
      utterance.lang = targetLocale;
      if (lockedVoice) {
        utterance.voice = lockedVoice;
      }

      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        if (this.currentSessionId !== sessionId) return;
        if (currentChunkIndex === 0 && this.activeOnStart) {
          const cb = this.activeOnStart;
          this.activeOnStart = undefined;
          cb();
        }
      };

      utterance.onend = () => {
        if (this.currentSessionId !== sessionId) return;
        currentChunkIndex++;
        speakBrowserChunk();
      };

      utterance.onerror = (e) => {
        if (this.currentSessionId !== sessionId) return;
        console.warn('Speech chunk warning:', e);
        // Fallback to /api/tts if browser synthesis failed
        if (currentChunkIndex === 0) {
          this.playViaAudioStream(chunks, lang, sessionId);
        } else {
          currentChunkIndex++;
          speakBrowserChunk();
        }
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Synthesis speak error:', err);
        this.playViaAudioStream(chunks, lang, sessionId);
      }
    };

    speakBrowserChunk();
    return true;
  }

  /**
   * Plays chunks through the high-fidelity server TTS stream (/api/tts),
   * providing authentic, crystal-clear Telugu pronunciation on all devices and browsers.
   */
  private playViaAudioStream(chunks: string[], lang: LanguageCode, sessionId: number) {
    let currentIdx = 0;

    const playNextAudio = () => {
      if (this.currentSessionId !== sessionId) return;

      if (currentIdx >= chunks.length) {
        this.isSpeakingInternal = false;
        if (this.activeOnEnd) {
          const cb = this.activeOnEnd;
          this.activeOnEnd = undefined;
          cb();
        }
        return;
      }

      const chunk = chunks[currentIdx];
      const url = `/api/tts?text=${encodeURIComponent(chunk)}&lang=${lang}&v=${Date.now()}_${currentIdx}`;
      const audio = new Audio(url);
      this.currentAudio = audio;

      audio.onplay = () => {
        if (this.currentSessionId !== sessionId) return;
        if (currentIdx === 0 && this.activeOnStart) {
          const cb = this.activeOnStart;
          this.activeOnStart = undefined;
          cb();
        }
      };

      audio.onended = () => {
        if (this.currentSessionId !== sessionId) return;
        currentIdx++;
        playNextAudio();
      };

      audio.onerror = (e) => {
        if (this.currentSessionId !== sessionId) return;
        console.warn(`Audio stream chunk ${currentIdx} error:`, e);
        currentIdx++;
        playNextAudio();
      };

      audio.play().catch((err) => {
        if (this.currentSessionId !== sessionId) return;
        console.warn('Audio play call issue:', err);
        currentIdx++;
        playNextAudio();
      });
    };

    playNextAudio();
  }

  stopSpeaking() {
    this.currentSessionId++; // Invalidate active session immediately
    this.isSpeakingInternal = false;

    // 1. Stop streaming HTMLAudio
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio.src = '';
      } catch (e) {
        // ignore
      }
      this.currentAudio = null;
    }

    // 2. Stop browser synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }

    if (this.activeOnEnd) {
      const cb = this.activeOnEnd;
      this.activeOnEnd = undefined;
      cb();
    }
  }

  // Audio chimes using Web Audio API
  playChime(type: 'start' | 'success' | 'timer' | 'bell') {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'start') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'success') {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C-E-G-C chord
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
        });
      } else if (type === 'timer') {
        [0, 0.25, 0.5].forEach(timeOffset => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(880, ctx.currentTime + timeOffset);
          gain.gain.setValueAtTime(0.15, ctx.currentTime + timeOffset);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + 0.3);
          osc.start(ctx.currentTime + timeOffset);
          osc.stop(ctx.currentTime + timeOffset + 0.3);
        });
      }
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  }
}

export const voiceController = new VoiceController();
