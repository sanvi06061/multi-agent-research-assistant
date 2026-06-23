"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
};

export default function TypingText({ text }: Props) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");

    let i = 0;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));

      i++;

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 5);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="leading-8 text-lg whitespace-pre-line">
      {displayedText}
    </div>
  );
}