import { useQuery } from '@tanstack/react-query';
import { getTopArtists } from '../utils/spotifyApi';
import { SpotifyArtist, TimeRange } from '../shared/interface';

export function useTopArtists(
  timeRange: TimeRange = TimeRange.Medium,
  limit: number = 10
) {
  return useQuery<SpotifyArtist[], Error>({
    queryKey: ['top-artists', timeRange, limit],
    queryFn: async () => {
      const response = await getTopArtists(timeRange, limit);
      return response.data.items;
    }
  });
}
