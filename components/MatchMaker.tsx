
import React, { useState } from 'react';
import { Learner, Mentor, MatchResult } from '../types';
import { getSmartMatches } from '../services/geminiService';

interface Props {
  learners: Learner[];
  mentors: Mentor[];
  onAssign: (lId: string, mId: string) => void;
}

const MatchMaker: React.FC<Props> = ({ learners, mentors, onAssign }) => {
  const [selectedLearner, setSelectedLearner] = useState<Learner | null>(null);
  const [isMatching, setIsMatching] = useState(false);
  const [matches, setMatches] = useState<MatchResult[]>([]);

  const runAiMatching = async () => {
    if (!selectedLearner) return;
    setIsMatching(true);
    const results = await getSmartMatches(selectedLearner, mentors);
    setMatches(results);
    setIsMatching(false);
  };

  const pendingLearners = learners.filter(l => !l.assignedMentorId);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="bg-[#1e1e2f] p-12 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔮</span>
            <span className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">Neural Engine Active</span>
          </div>
          <h2 className="text-4xl font-black mb-4 tracking-tight">AI Semantic Matchmaker</h2>
          <p className="text-indigo-200/80 max-w-2xl text-lg font-medium leading-relaxed">
            Pairing is no longer a manual chore. Our AI analyzes the nuance of career trajectories, 
            pivots, and cultural alignment to find the 1% most compatible mentors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Selection Column */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> 1. Select Unmatched Learner
          </h3>
          <div className="space-y-3">
            {pendingLearners.map(l => (
              <button
                key={l.id}
                onClick={() => { setSelectedLearner(l); setMatches([]); }}
                className={`w-full p-6 rounded-[2rem] text-left transition-all border-2 ${
                  selectedLearner?.id === l.id 
                    ? 'border-indigo-600 bg-white shadow-2xl shadow-indigo-100 scale-[1.03] z-10' 
                    : 'border-white bg-white hover:border-slate-100 shadow-sm'
                }`}
              >
                <div className="font-black text-slate-900 text-lg mb-1">{l.name}</div>
                <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{l.currentRole}</div>
              </button>
            ))}
            {pendingLearners.length === 0 && (
              <div className="p-10 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold italic">Perfect! All learners matched.</p>
              </div>
            )}
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> 2. AI Recommendation Results
          </h3>
          
          {!selectedLearner ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-50 rounded-[3rem] text-slate-400 border-2 border-dashed border-slate-200">
              <div className="text-5xl mb-6 grayscale opacity-50">🤖</div>
              <p className="font-bold">Awaiting Input Module...</p>
              <p className="text-sm mt-2">Select a learner to begin semantic analysis.</p>
            </div>
          ) : (
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-8 border-b border-slate-50">
                <div>
                  <h4 className="font-black text-2xl text-slate-900 tracking-tight">{selectedLearner.name}'s Focus</h4>
                  <p className="text-sm text-slate-500 font-medium mt-1">Analyzing alignment for: {selectedLearner.careerGoals}</p>
                </div>
                <button 
                  onClick={runAiMatching}
                  disabled={isMatching}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 disabled:opacity-50 transition-all flex items-center gap-3 active:scale-95"
                >
                  {isMatching ? (
                    <>
                      <span className="animate-spin text-xl">◌</span>
                      ANALYZING...
                    </>
                  ) : (
                    <>
                      <span className="text-xl">⚡</span>
                      GENERATE TOP MATCHES
                    </>
                  )}
                </button>
              </div>

              {isMatching && (
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-24 bg-slate-50 rounded-2xl animate-pulse"></div>
                  ))}
                </div>
              )}

              {matches.length > 0 && !isMatching && (
                <div className="space-y-6">
                  {matches.map((match, idx) => {
                    const mentor = mentors.find(m => m.id === match.mentorId);
                    if (!mentor) return null;
                    return (
                      <div key={idx} className="p-8 rounded-[2.5rem] border border-slate-100 bg-white hover:border-indigo-200 hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row gap-6 items-center">
                        <div className="flex flex-col items-center justify-center min-w-[100px] h-[100px] bg-indigo-600 rounded-[1.5rem] text-white shadow-lg shadow-indigo-100">
                          <span className="text-3xl font-black">{match.score}</span>
                          <span className="text-[9px] font-black uppercase tracking-widest opacity-80">Match %</span>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-3">
                            <div>
                              <h5 className="font-black text-xl text-slate-900">{mentor.name}</h5>
                              <p className="text-xs font-black text-indigo-500 uppercase tracking-widest">{mentor.currentTitle}</p>
                            </div>
                            <button 
                              onClick={() => { onAssign(selectedLearner.id, mentor.id); setMatches([]); setSelectedLearner(null); }}
                              className="bg-[#1e1e2f] hover:bg-black text-white px-6 py-3 rounded-xl text-[11px] font-black transition-all shadow-lg"
                            >
                              CONFIRM MATCH
                            </button>
                          </div>
                          <p className="text-sm text-slate-600 font-medium italic leading-relaxed">"{match.reason}"</p>
                          <div className="mt-4 flex gap-2 flex-wrap justify-center md:justify-start">
                            {mentor.expertise.map(e => (
                              <span key={e} className="text-[9px] font-black uppercase bg-slate-50 border border-slate-100 px-3 py-1 rounded-full text-slate-400">
                                {e}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchMaker;
