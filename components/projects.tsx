"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const projects = [
  {
    title: "Corpovinculo",
    description:
      "Frontend Lead on a multi-tenant event and sponsorship management SaaS. Built scalable UIs with Next.js & React, integrated REST APIs, and implemented Redux + TanStack Query state management.",
    image: "/projects/corpovinculo-closeup.webp",
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
    image: "/projects/ccp-closeup.webp",
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
    image: "/projects/lidan-dj-closeup.webp",
    tag: "Full-Stack",
    tech: ["Next.js","React", "Tailwind CSS", "Vercel", "REST API", "Authentication"],
    github: "https://github.com/ArteStruo/LidanDJ-Portfolio",
    live: "https://www.lidanmusic.com",
    featured: false,
    year: "2026",
  },
  {
    title: "Inventory Tracker",
    description:
      "Restaurant inventory management with React frontend, Node.js/Express backend, RESTful APIs, and cloud deployment on Vercel & Render.",
    image: "/projects/ccp-inventory-closeup.webp",
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
    image: "/projects/save-marine-closeup.webp",
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

type Project = (typeof projects)[number];

/** Live / Code links, shared by both card styles. */
function ProjectLinks({ project, size = "md" }: { project: Project; size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the ${project.title} live site`}
          className={`group/link inline-flex items-center gap-1.5 rounded-full bg-white font-semibold text-black transition
                      hover:bg-violet-200 ${big ? "min-h-[46px] px-5 text-sm" : "min-h-[40px] px-4 text-[13px]"}`}
        >
          Live site
          <ArrowUpRight size={big ? 16 : 14} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View the ${project.title} source code on GitHub`}
          className={`inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] font-medium text-[var(--ink-muted)]
                      transition hover:border-violet-300/40 hover:text-white ${big ? "min-h-[46px] px-5 text-sm" : "min-h-[40px] px-4 text-[13px]"}`}
        >
          <FaGithub size={big ? 15 : 14} /> Code
        </a>
      )}
    </div>
  );
}

function TechList({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {tech.map(t => (
        <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-[var(--ink-muted)]">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** "01 · 2026 · SaaS Platform" meta line */
function Meta({ index, project }: { index: number; project: Project }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-dim)]">
      <span className="text-violet-300">{String(index).padStart(2, "0")}</span>
      <span className="h-px w-5 bg-white/15" />
      <span>{project.year}</span>
      <span aria-hidden>·</span>
      <span>{project.tag}</span>
    </p>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="overflow-x-hidden bg-[var(--bg)] px-4 py-20 text-white sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <ScrollReveal direction="up">
          <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="sec-num">02</span>
              <div>
                <p className="mb-1 text-xs uppercase tracking-[0.3em] text-purple-400">What I&apos;ve built</p>
                <h2 className="text-4xl sm:text-5xl">Selected <span className="font-accent text-violet-300">work</span></h2>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--ink-muted)] md:text-right">
              Products I&apos;ve designed and shipped — from SaaS platforms to full-stack apps for real businesses.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Featured ── */}
        <ScrollReveal direction="up" delay={100}>
          <article className="group grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-colors duration-500
                              hover:border-violet-400/30 lg:grid-cols-[1.35fr_1fr]">
            <div className="relative aspect-[16/10] overflow-hidden bg-black lg:aspect-auto lg:min-h-[420px]">
              <Image
                src={featured.image}
                alt={`${featured.title} website shown on a laptop`}
                fill
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-lime-200 backdrop-blur-md">
                Featured
              </span>
            </div>

            <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
              <Meta index={1} project={featured} />
              <div>
                <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">{featured.title}</h3>
                <p className="mt-2 text-sm font-medium text-violet-300">Frontend Lead</p>
              </div>
              <p className="text-[15px] leading-relaxed text-[var(--ink-muted)]">{featured.description}</p>
              <TechList tech={featured.tech} />
              <div className="pt-1">
                <ProjectLinks project={featured} size="lg" />
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* ── Grid ── */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-6 md:grid-cols-2 md:gap-6">
          {rest.map((project, i) => (
            <ScrollReveal key={project.title} direction="up" delay={i * 80 + 120}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]
                                  transition-all duration-500 hover:-translate-y-1 hover:border-violet-400/30
                                  hover:shadow-[0_24px_60px_-24px_rgba(139,92,246,0.45)]">
                <div className="relative aspect-[5/3] overflow-hidden bg-black">
                  <Image
                    src={project.image}
                    alt={`${project.title} website shown on a laptop`}
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                  <Meta index={i + 2} project={project} />
                  <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-[var(--ink-muted)]">{project.description}</p>
                  <TechList tech={project.tech} />
                  <div className="mt-auto pt-2">
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
