interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-10">
      {label && (
        <p className="text-xs font-medium tracking-widest uppercase text-neutral-400 mb-3">
          {label}
        </p>
      )}
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-black">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm text-neutral-500 max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
