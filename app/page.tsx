"use client";

import LightRays from "@/components/LightRays";
import Image from "next/image";
import SkillsSection from "@/components/SkillsSection";
import Projects from "@/components/projects";
import EducationTimeline from "@/components/EducationTimeline";
import NeonDivider from "@/components/NeonDivider";
import Articles from "@/components/Article";
import CertificatesSection from "@/components/CertificatesSection";
import RecognitionSection from "@/components/RecognitionSection";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import FloatingTech from "@/components/FloatingTechStack";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        body {
          font-family: 'DM Sans', sans-serif;
          /* Prevent ANY horizontal overflow site-wide */
          overflow-x: hidden;
          max-width: 100vw;
        }
        h1, h2, h3 { font-family: 'Syne', sans-serif; }

        /* ── Custom cursor: ONLY on pointer-fine (mouse) devices ── */
        @media (pointer: fine) {
          * { cursor: none !important; }
          #cursor-dot {
            position: fixed; top: 0; left: 0; z-index: 9999;
            width: 8px; height: 8px; margin: -4px 0 0 -4px;
            border-radius: 50%; background: #a855f7;
            pointer-events: none; will-change: transform;
          }
          #cursor-ring {
            position: fixed; top: 0; left: 0; z-index: 9998;
            width: 36px; height: 36px; margin: -18px 0 0 -18px;
            border-radius: 50%; border: 1.5px solid rgba(168,85,247,0.5);
            pointer-events: none; transition: transform 0.18s ease-out;
            will-change: transform;
          }
          body:has(a:hover) #cursor-ring,
          body:has(button:hover) #cursor-ring { transform: scale(1.6) !important; }
        }
        /* Hide cursors on touch devices */
        @media (pointer: coarse) {
          #cursor-dot, #cursor-ring { display: none !important; }
        }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-tag  { animation: heroFadeUp 0.6s cubic-bezier(.22,.68,0,1.05) 0.2s  both; }
        .hero-h1   { animation: heroFadeUp 0.7s cubic-bezier(.22,.68,0,1.05) 0.38s both; }
        .hero-desc { animation: heroFadeUp 0.7s cubic-bezier(.22,.68,0,1.05) 0.54s both; }
        .hero-btns { animation: heroFadeUp 0.7s cubic-bezier(.22,.68,0,1.05) 0.68s both; }
        .hero-soc  { animation: heroFadeUp 0.6s cubic-bezier(.22,.68,0,1.05) 0.80s both; }
        .hero-img  { animation: heroFadeUp 0.8s cubic-bezier(.22,.68,0,1.05) 0.1s  both; }

        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0);    opacity: 1;   }
          60%       { transform: translateX(-50%) translateY(10px); opacity: 0.4; }
        }
        .scroll-cue { animation: scrollBounce 2s ease-in-out infinite; }

        .dot-grid {
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /*
          sec-num: the ghost section numbers (01, 02 …)
          KEY FIX: use overflow:hidden + a contained max-width so they never
          push the page wider than 100vw on mobile.
          clamp(2.5rem, 10vw, 6rem) = 40px on tiny phones → 96px on desktop.
        */
        .sec-num {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.5rem, 10vw, 6rem);
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(180deg, rgba(168,85,247,0.18) 0%, transparent 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          user-select: none;
          pointer-events: none;
          /* Critical: don't let this flex item grow or shrink weirdly */
          flex-shrink: 0;
          /* Clip any overflow just in case */
          overflow: hidden;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div id="cursor-dot" />
      <div id="cursor-ring" />
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
          var dot  = document.getElementById('cursor-dot');
          var ring = document.getElementById('cursor-ring');
          if (!dot || !ring) return;
          document.addEventListener('mousemove', function(e) {
            dot.style.transform  = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
            ring.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
          }, { passive: true });
        })();
      `}} />

      {/*
        overflow-x:hidden on the root wrapper as a second safety net.
        overflow-x on body alone sometimes doesn't catch absolutely-positioned children.
      */}
      <div id="top" className="bg-[#050507] text-white overflow-x-hidden">
        <Navbar />

        {/* ── HERO ── */}
        <header className="relative min-h-screen bg-[#050507] overflow-hidden flex items-center dot-grid">

          {/* Light rays */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <LightRays
              raysOrigin="top-center" raysColor="#6d28d9" raysSpeed={0.8}
              lightSpread={0.45} rayLength={2.8} followMouse={false}
              mouseInfluence={0} noiseAmount={0} distortion={0}
              pulsating={false} fadeDistance={1} saturation={1.2}
            />
          </div>

          {/* Floating tech icons — desktop only (already hidden on mobile via component) */}
          <FloatingTech />

          {/* Glow blobs */}
          <div className="absolute inset-0 z-[1] pointer-events-none">
            <div className="absolute left-1/2 top-28 -translate-x-1/2 h-[400px] w-[400px] bg-purple-700/15 blur-[100px] rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/20 via-[#050507]/30 to-[#050507]" />
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 w-full
                          pt-28 pb-24 md:pt-0 md:pb-0
                          flex flex-col items-center gap-8
                          md:grid md:grid-cols-[180px_1fr] md:gap-12 md:items-center">

            {/* Avatar */}
            <div className="hero-img flex justify-center">
              <div className="relative">
                <div className="absolute -inset-[3px] rounded-full opacity-90"
                     style={{ background: "conic-gradient(from 0deg, #7c3aed, #c084fc, #7c3aed)", animation: "spin 8s linear infinite" }} />
                <div className="absolute -inset-[3px] rounded-full bg-[#050507]"
                     style={{ clipPath: "inset(3px round 9999px)" }} />
                <Image
                  src="/me.png" alt="Janul Samaranayake"
                  width={160} height={160} priority
                  className="relative w-[130px] h-[130px] sm:w-[155px] sm:h-[155px] md:w-[175px] md:h-[175px]
                             rounded-full object-cover aspect-square z-10"
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20
                               flex items-center gap-1.5 px-3 py-1 rounded-full
                               bg-[#050507] border border-white/10 text-[11px] whitespace-nowrap shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  Open to work
                </div>
              </div>
            </div>

            {/* Text block */}
            <div className="text-center md:text-left w-full min-w-0">

              {/* Role tag */}
              <div className="hero-tag inline-flex items-center gap-2 mb-4
                              text-[10px] sm:text-xs text-purple-300 tracking-[0.12em] uppercase
                              border border-purple-500/20 bg-purple-500/5
                              px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                <span>Frontend Dev · UI/UX · SE Undergraduate</span>
              </div>

              <h1 className="hero-h1 text-[clamp(1.75rem,6.5vw,4rem)] font-extrabold leading-[1.08] tracking-tight">
                Hello, I&apos;m{" "}
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-violet-200 text-transparent bg-clip-text">
                  Janul Samaranayake
                </span>
              </h1>

              <div className="mt-3 mb-4 h-[2px] w-36 bg-gradient-to-r from-purple-500 to-transparent
                              rounded-full mx-auto md:mx-0" />

              <p className="hero-desc text-sm sm:text-base text-gray-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
                I build clean, modern web experiences with React &amp; Next.js — focused on{" "}
                <span className="text-white font-medium">performance</span>,{" "}
                <span className="text-white font-medium">design systems</span>, and{" "}
                <span className="text-white font-medium">smooth interactions</span>.
              </p>

              {/* CTA buttons */}
              <div className="hero-btns mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a href="#projects"
                   className="relative overflow-hidden text-center px-6 py-3 rounded-xl
                              bg-purple-600 hover:bg-purple-500 active:bg-purple-700
                              transition font-semibold text-sm min-h-[48px] flex items-center justify-center group/btn">
                  <span className="relative z-10">View Projects →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 opacity-0 group-hover/btn:opacity-100 transition duration-300" />
                </a>
                <a href="/Janul Samaranayake.pdf" target="_blank" rel="noopener noreferrer"
                   className="text-center px-6 py-3 rounded-xl border border-purple-500/40
                              text-purple-300 hover:bg-purple-500/10 active:bg-purple-500/20
                              transition text-sm min-h-[48px] flex items-center justify-center">
                  Download CV
                </a>
                <a href="#contact"
                   className="text-center px-6 py-3 rounded-xl border border-white/10
                              bg-white/5 hover:bg-white/10 active:bg-white/15
                              transition text-sm min-h-[48px] flex items-center justify-center">
                  Contact Me
                </a>
              </div>

              {/* Social links */}
              <div className="hero-soc mt-5 flex gap-3 justify-center md:justify-start flex-wrap">
                {[
                  { href: "https://github.com/Sheran21", icon: <FaGithub size={15} />, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/janul-samaranayake-41564732b", icon: <FaLinkedin size={15} />, label: "LinkedIn" },
                ].map(({ href, icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5
                                border border-white/10 hover:bg-purple-600/20 hover:border-purple-500/40
                                active:bg-purple-600/30 transition text-sm min-h-[44px]">
                    {icon} {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="scroll-cue absolute bottom-6 left-1/2
                          flex flex-col items-center gap-2 text-gray-500
                          text-[10px] tracking-[0.2em] uppercase z-10 pointer-events-none">
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-purple-500/60" />
            <span>scroll</span>
          </div>
        </header>

        {/* ── SECTIONS ── */}
        <NeonDivider />
        <ScrollReveal direction="up"><SkillsSection /></ScrollReveal>
        <NeonDivider />
        <ScrollReveal direction="up"><Projects /></ScrollReveal>
        <NeonDivider />
        <ScrollReveal direction="up"><Articles /></ScrollReveal>
        <NeonDivider />
        <ScrollReveal direction="up"><CertificatesSection /></ScrollReveal>
        <NeonDivider />
        <ScrollReveal direction="up"><RecognitionSection /></ScrollReveal>
        <NeonDivider />
        <ScrollReveal direction="up"><EducationTimeline /></ScrollReveal>
        <NeonDivider />
        <ScrollReveal direction="up"><ContactSection /></ScrollReveal>
        <Footer />
      </div>
    </>
  );
}