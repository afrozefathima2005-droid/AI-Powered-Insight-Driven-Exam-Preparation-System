
import { GoogleGenAI, Type } from "@google/genai";
import { MarkCategory, SubjectCode } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAnswer = async (
  subject: SubjectCode,
  unit: number,
  marks: MarkCategory,
  question: string
) => {
  const model = 'gemini-3-pro-preview';
  
  const sourceFile = `${subject.toLowerCase()}.pdf`;
  
  const systemPrompt = `You are PrepIQ AI, an Academic Extraction Engine. Source: ${sourceFile}.
  Subject: ${subject} | Unit: ${unit} | Marks: ${marks}
  
  SPECIFIC CONSTRAINTS:
  1. For 2 marks: PROVIDE ONLY A CONCISE DEFINITION. Length: 30-50 words. No fluff. Just the core technical meaning.
  2. For 16 marks: Provide 400-500 words (concise but deep). Include a section for a diagram.
  3. For 8 marks: Provide 150-250 words.
  
  STRUCTURE (Roman Numerals):
  I. INTRODUCTION / DEFINITION: Core concept from ${sourceFile}.
  II. KEY STAGES/COMPONENTS (If applicable): Use Bullet Points (➤).
  III. PROCESS DIAGRAM: Describe a technical diagram or flowchart found in the PDF for this topic. Provide a CLEAR step-by-step logic summary (e.g., Input -> Process -> Decision -> Output).
  IV. CASE STUDY / TECHNICAL EXAMPLE: One specific instance from the notes.
  V. CONCLUSION.
  
  NOTE: For 2 marks, return only Section I.
  Sanitization: Remove all watermarks and web URLs (e.g., EnggTree.com).
  Return JSON format.`;

  const response = await ai.models.generateContent({
    model,
    contents: `Question: ${question}`,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                content: { type: Type.ARRAY, items: { type: Type.STRING } },
                type: { type: Type.STRING, enum: ['text', 'list', 'diagram', 'case-study'] }
              },
              required: ["title", "content", "type"]
            }
          },
          wordCount: { type: Type.NUMBER }
        },
        required: ["sections", "wordCount"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const getPYQTrends = async (subject: SubjectCode, unit: number) => {
  const model = 'gemini-3-flash-preview';
  const pyqFile = `${subject.toLowerCase()} pyq.pdf`;
  
  const prompt = `Scan ${pyqFile} for ${subject} Unit ${unit}. 
  Identify 3-5 frequent exam questions. 
  Tag them as "Repeated Question" or "Expected for Nov 2026".`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            frequency: { type: Type.NUMBER },
            tag: { type: Type.STRING }
          },
          required: ["question", "frequency", "tag"]
        }
      }
    }
  });

  return JSON.parse(response.text);
};
