
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getWellnessAdvice = async (userQuery: string) => {
  const productList = PRODUCTS.map(p => `${p.name}: ${p.description}`).join('\n');
  
  const systemInstruction = `
    You are a professional DXN Wellness Consultant. 
    Your goal is to provide helpful, evidence-based wellness advice and recommend specific DXN products from the list provided below.
    Always be polite, encouraging, and clear. 
    If a user mentions a specific health concern, suggest relevant products but include a disclaimer that you are an AI and they should consult a doctor.
    
    Available DXN Products:
    ${productList}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate advice at the moment. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error: Could not connect to the wellness AI. Please check your connection.";
  }
};
