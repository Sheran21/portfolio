"use client";

import { useEffect, useRef, ReactNode, CSSProperties } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number; // px
  duration?: number; // ms
  once?: boolean;
  style?: CSSProperties;
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 700,
  once = true,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const dx =
      direction === "left" ? -distance :
      direction === "right" ? distance : 0;
    const dy =
      direction === "up" ? distance :
      direction === "down" ? -distance : 0;

    // initial hidden state
    el.style.opacity = "0";
    el.style.transform = `translate(${dx}px, ${dy}px)`;
    el.style.transition = `opacity ${duration}ms cubic-bezier(.22,.68,0,1.05) ${delay}ms, transform ${duration}ms cubic-bezier(.22,.68,0,1.05) ${delay}ms`;
    el.style.willChange = "opacity, transform";

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translate(0,0)";
          if (once) {
            obs.unobserve(el);
            // clean up will-change after animation
            setTimeout(() => { el.style.willChange = "auto"; }, duration + delay + 100);
          }
        } else if (!once) {
          el.style.opacity = "0";
          el.style.transform = `translate(${dx}px, ${dy}px)`;
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [direction, distance, duration, delay, once]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}