import React from 'react';
import { Compass, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { UserEligibilityProfile, SchemeCategory } from '../../types';

interface Props {
  profile: UserEligibilityProfile;
  onExploreCategory: (cat: SchemeCategory) => void;
}

export const BenefitGapAnalyzer: React.FC<Props> = ({ profile, onExploreCategory }) => {
  const allCategories: { name: SchemeCategory; status: 'Already Explored' | 'Potential Opportunity'; note: string }[] = [
    {
      name: 'Healthcare',
      status: profile.goals.includes('Healthcare') ? 'Already Explored' : 'Potential Opportunity',
      note: 'Ayushman Bharat PM-JAY covers up to ₹5 Lakh cashless hospitalization per family.'
    },
    {
      name: 'Education',
      status: profile.goals.includes('Education') ? 'Already Explored' : 'Potential Opportunity',
      note: 'Post-Matric scholarships and fee waivers for school & college students.'
    },
    {
      name: 'Housing',
      status: profile.goals.includes('Housing') ? 'Already Explored' : 'Potential Opportunity',
      note: 'PMAY grants up to ₹1.2 Lakh to ₹2.67 Lakh interest subsidy for pucca homes.'
    },
    {
      name: 'Agriculture',
      status: profile.goals.includes('Agriculture') ? 'Already Explored' : 'Potential Opportunity',
      note: 'PM-KISAN ₹6,000/year direct cash transfer and Kisan Credit Card access.'
    },
    {
      name: 'Pension',
      status: profile.goals.includes('Pension') ? 'Already Explored' : 'Potential Opportunity',
      note: 'Atal Pension Yojana guaranteed ₹1,000-5,000 monthly old age pension.'
    },
    {
      name: 'Business',
      status: profile.goals.includes('Business') ? 'Already Explored' : 'Potential Opportunity',
      note: 'PM Vishwakarma and PM SVANidhi collateral-free working capital loans.'
    }
  ];

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-5 h-5 text-jan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-jan-300">
              Personalized Opportunity Layer
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Potential Benefit Gap Analyzer
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            You may want to explore these additional welfare categories based on your citizen profile ({profile.occupation}, {profile.state}).
          </p>
        </div>
        <span className="bg-slate-800 text-jan-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-700 hidden sm:inline-block">
          Profile Context Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allCategories.map((item) => (
          <div
            key={item.name}
            className={`p-4 rounded-xl border transition-all ${
              item.status === 'Already Explored'
                ? 'bg-slate-800/60 border-slate-700/80 text-slate-300'
                : 'bg-jan-950/60 border-jan-700/80 text-white hover:border-jan-500'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span>{item.name} Support</span>
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  item.status === 'Already Explored'
                    ? 'bg-slate-700 text-slate-300'
                    : 'bg-jan-600 text-white font-extrabold shadow-sm'
                }`}
              >
                {item.status}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">{item.note}</p>

            <button
              onClick={() => onExploreCategory(item.name)}
              className="text-xs font-bold text-jan-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Explore Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700 text-xs text-slate-400 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span>
          <strong>Disclaimer:</strong> Samvida highlights potential opportunities. Final eligibility decisions are rendered solely by government departments upon official application submission.
        </span>
      </div>
    </div>
  );
};
