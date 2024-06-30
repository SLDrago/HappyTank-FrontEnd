import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Spinner,
} from "@material-tailwind/react";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

interface SellerCardProps {
  id: string;
}

interface SellerData {
  imageUrl: string;
  name: string;
  address: string;
}

const SellerCard: React.FC<SellerCardProps> = ({ id }) => {
  const [sellerData, setSellerData] = useState<SellerData | null>(null);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.post(
          `${backEndURL}/api/getSellerCardDetails`,
          { id }
        );
        const sellerArray = response.data;
        const seller = sellerArray.find(
          (seller: SellerData) => seller.id.toString() === id
        );
        setSellerData(seller || null);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };

    fetchSellerData();
  }, [id]);

  if (!sellerData) {
    return (
      <Card
        color="white"
        shadow={true}
        className="border-2 w-full max-w-[26rem]  animate-pulse"
      >
        <CardBody
          color="transparent"
          className="flex items-center justify-center pt-0 py-4 gap-3"
        >
          <Avatar size="lg" variant="circular" />
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                Loading...
              </Typography>
            </div>
            <Typography color="blue-gray">Loading...</Typography>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card color="white" shadow={true} className="border-2 w-full max-w-[26rem]">
      <CardBody
        color="transparent"
        className="flex items-center justify-center pt-0 py-4 gap-3"
      >
        <Avatar
          size="lg"
          variant="circular"
          src={sellerData.imageUrl}
          alt={sellerData.name}
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {sellerData.name}
            </Typography>
          </div>
          <Typography color="blue-gray">{sellerData.address}</Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default SellerCard;
