import Link from "next/link";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  linkHref?: string;
  linkLabel?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  linkHref,
  linkLabel,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={`mb-14 ${isCenter ? "text-center" : ""}`}>
      <div
        className={`flex items-baseline ${
          isCenter ? "justify-center" : "justify-between"
        } gap-6`}
      >
        <div>
          {eyebrow && (
            <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-3">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 leading-[1.08]">
            {title}
          </h2>
        </div>

        {linkHref && linkLabel && (
          <Link
            href={linkHref}
            className="hidden md:inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-neutral-400 hover:text-neutral-900 transition-colors duration-200 shrink-0"
          >
            {linkLabel} →
          </Link>
        )}
      </div>

      <div
        className={`mt-5 border-t border-neutral-800/20 ${
          isCenter ? "mx-auto w-12" : "w-10"
        }`}
      />

      {description && (
        <p
          className={`mt-5 text-sm text-neutral-500 leading-relaxed ${
            isCenter ? "max-w-lg mx-auto" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      )}

      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className={`md:hidden mt-5 inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-900 ${
            isCenter ? "justify-center" : ""
          }`}
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
