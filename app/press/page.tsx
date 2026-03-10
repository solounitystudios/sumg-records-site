import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import SectionHeading from "@/components/SectionHeading";
import { artists } from "@/data";

export default function PressPage() {
  return (
    <>
      <PageIntro
        eyebrow="Media"
        title="Press"
        description="Brand assets, artist bios, and editorial usage guidance."
      />
      <section className="bg-[#f7f7f5] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-14">
          <div>
            <SectionHeading eyebrow="Media Kit" title="Downloads" />
            <div className="space-y-4">
              {[
                "SUMG logo pack — /press-assets/logos (placeholder)",
                "Brand one-sheet — /press-assets/brand-sheet (placeholder)",
                "Release stills — /press-assets/release-stills (placeholder)",
              ].map((item) => (
                <div key={item} className="border border-neutral-800/20 p-4 bg-white">
                  <p className="text-sm text-neutral-700">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-neutral-500 leading-relaxed">
              Editorial usage: keep artwork unaltered, preserve clear space around logos, and
              credit SUMG Records in captions or metadata.
            </p>
          </div>

          <div>
            <SectionHeading eyebrow="Artist Bios" title="Quick references" />
            <div className="space-y-5">
              {artists.map((artist) => (
                <article key={artist.slug} className="border-t border-neutral-800/20 pt-5">
                  <h2 className="text-lg text-neutral-900 tracking-tight">{artist.name}</h2>
                  <p className="mt-2 text-sm text-neutral-500">{artist.shortDescription}</p>
                  <Link
                    href={`/artists/${artist.slug}`}
                    className="mt-3 inline-flex text-[11px] uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900"
                  >
                    Full bio →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
