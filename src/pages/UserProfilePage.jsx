import { MapPin, Package, Settings, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router';

export const UserProfilePage = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to='/login' />;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='flex flex-col md:flex-row gap-8'>
        {/* Sidebar */}
        <div className='w-full md:w-64 shrink-0'>
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
            <div className='p-6 text-center border-b border-gray-100'>
              <img
                src={user.image}
                alt={user.username}
                className='w-20 h-20 rounded-full mx-auto mb-4 border-2 border-accent'
              />
              <h3 className='font-bold text-gray-900'>
                {user.firstName} {user.lastName}
              </h3>
              <p className='text-sm text-gray-500'>{user.email}</p>
            </div>
            <nav className='p-4 space-y-1'>
              <Link
                to='/profile'
                className='flex items-center gap-3 px-4 py-3 bg-gray-50 text-accent font-medium rounded-lg'
              >
                <User size={18} /> My Profile
              </Link>
              <Link
                to='/orders'
                className='flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors'
              >
                <Package size={18} /> My Orders
              </Link>
              <Link
                to='/addresses'
                className='flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors'
              >
                <MapPin size={18} /> Addresses
              </Link>
              <Link
                to='/settings'
                className='flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors'
              >
                <Settings size={18} /> Settings
              </Link>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className='flex-1'>
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Personal Information
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div>
                <label className='block text-sm font-medium text-gray-500 mb-1'>
                  First Name
                </label>
                <div className='p-3 bg-gray-50 rounded-lg text-gray-900'>
                  {user.firstName}
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-500 mb-1'>
                  Last Name
                </label>
                <div className='p-3 bg-gray-50 rounded-lg text-gray-900'>
                  {user.lastName}
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-500 mb-1'>
                  Email Address
                </label>
                <div className='p-3 bg-gray-50 rounded-lg text-gray-900'>
                  {user.email}
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-500 mb-1'>
                  Username
                </label>
                <div className='p-3 bg-gray-50 rounded-lg text-gray-900'>
                  {user.username}
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-500 mb-1'>
                  Gender
                </label>
                <div className='p-3 bg-gray-50 rounded-lg text-gray-900 capitalize'>
                  {user.gender}
                </div>
              </div>
            </div>

            <div className='mt-8 pt-8 border-t border-gray-100'>
              <button className='px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-accent transition-colors'>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
