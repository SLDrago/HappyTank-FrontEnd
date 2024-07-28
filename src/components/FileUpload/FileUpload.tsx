import React, { useState, useEffect, DragEvent, ChangeEvent } from "react";
import { PhotoIcon } from "@heroicons/react/20/solid";

interface FileUploadProps {
  onFileUpload: (file: File | null) => void;
  initialImageUrl?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  initialImageUrl,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImageUrl || null
  );
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(initialImageUrl || null);
    }
  }, [file, initialImageUrl]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        ["image/jpeg", "image/png", "image/webp"].includes(droppedFile.type)
      ) {
        setFile(droppedFile);
        onFileUpload(droppedFile);
      }
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (
        ["image/jpeg", "image/png", "image/webp"].includes(selectedFile.type)
      ) {
        setFile(selectedFile);
        onFileUpload(selectedFile);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    onFileUpload(null);
  };

  return (
    <div className="col-span-full">
      <div
        className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900 px-6 py-10 ${
          dragging ? "bg-gray-200" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="Preview"
                className="mx-auto mb-4 max-h-60"
              />
              <button
                onClick={handleRemoveFile}
                className="mt-2 text-sm font-semibold text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </>
          ) : (
            <>
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, JPEG up to 10MB
              </p>
            </>
          )}
        </div>
      </div>
      {file && (
        <p className="text-xs leading-5 text-gray-600 mt-2 text-center">
          {file.name}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
