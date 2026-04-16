"use client";

import Image from "next/image";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

const projects = [
  {
    title: "Ceylon Curry Pot",
    description: "An online food ordering system for a restaurant.",
    image: "/ccp.png",
    tag: "Web App",
    github: "https://github.com/Ceylon-Curry-Pot/Food-Delivery-Website",
    live: "",
  },
  {
    title: "Corpovinculo",
    description:
      "A centralized platform for sponsorship outreach and event management.",
    image: "/Corpovinculo.png",
    tag: "SaaS Platform",
    github: "",
    live: "https://corpovinculo.com/home",
  },
  {
    title: "Save Marine Life",
    description:
      "An awareness platform promoting marine conservation and sustainability.",
    image: "/SM.png",
    tag: "Awareness Platform",
    github: "https://github.com/Sheran21/Save-Marine-Life",
    live: "",
  },
  {
    title: "Inventory Tracking System",
    description:
      "A Website to track the inventory of an restaurant easing the process of restocking and managing inventory.",
    image: "/CCP-inventory.png",
    tag: "Web App",
    github: "https://github.com/Sheran21/CCP_Inventory_Tracker",
    live: "https://ccp-inventory-tracker.vercel.app",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-20 bg-black text-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold">Projects</h2>
        <div className="mt-2 h-[3px] w-32 bg-white rounded-full" />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative h-[380px] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:border-purple-500 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 z-10 p-6 w-full">
                <span className="inline-block text-xs uppercase tracking-widest text-purple-300 mb-3">
                  {project.tag}
                </span>

                <h3 className="text-2xl font-bold">{project.title}</h3>

                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Buttons */}
                <div className="mt-5 flex gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition text-sm font-medium"
                    >
                      <FaArrowUpRightFromSquare size={14} />
                      Live Demo
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm font-medium"
                    >
                      <FaGithub size={14} />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}