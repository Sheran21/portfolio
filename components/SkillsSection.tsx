"use client";

import React, { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

// ── Data ──────────────────────────────────────────────────────────────────────

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
  { label: "Frontend Development",   color: "purple" },
  { label: "React / Next.js",        color: "cyan"   },
  { label: "REST API Integration",   color: "pink"   },
  { label: "Redux / TanStack Query", color: "amber"  },
  { label: "Component Architecture", color: "purple" },
  { label: "Responsive Design",      color: "cyan"   },
  { label: "CRUD Operations",        color: "pink"   },
  { label: "Full-Stack Development", color: "amber"  },
];

const tagColorMap: Record<string, string> = {
  purple: "bg-purple-500/10 border-purple-500/25 text-purple-200",
  cyan:   "bg-cyan-500/10   border-cyan-500/25   text-cyan-200",
  pink:   "bg-pink-500/10   border-pink-500/25   text-pink-200",
  amber:  "bg-amber-500/10  border-amber-500/25  text-amber-200",
};

// Orbital skill nodes — 3 rings × 4 nodes
const ORBITAL_SKILLS = [
  // Ring 0 — outer, slow
  { label: "React",    color: "#38BDF8", ring: 0, offset: 0 },
  { label: "Next.js",  color: "#a855f7", ring: 0, offset: Math.PI / 2 },
  { label: "TS",       color: "#FACC15", ring: 0, offset: Math.PI },
  { label: "Tailwind", color: "#0EA5E9", ring: 0, offset: Math.PI * 1.5 },
  // Ring 1 — mid, reverse
  { label: "Node",     color: "#F472B6", ring: 1, offset: 0.4 },
  { label: "Redux",    color: "#7C3AED", ring: 1, offset: 0.4 + Math.PI / 2 },
  { label: "MySQL",    color: "#22C55E", ring: 1, offset: 0.4 + Math.PI },
  { label: "Git",      color: "#F87171", ring: 1, offset: 0.4 + Math.PI * 1.5 },
  // Ring 2 — inner, fast
  { label: "Java",     color: "#EF4444", ring: 2, offset: 0.8 },
  { label: "Python",   color: "#22C55E", ring: 2, offset: 0.8 + Math.PI * 0.66 },
  { label: "REST",     color: "#c084fc", ring: 2, offset: 0.8 + Math.PI * 1.33 },
];

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

// ── Plasma Orb ────────────────────────────────────────────────────────────────

function PlasmaOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    // Responsive size
    const SIZE = Math.min(380, window.innerWidth - 32);
    canvas.width  = SIZE;
    canvas.height = SIZE;
    const cx = SIZE / 2, cy = SIZE / 2;

    // ── Scale factors so everything is relative to SIZE ──
    const S = SIZE / 380; // 1.0 at 380px

    const CORE_R  = 62  * S;
    const RINGS   = [148 * S, 115 * S, 82 * S] as const;
    const TILTS   = [0.38, -0.3, 0.22] as const;
    const SPEEDS  = [0.0004, -0.00065, 0.00095] as const;

    // Plasma surface points
    const plasma = Array.from({ length: 55 }, () => ({
      phi:   Math.random() * Math.PI,
      theta: Math.random() * Math.PI * 2,
      speed: (Math.random() - 0.5) * 0.009,
    }));

    // Inner particle cloud
    const innerParts = Array.from({ length: 110 }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist:  (18 + Math.random() * 48) * S,
      speed: (Math.random() - 0.5) * 0.016,
      size:  (Math.random() * 1.8 + 0.4) * S,
      alpha: Math.random() * 0.65 + 0.1,
      hue:   Math.random() < 0.55 ? 270 : 300,
    }));

    // Orbital nodes state
    const nodes = ORBITAL_SKILLS.map(n => ({ ...n, angle: n.offset }));

    let t = 0;

    function noise(x: number, y: number, time: number) {
      return (
        Math.sin(x * 3.1 + time)        * Math.cos(y * 2.7 - time * 0.7)  * 0.5 +
        Math.sin(x * 1.9 - time * 1.3)  * Math.sin(y * 4.1 + time * 0.5)  * 0.3 +
        Math.cos(x * 5.1 + y * 2.3 + time * 0.9) * 0.2
      );
    }

    function frame() {
      t += 0.008;
      ctx.clearRect(0, 0, SIZE, SIZE);

      // ── Ambient glow ──
      const amb = ctx.createRadialGradient(cx, cy, CORE_R * 0.5, cx, cy, SIZE * 0.52);
      amb.addColorStop(0,   "rgba(120,40,220,0.20)");
      amb.addColorStop(0.5, "rgba(80,20,160,0.08)");
      amb.addColorStop(1,   "transparent");
      ctx.fillStyle = amb;
      ctx.fillRect(0, 0, SIZE, SIZE);

      // ── Core sphere ──
      const sphereG = ctx.createRadialGradient(cx - 18 * S, cy - 18 * S, 4 * S, cx, cy, CORE_R);
      sphereG.addColorStop(0,    "rgba(230,190,255,0.96)");
      sphereG.addColorStop(0.22, "rgba(168,85,247,0.92)");
      sphereG.addColorStop(0.55, "rgba(109,28,194,0.88)");
      sphereG.addColorStop(0.82, "rgba(55,10,125,0.92)");
      sphereG.addColorStop(1,    "rgba(18,4,55,0.97)");
      ctx.beginPath();
      ctx.arc(cx, cy, CORE_R, 0, Math.PI * 2);
      ctx.fillStyle = sphereG;
      ctx.fill();

      // ── Plasma surface ──
      plasma.forEach(p => {
        p.theta += p.speed;
        const x3 = Math.sin(p.phi) * Math.cos(p.theta);
        const y3 = Math.sin(p.phi) * Math.sin(p.theta);
        const z3 = Math.cos(p.phi);
        if (z3 < 0) return;
        const sx = cx + x3 * CORE_R * 0.91;
        const sy = cy + y3 * CORE_R * 0.91;
        const n  = (noise(x3, y3, t) + 1) * 0.5;
        ctx.beginPath();
        ctx.arc(sx, sy, (n * 3.2 + 0.5) * S, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${260 + n * 80},100%,75%,${n * z3 * 0.75})`;
        ctx.fill();
      });

      // ── Specular highlight ──
      const spec = ctx.createRadialGradient(cx - 20 * S, cy - 22 * S, 0, cx - 16 * S, cy - 18 * S, 28 * S);
      spec.addColorStop(0,   "rgba(255,255,255,0.60)");
      spec.addColorStop(0.5, "rgba(255,255,255,0.14)");
      spec.addColorStop(1,   "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, CORE_R, 0, Math.PI * 2);
      ctx.fillStyle = spec;
      ctx.fill();

      // ── Outer glow pulse ──
      const pulse = 0.75 + 0.25 * Math.sin(t * 1.8);
      const glow  = ctx.createRadialGradient(cx, cy, CORE_R * 0.5, cx, cy, CORE_R * 2.3);
      glow.addColorStop(0,   `rgba(168,85,247,${0.38 * pulse})`);
      glow.addColorStop(0.4, `rgba(120,40,220,${0.15 * pulse})`);
      glow.addColorStop(1,   "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, CORE_R * 2.3, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // ── Inner particle cloud ──
      innerParts.forEach(p => {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.dist;
        const py = cy + Math.sin(p.angle) * p.dist * 0.55;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},90%,75%,${p.alpha * (0.5 + 0.5 * Math.sin(t * 2 + p.angle))})`;
        ctx.fill();
      });

      // ── Orbital rings ──
      RINGS.forEach((r, i) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, Math.cos(TILTS[i]));
        // Main ring
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(168,85,247,${0.18 - i * 0.04})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        // Bright inner line
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,130,255,${0.45 - i * 0.1})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
        ctx.restore();
      });

      // ── Orbital nodes ──
      nodes.forEach(node => {
        node.angle += SPEEDS[node.ring];
        const r    = RINGS[node.ring];
        const tilt = TILTS[node.ring];
        const z3d  = Math.sin(node.angle) * r;
        const x3d  = Math.cos(node.angle) * r;
        const sx   = cx + x3d;
        const sy   = cy + z3d * Math.cos(tilt);
        const depth = 0.52 + 0.48 * ((z3d / r + 1) / 2);
        const dotR  = (4 + depth * 2.5) * S;
        const alpha = 0.45 + 0.55 * depth;

        // Halo
        const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, dotR * 4);
        halo.addColorStop(0, node.color + "bb");
        halo.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(sx, sy, dotR * 4, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.globalAlpha = depth * 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Dot
        ctx.beginPath();
        ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Label — only on front half + outer rings
        if (depth > 0.6 && node.ring < 2) {
          const fs = Math.round((9 + depth * 4) * S);
          ctx.font = `600 ${fs}px 'DM Sans','Inter',sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.globalAlpha = alpha * 0.92;
          // subtle shadow for legibility
          ctx.shadowColor = "rgba(0,0,0,0.8)";
          ctx.shadowBlur  = 4;
          ctx.fillStyle   = "#ffffff";
          ctx.fillText(node.label, sx, sy - dotR - 9 * S);
          ctx.shadowBlur  = 0;
          ctx.globalAlpha = 1;
        }
      });

      // ── Center label ──
      ctx.font       = `700 ${Math.round(12 * S)}px 'Syne','DM Sans',sans-serif`;
      ctx.textAlign  = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle  = "rgba(255,255,255,0.92)";
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur  = 6;
      ctx.fillText("Core Stack", cx, cy + 2);
      ctx.shadowBlur  = 0;

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);

    const onResize = () => {
      const newSize = Math.min(380, window.innerWidth - 32);
      canvas.width  = newSize;
      canvas.height = newSize;
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Canvas orb */}
      <div className="relative">
        {/* Background blur halo behind canvas */}
        <div className="absolute inset-0 -m-8 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
        <canvas
          ref={canvasRef}
          className="relative z-10"
          style={{ imageRendering: "auto", maxWidth: "100%" }}
        />
      </div>

      {/* Legend row */}
      <div className="flex flex-wrap justify-center gap-2 max-w-xs sm:max-w-sm">
        {[
          { label: "React / Next.js", color: "#38BDF8" },
          { label: "TypeScript",      color: "#FACC15" },
          { label: "Node / Express",  color: "#F472B6" },
          { label: "Java / Python",   color: "#EF4444" },
          { label: "MySQL / MongoDB", color: "#A855F7" },
        ].map(({ label, color }) => (
          <span key={label}
                className="flex items-center gap-1.5 text-[10px] text-gray-400 border border-white/8 bg-white/[0.02] px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function SkillsSection() {
  return (
    <section id="skills" className="overflow-x-hidden px-4 sm:px-6 py-20 sm:py-28 bg-[#050507] text-white relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-900/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">

        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <span className="sec-num">01</span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-1">What I bring</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Skills &amp; Stack</h2>
              <div className="mt-2 h-[2px] w-20 sm:w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Left column ── */}
          <div className="space-y-6 sm:space-y-8">
            <ScrollReveal direction="up" delay={100}>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-lg">
                Software Engineering undergraduate at the University of Westminster (via IIT),
                specialising in full-stack web development. Proficient in building responsive,
                scalable applications with hands-on experience in API integration, state
                management, and real-world cloud deployment.
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
                  { num: "12+", label: "Technologies", color: "text-purple-400"  },
                  { num: "4+",  label: "Projects",     color: "text-cyan-400"    },
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
                  { label: "Frontend",  items: "React.js · Next.js · HTML5 · CSS3 · Tailwind CSS", color: "text-cyan-400"   },
                  { label: "Backend",   items: "Node.js · Express.js · REST APIs",                 color: "text-green-400"  },
                  { label: "Databases", items: "MySQL · MongoDB",                                  color: "text-purple-400" },
                  { label: "Languages", items: "JavaScript · TypeScript · Java · Python",          color: "text-yellow-400" },
                  { label: "State",     items: "Redux · TanStack Query",                           color: "text-pink-400"   },
                  { label: "Tools",     items: "Git · GitHub · Jira · Postman · Vercel · Render",  color: "text-orange-400" },
                  { label: "Concepts",  items: "Responsive Design · Component Architecture · CRUD · Basic Testing", color: "text-gray-400" },
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
                  Advanced React patterns, TypeScript architecture, scalable Next.js design,
                  and deepening full-stack skills with Node.js &amp; Express.js.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Right column — Plasma Orb ── */}
          <ScrollReveal direction="up" delay={180}>
            <div className="lg:sticky lg:top-28 space-y-4">
              <PlasmaOrb />

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