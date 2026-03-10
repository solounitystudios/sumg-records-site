import type { Brand } from "./types";

export const brands: Brand[] = [
  {
    name: "Woronoff",
    slug: "woronoff",
    heroImage: "/brand-assets/woronoff.png",
    shortDescription:
      "Dark-luxury tailoring with disciplined structure and cinematic restraint.",
    fullDescription:
      "Woronoff operates at the edge of formalwear and urban armor. Sharp linework, controlled drape, and tonal layering define a wardrobe designed for after-hours movement and editorial tension.",
    visualDirection:
      "Shadow-led portraiture, reflective hardware, architectural silhouettes, low-angle studio light.",
    aestheticDirection:
      "Dark luxury / black, charcoal, silver / serif with modern sans discipline.",
    theme: {
      colors: {
        background: "#0d0e10",
        surface: "#17191d",
        text: "#e4e7eb",
        accent: "#9ea6b3",
        muted: "#7a818d",
      },
      typography: {
        display: "font-display italic",
        body: "font-sans",
        accent: "tracking-[0.24em] uppercase",
      },
      hero: { animation: "smoke-reveal" },
    },
    collection: [
      {
        name: "Nocturne Long Coat",
        category: "outerwear",
        shortDescription: "Structured wool shell with hidden closure and silver hardware.",
        image: "/brand-assets/woronoff-nocturne-coat.jpg",
      },
      {
        name: "Frame Trousers",
        category: "tailoring",
        shortDescription: "Tapered pleat trouser in dense charcoal twill.",
        image: "/brand-assets/woronoff-frame-trousers.jpg",
      },
      {
        name: "Axis Shirt",
        category: "core",
        shortDescription: "Crisp monochrome shirt with softened collar geometry.",
        image: "/brand-assets/woronoff-axis-shirt.jpg",
      },
    ],
    campaignImagery: [
      {
        image: "/brand-assets/woronoff-campaign-01.jpg",
        caption: "Campaign 01 — night architecture, reflective tailoring.",
      },
      {
        image: "/brand-assets/woronoff-campaign-02.jpg",
        caption: "Campaign 02 — silhouette studies in charcoal and silver.",
      },
    ],
  },
  {
    name: "Moon Spell",
    slug: "moon-spell",
    heroImage: "/brand-assets/moon-spell.png",
    shortDescription:
      "Romantic darkwear balancing ritual softness with nocturnal edge.",
    fullDescription:
      "Moon Spell explores ceremonial layering, draped tailoring, and moonlit palettes. The label is built around emotional silhouette: romantic forms grounded by disciplined construction.",
    visualDirection:
      "Lunar gradients, veiled texture, soft specular highlights, cathedral-scale framing.",
    aestheticDirection:
      "Black, plum, violet / romantic serif identity / atmospheric portrait styling.",
    theme: {
      colors: {
        background: "#110d18",
        surface: "#1b1426",
        text: "#ebe6f2",
        accent: "#8d6ca8",
        muted: "#9683a8",
      },
      typography: {
        display: "font-display italic",
        body: "font-sans",
        accent: "tracking-[0.24em] uppercase",
      },
      hero: { animation: "lunar-haze" },
    },
    collection: [
      {
        name: "Violet Ritual Dress",
        category: "women's",
        shortDescription: "Bias-cut dress with layered mesh sleeve and tonal trim.",
        image: "/brand-assets/moon-spell-ritual-dress.jpg",
      },
      {
        name: "Midnight Trench",
        category: "outerwear",
        shortDescription: "Fluid trench in matte black shell with hidden belt geometry.",
        image: "/brand-assets/moon-spell-midnight-trench.jpg",
      },
      {
        name: "Eclipse Corset Top",
        category: "core",
        shortDescription: "Structured top with softened edges and lunar stitch mapping.",
        image: "/brand-assets/moon-spell-eclipse-top.jpg",
      },
    ],
    campaignImagery: [
      {
        image: "/brand-assets/moon-spell-campaign-01.jpg",
        caption: "Campaign 01 — lunar haze and ceremonial layering.",
      },
      {
        image: "/brand-assets/moon-spell-campaign-02.jpg",
        caption: "Campaign 02 — plum gradients against deep shadow fields.",
      },
    ],
  },
  {
    name: "Unity Standard",
    slug: "unity-standard",
    heroImage: "/brand-assets/unity-standard.png",
    shortDescription:
      "Utility uniforms shaped by restraint, material honesty, and clean proportion.",
    fullDescription:
      "Unity Standard develops long-cycle essentials: durable fabrics, geometric cuts, and minimal branding. Built for daily wear, each piece is designed to hold form under repetition.",
    visualDirection:
      "Grid-based compositions, neutral daylight, functional silhouettes, technical detail close-ups.",
    aestheticDirection:
      "Stone, sand, graphite / geometric sans language / stripped-back utility styling.",
    theme: {
      colors: {
        background: "#efeee8",
        surface: "#ddd8cd",
        text: "#2a2c2f",
        accent: "#60656d",
        muted: "#7d8078",
      },
      typography: {
        display: "font-sans",
        body: "font-sans",
        accent: "tracking-[0.24em] uppercase",
      },
      hero: { animation: "grid-shift" },
    },
    collection: [
      {
        name: "Frame Utility Jacket",
        category: "outerwear",
        shortDescription: "Structured jacket in stone canvas with modular pocket set.",
        image: "/brand-assets/unity-standard-frame-jacket.jpg",
      },
      {
        name: "Core Straight Pant",
        category: "bottoms",
        shortDescription: "Graphite cotton twill with articulated seam line.",
        image: "/brand-assets/unity-standard-core-pant.jpg",
      },
      {
        name: "System Tee 02",
        category: "core",
        shortDescription: "Heavyweight sand jersey with tonal micro-mark.",
        image: "/brand-assets/unity-standard-system-tee.jpg",
      },
    ],
    campaignImagery: [
      {
        image: "/brand-assets/unity-standard-campaign-01.jpg",
        caption: "Campaign 01 — grid studies and material discipline.",
      },
      {
        image: "/brand-assets/unity-standard-campaign-02.jpg",
        caption: "Campaign 02 — neutral utility in architectural daylight.",
      },
    ],
  },
  {
    name: "Concrete Borough",
    slug: "concrete-borough",
    heroImage: "/brand-assets/concrete-borough.png",
    shortDescription:
      "Industrial uniforms built for impact, weather, and urban friction.",
    fullDescription:
      "Concrete Borough is engineered around heavy fabric systems, reinforced construction, and anti-trend silhouettes. The brand favors functional mass over decoration and improves with wear.",
    visualDirection:
      "Asphalt surfaces, rust textures, hard flash contrast, dense street framing.",
    aestheticDirection:
      "Asphalt, concrete, rust / industrial grotesk voice / heavy utility silhouettes.",
    theme: {
      colors: {
        background: "#171717",
        surface: "#222225",
        text: "#e2dfdb",
        accent: "#a46043",
        muted: "#8f8c87",
      },
      typography: {
        display: "font-sans",
        body: "font-sans",
        accent: "tracking-[0.24em] uppercase",
      },
      hero: { animation: "gritty-texture" },
    },
    collection: [
      {
        name: "Borough Work Hoodie",
        category: "hoodies",
        shortDescription: "Dense fleece hoodie with reinforced shoulder seam.",
        image: "/brand-assets/concrete-borough-work-hoodie.jpg",
      },
      {
        name: "Rustline Cargo Pant",
        category: "bottoms",
        shortDescription: "Utility cargo with abrasion-ready panel construction.",
        image: "/brand-assets/concrete-borough-rustline-cargo.jpg",
      },
      {
        name: "Block Utility Vest",
        category: "outerwear",
        shortDescription: "Layering vest with concrete-tone webbing and matte hardware.",
        image: "/brand-assets/concrete-borough-block-vest.jpg",
      },
    ],
    campaignImagery: [
      {
        image: "/brand-assets/concrete-borough-campaign-01.jpg",
        caption: "Campaign 01 — grit, flash, and utilitarian mass.",
      },
      {
        image: "/brand-assets/concrete-borough-campaign-02.jpg",
        caption: "Campaign 02 — rust-toned accents in hard urban terrain.",
      },
    ],
  },
  {
    name: "Salt Current",
    slug: "salt-current",
    heroImage: "/brand-assets/salt-current.png",
    shortDescription:
      "Coastal formal minimalism with washed texture and open silhouette rhythm.",
    fullDescription:
      "Salt Current brings atmospheric balance into the SUMG ecosystem. Soft tailoring, sea-worn fabrics, and elegant proportion create garments designed for movement and quiet longevity.",
    visualDirection:
      "Sea-gray palettes, horizon framing, wind-driven drape, soft directional light.",
    aestheticDirection:
      "Navy, slate, sea gray / airy serif-sans blend / understated coastal tailoring.",
    theme: {
      colors: {
        background: "#111a22",
        surface: "#1b2833",
        text: "#e5edf4",
        accent: "#6d8497",
        muted: "#8ca1b1",
      },
      typography: {
        display: "font-display",
        body: "font-sans",
        accent: "tracking-[0.24em] uppercase",
      },
      hero: { animation: "tidal-drift" },
    },
    collection: [
      {
        name: "Current Over-Shirt",
        category: "outerwear",
        shortDescription: "Lightweight overshirt in washed navy with soft structure.",
        image: "/brand-assets/salt-current-over-shirt.jpg",
      },
      {
        name: "Tide Pleat Trouser",
        category: "bottoms",
        shortDescription: "Relaxed pleat trouser in sea-gray brushed cotton blend.",
        image: "/brand-assets/salt-current-tide-trouser.jpg",
      },
      {
        name: "Harbor Knit",
        category: "core",
        shortDescription: "Open-gauge knit with slate tonal rib detailing.",
        image: "/brand-assets/salt-current-harbor-knit.jpg",
      },
    ],
    campaignImagery: [
      {
        image: "/brand-assets/salt-current-campaign-01.jpg",
        caption: "Campaign 01 — horizon framing and tidal color drift.",
      },
      {
        image: "/brand-assets/salt-current-campaign-02.jpg",
        caption: "Campaign 02 — soft tailoring under coastal overcast.",
      },
    ],
  },
];
