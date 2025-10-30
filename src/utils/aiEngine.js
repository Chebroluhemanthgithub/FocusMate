// src/utils/aiEngine.js
import axios from "axios";

export async function fetchAiResponse(prompt) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant", // ✅ Correct Groq chat model
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ FIXED: Correct way to read Groq's chat completion output
    const aiText =
      response.data.choices?.[0]?.message?.content?.trim() ||
      "⚠️ No output found.";

    console.log("✅ Groq API response:", response.data);
    return aiText;
  } catch (error) {
    console.error("❌ AI Error Full:", error.response?.data || error);
    return "⚠️ Error fetching AI response.";
  }
}
