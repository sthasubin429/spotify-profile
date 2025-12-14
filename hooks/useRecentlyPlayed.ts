import { useQuery } from '@tanstack/react-query';
import { getRecentlyPlayed } from '../utils/spotifyApi';
import { RecentlyPlayedResponse } from '../shared/interface';

export function useRecentlyPlayed(limit: number = 50) {
  return useQuery<RecentlyPlayedResponse, Error>({
    queryKey: ['recently-played', limit],
    queryFn: async () => {
      const response = await getRecentlyPlayed(limit);
      return response.data;
    }
  });
}
