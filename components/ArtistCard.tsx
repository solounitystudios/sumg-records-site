import Link from "next/link";
import MediaTile from "@/components/MediaTile";

interface ArtistCardProps {
  name: string;
  descriptor: string;
  image: string;
  href: string;
}

export default function ArtistCard({
  name,
  descriptor,
  image,
  href,
}: ArtistCardProps) {
  return (
    <article className="group flex flex-col">
      <Link href={href} className="block">
        <MediaTile
          src={image}
          alt={`${name} portrait`}
          label={name}
          className="aspect-[4/5]"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="pt-5 pb-7 flex flex-col gap-3 border-b border-neutral-800/25 group-hover:border-neutral-900 transition-colors duration-300">
          <h3 className="text-[11px] tracking-[0.22em] uppercase font-medium text-neutral-900">
            {name}
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">{descriptor}</p>
          <span className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-neutral-400 group-hover:text-neutral-900 transition-colors duration-200">
            View Artist <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
