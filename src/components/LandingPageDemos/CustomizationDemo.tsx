import { PlusCircle } from "lucide-react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CustomizationDemo = () => {
  return (
    <div className="absolute right-2 top-4 h-[300px] lg:w-[500px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105 mx-auto">
      <Card className="-z-10 opacity-75 select-none">
        <CardHeader>
          <CardTitle>Customize your chatbot</CardTitle>
          <CardDescription>
            Customize the look and feel of your chatbot.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-4">
          <div className="grid gap-y-2 grid-flow-row">
            <Label htmlFor="icon" className="text-base">
              Icon
            </Label>
            <div className="border border-dashed border-foreground rounded-sm">
              <div className="p-4 flex items-center justify-center flex-col gap-y-2">
                <PlusCircle />
                <p>Add an icon</p>
              </div>
            </div>
          </div>
          <div className="grid gap-y-2 grid-flow-row">
            <Label htmlFor="icon" className="text-base">
              Background
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomizationDemo;
