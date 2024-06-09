import React, { useState } from 'react';
import {
    Dialog, DialogHeader, DialogBody, DialogFooter, Button, Rating, Textarea, Typography, IconButton
} from '@material-tailwind/react';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleSubmit = () => {
        // Handle form submission here
        console.log({ rating, review });
        onClose();
    };
    const handleBackdropClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };
    return (
        <Dialog size="md" open={isOpen} handler={onClose}
            className="" backdropHandler={handleBackdropClick}
        >
            <DialogHeader className="justify-between">
                Submit Your Review
                <IconButton
                    color="gray"
                    size="sm"
                    variant="text"
                    onClick={onClose}
                >
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
            <DialogBody className="bg-white rounded-lg p-4" onClick={handleBackdropClick}>
                {/* to change the color of modal window header and footer */}
                <div className="mb-4">
                    <label className=" block text-gray-700 font-bold mb-2">
                        Rating
                    </label>
                    <Rating
                        className=''
                        value={rating}
                        onChange={(value) => setRating(value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="review">
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
            <DialogFooter className='gap-2'>
                <Button color='#0c0a09'
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default ReviewModal;