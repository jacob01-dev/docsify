import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <div className={cn("min-w-full mx-auto", className)} {...props}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
