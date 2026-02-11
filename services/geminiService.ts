
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysis } from "../types";

const API_KEY = process.env.API_KEY || '';

export const analyzeVideoContent = async (title: string, description: string): Promise<AIAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following video metadata and provide insights. 
    Title: ${title}
    Description: ${description}
    
    Please provide:
    1. A concise summary.
    2. 5 relevant SEO tags.
    3. 3-5 logical chapters or timestamps.
    4. General sentiment of the content.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          suggestedTags: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          potentialChapters: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          sentiment: { type: Type.STRING }
        },
        required: ["summary", "suggestedTags", "potentialChapters", "sentiment"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const chatWithVideo = async (query: string, videoContext: string, history: { role: 'user' | 'model', text: string }[]) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are an expert video analyst for VidiGenius. Use the following video context to answer user questions: ${videoContext}`
    }
  });

  const response = await chat.sendMessage({ message: query });
  return response.text;
};
