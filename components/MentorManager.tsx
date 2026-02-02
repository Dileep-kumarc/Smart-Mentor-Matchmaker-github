
import React, { useState } from 'react';
import { Mentor } from '../types';

interface Props {
  mentors: Mentor[];
  onAdd: (m: Mentor) => void;
  onUpdate: (m: Mentor) => void;
  onDelete: (id: string) => void;
}

const MentorManager: React.FC<Props> = ({ mentors, onAdd, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Mentor>>({});

  const handleSave = () => {
    if (editingId) {
      onUpdate(formData as Mentor);
      setEditingId(null);
    } else {
      onAdd({ ...formData, id: Date.now().toString(), expertise: (formData.expertise || []) } as Mentor);
      setShowAddForm(false);
    }
    setFormData({});
  };

  const handleExpertiseChange = (val: string) => {
    const list = val.split(',').map(s => s.trim()).filter(s => s !== '');
    setFormData({ ...formData, expertise: list });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Mentor CRM</h2>
          <p className="text-slate-500 font-medium">Global expertise pool management.</p>
        </div>
        <button 
          onClick={() => { setShowAddForm(true); setFormData({}); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl text-sm font-black transition-all shadow-xl shadow-indigo-100 flex items-center gap-2"
        >
          <span className="text-lg">+</span> ADD NEW MENTOR
        </button>
      </div>

      {(showAddForm || editingId) && (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 z-0"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-indigo-500">✍️</span> {editingId ? 'Edit Mentor Profile' : 'Register New Mentor'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-widest">Full Name</label>
                <input 
                  placeholder="e.g. Jane Doe" 
                  className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white p-4 rounded-2xl outline-none transition-all text-slate-900 font-bold"
                  value={formData.name || ''} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-widest">Current Title</label>
                <input 
                  placeholder="e.g. Chief Product Officer" 
                  className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white p-4 rounded-2xl outline-none transition-all text-slate-900 font-bold"
                  value={formData.currentTitle || ''} 
                  onChange={e => setFormData({...formData, currentTitle: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-widest">Industry</label>
                <input 
                  placeholder="e.g. Fintech" 
                  className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white p-4 rounded-2xl outline-none transition-all text-slate-900 font-bold"
                  value={formData.industry || ''} 
                  onChange={e => setFormData({...formData, industry: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-widest">Years of Experience</label>
                <input 
                  placeholder="e.g. 15" 
                  type="number"
                  className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white p-4 rounded-2xl outline-none transition-all text-slate-900 font-bold"
                  value={formData.yearsExperience || ''} 
                  onChange={e => setFormData({...formData, yearsExperience: parseInt(e.target.value)})}
                />
              </div>
              <div className="col-span-full space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-widest">Expertise Areas (Comma separated)</label>
                <input 
                  placeholder="Scaling, Strategy, Operations" 
                  className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white p-4 rounded-2xl outline-none transition-all text-slate-900 font-bold"
                  value={formData.expertise?.join(', ') || ''} 
                  onChange={e => handleExpertiseChange(e.target.value)}
                />
              </div>
              <div className="col-span-full space-y-2">
                <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-widest">Professional Biography</label>
                <textarea 
                  placeholder="Tell us about their career journey..." 
                  className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white p-4 rounded-2xl h-32 outline-none transition-all text-slate-900 font-medium leading-relaxed"
                  value={formData.bio || ''} 
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-4 justify-end mt-8">
              <button onClick={() => { setEditingId(null); setShowAddForm(false); }} className="text-slate-400 font-black px-6 py-3 hover:text-slate-600 transition-colors">DISCARD</button>
              <button onClick={handleSave} className="bg-[#1e1e2f] text-white px-10 py-3 rounded-2xl font-black shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all">SAVE PROFILE</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
              <th className="px-8 py-5">Profile</th>
              <th className="px-8 py-5">Industry</th>
              <th className="px-8 py-5">Expertise</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mentors.map(m => (
              <tr key={m.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 font-black text-lg">
                      {m.name[0]}
                    </div>
                    <div>
                      <div className="font-black text-slate-900">{m.name}</div>
                      <div className="text-xs text-slate-500 font-medium">{m.currentTitle} • {m.yearsExperience}y exp</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-black text-slate-600">
                    {m.industry}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-wrap gap-1">
                    {m.expertise.slice(0, 2).map(e => (
                      <span key={e} className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {e}
                      </span>
                    ))}
                    {m.expertise.length > 2 && <span className="text-[10px] text-slate-400">+{m.expertise.length - 2}</span>}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex gap-4 justify-end">
                    <button onClick={() => { setEditingId(m.id); setFormData(m); }} className="text-indigo-600 font-black text-xs hover:underline decoration-2 underline-offset-4">EDIT</button>
                    <button onClick={() => onDelete(m.id)} className="text-rose-400 font-black text-xs hover:text-rose-600 transition-colors">DELETE</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MentorManager;
