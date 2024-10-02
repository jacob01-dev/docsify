"use client";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { CircleHelp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetSubscription from "@/hooks/useGetSubscription";
import useGetQuestionsRemaining from "@/hooks/useGetQuestionsRemaining";
import NumberTicker from "./magicui/number-ticker";
import { useState } from "react";

const StatisticsCards = (): JSX.Element => {
  const [plan, setPlan] = useState<any>();
  useGetSubscription({ setSubscription: setPlan });
  const [questionsRemaining, setQuestionsRemaining] = useState<number>(0);

  useGetQuestionsRemaining({ setQuestionsRemaining: setQuestionsRemaining });

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
            <div className="text-2xl font-bold">
              {plan ? (
                <h2>{plan.questions_per_month - questionsRemaining}</h2>
              ) : (
                "Loading"
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Reached{" "}
              <span className="font-medium text-foreground/80">
                {plan && questionsRemaining != null
                  ? ((plan.questions_per_month - questionsRemaining) /
                      plan.questions_per_month) *
                    100
                  : "0"}
                %
              </span>{" "}
              of monthly quota
            </p>
          </CardContent>
        </Card>
        <Card className="w-full min-w-sm flex-grow bg-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Tier</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plan?.title ?? "Loading"}</div>
            <p className="text-xs text-muted-foreground">
              {plan?.description ?? "Loading"}
            </p>
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
};

export default StatisticsCards;
