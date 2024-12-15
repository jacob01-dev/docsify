import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  verification: {
    google: "",
  },
  title: "Docsify | Tailored Technical Support for Your SaaS",
  description:
    "Easily convert your knowledge base into a chatbot and boost your customer support efficiency.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        {children}
        <Toaster />
      </body>
      <GoogleAnalytics />
    </html>
  );
}
