import type { User } from './user';

export type UsersContextType = {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (u: Omit<User, 'id'>) => void;
  editUser: (u: User) => void;
  deleteUser: (id: number) => void;
  setUsers: (users: User[]) => void;
};