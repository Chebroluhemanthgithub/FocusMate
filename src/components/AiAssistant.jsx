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

    // scroll result into view inside assistant
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleClear = () => {
    setPrompt("");
    setResponse("");
  };

  return (
    <div
      className="
        mx-auto bg-white shadow-md rounded-lg border border-gray-200
        p-4
      "
      // keep natural flow (not fixed). width controlled by parent (.max-w-3xl)
    >
      {/* header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">🧠 AI Assistant (LLaMA 3)</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            title="Clear"
            className="px-2 py-1 rounded text-gray-600 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      </div>

      {/* input */}
      <textarea
        rows={3}
        placeholder="Ask anything..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        disabled={loading}
      />

      {/* actions */}
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading || !prompt.trim()}
          className={`px-4 py-2 rounded text-white ${
            loading || !prompt.trim() ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        <button
          onClick={handleClear}
          className="px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
        >
          Clear
        </button>
      </div>

      {/* result (limited height, scrollable) */}
      <div
        ref={resultRef}
        className="mt-3 p-3 bg-gray-50 rounded border border-gray-200 text-sm whitespace-pre-wrap max-h-[40vh] overflow-y-auto"
      >
        {response || <div className="text-gray-400">No response yet — ask something above.</div>}
      </div>
    </div>
  );
};

export default AiAssistant;
