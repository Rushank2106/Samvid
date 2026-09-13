import React, { useState } from 'react';
import { ShieldAlert, Search, AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';
import { checkSchemeGenuineStatus } from '../../services/aiService';

export const FraudCheckerModal: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ReturnType<typeof checkSchemeGenuineStatus> | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = checkSchemeGenuineStatus(query);
    setResult(res);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 border-t-4 border-t-saffron-500">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Is this government scheme genuine?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Verify scheme authenticity against verified official government directories before sharing personal data.
          </p>
        </div>
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-800 mb-1">
            Enter Scheme Name or Website URL
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. PM-KISAN, Ayushman Bharat, PM Vishwakarma..."
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-saffron-500 focus:outline-none font-medium"
              />
            </div>
            <button
              type="submit"
              className="bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-saffron-500/30 cursor-pointer flex-shrink-0"
            >
              Verify Genuine Status
            </button>
          </div>
        </div>
      </form>

      {/* Verification Result Display */}
      {result && (
        <div
          className={`p-5 rounded-2xl border ${
            result.isVerified
              ? 'bg-indiagreen-50 border-indiagreen-200 text-indiagreen-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-start gap-3">
            {result.isVerified ? (
              <ShieldCheck className="w-6 h-6 text-indiagreen-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="space-y-2">
              <h3 className="font-extrabold text-sm sm:text-base">{result.statusTitle}</h3>
              <p className="text-xs sm:text-sm leading-relaxed font-medium">{result.explanation}</p>
              {result.matchedOfficialUrl && (
                <div className="pt-2">
                  <a
                    href={result.matchedOfficialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-indiagreen-600 hover:bg-indiagreen-700 text-white px-4 py-2 rounded-xl transition-all hover:scale-[1.02] cursor-pointer shadow-xs"
                  >
                    <span>Visit Verified Official Website ({result.matchedOfficialUrl})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Safety Guidelines */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
        <h4 className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px]">
          Citizen Safety Guidelines:
        </h4>
        <ul className="list-disc list-inside space-y-1 text-slate-600 font-medium">
          <li>Official Government websites in India use <strong>.gov.in</strong> or official state domains (e.g., <strong>goa.gov.in</strong>, <strong>mp.gov.in</strong>).</li>
          <li>Government schemes never charge registration fees via WhatsApp, Telegram, or personal UPI IDs.</li>
          <li>Never share Aadhaar OTPs, bank passwords, or debit card CVVs with unauthorized agents.</li>
        </ul>
      </div>
    </div>
  );
};
