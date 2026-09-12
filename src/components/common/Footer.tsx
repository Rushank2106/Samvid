import React from 'react';
import { ShieldCheck, ExternalLink, Lock, CheckCircle2, Server } from 'lucide-react';
import { getTranslationDictionary } from '../../data/translations';
import { Language } from '../../types';
import { SAMVIDA_LOGO_DATA_URI } from '../../assets/samvidaLogoDataUri';

interface FooterProps {
  language: Language;
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onSelectTab }) => {
  const t = getTranslationDictionary(language);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <img src={SAMVIDA_LOGO_DATA_URI} alt="Samvida Logo" className="w-8 h-8 rounded-full object-contain bg-white p-0.5 border border-saffron-500 shadow-sm" />
              <span className="text-xl font-extrabold tracking-tight">{t.brand_name}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer_text}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500">
              <Server className="w-3.5 h-3.5 text-jan-400" />
              <span>Targeted Deployment: Kesug Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-sm">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider text-slate-400">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onSelectTab('home')} className="hover:text-white transition-colors">
                  {t.nav_home}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('eligibility')} className="hover:text-white transition-colors">
                  {t.nav_check_eligibility}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('schemes')} className="hover:text-white transition-colors">
                  {t.nav_schemes}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('how-it-works')} className="hover:text-white transition-colors">
                  {t.nav_how_it_works}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('fraud-check')} className="hover:text-white transition-colors">
                  Verify Scheme Genuine
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Privacy */}
          <div className="space-y-2 text-sm">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider text-slate-400">
              Privacy & Trust
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Sensitive ID Storage</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Deterministic Eligibility Rules</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-jan-400" />
                <span>Verified .gov.in Redirection</span>
              </li>
            </ul>
          </div>

          {/* Technology Track */}
          <div className="space-y-2 text-sm">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider text-slate-400">
              Hackathon Track
            </h4>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60 text-xs">
              <p className="font-semibold text-jan-300 mb-1">
                JAN JEEVAN Track
              </p>
              <p className="text-[11px] text-slate-400 leading-tight">
                Technology for Everyday Life & Real-World Indian Challenges.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="border-t border-slate-800 pt-6 mt-6">
          <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <p className="font-semibold text-amber-400 mb-1">
              Independent Platform Disclaimer:
            </p>
            <p>{t.footer_disclaimer}</p>
          </div>
          <div className="mt-6 text-center text-[11px] text-slate-500 flex flex-wrap justify-between items-center gap-2">
            <span>© {new Date().getFullYear()} Samvida — Independent Citizen Assistance Layer.</span>
            <span>Built with React, TypeScript, Tailwind CSS, & Supabase.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
