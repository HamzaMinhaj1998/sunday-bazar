import {
  ArrowLeft,
  Calendar,
  Facebook,
  Linkedin,
  Tag,
  Twitter,
  User,
} from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useGetPostQuery } from '../store/api/apiSlice';

export const BlogDetailPage = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostQuery(id);

  if (isLoading)
    return <div className='py-20 text-center'>Loading post...</div>;
  if (!post) return <div className='py-20 text-center'>Post not found</div>;

  return (
    <div className='bg-white pb-16'>
      {/* Hero */}
      <div className='relative h-[400px] w-full'>
        <img
          src={`https://picsum.photos/seed/${post.id}/1920/600`}
          alt='Cover'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-black/50' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='max-w-3xl px-4 text-center text-white'>
            <div className='flex items-center justify-center gap-4 text-sm font-medium mb-4 opacity-80'>
              <span className='flex items-center gap-1'>
                <Calendar size={16} /> Nov 20, 2024
              </span>
              <span className='flex items-center gap-1'>
                <User size={16} /> Admin
              </span>
            </div>
            <h1 className='text-3xl md:text-5xl font-bold leading-tight'>
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <Link
          to='/blog'
          className='inline-flex items-center text-gray-500 hover:text-accent mb-8'
        >
          <ArrowLeft size={18} className='mr-2' /> Back to Blog
        </Link>

        <article className='prose prose-lg prose-blue max-w-none'>
          <p className='text-xl leading-relaxed text-gray-700 mb-8'>
            {post.body}
          </p>
          <p className='text-gray-600 mb-6'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <blockquote className='border-l-4 border-accent pl-6 italic text-gray-900 my-8 bg-gray-50 py-4 pr-4 rounded-r-lg'>
            "Fashion is part of the daily air and it does not change all the
            time, with all the events. You can even see the approaching of a
            revolution in clothes."
          </blockquote>
          <p className='text-gray-600 mb-6'>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </article>

        <div className='mt-12 pt-8 border-t border-gray-100 flex items-center justify-between'>
          <div className='flex gap-2'>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className='bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1'
              >
                <Tag size={14} /> {tag}
              </span>
            ))}
          </div>
          <div className='flex gap-4'>
            <button className='p-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors'>
              <Facebook size={18} />
            </button>
            <button className='p-2 rounded-full bg-gray-100 hover:bg-blue-400 hover:text-white transition-colors'>
              <Twitter size={18} />
            </button>
            <button className='p-2 rounded-full bg-gray-100 hover:bg-blue-700 hover:text-white transition-colors'>
              <Linkedin size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
