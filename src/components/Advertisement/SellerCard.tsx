import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

interface SellerCardProps {
  id: string;
}

interface SellerData {
  id: string;
  profile_photo_path: string;
  profile_photo_url: string;
  name: string;
  email: string;
  address: string;
  description: string;
  gps: {
    latitude: number;
    longitude: number;
  };
  city: string;
}

const SellerCard: React.FC<SellerCardProps> = ({ id }) => {
  const [sellerData, setSellerData] = useState<SellerData | null>(null);
  const [openPopover, setOpenPopover] = useState(false);
  const [sellerImage, setSellerImage] = useState("");
  const [sellerDescription, setSellerDescription] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.post<SellerData[]>(
          `${backEndURL}/api/getSellerCardDetails`,
          { id }
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          setSellerData(response.data[0]);
          if (response.data[0]) {
            if (response.data[0].profile_photo_path !== null) {
              setSellerImage(backEndURL + response.data[0].profile_photo_path);
            } else {
              setSellerImage(response.data[0].profile_photo_url);
            }
            setSellerDescription(response.data[0].description);
          }
        } else {
          console.error("No seller data found");
        }
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };

    fetchSellerData();
  }, [id]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription =
    sellerDescription && sellerDescription.length > 300
      ? sellerDescription.substring(0, 300) + "..."
      : sellerDescription || "";

  if (!sellerData) {
    return (
      <Card
        color="white"
        shadow={true}
        className="border-2 w-full max-w-[26rem] animate-pulse"
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

  const isHTML = /<\/?[a-z][\s\S]*>/i.test(sellerDescription);

  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <Card
          color="white"
          shadow={true}
          className="border-2 w-full max-w-[26rem]"
        >
          <CardBody
            color="transparent"
            className="flex items-center justify-center pt-0 py-4 gap-3"
          >
            <Avatar
              size="lg"
              variant="circular"
              src={sellerImage}
              alt={sellerData.name}
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  {sellerData.name}
                </Typography>
              </div>
              <Typography color="blue-gray">
                {sellerData.address ?? sellerData.city}
              </Typography>
            </div>
          </CardBody>
        </Card>
      </PopoverHandler>
      <PopoverContent {...triggers} className="z-50 max-w-[24rem]">
        <div className="mb-2 flex items-center justify-between gap-4">
          <Avatar
            size="md"
            variant="circular"
            src={sellerImage}
            alt={sellerData.name}
          />
        </div>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 flex items-center gap-2 font-medium"
        >
          <span>{sellerData.name}</span> •{" "}
          <a className="text-sm font-medium text-gray-900">
            {"(" + sellerData.email + ")"}
          </a>
        </Typography>
        {isHTML ? (
          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{
              __html: showFullDescription
                ? sellerDescription || ""
                : truncatedDescription || "",
            }}
          />
        ) : (
          <Typography
            variant="small"
            color="gray"
            className="font-normal text-blue-gray-500"
          >
            {showFullDescription
              ? sellerDescription || ""
              : truncatedDescription || ""}
          </Typography>
        )}
        {sellerDescription && sellerDescription.length > 100 && (
          <Button
            size="sm"
            variant="text"
            color="blue-gray"
            className="mt-2 border-transparent border-0"
            onClick={toggleDescription}
          >
            {showFullDescription ? "See less" : "See more"}
          </Button>
        )}
        {sellerData.address && (
          <Typography
            variant="small"
            color="gray"
            className="flex items-center gap-2 text-sm font-normal text-blue-gray-700"
          >
            {"Address: " + sellerData.address}
          </Typography>
        )}
        <div className="mt-6 flex items-center gap-8 border-t border-blue-gray-50 pt-4">
          {sellerData.gps &&
            sellerData.gps.latitude &&
            sellerData.gps.longitude && (
              <Typography
                variant="small"
                color="gray"
                className="flex items-center gap-2 text-sm font-normal text-blue-gray-500"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM2.332 6.027C2.70329 4.96372 3.36579 4.0261 4.244 3.321C4.512 3.73 4.974 4 5.5 4C5.89782 4 6.27936 4.15804 6.56066 4.43934C6.84196 4.72064 7 5.10218 7 5.5V6C7 6.53043 7.21071 7.03914 7.58579 7.41421C7.96086 7.78929 8.46957 8 9 8C9.53043 8 10.0391 7.78929 10.4142 7.41421C10.7893 7.03914 11 6.53043 11 6C10.9998 5.55242 11.1498 5.11773 11.4259 4.76547C11.702 4.41321 12.0883 4.16375 12.523 4.057C13.4773 5.14867 14.0022 6.55002 14 8C14 8.34 13.972 8.675 13.917 9H13C12.4696 9 11.9609 9.21071 11.5858 9.58579C11.2107 9.96086 11 10.4696 11 11V13.197C10.0883 13.7245 9.05331 14.0015 8 14V12C8 11.4696 7.78929 10.9609 7.41421 10.5858C7.03914 10.2107 6.53043 10 6 10C5.46957 10 4.96086 9.78929 4.58579 9.41421C4.21071 9.03914 4 8.53043 4 8C4.00018 7.527 3.83271 7.06924 3.52733 6.70803C3.22195 6.34681 2.79844 6.10552 2.332 6.027Z"
                    fill="#90A4AE"
                  />
                </svg>
                {`${sellerData.gps.latitude}, ${sellerData.gps.longitude}`}
              </Typography>
            )}
          <Typography
            as="a"
            href="#"
            variant="small"
            color="gray"
            className="flex items-center gap-2 text-sm font-normal text-blue-gray-500"
          >
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 2C1 1.46957 1.21071 0.960859 1.58579 0.585786C1.96086 0.210714 2.46957 0 3 0H11C11.5304 0 12.0391 0.210714 12.4142 0.585786C12.7893 0.960859 13 1.46957 13 2V14C13.2652 14 13.5196 14.1054 13.7071 14.2929C13.8946 14.4804 14 14.7348 14 15C14 15.2652 13.8946 15.5196 13.7071 15.7071C13.5196 15.8946 13.2652 16 13 16H10C9.73478 16 9.48043 15.8946 9.29289 15.7071C9.10536 15.5196 9 15.2652 9 15V13C9 12.7348 8.89464 12.4804 8.70711 12.2929C8.51957 12.1054 8.26522 12 8 12H6C5.73478 12 5.48043 12.1054 5.29289 12.2929C5.10536 12.4804 5 12.7348 5 13V15C5 15.2652 4.89464 15.5196 4.70711 15.7071C4.51957 15.8946 4.26522 16 4 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14V2ZM4 3H6V5H4V3ZM6 7H4V9H6V7ZM8 3H10V5H8V3ZM10 7H8V9H10V7Z"
                fill="#90A4AE"
              />
            </svg>
            {sellerData.city}
          </Typography>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SellerCard;
