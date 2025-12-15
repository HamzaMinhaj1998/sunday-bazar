import { ChevronDown, Filter, LayoutGrid, List } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ProductCard } from '../components/ProductCard';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useSearchProductsQuery,
} from '../store/api/apiSlice';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '');
  const [viewMode, setViewMode] = useState('grid');

  // If search param exists, use search query, else use standard products query
  const { data: searchData, isFetching: isSearchLoading } =
    useSearchProductsQuery(searchParam || '', { skip: !searchParam });
  const { data: productsData, isFetching: isProductsLoading } =
    useGetProductsQuery(
      {
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        limit: 100,
      },
      { skip: !!searchParam },
    );

  const { data: categories } = useGetCategoriesQuery(undefined);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSearchParams(cat === 'all' ? {} : { category: cat });
  };

  const products = searchParam ? searchData?.products : productsData?.products;
  const isLoading = searchParam ? isSearchLoading : isProductsLoading;

  return (
    <div className='bg-gray-50 min-h-screen pb-12'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200 py-8 mb-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900 capitalize'>
            {searchParam
              ? `Search: "${searchParam}"`
              : selectedCategory || 'Shop All'}
          </h1>
          <p className='text-gray-500 mt-2'>
            {products?.length || 0} Products found
          </p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Sidebar Filters */}
          <aside className='w-full lg:w-64 shrink-0 space-y-8'>
            <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='font-bold text-gray-900'>Categories</h3>
                <Filter size={16} className='text-gray-400' />
              </div>
              <div className='space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar'>
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`block w-full text-left px-2 py-1.5 rounded text-sm ${
                    selectedCategory === '' || selectedCategory === 'all'
                      ? 'bg-accent/10 text-accent font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All Categories
                </button>
                {categories?.map((cat) => (
                  <button
                    key={typeof cat === 'string' ? cat : cat.slug}
                    onClick={() =>
                      handleCategoryChange(
                        typeof cat === 'string' ? cat : cat.slug,
                      )
                    }
                    className={`block w-full text-left px-2 py-1.5 rounded text-sm capitalize ${
                      selectedCategory ===
                      (typeof cat === 'string' ? cat : cat.slug)
                        ? 'bg-accent/10 text-accent font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {typeof cat === 'string' ? cat.replace('-', ' ') : cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Mockup */}
            <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='font-bold text-gray-900'>Price Range</h3>
                <ChevronDown size={16} className='text-gray-400' />
              </div>
              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <input
                    type='number'
                    placeholder='Min'
                    className='w-full border border-gray-300 rounded px-3 py-2 text-sm'
                  />
                  <span className='text-gray-400'>-</span>
                  <input
                    type='number'
                    placeholder='Max'
                    className='w-full border border-gray-300 rounded px-3 py-2 text-sm'
                  />
                </div>
                <button className='w-full bg-gray-900 text-white py-2 rounded text-sm font-medium hover:bg-accent transition-colors'>
                  Apply
                </button>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className='flex-1'>
            {/* Toolbar */}
            <div className='flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm'>
              <div className='flex items-center space-x-2'>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>

              <div className='flex items-center space-x-2'>
                <span className='text-sm text-gray-500'>Sort by:</span>
                <select className='border-none text-sm font-medium text-gray-900 focus:ring-0 cursor-pointer bg-transparent'>
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className='bg-white p-4 rounded-xl border border-gray-100 h-80 animate-pulse'
                  >
                    <div className='bg-gray-200 h-48 w-full rounded-lg mb-4'></div>
                    <div className='h-4 bg-gray-200 w-3/4 mb-2'></div>
                    <div className='h-4 bg-gray-200 w-1/2'></div>
                  </div>
                ))}
              </div>
            ) : products?.length === 0 ? (
              <div className='text-center py-20 bg-white rounded-xl border border-gray-200'>
                <p className='text-gray-500 text-lg'>No products found.</p>
              </div>
            ) : (
              <div
                className={`grid ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                } gap-6`}
              >
                {products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
