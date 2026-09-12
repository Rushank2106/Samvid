import React, { useState } from 'react';
import {
  User,
  Briefcase,
  Wallet,
  Users,
  Target,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import {
  UserEligibilityProfile,
  AgeGroup,
  Occupation,
  EmploymentType,
  IncomeRange,
  SchemeCategory,
  Language
} from '../../types';
import { INDIAN_STATES, DISTRICTS_BY_STATE, TRANSLATIONS } from '../../data/translations';
import { CaptchaWidget } from '../common/CaptchaWidget';

interface Props {
  initialProfile?: UserEligibilityProfile;
  onComplete: (profile: UserEligibilityProfile) => void;
  language: Language;
}

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

export const EligibilityWizard: React.FC<Props> = ({ initialProfile, onComplete, language }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserEligibilityProfile>(initialProfile || DEFAULT_PROFILE);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const districts = DISTRICTS_BY_STATE[profile.state] || ['District 1', 'District 2', 'District 3'];

  const handleGoalToggle = (goal: SchemeCategory) => {
    if (goal === 'All') return;
    const current = profile.goals || [];
    if (current.includes(goal)) {
      setProfile({ ...profile, goals: current.filter((g) => g !== goal) });
    } else {
      setProfile({ ...profile, goals: [...current, goal] });
    }
  };

  const handleStateChange = (selectedState: string) => {
    const availableDistricts = DISTRICTS_BY_STATE[selectedState] || ['District 1'];
    setProfile({
      ...profile,
      state: selectedState,
      district: availableDistricts[0] || 'District 1'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete(profile);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header & Step Indicator */}
      <div className="bg-slate-900 text-white p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-jan-600 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Step {step} of 5
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Profile Assessment
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span>Confidential & Private</span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
          {step === 1 && 'Basic Information'}
          {step === 2 && 'Occupation & Employment'}
          {step === 3 && 'Financial Information'}
          {step === 4 && 'Family Circumstances'}
          {step === 5 && 'Support Requirements & CAPTCHA'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          {step === 1 && 'Select your age range, home state, and district to filter location-specific benefits.'}
          {step === 2 && 'Tell us your current occupation type to find relevant worker and livelihood schemes.'}
          {step === 3 && 'Providing household income helps match targeted economic support schemes.'}
          {step === 4 && 'Identify family members (students, seniors, PwD) eligible for dependent grants.'}
          {step === 5 && 'Select your primary goals and pass security verification.'}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 mt-6 overflow-hidden">
          <div
            className="bg-jan-500 h-2 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-jan-600" />
                Age Group
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {(['Below 18', '18–25', '26–40', '41–60', '60+'] as AgeGroup[]).map((ag) => (
                  <button
                    type="button"
                    key={ag}
                    onClick={() => setProfile({ ...profile, age_group: ag })}
                    className={`py-3 px-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                      profile.age_group === ag
                        ? 'bg-jan-50 border-jan-600 text-jan-800 shadow-sm ring-1 ring-jan-600'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {ag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  State / Union Territory
                </label>
                <select
                  value={profile.state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-xl p-3 bg-white focus:ring-2 focus:ring-jan-500 focus:outline-none"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  District
                </label>
                <select
                  value={profile.district}
                  onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-xl p-3 bg-white focus:ring-2 focus:ring-jan-500 focus:outline-none"
                >
                  {districts.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-jan-600" />
                Primary Occupation
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Student',
                  'Farmer',
                  'Business owner',
                  'Self-employed',
                  'Private employee',
                  'Government employee',
                  'Unemployed',
                  'Homemaker',
                  'Senior citizen',
                  'Worker',
                  'Other'
                ].map((occ) => (
                  <button
                    type="button"
                    key={occ}
                    onClick={() => setProfile({ ...profile, occupation: occ as Occupation })}
                    className={`py-3 px-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                      profile.occupation === occ
                        ? 'bg-jan-50 border-jan-600 text-jan-800 shadow-sm ring-1 ring-jan-600'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Employment Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Formal', 'Informal', 'Self-employed', 'Unemployed', 'Student', 'Retired', 'Other'].map(
                  (emp) => (
                    <button
                      type="button"
                      key={emp}
                      onClick={() => setProfile({ ...profile, employment_type: emp as EmploymentType })}
                      className={`py-2.5 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                        profile.employment_type === emp
                          ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {emp}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-jan-600" />
                Annual Household Income Range
              </label>
              <p className="text-xs text-slate-500 mb-3">
                Government schemes use income brackets to assess financial subsidy eligibility.
              </p>
              <div className="space-y-2.5">
                {[
                  'Below ₹1 lakh',
                  '₹1–2 lakh',
                  '₹2–5 lakh',
                  '₹5–10 lakh',
                  'Above ₹10 lakh',
                  'Prefer not to say'
                ].map((inc) => (
                  <button
                    type="button"
                    key={inc}
                    onClick={() => setProfile({ ...profile, income_range: inc as IncomeRange })}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-medium text-left border flex items-center justify-between transition-all ${
                      profile.income_range === inc
                        ? 'bg-jan-50 border-jan-600 text-jan-900 font-bold shadow-sm'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{inc}</span>
                    {profile.income_range === inc && (
                      <CheckCircle2 className="w-4 h-4 text-jan-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-jan-600" />
                Family Composition & Circumstances
              </label>
              <p className="text-xs text-slate-500 mb-4">
                Select options that apply to your household to discover family-wide benefits.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={profile.family_information.has_children}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        family_information: {
                          ...profile.family_information,
                          has_children: e.target.checked
                        }
                      })
                    }
                    className="w-4 h-4 text-jan-600 rounded border-slate-300 focus:ring-jan-500"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Children in family (School/College)
                  </span>
                </label>

                <label className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={profile.family_information.has_senior_citizens}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        family_information: {
                          ...profile.family_information,
                          has_senior_citizens: e.target.checked
                        }
                      })
                    }
                    className="w-4 h-4 text-jan-600 rounded border-slate-300 focus:ring-jan-500"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Senior Citizens (Age 60+)
                  </span>
                </label>

                <label className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={profile.family_information.has_pwd}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        family_information: {
                          ...profile.family_information,
                          has_pwd: e.target.checked
                        }
                      })
                    }
                    className="w-4 h-4 text-jan-600 rounded border-slate-300 focus:ring-jan-500"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Persons with Disabilities (PwD)
                  </span>
                </label>

                <label className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={profile.family_information.is_single_parent}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        family_information: {
                          ...profile.family_information,
                          is_single_parent: e.target.checked
                        }
                      })
                    }
                    className="w-4 h-4 text-jan-600 rounded border-slate-300 focus:ring-jan-500"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Single-parent / Widow household
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-jan-600" />
                Select Preferred Support Categories
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  'Education',
                  'Healthcare',
                  'Housing',
                  'Agriculture',
                  'Employment',
                  'Financial Assistance',
                  'Business',
                  'Pension',
                  'Women and Child Welfare',
                  'Disability',
                  'Skill Development',
                  'Insurance'
                ].map((cat) => {
                  const isSel = profile.goals?.includes(cat as SchemeCategory);
                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => handleGoalToggle(cat as SchemeCategory)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                        isSel
                          ? 'bg-jan-50 border-jan-600 text-jan-800 font-bold ring-1 ring-jan-600'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat}</span>
                      {isSel && <CheckCircle2 className="w-3.5 h-3.5 text-jan-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1">
                Tell us what specific support you are looking for (Optional)
              </label>
              <textarea
                value={profile.specific_query || ''}
                onChange={(e) => setProfile({ ...profile, specific_query: e.target.value })}
                placeholder="Example: I am a farmer looking for financial assistance for irrigation and land machinery..."
                className="w-full border border-slate-300 rounded-xl p-3 text-xs sm:text-sm focus:ring-2 focus:ring-jan-500 focus:outline-none h-20"
              />
            </div>

            {/* Security CAPTCHA Widget */}
            <CaptchaWidget onVerify={(val) => setCaptchaVerified(val)} />
          </div>
        )}

        {/* Buttons Row */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 border-2 border-slate-300 rounded-xl text-xs sm:text-sm font-extrabold text-slate-800 bg-white hover:bg-slate-100 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-7 py-2.5 bg-jan-700 hover:bg-jan-800 text-white rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer border border-jan-800"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!captchaVerified || isSubmitting}
              className={`px-8 py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md transition-all ${
                captchaVerified && !isSubmitting
                  ? 'bg-jan-700 hover:bg-jan-800 text-white cursor-pointer hover:shadow-lg border border-jan-800'
                  : 'bg-slate-300 text-slate-600 border border-slate-400 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Analyzing Eligibility Rules...' : 'Submit Profile & Check Schemes'}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
