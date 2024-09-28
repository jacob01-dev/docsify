"use client";
import Link from "next/link";

const MobileLink = ({
  href,
  text,
  className,
  icon,
}: {
  href: string;
  text: string;
  icon?: React.ReactNode;
  className?: string;
}): JSX.Element => {
  return (
    <Link
      href={href}
      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
    >
      {icon}
      {text}
    </Link>
  );
};

export default MobileLink;
