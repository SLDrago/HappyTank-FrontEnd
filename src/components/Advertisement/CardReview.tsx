import { Card, CardBody, Rating, Typography } from "@material-tailwind/react";

interface ReviewCardPropsType {
  title: string;
  name: string;
  feedback: string;
  date: string;
}

export function CardReview({
  name,
  feedback,
  date,
  title,
}: ReviewCardPropsType) {
  return (
    <Card shadow={false}>
      <CardBody className="pt-0">
        <Rating value={4} className="text-amber-500" />
        <Typography
          variant="h6"
          color="blue-gray"
          className="font-bold mb-2 mt-1"
        >
          {title}
        </Typography>
        <Typography className="text-base font-normal !text-gray-500">
          {feedback}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="font-medium mt-3">
          {name}
        </Typography>
        <Typography variant="small" className="font-normal !text-gray-500">
          {date}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default CardReview;
