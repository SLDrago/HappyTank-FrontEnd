import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  advertisement_id: number;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  advertisement_id,
}) => {
  const { token } = useAuth();

  const deleteAdvertisement = async (advertisement_id, token) => {
    try {
      const response = await axios.post(
        `${backEndURL}/api/advertisement/deleteAdvertisement`,
        { id: advertisement_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Advertisement deleted successfully");
        return true;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete advertisement"
      );
      return false;
    }
  };

  const handleDelete = async () => {
    const success = await deleteAdvertisement(advertisement_id, token);
    if (success) {
      onDelete();
    }
  };

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Delete Advertisement</DialogHeader>
      <DialogBody>
        <Typography variant="paragraph">
          Are you sure you want to delete this advertisement?
        </Typography>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose} className="mr-2">
          Cancel
        </Button>
        <Button variant="gradient" color="red" onClick={handleDelete}>
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteModal;
