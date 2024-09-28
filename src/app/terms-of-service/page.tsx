import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-black text-gray-300 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-white mb-8">
          Terms of Service for Docsify
        </h1>

        <div className="space-y-8 border-t border-gray-800 pt-8">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to Docsify! These Terms of Service (&quot;Terms&quot;)
              govern your access to and use of the Docsify website and services
              (&quot;Service&quot;). By accessing or using the Service, you
              agree to be bound by these Terms. If you do not agree to these
              Terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Description of the Service
            </h2>
            <p>
              Docsify allows users to create and deploy their personalized
              chatbot in minutes on their website. The Service includes the
              Docsify website located at https://www.docsify.tech.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Eligibility
            </h2>
            <p>
              You must be at least 18 years old to use the Service. By using the
              Service, you represent and warrant that you meet this age
              requirement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. User Accounts
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Registration:</strong> To use certain features of the
                Service, you may be required to create an account. You agree to
                provide accurate, current, and complete information during the
                registration process and to update such information to keep it
                accurate, current, and complete.
              </li>
              <li>
                <strong>Account Security:</strong> You are responsible for
                maintaining the confidentiality of your account login
                credentials and are fully responsible for all activities that
                occur under your account. You agree to immediately notify
                Docsify of any unauthorized use of your account or any other
                breach of security.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Subscriptions and Payments
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Subscriptions:</strong> Docsify offers subscription
                plans to access certain features of the Service. By subscribing,
                you agree to pay the subscription fees indicated on the Service.
                All fees are non-refundable.
              </li>
              <li>
                <strong>Payments:</strong> Payments are processed via Stripe, a
                third-party payment processor. By using Stripe, you agree to
                comply with Stripe&apos;s terms of service and privacy policy.
                Docsify does not store your payment information on its servers.
              </li>
            </ul>
          </section>

          {/* Add more sections here following the same pattern */}

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Data Collection and Privacy
            </h2>
            <p>
              Docsify collects certain information from users, including login
              credentials such as email addresses and passwords. Docsify
              respects your privacy and is committed to protecting your personal
              data. Please review our Privacy Policy to understand how we
              collect, use, and safeguard your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Use of Third-Party Services
            </h2>
            <p>
              Docsify integrates with third-party services such as the OpenAI
              API, Supabase, and Stripe. By using the Service, you agree to
              comply with the terms and conditions of these third-party
              services. Docsify is not responsible for the availability,
              accuracy, or content of third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Changes to the Service and Terms
            </h2>
            <p>
              Docsify reserves the right to modify or discontinue the Service,
              temporarily or permanently, with or without notice. Docsify may
              also modify these Terms from time to time. If changes are made,
              Docsify will provide notice through the Service or via email. Your
              continued use of the Service after such changes have been made
              constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. Disclaimer of Warranties
            </h2>
            <p>
              The Service is provided on an &quot;as is&quot; and &quot;as
              available&quot; basis. Docsify makes no representations or
              warranties of any kind, express or implied, about the operation or
              availability of the Service, the accuracy of the content provided
              through the Service, or the security of user information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              10. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Docsify shall not be
              liable for any direct, indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or
              revenues, whether incurred directly or indirectly, or any loss of
              data, use, goodwill, or other intangible losses, resulting from
              (i) your use or inability to use the Service; (ii) any
              unauthorized access to or use of our servers and/or any personal
              information stored therein.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              11. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of Poland, without regard to its conflict of law
              principles. Any legal actions, suits, or proceedings arising out
              of or related to these Terms shall be brought exclusively in the
              courts located in Poland.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              12. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <span className="text-sky-500 hover:text-sky-600 hover:underline hover:cursor-pointer">
                jacob@docsify.tech
              </span>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500">
            By using Docsify, you agree to these Terms of Service. Please review
            these Terms regularly to ensure you are aware of any changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
