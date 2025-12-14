import {
  SpotifyArtist,
  SpotifyTrack,
  GenreCount,
  AlbumCount,
  TimeRange
} from '../shared/interface';

/**
 * Time range labels for display
 */
export const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  [TimeRange.Short]: 'Last 4 Weeks',
  [TimeRange.Medium]: 'Last 6 Months',
  [TimeRange.Long]: 'All Time'
};

/**
 * Extract and aggregate top genres from artists
 */
export function extractTopGenres(artists: SpotifyArtist[]): GenreCount[] {
  const genreCounts: Record<string, number> = {};

  artists.forEach(artist => {
    artist.genres.forEach(genre => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });

  const totalGenres = Object.values(genreCounts).reduce((a, b) => a + b, 0);

  const sortedGenres = Object.entries(genreCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([genre, count]) => ({
      genre: capitalizeGenre(genre),
      count,
      percentage: Math.round((count / totalGenres) * 100)
    }));

  return sortedGenres;
}

/**
 * Capitalize genre name for display
 */
function capitalizeGenre(genre: string): string {
  return genre
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Extract top albums from tracks based on frequency
 */
export function extractTopAlbums(tracks: SpotifyTrack[]): AlbumCount[] {
  const albumCounts: Record<
    string,
    { album: SpotifyTrack['album']; count: number }
  > = {};

  tracks.forEach(track => {
    const albumId = track.album.id;
    if (albumCounts[albumId]) {
      albumCounts[albumId].count += 1;
    } else {
      albumCounts[albumId] = { album: track.album, count: 1 };
    }
  });

  return Object.values(albumCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

/**
 * Estimate total listening minutes from top tracks
 * Assumes each top track was listened to proportionally to its rank
 */
export function estimateListeningMinutes(tracks: SpotifyTrack[]): number {
  // Each track's contribution decreases with rank
  // Top track counted more times than lower ranked tracks
  const totalMs = tracks.reduce((total, track, index) => {
    const multiplier = Math.max(1, Math.floor((tracks.length - index) / 5));
    return total + track.duration_ms * multiplier;
  }, 0);

  return Math.round(totalMs / 60000);
}
