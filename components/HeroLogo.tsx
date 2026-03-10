"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function HeroLogo() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
      timeline
        .fromTo(
          "[data-logo-reveal]",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.95 },
        )
        .fromTo(
          "[data-subtitle-reveal]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.48",
        )
        .fromTo(
          "[data-cta-reveal]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.72 },
          "-=0.38",
        );
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="relative z-10 min-h-[86svh] flex flex-col items-center justify-center px-6 text-center"
    >
      <p data-logo-reveal className="text-[10px] tracking-[0.46em] uppercase text-neutral-500">
        Solounity Music Group
      </p>
      <h1
        data-logo-reveal
        className="mt-6 font-display italic text-[clamp(3.1rem,9vw,7.25rem)] leading-[0.9] tracking-tight text-white"
      >
        SUMG Records
      </h1>
      <div data-logo-reveal className="mt-6 w-10 border-t border-neutral-600/80" />
      <p
        data-subtitle-reveal
        className="mt-6 max-w-lg text-sm md:text-base text-neutral-300 leading-relaxed"
      >
        Midnight studio energy, artist-first releases, and a continuously evolving label ecosystem.
      </p>

      <div data-cta-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/artists"
          className="inline-flex items-center text-[11px] tracking-[0.22em] uppercase border border-neutral-600 px-7 py-3.5 text-neutral-200 hover:border-white hover:text-white transition-colors duration-200"
        >
          Artists
        </Link>
        <Link
          href="/releases"
          className="inline-flex items-center text-[11px] tracking-[0.22em] uppercase border border-neutral-700/70 px-7 py-3.5 text-neutral-300 hover:border-neutral-200 hover:text-white transition-colors duration-200"
        >
          Releases
        </Link>
      </div>
    </div>
  );
}
