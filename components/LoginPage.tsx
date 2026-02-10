
import React, { useState } from 'react';
import { ShieldCheck, Zap, ArrowRight, GraduationCap, User, Lock, Hash, Calendar } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [batch, setBatch] = useState('2024-28');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validation would happen here
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]"></div>
      
      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden relative z-10 border border-white/10">
        
        {/* Left Side: Student Benefits & Branding */}
        <div className="bg-[#0f172a] p-10 lg:p-16 text-white hidden lg:flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-16">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-3xl shadow-2xl shadow-blue-600/40 transform -rotate-3 hover:rotate-0 transition-transform cursor-default">P</div>
              <h1 className="text-4xl font-black tracking-tighter">Prep<span className="text-blue-500">IQ</span></h1>
            </div>

            <div className="space-y-10">
              <h2 className="text-5xl font-extrabold leading-[1.1] tracking-tight">
                Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Knowledge</span> Portal.
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed max-w-md">
                Accelerate your university exam preparation with AI-curated answers directly from your department syllabus.
              </p>

              <div className="grid gap-8">
                <div className="flex items-start gap-5 group">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Syllabus-Aligned</h4>
                    <p className="text-sm text-slate-500 text-justify leading-relaxed">Every answer is cross-referenced with your specific subject PDF to ensure 100% academic accuracy.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5 group">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">One-Click Extraction</h4>
                    <p className="text-sm text-slate-500 text-justify leading-relaxed">No more hunting through pages. Get 2, 8, or 16-mark structured responses in seconds.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex items-center gap-4 text-slate-500">
             <div className="flex -space-x-2">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-slate-800 flex items-center justify-center text-[10px] font-bold">U{i}</div>
               ))}
             </div>
             <span className="text-sm font-medium">Join 2,400+ students from your department</span>
          </div>
        </div>

        {/* Right Side: Student Login Form */}
        <div className="p-10 lg:p-20 bg-white flex flex-col justify-center">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <GraduationCap size={14} /> Student Access
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Login to Dashboard</h3>
            <p className="text-slate-500 font-medium text-lg">Enter your university credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Registration Number</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Hash size={18} />
                </div>
                <input 
                  type="text" 
                  required
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  placeholder="e.g. 211221104001"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:font-medium placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Batch</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Calendar size={18} />
                  </div>
                  <select 
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-bold appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  >
                    <option value="2021-25">2021-25</option>
                    <option value="2022-26">2022-26</option>
                    <option value="2023-27">2023-27</option>
                    <option value="2024-28">2024-28</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-2xl shadow-blue-600/30 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group mt-4 overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-2">
                Launch Dashboard
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_100%] animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-400 font-bold text-sm">
              New student? <a href="#" className="text-blue-600 hover:text-blue-700 underline decoration-blue-600/30 underline-offset-4">Register with Department ID</a>
            </p>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
