import { MapPin, RefreshCcw, Truck } from 'lucide-react';

export const ShippingPage = () => {
  return (
    <div className='bg-gray-50 min-h-screen py-16'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Shipping & Returns
          </h1>
          <p className='text-gray-500'>
            Everything you need to know about delivery and refunds.
          </p>
        </div>

        <div className='space-y-12'>
          {/* Shipping Policy */}
          <section className='bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='p-3 bg-blue-50 text-accent rounded-lg'>
                <Truck size={24} />
              </div>
              <h2 className='text-2xl font-bold text-gray-900'>
                Shipping Policy
              </h2>
            </div>

            <div className='space-y-6 text-gray-600'>
              <p>
                At Sunday Bazar, we strive to deliver your orders as quickly and
                efficiently as possible. We partner with major carriers to
                ensure reliable delivery to your doorstep.
              </p>

              <div className='grid md:grid-cols-2 gap-6 mt-6'>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <h3 className='font-bold text-gray-900 mb-2'>
                    Standard Shipping
                  </h3>
                  <p className='text-sm'>Delivery in 3-5 business days.</p>
                  <p className='text-sm font-medium mt-2 text-green-600'>
                    Free on orders over $99
                  </p>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <h3 className='font-bold text-gray-900 mb-2'>
                    Express Shipping
                  </h3>
                  <p className='text-sm'>Delivery in 1-2 business days.</p>
                  <p className='text-sm font-medium mt-2 text-gray-900'>
                    Flat rate of $15.00
                  </p>
                </div>
              </div>

              <h3 className='font-bold text-gray-900 mt-4'>Order Processing</h3>
              <ul className='list-disc pl-5 space-y-2'>
                <li>Orders are processed within 24 hours of placement.</li>
                <li>
                  Orders placed on weekends or holidays will be processed the
                  next business day.
                </li>
                <li>
                  You will receive a tracking number via email once your order
                  ships.
                </li>
              </ul>
            </div>
          </section>

          {/* Returns Policy */}
          <section className='bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='p-3 bg-blue-50 text-accent rounded-lg'>
                <RefreshCcw size={24} />
              </div>
              <h2 className='text-2xl font-bold text-gray-900'>
                Returns & Exchanges
              </h2>
            </div>

            <div className='space-y-6 text-gray-600'>
              <p>
                We want you to love your purchase. If you are not completely
                satisfied, you may return items within 30 days of delivery for a
                full refund or exchange.
              </p>

              <div className='bg-yellow-50 border border-yellow-100 p-4 rounded-lg text-sm text-yellow-800'>
                <strong>Note:</strong> Items must be unused, in original
                packaging, and with all tags attached.
              </div>

              <h3 className='font-bold text-gray-900 mt-4'>How to Return</h3>
              <ol className='list-decimal pl-5 space-y-2'>
                <li>Log in to your account and go to "My Orders".</li>
                <li>Select the order and items you wish to return.</li>
                <li>Print the prepaid return shipping label.</li>
                <li>
                  Pack items securely and drop off at any authorized shipping
                  center.
                </li>
              </ol>

              <h3 className='font-bold text-gray-900 mt-4'>Refunds</h3>
              <p>
                Once we receive your return, we will inspect the items and
                process your refund within 5-7 business days. Refunds will be
                issued to the original payment method.
              </p>
            </div>
          </section>

          {/* International Shipping */}
          <section className='bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='p-3 bg-blue-50 text-accent rounded-lg'>
                <MapPin size={24} />
              </div>
              <h2 className='text-2xl font-bold text-gray-900'>
                International Shipping
              </h2>
            </div>

            <div className='space-y-4 text-gray-600'>
              <p>
                We currently ship to over 50 countries worldwide. International
                shipping rates are calculated at checkout based on weight and
                destination.
              </p>
              <p>
                Please note that international customers are responsible for any
                customs duties, taxes, or import fees that may apply upon
                delivery.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
