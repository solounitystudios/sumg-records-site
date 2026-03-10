import Link from "next/link";
import { notFound } from "next/navigation";
import MediaTile from "@/components/MediaTile";
import ProductCard from "@/components/storefront/ProductCard";
import { getCatalogProductsByBrand, getStorefrontBrand, sortFeaturedFirst } from "@/lib/storefront";

const categoryIcons: Record<string, string> = {
  tops: "TP",
  outerwear: "OW",
  bottoms: "BT",
  accessories: "AC",
  lifestyle: "LS",
};

export default async function ConcreteBoroughStorefrontPage() {
  const brand = getStorefrontBrand("concrete-borough");
  if (!brand) {
    notFound();
  }

  const products = sortFeaturedFirst(await getCatalogProductsByBrand(brand.slug));
  const spotlight = products.slice(0, 3);
  const gridProducts = products.slice(3, 12);

  return (
    <div style={{ backgroundColor: "#1f2328", color: "#eef1f4" }}>
      <section className="relative border-b border-neutral-700">
        <div className="absolute inset-0">
          <MediaTile
            src={brand.heroImage}
            alt={`${brand.name} campaign`}
            label={brand.name}
            className="h-full"
            sizes="100vw"
            priority
            fallbackVariant="restrained"
          />
          <div className="absolute inset-0 bg-[#111418]/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.32em] text-neutral-400">Urban industrial</p>
          <h1 className="mt-4 text-[clamp(2.3rem,5.2vw,4.5rem)] font-semibold uppercase tracking-[0.04em]">
            {brand.logoWordmark}
            {brand.secondaryMark ? ` · ${brand.secondaryMark}` : ""}
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-neutral-300">
            Hardwearing city uniforms built for infrastructure, impact, and repeat movement.
          </p>
        </div>
      </section>

      <section className="border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {brand.categories.map((category) => (
            <a
              key={category}
              href={`#category-${category}`}
              className="flex items-center gap-3 border border-neutral-600 px-4 py-3 bg-[#2a2f35]"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                {categoryIcons[category] ?? "--"}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-200">{category}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-400">Street spotlight</p>
          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            {spotlight.map((product) => (
              <article key={product.slug} className="border border-neutral-600 bg-[#2b3138] p-4">
                <MediaTile
                  src={product.images[0]}
                  alt={product.name}
                  label={product.name}
                  className="aspect-[4/3]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  fallbackVariant="restrained"
                />
                <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                  {product.category}
                </p>
                <h2 className="mt-2 text-2xl tracking-tight text-neutral-100">{product.name}</h2>
                <Link
                  href={`/merch/${brand.slug}/products/${product.slug}`}
                  className="mt-4 inline-flex text-[10px] uppercase tracking-[0.2em] text-neutral-200"
                >
                  Open product →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridProducts.map((product) => (
              <div key={product.slug} id={`category-${product.category}`}>
                <ProductCard
                  product={product}
                  href={`/merch/${brand.slug}/products/${product.slug}`}
                  textColor="#f3f4f6"
                  mutedTextColor="#9ca3af"
                  borderColor="#4b5563"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
