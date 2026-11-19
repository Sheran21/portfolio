"use client";

import { Trophy, Medal, Crown, Star, ShieldCheck, GraduationCap, Rocket, Radio, type LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const achievements: { icon: LucideIcon; title: string; subtitle: string; year: string; description: string; tier: string }[] = [
  {
    icon: Trophy,
    title: "Best Team Pitch Award",
    subtitle: "Pitch60 - APIIT",
    year: "2026",
    description: "Recognised for presenting one of the strongest team startup pitches.",
    tier: "gold",
  },
  {
    icon: Medal,
    title: "3rd Place Winner",
    subtitle: "Startup Today - KDU",
    year: "2026",
    description: "Awarded 3rd place for innovation and entrepreneurial thinking.",
    tier: "bronze",
  },
  {
    icon: Crown,
    title: "House Captain",
    subtitle: "Highlands College",
    year: "2019",
    description: "Led student initiatives, house events, and school-level leadership activities.",
    tier: "silver",
  },
  {
    icon: Star,
    title: "Vice House Captain",
    subtitle: "Highlands College",
    year: "2018",
    description: "Supported leadership and coordination of student activities.",
    tier: "silver",
  },
  {
    icon: ShieldCheck,
    title: "Youth Cyber Security Summit",
    subtitle: "Participant",
    year: "2019",
    description: "Participated in cybersecurity awareness sessions and technical workshops.",
    tier: "default",
  },
  {
    icon: GraduationCap,
    title: "Nationwide Scholarship",
    subtitle: "ESOFT - FIT",
    year: "",
    description: "Completed the nationwide scholarship programme with academic excellence.",
    tier: "default",
  },
  {
    icon: Rocket,
    title: "IX25 Participation",
    subtitle: "Innovation Expo",
    year: "2025",
    description: "Participated in the IX25 innovation and technology exposition.",
    tier: "default",
  },
  {
    icon: Radio,
    title: "Club Member",
    subtitle: "Radio Club · ICT Society · Science & Tech",
    year: "",
    description: "Active member of the Radio Club, ICT Society, and Science & Technology Association.",
    tier: "default",
  },
];

const tierStyle: Record<string, string> = {
  gold:    "border-yellow-500/30 hover:border-yellow-500/60 hover:shadow-[0_0_24px_rgba(234,179,8,0.15)]",
  bronze:  "border-orange-600/30 hover:border-orange-500/50 hover:shadow-[0_0_24px_rgba(234,88,12,0.12)]",
  silver:  "border-gray-400/20   hover:border-gray-300/40   hover:shadow-[0_0_24px_rgba(148,163,184,0.1)]",
  default: "border-white/8       hover:border-purple-500/30 hover:shadow-[0_0_24px_rgba(168,85,247,0.1)]",
};

// Icon tile colours per tier
const tierIcon: Record<string, string> = {
  gold:    "text-yellow-300 border-yellow-400/30 bg-gradient-to-br from-yellow-400/20 to-yellow-400/[0.03] shadow-[0_8px_24px_-12px_rgba(250,204,21,0.8)]",
  bronze:  "text-orange-300 border-orange-400/30 bg-gradient-to-br from-orange-400/20 to-orange-400/[0.03] shadow-[0_8px_24px_-12px_rgba(251,146,60,0.8)]",
  silver:  "text-slate-200 border-slate-300/25 bg-gradient-to-br from-slate-300/15 to-slate-300/[0.03] shadow-[0_8px_24px_-12px_rgba(203,213,225,0.6)]",
  default: "text-violet-300 border-violet-400/25 bg-gradient-to-br from-violet-500/20 to-violet-500/[0.03] shadow-[0_8px_24px_-12px_rgba(139,92,246,0.8)]",
};

export default function RecognitionSection() {
  return (
    <section id="recognition" className="overflow-x-hidden px-4 sm:px-6 py-20 sm:py-28 bg-[var(--bg)] text-white">
      <div className="max-w-6xl mx-auto">

        <ScrollReveal direction="up">
          <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
            <span className="sec-num">05</span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-1">Achievements</p>
              <h2 className="text-4xl sm:text-5xl"><span className="font-accent text-violet-300">Recognition</span></h2>
              <div className="mt-2 h-[2px] w-20 sm:w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>
        </ScrollReveal>

        {/* 1-col → 2-col sm → 4-col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {achievements.map((item, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 60}>
              <div className={`group h-full rounded-xl sm:rounded-2xl border bg-white/[0.02] p-4 sm:p-5
                              transition-all duration-300 ${tierStyle[item.tier]}`}>

                <div className="flex items-start justify-between mb-3">
                  <span
                    aria-hidden
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-4deg] ${tierIcon[item.tier]}`}
                  >
                    <item.icon size={20} strokeWidth={1.75} />
                  </span>
                  {item.year && (
                    <span className="text-[10px] font-mono text-gray-600 border border-white/8 px-2 py-0.5 rounded-full">
                      {item.year}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold leading-snug group-hover:text-purple-100 transition">
                  {item.title}
                </h3>
                <p className="text-[10px] text-purple-300/60 mt-1 leading-relaxed">{item.subtitle}</p>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-2 leading-relaxed">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}