import BrandCard from "@/components/BrandCard";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { brands } from "@/data";

export default function BrandsPage() {
  return (
    <>
      <PageIntro
        eyebrow="SUMG Ecosystem"
        title="Brands"
        description="Affiliated labels and design houses connected to the SUMG world."
      />

      <section className="bg-[#f7f7f5] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="Affiliated"
            title={`${brands.length} Brands`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8">
            {brands.map((brand, index) => (
              <Reveal key={brand.slug} delay={index * 0.05}>
                <BrandCard
                  name={brand.name}
                  description={brand.shortDescription}
                  image={brand.heroImage}
                  accentColor={brand.theme.colors.accent}
                  href={`/brands/${brand.slug}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
