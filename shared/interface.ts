export interface SpotifyTokenResponse {
  access_token?: string; // eslint-disable-line @typescript-eslint/naming-convention
  refresh_token?: string; // eslint-disable-line @typescript-eslint/naming-convention
  token_type?: string; // eslint-disable-line @typescript-eslint/naming-convention
  expires_in?: number; // eslint-disable-line @typescript-eslint/naming-convention
  error?: string;
}
