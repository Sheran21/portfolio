"use client";

import Image from "next/image";

export default function Projects() {
  return (
    <section id="projects" className="px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold">Projects</h2>
        <div className="mt-2 h-[3px] w-32 bg-white rounded-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
          {/* CARD 1 */}
          <div className="group relative h-[320px] rounded-xl overflow-hidden bg-black shadow-lg ring-1 ring-white/10 border border-white/10 hover:border-purple-500 transition">
            <Image
              src="/ccp.png"
              alt="Ceylon Curry Pot"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold">Ceylon Curry Pot</h3>
              <p className="mt-2 text-sm text-gray-200 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                An online food ordering system for a restaurant.
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="group relative h-[320px] rounded-xl overflow-hidden bg-black shadow-lg ring-1 ring-white/10 border border-white/10 hover:border-purple-500 transition">
            <Image
              src="/corpovinculo.png"
              alt="Corpovinculo"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold">Corpovinculo</h3>
              <p className="mt-2 text-sm text-gray-200 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                A centralised platform for industry outreach and event management.
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="group relative h-[320px] rounded-xl overflow-hidden bg-black shadow-lg ring-1 ring-white/10 border border-white/10 hover:border-purple-500 transition">
            <Image
              src="/SM.png"
              alt="Save Marine Life"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold">Save Marine Life</h3>
              <p className="mt-2 text-sm text-gray-200 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                An awareness platform promoting marine conservation and sustainability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}