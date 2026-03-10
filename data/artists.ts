import type { Artist } from "./types";

export const artists: Artist[] = [
  {
    name: "Zyson",
    slug: "zyson",
    image: "/artists/zyson.png",
    shortDescription:
      "Cinematic rap balancing introspective lyricism with atmospheric weight.",
    fullBio:
      "Zyson writes like a diarist and performs like a director. His records move through memory, pressure, and self-reconstruction over widescreen production built on low light and heavy space.",
    vibe: "Cinematic rap / introspective lyricism / atmospheric production",
    location: "Los Angeles, CA",
    featuredReleaseSlug: "glass-hour",
    socials: {
      instagram:
        "https://www.instagram.com/zysonmusic?igsh=NnN0bXA0ZzhjZnhn&utm_source=qr",
    },
    streaming: {},
  },
  {
    name: "Jayno",
    slug: "jayno",
    image: "/artists/jayno.png",
    shortDescription:
      "Genre-fluid writing across soul, hip-hop, and electronic textures.",
    fullBio:
      "Jayno treats genre as a material, not a boundary. Warm harmonies, clipped drums, and synthetic undertones create records that can sit in a club, a late-night drive, or a quiet room without losing identity.",
    vibe: "Genre-fluid / soul and hip-hop roots / electronic detail",
    location: "Brooklyn, NY",
    featuredReleaseSlug: "afterline",
    socials: {
      facebook: "https://www.facebook.com/profile.php?id=100080194834019",
      instagram:
        "https://www.instagram.com/jayno.wav?igsh=MXRzcm5mdzNwYXJkeg%3D%3D&utm_source=qr",
    },
    streaming: {},
  },
  {
    name: "Lysandra Noir",
    slug: "lysandra",
    image: "/artists/lysandra.png",
    shortDescription:
      "Dark pop built around identity, duality, and art-forward performance.",
    fullBio:
      "Lysandra Noir works in contrast: softness against distortion, confession against control. Her catalog blurs club architecture and theatrical songwriting to build a precise, visual-first pop language.",
    vibe: "Dark pop / identity narratives / visual worldbuilding",
    location: "London, UK",
    featuredReleaseSlug: "double-bind",
    socials: {
      facebook: "https://www.facebook.com/profile.php?id=61552485496591",
      instagram:
        "https://www.instagram.com/lysandra_noir?igsh=MXM0bmVzY2RlaXBmeQ%3D%3D&utm_source=qr",
    },
    streaming: {},
  },
  {
    name: "Marrick",
    slug: "marrick",
    image: "/artists/marrick.png",
    shortDescription:
      "Raw street narratives delivered with sharp rhythm and direct energy.",
    fullBio:
      "Marrick records with urgency. His verses are compact, pointed, and grounded in lived detail, while his cadence cuts through dense percussion without losing clarity or intent.",
    vibe: "Street rap / sharp cadence / direct narrative energy",
    location: "Chicago, IL",
    featuredReleaseSlug: "southline",
    socials: {
      facebook: "https://www.facebook.com/profile.php?id=61588519263961",
    },
    streaming: {},
  },
  {
    name: "Sorin",
    slug: "sorin",
    image: "/artists/sorin.png",
    shortDescription:
      "Introspective songwriting rooted in minimalism and emotional clarity.",
    fullBio:
      "Sorin strips records to what matters: voice, tension, and silence. The writing is precise and patient, focused on emotional accuracy over spectacle, with arrangements that leave room for reflection.",
    vibe: "Minimal songwriting / emotional precision / restrained production",
    location: "Toronto, CA",
    featuredReleaseSlug: "paper-rooms",
    socials: {
      facebook: "https://www.facebook.com/profile.php?id=100093674563775",
    },
    streaming: {
      spotify:
        "https://open.spotify.com/artist/7zMSTt81tfp8KK9MZTCeSP?si=YYZ4Ya_kTAiRis0QTrT-lw",
    },
  },
  {
    name: "Yosin",
    slug: "yosin",
    image: "/artists/yosin.png",
    shortDescription:
      "Experimental sound design and lyrical abstraction with underground edge.",
    fullBio:
      "Yosin bends structure until it reveals something new. Off-grid drums, granular textures, and fragmented phrasing define a body of work that is abstract but never detached from intent.",
    vibe: "Experimental rap / abstract lyric form / underground sound design",
    location: "Berlin, DE",
    featuredReleaseSlug: "friction-language",
    socials: {},
    streaming: {},
  },
  {
    name: "Turkz",
    slug: "turkz",
    image: "/artists/turkz.png",
    shortDescription: "Gritty, direct, heavy-hitting rap built for live pressure.",
    fullBio:
      "Turkz delivers impact records with little ornamentation. Heavy low-end, clipped hooks, and a confrontational vocal approach make his releases immediate, physical, and built for crowded rooms.",
    vibe: "Heavy-hitting rap / gritty delivery / live-first intensity",
    location: "Atlanta, GA",
    featuredReleaseSlug: "iron-season",
    socials: {},
    streaming: {},
  },
];

export const featuredArtistSlugs = ["zyson", "jayno", "lysandra", "turkz"];
