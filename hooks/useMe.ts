import { useQuery } from '@tanstack/react-query';
import { getMe } from '../utils/spotifyApi';
import { SpotifyUser } from '../shared/interface';

export function useMe() {
  return useQuery<SpotifyUser, Error>({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await getMe();
      return response.data;
    }
  });
}
