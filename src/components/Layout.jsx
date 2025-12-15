import { Outlet } from 'react-router';
import { CartDrawer } from './CartDrawer';
import { Footer } from './Footer';
import { Header } from './Header';
import { ScrollToTop } from './ScrollToTop';

export const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-white font-sans text-gray-900'>
      <ScrollToTop />
      <Header />
      <CartDrawer />
      <main className='grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
