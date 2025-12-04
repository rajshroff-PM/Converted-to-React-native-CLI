import { GoogleGenAI, Chat, FunctionDeclaration, Type } from "@google/genai";
import { MALL_STORES } from '../constants';
import { ChatSource, Store } from '../types';

// Mock API Key for demo purposes
const API_KEY = "MOCK_API_KEY"; 
const ai = new GoogleGenAI({ apiKey: API_KEY });

const findStoreTool: FunctionDeclaration = {
  name: "findStore",
  description: "Find a store in the mall database.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: { type: Type.STRING, description: "Store name or category." }
    },
    required: ["query"]
  }
};

const SYSTEM_INSTRUCTION = `You are a helpful shopping assistant for Amanora Mall.`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ functionDeclarations: [findStoreTool] }],
      },
    });
  }
  return chatSession;
};

interface GeminiResponse {
  text: string;
  sources: ChatSource[];
  relatedStore?: Store;
}

export const sendMessageToGemini = async (message: string): Promise<GeminiResponse> => {
  try {
    // Mock response for demo since we don't have a real API key in this context
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerMsg = message.toLowerCase();
    let relatedStore: Store | undefined;
    let text = "I can help you with that!";

    if (lowerMsg.includes('nike')) {
        relatedStore = MALL_STORES.find(s => s.name === 'Nike');
        text = "Nike is located on the 2nd Floor. They have a 20% off sale right now!";
    } else if (lowerMsg.includes('coffee') || lowerMsg.includes('starbucks')) {
        relatedStore = MALL_STORES.find(s => s.name === 'Starbucks');
        text = "Starbucks is on the Ground Floor. Perfect for a coffee break.";
    } else {
        text = "I'm an AI assistant. Ask me about stores like Nike, Starbucks, or Pizza Hut!";
    }

    return { text, sources: [], relatedStore };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "I'm having trouble connecting right now.", sources: [] };
  }
};

export const searchWithImage = async (base64Image: string): Promise<string> => {
  return "Shoes"; // Mock
};

export const getAiItinerary = async (prompt: string): Promise<string[]> => {
  return ['1', '6', '3']; // Mock store IDs
};