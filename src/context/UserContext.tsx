import { createContext } from 'react';
import type { User, CreateUserData } from '../types/user';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
}

export type UserAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SELECTED_USER'; payload: User | null }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: number };

export interface UserContextValue {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  fetchUsers: () => Promise<void>;
  addUser: (userData: CreateUserData) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: number) => void;
  selectUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextValue | null>(null);