import { useFormik } from 'formik';
import { Lock, User } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import * as Yup from 'yup';
import { useLoginMutation } from '../store/api/apiSlice';
import { setCredentials } from '../store/slices/authSlice';

export const LoginPage = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: 'emilys', // DummyJSON default user
      password: 'emilyspass',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const user = await login(values).unwrap();
        dispatch(setCredentials(user));
        navigate('/sunday-bazar/');
      } catch (err) {
        console.error('Failed to login:', err);
      }
    },
  });

  return (
    <div className='min-h-[80vh] flex items-center justify-center bg-gray-50 px-4'>
      <div className='max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Welcome Back
          </h1>
          <p className='text-gray-500'>Sign in to access your account</p>
          <div className='mt-2 text-xs text-blue-500 bg-blue-50 p-2 rounded'>
            Use: <b>emilys</b> / <b>emilyspass</b> (DummyJSON)
          </div>
        </div>

        {error && (
          <div className='mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center'>
            Invalid username or password
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Username
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-3 text-gray-400'>
                <User size={18} />
              </span>
              <input
                type='text'
                name='username'
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all ${
                  formik.touched.username && formik.errors.username
                    ? 'border-red-300'
                    : 'border-gray-300'
                }`}
                placeholder='Enter your username'
                {...formik.getFieldProps('username')}
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <div className='mt-1 text-xs text-red-500'>
                {formik.errors.username}
              </div>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-3 text-gray-400'>
                <Lock size={18} />
              </span>
              <input
                type='password'
                name='password'
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-300'
                    : 'border-gray-300'
                }`}
                placeholder='Enter your password'
                {...formik.getFieldProps('password')}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className='mt-1 text-xs text-red-500'>
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className='flex items-center justify-between text-sm'>
            <label className='flex items-center text-gray-600'>
              <input
                type='checkbox'
                className='mr-2 rounded border-gray-300 text-accent focus:ring-accent'
              />
              Remember me
            </label>
            <a href='#' className='text-accent hover:underline font-medium'>
              Forgot Password?
            </a>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full bg-gray-900 text-white py-3.5 rounded-lg font-bold shadow-lg hover:bg-accent transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className='mt-8 text-center text-sm text-gray-500'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-accent font-bold hover:underline'>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
