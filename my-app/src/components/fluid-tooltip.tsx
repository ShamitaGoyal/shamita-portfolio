"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type FluidTooltipProps = {
  children: React.ReactNode;
  /** Primary tooltip copy. */
  text: string;
  /** Optional link URL rendered below the text. */
  link?: string;
  /** Label for the optional link. Defaults to "Learn more". */
  linkText?: string;
  /** Wrapper around the trigger element. */
  className?: string;
  /** Extra classes for the tooltip bubble. */
  tooltipClassName?: string;
  /** Which side of the trigger the tooltip appears on. */
  side?: "top" | "bottom";
  /** Gap between trigger and tooltip in pixels. */
  offset?: number;
  /** Max tilt in degrees while following the cursor. */
  maxTilt?: number;
  /** Open tooltip in a new tab when link is external. */
  openLinkInNewTab?: boolean;
};

export function FluidTooltip({
  children,
  text,
  link,
  linkText = "Learn more",
  className,
  tooltipClassName,
  side = "top",
  offset = 12,
  maxTilt = 10,
  openLinkInNewTab = false,
}: FluidTooltipProps) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const prevPointer = useRef({ x: 0, y: 0 });
  const tipId = useId();
  const reduce = useReducedMotion();

  const mvLeft = useMotionValue(0);
  const mvDriftX = useMotionValue(0);
  const mvDriftY = useMotionValue(0);
  const mvRotate = useMotionValue(0);
  const mvSkew = useMotionValue(0);

  const left = useSpring(mvLeft, { stiffness: 440, damping: 34, mass: 0.5 });
  const driftX = useSpring(mvDriftX, {
    stiffness: 260,
    damping: 22,
    mass: 0.75,
  });
  const driftY = useSpring(mvDriftY, {
    stiffness: 220,
    damping: 20,
    mass: 0.85,
  });
  const rotate = useSpring(mvRotate, {
    stiffness: 180,
    damping: 18,
    mass: 0.9,
  });
  const skew = useSpring(mvSkew, {
    stiffness: 160,
    damping: 16,
    mass: 1,
  });

  const pointTo = (clientX: number, clientY: number, snap = false) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const lx = clientX - rect.left;
    const ly = clientY - rect.top;
    const nx = (lx / rect.width - 0.5) * 2;
    const ny = (ly / rect.height - 0.5) * 2;

    const dx = clientX - prevPointer.current.x;
    const dy = clientY - prevPointer.current.y;
    prevPointer.current = { x: clientX, y: clientY };

    mvLeft.set(lx);
    mvDriftX.set(nx * 10);
    mvDriftY.set(ny * -12);

    const positionTilt = nx * maxTilt * 0.55 + ny * maxTilt * -0.35;
    const velocityTilt = Math.max(-maxTilt * 0.75, Math.min(maxTilt * 0.75, dx * 0.35));
    const velocitySkew = Math.max(-6, Math.min(6, dy * 0.25 + dx * 0.12));

    mvRotate.set(positionTilt + velocityTilt);
    mvSkew.set(velocitySkew);

    if (snap) {
      left.jump(lx);
      driftX.jump(nx * 10);
      driftY.jump(ny * -12);
      rotate.jump(positionTilt + velocityTilt);
      skew.jump(velocitySkew);
    }
  };

  const focusCenter = (snap = false) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    pointTo(rect.left + rect.width / 2, rect.top + rect.height / 2, snap);
  };

  const isExternal =
    !!link && (link.startsWith("http://") || link.startsWith("https://"));

  const linkProps = openLinkInNewTab || isExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <span
      ref={ref}
      tabIndex={0}
      className={cn("relative inline-flex outline-none", className)}
      onMouseEnter={(e) => {
        prevPointer.current = { x: e.clientX, y: e.clientY };
        pointTo(e.clientX, e.clientY, true);
        setActive(true);
      }}
      onMouseMove={(e) => pointTo(e.clientX, e.clientY)}
      onMouseLeave={() => {
        setActive(false);
        mvDriftX.set(0);
        mvDriftY.set(0);
        mvRotate.set(0);
        mvSkew.set(0);
      }}
      onFocus={() => {
        focusCenter(true);
        setActive(true);
      }}
      onBlur={() => setActive(false)}
    >
      {children}

      <AnimatePresence>
        {active ? (
          <motion.span
            key="fluid-tooltip"
            role="tooltip"
            id={tipId}
            aria-hidden={!active}
            className={cn(
              "pointer-events-none absolute z-50 block -translate-x-1/2 whitespace-nowrap",
              side === "top" ? "bottom-full" : "top-full",
            )}
            style={{ left }}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: reduce ? 1 : 0.94,
            }}
            transition={{
              type: "spring",
              stiffness: 460,
              damping: 32,
              mass: 0.55,
            }}
          >
            <motion.span
              style={{
                x: driftX,
                y: driftY,
                rotate,
                skewX: skew,
                marginBottom: side === "top" ? offset : undefined,
                marginTop: side === "bottom" ? offset : undefined,
              }}
              initial={{ opacity: 0, y: side === "top" ? 12 : -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: side === "top" ? 8 : -8,
              }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 28,
                mass: 0.65,
              }}
              className="block origin-bottom"
            >
              <motion.span
                className={cn(
                  "relative block overflow-hidden rounded-2xl border border-white/70 bg-white/85 px-4 py-2.5 text-sm text-foreground shadow-[0_12px_40px_-12px_rgba(0,0,0,0.28)] backdrop-blur-md",
                  tooltipClassName,
                )}
                initial={{ filter: reduce ? "blur(0px)" : "blur(4px)" }}
                animate={{ filter: "blur(0px)" }}
                exit={{ filter: reduce ? "blur(0px)" : "blur(3px)" }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-4 -top-4 size-16 rounded-full bg-[#FFF991]/35 blur-2xl"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-5 -right-3 size-12 rounded-full bg-sky-200/30 blur-xl"
                />

                <span className="relative z-10 block font-medium">{text}</span>

                {link ? (
                  <Link
                    href={link}
                    className="pointer-events-auto relative z-10 mt-1 block text-xs text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
                    {...linkProps}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {linkText}
                  </Link>
                ) : null}
              </motion.span>

              <motion.span
                aria-hidden="true"
                className={cn(
                  "absolute left-1/2 block size-2.5 -translate-x-1/2 rotate-45 border border-white/70 bg-white/85 backdrop-blur-md",
                  side === "top"
                    ? "top-full -mt-[5px] border-t-0 border-l-0"
                    : "bottom-full -mb-[5px] border-b-0 border-r-0",
                )}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.span>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
