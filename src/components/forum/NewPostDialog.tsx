import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Textarea,
  Spinner,
} from "@material-tailwind/react";
import FileUpload from "../FileUpload/FileUpload";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

interface NewPostDialogProps {
  open: boolean;
  handleOpen: () => void;
  addNewPost: (post: any) => void;
}

const NewPostDialog: React.FC<NewPostDialogProps> = ({
  open,
  handleOpen,
  addNewPost,
}) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handlePost = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(`${backEndURL}/api/posts`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      addNewPost(response.data);
      console.log("New post created:", response.data);
      handleOpen();
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Failed to create post", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Create a new post</DialogHeader>
      <DialogBody>
        <Textarea
          label="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <FileUpload onFileUpload={(file) => setImage(file)} />
      </DialogBody>
      <DialogFooter className="gap-3">
        <Button variant="text" color="red" onClick={handleOpen}>
          Cancel
        </Button>
        <Button variant="filled" onClick={handlePost} disabled={loading}>
          {loading ? <Spinner size="sm" /> : "Post"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default NewPostDialog;
