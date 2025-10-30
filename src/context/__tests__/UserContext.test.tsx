import { render, screen, act } from '@testing-library/react';
import { useContext } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { UserContext, type UserContextValue } from '../UserContext';
import type { User, CreateUserData } from '../../types/user';

const mockUser: User = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
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
    name: 'Acme Corp',
    catchPhrase: 'We build stuff',
    bs: 'business stuff',
  },
};

const mockUserData: CreateUserData = {
  name: 'Jane Doe',
  username: 'janedoe',
  email: 'jane@example.com',
  phone: '987-654-3210',
  website: 'example.org',
};

function TestComponent() {
  const context = useContext(UserContext);

  if (!context) return <div>No Context</div>;

  return (
    <div>
      <span data-testid="user-count">{context.state.users.length}</span>
      <button onClick={() => context.addUser(mockUserData)}>Add User</button>
    </div>
  );
}

const mockDispatch = vi.fn();
const mockFetchUsers = vi.fn();
const mockAddUser = vi.fn();
const mockUpdateUser = vi.fn();
const mockDeleteUser = vi.fn();
const mockSelectUser = vi.fn();

const mockContext: UserContextValue = {
  state: { users: [mockUser], loading: false, error: null, selectedUser: null },
  dispatch: mockDispatch,
  fetchUsers: mockFetchUsers,
  addUser: mockAddUser,
  updateUser: mockUpdateUser,
  deleteUser: mockDeleteUser,
  selectUser: mockSelectUser,
};

describe('UserContext', () => {
  it('renders initial users and calls addUser', async () => {
    render(
      <UserContext.Provider value={mockContext}>
        <TestComponent />
      </UserContext.Provider>
    );

    // Check initial user count
    const userCount = screen.getByTestId('user-count');
    expect(userCount.textContent).toBe('1');

    // Click add user
    const addButton = screen.getByText(/Add User/i);
    await act(() => addButton.click());

    // Expect addUser to be called
    expect(mockAddUser).toHaveBeenCalledWith({
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'jane@example.com',
      phone: '987-654-3210',
      website: 'example.org',
    });
  });
});
