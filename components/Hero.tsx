"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowUpRight, ArrowDown, MapPin, Download, Layers } from "lucide-react";
import LightRays from "@/components/LightRays";
import { IconCloud } from "@/components/ui/icon-cloud";

// Tech the cloud orbits — languages, web, mobile, backend, data, cloud, testing & tooling
const slugs = [
  "typescript", "javascript", "openjdk", "python", "dart",
  "react", "nextdotjs", "angular", "flutter", "android", "html5", "css", "tailwindcss", "redux",
  "nodedotjs", "express", "springboot", "prisma",
  "postgresql", "mysql", "mongodb", "firebase",
  "docker", "nginx", "linux", "githubactions", "vercel",
  "jest", "testinglibrary", "cypress",
  "git", "github", "gitlab", "jira", "postman", "figma", "androidstudio",
];

// Brands whose official colour is black/near-black → render white on dark bg
const MONO = new Set(["nextdotjs", "express", "github", "vercel", "render", "prisma"]);

const images = slugs.map((slug) =>
  MONO.has(slug)
    ? `https://cdn.simpleicons.org/${slug}/ffffff`
    : `https://cdn.simpleicons.org/${slug}`,
);

const stats = [
  { num: "5+", label: "Projects" },
  { num: "20+", label: "Technologies" },
  { num: "6+", label: "Certifications" },
];

