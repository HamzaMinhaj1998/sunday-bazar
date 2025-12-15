export const AboutPage = () => {
  return (
    <div className='bg-white'>
      {/* Hero */}
      <div className='bg-gray-900 text-white py-24 text-center'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>Our Story</h1>
        <p className='text-gray-400 max-w-2xl mx-auto text-lg'>
          Building the future of e-commerce, one pixel at a time.
        </p>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
          <div>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>
              We are Sunday Bazar
            </h2>
            <p className='text-gray-600 leading-relaxed mb-6'>
              Founded in 2025, Sunday Bazar has grown from a small startup to a
              global player in the e-commerce space. Our mission is simple: to
              provide high-quality products at affordable prices while
              delivering an exceptional customer experience.
            </p>
            <p className='text-gray-600 leading-relaxed'>
              We believe in sustainability, ethical sourcing, and community.
              Every product in our catalog is curated with care, ensuring that
              it meets our strict standards for quality and design.
            </p>
          </div>
          <div className='relative'>
            <img
              src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop'
              alt='Team'
              className='rounded-2xl shadow-xl'
            />
            <div className='absolute -bottom-6 -left-6 bg-accent text-white p-8 rounded-xl hidden md:block'>
              <p className='text-4xl font-bold mb-1'>10k+</p>
              <p className='text-sm opacity-90'>Happy Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className='bg-gray-50 py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900'>
              Our Core Values
            </h2>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                title: 'Quality First',
                desc: 'We never compromise on the quality of our products.',
              },
              {
                title: 'Customer Focus',
                desc: 'Our customers are at the heart of everything we do.',
              },
              {
                title: 'Sustainability',
                desc: 'We are committed to reducing our environmental footprint.',
              },
            ].map((val, idx) => (
              <div
                key={idx}
                className='bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center'
              >
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  {val.title}
                </h3>
                <p className='text-gray-600'>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
