import React from "react";
import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
  NewspaperIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Logo from "../../images/Logos/logo.svg";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center p-4 mb-2">
        <NavLink to="/" onClick={closeDrawer}>
          <img src={Logo} alt="Logo" className="h-12" />
        </NavLink>
      </div>
      <List>
        <Link
          to="/settings/profile"
          className="flex items-center w-full"
          onClick={closeDrawer}
        >
          <ListItem selected={location.pathname === "/settings/profile"}>
            <ListItemPrefix>
              <UserCircleIcon className="w-5 h-5 text-white" />
            </ListItemPrefix>
            <Typography variant="paragraph" color="white" className="ml-2">
              Edit Profile
            </Typography>
          </ListItem>
        </Link>
        <Link
          to="/settings/advertisements"
          className="flex items-center w-full"
          onClick={closeDrawer}
        >
          <ListItem selected={location.pathname === "/settings/advertisements"}>
            <ListItemPrefix>
              <NewspaperIcon className="w-5 h-5 text-white" />
            </ListItemPrefix>
            <Typography variant="paragraph" color="white" className="ml-2">
              Manage Advertisement
            </Typography>
          </ListItem>
        </Link>
      </List>
      <hr className="my-2 border-blue-gray-50" />
      <List>
        <ListItem>
          <button onClick={handleLogout} className="flex items-center w-full">
            <ListItemPrefix>
              <PowerIcon className="w-5 h-5 text-white" />
            </ListItemPrefix>
            <Typography variant="paragraph" color="white" className="ml-2">
              Log Out
            </Typography>
          </button>
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      <IconButton
        variant="text"
        size="lg"
        onClick={openDrawer}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        <Bars3Icon className="h-8 w-8 stroke-2" />
      </IconButton>

      {/* Sidebar for larger screens */}
      <Card className="hidden lg:block h-full w-72 p-4 shadow-xl shadow-blue-gray-900/5 bg-black overflow-y-auto">
        <SidebarContent />
      </Card>

      {/* Drawer for smaller screens */}
      <Drawer
        open={isOpen}
        onClose={closeDrawer}
        className="lg:hidden bg-transparent"
      >
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-black overflow-y-auto">
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={closeDrawer}
            className="lg:hidden"
          >
            <XMarkIcon className="h-8 w-8 stroke-2" />
          </IconButton>
          <SidebarContent />
        </Card>
      </Drawer>
    </>
  );
};

export default Sidebar;
