import {
  Bell,
  Lock,
  MapPin,
  Package,
  Settings,
  Trash2,
  User,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router';
import { logout } from '../store/slices/authSlice';

export const UserSettingsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
                className='flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors'
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
                className='flex items-center gap-3 px-4 py-3 bg-gray-50 text-accent font-medium rounded-lg'
              >
                <Settings size={18} /> Settings
              </Link>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 space-y-8'>
          {/* Account Security */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8'>
            <div className='flex items-center gap-3 mb-6'>
              <Lock className='text-accent' size={24} />
              <h2 className='text-xl font-bold text-gray-900'>Security</h2>
            </div>

            <form className='max-w-md space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Current Password
                </label>
                <input
                  type='password'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  New Password
                </label>
                <input
                  type='password'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Confirm New Password
                </label>
                <input
                  type='password'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent'
                />
              </div>
              <button className='px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-accent transition-colors text-sm font-medium'>
                Update Password
              </button>
            </form>
          </div>

          {/* Notifications */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8'>
            <div className='flex items-center gap-3 mb-6'>
              <Bell className='text-accent' size={24} />
              <h2 className='text-xl font-bold text-gray-900'>Notifications</h2>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center justify-between py-2'>
                <div>
                  <h3 className='font-medium text-gray-900'>Order Updates</h3>
                  <p className='text-sm text-gray-500'>
                    Receive emails about your order status
                  </p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    className='sr-only peer'
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
              <div className='flex items-center justify-between py-2 border-t border-gray-100'>
                <div>
                  <h3 className='font-medium text-gray-900'>Promotions</h3>
                  <p className='text-sm text-gray-500'>
                    Receive emails about new products and sales
                  </p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input type='checkbox' className='sr-only peer' />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className='bg-red-50 rounded-xl border border-red-100 p-8'>
            <div className='flex items-center gap-3 mb-6'>
              <Trash2 className='text-red-600' size={24} />
              <h2 className='text-xl font-bold text-red-700'>Danger Zone</h2>
            </div>
            <p className='text-red-600 mb-6 text-sm'>
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button
              onClick={() => dispatch(logout())}
              className='px-6 py-2 border border-red-200 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium'
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
