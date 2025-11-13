import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { useRouter } from 'next/router';
import { vi } from 'vitest';

// Mock the useRouter hook
vi.mock('next/router', () => ({
  useRouter: vi.fn()
}));

describe('Sidebar', () => {
  it('renders all navigation links', () => {
    (useRouter as vi.Mock).mockReturnValue({ pathname: '/' });
    render(<Sidebar />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Top Artists')).toBeInTheDocument();
    expect(screen.getByText('Top Tracks')).toBeInTheDocument();
    expect(screen.getByText('Playlists')).toBeInTheDocument();
    expect(screen.getByText('Recently Played')).toBeInTheDocument();
    expect(screen.getByText('Wrapped')).toBeInTheDocument();
  });

  it('highlights the active link', () => {
    (useRouter as vi.Mock).mockReturnValue({ pathname: '/profile' });
    render(<Sidebar />);
    const profileLink = screen.getByText('Profile').closest('a');
    expect(profileLink).toHaveClass('bg-gray-700');
  });

  it('does not highlight inactive links', () => {
    (useRouter as vi.Mock).mockReturnValue({ pathname: '/profile' });
    render(<Sidebar />);
    const topArtistsLink = screen.getByText('Top Artists').closest('a');
    expect(topArtistsLink).not.toHaveClass('bg-gray-700');
  });
});
