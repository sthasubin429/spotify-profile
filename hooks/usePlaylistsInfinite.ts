import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyPlaylists } from '../utils/spotifyApi';
import { SpotifyPlaylist, PaginatedResponse } from '../shared/interface';

export function usePlaylistsInfinite(limit: number = 20) {
  return useInfiniteQuery<PaginatedResponse<SpotifyPlaylist>, Error>({
    queryKey: ['playlists-infinite', limit],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getMyPlaylists(limit, pageParam as number);
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
