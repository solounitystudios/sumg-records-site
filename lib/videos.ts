import type { VideoItem, VideoOwnerType } from "@/data/types";
import { artists } from "@/data/artists";
import { producers } from "@/data/producers";
import { labelProfile } from "@/data/label";
import { extractYouTubeId, toYouTubeEmbedUrl, toYouTubeWatchUrl } from "@/lib/youtube";

export interface ResolvedVideoItem extends VideoItem {
  ownerType: VideoOwnerType;
  ownerName: string;
  youtubeId?: string;
  youtubeUrl?: string;
  embedUrl: string | null;
}

function hasApprovedYouTubeChannel(url?: string) {
  return Boolean(url && url !== "#");
}

function inferOwnerType(video: VideoItem): VideoOwnerType {
  if (video.ownerType) {
    return video.ownerType;
  }

  if (video.artistSlug) {
    return "artist";
  }

  if (video.producerSlug) {
    return "producer";
  }

  return "label";
}

export function resolveVideoItem(video: VideoItem): ResolvedVideoItem | null {
  const ownerType = inferOwnerType(video);
  let ownerName = labelProfile.name;
  let approvedChannelUrl: string | undefined = labelProfile.socials.youtube;

  if (ownerType === "artist") {
    if (!video.artistSlug || video.producerSlug) {
      return null;
    }

    const artist = artists.find((entry) => entry.slug === video.artistSlug);
    if (!artist) {
      return null;
    }

    ownerName = artist.name;
    approvedChannelUrl = artist.socials.youtube;
  }

  if (ownerType === "producer") {
    if (!video.producerSlug || video.artistSlug) {
      return null;
    }

    const producer = producers.find((entry) => entry.slug === video.producerSlug);
    if (!producer) {
      return null;
    }

    ownerName = producer.name;
    approvedChannelUrl = producer.links?.youtube;
  }

  if (ownerType === "label" && (video.artistSlug || video.producerSlug)) {
    return null;
  }

  const youtubeId = extractYouTubeId(video.youtubeId) ?? extractYouTubeId(video.youtubeUrl);
  const canRenderEmbed = Boolean(youtubeId && hasApprovedYouTubeChannel(approvedChannelUrl));
  const normalizedYouTubeUrl = youtubeId ? toYouTubeWatchUrl(youtubeId) ?? undefined : undefined;

  return {
    ...video,
    ownerType,
    ownerName,
    youtubeId: youtubeId ?? undefined,
    youtubeUrl: normalizedYouTubeUrl,
    embedUrl: canRenderEmbed ? toYouTubeEmbedUrl(youtubeId ?? undefined) : null,
  };
}

export function getResolvedVideos(videoItems: VideoItem[]) {
  return videoItems
    .map(resolveVideoItem)
    .filter((item): item is ResolvedVideoItem => Boolean(item));
}
