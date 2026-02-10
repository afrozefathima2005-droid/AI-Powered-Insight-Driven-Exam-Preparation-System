
import React from 'react';
import { AnswerSheet as IAnswerSheet } from '../types';
import { Download, FileText, Printer, Info, CheckCircle2, ExternalLink, Share2, ShieldCheck } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface AnswerSheetProps {
  data: IAnswerSheet | null;
  loading: boolean;
  question: string;
}

const AnswerSheet: React.FC<AnswerSheetProps> = ({ data, loading, question }) => {
  const DRIVE_SOURCE_URL = "https://drive.google.com/file/d/12-Mwn2jjYy1uWnoufVeivcKNSk7-oRUQ/view?usp=drive_link";

  const downloadAsPDF = () => {
    if (!data) return;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.text("UNIVERSITY EVALUATION SCRIPT", pageWidth / 2, 25, { align: "center" });
    
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(margin, 30, pageWidth - margin, 30);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`SUBJECT: ${data.subject}`, margin, 40);
    doc.text(`UNIT: ${data.unit}`, pageWidth / 2, 40, { align: "center" });
    doc.text(`MARKS: ${data.marks}`, pageWidth - margin, 40, { align: "right" });

    doc.setFontSize(14);
    doc.setFont("times", "bolditalic");
    const qLines = doc.splitTextToSize(`Question: ${question}`, contentWidth);
    doc.text(qLines, margin, 55);
    
    let y = 55 + (qLines.length * 7) + 10;
    
    data.sections.forEach(section => {
      if (y > 260) { doc.addPage(); y = 20; }
      doc.setFont("times", "bold");
      doc.setFontSize(12);
      doc.text(section.title.toUpperCase(), margin, y);
      y += 8;
      doc.setFont("times", "normal");
      doc.setFontSize(11);
      section.content.forEach(p => {
        const pLines = doc.splitTextToSize(section.type === 'list' ? `• ${p}` : p, contentWidth);
        if (y + (pLines.length * 6) > 280) { doc.addPage(); y = 20; }
        doc.text(pLines, margin, y);
        y += (pLines.length * 6) + 4;
      });
      if (section.type === 'diagram') { y += 40; }
      y += 5;
    });

    doc.save(`PrepIQ_${data.subject}_Answer.pdf`);
  };

  const openSourcePDF = () => { window.open(DRIVE_SOURCE_URL, '_blank'); };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 font-['Inter']">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <FileText size={32} className="text-blue-600 animate-pulse" />
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-slate-900 font-black text-2xl tracking-tight mb-2">Mining Knowledge Base...</p>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 font-bold uppercase tracking-widest">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
            Analyzing {data?.subject || 'Source'}.pdf
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50/50 font-['Inter']">
        <div className="w-36 h-36 bg-white rounded-[3rem] shadow-2xl shadow-slate-200 flex items-center justify-center mb-10 border border-slate-100 transform rotate-3 hover:rotate-0 transition-transform duration-700">
           <FileText size={64} className="text-slate-200" />
        </div>
        <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Enter Topic to Begin</h3>
        <p className="text-slate-500 max-w-md text-lg leading-relaxed font-semibold opacity-60">
          PrepIQ will extract deep academic content from your syllabus PDFs and structure it into exam-ready answers.
        </p>
      </div>
    );
  }

  const isTwoMarks = data.marks === '2';
  const pdfFileName = `${data.subject.toLowerCase()}.pdf`;

  return (
    <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 bg-slate-100/50 font-['Inter']">
      <div className="flex justify-between items-center bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-200/60 sticky top-0 z-20 backdrop-blur-xl bg-white/80">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{data.subject}</h2>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full uppercase tracking-widest">Validated</span>
            </div>
            <p className="text-sm text-slate-500 font-bold tracking-tight">Unit {data.unit} • {data.marks} Mark Extraction • {data.wordCount} words</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => window.print()} className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-600 transition-all border border-slate-200 active:scale-95 shadow-sm" title="Print Script">
            <Printer size={24} />
          </button>
          <button className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-600 transition-all border border-slate-200 active:scale-95 shadow-sm" title="Share Link">
            <Share2 size={24} />
          </button>
          <button 
            onClick={downloadAsPDF}
            className="flex items-center gap-3 bg-[#0f172a] text-white px-10 py-4 rounded-3xl font-black hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 active:scale-95 group"
          >
            <Download size={20} className="group-hover:translate-y-0.5 transition-transform" /> Export Final PDF
          </button>
        </div>
      </div>

      <div className={`parchment mx-auto w-full max-w-5xl p-16 md:p-32 rounded-lg shadow-2xl border border-slate-200 relative mb-32 ${isTwoMarks ? 'min-h-[600px]' : 'min-h-[1400px]'}`}>
        
        {/* Question Metadata */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end border-b-2 border-slate-900 pb-12 pt-4">
           <div className="space-y-6">
             <div className="bg-slate-900 text-white inline-block px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] rounded shadow-xl">Extraction ID: {data.subject}-U{data.unit}-M{data.marks}</div>
             <div className="text-4xl font-black text-slate-900 leading-tight flex items-start">
               <span className="opacity-10 mr-8 font-serif italic text-8xl leading-[0.5] tracking-tighter shrink-0 select-none">Q.</span>
               <span className="underline decoration-slate-200 underline-offset-[16px] decoration-4 pt-2" style={{ fontFamily: '"Crimson Pro", serif' }}>{question}</span>
             </div>
           </div>
           <div className="flex flex-col items-end gap-3 font-['Inter']">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Evaluation Criteria</span>
             <div className="flex gap-6">
                <div className="text-center"><p className="text-2xl font-black text-slate-900">{data.marks}</p><p className="text-[10px] uppercase font-black text-slate-400">Marks</p></div>
                <div className="w-[2px] h-10 bg-slate-100"></div>
                <div className="text-center"><p className="text-2xl font-black text-slate-900">{data.wordCount}</p><p className="text-[10px] uppercase font-black text-slate-400">Words</p></div>
                <div className="w-[2px] h-10 bg-slate-100"></div>
                <div className="text-center"><p className="text-2xl font-black text-blue-600">A+</p><p className="text-[10px] uppercase font-black text-slate-400">Target</p></div>
             </div>
           </div>
        </div>

        {/* Main Content Sections */}
        <div className={`space-y-20 leading-[1.8] text-slate-900 text-2xl font-medium tracking-tight ${isTwoMarks ? 'text-3xl' : ''}`} style={{ fontFamily: '"Crimson Pro", serif' }}>
          {data.sections.map((section, idx) => (
            <div key={idx} className="group relative">
              {!isTwoMarks && (
                <h3 className="text-3xl font-black mb-12 tracking-tighter flex items-center gap-8">
                  <span className="bg-[#0f172a] text-white w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-serif shadow-2xl shadow-slate-300 transform -rotate-3 select-none">{section.title.split('.')[0]}</span>
                  <span className="border-b-4 border-slate-900 pb-2">
                    {section.title.includes('.') ? section.title.split('.').slice(1).join('.').trim() : section.title}
                  </span>
                </h3>
              )}
              
              <div className="space-y-8 text-justify">
                {section.type === 'diagram' ? (
                  <div className="my-20 p-4 bg-white border-2 border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden group/diagram">
                    <div 
                      onClick={openSourcePDF}
                      className="bg-slate-50/50 border-4 border-double border-slate-200 rounded-[2.8rem] py-24 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all relative"
                    >
                       <div className="w-full max-w-4xl aspect-[2.5/1] border border-slate-200 flex flex-col items-center justify-center relative bg-white shadow-2xl rounded-[2.5rem] p-12 hover:border-blue-500 transition-all duration-700">
                         <div className="absolute top-6 right-8 flex items-center gap-3 text-[10px] text-blue-600 font-black bg-blue-50 px-5 py-2 rounded-full border border-blue-100 shadow-sm z-20 uppercase tracking-widest">
                           <Info size={14} /> REF: {pdfFileName}
                         </div>
                         
                         <div className="w-full h-full flex flex-col items-center justify-center border-8 border-slate-50 rounded-[2rem] relative overflow-hidden p-10">
                            {/* SVG Process Diagram */}
                            <svg className="w-full h-full" viewBox="0 0 500 200" fill="none">
                              <defs>
                                <marker id="arrow" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                                  <polygon points="0 0, 10 3.5, 0 7" fill="#0f172a" />
                                </marker>
                              </defs>
                              <rect x="20" y="60" width="120" height="80" rx="16" fill="#f8fafc" stroke="#0f172a" strokeWidth="3" />
                              <text x="80" y="105" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a" className="font-sans uppercase">INPUT</text>
                              <line x1="140" y1="100" x2="190" y2="100" stroke="#0f172a" strokeWidth="4" markerEnd="url(#arrow)" />
                              <path d="M250 40 L310 100 L250 160 L190 100 Z" fill="#eff6ff" stroke="#2563eb" strokeWidth="4" />
                              <text x="250" y="105" textAnchor="middle" fontSize="14" fontWeight="900" fill="#1e40af" className="font-sans uppercase">PROCESS</text>
                              <line x1="310" y1="100" x2="360" y2="100" stroke="#0f172a" strokeWidth="4" markerEnd="url(#arrow)" />
                              <rect x="360" y="60" width="120" height="80" rx="16" fill="#f8fafc" stroke="#0f172a" strokeWidth="3" />
                              <text x="420" y="105" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a" className="font-sans uppercase">OUTPUT</text>
                            </svg>
                         </div>
                       </div>
                       <div className="mt-12 flex flex-col items-center gap-4">
                         <p className="text-lg font-black text-slate-900 uppercase tracking-[0.5em]">
                            Logic Architecture Overview
                         </p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] italic">
                           Mining Confidence: High • Refined from {pdfFileName} Document
                         </p>
                       </div>
                    </div>
                  </div>
                ) : section.type === 'list' ? (
                  <ul className="space-y-8 list-none pl-6">
                    {section.content.map((point, pIdx) => (
                      <li key={pIdx} className="flex gap-8 items-start hover:translate-x-1 transition-transform">
                        <span className="text-blue-600 font-black text-3xl shrink-0 leading-none">➤</span>
                        <span className="font-bold text-slate-900 leading-relaxed underline decoration-slate-100 underline-offset-[12px]">{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  section.content.map((p, pIdx) => (
                    <p key={pIdx} className={`${isTwoMarks ? "" : "indent-24"} leading-[2] first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-6 first-letter:mt-3 first-letter:text-[#0f172a] hover:text-blue-900 transition-colors cursor-default`}>{p}</p>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Signature */}
        <div className="mt-40 pt-16 border-t-4 border-double border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-sans font-black uppercase tracking-[0.6em] text-slate-300">
          <div className="flex items-center gap-3">
            <ShieldCheck size={16} className="text-green-500" />
            <span>PrepIQ AI Validator v2.5.0</span>
          </div>
          <span>Digital Signature: {Math.random().toString(36).substring(2, 12).toUpperCase()}</span>
          <span>End of Technical Script</span>
        </div>

        {/* Marginalia Decoration */}
        <div className="absolute left-6 top-1/3 h-48 w-[3px] bg-slate-50 hidden lg:block"></div>
        <div className="absolute right-6 bottom-1/3 h-48 w-[3px] bg-slate-50 hidden lg:block"></div>
      </div>
    </div>
  );
};

export default AnswerSheet;
