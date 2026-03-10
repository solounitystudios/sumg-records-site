import Link from "next/link";
import HeroScene from "@/components/HeroScene";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";

const pillars = [
  {
    title: "SUMG Records",
    body: "Artist development, release strategy, publishing, and long-form creative direction.",
    href: "/about",
  },
  {
    title: "Producer Network",
    body: "In-house and affiliated producers shaping sonic identity across the roster.",
    href: "/producers",
  },
  {
    title: "Brand System",
    body: "Fashion labels and capsule partners translating music identity into physical form.",
    href: "/brands",
  },
  {
    title: "PersonaWorks",
    body: "Creative engine behind visuals, campaigns, editorial concepts, and worldbuilding.",
    href: "/merch",
  },
];

export default function EcosystemPage() {
  return (
    <>
      <PageIntro
        eyebrow="Universe"
        title="Ecosystem"
        description="A connected system linking artists, producers, fashion brands, and creative direction."
      />
      <section className="relative bg-[#0f1012] text-white py-24 md:py-32 overflow-hidden border-t border-black">
        <HeroScene />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-[1.02] max-w-3xl">
              SUMG operates as a label and a connected creative framework.
            </h2>
            <p className="mt-6 text-sm md:text-base text-neutral-300 leading-relaxed max-w-2xl">
              Music remains central, but each project extends into visuals, garments, and
              editorial releases to create continuity across formats.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f7f7f5] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.06}>
              <article className="border-t border-neutral-800/20 pt-6 pb-8">
                <h3 className="text-2xl font-light tracking-tight text-neutral-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{pillar.body}</p>
                <Link
                  href={pillar.href}
                  className="mt-4 inline-flex text-[11px] uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900"
                >
                  Open →
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
