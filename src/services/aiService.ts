import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface WaterInsight {
  title: string;
  recommendation: string;
  potentialSavings: string;
  urgency: "low" | "medium" | "high";
}

export async function getWaterInsights(usageData: number[], isEmergency: boolean = false): Promise<WaterInsight[]> {
  if (!process.env.GEMINI_API_KEY) {
    return [{
       title: "AI Analysis Offline",
       recommendation: "Please configure your GEMINI_API_KEY to see intelligent insights.",
       potentialSavings: "0%",
       urgency: isEmergency ? "high" : "low"
    }];
  }

  try {
    const prompt = `Analyze this weekly water usage data (gallons per day): [${usageData.join(", ")}]. 
    ${isEmergency ? "ALERT: The system is in CRITICAL EMERGENCY WATER SHORTAGE MODE. Provide survival and extreme conservation strategies." : "Provide 3 actionable insights to save water."}
    Return the response as a JSON array of objects with keys: title, recommendation, potentialSavings, urgency.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              recommendation: { type: Type.STRING },
              potentialSavings: { type: Type.STRING },
              urgency: { type: Type.STRING, enum: ["low", "medium", "high"] }
            },
            required: ["title", "recommendation", "potentialSavings", "urgency"]
          }
        }
      }
    });

    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
}
