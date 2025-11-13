import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArtistCard from '../ArtistCard';
import { SpotifyArtist } from '../../shared/interface';
import { vi } from 'vitest';

const mockArtist: SpotifyArtist = {
  id: '1',
  name: 'Test Artist',
  genres: ['rock', 'pop'],
  images: [{ url: 'https://via.placeholder.com/150', height: 150, width: 150 }],
  followers: { total: 1000 },
  popularity: 80
};

describe('ArtistCard', () => {
  it('renders artist name and genres', () => {
    render(<ArtistCard artist={mockArtist} />);
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('rock, pop')).toBeInTheDocument();
  });

  it('renders artist image with alt text', () => {
    render(<ArtistCard artist={mockArtist} />);
    const image = screen.getByAltText('Test Artist');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  it('calls onClick handler when clicked', async () => {
    const onClick = vi.fn();
    render(<ArtistCard artist={mockArtist} onClick={onClick} />);
    await userEvent.click(screen.getByText('Test Artist'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders fallback image if no image is provided', () => {
    const artistWithoutImage = { ...mockArtist, images: [] };
    render(<ArtistCard artist={artistWithoutImage} />);
    const image = screen.getByAltText('Test Artist');
    expect(image).toHaveAttribute('src', '/vercel.svg');
  });
});
