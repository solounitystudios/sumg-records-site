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

export interface VideoItem {
  title: string;
  slug: string;
  artist: string;
  type: "music video" | "visual" | "live session" | "teaser";
  releaseDate: string;
  thumbnail: string;
  sumgYouTubeId?: string;
  description: string;
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

export interface MerchItem {
  name: string;
  slug: string;
  category: "tees" | "hoodies" | "accessories" | "limited drops";
  image: string;
  shortDescription: string;
  price: string;
  availability: string;
}

export interface LabelProfile {
  name: string;
  shortStatement: string;
  socials: SocialLinks;
}
