import React, { useState, DragEvent, ChangeEvent } from "react";
import { PhotoIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [fishName, setFishName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

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
      if (["image/jpeg", "image/png"].includes(droppedFile.type)) {
        setFile(droppedFile);
        uploadFile(droppedFile);
      }
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (["image/jpeg", "image/png"].includes(selectedFile.type)) {
        setFile(selectedFile);
        uploadFile(selectedFile);
      }
    }
  };

  const uploadFile = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${backEndURL}/api/ai/identifyFish`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFishName(response.data.fish_name);
      toast.success("Fish identified successfully");
    } catch (error) {
      console.error("Error identifying fish:", error);
      toast.error("Failed to identify fish");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setFile(null);
    setFishName(null);
  };

  return (
    <div className="col-span-full">
      {file && fishName ? (
        <div className="text-center">
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded Fish"
            className="mx-auto mt-4 max-w-xs"
          />
          <p className="mt-4 text-sm leading-6 text-gray-600">{fishName}</p>
          <Button onClick={handleBack} className="mt-4 px-4 py-2">
            Back
          </Button>
        </div>
      ) : (
        <div
          className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900 px-6 py-10 ${
            dragging ? "bg-gray-200" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
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
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, JPEG up to 10MB
            </p>
            {file && (
              <p className="text-xs leading-5 text-gray-600 mt-2">
                {file.name}
              </p>
            )}
            {loading && (
              <p className="text-sm leading-6 text-gray-600">Loading...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
