import { Language } from '../types';

export interface VoiceRecognitionOptions {
  language: Language;
  onResult: (transcript: string) => void;
  onError: (error: string) => void;
  onEnd: () => void;
}

export class VoiceAssistantService {
  private recognition: any = null;
  private isListening: boolean = false;

  constructor() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
    }
  }

  public isSupported(): boolean {
    return !!this.recognition;
  }

  private getLangCode(lang: Language): string {
    const map: Record<string, string> = {
      hi: 'hi-IN',
      mr: 'mr-IN',
      gu: 'gu-IN',
      bn: 'bn-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      pa: 'pa-IN',
      or: 'or-IN',
      as: 'as-IN',
      ur: 'ur-IN',
      ks: 'ks-IN',
      sd: 'sd-IN',
      kok: 'kok-IN',
      mni: 'mni-IN',
      ne: 'ne-NP',
      doi: 'doi-IN',
      brx: 'brx-IN',
      sat: 'sat-IN',
      mai: 'mai-IN',
      sa: 'sa-IN',
      en: 'en-IN'
    };
    return map[lang] || 'en-IN';
  }

  public startListening(options: VoiceRecognitionOptions): void {
    if (!this.recognition) {
      options.onError('Speech recognition is not supported in this browser environment.');
      return;
    }

    if (this.isListening) {
      this.stopListening();
    }

    this.recognition.lang = this.getLangCode(options.language);

    this.recognition.onresult = (event: any) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      if (currentTranscript.trim()) {
        options.onResult(currentTranscript.trim());
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      options.onError(event.error || 'Voice input error occurred.');
    };

    this.recognition.onend = () => {
      this.isListening = false;
      options.onEnd();
    };

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (err) {
      this.isListening = false;
      options.onError('Could not start microphone.');
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore stop error
      }
      this.isListening = false;
    }
  }

  public speakText(text: string, lang: Language = 'en'): void {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop ongoing speech

    // Clean markdown text for TTS
    const cleanText = text.replace(/[*#_`\[\]()]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = this.getLangCode(lang);
    utterance.rate = 0.95;

    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const voiceService = new VoiceAssistantService();
