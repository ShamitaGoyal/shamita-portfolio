"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";

type ScrambleTextProps = {
  /** The final text to reveal. */
  text: string;
  /** Classes for the wrapping element (layout, font, size, etc). */
  className?: string;
  /** Milliseconds between each scramble tick. */
  speed?: number;
  /** How many characters lock into their final letter per tick. */
  revealPerTick?: number;
};

/**
 * Wraps `text` and, on hover, scrambles it through random characters before
 * settling back into the real text one character at a time. Each character
 * "pops" into place with a small motion.dev spring once it locks in.
 */
export function ScrambleText({
  text,
  className,
  speed = 35,
  revealPerTick = 1,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const [revealedCount, setRevealedCount] = useState(text.length);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let revealed = 0;
    setRevealedCount(0);

    intervalRef.current = setInterval(() => {
      revealed += revealPerTick;
      setRevealedCount(Math.min(revealed, text.length));

      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealed) return char;
            return SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
          })
          .join(""),
      );

      if (revealed >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplay(text);
        setRevealedCount(text.length);
      }
    }, speed);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span className={className} onMouseEnter={scramble}>
      {display.split("").map((char, i) =>
        i < revealedCount ? (
          <motion.span
            key={`settled-${i}`}
            initial={{ opacity: 0.3, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 24 }}
          >
            {char}
          </motion.span>
        ) : (
          <span key={`scrambling-${i}`}>{char}</span>
        ),
      )}
    </span>
  );
}
