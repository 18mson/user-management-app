// ErrorMessage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the error message correctly', () => {
    const message = 'Something went wrong!';
    render(<ErrorMessage message={message} />);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();

    // Button should not be rendered if onRetry is not provided
    const button = screen.queryByText('Try Again');
    expect(button).toBeNull();
  });

  it('renders the Try Again button when onRetry is provided', () => {
    const onRetry = vi.fn();
    const message = 'Network error';
    render(<ErrorMessage message={message} onRetry={onRetry} />);

    const button = screen.getByText('Try Again');
    expect(button).toBeInTheDocument();
  });

  it('calls onRetry when Try Again button is clicked', () => {
    const onRetry = vi.fn();
    render(<ErrorMessage message="Error happened" onRetry={onRetry} />);

    const button = screen.getByText('Try Again');
    fireEvent.click(button);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
