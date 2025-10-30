// UserList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import UserList from '../UserList';
import type { User } from '../../types/user';
import type { UserContextValue } from '../../context/UserContext';

// ---------------- Mock Child Components ----------------
vi.mock('./UserCard', () => ({
  default: (props: { user: User; onView: (u: User) => void; onEdit: (u: User) => void; onDelete: (id: number) => void }) => (
    <div data-testid={`user-card-${props.user.id}`}>
      <span>{props.user.name}</span>
      <button onClick={() => props.onView(props.user)}>View</button>
      <button onClick={() => props.onEdit(props.user)}>Edit</button>
      <button onClick={() => props.onDelete(props.user.id)}>Delete</button>
    </div>
  ),
}));

vi.mock('./UserModal', () => ({
  default: (props: { isOpen: boolean }) => (props.isOpen ? <div>Modal Open</div> : null),
}));

vi.mock('./UserForm', () => ({
  default: (props: { isOpen: boolean; title: string }) => (props.isOpen ? <div>{props.title}</div> : null),
}));

vi.mock('./DeleteConfirmModal', () => ({
  default: (props: { isOpen: boolean }) => (props.isOpen ? <div>Delete Modal Open</div> : null),
}));

vi.mock('./LoadingSpinner', () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock('./ErrorMessage', () => ({
  default: (props: { message: string; onRetry?: () => void }) => <div>Error: {props.message}</div>,
}));

// ---------------- Mock Context ----------------
const mockContext: UserContextValue = {
  state: {
    users: [],
    loading: false,
    error: null,
    selectedUser: null,
  },
  dispatch: vi.fn(),
  fetchUsers: vi.fn(),
  addUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
  selectUser: vi.fn(),
};

vi.mock('../../context/UseUserContext', () => ({
  useUserContext: () => mockContext,
}));

const usersMock: User[] = [
  {
    id: 1,
    name: 'Alice',
    username: 'alice',
    email: 'alice@example.com',
    phone: '123',
    website: 'a.com',
    address: {
      street: '123 Main St',
      suite: 'Apt 1',
      city: 'NY',
      zipcode: '10001',
      geo: { lat: '40.7128', lng: '-74.0060' },
    },
    company: {
      name: 'Company A',
      catchPhrase: 'Catchphrase A',
      bs: 'BS A',
    },
  },
  {
    id: 2,
    name: 'Bob',
    username: 'bob',
    email: 'bob@example.com',
    phone: '456',
    website: 'b.com',
    address: {
      street: '456 Elm St',
      suite: 'Suite 2',
      city: 'LA',
      zipcode: '90001',
      geo: { lat: '34.0522', lng: '-118.2437' },
    },
    company: {
      name: 'Company B',
      catchPhrase: 'Catchphrase B',
      bs: 'BS B',
    },
  },
];

describe('UserList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockContext.state.users = usersMock;
    mockContext.state.loading = false;
    mockContext.state.error = null;
    mockContext.state.selectedUser = null;
  });

  it('calls fetchUsers on mount', () => {
    render(<UserList />);
    expect(mockContext.fetchUsers).toHaveBeenCalled();
  });

  it('renders user cards', () => {
    render(<UserList />);
    expect(screen.getByTestId('user-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('user-card-2')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('filters users based on search input', () => {
    render(<UserList />);
    const input = screen.getByPlaceholderText(/Search users/i);
    fireEvent.change(input, { target: { value: 'bob' } });
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    mockContext.state.loading = true;
    render(<UserList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('opens add user form when Add User button is clicked', () => {
    render(<UserList />);
    fireEvent.click(screen.getAllByText('Add User')[0]);
    expect(screen.getByText('Add New User')).toBeInTheDocument();
  });

  it('opens edit user form when Edit button on card is clicked', () => {
    render(<UserList />);
    const editButton = screen.getByTestId('user-card-1').querySelectorAll('button')[1];
    if (editButton) fireEvent.click(editButton);
    expect(screen.getByText('Edit User')).toBeInTheDocument();
  });

  it('opens delete modal when Delete button on card is clicked', () => {
    render(<UserList />);
    const deleteButton = screen.getByTestId('user-card-1').querySelector('button[data-testid="delete-button"]');
    if (deleteButton) fireEvent.click(deleteButton);
    expect(screen.getByText('Delete User')).toBeInTheDocument();
  });
});
