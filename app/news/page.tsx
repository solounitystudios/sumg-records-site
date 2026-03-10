import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import PageIntro from "@/components/PageIntro";
import SectionHeading from "@/components/SectionHeading";
import { news } from "@/data";
import { formatDate } from "@/lib/format";

export default function NewsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Journal"
        title="News"
        description="Editorial updates across signings, releases, visuals, events, and drops."
      />
      <section className="bg-[#f7f7f5] py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <SectionHeading eyebrow="Announcements" title={`${news.length} Updates`} />
          <div className="space-y-2">
            {news.map((item) => (
              <NewsCard
                key={item.slug}
                title={item.title}
                date={formatDate(item.date)}
                category={item.category}
                excerpt={item.excerpt}
                href={`/news/${item.slug}`}
              />
            ))}
          </div>
          <Link
            href="/press"
            className="mt-8 inline-flex text-[11px] uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900"
          >
            Need media materials? Visit Press →
          </Link>
        </div>
      </section>
    </>
  );
}
