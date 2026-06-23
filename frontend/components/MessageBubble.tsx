"use client";

import { useState } from "react";
import TypingMarkdown from "./TypingMarkdown";

type Props = {
  sender: "user" | "ai";
  message: string;
  pdf_file?: string;
  agent?: string;
  workflow?: string[];
};

export default function MessageBubble({
  sender,
  message,
  pdf_file,
  workflow,
}: Props) {
  const [showWorkflow, setShowWorkflow] = useState(false);

  return (
    <div
      className={`mb-8 p-6 rounded-3xl shadow-lg max-w-4xl whitespace-pre-line ${
        sender === "user"
          ? "bg-blue-600 ml-auto text-white"
          : "bg-slate-800 text-gray-100"
      }`}
    >
      {/* Header */}
      <div className="text-sm text-gray-400 mb-4">
        {sender === "user" ? "You" : "🤖 AI Assistant"}
      </div>

      {/* Message */}
      {sender === "ai" ? (
        <TypingMarkdown text={message} />
      ) : (
        <div className="leading-8 text-lg">
          {message}
        </div>
      )}

      {/* Download Report */}
      {sender === "ai" && pdf_file && (
        <div className="mt-8 pt-6 border-t border-slate-600">

          <div className="text-green-400 mb-4">
            📄 Report Generated Successfully
          </div>

          <a
            href="http://127.0.0.1:8000/download"
            target="_blank"
            className="
              inline-block
              bg-green-600
              hover:bg-green-700
              px-6
              py-3
              rounded-2xl
              transition
            "
          >
            ⬇ Download Report
          </a>

        </div>
      )}

      {/* Workflow */}
      {sender === "ai" && workflow && (
        <div className="mt-8 pt-6 border-t border-slate-600">

          <button
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="text-blue-400 hover:text-blue-300 transition"
          >
            {showWorkflow
              ? "▲ Hide Agent Workflow"
              : "▼ Show Agent Workflow"}
          </button>

          {showWorkflow && (
            <div className="mt-5 bg-slate-900 rounded-2xl p-5 border border-slate-700">

              <div className="text-blue-400 font-semibold mb-4">
                🧠 Agent Activity
              </div>

              <div className="space-y-3">

                {workflow.map((step, index) => (
                  <div
                    key={index}
                    className="bg-slate-800 rounded-xl p-3"
                  >
                    {step}
                  </div>
                ))}

                <div className="text-green-400 mt-4">
                  ✓ Completed
                </div>

              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
}