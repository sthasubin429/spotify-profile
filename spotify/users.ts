import {
  CurrentUsersProfileResponse,
  UsersFollowedArtistsResponse
} from 'interface';
import { SPOTIFY_API_BASE_URL } from 'utils/constant';
import { headers } from 'utils/spotify';

export async function getCurrentUser(): Promise<CurrentUsersProfileResponse> {
  let data = await fetch(`${SPOTIFY_API_BASE_URL}/v1/me`, { headers });
  return data.json();
}

export async function getFollowedArtist(): Promise<UsersFollowedArtistsResponse> {
  let data = await fetch(
    `${SPOTIFY_API_BASE_URL}/v1/me/following?type=artist`,
    { headers }
  );
  return data.json();
}
