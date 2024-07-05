import React, { useState } from 'react';
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/facebook';
import 'react-social-icons/instagram';
import 'react-social-icons/twitter';

import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
    Textarea,
    Avatar,
    Select,
    Option,
} from "@material-tailwind/react";
// remove this link rel

// working hour component star
interface TimeSlot {
    start: string;
    end: string;
}

interface Day {
    name: string;
    active: boolean;
    slots: TimeSlot[];
}

const initialDays: Day[] = [
    { name: 'Monday', active: false, slots: [] },
    { name: 'Tuesday', active: true, slots: [{ start: '09:00', end: '13:00' }] },
    { name: 'Wednesday', active: false, slots: [] },
    { name: 'Thursday', active: false, slots: [] },
    { name: 'Friday', active: false, slots: [] },
    { name: 'Saturday', active: false, slots: [] },
    { name: 'Sunday', active: false, slots: [] },
];
// working hour component end

const EditProfile: React.FC = () => {
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState<string | null>(null);
    const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    //working days const start
    // const start
    const [workingHoursStart, setWorkingHoursStart] = useState<Date | null>(null);
    const [workingHoursEnd, setWorkingHoursEnd] = useState<Date | null>(null);

    const [selectedDay, setSelectedDay] = useState<string>(''); // For day selection

    //const end
    const [days, setDays] = useState<Day[]>(initialDays);
    const handleToggleDay = (index: number) => {
        const updatedDays = days.map((day, i) => (i === index ? { ...day, active: !day.active } : day));
        setDays(updatedDays);
    };
    const handleAddSlot = (index: number) => {
        const updatedDays = days.map((day, i) => {
            if (i === index) {
                return { ...day, slots: [...day.slots, { start: '09:00', end: '09:00' }] };
            }
            return day;
        });
        setDays(updatedDays);
    };
    const handleRemoveSlot = (dayIndex: number, slotIndex: number) => {
        const updatedDays = days.map((day, i) => {
            if (i === dayIndex) {
                return { ...day, slots: day.slots.filter((_, j) => j !== slotIndex) };
            }
            return day;
        });
        setDays(updatedDays);
    };

    //working days const end




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

    const cities = ["City1", "City2", "City3"]; // Replace with your cities



    return (
        <div className="flex flex-col min-h-screen">
            <Typography variant="h2" className="mb-8 text-gray-700 dark:text-gray-200">
                EDIT PROFILE
            </Typography>
            <div className="p-6 mb-8 rounded-lg bg-gray-50">
                <div className="relative w-full h-40 mb-8 lg:h-64">
                    {coverPreview ? (
                        <img src={coverPreview} alt="Cover Preview" className="object-cover w-full h-full rounded-md" />
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

                    <div className="absolute bottom-[-40px] left-4 w-28 h-28 lg:h-52 lg:w-52">
                        {profilePreview ? (
                            <Avatar src={profilePreview} alt="Profile Preview" className="object-cover w-full h-full border-black rounded-full border-5 dark:border-gray-800" />
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


            {/* Section 1: Change Cover Photo and Profile Picture */}

            <div className='lg:mx-52'>
                {/* Section 2: Change Telephone Number and Email */}
                <form className="flex flex-col w-full gap-4 p-6 mb-8 rounded-lg bg-gray-50">
                    <Typography variant="h5" className="mb-4 text-gray-700 dark:text-gray-200">Change Name and Email</Typography>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Name:
                        </label>
                        <Input
                            id="name"
                            type="text"
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
                <form className="flex flex-col w-full gap-4 p-6 rounded-lg bg-gray-50">
                    <Typography variant="h5" className="mb-4 text-gray-700 dark:text-gray-200">Change Password</Typography>
                    <div className="flex flex-col">


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

                {/* Section 4: Change Telephone Number and City */}
                <form className="flex flex-col w-full gap-4 p-6 mt-8 mb-8 rounded-lg bg-gray-50">
                    <Typography variant="h5" className="mb-4 text-gray-700 dark:text-gray-200">Change Phone Number and City</Typography>
                    <div className="flex flex-col">
                        <label htmlFor="phoneNumber" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Phone Number:
                        </label>
                        <Input
                            id="phoneNumber"
                            type="tel"
                            color="blue"
                            required
                            className="border border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="city" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Select City:
                        </label>
                        <Select
                            id="city"

                            className="p-2 border border-gray-300 rounded dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            {cities.map((city) => (
                                <Option key={city} value={city}>
                                    {city}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    <Button type="submit" color='#0c0a09' className="self-end px-3 py-2 mt-4">
                        Save Changes
                    </Button>
                </form>

                {/* Section 5: Shop Owner Information */}
                <form className="flex flex-col w-full gap-4 p-6 mb-8 rounded-lg bg-gray-50">
                    <Typography variant="h5" className="mb-4 text-gray-700 dark:text-gray-200">Shop Owner Information</Typography>
                    <div className="flex flex-col">
                        <label htmlFor="ownerName" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Owner Name:
                        </label>
                        <Input
                            id="ownerName"
                            type="text"
                            color="blue"
                            required
                            className="border border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="mb-1 text-sm text-gray-700 dark:text-gray-700">
                            Description:
                        </label>
                        <Textarea
                            id="description"
                            required
                            className="p-2 border border-gray-300 rounded dark:text-gray-700 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="shopPhoneNumber" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Phone Number:
                        </label>
                        <Input
                            id="shopPhoneNumber"
                            type="tel"
                            color="blue"
                            required
                            className="border border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="address" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Address:
                        </label>
                        <Input
                            id="address"
                            type="text"
                            color="blue"
                            required
                            className="border border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="shopCity" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Select City:
                        </label>
                        <Select
                            id="shopCity"
                            className="p-2 border border-gray-300 rounded dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            {cities.map((city) => (
                                <Option key={city} value={city}>
                                    {city}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="gpsCoordinates" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            GPS Coordinates:
                        </label>
                        <Input
                            id="gpsCoordinates"
                            type="text"
                            color="blue"
                            required
                            className="border border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Input
                            id="gpsCoordinates"
                            type="text"
                            color="blue"
                            required
                            className="mt-4 border border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    {/* Working Hour Section div start */}
                    <div className="p-4 space-y-4">
                        {days.map((day, dayIndex) => (
                            <div key={day.name} className="p-2 border rounded-md">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={day.active}
                                        onChange={() => handleToggleDay(dayIndex)}
                                        className="mr-2"
                                    />
                                    <span>{day.name}</span>
                                </div>
                                {day.active && (
                                    <div className="mt-2 space-y-2">
                                        {day.slots.map((slot, slotIndex) => (
                                            <div key={slotIndex} className="flex items-center space-x-2">
                                                <input
                                                    type="time"
                                                    value={slot.start}
                                                    onChange={(e) => {
                                                        const updatedDays = days.map((d, i) => {
                                                            if (i === dayIndex) {
                                                                const updatedSlots = d.slots.map((s, j) => (j === slotIndex ? { ...s, start: e.target.value } : s));
                                                                return { ...d, slots: updatedSlots };
                                                            }
                                                            return d;
                                                        });
                                                        setDays(updatedDays);
                                                    }}
                                                    className="p-1 border rounded"
                                                />
                                                <span>-</span>
                                                <input
                                                    type="time"
                                                    value={slot.end}
                                                    onChange={(e) => {
                                                        const updatedDays = days.map((d, i) => {
                                                            if (i === dayIndex) {
                                                                const updatedSlots = d.slots.map((s, j) => (j === slotIndex ? { ...s, end: e.target.value } : s));
                                                                return { ...d, slots: updatedSlots };
                                                            }
                                                            return d;
                                                        });
                                                        setDays(updatedDays);
                                                    }}
                                                    className="p-1 border rounded"
                                                />
                                                <button
                                                    onClick={() => handleRemoveSlot(dayIndex, slotIndex)}
                                                    className="p-1 text-red-500 border rounded"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => handleAddSlot(dayIndex)}
                                            className="p-1 text-green-500 border rounded"
                                        >
                                            ➕
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Working Hour Section div end */}

                    <div className="flex flex-col space-y-2">
                        <Typography>
                            Social media Links
                        </Typography>
                        <label htmlFor="facebook" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Facebook:
                        </label>
                        <Input
                            id="facebook"
                            type="url"
                            color="blue"

                            className="border border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />

                        <label htmlFor="instagram" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Instagram:
                        </label>
                        <Input
                            id="instagram"
                            type="url"
                            color="blue"

                            className="border border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />

                        <label htmlFor="twitter" className="mb-1 text-sm text-gray-700 dark:text-gray-200">
                            Twitter:
                        </label>
                        <Input
                            id="twitter"
                            type="url"
                            color="blue"

                            className="border border-gray-300 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <Button type="submit" color='#0c0a09' className="self-end px-3 py-2 mt-4">
                        Save Changes
                    </Button>
                </form>


            </div>
        </div>
    );
};

export default EditProfile;
