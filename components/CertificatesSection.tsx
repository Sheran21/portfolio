"use client";

import ScrollReveal from "@/components/ScrollReveal";

const certificates = [
  { title: "Java Essential Training",         issuer: "LinkedIn Learning",                   category: "Programming",  icon: "☕" },
  { title: "Learning TypeScript",             issuer: "LinkedIn Learning",                   category: "Programming",  icon: "🔷" },
  { title: "React Essential Training",        issuer: "LinkedIn Learning",                   category: "Frontend",     icon: "⚛️" },
  { title: "Python for Beginners",            issuer: "University of Moratuwa",              category: "Programming",  icon: "🐍" },
  { title: "Web Design for Beginners",        issuer: "University of Moratuwa",              category: "Design",       icon: "🎨" },
  { title: "Agile Workshop",                  issuer: "Leo Club of IIT",                     category: "Methodology",  icon: "🔄" },
];

const categoryColor: Record<string, string> = {
  Programming: "bg-blue-500/10  border-blue-500/20  text-blue-300",
  Frontend:    "bg-cyan-500/10  border-cyan-500/20  text-cyan-300",
  Design:      "bg-pink-500/10  border-pink-500/20  text-pink-300",
  Methodology: "bg-amber-500/10 border-amber-500/20 text-amber-300",
};

const issuers = [
  "LinkedIn Learning", "University of Moratuwa", "Leo Club of IIT",
  "Informatics Institute of Technology", "ESOFT", "University of Westminster",
];

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-28 bg-[#050507] text-white overflow-hidden">
      <div className="px-6">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-4 mb-16">
              <span className="sec-num">04</span>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-1">Continuous learning</p>
                <h2 className="text-4xl font-extrabold">Certificates</h2>
                <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={80}>
            <p className="text-gray-400 max-w-xl mb-10 leading-relaxed -mt-8">
              Certifications and workshops reflecting my continuous learning in software engineering,
              frontend development, and agile methodologies.
              For the latest, visit my{" "}
              <a
                href="https://www.linkedin.com/in/janul-samaranayake-41564732b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition"
              >
                LinkedIn Licenses &amp; Certifications
              </a>.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Scrolling marquee */}
      <div className="relative mb-10 overflow-hidden border-y border-white/5 bg-white/[0.015] py-3">
        <style>{`
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .marquee-track { animation: marquee 22s linear infinite; will-change: transform; }
          .marquee-track:hover { animation-play-state: paused; }
        `}</style>
        <div className="marquee-track flex gap-8 whitespace-nowrap w-max">
          {[...issuers, ...issuers].map((s, i) => (
            <span key={i} className="text-xs uppercase tracking-[0.2em] text-gray-600 flex items-center gap-4">
              {s} <span className="text-purple-700">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert, i) => (
              <ScrollReveal key={cert.title} direction="up" delay={i * 70}>
                <div className="group rounded-2xl border border-white/8 bg-white/[0.02] p-6
                               hover:border-purple-500/30 hover:bg-white/[0.04]
                               transition-all duration-400
                               hover:shadow-[0_10px_40px_rgba(168,85,247,0.1)]
                               hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl leading-none">{cert.icon}</span>
                    <span className={`text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full border ${categoryColor[cert.category] ?? "bg-purple-500/10 border-purple-500/20 text-purple-300"}`}>
                      {cert.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold leading-snug group-hover:text-purple-100 transition">
                    {cert.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-500">Issued by {cert.issuer}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}