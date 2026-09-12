import React, { useState } from 'react';
import { ShieldCheck, Plus, Edit, Power } from 'lucide-react';
import { Scheme } from '../../types';
import { MOCK_SCHEMES } from '../../data/mockSchemes';

export const AdminDashboard: React.FC = () => {
  const [schemes, setSchemes] = useState<Scheme[]>(MOCK_SCHEMES);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);

  const toggleActive = (id: string) => {
    setSchemes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-jan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-jan-300">
              Admin Portal
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Scheme Catalog Management
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Add verified government schemes, update official URLs, manage rules, and toggle active status.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingScheme({
              id: `scheme-${Date.now()}`,
              name: 'New Government Welfare Scheme',
              description: 'Official description of the government scheme.',
              government_level: 'Central',
              department: 'Ministry of Welfare',
              category: 'Financial Assistance',
              benefits: ['Direct Benefit Transfer (DBT)'],
              application_process: ['Apply on official portal', 'e-KYC authentication'],
              official_url: 'https://india.gov.in',
              source_name: 'Official Government Portal',
              source_type: 'Central Portal',
              last_verified_at: new Date().toISOString().split('T')[0],
              active: true,
              required_documents: [],
              tags: ['New']
            })
          }
          className="bg-jan-600 hover:bg-jan-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Scheme</span>
        </button>
      </div>

      {/* Schemes Admin Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-sm">
            Catalog Directory ({schemes.length} Schemes)
          </h2>
          <span className="text-xs text-slate-500 font-mono">Role: Authorized Scheme Curator</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">Scheme Name</th>
                <th className="p-3">Level</th>
                <th className="p-3">Category</th>
                <th className="p-3">Official URL</th>
                <th className="p-3">Verified Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {schemes.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{s.name}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        s.government_level === 'Central'
                          ? 'bg-jan-100 text-jan-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {s.government_level}
                    </span>
                  </td>
                  <td className="p-3 font-medium">{s.category}</td>
                  <td className="p-3 text-jan-700 font-mono text-xs max-w-[150px] truncate">
                    <a href={s.official_url} target="_blank" rel="noreferrer" className="hover:underline">
                      {s.official_url}
                    </a>
                  </td>
                  <td className="p-3 font-mono text-xs">{s.last_verified_at}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        s.active ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {s.active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => toggleActive(s.id)}
                      className={`p-1.5 rounded text-xs font-semibold ${
                        s.active ? 'text-amber-700 hover:bg-amber-50' : 'text-emerald-700 hover:bg-emerald-50'
                      }`}
                      title={s.active ? 'Disable' : 'Enable'}
                    >
                      <Power className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingScheme(s)}
                      className="p-1.5 rounded text-jan-700 hover:bg-jan-50"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Scheme Drawer / Modal */}
      {editingScheme && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl border border-slate-200 my-auto">
            <h3 className="font-bold text-slate-900 text-base">
              Edit Scheme Metadata ({editingScheme.id})
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Scheme Name</label>
                <input
                  type="text"
                  value={editingScheme.name}
                  onChange={(e) => setEditingScheme({ ...editingScheme, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Govt Level</label>
                  <select
                    value={editingScheme.government_level}
                    onChange={(e) =>
                      setEditingScheme({
                        ...editingScheme,
                        government_level: e.target.value as 'Central' | 'State'
                      })
                    }
                    className="w-full border border-slate-300 rounded-lg p-2.5"
                  >
                    <option value="Central">Central</option>
                    <option value="State">State</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Portal URL</label>
                  <input
                    type="text"
                    value={editingScheme.official_url}
                    onChange={(e) =>
                      setEditingScheme({ ...editingScheme, official_url: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg p-2.5"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setEditingScheme(null)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSchemes((prev) =>
                    prev.map((s) => (s.id === editingScheme.id ? editingScheme : s))
                  );
                  setEditingScheme(null);
                }}
                className="px-5 py-2 bg-jan-700 text-white rounded-xl text-xs font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
