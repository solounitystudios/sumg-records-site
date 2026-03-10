import PageIntro from "@/components/PageIntro";
import ReleaseCard from "@/components/ReleaseCard";
import SectionHeading from "@/components/SectionHeading";
import { releases } from "@/data";
import { formatDate } from "@/lib/format";

export default function ReleasesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Catalogue"
        title="Releases"
        description="Singles, projects, and campaigns from the SUMG roster."
      />
      <section className="bg-[#f7f7f5] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading eyebrow="Discography" title={`${releases.length} Releases`} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {releases.map((release) => (
              <ReleaseCard
                key={release.slug}
                title={release.title}
                artist={release.artist}
                date={formatDate(release.releaseDate)}
                description={release.shortDescription}
                image={release.cover}
                href={`/releases/${release.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
