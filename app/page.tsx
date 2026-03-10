import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import ArtistCard from "@/components/ArtistCard";
import ProducerCard from "@/components/ProducerCard";
import BrandCard from "@/components/BrandCard";
import SectionHeading from "@/components/SectionHeading";
import ReleaseCard from "@/components/ReleaseCard";
import NewsCard from "@/components/NewsCard";
import NewsletterBlock from "@/components/NewsletterBlock";
import Reveal from "@/components/Reveal";
import MediaTile from "@/components/MediaTile";
import {
  artists,
  brands,
  events,
  featuredArtistSlugs,
  featuredReleaseSlug,
  merchItems,
  news,
  producers,
  releases,
  videos,
} from "@/data";
import { formatDate } from "@/lib/format";
import { toDisplayLabel } from "@/lib/text";

export default function HomePage() {
  const featuredArtists = artists.filter((artist) =>
    featuredArtistSlugs.includes(artist.slug),
  );
  const featuredRelease = releases.find((release) => release.slug === featuredReleaseSlug);
  const featuredVideo = videos[0];
  const latestNews = news.slice(0, 3);
  const merchPreview = merchItems.slice(0, 4);
  const upcomingEvents = events.slice(0, 2);

  return (
    <>
      <HomeHero />

      {featuredRelease && (
        <section className="bg-[#f4f4f1] py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <Reveal>
              <SectionHeading
                eyebrow="Featured release"
                title={featuredRelease.title}
                description={featuredRelease.shortDescription}
                linkHref={`/releases/${featuredRelease.slug}`}
                linkLabel="Open release"
              />
            </Reveal>
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

      <section className="bg-[#f7f7f5] py-24 md:py-32 border-t border-neutral-800/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Roster"
              title="Featured Artists"
              linkHref="/artists"
              linkLabel="All Artists"
            />
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
            {featuredArtists.map((artist, index) => (
              <Reveal key={artist.slug} delay={index * 0.05}>
                <ArtistCard
                  name={artist.name}
                  descriptor={artist.shortDescription}
                  image={artist.image}
                  href={`/artists/${artist.slug}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 border-t border-neutral-800/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Production"
              title="Producers"
              linkHref="/producers"
              linkLabel="All Producers"
            />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {producers.map((producer, index) => (
              <Reveal key={producer.slug} delay={index * 0.08}>
                <ProducerCard
                  name={producer.name}
                  descriptor={producer.shortDescription}
                  image={producer.image}
                  index={index + 1}
                  href={`/producers/${producer.slug}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101113] text-white py-24 md:py-28 border-t border-black">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-[1.2fr_1fr] gap-12 items-end">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-600 mb-5">
              Latest visual
            </p>
            {featuredVideo ? (
              <>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-tight">
                  {featuredVideo.title}
                </h2>
                <p className="mt-4 text-sm text-neutral-400 max-w-xl leading-relaxed">
                  {featuredVideo.description}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-tight">
                  Visual programming in progress
                </h2>
                <p className="mt-4 text-sm text-neutral-400 max-w-xl leading-relaxed">
                  New videos and sessions will be published as releases roll out.
                </p>
              </>
            )}
          </div>
          <Link
            href="/videos"
            className="inline-flex text-[11px] tracking-[0.2em] uppercase border border-neutral-700 px-7 py-4 text-neutral-300 hover:border-white hover:text-white"
          >
            View videos →
          </Link>
        </div>
      </section>

      <section className="bg-[#f7f7f5] py-24 md:py-32 border-t border-neutral-800/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="Affiliated"
            title="Brand Network"
            linkHref="/brands"
            linkLabel="All Brands"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8">
            {brands.slice(0, 3).map((brand, index) => (
              <Reveal key={brand.slug} delay={index * 0.08}>
                <BrandCard
                  name={brand.name}
                  description={brand.shortDescription}
                  image={brand.heroImage}
                  accentColor={brand.theme.colors.accent}
                  href={`/brands/${brand.slug}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 border-t border-neutral-800/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="Merch drop"
            title="SUMG × PersonaWorks"
            description="Previewed pieces from current and upcoming capsule runs."
            linkHref="/merch"
            linkLabel="All merch"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {merchPreview.map((item) => (
              <article key={item.slug} className="group border-t border-neutral-800/20 pt-5">
                <MediaTile
                  src={item.image}
                  alt={item.name}
                  label={item.name}
                  className="aspect-[3/4]"
                  sizes="(max-width: 1024px) 50vw, 24vw"
                />
                <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                  {toDisplayLabel(item.category)}
                </p>
                <h3 className="mt-2 text-lg tracking-tight text-neutral-900">{item.name}</h3>
                <p className="mt-2 text-sm text-neutral-500">{item.shortDescription}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-neutral-700">
                  {item.price} · {item.availability}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0f1012] text-white py-20 md:py-24 border-t border-black">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-10 md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-600 mb-5">
              Universe
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-tight">
              One platform, multiple disciplines.
            </h2>
            <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
              SUMG links artists, producers, fashion labels, and creative direction into a
              unified release ecosystem.
            </p>
          </div>
          <Link
            href="/ecosystem"
            className="inline-flex text-[11px] tracking-[0.2em] uppercase border border-neutral-700 px-7 py-4 text-neutral-300 hover:border-white hover:text-white"
          >
            Explore ecosystem →
          </Link>
        </div>
      </section>

      <section className="bg-[#f7f7f5] py-24 md:py-32 border-t border-neutral-800/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_1fr] gap-12">
          <div>
            <SectionHeading
              eyebrow="Journal"
              title="Latest News"
              linkHref="/news"
              linkLabel="All updates"
            />
            <div className="space-y-2">
              {latestNews.length > 0 ? (
                latestNews.map((item) => (
                  <NewsCard
                    key={item.slug}
                    title={item.title}
                    date={formatDate(item.date)}
                    category={item.category}
                    excerpt={item.excerpt}
                  />
                ))
              ) : (
                <article className="border border-neutral-800/15 p-7 bg-white">
                  <p className="text-sm text-neutral-600">No journal entries have been posted yet.</p>
                </article>
              )}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Programming"
              title="Events"
              description="Live showcases, listening sessions, and ecosystem activations."
              linkHref="/events"
              linkLabel="View events"
            />
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <article
                    key={event.slug}
                    className="border-t border-neutral-800/20 pt-5 pb-6"
                  >
                    <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-400">
                      {formatDate(event.date)} · {event.location}
                    </p>
                    <h3 className="mt-3 text-xl tracking-tight">{event.title}</h3>
                    <p className="mt-2 text-sm text-neutral-500">{event.description}</p>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-neutral-700">
                      {toDisplayLabel(event.ticketStatus)}
                    </p>
                  </article>
                ))
              ) : (
                <article className="border border-neutral-800/15 p-7 bg-white">
                  <p className="text-sm text-neutral-600">Programming will be announced soon.</p>
                </article>
              )}
            </div>
          </div>
        </div>
      </section>

      <NewsletterBlock />
    </>
  );
}
