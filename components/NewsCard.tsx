import Link from "next/link";

interface NewsCardProps {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  href?: string;
}

export default function NewsCard({
  title,
  date,
  category,
  excerpt,
  href = "/news",
}: NewsCardProps) {
  return (
    <article className="border-t border-neutral-800/20 pt-6 pb-8 group hover:border-neutral-900 transition-colors duration-300">
      <Link href={href}>
        <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-400">
          {category} · {date}
        </p>
        <h3 className="mt-3 text-xl font-light tracking-tight text-neutral-900">
          {title}
        </h3>
        <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{excerpt}</p>
        <span className="mt-4 inline-flex text-[11px] tracking-[0.2em] uppercase text-neutral-400 group-hover:text-neutral-900 transition-colors duration-200">
          Read update →
        </span>
      </Link>
    </article>
  );
}
