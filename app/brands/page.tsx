import BrandCard from "@/components/BrandCard";
import SectionHeading from "@/components/SectionHeading";

const brands = [
  {
    name: "Unity Standard",
    description:
      "Utilitarian cuts rooted in conscious design and material restraint. Each piece is built to last and worn with intention.",
    href: "#",
  },
  {
    name: "Moonspell",
    description:
      "Darkwear and ceremonial fashion for those who move between worlds. Inspired by ritual, myth, and the space between.",
    href: "#",
  },
  {
    name: "Salt Current",
    description:
      "Coastal-minimal pieces driven by raw texture and honest form. Washed, worn-in, and made for open environments.",
    href: "#",
  },
  {
    name: "Woronoff",
    description:
      "Eastern European craft meets contemporary urban tailoring. Structured shapes, refined materials, quiet confidence.",
    href: "#",
  },
  {
    name: "Concrete Borough",
    description:
      "City-built garments. Heavy-weight basics for hard environments. No decoration — only function and form.",
    href: "#",
  },
];

export default function BrandsPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-[#111] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[10px] tracking-[0.45em] uppercase text-neutral-600 mb-6">
            SUMG Records
          </p>
          <h1 className="font-display italic font-normal text-white text-4xl md:text-6xl leading-none tracking-tight">
            Brands
          </h1>
          <div className="mt-7 w-10 border-t border-neutral-700" />
          <p className="mt-6 text-sm text-neutral-500 max-w-sm leading-relaxed font-light">
            Affiliated clothing labels and creative brands within the SUMG
            ecosystem.
          </p>
        </div>
      </section>

      {/* Brand directory */}
      <section className="bg-[#fafaf8] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="Affiliated"
            title={`${brands.length} Brands`}
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
