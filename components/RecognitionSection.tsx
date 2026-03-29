export default function RecognitionSection() {
  const achievements = [
    {
      icon: "🏆",
      title: "Best Team Pitch Award",
      subtitle: "Pitch60 APIIT",
      year: "2026",
      description:
        "Recognized for presenting one of the strongest team startup pitches."
    },
    {
      icon: "🥉",
      title: "3rd Place Winner",
      subtitle: "Startup Today - KDU",
      year: "2026",
      description:
        "Awarded 3rd place for innovation and entrepreneurial thinking."
    },
    {
      icon: "👑",
      title: "House Captain",
      subtitle: "Highlands College",
      year: "2019",
      description:
        "Led student initiatives, events, and house-level leadership activities."
    },
    {
      icon: "⭐",
      title: "Vice House Captain",
      subtitle: "Highlands College",
      year: "2018",
      description:
        "Supported leadership and coordination of student activities."
    },
    {
      icon: "🛡️",
      title: "Youth Cyber Security Summit",
      subtitle: "Participant",
      year: "2019",
      description:
        "Participated in cybersecurity awareness and technical workshops."
    },
    {
      icon: "🎓",
      title: "Nationwide Scholarship Programme",
      subtitle: "ESOFT - FIT",
      year: "",
      description:
        "Completed scholarship programme with academic excellence."
    }
  ];

  return (
    <section id = "recognition" className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold">Recognition</h2>
        <div className="mt-2 h-[3px] w-32 bg-white rounded-full" />

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{item.icon}</div>

                <div>
                  <h3 className="text-xl font-bold">{item.title}</h3>

                  <p className="text-purple-300 text-sm mt-1">
                    {item.subtitle} {item.year && `• ${item.year}`}
                  </p>

                  <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}