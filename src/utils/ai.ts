
import { GoogleGenAI } from "@google/genai";

export const generateWithAI = async (prompt: string, onStatusUpdate?: (msg: string) => void): Promise<string> => {
  if (typeof window !== 'undefined' && (window as any).aistudio) {
    try {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        onStatusUpdate?.("API Key Required.");
        await (window as any).aistudio.openSelectKey();
      }
    } catch (e) {
      console.warn("Key selection error", e);
    }
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    const text = response.text;
    if (!text) throw new Error("No response from AI engine.");
    return text;
  } catch (err: any) {
    console.error("AI Generation Error:", err);
    if (err.message?.includes("Requested entity was not found.") && typeof window !== 'undefined' && (window as any).aistudio) {
        await (window as any).aistudio.openSelectKey();
    }
    throw err;
  }
};
