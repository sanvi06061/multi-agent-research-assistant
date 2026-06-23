"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type Message = {
  sender: "user" | "ai";
  message: string;
  pdf_file?: string;
  agent?: string;
  workflow?: string[];
};

type ChatSession = {
  id: number;
  title: string;
  messages: Message[];
};

type ChatContextType = {
  chats: ChatSession[];

  currentChatId: number | null;
  setCurrentChatId: (id: number | null) => void;

  addChat: (question: string) => void;

  addMessage: (
    chatId: number,
    message: Message
  ) => void;

  deleteChat: (id: number) => void;

  renameChat: (
    id: number,
    title: string
  ) => void;
};

const ChatContext = createContext<ChatContextType>({
  chats: [],

  currentChatId: null,
  setCurrentChatId: () => {},

  addChat: () => {},

  addMessage: () => {},

  deleteChat: () => {},

  renameChat: () => {},
});

export function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chats, setChats] =
    useState<ChatSession[]>([]);

  const [currentChatId, setCurrentChatId] =
    useState<number | null>(null);

  // Load chats
  useEffect(() => {
    const saved = localStorage.getItem("recentChats");

    if (saved) {
      setChats(JSON.parse(saved));
    }
  }, []);

  // Save chats
  useEffect(() => {
    localStorage.setItem(
      "recentChats",
      JSON.stringify(chats)
    );
  }, [chats]);

  function addChat(question: string) {

    const id = Date.now();

    const newChat: ChatSession = {
      id,
      title: question,
      messages: [],
    };

    setChats((prev) => [
      newChat,
      ...prev,
    ]);

    setCurrentChatId(id);
  }

  function addMessage(
    chatId: number,
    message: Message
  ) {

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                message,
              ],
            }
          : chat
      )
    );
  }

  function deleteChat(id: number) {

    setChats((prev) =>
      prev.filter(
        (chat) => chat.id !== id
      )
    );

    if (currentChatId === id) {
      setCurrentChatId(null);
    }
  }

  function renameChat(
    id: number,
    title: string
  ) {

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id
          ? {
              ...chat,
              title,
            }
          : chat
      )
    );
  }

  return (
    <ChatContext.Provider
      value={{
        chats,

        currentChatId,
        setCurrentChatId,

        addChat,

        addMessage,

        deleteChat,

        renameChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}