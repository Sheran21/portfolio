"use client";

import Link from "next/link";

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
    <section id="articles" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <h2 className="text-4xl font-bold text-white">Articles</h2>
        <div className="mt-2 h-[3px] w-32 bg-white rounded-full" />

        <p className="mt-6 text-gray-300 max-w-2xl">
          I enjoy documenting what I learn while building projects and exploring
          software engineering concepts.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {articles.map((article) => (
            <Link
              key={article.title}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
            >
              {/* glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-fuchsia-500/10 opacity-0 transition duration-300 group-hover:opacity-100" />

              {/* content */}
              <div className="relative z-10">
                {/* badge + meta */}
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-200">
                    {article.platform}
                  </span>

                  <span className="text-xs text-gray-400">
                    {article.readTime}
                  </span>
                </div>

                {/* title */}
                <h3 className="text-xl font-bold text-white leading-snug group-hover:text-purple-200 transition">
                  {article.title}
                </h3>

                {/* description */}
                <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                  {article.description}
                </p>

                {/* footer */}
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-gray-400">{article.date}</span>
                  <span className="text-purple-300 group-hover:translate-x-1 transition">
                    Read article →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}