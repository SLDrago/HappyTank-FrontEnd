
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from '@material-tailwind/react';
import {
    UserCircleIcon,
    PowerIcon,
    NewspaperIcon
} from '@heroicons/react/24/solid';

const Sidebar: React.FC = () => {
    const [open, setOpen] = React.useState(0);
    const location = useLocation();

    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card className="w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0">
            <div className="flex items-center p-4 mb-2">
                <UserCircleIcon className="w-12 h-12 text-white" />
                <Typography variant="h5" color="white" className="ml-2">
                    User
                </Typography>
            </div>
            <List>
                <Link to="/settings/profile" className="flex items-center w-full">
                    <ListItem selected={location.pathname === '/settings/profile'}>
                        <ListItemPrefix>
                            <UserCircleIcon className="w-5 h-5 text-white" />
                        </ListItemPrefix>
                        <Typography variant="normal" color="white" className="ml-2">
                            Edit Profile
                        </Typography>
                    </ListItem>
                </Link><Link to="/settings/advertisements" className="flex items-center w-full">
                    <ListItem selected={location.pathname === '/settings/advertisements'}>
                        <ListItemPrefix>
                            <NewspaperIcon className="w-5 h-5 text-white" />
                        </ListItemPrefix>
                        <Typography variant="normal" color="white" className="ml-2">
                            Manage Advertisement
                        </Typography>
                    </ListItem>
                </Link>
            </List>
            <hr className="my-2 border-blue-gray-50" />
            <List>
                <ListItem>
                    <Link to="/settings/advertisements" className="flex items-center w-full">
                        <ListItemPrefix>
                            <PowerIcon className="w-5 h-5 text-white" />
                        </ListItemPrefix>
                        <Typography variant="normal" color="white" className="ml-2">
                            Log Out
                        </Typography>
                    </Link>
                </ListItem>
            </List>
        </Card>
    );
};

export default Sidebar;
