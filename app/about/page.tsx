const sections = [
  {
    label: "Label Vision",
    heading: "Built for the long arc.",
    body: [
      "SUMG Records is an independent music label operating at the intersection of creative identity and AI-powered ecosystems. We build infrastructure for artists who think beyond single releases.",
      "The label exists to support work that is deliberate, self-authored, and built to endure. We move at the pace of the music, not the algorithm.",
    ],
  },
  {
    label: "Artist Development",
    heading: "Growth without compromise.",
    body: [
      "Each artist on the SUMG roster is developed with a long-term lens. We are not interested in trend chasing. We work with artists who have a clear perspective and the discipline to execute it.",
      "Development means building an artist's world — their sound, their visual identity, their audience relationship — as a unified whole.",
    ],
  },
  {
    label: "Producer Network",
    heading: "Sound as architecture.",
    body: [
      "The SUMG producer network is built from producers who treat sound design as craft. Every beat, every session, every mix is approached with intention.",
      "We connect producers directly with artists and projects that match their range. This is not a beat marketplace — it is a working creative network.",
    ],
  },
  {
    label: "Creative Ecosystem",
    heading: "More than a label.",
    body: [
      "SUMG operates as a creative ecosystem — a network of artists, producers, brands, and technologists working in proximity. The label is the anchor, but the reach extends into fashion, digital identity, and AI-driven tools.",
      "PersonaWorks is one expression of this. The affiliated brand network is another. The goal is a fully realized creative infrastructure, built from the inside out.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-[#111] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <p className="text-[10px] tracking-[0.45em] uppercase text-neutral-600 mb-6">
            SUMG Records
          </p>
          <h1 className="font-display italic font-normal text-white text-[2.5rem] md:text-[4.5rem] leading-[0.92] tracking-[-0.01em]">
            About
          </h1>
          <div className="mt-7 w-10 border-t border-neutral-700" />
          <p className="mt-6 text-sm text-neutral-500 max-w-sm leading-relaxed font-light">
            Independent music label. Solounity Music Group.
          </p>
        </div>
      </section>

      {/* Content sections */}
      <section className="bg-[#fafaf8] py-24 md:py-32">
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
                {/* Left column — label */}
                <div className="md:w-48 shrink-0">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 pt-1">
                    {section.label}
                  </p>
                </div>

                {/* Right column — content */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl md:text-3xl font-light tracking-tight text-black leading-tight">
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph, j) => (
                    <p
                      key={j}
                      className="text-sm text-neutral-500 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing callout */}
      <section className="bg-[#111] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.4em] uppercase text-neutral-600 mb-6">
              SUMG Records
            </p>
            <p className="text-[1.75rem] md:text-[2.5rem] font-display italic font-normal text-white leading-[1.1] tracking-[-0.01em]">
              Solounity Music Group — independent by choice, built for the long
              game.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
