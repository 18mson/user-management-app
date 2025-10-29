import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import type { User, CreateUserData } from '../types/user';

interface BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

interface AddUserFormProps extends BaseProps {
  user?: null;
  onSubmit: (userData: CreateUserData) => void;
}

interface EditUserFormProps extends BaseProps {
  user: User | null;
  onSubmit: (userData: User) => void;
}

type UserFormProps = AddUserFormProps | EditUserFormProps;

const UserForm: React.FC<UserFormProps> = ({
  user,
  isOpen,
  onClose,
  onSubmit,
  title,
}) => {
  const [formData, setFormData] = useState<CreateUserData>({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
  });

  const [errors, setErrors] = useState<Partial<CreateUserData>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
      });
    } else {
      setFormData({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
      });
    }
    setErrors({});
  }, [user, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateUserData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (user) {
      const updatedUser: User = {
        ...user,
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
      };

      (onSubmit as (u: User) => void)(updatedUser);
    } else {
      (onSubmit as (d: CreateUserData) => void)(formData);
    }

    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof CreateUserData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-500/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md p-6 mx-4 bg-white rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Name *', name: 'name', type: 'text', placeholder: 'Enter full name' },
            { label: 'Username *', name: 'username', type: 'text', placeholder: 'Enter username' },
            { label: 'Email *', name: 'email', type: 'email', placeholder: 'Enter email address' },
            { label: 'Phone *', name: 'phone', type: 'tel', placeholder: 'Enter phone number' },
            { label: 'Website', name: 'website', type: 'text', placeholder: 'Enter website URL' },
          ].map(field => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof CreateUserData] ?? ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[field.name as keyof CreateUserData]
                    ? 'border-red-300'
                    : 'border-gray-300'
                }`}
              />
              {errors[field.name as keyof CreateUserData] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[field.name as keyof CreateUserData]}
                </p>
              )}
            </div>
          ))}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
            >
              {user ? 'Update' : 'Add'} User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
