
import React, { useState } from 'react';
import { ShieldCheck, Zap, ArrowRight, GraduationCap, Lock, Mail } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validation would happen here
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 overflow-hidden relative font-['Inter']">
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
              <p className="text-slate-400 text-xl leading-relaxed max-w-md font-medium">
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
             <span className="text-sm font-bold">Join 2,400+ students from your department</span>
          </div>
        </div>

        {/* Right Side: Student Login Form */}
        <div className="p-10 lg:p-20 bg-white flex flex-col justify-center">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
              <GraduationCap size={14} /> Student Access
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Login to Dashboard</h3>
            <p className="text-slate-500 font-bold text-lg">Enter your university credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. afroze.f@university.edu"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:font-bold placeholder:text-slate-300"
                />
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

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-2xl shadow-blue-600/30 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group mt-2 overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-2">
                Launch Dashboard
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_100%] animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-[1px] bg-slate-100"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Or</span>
            <div className="flex-1 h-[1px] bg-slate-100"></div>
          </div>

          <button 
            onClick={onLogin}
            className="w-full bg-white border-2 border-slate-100 py-4 rounded-2xl flex items-center justify-center gap-3 text-slate-600 font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98] group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"/>
              <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853"/>
              <path d="M5.50254 14.3003C5.25363 13.5543 5.11696 12.7631 5.11696 11.9999C5.11696 11.2367 5.25363 10.4455 5.50254 9.69951V6.60858H1.51659C0.672491 8.28118 0.199951 10.125 0.199951 11.9999C0.199951 13.8748 0.672491 15.7186 1.51659 17.3912L5.50254 14.3003Z" fill="#FBBC05"/>
              <path d="M12.2401 4.74966C14.0074 4.74966 15.5951 5.35651 16.8407 6.54867L20.2739 3.11543C18.1971 1.17832 15.4678 0 12.2401 0C7.7029 0 3.55371 2.55734 1.5166 6.60858L5.50705 9.69951C6.45946 6.85989 9.11388 4.74966 12.2401 4.74966Z" fill="#EA4335"/>
            </svg>
            <span className="group-hover:text-slate-900 transition-colors">Continue with Google</span>
          </button>

          <div className="mt-10 text-center">
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
