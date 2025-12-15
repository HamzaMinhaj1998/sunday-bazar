import {
  ArrowRight,
  Headphones,
  RefreshCcw,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { Link } from 'react-router';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCard } from '../components/ProductCard';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '../store/api/apiSlice';

export const HomePage = () => {
  const { data: featuredProducts, isLoading: isProductsLoading } =
    useGetProductsQuery({ limit: 8 });
  const { data: categories } = useGetCategoriesQuery(undefined);

  const heroSlides = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
      title: 'New Season Arrivals',
      subtitle: 'Check out all the trends',
      btnText: 'Shop Now',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
      title: 'Exclusive Collection',
      subtitle: 'Premium quality guaranteed',
      btnText: 'Explore',
    },
  ];

  return (
    <div className='space-y-16 pb-16'>
      {/* Hero Section */}
      <section className='relative h-[600px] w-full'>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect='fade'
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          className='h-full w-full'
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className='relative h-full w-full'>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className='absolute inset-0 h-full w-full object-cover'
                />
                <div className='absolute inset-0 bg-black/40' />
                <div className='absolute inset-0 flex items-center justify-center text-center'>
                  <div className='max-w-3xl px-4 animate-fade-in-up'>
                    <h2 className='text-xl md:text-2xl text-white font-medium mb-4 tracking-wider uppercase'>
                      {slide.subtitle}
                    </h2>
                    <h1 className='text-5xl md:text-7xl text-white font-bold mb-8'>
                      {slide.title}
                    </h1>
                    <Link
                      to='/shop'
                      className='inline-block bg-white text-gray-900 px-8 py-4 font-semibold rounded-none hover:bg-accent hover:text-white transition-all duration-300'
                    >
                      {slide.btnText}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Features Grid */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {[
            {
              icon: Truck,
              title: 'Free Shipping',
              desc: 'On all orders over $99',
            },
            {
              icon: ShieldCheck,
              title: 'Secure Payment',
              desc: '100% secure payment',
            },
            {
              icon: RefreshCcw,
              title: '30 Day Returns',
              desc: 'Money back guarantee',
            },
            {
              icon: Headphones,
              title: '24/7 Support',
              desc: 'Dedicated support',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className='flex items-center space-x-4 p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow'
            >
              <div className='p-3 bg-blue-50 text-accent rounded-full'>
                <feature.icon size={24} />
              </div>
              <div>
                <h4 className='font-bold text-gray-900'>{feature.title}</h4>
                <p className='text-sm text-gray-500'>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-end mb-8'>
          <div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Shop by Category
            </h2>
            <p className='text-gray-500'>Explore our wide range of products</p>
          </div>
          <Link
            to='/categories'
            className='text-accent font-medium hover:underline flex items-center'
          >
            View All <ArrowRight size={16} className='ml-2' />
          </Link>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {categories?.slice(0, 6).map((cat, idx) => (
            <Link
              key={idx}
              to={`/shop?category=${cat}`}
              className='group block text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg border border-transparent hover:border-gray-100 transition-all duration-300'
            >
              <div className='w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform'>
                <span className='text-2xl font-bold text-accent'>
                  {typeof cat === 'string' ? cat.charAt(0).toUpperCase() : 'C'}
                </span>
              </div>
              <h3 className='font-medium text-gray-900 capitalize group-hover:text-accent transition-colors'>
                {typeof cat === 'string' ? cat.replace('-', ' ') : 'Category'}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Trending Now
          </h2>
          <p className='text-gray-500 max-w-2xl mx-auto'>
            Discover the hottest picks of the season. Our new arrivals are built
            to last and designed to impress.
          </p>
        </div>

        {isProductsLoading ? (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {[...Array(8)].map((_, i) => (
              <div key={i} className='animate-pulse'>
                <div className='bg-gray-200 aspect-square rounded-xl mb-4'></div>
                <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                <div className='h-4 bg-gray-200 rounded w-1/2'></div>
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {featuredProducts?.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className='mt-12 text-center'>
          <Link
            to='/shop'
            className='inline-block px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-accent transition-colors shadow-lg shadow-gray-200/50'
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Banner */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='relative rounded-2xl overflow-hidden bg-gray-900 h-[300px] flex items-center'>
          <img
            src='https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop'
            alt='Promotion'
            className='absolute inset-0 w-full h-full object-cover opacity-50'
          />
          <div className='relative z-10 px-8 md:px-16 max-w-2xl'>
            <span className='text-accent font-bold tracking-wider uppercase mb-2 block'>
              Limited Offer
            </span>
            <h2 className='text-4xl text-white font-bold mb-6'>
              Get 30% Off On Your First Order
            </h2>
            <div className='flex gap-4'>
              <Link
                to='/signup'
                className='bg-white text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors'
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
