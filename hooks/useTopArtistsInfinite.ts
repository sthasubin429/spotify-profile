import { useInfiniteQuery } from '@tanstack/react-query';
import { getTopArtists } from '../utils/spotifyApi';
import {
  SpotifyArtist,
  TimeRange,
  PaginatedResponse
} from '../shared/interface';

export function useTopArtistsInfinite(
  timeRange: TimeRange = TimeRange.Medium,
  limit: number = 20 // Default limit for the page
) {
  return useInfiniteQuery<PaginatedResponse<SpotifyArtist>, Error>({
    queryKey: ['top-artists-infinite', timeRange, limit],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getTopArtists(
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
