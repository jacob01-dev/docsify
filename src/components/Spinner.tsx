import { cn } from "@/lib/utils";

const Spinner = ({ className }: { className?: string }): JSX.Element => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-r-foreground border-l-background",
        className
      )}
    ></div>
  );
};

export default Spinner;
