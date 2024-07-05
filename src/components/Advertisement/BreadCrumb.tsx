import { Breadcrumbs } from "@material-tailwind/react";
import { NavLink, useLocation } from "react-router-dom";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path !== "");
  const lastPath = paths[paths.length - 1]; // Get the last path segment
  const searchParams = new URLSearchParams(location.search);

  return (
    <Breadcrumbs>
      <NavLink to="/adverticements">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </NavLink>
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        const displayText = isLast
          ? decodeURIComponent(lastPath)
          : capitalizeFirstLetter(path);
        const paramValue = isLast ? searchParams.get("id") : null;

        // Construct the URL with parameters
        const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
        const urlWithParams = paramValue
          ? `${fullPath}?id=${paramValue}`
          : fullPath;

        return (
          <NavLink
            key={index}
            to={urlWithParams}
            className={`opacity-60 ${isLast ? "opacity-100 font-bold" : ""}`}
          >
            {displayText}
          </NavLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
