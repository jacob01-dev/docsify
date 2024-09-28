import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";

export function AnimatedGradientButton({ className }: { className?: string }) {
  return (
    <AnimatedGradientText className="relative rounded-sm py-4 px-12 flex justify-between items-center">
      <div className="relative z-20 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5 text-white animate-pulse transition-all group-hover:animate-none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          />
        </svg>

        <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300 animate-pulse transition-all group-hover:animate-none" />

        <span
          className={cn(
            `inline text-foreground animate-pulse transition-all group-hover:animate-none`,
            className
          )}
        >
          Get Started
        </span>

        <ChevronRight className="ml-1 size-4 text-white animate-pulse transition-all group-hover:translate-x-1 group-hover:animate-none" />
      </div>
    </AnimatedGradientText>
  );
}
