import React from 'react';
import { FaPhone, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import type { User as UserType } from '../types/user';
import { IoIosMail } from "react-icons/io";

interface UserCardProps {
  user: UserType;
  onView: (user: UserType) => void;
  onEdit: (user: UserType) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onView,
  onEdit,
  onDelete,
}) => {
  const profileImage = `https://picsum.photos/seed/${user.id}/150/150`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-100" data-testid={`user-card-${user.id}`}>
      <div className="flex flex-col items-center text-center mb-4">
        <img
          src={profileImage}
          alt={`${user.name}'s profile`}
          className="w-16 h-16 rounded-full object-cover mb-3 ring-2 ring-blue-100"
        />
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {user.name}
        </h3>
        <p className="text-sm text-gray-500">@{user.username}</p>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <IoIosMail className="h-4 w-4 mr-2 text-gray-400" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FaPhone className="h-4 w-4 mr-2 text-gray-400" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FaGlobe className="h-4 w-4 mr-2 text-gray-400" />
          <span className="truncate">{user.website}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FaMapMarkerAlt className="h-4 w-4 mr-2 text-gray-400" />
          <span className="truncate">{user.address.city}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          data-testid="view-button"
          onClick={() => onView(user)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
        >
          View
        </button>
        <button
          data-testid="edit-button"
          onClick={() => onEdit(user)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md text-sm font-medium transition-colors"
        >
          Edit
        </button>
        <button
          data-testid="delete-button"
          onClick={() => onDelete(user.id)}
          className="bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded-md text-sm font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;