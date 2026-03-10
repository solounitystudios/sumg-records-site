import type { StorefrontProduct } from "@/data/types";
import { isShopifyConfigured, shopifyFetch } from "@/lib/shopify";

interface ShopifyCollectionProductsResponse {
  collectionByHandle: {
    products: {
      nodes: Array<{
        handle: string;
        title: string;
        description: string;
        productType: string;
        tags: string[];
        availableForSale: boolean;
        featuredImage?: { url: string };
        priceRange: {
          minVariantPrice: {
            amount: string;
            currencyCode: "USD";
          };
        };
        variants: {
          nodes: Array<{
            availableForSale: boolean;
            selectedOptions: Array<{ name: string; value: string }>;
          }>;
        };
      }>;
    };
  } | null;
}

function normalizeCategory(value?: string): StorefrontProduct["category"] {
  const raw = (value ?? "").toLowerCase();
  if (raw.includes("outer")) return "outerwear";
  if (raw.includes("bottom")) return "bottoms";
  if (raw.includes("access")) return "accessories";
  if (raw.includes("life")) return "lifestyle";
  return "tops";
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function mapShopifyProduct(brandSlug: string, node: NonNullable<ShopifyCollectionProductsResponse["collectionByHandle"]>["products"]["nodes"][number]): StorefrontProduct {
  const variantOptions = node.variants.nodes.flatMap((variant) => variant.selectedOptions);
  const sizes = unique(
    variantOptions
      .filter((option) => option.name.toLowerCase() === "size")
      .map((option) => option.value),
  );
  const colors = unique(
    variantOptions
      .filter((option) => option.name.toLowerCase() === "color")
      .map((option) => option.value),
  );

  return {
    brandSlug,
    name: node.title,
    slug: node.handle,
    price: Number(node.priceRange.minVariantPrice.amount),
    currency: node.priceRange.minVariantPrice.currencyCode,
    category: normalizeCategory(node.productType),
    collection: "shopify-imported",
    colors: colors.length > 0 ? colors : ["Default"],
    sizes: sizes.length > 0 ? sizes : ["One Size"],
    images: node.featuredImage?.url ? [node.featuredImage.url] : [],
    description: node.description || "Product details coming soon.",
    details: ["Imported from Shopify collection."],
    materials: ["Material details from Shopify pending."],
    inStock: node.availableForSale,
    featured: node.tags.some((tag) => tag.toLowerCase() === "featured"),
    tags: node.tags,
  };
}

export async function getBrandProductsFromSource(
  brandSlug: string,
  fallbackProducts: StorefrontProduct[],
) {
  if (!isShopifyConfigured()) {
    return fallbackProducts;
  }

  const query = `
    query GetBrandProducts($handle: String!) {
      collectionByHandle(handle: $handle) {
        products(first: 100) {
          nodes {
            handle
            title
            description
            productType
            tags
            availableForSale
            featuredImage {
              url
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 20) {
              nodes {
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<ShopifyCollectionProductsResponse, { handle: string }>({
      query,
      variables: { handle: brandSlug },
    });

    const nodes = data.collectionByHandle?.products.nodes ?? [];
    if (nodes.length === 0) {
      return fallbackProducts;
    }

    return nodes.map((node) => mapShopifyProduct(brandSlug, node));
  } catch {
    return fallbackProducts;
  }
}

export async function getProductFromSource(
  brandSlug: string,
  productSlug: string,
  fallbackProduct: StorefrontProduct | undefined,
) {
  const products = await getBrandProductsFromSource(
    brandSlug,
    fallbackProduct ? [fallbackProduct] : [],
  );
  return products.find((product) => product.slug === productSlug) ?? fallbackProduct;
}
