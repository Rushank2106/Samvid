import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  User,
  ShieldAlert,
  ArrowRight,
  Globe,
  ExternalLink,
  FileCheck
} from 'lucide-react';
import { ChatMessage, Language, UserEligibilityProfile } from '../../types';
import { processAssistantQuery } from '../../services/aiService';
import { voiceService } from '../../services/voiceService';
import { getTranslationDictionary, ALL_LANGUAGES } from '../../data/translations';
import { SAMVIDA_LOGO_DATA_URI } from '../../assets/samvidaLogoDataUri';

interface Props {
  language: Language;
  profile?: UserEligibilityProfile;
  onSelectScheme?: (schemeId: string) => void;
  onLanguageChange?: (lang: Language) => void;
}

export const SamvidaAssistant: React.FC<Props> = ({
  language,
  profile,
  onSelectScheme,
  onLanguageChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(language);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      sender: 'assistant',
      text:
        language === 'hi'
          ? 'नमस्ते! मैं संविदा सहायक हूँ। आप मुझसे सरकारी योजनाओं, पात्रता और आवश्यक दस्तावेज़ों के बारे में पूछ सकते हैं।'
          : language === 'mr'
          ? 'नमस्कार! मी संविदा सहाय्यक आहे. आपण मला सरकारी योजना, पात्रता आणि आवश्यक कागदपत्रांबद्दल विचारू शकता.'
          : language === 'gu'
          ? 'નમસ્તે! હું સંવિદા સહાયક છું. તમે મને સરકારી યોજનાઓ, યોગ્યતા અને દસ્તાવેજો વિશે પૂછી શકો છો.'
          : 'Welcome to Samvida Assistant! Ask me about government schemes, eligibility requirements, or required documents.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const t = getTranslationDictionary(currentLang);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync prop language updates
  useEffect(() => {
    setCurrentLang(language);
  }, [language]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [messages, isOpen]);

  const handleLangChange = (newLang: Language) => {
    setCurrentLang(newLang);
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
  };

  const handleSend = async (customQuery?: string) => {
    const query = (customQuery || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customQuery) setInput('');

    // Process query using grounded retrieval service with user profile and current language
    const { text, relatedSchemeIds } = await processAssistantQuery(query, profile, currentLang);

    const assistantMsg: ChatMessage = {
      id: `ast-${Date.now()}`,
      sender: 'assistant',
      text,
      relatedSchemeIds,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, assistantMsg]);

    // Optional TTS audio playback
    if (isSpeaking) {
      voiceService.speakText(text, currentLang);
    }
  };

  const toggleVoiceRecording = () => {
    if (isRecording) {
      voiceService.stopListening();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      let capturedTranscript = '';
      voiceService.startListening({
        language: currentLang,
        onResult: (transcript) => {
          capturedTranscript = transcript;
          setInput(transcript);
        },
        onError: (err) => {
          console.error('Voice recognition error:', err);
          setIsRecording(false);
        },
        onEnd: () => {
          setIsRecording(false);
          if (capturedTranscript.trim()) {
            handleSend(capturedTranscript.trim());
          }
        }
      });
    }
  };

  const toggleTts = () => {
    if (isSpeaking) {
      voiceService.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
    }
  };

  // Helper renderer to render text with Markdown links [Label](url) as clickable buttons
  const renderMessageContent = (text: string) => {
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

    return parts.map((part, index) => {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        const label = match[1];
        const url = match[2];
        const isDocButton = label.startsWith('Get ') || label.includes('Certificate') || label.includes('Card') || label.includes('Record');

        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg my-1 text-xs font-extrabold transition-all duration-200 shadow-sm ${
              isDocButton
                ? 'bg-amber-500 hover:bg-amber-600 text-white border border-amber-600 hover:scale-[1.02] cursor-pointer'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-[1.02] cursor-pointer'
            }`}
          >
            {isDocButton ? <FileCheck className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
            <span>{label}</span>
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button with Indian Tricolour ring accent */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white p-3.5 sm:p-4 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 border-2 border-amber-400 ring-4 ring-saffron-500/30 cursor-pointer group"
          title="Open Samvida Multilingual Assistant"
        >
          <div className="relative">
            <img src={SAMVIDA_LOGO_DATA_URI} alt="Samvida Logo" className="w-7 h-7 rounded-full object-contain bg-white p-0.5 border border-saffron-400 group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm pr-1 hidden sm:inline tracking-wide text-white">
            Samvida Assistant
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="bg-white border border-slate-300 rounded-2xl shadow-2xl w-[94vw] sm:w-[440px] h-[580px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 overscroll-contain">
          {/* Header with Ashoka Navy background & Tricolour border */}
          <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between border-b-2 border-saffron-500">
            <div className="flex items-center gap-2.5">
              <img src={SAMVIDA_LOGO_DATA_URI} alt="Samvida Logo" className="w-8 h-8 rounded-full object-contain bg-white p-0.5 border border-saffron-500 shadow" />
              <div>
                <h3 className="font-extrabold text-sm text-white leading-none">
                  Samvida Assistant
                </h3>
                <p className="text-[10px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  29-State Multilingual AI Guide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* 29-State Language Selector Dropdown */}
              <div className="relative flex items-center bg-slate-800 border border-slate-700 rounded-lg px-2 py-1">
                <Globe className="w-3.5 h-3.5 text-saffron-400 mr-1 flex-shrink-0" />
                <select
                  value={currentLang}
                  onChange={(e) => handleLangChange(e.target.value as Language)}
                  className="bg-transparent text-white text-[11px] font-bold focus:outline-none cursor-pointer pr-1"
                  title="Switch Chatbot Language"
                >
                  {ALL_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code} className="bg-slate-900 text-white text-xs">
                      {l.nativeName} ({l.name})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={toggleTts}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  isSpeaking ? 'bg-saffron-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title={isSpeaking ? 'Mute Speech' : 'Enable Speech Output'}
              >
                {isSpeaking ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Assistant Disclaimer Bar */}
          <div className="bg-amber-50 border-b border-amber-200 p-2 text-[10px] text-amber-900 flex items-center gap-1.5 font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>{t.assistant_disclaimer || 'Verified government scheme guidance. Always confirm details on official .gov.in portals.'}</span>
          </div>

          {/* Quick Intent Shortcuts */}
          <div className="bg-slate-50 border-b border-slate-200 p-2 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {[
              'I am a farmer',
              'Goa state schemes',
              'Education assistance',
              'Ayushman Bharat docs',
              'PM Vishwakarma'
            ].map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-saffron-50 hover:border-saffron-300 flex-shrink-0 transition-all font-medium cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-4 bg-slate-50/50 overscroll-contain">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-saffron-500 text-white flex items-center justify-center flex-shrink-0 text-xs shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-slate-900 text-white font-medium rounded-br-none shadow-md border border-slate-700/40'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-line">{renderMessageContent(m.text)}</div>

                  {/* Related Scheme Navigation Buttons */}
                  {m.relatedSchemeIds && m.relatedSchemeIds.length > 0 && onSelectScheme && (
                    <div className="mt-3 pt-2 border-t border-slate-200/80 space-y-1.5">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                        Direct Scheme Quick View:
                      </span>
                      {m.relatedSchemeIds.map((sid) => (
                        <button
                          key={sid}
                          onClick={() => {
                            onSelectScheme(sid);
                            setIsOpen(false);
                          }}
                          className="w-full text-left bg-slate-50 hover:bg-saffron-50 p-2 rounded-lg border border-slate-200 text-saffron-700 hover:border-saffron-400 text-xs font-extrabold flex items-center justify-between transition-all cursor-pointer shadow-2xs"
                        >
                          <span className="truncate">{sid.toUpperCase()}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-saffron-600" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="block text-[9px] opacity-70 text-right mt-1 font-mono">
                    {m.timestamp}
                  </span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Voice Input Transcribing Indicator */}
          {isRecording && (
            <div className="bg-rose-50 border-t border-rose-200 p-2 text-xs text-rose-700 font-semibold flex items-center justify-between px-4">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                Listening in {ALL_LANGUAGES.find((l) => l.code === currentLang)?.name || currentLang}... Speak query
              </span>
              <button
                onClick={toggleVoiceRecording}
                className="text-[11px] bg-rose-600 text-white px-2 py-0.5 rounded font-bold hover:bg-rose-700"
              >
                Stop
              </button>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={toggleVoiceRecording}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
                }`}
                title="Voice Assistant Microphone"
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-saffron-600" />}
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask about schemes, eligibility, docs in ${ALL_LANGUAGES.find((l) => l.code === currentLang)?.name || 'any language'}...`}
                className="flex-1 text-xs sm:text-sm py-2.5 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-500 focus:outline-none bg-slate-50/50"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                className={`p-2.5 rounded-xl text-white font-bold transition-all shadow-sm flex items-center justify-center ${
                  input.trim()
                    ? 'bg-saffron-500 hover:bg-saffron-600 cursor-pointer hover:scale-105 active:scale-95'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
