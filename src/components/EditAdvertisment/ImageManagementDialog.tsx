import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

const ImageManagementDialog = ({ open, onClose, ad, onImagesChange }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetchImages();
  }, [ad, token]);

  const fetchImages = async () => {
    if (ad && ad.id) {
      try {
        const response = await axios.post(
          `${backEndURL}/api/advertisement/getAdvertisementImagesByAdId`,
          { advertisement_id: ad.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedImages = response.data.image_urls;
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    } else {
      setImages([]);
      setLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && images.length < 5) {
      const formData = new FormData();
      formData.append("advertisement_id", ad.id);
      formData.append("image_url", file);

      setUploading(true);
      try {
        const response = await axios.post(
          `${backEndURL}/api/advertisement/AddAdvertisementImage`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success(response.data.message);
        fetchImages();
        onClose();
      } catch (error) {
        toast.error("Failed to upload image");
        onClose();
      } finally {
        setUploading(false);
      }
    }
  };

  const handleRemoveImage = async (index, imageId) => {
    try {
      const response = await axios.post(
        `${backEndURL}/api/advertisement/deleteAdvertisementImage`,
        { image_id: imageId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
      onImagesChange(ad.id, newImages);
    } catch (error) {
      toast.error("Failed to delete image");
      onClose();
    }
  };

  return (
    <Dialog open={open} handler={onClose} size="lg">
      <DialogHeader>Manage Images for [{ad ? ad.title : ""}] </DialogHeader>
      <DialogBody divider className="flex flex-wrap justify-center gap-4">
        {loading ? (
          <Spinner className="h-12 w-12" />
        ) : (
          <>
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={backEndURL + image.img_url}
                  alt={`Image ${index + 1}`}
                  className="w-48 h-48 object-cover rounded-lg"
                />
                <IconButton
                  color="red"
                  size="sm"
                  className="!absolute top-2 right-2"
                  onClick={() => handleRemoveImage(index, image.id)}
                >
                  <XMarkIcon className="w-5 h-5" />
                </IconButton>
              </div>
            ))}
            {images.length < 5 && (
              <label className="flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed rounded-lg cursor-pointer">
                <PlusIcon className="w-10 h-10" />
                <span className="mt-2 text-sm">Upload Image</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </>
        )}
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button
          variant="text"
          color="red"
          onClick={onClose}
          className="border border-red-600"
        >
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ImageManagementDialog;
