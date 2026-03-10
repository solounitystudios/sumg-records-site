import Link from "next/link";
import MediaTile from "@/components/MediaTile";

interface ProducerCardProps {
  name: string;
  descriptor: string;
  image: string;
  index: number;
  href: string;
}

export default function ProducerCard({
  name,
  descriptor,
  image,
  index,
  href,
}: ProducerCardProps) {
  const indexLabel = String(index).padStart(2, "0");

  return (
    <article className="group border-t border-neutral-800/20 hover:border-neutral-900 transition-colors duration-300 pt-8 pb-10">
      <Link href={href} className="grid grid-cols-[70px_1fr] gap-5 items-start">
        <MediaTile
          src={image}
          alt={`${name} portrait`}
          label={name}
          className="aspect-square"
          sizes="80px"
        />
        <div>
          <span className="block text-[10px] tracking-[0.3em] text-neutral-300 mb-3">
            {indexLabel}
          </span>
          <h3 className="text-[1.6rem] md:text-[2.2rem] font-light leading-[1.05] tracking-tight text-neutral-900 group-hover:opacity-70 transition-opacity duration-200">
            {name}
          </h3>
          <p className="mt-3 text-xs text-neutral-500 leading-relaxed max-w-sm">
            {descriptor}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-neutral-400 group-hover:text-neutral-900 transition-colors duration-200">
            View Producer <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
