"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "skills",      label: "Skills" },
  { id: "projects",    label: "Projects" },
  { id: "articles",    label: "Articles" },
  { id: "certificates",label: "Certs" },
  { id: "recognition", label: "Recognition" },
  { id: "education",   label: "Education" },
  { id: "contact",     label: "Contact" },
];

export default function Navbar() {
  const [active, setActive]         = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollPct, setScrollPct]   = useState(0);
  const [scrolled, setScrolled]     = useState(false);
  const rafRef = useRef<number | null>(null);

  // Scroll progress + nav shadow
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const scrolled = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollPct(max > 0 ? (scrolled / max) * 100 : 0);
        setScrolled(scrolled > 60);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // Active section observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0.15 }
    );
    sections.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-300"
          style={{ width: `${scrollPct}%`, transition: "width 0.1s linear" }}
        />
      </div>

      <nav className={`fixed top-3 left-0 right-0 z-50 px-4 transition-all duration-300 ${scrolled ? "top-3" : "top-4"}`}>
        <div className="mx-auto max-w-7xl flex items-center justify-between">

          {/* Logo */}
          <a href="#top" className="relative flex items-center justify-center group">
            <div className="absolute inset-0 rounded-xl bg-purple-500/30 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
            <Image
              src="/logo.png"
              alt="Janul Logo"
              width={46}
              height={46}
              className="relative rounded-xl object-cover transition duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop pill nav */}
          <div className={`hidden md:flex items-center gap-1 px-3 py-2 rounded-full border transition-all duration-300 ${
            scrolled
              ? "border-white/15 bg-black/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
              : "border-white/8  bg-black/30 backdrop-blur-xl"
          }`}>
            {sections.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
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

          {/* CV button */}
          <a
            href="/Janul Samaranayake.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 transition"
          >
            View CV ↗
          </a>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-1">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed top-[72px] left-3 right-3 z-40 md:hidden rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col gap-1">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm transition ${
                  active === id
                    ? "bg-purple-600/20 text-white border border-purple-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href="/Janul Samaranayake.pdf"
              target="_blank"
              className="mt-2 px-4 py-3 rounded-xl text-sm text-center font-semibold bg-purple-600 hover:bg-purple-500 transition"
            >
              View CV ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}