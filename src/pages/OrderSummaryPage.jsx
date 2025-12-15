import { ArrowRight, CheckCircle, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export const OrderSummaryPage = () => {
  const location = useLocation();
  const { order, orderDetails } = location.state || {};

  if (!order) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Link to='/sunday-bazar' className='text-accent hover:underline'>
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className='bg-gray-50 min-h-screen py-16'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
          <div className='bg-green-600 px-8 py-12 text-center text-white'>
            <div className='inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/20 mb-6'>
              <CheckCircle size={32} />
            </div>
            <h1 className='text-3xl font-bold mb-2'>
              Thank You For Your Order!
            </h1>
            <p className='opacity-90'>
              Order #{order.id} has been placed successfully.
            </p>
          </div>

          <div className='p-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-100'>
              <div>
                <h3 className='text-sm font-bold text-gray-400 uppercase tracking-wider mb-2'>
                  Shipping Address
                </h3>
                <p className='text-gray-900 font-medium'>
                  {orderDetails?.firstName} {orderDetails?.lastName}
                </p>
                <p className='text-gray-600'>{orderDetails?.address}</p>
                <p className='text-gray-600'>
                  {orderDetails?.city}, {orderDetails?.zipCode}
                </p>
              </div>
              <div>
                <h3 className='text-sm font-bold text-gray-400 uppercase tracking-wider mb-2'>
                  Payment Method
                </h3>
                <p className='text-gray-900 font-medium'>
                  {orderDetails?.cardName}
                </p>
                <p className='text-gray-600'>
                  Ending in **** {orderDetails?.cardNumber?.slice(-4)}
                </p>
              </div>
            </div>

            <h3 className='text-lg font-bold text-gray-900 mb-6'>
              Order Items
            </h3>
            <div className='space-y-4 mb-8'>
              {order.products.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center justify-between'
                >
                  <div className='flex items-center gap-4'>
                    <div className='h-12 w-12 bg-gray-100 rounded flex items-center justify-center text-gray-400'>
                      <ShoppingBag size={20} />
                    </div>
                    <div>
                      <p className='text-gray-900 font-medium'>{item.title}</p>
                      <p className='text-sm text-gray-500'>
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className='font-bold text-gray-900'>
                    ${item.total.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className='bg-gray-50 rounded-xl p-6'>
              <div className='flex justify-between text-gray-600 mb-2'>
                <span>Subtotal</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-gray-600 mb-4'>
                <span>Discounted Total</span>
                <span>${order.discountedTotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-200'>
                <span>Grand Total</span>
                <span>${order.discountedTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className='mt-8 text-center'>
              <Link
                to='/shop'
                className='inline-flex items-center text-accent font-bold hover:underline'
              >
                Continue Shopping <ArrowRight size={18} className='ml-2' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
