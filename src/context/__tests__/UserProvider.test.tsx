// UserProvider.test.tsx
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserProvider } from '../UserProvider';
import { useUserContext } from '../useUserContext';
import type { User } from '../../types/user';

describe('UserProvider indirect reducer tests', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => <UserProvider>{children}</UserProvider>;

  it('should add a user', () => {
    const { result } = renderHook(() => useUserContext(), { wrapper });

    act(() => {
      result.current.addUser({
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'jane@example.com',
        phone: '9876543210',
        website: 'example.com',
      });
    });

    expect(result.current.state.users).toHaveLength(1);
    expect(result.current.state.users[0].name).toBe('Jane Doe');
  });

  it('should set loading to true when fetching users', () => {
    const { result } = renderHook(() => useUserContext(), { wrapper });

    act(() => {
      result.current.fetchUsers();
    });

    expect(result.current.state.loading).toBe(true);
  });

  it('should set error to null when fetching users is complete', () => {
    const { result } = renderHook(() => useUserContext(), { wrapper });
    act(() => {
      result.current.fetchUsers();
    });

    expect(result.current.state.error).toBeNull();
  });

  it('should set users when fetchUsers succeeds', async () => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '1234567890',
        website: 'example.com',
        address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '0', lng: '0' } },
        company: { name: '', catchPhrase: '', bs: '' },
      },
    ];

    // mock fetch
    (globalThis as typeof globalThis & { fetch: typeof fetch }).fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      } as Response)
    );

    const { result } = renderHook(() => useUserContext(), { wrapper });

    await act(async () => {
      await result.current.fetchUsers();
    });

    expect(result.current.state.users).toEqual(mockUsers);
    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.error).toBeNull();
  });

  it('should update a user', () => {
    const { result } = renderHook(() => useUserContext(), { wrapper });

    // Add user first
    act(() => {
      result.current.addUser({
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'jane@example.com',
        phone: '9876543210',
        website: 'example.com',
      });
    });

    const user = result.current.state.users[0];
    const updatedUser = { ...user, name: 'Jane Updated' };

    act(() => {
      result.current.updateUser(updatedUser);
    });

    expect(result.current.state.users[0].name).toBe('Jane Updated');
  });

  it('should delete a user', () => {
    const { result } = renderHook(() => useUserContext(), { wrapper });

    act(() => {
      result.current.addUser({
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'jane@example.com',
        phone: '9876543210',
        website: 'example.com',
      });
    });

    const userId = result.current.state.users[0].id;

    act(() => {
      result.current.deleteUser(userId);
    });

    expect(result.current.state.users).toHaveLength(0);
  });

  it('should select a user', () => {
    const { result } = renderHook(() => useUserContext(), { wrapper });

    act(() => {
      result.current.addUser({
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'jane@example.com',
        phone: '9876543210',
        website: 'example.com',
      });
    });

    const user = result.current.state.users[0];

    act(() => {
      result.current.selectUser(user);
    });

    expect(result.current.state.selectedUser).toEqual(user);
  });
});
