"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";

// three.js scene is client-only
const StackCore = dynamic(() => import("@/components/StackCore"), {
  ssr: false,
  loading: () => <div className="mx-auto aspect-square w-full max-w-[480px]" />,
});

// ── Data ──────────────────────────────────────────────────────────────────────

const skillBars = [
  // Languages
  { label: "JavaScript / TypeScript",        pct: 85, color: "#FACC15" },
  { label: "Java / Spring Boot",             pct: 72, color: "#EF4444" },
  { label: "Python",                         pct: 68, color: "#22C55E" },
  // Web
  { label: "React.js / Next.js / Angular",   pct: 88, color: "#38BDF8" },
  { label: "HTML5 / CSS3 / Tailwind",        pct: 90, color: "#0EA5E9" },
  // Mobile
  { label: "Flutter / Dart / Android",       pct: 65, color: "#54C5F8" },
  // Backend & data
  { label: "Node.js / Express.js",           pct: 72, color: "#F472B6" },
  { label: "PostgreSQL / MySQL / MongoDB",   pct: 72, color: "#A855F7" },
  // Cloud, testing & workflow
  { label: "Docker / CI/CD / Cloud",         pct: 65, color: "#2496ED" },
  { label: "Jest / Cypress / Testing",       pct: 66, color: "#E879F9" },
  { label: "Git / GitHub / GitLab / Jira",   pct: 80, color: "#F87171" },
];

const conceptTags = [
  { label: "Software Development",      color: "purple" },
  { label: "Web Applications",          color: "cyan"   },
  { label: "Mobile Apps",               color: "pink"   },
  { label: "Backend Services & APIs",   color: "amber"  },
  { label: "Cloud & DevOps",            color: "purple" },
  { label: "Testing & Quality",         color: "cyan"   },
  { label: "System Design",             color: "pink"   },
  { label: "Agile Delivery",            color: "amber"  },
];

const tagColorMap: Record<string, string> = {
  purple: "bg-purple-500/10 border-purple-500/25 text-purple-200",
  cyan:   "bg-cyan-500/10   border-cyan-500/25   text-cyan-200",
  pink:   "bg-pink-500/10   border-pink-500/25   text-pink-200",
  amber:  "bg-amber-500/10  border-amber-500/25  text-amber-200",
};

// ── Skill bar ─────────────────────────────────────────────────────────────────

function SkillBar({ label, pct, color, delay }: { label: string; pct: number; color: string; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setWidth(pct), delay); obs.unobserve(el); }
    }, { threshold: 0.2 });
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
        <div className="h-full rounded-full transition-all duration-1000 ease-out"
             style={{ width: `${width}%`, background: `linear-gradient(90deg,${color}88,${color})`, boxShadow: `0 0 10px ${color}66` }} />
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function SkillsSection() {
  return (
    <section id="skills" className="overflow-x-hidden px-4 sm:px-6 py-20 sm:py-28 bg-[var(--bg)] text-white relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-900/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">

        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <span className="sec-num">01</span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-1">What I bring</p>
              <h2 className="text-4xl sm:text-5xl">Skills &amp; <span className="font-accent text-violet-300">stack</span></h2>
              <div className="mt-2 h-[2px] w-20 sm:w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Left column ── */}
          <div className="space-y-6 sm:space-y-8">
            <ScrollReveal direction="up" delay={100}>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-lg">
                Intern Software Engineer @ itZorix and Software Engineering undergraduate at the
                University of Westminster (via IIT). I build software end to end - web and
                mobile applications, backend services and APIs, databases, cloud deployments
                and automated testing - and deliver it as reliable, maintainable products.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={160}>
              <div className="flex flex-wrap gap-2">
                {conceptTags.map(t => (
                  <span key={t.label} className={`px-3 py-1.5 rounded-full text-xs border ${tagColorMap[t.color]}`}>
                    {t.label}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="space-y-4">
                {skillBars.map((s, i) => <SkillBar key={s.label} {...s} delay={i * 80} />)}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={280}>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { num: "20+", label: "Technologies", color: "text-purple-400"  },
                  { num: "5+",  label: "Projects",     color: "text-cyan-400"    },
                  { num: "6+",  label: "Certificates", color: "text-fuchsia-400" },
                ].map(({ num, label, color }) => (
                  <div key={label} className="rounded-xl border border-white/8 bg-white/[0.02] p-3 sm:p-4 text-center">
                    <p className={`text-2xl sm:text-3xl font-extrabold ${color}`}>{num}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={320}>
              <div className="space-y-2">
                {[
                  { label: "Languages", items: "TypeScript · JavaScript · Java · Python · Dart",           color: "text-yellow-400" },
                  { label: "Web",       items: "React · Next.js · Angular · Redux · TanStack Query · Tailwind CSS",   color: "text-cyan-400"   },
                  { label: "Mobile",    items: "Flutter · Android",                                         color: "text-sky-400"    },
                  { label: "Backend",   items: "Spring Boot · Node.js · Express.js · REST APIs · Prisma",                 color: "text-green-400"  },
                  { label: "Data",      items: "PostgreSQL · MySQL · MongoDB · Firebase",                   color: "text-purple-400" },
                  { label: "Cloud",     items: "Docker · Nginx · Vercel · Render · CI/CD",                  color: "text-orange-400" },
                  { label: "Testing",   items: "Jest · Testing Library · Cypress · Code Quality",           color: "text-pink-400"   },
                  { label: "Workflow",  items: "Git · GitHub · GitLab · Jira · Postman · Figma · Agile",    color: "text-gray-400"   },
                ].map(({ label, items, color }) => (
                  <div key={label} className="flex gap-3 items-start rounded-xl border border-white/6 bg-white/[0.015] px-3 sm:px-4 py-3">
                    <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider w-16 sm:w-20 shrink-0 pt-0.5 ${color}`}>
                      {label}
                    </span>
                    <span className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">{items}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={360}>
              <div className="rounded-xl border border-purple-500/15 bg-purple-500/8 p-4">
                <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider mb-2">Currently Learning</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Scalable system design, cloud-native services and containerised
                  deployments, cross-platform mobile with Flutter, and testing at scale.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Right column - Plasma Orb ── */}
          <ScrollReveal direction="up" delay={180}>
            <div className="lg:sticky lg:top-28 space-y-4">
              <div className="relative">
                <div className="pointer-events-none absolute inset-[12%] rounded-full bg-violet-700/20 blur-[80px]" />
                <StackCore />
              </div>

              {/* Languages */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 sm:p-5">
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
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-600 mb-4">Soft Skills</p>
                <div className="flex flex-wrap gap-2">
                  {["Problem Solving","Critical Thinking","Collaboration","Communication","Leadership","Adaptability","Time Management","Creativity & Innovation"].map(s => (
                    <span key={s} className="text-xs text-gray-400 border border-white/8 bg-white/[0.02] px-3 py-1.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-600 mb-4">Activities</p>
                <div className="flex flex-wrap gap-2">
                  {["Radio Club","ICT Society","Science & Tech Association","IX25"].map(s => (
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