import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

interface ReportDialogProps {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ReportDialog: React.FC<ReportDialogProps> = ({
  postId,
  isOpen,
  onClose,
}) => {
  const [reason, setReason] = useState("");
  const { token } = useAuth();

  const handleReport = async () => {
    try {
      await axios.post(
        `${backEndURL}/api/posts/report`,
        { post_id: postId, reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Report submitted successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to submit report");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Report Post</DialogHeader>
      <DialogBody>
        <Input
          type="text"
          label="Reason for reporting"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
      </DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={onClose} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="red" onClick={handleReport}>
          <span>Submit Report</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ReportDialog;
