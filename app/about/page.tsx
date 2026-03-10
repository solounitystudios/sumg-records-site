import PageIntro from "@/components/PageIntro";
import { labelProfile } from "@/data";
import { toDisplayLabel } from "@/lib/text";

const sections = [
  {
    label: "Record Label",
    heading: "Music is the center.",
    body: "SUMG Records develops artists with long-range intent: records, visuals, and narrative direction that can sustain a full career arc rather than a single cycle.",
  },
  {
    label: "Creative Studio",
    heading: "Execution stays in-house.",
    body: "Through PersonaWorks and affiliated collaborators, SUMG builds artwork, campaigns, visual systems, and live concepts as part of one coherent editorial language.",
  },
  {
    label: "Cultural Platform",
    heading: "Sound, fashion, and media intersect.",
    body: "The label ecosystem includes producers, fashion labels, and release-driven storytelling. Projects are designed to travel across listening, visual, and physical spaces.",
  },
  {
    label: "Future-facing",
    heading: "Built for what comes next.",
    body: "SUMG explores technology where it improves craft and reach. Tools are treated as infrastructure, not spectacle, keeping the focus on the quality of the work.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="SUMG Records"
        title="About"
        description="Record label, creative studio, and future-facing cultural platform."
      />

      <section className="bg-[#f7f7f5] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            {sections.map((section, i) => (
              <article
                key={section.label}
                className={`flex flex-col md:flex-row gap-8 md:gap-16 ${
                  i < sections.length - 1
                    ? "pb-16 mb-16 border-b border-neutral-200"
                    : ""
                }`}
              >
                <div className="md:w-48 shrink-0">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 pt-1">
                    {section.label}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl md:text-3xl font-light tracking-tight text-neutral-900 leading-tight">
                    {section.heading}
                  </h2>
                  <p className="text-sm text-neutral-500 leading-relaxed">{section.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0f1012] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-600 mb-6">
              SUMG Records
            </p>
            <p className="text-[1.75rem] md:text-[2.5rem] font-display italic font-normal text-white leading-[1.1] tracking-[-0.01em]">
              Independent by choice. Built with intent.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {Object.entries(labelProfile.socials).map(([platform, href]) => (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[10px] uppercase tracking-[0.2em] border border-neutral-700 px-3 py-2 text-neutral-300 hover:border-neutral-400 hover:text-white"
                >
                  {toDisplayLabel(platform)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
