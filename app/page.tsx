"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import Projects from "@/components/projects";
import EducationTimeline from "@/components/EducationTimeline";
import NeonDivider from "@/components/NeonDivider";
import Articles from "@/components/Article";
import CertificatesSection from "@/components/CertificatesSection";
import RecognitionSection from "@/components/RecognitionSection";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

// Dynamically import splash so it doesn't SSR (it uses canvas + window)
const SplashScreen = dynamic(() => import("@/components/SplashScreen"), { ssr: false });

export default function Home() {
  // revealed: page fades in (starts as the splash begins its exit)
  // splashGone: splash has finished and unmounts
  const [revealed, setRevealed] = useState(false);
  const [splashGone, setSplashGone] = useState(false);
  const handleReveal = useCallback(() => setRevealed(true), []);
  const handleSplashDone = useCallback(() => { setRevealed(true); setSplashGone(true); }, []);

  // Custom cursor: dot follows instantly, ring trails with easing (fine pointers only)
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;
    let mx = -100, my = -100, rx = -100, ry = -100, raf = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div id="cursor-dot" aria-hidden />
      <div id="cursor-ring" aria-hidden />

      {/* Splash - always rendered until done, then unmounts */}
      {!splashGone && <SplashScreen onDone={handleSplashDone} onReveal={handleReveal} />}

      {/*
        Portfolio fades in from slightly below as the splash exits.
        Starts invisible, transitions to visible once splashDone fires.
      */}
      <div
        id="top"
        data-ready={revealed}
        className="bg-[var(--bg)] text-white overflow-x-hidden"
        style={{
          opacity:    revealed ? 1 : 0,
          // "none" (not translateY(0)) so the fixed navbar isn't trapped in a transformed parent
          transform:  revealed ? "none" : "translateY(18px)",
          transition: revealed ? "opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)" : "none",
        }}
      >
        <Navbar />

        <Hero />

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