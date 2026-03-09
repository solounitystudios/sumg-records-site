import ProducerCard from "@/components/ProducerCard";
import SectionHeading from "@/components/SectionHeading";

const producers = [
  {
    name: "NightWire",
    descriptor: "Moody, layered beats rooted in boom-bap and ambient synthesis.",
    href: "#",
  },
  {
    name: "IronLight",
    descriptor: "Hard-edged production built for tension and release.",
    href: "#",
  },
  {
    name: "DeadZone 310",
    descriptor: "West Coast textures fused with sparse, cinematic arrangement.",
    href: "#",
  },
  {
    name: "Tidewell",
    descriptor: "Melodic soundscapes and evolving harmonic structures.",
    href: "#",
  },
];

export default function ProducersPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-[#111] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[10px] tracking-[0.45em] uppercase text-neutral-600 mb-6">
            SUMG Records
          </p>
          <h1 className="font-display italic font-normal text-white text-[2.5rem] md:text-[4.5rem] leading-[0.92] tracking-[-0.01em]">
            Producers
          </h1>
          <div className="mt-7 w-10 border-t border-neutral-700" />
          <p className="mt-6 text-sm text-neutral-500 max-w-sm leading-relaxed font-light">
            The architects of sound behind the SUMG catalogue.
          </p>
        </div>
      </section>

      {/* Producer grid */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="Production"
            title={`${producers.length} Producers`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {producers.map((producer, i) => (
              <ProducerCard
                key={producer.name}
                name={producer.name}
                descriptor={producer.descriptor}
                index={i + 1}
                href={producer.href}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
