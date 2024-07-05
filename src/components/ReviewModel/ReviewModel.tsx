import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Rating,
  Textarea,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  reloadReviews: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  id,
  reloadReviews,
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${backEndURL}/api/review/addReview`,
        {
          title,
          review_text: review,
          rating,
          advertisement_id: id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 201) {
        if (response.data.error) {
          toast.error(response.data.error);
        }
        if (response.data.message) {
          toast.success(response.data.message);
          reloadReviews();
        }
        onClose();
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
        onClose();
      } else {
        toast.error("Failed to add Review. Please try again.");
        onClose();
      }
    }
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Dialog
      size="md"
      open={isOpen}
      handler={onClose}
      className=""
      backdropHandler={handleBackdropClick}
    >
      <DialogHeader className="justify-between">
        Submit Your Review
        <IconButton color="gray" size="sm" variant="text" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <DialogBody
        className="bg-white rounded-lg p-4"
        onClick={handleBackdropClick}
      >
        <div className="mb-4">
          <label className=" block text-gray-700 font-bold mb-2">Rating</label>
          <Rating
            className=""
            value={rating}
            onChange={(value) => setRating(value)}
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <Input
            className="shadow appearance-none border rounded text-xl h-52 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            placeholder="Headline of your review"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="review"
          >
            Review
          </label>
          <Textarea
            className="shadow appearance-none border rounded text-xl h-52 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="review"
            placeholder="Your review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
      </DialogBody>
      <DialogFooter className="gap-2">
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ReviewModal;
