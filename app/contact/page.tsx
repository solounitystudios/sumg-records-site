import PageIntro from "@/components/PageIntro";
import NewsletterBlock from "@/components/NewsletterBlock";
import { labelProfile } from "@/data";
import { toDisplayLabel } from "@/lib/text";

const contacts = [
  { label: "General", email: "hello@sumgrecords.com" },
  { label: "Booking", email: "booking@sumgrecords.com" },
  { label: "Press", email: "press@sumgrecords.com" },
  { label: "Demos", email: "demos@sumgrecords.com" },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Get in touch"
        description="For management, press, performances, and submissions."
      />
      <section className="bg-[#f7f7f5] py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10">
          {contacts.map((item) => (
            <article key={item.label} className="border-t border-neutral-800/20 pt-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                {item.label}
              </p>
              <a
                href={`mailto:${item.email}`}
                className="mt-4 inline-flex text-lg tracking-tight text-neutral-900 hover:opacity-70"
              >
                {item.email}
              </a>
            </article>
          ))}
        </div>
        <div className="max-w-5xl mx-auto px-6 md:px-10 mt-14 border-t border-neutral-800/20 pt-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">Follow SUMG</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {Object.entries(labelProfile.socials).map(([platform, href]) => (
              <a
                key={platform}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[11px] uppercase tracking-[0.2em] border border-neutral-800/20 px-3 py-2 hover:border-neutral-900 transition-colors"
              >
                {toDisplayLabel(platform)}
              </a>
            ))}
          </div>
        </div>
      </section>
      <NewsletterBlock />
    </>
  );
}
