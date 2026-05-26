"use client";

import { FaGithub, FaLinkedin, FaArrowUp, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative mt-16 sm:mt-24 overflow-hidden border-t border-white/10">

      {/* CSS Aurora */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <style>{`
          @keyframes aur1 { 0%,100%{transform:translateX(-20%) translateY(0)   rotate(-5deg) scaleX(1.2)} 50%{transform:translateX(10%)  translateY(-15%) rotate(5deg)  scaleX(0.9)} }
          @keyframes aur2 { 0%,100%{transform:translateX(20%)  translateY(10%)  rotate(8deg)  scaleX(0.85)} 50%{transform:translateX(-5%)  translateY(-10%) rotate(-4deg) scaleX(1.15)} }
          @keyframes aur3 { 0%,100%{transform:translateX(0%)   translateY(-5%)  rotate(-3deg) scaleX(1)}    50%{transform:translateX(-15%) translateY(8%)   rotate(6deg)  scaleX(1.3)} }
          .aur { will-change: transform; }
        `}</style>
        <div className="aur absolute left-[-20%] top-[10%] w-[120%] h-[160px] rounded-full opacity-25"
             style={{ background: "radial-gradient(ellipse at center, #7c3aed 0%, transparent 70%)", filter: "blur(48px)", animation: "aur1 14s ease-in-out infinite" }} />
        <div className="aur absolute left-[10%] top-[30%] w-[100%] h-[120px] rounded-full opacity-20"
             style={{ background: "radial-gradient(ellipse at center, #c084fc 0%, transparent 70%)", filter: "blur(56px)", animation: "aur2 18s ease-in-out infinite" }} />
        <div className="aur absolute right-[-10%] top-[5%] w-[80%] h-[180px] rounded-full opacity-15"
             style={{ background: "radial-gradient(ellipse at center, #a855f7 0%, transparent 70%)", filter: "blur(64px)", animation: "aur3 22s ease-in-out infinite" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />
      </div>

      {/* Glow accents */}
      <div className="absolute left-1/4 top-0 h-32 w-32 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 bottom-0 h-40 w-40 rounded-full bg-fuchsia-500/15 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">

        {/* 1-col mobile → 3-col md */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">

          {/* Branding */}
          <div className="sm:col-span-2 md:col-span-1">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-300 mb-2 sm:mb-3">
              Let&apos;s Build Something Great
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
              Janul{" "}
              <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-200 bg-clip-text text-transparent">
                Samaranayake
              </span>
            </h3>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400 leading-relaxed">
              Full Stack developer focused on crafting premium digital experiences with React,
              Next.js, Node.js, design systems, and smooth UI interactions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 mb-3 sm:mb-4">Explore</h4>
            <div className="flex flex-col gap-2.5 text-sm text-gray-400">
              {[
                { href: "#projects",  label: "Projects"  },
                { href: "#skills",    label: "Skills"    },
                { href: "#contact",   label: "Contact"   },
              ].map(({ href, label }) => (
                <a key={href} href={href} className="hover:text-purple-300 active:text-purple-400 transition w-fit py-0.5">
                  {label}
                </a>
              ))}
              <a href="/Janul Samaranayake.pdf" target="_blank" rel="noopener noreferrer"
                 className="hover:text-purple-300 transition w-fit py-0.5">View CV</a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 mb-3 sm:mb-4">Connect</h4>
            <p className="text-xs sm:text-sm text-gray-400 mb-4 leading-relaxed">
              Open for internships, collaborations, and full Stack engineering opportunities.
            </p>
            <div className="flex gap-2.5 flex-wrap">
              {[
                { href: "mailto:samarejanula@gmail.com", icon: <FaEnvelope size={16} />, label: "email" },
                { href: "https://github.com/Sheran21",   icon: <FaGithub size={16} />,   label: "github",   ext: true },
                { href: "https://www.linkedin.com/in/janul-samaranayake-41564732b", icon: <FaLinkedin size={16} />, label: "linkedin", ext: true },
              ].map(({ href, icon, label, ext }) => (
                <a key={label} href={href}
                   {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                   aria-label={label}
                   className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-purple-600/20 active:bg-purple-600/30 transition">
                  {icon}
                </a>
              ))}
              <a href="#top" aria-label="Back to top"
                 className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 transition shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <FaArrowUp size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 sm:mt-14 h-px w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        {/* Bottom */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Janul Samaranayake. Built with Next.js &amp; Tailwind CSS.</p>
          <p className="italic text-purple-400/60">Designed to leave a lasting impression.</p>
        </div>
      </div>
    </footer>
  );
}