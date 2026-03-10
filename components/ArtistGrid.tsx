"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ArtistCard from "@/components/ArtistCard";
import type { Artist } from "@/data/types";

gsap.registerPlugin(ScrollTrigger);

interface ArtistGridProps {
  artists: Artist[];
  className?: string;
}

export default function ArtistGrid({ artists, className = "" }: ArtistGridProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-artist-grid-card]");
      if (cards.length === 0) {
        return;
      }

      gsap.fromTo(
        cards,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );
    },
    { scope: rootRef, dependencies: [artists.length] },
  );

  return (
    <div
      ref={rootRef}
      className={`grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-7 gap-y-8 md:gap-y-12 ${className}`}
    >
      {artists.map((artist) => (
        <div key={artist.slug} data-artist-grid-card>
          <ArtistCard
            name={artist.name}
            descriptor={artist.shortDescription}
            image={artist.image}
            href={`/artists/${artist.slug}`}
          />
        </div>
      ))}
    </div>
  );
}
