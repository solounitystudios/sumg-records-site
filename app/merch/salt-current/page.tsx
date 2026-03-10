import Link from "next/link";
import { notFound } from "next/navigation";
import MediaTile from "@/components/MediaTile";
import ProductCard from "@/components/storefront/ProductCard";
import { getCatalogProductsByBrand, getStorefrontBrand, sortFeaturedFirst } from "@/lib/storefront";

export default async function SaltCurrentStorefrontPage() {
  const brand = getStorefrontBrand("salt-current");
  if (!brand) {
    notFound();
  }

  const products = sortFeaturedFirst(await getCatalogProductsByBrand(brand.slug));
  const featured = products.slice(0, 2);
  const gridProducts = products.slice(2, 12);

  return (
    <div style={{ backgroundColor: "#eef0ec" }}>
      <section className="border-b border-[#c6cdd3]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-18 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <MediaTile
            src={brand.heroImage}
            alt={`${brand.name} campaign`}
            label={brand.name}
            className="aspect-[16/10]"
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority
            fallbackVariant="restrained"
          />
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#647485]">Coastal minimal</p>
            <h1 className="mt-4 font-display text-[clamp(2.3rem,5.3vw,4.8rem)] leading-[0.95] text-[#233647]">
              {brand.logoWordmark}
            </h1>
            <p className="mt-4 max-w-md text-sm md:text-base text-[#4f6274] leading-relaxed">
              Calm coastal layers for wind, light, and daily movement.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {brand.collections.map((collection) => (
                <span
                  key={collection.slug}
                  className="border border-[#b8c1cb] px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#607486]"
                >
                  {collection.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-6">
          {featured.map((product) => (
            <article key={product.slug} className="border border-[#c5ced6] bg-[#f5f7f4] p-4">
              <MediaTile
                src={product.images[0]}
                alt={product.name}
                label={product.name}
                className="aspect-[3/2]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                fallbackVariant="restrained"
              />
              <h2 className="mt-4 text-2xl tracking-tight text-[#25384a]">{product.name}</h2>
              <p className="mt-2 text-sm text-[#5d7183]">{product.description}</p>
              <Link
                href={`/merch/${brand.slug}/products/${product.slug}`}
                className="mt-4 inline-flex text-[10px] uppercase tracking-[0.2em] text-[#46627c]"
              >
                Explore item →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#647485]">Catalog</p>
            <Link href="/merch" className="text-[10px] uppercase tracking-[0.2em] text-[#607486]">
              Back to stores
            </Link>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                href={`/merch/${brand.slug}/products/${product.slug}`}
                textColor="#24384a"
                mutedTextColor="#607486"
                borderColor="#c5ced6"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
