import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: 'User message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        ...messages.map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: "You are a highly knowledgeable financial expert specializing in Indian Mutual Funds. Your tone is professional, helpful, and easy to understand. You provide clear explanations for terms like SIP, STP, SWP, Index Funds, Large Cap, Mid Cap, Small Cap, and more. Always encourage disciplined investing and mention that mutual fund investments are subject to market risks.",
      },
    });

    const text = response.text || "I'm sorry, I couldn't process that. Could you please try again?";
    return res.status(200).json({ text });
  } catch (error: any) {
    console.error("AI Chat API Error:", error);
    return res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
}
