import { Star, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { addToCart } from '../store/slices/cartSlice';
import { clearCompare, removeFromCompare } from '../store/slices/compareSlice';

export const ComparePage = () => {
  const { items } = useSelector((state) => state.compare);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center text-center px-4'>
        <h1 className='text-3xl font-bold text-gray-900 mb-4'>
          Compare List is Empty
        </h1>
        <Link
          to='/shop'
          className='px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-accent transition-colors'
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>Compare Products</h1>
        <button
          onClick={() => dispatch(clearCompare())}
          className='text-red-500 font-medium hover:underline'
        >
          Clear All
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full min-w-[800px] border-collapse'>
          <tbody>
            <tr>
              <td className='p-4 w-48 font-bold text-gray-900 bg-gray-50'>
                Product
              </td>
              {items.map((product) => (
                <td
                  key={product.id}
                  className='p-4 border-l border-gray-100 min-w-[250px] relative group'
                >
                  <button
                    onClick={() => dispatch(removeFromCompare(product.id))}
                    className='absolute top-2 right-2 text-gray-400 hover:text-red-500'
                  >
                    <X size={20} />
                  </button>
                  <div className='mb-4 h-48 flex items-center justify-center'>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className='max-h-full max-w-full object-contain'
                    />
                  </div>
                  <h3 className='font-bold text-gray-900 mb-2'>
                    {product.title}
                  </h3>
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className='w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors'
                  >
                    Add to Cart
                  </button>
                </td>
              ))}
              {[...Array(3 - items.length)].map((_, i) => (
                <td
                  key={i}
                  className='p-4 border-l border-gray-100 bg-gray-50/50'
                ></td>
              ))}
            </tr>
            <tr>
              <td className='p-4 font-bold text-gray-900 bg-gray-50'>Price</td>
              {items.map((product) => (
                <td
                  key={product.id}
                  className='p-4 border-l border-gray-100 font-bold text-xl text-gray-900'
                >
                  ${product.price}
                </td>
              ))}
              {[...Array(3 - items.length)].map((_, i) => (
                <td key={i} className='border-l border-gray-100'></td>
              ))}
            </tr>
            <tr>
              <td className='p-4 font-bold text-gray-900 bg-gray-50'>Rating</td>
              {items.map((product) => (
                <td key={product.id} className='p-4 border-l border-gray-100'>
                  <div className='flex text-yellow-400'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={
                          i < Math.round(product.rating)
                            ? 'currentColor'
                            : 'none'
                        }
                        className={
                          i < Math.round(product.rating) ? '' : 'text-gray-300'
                        }
                      />
                    ))}
                    <span className='text-gray-400 text-sm ml-2'>
                      ({product.rating})
                    </span>
                  </div>
                </td>
              ))}
              {[...Array(3 - items.length)].map((_, i) => (
                <td key={i} className='border-l border-gray-100'></td>
              ))}
            </tr>
            <tr>
              <td className='p-4 font-bold text-gray-900 bg-gray-50'>Brand</td>
              {items.map((product) => (
                <td
                  key={product.id}
                  className='p-4 border-l border-gray-100 text-gray-600'
                >
                  {product.brand}
                </td>
              ))}
              {[...Array(3 - items.length)].map((_, i) => (
                <td key={i} className='border-l border-gray-100'></td>
              ))}
            </tr>
            <tr>
              <td className='p-4 font-bold text-gray-900 bg-gray-50'>
                Category
              </td>
              {items.map((product) => (
                <td
                  key={product.id}
                  className='p-4 border-l border-gray-100 text-gray-600 capitalize'
                >
                  {product.category}
                </td>
              ))}
              {[...Array(3 - items.length)].map((_, i) => (
                <td key={i} className='border-l border-gray-100'></td>
              ))}
            </tr>
            <tr>
              <td className='p-4 font-bold text-gray-900 bg-gray-50'>
                Description
              </td>
              {items.map((product) => (
                <td
                  key={product.id}
                  className='p-4 border-l border-gray-100 text-sm text-gray-500'
                >
                  {product.description}
                </td>
              ))}
              {[...Array(3 - items.length)].map((_, i) => (
                <td key={i} className='border-l border-gray-100'></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
