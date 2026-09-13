import React, { useState } from 'react';
import {
  UserCheck,
  Bookmark,
  ListCheck,
  Clock,
  Plus,
  Trash2,
  ExternalLink,
  AlertCircle,
  Edit3
} from 'lucide-react';
import {
  UserEligibilityProfile,
  ApplicationTrackerItem,
  ReminderItem,
  ApplicationStatus,
  Language
} from '../../types';
import { MOCK_SCHEMES } from '../../data/mockSchemes';

interface Props {
  profile: UserEligibilityProfile;
  savedSchemeIds: string[];
  onRemoveSaved: (schemeId: string) => void;
  onViewSchemeDetails: (schemeId: string) => void;
  onUpdateProfile: () => void;
  language: Language;
}

export const CitizenDashboard: React.FC<Props> = ({
  profile,
  savedSchemeIds,
  onRemoveSaved,
  onViewSchemeDetails,
  onUpdateProfile,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'tracker' | 'saved' | 'reminders' | 'profile'>('tracker');

  // Application Tracker State
  const [trackerItems, setTrackerItems] = useState<ApplicationTrackerItem[]>(() => [
    {
      id: 'trk-1',
      scheme_id: 'pm-kisan',
      scheme_name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
      official_url: 'https://pmkisan.gov.in',
      status: 'Applied',
      notes: 'Submitted online via CSC portal. e-KYC completed with Aadhaar OTP.',
      created_at: '2026-08-20',
      updated_at: '2026-08-22'
    },
    {
      id: 'trk-2',
      scheme_id: 'ayushman-bharat',
      scheme_name: 'Ayushman Bharat PM-JAY',
      official_url: 'https://pmjay.gov.in',
      status: 'Documents Required',
      notes: 'Aadhaar verified. Need to fetch updated Ration Card copy.',
      created_at: '2026-08-25',
      updated_at: '2026-08-25'
    }
  ]);

  // Reminders State
  const [reminders, setReminders] = useState<ReminderItem[]>(() => [
    {
      id: 'rem-1',
      scheme_id: 'post-matric-scholarship',
      scheme_name: 'Post-Matric Scholarship',
      title: 'Submit NSP Institute Verification Document',
      date: '2026-09-30',
      notes: 'Get marksheets signed by college nodal officer.',
      completed: false
    }
  ]);

  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderDate, setNewReminderDate] = useState('');

  const savedSchemes = MOCK_SCHEMES.filter((s) => savedSchemeIds.includes(s.id));

  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    setTrackerItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: newStatus, updated_at: new Date().toISOString().split('T')[0] }
          : item
      )
    );
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderTitle || !newReminderDate) return;

    const item: ReminderItem = {
      id: `rem-${Date.now()}`,
      scheme_id: 'general',
      scheme_name: 'General Welfare',
      title: newReminderTitle,
      date: newReminderDate,
      notes: 'Personal citizen reminder',
      completed: false
    };

    setReminders([...reminders, item]);
    setNewReminderTitle('');
    setNewReminderDate('');
  };

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Dashboard Top Metrics Header matching Home Page theme */}
      <div className="bg-gradient-to-b from-navy-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 border-t-4 border-t-saffron-500">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-slate-900/90 text-saffron-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-saffron-500/60">
                Citizen Portal
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {profile.state}, India
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Personal Benefit Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
              Track your application statuses, saved schemes, and document preparation schedules.
            </p>
          </div>

          <button
            onClick={onUpdateProfile}
            className="px-5 py-2.5 bg-saffron-500 hover:bg-saffron-600 text-white text-xs font-extrabold rounded-xl flex items-center gap-1.5 transition-all shadow-md hover:shadow-saffron-500/30 hover:scale-[1.02] cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Modify Eligibility Profile</span>
          </button>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
              Profile Completion
            </span>
            <span className="text-2xl font-extrabold text-saffron-400">85%</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">5 Parameters Active</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
              Saved Schemes
            </span>
            <span className="text-2xl font-extrabold text-indiagreen-400">{savedSchemes.length}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Bookmarked Benefits</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
              Tracked Applications
            </span>
            <span className="text-2xl font-extrabold text-amber-400">{trackerItems.length}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Active Personal Logs</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
              Upcoming Deadlines
            </span>
            <span className="text-2xl font-extrabold text-saffron-300">
              {reminders.filter((r) => !r.completed).length}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Scheduled Reminders</span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1 shadow-sm text-xs font-extrabold">
        <button
          onClick={() => setActiveTab('tracker')}
          className={`flex-1 py-2.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'tracker'
              ? 'bg-slate-900 text-white font-extrabold shadow-sm'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ListCheck className="w-4 h-4 text-saffron-400" />
          <span>Application Tracker ({trackerItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-2.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'saved'
              ? 'bg-slate-900 text-white font-extrabold shadow-sm'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Bookmark className="w-4 h-4 text-saffron-400" />
          <span>My Saved Schemes ({savedSchemes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reminders')}
          className={`flex-1 py-2.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'reminders'
              ? 'bg-slate-900 text-white font-extrabold shadow-sm'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Clock className="w-4 h-4 text-saffron-400" />
          <span>Reminders ({reminders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-slate-900 text-white font-extrabold shadow-sm'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <UserCheck className="w-4 h-4 text-saffron-400" />
          <span>Active Profile Info</span>
        </button>
      </div>

      {/* TAB 1: APPLICATION TRACKER */}
      {activeTab === 'tracker' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs text-amber-900 flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Personal Tracking Note:</strong> This is a personal tracking feature. Samvida does not claim to retrieve official live government application status unless an official government API is integrated.
            </span>
          </div>

          <div className="space-y-3">
            {trackerItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {item.scheme_name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono">
                      Last Updated: {item.updated_at}
                    </p>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600">Status:</span>
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value as ApplicationStatus)
                      }
                      className="text-xs font-extrabold border border-slate-300 rounded-xl p-2 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    >
                      {[
                        'Planning',
                        'Documents Required',
                        'Applied',
                        'Documents Submitted',
                        'Under Review',
                        'Approved',
                        'Rejected'
                      ].map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium">
                  {item.notes}
                </p>

                <div className="flex justify-end pt-1">
                  <a
                    href={item.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-saffron-600 hover:underline"
                  >
                    <span>Check Official Government Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SAVED SCHEMES */}
      {activeTab === 'saved' && (
        <div>
          {savedSchemes.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-extrabold text-slate-800 text-base">No Saved Schemes Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Click the bookmark button on any scheme card to save it here for quick reference later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-saffron-100 text-saffron-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-saffron-200">
                        {scheme.government_level} Government
                      </span>
                      <button
                        onClick={() => onRemoveSaved(scheme.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {scheme.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-normal">
                      {scheme.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onViewSchemeDetails(scheme.id)}
                      className="text-xs font-extrabold text-saffron-600 hover:underline cursor-pointer"
                    >
                      View Details & Docs
                    </button>
                    <a
                      href={scheme.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-extrabold text-indiagreen-700 flex items-center gap-1"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: REMINDERS */}
      {activeTab === 'reminders' && (
        <div className="space-y-6">
          {/* Add Reminder Form */}
          <form
            onSubmit={handleAddReminder}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3"
          >
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-500">
              Create New Deadline Reminder
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={newReminderTitle}
                onChange={(e) => setNewReminderTitle(e.target.value)}
                placeholder="Reminder title (e.g. Income Cert Renewal)"
                className="text-xs border border-slate-300 rounded-xl p-2.5 sm:col-span-2 focus:ring-2 focus:ring-saffron-500 focus:outline-none font-medium"
              />
              <input
                type="date"
                value={newReminderDate}
                onChange={(e) => setNewReminderDate(e.target.value)}
                className="text-xs border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-saffron-500 focus:outline-none font-bold"
              />
            </div>
            <button
              type="submit"
              className="bg-saffron-500 hover:bg-saffron-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-1 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Reminder</span>
            </button>
          </form>

          {/* Reminder Items List */}
          <div className="space-y-2">
            {reminders.map((r) => (
              <div
                key={r.id}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                  r.completed
                    ? 'bg-slate-100 border-slate-200 text-slate-500 line-through'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={r.completed}
                    onChange={() => toggleReminder(r.id)}
                    className="w-4 h-4 text-saffron-600 rounded border-slate-300 focus:ring-saffron-500"
                  />
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm">{r.title}</h4>
                    <p className="text-[11px] text-slate-500 font-mono">Due Date: {r.date}</p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg">
                  {r.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ACTIVE PROFILE INFO */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base border-b border-slate-100 pb-3">
            Active Citizen Profile Overview
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block font-bold">Age Group:</span>
              <span className="font-extrabold text-slate-900">{profile.age_group}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold">State & District:</span>
              <span className="font-extrabold text-slate-900">{profile.state} ({profile.district})</span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold">Occupation:</span>
              <span className="font-extrabold text-slate-900">{profile.occupation}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold">Employment Type:</span>
              <span className="font-extrabold text-slate-900">{profile.employment_type}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold">Household Income Range:</span>
              <span className="font-extrabold text-slate-900">{profile.income_range}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold">Preferred Goals:</span>
              <span className="font-extrabold text-slate-900">{profile.goals.join(', ')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
