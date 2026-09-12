import React from 'react';
import {
  UserCheck,
  Search,
  Sparkles,
  ShieldCheck,
  FileCheck,
  ExternalLink,
  ArrowRight,
  AlertTriangle,
  GraduationCap,
  Briefcase,
  Tractor,
  HeartHandshake,
  UserCheck as SeniorIcon,
  Activity,
  Compass
} from 'lucide-react';
import { MOCK_LIFE_EVENTS } from '../data/mockLifeEvents';
import { getTranslationDictionary } from '../data/translations';
import { Language, SchemeCategory } from '../types';
import { SAMVIDA_LOGO_DATA_URI } from '../assets/samvidaLogoDataUri';

interface Props {
  onStartEligibility: () => void;
  onExploreSchemes: (category?: SchemeCategory) => void;
  onVerifyGenuine: () => void;
  language: Language;
}

export const HomePage: React.FC<Props> = ({
  onStartEligibility,
  onExploreSchemes,
  onVerifyGenuine,
  language
}) => {
  const t = getTranslationDictionary(language);

  const getLifeEventIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-saffron-600" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-saffron-600" />;
      case 'Tractor':
        return <Tractor className="w-6 h-6 text-saffron-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-saffron-600" />;
      case 'UserCheck':
        return <SeniorIcon className="w-6 h-6 text-saffron-600" />;
      case 'Activity':
      default:
        return <Activity className="w-6 h-6 text-saffron-600" />;
    }
  };

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION WITH TRICOLOUR ACCENT */}
      <section className="relative bg-gradient-to-b from-navy-950 via-slate-900 to-slate-900 text-white rounded-3xl p-8 sm:p-14 overflow-hidden border border-slate-800 shadow-xl border-t-4 border-t-saffron-500">
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2.5 bg-slate-900/90 border border-saffron-500/60 px-4 py-1.5 rounded-full text-xs font-bold text-saffron-300 backdrop-blur-md">
            <img src={SAMVIDA_LOGO_DATA_URI} alt="Samvida Logo" className="w-5 h-5 rounded-full object-contain bg-white p-0.5 border border-saffron-400" />
            <span>SAMVIDA Track — AI Multilingual Citizen Navigator</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {t.hero_title || 'Find the government benefits that may be relevant to you.'}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
            {t.hero_subtitle || 'Discover central and state government schemes based on your profile.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onStartEligibility}
              className="bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold px-8 py-4 rounded-xl text-sm sm:text-base shadow-lg hover:shadow-saffron-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-5 h-5" />
              <span>{t.cta_check_eligibility || 'Check My Eligibility'}</span>
            </button>

            <button
              onClick={() => onExploreSchemes()}
              className="bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-extrabold px-7 py-4 rounded-xl text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-5 h-5 text-saffron-400" />
              <span>{t.cta_explore_schemes || 'Explore Schemes'}</span>
            </button>
          </div>
        </div>

        {/* Visual Workflow Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 relative z-10">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">
            Citizen Journey Workflow:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs font-medium text-slate-300">
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <span className="block font-bold text-saffron-300">1. {t.workflow_step1 || 'Your Profile'}</span>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <span className="block font-bold text-saffron-300">2. {t.workflow_step2 || 'AI Analysis'}</span>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <span className="block font-bold text-saffron-300">3. {t.workflow_step3 || 'Eligibility Check'}</span>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <span className="block font-bold text-saffron-300">4. {t.workflow_step4 || 'Relevant Schemes'}</span>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <span className="block font-bold text-saffron-300">5. {t.workflow_step5 || 'Document Prep'}</span>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <span className="block font-bold text-indiagreen-400">6. {t.workflow_step6 || 'Official Apply'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM STATEMENT SECTION */}
      <section className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm border-l-4 border-l-saffron-500">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-200">
            Real-World Challenge
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.problem_title || 'The Challenge in Indian Citizen Navigation'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.problem_text || 'India has thousands of government welfare schemes, but citizens may struggle to identify which ones apply to their circumstances.'}
          </p>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.how_it_works_title || 'How Samvida Works'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Samvida acts as an intelligent citizen-assistance and benefit-navigation layer without replacing government portals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: t.step1_title || '1. Tell us about yourself', desc: t.step1_desc || 'Fill out a quick profile.', icon: <UserCheck className="w-6 h-6 text-saffron-600" /> },
            { title: t.step2_title || '2. Engine Analysis', desc: t.step2_desc || 'Rule-based evaluation.', icon: <ShieldCheck className="w-6 h-6 text-saffron-600" /> },
            { title: t.step3_title || '3. Discover Schemes', desc: t.step3_desc || 'Personalized benefits.', icon: <Search className="w-6 h-6 text-saffron-600" /> },
            { title: t.step4_title || '4. Simple Explanation', desc: t.step4_desc || 'Easy summaries.', icon: <Sparkles className="w-6 h-6 text-saffron-600" /> },
            { title: t.step5_title || '5. Document Readiness', desc: t.step5_desc || 'Check missing docs.', icon: <FileCheck className="w-6 h-6 text-saffron-600" /> },
            { title: t.step6_title || '6. Direct Application', desc: t.step6_desc || 'Official .gov.in links.', icon: <ExternalLink className="w-6 h-6 text-indiagreen-600" /> }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-saffron-300 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-saffron-50 flex items-center justify-center border border-saffron-100">
                {item.icon}
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LIFE-EVENT BASED DISCOVERY */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Compass className="w-6 h-6 text-saffron-600" />
              <span>Life-Event Based Discovery</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Browse government welfare schemes tailored to your specific life stage or milestone.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_LIFE_EVENTS.map((event) => (
            <div
              key={event.id}
              onClick={() => onExploreSchemes(event.category)}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-saffron-400 hover:shadow-md transition-all cursor-pointer space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-saffron-50 flex items-center justify-center border border-saffron-100">
                  {getLifeEventIcon(event.icon)}
                </div>
                <span className="text-[10px] font-extrabold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                  {event.category}
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-saffron-600 transition-colors">
                {language === 'hi' ? event.title_hi : event.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>

              <div className="pt-2 flex items-center gap-1 text-xs font-extrabold text-saffron-600 group-hover:translate-x-1 transition-transform">
                <span>Explore Life Event Schemes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. VERIFIED FRAUD PROTECTION BANNER */}
      <section className="bg-gradient-to-r from-navy-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-md border-b-4 border-b-indiagreen-500">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
              Citizen Scam Protection
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Unsure if a scheme or SMS is genuine?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Verify official source links and check against fake government scheme notifications.
          </p>
        </div>

        <button
          onClick={onVerifyGenuine}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm cursor-pointer"
        >
          Check Genuine Status
        </button>
      </section>
    </div>
  );
};
