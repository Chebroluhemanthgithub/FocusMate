
# 🧠 FocusMate – AI-Powered Productivity & Planner App

**FocusMate** is a full-featured productivity app that helps you stay focused, plan your day, manage tasks, and get smart suggestions using **AI**.

It’s built with **React.js + Vite + Tailwind CSS**, and integrates the blazing-fast **GroqCloud™ API** powered by **Meta’s LLaMA 3 model** (`llama3-8b-8192`) for real-time AI assistance.

---

## 🚀 Features

- ⏳ **Pomodoro Timer** – Manage focus sessions using the 25-5 Pomodoro technique.
- 📝 **Task Planner** – Add, edit, delete, and complete tasks (stored in `localStorage`).
- 📅 **Hourly Daily Planner** – Schedule your day hour-by-hour with date selection & clear all.
- 📊 **Focus Graph** – Visualize Pomodoro session history using Chart.js.
- 💡 **AI Assistant** – Ask questions, generate task summaries, get tips via Groq + LLaMA 3.
- 🔁 **Persistent State** – All data saved locally for smooth user experience.

---

## 🧠 AI Integration (GroqCloud™ + LLaMA 3)

> FocusMate’s AI Assistant uses Groq’s ultra-fast inference engine with Meta's open-source **LLaMA 3** model. It responds in milliseconds for prompt task generation, summaries, productivity tips, and natural interactions.

```mermaid
graph LR
UserPrompt --> GroqAPI
GroqAPI --> LLaMA3Model
LLaMA3Model --> AIResponse
AIResponse --> FocusMateUI