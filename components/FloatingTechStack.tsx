"use client";

import { FaReact, FaJava, FaPython, FaJs } from "react-icons/fa";
import { SiNextdotjs, SiTypescript } from "react-icons/si";

export default function FloatingTech() {
  return (
    <div className="hidden lg:block absolute right-8 top-[58%] -translate-y-1/2 h-[420px] w-[340px] z-[2] pointer-events-none">

      {/* React (main anchor) */}
      <FaReact className="absolute top-16 left-20 text-cyan-400 text-6xl opacity-70 animate-floatSlow drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]" />

      {/* Next.js */}
      <SiNextdotjs className="absolute top-0 left-44 text-white text-5xl opacity-60 animate-floatMedium -rotate-6" />

      {/* JS */}
      <FaJs className="absolute top-56 left-6 text-yellow-400 text-5xl opacity-70 animate-floatFast rotate-6" />

      {/* TS */}
      <SiTypescript className="absolute top-72 left-40 text-blue-400 text-5xl opacity-70 animate-floatSlow -rotate-12" />

      {/* Python */}
      <FaPython className="absolute top-32 left-0 text-green-400 text-5xl opacity-60 animate-floatMedium rotate-12" />

      {/* Java */}
      <FaJava className="absolute top-52 left-64 text-red-400 text-5xl opacity-60 animate-floatFast -rotate-3" />

    </div>
  );
}