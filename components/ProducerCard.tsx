import Link from "next/link";

interface ProducerCardProps {
  name: string;
  descriptor: string;
  href?: string;
}

export default function ProducerCard({
  name,
  descriptor,
  href = "#",
}: ProducerCardProps) {
  return (
    <article className="group flex flex-col border border-neutral-200 hover:border-black transition-colors duration-200">
      {/* Placeholder image block */}
      <div className="aspect-square bg-neutral-100 w-full" aria-hidden="true" />

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-sm font-semibold tracking-widest uppercase text-black">
          {name}
        </h3>
        <p className="text-xs text-neutral-500 leading-relaxed flex-1">
          {descriptor}
        </p>
        <Link
          href={href}
          className="inline-block text-xs font-medium tracking-widest uppercase border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition-colors duration-200 self-start"
        >
          View Producer
        </Link>
      </div>
    </article>
  );
}
