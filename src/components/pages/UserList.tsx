
import { useEffect, useState } from 'react';
import { FaPlus, FaSearch, FaUsers } from 'react-icons/fa';
import { useUserContext } from '../../context/useUserContext';
import UserCard from '../UserCard';
import UserModal from '../UserModal';
import UserForm from '../UserForm';
import DeleteConfirmModal from '../DeleteConfirmModal';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import type { CreateUserData, User } from '../../types/user';
import { toast } from 'react-hot-toast';

export default function UserList() {
  const {
    state: { users, loading, error, selectedUser },
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    selectUser,
  } = useUserContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredUsers = users.filter(user => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term)
    );
  });

  const handleDeleteUser = (id: number) => {
    const user = users.find(u => u.id === id);
    if (user) setDeletingUser(user);
  };

  const confirmDeleteUser = async () => {
    if (deletingUser) {
      await deleteUser(deletingUser.id);
      toast.success('User deleted successfully!');
      setDeletingUser(null);
    }
  };

  const handleAddUser = async (userData: CreateUserData) => {
    await addUser(userData);
    toast.success('User added successfully!');
    setShowAddForm(false);
  };

  const handleUpdateUser = async (userData: User) => {
    await updateUser(userData);
    toast.success('User updated successfully!');
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex items-center mb-4">
            <FaUsers className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              User Management
            </h1>
          </div>
          <p className="text-gray-600">
            Manage your users with full CRUD operations
          </p>
        </header>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search users by name, email, or username..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <FaPlus className="h-5 w-5" />
            Add User
          </button>
        </div>

        {loading && <LoadingSpinner />}
        {error && !loading && (
          <ErrorMessage message={error} onRetry={fetchUsers} />
        )}

        {!loading && !error && (
          <>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </div>

            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredUsers.map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onView={selectUser}
                    onEdit={setEditingUser}
                    onDelete={handleDeleteUser}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaUsers className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No users found
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm
                    ? 'No users match your search criteria.'
                    : 'Get started by adding your first user.'}
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
                  >
                    <FaPlus className="h-5 w-5" />
                    Add User
                  </button>
                )}
              </div>
            )}
          </>
        )}

        <UserModal
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => selectUser(null)}
        />

        <UserForm
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddUser}
          title="Add New User"
        />

        <UserForm
          user={editingUser}
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          onSubmit={handleUpdateUser}
          title="Edit User"
        />

        <DeleteConfirmModal
          user={deletingUser}
          isOpen={!!deletingUser}
          onClose={() => setDeletingUser(null)}
          onConfirm={confirmDeleteUser}
        />
      </div>
    </div>
  );
}