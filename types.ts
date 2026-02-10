
export type SubjectCode = 'CCS370' | 'CCW331' | 'CCS340' | 'OEE351' | 'CCS345' | 'CS3691';

export interface Subject {
  code: SubjectCode;
  name: string;
}

export type MarkCategory = '2' | '8' | '16';

export interface AnswerSection {
  title: string;
  content: string[];
  type: 'text' | 'list' | 'diagram' | 'case-study';
}

export interface AnswerSheet {
  subject: string;
  unit: number;
  marks: MarkCategory;
  question: string;
  sections: AnswerSection[];
  wordCount: number;
}

export interface PYQData {
  question: string;
  frequency: number;
  unit: number;
  tag?: string;
  expectedDate?: string;
}

export interface PerformanceStats {
  accuracy: number;
  weakArea: string;
  completion: number;
}
