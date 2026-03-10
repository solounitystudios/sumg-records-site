import Link from "next/link";
import { notFound } from "next/navigation";
import MediaTile from "@/components/MediaTile";
import ProductCard from "@/components/storefront/ProductCard";
import { getCatalogProductsByBrand, getStorefrontBrand, sortFeaturedFirst } from "@/lib/storefront";

export default async function WoronoffStorefrontPage() {
  const brand = getStorefrontBrand("woronoff");
  if (!brand) {
    notFound();
  }

  const products = sortFeaturedFirst(await getCatalogProductsByBrand(brand.slug));
  const leadProduct = products[0];
  const curatedProducts = products.slice(1, 5);

  return (
    <div style={{ backgroundColor: brand.theme.surface }}>
      <section className="relative border-b" style={{ borderColor: brand.theme.border }}>
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
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-28 md:py-40 text-center text-[#f3f5f7]">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#aeb5bf]">{brand.logoWordmark}</p>
          <h1 className="mt-7 font-display italic text-[clamp(3rem,7vw,6.2rem)] leading-[0.9]">
            {brand.name}
          </h1>
          <p className="mt-12 text-[10px] uppercase tracking-[0.28em] text-[#c2c8d1]">
            Luxury ready-to-wear
          </p>
        </div>
      </section>

      {leadProduct && (
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
            <MediaTile
              src={leadProduct.images[0]}
              alt={leadProduct.name}
              label={leadProduct.name}
              className="aspect-[5/4]"
              sizes="(max-width: 1024px) 100vw, 58vw"
              fallbackVariant="restrained"
            />
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: brand.theme.mutedText }}>
                Editorial selection
              </p>
              <h2
                className="mt-5 font-display italic text-4xl md:text-5xl leading-[0.95]"
                style={{ color: brand.theme.text }}
              >
                {leadProduct.name}
              </h2>
              <p className="mt-5 text-sm leading-relaxed max-w-md" style={{ color: brand.theme.mutedText }}>
                {leadProduct.description}
              </p>
              <Link
                href={`/merch/${brand.slug}/products/${leadProduct.slug}`}
                className="mt-8 inline-flex border px-6 py-3 text-[11px] uppercase tracking-[0.22em]"
                style={{ borderColor: brand.theme.border, color: brand.theme.text }}
              >
                View product
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-4 md:py-8">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between">
            <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: brand.theme.mutedText }}>
              Curated pieces
            </p>
            <Link
              href="/merch"
              className="text-[10px] uppercase tracking-[0.22em]"
              style={{ color: brand.theme.mutedText }}
            >
              Back to stores
            </Link>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-10">
            {curatedProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                href={`/merch/${brand.slug}/products/${product.slug}`}
                textColor={brand.theme.text}
                mutedTextColor={brand.theme.mutedText}
                borderColor={brand.theme.border}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
