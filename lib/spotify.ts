export function toSpotifyArtistEmbedUrl(spotifyUrl?: string) {
  if (!spotifyUrl) {
    return null;
  }

  const match = spotifyUrl.match(/open\.spotify\.com\/artist\/([a-zA-Z0-9]+)/);
  if (!match?.[1]) {
    return null;
  }

  return `https://open.spotify.com/embed/artist/${match[1]}?utm_source=generator`;
}
