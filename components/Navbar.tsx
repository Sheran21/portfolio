"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "skills",       label: "Skills"      },
  { id: "projects",     label: "Projects"    },
  { id: "articles",     label: "Articles"    },
  { id: "certificates", label: "Certs"       },
  { id: "recognition",  label: "Recognition" },
  { id: "education",    label: "Education"   },
  { id: "contact",      label: "Contact"     },
];

export default function Navbar() {
  const [active, setActive]         = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollPct, setScrollPct]   = useState(0);
  const [scrolled, setScrolled]     = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const sy  = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollPct(max > 0 ? (sy / max) * 100 : 0);
        setScrolled(sy > 40);
        if (sy > 80) setMobileOpen(false);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-30% 0px -30% 0px", threshold: 0.15 }
    );
    sections.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress bar — always full width at top */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-300"
          style={{ width: `${scrollPct}%`, transition: "width 0.1s linear" }}
        />
      </div>

      {/*
        KEY FIX: nav uses w-full with px-3/px-4 padding.
        No max-w-7xl on the inner row — that was pushing the hamburger
        off-screen on narrow phones because the container exceeded 100vw.
        Instead we use w-full on the flex row and let padding handle spacing.
      */}
      <nav className="fixed top-2 sm:top-3 left-0 right-0 z-50 w-full px-3 sm:px-4">
        {/* This row is exactly viewport-width minus padding — always fits */}
        <div className="w-full flex items-center justify-between gap-2">

          {/* Logo */}
          <a href="#top"
             className="relative flex items-center justify-center group shrink-0">
            <div className="absolute inset-0 rounded-xl bg-purple-500/30 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
            <Image
              src="/logo.png" alt="Janul Logo" width={40} height={40}
              className="relative rounded-xl object-cover transition duration-300 group-hover:scale-105 w-9 h-9 sm:w-10 sm:h-10"
            />
          </a>

          {/* Desktop pill nav — hidden on mobile */}
          <div className={`hidden md:flex items-center gap-1 px-3 py-2 rounded-full border transition-all duration-300 ${
            scrolled
              ? "border-white/15 bg-black/75 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
              : "border-white/8  bg-black/30 backdrop-blur-xl"
          }`}>
            {sections.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <a key={id} href={`#${id}`}
                   className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                     isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                   }`}>
                  {isActive && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-purple-600/25 blur-sm" />
                      <span className="absolute inset-0 rounded-full bg-purple-600/10 border border-purple-500/30" />
                    </>
                  )}
                  <span className="relative z-10">{label}</span>
                </a>
              );
            })}
          </div>

          {/* Desktop CV button */}
          <a href="/Janul Samaranayake.pdf" target="_blank" rel="noopener noreferrer"
             className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                        border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 transition shrink-0">
            View CV ↗
          </a>

          {/*
            Mobile hamburger button.
            Explicit w-10 h-10 so it's always a square tap target regardless of content.
            shrink-0 stops it being squished by the flex layout.
          */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden shrink-0 w-10 h-10 flex items-center justify-center
                       rounded-xl border border-white/15 bg-black/50 backdrop-blur-xl
                       text-white active:bg-white/10 transition"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="fixed left-3 right-3 z-40 md:hidden
                     rounded-2xl border border-white/10 bg-black/95 backdrop-blur-2xl
                     p-3 shadow-[0_20px_60px_rgba(0,0,0,0.9)]
                     max-h-[calc(100dvh-80px)] overflow-y-auto"
          style={{ top: "64px" }}
        >
          <div className="flex flex-col gap-1">
            {sections.map(({ id, label }) => (
              <a key={id} href={`#${id}`}
                 onClick={() => setMobileOpen(false)}
                 className={`px-4 py-3.5 rounded-xl text-sm font-medium transition
                             min-h-[48px] flex items-center ${
                   active === id
                     ? "bg-purple-600/20 text-white border border-purple-500/30"
                     : "text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10"
                 }`}>
                {label}
              </a>
            ))}
            <a href="/Janul Samaranayake.pdf" target="_blank" rel="noopener noreferrer"
               onClick={() => setMobileOpen(false)}
               className="mt-1 px-4 py-3.5 rounded-xl text-sm text-center font-semibold
                          bg-purple-600 hover:bg-purple-500 active:bg-purple-700
                          transition min-h-[48px] flex items-center justify-center">
              Download CV ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}