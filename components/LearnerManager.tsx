
import React, { useState } from 'react';
import { Learner } from '../types';

interface Props {
  learners: Learner[];
  onAdd: (l: Learner) => void;
  onUpdate: (l: Learner) => void;
  onDelete: (id: string) => void;
}

const LearnerManager: React.FC<Props> = ({ learners, onAdd, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Learner>>({});

  const handleSave = () => {
    if (editingId) {
      onUpdate(formData as Learner);
      setEditingId(null);
    } else {
      onAdd({ ...formData, id: Date.now().toString() } as Learner);
      setShowAddForm(false);
    }
    setFormData({});
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Enrollment Hub</h2>
          <p className="text-slate-500 font-medium">Tracking the next generation of leaders.</p>
        </div>
        <button 
          onClick={() => { setShowAddForm(true); setFormData({}); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl text-sm font-black transition-all shadow-xl shadow-indigo-100"
        >
          + NEW ENROLLMENT
        </button>
      </div>

      {(showAddForm || editingId) && (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-6">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-indigo-500">🎓</span> {editingId ? 'Update Learner' : 'Enroll New Learner'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-widest">Full Name</label>
              <input 
                placeholder="Name" 
                className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white p-4 rounded-2xl outline-none transition-all text-slate-900 font-bold"
                value={formData.name || ''} 
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-widest">Current Role</label>
              <input 
                placeholder="Job Title" 
                className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white p-4 rounded-2xl outline-none transition-all text-slate-900 font-bold"
                value={formData.currentRole || ''} 
                onChange={e => setFormData({...formData, currentRole: e.target.value})}
              />
            </div>
            <div className="col-span-full space-y-2">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-widest">Career Goals</label>
              <textarea 
                placeholder="What does she want to achieve?" 
                className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white p-4 rounded-2xl h-24 outline-none transition-all text-slate-900 font-medium"
                value={formData.careerGoals || ''} 
                onChange={e => setFormData({...formData, careerGoals: e.target.value})}
              />
            </div>
            <div className="col-span-full space-y-2">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-2 tracking-widest">Current Challenges</label>
              <textarea 
                placeholder="What's holding her back?" 
                className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white p-4 rounded-2xl h-24 outline-none transition-all text-slate-900 font-medium"
                value={formData.challenges || ''} 
                onChange={e => setFormData({...formData, challenges: e.target.value})}
              />
            </div>
          </div>
          <div className="flex gap-4 justify-end mt-8">
            <button onClick={() => { setEditingId(null); setShowAddForm(false); }} className="text-slate-400 font-black px-6 py-3 hover:text-slate-600 transition-colors">CANCEL</button>
            <button onClick={handleSave} className="bg-[#1e1e2f] text-white px-10 py-3 rounded-2xl font-black transition-all">SAVE LEARNER</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {learners.map(l => (
          <div key={l.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-indigo-50 rounded-[1.25rem] flex items-center justify-center text-indigo-500 text-xl font-black">
                  {l.name[0]}
                </div>
                <div>
                  <h4 className="font-black text-xl text-slate-900 tracking-tight">{l.name}</h4>
                  <p className="text-xs text-indigo-600 font-black uppercase tracking-widest">{l.currentRole}</p>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditingId(l.id); setFormData(l); }} className="p-2 hover:bg-indigo-50 rounded-xl text-indigo-400 transition-colors">✏️</button>
                <button onClick={() => onDelete(l.id)} className="p-2 hover:bg-rose-50 rounded-xl text-rose-300 transition-colors">🗑️</button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[9px] uppercase text-slate-400 font-black block mb-2 tracking-[0.2em]">Primary Goals</span>
                <p className="text-sm text-slate-700 font-medium line-clamp-3 leading-relaxed">{l.careerGoals}</p>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <div className={`flex items-center gap-2 text-[10px] px-4 py-2 rounded-full font-black uppercase tracking-wider ${l.assignedMentorId ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${l.assignedMentorId ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`}></span>
                  {l.assignedMentorId ? 'Match Confirmed' : 'Ready for Pairing'}
                </div>
                {l.assignedMentorId && (
                  <span className="text-[10px] text-slate-400 font-bold">Ref: #{l.id.slice(-4)}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnerManager;
