import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MediaTile from "@/components/MediaTile";
import ProductCard from "@/components/storefront/ProductCard";
import {
  getCatalogProductsByBrand,
  getStorefrontBrand,
  getStorefrontBrands,
  getStorefrontCategories,
  sortFeaturedFirst,
} from "@/lib/storefront";

interface StorefrontPageProps {
  params: Promise<{ brand: string }>;
}

function headlineClass(treatment: string) {
  switch (treatment) {
    case "editorial-serif":
      return "font-display italic text-[clamp(2.6rem,6vw,5.7rem)]";
    case "geometric-sans":
      return "font-sans text-[clamp(2.4rem,5.6vw,5rem)] font-medium tracking-tight";
    case "gothic-serif":
      return "font-display italic text-[clamp(2.7rem,6.2vw,5.8rem)]";
    case "industrial-sans":
      return "font-sans uppercase text-[clamp(2.3rem,5.4vw,4.9rem)] tracking-[0.04em]";
    case "airy-serif":
      return "font-display text-[clamp(2.5rem,5.8vw,5.3rem)]";
    default:
      return "font-sans text-[clamp(2.4rem,5.8vw,5.2rem)]";
  }
}

function bodyClass(treatment: string) {
  switch (treatment) {
    case "modern-sans":
      return "font-sans";
    case "utility-sans":
      return "font-sans tracking-[0.01em]";
    case "minimal-sans":
      return "font-sans";
    case "grotesk-sans":
      return "font-sans tracking-[0.01em]";
    case "relaxed-sans":
      return "font-sans";
    default:
      return "font-sans";
  }
}

export async function generateStaticParams() {
  return getStorefrontBrands().map((brand) => ({ brand: brand.slug }));
}

export async function generateMetadata({ params }: StorefrontPageProps): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = getStorefrontBrand(brandSlug);

  if (!brand) {
    return {};
  }

  return {
    title: `${brand.name} Storefront`,
    description: brand.shortDescription,
  };
}

export default async function StorefrontBrandPage({ params }: StorefrontPageProps) {
  const { brand: brandSlug } = await params;
  const brand = getStorefrontBrand(brandSlug);

  if (!brand) {
    notFound();
  }

  const products = sortFeaturedFirst(await getCatalogProductsByBrand(brand.slug));
  const categories = getStorefrontCategories(brand.slug);

  return (
    <>
      <section
        className="relative overflow-hidden border-b"
        style={{
          backgroundColor: brand.theme.background,
          borderColor: brand.theme.border,
          color: brand.theme.text,
        }}
      >
        <div className="absolute inset-0">
          <MediaTile
            src={brand.heroImage}
            alt={`${brand.name} hero`}
            label={brand.name}
            className="h-full"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0" style={{ background: brand.theme.heroOverlay }} />
        </div>
        <div
          className={`relative max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 ${bodyClass(
            brand.theme.bodyTreatment,
          )}`}
        >
          <p className="text-[10px] uppercase tracking-[0.34em]" style={{ color: brand.theme.mutedText }}>
            {brand.logoWordmark}
          </p>
          {brand.secondaryMark && (
            <p className="mt-5 text-[10px] uppercase tracking-[0.28em]" style={{ color: brand.theme.accent }}>
              {brand.secondaryMark}
            </p>
          )}
          <h1
            className={`mt-4 leading-[0.93] tracking-tight ${headlineClass(brand.theme.headingTreatment)}`}
          >
            {brand.name}
          </h1>
          <p className="mt-6 max-w-2xl text-sm md:text-base leading-relaxed" style={{ color: brand.theme.mutedText }}>
            {brand.fullDescription}
          </p>
          <p className="mt-5 max-w-3xl text-xs uppercase tracking-[0.22em]" style={{ color: brand.theme.accent }}>
            {brand.positioning} · {brand.productMood}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: brand.theme.mutedText }}>
            {brand.visualDirection}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {brand.collections.map((collection) => (
              <span
                key={collection.slug}
                className="border px-3 py-2 text-[10px] uppercase tracking-[0.2em]"
                style={{ borderColor: brand.theme.border, color: brand.theme.mutedText }}
              >
                {collection.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: brand.theme.surface }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: brand.theme.mutedText }}>
                Catalog
              </p>
              <h2 className="mt-3 text-3xl tracking-tight" style={{ color: brand.theme.text }}>
                {products.length} products
              </h2>
            </div>
            <Link
              href="/merch"
              className="text-[10px] uppercase tracking-[0.22em]"
              style={{ color: brand.theme.mutedText }}
            >
              ← Back to brand hub
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <a
                key={category}
                href={`#category-${category}`}
                className="border px-3 py-2 text-[10px] uppercase tracking-[0.2em]"
                style={{ borderColor: brand.theme.border, color: brand.theme.mutedText }}
              >
                {category}
              </a>
            ))}
          </div>

          {brand.collections.map((collection) => {
            const collectionProducts = products.filter(
              (product) => product.collection === collection.slug,
            );
            if (collectionProducts.length === 0) {
              return null;
            }

            return (
              <div key={collection.slug} className="mt-14">
                <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: brand.theme.mutedText }}>
                  {collection.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed max-w-2xl" style={{ color: brand.theme.mutedText }}>
                  {collection.description}
                </p>
                <div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {collectionProducts.map((product) => (
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
            );
          })}

          {categories.map((category) => {
            const categoryProducts = products.filter((product) => product.category === category);
            if (categoryProducts.length === 0) {
              return null;
            }

            return (
              <div key={category} id={`category-${category}`} className="mt-16">
                <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: brand.theme.accent }}>
                  Category · {category}
                </p>
                <div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryProducts.slice(0, 3).map((product) => (
                    <ProductCard
                      key={`${category}-${product.slug}`}
                      product={product}
                      href={`/merch/${brand.slug}/products/${product.slug}`}
                      textColor={brand.theme.text}
                      mutedTextColor={brand.theme.mutedText}
                      borderColor={brand.theme.border}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {products.length === 0 && (
            <article className="mt-8 border p-8" style={{ borderColor: brand.theme.border }}>
              <p className="text-lg tracking-tight" style={{ color: brand.theme.text }}>
                Product catalog will be published soon.
              </p>
              <p className="mt-3 text-sm" style={{ color: brand.theme.mutedText }}>
                Check back for upcoming collection drops.
              </p>
            </article>
          )}
        </div>
      </section>
    </>
  );
}
