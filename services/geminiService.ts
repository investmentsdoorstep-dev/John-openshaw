
import { GoogleGenAI, Type } from "@google/genai";
import { Verdict } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export interface GeminiVibeResponse {
  score: number;
  verdict: Verdict;
  fix_tip: string;
  insights: {
    lighting: number;
    style: number;
    cleanliness: number;
    grooming: number;
    confidence: number;
    alignment: number;
  };
}

export const analyzeVibe = async (
  imageBase64: string,
  situation: string
): Promise<GeminiVibeResponse> => {
  const prompt = `Analyze this image for the situation: "${situation}". 
  Provide a vibe score from 0-100, a verdict (YES, RISKY, NO), one specific fix tip, 
  and numerical insights (0-100) for lighting, style, cleanliness, grooming, confidence, and situation alignment.
  Be objective and aesthetically critical.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: imageBase64.split(',')[1] || imageBase64
            }
          }
        ]
      }
    ],
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          verdict: { type: Type.STRING, enum: ['YES', 'RISKY', 'NO'] },
          fix_tip: { type: Type.STRING },
          insights: {
            type: Type.OBJECT,
            properties: {
              lighting: { type: Type.NUMBER },
              style: { type: Type.NUMBER },
              cleanliness: { type: Type.NUMBER },
              grooming: { type: Type.NUMBER },
              confidence: { type: Type.NUMBER },
              alignment: { type: Type.NUMBER }
            },
            required: ['lighting', 'style', 'cleanliness', 'grooming', 'confidence', 'alignment']
          }
        },
        required: ['score', 'verdict', 'fix_tip', 'insights']
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
