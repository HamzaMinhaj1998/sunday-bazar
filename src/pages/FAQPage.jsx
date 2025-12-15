import { Plus } from 'lucide-react';

export const FAQPage = () => {
  return (
    <div className='bg-gray-50 min-h-screen py-16'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Frequently Asked Questions
          </h1>
          <p className='text-gray-500'>Have questions? We're here to help.</p>
        </div>

        <div className='space-y-4'>
          {[
            'How do I track my order?',
            'What is your return policy?',
            'Do you ship internationally?',
            'How can I contact customer support?',
            'Is my payment information secure?',
          ].map((q, idx) => (
            <div
              key={idx}
              className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'
            >
              <details className='group'>
                <summary className='flex items-center justify-between p-6 cursor-pointer list-none'>
                  <span className='font-bold text-gray-900'>{q}</span>
                  <span className='transition-transform group-open:rotate-45'>
                    <Plus size={20} className='text-gray-400' />
                  </span>
                </summary>
                <div className='px-6 pb-6 text-gray-600'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
