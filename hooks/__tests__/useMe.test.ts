import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMe } from '../useMe';
import * as spotifyApi from '../../utils/spotifyApi';
import { SpotifyUser } from '../../shared/interface';
import React from 'react';
import { vi } from 'vitest';

// Mock the spotifyApi
vi.mock('../../utils/spotifyApi');

const mockGetMe = spotifyApi.getMe as vi.Mock;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

const mockUser: SpotifyUser = {
  id: '1',
  display_name: 'Test User',
  external_urls: { spotify: '' },
  followers: { href: null, total: 100 },
  images: [],
  uri: ''
};

describe('useMe', () => {
  it('should return user data on successful fetch', async () => {
    mockGetMe.mockResolvedValue({ data: mockUser });

    const { result } = renderHook(() => useMe(), {
      wrapper: createWrapper()
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockUser);
  });

  it('should return an error on failed fetch', async () => {
    const error = new Error('Failed to fetch');
    mockGetMe.mockRejectedValue(error);

    const { result } = renderHook(() => useMe(), {
      wrapper: createWrapper()
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(error);
  });
});
