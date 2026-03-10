import type { VideoItem } from "./types";

// Video ownership is tied to known SUMG artists, producers, or the label.
export const videos: VideoItem[] = [
  {
    title: "Zyson — Glass Hour (Official Visual)",
    slug: "zyson-glass-hour-visual",
    ownerType: "artist",
    artistSlug: "zyson",
    date: "2026-02-16",
    thumbnail: "/video-assets/glass-hour-visual.jpg",
    description:
      "A nocturnal visual built around fragmented memory and architectural light.",
  },
  {
    title: "Lysandra Noir — Twin Signals (Live Session)",
    slug: "lysandra-twin-signals-live",
    ownerType: "artist",
    artistSlug: "lysandra",
    date: "2026-01-27",
    thumbnail: "/video-assets/twin-signals-live.jpg",
    description:
      "Minimal live arrangement with alternate vocal framing and close-mic intimacy.",
  },
  {
    title: "SUMG Spring 26 — Ecosystem Teaser",
    slug: "sumg-spring-26-teaser",
    ownerType: "label",
    date: "2025-12-11",
    thumbnail: "/video-assets/spring-26-teaser.jpg",
    description:
      "Editorial teaser introducing artists, producers, and brand capsules for the season.",
  },
];
