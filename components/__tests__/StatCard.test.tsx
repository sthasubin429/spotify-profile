import { render, screen } from '@testing-library/react';
import StatCard from '../StatCard';

describe('StatCard', () => {
  it('renders the value and label', () => {
    render(<StatCard value="123" label="Test Label" />);
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<StatCard value="1" label="Label" size="sm" />);
    expect(
      screen.getByText('1').parentElement.parentElement.parentElement
    ).toHaveClass('p-2');

    rerender(<StatCard value="1" label="Label" size="md" />);
    expect(
      screen.getByText('1').parentElement.parentElement.parentElement
    ).toHaveClass('p-4');

    rerender(<StatCard value="1" label="Label" size="lg" />);
    expect(
      screen.getByText('1').parentElement.parentElement.parentElement
    ).toHaveClass('p-6');
  });

  it('renders an icon if provided', () => {
    render(
      <StatCard value="1" label="Label" icon={<div data-testid="icon" />} />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
