import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, Home, BookText, Gem, LogIn } from "lucide-react";
import Link from "next/link";
import MobileLink from "./MobileLink";

const links = [
  {
    href: "/",
    text: "Home",
    icon: <Home className="h-5 w-5" />,
  },
  {
    href: "/docs",
    text: "Docs",
    icon: <BookText className="h-5 w-5" />,
  },
  {
    href: "/#pricing",
    text: "Pricing",
    icon: <Gem className="h-5 w-5" />,
  },
  {
    href: "/login",
    text: "Get Started",
    icon: <LogIn className="h-5 w-5" />,
  },
];

const MobileNavbar = (): JSX.Element => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 text-foreground bg-background lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col dark bg-background text-foreground"
      >
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold py-2"
          >
            <span className="text-lg text-foreground">Docsify</span>
          </Link>
          {links.map(({ href, text, icon }, index) => (
            <MobileLink href={href} text={text} icon={icon} key={index} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
