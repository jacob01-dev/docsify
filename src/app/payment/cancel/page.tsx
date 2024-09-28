import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const PaymentSuccessPage = (): JSX.Element => {
  return (
    <MaxWidthWrapper className="relative dark min-h-screen flex items-center justify-center bg-black overflow-x-hidden">
      <Card className="z-10">
        <CardHeader>
          <CardTitle>Payment Canceled</CardTitle>
          <CardDescription>Your payment was canceled.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href={"/dashboard"}>
            <Button variant={"outline"} className="group">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardContent>
      </Card>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
    </MaxWidthWrapper>
  );
};

export default PaymentSuccessPage;
