import React, { useReducer, type ReactNode } from 'react';
import { UserContext } from './UserContext';
import type { User, CreateUserData } from '../types/user';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
}

type UserAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SELECTED_USER'; payload: User | null }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: number };

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SELECTED_USER':
      return { ...state, selectedUser: action.payload };
    case 'ADD_USER':
      return { ...state, users: [action.payload, ...state.users] };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(u => (u.id === action.payload.id ? action.payload : u)),
        selectedUser:
          state.selectedUser?.id === action.payload.id ? action.payload : state.selectedUser,
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(u => u.id !== action.payload),
        selectedUser: state.selectedUser?.id === action.payload ? null : state.selectedUser,
      };
    default:
      return state;
  }
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUsers = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const users: User[] = await res.json();
      dispatch({ type: 'SET_USERS', payload: users });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err instanceof Error ? err.message : 'An error occurred',
      });
    }
  };

  const addUser = (userData: CreateUserData) => {
    const newUser: User = {
      id: Date.now(),
      ...userData,
      address: {
        street: 'N/A',
        suite: 'N/A',
        city: 'N/A',
        zipcode: 'N/A',
        geo: { lat: '0', lng: '0' },
      },
      company: { name: 'N/A', catchPhrase: 'N/A', bs: 'N/A' },
    };
    dispatch({ type: 'ADD_USER', payload: newUser });
  };

  const updateUser = (user: User) => dispatch({ type: 'UPDATE_USER', payload: user });
  const deleteUser = (id: number) => dispatch({ type: 'DELETE_USER', payload: id });
  const selectUser = (user: User | null) => dispatch({ type: 'SET_SELECTED_USER', payload: user });

  return (
    <UserContext.Provider
      value={{ state, dispatch, fetchUsers, addUser, updateUser, deleteUser, selectUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
