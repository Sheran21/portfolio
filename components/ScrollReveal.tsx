"use client";

import { useEffect, useRef, ReactNode, CSSProperties } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
  style?: CSSProperties;
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 36,
  duration = 680,
  once = true,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // On mobile (< 768px) collapse left/right → up to prevent horizontal scroll
    const isMobile = window.innerWidth < 768;
    const effectiveDir = isMobile && (direction === "left" || direction === "right") ? "up" : direction;

    const dx =
      effectiveDir === "left"  ? -distance :
      effectiveDir === "right" ? distance  : 0;
    const dy =
      effectiveDir === "up"   ? distance  :
      effectiveDir === "down" ? -distance : 0;

    el.style.opacity   = "0";
    el.style.transform = `translate(${dx}px, ${dy}px)`;
    el.style.transition = `opacity ${duration}ms cubic-bezier(.22,.68,0,1.05) ${delay}ms, transform ${duration}ms cubic-bezier(.22,.68,0,1.05) ${delay}ms`;
    el.style.willChange = "opacity, transform";

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity   = "1";
          el.style.transform = "translate(0,0)";
          if (once) {
            obs.unobserve(el);
            setTimeout(() => { el.style.willChange = "auto"; }, duration + delay + 100);
          }
        } else if (!once) {
          el.style.opacity   = "0";
          el.style.transform = `translate(${dx}px, ${dy}px)`;
        }
      },
      { threshold: 0.1 }
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