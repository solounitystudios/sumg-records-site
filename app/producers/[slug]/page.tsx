import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LinkCluster from "@/components/LinkCluster";
import MediaTile from "@/components/MediaTile";
import PageIntro from "@/components/PageIntro";
import { producers } from "@/data";

interface ProducerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return producers.map((producer) => ({ slug: producer.slug }));
}

export async function generateMetadata({ params }: ProducerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const producer = producers.find((entry) => entry.slug === slug);

  if (!producer) {
    return {};
  }

  return {
    title: `${producer.name} — SUMG Producer`,
    description: producer.shortDescription,
  };
}

export default async function ProducerDetailPage({ params }: ProducerPageProps) {
  const { slug } = await params;
  const producer = producers.find((entry) => entry.slug === slug);
  if (!producer) {
    notFound();
  }

  return (
    <>
      <PageIntro
        eyebrow="Producer profile"
        title={producer.name}
        description={producer.shortDescription}
      />
      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid lg:grid-cols-[340px_1fr] gap-10">
          <MediaTile
            src={producer.image}
            alt={`${producer.name} portrait`}
            label={producer.name}
            className="aspect-square"
            priority
            sizes="(max-width: 1024px) 100vw, 340px"
          />
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-400">
              {producer.sonicIdentity}
            </p>
            <p className="mt-6 text-base text-neutral-700 leading-relaxed">{producer.fullBio}</p>
            <div className="mt-10">
              <LinkCluster title="Links" links={producer.links ?? {}} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 border-t border-neutral-800/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Link
            href="/producers"
            className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900"
          >
            ← Back to producers
          </Link>
        </div>
      </section>
    </>
  );
}
