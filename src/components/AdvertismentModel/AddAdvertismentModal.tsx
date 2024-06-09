import React, { useState } from "react";

import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Button,
    Textarea,
    Select,
    Option,
    IconButton,
    Typography,
} from "@material-tailwind/react";

interface AddAdvertisementModalProps {
    open: boolean;
    handleClose: () => void;
}

const AddAdvertisementModal: React.FC<AddAdvertisementModalProps> = ({
    open,
    handleClose,
}) => {
    const [title, setTitle] = useState("");
    const [smallDescription, setSmallDescription] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            const validImages = selectedFiles.filter(file => file.type.startsWith('image/'));

            if (selectedFiles.length !== validImages.length) {
                setImageError("Only image files are allowed.");
            } else {
                setImageError(null);
            }

            if (images.length + validImages.length > 5) {
                setError("You can upload a maximum of 5 images.");
            } else {
                setError(null);
                setImages((prevImages) => [...prevImages, ...validImages].slice(0, 5));
            }
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (images.length < 2) {
            setError("You must upload at least 2 images.");
        } else if (images.length > 5) {
            setError("You can upload a maximum of 5 images.");
        } else {
            setError(null);
            // Handle form submission logic here
            handleClose();
        }
    };

    return (
        <Dialog open={open} handler={handleClose}>
            <DialogHeader className="flex items-center justify-between">
                Add Advertisement
                <IconButton
                    color="gray"
                    size="sm"
                    variant="text"
                    onClick={handleClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </IconButton>
            </DialogHeader>
            <DialogBody divider>
                <div className="space-y-4">
                    <Input
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Textarea
                        label="Small Description"
                        value={smallDescription}
                        onChange={(e) => setSmallDescription(e.target.value)}

                    />
                    <Textarea
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="h-40"
                    />
                    <div>
                        <Typography as={"small"} className="">Attach your images(2-5)</Typography>
                        <label htmlFor="uploadFile"
                            className="flex bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline w-6 mr-2 fill-white" viewBox="0 0 32 32">
                                <path
                                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                    data-original="#000000" />
                                <path
                                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                    data-original="#000000" />
                            </svg>
                            Upload
                            <input type="file" id='uploadFile' className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange} />
                        </label>

                        {imageError && (
                            <div className="mt-1 text-sm text-red-500">{imageError}</div>
                        )}
                        {error && (
                            <div className="mt-1 text-sm text-red-500">{error}</div>
                        )}
                        <div className="mt-2">
                            {images.map((image, index) => (
                                <div key={index} className="flex items-center justify-between mt-2">
                                    <span className="text-sm">{image.name}</span>
                                    <IconButton
                                        color="red"
                                        size="sm"
                                        variant="text"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </IconButton>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Input
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <Select
                        label="Price Based on"
                        value={category}
                        onChange={(e) => setCategory(e)}
                    >
                        <Option value="category1">Type 1</Option>
                        <Option value="category2">Type 2</Option>
                    </Select>
                    <Select
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e)}
                    >
                        <Option value="category1">Category 1</Option>
                        <Option value="category2">Category 2</Option>
                    </Select>
                    <Input
                        label="Tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
            </DialogBody>
            <DialogFooter>
                <Button className="shadow-gray-400 hover:shadow-brown-400" variant="gradient" color='#0c0a09' onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default AddAdvertisementModal;
