import MediaTile from "@/components/MediaTile";
import PageIntro from "@/components/PageIntro";
import SectionHeading from "@/components/SectionHeading";
import { merchItems } from "@/data";

export default function MerchPage() {
  const categories = ["tees", "hoodies", "accessories", "limited drops"] as const;

  return (
    <>
      <PageIntro
        eyebrow="SUMG × PersonaWorks"
        title="Merch"
        description="Capsules, uniforms, and limited drops connected to the label world."
      />

      <section className="bg-[#f7f7f5] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="Current pieces"
            title="Featured Products"
            description="Placeholder product catalogue. Replace pricing and inventory when live store is connected."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {merchItems.map((item) => (
              <article key={item.slug} className="group flex flex-col">
                <MediaTile
                  src={item.image}
                  alt={item.name}
                  label={item.name}
                  className="aspect-[3/4]"
                  sizes="(max-width: 1024px) 50vw, 24vw"
                />
                <div className="pt-5 pb-7 border-b border-neutral-800/20 group-hover:border-neutral-900 transition-colors duration-200 flex flex-col gap-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                    {item.category}
                  </p>
                  <h3 className="text-[11px] tracking-[0.22em] uppercase font-medium text-neutral-900">
                    {item.name}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {item.shortDescription}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.17em] text-neutral-700">
                    {item.price} · {item.availability}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 border-t border-neutral-800/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="Categories"
            title="Merch Structure"
            description="Merch is organized by product type for clean release management."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <article key={category} className="border border-neutral-800/15 p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                  {category}
                </p>
                <p className="mt-3 text-sm text-neutral-600">
                  {merchItems.filter((item) => item.category === category).length} items listed
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
