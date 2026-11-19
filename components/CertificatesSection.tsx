"use client";

import type { ComponentType } from "react";
import { Palette, Workflow, BadgeCheck } from "lucide-react";
import { FaJava } from "react-icons/fa";
import { SiTypescript, SiReact, SiPython } from "react-icons/si";
import ScrollReveal from "@/components/ScrollReveal";

type IconType = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

// Brand logos for technology certificates, Lucide icons for everything else
const certificates: { title: string; issuer: string; category: string; icon: IconType; tint: string }[] = [
  { title: "Java Essential Training",  issuer: "LinkedIn Learning",      category: "Programming", icon: FaJava,       tint: "#f87171" },
  { title: "Learning TypeScript",      issuer: "LinkedIn Learning",      category: "Programming", icon: SiTypescript, tint: "#3b82f6" },
  { title: "React Essential Training", issuer: "LinkedIn Learning",      category: "Frontend",    icon: SiReact,      tint: "#61dafb" },
  { title: "Python for Beginners",     issuer: "University of Moratuwa", category: "Programming", icon: SiPython,     tint: "#facc15" },
  { title: "Web Design for Beginners", issuer: "University of Moratuwa", category: "Design",      icon: Palette,      tint: "#f472b6" },
  { title: "Agile Workshop",           issuer: "Leo Club of IIT",        category: "Methodology", icon: Workflow,     tint: "#fbbf24" },
];

const categoryColor: Record<string, string> = {
  Programming: "bg-blue-500/10  border-blue-500/20  text-blue-300",
  Frontend:    "bg-cyan-500/10  border-cyan-500/20  text-cyan-300",
  Design:      "bg-pink-500/10  border-pink-500/20  text-pink-300",
  Methodology: "bg-amber-500/10 border-amber-500/20 text-amber-300",
};

const issuers = [
  "LinkedIn Learning", "University of Moratuwa", "Leo Club of IIT",
  "Informatics Institute of Technology", "ESOFT", "University of Westminster",
];

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-20 sm:py-28 bg-[var(--bg)] text-white overflow-hidden">

      {/* Header */}
      <div className="overflow-x-hidden px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
              <span className="sec-num">04</span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-1">Continuous learning</p>
                <h2 className="text-4xl sm:text-5xl"><span className="font-accent text-violet-300">Certified</span> learning</h2>
                <div className="mt-2 h-[2px] w-20 sm:w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80}>
            <p className="text-sm sm:text-base text-gray-400 max-w-xl mb-10 -mt-4 leading-relaxed">
              Certifications reflecting my continuous learning in software engineering and agile methodologies.
              For the latest, visit my{" "}
              <a href="https://www.linkedin.com/in/janul-samaranayake-41564732b"
                 target="_blank" rel="noopener noreferrer"
                 className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition">
                LinkedIn Certifications
              </a>.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Scrolling marquee - touch-friendly (no pointer-events needed) */}
      <div className="relative mb-8 sm:mb-10 overflow-hidden border-y border-white/5 bg-white/[0.015] py-3">
        <style>{`
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .cert-marquee { animation: marquee 22s linear infinite; will-change: transform; }
        `}</style>
        <div className="cert-marquee flex gap-6 sm:gap-8 whitespace-nowrap w-max">
          {[...issuers, ...issuers].map((s, i) => (
            <span key={i} className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-600 flex items-center gap-3 sm:gap-4">
              {s} <span className="text-purple-700">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Cards - 1 col mobile, 2 col sm, 3 col lg */}
      <div className="overflow-x-hidden px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {certificates.map((cert, i) => (
              <ScrollReveal key={cert.title} direction="up" delay={i * 60}>
                <div className="group rounded-xl sm:rounded-2xl border border-white/8 bg-white/[0.02] p-4 sm:p-5
                               hover:border-purple-500/30 hover:bg-white/[0.04]
                               transition-all duration-300
                               hover:shadow-[0_10px_40px_rgba(168,85,247,0.1)]
                               active:scale-[0.98]">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <span
                      aria-hidden
                      className="flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]"
                      style={{ color: cert.tint, borderColor: `${cert.tint}40`, background: `linear-gradient(145deg, ${cert.tint}26, ${cert.tint}0a)`, boxShadow: `0 8px 24px -12px ${cert.tint}` }}
                    >
                      <cert.icon size={20} />
                    </span>
                    <span className={`text-[9px] sm:text-[10px] font-medium uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border ${categoryColor[cert.category] ?? "bg-purple-500/10 border-purple-500/20 text-purple-300"}`}>
                      {cert.category}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold leading-snug group-hover:text-purple-100 transition">
                    {cert.title}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500">
                    <BadgeCheck size={13} className="text-violet-300/70" aria-hidden />
                    Issued by {cert.issuer}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}