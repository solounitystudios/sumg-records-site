import Link from "next/link";
import { notFound } from "next/navigation";
import MediaTile from "@/components/MediaTile";
import ProductCard from "@/components/storefront/ProductCard";
import { getCatalogProductsByBrand, getStorefrontBrand, sortFeaturedFirst } from "@/lib/storefront";

const categoryIcons: Record<string, string> = {
  tops: "TS",
  outerwear: "OW",
  bottoms: "BT",
  accessories: "AC",
  lifestyle: "LS",
};

export default async function UnityStandardStorefrontPage() {
  const brand = getStorefrontBrand("unity-standard");
  if (!brand) {
    notFound();
  }

  const products = sortFeaturedFirst(await getCatalogProductsByBrand(brand.slug));
  const spotlight = products.slice(0, 3);
  const gridProducts = products.slice(3, 12);

  return (
    <div style={{ backgroundColor: "#f4f5f3" }}>
      <section className="relative border-b border-neutral-300">
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
          <div className="absolute inset-0 bg-neutral-100/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">Performance retail</p>
          <h1 className="mt-4 text-[clamp(2.4rem,5.5vw,4.8rem)] font-semibold tracking-tight text-neutral-900">
            {brand.logoWordmark}
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-neutral-700">
            Engineered daily essentials for movement, function, and city rhythm.
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {brand.categories.map((category) => (
            <a
              key={category}
              href={`#category-${category}`}
              className="flex items-center gap-3 border border-neutral-300 px-4 py-3"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                {categoryIcons[category] ?? "--"}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-800">{category}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">Spotlight products</p>
          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            {spotlight.map((product) => (
              <article key={product.slug} className="border border-neutral-300 bg-white p-4">
                <MediaTile
                  src={product.images[0]}
                  alt={product.name}
                  label={product.name}
                  className="aspect-[4/3]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  fallbackVariant="restrained"
                />
                <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                  {product.category}
                </p>
                <h2 className="mt-2 text-2xl tracking-tight text-neutral-900">{product.name}</h2>
                <Link
                  href={`/merch/${brand.slug}/products/${product.slug}`}
                  className="mt-4 inline-flex text-[10px] uppercase tracking-[0.2em] text-neutral-800"
                >
                  Shop now →
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
                  textColor="#111827"
                  mutedTextColor="#6b7280"
                  borderColor="#d1d5db"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
