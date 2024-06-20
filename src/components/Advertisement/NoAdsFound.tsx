import { Typography } from "@material-tailwind/react";

const NoAdsFound = () => (
  <div className="flex flex-col items-center justify-center mt-8">
    <div className="w-24 h-24 mb-4">
      <svg
        data-slot="icon"
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
        ></path>
      </svg>
    </div>
    <Typography as="h2" className="text-4xl font-semibold text-gray-600">
      Ohh.. No advertisements were found...
    </Typography>
  </div>
);

export default NoAdsFound;
