import { useFormik } from 'formik';
import { CreditCard, MapPin } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { useAddCartMutation } from '../store/api/apiSlice';
import { clearCart, selectCartTotals } from '../store/slices/cartSlice';
// import { toast } from 'react-toastify'; // Assuming toast installed or just console

export const CheckoutPage = () => {
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [addCart, { isLoading }] = useAddCartMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { subtotal, shipping, tax, total } = useSelector(selectCartTotals);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      address: '',
      city: '',
      zipCode: '',
      cardName: '',
      cardNumber: '',
      expiry: '',
      cvc: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      address: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      zipCode: Yup.string().required('Required'),
      cardName: Yup.string().required('Required'),
      cardNumber: Yup.string().required('Required'),
      expiry: Yup.string().required('Required'),
      cvc: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        if (!user) {
          navigate('/login');
          return;
        }

        const payload = {
          userId: user.id,
          products: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        };

        const result = await addCart(payload).unwrap();
        // Result contains order ID from dummyjson
        dispatch(clearCart());
        navigate('/order-summary', {
          state: { order: result, orderDetails: values },
        });
      } catch (error) {
        console.error('Checkout failed', error);
      }
    },
  });

  if (items.length === 0) {
    navigate('/shop');
    return null;
  }

  return (
    <div className='bg-gray-50 min-h-screen py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>Checkout</h1>

        <form
          onSubmit={formik.handleSubmit}
          className='flex flex-col lg:flex-row gap-12'
        >
          {/* Left Column - Forms */}
          <div className='flex-1 space-y-8'>
            {/* Shipping Address */}
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
              <h2 className='text-xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                <MapPin size={20} className='text-accent' /> Shipping
                Information
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    First Name
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('firstName')}
                    className={`w-full border rounded-lg px-4 py-2 ${
                      formik.touched.firstName && formik.errors.firstName
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className='text-red-500 text-xs mt-1'>
                      {formik.errors.firstName}
                    </div>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('lastName')}
                    className={`w-full border rounded-lg px-4 py-2 ${
                      formik.touched.lastName && formik.errors.lastName
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className='text-red-500 text-xs mt-1'>
                      {formik.errors.lastName}
                    </div>
                  )}
                </div>
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    {...formik.getFieldProps('email')}
                    className={`w-full border rounded-lg px-4 py-2 ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className='text-red-500 text-xs mt-1'>
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Street Address
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('address')}
                    className={`w-full border rounded-lg px-4 py-2 ${
                      formik.touched.address && formik.errors.address
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className='text-red-500 text-xs mt-1'>
                      {formik.errors.address}
                    </div>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    City
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('city')}
                    className={`w-full border rounded-lg px-4 py-2 ${
                      formik.touched.city && formik.errors.city
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <div className='text-red-500 text-xs mt-1'>
                      {formik.errors.city}
                    </div>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Zip Code
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('zipCode')}
                    className={`w-full border rounded-lg px-4 py-2 ${
                      formik.touched.zipCode && formik.errors.zipCode
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {formik.touched.zipCode && formik.errors.zipCode && (
                    <div className='text-red-500 text-xs mt-1'>
                      {formik.errors.zipCode}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
              <h2 className='text-xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                <CreditCard size={20} className='text-accent' /> Payment Details
              </h2>
              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Cardholder Name
                  </label>
                  <input
                    type='text'
                    {...formik.getFieldProps('cardName')}
                    className={`w-full border rounded-lg px-4 py-2 ${
                      formik.touched.cardName && formik.errors.cardName
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {formik.touched.cardName && formik.errors.cardName && (
                    <div className='text-red-500 text-xs mt-1'>
                      {formik.errors.cardName}
                    </div>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Card Number
                  </label>
                  <input
                    type='text'
                    placeholder='0000 0000 0000 0000'
                    {...formik.getFieldProps('cardNumber')}
                    className={`w-full border rounded-lg px-4 py-2 ${
                      formik.touched.cardNumber && formik.errors.cardNumber
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {formik.touched.cardNumber && formik.errors.cardNumber && (
                    <div className='text-red-500 text-xs mt-1'>
                      {formik.errors.cardNumber}
                    </div>
                  )}
                </div>
                <div className='grid grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Expiry Date
                    </label>
                    <input
                      type='text'
                      placeholder='MM/YY'
                      {...formik.getFieldProps('expiry')}
                      className={`w-full border rounded-lg px-4 py-2 ${
                        formik.touched.expiry && formik.errors.expiry
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {formik.touched.expiry && formik.errors.expiry && (
                      <div className='text-red-500 text-xs mt-1'>
                        {formik.errors.expiry}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      CVC
                    </label>
                    <input
                      type='text'
                      placeholder='123'
                      {...formik.getFieldProps('cvc')}
                      className={`w-full border rounded-lg px-4 py-2 ${
                        formik.touched.cvc && formik.errors.cvc
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {formik.touched.cvc && formik.errors.cvc && (
                      <div className='text-red-500 text-xs mt-1'>
                        {formik.errors.cvc}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className='w-full lg:w-96 shrink-0'>
            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24'>
              <h2 className='text-lg font-bold text-gray-900 mb-6'>
                Order Summary
              </h2>
              <div className='space-y-4 mb-6 max-h-60 overflow-y-auto pr-2'>
                {items.map((item) => (
                  <div key={item.id} className='flex gap-4'>
                    <div className='h-16 w-16 rounded border border-gray-200 overflow-hidden shrink-0'>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='flex-1'>
                      <h4 className='text-sm font-medium text-gray-900 line-clamp-1'>
                        {item.title}
                      </h4>
                      <div className='flex justify-between mt-1 text-sm text-gray-500'>
                        <span>Qty: {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='border-t border-gray-100 pt-4 space-y-3'>
                <div className='flex justify-between text-gray-600'>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-gray-600'>
                  <span>Shipping</span>
                  <span className='text-green-600 font-medium'>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className='flex justify-between text-gray-600'>
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100'>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='w-full mt-6 bg-gray-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-accent transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-70'
              >
                {isLoading ? (
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                ) : (
                  <>Place Order</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
