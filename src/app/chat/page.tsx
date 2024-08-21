import GridPattern from "@/components/AnimatedGridPattern";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CornerDownLeft } from "lucide-react";
import Link from "next/link";

const ChatNotFoundPage = (): JSX.Element => {
  return (
    <MaxWidthWrapper className="h-screen flex items-center justify-center dark bg-background overflow-y-hidden">
      <Card className="max-w-[380px] dark bg-black bg-opacity-100">
        <CardHeader className="">
          <CardTitle>Chat ID was not found.</CardTitle>
          <CardDescription>
            Please provide a valid chat ID and try again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 items-center">
            <Link href={"/"}>
              <Button className="gap-x-2" size={"sm"} variant={"outline"}>
                Go back <CornerDownLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      <GridPattern
        numSquares={50}
        maxOpacity={0.3}
        duration={2}
        repeatDelay={3}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)] ",
          "inset-x-0 h-[100%] inset-y-[-10%] lg:inset-y-[-50%] w-full lg:w-[100%] lg:h-[200%] -skew-y-12",
          "fill-black/50 stroke-muted-foreground/5"
        )}
        fill="#71717a"
      />
    </MaxWidthWrapper>
  );
};

export default ChatNotFoundPage;
