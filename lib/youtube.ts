const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export function toYouTubeEmbedUrl(youtubeId?: string) {
  if (!youtubeId) {
    return null;
  }

  const normalizedId = youtubeId.trim();
  if (!YOUTUBE_ID_PATTERN.test(normalizedId)) {
    return null;
  }

  return `https://www.youtube.com/embed/${normalizedId}`;
}
