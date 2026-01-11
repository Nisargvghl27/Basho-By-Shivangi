import { GoogleGenerativeAI } from "@google/generative-ai";
import { ragPipeline } from "./ragPipeline.js";

// Your API Key
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY; 

// Force v1 API with custom configuration
const genAI = new GoogleGenerativeAI(API_KEY);

// Use v1 API endpoint directly
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  apiVersion: "v1"  // Force v1 API
});

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

const generateContentSafe = async (promptText) => {
    if (API_KEY && API_KEY !== 'your_gemini_api_key_here') {
        try {
            const response = await fetch(
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" + API_KEY,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: promptText }]
        }
      ]
    })
  }
);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
            
        } catch (error) {
            // Handle quota exceeded gracefully
            if (error.message.includes('quota') || error.message.includes('429') || error.message.includes('Too Many Requests')) {
                return "I'm experiencing high demand right now. Please try again in a few moments. In the meantime, I can tell you about our workshops: We have 'Advanced Poetry Workshop' on January 14th for ₹200, and a 'Shoes' workshop on January 12th for ₹300.";
            }
            
            throw new Error("Gemini API unavailable");
        }
    } else {
        throw new Error("No valid API key available");
    }
};

// --- Feature 1: RAG-Powered Chatbot ---
export const getChatResponse = async (message) => {
  try {
    // Get relevant context from RAG pipeline
    const context = await ragPipeline.getContext(message, 3);
    
    const prompt = `
      You are the virtual soul of 'Basho', a pottery studio.
      
      Your Personality:
      - You are NOT a robot. You are a calm, thoughtful artisan.
      - Your words are like clay: earthy, deliberate, and warm.
      - You love 'Wabi-Sabi' (the beauty of things imperfect, impermanent, and incomplete).
      
      Knowledge Base Context:
      ${context}
      
      User Input: "${message}"
      
      Task:
      Answer the user comfortably and briefly (2-3 sentences) using the context above.
      
      Special Instructions:
      - For WORKSHOPS: Include date, location, price, and what they'll learn
      - For PRODUCTS: Focus on materials, craftsmanship, and wabi-sabi philosophy
      - For EVENTS: Mention timing, location, and what makes it special
      - If they ask "what workshops", list upcoming workshops from context
      - If they ask "how much", provide pricing information from context
      - If they ask "where", give location details from context
      
      If the context doesn't contain relevant information, respond naturally as Basho's assistant.
      If they say "hey" or "hello", welcome them warmly to our slow-living space.
      
      Important:
      - Base your answer on the provided context when relevant
      - Be helpful and authentic to the Basho brand
      - Keep responses concise but informative
    `;

    return await generateContentSafe(prompt);
  } catch (error) {
    console.error('RAG chat failed:', error);
    // Fallback to basic response
    return "I'm here to help you discover the beauty of handmade pottery and our workshops. What would you like to know about our ceramics or upcoming events?";
  }
};

// --- Feature 2: RAG-Powered Product Storyteller ---
export const generateProductDescription = async (productDetails) => {
  try {
    // Search for similar products or related content
    const searchQuery = `product description ${productDetails.name || ''} ${productDetails.category || ''}`;
    const context = await ragPipeline.getContext(searchQuery, 2);
    
    const prompt = `
      Write a short, poetic description for this ceramic piece.
      
      Product Details: ${JSON.stringify(productDetails)}
      
      Similar Products Reference:
      ${context}
      
      Tone: Emotional, sensory (touch, warmth), and artistic.
      Style: Wabi-sabi inspired, focusing on imperfection and natural beauty.
      
      Create a unique description that captures the essence of this piece.
    `;
    
    return await generateContentSafe(prompt);
  } catch (error) {
    console.error('RAG product description failed:', error);
    return null;
  }
};

// --- Feature 3: RAG-Enhanced Vibe Search ---
export const generateSearchTags = async (userQuery) => {
  try {
    // Get context about similar products or styles
    const context = await ragPipeline.getContext(userQuery, 3);
    
    const prompt = `
      The user wants pottery that feels like: "${userQuery}"
      
      Reference Context:
      ${context}
      
      Based on the context and the user's vibe, list 5 physical tags (e.g., color, texture, shape, style, material) that match this feeling.
      Return ONLY comma-separated words, no explanations.
      
      Examples: matte, textured, earthy, minimalist, hand-thrown
    `;
    
    const text = await generateContentSafe(prompt);
    return text.split(',').map(tag => tag.trim().toLowerCase());
  } catch (error) {
    console.error('RAG search tags failed:', error);
    return [userQuery];
  }
};

// --- Feature 4: Image Tagging ---
export const generateImageTags = async (imageUrl) => {
  return "pottery, handmade, ceramic, organic, clay"; 
};