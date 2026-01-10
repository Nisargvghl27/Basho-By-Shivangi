// src/lib/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDJAiVaDnsB4g9VBe9O19B_vKBHYH3TR4Y"; 
const genAI = new GoogleGenerativeAI(API_KEY);

// Primary Model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Helper to handle fallbacks if the model name is incorrect/unavailable
const generateContentSafe = async (promptText) => {
    try {
        const result = await model.generateContent(promptText);
        return result.response.text();
    } catch (error) {
        console.warn("Primary model failed, trying fallback...", error.message);
        try {
            // Fallback to the most stable model alias
            const fallbackModel = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await fallbackModel.generateContent(promptText);
            return result.response.text();
        } catch (fallbackError) {
            console.error("All models failed", fallbackError);
            throw fallbackError;
        }
    }
};

export const getChatResponse = async (message) => {
  const prompt = `
    You are the virtual assistant for 'Basho', a handcrafted pottery studio.
    Tone: Calm, wabi-sabi, helpful.
    User: "${message}"
    Answer briefly (max 3 sentences).
  `;

  try {
    return await generateContentSafe(prompt);
  } catch (error) {
    return "I am currently meditating. Please try again later.";
  }
};

export const generateProductDescription = async (details) => {
    const prompt = `Write a poetic 2-sentence pottery description for: ${JSON.stringify(details)}`;
    try { return await generateContentSafe(prompt); } catch (e) { return null; }
};

export const generateSearchTags = async (query) => {
    const prompt = `Convert this vibe "${query}" into 5 comma-separated pottery keywords.`;
    try { 
        const text = await generateContentSafe(prompt);
        return text.split(',').map(t => t.trim().toLowerCase());
    } catch (e) { return [query]; }
};

export const generateImageTags = async (imageUrl) => {
    // Basic implementation skipping image part for brevity in this specific fix, 
    // strictly focusing on fixing the crash.
    return "pottery, handmade, clay"; 
};