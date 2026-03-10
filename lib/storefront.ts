import { fashionBrands } from "@/data/fashionBrands";
import { fashionProducts } from "@/data/products";
import type { StorefrontProduct } from "@/data/types";

export function getStorefrontBrands() {
  return fashionBrands.filter((brand) => brand.commerceEnabled);
}

export function getStorefrontBrand(slug: string) {
  return getStorefrontBrands().find((brand) => brand.slug === slug);
}

export function getStorefrontProductsByBrand(brandSlug: string) {
  return fashionProducts.filter((product) => product.brandSlug === brandSlug);
}

export function getStorefrontProduct(brandSlug: string, productSlug: string) {
  return fashionProducts.find(
    (product) => product.brandSlug === brandSlug && product.slug === productSlug,
  );
}

export function getRelatedStorefrontProducts(brandSlug: string, exceptSlug: string, limit = 4) {
  return fashionProducts
    .filter((product) => product.brandSlug === brandSlug && product.slug !== exceptSlug)
    .slice(0, limit);
}

export async function getCatalogProductsByBrand(brandSlug: string) {
  const { getBrandProductsFromSource } = await import("@/lib/shopify/products");
  return getBrandProductsFromSource(brandSlug, getStorefrontProductsByBrand(brandSlug));
}

export async function getCatalogProduct(brandSlug: string, productSlug: string) {
  const { getProductFromSource } = await import("@/lib/shopify/products");
  return getProductFromSource(brandSlug, productSlug, getStorefrontProduct(brandSlug, productSlug));
}

export function getStorefrontCategories(brandSlug: string) {
  const brand = getStorefrontBrand(brandSlug);
  if (brand) {
    return brand.categories;
  }

  const products = getStorefrontProductsByBrand(brandSlug);
  return Array.from(new Set(products.map((product) => product.category)));
}

export function getCollectionProducts(brandSlug: string, collectionSlug: string) {
  return getStorefrontProductsByBrand(brandSlug).filter(
    (product) => product.collection === collectionSlug,
  );
}

export function getCategoryProducts(brandSlug: string, category: string) {
  return getStorefrontProductsByBrand(brandSlug).filter((product) => product.category === category);
}

export function sortFeaturedFirst(products: StorefrontProduct[]) {
  return [...products].sort((a, b) => Number(b.featured) - Number(a.featured));
}
