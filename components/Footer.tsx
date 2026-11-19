"use client";

import dynamic from "next/dynamic";
import { FaGithub, FaLinkedin, FaArrowUp, FaEnvelope } from "react-icons/fa";

const FooterWaves = dynamic(() => import("@/components/FooterWaves"), { ssr: false });

export default function Footer() {
  return (
    <footer className="relative isolate mt-16 sm:mt-24 overflow-hidden border-t border-white/10 bg-[var(--bg)]">

      {/* three.js particle waves (GPU-animated, pauses offscreen) */}
      <FooterWaves />
      {/* keep the copy readable over the waves */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/75 to-transparent" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-12 sm:pt-16 pb-0">

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
              Software Engineer at itZorix building reliable software end to end —
              web and mobile apps, backend services, APIs and cloud infrastructure.
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
              Let&apos;s connect about software, products and engineering ideas.
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
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--ink-muted)]">
          <p>© {new Date().getFullYear()} Janul Samaranayake. Built with Next.js, Tailwind CSS &amp; three.js.</p>
          <p className="font-accent text-sm text-violet-300/80">Designed &amp; engineered with care.</p>
        </div>

        {/* Oversized wordmark sign-off, sitting on the waves */}
        <p
          aria-hidden="true"
          className="pointer-events-none mt-6 select-none text-center font-display font-extrabold leading-[0.78] tracking-[-0.06em]
                     text-[clamp(4.5rem,21vw,17rem)] bg-gradient-to-b from-white/[0.16] via-white/[0.05] to-transparent bg-clip-text text-transparent"
        >
          Janul
        </p>
      </div>
    </footer>
  );
}