import { User } from 'shared/interface';
import { SPOTIFY_API_BASE_URL } from 'utils/constant';
import { headers } from 'utils/spotify';

export async function getCurrentUser(): Promise<User> {
  let data = await fetch(`${SPOTIFY_API_BASE_URL}/v1/me`, { headers });
  return data.json();
}
