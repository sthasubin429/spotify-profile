import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCookie } from 'cookies-next';
import {
  getMe,
  getTopArtists,
  getTopTracks,
  getMyPlaylists,
  getPlaylistTracks,
  getRecentlyPlayed,
  getAudioFeatures,
  getRecommendations,
  getPlaylist
} from '../spotifyApi';

vi.mock('axios', () => {
  const mockAxiosGet = vi.fn();
  const mockAxiosPost = vi.fn();
  const mockAxiosPut = vi.fn();
  const mockAxiosDelete = vi.fn();

  const mockAxiosInstance = {
    get: mockAxiosGet,
    post: mockAxiosPost,
    put: mockAxiosPut,
    delete: mockAxiosDelete,
    interceptors: {
      request: { use: vi.fn(), eject: vi.fn() },
      response: { use: vi.fn(), eject: vi.fn() }
    }
  };
  return {
    __esModule: true,
    default: {
      create: vi.fn(() => mockAxiosInstance),
      get: mockAxiosGet,
      post: mockAxiosPost,
      put: mockAxiosPut,
      delete: mockAxiosDelete
    }
  };
});

vi.mock('cookies-next', () => ({
  getCookie: vi.fn(),
  _setCookie: vi.fn(), // Renamed to _setCookie
  deleteCookie: vi.fn()
}));

describe('Spotify API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (getCookie as ReturnType<typeof vi.fn>).mockReturnValue(
      'mock-access-token'
    );
  });

  describe('getMe', () => {
    it('should call GET /me endpoint', async () => {
      await getMe();
      // We need to import axios inside the test to get the mocked version
      const { default: axios } = await import('axios');
      expect(vi.mocked(axios.create()).get).toHaveBeenCalledWith('/me');
    });
  });

  describe('getTopArtists', () => {
    it('should call GET /me/top/artists with correct parameters', async () => {
      const timeRange = 'short_term';
      const limit = 20;
      await getTopArtists(timeRange, limit);
      const { default: axios } = await import('axios');
      expect(vi.mocked(axios.create()).get).toHaveBeenCalledWith(
        `/me/top/artists?time_range=${timeRange}&limit=${limit}`
      );
    });
  });

  describe('getTopTracks', () => {
    it('should call GET /me/top/tracks with correct parameters', async () => {
      const timeRange = 'medium_term';
      const limit = 30;
      await getTopTracks(timeRange, limit);
      const { default: axios } = await import('axios');
      expect(vi.mocked(axios.create()).get).toHaveBeenCalledWith(
        `/me/top/tracks?time_range=${timeRange}&limit=${limit}`
      );
    });
  });

  describe('getMyPlaylists', () => {
    it('should call GET /me/playlists with correct limit', async () => {
      const limit = 10;
      await getMyPlaylists(limit);
      const { default: axios } = await import('axios');
      expect(vi.mocked(axios.create()).get).toHaveBeenCalledWith(
        `/me/playlists?limit=${limit}`
      );
    });
  });

  describe('getPlaylistTracks', () => {
    it('should call GET /playlists/{id}/tracks with correct playlistId', async () => {
      const playlistId = 'testPlaylistId';
      await getPlaylistTracks(playlistId);
      const { default: axios } = await import('axios');
      expect(vi.mocked(axios.create()).get).toHaveBeenCalledWith(
        `/playlists/${playlistId}/tracks`
      );
    });
  });

  describe('getRecentlyPlayed', () => {
    it('should call GET /me/player/recently-played with correct limit', async () => {
      const limit = 5;
      await getRecentlyPlayed(limit);
      const { default: axios } = await import('axios');
      expect(vi.mocked(axios.create()).get).toHaveBeenCalledWith(
        `/me/player/recently-played?limit=${limit}`
      );
    });
  });

  describe('getAudioFeatures', () => {
    it('should call GET /audio-features with correct trackIds', async () => {
      const trackIds = ['id1', 'id2', 'id3'];
      await getAudioFeatures(trackIds);
      const { default: axios } = await import('axios');
      expect(vi.mocked(axios.create()).get).toHaveBeenCalledWith(
        `/audio-features?ids=${trackIds.join(',')}`
      );
    });
  });

  describe('getRecommendations', () => {
    it('should call GET /recommendations with correct parameters', async () => {
      const params = { seed_tracks: 'track1', limit: 5 };
      await getRecommendations(params);
      const { default: axios } = await import('axios');
      expect(vi.mocked(axios.create()).get).toHaveBeenCalledWith(
        '/recommendations',
        { params }
      );
    });
  });

  describe('getPlaylist', () => {
    it('should call GET /playlists/{id} with correct playlistId', async () => {
      const playlistId = 'anotherPlaylistId';
      await getPlaylist(playlistId);
      const { default: axios } = await import('axios');
      expect(vi.mocked(axios.create()).get).toHaveBeenCalledWith(
        `/playlists/${playlistId}`
      );
    });
  });
});
