import ArtistGrid from "@/components/ArtistGrid";
import PageIntro from "@/components/PageIntro";
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
          <ArtistGrid artists={artists} />
        </div>
      </section>
    </>
  );
}
