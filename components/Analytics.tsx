
import React from 'react';
import { PYQData, PerformanceStats } from '../types';
import { TrendingUp, Activity, Target, Flame, FileSearch } from 'lucide-react';
import { 
  AreaChart, Area, Tooltip, ResponsiveContainer
} from 'recharts';

interface AnalyticsProps {
  pyqData: PYQData[];
  performance: PerformanceStats;
  loading: boolean;
  subjectCode: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ pyqData, performance, loading, subjectCode }) => {
  const chartData = [
    { name: 'Mon', score: 65 },
    { name: 'Tue', score: 72 },
    { name: 'Wed', score: 85 },
    { name: 'Thu', score: 78 },
    { name: 'Fri', score: 92 },
  ];

  return (
    <div className="w-96 bg-white border-l border-slate-200 p-6 flex flex-col gap-8 h-screen sticky top-0 overflow-y-auto font-['Inter']">
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600" /> PYQ Trends
            </h2>
            <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-wider">Source: {subjectCode.toLowerCase()} pyq.pdf</p>
          </div>
          <span className="text-[10px] bg-blue-50 text-blue-600 font-black px-2 py-1 rounded border border-blue-100 flex items-center gap-1">
            <FileSearch size={10} /> LIVE ANALYSIS
          </span>
        </div>

        <div className="space-y-3">
          {loading ? (
            [1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-50 rounded-2xl animate-pulse" />)
          ) : pyqData.length > 0 ? (
            pyqData.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all group cursor-pointer shadow-sm hover:shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-widest ${
                    item.frequency > 2 ? 'bg-orange-100 text-orange-600 border border-orange-200' : 'bg-blue-100 text-blue-600 border border-blue-200'
                  }`}>
                    {item.tag === 'University Favorite' ? 'Repeated Question' : (item.tag || (item.frequency > 2 ? 'Repeated Question' : 'Expected'))}
                  </span>
                  <div className="flex items-center gap-1">
                    <Flame size={12} className={item.frequency > 2 ? 'text-orange-500' : 'text-slate-300'} />
                    <span className="text-xs font-black text-slate-500">{item.frequency}x</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-slate-700 leading-tight group-hover:text-blue-700">{item.question}</p>
              </div>
            ))
          ) : (
            <div className="p-10 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-sm text-slate-400 font-medium italic">Select subject to scan archive</p>
            </div>
          )}
        </div>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
          <Activity size={20} className="text-blue-600" /> Performance Metrics
        </h2>
        
        <div className="bg-[#0f172a] p-6 rounded-[2rem] text-white shadow-2xl mb-6 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px]"></div>
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Overall Accuracy</p>
              <h3 className="text-5xl font-black mt-1 tracking-tighter">{performance.accuracy}%</h3>
            </div>
            <div className="w-16 h-16 relative">
               <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-700" />
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 * (1 - performance.accuracy/100)} className="text-blue-500" />
               </svg>
            </div>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                <span className="text-slate-400">Critical: Unit {Math.floor(Math.random() * 5) + 1}</span>
                <span className="text-red-400 animate-pulse">Low Confidence</span>
              </div>
              <div className="bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full w-[35%]"></div>
              </div>
              <p className="text-[10px] mt-3 font-bold text-slate-500 uppercase tracking-wider">{performance.weakArea}</p>
            </div>
          </div>
        </div>

        <div className="h-44">
          <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.3em]">Mastery Timeline</p>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="score" stroke="#3b82f6" fillOpacity={1} fill="url(#colorScore)" strokeWidth={4} />
              <Tooltip 
                contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="mt-auto bg-blue-50 p-5 rounded-3xl border border-blue-100 flex items-center gap-4">
        <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
          <Target size={22} />
        </div>
        <div>
          <p className="text-sm font-black text-slate-800 tracking-tight">Ready for Assessment?</p>
          <button className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] hover:tracking-[0.25em] transition-all">Start Exam Simulation →</button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
