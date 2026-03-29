"use client";

type Certificate = {
  title: string;
  issuer: string;
  category: string;
};

const certificates: Certificate[] = [
  {
    title: "Java Essential Training",
    issuer: "LinkedIn Learning",
    category: "Professional Learning",
  },
  {
    title: "Learning TypeScript",
    issuer: "LinkedIn Learning",
    category: "Professional Learning",
  },
  {
    title: "React Essential Training",
    issuer: "LinkedIn Learning",
    category: "Professional Learning",
  },
  {
    title: "Python for Beginners",
    issuer: "University of Moratuwa",
    category: "Academic Learning",
  },
  {
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa",
    category: "Academic Learning",
  },
  {
    title: "SCRUMAGIZE – Be Agile Workshop",
    issuer: "Leo Club of IIT / Winhe Software Engineering Academy",
    category: "Workshop & Recognition",
  },
];

export default function CertificatesSection() {
  return (
    <section id="certificates" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-white">Certificates</h2>
        <div className="mt-2 h-[3px] w-32 bg-white rounded-full" />

        <p className="mt-6 text-gray-300 max-w-2xl">
          Certifications and workshops that reflect my continuous learning journey
          in software engineering, frontend development, and agile methodologies.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {certificates.map((certificate) => (
            <div
              key={certificate.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
            >
              {/* Badge */}
              <span className="inline-block rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-200">
                {certificate.category}
              </span>

              {/* Title */}
              <h3 className="mt-4 text-xl font-bold text-white group-hover:text-purple-200 transition">
                {certificate.title}
              </h3>

              {/* Issuer */}
              <p className="mt-2 text-sm text-gray-400">
                Issued by {certificate.issuer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}