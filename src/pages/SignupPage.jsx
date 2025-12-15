import { useFormik } from 'formik';
import { Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import * as Yup from 'yup';
import { useRegisterMutation } from '../store/api/apiSlice';

export const SignupPage = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          username: values.email.split('@')[0], // Mock username
        }).unwrap();
        // DummyJSON register doesn't auto-login, redirect to login
        navigate('/login');
      } catch (err) {
        console.error('Registration failed', err);
      }
    },
  });

  return (
    <div className='min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12'>
      <div className='max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Create Account
          </h1>
          <p className='text-gray-500'>
            Join us for a premium shopping experience
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                First Name
              </label>
              <input
                type='text'
                {...formik.getFieldProps('firstName')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-accent ${
                  formik.touched.firstName && formik.errors.firstName
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className='text-xs text-red-500 mt-1'>
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
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-accent ${
                  formik.touched.lastName && formik.errors.lastName
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className='text-xs text-red-500 mt-1'>
                  {formik.errors.lastName}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email Address
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-2.5 text-gray-400'>
                <Mail size={18} />
              </span>
              <input
                type='email'
                {...formik.getFieldProps('email')}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-accent ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className='text-xs text-red-500 mt-1'>
                {formik.errors.email}
              </div>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-2.5 text-gray-400'>
                <Lock size={18} />
              </span>
              <input
                type='password'
                {...formik.getFieldProps('password')}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-accent ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className='text-xs text-red-500 mt-1'>
                {formik.errors.password}
              </div>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Confirm Password
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-2.5 text-gray-400'>
                <Lock size={18} />
              </span>
              <input
                type='password'
                {...formik.getFieldProps('confirmPassword')}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-accent ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className='text-xs text-red-500 mt-1'>
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-accent transition-colors mt-4'
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className='mt-6 text-center text-sm text-gray-500'>
          Already have an account?{' '}
          <Link to='/login' className='text-accent font-bold hover:underline'>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
