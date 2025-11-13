import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrackCard from '../TrackCard';
import { SpotifyTrack } from '../../shared/interface';
import { vi } from 'vitest';

const mockTrack: SpotifyTrack = {
  id: '1',
  name: 'Test Track',
  artists: [
    {
      id: '1',
      name: 'Test Artist',
      genres: [],
      images: [],
      followers: { total: 0 },
      popularity: 0
    }
  ],
  album: {
    id: '1',
    name: 'Test Album',
    images: [
      { url: 'https://via.placeholder.com/150', height: 150, width: 150 }
    ],
    artists: [],
    release_date: '2025-01-01',
    total_tracks: 10
  },
  duration_ms: 240000,
  popularity: 90,
  explicit: true
};

describe('TrackCard', () => {
  it('renders track name, artist, and album', () => {
    render(<TrackCard track={mockTrack} />);
    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('Test Album')).toBeInTheDocument();
  });

  it('formats duration correctly', () => {
    render(<TrackCard track={mockTrack} />);
    expect(screen.getByText('4:00')).toBeInTheDocument();
  });

  it('shows explicit badge for explicit tracks', () => {
    render(<TrackCard track={mockTrack} />);
    expect(screen.getByText('Explicit')).toBeInTheDocument();
  });

  it('hides explicit badge for non-explicit tracks', () => {
    const nonExplicitTrack = { ...mockTrack, explicit: false };
    render(<TrackCard track={nonExplicitTrack} />);
    expect(screen.queryByText('Explicit')).not.toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const onClick = vi.fn();
    render(<TrackCard track={mockTrack} onClick={onClick} />);
    await userEvent.click(screen.getByText('Test Track'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
