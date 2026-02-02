
import React from 'react';
import { Mentor, Learner } from '../types';

interface Props {
  mentors: Mentor[];
  learners: Learner[];
}

const Dashboard: React.FC<Props> = ({ mentors, learners }) => {
  const matchedCount = learners.filter(l => !!l.assignedMentorId).length;
  const pendingCount = learners.length - matchedCount;

  const stats = [
    { label: 'Total Learners', value: learners.length, color: 'text-blue-600', bg: 'bg-blue-50', icon: '💎' },
    { label: 'Active Mentors', value: mentors.length, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: '🏛️' },
    { label: 'Success Ratio', value: `${matchedCount}/${learners.length}`, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: '🎯' },
    { label: 'Pending Match', value: pendingCount, color: 'text-rose-600', bg: 'bg-rose-50', icon: '🔥' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">System Overview</h2>
          <p className="text-slate-500 font-medium mt-2">Iron Lady Command Center • Real-time Monitoring</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Update</p>
          <p className="text-sm font-bold text-slate-700">Today, 09:41 AM</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(s => (
          <div key={s.label} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-center mb-6">
              <div className={`w-12 h-12 ${s.bg} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                {s.icon}
              </div>
              <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
            </div>
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-black text-xl text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-2 h-6 bg-indigo-600 rounded-full"></span> Recent Enrollment
            </h3>
            <button className="text-xs font-black text-indigo-600 hover:underline">VIEW ALL</button>
          </div>
          <div className="space-y-6">
            {learners.slice(0, 3).map(l => (
              <div key={l.id} className="flex items-center justify-between p-5 rounded-[2rem] bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-50">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-indigo-500 font-black">
                    {l.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{l.name}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{l.currentRole}</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${l.assignedMentorId ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-500'}`}>
                  {l.assignedMentorId ? 'MATCHED' : 'PENDING'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#1e1e2f] p-12 rounded-[3.5rem] text-center flex flex-col justify-center items-center text-white relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-transparent"></div>
          <div className="relative z-10">
            <div className="text-6xl mb-8 group-hover:scale-125 transition-transform duration-500 drop-shadow-2xl">✨</div>
            <h3 className="font-black text-3xl mb-4 tracking-tight leading-tight">Matchmaker<br/>Is Ready</h3>
            <p className="text-indigo-200/60 font-medium mb-8 leading-relaxed">
              Automated semantic analysis of {pendingCount} waiting learners. Boost success ratio today.
            </p>
            <button className="bg-white text-[#1e1e2f] px-10 py-4 rounded-2xl font-black text-sm shadow-2xl hover:bg-indigo-50 active:scale-95 transition-all">
              LAUNCH AI ENGINE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
