"use client";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const LogoutButton = (): JSX.Element => {
  const router = useRouter();
  const supabase = createClient();
  
  const handleClick = () => {
    try {
      supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenuItem
      onClick={handleClick}
      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      Logout
    </DropdownMenuItem>
  );
};

export default LogoutButton;
