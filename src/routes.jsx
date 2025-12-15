import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { BlogPage } from './pages/BlogPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ComparePage } from './pages/ComparePage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { OrderSummaryPage } from './pages/OrderSummaryPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ShippingPage } from './pages/ShippingPage';
import { ShopPage } from './pages/ShopPage';
import { SignupPage } from './pages/SignupPage';
import { UserAddressesPage } from './pages/UserAddressesPage';
import { UserOrdersPage } from './pages/UserOrdersPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { UserSettingsPage } from './pages/UserSettingsPage';
import { WishlistPage } from './pages/WishlistPage';
const router = createBrowserRouter([
  {
    path: '/sunday-bazar/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'product/:id', element: <ProductDetailPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'order-summary', element: <OrderSummaryPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'compare', element: <ComparePage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:id', element: <BlogDetailPage /> },
      { path: 'faq', element: <FAQPage /> },
      { path: 'profile', element: <UserProfilePage /> },
      { path: 'orders', element: <UserOrdersPage /> },
      { path: 'addresses', element: <UserAddressesPage /> },
      { path: 'settings', element: <UserSettingsPage /> },
      { path: 'shipping', element: <ShippingPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      {
        path: '*',
        element: <div className='p-20 text-center'>Page Not Found</div>,
      },
    ],
  },
]);

export const routes = router;
