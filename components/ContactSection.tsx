"use client";

import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactSection() {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus]   = useState<"" | "success" | "error">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setStatus("");
    try {
      const res  = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { setStatus("success"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
    setLoading(false);
  };

  return (
    <section id="contact" className="overflow-x-hidden px-4 sm:px-6 py-20 sm:py-28 bg-[#050507] text-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
            <span className="sec-num">07</span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-1">Get in touch</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Contact</h2>
              <div className="mt-2 h-[2px] w-20 sm:w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>
        </ScrollReveal>

        {/* Stacked on mobile, side-by-side on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 lg:gap-12">

          {/* ── Info sidebar ── */}
          <ScrollReveal direction="up" delay={100}>
            <div className="space-y-4 sm:space-y-5">
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Have a project, collaboration, or opportunity?
                I&apos;m open to internships, freelance work, and full-time full-stack roles.
                Let&apos;s build something great together.
              </p>

              {/* Contact links */}
              <div className="space-y-2.5 sm:space-y-3">
                {[
                  { icon: <FaEnvelope size={15} />, label: "Email",    value: "samarejanula@gmail.com",         href: "mailto:samarejanula@gmail.com" },
                  { icon: <FaGithub size={15} />,   label: "GitHub",   value: "github.com/Sheran21",            href: "https://github.com/Sheran21" },
                  { icon: <FaLinkedin size={15} />, label: "LinkedIn", value: "Janul Samaranayake",             href: "https://www.linkedin.com/in/janul-samaranayake-41564732b" },
                ].map(({ icon, label, value, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border border-white/8 bg-white/[0.02]
                                hover:border-purple-500/30 hover:bg-white/[0.05] active:bg-white/[0.07]
                                transition group min-h-[56px]">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-600/15 border border-purple-500/20
                                    flex items-center justify-center text-purple-400 shrink-0
                                    group-hover:bg-purple-600/25 transition">
                      {icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] sm:text-[10px] text-gray-600 uppercase tracking-wider">{label}</p>
                      <p className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition truncate">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <p className="text-xs sm:text-sm text-emerald-300">Available for opportunities in 2026</p>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Form ── */}
          <ScrollReveal direction="up" delay={160}>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name + Email — stacked on mobile, side by side on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Name</label>
                  <input
                    type="text" name="name" value={form.name} required onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10
                               focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20
                               outline-none text-sm text-white placeholder-gray-600 transition min-h-[48px]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Email</label>
                  <input
                    type="email" name="email" value={form.email} required onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10
                               focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20
                               outline-none text-sm text-white placeholder-gray-600 transition min-h-[48px]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Message</label>
                <textarea
                  name="message" value={form.message} rows={5} required onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10
                             focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20
                             outline-none text-sm text-white placeholder-gray-600 transition resize-none"
                />
              </div>

              <button type="submit" disabled={loading}
                className="relative overflow-hidden w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700
                           disabled:opacity-50 transition font-semibold text-sm group min-h-[52px]">
                <span className="relative z-10">{loading ? "Sending…" : "Send Message →"}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition duration-300" />
              </button>

              {status === "success" && (
                <div className="flex items-start gap-2 text-sm text-emerald-400 bg-emerald-400/8 border border-emerald-400/20 px-4 py-3 rounded-xl">
                  <span className="shrink-0 mt-0.5">✓</span> Message sent! I&apos;ll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-start gap-2 text-sm text-red-400 bg-red-400/8 border border-red-400/20 px-4 py-3 rounded-xl">
                  <span className="shrink-0 mt-0.5">✗</span> Something went wrong. Please email me directly.
                </div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}