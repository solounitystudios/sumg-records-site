import ArtistCard from "@/components/ArtistCard";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { artists } from "@/data";

export default function ArtistsPage() {
  return (
    <>
      <PageIntro
        eyebrow="SUMG Records"
        title="Artists"
        description="Seven distinct voices inside a single label universe."
      />

      <section className="bg-[#f7f7f5] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading eyebrow="Roster" title={`${artists.length} Artists`} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
            {artists.map((artist, index) => (
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
    </>
  );
}
