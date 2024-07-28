import axios from "axios";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

interface DeleteConfirmProps {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirm: React.FC<DeleteConfirmProps> = ({
  postId,
  isOpen,
  onClose,
  onDelete,
}) => {
  const { token } = useAuth();

  const handleDelete = async () => {
    try {
      await axios.delete(`${backEndURL}/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Post deleted successfully");
      onDelete();
      onClose();
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Are you Sure?</DialogHeader>
      <DialogBody>
        This will delete this post permanently. This action cannot be undone.
      </DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={onClose} className="mr-1">
          <span>No, Keep it</span>
        </Button>
        <Button variant="gradient" color="red" onClick={handleDelete}>
          <span>Sure, Delete it</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteConfirm;
