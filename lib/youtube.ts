const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

function normalizeYouTubeId(value?: string) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return YOUTUBE_ID_PATTERN.test(trimmed) ? trimmed : null;
}

export function extractYouTubeId(value?: string) {
  const directId = normalizeYouTubeId(value);
  if (directId) {
    return directId;
  }

  if (!value) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(value.trim());
  } catch {
    return null;
  }

  const hostname = parsed.hostname.replace(/^www\./, "");

  if (hostname === "youtu.be") {
    return normalizeYouTubeId(parsed.pathname.slice(1));
  }

  if (hostname === "youtube.com" || hostname === "m.youtube.com") {
    if (parsed.pathname === "/watch") {
      return normalizeYouTubeId(parsed.searchParams.get("v") ?? undefined);
    }

    if (parsed.pathname.startsWith("/embed/")) {
      return normalizeYouTubeId(parsed.pathname.split("/")[2]);
    }

    if (parsed.pathname.startsWith("/shorts/")) {
      return normalizeYouTubeId(parsed.pathname.split("/")[2]);
    }
  }

  return null;
}

export function toYouTubeEmbedUrl(youtubeId?: string) {
  const normalizedId = normalizeYouTubeId(youtubeId);
  if (!normalizedId) {
    return null;
  }

  return `https://www.youtube.com/embed/${normalizedId}`;
}

export function toYouTubeWatchUrl(youtubeId?: string) {
  const normalizedId = normalizeYouTubeId(youtubeId);
  if (!normalizedId) {
    return null;
  }

  return `https://www.youtube.com/watch?v=${normalizedId}`;
}
