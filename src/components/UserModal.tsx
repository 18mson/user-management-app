import React from 'react';
import {
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaMapMarkerAlt,
  FaBuilding,
} from 'react-icons/fa';

import type { User } from '../types/user';

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  const profileImage = `https://picsum.photos/seed/${user.id}/200/200`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/70 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 z-10">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="shrink-0 text-center sm:text-left">
            <img
              src={profileImage}
              alt={`${user.name}'s profile`}
              className="w-32 h-32 rounded-lg object-cover mx-auto sm:mx-0 ring-4 ring-blue-50"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-500">@{user.username}</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center text-gray-600">
                <FaEnvelope className="h-5 w-5 mr-3 text-blue-500" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <FaPhone className="h-5 w-5 mr-3 text-green-500" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <FaGlobe className="h-5 w-5 mr-3 text-purple-500" />
                <div>
                  <p className="font-medium">Website</p>
                  <p className="text-sm">{user.website}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="h-5 w-5 mr-3 text-red-500" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm">
                    {user.address.suite}, {user.address.street}
                  </p>
                  <p className="text-sm">
                    {user.address.city}, {user.address.zipcode}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <FaBuilding className="h-5 w-5 mr-3 text-orange-500" />
                <div>
                  <p className="font-medium">Company</p>
                  <p className="text-sm font-medium">{user.company.name}</p>
                  <p className="text-sm italic">{user.company.catchPhrase}</p>
                  <p className="text-sm text-gray-500">{user.company.bs}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default UserModal;