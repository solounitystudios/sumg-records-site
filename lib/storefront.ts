import { storefrontBrands, storefrontProducts } from "@/data/storefront";

export function getStorefrontBrands() {
  return storefrontBrands;
}

export function getStorefrontBrand(slug: string) {
  return storefrontBrands.find((brand) => brand.slug === slug);
}

export function getStorefrontProductsByBrand(brandSlug: string) {
  return storefrontProducts.filter((product) => product.brandSlug === brandSlug);
}

export function getStorefrontProduct(brandSlug: string, productSlug: string) {
  return storefrontProducts.find(
    (product) => product.brandSlug === brandSlug && product.slug === productSlug,
  );
}

export function getRelatedStorefrontProducts(brandSlug: string, exceptSlug: string, limit = 4) {
  return storefrontProducts
    .filter((product) => product.brandSlug === brandSlug && product.slug !== exceptSlug)
    .slice(0, limit);
}
