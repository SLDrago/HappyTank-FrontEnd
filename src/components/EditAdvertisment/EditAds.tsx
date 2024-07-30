import React, { useState, useEffect } from "react";
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
  Spinner,
} from "@material-tailwind/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface Advertisement {
  id: number;
  image: string;
  title: string;
  smallDescription: string;
}

interface EditAddsProps {
  isOpen: boolean;
  onClose: () => void;
  ad: Advertisement;
  onSave: (ad: Advertisement) => void;
}

const EditAdds: React.FC<EditAddsProps> = ({ isOpen, onClose, ad, onSave }) => {
  const [title, setTitle] = useState(ad.title);
  const [categories, setCategories] = useState<Category[]>([]);
  const [smallDescription, setSmallDescription] = useState(ad.smallDescription);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [tags, setTags] = useState("");
  const [priceBasedOn, setPriceBasedOn] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/getCategories"
        );
        setCategories(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
    fetchAdvertisementDetails(ad.id);
  }, [ad]);

  const fetchAdvertisementDetails = async (id: number) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/advertisement/getAdvertisementById`,
        { id }
      );
      const adDetails = response.data.advertisement;
      setTitle(adDetails.title);
      setSmallDescription(adDetails.small_description);
      setDescription(adDetails.description);
      setPrice(adDetails.price);
      setDiscount(adDetails.discount);
      setPriceBasedOn(adDetails.price_based_on);
      setSelectedCategory(adDetails.category_id);
      setTags(adDetails.tags);
    } catch (error) {
      console.error("Error fetching advertisement details:", error);
    }
  };

  const handleSubmit = async () => {
    const updatedAd = {
      id: ad.id,
      title,
      small_description: smallDescription,
      description,
      price,
      discount,
      price_based_on: priceBasedOn,
      category_id: selectedCategory,
      tags,
    };

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/advertisement/updateAdvertisement",
        updatedAd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Advertisement updated successfully!");
      onSave(updatedAd);
      onClose();
    } catch (error) {
      console.error("Error updating advertisement:", error);
      toast.error("Failed to update advertisement. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader className="flex items-center justify-between">
        Edit Advertisement
        <IconButton color="gray" size="sm" variant="text" onClick={onClose}>
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
      {isLoading ? (
        <div className="flex flex-wrap justify-center">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
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
            <label>
              Advertisement long Description:
              <ReactQuill
                value={description}
                onChange={setDescription}
                className="h-32 mb-14"
              />
            </label>
            <div className="flex items-center gap-3">
              <Input
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Input
                label="Discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                icon={<span className="text-gray-500">%</span>}
              />
            </div>
            <Input
              label="Price Based on"
              value={priceBasedOn}
              onChange={(e) => setPriceBasedOn(e.target.value)}
            />
            <Select
              label="Category"
              value={selectedCategory?.toString()}
              onChange={(val) => setSelectedCategory(Number(val))}
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id.toString()}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <Input
              label="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </DialogBody>
      )}
      <DialogFooter>
        <Button className="" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditAdds;
