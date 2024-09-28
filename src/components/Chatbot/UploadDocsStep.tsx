import React, { useState, useCallback } from "react";
import { Progress } from "@/components/ui/progress";

const UploadDocsStep = ({
  file,
  error,
  setIsLoading,
  setFile,
  setError,
}: {
  file: File | null;
  error: string | null;
  setIsLoading: (isLoading: boolean) => void;
  setFile: (file: File | null) => void;
  setError: (error: string | null) => void;
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const newFile = event.dataTransfer.files[0];
    validateAndSetFile(newFile);
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files?.[0] || null;
    validateAndSetFile(newFile);
  };

  const validateAndSetFile = (newFile: File | null) => {
    if (newFile && newFile.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      setFile(null);
    } else {
      if (newFile && newFile?.size > 1 * 1024 * 1024) {
        setError("File size should be less than 1 MB");
        setFile(null);
      } else {
        setError(null);
        simulateUpload();
        setFile(newFile);
      }
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setIsLoading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsLoading(false);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 500);
  };

  return (
    <div
      className={`border h-64 m-4 border-dashed rounded-lg transition-colors duration-300 bg-background text-foreground${
        isDragOver ? "border-primary" : "border-border"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-center h-full w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer hover:bg-secondary transition-colors duration-300"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-muted-foreground"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-foreground">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-muted-foreground">PDF (up to 1MB)</p>
          </div>

          {file && (
            <div className="max-w-xs bg-secondary flex items-center rounded-md overflow-hidden outline outline-[1px] outline-border divide-x divide-border">
              <div className="px-3 py-2 h-full grid place-items-center">
                {isUploading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    className="w-5 h-5 text-foreground"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    className="w-5 h-5 text-foreground"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="m9 15 2 2 4-4" />
                  </svg>
                )}
              </div>
              <div className="px-3 py-2 h-full text-sm truncate text-foreground">
                {file.name}
              </div>
            </div>
          )}

          {isUploading && (
            <div className="w-full mt-4 max-w-xs mx-auto">
              <Progress
                value={uploadProgress}
                className="h-1 w-full bg-secondary"
              />
              {uploadProgress === 100 && (
                <div className="flex gap-1 items-center justify-center text-sm text-foreground text-center pt-2">
                  Upload complete
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="max-w-xs bg-secondary flex items-center rounded-md overflow-hidden outline outline-[1px] outline-border divide-x divide-border">
              <div className="px-3 py-2 h-full grid place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  className="w-4 h-4 text-foreground"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </div>
              <div className="px-3 py-2 h-full text-sm truncate text-foreground">
                {error}
              </div>
            </div>
          )}

          <input
            type="file"
            id="dropzone-file"
            className="hidden"
            onChange={handleFileSelect}
            accept="application/pdf"
          />
        </label>
      </div>
    </div>
  );
};

export default UploadDocsStep;
