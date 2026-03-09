import Link from "next/link";

interface ArtistCardProps {
  name: string;
  descriptor: string;
  href?: string;
}

export default function ArtistCard({
  name,
  descriptor,
  href = "#",
}: ArtistCardProps) {
  return (
    <article className="group flex flex-col">
      {/* Portrait image block — 4:5 ratio */}
      <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>

      {/* Info block */}
      <div className="pt-4 pb-6 flex flex-col gap-2.5 border-b border-neutral-200 group-hover:border-black transition-colors duration-200">
        <h3 className="text-[11px] tracking-[0.22em] uppercase font-medium text-black">
          {name}
        </h3>
        <p className="text-xs text-neutral-500 leading-relaxed">{descriptor}</p>
        <Link
          href={href}
          className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-neutral-400 hover:text-black transition-colors duration-200"
        >
          View Artist <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
