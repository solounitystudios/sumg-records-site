import type { Release } from "./types";

export const releases: Release[] = [
  {
    title: "Glass Hour",
    slug: "glass-hour",
    artist: "Zyson",
    artistSlug: "zyson",
    cover: "/release-assets/glass-hour.jpg",
    releaseDate: "2026-02-14",
    shortDescription:
      "A cinematic rap release tracing memory, pressure, and self-reconstruction.",
    tracklist: [
      "Northbound",
      "Late Broadcast",
      "Glass Hour",
      "Weightless Signals",
      "After Rain (feat. NightWire)",
    ],
    credits: [
      "Executive Production: SUMG Records",
      "Production: NightWire",
      "Additional Production: Ironlight",
      "Mix: PersonaWorks Audio Lab",
    ],
    streaming: {
      spotify: "#",
      appleMusic: "#",
      soundcloud: "#",
    },
  },
  {
    title: "Double Bind",
    slug: "double-bind",
    artist: "Lysandra Noir",
    artistSlug: "lysandra",
    cover: "/release-assets/double-bind.jpg",
    releaseDate: "2026-01-09",
    shortDescription:
      "Dark pop architecture exploring dual identity through contrast and tension.",
    tracklist: [
      "Mirror Face",
      "No Exit Dress",
      "Body Language",
      "Twin Signals",
      "Afterimage",
    ],
    credits: [
      "Executive Production: SUMG Records",
      "Production: Ironlight",
      "Vocal Production: NightWire",
      "Creative Direction: PersonaWorks",
    ],
    streaming: {
      spotify: "#",
      appleMusic: "#",
      youtube: "#",
    },
  },
  {
    title: "Iron Season",
    slug: "iron-season",
    artist: "Turkz",
    artistSlug: "turkz",
    cover: "/release-assets/iron-season.jpg",
    releaseDate: "2025-11-21",
    shortDescription:
      "Heavy-hitting rap record engineered for high-impact live environments.",
    tracklist: [
      "Concrete Intro",
      "Steel Talk",
      "Quarter Pound",
      "No Apology",
      "Iron Season",
    ],
    credits: [
      "Executive Production: SUMG Records",
      "Production: Ironlight",
      "Additional Production: NightWire",
      "Mix & Master: SUMG Audio",
    ],
    streaming: {
      spotify: "#",
      appleMusic: "#",
      soundcloud: "#",
    },
  },
];

export const featuredReleaseSlug = "glass-hour";
