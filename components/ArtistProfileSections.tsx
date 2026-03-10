"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MediaTile from "@/components/MediaTile";
import type { Artist, Release, VideoItem } from "@/data/types";
import { formatDate } from "@/lib/format";

gsap.registerPlugin(ScrollTrigger);

interface ArtistProfileSectionsProps {
  releases: Release[];
  videos: VideoItem[];
  relatedArtists: Artist[];
}

export default function ArtistProfileSections({
  releases,
  videos,
  relatedArtists,
}: ArtistProfileSectionsProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const releaseCards = gsap.utils.toArray<HTMLElement>("[data-release-card]");
      if (releaseCards.length > 0) {
        gsap.fromTo(
          releaseCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: releaseCards[0].closest("[data-release-section]"),
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      const videoSection = rootRef.current?.querySelector("[data-video-section]");
      if (videoSection) {
        gsap.fromTo(
          videoSection,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: videoSection,
              start: "top 84%",
              once: true,
            },
          },
        );
      }
    },
    { scope: rootRef, dependencies: [releases.length, videos.length, relatedArtists.length] },
  );

  return (
    <div ref={rootRef}>
      {releases.length > 0 && (
        <section
          data-release-section
          className="bg-white py-20 md:py-24 border-t border-neutral-800/10"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-6">
              Releases
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {releases.map((release) => {
                const spotify = release.streaming.spotify;
                const apple = release.streaming.apple ?? release.streaming.appleMusic;

                return (
                  <article key={release.slug} data-release-card className="group">
                    <MediaTile
                      src={release.cover}
                      alt={`${release.title} cover`}
                      label={release.title}
                      className="aspect-square"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="pt-4 pb-6 border-b border-neutral-800/20 group-hover:border-neutral-900 transition-colors duration-300">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                        {formatDate(release.releaseDate)}
                      </p>
                      <h3 className="mt-3 text-2xl font-light tracking-tight text-neutral-900">
                        {release.title}
                      </h3>
                      {(spotify || apple) && (
                        <div className="mt-5 flex flex-wrap gap-3">
                          {spotify && (
                            <a
                              href={spotify}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="text-[10px] uppercase tracking-[0.2em] border border-neutral-800/20 px-3 py-2 hover:border-neutral-900 transition-colors duration-200"
                            >
                              Spotify
                            </a>
                          )}
                          {apple && (
                            <a
                              href={apple}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="text-[10px] uppercase tracking-[0.2em] border border-neutral-800/20 px-3 py-2 hover:border-neutral-900 transition-colors duration-200"
                            >
                              Apple Music
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {videos.length > 0 && (
        <section data-video-section className="bg-[#f7f7f5] py-20 md:py-24 border-t border-neutral-800/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-6">
              Videos
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {videos.map((video) => (
                <article key={video.slug} className="border-t border-neutral-800/20 pt-5">
                  <div className="aspect-video border border-neutral-800/20 bg-black">
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      className="w-full h-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="mt-4 text-[10px] uppercase tracking-[0.23em] text-neutral-400">
                    {video.type} · {formatDate(video.releaseDate)}
                  </p>
                  <h3 className="mt-2 text-xl font-light tracking-tight text-neutral-900">
                    {video.title}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedArtists.length > 0 && (
        <section className="bg-white py-20 md:py-24 border-t border-neutral-800/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-6">
              Related artists
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArtists.map((relatedArtist) => (
                <Link key={relatedArtist.slug} href={`/artists/${relatedArtist.slug}`} className="group">
                  <MediaTile
                    src={relatedArtist.image}
                    alt={relatedArtist.name}
                    label={relatedArtist.name}
                    className="aspect-[4/5]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="pt-4 pb-5 border-b border-neutral-800/20 group-hover:border-neutral-900 transition-colors duration-300">
                    <h3 className="text-[11px] uppercase tracking-[0.22em] text-neutral-900">
                      {relatedArtist.name}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-500 line-clamp-2">
                      {relatedArtist.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
