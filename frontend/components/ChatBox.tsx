"use client";

import { useState, useEffect, useRef } from "react";
import { askQuestion } from "../services/api";
import MessageBubble from "./MessageBubble";
import { useChat } from "../context/ChatContext";

type Message = {
  sender: "user" | "ai";
  message: string;
  pdf_file?: string;
  agent?: string;
  workflow?: string[];
};

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const { addChat } = useChat();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function handleAsk() {
    if (!question.trim()) return;

    const currentQuestion = question;

    addChat(currentQuestion);

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        message: currentQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const result = await askQuestion(currentQuestion);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: result.answer,
          pdf_file: result.pdf_file,
          agent: result.agent,
          workflow: result.workflow,
        },
      ]);
    } catch (error){
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="h-screen bg-slate-900 text-white flex flex-col">

      {/* Header */}
      <div className="p-8 border-b border-slate-800">
        <h1 className="text-6xl font-bold">
          Chat with PDF
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">

        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            sender={msg.sender}
            message={msg.message}
            pdf_file={msg.pdf_file}
            agent={msg.agent}
            workflow={msg.workflow}
          />
        ))}

        {loading && (
          <div className="bg-slate-800 p-6 rounded-3xl max-w-sm shadow-lg">

            <div className="text-gray-400 mb-4">
              🤖 AI Assistant
            </div>

            <div className="flex gap-2">

              <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>

              <div
                className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.15s" }}
              ></div>

              <div
                className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></div>

            </div>

          </div>
        )}

        <div ref={bottomRef}></div>

      </div>

      {/* Input */}
      <div className="border-t border-slate-800 p-6">

        <div className="flex gap-5">

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAsk();
              }
            }}
            placeholder="Ask anything..."
            className="
              flex-1
              p-5
              rounded-2xl
              bg-slate-800
              border
              border-slate-700
              outline-none
              focus:border-blue-500
            "
          />

          <button
            onClick={handleAsk}
            className="
              bg-blue-600
              hover:bg-blue-700
              px-10
              rounded-2xl
              transition
            "
          >
            Ask
          </button>

        </div>

      </div>

    </div>
  );
}