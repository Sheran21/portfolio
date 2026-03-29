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

export default function Home() {
  return (
    <div id="top" className="bg-black text-white">
      <Navbar />

      {/* HERO */}
      <header className="relative min-h-screen bg-black overflow-hidden flex items-center pt-20">

        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#6d28d9"
            raysSpeed={1}
            followMouse
          />
        </div>
        <FloatingTech />

        {/* GLOW */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute left-1/2 top-32 -translate-x-1/2 h-[400px] w-[400px] bg-purple-600/20 blur-3xl rounded-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 w-full flex flex-col md:grid md:grid-cols-[220px_1fr] gap-10 items-center">

          {/* PROFILE */}
          <div className="flex justify-center md:justify-start">
            <div className="relative group">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 blur-lg opacity-70" />
              <Image
                src="/me.png"
                alt="Janul"
                width={180}
                height={180}
                className="relative w-[180px] h-[180px] rounded-full object-cover aspect-square"
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="text-center md:text-left">

            {/* TAG */}
            <p className="text-sm text-purple-200 mb-4">
              Frontend Developer • UI/UX • Software Engineering Undergraduate
            </p>

            {/* TITLE */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Hello, I&apos;m{" "}
              <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-200 text-transparent bg-clip-text">
                Janul Samaranayake
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-xl mx-auto md:mx-0">
              I build clean, modern web experiences with React & Next.js — focused on performance,
              design systems, and smooth interactions.
            </p>

            {/* BUTTONS */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center md:justify-start">
              
              <a
                href="#projects"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition font-semibold"
              >
                View Projects
              </a>

              <a
                href="/Janul Samaranayake.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-xl border border-purple-500 text-purple-300 hover:bg-purple-500/10 transition"
              >
                View CV
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                Contact Me
              </a>
            </div>

            {/* SOCIALS */}
            <div className="mt-6 flex gap-3 justify-center md:justify-start flex-wrap">
              
              <a
                href="https://github.com/Sheran21"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-purple-600/20 transition"
              >
                <FaGithub size={16} />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/janul-samaranayake-41564732b"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-purple-600/20 transition"
              >
                <FaLinkedin size={16} />
                LinkedIn
              </a>

            </div>
          </div>
        </div>

        {/* SCROLL */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 text-xs">
          SCROLL
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