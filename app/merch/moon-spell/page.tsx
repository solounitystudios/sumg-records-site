import Link from "next/link";
import { notFound } from "next/navigation";
import MediaTile from "@/components/MediaTile";
import ProductCard from "@/components/storefront/ProductCard";
import { getCatalogProductsByBrand, getStorefrontBrand, sortFeaturedFirst } from "@/lib/storefront";

export default async function MoonSpellStorefrontPage() {
  const brand = getStorefrontBrand("moon-spell");
  if (!brand) {
    notFound();
  }

  const products = sortFeaturedFirst(await getCatalogProductsByBrand(brand.slug));
  const bestSellers = products.filter((product) => product.featured).slice(0, 4);
  const womenProducts = products.filter(
    (product) => product.category === "tops" || product.category === "accessories",
  );
  const menProducts = products.filter(
    (product) => product.category === "outerwear" || product.category === "tops",
  );

  return (
    <div style={{ backgroundColor: "#f6f2f8" }}>
      <section className="border-b border-[#d9cfe1] bg-[#f1e8f6]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#7f6994]">Lifestyle apparel</p>
            <h1 className="mt-4 text-[clamp(2.3rem,5.4vw,4.8rem)] font-semibold tracking-tight text-[#2d1f38]">
              {brand.logoWordmark}
            </h1>
            <p className="mt-4 max-w-xl text-sm md:text-base text-[#5a4768] leading-relaxed">
              Everyday silhouettes with soft drama, expressive layers, and approachable comfort.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#shop-women"
                className="inline-flex border border-[#8f77a3] px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-[#3a2a48]"
              >
                Shop women
              </a>
              <a
                href="#shop-men"
                className="inline-flex border border-[#b49cc8] px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-[#5a4768]"
              >
                Shop men
              </a>
            </div>
          </div>
          <MediaTile
            src={brand.heroImage}
            alt={`${brand.name} campaign`}
            label={brand.name}
            className="aspect-[5/4] border border-[#d6c9e1]"
            sizes="(max-width: 1024px) 100vw, 46vw"
            priority
            fallbackVariant="restrained"
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#7f6994]">Best sellers</p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                href={`/merch/${brand.slug}/products/${product.slug}`}
                textColor="#2f2240"
                mutedTextColor="#6d5a7d"
                borderColor="#d1c4dd"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-6">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#7f6994]">Shop by category</p>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brand.categories.map((category) => (
              <a
                key={category}
                href={`#category-${category}`}
                className="border border-[#d1c4dd] bg-white px-5 py-4 text-[11px] uppercase tracking-[0.22em] text-[#4a3858]"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="shop-women" className="py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#7f6994]">Shop women</p>
            <Link href="/merch" className="text-[10px] uppercase tracking-[0.2em] text-[#6d5a7d]">
              Back to stores
            </Link>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {womenProducts.slice(0, 6).map((product) => (
              <div key={product.slug} id={`category-${product.category}`}>
                <ProductCard
                  product={product}
                  href={`/merch/${brand.slug}/products/${product.slug}`}
                  textColor="#2f2240"
                  mutedTextColor="#6d5a7d"
                  borderColor="#d1c4dd"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="shop-men" className="pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#7f6994]">Shop men</p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {menProducts.slice(0, 6).map((product) => (
              <div key={product.slug} id={`category-${product.category}`}>
                <ProductCard
                  product={product}
                  href={`/merch/${brand.slug}/products/${product.slug}`}
                  textColor="#2f2240"
                  mutedTextColor="#6d5a7d"
                  borderColor="#d1c4dd"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
