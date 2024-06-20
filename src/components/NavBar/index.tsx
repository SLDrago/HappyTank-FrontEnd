import React, { ReactNode, useRef, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../images/Logos/logo-blacktext.svg";
import AddAdvertisementModal from "../../components/AdvertismentModel/AddAdvertismentModal";
import { useAuth } from "../../context/AuthContext";

const NavBar: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openNav, setOpenNav] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openAdModal, setOpenAdModal] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 960 });
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

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

  const avatarDropdown = (
    <div className="relative">
      <img
        alt={user?.name}
        src={user?.profile_photo_path || user?.profile_photo_url}
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
            onClick={() => setOpenAdModal(true)}
          >
            Add Advertisement
          </button>
          <button
            role="menuitem"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Settings
          </button>
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

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to="/" className="flex items-center">
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to="/advertisements" className="flex items-center">
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
          className="flex items-center"
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
        <NavLink to="/search" className="flex items-center">
          Fish Database
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to="/forum/forum-file" className="flex items-center">
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
                  src={user.profile_photo_path || user.profile_photo_url}
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
                    onClick={() => setOpenAdModal(true)}
                  >
                    Add Advertisement
                  </button>
                  <button
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Settings
                  </button>
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
      <AddAdvertisementModal
        open={openAdModal}
        handleClose={() => setOpenAdModal(false)}
      />
      <div className="mx-auto">{children}</div>
    </div>
  );
};

export default NavBar;
