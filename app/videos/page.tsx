import PageIntro from "@/components/PageIntro";
import MediaTile from "@/components/MediaTile";
import SectionHeading from "@/components/SectionHeading";
import { videos } from "@/data";
import { formatDate } from "@/lib/format";

export default function VideosPage() {
  return (
    <>
      <PageIntro
        eyebrow="Visual Archive"
        title="Videos"
        description="Music videos, live sessions, and teaser visuals from the SUMG universe."
      />
      <section className="bg-[#f7f7f5] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading eyebrow="Latest visuals" title={`${videos.length} Entries`} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <article key={video.slug} className="border-t border-neutral-800/20 pt-5">
                <MediaTile
                  src={video.thumbnail}
                  alt={video.title}
                  label={video.title}
                  className="aspect-video"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <p className="mt-4 text-[10px] uppercase tracking-[0.23em] text-neutral-400">
                  {video.type} · {formatDate(video.releaseDate)}
                </p>
                <h2 className="mt-3 text-xl font-light tracking-tight text-neutral-900">
                  {video.title}
                </h2>
                <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
                  {video.description}
                </p>
                {video.embedUrl && (
                  <div className="mt-5 aspect-video border border-neutral-800/20 bg-black">
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      className="w-full h-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
