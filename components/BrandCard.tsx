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
    <article className="flex flex-col border border-neutral-200 hover:border-black transition-colors duration-200 p-6 gap-4">
      <h3 className="text-sm font-semibold tracking-widest uppercase text-black">
        {name}
      </h3>
      <p className="text-xs text-neutral-500 leading-relaxed flex-1">
        {description}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-xs font-medium tracking-widest uppercase border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition-colors duration-200 self-start"
      >
        Visit Store
      </a>
    </article>
  );
}
