import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Docsify | Transform your Code Documentation into a Chatbot",
  description:
    "AI powered app that allows you to chat with your code documentation for your project",
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
    </html>
  );
}
