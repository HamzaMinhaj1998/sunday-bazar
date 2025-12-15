import { MapPin, Package, Settings, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router';
import { useGetUserOrdersQuery } from '../store/api/apiSlice';

export const UserOrdersPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: orders, isLoading } = useGetUserOrdersQuery(user?.id || 0, {
    skip: !user,
  });

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
                className='flex items-center gap-3 px-4 py-3 bg-gray-50 text-accent font-medium rounded-lg'
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
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>
            Order History
          </h2>

          {isLoading ? (
            <div className='space-y-4'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='h-40 bg-gray-100 animate-pulse rounded-xl'
                ></div>
              ))}
            </div>
          ) : !orders || orders.carts.length === 0 ? (
            <div className='text-center py-12 bg-white rounded-xl border border-gray-200'>
              <Package size={48} className='mx-auto text-gray-300 mb-4' />
              <h3 className='text-lg font-medium text-gray-900'>
                No orders yet
              </h3>
              <Link
                to='/shop'
                className='text-accent hover:underline mt-2 inline-block'
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className='space-y-6'>
              {orders.carts.map((order) => (
                <div
                  key={order.id}
                  className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'
                >
                  <div className='px-6 py-4 bg-gray-50 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4'>
                    <div>
                      <span className='text-sm text-gray-500'>Order ID</span>
                      <p className='font-bold text-gray-900'>#{order.id}</p>
                    </div>
                    <div>
                      <span className='text-sm text-gray-500'>Date</span>
                      <p className='font-bold text-gray-900'>
                        Nov 20, 2024
                      </p>{' '}
                      {/* Dummy date */}
                    </div>
                    <div>
                      <span className='text-sm text-gray-500'>
                        Total Amount
                      </span>
                      <p className='font-bold text-gray-900'>
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span className='px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700'>
                        Delivered
                      </span>
                    </div>
                  </div>

                  <div className='p-6'>
                    <div className='space-y-4'>
                      {order.products.map((item) => (
                        <div
                          key={item.id}
                          className='flex items-center justify-between'
                        >
                          <div className='flex items-center gap-4'>
                            <div className='w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-500'>
                              Img
                            </div>
                            <div>
                              <h4 className='font-medium text-gray-900'>
                                {item.title}
                              </h4>
                              <p className='text-sm text-gray-500'>
                                Qty: {item.quantity} × ${item.price}
                              </p>
                            </div>
                          </div>
                          <span className='font-bold text-gray-900'>
                            ${item.total.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
