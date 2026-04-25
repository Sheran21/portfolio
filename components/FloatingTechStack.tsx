"use client";

import { FaReact, FaJava, FaPython, FaJs } from "react-icons/fa";
import { SiNextdotjs, SiTypescript } from "react-icons/si";

// Pure CSS animations with will-change for GPU compositing
// No JS timers, no layout thrashing
export default function FloatingTech() {
  return (
    <div className="hidden lg:block absolute right-8 top-[58%] -translate-y-1/2 h-[420px] w-[340px] z-[2] pointer-events-none">
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(3deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(-6deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0px) rotate(6deg); }
          50% { transform: translateY(-18px) rotate(9deg); }
        }
        .ft-a { animation: floatA 5s ease-in-out infinite; will-change: transform; }
        .ft-b { animation: floatB 4s ease-in-out infinite; will-change: transform; }
        .ft-c { animation: floatC 3.5s ease-in-out infinite; will-change: transform; }
      `}</style>

      <FaReact    className="ft-a absolute top-16 left-20 text-cyan-400 text-6xl opacity-70 drop-shadow-[0_0_18px_rgba(34,211,238,0.55)]" style={{ animationDelay: "0s" }} />
      <SiNextdotjs className="ft-b absolute top-0  left-44 text-white    text-5xl opacity-60" style={{ animationDelay: "0.6s" }} />
      <FaJs        className="ft-c absolute top-56 left-6  text-yellow-400 text-5xl opacity-70 drop-shadow-[0_0_14px_rgba(250,204,21,0.5)]"  style={{ animationDelay: "0.3s" }} />
      <SiTypescript className="ft-a absolute top-72 left-40 text-blue-400  text-5xl opacity-70 drop-shadow-[0_0_14px_rgba(59,130,246,0.5)]"  style={{ animationDelay: "1s" }} />
      <FaPython    className="ft-b absolute top-32 left-0  text-green-400 text-5xl opacity-60 drop-shadow-[0_0_14px_rgba(34,197,94,0.4)]"   style={{ animationDelay: "0.8s" }} />
      <FaJava      className="ft-c absolute top-52 left-64 text-red-400   text-5xl opacity-60 drop-shadow-[0_0_14px_rgba(239,68,68,0.4)]"    style={{ animationDelay: "0.4s" }} />
    </div>
  );
}