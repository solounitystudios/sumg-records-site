interface BrandCardProps {
  name: string;
  description: string;
  href?: string;
}

export default function BrandCard({
  name,
  description,
  href = "#",
}: BrandCardProps) {
  return (
    <article className="group border-t border-neutral-200 hover:border-black transition-colors duration-200 pt-7 pb-9 flex flex-col gap-3">
      <h3 className="text-[11px] tracking-[0.25em] uppercase font-medium text-black">
        {name}
      </h3>
      <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
        {description}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-neutral-400 group-hover:text-black transition-colors duration-200"
      >
        Visit Store <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
