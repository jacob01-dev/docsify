"use client";

import { ArrowRight, UserRoundPlus } from "lucide-react";
import ChatWidgetDemo from "./ChatWidgetDemo";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
const WidgetOverviewSection = (): JSX.Element => {
  return (
    <MaxWidthWrapper className="w-full min-h-screen">
      <motion.div
        className="w-full min-h-screen flex items-center justify-center pb-10 lg:pb-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 1, duration: 3 }}
        variants={{
          visible: { backgroundColor: "#fff" },
          hidden: { backgroundColor: "#09090b" },
        }}
      >
        <section className="w-full min-h-full flex flex-grow flex-col lg:flex-row items-center gap-y-12 mt-32 lg:mt-0">
          <div className="w-full lg:w-1/2 h-max p-4 flex items-center justify-center lg:skew-y-12">
            <ChatWidgetDemo />
          </div>
          <div className="w-1/2 flex items-center justify-center flex-col gap-y-6">
            <h3 className="text-5xl font-medium text-center text-background">
              Make your Code Documentation more Powerful
            </h3>
            <motion.p
              className="text-xl text-center text-muted-foreground max-w-prose"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 1, duration: 2 }}
              variants={{
                visible: { color: "#71717a" },
                hidden: { color: "#09090b" },
              }}
            >
              Boost user engagement and reduce support requests by transforming
              your static documentation into a dynamic, conversational
              experience.
            </motion.p>
            <Link href={"/#pricing"}>
              <Button
                variant={"ghost"}
                size={"lg"}
                className="gap-x-2 text-background"
              >
                See Pricing <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </motion.div>
    </MaxWidthWrapper>
  );
};

export default WidgetOverviewSection;
