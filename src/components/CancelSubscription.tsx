import { Ellipsis, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CancelSubscriptionDialog from "./CancelSubscriptionDialog";

const CancelSubscription = (): JSX.Element => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"} className="">
          <Ellipsis className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Your Subscription</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <CancelSubscriptionDialog>
            <DropdownMenuItem
              className="bg-destructive focus:bg-destructive/70 focus:cursor-pointer transition-all"
              onSelect={(e) => e.preventDefault()}
            >
              <X className="mr-2 h-4 w-4" />
              <span>Cancel subscription</span>
            </DropdownMenuItem>
          </CancelSubscriptionDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CancelSubscription;
