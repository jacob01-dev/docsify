import Link from "next/link";
import {
  Bell,
  BotMessageSquare,
  CircleUser,
  CreditCard,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Sparkles,
  Users,
} from "lucide-react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeProvider } from "@/components/ThemeProvider";
import LogoutButton from "@/components/LogoutButton";
import LocationAwareLink from "@/components/LocationAwareLink";
import { cn } from "@/lib/utils";

const DashboardLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <MaxWidthWrapper className="">
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Sparkles className="h-6 w-6" />
                  <span className="">Docsify</span>
                </Link>
              </div>
              <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-y-2">
                  <LocationAwareLink href="/dashboard">
                    <BotMessageSquare className="h-4 w-4" />
                    Your Chatbots
                  </LocationAwareLink>
                  <LocationAwareLink href="/dashboard/payments">
                    <CreditCard className="h-4 w-4" />
                    Payments
                  </LocationAwareLink>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <nav className="grid gap-2 text-lg font-medium">
                    <Link
                      href="#"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <Sparkles className="h-6 w-6" />
                      <span className="sr-only">Docsify</span>
                    </Link>
                    <LocationAwareLink
                      href="/dashboard"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground"
                    >
                      <BotMessageSquare className="h-5 w-5" />
                      Your Chatbots
                    </LocationAwareLink>
                    <LocationAwareLink
                      href="/dashboard/payments"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground"
                    >
                      <CreditCard className="h-5 w-5" />
                      Payments
                    </LocationAwareLink>
                  </nav>
                </SheetContent>
              </Sheet>
              <div className="w-full flex-1"></div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <LogoutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
            <main
              className={cn(
                "flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6",
                className
              )}
            >
              {children}
            </main>
          </div>
        </div>
      </MaxWidthWrapper>
    </ThemeProvider>
  );
};

export default DashboardLayout;
