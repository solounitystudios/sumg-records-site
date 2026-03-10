import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MediaTile from "@/components/MediaTile";
import ProductCard from "@/components/storefront/ProductCard";
import ProductPurchasePanel from "@/components/storefront/ProductPurchasePanel";
import { formatCurrency } from "@/lib/commerce";
import {
  getCatalogProduct,
  getRelatedStorefrontProducts,
  getStorefrontBrand,
  getStorefrontBrands,
  getStorefrontProductsByBrand,
} from "@/lib/storefront";

interface ProductPageProps {
  params: Promise<{ brand: string; product: string }>;
}

function bodyClass(treatment: string) {
  switch (treatment) {
    case "modern-sans":
    case "utility-sans":
    case "minimal-sans":
    case "grotesk-sans":
    case "relaxed-sans":
      return "font-sans";
    default:
      return "font-sans";
  }
}

export async function generateStaticParams() {
  return getStorefrontBrands().flatMap((brand) =>
    getStorefrontProductsByBrand(brand.slug).map((product) => ({
      brand: brand.slug,
      product: product.slug,
    })),
  );
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { brand: brandSlug, product: productSlug } = await params;
  const brand = getStorefrontBrand(brandSlug);
  const product = await getCatalogProduct(brandSlug, productSlug);

  if (!brand || !product) {
    return {};
  }

  return {
    title: `${product.name} — ${brand.name}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { brand: brandSlug, product: productSlug } = await params;
  const brand = getStorefrontBrand(brandSlug);
  const product = await getCatalogProduct(brandSlug, productSlug);

  if (!brand || !product) {
    notFound();
  }

  const relatedProducts = getRelatedStorefrontProducts(brand.slug, product.slug, 3);
  const collectionName =
    brand.collections.find((collection) => collection.slug === product.collection)?.name ??
    product.collection;

  return (
    <>
      <section
        style={{ backgroundColor: brand.theme.surface }}
        className={`py-16 md:py-24 ${bodyClass(brand.theme.bodyTreatment)}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Link
            href={`/merch/${brand.slug}`}
            className="text-[10px] uppercase tracking-[0.22em]"
            style={{ color: brand.theme.mutedText }}
          >
            ← Back to {brand.name}
          </Link>

          <div className="mt-8 grid lg:grid-cols-[1fr_0.9fr] gap-10">
            <MediaTile
              src={product.images[0]}
              alt={product.name}
              label={product.name}
              className="aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.24em]"
                style={{ color: brand.theme.mutedText }}
              >
                {brand.logoWordmark}
                {brand.secondaryMark ? ` (${brand.secondaryMark})` : ""} · {collectionName}
              </p>
              <h1 className="mt-4 text-4xl md:text-5xl tracking-tight" style={{ color: brand.theme.text }}>
                {product.name}
              </h1>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <p className="mt-4 text-sm" style={{ color: brand.theme.mutedText }}>
                  <span className="line-through mr-3">
                    {formatCurrency(product.compareAtPrice, product.currency)}
                  </span>
                  <span style={{ color: brand.theme.accent }}>
                    {formatCurrency(product.price, product.currency)}
                  </span>
                </p>
              )}
              <p className="mt-5 text-sm leading-relaxed" style={{ color: brand.theme.mutedText }}>
                {product.description}
              </p>

              <div className="mt-6 grid md:grid-cols-2 gap-5">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.24em]"
                    style={{ color: brand.theme.mutedText }}
                  >
                    Details
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm" style={{ color: brand.theme.text }}>
                    {product.details.map((detail) => (
                      <li key={detail}>• {detail}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.24em]"
                    style={{ color: brand.theme.mutedText }}
                  >
                    Materials
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm" style={{ color: brand.theme.text }}>
                    {product.materials.map((material) => (
                      <li key={material}>• {material}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t pt-8" style={{ borderColor: brand.theme.border }}>
                <ProductPurchasePanel
                  product={product}
                  accentColor={brand.theme.accent}
                  borderColor={brand.theme.border}
                  mutedTextColor={brand.theme.mutedText}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section style={{ backgroundColor: brand.theme.background }} className="py-20 md:py-24 border-t">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: brand.theme.mutedText }}>
              More from {brand.name}
            </p>
            <div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.slug}
                  product={relatedProduct}
                  href={`/merch/${brand.slug}/products/${relatedProduct.slug}`}
                  textColor={brand.theme.text}
                  mutedTextColor={brand.theme.mutedText}
                  borderColor={brand.theme.border}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
