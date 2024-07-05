import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";
import React from "react";

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  if (rating > 5) {
    rating = 5;
  } else if (rating < 0 || isNaN(rating) || rating == null) {
    rating = 0;
  }

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
    </div>
  );
};

export default StarRating;
