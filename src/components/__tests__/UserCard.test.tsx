import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from '../UserCard';
import type { User } from '../../types/user';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockUser: User = {
  id: 1,
  name: 'dalih',
  username: 'dalih',
  email: 'dalih@example.com',
  phone: '123-456-7890',
  website: 'example.com',
  address: {
    street: 'Main St',
    suite: 'Apt. 1',
    city: 'Cityville',
    zipcode: '12345',
    geo: {
      lat: '0.0000',
      lng: '0.0000',
    },
  },
  company: {
    name: 'aremcy Corp',
    catchPhrase: 'We build stuff',
    bs: 'business stuff',
  },
};

describe('UserCard', () => {
  const mockOnView = vi.fn();
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders user information correctly', () => {
    render(
      <UserCard
        user={mockUser}
        onView={mockOnView}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('dalih')).toBeInTheDocument();
    expect(screen.getByText('@dalih')).toBeInTheDocument();
    expect(screen.getByText('dalih@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('example.com')).toBeInTheDocument();
    expect(screen.getByText('Cityville')).toBeInTheDocument();
  });

  it('calls onView when View button is clicked', () => {
    render(
      <UserCard
        user={mockUser}
        onView={mockOnView}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText('View'));
    expect(mockOnView).toHaveBeenCalledWith(mockUser);
  });

  it('calls onEdit when Edit button is clicked', () => {
    render(
      <UserCard
        user={mockUser}
        onView={mockOnView}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });

  it('calls onDelete when Delete button is clicked', () => {
    render(
      <UserCard
        user={mockUser}
        onView={mockOnView}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockUser.id);
  });

  it('displays profile image with correct src', () => {
    render(
      <UserCard
        user={mockUser}
        onView={mockOnView}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const image = screen.getByAltText("dalih's profile");
    expect(image).toHaveAttribute('src', 'https://picsum.photos/seed/1/150/150');
  });
});