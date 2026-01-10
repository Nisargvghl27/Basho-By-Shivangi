// src/components/BashoChatbot.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, Sparkles } from "lucide-react";
import { getChatResponse } from "../lib/gemini"; 

export default function BashoChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Welcome to Basho. How can I guide you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { role: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiText = await getChatResponse(userMessage.text);
      const botMessage = { role: "bot", text: aiText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev, 
        { role: "bot", text: "I apologize, my connection to the kiln is weak." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] font-sans">
      {isOpen && (
        <div className="mb-4 w-[350px] max-w-[calc(100vw-3rem)] bg-charcoal border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up">
          <div className="bg-charcoal-light p-4 border-b border-stone-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-clay rounded-full animate-pulse"></div>
              <span className="text-rice-paper font-serif font-medium">Basho Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-warm hover:text-white"><X size={18} /></button>
          </div>
          <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-charcoal">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 text-sm rounded-2xl ${msg.role === "user" ? "bg-clay text-white rounded-br-none" : "bg-charcoal-light text-stone-300 border border-stone-800 rounded-bl-none"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-clay m-2" />}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-3 bg-charcoal-light border-t border-stone-800 flex gap-2">
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask about pottery..." className="flex-1 bg-charcoal text-white text-sm px-4 py-2 rounded-full border border-stone-700 focus:outline-none focus:border-clay" />
            <button type="submit" disabled={isLoading} className="bg-clay text-white p-2 rounded-full hover:bg-clay/90"><Send size={16} /></button>
          </form>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-clay text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform group">
        {isOpen ? <X size={24} /> : <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />}
      </button>
    </div>
  );
}