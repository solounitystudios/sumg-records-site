import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MediaTile from "@/components/MediaTile";
import ProductCard from "@/components/storefront/ProductCard";
import { getStorefrontBrand, getStorefrontBrands, getStorefrontProductsByBrand } from "@/lib/storefront";

interface StorefrontPageProps {
  params: Promise<{ brand: string }>;
}

function headlineClass(typography: string) {
  switch (typography) {
    case "sculptural":
      return "font-display text-[clamp(2.5rem,6vw,5.5rem)] italic";
    case "romantic":
      return "font-display text-[clamp(2.6rem,6vw,5.8rem)] italic";
    case "system":
      return "font-sans text-[clamp(2.3rem,5.5vw,4.8rem)] tracking-tight";
    case "industrial":
      return "font-sans text-[clamp(2.3rem,5.5vw,4.8rem)] uppercase tracking-[0.03em]";
    case "coastal":
      return "font-display text-[clamp(2.4rem,5.8vw,5.2rem)]";
    default:
      return "font-sans text-[clamp(2.4rem,5.8vw,5.2rem)]";
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

  const products = getStorefrontProductsByBrand(brand.slug);

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
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.34em]" style={{ color: brand.theme.mutedText }}>
            {brand.logoWordmark}
          </p>
          <h1 className={`mt-6 leading-[0.93] tracking-tight ${headlineClass(brand.theme.typography)}`}>
            {brand.name}
          </h1>
          <p className="mt-6 max-w-2xl text-sm md:text-base leading-relaxed" style={{ color: brand.theme.mutedText }}>
            {brand.fullDescription}
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
                      href={`/merch/${brand.slug}/${product.slug}`}
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
