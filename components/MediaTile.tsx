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
  const [loadModeBySrc, setLoadModeBySrc] = useState<
    Record<string, "optimized" | "unoptimized" | "failed">
  >({});
  const fallbackInitials = useMemo(() => initialsFromLabel(label), [label]);
  const currentLoadMode = src ? (loadModeBySrc[src] ?? "optimized") : "failed";
  const shouldShowImage = Boolean(src) && currentLoadMode !== "failed";

  const handleImageError = () => {
    if (!src) {
      return;
    }

    setLoadModeBySrc((previous) => {
      const current = previous[src] ?? "optimized";

      if (current === "optimized") {
        // Retry once without optimization for files that fail in the optimizer pipeline.
        return {
          ...previous,
          [src]: "unoptimized",
        };
      }

      if (current === "unoptimized") {
        return {
          ...previous,
          [src]: "failed",
        };
      }

      return previous;
    });
  };

  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${className}`}>
      {shouldShowImage ? (
        <Image
          key={`${src}-${currentLoadMode}`}
          src={src!}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          unoptimized={currentLoadMode === "unoptimized"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          onError={handleImageError}
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
