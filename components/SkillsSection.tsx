"use client";

import React, { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const skills = [
  { label: "React / Next.js",  pct: 88, color: "#38BDF8" },
  { label: "JavaScript / TS",  pct: 85, color: "#FACC15" },
  { label: "Tailwind CSS",     pct: 90, color: "#0EA5E9" },
  { label: "Java",             pct: 72, color: "#EF4444" },
  { label: "Python",           pct: 70, color: "#22C55E" },
  { label: "MySQL / DBs",      pct: 68, color: "#A855F7" },
  { label: "Git & DevOps",     pct: 75, color: "#F87171" },
  { label: "Node.js",          pct: 65, color: "#F472B6" },
];

const tags = [
  { label: "Frontend Dev", color: "purple" },
  { label: "UI / UX Design", color: "cyan" },
  { label: "Fullstack Learning", color: "pink" },
];

function SkillBar({ label, pct, color, delay }: { label: string; pct: number; color: string; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setWidth(pct), delay);
        obs.unobserve(el);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct, delay]);

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-300 font-medium">{label}</span>
        <span className="text-xs font-mono text-gray-500">{pct}%</span>
      </div>
      <div className="h-[5px] w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 10px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}

// CSS-only 3D orbital ring — no Three.js needed
function OrbitalRing() {
  return (
    <div className="relative flex items-center justify-center w-[280px] h-[280px] mx-auto">
      <style>{`
        @keyframes orbit1 { from { transform: rotateX(75deg) rotateZ(0deg); } to { transform: rotateX(75deg) rotateZ(360deg); } }
        @keyframes orbit2 { from { transform: rotateX(75deg) rotateZ(120deg); } to { transform: rotateX(75deg) rotateZ(480deg); } }
        @keyframes orbit3 { from { transform: rotateX(75deg) rotateZ(240deg); } to { transform: rotateX(75deg) rotateZ(600deg); } }
        @keyframes counterSpin { from { transform: rotateZ(0deg); } to { transform: rotateZ(-360deg); } }
        @keyframes floatCenter { 0%,100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-8px) scale(1.05); } }
      `}</style>

      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-purple-600/10 blur-3xl" />

      {/* Perspective container */}
      <div style={{ perspective: "600px", perspectiveOrigin: "50% 50%" }} className="w-full h-full absolute">

        {/* Ring 1 */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d", animation: "orbit1 6s linear infinite", willChange: "transform" }}>
          <div className="w-[240px] h-[240px] rounded-full border border-purple-500/30" />
          <div className="absolute w-4 h-4 rounded-full bg-purple-400 shadow-[0_0_14px_#a855f7]" style={{ top: 0, left: "50%", marginLeft: "-8px", animation: "counterSpin 6s linear infinite" }} />
        </div>

        {/* Ring 2 */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d", animation: "orbit2 9s linear infinite", willChange: "transform" }}>
          <div className="w-[180px] h-[180px] rounded-full border border-fuchsia-500/25" />
          <div className="absolute w-3 h-3 rounded-full bg-fuchsia-400 shadow-[0_0_10px_#e879f9]" style={{ top: 0, left: "50%", marginLeft: "-6px", animation: "counterSpin 9s linear infinite" }} />
        </div>

        {/* Ring 3 */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d", animation: "orbit3 13s linear infinite", willChange: "transform" }}>
          <div className="w-[120px] h-[120px] rounded-full border border-violet-400/20" />
          <div className="absolute w-2 h-2 rounded-full bg-violet-300 shadow-[0_0_8px_#8b5cf6]" style={{ top: 0, left: "50%", marginLeft: "-4px", animation: "counterSpin 13s linear infinite" }} />
        </div>
      </div>

      {/* Center core */}
      <div className="absolute flex flex-col items-center justify-center z-10" style={{ animation: "floatCenter 4s ease-in-out infinite" }}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.6)]">
          <span className="text-2xl font-bold font-mono">JS</span>
        </div>
        <span className="mt-2 text-xs text-purple-300/70 tracking-widest uppercase">Core Stack</span>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="overflow-x-hidden px-6 py-28 bg-[#050507] text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-fuchsia-900/6 blur-[80px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">

        {/* Section header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="flex items-center gap-4 mb-16">
            <span className="sec-num">01</span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-1">What I bring</p>
              <h2 className="text-4xl font-extrabold">Skills &amp; Stack</h2>
              <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: description + tags + stats */}
          <div className="space-y-8">
            <ScrollReveal direction="left" delay={100}>
              <p className="text-gray-400 leading-relaxed max-w-lg">
                As a Software Engineering undergraduate at IIT / University of Westminster,
                I focus on building modern, responsive, and scalable web applications
                with strong frontend design principles and clean code.
              </p>
            </ScrollReveal>

            {/* Tags */}
            <ScrollReveal direction="left" delay={200}>
              <div className="flex flex-wrap gap-2">
                {tags.map(t => (
                  <span key={t.label} className={`px-4 py-2 rounded-full text-sm border ${
                    t.color === "purple" ? "bg-purple-500/10 border-purple-500/25 text-purple-200" :
                    t.color === "cyan"   ? "bg-cyan-500/10   border-cyan-500/25   text-cyan-200"   :
                                           "bg-pink-500/10   border-pink-500/25   text-pink-200"
                  }`}>{t.label}</span>
                ))}
              </div>
            </ScrollReveal>

            {/* Skill bars */}
            <ScrollReveal direction="left" delay={100}>
              <div className="space-y-4">
                {skills.map((s, i) => (
                  <SkillBar key={s.label} {...s} delay={i * 80} />
                ))}
              </div>
            </ScrollReveal>

            {/* Stats row */}
            <ScrollReveal direction="left" delay={300}>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { num: "10+", label: "Technologies", color: "text-purple-400" },
                  { num: "4+",  label: "Projects",     color: "text-cyan-400" },
                  { num: "6+",  label: "Certificates", color: "text-fuchsia-400" },
                ].map(({ num, label, color }) => (
                  <div key={label} className="rounded-xl border border-white/8 bg-white/3 p-4 text-center">
                    <p className={`text-3xl font-extrabold ${color}`}>{num}</p>
                    <p className="text-xs text-gray-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Currently learning */}
            <ScrollReveal direction="left" delay={350}>
              <div className="rounded-xl border border-purple-500/15 bg-purple-500/8 p-4">
                <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider mb-2">Currently Learning</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Advanced React patterns, TypeScript architecture, and scalable Next.js application design.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: 3D orbital ring */}
          <ScrollReveal direction="right" delay={200}>
            <OrbitalRing />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}