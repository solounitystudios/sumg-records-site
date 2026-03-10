import Link from "next/link";
import MediaTile from "@/components/MediaTile";
import { getStorefrontBrands, getStorefrontProductsByBrand } from "@/lib/storefront";

export default function MerchPage() {
  const brands = getStorefrontBrands();

  return (
    <>
      <section className="bg-[#101113] text-white py-24 md:py-32 border-b border-black">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[10px] uppercase tracking-[0.34em] text-neutral-500">Fashion commerce</p>
          <h1 className="mt-6 text-[clamp(2.4rem,6vw,4.8rem)] font-light tracking-tight leading-[0.93] max-w-4xl">
            Enter each brand&apos;s storefront.
          </h1>
          <p className="mt-6 max-w-2xl text-sm md:text-base text-neutral-300 leading-relaxed">
            Five standalone labels. Independent creative language, dedicated collections, and
            commerce-ready catalog flows.
          </p>
        </div>
      </section>

      <section className="bg-[#f7f7f5] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-8">
          {brands.map((brand) => {
            const productCount = getStorefrontProductsByBrand(brand.slug).length;

            return (
              <Link
                key={brand.slug}
                href={`/merch/${brand.slug}`}
                className="group block border border-neutral-800/15 bg-white overflow-hidden"
              >
                <div className="aspect-[4/3] relative">
                  <MediaTile
                    src={brand.heroImage}
                    alt={`${brand.name} storefront`}
                    label={brand.name}
                    className="aspect-[4/3]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: brand.theme.heroOverlay,
                    }}
                  />
                </div>
                <div className="p-6">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-400">
                    {brand.logoWordmark}
                  </p>
                  {brand.secondaryMark && (
                    <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                      {brand.secondaryMark}
                    </p>
                  )}
                  <h2 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 group-hover:opacity-85 transition-opacity">
                    {brand.name}
                  </h2>
                  <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
                    {brand.shortDescription}
                  </p>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    {brand.positioning}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                      {brand.collections.length} collections · {productCount} products
                    </p>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-700">
                      Enter store →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
