import BrandCard from "@/components/BrandCard";
import SectionHeading from "@/components/SectionHeading";

const products = [
  { name: "Hoodie", descriptor: "Heavyweight fleece. Dropped shoulder. Unisex fit." },
  { name: "Jacket", descriptor: "Oversized shell. Minimal branding. Utility detail." },
  { name: "Hat", descriptor: "Six-panel structured cap. Tonal embroidery." },
];

const brandStores = [
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

export default function MerchPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#111] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[10px] tracking-[0.45em] uppercase text-neutral-600 mb-6">
            Collaboration
          </p>
          <h1 className="font-display italic font-normal text-white text-[2.5rem] md:text-[4.5rem] leading-[0.92] tracking-[-0.01em]">
            SUMG × PersonaWorks
          </h1>
          <div className="mt-7 w-10 border-t border-neutral-700" />
          <p className="mt-6 text-sm text-neutral-500 max-w-md leading-relaxed font-light">
            This collection explores the intersection of music, identity, and
            AI-driven creative expression. Curated across independent labels and
            brand partners — not a storefront, but a point of access.
          </p>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-[#fafaf8] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="SUMG × PersonaWorks"
            title="Featured Pieces"
            description="Select drops available through partner stores. Quantities are limited."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-10">
            {products.map((product) => (
              <article key={product.name} className="group flex flex-col">
                {/* Product image placeholder — portrait */}
                <div className="relative aspect-[3/4] bg-neutral-200 overflow-hidden">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>
                <div className="pt-5 pb-7 border-b border-neutral-200 group-hover:border-black transition-colors duration-200 flex flex-col gap-3">
                  <h3 className="text-[11px] tracking-[0.22em] uppercase font-medium text-black">
                    {product.name}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {product.descriptor}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SUMG Core Merch */}
      <section className="bg-white py-20 md:py-28 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div className="max-w-lg">
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4">
              Core
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black leading-tight">
              SUMG Core Merch
            </h2>
            <div className="mt-5 w-10 border-t border-neutral-200" />
            <p className="mt-5 text-sm text-neutral-500 leading-relaxed">
              Essentials designed under the SUMG house. Understated, wearable,
              and built around the label aesthetic. No seasonal pressure — these
              pieces carry the identity year-round.
            </p>
          </div>
          <a
            href="#"
            className="shrink-0 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border border-black px-8 py-4 text-black hover:bg-black hover:text-white transition-colors duration-200"
          >
            Shop Core →
          </a>
        </div>
      </section>

      {/* Brand Stores */}
      <section className="bg-[#fafaf8] py-24 md:py-32 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="Partners"
            title="Brand Stores"
            description="Each brand operates its own independent store. Visit directly to browse full collections."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8">
            {brandStores.map((brand) => (
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
