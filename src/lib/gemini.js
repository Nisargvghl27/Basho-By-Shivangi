// src/lib/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Your API Key
const API_KEY = "AIzaSyDJAiVaDnsB4g9VBe9O19B_vKBHYH3TR4Y"; 

const genAI = new GoogleGenerativeAI(API_KEY);

// UPGRADE: Switched to 'gemini-2.5-pro' for higher quality, more poetic responses.
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

// --- KNOWLEDGE BASE ---
const SITE_KNOWLEDGE = `
  ABOUT BASHO:
  - Founder: Shivangi.
  - Established: 2019.
  - Philosophy: Wabi-Sabi (beauty in imperfection), Ma (negative space), Kanso (simplicity).
  - Mission: To create objects that invite people to slow down and savor the moment.

  UPCOMING WORKSHOPS:
  1. Tokyo Clay Symposium (Oct 12–14, Shibuya) - ¥5,000+
  2. London Craft Week Pop-up (Nov 05–07, Shoreditch) - Free Entry

  JOURNAL HIGHLIGHTS:
  - "Wabi-Sabi: Finding Beauty in Imperfection"
  - "The Language of Clay"
  - "Morning Rituals in the Studio"

  PRODUCTS:
  - Handmade ceramics: Dinnerware, Vases, Mugs.
  - Best sellers: Morning Ritual Mug ($32), Ikebana Vase ($85).
`;

// Helper for stability
const generateContentSafe = async (promptText) => {
    try {
        const result = await model.generateContent(promptText);
        return result.response.text();
    } catch (error) {
        console.warn("Pro model busy, trying fallback...", error.message);
        try {
            // Fallback to Flash if Pro is momentarily unavailable
            const fallbackModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result = await fallbackModel.generateContent(promptText);
            return result.response.text();
        } catch (fallbackError) {
            return "I am currently meditating. Please try asking again in a moment.";
        }
    }
};

// --- Feature 1: Chatbot (Updated for "Pro" Personality) ---
export const getChatResponse = async (message) => {
  const prompt = `
    You are the virtual soul of 'Basho', a pottery studio.
    
    Your Personality:
    - You are NOT a robot. You are a calm, thoughtful artisan.
    - Your words are like clay: earthy, deliberate, and warm.
    - You love 'Wabi-Sabi' (the beauty of things imperfect, impermanent, and incomplete).
    
    Knowledge Base:
    ${SITE_KNOWLEDGE}
    
    User Input: "${message}"
    
    Task:
    Answer the user comfortably and briefly (2-3 sentences). 
    If they say "hey" or "hello", welcome them warmly to our slow-living space.
  `;

  return await generateContentSafe(prompt);
};

// --- Feature 2: Product Storyteller ---
export const generateProductDescription = async (productDetails) => {
  const prompt = `
    Write a short, poetic description for this ceramic piece.
    Details: ${JSON.stringify(productDetails)}
    Tone: Emotional, sensory (touch, warmth), and artistic.
  `;
  try { return await generateContentSafe(prompt); } catch (e) { return null; }
};

// --- Feature 3: Vibe Search ---
export const generateSearchTags = async (userQuery) => {
  const prompt = `
    The user wants pottery that feels like: "${userQuery}".
    List 5 physical tags (e.g., color, texture, shape) that match this feeling.
    Return ONLY comma-separated words.
  `;
  try { 
    const text = await generateContentSafe(prompt);
    return text.split(',').map(tag => tag.trim().toLowerCase());
  } catch (e) { return [userQuery]; }
};

// --- Feature 4: Image Tagging ---
export const generateImageTags = async (imageUrl) => {
  return "pottery, handmade, ceramic, organic, clay"; 
};