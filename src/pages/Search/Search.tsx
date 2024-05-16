import { Typography, Input, Button } from "@material-tailwind/react";
import DefaultLayout from "../../layout/default_layout";
import BackGround from "../../images/Backgrounds/fish-and-divers-on-blue-sea.svg";

export default function Search() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BackGround})` }}
    >
      <DefaultLayout>
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-4 mb-10 !text-base text-center lg:!text-6xl"
        >
          Want to find a Fish?
        </Typography>
        <div className="flex flex-row items-center justify-center mt-20">
          <div className="w-1/2 max-w-xl">
            <Input
              type="text"
              placeholder="Search here..."
              className="!border-2 !border-black bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              }
            />
          </div>
          <Button
            className="text-white w-fit flex items-center text-base px-6 ml-2"
            size="sm"
          >
            Search
          </Button>
        </div>
      </DefaultLayout>
    </div>
  );
}
