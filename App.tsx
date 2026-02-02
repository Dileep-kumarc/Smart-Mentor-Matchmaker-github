
import React, { useState, useEffect } from 'react';
import { UserRole, Mentor, Learner, MatchResult } from './types';
import Sidebar from './components/Sidebar';
import MentorManager from './components/MentorManager';
import LearnerManager from './components/LearnerManager';
import MatchMaker from './components/MatchMaker';
import Dashboard from './components/Dashboard';

const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Sarah Jenkins',
    industry: 'Technology',
    expertise: ['Product Management', 'Scaling Teams', 'SaaS'],
    bio: 'Former VP of Product at Google. Passionate about helping women transition into executive leadership roles.',
    yearsExperience: 15,
    currentTitle: 'Product Consultant'
  },
  {
    id: 'm2',
    name: 'Ananya Sharma',
    industry: 'Finance',
    expertise: ['Investment Banking', 'Financial Strategy', 'Venture Capital'],
    bio: '12 years in Wall Street. Expertise in capital raising and corporate governance for female-led startups.',
    yearsExperience: 12,
    currentTitle: 'Senior Partner at FinVentures'
  }
];

const INITIAL_LEARNERS: Learner[] = [
  {
    id: 'l1',
    name: 'Priya Das',
    currentRole: 'Senior Software Engineer',
    careerGoals: 'Transition into Product Management within the next 12 months.',
    challenges: 'Finding it hard to pivot from coding to stakeholder management.',
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'mentors' | 'learners' | 'matching'>('dashboard');
  const [mentors, setMentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [learners, setLearners] = useState<Learner[]>(INITIAL_LEARNERS);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addMentor = (m: Mentor) => setMentors([...mentors, m]);
  const updateMentor = (m: Mentor) => setMentors(mentors.map(prev => prev.id === m.id ? m : prev));
  const deleteMentor = (id: string) => setMentors(mentors.filter(prev => prev.id !== id));

  const addLearner = (l: Learner) => setLearners([...learners, l]);
  const updateLearner = (l: Learner) => setLearners(learners.map(prev => prev.id === l.id ? l : prev));
  const deleteLearner = (id: string) => setLearners(learners.filter(prev => prev.id !== id));

  const assignMentorToLearner = (learnerId: string, mentorId: string) => {
    setLearners(learners.map(l => l.id === learnerId ? { ...l, assignedMentorId: mentorId } : l));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#11111d] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="mb-8">
            <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl shadow-inner">
              🛡️
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">IRON LADY</h1>
            <p className="text-slate-400 font-medium mt-1">Smart Mentor Matchmaker</p>
          </div>
          <div className="space-y-4">
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full bg-[#1e1e2f] hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group"
            >
              Enter Portal
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          <div className="mt-8 p-5 bg-slate-50 rounded-2xl text-[11px] text-slate-500 border border-slate-100 text-left leading-relaxed">
            <p className="font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
              <span className="text-indigo-500 text-lg">💡</span> Note
            </p>
            This portal uses Gemini AI to semantically analyze career paths and match female learners with high-impact industry mentors.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar currentView={view} setView={setView} />
      
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span className="text-slate-300 font-normal">Internal</span>
            <span className="text-slate-200">/</span>
            <span className="text-indigo-600">{view}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">Administrator</p>
              <p className="text-[10px] font-bold text-green-500 flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> SYSTEM ONLINE
              </p>
            </div>
          </div>
        </header>

        <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full">
          {view === 'dashboard' && <Dashboard mentors={mentors} learners={learners} />}
          {view === 'mentors' && (
            <MentorManager 
              mentors={mentors} 
              onAdd={addMentor} 
              onUpdate={updateMentor} 
              onDelete={deleteMentor} 
            />
          )}
          {view === 'learners' && (
            <LearnerManager 
              learners={learners} 
              onAdd={addLearner} 
              onUpdate={updateLearner} 
              onDelete={deleteLearner} 
            />
          )}
          {view === 'matching' && (
            <MatchMaker 
              learners={learners} 
              mentors={mentors} 
              onAssign={assignMentorToLearner} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
