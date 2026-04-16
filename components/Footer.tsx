"use client";

import SoftAurora from "../components/SoftAurora";
import {
  FaGithub,
  FaLinkedin,
  FaArrowUp,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10">
      {/* Aurora background */}
      <div className="absolute inset-0 opacity-80">
        <SoftAurora
          speed={0.55}
          scale={1.7}
          brightness={1.4}
          color1="#7C3AED"
          color2="#C084FC"
          noiseFrequency={3}
          noiseAmplitude={2}
          bandHeight={0.45}
          bandSpread={1.2}
          octaveDecay={0.15}
          layerOffset={0.15}
          colorSpeed={0.8}
          enableMouseInteraction
          mouseInfluence={0.18}
        />
      </div>

      {/* cinematic dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />

      {/* purple glow accents */}
      <div className="absolute left-1/4 top-0 h-40 w-40 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="absolute right-1/4 bottom-0 h-52 w-52 rounded-full bg-fuchsia-500/20 blur-3xl" />

      {/* content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        {/* Main grid */}
        <div className="grid gap-12 md:grid-cols-3">
          
          {/* Branding */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-purple-300 mb-3">
              Let’s Build Something Great
            </p>

            <h3 className="text-3xl font-bold leading-tight">
              Janul{" "}
              <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-200 bg-clip-text text-transparent">
                Samaranayake
              </span>
            </h3>

            <p className="mt-4 text-gray-300 leading-7">
              Frontend developer focused on crafting premium digital
              experiences with React, Next.js, design systems, and smooth UI
              interactions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4">
              Explore
            </h4>

            <div className="flex flex-col gap-3 text-gray-300">
              <a href="#projects" className="hover:text-purple-300 transition">
                Projects
              </a>
              <a href="#skills" className="hover:text-purple-300 transition">
                Skills
              </a>
              <a href="#contact" className="hover:text-purple-300 transition">
                Contact
              </a>
              <a
                href="/Janul Samaranayake.pdf"
                target="_blank"
                className="hover:text-purple-300 transition"
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
              Open for internships, collaborations, and frontend engineering
              opportunities.
            </p>

            <div className="flex gap-3">
              <a
                href="mailto:samarejanula@gmail.com"
                className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-purple-600/20 transition"
              >
                <FaEnvelope size={18} />
              </a>

              <a
                href="https://github.com/Sheran21"
                target="_blank"
                className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-purple-600/20 transition"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/janul-samaranayake-41564732b"
                target="_blank"
                className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-purple-600/20 transition"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="#top"
                className="p-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition shadow-[0_0_20px_rgba(168,85,247,0.45)]"
              >
                <FaArrowUp size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Signature divider */}
        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

        {/* Bottom signature */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Janul Samaranayake. Crafted with
            Next.js, Tailwind CSS & premium motion.
          </p>

          <p className="italic text-purple-300/80">
            Designed to leave a lasting impression.
          </p>
        </div>
      </div>
    </footer>
  );
}