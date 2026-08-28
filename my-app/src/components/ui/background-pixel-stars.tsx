"use client";

import { memo, useCallback, useEffect, useRef } from "react";

// Muted pixel-star palette — tuned to stay visible against a WHITE
// background (the original 16-bit palette leans pastel/white and is meant
// for a dark canvas, so it would basically disappear here).
const STAR_COLORS = [
  "#111111", // near-black
  "#4b5563", // slate gray
  "#5b91c7", // soft blue
  "#ef4444", // soft red
  "#54b06d", // soft green
  "#9b6bd6", // soft purple
  "#0ea5b7", // soft teal
] as const;

// Configuration constants
const starDensity = 0.00004; // stars per px^2 of the container
const twinkleProbability = 0.7;
const minTwinkleSpeed = 2;
const maxTwinkleSpeed = 4;
const pixelSize = 4;
const starRegenerationInterval = 5000; // ms between partial star regeneration
const percentToRegenerate = 0.15;

// Shooting star configuration
const shootingStarPixelSize = 2;
const targetFps = 16; // retro feel

// Type definitions
type BackgroundStar = {
  x: number;
  y: number;
  color: string;
  baseOpacity: number;
  currentOpacity: number;
  twinkle: boolean;
  twinkleSpeed: number;
  twinkleDirection: number; // -1 fading out, 1 fading in
  twinkleTimer: number;
};

type TrailPoint = {
  x: number;
  y: number;
  opacity: number;
};

type ShootingStar = {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
  trail: TrailPoint[];
};

type StartPoint = {
  x: number;
  y: number;
  angle: number;
};

type BackgroundPixelStarsProps = {
  className?: string;
};

