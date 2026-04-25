"use client";

import React from "react";

type SkillCubeProps = {
  label: string;
  color: string;
};

export default function SkillCube({ label, color }: SkillCubeProps) {
  const depth = 14;

  return (
    <div className="group relative">
      {/* Outer neon glow — only paints on hover, not every frame */}
      <div
        className="absolute -inset-4 rounded-3xl blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-50 pointer-events-none"
        style={{ backgroundColor: color }}
      />

      {/* Perspective wrapper */}
      <div className="[perspective:900px]">
        <div
          className="relative h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 [transform-style:preserve-3d]"
          style={{
            // will-change: transform tells GPU to composite this layer
            willChange: "transform",
            transition: "transform 0.45s cubic-bezier(.22,.68,0,1.2)",
          }}
          // Apply hover via inline style via data attribute trick
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform =
              "translateY(-6px) rotateX(12deg) rotateY(-14deg)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform =
              "translateY(0) rotateX(0) rotateY(0)";
          }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 rounded-2xl border-[3px] border-black flex items-center justify-center font-extrabold text-black text-lg shadow-[0_12px_0_rgba(0,0,0,0.85)]"
            style={{
              backgroundColor: color,
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.3), rgba(255,255,255,0.07))",
              transform: `translateZ(${depth}px)`,
            }}
          >
            {label}
          </div>

          {/* TOP */}
          <div
            className="absolute left-0 top-0 rounded-2xl border-[3px] border-black"
            style={{
              width: "100%",
              height: `${depth * 2}px`,
              backgroundColor: color,
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.18))",
              transformOrigin: "top",
              transform: `translateZ(${depth}px) rotateX(90deg) translateY(-${depth}px)`,
            }}
          />

          {/* RIGHT */}
          <div
            className="absolute top-0 right-0 rounded-2xl border-[3px] border-black"
            style={{
              width: `${depth * 2}px`,
              height: "100%",
              backgroundColor: color,
              backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.32))",
              transformOrigin: "right",
              transform: `translateZ(${depth}px) rotateY(90deg) translateX(${depth}px)`,
            }}
          />
        </div>

        {/* Ground shadow — GPU opacity transition only */}
        <div
          className="mx-auto h-3 w-20 sm:w-24 rounded-full bg-black/60 blur-md mt-1 transition-all duration-500 group-hover:opacity-90 group-hover:scale-110"
          style={{ willChange: "transform, opacity" }}
        />
      </div>
    </div>
  );
}