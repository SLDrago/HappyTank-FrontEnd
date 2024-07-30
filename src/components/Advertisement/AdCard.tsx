import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

interface AdCardProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
  rating: number;
  price?: string;
  discount?: string;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <SolidStarIcon key={index} className="h-5 w-5 text-yellow-500" />
        ))}
      {hasHalfStar && (
        <SolidStarIcon
          className="h-5 w-5 text-yellow-500"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <OutlineStarIcon key={index} className="h-5 w-5 text-yellow-500" />
        ))}
      <Typography variant="small" color="blue-gray" className="ml-2">
        {parseFloat(rating).toFixed(1)}
      </Typography>
    </div>
  );
};

const AdCard: React.FC<AdCardProps> = ({
  imageSrc,
  title,
  description,
  link,
  rating,
  price,
  discount,
}) => {
  const truncatedDescription = truncateText(description, 100);

  const calculateDiscountedPrice = (
    originalPrice: string,
    discountPercentage: string
  ) => {
    const priceNumber = parseFloat(originalPrice);
    const discountNumber = parseFloat(discountPercentage);
    return (priceNumber * (1 - discountNumber / 100)).toFixed(2);
  };

  const hasDiscount = discount && parseFloat(discount) > 0;
  const originalPrice = price && price !== "0.00" ? `Rs. ${price}` : "Free";
  const discountedPrice =
    hasDiscount && price
      ? `Rs. ${calculateDiscountedPrice(price, discount)}`
      : null;

  // Sanitize the rating
  let sanitizedRating = rating;
  if (sanitizedRating > 5) {
    sanitizedRating = 5;
  } else if (
    sanitizedRating < 0 ||
    isNaN(sanitizedRating) ||
    sanitizedRating == null
  ) {
    sanitizedRating = 0;
  }

  return (
    <Card className="mt-6">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography className="mb-2">{truncatedDescription}</Typography>
        <div className="flex items-center space-x-2 mb-2">
          {hasDiscount ? (
            <>
              <Typography variant="h6" color="gray" className="line-through">
                {originalPrice}
              </Typography>
              <Typography variant="h6" color="green">
                {discountedPrice}
              </Typography>
              <Typography variant="small" color="red">
                ({parseFloat(discount).toFixed(1)}% off)
              </Typography>
            </>
          ) : (
            <Typography variant="h6" color="green">
              {originalPrice}
            </Typography>
          )}
        </div>
      </CardBody>
      <CardFooter className="pt-0 flex items-center justify-between">
        <NavLink to={link}>
          <Button>View</Button>
        </NavLink>
        <StarRating rating={sanitizedRating} />
      </CardFooter>
    </Card>
  );
};

export default AdCard;
