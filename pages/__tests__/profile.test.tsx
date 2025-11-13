import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfilePage from '../../pages/profile';
import * as useMe from '../../hooks/useMe';
import * as useTopArtists from '../../hooks/useTopArtists';
import * as useTopTracks from '../../hooks/useTopTracks';
import * as useAuthenticated from '../../hooks/useAuthenticated';
import {
  SpotifyUser,
  SpotifyArtist,
  SpotifyTrack
} from '../../shared/interface';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { vi } from 'vitest';

// Mock router
vi.mock('next/router', () => ({
  useRouter: vi.fn()
}));

const mockUseRouter = useRouter as vi.Mock;

const mockUser: SpotifyUser = {
  id: '1',
  display_name: 'Test User',
  followers: { total: 123, href: null },
  images: [{ url: 'https://via.placeholder.com/150', height: 150, width: 150 }],
  external_urls: { spotify: '' },
  uri: ''
};

const mockArtists: SpotifyArtist[] = [
  {
    id: '1',
    name: 'Artist 1',
    genres: [],
    images: [],
    followers: { total: 0 },
    popularity: 0
  },
  {
    id: '2',
    name: 'Artist 2',
    genres: [],
    images: [],
    followers: { total: 0 },
    popularity: 0
  }
];

const mockTracks: SpotifyTrack[] = [
  {
    id: '1',
    name: 'Track 1',
    artists: [],
    album: {
      id: '1',
      name: 'Album 1',
      images: [],
      artists: [],
      release_date: '',
      total_tracks: 0
    },
    duration_ms: 0,
    popularity: 0,
    explicit: false
  },
  {
    id: '2',
    name: 'Track 2',
    artists: [],
    album: {
      id: '2',
      name: 'Album 2',
      images: [],
      artists: [],
      release_date: '',
      total_tracks: 0
    },
    duration_ms: 0,
    popularity: 0,
    explicit: false
  }
];

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.spyOn(useAuthenticated, 'useAuthenticated').mockReturnValue(true);
    mockUseRouter.mockReturnValue({ push: vi.fn() });
    vi.spyOn(useMe, 'useMe').mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null
    } as any);
    vi.spyOn(useTopArtists, 'useTopArtists').mockReturnValue({
      data: mockArtists,
      isLoading: false,
      error: null
    } as any);
    vi.spyOn(useTopTracks, 'useTopTracks').mockReturnValue({
      data: mockTracks,
      isLoading: false,
      error: null
    } as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders user information, top artists, and top tracks', () => {
    render(<ProfilePage />, { wrapper: createWrapper() });

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Artist 1')).toBeInTheDocument();
    expect(screen.getByText('Artist 2')).toBeInTheDocument();
    expect(screen.getByText('Track 1')).toBeInTheDocument();
    expect(screen.getByText('Track 2')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    vi.spyOn(useMe, 'useMe').mockReturnValue({
      data: null,
      isLoading: true,
      error: null
    } as any);
    render(<ProfilePage />, { wrapper: createWrapper() });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    vi.spyOn(useMe, 'useMe').mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('test error')
    } as any);
    render(<ProfilePage />, { wrapper: createWrapper() });
    expect(screen.getByText('Error loading data.')).toBeInTheDocument();
  });

  it('redirects if not authenticated', () => {
    vi.spyOn(useAuthenticated, 'useAuthenticated').mockReturnValue(false);
    const push = vi.fn();
    mockUseRouter.mockReturnValue({ push });
    render(<ProfilePage />, { wrapper: createWrapper() });
    expect(push).toHaveBeenCalledWith('/');
  });

  it('logs out the user', async () => {
    const push = vi.fn();
    mockUseRouter.mockReturnValue({ push });
    render(<ProfilePage />, { wrapper: createWrapper() });

    const logoutButton = screen.getByText('Logout');
    await userEvent.click(logoutButton);

    // We can't test cookie deletion in jsdom, but we can test the redirect
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/');
    });
  });
});
