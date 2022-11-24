export interface SpotifyTokenResponse {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: string;
}

export interface User {
  display_name: string;
  country: string;
  email: string;
  uri: string;
  external_url: {
    spotify: string;
  };
  followers: {
    href?: string;
    total: number;
  };
}
