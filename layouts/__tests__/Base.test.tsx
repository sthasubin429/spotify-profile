import { render, screen } from '@testing-library/react';
import Base from '../../layouts/Base';
import { vi } from 'vitest';

// Mock the Sidebar component
vi.mock('../../components/Sidebar', () => ({
  default: () => <div data-testid="sidebar" />
}));

describe('Base layout', () => {
  it('shows Sidebar when authenticated', () => {
    render(
      <Base isAuthenticated={true}>
        <div>Child content</div>
      </Base>
    );
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('hides Sidebar when not authenticated', () => {
    render(
      <Base isAuthenticated={false}>
        <div>Child content</div>
      </Base>
    );
    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
  });

  it('applies margin to main content when Sidebar is shown', () => {
    render(
      <Base isAuthenticated={true}>
        <div>Child content</div>
      </Base>
    );
    const mainElement = screen.getByText('Child content').closest('main');
    expect(mainElement).toHaveClass('ml-64');
  });

  it('does not apply margin to main content when Sidebar is hidden', () => {
    render(
      <Base isAuthenticated={false}>
        <div>Child content</div>
      </Base>
    );
    const mainElement = screen.getByText('Child content').closest('main');
    expect(mainElement).not.toHaveClass('ml-64');
  });
});
