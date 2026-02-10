
import React from 'react';
import { SUBJECTS } from '../constants';
import { SubjectCode, MarkCategory } from '../types';
import { BookOpen, Layers, Award, CloudCheck, HardDrive } from 'lucide-react';

interface SidebarProps {
  activeSubject: SubjectCode;
  setActiveSubject: (code: SubjectCode) => void;
  activeUnit: number;
  setActiveUnit: (unit: number) => void;
  activeMarks: MarkCategory;
  setActiveMarks: (marks: MarkCategory) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSubject,
  setActiveSubject,
  activeUnit,
  setActiveUnit,
  activeMarks,
  setActiveMarks
}) => {
  return (
    <div className="w-80 bg-[#0f172a] text-white p-6 flex flex-col gap-8 h-screen sticky top-0 border-r border-slate-800">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">P</div>
          <h1 className="text-2xl font-bold tracking-tight">Prep<span className="text-blue-400">IQ</span></h1>
        </div>
        <div title="Drive Connected" className="text-green-400">
          <CloudCheck size={18} />
        </div>
      </div>

      <section>
        <label className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <BookOpen size={14} /> Subject Selection
        </label>
        <select 
          value={activeSubject}
          onChange={(e) => setActiveSubject(e.target.value as SubjectCode)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer hover:bg-slate-800"
        >
          {SUBJECTS.map(s => (
            <option key={s.code} value={s.code}>{s.code}: {s.name}</option>
          ))}
        </select>
        <div className="mt-2 flex items-center gap-2 text-[10px] text-blue-400 font-mono font-bold bg-blue-900/20 px-2 py-1 rounded">
          <HardDrive size={10} /> source: {activeSubject.toLowerCase()}.pdf
        </div>
      </section>

      <section>
        <label className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Layers size={14} /> Unit Navigator
        </label>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map(unit => (
            <button
              key={unit}
              onClick={() => setActiveUnit(unit)}
              className={`h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                activeUnit === unit 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              U{unit}
            </button>
          ))}
        </div>
      </section>

      <section>
        <label className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Award size={14} /> Mark Category
        </label>
        <div className="flex flex-col gap-2">
          {(['2', '8', '16'] as MarkCategory[]).map(mark => (
            <button
              key={mark}
              onClick={() => setActiveMarks(mark)}
              className={`w-full py-3 px-4 rounded-lg text-left text-sm font-medium flex justify-between items-center transition-all ${
                activeMarks === mark 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex flex-col">
                <span>{mark} Marks</span>
                <span className="text-[10px] text-slate-500 font-normal">
                  {mark === '16' ? '400-600 words' : mark === '2' ? '40-60 words' : '200-300 words'}
                </span>
              </div>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                activeMarks === mark ? 'bg-blue-500/50' : 'bg-slate-800'
              }`}>
                {mark === '2' ? 'Short' : mark === '8' ? 'Mid' : 'Detailed'}
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">AF</div>
          <div>
            <p className="text-sm font-medium">Afroze Fathima</p>
            <p className="text-[10px] text-slate-500">Folder: Afroze Fathima</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
