"use client";

import React, { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const skillBars = [
  { label: "React.js / Next.js",       pct: 88, color: "#38BDF8" },
  { label: "JavaScript / TypeScript",  pct: 85, color: "#FACC15" },
  { label: "HTML5 / CSS3 / Tailwind",  pct: 90, color: "#0EA5E9" },
  { label: "Node.js / Express.js",     pct: 72, color: "#F472B6" },
  { label: "MySQL / MongoDB",          pct: 70, color: "#A855F7" },
  { label: "Java",                     pct: 72, color: "#EF4444" },
  { label: "Python",                   pct: 68, color: "#22C55E" },
  { label: "Git / GitHub / Jira",      pct: 78, color: "#F87171" },
];

const conceptTags = [
  { label: "Frontend Development",         color: "purple" },
  { label: "React / Next.js",              color: "cyan"   },
  { label: "REST API Integration",         color: "pink"   },
  { label: "Redux / TanStack Query",       color: "amber"  },
  { label: "Component Architecture",       color: "purple" },
  { label: "Responsive Design",            color: "cyan"   },
  { label: "CRUD Operations",              color: "pink"   },
  { label: "Full-Stack Development",       color: "amber"  },
];

const tagColorMap: Record<string, string> = {
  purple: "bg-purple-500/10 border-purple-500/25 text-purple-200",
  cyan:   "bg-cyan-500/10   border-cyan-500/25   text-cyan-200",
  pink:   "bg-pink-500/10   border-pink-500/25   text-pink-200",
  amber:  "bg-amber-500/10  border-amber-500/25  text-amber-200",
};

function SkillBar({ label, pct, color, delay }: { label: string; pct: number; color: string; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setWidth(pct), delay); obs.unobserve(el); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct, delay]);

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-300 font-medium">{label}</span>
        <span className="text-xs font-mono text-gray-500">{pct}%</span>
      </div>
      <div className="h-[5px] w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, boxShadow: `0 0 10px ${color}66` }}
        />
      </div>
    </div>
  );
}

