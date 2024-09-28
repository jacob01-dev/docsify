"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import MobileNavbar from "./MobileNavbar";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const Header = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const supabase = createClient();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const user = data.session?.user;
        if (user) setIsLoggedIn(true);
        else setIsLoggedIn(false);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkIfLoggedIn();
  }, [supabase]);
  return (
    <header
      className={`fixed top-0 min-w-full p-6 z-30 backdrop-blur-sm backdrop-filter bg-background`}
    >
      {
        // Desktop navbar
      }
      <div className="w-full h-full hidden lg:grid grid-cols-3 grid-flow-col">
        <div className="flex items-center justify-start">
          <Link
            href={"#"}
            className="flex flex-row gap-x-1 justify-center items-center transition-all group"
          >
            <h1 className="text-foreground text-4xl font-bold transition-all group-hover:text-muted-foreground">
              Docsify
            </h1>
          </Link>
        </div>
        <nav className="flex items-center justify-center text-foreground gap-x-8">
          <div>
            <Link href={"#pricing"}>
              <h2 className="text-lg transition-all cursor-pointer hover:text-neutral-500">
                Pricing
              </h2>
            </Link>
          </div>
        </nav>
        <div className="flex items-center justify-end gap-x-4">
          {isLoggedIn ? (
            <Link href={"/dashboard"}>
              <Button
                size={"sm"}
                variant={"outline"}
                className="px-4 text-foreground"
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href={"login"}>
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="px-6 text-white"
                >
                  Log in
                </Button>
              </Link>
              <Link href={"/signup"}>
                <Button size={"sm"} variant={"default"} className="px-6">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      {
        // Mobile navbar
      }

      <div className="w-full h-full lg:hidden flex items-center justify-between">
        <Link href={"#"}>
          <h1 className="text-foreground text-4xl font-bold">Docsify</h1>
        </Link>
        <MobileNavbar isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
};

export default Header;
