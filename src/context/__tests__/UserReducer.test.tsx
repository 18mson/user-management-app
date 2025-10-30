import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UserProvider } from '../UserProvider';
import { useUserContext } from '../useUserContext';
import type { ReactNode } from 'react';

describe('UserProvider', () => {
  const wrapper = ({ children }: { children: ReactNode }) => <UserProvider>{children}</UserProvider>;

  it('should provide initial state', () => {
    const { result } = renderHook(() => useUserContext(), { wrapper });
    expect(result.current.state.users).toEqual([]);
    expect(result.current.state.loading).toBe(false);
    expect(result.current.state.error).toBeNull();
    expect(result.current.state.selectedUser).toBeNull();
  });

  it('should add a user', () => {
    const { result } = renderHook(() => useUserContext(), { wrapper });

    const newUserData = {
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'jane@example.com',
      phone: '9876543210',
      website: 'example.com',
    };

    act(() => {
      result.current.addUser(newUserData);
    });

    expect(result.current.state.users[0].name).toBe('Jane Doe');
  });

  it('should select a user', () => {
    const { result } = renderHook(() => useUserContext(), { wrapper });

    const user = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '1234567890',
      website: 'example.com',
      address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '0', lng: '0' } },
      company: { name: '', catchPhrase: '', bs: '' },
    };

    act(() => result.current.selectUser(user));

    expect(result.current.state.selectedUser).toEqual(user);
  });
});
