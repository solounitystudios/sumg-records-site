import Link from "next/link";
import MediaTile from "@/components/MediaTile";

interface BrandCardProps {
  name: string;
  description: string;
  image: string;
  accentColor?: string;
  href: string;
}

export default function BrandCard({
  name,
  description,
  image,
  accentColor,
  href,
}: BrandCardProps) {
  return (
    <article
      className="group border-t border-neutral-800/20 hover:border-neutral-900 transition-colors duration-300 pt-7 pb-9 flex flex-col gap-4"
      style={accentColor ? { borderColor: `${accentColor}50` } : undefined}
    >
      <Link href={href}>
        <MediaTile
          src={image}
          alt={`${name} brand visual`}
          label={name}
          className="aspect-[5/4] mb-4"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <h3 className="text-[11px] tracking-[0.25em] uppercase font-medium text-neutral-900">
          {name}
        </h3>
        <p className="mt-3 text-xs text-neutral-500 leading-relaxed max-w-xs">
          {description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-neutral-400 group-hover:text-neutral-900 transition-colors duration-200">
          View Brand <span aria-hidden="true">→</span>
        </span>
      </Link>
    </article>
  );
}
