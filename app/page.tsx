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

export default function Home() {
  return (
    <div className="bg-black text-white">
      <Navbar />

      {/* HERO */}
      <header className="relative min-h-screen bg-black overflow-hidden flex items-center">

  {/* BACKGROUND RAYS */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <LightRays
      raysOrigin="top-center"
      raysColor="#6d28d9"
      raysSpeed={1}
      lightSpread={1}
      rayLength={3}
      followMouse={true}
      mouseInfluence={0.08}
      noiseAmount={0}
      distortion={0}
      pulsating={false}
      fadeDistance={1}
      saturation={1}
    />
  </div>

  {/* GLOW */}
  <div className="absolute inset-0 z-[1] pointer-events-none">
    <div className="absolute left-1/2 top-32 -translate-x-1/2 h-[500px] w-[500px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black" />
  </div>

  {/* CONTENT */}
  <div className="relative z-10 mx-auto max-w-6xl px-6 w-full grid md:grid-cols-[240px_1fr] gap-12 items-center">

    {/* PROFILE */}
    <div className="flex justify-center md:justify-start">
      <div className="relative group">
        
        {/* glow ring */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 blur-lg opacity-70 group-hover:opacity-100 transition" />

        <Image
          src="/me.png"
          alt="Janul"
          width={200}
          height={200}
          className="relative rounded-full w-[180px] h-[180px] object-cover ring-1 ring-white/10 transition group-hover:scale-105"
        />
      </div>
    </div>

    {/* TEXT */}
    <div className="text-center md:text-left">

      {/* TAG */}
      <p className="inline-flex items-center gap-2 text-sm text-purple-200 mb-4">
        <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.9)]" />
        Frontend Developer • UI/UX • Software Engineering Undergraduate
      </p>

      {/* TITLE */}
      <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
        Hello, I&apos;m{" "}
        <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-200 text-transparent bg-clip-text animate-pulse">
          Janul Samaranayake
        </span>
      </h1>

      {/* DESCRIPTION */}
      <p className="mt-5 text-lg text-gray-300 max-w-xl">
        I build clean, modern web experiences with React & Next.js — focused on performance,
        design systems, and smooth interactions.
      </p>

      {/* BUTTONS */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
  
  {/* View Projects */}
  <a
    href="#projects"
    className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition text-white font-semibold shadow-[0_0_30px_rgba(168,85,247,0.35)]"
  >
    View Projects
  </a>

  {/* View CV */}
  <a
    href="/Janul Samaranayake.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="px-6 py-3 rounded-xl border border-purple-500 text-purple-300 hover:bg-purple-500/10 transition font-semibold"
  >
    View CV
  </a>

  {/* Contact */}
  <a
    href="#contact"
    className="px-6 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-white font-semibold"
  >
    Contact Me
  </a>

</div>

      {/* SOCIALS */}
      {/* 🔥 SOCIAL BUTTONS (NEW) */}
              <div className="mt-6 flex gap-4 justify-center md:justify-start">
                
                <a
                  href="https://github.com/Sheran21"
                  target="_blank"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-purple-600/20 hover:border-purple-500 transition"
                >
                  <FaGithub size={18} />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/janul-samaranayake-41564732b"
                  target="_blank"
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-purple-600/20 hover:border-purple-500 transition"
                >
                  <FaLinkedin size={18} />
                  LinkedIn
                </a>

              </div>


    </div>
  </div>

  {/* SCROLL INDICATOR */}
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
    <div className="w-[2px] h-10 bg-gradient-to-b from-purple-400 to-transparent animate-pulse" />
    <span className="text-xs tracking-widest">SCROLL</span>
  </div>

</header>

      <NeonDivider />
      <SkillsSection />
      <NeonDivider />
      <Projects />
      <NeonDivider />
      <Articles />
      <NeonDivider />
      <CertificatesSection />
      <NeonDivider />
      <RecognitionSection />
      <NeonDivider />
      <EducationTimeline />
      <NeonDivider />
      <ContactSection />
    </div>
  );
}