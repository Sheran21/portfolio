"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

type Article = {
  title: string;
  description: string;
  platform: string;
  date: string;
  readTime: string;
  link: string;
};

const articles: Article[] = [
  {
    title: "Getting Started with React and Next.js: What I've Been Learning So Far",
    description:
      "A reflection on my learning journey with React and Next.js, including component-based thinking, routing, and modern frontend workflows.",
    platform: "Medium",
    date: "Latest Article",
    readTime: "5 min read",
    link: "https://medium.com/@samarejanula/getting-started-with-react-and-next-js-what-ive-been-learning-so-far-5a7bc5972d5f",
  },
];

export default function Articles() {
  return (
    <section id="articles" className="px-6 py-28 bg-[#050507] text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-4 mb-16">
            <span className="sec-num">03</span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-1">Writing</p>
              <h2 className="text-4xl font-extrabold">Articles</h2>
              <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <p className="text-gray-400 max-w-xl mb-10 leading-relaxed">
            I enjoy documenting what I learn while building projects and exploring software engineering concepts.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, i) => (
            <ScrollReveal key={article.title} direction="up" delay={i * 100 + 150}>
              <Link
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] p-7
                           transition duration-400 hover:-translate-y-1
                           hover:border-purple-500/40
                           hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)]
                           block"
              >
                {/* hover glow bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-transparent to-fuchsia-500/8 opacity-0 group-hover:opacity-100 transition duration-400 pointer-events-none" />

                <div className="relative z-10">
                  {/* Badge row */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="rounded-full bg-purple-500/15 border border-purple-500/25 px-3 py-1 text-xs font-medium text-purple-200">
                      {article.platform}
                    </span>
                    <span className="text-xs text-gray-600">{article.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white leading-snug group-hover:text-purple-100 transition">
                    {article.title}
                  </h3>

                  <p className="mt-4 text-sm text-gray-400 leading-relaxed">{article.description}</p>

                  <div className="mt-6 flex items-center justify-between text-sm border-t border-white/5 pt-5">
                    <span className="text-gray-600 text-xs">{article.date}</span>
                    <span className="text-purple-400 text-xs group-hover:translate-x-1 transition">
                      Read on Medium →
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}