import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface City {
  id: number;
  name: string;
}

interface UserAdditionalDetailsModelProps {
  open: boolean;
  handleOpen: () => void;
}

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

export const UserAdditionalDetailsModel: React.FC<
  UserAdditionalDetailsModelProps
> = ({ open, handleOpen }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [cityId, setCityId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${backEndURL}/api/getAllCities`);
        if (response.data.success) {
          setCities(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${backEndURL}/api/user-info/update`,
        {
          phone_number: phoneNumber,
          city_id: cityId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message) {
        toast.success("User infomation updated successfully!");
        handleOpen();
      }
    } catch (error) {
      toast.error("Error updating user info");
      handleOpen();
    }
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Dialog className="p-4" size="md" open={open} handler={handleOpen}>
      <DialogHeader className="justify-between">
        <ExclamationTriangleIcon className="w-10 h-10 text-red-500" />
        <IconButton color="gray" size="sm" variant="text" onClick={handleOpen}>
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
      <DialogBody className="">
        <Typography variant="h4" color="blue-gray" className="mb-1 font-bold">
          Additional Details
        </Typography>
        <Typography
          variant="paragraph"
          className="font-normal text-gray-600 max-w-lg mb-3"
        >
          You need to enter some additional details to use this feature! You can
          add up to 2 Advertisements.
        </Typography>
        <div className="space-y-4">
          <Input
            type="text"
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Select
            label="City"
            className="w-full"
            value={cityId?.toString()}
            onChange={(val) => setCityId(Number(val))}
          >
            {cities.map((city) => (
              <Option key={city.id} value={city.id.toString()}>
                {city.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="text-end mt-4">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default UserAdditionalDetailsModel;
