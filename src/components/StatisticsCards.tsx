"use client";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Bot, CircleHelp, DollarSign, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatisticsCards = (): JSX.Element => {
  return (
    <MaxWidthWrapper>
      <div className="w-full flex flex-col items-center lg:flex-row gap-x-6 gap-y-6">
        <Card className="w-full min-w-sm flex-grow bg-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Questions Asked
            </CardTitle>
            <CircleHelp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="">
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Reached 0% of monthly quota
            </p>
          </CardContent>
        </Card>
        <Card className="w-full min-w-sm flex-grow bg-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Tier</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Free</div>
            <p className="text-xs text-muted-foreground">
              Perfect for personal usage
            </p>
          </CardContent>
        </Card>
        <Card className="w-full min-w-sm flex-grow bg-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Created Chatbots
            </CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Reached 100% of quota
            </p>
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
};

export default StatisticsCards;
