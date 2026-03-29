"use client";

import { useEffect, useState } from "react";

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
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.6)]">
        
        {sections.map((section) => {
          const isActive = active === section.id;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`relative px-4 py-2 text-sm rounded-full transition-all duration-300
              ${
                isActive
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {/* Active glow background */}
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-purple-600/20 blur-md" />
              )}

              {/* Button content */}
              <span className="relative z-10">
                {section.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}