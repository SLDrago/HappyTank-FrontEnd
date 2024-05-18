import React from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { NavLink, useLocation } from "react-router-dom";

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path !== "");

  return (
    <Breadcrumbs>
      <NavLink to={"/adverticements"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </NavLink>
      {paths.map((path, index) => (
        <NavLink
          key={index}
          to={`/${paths.slice(0, index + 1).join("/")}`}
          className={`opacity-60 ${
            index === paths.length - 1 ? "opacity-100 font-bold" : ""
          }`}
        >
          {capitalizeFirstLetter(path)}
        </NavLink>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
