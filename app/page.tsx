import Link from "next/link";
import ArtistCard from "@/components/ArtistCard";
import ProducerCard from "@/components/ProducerCard";
import BrandCard from "@/components/BrandCard";
import SectionHeading from "@/components/SectionHeading";

const featuredArtists = [
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
];

const featuredProducers = [
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

const brands = [
  {
    name: "Unity Standard",
    description:
      "Utilitarian cuts rooted in conscious design and material restraint.",
    href: "#",
  },
  {
    name: "Moonspell",
    description:
      "Darkwear and ceremonial fashion for those who move between worlds.",
    href: "#",
  },
  {
    name: "Salt Current",
    description: "Coastal-minimal pieces driven by raw texture and honest form.",
    href: "#",
  },
  {
    name: "Woronoff",
    description:
      "Eastern European craft meets contemporary urban tailoring.",
    href: "#",
  },
  {
    name: "Concrete Borough",
    description:
      "City-built garments. Heavy-weight basics for hard environments.",
    href: "#",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-[#111] text-white min-h-[85svh] flex flex-col justify-center items-center text-center px-6 py-28">
        <p className="text-[10px] tracking-[0.5em] uppercase text-neutral-600 mb-10">
          Est. — Solounity Music Group
        </p>
        <h1 className="font-display italic font-normal text-white leading-none tracking-tight text-[clamp(3rem,8vw,7rem)]">
          SUMG Records
        </h1>
        <div className="mt-8 w-10 border-t border-neutral-700" />
        <p className="mt-7 text-[11px] tracking-[0.35em] uppercase text-neutral-500">
          Solounity Music Group
        </p>
        <p className="mt-6 text-sm text-neutral-500 max-w-xs leading-relaxed font-light">
          Independent music label exploring artists, identity, and AI-powered
          creative ecosystems.
        </p>
        <div className="mt-14 flex items-center gap-8">
          <Link
            href="/artists"
            className="text-[11px] tracking-[0.2em] uppercase border border-neutral-700 px-7 py-3.5 text-neutral-400 hover:border-white hover:text-white transition-colors duration-200"
          >
            Artists
          </Link>
          <Link
            href="/about"
            className="text-[11px] tracking-[0.2em] uppercase text-neutral-600 hover:text-white transition-colors duration-200"
          >
            About →
          </Link>
        </div>
      </section>

      {/* ── Featured Artists ──────────────────────────────────── */}
      <section className="bg-[#fafaf8] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="Roster"
            title="Featured Artists"
            linkHref="/artists"
            linkLabel="All Artists"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
            {featuredArtists.map((artist) => (
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

      {/* ── Featured Producers ────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="Production"
            title="Featured Producers"
            linkHref="/producers"
            linkLabel="All Producers"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {featuredProducers.map((producer, i) => (
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

      {/* ── Merch Callout ─────────────────────────────────────── */}
      <section className="bg-[#111] text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-12">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-600 mb-5">
              Collaboration
            </p>
            <h2 className="font-display italic font-normal text-white leading-tight text-3xl md:text-4xl">
              SUMG × PersonaWorks
            </h2>
            <p className="mt-4 text-sm text-neutral-500 max-w-md leading-relaxed font-light">
              A curated collection at the intersection of music, identity, and
              AI-driven creative expression.
            </p>
          </div>
          <Link
            href="/merch"
            className="shrink-0 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border border-neutral-700 px-8 py-4 text-neutral-400 hover:border-white hover:text-white transition-colors duration-200"
          >
            View Collection →
          </Link>
        </div>
      </section>

      {/* ── Brand Partners ────────────────────────────────────── */}
      <section className="bg-[#fafaf8] py-24 md:py-32 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="Affiliated"
            title="Brand Partners"
            linkHref="/brands"
            linkLabel="All Brands"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8">
            {brands.map((brand) => (
              <BrandCard
                key={brand.name}
                name={brand.name}
                description={brand.description}
                href={brand.href}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
