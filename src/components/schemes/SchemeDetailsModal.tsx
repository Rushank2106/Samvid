import React, { useState, useEffect } from 'react';
import {
  X,
  Building2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  HelpCircle,
  Calendar,
  Bookmark,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  Info,
  FileCheck
} from 'lucide-react';
import { SchemeMatchResult, Language, RequiredDocument } from '../../types';
import { explainSchemeInSimpleLanguage } from '../../services/aiService';
import { getDocumentSourceInfo } from '../../data/documentSources';
import { getTranslationDictionary } from '../../data/translations';

interface Props {
  matchResult: SchemeMatchResult | null;
  onClose: () => void;
  onToggleSave: (schemeId: string) => void;
  isSaved: boolean;
  onAddToTracker: (schemeId: string, schemeName: string, officialUrl: string) => void;
  language: Language;
}

export const SchemeDetailsModal: React.FC<Props> = ({
  matchResult,
  onClose,
  onToggleSave,
  isSaved,
  onAddToTracker,
  language
}) => {
  if (!matchResult) return null;

  const { scheme, matchStatus, reasons, criteria, missingCriteria } = matchResult;
  const t = getTranslationDictionary(language);

  // Disable background scrolling when modal is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Track owned documents locally for readiness calculation
  const [ownedDocs, setOwnedDocs] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    scheme.required_documents.forEach((doc, idx) => {
      // Default first 2 docs to true for demo readiness demonstration
      initial[doc.id] = idx < 2;
    });
    return initial;
  });

  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'readiness' | 'action-plan'>('overview');
  const [selectedMissingDoc, setSelectedMissingDoc] = useState<RequiredDocument | null>(null);

  const totalDocs = scheme.required_documents.length;
  const ownedCount = Object.values(ownedDocs).filter(Boolean).length;
  const readinessPercent = totalDocs > 0 ? Math.round((ownedCount / totalDocs) * 100) : 100;
  const missingCount = totalDocs - ownedCount;

  const toggleDocOwned = (docId: string) => {
    setOwnedDocs((prev) => ({ ...prev, [docId]: !prev[docId] }));
  };

  const handleExplainAI = async () => {
    setLoadingAi(true);
    const exp = await explainSchemeInSimpleLanguage(scheme, language);
    setAiExplanation(exp);
    setLoadingAi(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between gap-4 border-b border-slate-800">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  scheme.government_level === 'Central'
                    ? 'bg-jan-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                {scheme.government_level} Government
              </span>
              {scheme.state && (
                <span className="bg-slate-800 text-slate-300 text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-slate-700">
                  {scheme.state}
                </span>
              )}
              <span className="bg-slate-800 text-slate-300 text-[11px] font-medium px-2 py-0.5 rounded border border-slate-700">
                {scheme.category}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              {scheme.name}
            </h2>
            <p className="text-xs text-slate-300 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-jan-400" />
              <span>{scheme.department}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Controls */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-4 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-jan-600 text-jan-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview & Eligibility
          </button>
          <button
            onClick={() => setActiveTab('readiness')}
            className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'readiness'
                ? 'border-jan-600 text-jan-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Document Readiness ({readinessPercent}%)
          </button>
          <button
            onClick={() => setActiveTab('action-plan')}
            className={`pb-3 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'action-plan'
                ? 'border-jan-600 text-jan-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            Your Action Plan
          </button>
        </div>

        {/* Modal Body Scroll Container */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-xs sm:text-sm">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  What is this scheme?
                </h3>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {scheme.description}
                </p>
              </div>

              {/* Key Benefits */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Key Benefits & Support
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {scheme.benefits.map((b, i) => (
                    <div
                      key={i}
                      className="bg-emerald-50/70 border border-emerald-200/80 p-3 rounded-xl flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-800 font-medium text-xs leading-snug">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Explainer Section */}
              <div className="bg-jan-50/70 border border-jan-200 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-jan-600" />
                    <span className="font-bold text-jan-900 text-xs sm:text-sm">
                      AI Scheme Explainer (Simple Citizen Language)
                    </span>
                  </div>
                  {!aiExplanation && (
                    <button
                      onClick={handleExplainAI}
                      disabled={loadingAi}
                      className="bg-jan-700 hover:bg-jan-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-colors"
                    >
                      {loadingAi ? 'Generating...' : 'Explain This Scheme'}
                    </button>
                  )}
                </div>

                {aiExplanation && (
                  <div className="bg-white p-4 rounded-lg border border-jan-200 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed shadow-inner">
                    {aiExplanation}
                  </div>
                )}
              </div>

              {/* Eligibility Breakdown */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Personalized Eligibility Breakdown
                </h3>
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Status Estimate:</span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                        matchStatus === 'Likely Eligible'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {matchStatus}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-600">Satisfied Criteria:</p>
                    {reasons.map((r, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>

                  {missingCriteria.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-amber-900">
                      <p className="text-xs font-semibold text-amber-800">Unmet or Additional Criteria:</p>
                      {missingCriteria.map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-amber-800">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="bg-slate-100 p-2.5 rounded-lg text-[11px] text-slate-500 flex items-center gap-1.5 italic">
                    <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>
                      Eligibility shown here is an informational estimate. Final eligibility is determined by the relevant government authority.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCUMENT READINESS CHECKER */}
          {activeTab === 'readiness' && (
            <div className="space-y-6">
              {/* Score Header */}
              <div className="bg-slate-900 text-white p-5 rounded-xl flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Application Readiness Score
                  </h4>
                  <p className="text-2xl font-extrabold text-white">{readinessPercent}% Ready</p>
                  <p className="text-xs text-slate-300 mt-1">
                    {missingCount > 0
                      ? `You may need ${missingCount} additional document(s) before applying.`
                      : 'You indicate having all required documents!'}
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-jan-500 flex items-center justify-center font-bold text-lg text-white">
                  {readinessPercent}%
                </div>
              </div>

              {/* Interactive Document Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Check the documents you already possess:
                </h4>
                <div className="space-y-3">
                  {scheme.required_documents.map((doc) => {
                    const isOwned = !!ownedDocs[doc.id];
                    return (
                      <div
                        key={doc.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isOwned
                            ? 'bg-emerald-50/50 border-emerald-300'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isOwned}
                              onChange={() => toggleDocOwned(doc.id)}
                              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 mt-1"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 text-xs sm:text-sm">
                                  {doc.document_name}
                                </span>
                                {doc.mandatory ? (
                                  <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                    Mandatory
                                  </span>
                                ) : (
                                  <span className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded">
                                    Optional
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-600 mt-1">{doc.description}</p>
                              <p className="text-[11px] text-slate-400 mt-1">
                                Issuing Authority: {doc.issuing_authority || 'Competent State Authority'}
                              </p>
                            </div>
                          </label>

                          {!isOwned && (
                            <button
                              onClick={() => setSelectedMissingDoc(doc)}
                              className="bg-jan-50 hover:bg-jan-100 text-jan-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-jan-200 flex-shrink-0 transition-colors"
                            >
                              How to Obtain
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Document Preparation Guide Modal / Sub-section */}
              {selectedMissingDoc && (() => {
                const docSrc = getDocumentSourceInfo(selectedMissingDoc.document_name);
                return (
                  <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <h5 className="font-extrabold text-amber-900 text-xs sm:text-sm flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-amber-600" />
                        Official Document Guide: {selectedMissingDoc.document_name}
                      </h5>
                      <button
                        onClick={() => setSelectedMissingDoc(null)}
                        className="text-xs text-amber-800 hover:text-amber-950 underline font-bold cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                    <p className="text-xs text-amber-950 leading-relaxed">
                      <strong>Method to Obtain:</strong> {docSrc.how_to_obtain}
                    </p>
                    <p className="text-[11px] text-amber-900">
                      <strong>Issuing Authority:</strong> {docSrc.issuing_authority} ({docSrc.official_source_name})
                    </p>
                    <div className="pt-1">
                      <a
                        href={docSrc.official_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs px-4 py-2 rounded-lg shadow-sm hover:scale-[1.02] transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>{docSrc.button_label}</span>
                      </a>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 3: ACTION PLAN */}
          {activeTab === 'action-plan' && (
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Personalized Application Action Plan
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: '1. Review Scheme Eligibility',
                    desc: 'Confirm your profile parameters match the age, income, and state requirements.'
                  },
                  {
                    step: 2,
                    title: '2. Gather Required Documents',
                    desc: `Ensure you possess: ${scheme.required_documents.map((d) => d.document_name).join(', ')}.`
                  },
                  {
                    step: 3,
                    title: '3. Visit Official Application Portal',
                    desc: `Navigate to verified official portal: ${scheme.official_url}`
                  },
                  {
                    step: 4,
                    title: '4. Fill Application & Submit e-KYC',
                    desc: 'Input Aadhaar and bank details directly on the government portal.'
                  },
                  {
                    step: 5,
                    title: '5. Track Status & Keep Acknowledgement',
                    desc: 'Save application reference ID to track status on official government portal.'
                  }
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="w-7 h-7 rounded-full bg-jan-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{s.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Source Verification Box */}
          <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                Information source: <strong>{scheme.source_name}</strong> ({scheme.source_type})
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>Last Verified: {scheme.last_verified_at}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(scheme.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold border flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                isSaved
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : 'text-slate-700'}`} />
              <span>{isSaved ? 'Saved' : 'Save Scheme'}</span>
            </button>

            <button
              onClick={() => {
                onAddToTracker(scheme.id, scheme.name, scheme.official_url);
              }}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-white border-2 border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-jan-600" />
              <span>Add to Application Tracker</span>
            </button>
          </div>

          <a
            href={scheme.official_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-jan-700 hover:bg-jan-800 text-white rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md hover:shadow-lg transition-all border border-jan-800 cursor-pointer"
          >
            <span>Apply on Official Website</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
