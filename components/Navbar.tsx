"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "articles", label: "Articles" },
  { id: "certificates", label: "Certificates" },
  { id: "recognition", label: "Recognition" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0.2,
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#top"
            className="relative flex items-center justify-center group"
            >
            {/* glow on hover only */}
            <div className="absolute inset-0 rounded-xl bg-purple-500/30 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

            <Image
              src="/logo.png"
              alt="Janul Logo"
              width={50}
              height={50}
              className="relative rounded-xl object-cover transition duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.6)]">
            {sections.map((section) => {
              const isActive = active === section.id;

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`relative px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-purple-600/20 blur-md" />
                  )}

                  <span className="relative z-10">{section.label}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="fixed top-20 left-4 right-4 z-40 md:hidden rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-4">
          <div className="flex flex-col gap-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setMobileOpen(false)}
                className="text-gray-300 hover:text-white transition"
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}