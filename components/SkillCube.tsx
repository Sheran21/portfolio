"use client";

import React from "react";

type SkillCubeProps = {
  label: string;
  color: string;
};

export default function SkillCube({
  label,
  color,
}: SkillCubeProps) {
  const depth = 16;

  return (
    <div className="group relative">
      {/* Outer neon glow */}
      <div
        className="absolute -inset-4 rounded-3xl blur-2xl opacity-0 transition-all duration-500 group-hover:opacity-60"
        style={{ backgroundColor: color }}
      />

      {/* Perspective wrapper */}
      <div className="[perspective:1000px]">
        <div
          className="
            relative
            h-24 w-24
            sm:h-28 sm:w-28
            lg:h-32 lg:w-32
            transition-all duration-500 ease-out
            [transform-style:preserve-3d]
            group-hover:-translate-y-2
            group-hover:[transform:rotateX(12deg)_rotateY(-14deg)]
          "
        >
          {/* FRONT FACE */}
          <div
            className="
              absolute inset-0
              rounded-2xl
              border-[3px] border-black
              flex items-center justify-center
              font-extrabold
              text-black
              text-lg
              shadow-[0_14px_0_rgba(0,0,0,0.9)]
            "
            style={{
              backgroundColor: color,
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.08))",
              transform: `translateZ(${depth}px)`,
            }}
          >
            {label}
          </div>

          {/* TOP FACE */}
          <div
            className="absolute left-0 top-0 rounded-2xl border-[3px] border-black"
            style={{
              width: "100%",
              height: `${depth * 2}px`,
              backgroundColor: color,
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.2))",
              transformOrigin: "top",
              transform: `translateZ(${depth}px) rotateX(90deg) translateY(-${depth}px)`,
            }}
          />

          {/* RIGHT FACE */}
          <div
            className="absolute top-0 right-0 rounded-2xl border-[3px] border-black"
            style={{
              width: `${depth * 2}px`,
              height: "100%",
              backgroundColor: color,
              backgroundImage:
                "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.35))",
              transformOrigin: "right",
              transform: `translateZ(${depth}px) rotateY(90deg) translateX(${depth}px)`,
            }}
          />

          {/* Ground shadow */}
          <div
            className="
              absolute
              -bottom-6
              left-1/2
              -translate-x-1/2
              h-4
              w-20
              sm:w-24
              rounded-full
              bg-black/70
              blur-md
              transition-all duration-500
              group-hover:scale-110
              group-hover:opacity-90
            "
          />
        </div>
      </div>
    </div>
  );
}