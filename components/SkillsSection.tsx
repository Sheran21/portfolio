"use client";

import React from "react";
import SkillCube from "@/components/SkillCube";

const skills = [
  { label: "JavaScript", color: "#FACC15" },
  { label: "HTML", color: "#FB923C" },
  { label: "React", color: "#38BDF8" },
  { label: "Python", color: "#22C55E" },
  { label: "CSS", color: "#4F46E5" },
  { label: "NEXT.Js", color: "#A855F7" },
  { label: "JAVA", color: "#EF4444" },
  { label: "MYSQL", color: "#06B6D4" },
  { label: "GIT", color: "#F87171" },
  { label: "TypeScript", color: "#3B82F6" },
  { label: "Tailwind css", color: "#0EA5E9" },
  { label: "Node.Js", color: "#F472B6" },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="px-6 py-24 bg-black text-white relative overflow-hidden"
    >
      {/* background glow */}
      <div className="absolute left-1/3 top-20 h-72 w-72 bg-purple-600/10 blur-3xl rounded-full" />

      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl font-bold uppercase tracking-wide">
            MY SKILLS
          </h2>

          <div className="h-[3px] w-32 bg-white rounded-full mt-3 mb-6" />

          <p className="text-gray-300 leading-relaxed max-w-lg">
            As a Software Engineering undergraduate, I focus on building
            modern, responsive, and scalable web applications with strong
            frontend design principles and clean development practices.
          </p>

          {/* Skill tags */}
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-sm">
              Frontend Development
            </span>
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-sm">
              UI / UX Design
            </span>
            <span className="px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 text-sm">
              Fullstack Learning
            </span>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-3xl font-bold text-purple-400">10+</p>
              <p className="text-sm text-gray-400 mt-1">Technologies</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-3xl font-bold text-cyan-400">3+</p>
              <p className="text-sm text-gray-400 mt-1">Projects Built</p>
            </div>
          </div>

          {/* learning box */}
          <div className="mt-8 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4">
            <p className="text-sm text-purple-300 font-semibold">
              Currently Learning
            </p>
            <p className="text-gray-300 mt-2 text-sm">
              Advanced React patterns, TypeScript architecture, and scalable
              Next.js application design.
            </p>
          </div>
        </div>

        {/* RIGHT CUBES */}
        <div className="grid grid-cols-3 gap-8 justify-items-center">
          {skills.map((skill) => (
            <SkillCube
              key={skill.label}
              label={skill.label}
              color={skill.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}