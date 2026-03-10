export interface LinkItem {
  label: string;
  href: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  x?: string;
  youtube?: string;
  tiktok?: string;
}

export interface StreamingLinks {
  spotify?: string;
  apple?: string;
  appleMusic?: string;
  soundcloud?: string;
  bandcamp?: string;
  youtube?: string;
}

export interface Artist {
  name: string;
  slug: string;
  image?: string;
  shortDescription: string;
  fullBio: string;
  vibe: string;
  location?: string;
  featuredReleaseSlug?: string;
  socials: SocialLinks;
  streaming: StreamingLinks;
}

export interface Producer {
  name: string;
  slug: string;
  image: string;
  shortDescription: string;
  fullBio: string;
  sonicIdentity: string;
  links?: SocialLinks;
}

export interface Brand {
  name: string;
  slug: string;
  image?: string;
  shortDescription: string;
  fullDescription: string;
  positioning: string;
}

export interface Release {
  title: string;
  slug: string;
  artist: string;
  cover: string;
  releaseDate: string;
  shortDescription: string;
  tracklist: string[];
  credits: string[];
  streaming: StreamingLinks;
}

export type VideoOwnerType = "artist" | "producer" | "label";

export interface VideoItem {
  title: string;
  slug: string;
  artistSlug?: string;
  producerSlug?: string;
  ownerType?: VideoOwnerType;
  youtubeId?: string;
  youtubeUrl?: string;
  date: string;
  thumbnail?: string;
  description?: string;
}

export interface NewsItem {
  title: string;
  slug: string;
  date: string;
  category: "signing" | "release" | "visual" | "merch" | "event" | "label";
  excerpt: string;
  content: string;
}

export interface EventItem {
  title: string;
  slug: string;
  date: string;
  location: string;
  description: string;
  ticketStatus: "tickets soon" | "on sale" | "sold out";
}

export interface StorefrontTheme {
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  accent: string;
  border: string;
  heroOverlay: string;
  typography: "sculptural" | "romantic" | "system" | "industrial" | "coastal";
}

export interface StorefrontCollection {
  slug: string;
  name: string;
  description: string;
}

export interface StorefrontBrand {
  name: string;
  slug: string;
  logoWordmark: string;
  shortDescription: string;
  fullDescription: string;
  theme: StorefrontTheme;
  heroImage: string;
  collections: StorefrontCollection[];
}

export interface StorefrontProduct {
  brandSlug: string;
  name: string;
  slug: string;
  price: number;
  currency: "USD";
  category: string;
  collection: string;
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  inStock: boolean;
}

export interface CartLineItem {
  lineId: string;
  brandSlug: string;
  productSlug: string;
  name: string;
  unitPrice: number;
  currency: "USD";
  color: string;
  size: string;
  image?: string;
  quantity: number;
}

export interface LabelProfile {
  name: string;
  shortStatement: string;
  socials: SocialLinks;
}
