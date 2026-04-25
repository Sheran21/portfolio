"use client";

import ScrollReveal from "@/components/ScrollReveal";

const achievements = [
  {
    icon: "🏆",
    title: "Best Team Pitch Award",
    subtitle: "Pitch60 APIIT",
    year: "2026",
    description: "Recognized for presenting one of the strongest team startup pitches.",
    tier: "gold",
  },
  {
    icon: "🥉",
    title: "3rd Place Winner",
    subtitle: "Startup Today — KDU",
    year: "2026",
    description: "Awarded 3rd place for innovation and entrepreneurial thinking.",
    tier: "bronze",
  },
  {
    icon: "👑",
    title: "House Captain",
    subtitle: "Highlands College",
    year: "2019",
    description: "Led student initiatives, events, and house-level leadership activities.",
    tier: "silver",
  },
  {
    icon: "⭐",
    title: "Vice House Captain",
    subtitle: "Highlands College",
    year: "2018",
    description: "Supported leadership and coordination of student activities.",
    tier: "silver",
  },
  {
    icon: "🛡️",
    title: "Youth Cyber Security Summit",
    subtitle: "Participant",
    year: "2019",
    description: "Participated in cybersecurity awareness and technical workshops.",
    tier: "default",
  },
  {
    icon: "🎓",
    title: "Nationwide Scholarship",
    subtitle: "ESOFT – FIT",
    year: "",
    description: "Completed scholarship programme with academic excellence.",
    tier: "default",
  },
];

const tierStyle = {
  gold:    "border-yellow-500/30 hover:border-yellow-500/60 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]",
  bronze:  "border-orange-600/30 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(234,88,12,0.12)]",
  silver:  "border-gray-400/20   hover:border-gray-300/40   hover:shadow-[0_0_30px_rgba(148,163,184,0.1)]",
  default: "border-white/8       hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
};

export default function RecognitionSection() {
  return (
    <section id="recognition" className="px-6 py-28 bg-[#050507] text-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-4 mb-16">
            <span className="sec-num">05</span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-1">Achievements</p>
              <h2 className="text-4xl font-extrabold">Recognition</h2>
              <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>
        </ScrollReveal>

        {/* Trophy wall */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((item, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 80}>
              <div className={`group h-full rounded-2xl border bg-white/[0.02] backdrop-blur-sm p-6
                              transition-all duration-400 ${tierStyle[item.tier as keyof typeof tierStyle]}`}>

                {/* Icon + year */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl leading-none filter drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
                    {item.icon}
                  </div>
                  {item.year && (
                    <span className="text-xs font-mono text-gray-600 border border-white/8 px-2 py-0.5 rounded-full">
                      {item.year}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold leading-tight group-hover:text-purple-100 transition">
                  {item.title}
                </h3>
                <p className="text-xs text-purple-300/60 mt-1">{item.subtitle}</p>
                <p className="text-sm text-gray-400 mt-3 leading-relaxed">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}