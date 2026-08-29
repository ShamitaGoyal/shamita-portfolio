"use client";

import { useEffect, useState } from "react";

const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
] as const;

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

function formatLiveTime(date: Date): string {
  const day = `${DAYS[date.getDay()]}.`;
  const month = MONTHS[date.getMonth()];
  const dayNum = date.getDate();

  let hours = date.getHours();

  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${day} ${month} ${dayNum} ${hours}:${minutes}:${seconds} ${period}`;
}

type LiveClockProps = {
  className?: string;
};

export function LiveClock({ className }: LiveClockProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(formatLiveTime(new Date()));
    };

    update();

    const id = window.setInterval(update, 1000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <time className={className}>
      {time || "\u00A0"}
    </time>
  );
}