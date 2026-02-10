
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import AnswerSheet from './components/AnswerSheet';
import Analytics from './components/Analytics';
import LoginPage from './components/LoginPage';
import { SubjectCode, MarkCategory, AnswerSheet as IAnswerSheet, PYQData, PerformanceStats } from './types';
import { generateAnswer, getPYQTrends } from './services/geminiService';
import { Search, Sparkles, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSubject, setActiveSubject] = useState<SubjectCode>('CCS370');
  const [activeUnit, setActiveUnit] = useState<number>(1);
  const [activeMarks, setActiveMarks] = useState<MarkCategory>('16');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [answerData, setAnswerData] = useState<IAnswerSheet | null>(null);
  const [pyqData, setPyqData] = useState<PYQData[]>([]);
  const [loading, setLoading] = useState(false);
  const [pyqLoading, setPyqLoading] = useState(false);

  const [performance] = useState<PerformanceStats>({
    accuracy: 82,
    weakArea: 'II. Unit 4: System Architecture flows',
    completion: 65
  });

  const handleGenerate = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await generateAnswer(activeSubject, activeUnit, activeMarks, query);
      setAnswerData({
        ...data,
        subject: activeSubject,
        unit: activeUnit,
        marks: activeMarks,
        question: query
      });
    } catch (error) {
      console.error('Error generating answer:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPYQ = useCallback(async () => {
    if (!isLoggedIn) return;
    setPyqLoading(true);
    try {
      const data = await getPYQTrends(activeSubject, activeUnit);
      setPyqData(data);
    } catch (error) {
      console.error('Error fetching PYQ:', error);
    } finally {
      setPyqLoading(false);
    }
  }, [activeSubject, activeUnit, isLoggedIn]);

  useEffect(() => {
    fetchPYQ();
  }, [fetchPYQ]);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <Sidebar 
        activeSubject={activeSubject}
        setActiveSubject={setActiveSubject}
        activeUnit={activeUnit}
        setActiveUnit={setActiveUnit}
        activeMarks={activeMarks}
        setActiveMarks={setActiveMarks}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex-1 max-w-2xl relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder={`Search in ${activeSubject.toLowerCase()}.pdf...`}
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 pl-12 pr-28 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400 shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate(searchQuery)}
            />
            <button 
              onClick={() => handleGenerate(searchQuery)}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              <Sparkles size={14} /> Extract
            </button>
          </div>
          <div className="ml-8 flex items-center gap-4">
             <div className="flex flex-col items-end">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Knowledge Base</span>
               <span className="text-xs font-bold text-blue-600">Active Session</span>
             </div>
             <div className="h-10 w-[1px] bg-slate-200 mx-2"></div>
             <button 
              onClick={() => setIsLoggedIn(false)}
              className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-red-500 transition-all"
             >
               <LogOut size={20} />
             </button>
          </div>
        </header>

        <AnswerSheet 
          data={answerData} 
          loading={loading}
          question={answerData?.question || searchQuery}
        />
      </main>

      <Analytics 
        pyqData={pyqData}
        performance={performance}
        loading={pyqLoading}
        subjectCode={activeSubject}
      />
    </div>
  );
};

export default App;
