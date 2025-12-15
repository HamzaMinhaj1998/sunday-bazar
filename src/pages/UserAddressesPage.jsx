import {
  Edit2,
  MapPin,
  Package,
  Plus,
  Settings,
  Trash2,
  User,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router';

export const UserAddressesPage = () => {
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
                className='flex items-center gap-3 px-4 py-3 bg-gray-50 text-accent font-medium rounded-lg'
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
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-gray-900'>My Addresses</h2>
            <button className='flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-accent transition-colors text-sm font-medium'>
              <Plus size={16} /> Add New Address
            </button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Main Address (from DummyJSON user) */}
            {/* DummyJSON doesn't give full address in login response often, but assuming we might have it or static fallback */}
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative group'>
              <div className='absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                <button className='p-2 text-gray-400 hover:text-accent'>
                  <Edit2 size={16} />
                </button>
                <button className='p-2 text-gray-400 hover:text-red-500'>
                  <Trash2 size={16} />
                </button>
              </div>
              <div className='flex items-center gap-2 mb-4'>
                <span className='bg-blue-100 text-accent text-xs font-bold px-2 py-1 rounded'>
                  DEFAULT
                </span>
                <h3 className='font-bold text-gray-900'>Home</h3>
              </div>
              <div className='text-gray-600 space-y-1 text-sm'>
                <p className='font-medium text-gray-900'>
                  {user.firstName} {user.lastName}
                </p>
                <p>123 Main Street</p>
                <p>Apt 4B</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
                <p className='mt-2'>+1 (555) 123-4567</p>
              </div>
            </div>

            {/* Mock Secondary Address */}
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative group'>
              <div className='absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                <button className='p-2 text-gray-400 hover:text-accent'>
                  <Edit2 size={16} />
                </button>
                <button className='p-2 text-gray-400 hover:text-red-500'>
                  <Trash2 size={16} />
                </button>
              </div>
              <div className='flex items-center gap-2 mb-4'>
                <h3 className='font-bold text-gray-900'>Office</h3>
              </div>
              <div className='text-gray-600 space-y-1 text-sm'>
                <p className='font-medium text-gray-900'>
                  {user.firstName} {user.lastName}
                </p>
                <p>456 Business Blvd</p>
                <p>Suite 200</p>
                <p>San Francisco, CA 94107</p>
                <p>United States</p>
                <p className='mt-2'>+1 (555) 987-6543</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
