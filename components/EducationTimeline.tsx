"use client";

import Image from "next/image";

type EducationItem = {
  year: string;
  title: string;
  institute: string;
  description: string;
  image: string;
};

const education: EducationItem[] = [
  {
    year: "2024 – Present",
    title: "BSc (Hons) Software Engineering",
    institute: "University of Westminster",
    description:
      "Focusing on web development, OOP, databases, and software engineering fundamentals. Building projects using React, Next.js, and MySQL.",
    image: "/uow.png",
  },
  {
    year: "2023 – 2024",
    title: "Foundation",
    institute: "Informatics Institute of Technology",
    description:
      "Built strong programming fundamentals and started working on small web projects.",
    image: "/iit.png",
  },
  {
    year: "2020 – 2023",
    title: "GCE A/L",
    institute: "St. Thomas' College, Mount Lavinia",
    description:
      "Studied Physics, Combined Maths and IT. Developed problem-solving skills and a passion for software development. played badminton competitively.",
    image: "/stc.png",
  },
  {
    year: "2010 – 2020",
    title: "GCE O/L",
    institute: "Highlands College, Maharagama",
    description:
      "Completed O/Ls with a focus on Science and Mathematics. Participated in coding clubs and tech competitions, sparking my interest in programming. Engaged in Sport activities and leadership roles, fostering teamwork and discipline.",
    image: "/hc.png",
  }
];

export default function EducationTimeline() {
  return (
    <section id="education" className="px-6 py-20 bg-black text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold">Education</h2>
        <div className="mt-2 h-[3px] w-32 bg-white rounded-full" />
        <p className="mt-6 text-gray-300 max-w-2xl">
          My academic journey and the key milestones that shaped my software engineering skills.
        </p>

        <div className="mt-12 relative">
          {/* vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent" />

          <div className="space-y-10">
            {education.map((item, idx) => (
              <div key={idx} className="relative pl-14">
                {/* dot */}
                <div className="absolute left-4 top-2 -translate-x-1/2">
                  <div className="h-4 w-4 rounded-full bg-purple-500 shadow-[0_0_18px_rgba(168,85,247,0.9)]" />
                </div>

                {/* card */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6 items-start rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div>
                    <p className="text-sm text-purple-200/90">{item.year}</p>
                    <h3 className="mt-1 text-2xl font-bold">{item.title}</h3>
                    <p className="mt-1 text-gray-300">{item.institute}</p>
                    <p className="mt-4 text-gray-200/90 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="relative w-full h-[140px] md:h-[160px] rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src={item.image}
                      alt={`${item.title} image`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
