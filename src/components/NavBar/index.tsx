import React, { ReactNode, useRef, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
  Spinner,
} from "@material-tailwind/react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../images/Logos/logo-blacktext.svg";
import AddAdvertisementModal from "../../components/AdvertismentModel/AddAdvertismentModal";
import UserAdditionalDetailsModel from "../AdditionalDetailsModel/UserAdditionalDetailsModel";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

const NavBar: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openNav, setOpenNav] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openAdModal, setOpenAdModal] = useState(false);
  const [openUADModal, setOpenUADModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 960 });
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user?.profile_photo_path !== null) {
      setProfilePicture(backEndURL + user.profile_photo_path);
    } else {
      setProfilePicture(user.profile_photo_url);
    }
  }, [user?.profile_photo_path, user?.profile_photo_url]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openProfileMenu &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setOpenProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openProfileMenu]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleAddAdvertisement = async () => {
    setLoading(true);
    try {
      if (user?.role === "user") {
        const userInfoResponse = await fetch(
          `${backEndURL}/api/user-info/exists`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userInfo = await userInfoResponse.json();

        if (!userInfo.has_user_info) {
          setOpenUADModal(true);
          return;
        }
        try {
          const adCountResponse = await fetch(
            `${backEndURL}/api/advertisement/getUsersAdvertisementCount`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const adCount = await adCountResponse.json();
          if (adCount.advertisement_count >= 2) {
            toast.error(
              "You can only add 2 advertisements. Remove one to add another."
            );
            return;
          }
        } catch (error) {
          toast.error("An error occurred. Please try again.");
          return;
        }
        setOpenAdModal(true);
      } else if (user?.role === "shop") {
        try {
          const shopInfoResponse = await fetch(
            `${backEndURL}/api/shop-info/exists`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const shopInfo = await shopInfoResponse.json();

          if (!shopInfo.has_shop_info) {
            navigate("/additionaldetails");
            return;
          }
        } catch (error) {
          toast.error("An error occurred. Please try again.");
          return;
        }
        setOpenAdModal(true);
      }
    } catch (error) {
      console.error("Failed to handle advertisement logic:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const avatarDropdown = (
    <div className="relative">
      <img
        alt={user?.name}
        src={profilePicture}
        className="inline-block object-cover object-center w-12 h-12 rounded-full cursor-pointer hover:shadow-lg"
        data-popover-target="profile-menu"
        onClick={() => setOpenProfileMenu(!openProfileMenu)}
      />
      {openProfileMenu && (
        <ul
          ref={profileMenuRef}
          role="menu"
          data-popover="profile-menu"
          className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none block"
          style={{
            right:
              profileMenuRef.current &&
              window.innerWidth -
                profileMenuRef.current.getBoundingClientRect().right >
                0
                ? "auto"
                : "0",
            left:
              profileMenuRef.current &&
              window.innerWidth -
                profileMenuRef.current.getBoundingClientRect().right >
                0
                ? profileMenuRef.current.getBoundingClientRect().left + "px"
                : "auto",
          }}
        >
          <button
            role="menuitem"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={handleAddAdvertisement}
          >
            {loading ? <Spinner /> : "Add Advertisement"}
          </button>
          <NavLink to="/settings/profile">
            <button
              role="menuitem"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Settings
            </button>
          </NavLink>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Sign Out
          </button>
        </ul>
      )}
    </div>
  );

  const isActive = (path: string) => {
    if (path === "/advertisements") {
      return (
        location.pathname === path || location.pathname.startsWith(`${path}/`)
      );
    }
    if (path === "/compatibility/compatibility-tool") {
      return location.pathname.startsWith("/compatibility");
    }
    return location.pathname === path;
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/"
          className={`flex items-center ${
            isActive("/") ? "font-bold text-blue-500" : ""
          }`}
        >
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/advertisements"
          className={`flex items-center ${
            isActive("/advertisements") ? "font-bold text-blue-500" : ""
          }`}
        >
          Advertisement Platform
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/compatibility/compatibility-tool"
          className={`flex items-center ${
            isActive("/compatibility/compatibility-tool")
              ? "font-bold text-blue-500"
              : ""
          }`}
        >
          Compatibility Tool
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/search"
          className={`flex items-center ${
            isActive("/search") ? "font-bold text-blue-500" : ""
          }`}
        >
          Fish Database
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/forum/forum-home"
          className={`flex items-center ${
            isActive("/forum/forum-home") ? "font-bold text-blue-500" : ""
          }`}
        >
          Forum
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <div>
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <NavLink to="/">
            <img src={Logo} alt="Logo" className="h-10" />
          </NavLink>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {user && token && !isMobile ? (
              <div className="flex items-center gap-x-1">{avatarDropdown}</div>
            ) : (
              <div className="flex items-center gap-x-1">
                <NavLink to="/signin">
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Log In</span>
                  </Button>
                </NavLink>
                <NavLink to="/signup">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                  >
                    <span>Sign up</span>
                  </Button>
                </NavLink>
              </div>
            )}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          {user && token ? (
            <>
              <div className="flex items-center gap-x-2">
                <img
                  alt={user.name}
                  src={profilePicture}
                  className="inline-block object-cover object-center w-10 h-10 rounded-full cursor-pointer hover:shadow-lg"
                  data-popover-target="profile-menu"
                  onClick={() => setOpenProfileMenu(!openProfileMenu)}
                />
                <Typography variant="h6" color="blue-gray">
                  {user.name}
                </Typography>
              </div>
              <div className="pl-10 w-full rounded-md shadow-lg mt-2">
                <ul ref={profileMenuRef} className="block p-2 space-y-2">
                  <button
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                    onClick={handleAddAdvertisement}
                  >
                    {loading ? <Spinner /> : "Add Advertisement"}
                  </button>
                  <NavLink to="/settings/profile">
                    <button
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                    >
                      Settings
                    </button>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Sign Out
                  </button>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-x-1">
              <NavLink to="/signin">
                <Button fullWidth variant="text" size="sm" className="">
                  <span>Log In</span>
                </Button>
              </NavLink>
              <NavLink to="/signup">
                <Button fullWidth variant="gradient" size="sm" className="">
                  <span>Sign up</span>
                </Button>
              </NavLink>
            </div>
          )}
        </Collapse>
      </Navbar>
      <UserAdditionalDetailsModel
        handleOpen={() => setOpenUADModal(false)}
        open={openUADModal}
      />
      <AddAdvertisementModal
        open={openAdModal}
        handleClose={() => setOpenAdModal(false)}
      />
      <div className="mx-auto">{children}</div>
    </div>
  );
};

export default NavBar;
