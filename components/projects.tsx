"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import ScrollReveal from "@/components/ScrollReveal";

const projects = [
  {
    title: "Corpovinculo",
    description:
      "Frontend Lead on a multi-tenant event and sponsorship management SaaS. Built scalable UIs with Next.js & React, integrated REST APIs, and implemented Redux + TanStack Query state management.",
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
      "Full-stack food ordering system with user authentication, payment gateway, and an intuitive ordering interface.",
    image: "/ccp.png",
    tag: "Full-Stack",
    tech: ["Next.js", "Auth", "Payments", "UI/UX"],
    github: "https://github.com/Ceylon-Curry-Pot/Food-Delivery-Website",
    live: "https://www.ceyloncurrypot.lk",
    featured: false,
    year: "2026",
  },
  {
    title: "Lidan DJ Portfolio",
    description:
      "Modern DJ portfolio website featuring event showcases, music tracks, and media gallery with a secure admin panel. The admin dashboard allows authenticated management of events, tracks, and gallery content with real-time updates. Built as a fully responsive, production-ready web application",
    image: "/lidan-dj.png",
    tag: "Full-Stack",
    tech: ["Next.js","React", "Tailwind CSS", "Vercel", "REST API", "Authentication"],
    github: "https://github.com/ArteStruo/LidanDJ-Portfolio",
    live: "https://lidan-dj-portfolio.vercel.app",
    featured: false,
    year: "2026",
  },
  {
    title: "Inventory Tracker",
    description:
      "Restaurant inventory management with React frontend, Node.js/Express backend, RESTful APIs, and cloud deployment on Vercel & Render.",
    image: "/CCP-inventory.png",
    tag: "Full-Stack",
    tech: ["React.js", "Node.js", "Express.js", "Vercel"],
    github: "https://github.com/Sheran21/CCP_Inventory_Tracker",
    live: "https://ccp-inventory-tracker.vercel.app",
    featured: false,
    year: "2025",
  },
  {
    title: "Save Marine Life",
    description:
      "Awareness platform promoting marine conservation with interactive educational content.",
    image: "/SM.png",
    tag: "Awareness",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Sheran21/Save-Marine-Life",
    live: "",
    featured: false,
    year: "2024",
  },
];

const featured = projects.find(p => p.featured)!;
const rest = projects.filter(p => !p.featured);

export default function Projects() {
  return (
    <section id="projects" className="overflow-x-hidden px-4 sm:px-6 py-20 sm:py-28 bg-[#050507] text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
            <span className="sec-num">02</span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-1">What I&apos;ve built</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Projects</h2>
              <div className="mt-2 h-[2px] w-20 sm:w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>
        </ScrollReveal>

        {/* ── Featured card ── */}
        <ScrollReveal direction="up" delay={100}>
          <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/8 mb-5 sm:mb-6
                          hover:border-purple-500/40 transition-all duration-500
                          hover:shadow-[0_30px_80px_rgba(168,85,247,0.15)]">

            {/* Image */}
            <div className="relative h-[240px] sm:h-[340px] lg:h-[440px] w-full">
              <Image src={featured.image} alt={featured.title} fill priority
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                style={{ willChange: "transform" }} />
              {/* gradient covers full card on mobile, half on desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20
                                              lg:bg-gradient-to-r lg:from-black lg:via-black/75 lg:to-transparent" />
            </div>

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-12">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-purple-300 bg-purple-600/25 border border-purple-500/30 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                  {featured.tag}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                  Frontend Lead
                </span>
                <span className="text-[9px] sm:text-[10px] text-gray-500 font-mono">{featured.year}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3 leading-tight">
                {featured.title}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-md line-clamp-3 sm:line-clamp-none">
                {featured.description}
              </p>

              {/* Tech tags — hidden on very small screens */}
              <div className="hidden sm:flex flex-wrap gap-1.5 mt-3">
                {featured.tech.map(t => (
                  <span key={t} className="text-[9px] text-purple-300/70 border border-purple-500/15 bg-purple-500/8 px-2 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 sm:mt-6">
                {featured.live && (
                  <a href={featured.live} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 transition text-sm font-semibold min-h-[44px]">
                    <FaArrowUpRightFromSquare size={12} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {rest.map((project, i) => (
            <ScrollReveal key={project.title} direction="up" delay={i * 80 + 120}>
              <div className="group relative h-[300px] sm:h-[320px] rounded-2xl overflow-hidden border border-white/8 bg-black
                             hover:border-purple-500/50 transition-all duration-500
                             active:scale-[0.98] hover:-translate-y-1 sm:hover:-translate-y-2
                             hover:shadow-[0_20px_50px_rgba(168,85,247,0.18)]"
                   style={{ willChange: "transform" }}>
                <Image src={project.image} alt={project.title} fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  style={{ willChange: "transform" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/8 transition-colors duration-500" />

                {/* Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-purple-200 bg-purple-600/30 border border-purple-500/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {project.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 z-10 p-4 sm:p-5 w-full">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-base sm:text-lg font-bold leading-tight pr-2">{project.title}</h3>
                    <span className="text-[9px] text-gray-600 font-mono shrink-0 mt-0.5">{project.year}</span>
                  </div>
                  <p className="mt-1 text-[11px] sm:text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="text-[8px] sm:text-[9px] text-purple-400/60 border border-purple-500/10 px-1.5 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-2">
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 active:bg-purple-700 transition text-xs font-medium min-h-[36px]">
                        <FaArrowUpRightFromSquare size={10} /> Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 active:bg-white/15 transition text-xs font-medium min-h-[36px]">
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