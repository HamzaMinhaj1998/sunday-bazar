import { Eye, Heart, Repeat, ShoppingBag, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { addToCart } from '../store/slices/cartSlice';
import { addToCompare } from '../store/slices/compareSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  const handleAddToCompare = (e) => {
    e.preventDefault();
    dispatch(addToCompare(product));
  };

  return (
    <div className='group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full'>
      <div className='aspect:1/1 w-full overflow-hidden relative bg-gray-50'>
        <Link to={`/product/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className='h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500'
          />
        </Link>
        {product.discountPercentage > 10 && (
          <span className='absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded'>
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        <div className='absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0'>
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isInWishlist
                ? 'bg-red-50 text-red-500'
                : 'bg-white text-gray-600 hover:text-red-500'
            }`}
            title='Add to Wishlist'
          >
            <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleAddToCompare}
            className='bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-accent transition-colors'
            title='Compare'
          >
            <Repeat size={18} />
          </button>
          <Link
            to={`/product/${product.id}`}
            className='bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-accent transition-colors flex items-center justify-center'
            title='Quick View'
          >
            <Eye size={18} />
          </Link>
        </div>

        <button
          onClick={handleAddToCart}
          className='absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur text-gray-900 py-2 rounded-lg font-medium shadow-sm translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-accent hover:text-white'
        >
          <ShoppingBag size={18} /> Add to Cart
        </button>
      </div>

      <div className='p-4 flex flex-col flex-1'>
        <div className='text-xs text-gray-500 mb-1'>{product.brand}</div>
        <Link to={`/product/${product.id}`} className='block flex-1'>
          <h3 className='text-sm font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-accent transition-colors'>
            {product.title}
          </h3>
        </Link>
        <div className='flex items-center mb-2'>
          <div className='flex text-yellow-400'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                className={
                  i < Math.round(product.rating) ? '' : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className='text-xs text-gray-400 ml-1'>({product.rating})</span>
        </div>
        <div className='flex items-center justify-between mt-auto'>
          <p className='text-lg font-bold text-gray-900'>${product.price}</p>
          {product.discountPercentage > 0 && (
            <p className='text-sm text-gray-400 line-through'>
              $
              {(product.price / (1 - product.discountPercentage / 100)).toFixed(
                2,
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
