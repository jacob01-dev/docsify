import { useState, useCallback } from "react";

const UploadDocsStep = ({
  file,
  error,
  setFile,
  setError,
}: {
  file: File | null;
  error: string | null;
  setFile: (file: File | null) => void;
  setError: (error: string | null) => void;
}): JSX.Element => {
  const [isDragOver, setIsDragOver] = useState(false);

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
      setError(null);
      setFile(newFile);
      console.log(file);
    }
  };

  return (
    <div className="min-h-[250px] flex items-center justify-center p-2">
      <div
        className={`w-full h-full border-dashed border rounded-xl flex items-center justify-center transition-colors duration-300 ${
          isDragOver ? "border-accent" : "border-foreground"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <p
            className={`max-w-prose px-6 transition-colors duration-300 ${
              isDragOver ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Drag & Drop your code documentation here
          </p>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            className="w-full h-full hidden"
            id="fileInput"
          />
          {error && <p className="mt-4 text-red-500">{error}</p>}
          {file && (
            <ul className="mt-4">
              <li>{file.name}</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadDocsStep;
