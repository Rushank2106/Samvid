import React from 'react';
import { Search, Filter, MapPin, Building2, SlidersHorizontal, Sparkles } from 'lucide-react';
import { GovernmentLevel, SchemeCategory, Language } from '../../types';
import { INDIAN_STATES, getTranslationDictionary } from '../../data/translations';

interface Props {
  selectedGovLevel: GovernmentLevel;
  onSelectGovLevel: (level: GovernmentLevel) => void;
  selectedCategory: SchemeCategory;
  onSelectCategory: (cat: SchemeCategory) => void;
  selectedState: string;
  onSelectState: (state: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  language: Language;
}

export const SchemeFilters: React.FC<Props> = ({
  selectedGovLevel,
  onSelectGovLevel,
  selectedCategory,
  onSelectCategory,
  selectedState,
  onSelectState,
  searchQuery,
  onSearchChange,
  language
}) => {
  const t = getTranslationDictionary(language);

  const categories: SchemeCategory[] = [
    'All',
    'Education',
    'Healthcare',
    'Agriculture',
    'Housing',
    'Employment',
    'Financial Assistance',
    'Pension',
    'Business',
    'Women and Child Welfare',
    'Disability',
    'Skill Development',
    'Insurance',
    'Other'
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5 mb-8">
      {/* Natural Language Search Input */}
      <div>
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-saffron-600" />
          Natural Language Benefit Search
        </label>
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.search_placeholder}
            className="w-full text-xs sm:text-sm pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-500 focus:outline-none bg-slate-50/50 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-200 px-2 py-0.5 rounded cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
        {/* Government Level */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-saffron-600" />
            {t.filter_gov_level}
          </label>
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            {(['All', 'Central', 'State'] as GovernmentLevel[]).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => onSelectGovLevel(level)}
                className={`flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-all text-center cursor-pointer ${
                  selectedGovLevel === level
                    ? 'bg-saffron-50 text-saffron-800 border border-saffron-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {level === 'All' ? t.filter_all : level === 'Central' ? 'Central' : 'State'}
              </button>
            ))}
          </div>
        </div>

        {/* State Selection Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-saffron-600" />
            {t.filter_state} Scope
          </label>
          <select
            value={selectedState}
            onChange={(e) => onSelectState(e.target.value)}
            className="w-full text-xs font-bold border border-slate-300 rounded-xl p-2.5 bg-white focus:ring-2 focus:ring-saffron-500 focus:outline-none"
          >
            <option value="All">All States & UTs</option>
            {INDIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Category Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-saffron-600" />
            {t.filter_category}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value as SchemeCategory)}
            className="w-full text-xs font-bold border border-slate-300 rounded-xl p-2.5 bg-white focus:ring-2 focus:ring-saffron-500 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Category Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 no-scrollbar text-xs">
        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1 pr-2 flex-shrink-0">
          <Filter className="w-3 h-3" /> Quick:
        </span>
        {['All', 'Agriculture', 'Healthcare', 'Education', 'Housing', 'Pension', 'Women and Child Welfare'].map((c) => (
          <button
            key={c}
            onClick={() => onSelectCategory(c as SchemeCategory)}
            className={`px-3 py-1 rounded-full text-xs font-extrabold flex-shrink-0 transition-all cursor-pointer ${
              selectedCategory === c
                ? 'bg-saffron-500 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};