function OrbitalRing() {
  return (
    <div className="relative flex items-center justify-center w-[280px] h-[280px] mx-auto">
      <style>{`
        @keyframes orbit1 { from { transform: rotateX(75deg) rotateZ(0deg); }   to { transform: rotateX(75deg) rotateZ(360deg); } }
        @keyframes orbit2 { from { transform: rotateX(75deg) rotateZ(120deg); } to { transform: rotateX(75deg) rotateZ(480deg); } }
        @keyframes orbit3 { from { transform: rotateX(75deg) rotateZ(240deg); } to { transform: rotateX(75deg) rotateZ(600deg); } }
        @keyframes counterSpin  { from { transform: rotateZ(0deg); }   to { transform: rotateZ(-360deg); } }
        @keyframes floatCenter  { 0%,100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-8px) scale(1.05); } }
      `}</style>
      <div className="absolute inset-0 rounded-full bg-purple-600/10 blur-3xl" />
      <div style={{ perspective: "600px" }} className="w-full h-full absolute">
        {[
          { size: 240, color: "purple-500/30",   orb: "purple-400",  glow: "#a855f7", dur: "6s",  dot: 8  },
          { size: 180, color: "fuchsia-500/25",  orb: "fuchsia-400", glow: "#e879f9", dur: "9s",  dot: 6  },
          { size: 120, color: "violet-400/20",   orb: "violet-300",  glow: "#8b5cf6", dur: "13s", dot: 4  },
        ].map(({ size, color, orb, glow, dur, dot }, i) => (
          <div key={i} className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d", animation: `orbit${i+1} ${dur} linear infinite`, willChange: "transform" }}>
            <div className={`rounded-full border border-${color}`} style={{ width: size, height: size }} />
            <div className={`absolute rounded-full bg-${orb}`}
              style={{ width: dot, height: dot, top: 0, left: "50%", marginLeft: -dot/2, boxShadow: `0 0 ${dot+6}px ${glow}`, animation: `counterSpin ${dur} linear infinite` }} />
          </div>
        ))}
      </div>
      <div className="absolute flex flex-col items-center justify-center z-10" style={{ animation: "floatCenter 4s ease-in-out infinite" }}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.6)]">
          <span className="text-xl font-bold font-mono">JS</span>
        </div>
        <span className="mt-2 text-xs text-purple-300/70 tracking-widest uppercase">Core Stack</span>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-28 bg-[#050507] text-white relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-fuchsia-900/6 blur-[80px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <ScrollReveal direction="up">
          <div className="flex items-center gap-4 mb-16">
            <span className="sec-num">01</span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-1">What I bring</p>
              <h2 className="text-4xl font-extrabold">Skills &amp; Stack</h2>
              <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left column ── */}
          <div className="space-y-8">
            <ScrollReveal direction="left" delay={100}>
              <p className="text-gray-400 leading-relaxed max-w-lg">
                Software Engineering undergraduate at the University of Westminster (via IIT),
                specialising in full-stack web development. Proficient in building responsive,
                scalable applications with hands-on experience in API integration, state management,
                and real-world cloud deployment.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={180}>
              <div className="flex flex-wrap gap-2">
                {conceptTags.map(t => (
                  <span key={t.label} className={`px-3 py-1.5 rounded-full text-xs border ${tagColorMap[t.color]}`}>
                    {t.label}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            {/* Animated skill bars */}
            <ScrollReveal direction="left" delay={100}>
              <div className="space-y-4">
                {skillBars.map((s, i) => <SkillBar key={s.label} {...s} delay={i * 80} />)}
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal direction="left" delay={300}>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { num: "12+", label: "Technologies", color: "text-purple-400"  },
                  { num: "4+",  label: "Projects",     color: "text-cyan-400"    },
                  { num: "6+",  label: "Certificates", color: "text-fuchsia-400" },
                ].map(({ num, label, color }) => (
                  <div key={label} className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-center">
                    <p className={`text-3xl font-extrabold ${color}`}>{num}</p>
                    <p className="text-xs text-gray-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Skill category rows */}
            <ScrollReveal direction="left" delay={340}>
              <div className="space-y-2.5">
                {[
                  { label: "Frontend",   items: "React.js · Next.js · HTML5 · CSS3 · Tailwind CSS",   color: "text-cyan-400"    },
                  { label: "Backend",    items: "Node.js · Express.js · REST APIs",                   color: "text-green-400"   },
                  { label: "Databases",  items: "MySQL · MongoDB",                                    color: "text-purple-400"  },
                  { label: "Languages",  items: "JavaScript · TypeScript · Java · Python",            color: "text-yellow-400"  },
                  { label: "State",      items: "Redux · TanStack Query",                             color: "text-pink-400"    },
                  { label: "Tools",      items: "Git · GitHub · Jira · Postman · Vercel · Render",    color: "text-orange-400"  },
                  { label: "Concepts",   items: "Responsive Design · Component Architecture · CRUD · Basic Testing", color: "text-gray-400" },
                ].map(({ label, items, color }) => (
                  <div key={label} className="flex gap-3 items-start rounded-xl border border-white/6 bg-white/[0.015] px-4 py-3">
                    <span className={`text-xs font-semibold uppercase tracking-wider w-20 shrink-0 pt-0.5 ${color}`}>{label}</span>
                    <span className="text-xs text-gray-400 leading-relaxed">{items}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Currently learning */}
            <ScrollReveal direction="left" delay={380}>
              <div className="rounded-xl border border-purple-500/15 bg-purple-500/8 p-4">
                <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider mb-2">Currently Learning</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Advanced React patterns, TypeScript architecture, scalable Next.js design, and deepening full-stack skills with Node.js &amp; Express.js.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Right column ── */}
          <ScrollReveal direction="right" delay={200}>
            <div className="sticky top-32 space-y-4">
              <OrbitalRing />

              {/* Languages */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-600 mb-4">Languages</p>
                <div className="space-y-3">
                  {[
                    { lang: "English",  level: "Fluent",   pct: 92,  color: "#a855f7" },
                    { lang: "Sinhala",  level: "Native",   pct: 100, color: "#38bdf8" },
                    { lang: "Japanese", level: "Beginner", pct: 18,  color: "#f472b6" },
                  ].map(({ lang, level, pct, color }) => (
                    <div key={lang}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">{lang}</span>
                        <span className="text-xs text-gray-600">{level}</span>
                      </div>
                      <div className="h-[4px] w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full opacity-70" style={{ width: `${pct}%`, background: color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft skills */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-600 mb-4">Soft Skills</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Problem Solving", "Critical Thinking", "Collaboration",
                    "Communication", "Leadership", "Adaptability",
                    "Time Management", "Creativity & Innovation",
                  ].map(s => (
                    <span key={s} className="text-xs text-gray-400 border border-white/8 bg-white/[0.02] px-3 py-1.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clubs / Activities */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-600 mb-4">Activities</p>
                <div className="flex flex-wrap gap-2">
                  {["Radio Club", "ICT Society", "Science & Tech Association", "IX25"].map(s => (
                    <span key={s} className="text-xs text-gray-400 border border-white/8 bg-white/[0.02] px-3 py-1.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}