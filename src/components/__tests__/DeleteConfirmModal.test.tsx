// DeleteConfirmModal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import DeleteConfirmModal from '../DeleteConfirmModal';
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

describe('DeleteConfirmModal', () => {
  it('does not render when isOpen is false or user is null', () => {
    const { container, rerender } = render(
      <DeleteConfirmModal
        user={null}
        isOpen={false}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />
    );
    expect(container.firstChild).toBeNull();

    // isOpen true but user null
    rerender(
      <DeleteConfirmModal
        user={null}
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders modal with user info when open', () => {
    render(
      <DeleteConfirmModal
        user={mockUser}
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />
    );

    // Check user name and username
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(`@${mockUser.username}`)).toBeInTheDocument();

    // Check confirmation text
    expect(
      screen.getByText(/Are you sure you want to delete this user/i)
    ).toBeInTheDocument();

    // Check profile image src
    const img = screen.getByAltText(`${mockUser.name}'s profile`) as HTMLImageElement;
    expect(img.src).toContain(`https://picsum.photos/seed/${mockUser.id}/100/100`);

    // Check buttons
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
  });



  it('calls onClose when clicking Cancel or Close button', () => {
    const onClose = vi.fn();
    render(
      <DeleteConfirmModal
        user={mockUser}
        isOpen={true}
        onClose={onClose}
        onConfirm={vi.fn()}
      />
    );

    // Click Cancel button
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);

    // Click Close (X) button
    const closeButton = screen.getByTestId('close-delete-modal-button');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('calls onConfirm and onClose when clicking Confirm Delete button', () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();
    render(
      <DeleteConfirmModal
        user={mockUser}
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    );

    const confirmButton = screen.getByText('Confirm Delete');
    fireEvent.click(confirmButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
