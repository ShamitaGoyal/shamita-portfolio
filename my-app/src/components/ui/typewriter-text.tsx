"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  text: string;
  className?: string;
  /** Milliseconds between each character. */
  speed?: number;
};

export function TypewriterText({
  text,
  className,
  speed = 40,
}: TypewriterTextProps) {
  const [runId, setRunId] = useState(0);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
    // runId is bumped on click to replay the animation from scratch.
  }, [text, speed, runId]);

  const isTyping = displayed.length < text.length;

  return (
    <p
      className={className}
      role="button"
      tabIndex={0}
      onClick={() => setRunId((id) => id + 1)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setRunId((id) => id + 1);
        }
      }}
    >
      {displayed}
      <span aria-hidden="true" className={isTyping ? "animate-pulse" : "opacity-0"}>
        |
      </span>
    </p>
  );
}
