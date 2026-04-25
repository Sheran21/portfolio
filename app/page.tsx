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
      {/* Custom cursor glow */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { cursor: none !important; }
        body { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3 { font-family: 'Syne', sans-serif; }

        #cursor-dot {
          position: fixed; top: 0; left: 0; z-index: 9999;
          width: 8px; height: 8px; margin: -4px 0 0 -4px;
          border-radius: 50%; background: #a855f7;
          pointer-events: none; transition: transform 0.1s;
          will-change: transform;
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

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-tag  { animation: heroFadeUp 0.6s cubic-bezier(.22,.68,0,1.05) 0.2s both; }
        .hero-h1   { animation: heroFadeUp 0.7s cubic-bezier(.22,.68,0,1.05) 0.38s both; }
        .hero-desc { animation: heroFadeUp 0.7s cubic-bezier(.22,.68,0,1.05) 0.54s both; }
        .hero-btns { animation: heroFadeUp 0.7s cubic-bezier(.22,.68,0,1.05) 0.68s both; }
        .hero-soc  { animation: heroFadeUp 0.6s cubic-bezier(.22,.68,0,1.05) 0.80s both; }
        .hero-img  { animation: heroFadeUp 0.8s cubic-bezier(.22,.68,0,1.05) 0.1s both; }

        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          60%       { transform: translateX(-50%) translateY(10px); opacity: 0.4; }
        }
        .scroll-cue { animation: scrollBounce 2s ease-in-out infinite; }

        /* dot-grid background */
        .dot-grid {
          background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        /* section number accent */
        .sec-num {
          font-family: 'Syne', sans-serif;
          font-size: 7rem;
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(180deg, rgba(168,85,247,0.15) 0%, transparent 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          user-select: none;
          pointer-events: none;
        }
      `}</style>

      {/* Custom cursor (JS-driven) */}
      <div id="cursor-dot" />
      <div id="cursor-ring" />
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var dot  = document.getElementById('cursor-dot');
          var ring = document.getElementById('cursor-ring');
          if (!dot || !ring) return;
          document.addEventListener('mousemove', function(e) {
            dot.style.transform  = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
            ring.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
          }, { passive: true });
        })();
      `}} />

      <div id="top" className="bg-[#050507] text-white">
        <Navbar />

        {/* ───── HERO ───── */}
        <header className="relative min-h-screen bg-[#050507] overflow-hidden flex items-center pb-16 md:pb-0 dot-grid">

          {/* light rays */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <LightRays
              raysOrigin="top-center"
              raysColor="#6d28d9"
              raysSpeed={0.8}
              lightSpread={0.45}
              rayLength={2.8}
              followMouse={false}
              mouseInfluence={0}
              noiseAmount={0}
              distortion={0}
              pulsating={false}
              fadeDistance={1}
              saturation={1.2}
            />
          </div>

          <FloatingTech />

          {/* Glow blobs */}
          <div className="absolute inset-0 z-[1] pointer-events-none">
            <div className="absolute left-1/2 top-28 -translate-x-1/2 h-[500px] w-[500px] bg-purple-700/15 blur-[100px] rounded-full" />
            <div className="absolute left-1/4 bottom-0 h-[300px] w-[300px] bg-fuchsia-700/10 blur-[80px] rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/20 via-[#050507]/30 to-[#050507]" />
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-6xl px-6 w-full flex flex-col md:grid md:grid-cols-[200px_1fr] gap-12 items-center pt-24 md:pt-0">

            {/* Avatar */}
            <div className="hero-img flex justify-center md:justify-start">
              <div className="relative group">
                {/* rotating gradient border */}
                <div
                  className="absolute -inset-[3px] rounded-full opacity-90"
                  style={{
                    background: "conic-gradient(from 0deg, #7c3aed, #c084fc, #7c3aed)",
                    animation: "spin 8s linear infinite",
                  }}
                />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <div className="absolute -inset-[3px] rounded-full bg-[#050507]" style={{ clipPath: "inset(3px round 9999px)" }} />
                <Image
                  src="/me.png"
                  alt="Janul Samaranayake"
                  width={190}
                  height={190}
                  priority
                  className="relative w-[190px] h-[190px] rounded-full object-cover aspect-square z-10"
                />
                {/* status badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black border border-white/10 text-xs whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Open to work
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="text-center md:text-left">
              <p className="hero-tag inline-flex items-center gap-2 text-xs text-purple-300 tracking-[0.2em] uppercase mb-5 border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Frontend Developer · UI/UX · Software Engineering Undergraduate
              </p>

              <h1 className="hero-h1 text-[clamp(2rem,6vw,4.2rem)] font-extrabold leading-[1.05] tracking-tight">
                Hello, I&apos;m{" "}
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-violet-200 text-transparent bg-clip-text">
                  Janul Samaranayake
                </span>
              </h1>

              {/* animated underline accent */}
              <div className="mt-3 mb-5 h-[2px] w-48 bg-gradient-to-r from-purple-500 to-transparent rounded-full mx-auto md:mx-0"
                style={{ animation: "heroFadeUp 1s 0.9s both" }} />

              <p className="hero-desc text-base sm:text-lg text-gray-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
                I build clean, modern web experiences with React &amp; Next.js —
                focused on <span className="text-white font-medium">performance</span>,{" "}
                <span className="text-white font-medium">design systems</span>, and{" "}
                <span className="text-white font-medium">smooth interactions</span>.
              </p>

              {/* Buttons */}
              <div className="hero-btns mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a
                  href="#projects"
                  className="group/btn relative overflow-hidden w-full sm:w-auto text-center px-7 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition font-semibold text-sm"
                >
                  <span className="relative z-10">View Projects →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 opacity-0 group-hover/btn:opacity-100 transition duration-300" />
                </a>
                <a
                  href="/Janul Samaranayake.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-7 py-3 rounded-xl border border-purple-500/40 text-purple-300 hover:bg-purple-500/10 transition text-sm"
                >
                  Download CV
                </a>
                <a
                  href="#contact"
                  className="w-full sm:w-auto text-center px-7 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm"
                >
                  Contact Me
                </a>
              </div>

              {/* Socials */}
              <div className="hero-soc mt-6 flex gap-3 justify-center md:justify-start">
                {[
                  { href: "https://github.com/Sheran21", icon: <FaGithub size={15} />, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/janul-samaranayake-41564732b", icon: <FaLinkedin size={15} />, label: "LinkedIn" },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-purple-600/20 hover:border-purple-500/40 transition text-sm"
                  >
                    {icon} {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="scroll-cue absolute bottom-8 left-1/2 flex flex-col items-center gap-2 text-gray-500 text-[10px] tracking-[0.2em] uppercase z-10">
            <div className="w-px h-10 bg-gradient-to-b from-transparent to-purple-500/60" />
            <span>scroll</span>
          </div>
        </header>

        {/* ───── SECTIONS ───── */}
        <NeonDivider />
        <ScrollReveal direction="up" delay={0}>
          <SkillsSection />
        </ScrollReveal>
        <NeonDivider />
        <ScrollReveal direction="up" delay={0}>
          <Projects />
        </ScrollReveal>
        <NeonDivider />
        <ScrollReveal direction="up" delay={0}>
          <Articles />
        </ScrollReveal>
        <NeonDivider />
        <ScrollReveal direction="up" delay={0}>
          <CertificatesSection />
        </ScrollReveal>
        <NeonDivider />
        <ScrollReveal direction="up" delay={0}>
          <RecognitionSection />
        </ScrollReveal>
        <NeonDivider />
        <ScrollReveal direction="up" delay={0}>
          <EducationTimeline />
        </ScrollReveal>
        <NeonDivider />
        <ScrollReveal direction="up" delay={0}>
          <ContactSection />
        </ScrollReveal>
        <Footer />
      </div>
    </>
  );
}