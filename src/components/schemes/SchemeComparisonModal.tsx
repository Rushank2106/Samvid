import React, { useEffect } from 'react';
import { X, ExternalLink, Columns, CheckCircle2 } from 'lucide-react';
import { Scheme } from '../../types';

interface Props {
  schemes: Scheme[];
  onClose: () => void;
}

export const SchemeComparisonModal: React.FC<Props> = ({ schemes, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!schemes || schemes.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto overscroll-contain">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto border-t-4 border-t-saffron-500">
        {/* Header matching Home Page dark theme */}
        <div className="bg-gradient-to-b from-navy-950 via-slate-900 to-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Columns className="w-5 h-5 text-saffron-400" />
            <h2 className="text-lg font-extrabold">Side-by-Side Scheme Comparison</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-x-auto overflow-y-auto flex-1">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3 font-extrabold text-slate-500 w-1/4 uppercase tracking-wider text-[11px]">
                  Feature / Parameter
                </th>
                {schemes.map((s) => (
                  <th key={s.id} className="p-3 font-extrabold text-slate-900 w-1/3">
                    <div className="space-y-1">
                      <span className="bg-saffron-100 text-saffron-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-saffron-200 uppercase tracking-wider inline-block">
                        {s.government_level}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900 line-clamp-2">{s.name}</h3>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3 font-extrabold text-slate-900 bg-slate-50/50">Department</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3 font-medium">{s.department}</td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-extrabold text-slate-900 bg-slate-50/50">Primary Category</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3 font-bold">{s.category}</td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-extrabold text-slate-900 bg-slate-50/50">Core Benefit</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3 text-xs leading-relaxed font-bold text-indiagreen-800">
                    {s.benefits[0]}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-extrabold text-slate-900 bg-slate-50/50">Income Limit</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3 font-medium">
                    {s.income_limit_lakhs ? `Below ₹${s.income_limit_lakhs} Lakh/year` : 'No hard limit'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-extrabold text-slate-900 bg-slate-50/50">Target Occupations</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3 text-xs font-medium">
                    {s.eligible_occupations?.join(', ') || 'All occupations'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-extrabold text-slate-900 bg-slate-50/50">Required Documents</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3 text-xs space-y-1">
                    {s.required_documents.map((d) => (
                      <div key={d.id} className="flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-saffron-600 flex-shrink-0" />
                        <span>{d.document_name}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-extrabold text-slate-900 bg-slate-50/50">Official Link</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3">
                    <a
                      href={s.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-saffron-600 hover:underline"
                    >
                      <span>Visit Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
