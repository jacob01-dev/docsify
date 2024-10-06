"use client";
import {
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import UploadDocsStep from "./UploadDocsStep";
import Spinner from "../Spinner";

const steps = [{ id: 1, description: "Upload your code documentation" }];

const CreateChatbotStepContainer = ({
  setOpen,
  chatbots,
  setChatbots,
}: {
  setOpen: (open: boolean) => void;
  chatbots: any[];
  setChatbots: (chatbots: any[]) => void;
}): JSX.Element => {
  const [step, setStep] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateChatbot = async () => {
    if (!file) {
      setError("Please upload a file before proceeding.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      const response = await fetch(
        process.env.NEXT_PUBLIC_PRODUCTION === "true"
          ? "/api/upload"
          : "http://localhost:3000/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();

      if (data.success === true) {
        setChatbots([...chatbots, data.data]);
        setOpen(false);
        setIsLoading(false);
      } else {
        setError(data.error);
      }
    } catch (error: any) {
      setError("An unexpected error occurred.");
    }
  };

  const handleDialogClose = () => {
    setStep(1);
    setFile(null);
    setError(null);
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <DialogContent
      className="sm:max-w-[425px]"
      onCloseAutoFocus={handleDialogClose}
    >
      <DialogHeader className="gap-y-2">
        <DialogTitle className="font-normal">
          Step <span className="font-bold">{step}</span>/{steps.length}
        </DialogTitle>
        <DialogDescription className="text-lg">
          {steps[step - 1].description}
        </DialogDescription>
      </DialogHeader>
      <UploadDocsStep
        file={file}
        setFile={setFile}
        error={error}
        setError={setError}
        setIsLoading={setIsLoading}
      />
      <DialogFooter>
        <Button
          size={"sm"}
          className="px-8"
          variant={"default"}
          onClick={handleCreateChatbot}
          disabled={isLoading || !file}
        >
          {isLoading ? <Spinner /> : "Create Chatbot"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateChatbotStepContainer;
