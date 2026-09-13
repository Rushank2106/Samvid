import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import { HomePage } from './pages/HomePage';
import { EligibilityWizard } from './components/eligibility/EligibilityWizard';
import { SchemeFilters } from './components/schemes/SchemeFilters';
import { SchemeCard } from './components/schemes/SchemeCard';
import { SchemeDetailsModal } from './components/schemes/SchemeDetailsModal';
import { FraudCheckerModal } from './components/schemes/FraudCheckerModal';
import { SchemeComparisonModal } from './components/schemes/SchemeComparisonModal';
import { BenefitGapAnalyzer } from './components/schemes/BenefitGapAnalyzer';
import { SamvidaAssistant } from './components/chatbot/SamvidaAssistant';
import { CitizenDashboard } from './components/dashboard/CitizenDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { MOCK_SCHEMES } from './data/mockSchemes';
import { rankSchemesForUser } from './services/eligibilityEngine';
import {
  UserEligibilityProfile,
  GovernmentLevel,
  SchemeCategory,
  Language,
  SchemeMatchResult,
  Scheme
} from './types';
import { STORAGE_KEYS } from './services/supabaseClient';
import { Columns, Sparkles } from 'lucide-react';

const DEFAULT_PROFILE: UserEligibilityProfile = {
  age_group: '26–40',
  state: 'Goa',
  district: 'North Goa',
  occupation: 'Farmer',
  employment_type: 'Informal',
  income_range: 'Below ₹1 lakh',
  family_information: {
    family_members: 4,
    has_children: true,
    has_senior_citizens: false,
    has_students: true,
    has_pwd: false,
    has_farmer: true,
    is_single_parent: false
  },
  goals: ['Agriculture', 'Financial Assistance', 'Healthcare'],
  specific_query: '',
  preferred_language: 'en'
};

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language) || 'en';
  });

  const [userProfile, setUserProfile] = useState<UserEligibilityProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_PROFILE;
  });

  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_SCHEMES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return ['pm-kisan', 'ayushman-bharat'];
  });

  // Filter States
  const [selectedGovLevel, setSelectedGovLevel] = useState<GovernmentLevel>('All');
  const [selectedCategory, setSelectedCategory] = useState<SchemeCategory>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Comparison State
  const [activeDetailsMatch, setActiveDetailsMatch] = useState<SchemeMatchResult | null>(null);
  const [comparisonSchemes, setComparisonSchemes] = useState<Scheme[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_SCHEMES, JSON.stringify(savedSchemeIds));
  }, [savedSchemeIds]);

  const handleToggleSave = (schemeId: string) => {
    if (savedSchemeIds.includes(schemeId)) {
      setSavedSchemeIds(savedSchemeIds.filter((id) => id !== schemeId));
    } else {
      setSavedSchemeIds([...savedSchemeIds, schemeId]);
    }
  };

  const handleProfileComplete = (newProfile: UserEligibilityProfile) => {
    setUserProfile(newProfile);
    setCurrentTab('schemes');
  };

  // Evaluate and rank schemes based on profile & active filters
  const evaluatedSchemes = rankSchemesForUser(MOCK_SCHEMES, userProfile);

  const filteredSchemes = evaluatedSchemes.filter(({ scheme }) => {
    // Government Level Filter
    if (selectedGovLevel !== 'All' && scheme.government_level !== selectedGovLevel) {
      return false;
    }

    // Category Filter
    if (selectedCategory !== 'All' && scheme.category !== selectedCategory) {
      return false;
    }

    // State Scope Filter
    if (selectedState !== 'All') {
      if (scheme.government_level === 'State' && scheme.state && scheme.state !== selectedState) {
        return false;
      }
    }

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const text = `${scheme.name} ${scheme.department} ${scheme.category} ${scheme.description} ${scheme.benefits.join(' ')} ${scheme.tags.join(' ')}`.toLowerCase();
      if (!text.includes(q)) return false;
    }

    return true;
  });

  const handleAddToTracker = (schemeId: string, schemeName: string, officialUrl: string) => {
    alert(`Added "${schemeName}" to your Personal Application Tracker in Dashboard.`);
    setCurrentTab('dashboard');
  };

  const handleSelectSchemeFromChat = (schemeId: string) => {
    const found = MOCK_SCHEMES.find((s) => s.id === schemeId);
    if (found) {
      const evalRes = rankSchemesForUser([found], userProfile)[0];
      setActiveDetailsMatch(evalRes);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Disclaimer Banner */}
      <DisclaimerBanner language={language} />

      {/* Main Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        language={language}
        onLanguageChange={(lang) => setLanguage(lang)}
        savedCount={savedSchemeIds.length}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* PAGE 1: HOME LANDING */}
        {currentTab === 'home' && (
          <HomePage
            onStartEligibility={() => setCurrentTab('eligibility')}
            onExploreSchemes={(cat) => {
              if (cat) setSelectedCategory(cat);
              setCurrentTab('schemes');
            }}
            onVerifyGenuine={() => setCurrentTab('fraud-check')}
            language={language}
          />
        )}

        {/* PAGE 2: ELIGIBILITY PROFILE WIZARD */}
        {currentTab === 'eligibility' && (
          <div className="py-4">
            <EligibilityWizard
              initialProfile={userProfile}
              onComplete={handleProfileComplete}
              language={language}
            />
          </div>
        )}

        {/* PAGE 3: SCHEMES CATALOG & DISCOVERY */}
        {currentTab === 'schemes' && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-saffron-600" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-saffron-700">
                    Personalized Discovery Engine
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Government Schemes You May Qualification For
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Evaluated against your active profile: <strong>{userProfile.occupation}</strong> in <strong>{userProfile.state}</strong> ({userProfile.income_range}).
                </p>
              </div>

              {/* Compare Button */}
              {filteredSchemes.length >= 2 && (
                <button
                  onClick={() => {
                    setComparisonSchemes(filteredSchemes.slice(0, 3).map((f) => f.scheme));
                    setShowComparison(true);
                  }}
                  className="bg-white border border-slate-300 hover:border-saffron-400 text-slate-800 font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Columns className="w-4 h-4 text-saffron-600" />
                  <span>Compare Top Schemes</span>
                </button>
              )}
            </div>

            {/* Benefit Gap Analyzer Feature Section */}
            <BenefitGapAnalyzer
              profile={userProfile}
              onExploreCategory={(cat) => setSelectedCategory(cat)}
            />

            {/* Scheme Filters Component */}
            <SchemeFilters
              selectedGovLevel={selectedGovLevel}
              onSelectGovLevel={(lvl) => setSelectedGovLevel(lvl)}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
              selectedState={selectedState}
              onSelectState={(st) => setSelectedState(st)}
              searchQuery={searchQuery}
              onSearchChange={(q) => setSearchQuery(q)}
              language={language}
            />

            {/* Scheme Cards Grid */}
            {filteredSchemes.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
                <p className="font-extrabold text-slate-900 text-base">
                  No matching schemes found based on current filters.
                </p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try adjusting your filter criteria or modifying your citizen profile information.
                </p>
                <button
                  onClick={() => {
                    setSelectedGovLevel('All');
                    setSelectedCategory('All');
                    setSelectedState('All');
                    setSearchQuery('');
                  }}
                  className="px-5 py-2.5 bg-saffron-500 hover:bg-saffron-600 text-white text-xs font-extrabold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSchemes.map((result) => (
                  <SchemeCard
                    key={result.scheme.id}
                    matchResult={result}
                    onViewDetails={(res) => setActiveDetailsMatch(res)}
                    onToggleSave={(id) => handleToggleSave(id)}
                    isSaved={savedSchemeIds.includes(result.scheme.id)}
                    language={language}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* PAGE 4: HOW IT WORKS */}
        {currentTab === 'how-it-works' && (
          <div className="py-4">
            <HomePage
              onStartEligibility={() => setCurrentTab('eligibility')}
              onExploreSchemes={() => setCurrentTab('schemes')}
              onVerifyGenuine={() => setCurrentTab('fraud-check')}
              language={language}
            />
          </div>
        )}

        {/* PAGE 5: FRAUD CHECK */}
        {currentTab === 'fraud-check' && (
          <div className="py-4">
            <FraudCheckerModal />
          </div>
        )}

        {/* PAGE 6: CITIZEN DASHBOARD */}
        {currentTab === 'dashboard' && (
          <CitizenDashboard
            profile={userProfile}
            savedSchemeIds={savedSchemeIds}
            onRemoveSaved={(id) => handleToggleSave(id)}
            onViewSchemeDetails={(id) => {
              const match = evaluatedSchemes.find((m) => m.scheme.id === id);
              if (match) setActiveDetailsMatch(match);
            }}
            onUpdateProfile={() => setCurrentTab('eligibility')}
            language={language}
          />
        )}

        {/* PAGE 7: ADMIN DASHBOARD */}
        {currentTab === 'admin' && (
          <div className="py-4">
            <AdminDashboard />
          </div>
        )}
      </main>

      {/* Scheme Details Modal */}
      {activeDetailsMatch && (
        <SchemeDetailsModal
          matchResult={activeDetailsMatch}
          onClose={() => setActiveDetailsMatch(null)}
          onToggleSave={(id) => handleToggleSave(id)}
          isSaved={savedSchemeIds.includes(activeDetailsMatch.scheme.id)}
          onAddToTracker={handleAddToTracker}
          language={language}
        />
      )}

      {/* Scheme Comparison Modal */}
      {showComparison && (
        <SchemeComparisonModal
          schemes={comparisonSchemes}
          onClose={() => setShowComparison(false)}
        />
      )}

      {/* Floating Chatbot Assistant */}
      <SamvidaAssistant
        language={language}
        profile={userProfile}
        onSelectScheme={handleSelectSchemeFromChat}
        onLanguageChange={(lang) => setLanguage(lang)}
      />

      {/* Main Footer */}
      <Footer language={language} onSelectTab={(t) => setCurrentTab(t)} />
    </div>
  );
}

export default App;
