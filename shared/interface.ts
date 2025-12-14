export type SpotifyTokenResponse = {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: string;
};

export type SpotifyUser = {
  id: string;
  display_name: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  uri: string;
  product?: string;
};

export type SpotifyArtist = {
  id: string;
  name: string;
  genres: string[];
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  followers: {
    total: number;
  };
  popularity: number;
  external_urls: {
    spotify: string;
  };
};

export type SpotifyTrack = {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration_ms: number;
  popularity: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
};

export type SpotifyPlaylist = {
  id: string;
  name: string;
  owner: SpotifyUser;
  tracks: {
    total: number;
  };
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  description: string;
  public: boolean;
  external_urls: {
    spotify: string;
  };
};

export type SpotifyAlbum = {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  release_date: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
};

export type SpotifySavedAlbum = {
  added_at: string;
  album: SpotifyAlbum;
};

export type RecentlyPlayedResponse = {
  items: SpotifyRecentlyPlayed[];
  next: string | null;
  cursors: { after: string; before: string } | null;
  limit: number;
};

export type SpotifyRecentlyPlayed = {
  track: SpotifyTrack;
  context: any;
  played_at: string;
};

export type SpotifyAudioFeatures = {
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  liveness: number;
  speechiness: number;
  valence: number;
};

export type SpotifyRecommendations = {
  tracks: SpotifyTrack[];
  seeds: any[];
};

export enum TimeRange {
  Short = 'short_term',
  Medium = 'medium_term',
  Long = 'long_term'
}

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
};

// Wrapped Feature Types
export type GenreCount = {
  genre: string;
  count: number;
  percentage: number;
};

export type AlbumCount = {
  album: SpotifyAlbum;
  count: number;
};

export type WrappedData = {
  user: SpotifyUser;
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
  topGenres: GenreCount[];
  topAlbums: AlbumCount[];
  estimatedMinutes: number;
  timeRange: TimeRange;
  timeRangeLabel: string;
  generatedAt: string;
};

export type SlideType =
  | 'intro'
  | 'minutes'
  | 'top-songs'
  | 'top-artists'
  | 'top-genres'
  | 'top-albums'
  | 'outro';
