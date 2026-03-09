import Link from "next/link";

interface ProducerCardProps {
  name: string;
  descriptor: string;
  index: number;
  href?: string;
}

export default function ProducerCard({
  name,
  descriptor,
  index,
  href = "#",
}: ProducerCardProps) {
  const indexLabel = String(index).padStart(2, "0");

  return (
    <article className="group border-t border-neutral-200 hover:border-black transition-colors duration-200 pt-8 pb-10">
      <span className="block text-[10px] tracking-[0.3em] text-neutral-300 mb-6">
        {indexLabel}
      </span>
      <h3 className="text-[1.875rem] md:text-[2.5rem] font-light leading-[1.05] tracking-tight text-black group-hover:opacity-60 transition-opacity duration-200">
        {name}
      </h3>
      <p className="mt-3 text-xs text-neutral-500 leading-relaxed max-w-xs">
        {descriptor}
      </p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-neutral-400 hover:text-black transition-colors duration-200"
      >
        View Producer <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
