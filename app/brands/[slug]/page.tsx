import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandHero from "@/components/BrandHero";
import MediaTile from "@/components/MediaTile";
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
      <BrandHero brand={brand} />

      <section style={{ backgroundColor: brand.theme.colors.surface, color: brand.theme.colors.text }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24">
          <div className="grid lg:grid-cols-[340px_1fr] gap-12">
            <div>
              <p className={`text-[10px] ${brand.theme.typography.accent} text-white/55`}>
                Brand statement
              </p>
              <p className={`mt-5 text-base leading-relaxed ${brand.theme.typography.body}`}>
                {brand.shortDescription}
              </p>
            </div>
            <div>
              <p className={`text-[10px] ${brand.theme.typography.accent} text-white/55`}>
                Editorial description
              </p>
              <p className={`mt-5 text-base leading-relaxed ${brand.theme.typography.body}`}>
                {brand.fullDescription}
              </p>
              <p className={`mt-8 text-[10px] ${brand.theme.typography.accent} text-white/55`}>
                Visual direction
              </p>
              <p className={`mt-4 text-sm leading-relaxed ${brand.theme.typography.body}`}>
                {brand.visualDirection}
              </p>
              <p className={`mt-8 text-[10px] ${brand.theme.typography.accent} text-white/55`}>
                Aesthetic direction
              </p>
              <p className={`mt-4 text-sm leading-relaxed ${brand.theme.typography.body}`}>
                {brand.aestheticDirection}
              </p>
            </div>
          </div>
        </div>
      </section>

      {brand.collection.length > 0 && (
        <section style={{ backgroundColor: brand.theme.colors.background, color: brand.theme.colors.text }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24">
            <p className={`text-[10px] ${brand.theme.typography.accent} text-white/55 mb-6`}>
              Collection
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {brand.collection.map((item) => (
                <article key={item.name}>
                  <MediaTile
                    src={item.image}
                    alt={item.name}
                    label={item.name}
                    className="aspect-[4/5]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="pt-4 pb-6 border-b border-white/20">
                    <p className={`text-[10px] ${brand.theme.typography.accent} text-white/50`}>
                      {item.category}
                    </p>
                    <h3 className={`mt-3 text-2xl tracking-tight ${brand.theme.typography.display}`}>
                      {item.name}
                    </h3>
                    <p className={`mt-3 text-sm leading-relaxed ${brand.theme.typography.body}`}>
                      {item.shortDescription}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {brand.campaignImagery.length > 0 && (
        <section style={{ backgroundColor: brand.theme.colors.surface, color: brand.theme.colors.text }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24">
            <p className={`text-[10px] ${brand.theme.typography.accent} text-white/55 mb-6`}>
              Campaign imagery
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {brand.campaignImagery.map((image) => (
                <article key={image.image}>
                  <MediaTile
                    src={image.image}
                    alt={image.caption}
                    label={brand.name}
                    className="aspect-[3/2]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <p className={`mt-4 text-sm ${brand.theme.typography.body} text-white/75`}>
                    {image.caption}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

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
