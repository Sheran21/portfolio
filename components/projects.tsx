"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import ScrollReveal from "@/components/ScrollReveal";

const projects = [
  {
    title: "Corpovinculo",
    description:
      "Frontend Lead on a multi-tenant event and sponsorship management SaaS platform. Designed scalable UIs with Next.js & React, integrated REST APIs, implemented state management with Redux and TanStack Query, and drove frontend architecture decisions.",
    image: "/Corpovinculo.png",
    tag: "SaaS Platform",
    tech: ["Next.js", "React", "Redux", "TanStack Query", "REST API"],
    github: "",
    live: "https://corpovinculo.com/home",
    featured: true,
    year: "2026",
  },
  {
    title: "Ceylon Curry Pot",
    description:
      "Full-stack online food ordering system built with Next.js. Includes user authentication, a payment gateway integration, intuitive browsing and ordering interface, and admin management.",
    image: "/ccp.png",
    tag: "Full-Stack",
    tech: ["Next.js", "Authentication", "Payment Integration", "UI/UX"],
    github: "https://github.com/Ceylon-Curry-Pot/Food-Delivery-Website",
    live: "",
    featured: false,
    year: "2025",
  },
  {
    title: "Inventory Tracker",
    description:
      "Full-stack restaurant inventory management system. React.js frontend with reusable components, Node.js/Express.js backend, RESTful APIs for CRUD operations, JSON data persistence, deployed on Vercel & Render.",
    image: "/CCP-inventory.png",
    tag: "Full-Stack",
    tech: ["React.js", "Node.js", "Express.js", "REST API", "Vercel"],
    github: "https://github.com/Sheran21/CCP_Inventory_Tracker",
    live: "https://ccp-inventory-tracker.vercel.app",
    featured: false,
    year: "2025",
  },
  {
    title: "Save Marine Life",
    description:
      "An awareness platform promoting marine conservation and sustainability with interactive content and educational resources.",
    image: "/SM.png",
    tag: "Awareness",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Sheran21/Save-Marine-Life",
    live: "",
    featured: false,
    year: "2025",
  },
];

const featured = projects.find(p => p.featured)!;
const rest = projects.filter(p => !p.featured);

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-28 bg-[#050507] text-white">
      <div className="mx-auto max-w-7xl">

        <ScrollReveal direction="up">
          <div className="flex items-center gap-4 mb-16">
            <span className="sec-num">02</span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-1">What I&apos;ve built</p>
              <h2 className="text-4xl font-extrabold">Projects</h2>
              <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>
        </ScrollReveal>

        {/* Featured card */}
        <ScrollReveal direction="up" delay={100}>
          <div className="group relative rounded-3xl overflow-hidden border border-white/8 mb-6
                          hover:border-purple-500/40 transition-all duration-500
                          hover:shadow-[0_30px_80px_rgba(168,85,247,0.15)]">
            <div className="relative h-[320px] sm:h-[440px] w-full">
              <Image src={featured.image} alt={featured.title} fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                style={{ willChange: "transform" }} />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-purple-300 bg-purple-600/25 border border-purple-500/30 px-3 py-1 rounded-full">
                    {featured.tag}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                    Featured — Frontend Lead
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">{featured.year}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold mb-3">{featured.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-md">{featured.description}</p>
                {/* Tech tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {featured.tech.map(t => (
                    <span key={t} className="text-[10px] text-purple-300/70 border border-purple-500/15 bg-purple-500/8 px-2.5 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  {featured.live && (
                    <a href={featured.live} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 transition text-sm font-semibold">
                      <FaArrowUpRightFromSquare size={12} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rest.map((project, i) => (
            <ScrollReveal key={project.title} direction="up" delay={i * 100 + 150}>
              <div className="group relative h-[360px] rounded-2xl overflow-hidden border border-white/8 bg-black
                             hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2
                             hover:shadow-[0_20px_50px_rgba(168,85,247,0.18)]"
                   style={{ willChange: "transform" }}>
                <Image src={project.image} alt={project.title} fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  style={{ willChange: "transform" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/8 transition-colors duration-500" />

                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] uppercase tracking-widest text-purple-200 bg-purple-600/30 border border-purple-500/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    {project.tag}
                  </span>
                </div>

                <div className="absolute bottom-0 z-10 p-5 w-full">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-lg font-bold leading-tight">{project.title}</h3>
                    <span className="text-[10px] text-gray-600 font-mono ml-2 mt-1 shrink-0">{project.year}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400 leading-relaxed line-clamp-3">{project.description}</p>
                  {/* Tech tags */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="text-[9px] text-purple-400/60 border border-purple-500/10 px-2 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 transition text-xs font-medium">
                        <FaArrowUpRightFromSquare size={10} /> Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition text-xs font-medium">
                        <FaGithub size={11} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}