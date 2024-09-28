import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Spinner = ({ className }: { className?: string }): JSX.Element => {
  return (
    <div>
      <Loader2 className={cn("w-4 h-4 animate-spin", className)} />
    </div>
  );
};

export default Spinner;
