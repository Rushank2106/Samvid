import React from 'react';
import {
  Building2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Bookmark,
  Calendar,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { SchemeMatchResult, Language } from '../../types';
import { getTranslationDictionary } from '../../data/translations';

interface Props {
  matchResult: SchemeMatchResult;
  onViewDetails: (scheme: SchemeMatchResult) => void;
  onToggleSave: (schemeId: string) => void;
  isSaved: boolean;
  language: Language;
}

export const SchemeCard: React.FC<Props> = ({
  matchResult,
  onViewDetails,
  onToggleSave,
  isSaved,
  language
}) => {
  const { scheme, matchStatus, relevanceLabel, reasons, missingCriteria } = matchResult;
  const t = getTranslationDictionary(language);

  const title =
    language === 'hi' && scheme.title_hi
      ? scheme.title_hi
      : language === 'mr' && scheme.title_mr
      ? scheme.title_mr
      : language === 'gu' && scheme.title_gu
      ? scheme.title_gu
      : scheme.name;

  const desc =
    language === 'hi' && scheme.description_hi
      ? scheme.description_hi
      : language === 'mr' && scheme.description_mr
      ? scheme.description_mr
      : language === 'gu' && scheme.description_gu
      ? scheme.description_gu
      : scheme.description;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group hover:border-saffron-300">
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                scheme.government_level === 'Central'
                  ? 'bg-saffron-100 text-saffron-900 border border-saffron-200'
                  : 'bg-indiagreen-100 text-indiagreen-900 border border-indiagreen-200'
              }`}
            >
              {scheme.government_level} Government
            </span>

            {scheme.state && (
              <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
                {scheme.state}
              </span>
            )}

            <span className="bg-slate-50 text-slate-600 text-[11px] font-semibold px-2 py-0.5 rounded border border-slate-200">
              {scheme.category}
            </span>
          </div>

          <button
            onClick={() => onToggleSave(scheme.id)}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              isSaved
                ? 'bg-saffron-50 text-saffron-700 font-bold border border-saffron-200 shadow-2xs'
                : 'text-slate-400 hover:text-saffron-600 hover:bg-saffron-50'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save scheme'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-saffron-600' : ''}`} />
          </button>
        </div>

        {/* Scheme Title & Dept */}
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug mb-1 group-hover:text-saffron-600 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-3 font-medium">
          <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span>{scheme.department}</span>
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed font-normal">
          {desc}
        </p>

        {/* Relevance & Match Status Banner */}
        <div className="mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
              {relevanceLabel}
            </span>
            <span
              className={`text-[11px] font-extrabold px-2 py-0.5 rounded ${
                matchStatus === 'Likely Eligible'
                  ? 'bg-indiagreen-100 text-indiagreen-900 border border-indiagreen-300'
                  : matchStatus === 'Potentially Eligible'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {matchStatus}
            </span>
          </div>

          {/* Reasoning Bullet Points */}
          <ul className="space-y-1 text-[11px] text-slate-600">
            {reasons.slice(0, 2).map((reason, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indiagreen-600 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{reason}</span>
              </li>
            ))}
            {missingCriteria.length > 0 && (
              <li className="flex items-start gap-1.5 text-amber-800">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{missingCriteria[0]}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Footer Info & Action Buttons */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <FileText className="w-3.5 h-3.5 text-saffron-600" />
            <span>{scheme.required_documents.length} Documents Needed</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>Verified: {scheme.last_verified_at}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(matchResult)}
            className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-extrabold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center"
          >
            Explore Scheme
          </button>

          <a
            href={scheme.official_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 bg-saffron-500 hover:bg-saffron-600 text-white rounded-xl text-xs font-extrabold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1 shadow-sm text-center"
          >
            <span>Apply Official</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
