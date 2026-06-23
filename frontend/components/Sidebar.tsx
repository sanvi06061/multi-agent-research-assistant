"use client";

import Link from "next/link";
import { useChat } from "../context/ChatContext";

export default function Sidebar() {
  const {
    chats,
    deleteChat,
    renameChat,
  } = useChat();

  return (
    <div className="w-80 h-screen bg-black text-white p-8 flex flex-col">

      {/* Logo */}
      <div className="text-4xl font-bold mb-16">
        🤖 Multi-Agent AI
      </div>

      {/* Navigation */}
      <div className="space-y-8 text-2xl">

        <Link
          href="/upload"
          className="block hover:text-blue-400 transition"
        >
          📄 Upload PDF
        </Link>

        <Link
          href="/chat"
          className="block hover:text-blue-400 transition"
        >
          💬 Chat
        </Link>

      </div>

      {/* Divider */}
      <div className="border-t border-slate-700 my-12"></div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">

        <h2 className="text-lg text-gray-400 mb-6">
          Today
        </h2>

        <div className="space-y-3">

          {chats.length === 0 ? (
            <div className="text-gray-500 text-sm">
              No chats yet
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className="
                  bg-slate-900
                  rounded-2xl
                  p-4
                  hover:bg-slate-800
                  transition
                "
              >
                <div className="flex items-center justify-between">

                  <div className="truncate text-gray-300">
                    💬 {chat.title}
                  </div>

                  <div className="flex gap-3">

                    {/* Rename */}
                    <button
                      onClick={() => {
                        const newTitle = prompt(
                          "Rename chat",
                          chat.title
                        );

                        if (newTitle) {
                          renameChat(chat.id, newTitle);
                        }
                      }}
                      className="hover:text-blue-400"
                    >
                      ✏️
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteChat(chat.id)}
                      className="hover:text-red-400"
                    >
                      🗑️
                    </button>

                  </div>

                </div>
              </div>
            ))
          )}

        </div>

      </div>

      {/* Footer */}
      <div className="mt-8 text-sm text-gray-500">
        Powered by Groq + ChromaDB
      </div>

    </div>
  );
}