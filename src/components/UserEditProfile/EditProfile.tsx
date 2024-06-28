import React, { useState } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";

const EditProfile: React.FC = () => {
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState<string | null>(null);

    const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setProfilePicture(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setProfilePreview(null);
        }
    };

    const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setCoverPhoto(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setCoverPreview(null);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-3xl px-8 py-10 mx-auto mb-6 bg-gray-200 shadow-md rounded-xl dark:bg-gray-800">
                <Typography variant="h4" className="mb-8 text-center text-gray-700 dark:text-gray-200">
                    Edit Profile
                </Typography>

                {/* Section 1: Change Cover Photo and Profile Picture */}
                <div className="p-6 mb-8 bg-gray-300 rounded-lg">
                    <div className="relative w-full h-40 mb-8">
                        {coverPreview ? (
                            <img src={coverPreview} alt="Cover Preview" className="object-cover w-full h-full rounded-md " />
                        ) : (
                            <div className="w-full h-full bg-gray-200 rounded-md dark:bg-gray-700" />
                        )}
                        <div className="absolute top-2 right-2">
                            <label htmlFor="coverPhoto" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                                <Button
                                    color='#0c0a09'
                                    variant="gradient"
                                    className="self-end px-3 py-2 mt-4"
                                    onClick={() => document.getElementById('coverPhoto')?.click()}
                                >
                                    Change Cover Photo
                                </Button>
                            </label>
                            <input
                                id="coverPhoto"
                                type="file"
                                accept="image/*"
                                required
                                onChange={handleCoverPhotoChange}
                                className="hidden"
                            />
                        </div>

                        <div className="absolute bottom-[-40px] left-4 w-28 h-28">
                            {profilePreview ? (
                                <img src={profilePreview} alt="Profile Preview" className="object-cover w-full h-full border-black rounded-full border-5 dark:border-gray-800" />
                            ) : (
                                <div className="w-full h-full bg-gray-100 border-4 border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-800" />
                            )}
                            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                                <input
                                    id="profilePicture"
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={handleProfilePictureChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center mb-8">
                        <Button
                            color='#0c0a09'
                            variant="gradient"
                            onClick={() => document.getElementById('profilePicture')?.click()}
                            className="self-end px-3 py-2 mt-4"
                        >
                            Change Profile Picture
                        </Button>
                    </div>

                    <form className="flex flex-col w-full gap-4 mb-8">
                        <Button type="submit" color='#0c0a09' className="self-end px-3 py-2 mt-4">
                            Save Changes
                        </Button>
                    </form>
                </div>

                {/* Section 2: Change Telephone Number and Email */}
                <form className="flex flex-col w-full gap-4 p-6 mb-8 bg-gray-300 rounded-lg">
                    <Typography variant="h5" className="mb-4 text-gray-700 dark:text-gray-200">Change Mobile Number and Email</Typography>
                    <div className="flex flex-col">
                        <label htmlFor="telephone" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Mobile Number:
                        </label>
                        <Input
                            id="telephone"
                            type="tel"
                            color="blue"
                            required
                            className="border border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Email:
                        </label>
                        <Input
                            id="email"
                            type="email"
                            color="blue"
                            required
                            className="border border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <Button type="submit" color='#0c0a09' className="self-end px-3 py-2 mt-4">
                        Save Changes
                    </Button>
                </form>

                {/* Section 3: Change Username and Password */}
                <form className="flex flex-col w-full gap-4 p-6 bg-gray-300 rounded-lg">
                    <Typography variant="h5" className="mb-4 text-gray-700 dark:text-gray-200">Change Username and Password</Typography>
                    <div className="flex flex-col">
                        <label htmlFor="username" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Username:
                        </label>
                        <Input
                            id="username"
                            type="text"
                            color="blue"
                            required
                            className="border border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="currentPassword" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Current Password:
                        </label>
                        <Input
                            id="currentPassword"
                            type="password"
                            color="blue"
                            required
                            className="border border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="newPassword" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            New Password:
                        </label>
                        <Input
                            id="newPassword"
                            type="password"
                            color="blue"
                            required
                            className="border border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Confirm Password:
                        </label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            color="blue"
                            required
                            className="border border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <Button type="submit" color='#0c0a09' className="self-end px-3 py-2 mt-4">
                        Save Changes
                    </Button>
                </form>

                <CardFooter className="mt-4 text-center">
                    {/* <Typography variant="small" className="text-gray-500 dark:text-gray-300">
                        Already have an account?{" "}
                        <a href="#" className="text-blue-500 hover:text-blue-600">
                            Login
                        </a>
                    </Typography> */}
                </CardFooter>
            </Card>
        </div>
    );
};

export default EditProfile;
