import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtistProfileSections from "@/components/ArtistProfileSections";
import MediaTile from "@/components/MediaTile";
import PageIntro from "@/components/PageIntro";
import { artists, releases, videos } from "@/data";
import { toSpotifyArtistEmbedUrl } from "@/lib/spotify";

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

const followPlatformOrder = [
  ["facebook", "Facebook"],
  ["instagram", "Instagram"],
  ["tiktok", "TikTok"],
  ["youtube", "YouTube"],
] as const;

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

  const artistReleases = releases.filter(
    (release) => release.artistSlug === artist.slug,
  );
  const artistVideos = videos.filter(
    (video) => video.artistSlug === artist.slug && Boolean(video.embedUrl),
  );
  const relatedArtists = artists
    .filter((entry) => entry.slug !== artist.slug)
    .slice(0, 4);
  const spotifyUrl =
    artist.streaming.spotify && artist.streaming.spotify !== "#"
      ? artist.streaming.spotify
      : undefined;
  const appleUrl =
    (artist.streaming.apple && artist.streaming.apple !== "#"
      ? artist.streaming.apple
      : undefined) ??
    (artist.streaming.appleMusic && artist.streaming.appleMusic !== "#"
      ? artist.streaming.appleMusic
      : undefined);
  const followLinks = followPlatformOrder
    .map(([key, label]) => ({ label, href: artist.socials[key] }))
    .filter((entry) => Boolean(entry.href && entry.href !== "#"));
  const personaworksUrl =
    artist.socials.personaworks && artist.socials.personaworks !== "#"
      ? artist.socials.personaworks
      : undefined;
  const hasListenSection = Boolean(spotifyUrl || appleUrl);
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

            {hasListenSection && (
              <div className="mt-10 border-t border-neutral-800/15 pt-6">
                <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-400 mb-4">
                  Listen
                </p>
                <div className="flex flex-wrap gap-3">
                  {spotifyUrl && (
                    <a
                      href={spotifyUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center text-[11px] uppercase tracking-[0.2em] border border-neutral-800/25 px-5 py-3 hover:border-neutral-900 transition-colors duration-200"
                    >
                      Listen on Spotify
                    </a>
                  )}
                  {appleUrl && (
                    <a
                      href={appleUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center text-[11px] uppercase tracking-[0.2em] border border-neutral-800/25 px-5 py-3 hover:border-neutral-900 transition-colors duration-200"
                    >
                      Listen on Apple Music
                    </a>
                  )}
                </div>
              </div>
            )}

            {(followLinks.length > 0 || personaworksUrl) && (
              <div className="mt-8 border-t border-neutral-800/15 pt-6">
                <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-400 mb-4">
                  Follow
                </p>
                <div className="flex flex-wrap gap-3">
                  {followLinks.map((entry) => (
                    <a
                      key={entry.label}
                      href={entry.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center text-[11px] uppercase tracking-[0.2em] border border-neutral-800/25 px-4 py-2.5 hover:border-neutral-900 transition-colors duration-200"
                    >
                      {entry.label}
                    </a>
                  ))}
                  {personaworksUrl && (
                    <a
                      href={personaworksUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center text-[11px] uppercase tracking-[0.2em] border border-neutral-800/25 px-4 py-2.5 hover:border-neutral-900 transition-colors duration-200"
                    >
                      PersonaWorks
                    </a>
                  )}
                </div>
              </div>
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

      <ArtistProfileSections
        releases={artistReleases}
        videos={artistVideos}
        relatedArtists={relatedArtists}
      />

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
