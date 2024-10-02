"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { useToast } from "../ui/use-toast";
const DeleteChatbot = ({
  chatbot_public_id,
  setChatbots,
  chatbots,
}: {
  chatbot_public_id: string;
  setChatbots: (chatbots: any[]) => void;
  chatbots: any[];
}): JSX.Element => {
  const toaster = useToast();
  const handleDelete = async () => {
    const dataToSend = new FormData();
    dataToSend.append("chatbot_id", chatbot_public_id);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_PRODUCTION === "true"
          ? "https://docsify.tech/api/delete"
          : "http://localhost:3000/api/delete",
        {
          method: "POST",
          body: dataToSend,
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          setChatbots(
            chatbots.filter(
              (chatbot) => chatbot.public_id !== chatbot_public_id
            )
          );
        } else {
          toaster.toast({
            title: "Something went wrong",
            description: "Please try again",
          });
        }
      }
    } catch (error) {
      toaster.toast({
        title: "Something went wrong",
        description: "Please try again",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="p-2 h-min rounded-xl transition-all hover:bg-background">
          <X className="w-5 h-5 group transition-all duration-500 hover:-rotate-180" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to delete this chatbot?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            chatbot.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteChatbot;
