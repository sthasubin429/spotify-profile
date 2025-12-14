import { useInfiniteQuery } from '@tanstack/react-query';
import { getTopTracks } from '../utils/spotifyApi';
import {
  SpotifyTrack,
  TimeRange,
  PaginatedResponse
} from '../shared/interface';

export function useTopTracksInfinite(
  timeRange: TimeRange = TimeRange.Medium,
  limit: number = 20
) {
  return useInfiniteQuery<PaginatedResponse<SpotifyTrack>, Error>({
    queryKey: ['top-tracks-infinite', timeRange, limit],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getTopTracks(
        timeRange,
        limit,
        pageParam as number
      );
      return response.data;
    },
    getNextPageParam: lastPage => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const offset = url.searchParams.get('offset');
        return offset ? parseInt(offset) : undefined;
      }
      return undefined;
    },
    initialPageParam: 0
  });
}
