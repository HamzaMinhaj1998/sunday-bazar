import { ArrowLeft, Check, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import {
  clearCart,
  removeFromCart,
  selectCartTotals,
  updateQuantity,
} from '../store/slices/cartSlice';

export const CartPage = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { subtotal, shipping, tax, total } = useSelector(selectCartTotals);

  if (items.length === 0) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold mb-4'>Your Cart is Empty</h1>
        <Link
          to='/shop'
          className='text-accent hover:underline flex items-center gap-2'
        >
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>Shopping Cart</h1>

      <div className='flex flex-col lg:flex-row gap-12'>
        <div className='flex-1'>
          <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='py-4 px-6 text-left text-sm font-semibold text-gray-900'>
                    Product
                  </th>
                  <th className='py-4 px-6 text-left text-sm font-semibold text-gray-900'>
                    Price
                  </th>
                  <th className='py-4 px-6 text-left text-sm font-semibold text-gray-900'>
                    Quantity
                  </th>
                  <th className='py-4 px-6 text-right text-sm font-semibold text-gray-900'>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className='py-6 px-6'>
                      <div className='flex items-center gap-4'>
                        <div className='h-20 w-20 rounded-lg overflow-hidden border border-gray-200'>
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className='h-full w-full object-cover'
                          />
                        </div>
                        <div>
                          <h3 className='font-medium text-gray-900 line-clamp-1'>
                            {item.title}
                          </h3>
                          <p className='text-sm text-gray-500'>{item.brand}</p>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className='text-red-500 text-sm mt-1 hover:underline flex items-center gap-1'
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className='py-6 px-6 text-gray-600'>${item.price}</td>
                    <td className='py-6 px-6'>
                      <div className='inline-flex items-center border border-gray-300 rounded-md'>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity - 1,
                              }),
                            )
                          }
                          className='px-3 py-1 hover:bg-gray-100 text-gray-600'
                        >
                          -
                        </button>
                        <span className='px-2 font-medium'>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              }),
                            )
                          }
                          className='px-3 py-1 hover:bg-gray-100 text-gray-600'
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className='py-6 px-6 text-right font-bold text-gray-900'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='mt-6 flex justify-between items-center'>
            <Link
              to='/shop'
              className='flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium'
            >
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
            <button
              onClick={() => dispatch(clearCart())}
              className='text-red-500 hover:text-red-700 font-medium'
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className='w-full lg:w-96 shrink-0'>
          <div className='bg-gray-50 p-6 rounded-xl border border-gray-200'>
            <h2 className='text-lg font-bold text-gray-900 mb-6'>
              Order Summary
            </h2>

            <div className='space-y-4 mb-6'>
              <div className='flex justify-between text-gray-600'>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-gray-600'>
                <span>Shipping Estimate</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              <div className='flex justify-between text-gray-600'>
                <span>Tax Estimate</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className='border-t border-gray-200 pt-4 mb-6'>
              <div className='flex justify-between text-lg font-bold text-gray-900'>
                <span>Order Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className='w-full bg-gray-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-accent transition-colors shadow-lg'
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>

            <div className='mt-6 flex items-center justify-center gap-2 text-sm text-gray-500'>
              <Check size={14} className='text-green-500' /> Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
