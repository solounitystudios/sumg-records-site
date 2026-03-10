import Link from "next/link";
import type { SocialLinks, StreamingLinks } from "@/data/types";

interface LinkClusterProps {
  title: string;
  links: SocialLinks | StreamingLinks | Record<string, string | undefined>;
}

export default function LinkCluster({ title, links }: LinkClusterProps) {
  const entries = Object.entries(links).filter(([, value]) => Boolean(value));

  if (entries.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-400 mb-3">{title}</p>
      <div className="flex flex-wrap gap-3">
        {entries.map(([label, href]) => (
          <Link
            key={label}
            href={href ?? "#"}
            className="text-[11px] uppercase tracking-[0.2em] border border-neutral-800/25 px-3 py-2 hover:border-neutral-900 transition-colors duration-200"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
