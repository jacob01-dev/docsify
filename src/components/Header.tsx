"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import MobileNavbar from "./MobileNavbar";
import { useState, useEffect } from "react";

const Header = (): JSX.Element => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 min-w-full p-6 z-10 backdrop-blur-sm backdrop-filter ${
        isSticky ? "bg-background" : ""
      }`}
    >
      {
        // Desktop navbar
      }
      <div className="w-full h-full hidden lg:grid grid-cols-3 grid-flow-col">
        <div className="flex items-center justify-start">
          <Link href={"#"}>
            <h1 className="text-foreground text-4xl font-bold">Docsify</h1>
          </Link>
        </div>
        <nav className="flex items-center justify-center text-foreground gap-x-8">
          <div>
            <Link href={"#pricing"}>
              <h2 className="text-lg transition-all cursor-pointer hover:text-accent">
                Pricing
              </h2>
            </Link>
          </div>
          <div>
            <Link href={"/docs"}>
              <h2 className="text-lg transition-all cursor-pointer hover:text-accent">
                Docs
              </h2>
            </Link>
          </div>
        </nav>
        <div className="flex items-center justify-end gap-x-4">
          <Link href={"login"}>
            <Button size={"sm"} className="px-6">
              Sign in
            </Button>
          </Link>
          <Link href={"/signup"}>
            <Button
              size={"sm"}
              variant={"secondary"}
              className="text-foreground px-6"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </div>
      {
        // Mobile navbar
      }

      <div className="w-full h-full lg:hidden flex items-center justify-between">
        <Link href={"#"}>
          <h1 className="text-foreground text-4xl font-bold">Docsify</h1>
        </Link>
        <MobileNavbar />
      </div>
    </header>
  );
};

export default Header;
