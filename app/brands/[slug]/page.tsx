import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MediaTile from "@/components/MediaTile";
import PageIntro from "@/components/PageIntro";
import { brands } from "@/data";

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = brands.find((entry) => entry.slug === slug);
  if (!brand) {
    return {};
  }

  return {
    title: `${brand.name} — SUMG Brand Network`,
    description: brand.shortDescription,
  };
}

export default async function BrandDetailPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = brands.find((entry) => entry.slug === slug);

  if (!brand) {
    notFound();
  }

  return (
    <>
      <PageIntro
        eyebrow="Brand profile"
        title={brand.name}
        description={brand.shortDescription}
      />

      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid lg:grid-cols-[360px_1fr] gap-10">
          <MediaTile
            src={brand.image}
            alt={`${brand.name} brand visual`}
            label={brand.name}
            className="aspect-square"
            priority
            sizes="(max-width: 1024px) 100vw, 360px"
          />
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-400">
              {brand.positioning}
            </p>
            <p className="mt-6 text-base text-neutral-700 leading-relaxed">
              {brand.fullDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 border-t border-neutral-800/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Link
            href="/brands"
            className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900"
          >
            ← Back to brands
          </Link>
        </div>
      </section>
    </>
  );
}
