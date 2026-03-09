import ArtistCard from "@/components/ArtistCard";
import SectionHeading from "@/components/SectionHeading";

const artists = [
  {
    name: "Zyson",
    descriptor:
      "Cinematic rap with introspective lyricism and atmospheric production.",
    href: "#",
  },
  {
    name: "Jayno",
    descriptor:
      "Genre-fluid artist blending soul, hip-hop, and electronic textures.",
    href: "#",
  },
  {
    name: "Lysandra Noir",
    descriptor:
      "Art-forward vocalist exploring identity, duality, and dark pop.",
    href: "#",
  },
  {
    name: "Mar Rick",
    descriptor:
      "Raw street narratives layered with sharp composition and rhythm.",
    href: "#",
  },
  {
    name: "Sorin",
    descriptor:
      "Introspective songwriting rooted in minimalism and emotional clarity.",
    href: "#",
  },
  {
    name: "Yosin",
    descriptor:
      "Experimental sound design and lyrical abstraction from the underground.",
    href: "#",
  },
  {
    name: "Turkz",
    descriptor:
      "High-energy performance art fusing trap, poetry, and movement.",
    href: "#",
  },
];

export default function ArtistsPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-[#111] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[10px] tracking-[0.45em] uppercase text-neutral-600 mb-6">
            SUMG Records
          </p>
          <h1 className="font-display italic font-normal text-white text-[2.5rem] md:text-[4.5rem] leading-[0.92] tracking-[-0.01em]">
            Artists
          </h1>
          <div className="mt-7 w-10 border-t border-neutral-700" />
          <p className="mt-6 text-sm text-neutral-500 max-w-sm leading-relaxed font-light">
            The SUMG roster — seven distinct voices, one unified vision.
          </p>
        </div>
      </section>

      {/* Artist grid */}
      <section className="bg-[#fafaf8] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading eyebrow="Roster" title={`${artists.length} Artists`} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
            {artists.map((artist) => (
              <ArtistCard
                key={artist.name}
                name={artist.name}
                descriptor={artist.descriptor}
                href={artist.href}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
