"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  text: string;
};

export default function TypingMarkdown({ text }: Props) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);

    let i = 0;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));

      i++;

      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 5);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown>{displayedText}</ReactMarkdown>

      {isTyping && (
        <span className="animate-pulse text-gray-400">▌</span>
      )}
    </div>
  );
}