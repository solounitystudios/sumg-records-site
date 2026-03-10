import PageIntro from "@/components/PageIntro";
import SectionHeading from "@/components/SectionHeading";
import { events } from "@/data";
import { formatDate } from "@/lib/format";
import { toDisplayLabel } from "@/lib/text";

export default function EventsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Programming"
        title="Events"
        description="Showcases, performances, and ecosystem activations."
      />
      <section className="bg-[#f7f7f5] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <SectionHeading eyebrow="Calendar" title="Upcoming" />
          {events.length > 0 ? (
            <div className="space-y-6">
              {events.map((event) => (
                <article
                  key={event.slug}
                  className="border-t border-neutral-800/20 pt-6 pb-8 grid md:grid-cols-[220px_1fr_auto] gap-6 items-start"
                >
                  <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-400">
                    {formatDate(event.date)}
                  </p>
                  <div>
                    <h2 className="text-2xl tracking-tight text-neutral-900">{event.title}</h2>
                    <p className="mt-2 text-sm text-neutral-500">{event.location}</p>
                    <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-700 border border-neutral-800/20 px-3 py-2">
                    {toDisplayLabel(event.ticketStatus)}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-neutral-800/15 p-8 bg-white">
              <p className="text-xl font-light tracking-tight text-neutral-900">
                Programming will be announced soon.
              </p>
              <p className="mt-3 text-sm text-neutral-500">
                Follow SUMG news for showcases, sessions, and release events.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
