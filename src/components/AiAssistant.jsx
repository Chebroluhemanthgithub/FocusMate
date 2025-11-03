// src/components/AiAssistant.jsx
import React, { useState, useRef } from "react";
import { fetchAiResponse } from "../utils/aiEngine"; // ✅ fixed case-sensitive import

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

    // Smooth scroll to result
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="p-3 max-w-md mx-auto bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-3 text-center">
        🧠 AI Assistant (LLaMA 3)
      </h2>

      <textarea
        rows={3}
        placeholder="Ask anything..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        disabled={loading}
      />

      <button
        onClick={handleSubmit}
        className="mt-2 w-full py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading || !prompt.trim()}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {response && (
        <div
          ref={resultRef}
          className="mt-3 p-2 bg-gray-100 rounded text-sm whitespace-pre-wrap border border-gray-300"
        >
          {response}
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
