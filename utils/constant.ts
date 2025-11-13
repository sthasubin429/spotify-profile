export const stateKey = 'spotify_auth_state';
export const scope = `user-read-private user-read-email user-read-recently-played
  user-top-read user-follow-read playlist-read-private playlist-read-collaborative`;
export const accessTokenKey = 'access_token';
export const refreshTokenKey = 'refresh_token';
export const expiresInKey = 'expires_in';
export const tokenTypeKey = 'token_type';

export const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

export const TIME_RANGE_OPTIONS = {
  short_term: 'Last Month',
  medium_term: 'Last 6 Months',
  long_term: 'All Time',
};

export const DEFAULT_LIMIT_ARTISTS = 50;

export enum TimeRange {
  Short = 'short_term',
  Medium = 'medium_term',
  Long = 'long_term',
}
