import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LinkCluster from "@/components/LinkCluster";
import MediaTile from "@/components/MediaTile";
import PageIntro from "@/components/PageIntro";
import ReleaseCard from "@/components/ReleaseCard";
import { artists, releases } from "@/data";
import { formatDate } from "@/lib/format";
import { toSpotifyArtistEmbedUrl } from "@/lib/spotify";

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return artists.map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({ params }: ArtistPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = artists.find((entry) => entry.slug === slug);
  if (!artist) {
    return {};
  }

  return {
    title: `${artist.name} — SUMG Records`,
    description: artist.shortDescription,
  };
}

export default async function ArtistDetailPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = artists.find((entry) => entry.slug === slug);

  if (!artist) {
    notFound();
  }

  const featuredRelease = releases.find(
    (release) => release.slug === artist.featuredReleaseSlug,
  );
  const socialEntries = Object.values(artist.socials).filter(Boolean);
  const streamingEntries = Object.values(artist.streaming).filter(
    (value) => Boolean(value && value !== "#"),
  );
  const hasLinkClusters = socialEntries.length > 0 || streamingEntries.length > 0;
  const spotifyUrl = artist.streaming.spotify;
  const spotifyEmbedUrl = toSpotifyArtistEmbedUrl(spotifyUrl);

  return (
    <>
      <PageIntro
        eyebrow="Artist profile"
        title={artist.name}
        description={artist.shortDescription}
      />

      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
          <MediaTile
            src={artist.image}
            alt={`${artist.name} hero`}
            label={artist.name}
            className="aspect-[4/5]"
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
              {artist.vibe}
            </p>
            {artist.location && (
              <p className="mt-2 text-sm text-neutral-500">{artist.location}</p>
            )}
            <p className="mt-6 text-base text-neutral-700 leading-relaxed">{artist.fullBio}</p>

            {hasLinkClusters && (
              <div className="mt-10 grid sm:grid-cols-2 gap-6">
                <LinkCluster title="Social" links={artist.socials} />
                <LinkCluster title="Streaming" links={artist.streaming} />
              </div>
            )}

            {spotifyUrl && (
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-8 inline-flex items-center text-[11px] uppercase tracking-[0.2em] border border-neutral-800/25 px-5 py-3 hover:border-neutral-900 transition-colors duration-200"
              >
                Listen on Spotify
              </a>
            )}
          </div>
        </div>
      </section>

      {spotifyEmbedUrl && (
        <section className="bg-white py-16 md:py-20 border-t border-neutral-800/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-400 mb-4">
              Spotify
            </p>
            <div className="max-w-2xl border border-neutral-800/15 bg-neutral-50">
              <iframe
                src={spotifyEmbedUrl}
                title={`${artist.name} Spotify profile`}
                className="w-full h-[352px]"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </div>
          </div>
        </section>
      )}

      {featuredRelease && (
        <section className="bg-white py-20 md:py-24 border-t border-neutral-800/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-5">
              Featured release
            </p>
            <ReleaseCard
              title={featuredRelease.title}
              artist={featuredRelease.artist}
              date={formatDate(featuredRelease.releaseDate)}
              description={featuredRelease.shortDescription}
              image={featuredRelease.cover}
              href={`/releases/${featuredRelease.slug}`}
            />
          </div>
        </section>
      )}

      <section className="bg-[#f7f7f5] py-16 border-t border-neutral-800/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Link
            href="/artists"
            className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900"
          >
            ← Back to artists
          </Link>
        </div>
      </section>
    </>
  );
}
