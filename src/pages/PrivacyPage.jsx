import { Database, Eye, Lock, Shield } from 'lucide-react';

export const PrivacyPage = () => {
  return (
    <div className='bg-white min-h-screen py-16'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Privacy Policy
          </h1>
          <p className='text-gray-500'>Last updated: December 2025</p>
        </div>

        <div className='prose prose-lg max-w-none text-gray-600'>
          <p className='lead text-xl text-gray-700 mb-8'>
            At Sunday Bazar, we take your privacy seriously. This policy
            describes how we collect, use, and protect your personal information
            when you use our website.
          </p>

          <div className='grid md:grid-cols-2 gap-8 my-12 not-prose'>
            <div className='bg-gray-50 p-6 rounded-xl border border-gray-100'>
              <div className='flex items-center gap-3 mb-4'>
                <Database className='text-accent' />
                <h3 className='font-bold text-gray-900'>Data Collection</h3>
              </div>
              <p className='text-sm'>
                We collect information you provide directly to us, such as when
                you create an account, make a purchase, or contact support.
              </p>
            </div>
            <div className='bg-gray-50 p-6 rounded-xl border border-gray-100'>
              <div className='flex items-center gap-3 mb-4'>
                <Eye className='text-accent' />
                <h3 className='font-bold text-gray-900'>Data Usage</h3>
              </div>
              <p className='text-sm'>
                We use your information to process orders, improve our services,
                and communicate with you about promotions and updates.
              </p>
            </div>
            <div className='bg-gray-50 p-6 rounded-xl border border-gray-100'>
              <div className='flex items-center gap-3 mb-4'>
                <Lock className='text-accent' />
                <h3 className='font-bold text-gray-900'>Security</h3>
              </div>
              <p className='text-sm'>
                We implement industry-standard security measures to protect your
                personal data from unauthorized access or disclosure.
              </p>
            </div>
            <div className='bg-gray-50 p-6 rounded-xl border border-gray-100'>
              <div className='flex items-center gap-3 mb-4'>
                <Shield className='text-accent' />
                <h3 className='font-bold text-gray-900'>Your Rights</h3>
              </div>
              <p className='text-sm'>
                You have the right to access, correct, or delete your personal
                information at any time through your account settings.
              </p>
            </div>
          </div>

          <h2 className='text-2xl font-bold text-gray-900 mt-12 mb-6'>
            1. Information We Collect
          </h2>
          <p>
            We collect several types of information from and about users of our
            Website, including information:
          </p>
          <ul className='list-disc pl-5 space-y-2 mb-6'>
            <li>
              By which you may be personally identified, such as name, postal
              address, e-mail address, telephone number, or credit card number
              ("personal information");
            </li>
            <li>
              About your internet connection, the equipment you use to access
              our Website, and usage details.
            </li>
          </ul>

          <h2 className='text-2xl font-bold text-gray-900 mt-12 mb-6'>
            2. How We Use Your Information
          </h2>
          <p>
            We use information that we collect about you or that you provide to
            us, including any personal information:
          </p>
          <ul className='list-disc pl-5 space-y-2 mb-6'>
            <li>To present our Website and its contents to you.</li>
            <li>
              To provide you with information, products, or services that you
              request from us.
            </li>
            <li>To fulfill any other purpose for which you provide it.</li>
            <li>
              To provide you with notices about your account, including
              expiration and renewal notices.
            </li>
            <li>
              To carry out our obligations and enforce our rights arising from
              any contracts entered into between you and us, including for
              billing and collection.
            </li>
          </ul>

          <h2 className='text-2xl font-bold text-gray-900 mt-12 mb-6'>
            3. Disclosure of Your Information
          </h2>
          <p>
            We may disclose aggregated information about our users, and
            information that does not identify any individual, without
            restriction. We may disclose personal information that you provide
            as described in this privacy policy:
          </p>
          <ul className='list-disc pl-5 space-y-2 mb-6'>
            <li>To our subsidiaries and affiliates.</li>
            <li>
              To contractors, service providers, and other third parties we use
              to support our business.
            </li>
            <li>
              To a buyer or other successor in the event of a merger,
              divestiture, restructuring, reorganization, dissolution, or other
              sale or transfer of some or all of Sunday Bazar's assets.
            </li>
          </ul>

          <h2 className='text-2xl font-bold text-gray-900 mt-12 mb-6'>
            4. Contact Information
          </h2>
          <p>
            To ask questions or comment about this privacy policy and our
            privacy practices, contact us at:{' '}
            <a
              href='mailto:privacy@sundaybazar.com'
              className='text-accent hover:underline'
            >
              privacy@sundaybazar.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
