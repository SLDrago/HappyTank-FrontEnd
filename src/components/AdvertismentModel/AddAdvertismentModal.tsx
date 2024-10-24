import React, { useEffect, useState } from "react";
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
import ReactQuill from "react-quill";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormValidateErrorMsg from "../Verification/FormValidationErrorMsg";
import "react-toastify/dist/ReactToastify.css";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

interface Category {
  id: number;
  name: string;
}

interface AddAdvertisementModalProps {
  open: boolean;
  handleClose: () => void;
}

const AddAdvertisementModal: React.FC<AddAdvertisementModalProps> = ({
  open,
  handleClose,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backEndURL}/api/getCategories`);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      smallDescription: "",
      description: "",
      price: "",
      discount: "",
      priceBasedOn: "",
      tags: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      smallDescription: Yup.string().required("Small description is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .required("Price is required"),
      discount: Yup.number()
        .typeError("Discount must be a number")
        .min(0, "Discount cannot be less than 0")
        .max(100, "Discount cannot be more than 100"),
      priceBasedOn: Yup.string().required("Price based on is required"),
      tags: Yup.string()
        .matches(
          /^[a-zA-Z0-9\s,]+$/,
          "Tags must be comma-separated (e.g., tag1,tag2,tag3)"
        )
        .required("Tags are required"),
    }),
    onSubmit: async (values) => {
      if (images.length < 2) {
        setImageError("You must upload at least 2 images.");
        return;
      } else if (images.length > 5) {
        setImageError("You can upload a maximum of 5 images.");
        return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("small_description", values.smallDescription);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("discount", values.discount);
      formData.append("price_based_on", values.priceBasedOn);
      formData.append("category_id", selectedCategory);
      formData.append("tags", values.tags);
      images.forEach((image) => {
        formData.append("image_url[]", image);
      });

      try {
        await axios.post(
          `${backEndURL}/api/advertisement/addAdvertisement`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        toast.success("Advertisement added successfully.");
        handleClose();
      } catch (error) {
        toast.error("Failed to add advertisement. Please try again.");
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validImages = selectedFiles.filter((file) =>
        file.type.startsWith("image/")
      );
      if (selectedFiles.length !== validImages.length) {
        setImageError("Only image files are allowed.");
      } else {
        setImageError(null);
      }

      if (images.length + validImages.length > 5) {
        setImageError("You can upload a maximum of 5 images.");
      } else {
        setImages((prevImages) => [...prevImages, ...validImages].slice(0, 5));
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    formik.resetForm();
    setSelectedCategory("");
  };

  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader className="flex items-center justify-between">
        Add Advertisement
        <IconButton color="gray" size="sm" variant="text" onClick={handleClose}>
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
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <DialogBody divider>
          <div className="mb-4">
            <Input
              label="Title"
              id="title"
              {...formik.getFieldProps("title")}
              error={formik.touched.title && formik.errors.title ? true : false}
            />
            {formik.touched.title && formik.errors.title ? (
              <FormValidateErrorMsg message={formik.errors.title} />
            ) : null}
          </div>
          <Textarea
            label="Small Description"
            id="smallDescription"
            {...formik.getFieldProps("smallDescription")}
            error={
              formik.touched.smallDescription && formik.errors.smallDescription
                ? true
                : false
            }
          />
          {formik.touched.smallDescription && formik.errors.smallDescription ? (
            <FormValidateErrorMsg message={formik.errors.smallDescription} />
          ) : null}
          <label>
            Advertisement long Description:
            <ReactQuill
              value={formik.values.description}
              onChange={(value) => formik.setFieldValue("description", value)}
              className="h-32 mb-14"
            />
            {formik.touched.description && formik.errors.description ? (
              <FormValidateErrorMsg message={formik.errors.description} />
            ) : null}
          </label>
          <div className="mb-4">
            <Typography as={"small"} className="">
              Attach your images(2-5)
            </Typography>
            <label
              htmlFor="uploadFile"
              className="flex bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline w-6 mr-2 fill-white"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000"
                />
              </svg>
              Upload
              <input
                type="file"
                id="uploadFile"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </label>

            {imageError && <FormValidateErrorMsg message={imageError} />}
            <div className="mt-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mt-2"
                >
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
          <div className="flex items-center gap-3 mb-4">
            <Input
              label="Price"
              id="price"
              {...formik.getFieldProps("price")}
              error={formik.touched.price && formik.errors.price ? true : false}
            />
            {formik.touched.price && formik.errors.price ? (
              <FormValidateErrorMsg message={formik.errors.price} />
            ) : null}
            <Input
              label="Discount"
              id="discount"
              {...formik.getFieldProps("discount")}
              error={
                formik.touched.discount && formik.errors.discount ? true : false
              }
            />
            {formik.touched.discount && formik.errors.discount ? (
              <FormValidateErrorMsg message={formik.errors.discount} />
            ) : null}
          </div>
          <div className="mb-4">
            <Input
              label="Price Based on"
              id="priceBasedOn"
              {...formik.getFieldProps("priceBasedOn")}
              error={
                formik.touched.priceBasedOn && formik.errors.priceBasedOn
                  ? true
                  : false
              }
            />
            {formik.touched.priceBasedOn && formik.errors.priceBasedOn ? (
              <FormValidateErrorMsg message={formik.errors.priceBasedOn} />
            ) : null}
          </div>
          <div className="mb-4">
            <Select
              label="Category"
              className="mb-4"
              value={selectedCategory?.toString()}
              onChange={(val) => setSelectedCategory(val)}
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id.toString()}>
                  {category.name}
                </Option>
              ))}
            </Select>
            {!selectedCategory ? (
              <FormValidateErrorMsg message="Category is required" />
            ) : null}
          </div>
          <div className="mb-4">
            <Input
              label="Tags"
              id="tags"
              className="mb-4"
              {...formik.getFieldProps("tags")}
              error={formik.touched.tags && formik.errors.tags ? true : false}
            />
            {formik.touched.tags && formik.errors.tags ? (
              <FormValidateErrorMsg message={formik.errors.tags} />
            ) : null}
          </div>
        </DialogBody>
        <DialogFooter className="gap-4">
          <Button
            className="shadow-gray-400 hover:shadow-brown-400"
            variant="gradient"
            color="blue-gray"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            className="shadow-gray-400 hover:shadow-brown-400"
            variant="gradient"
            type="submit"
          >
            Submit
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default AddAdvertisementModal;
