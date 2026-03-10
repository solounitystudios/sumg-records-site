import Link from "next/link";
import MediaTile from "@/components/MediaTile";

interface ReleaseCardProps {
  title: string;
  artist: string;
  date: string;
  description: string;
  image: string;
  href: string;
}

export default function ReleaseCard({
  title,
  artist,
  date,
  description,
  image,
  href,
}: ReleaseCardProps) {
  return (
    <article className="group">
      <Link href={href}>
        <MediaTile
          src={image}
          alt={`${title} cover`}
          label={title}
          className="aspect-square"
          sizes="(max-width: 768px) 100vw, 30vw"
        />
        <div className="pt-5 pb-7 border-b border-neutral-800/20 group-hover:border-neutral-900 transition-colors duration-300">
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            {artist} · {date}
          </p>
          <h3 className="mt-3 text-2xl font-light leading-tight tracking-tight text-neutral-900">
            {title}
          </h3>
          <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{description}</p>
          <span className="mt-4 inline-flex text-[11px] tracking-[0.2em] uppercase text-neutral-400 group-hover:text-neutral-900 transition-colors duration-200">
            View release →
          </span>
        </div>
      </Link>
    </article>
  );
}
