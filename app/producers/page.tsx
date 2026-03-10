import PageIntro from "@/components/PageIntro";
import ProducerCard from "@/components/ProducerCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { producers } from "@/data";

export default function ProducersPage() {
  return (
    <>
      <PageIntro
        eyebrow="SUMG Records"
        title="Producers"
        description="Sound architects shaping the label's sonic identity."
      />

      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="Production"
            title={`${producers.length} Producers`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {producers.map((producer, i) => (
              <Reveal key={producer.slug} delay={i * 0.06}>
                <ProducerCard
                  name={producer.name}
                  descriptor={producer.shortDescription}
                  image={producer.image}
                  index={i + 1}
                  href={`/producers/${producer.slug}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
