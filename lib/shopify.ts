const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2025-01";

export function getShopifyConfig() {
  return {
    storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
    storefrontToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    apiVersion: SHOPIFY_API_VERSION,
  };
}

export function isShopifyConfigured() {
  const { storeDomain, storefrontToken } = getShopifyConfig();
  return Boolean(storeDomain && storefrontToken);
}

interface ShopifyRequestOptions<Vars> {
  query: string;
  variables?: Vars;
}

interface ShopifyGraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function shopifyFetch<T, Vars = Record<string, unknown>>(
  options: ShopifyRequestOptions<Vars>,
) {
  const { storeDomain, storefrontToken, apiVersion } = getShopifyConfig();
  if (!storeDomain || !storefrontToken) {
    throw new Error("Shopify storefront config missing.");
  }

  const endpoint = `https://${storeDomain}/api/${apiVersion}/graphql.json`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({
      query: options.query,
      variables: options.variables ?? {},
    }),
    // Storefront data can be short-cached once connected.
    next: {
      revalidate: 120,
    },
  });

  if (!response.ok) {
    throw new Error(`Shopify request failed: ${response.status}`);
  }

  const payload = (await response.json()) as ShopifyGraphQLResponse<T>;
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((entry) => entry.message).join("; "));
  }

  if (!payload.data) {
    throw new Error("Shopify response missing data.");
  }

  return payload.data;
}
