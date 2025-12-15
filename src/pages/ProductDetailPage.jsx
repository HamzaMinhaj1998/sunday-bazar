import {
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCard } from '../components/ProductCard';
import { useGetProductQuery, useGetProductsQuery } from '../store/api/apiSlice';
import { addToCart } from '../store/slices/cartSlice';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductQuery(id);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // Recommendations: fetch products from same category
  const { data: relatedData } = useGetProductsQuery(
    { category: product?.category, limit: 4 },
    { skip: !product },
  );

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-16 flex justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent'></div>
      </div>
    );
  }

  if (!product)
    return <div className='text-center py-20'>Product not found</div>;

  return (
    <div className='bg-white pb-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Breadcrumb could go here */}

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
          {/* Gallery */}
          <div className='space-y-4'>
            <div className='bg-gray-50 rounded-2xl overflow-hidden border border-gray-100'>
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className='h-[400px] md:h-[500px] w-full'
              >
                {product.images.map((img, idx) => (
                  <SwiperSlide
                    key={idx}
                    className='flex items-center justify-center bg-white'
                  >
                    <img
                      src={img}
                      alt={product.title}
                      className='h-full w-full object-contain'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className='thumbs-swiper h-24'
            >
              {product.images.map((img, idx) => (
                <SwiperSlide
                  key={idx}
                  className='cursor-pointer border border-gray-200 rounded-lg overflow-hidden opacity-50 hover:opacity-100 transition-opacity'
                >
                  <img
                    src={img}
                    alt='thumb'
                    className='h-full w-full object-cover'
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Details */}
          <div>
            <div className='mb-2 text-sm font-bold text-accent uppercase tracking-wide'>
              {product.category}
            </div>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              {product.title}
            </h1>

            <div className='flex items-center space-x-4 mb-6'>
              <div className='flex text-yellow-400'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={
                      i < Math.round(product.rating) ? 'currentColor' : 'none'
                    }
                    className={
                      i < Math.round(product.rating) ? '' : 'text-gray-300'
                    }
                  />
                ))}
              </div>
              <span className='text-gray-500 text-sm'>
                ({product.rating} Rating)
              </span>
              <span className='text-gray-300'>|</span>
              <span className='text-green-600 text-sm font-medium'>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className='flex items-end gap-3 mb-6'>
              <span className='text-4xl font-bold text-gray-900'>
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className='text-xl text-gray-400 line-through mb-1'>
                    $
                    {(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                  <span className='bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded mb-2'>
                    -{Math.round(product.discountPercentage)}% OFF
                  </span>
                </>
              )}
            </div>

            <p className='text-gray-600 leading-relaxed mb-8'>
              {product.description}
            </p>

            <div className='border-t border-b border-gray-100 py-6 mb-8 space-y-6'>
              <div className='flex items-center gap-6'>
                <div className='flex items-center border border-gray-300 rounded-lg'>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className='p-3 hover:bg-gray-100 text-gray-600 transition-colors'
                  >
                    <Minus size={16} />
                  </button>
                  <span className='w-12 text-center font-bold text-gray-900'>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className='p-3 hover:bg-gray-100 text-gray-600 transition-colors'
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className='flex-1 bg-gray-900 text-white py-3.5 px-8 rounded-lg font-semibold shadow-lg shadow-gray-200 hover:bg-accent transition-all duration-300 flex items-center justify-center gap-2'
                >
                  <ShoppingBag size={20} /> Add to Cart
                </button>

                <button className='p-3.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors'>
                  <Heart size={20} />
                </button>
              </div>
            </div>

            <div className='flex items-center gap-6 text-sm text-gray-500'>
              <div className='flex items-center gap-2'>
                <Truck size={18} /> Free Delivery
              </div>
              <div className='flex items-center gap-2'>
                <Share2 size={18} /> Share
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className='border-t border-gray-100 pt-16 mb-16'>
          <h2 className='text-2xl font-bold text-gray-900 mb-8'>
            Customer Reviews ({product.reviews?.length || 0})
          </h2>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
            {/* Summary */}
            <div className='lg:col-span-1'>
              <div className='bg-gray-50 p-6 rounded-2xl'>
                <div className='flex items-center gap-4 mb-4'>
                  <span className='text-5xl font-bold text-gray-900'>
                    {product.rating}
                  </span>
                  <div>
                    <div className='flex text-yellow-400 mb-1'>
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
                            i < Math.round(product.rating)
                              ? ''
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <p className='text-sm text-gray-500'>
                      Based on {product.reviews?.length || 0} reviews
                    </p>
                  </div>
                </div>
                {/* Breakdown */}
                <div className='space-y-2'>
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count =
                      product.reviews?.filter(
                        (r) => Math.round(r.rating) === star,
                      ).length || 0;
                    const total = product.reviews?.length || 1;
                    const percent = (count / total) * 100;
                    return (
                      <div
                        key={star}
                        className='flex items-center gap-3 text-sm'
                      >
                        <span className='w-3 text-gray-600 font-medium'>
                          {star}
                        </span>
                        <Star size={12} className='text-gray-400' />
                        <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
                          <div
                            className='h-full bg-yellow-400 rounded-full'
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                        <span className='w-6 text-right text-gray-500'>
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className='mt-8'>
                <h3 className='font-bold text-gray-900 mb-4'>
                  Share your thoughts
                </h3>
                <p className='text-sm text-gray-500 mb-4'>
                  If you've used this product, share your thoughts with other
                  customers
                </p>
                <button className='w-full py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors'>
                  Write a Review
                </button>
              </div>
            </div>

            {/* Review List */}
            <div className='lg:col-span-2 space-y-8'>
              {product.reviews?.map((review, idx) => (
                <div
                  key={idx}
                  className='border-b border-gray-100 last:border-0 pb-8 last:pb-0'
                >
                  <div className='flex justify-between items-start mb-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold uppercase'>
                        {review.reviewerName.charAt(0)}
                      </div>
                      <div>
                        <h4 className='font-bold text-gray-900'>
                          {review.reviewerName}
                        </h4>
                        <p className='text-xs text-gray-500'>
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className='flex text-yellow-400'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < review.rating ? 'currentColor' : 'none'}
                          className={i < review.rating ? '' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className='text-gray-600 leading-relaxed'>
                    {review.comment}
                  </p>
                </div>
              ))}
              {!product.reviews?.length && (
                <p className='text-gray-500 italic py-4'>No reviews yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedData && relatedData.products.length > 0 && (
          <div className='border-t border-gray-100 pt-16'>
            <h2 className='text-2xl font-bold text-gray-900 mb-8'>
              Related Products
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {relatedData.products.map(
                (p) =>
                  p.id !== product.id && <ProductCard key={p.id} product={p} />,
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
