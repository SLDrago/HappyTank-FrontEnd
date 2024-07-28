import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Button, Textarea, Spinner } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import FileUpload from "../FileUpload/FileUpload";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

interface EditPostDialogProps {
  open: boolean;
  onClose: () => void;
  postId: string;
  onUpdate: (updatedPost: any) => void;
}

const EditPostDialog: React.FC<EditPostDialogProps> = ({
  open,
  onClose,
  postId,
  onUpdate,
}) => {
  const { token } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [removeImage, setRemoveImage] = useState(false); // New state to track image removal

  useEffect(() => {
    if (postId && open) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(
            `${backEndURL}/api/getPost/${postId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setPost(response.data);
          setContent(response.data.content);
          setImageUrl(response.data.image_url);
          setRemoveImage(false); // Reset removeImage state when fetching post
        } catch (error) {
          console.error("Failed to fetch post:", error);
          toast.error("Failed to fetch post");
        }
      };

      fetchPost();
    }
  }, [postId, token, open]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const payload = {
        post_id: postId,
        content,
        remove_image: removeImage,
      };

      if (image) {
        // Convert image to base64
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = async () => {
          payload.image_base64 = reader.result;

          const response = await axios.post(
            `${backEndURL}/api/posts/update`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          toast.success("Post updated successfully");
          onUpdate(response.data);
          onClose();
        };
      } else {
        const response = await axios.post(
          `${backEndURL}/api/posts/update`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("Post updated successfully");
        onUpdate(response.data);
        onClose();
      }
    } catch (error) {
      console.error("Failed to update post:", error);
      toast.error("Failed to update post");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleFileUpload = (file: File | null) => {
    setImage(file);
    if (file === null) {
      setImageUrl(""); // Clear the image URL when the file is removed
      setRemoveImage(true); // Set removeImage to true when removing the file
    } else {
      setRemoveImage(false); // Set removeImage to false when a new file is uploaded
    }
  };

  if (!post) return null;

  return (
    <Dialog open={open} onClose={onClose} size="lg">
      <DialogHeader>Edit Post</DialogHeader>
      <DialogBody>
        <div className="mb-4">
          <Textarea
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <FileUpload
          onFileUpload={handleFileUpload}
          initialImageUrl={imageUrl ? backEndURL + imageUrl : undefined} // Pass the initial image URL
        />
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose} className="mr-2">
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          disabled={loading}
          className="flex items-center"
        >
          {loading ? <Spinner size="sm" /> : "Update Post"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditPostDialog;
