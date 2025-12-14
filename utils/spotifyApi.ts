import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1'
});

spotifyApi.interceptors.request.use(
  config => {
    const token = getCookie('spotify-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

spotifyApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getCookie('spotify-refresh-token');
        const response = await axios.get(
          `/api/refresh_token?refresh_token=${refreshToken}`
        );
        const { access_token } = response.data;
        setCookie('spotify-token', access_token);
        spotifyApi.defaults.headers.common['Authorization'] =
          'Bearer ' + access_token;
        return spotifyApi(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const getMe = () => spotifyApi.get('/me');

export const getTopArtists = (
  timeRange: string,
  limit: number,
  offset: number = 0
) =>
  spotifyApi.get(
    `/me/top/artists?time_range=${timeRange}&limit=${limit}&offset=${offset}`
  );

export const getTopTracks = (
  timeRange: string,
  limit: number,
  offset: number = 0
) =>
  spotifyApi.get(
    `/me/top/tracks?time_range=${timeRange}&limit=${limit}&offset=${offset}`
  );

export const getMyPlaylists = (limit: number, offset: number = 0) =>
  spotifyApi.get(`/me/playlists?limit=${limit}&offset=${offset}`);

export const getPlaylistTracks = (playlistId: string) =>
  spotifyApi.get(`/playlists/${playlistId}/tracks`);

export const getRecentlyPlayed = (limit: number) =>
  spotifyApi.get(`/me/player/recently-played?limit=${limit}`);

export const getAudioFeatures = (trackIds: string[]) =>
  spotifyApi.get(`/audio-features?ids=${trackIds.join(',')}`);

export const getRecommendations = (params: any) =>
  spotifyApi.get('/recommendations', { params });

export const getPlaylist = (playlistId: string) =>
  spotifyApi.get(`/playlists/${playlistId}`);

export default spotifyApi;
