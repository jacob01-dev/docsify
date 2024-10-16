import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-gray-400 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-white text-xl font-bold mb-2">Docsify</h2>
            <p className="text-sm text-gray-500">
              Tailored Technical Support for your SaaS.
            </p>
          </div>

          <nav className="mt-4 md:mt-0">
            <ul className="flex flex-wrap gap-6">
              {["Pricing", "Log in", "Sign up"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="w-full">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-start gap-4">
            <a
              title="ai tools code.market"
              href="https://code.market?code.market=verified"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                alt="ai tools code.market"
                title="ai tools code.market"
                src="https://code.market/assets/manage-product/featured-logo-dark.svg"
                className="w-auto h-8"
              />
            </a>

            {/* Additional badges can be added here */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2024 Docsify. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/terms-of-service"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
