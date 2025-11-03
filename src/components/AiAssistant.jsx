// src/components/AiAssistant.jsx
import React, { useState, useRef } from "react";
import { fetchAiResponse } from "../utils/aiEngine";

const AiAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const result = await fetchAiResponse(prompt);
      setResponse(result || "No response received.");
    } catch (error) {
      console.error("AI Error:", error);
      setResponse("⚠️ Error fetching AI response. Please try again.");
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleClear = () => {
    setPrompt("");
    setResponse("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg border border-gray-200 relative">
      {/* Header section with title + clear button */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-center flex-1">
          🧠 AI Assistant (LLaMA 3)
        </h2>
        <button
          onClick={handleClear}
          className="text-gray-500 hover:text-red-500 text-lg font-bold ml-2"
          title="Clear Chat"
        >
          ✕
        </button>
      </div>

      <textarea
        rows={3}
        placeholder="Ask anything..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        disabled={loading}
      />

      <button
        onClick={handleSubmit}
        className="mt-3 w-full py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading || !prompt.trim()}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {response && (
        <div
          ref={resultRef}
          className="mt-4 p-3 bg-gray-100 rounded text-sm whitespace-pre-wrap border border-gray-300 max-h-[400px] overflow-y-auto"
        >
          {response}
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
