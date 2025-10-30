// UserForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import UserForm from '../UserForm';
import type { User } from '../../types/user';

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

describe('UserForm', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <UserForm
        isOpen={false}
        title="Add User"
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders empty form for adding user', () => {
    render(
      <UserForm
        isOpen={true}
        title="Add User"
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByTestId('input-name')).toHaveValue('');
    expect(screen.getByTestId('input-username')).toHaveValue('');
    expect(screen.getByTestId('input-email')).toHaveValue('');
    expect(screen.getByTestId('input-phone')).toHaveValue('');
    expect(screen.getByTestId('input-website')).toHaveValue('');
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('renders form with user data for editing', () => {
    render(
      <UserForm
        isOpen={true}
        title="Edit User"
        user={mockUser}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByTestId('input-name')).toHaveValue(mockUser.name);
    expect(screen.getByTestId('input-username')).toHaveValue(mockUser.username);
    expect(screen.getByTestId('input-email')).toHaveValue(mockUser.email);
    expect(screen.getByTestId('input-phone')).toHaveValue(mockUser.phone);
    expect(screen.getByTestId('input-website')).toHaveValue(mockUser.website);
    expect(screen.getByText('Update User')).toBeInTheDocument();
  });

  it('shows validation errors when required fields are empty', () => {
    render(
      <UserForm
        isOpen={true}
        title="Add User"
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    fireEvent.click(screen.getByTestId('submit-button'));

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Phone is required')).toBeInTheDocument();
  });

  it('calls onSubmit and onClose when form is valid (add)', () => {
    const onSubmit = vi.fn();
    const onClose = vi.fn();

    render(
      <UserForm
        isOpen={true}
        title="Add User"
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByTestId('input-username'), { target: { value: 'jane123' } });
    fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByTestId('input-phone'), { target: { value: '555-1234' } });
    fireEvent.change(screen.getByTestId('input-website'), { target: { value: 'example.com' } });

    fireEvent.click(screen.getByTestId('submit-button'));

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Jane',
      username: 'jane123',
      email: 'jane@example.com',
      phone: '555-1234',
      website: 'example.com',
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit and onClose when form is valid (edit)', () => {
    const onSubmit = vi.fn();
    const onClose = vi.fn();

    render(
      <UserForm
        isOpen={true}
        title="Edit User"
        user={mockUser}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'dalih Updated' } });
    fireEvent.click(screen.getByText('Update User'));

    expect(onSubmit).toHaveBeenCalledWith({
      ...mockUser,
      name: 'dalih Updated',
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Cancel button is clicked', () => {
    const onClose = vi.fn();
    render(
      <UserForm
        isOpen={true}
        title="Add User"
        onClose={onClose}
        onSubmit={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
