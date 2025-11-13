import { useQuery } from '@tanstack/react-query';
import { getTopTracks } from '../utils/spotifyApi';
import { SpotifyTrack, TimeRange } from '../shared/interface';

export function useTopTracks(
  timeRange: TimeRange = TimeRange.Medium,
  limit: number = 10
) {
  return useQuery<SpotifyTrack[], Error>({
    queryKey: ['top-tracks', timeRange, limit],
    queryFn: async () => {
      const response = await getTopTracks(timeRange, limit);
      return response.data.items;
    }
  });
}
