import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router';
import { useGetPostsQuery } from '../store/api/apiSlice';

export const BlogPage = () => {
  const { data: postsData, isLoading } = useGetPostsQuery({ limit: 12 });

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      <div className='text-center mb-16'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
          Our Latest News
        </h1>
        <p className='text-gray-500 max-w-2xl mx-auto'>
          Insights, trends, and updates from the world of fashion and lifestyle.
        </p>
      </div>

      {isLoading ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='h-96 bg-gray-100 animate-pulse rounded-2xl'
            ></div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {postsData?.posts.map((post) => (
            <article
              key={post.id}
              className='group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full'
            >
              <div className='relative h-64 overflow-hidden'>
                <img
                  src={`https://picsum.photos/seed/${post.id}/800/600`} // Dummy image since API doesn't provide
                  alt={post.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                />
                <div className='absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide'>
                  {post.tags[0]}
                </div>
              </div>
              <div className='p-6 flex flex-col flex-1'>
                <div className='flex items-center gap-4 text-xs text-gray-500 mb-3'>
                  <span className='flex items-center gap-1'>
                    <Calendar size={14} /> Nov 20, 2024
                  </span>
                  <span className='flex items-center gap-1'>
                    <User size={14} /> Admin
                  </span>
                </div>
                <h2 className='text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-accent transition-colors'>
                  {post.title}
                </h2>
                <p className='text-gray-500 line-clamp-3 mb-6 flex-1'>
                  {post.body}
                </p>
                <Link
                  to={`/blog/${post.id}`}
                  className='flex items-center text-accent font-bold hover:underline mt-auto'
                >
                  Read More <ArrowRight size={16} className='ml-2' />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
