"use client";

import {
  FaGithub,
  FaLinkedin,
  FaArrowUp,
  FaEnvelope,
} from "react-icons/fa";

// Pure CSS aurora — zero JS, zero WebGL, composited on GPU via transforms/opacity only
// Eliminates the SoftAurora WebGL second render loop that caused most of the lag
export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10">
      {/* CSS Aurora background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <style>{`
          @keyframes aurora1 {
            0%   { transform: translateX(-20%) translateY(0%)   rotate(-5deg) scaleX(1.2); }
            50%  { transform: translateX(10%)  translateY(-15%) rotate(5deg)  scaleX(0.9); }
            100% { transform: translateX(-20%) translateY(0%)   rotate(-5deg) scaleX(1.2); }
          }
          @keyframes aurora2 {
            0%   { transform: translateX(20%)  translateY(10%)  rotate(8deg)  scaleX(0.85); }
            50%  { transform: translateX(-5%)  translateY(-10%) rotate(-4deg) scaleX(1.15); }
            100% { transform: translateX(20%)  translateY(10%)  rotate(8deg)  scaleX(0.85); }
          }
          @keyframes aurora3 {
            0%   { transform: translateX(0%)   translateY(-5%)  rotate(-3deg) scaleX(1); }
            50%  { transform: translateX(-15%) translateY(8%)   rotate(6deg)  scaleX(1.3); }
            100% { transform: translateX(0%)   translateY(-5%)  rotate(-3deg) scaleX(1); }
          }
          .aurora-band { will-change: transform; }
        `}</style>

        {/* Band 1 — violet */}
        <div
          className="aurora-band absolute left-[-20%] top-[10%] w-[120%] h-[180px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(ellipse at center, #7c3aed 0%, transparent 70%)",
            filter: "blur(48px)",
            animation: "aurora1 14s ease-in-out infinite",
          }}
        />
        {/* Band 2 — fuchsia */}
        <div
          className="aurora-band absolute left-[10%] top-[30%] w-[100%] h-[140px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(ellipse at center, #c084fc 0%, transparent 70%)",
            filter: "blur(56px)",
            animation: "aurora2 18s ease-in-out infinite",
          }}
        />
        {/* Band 3 — deep purple accent */}
        <div
          className="aurora-band absolute right-[-10%] top-[5%] w-[80%] h-[200px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse at center, #a855f7 0%, transparent 70%)",
            filter: "blur(64px)",
            animation: "aurora3 22s ease-in-out infinite",
          }}
        />

        {/* cinematic dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />
      </div>

      {/* purple glow accents */}
      <div className="absolute left-1/4 top-0 h-40 w-40 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 bottom-0 h-52 w-52 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" />

      {/* content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">

          {/* Branding */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-purple-300 mb-3">
              Let&apos;s Build Something Great
            </p>
            <h3 className="text-3xl font-bold leading-tight">
              Janul{" "}
              <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-200 bg-clip-text text-transparent">
                Samaranayake
              </span>
            </h3>
            <p className="mt-4 text-gray-300 leading-7">
              Frontend developer focused on crafting premium digital experiences
              with React, Next.js, design systems, and smooth UI interactions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4">
              Explore
            </h4>
            <div className="flex flex-col gap-3 text-gray-300">
              {[
                { href: "#projects", label: "Projects" },
                { href: "#skills",   label: "Skills" },
                { href: "#contact",  label: "Contact" },
              ].map(({ href, label }) => (
                <a key={href} href={href} className="hover:text-purple-300 transition w-fit">
                  {label}
                </a>
              ))}
              <a
                href="/Janul Samaranayake.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-300 transition w-fit"
              >
                View CV
              </a>
            </div>
          </div>

          {/* CTA + socials */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4">
              Connect
            </h4>
            <p className="text-gray-300 mb-5">
              Open for internships, collaborations, and frontend engineering opportunities.
            </p>
            <div className="flex gap-3">
              {[
                { href: "mailto:samarejanula@gmail.com", icon: <FaEnvelope size={18} />, label: "email" },
                { href: "https://github.com/Sheran21",   icon: <FaGithub size={18} />,   label: "github", external: true },
                { href: "https://www.linkedin.com/in/janul-samaranayake-41564732b", icon: <FaLinkedin size={18} />, label: "linkedin", external: true },
              ].map(({ href, icon, label, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={label}
                  className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-purple-600/20 transition"
                >
                  {icon}
                </a>
              ))}
              <a
                href="#top"
                aria-label="Back to top"
                className="p-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition shadow-[0_0_20px_rgba(168,85,247,0.45)]"
              >
                <FaArrowUp size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

        {/* Bottom */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Janul Samaranayake. Crafted with Next.js, Tailwind CSS &amp; premium motion.
          </p>
          <p className="italic text-purple-300/80">
            Designed to leave a lasting impression.
          </p>
        </div>
      </div>
    </footer>
  );
}