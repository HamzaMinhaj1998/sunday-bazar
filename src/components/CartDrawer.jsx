import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  removeFromCart,
  selectCartTotals,
  toggleCart,
  updateQuantity,
} from '../store/slices/cartSlice';

export const CartDrawer = () => {
  const { items, isOpen } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { subtotal } = useSelector(selectCartTotals);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className='fixed inset-0 z-60 overflow-hidden'>
        <div
          className='absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity'
          onClick={() => dispatch(toggleCart())}
        />
        <Motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className='absolute inset-y-0 right-0 max-w-md w-full flex'
        >
          <div className='h-full w-full bg-white shadow-xl flex flex-col'>
            <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
              <h2 className='text-lg font-semibold text-gray-900 flex items-center'>
                <ShoppingBag className='mr-2' size={20} />
                Your Cart ({items.length})
              </h2>
              <button
                onClick={() => dispatch(toggleCart())}
                className='text-gray-400 hover:text-gray-500 transition-colors'
              >
                <X size={24} />
              </button>
            </div>

            <div className='flex-1 overflow-y-auto p-6'>
              {items.length === 0 ? (
                <div className='h-full flex flex-col items-center justify-center text-center space-y-4'>
                  <div className='bg-gray-50 p-6 rounded-full'>
                    <ShoppingBag size={48} className='text-gray-300' />
                  </div>
                  <p className='text-gray-500 text-lg'>Your cart is empty</p>
                  <button
                    onClick={() => {
                      dispatch(toggleCart());
                      navigate('/shop');
                    }}
                    className='text-accent font-medium hover:underline'
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className='space-y-6'>
                  {items.map((item) => (
                    <div key={item.id} className='flex gap-4'>
                      <div className='h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200'>
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div className='flex flex-1 flex-col'>
                        <div>
                          <div className='flex justify-between text-base font-medium text-gray-900'>
                            <h3 className='line-clamp-2 pr-4'>{item.title}</h3>
                            <p className='ml-4'>
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <p className='mt-1 text-sm text-gray-500'>
                            {item.brand}
                          </p>
                        </div>
                        <div className='flex flex-1 items-end justify-between text-sm'>
                          <div className='flex items-center border border-gray-200 rounded-md'>
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    quantity: item.quantity - 1,
                                  }),
                                )
                              }
                              className='p-1 hover:bg-gray-100 text-gray-600'
                            >
                              <Minus size={14} />
                            </button>
                            <span className='px-2 font-medium text-gray-900'>
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
                              className='p-1 hover:bg-gray-100 text-gray-600'
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            type='button'
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className='font-medium text-red-500 hover:text-red-600 flex items-center'
                          >
                            <Trash2 size={16} className='mr-1' /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className='border-t border-gray-100 px-6 py-6 bg-gray-50'>
                <div className='flex justify-between text-base font-medium text-gray-900 mb-4'>
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <p className='mt-0.5 text-sm text-gray-500 mb-6'>
                  Shipping and taxes calculated at checkout.
                </p>
                <div className='space-y-3'>
                  <button
                    onClick={() => {
                      dispatch(toggleCart());
                      navigate('/cart');
                    }}
                    className='w-full flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors'
                  >
                    View Cart
                  </button>
                  <button
                    onClick={() => {
                      dispatch(toggleCart());
                      navigate('/checkout');
                    }}
                    className='w-full flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-800 transition-colors'
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </Motion.div>
      </div>
    </AnimatePresence>
  );
};
