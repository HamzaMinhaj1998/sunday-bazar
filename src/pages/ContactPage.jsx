import { Mail, MapPin, Phone, Send } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div className='bg-gray-50 min-h-screen py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Get in Touch
          </h1>
          <p className='text-gray-500 max-w-2xl mx-auto'>
            We'd love to hear from you. Please fill out this form or shoot us an
            email.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Contact Info */}
          <div className='space-y-6'>
            <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center hover:-translate-y-1 transition-transform duration-300'>
              <div className='w-12 h-12 bg-blue-50 text-accent rounded-full flex items-center justify-center mx-auto mb-4'>
                <Phone size={24} />
              </div>
              <h3 className='font-bold text-gray-900 mb-2'>Phone</h3>
              <p className='text-gray-500 mb-4'>Mon-Fri from 8am to 5pm.</p>
              <a
                href='tel:+15550000000'
                className='text-accent font-medium hover:underline'
              >
                +1 (555) 000-0000
              </a>
            </div>

            <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center hover:-translate-y-1 transition-transform duration-300'>
              <div className='w-12 h-12 bg-blue-50 text-accent rounded-full flex items-center justify-center mx-auto mb-4'>
                <Mail size={24} />
              </div>
              <h3 className='font-bold text-gray-900 mb-2'>Email</h3>
              <p className='text-gray-500 mb-4'>
                Our friendly team is here to help.
              </p>
              <a
                href='mailto:support@sundaybazar.com'
                className='text-accent font-medium hover:underline'
              >
                support@sundaybazar.com
              </a>
            </div>

            <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center hover:-translate-y-1 transition-transform duration-300'>
              <div className='w-12 h-12 bg-blue-50 text-accent rounded-full flex items-center justify-center mx-auto mb-4'>
                <MapPin size={24} />
              </div>
              <h3 className='font-bold text-gray-900 mb-2'>Office</h3>
              <p className='text-gray-500 mb-4'>
                Come say hello at our office HQ.
              </p>
              <p className='text-gray-900 font-medium'>
                100 Smith Street, Collingwood VIC 3066 AU
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className='lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 lg:p-12'>
            <h2 className='text-2xl font-bold text-gray-900 mb-8'>
              Send us a Message
            </h2>
            <form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    First Name
                  </label>
                  <input
                    type='text'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent'
                    placeholder='John'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent'
                    placeholder='Doe'
                  />
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Email Address
                </label>
                <input
                  type='email'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent'
                  placeholder='you@company.com'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Subject
                </label>
                <select className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent'>
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Returns & Exchanges</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Message
                </label>
                <textarea
                  rows={5}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent'
                  placeholder='How can we help you?'
                ></textarea>
              </div>
              <button className='w-full bg-gray-900 text-white font-bold py-4 rounded-lg hover:bg-accent transition-all duration-300 flex items-center justify-center gap-2'>
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
