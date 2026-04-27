"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

type EducationItem = {
  year: string;
  title: string;
  institute: string;
  description: string;
  image: string;
  degree?: string;
};

const education: EducationItem[] = [
  {
    year: "2024 – Present",
    title: "BSc (Hons) Software Engineering",
    degree: "Undergraduate",
    institute: "University of Westminster / IIT",
    description:
      "Focusing on web development, OOP, databases, and software engineering fundamentals. Building projects using React, Next.js, and MySQL.",
    image: "/uow.png",
  },
  {
    year: "2023 – 2024",
    title: "Foundation in Computing",
    degree: "Foundation",
    institute: "Informatics Institute of Technology",
    description:
      "Built strong programming fundamentals and started working on small web projects.",
    image: "/iit.png",
  },
  {
    year: "2020 – 2023",
    title: "GCE Advanced Level",
    degree: "A/L",
    institute: "St. Thomas' College, Mount Lavinia",
    description:
      "Studied Physics, Combined Maths and IT. Developed problem-solving skills and a passion for software development. Played badminton competitively.",
    image: "/stc.png",
  },
  {
    year: "2010 – 2020",
    title: "GCE Ordinary Level",
    degree: "O/L",
    institute: "Highlands College, Maharagama",
    description:
      "Completed O/Ls focusing on Science and Mathematics. Participated in coding clubs and tech competitions. Leadership roles in sport activities.",
    image: "/hc.png",
  },
];

export default function EducationTimeline() {
  return (
    <section id="education" className="overflow-x-hidden px-4 sm:px-6 py-20 sm:py-28 bg-[#050507] text-white">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
            <span className="sec-num">06</span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-1">Academic path</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Education</h2>
              <div className="mt-2 h-[2px] w-20 sm:w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — offset matches dot position */}
          <div className="absolute left-[18px] sm:left-6 top-3 bottom-3 w-[1px]
                          bg-gradient-to-b from-purple-500/60 via-purple-500/20 to-transparent" />

          <div className="space-y-6 sm:space-y-8">
            {education.map((item, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                {/* pl matches: dot at left-[18px] on mobile, left-6 on sm+ */}
                <div className="relative pl-11 sm:pl-16">

                  {/* Dot */}
                  <div className="absolute left-[18px] sm:left-6 top-5 sm:top-6 -translate-x-1/2 z-10">
                    <div className="relative">
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-purple-500
                                      shadow-[0_0_14px_rgba(168,85,247,0.8)]" />
                      <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-25" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="group rounded-xl sm:rounded-2xl border border-white/8 bg-white/[0.02] p-4 sm:p-6
                                  hover:border-purple-500/30 hover:bg-white/[0.04]
                                  transition-all duration-300
                                  hover:shadow-[0_10px_40px_rgba(168,85,247,0.1)]">

                    {/* Year + degree row */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[10px] sm:text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
                        {item.year}
                      </span>
                      {item.degree && (
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-500 border border-white/10 px-2 py-0.5 rounded-full">
                          {item.degree}
                        </span>
                      )}
                    </div>

                    {/* Content + logo */}
                    <div className="flex gap-3 sm:gap-4 items-start">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-xl font-bold leading-snug group-hover:text-purple-100 transition">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-xs sm:text-sm text-purple-300/70">{item.institute}</p>
                        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Logo — always visible but smaller on mobile */}
                      <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 shrink-0">
                        <Image src={item.image} alt={item.institute} fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}