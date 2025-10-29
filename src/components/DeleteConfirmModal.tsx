import React from 'react';
import { FaTimes, FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import type { User } from '../types/user';

interface DeleteConfirmModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  user,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !user) return null;

  const profileImage = `https://picsum.photos/seed/${user.id}/100/100`;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-500/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md p-6 mx-4 bg-white rounded-2xl shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <div className="shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="ml-3 text-lg font-semibold text-gray-900">
              Delete User
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-4">
            <img
              src={profileImage}
              alt={`${user.name}'s profile`}
              className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-gray-100"
            />
            <div>
              <h3 className="font-medium text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>
          <p className="text-gray-600">
            Are you sure you want to delete this user? This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors flex items-center justify-center gap-2"
          >
            <FaTrash className="h-4 w-4" />
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
