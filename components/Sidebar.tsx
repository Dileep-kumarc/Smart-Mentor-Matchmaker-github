
import React from 'react';

interface SidebarProps {
  currentView: string;
  setView: (view: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Command Center', icon: '⚡' },
    { id: 'mentors', label: 'Mentor Directory', icon: '👤' },
    { id: 'learners', label: 'Enrollment Hub', icon: '🌟' },
    { id: 'matching', label: 'AI Engine', icon: '🔮' },
  ];

  return (
    <aside className="w-72 bg-[#1e1e2f] flex flex-col h-screen sticky top-0 shadow-2xl">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-indigo-900/40">
            🛡️
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">IRON LADY</h1>
            <p className="text-[10px] font-bold text-indigo-400/60 uppercase tracking-widest">Global Operations</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group ${
              currentView === item.id
                ? 'bg-gradient-to-r from-indigo-600/20 to-indigo-500/10 text-white border-l-4 border-indigo-500'
                : 'text-slate-400 hover:text-indigo-300 hover:bg-white/5'
            }`}
          >
            <span className={`transition-transform duration-300 ${currentView === item.id ? 'scale-125' : 'group-hover:scale-110 opacity-70'}`}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-6">
        <div className="p-5 rounded-[2rem] bg-indigo-600/10 border border-indigo-500/20 text-center">
          <p className="text-indigo-300 text-[11px] font-bold mb-3 uppercase tracking-wider">AI System Version</p>
          <div className="text-white text-xs font-mono font-bold bg-[#11111d] py-2 rounded-xl">
            V 2.5-FLASH-STABLE
          </div>
        </div>
        
        <div className="mt-8 flex items-center gap-4 px-2">
          <div className="w-12 h-12 rounded-full border-2 border-indigo-500/30 p-1">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="w-full h-full rounded-full" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">System Admin</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Log out</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
