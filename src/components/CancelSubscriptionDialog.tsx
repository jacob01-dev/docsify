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
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";

const CancelSubscriptionDialog = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const toaster = useToast();

  const handleCancel = async () => {
    const request = await fetch("/api/subscription/cancel");

    if (!request.ok) {
      toaster.toast({
        title: "Something went wrong",
        description: "Please try again",
      });
    }

    const response = await request.json();

    if (response.error) {
      toaster.toast({
        title: "Something went wrong",
        description: "Please try again later",
      });
    }

    if (response.status === 200) {
      toaster.toast({
        title: response.message,
        description: "Your subscription has been canceled",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to cancel your subscription?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Return</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={handleCancel}
          >
            Cancel Subscription
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelSubscriptionDialog;