export const BackgroundPixelStars = memo(function BackgroundPixelStars({
  className,
}: BackgroundPixelStarsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // State references
  const backgroundStarsRef = useRef<BackgroundStar[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const lastRenderTimeRef = useRef<number>(0);
  const frameInterval: number = 1000 / targetFps;

  // Get random starting point for shooting stars, scoped to the container.
  const getRandomStartPoint = useCallback((): StartPoint => {
    const width = canvasRef.current?.width ?? 0;
    const x = Math.random() * width;

    // Wider-than-vertical angle range so trails read as diagonal streaks.
    const angle = 45 + Math.random() * 90;

    return { x, y: 0, angle };
  }, []);

  // Create a new shooting star
  const createNewShootingStar = useCallback((): ShootingStar => {
    const { x, y, angle } = getRandomStartPoint();
    return {
      id: Date.now(),
      x,
      y,
      angle,
      scale: 1,
      speed: Math.random() * 5 + 8,
      distance: 0,
      trail: [],
    };
  }, [getRandomStartPoint]);

  // Initialize background stars
  const initBackgroundStars = useCallback((): void => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    backgroundStarsRef.current = [];

    const area = canvas.width * canvas.height;
    const numStars = Math.floor(area * starDensity);

    for (let i = 0; i < numStars; i++) {
      const shouldTwinkle = Math.random() < twinkleProbability;
      const gridX = Math.floor(Math.random() * (canvas.width / pixelSize)) * pixelSize;
      const gridY = Math.floor(Math.random() * (canvas.height / pixelSize)) * pixelSize;
      const colorIndex = Math.floor(Math.random() * STAR_COLORS.length);
      const baseOpacity = Math.random() * 0.4 + 0.35;

      backgroundStarsRef.current.push({
        x: gridX,
        y: gridY,
        color: STAR_COLORS[colorIndex]!,
        baseOpacity,
        currentOpacity: baseOpacity,
        twinkle: shouldTwinkle,
        twinkleSpeed: minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed),
        twinkleDirection: -1,
        twinkleTimer: 0,
      });
    }
  }, []);

  // Regenerate a portion of background stars
  const regenerateBackgroundStars = useCallback((): void => {
    if (!canvasRef.current || backgroundStarsRef.current.length === 0) return;

    const canvas = canvasRef.current;
    const numToRegenerate = Math.max(
      1,
      Math.floor(backgroundStarsRef.current.length * percentToRegenerate),
    );

    for (let i = 0; i < numToRegenerate; i++) {
      const randomIndex = Math.floor(Math.random() * backgroundStarsRef.current.length);

      const shouldTwinkle = Math.random() < twinkleProbability;
      const gridX = Math.floor(Math.random() * (canvas.width / pixelSize)) * pixelSize;
      const gridY = Math.floor(Math.random() * (canvas.height / pixelSize)) * pixelSize;
      const colorIndex = Math.floor(Math.random() * STAR_COLORS.length);
      const baseOpacity = Math.random() * 0.4 + 0.35;

      backgroundStarsRef.current[randomIndex] = {
        x: gridX,
        y: gridY,
        color: STAR_COLORS[colorIndex]!,
        baseOpacity,
        currentOpacity: baseOpacity,
        twinkle: shouldTwinkle,
        twinkleSpeed: minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed),
        twinkleDirection: -1,
        twinkleTimer: 0,
      };
    }
  }, []);

  // Main animation loop
  const animateCanvas = useCallback(
    (timestamp: number): void => {
      if (timestamp - lastRenderTimeRef.current < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animateCanvas);
        return;
      }

      lastRenderTimeRef.current = timestamp;

      if (!canvasRef.current) {
        animationFrameRef.current = requestAnimationFrame(animateCanvas);
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        animationFrameRef.current = requestAnimationFrame(animateCanvas);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw and update background stars
      backgroundStarsRef.current.forEach((star) => {
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.currentOpacity;
        ctx.fillRect(star.x, star.y, pixelSize, pixelSize);

        if (star.twinkle) {
          star.twinkleTimer += 1 / targetFps;

          if (star.twinkleTimer >= star.twinkleSpeed) {
            star.twinkleTimer = 0;
            star.twinkleDirection *= -1;
          }

          const progress = star.twinkleTimer / star.twinkleSpeed;
          if (progress < 0.5) {
            star.currentOpacity =
              star.twinkleDirection < 0 ? star.baseOpacity : star.baseOpacity * 0.3;
          } else {
            star.currentOpacity =
              star.twinkleDirection < 0 ? star.baseOpacity * 0.3 : star.baseOpacity;
          }
        }
      });

      // 2. Update shooting stars
      if (shootingStarsRef.current.length) {
        shootingStarsRef.current = shootingStarsRef.current
          .map((star) => {
            const newX = star.x + star.speed * Math.cos((star.angle * Math.PI) / 180);
            const newY = star.y + star.speed * Math.sin((star.angle * Math.PI) / 180);
            const newDistance = star.distance + star.speed;

            const newTrail = [...star.trail];

            if (newDistance % 8 < star.speed) {
              newTrail.push({ x: star.x, y: star.y, opacity: 1.0 });
            }

            const updatedTrail = newTrail
              .map((point) => ({ ...point, opacity: point.opacity - 0.1 }))
              .filter((point) => point.opacity > 0);

            return {
              ...star,
              x: newX,
              y: newY,
              distance: newDistance,
              trail: updatedTrail,
            };
          })
          .filter(
            (star) =>
              star.x >= -30 &&
              star.x <= canvas.width + 30 &&
              star.y >= -30 &&
              star.y <= canvas.height + 30,
          );

        // 3. Draw shooting stars
        shootingStarsRef.current.forEach((star) => {
          star.trail.forEach((point) => {
            ctx.save();
            ctx.translate(point.x, point.y);
            ctx.rotate((star.angle * Math.PI) / 180);
            ctx.translate(-point.x, -point.y);

            ctx.fillStyle = `rgba(91, 145, 199, ${point.opacity})`;
            ctx.fillRect(point.x, point.y, shootingStarPixelSize, shootingStarPixelSize);

            ctx.restore();
          });

          const starWidth = 4;
          const starHeight = 2;

          ctx.save();
          ctx.translate(star.x, star.y);
          ctx.rotate((star.angle * Math.PI) / 180);
          ctx.translate(-star.x, -star.y);

          ctx.fillStyle = "#111111";
          ctx.globalAlpha = 1.0;

          for (let y = 0; y < starHeight; y++) {
            for (let x = 0; x < starWidth; x++) {
              if ((x === 0 && y === 1) || (x === 3 && y === 0)) continue;

              ctx.fillRect(
                star.x + x * shootingStarPixelSize,
                star.y + y * shootingStarPixelSize,
                shootingStarPixelSize,
                shootingStarPixelSize,
              );
            }
          }

          ctx.restore();
        });
      }

      animationFrameRef.current = requestAnimationFrame(animateCanvas);
    },
    [frameInterval],
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = (): void => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initBackgroundStars();
    };

    resize();
    animationFrameRef.current = requestAnimationFrame(animateCanvas);

    const createShootingStar = (): void => {
      const newStar = createNewShootingStar();
      shootingStarsRef.current = [...shootingStarsRef.current, newStar];

      const randomDelay = Math.random() * 4000 + 2000; // 2-6s
      setTimeout(createShootingStar, randomDelay);
    };
    createShootingStar();

    const regenerationInterval = setInterval(
      regenerateBackgroundStars,
      starRegenerationInterval,
    );

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearInterval(regenerationInterval);
      resizeObserver.disconnect();
    };
  }, [animateCanvas, createNewShootingStar, initBackgroundStars, regenerateBackgroundStars]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className ?? "pointer-events-none absolute inset-0"}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
});

export default BackgroundPixelStars;
