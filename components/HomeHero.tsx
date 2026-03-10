"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroScene from "@/components/HeroScene";

gsap.registerPlugin(useGSAP);

export default function HomeHero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        return;
      }

      gsap.fromTo(
        ".hero-reveal",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
        },
      );

      const sceneLayer = rootRef.current?.querySelector(".hero-scene-layer");
      if (!sceneLayer) {
        return;
      }

      const xTo = gsap.quickTo(sceneLayer, "x", { duration: 0.8, ease: "power3.out" });
      const yTo = gsap.quickTo(sceneLayer, "y", { duration: 0.8, ease: "power3.out" });

      const onMove = (event: MouseEvent) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 18;
        const y = (event.clientY / window.innerHeight - 0.5) * 14;
        xTo(x);
        yTo(y);
      };

      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-[#0f1012] text-white min-h-[86svh] flex items-center"
    >
      <div className="hero-scene-layer absolute inset-0">
        <HeroScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/80" />

      <div className="relative max-w-7xl mx-auto w-full px-6 md:px-10 py-24 md:py-32">
        <p className="hero-reveal text-[10px] tracking-[0.42em] uppercase text-neutral-500">
          Solounity Music Group
        </p>
        <h1 className="hero-reveal mt-7 font-display italic text-[clamp(3rem,9vw,7rem)] leading-[0.92] tracking-tight">
          SUMG Records
        </h1>
        <p className="hero-reveal mt-7 max-w-md text-sm md:text-base leading-relaxed text-neutral-300">
          A record label and creative ecosystem shaping music, visuals, and
          fashion into one living universe.
        </p>

        <div className="hero-reveal mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/releases"
            className="inline-flex items-center text-[11px] tracking-[0.22em] uppercase border border-neutral-600 px-7 py-3.5 hover:border-white transition-colors duration-200"
          >
            Featured Release
          </Link>
          <Link
            href="/artists"
            className="inline-flex items-center text-[11px] tracking-[0.22em] uppercase text-neutral-300 hover:text-white transition-colors duration-200"
          >
            Explore roster →
          </Link>
        </div>
      </div>
    </section>
  );
}
