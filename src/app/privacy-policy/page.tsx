import Link from "next/link";

const PrivacyPolicyPage = (): JSX.Element => {
  return (
    <div className="bg-black text-gray-300 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-white mb-8">
          Privacy Policy for Docsify
        </h1>

        <div className="space-y-8 border-t border-gray-800 pt-8">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to Docsify. This Privacy Policy describes how Docsify
              (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects,
              uses, and shares information about you when you use our website
              and services (collectively, the &quot;Service&quot;). By accessing
              or using the Service, you consent to the collection and use of
              your information in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Information We Collect
            </h2>
            <p>
              We collect information about you directly from you and from
              third-party services. The types of information we may collect
              include:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Personal Information:</strong> When you create an
                account, we collect personal information such as your email
                address and password.
              </li>
              <li>
                <strong>Payment Information:</strong> We use Stripe to process
                payments for subscription services. When you make a payment, you
                provide payment information directly to Stripe. We do not store
                your payment information on our servers.
              </li>
              <li>
                <strong>Usage Information:</strong> We collect information about
                your use of the Service, including your IP address, browser
                type, operating system, pages visited, and the time and date of
                each visit.
              </li>
              <li>
                <strong>Third-Party Information:</strong> We may receive
                information about you from third-party services, such as OpenAI
                and Supabase, when you interact with these services through our
                platform.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>To Provide and Improve the Service:</strong> We use your
                personal information to operate, maintain, and improve the
                features and functionality of the Service.
              </li>
              <li>
                <strong>To Process Transactions:</strong> We use your
                information to process payments for subscriptions and provide
                customer support related to billing.
              </li>
              <li>
                <strong>To Communicate with You:</strong> We use your email
                address to send you account-related communications, such as
                password resets, updates to the Service, and promotional
                messages. You can opt out of promotional emails at any time.
              </li>
              <li>
                <strong>To Ensure Security and Prevent Fraud:</strong> We use
                the information to protect the security and integrity of the
                Service and to detect and prevent fraud or other illegal
                activities.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Sharing Your Information
            </h2>
            <p>
              We do not sell or rent your personal information to third parties.
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>With Third-Party Service Providers:</strong> We share
                information with service providers who assist us in operating
                the Service, such as payment processing (Stripe), data storage
                (Supabase), and AI functionality (OpenAI). These service
                providers have access to your information only to perform
                specific tasks on our behalf and are obligated not to disclose
                or use it for any other purpose.
              </li>
              <li>
                <strong>As Required by Law:</strong> We may disclose your
                information to comply with applicable laws, regulations, legal
                processes, or governmental requests.
              </li>
              <li>
                <strong>Business Transfers:</strong> If Docsify is acquired by
                or merged with another company, your information may be
                transferred as part of that transaction.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Data Retention
            </h2>
            <p>
              We will retain your personal information for as long as your
              account is active or as needed to provide you with the Service. We
              will also retain and use your information as necessary to comply
              with our legal obligations, resolve disputes, and enforce our
              agreements.
            </p>
          </section>

          {/* Add more sections here following the same pattern */}

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Data Security
            </h2>
            <p>
              We take reasonable measures to protect your personal information
              from unauthorized access, use, alteration, or destruction.
              However, no method of transmission over the internet or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Your Rights and Choices
            </h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Access and Update Information:</strong> You have the
                right to access and update the personal information you provide
                to us. You can do this by logging into your account or
                contacting us at{" "}
                <span className="text-sky-400 hover:text-sky-500 hover:underline cursor-pointer">
                  jacob.boron6@gmail.com
                </span>
              </li>
              <li>
                <strong>Opt-Out of Communications:</strong> You may opt out of
                receiving promotional emails from us by following the
                instructions in those emails. If you opt out, we may still send
                you non-promotional emails, such as those about your account or
                our ongoing business relations.
              </li>
              <li>
                <strong>Cookies and Tracking Technologies:</strong> We use
                cookies and similar tracking technologies to analyze trends,
                administer the website, track users’ movements around the
                website, and gather demographic information about our user base
                as a whole. You can control the use of cookies at the individual
                browser level.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. International Data Transfers
            </h2>
            <p>
              As a company based in Poland, your personal information may be
              processed in Poland and other countries. By using the Service, you
              consent to the transfer of your information to countries outside
              of your country of residence, which may have different data
              protection rules than in your country.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. If we make
              material changes, we will notify you by email or through the
              Service. Your continued use of the Service after the changes
              become effective will constitute acceptance of the revised Privacy
              Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              10. Contact Us
            </h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or
              our privacy practices, please contact us at:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Email: </strong>
                <span className="text-sky-400 hover:text-sky-500 hover:underline cursor-pointer">
                  jacob.boron6@gmail.com
                </span>
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <Link
                  href={"/"}
                  className="text-sky-400 hover:text-sky-500 hover:underline cursor-pointer"
                >
                  https://www.docsify.tech
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              11. Governing Law
            </h2>
            <p>
              This Privacy Policy is governed by and construed in accordance
              with the laws of Poland, without regard to its conflict of law
              principles. Any disputes arising out of or related to this Privacy
              Policy will be resolved exclusively in the courts of Poland.
            </p>
          </section>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500">
            By using Docsify, you consent to the collection and use of your
            information as outlined in this Privacy Policy. Please review this
            policy regularly to ensure you are aware of any updates or changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