export default function Hero() {
  return (
    <header className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--bg)] grain">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <LightRays
          raysOrigin="top-center" raysColor="#7c3aed" raysSpeed={0.6}
          lightSpread={0.5} rayLength={2.4} followMouse={false}
          mouseInfluence={0} noiseAmount={0} distortion={0}
          pulsating={false} fadeDistance={1} saturation={1.1}
        />
      </div>
      <div className="absolute inset-0 -z-10 dot-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -z-10 right-[-10%] top-[10%] h-[560px] w-[560px] rounded-full bg-violet-700/20 blur-[140px]" />
      <div className="absolute -z-10 left-[-8%] bottom-[-10%] h-[420px] w-[420px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-[var(--bg)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-28 sm:px-8
                      lg:min-h-[100svh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-12 lg:pt-24">

        {/* ── Copy ── */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <div className="hero-in inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03]
                          py-1.5 pl-2 pr-4 text-xs text-[var(--ink-muted)] backdrop-blur"
               style={{ animationDelay: "0.1s" }}>
            <span className="flex items-center gap-1.5 rounded-full bg-lime-300/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-lime-200">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-lime-300" />
              Now
            </span>
            Software Engineer @ itZorix
          </div>

          <h1 className="hero-in mt-6 font-display text-[clamp(2.6rem,8vw,5.6rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
              style={{ animationDelay: "0.2s" }}>
            <span className="block text-[var(--ink)]">Janul</span>
            <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-200 bg-clip-text pb-2 text-transparent">
              Samaranayake
            </span>
          </h1>

          <p className="hero-in mt-4 font-accent text-[clamp(1.35rem,2.6vw,2rem)] leading-snug text-[var(--ink)]/90"
             style={{ animationDelay: "0.3s" }}>
            Software engineer building <span className="text-violet-300">reliable</span>,{" "}
            <span className="text-fuchsia-300">scalable</span> software — from interface to infrastructure.
          </p>

          <p className="hero-in mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--ink-muted)] lg:mx-0 sm:text-base"
             style={{ animationDelay: "0.4s" }}>
            I design, build and ship software end to end — web and mobile apps, backend
            services and APIs, data, cloud deployments and automated testing — with clean
            architecture and great user experience at the core.
          </p>

          <ul className="hero-in mt-5 flex flex-wrap justify-center gap-2 lg:justify-start"
              style={{ animationDelay: "0.45s" }}>
            {["Web", "Mobile", "Backend & APIs", "Cloud & DevOps", "Testing & QA"].map((c) => (
              <li key={c} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-[var(--ink-muted)]">
                {c}
              </li>
            ))}
          </ul>

          <div className="hero-in mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
               style={{ animationDelay: "0.5s" }}>
            <a href="#projects"
               className="group relative inline-flex min-h-[50px] items-center justify-center gap-2 overflow-hidden rounded-full
                          bg-white px-7 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5">
              <span className="absolute inset-0 bg-gradient-to-r from-violet-300 via-fuchsia-200 to-lime-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative">View my work</span>
              <ArrowUpRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="/Janul Samaranayake.pdf" target="_blank" rel="noopener noreferrer"
               className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-white/15
                          bg-white/[0.03] px-7 text-sm font-medium text-[var(--ink)] backdrop-blur transition
                          hover:border-violet-300/50 hover:bg-violet-500/10">
              <Download size={15} /> Download CV
            </a>
          </div>

          <div className="hero-in mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start"
               style={{ animationDelay: "0.6s" }}>
            <div className="flex gap-2">
              {[
                { href: "https://github.com/Sheran21", icon: <FaGithub size={17} />, label: "GitHub" },
                { href: "https://www.linkedin.com/in/janul-samaranayake-41564732b", icon: <FaLinkedin size={17} />, label: "LinkedIn" },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                   className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]
                              text-[var(--ink-muted)] transition hover:border-violet-300/50 hover:text-white">
                  {icon}
                </a>
              ))}
            </div>
            <span className="hidden h-8 w-px bg-white/10 sm:block" />
            <dl className="flex gap-6">
              {stats.map(({ num, label }) => (
                <div key={label} className="text-left">
                  <dt className="font-display text-xl font-bold leading-none text-white">{num}</dt>
                  <dd className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)]">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── Visual: portrait as the core of the icon cloud ── */}
        <div className="hero-in order-1 lg:order-2 relative mx-auto w-full max-w-[min(94vw,600px)]"
             style={{ animationDelay: "0.05s" }}>
          <div className="relative aspect-square w-full">
            {/* faint guide rings */}
            <div className="absolute inset-[7%] rounded-full border border-white/[0.06]" />
            <div className="absolute inset-[20%] rounded-full border border-dashed border-violet-300/10 [animation:spin_60s_linear_infinite]" />

            <IconCloud images={images} showControl={false} radiusRatio={0.42} iconSize={52} coreRatio={0.2}>
              {/* Core: circular portrait */}
              <div className="core-breathe relative aspect-square w-[40%]">
                <div className="absolute -inset-[30%] rounded-full bg-violet-600/35 blur-3xl" />
                <div className="absolute -inset-[9%] rounded-full border border-violet-300/20 [animation:spin_24s_linear_infinite]">
                  <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-200 shadow-[0_0_12px_rgba(217,249,157,0.9)]" />
                </div>
                <div className="conic-border absolute inset-0 rounded-full p-[3px] shadow-[0_0_60px_-10px_rgba(139,92,246,0.8)]">
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-[#d9c3a5]">
                    <Image
                      src="/me.png"
                      alt="Portrait of Janul Samaranayake"
                      width={672}
                      height={1408}
                      priority
                      sizes="(min-width: 1024px) 320px, 55vw"
                      className="absolute max-w-none"
                      style={{ width: "133%", height: "auto", left: "-30%", top: "-56%" }}
                    />
                    <div className="core-sheen absolute inset-0" />
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(30,10,60,0.55)]" />
                  </div>
                </div>
              </div>
            </IconCloud>

            {/* Floating chips */}
            <div className="float-y pointer-events-none absolute left-[2%] top-[18%] hidden items-center gap-2 rounded-2xl border border-white/10
                            bg-[#0d0b14]/80 px-3 py-2 text-xs text-[var(--ink-muted)] shadow-xl backdrop-blur-md sm:flex">
              <MapPin size={13} className="text-fuchsia-300" /> Sri Lanka
            </div>
            <div className="float-y pointer-events-none absolute bottom-[14%] right-[0%] hidden items-center gap-2.5 rounded-2xl border border-white/10
                            bg-[#0d0b14]/80 px-3 py-2 shadow-xl backdrop-blur-md sm:flex"
                 style={{ animationDelay: "1.5s" }}>
              <Layers size={14} className="text-lime-200" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)]">Building across</p>
                <p className="text-xs font-semibold text-white">Web · Mobile · Cloud</p>
              </div>
            </div>
          </div>
          <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-dim)]">
            drag the cloud or click an icon
          </p>
        </div>
      </div>

      <a href="#skills" aria-label="Scroll to skills"
         className="scroll-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2
                    font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-dim)] lg:flex">
        <ArrowDown size={14} />
        scroll
      </a>
    </header>
  );
}
