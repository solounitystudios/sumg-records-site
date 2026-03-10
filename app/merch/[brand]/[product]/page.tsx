import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MediaTile from "@/components/MediaTile";
import ProductCard from "@/components/storefront/ProductCard";
import ProductPurchasePanel from "@/components/storefront/ProductPurchasePanel";
import {
  getRelatedStorefrontProducts,
  getStorefrontBrand,
  getStorefrontBrands,
  getStorefrontProduct,
  getStorefrontProductsByBrand,
} from "@/lib/storefront";

interface ProductPageProps {
  params: Promise<{ brand: string; product: string }>;
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
  const product = getStorefrontProduct(brandSlug, productSlug);

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
  const product = getStorefrontProduct(brandSlug, productSlug);

  if (!brand || !product) {
    notFound();
  }

  const relatedProducts = getRelatedStorefrontProducts(brand.slug, product.slug, 3);
  const collectionName =
    brand.collections.find((collection) => collection.slug === product.collection)?.name ??
    product.collection;

  return (
    <>
      <section style={{ backgroundColor: brand.theme.surface }} className="py-16 md:py-24">
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
              <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: brand.theme.mutedText }}>
                {brand.logoWordmark} · {collectionName}
              </p>
              <h1 className="mt-4 text-4xl md:text-5xl tracking-tight" style={{ color: brand.theme.text }}>
                {product.name}
              </h1>
              <p className="mt-5 text-sm leading-relaxed" style={{ color: brand.theme.mutedText }}>
                {product.description}
              </p>

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
                  href={`/merch/${brand.slug}/${relatedProduct.slug}`}
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
