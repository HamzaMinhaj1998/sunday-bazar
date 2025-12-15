import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';
import { Link } from 'react-router';

export const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white pt-16 pb-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
          {/* Brand Info */}
          <div>
            <h2 className='text-2xl font-bold mb-6'>
              Sunday<span className='text-accent'>Bazar</span>
            </h2>
            <p className='text-gray-400 mb-6 leading-relaxed'>
              Premium curated collection of high-quality products for your
              modern lifestyle. Shop the latest trends with confidence.
            </p>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='bg-gray-800 p-2 rounded-full hover:bg-accent transition-colors'
              >
                <Facebook size={18} />
              </a>
              <a
                href='#'
                className='bg-gray-800 p-2 rounded-full hover:bg-accent transition-colors'
              >
                <Twitter size={18} />
              </a>
              <a
                href='#'
                className='bg-gray-800 p-2 rounded-full hover:bg-accent transition-colors'
              >
                <Instagram size={18} />
              </a>
              <a
                href='#'
                className='bg-gray-800 p-2 rounded-full hover:bg-accent transition-colors'
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-semibold mb-6'>Quick Links</h3>
            <ul className='space-y-4 text-gray-400'>
              <li>
                <Link
                  to='/about'
                  className='hover:text-accent transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to='/shop'
                  className='hover:text-accent transition-colors'
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to='/blog'
                  className='hover:text-accent transition-colors'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to='/contact'
                  className='hover:text-accent transition-colors'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link to='/faq' className='hover:text-accent transition-colors'>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className='text-lg font-semibold mb-6'>Customer Care</h3>
            <ul className='space-y-4 text-gray-400'>
              <li>
                <Link
                  to='/profile'
                  className='hover:text-accent transition-colors'
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to='/cart'
                  className='hover:text-accent transition-colors'
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to='/wishlist'
                  className='hover:text-accent transition-colors'
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to='/shipping'
                  className='hover:text-accent transition-colors'
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  to='/privacy'
                  className='hover:text-accent transition-colors'
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-lg font-semibold mb-6'>Contact Us</h3>
            <ul className='space-y-4 text-gray-400'>
              <li className='flex items-start'>
                <MapPin size={20} className='mr-3 mt-1 shrink-0 text-accent' />
                <span>123 Commerce St, Market City, NY 10010, USA</span>
              </li>
              <li className='flex items-center'>
                <Phone size={20} className='mr-3 shrink-0 text-accent' />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className='flex items-center'>
                <Mail size={20} className='mr-3 shrink-0 text-accent' />
                <span>support@sundaybazar.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm'>
          <p>&copy; 2025 Sunday Bazar. All rights reserved.</p>
          <div className='flex space-x-6 mt-4 md:mt-0'>
            <span className='hover:text-white cursor-pointer'>Terms</span>
            <span className='hover:text-white cursor-pointer'>Privacy</span>
            <span className='hover:text-white cursor-pointer'>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
