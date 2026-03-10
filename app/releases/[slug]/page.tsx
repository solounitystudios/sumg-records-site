import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LinkCluster from "@/components/LinkCluster";
import MediaTile from "@/components/MediaTile";
import PageIntro from "@/components/PageIntro";
import { releases } from "@/data";
import { formatDate } from "@/lib/format";

interface ReleasePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return releases.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }: ReleasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const release = releases.find((entry) => entry.slug === slug);
  if (!release) {
    return {};
  }

  return {
    title: `${release.title} — SUMG Releases`,
    description: release.shortDescription,
  };
}

export default async function ReleaseDetailPage({ params }: ReleasePageProps) {
  const { slug } = await params;
  const release = releases.find((entry) => entry.slug === slug);

  if (!release) {
    notFound();
  }

  return (
    <>
      <PageIntro
        eyebrow="Release detail"
        title={release.title}
        description={`${release.artist} · ${formatDate(release.releaseDate)}`}
      />

      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-[360px_1fr] gap-10">
          <MediaTile
            src={release.cover}
            alt={`${release.title} cover`}
            label={release.title}
            className="aspect-square"
            priority
            sizes="(max-width: 1024px) 100vw, 360px"
          />
          <div>
            <p className="text-sm text-neutral-600 leading-relaxed">{release.shortDescription}</p>
            <div className="mt-8 grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-400 mb-3">
                  Tracklist
                </p>
                <ol className="space-y-2">
                  {release.tracklist.map((track, index) => (
                    <li key={track} className="text-sm text-neutral-700">
                      {(index + 1).toString().padStart(2, "0")}. {track}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-400 mb-3">
                  Credits
                </p>
                <ul className="space-y-2">
                  {release.credits.map((credit) => (
                    <li key={credit} className="text-sm text-neutral-700">
                      {credit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <LinkCluster title="Streaming" links={release.streaming} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 border-t border-neutral-800/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Link
            href="/releases"
            className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900"
          >
            ← Back to releases
          </Link>
        </div>
      </section>
    </>
  );
}
