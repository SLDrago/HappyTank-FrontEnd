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
        {rating.toFixed(1)}
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
}) => {
  const truncatedDescription = truncateText(description, 100);
  if (rating > 5) {
    rating = 5;
  } else if (rating < 0 || isNaN(rating) || rating == null) {
    rating = 0;
  }

  return (
    <Card className="mt-6 w-96">
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
        <Typography>{truncatedDescription}</Typography>
      </CardBody>
      <CardFooter className="pt-0 flex items-center justify-between">
        <NavLink to={link}>
          <Button>View</Button>
        </NavLink>
        <StarRating rating={rating} />
      </CardFooter>
    </Card>
  );
};

export default AdCard;
