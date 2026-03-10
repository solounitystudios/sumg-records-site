"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MediaTile from "@/components/MediaTile";
import type { Brand } from "@/data/types";

gsap.registerPlugin(useGSAP);

interface BrandHeroProps {
  brand: Brand;
}

export default function BrandHero({ brand }: BrandHeroProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const heroAnimation = brand.theme.hero.animation;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo("[data-brand-hero-media]", { opacity: 0.55, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1.2 })
        .fromTo(
          "[data-brand-hero-copy]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.1 },
          "-=0.72",
        )
        .fromTo(
          "[data-brand-overlay]",
          { opacity: 0.35 },
          { opacity: 0.18, duration: 1.1 },
          "-=0.85",
        );

      const overlay = rootRef.current?.querySelector<HTMLElement>("[data-brand-overlay]");
      if (!overlay) {
        return;
      }

      if (heroAnimation === "smoke-reveal") {
        gsap.to(overlay, { backgroundPositionX: "120%", duration: 12, ease: "none", repeat: -1, yoyo: true });
      } else if (heroAnimation === "lunar-haze") {
        gsap.to(overlay, { opacity: 0.28, duration: 5.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      } else if (heroAnimation === "grid-shift") {
        gsap.to(overlay, { backgroundPosition: "30px 20px", duration: 8.5, ease: "sine.inOut", repeat: -1, yoyo: true });
      } else if (heroAnimation === "gritty-texture") {
        gsap.to(overlay, { backgroundPositionX: "18px", duration: 3.2, repeat: -1, yoyo: true, ease: "steps(6)" });
      } else if (heroAnimation === "tidal-drift") {
        gsap.to(overlay, { backgroundPositionX: "90%", duration: 10.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }
    },
    { scope: rootRef, dependencies: [heroAnimation] },
  );

  const overlayStyle: Record<Brand["theme"]["hero"]["animation"], string> = {
    "smoke-reveal":
      "bg-[radial-gradient(circle_at_20%_30%,rgba(162,170,183,0.34),transparent_40%),radial-gradient(circle_at_70%_65%,rgba(96,104,117,0.28),transparent_48%)] bg-[length:180%_140%]",
    "lunar-haze":
      "bg-[radial-gradient(circle_at_30%_25%,rgba(151,126,182,0.34),transparent_42%),radial-gradient(circle_at_70%_70%,rgba(120,95,154,0.24),transparent_45%)] bg-[length:170%_130%]",
    "grid-shift":
      "bg-[linear-gradient(rgba(78,84,92,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(78,84,92,0.22)_1px,transparent_1px)] bg-[size:24px_24px]",
    "gritty-texture":
      "bg-[repeating-linear-gradient(45deg,rgba(147,116,96,0.14)_0_2px,transparent_2px_6px)] bg-[size:22px_22px]",
    "tidal-drift":
      "bg-[radial-gradient(circle_at_24%_40%,rgba(128,150,167,0.3),transparent_45%),radial-gradient(circle_at_72%_58%,rgba(95,119,139,0.24),transparent_44%)] bg-[length:185%_140%]",
  };

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden text-white py-20 md:py-24"
      style={{ backgroundColor: brand.theme.colors.background, color: brand.theme.colors.text }}
    >
      <div className="absolute inset-0 opacity-70">
        <div data-brand-hero-media className="absolute inset-0">
          <MediaTile
            src={brand.heroImage}
            alt={`${brand.name} hero`}
            label={brand.name}
            className="h-full w-full"
            priority
            sizes="100vw"
          />
        </div>
        <div
          data-brand-overlay
          className={`absolute inset-0 ${overlayStyle[heroAnimation]}`}
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <p
          data-brand-hero-copy
          className={`text-[10px] ${brand.theme.typography.accent} text-white/60`}
        >
          SUMG Brand System
        </p>
        <h1
          data-brand-hero-copy
          className={`mt-6 text-[clamp(2.8rem,8vw,5.6rem)] leading-[0.92] tracking-tight ${brand.theme.typography.display}`}
        >
          {brand.name}
        </h1>
        <p
          data-brand-hero-copy
          className={`mt-6 max-w-xl text-sm md:text-base leading-relaxed ${brand.theme.typography.body}`}
        >
          {brand.shortDescription}
        </p>
      </div>
    </section>
  );
}
