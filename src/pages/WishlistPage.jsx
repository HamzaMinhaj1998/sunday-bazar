import { ArrowLeft, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { ProductCard } from '../components/ProductCard';
import { removeFromWishlist } from '../store/slices/wishlistSlice';

export const WishlistPage = () => {
  const { items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center text-center px-4'>
        <div className='bg-red-50 p-6 rounded-full mb-6'>
          <Heart size={48} className='text-red-400' />
        </div>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Your Wishlist is Empty
        </h1>
        <p className='text-gray-500 mb-8'>
          Explore more and shortlist some items.
        </p>
        <Link
          to='/shop'
          className='px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-accent transition-colors'
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>
          My Wishlist ({items.length})
        </h1>
        <Link
          to='/shop'
          className='flex items-center text-gray-600 hover:text-accent'
        >
          <ArrowLeft size={18} className='mr-2' /> Back to Shop
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {items.map((product) => (
          <div key={product.id} className='relative group'>
            <ProductCard product={product} />
            <button
              onClick={() => dispatch(removeFromWishlist(product.id))}
              className='absolute top-2 right-2 bg-white/90 p-2 rounded-full text-red-500 shadow-sm hover:bg-red-50 z-10'
              title='Remove from Wishlist'
            >
              <Heart size={18} fill='currentColor' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
