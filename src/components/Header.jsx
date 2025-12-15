import {
  Heart,
  Menu,
  Repeat,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { logout } from '../store/slices/authSlice';
import { toggleCart } from '../store/slices/cartSlice';

export const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const compareItems = useSelector((state) => state.compare.items);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className='sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link to='/sunday-bazar/' className='shrink-0 flex items-center'>
            <span className='text-2xl font-bold tracking-tight text-primary'>
              Sunday<span className='text-accent'>Bazar</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className='hidden md:flex space-x-8'>
            <Link
              to='/sunday-bazar/'
              className='text-gray-700 hover:text-accent font-medium transition-colors'
            >
              Home
            </Link>
            <Link
              to='/shop'
              className='text-gray-700 hover:text-accent font-medium transition-colors'
            >
              Shop
            </Link>
            <Link
              to='/blog'
              className='text-gray-700 hover:text-accent font-medium transition-colors'
            >
              Blog
            </Link>
            <Link
              to='/about'
              className='text-gray-700 hover:text-accent font-medium transition-colors'
            >
              About
            </Link>
            <Link
              to='/contact'
              className='text-gray-700 hover:text-accent font-medium transition-colors'
            >
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className='hidden md:flex items-center space-x-6'>
            <form onSubmit={handleSearch} className='relative group'>
              <input
                type='text'
                placeholder='Search...'
                className='pl-3 pr-10 py-1.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-accent w-40 focus:w-60 transition-all duration-300'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type='submit'
                className='absolute right-3 top-2 text-gray-400 hover:text-accent'
              >
                <Search size={18} />
              </button>
            </form>

            <Link
              to='/compare'
              className='text-gray-600 hover:text-accent relative'
              title='Compare'
            >
              <Repeat size={22} />
              {compareItems.length > 0 && (
                <span className='absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full'>
                  {compareItems.length}
                </span>
              )}
            </Link>

            <Link
              to='/wishlist'
              className='text-gray-600 hover:text-accent relative'
              title='Wishlist'
            >
              <Heart size={22} />
              {wishlistItems.length > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full'>
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => dispatch(toggleCart())}
              className='text-gray-600 hover:text-accent relative'
              title='Cart'
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className='absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full'>
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className='relative group cursor-pointer'>
                <img
                  src={user.image}
                  alt='Profile'
                  className='h-8 w-8 rounded-full border border-gray-200 object-cover'
                />
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 transform origin-top-right z-50'>
                  <div className='px-4 py-2 border-b border-gray-100'>
                    <p className='text-sm font-medium text-gray-900'>
                      {user.firstName}
                    </p>
                    <p className='text-xs text-gray-500 truncate'>
                      {user.email}
                    </p>
                  </div>
                  <Link
                    to='/profile'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                  >
                    Profile
                  </Link>
                  <Link
                    to='/orders'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => dispatch(logout())}
                    className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50'
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link to='/login' className='text-gray-600 hover:text-accent'>
                <User size={22} />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center space-x-4'>
            <button
              onClick={() => dispatch(toggleCart())}
              className='text-gray-600 relative'
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className='absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full'>
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className='text-gray-600'
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-4 shadow-lg animate-fade-in-down'>
          <form onSubmit={handleSearch} className='relative'>
            <input
              type='text'
              placeholder='Search products...'
              className='w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type='submit'
              className='absolute right-3 top-2.5 text-gray-400'
            >
              <Search size={18} />
            </button>
          </form>
          <div className='space-y-2'>
            <Link
              to='/sunday-bazar/'
              onClick={() => setMobileMenuOpen(false)}
              className='block text-gray-800 font-medium py-2'
            >
              Home
            </Link>
            <Link
              to='/shop'
              onClick={() => setMobileMenuOpen(false)}
              className='block text-gray-800 font-medium py-2'
            >
              Shop
            </Link>
            <Link
              to='/categories'
              onClick={() => setMobileMenuOpen(false)}
              className='block text-gray-800 font-medium py-2'
            >
              Categories
            </Link>
            <Link
              to='/blog'
              onClick={() => setMobileMenuOpen(false)}
              className='block text-gray-800 font-medium py-2'
            >
              Blog
            </Link>
            <Link
              to='/wishlist'
              onClick={() => setMobileMenuOpen(false)}
              className='block text-gray-800 font-medium py-2'
            >
              Wishlist ({wishlistItems.length})
            </Link>
            <Link
              to='/compare'
              onClick={() => setMobileMenuOpen(false)}
              className='block text-gray-800 font-medium py-2'
            >
              Compare ({compareItems.length})
            </Link>
            {!user ? (
              <Link
                to='/login'
                onClick={() => setMobileMenuOpen(false)}
                className='block text-gray-800 font-medium py-2'
              >
                Sign In
              </Link>
            ) : (
              <>
                <Link
                  to='/profile'
                  onClick={() => setMobileMenuOpen(false)}
                  className='block text-gray-800 font-medium py-2'
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    dispatch(logout());
                    setMobileMenuOpen(false);
                  }}
                  className='block text-red-600 font-medium py-2'
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
