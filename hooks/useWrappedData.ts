import { useQueries } from '@tanstack/react-query';
import { getMe, getTopTracks, getTopArtists } from '../utils/spotifyApi';
import {
  SpotifyUser,
  SpotifyTrack,
  SpotifyArtist,
  TimeRange,
  WrappedData
} from '../shared/interface';
import {
  extractTopGenres,
  extractTopAlbums,
  estimateListeningMinutes,
  TIME_RANGE_LABELS
} from '../utils/wrappedUtils';

export function useWrappedData(timeRange: TimeRange) {
  const results = useQueries({
    queries: [
      {
        queryKey: ['me'],
        queryFn: async () => {
          const response = await getMe();
          return response.data as SpotifyUser;
        }
      },
      {
        queryKey: ['wrapped-top-tracks', timeRange],
        queryFn: async () => {
          const response = await getTopTracks(timeRange, 50);
          return response.data.items as SpotifyTrack[];
        }
      },
      {
        queryKey: ['wrapped-top-artists', timeRange],
        queryFn: async () => {
          const response = await getTopArtists(timeRange, 50);
          return response.data.items as SpotifyArtist[];
        }
      }
    ]
  });

  const [userResult, tracksResult, artistsResult] = results;

  const isLoading = results.some(r => r.isLoading);
  const isError = results.some(r => r.isError);

  // Build WrappedData once core data is available
  const data: WrappedData | null =
    userResult.data && tracksResult.data && artistsResult.data
      ? {
          user: userResult.data,
          topTracks: tracksResult.data.slice(0, 5),
          topArtists: artistsResult.data.slice(0, 5),
          topGenres: extractTopGenres(artistsResult.data),
          topAlbums: extractTopAlbums(tracksResult.data),
          estimatedMinutes: estimateListeningMinutes(tracksResult.data),
          timeRange,
          timeRangeLabel: TIME_RANGE_LABELS[timeRange],
          generatedAt: new Date().toISOString()
        }
      : null;

  return {
    data,
    isLoading,
    isError
  };
}
