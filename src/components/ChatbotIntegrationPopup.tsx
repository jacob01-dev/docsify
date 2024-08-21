import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";

const ChatbotIntegrationPopup = ({
  chatbot_public_id,
}: {
  chatbot_public_id: string;
}): JSX.Element => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="w-full flex items-center justify-end gap-x-2 p-4 transition-all hover:translate-x-1 hover:text-muted-foreground
      "
        >
          <h3 className="text-sm">See more</h3>
          <ChevronRight className="w-5 h-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Integrate with your website</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4 grid-flow-row">
            <h3 className="font-medium">
              1. Copy this script tag and paste it into your HTML
            </h3>
            <code className="border border-border p-4 rounded-lg max-w-[23rem]">
              &lt;script
              src="https://cdn.jsdelivr.net/npm/docsify@4/lib/docsify.min.js"
              id="{chatbot_public_id}"&gt;&lt;/script&gt;
            </code>
          </div>
          <div className="grid items-center gap-4 grid-flow-row">
            <h3 className="font-medium">2. Done</h3>
            <p className="text-muted-foreground">
              Your tailored chatbot is ready to use in your website
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotIntegrationPopup;
