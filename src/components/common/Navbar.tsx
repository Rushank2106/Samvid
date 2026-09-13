import React from 'react';
import { ShieldCheck, Globe, UserCheck, Search, HelpCircle, ShieldAlert, LayoutDashboard } from 'lucide-react';
import { getTranslationDictionary, ALL_LANGUAGES } from '../../data/translations';
import { Language } from '../../types';
import { SAMVIDA_LOGO_DATA_URI } from '../../assets/samvidaLogoDataUri';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onLanguageChange,
  savedCount
}) => {
  const t = getTranslationDictionary(language);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand Name with Tricolour Accent */}
          <div
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
            onClick={() => onSelectTab('home')}
          >
            <div className="w-10 h-10 rounded-full shadow-md bg-white border-2 border-saffron-500 flex items-center justify-center p-1 overflow-hidden group-hover:scale-105 transition-all flex-shrink-0">
              <img
                src={SAMVIDA_LOGO_DATA_URI}
                alt="Samvida Logo"
                className="w-full h-full max-w-[85%] max-h-[85%] object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-saffron-600 transition-colors">
                  {t.brand_name || 'Samvida'}
                </span>
                <span className="bg-saffron-50 text-saffron-700 text-[10px] font-extrabold px-2 py-0.5 rounded border border-saffron-200 uppercase tracking-wider hidden sm:inline-block">
                  Citizen Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                {t.short_tagline || 'Discover. Understand. Apply.'}
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => onSelectTab('home')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                currentTab === 'home'
                  ? 'bg-saffron-50 text-saffron-700 border border-saffron-200 shadow-2xs'
                  : 'text-slate-700 hover:text-saffron-600 hover:bg-slate-50'
              }`}
            >
              {t.nav_home}
            </button>

            <button
              onClick={() => onSelectTab('eligibility')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                currentTab === 'eligibility'
                  ? 'bg-saffron-50 text-saffron-700 border border-saffron-200 shadow-2xs'
                  : 'text-slate-700 hover:text-saffron-600 hover:bg-slate-50'
              }`}
            >
              <UserCheck className="w-4 h-4 text-saffron-600" />
              {t.nav_check_eligibility}
            </button>

            <button
              onClick={() => onSelectTab('schemes')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                currentTab === 'schemes'
                  ? 'bg-saffron-50 text-saffron-700 border border-saffron-200 shadow-2xs'
                  : 'text-slate-700 hover:text-saffron-600 hover:bg-slate-50'
              }`}
            >
              <Search className="w-4 h-4 text-slate-500" />
              {t.nav_schemes}
            </button>

            <button
              onClick={() => onSelectTab('how-it-works')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                currentTab === 'how-it-works'
                  ? 'bg-saffron-50 text-saffron-700 border border-saffron-200 shadow-2xs'
                  : 'text-slate-700 hover:text-saffron-600 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-slate-500" />
              {t.nav_how_it_works}
            </button>

            <button
              onClick={() => onSelectTab('fraud-check')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                currentTab === 'fraud-check'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs font-bold'
                  : 'text-slate-700 hover:text-amber-800 hover:bg-amber-50'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Verify Genuine
            </button>
          </nav>

          {/* Right Controls: 29-State Language Dropdown & Dashboard */}
          <div className="flex items-center gap-2.5">
            {/* 29-State Language Selector */}
            <div className="relative flex items-center gap-1 bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 shadow-2xs hover:border-saffron-400 transition-all">
              <Globe className="w-4 h-4 text-saffron-600 flex-shrink-0" />
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent font-bold focus:outline-none cursor-pointer text-xs text-slate-800 pr-1 max-w-[140px] sm:max-w-[180px] truncate"
                title="Select official language for any of 29 Indian States"
              >
                {ALL_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} className="text-slate-900 font-medium">
                    {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Dashboard Button */}
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-extrabold flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-sm ${
                currentTab === 'dashboard'
                  ? 'bg-saffron-500 text-white ring-2 ring-saffron-400 shadow-md'
                  : 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav_dashboard}</span>
              {savedCount > 0 && (
                <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow-2xs">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden items-center justify-around border-t border-slate-200/80 py-2.5 text-xs font-extrabold text-slate-700">
          <button
            onClick={() => onSelectTab('home')}
            className={`px-2 py-1 rounded cursor-pointer ${currentTab === 'home' ? 'text-saffron-600 font-extrabold bg-saffron-50' : 'hover:text-slate-900'}`}
          >
            Home
          </button>
          <button
            onClick={() => onSelectTab('eligibility')}
            className={`px-2 py-1 rounded cursor-pointer ${currentTab === 'eligibility' ? 'text-saffron-600 font-extrabold bg-saffron-50' : 'hover:text-slate-900'}`}
          >
            Check Profile
          </button>
          <button
            onClick={() => onSelectTab('schemes')}
            className={`px-2 py-1 rounded cursor-pointer ${currentTab === 'schemes' ? 'text-saffron-600 font-extrabold bg-saffron-50' : 'hover:text-slate-900'}`}
          >
            Schemes
          </button>
          <button
            onClick={() => onSelectTab('fraud-check')}
            className={`px-2 py-1 rounded cursor-pointer ${currentTab === 'fraud-check' ? 'text-amber-800 font-extrabold bg-amber-50' : 'hover:text-slate-900'}`}
          >
            Verify Genuine
          </button>
        </div>
      </div>
    </header>
  );
};
