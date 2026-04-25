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
      "Completed O/Ls with a focus on Science and Mathematics. Participated in coding clubs and tech competitions. Leadership roles in sport activities.",
    image: "/hc.png",
  },
];

export default function EducationTimeline() {
  return (
    <section id="education" className="px-6 py-28 bg-[#050507] text-white">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-4 mb-16">
            <span className="sec-num">06</span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-1">Academic path</p>
              <h2 className="text-4xl font-extrabold">Education</h2>
              <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-3 bottom-3 w-[1px] bg-gradient-to-b from-purple-500/60 via-purple-500/20 to-transparent" />

          <div className="space-y-8">
            {education.map((item, idx) => (
              <ScrollReveal key={idx} direction="left" delay={idx * 100}>
                <div className="relative pl-16">
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 -translate-x-1/2 z-10">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_16px_rgba(168,85,247,0.8)]" />
                      <div className="absolute inset-0 w-4 h-4 rounded-full bg-purple-400 animate-ping opacity-30" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="group rounded-2xl border border-white/8 bg-white/[0.02] p-6
                                  hover:border-purple-500/30 hover:bg-white/[0.04]
                                  transition-all duration-400
                                  hover:shadow-[0_10px_40px_rgba(168,85,247,0.1)]">

                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-start">
                      <div className="flex-1">
                        {/* Year + degree badge */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                            {item.year}
                          </span>
                          {item.degree && (
                            <span className="text-[10px] uppercase tracking-wider text-gray-500 border border-white/10 px-2 py-0.5 rounded-full">
                              {item.degree}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold group-hover:text-purple-100 transition">{item.title}</h3>
                        <p className="mt-1 text-sm text-purple-300/70">{item.institute}</p>
                        <p className="mt-3 text-sm text-gray-400 leading-relaxed">{item.description}</p>
                      </div>

                      {/* Logo */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-white/10 bg-white/5 shrink-0 self-start">
                        <Image
                          src={item.image}
                          alt={item.institute}
                          fill
                          className="object-cover"
                        />
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