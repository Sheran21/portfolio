"use client";

import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);

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
    <nav className="fixed top-4 left-0 w-full z-50 px-4">
      <div className="mx-auto max-w-6xl flex items-center justify-between">

        {/* Logo */}
        <div className="text-white font-bold text-lg">
          Janul
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl">
          {sections.map((section) => {
            const isActive = active === section.id;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`px-3 py-1 text-sm rounded-full transition
                ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                {section.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mt-3 mx-auto max-w-6xl md:hidden bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex flex-col gap-4">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              {section.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}