import React, { useEffect } from 'react';
import { X, ExternalLink, Columns, Building2, CheckCircle2 } from 'lucide-react';
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
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Columns className="w-5 h-5 text-jan-400" />
            <h2 className="text-lg font-bold">Side-by-Side Scheme Comparison</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-x-auto overflow-y-auto flex-1">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3 font-bold text-slate-500 w-1/4 uppercase tracking-wider text-[11px]">
                  Feature / Parameter
                </th>
                {schemes.map((s) => (
                  <th key={s.id} className="p-3 font-bold text-slate-900 w-1/3">
                    <div className="space-y-1">
                      <span className="bg-jan-100 text-jan-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        {s.government_level}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{s.name}</h3>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/50">Department</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3">{s.department}</td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/50">Primary Category</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3 font-medium">{s.category}</td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/50">Core Benefit</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3 text-xs leading-relaxed font-medium text-emerald-800">
                    {s.benefits[0]}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/50">Income Limit</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3">
                    {s.income_limit_lakhs ? `Below ₹${s.income_limit_lakhs} Lakh/year` : 'No hard limit'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/50">Target Occupations</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3 text-xs">
                    {s.eligible_occupations?.join(', ') || 'All occupations'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/50">Required Documents</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3 text-xs space-y-1">
                    {s.required_documents.map((d) => (
                      <div key={d.id} className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-jan-600 flex-shrink-0" />
                        <span>{d.document_name}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/50">Official Link</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3">
                    <a
                      href={s.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-jan-700 hover:underline"
                    >
                      <span>Visit Portal</span>
                      <ExternalLink className="w-3 h-3" />
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
            className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
