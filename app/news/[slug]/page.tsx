import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import { news } from "@/data";
import { formatDate } from "@/lib/format";
import { toDisplayLabel } from "@/lib/text";

interface NewsDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return news.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: NewsDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const article = news.find((entry) => entry.slug === slug);
  if (!article) {
    return {};
  }

  return {
    title: `${article.title} — SUMG News`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { slug } = await params;
  const article = news.find((entry) => entry.slug === slug);
  if (!article) {
    notFound();
  }

  return (
    <>
      <PageIntro
        eyebrow={`${toDisplayLabel(article.category)} · ${formatDate(article.date)}`}
        title={article.title}
        description={article.excerpt}
      />
      <section className="bg-[#f7f7f5] py-20 md:py-28">
        <article className="max-w-3xl mx-auto px-6 md:px-10">
          <p className="text-base leading-relaxed text-neutral-700">{article.content}</p>
          <Link
            href="/news"
            className="mt-10 inline-flex text-[11px] uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900"
          >
            ← Back to news
          </Link>
        </article>
      </section>
    </>
  );
}
