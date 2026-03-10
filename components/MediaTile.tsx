"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

interface MediaTileProps {
  src?: string;
  alt: string;
  label: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

function initialsFromLabel(label: string) {
  return label
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function MediaTile({
  src,
  alt,
  label,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: MediaTileProps) {
  const [failed, setFailed] = useState(false);
  const fallbackInitials = useMemo(() => initialsFromLabel(label), [label]);
  const shouldShowImage = Boolean(src) && !failed;

  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${className}`}>
      {shouldShowImage ? (
        <Image
          src={src!}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-400 flex flex-col items-center justify-center gap-3">
          <span className="text-xl tracking-[0.25em] uppercase">{fallbackInitials}</span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
            Visual pending
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>
  );
}
