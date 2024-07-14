import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Typography,
  Input,
  Button,
  Avatar,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";
const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

interface WorkingHours {
  open: string;
  close: string;
  closed: boolean;
}

type WorkingHoursState = {
  [key: string]: WorkingHours;
};

interface Location {
  lat: number;
  lng: number;
}

const EditProfile: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [cityId, setCityId] = useState<number | null>(null);
  const [isUserDetailsUpdating, setIsUserDetailsUpdating] = useState(false);
  const [isShopDetailsUpdating, setIsShopDetailsUpdating] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [isProfilePictureUpdating, setIsProfilePictureUpdating] =
    useState(false);
  const [isCoverPhotoUpdating, setIsCoverPhotoUpdating] = useState(false);
  const [isNameEmailUpdating, setIsNameEmailUpdating] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const { token, user, updateUser } = useAuth();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [workingHours, setWorkingHours] = useState<WorkingHoursState>({
    Monday: { open: "08:00 AM", close: "06:00 PM", closed: false },
    Tuesday: { open: "08:00 AM", close: "06:00 PM", closed: false },
    Wednesday: { open: "08:00 AM", close: "06:00 PM", closed: false },
    Thursday: { open: "08:00 AM", close: "06:00 PM", closed: false },
    Friday: { open: "08:00 AM", close: "06:00 PM", closed: false },
    Saturday: { open: "09:00 AM", close: "05:00 PM", closed: false },
    Sunday: { open: "", close: "", closed: true },
  });

  const convertTo12Hour = (time24: string): string => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    let period = "AM";
    let hours12 = parseInt(hours, 10);

    if (hours12 >= 12) {
      period = "PM";
      if (hours12 > 12) {
        hours12 -= 12;
      }
    }
    if (hours12 === 0) {
      hours12 = 12;
    }

    return `${hours12.toString().padStart(2, "0")}:${minutes} ${period}`;
  };

  const convertTo24Hour = (time12: string): string => {
    if (!time12) return "";
    const [time, period] = time12.split(" ");
    if (!time || !period) return "";
    let [hours, minutes] = time.split(":");
    let hours24 = parseInt(hours, 10);

    if (period.toLowerCase() === "pm" && hours24 !== 12) {
      hours24 += 12;
    } else if (period.toLowerCase() === "am" && hours24 === 12) {
      hours24 = 0;
    }

    return `${hours24.toString().padStart(2, "0")}:${minutes}`;
  };

  const handleWorkingHoursChange = (
    day: string,
    field: keyof WorkingHours,
    value: string
  ) => {
    const time12 = convertTo12Hour(value);
    setWorkingHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        [field]: time12,
      },
    }));
  };

  const handleClosedChange = (day: string) => {
    setWorkingHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        closed: !prevHours[day].closed,
      },
    }));
  };

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setSelectedLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  }, []);

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  useEffect(() => {
    setIsDataLoading(true);
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`${backEndURL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = userResponse.data;

        if (userData.profile_photo_path !== null) {
          setProfilePreview(backEndURL + userData.profile_photo_path);
        } else {
          setProfilePreview(userData.profile_photo_url);
        }
        if (userData.banner_photo_path !== null) {
          setCoverPreview(backEndURL + userData.banner_photo_path);
        } else {
          setCoverPreview("");
        }
        setName(userData.name);
        setEmail(userData.email);

        if (userData.role === "shop") {
          const shopResponse = await axios.get(
            `${backEndURL}/api/shop-info/get`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const shopData = shopResponse.data.shop_info;

          setOwnerName(shopData.owner_name);
          setDescription(shopData.description);
          setPhoneNumber(shopData.phone_number);
          setAddress(shopData.address);
          setCityId(shopData.city_id);
          setSelectedLocation({
            lat: shopData.gps_coordinates.latitude,
            lng: shopData.gps_coordinates.longitude,
          });
          setWorkingHours(
            Object.fromEntries(
              Object.entries(shopData.working_hours).map(([day, hours]) => [
                day.charAt(0).toUpperCase() + day.slice(1),
                {
                  open: hours === "Closed" ? "" : hours.split(" - ")[0],
                  close: hours === "Closed" ? "" : hours.split(" - ")[1],
                  closed: hours === "Closed",
                },
              ])
            )
          );
          setFacebook(shopData.socialmedia_links.facebook || "");
          setInstagram(shopData.socialmedia_links.instagram || "");
          setTwitter(shopData.socialmedia_links.twitter || "");
        } else if (userData.role === "user") {
          const userResponse = await axios.get(
            `${backEndURL}/api/user-info/get`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const userData = userResponse.data.user_info;
          setPhoneNumber(userData.phone_number);
          setCityId(userData.city_id);
        }
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${backEndURL}/api/getAllCities`);
        if (response.data.success) {
          setCities(response.data.data);
          setIsDataLoading(false);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
    fetchUserData();
  }, [token]);

  const mapRef = useRef<google.maps.Map | null>(null);
  const center = { lat: selectedLocation?.lat, lng: selectedLocation?.lng };

  const handleProfilePictureSubmit = async () => {
    if (!profilePicture) {
      toast.error("Please select a profile picture to upload");
      return;
    }
    setIsProfilePictureUpdating(true);
    const formData = new FormData();
    formData.append("profile_photo", profilePicture);

    try {
      await axios.post(
        `${backEndURL}/api/user/updateProfilePicture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile picture updated successfully");
    } catch (error) {
      toast.error("Failed to update profile picture");
    } finally {
      getUserData();
      setIsProfilePictureUpdating(false);
      setProfilePicture(null); // Reset after submission
    }
  };

  const handleCoverPhotoSubmit = async () => {
    if (!coverPhoto) {
      toast.error("Please select a cover photo to upload");
      return;
    }
    setIsCoverPhotoUpdating(true);
    const formData = new FormData();
    formData.append("banner_photo", coverPhoto);

    try {
      await axios.post(`${backEndURL}/api/user/updateBannerPhoto`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Cover photo updated successfully");
    } catch (error) {
      toast.error("Failed to update cover photo");
    } finally {
      getUserData();
      setIsCoverPhotoUpdating(false);
      setCoverPhoto(null); // Reset after submission
    }
  };

  const handleShopAdditionalDataSubmit = async () => {
    setIsShopDetailsUpdating(true);
    if (
      !selectedLocation ||
      cityId === null ||
      ownerName === "" ||
      phoneNumber === "" ||
      address === ""
    ) {
      toast.error("Fill all the requried fields!");
      return;
    }
    const formattedWorkingHours = Object.fromEntries(
      Object.entries(workingHours).map(([day, { open, close, closed }]) => [
        day.toLowerCase(),
        closed ? "Closed" : `${open} - ${close}`,
      ])
    );

    const data = {
      owner_name: ownerName,
      description,
      phone_number: phoneNumber,
      address,
      city_id: cityId,
      gps_coordinates: {
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
      },
      working_hours: formattedWorkingHours,
      socialmedia_links: {
        facebook,
        twitter,
        instagram,
      },
    };

    console.log(data);

    try {
      await axios.post(`${backEndURL}/api/shop-info/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Submited successfully!");
    } catch (error) {
      toast.error("Error submitting form");
    } finally {
      setIsShopDetailsUpdating(false);
    }
  };

  const handleUserAdditionalDataSubmit = async () => {
    setIsUserDetailsUpdating(true);
    try {
      const response = await axios.post(
        `${backEndURL}/api/user-info/update`,
        {
          phone_number: phoneNumber,
          city_id: cityId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message) {
        toast.success("User infomation updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating user info");
    } finally {
      setIsUserDetailsUpdating(false);
    }
  };

  const handleNameEmailSubmit = async () => {
    setIsNameEmailUpdating(true);
    try {
      const response = await axios.post(
        `${backEndURL}/api/user/updateNameEmail`,
        {
          name: name,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message) {
        toast.success("User infomation updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating user info");
    } finally {
      getUserData();
      setIsNameEmailUpdating(false);
    }
  };

  const handlePasswordSubmit = async () => {
    setIsPasswordUpdating(true);
    try {
      const response = await axios.post(
        `${backEndURL}/api/user/updatePassword`,
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message) {
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          toast.error("Current password is incorrect.");
        } else if (error.response.status === 500) {
          toast.error("Failed to update password.");
        } else {
          toast.error("Error updating password.");
        }
      } else {
        toast.error("Network error.");
      }
    } finally {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsPasswordUpdating(false);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(`${backEndURL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data;
      updateUser(userData);
    } catch (error) {
      toast.error("Failed to fetch user data");
    }
  };

  return (
    <>
      {isDataLoading ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Typography variant="h3" className="mb-8 mt-10 text-gray-700">
            EDIT PROFILE
          </Typography>
          <div className="p-6 mb-8 rounded-lg bg-gray-50">
            <div className="relative w-full h-40 mb-8 lg:h-64">
              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Cover Preview"
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-md dark:bg-gray-700" />
              )}
              <div className="absolute top-2 right-2">
                <label
                  htmlFor="coverPhoto"
                  className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                >
                  {!coverPhoto && (
                    <Button
                      className="self-end px-3 py-2 mt-4 flex items-center justify-center gap-2"
                      onClick={() =>
                        document.getElementById("coverPhoto")?.click()
                      }
                      disabled={isCoverPhotoUpdating}
                    >
                      {isCoverPhotoUpdating && <Spinner className="mr-2" />}
                      Change Cover Photo
                    </Button>
                  )}
                </label>
                <input
                  id="coverPhoto"
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleCoverPhotoChange}
                  className="hidden"
                />
                {coverPhoto && (
                  <Button
                    onClick={handleCoverPhotoSubmit}
                    disabled={isCoverPhotoUpdating}
                    className="self-end px-3 py-2 mt-4 flex items-center justify-center gap-2"
                  >
                    {isCoverPhotoUpdating && <Spinner className="mr-2" />}
                    Upload Cover Photo
                  </Button>
                )}
              </div>

              <div className="absolute bottom-[-40px] left-4 w-28 h-28 lg:h-52 lg:w-52">
                {profilePreview ? (
                  <Avatar
                    src={profilePreview}
                    alt="Profile Preview"
                    className="object-cover w-full h-full border-black rounded-full border-5 dark:border-gray-800"
                  />
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
              {!profilePicture && (
                <Button
                  className="self-end px-3 py-2 mt-4 flex items-center justify-center gap-2"
                  onClick={() =>
                    document.getElementById("profilePicture")?.click()
                  }
                  disabled={isProfilePictureUpdating}
                >
                  {isProfilePictureUpdating && <Spinner className="mr-2" />}
                  Change Profile Picture
                </Button>
              )}
              {profilePicture && (
                <Button
                  onClick={handleProfilePictureSubmit}
                  disabled={isProfilePictureUpdating}
                  className="self-end px-3 py-2 mt-4 flex items-center justify-center gap-2"
                >
                  {isProfilePictureUpdating && <Spinner className="mr-2" />}
                  Upload Profile Picture
                </Button>
              )}
            </div>
          </div>

          {/* Section 1: Change Cover Photo and Profile Picture */}

          <div className="lg:mx-52">
            {/* Section 2: Change Telephone Number and Email */}
            <div className="flex flex-col w-full gap-4 p-6 mb-8 rounded-lg bg-gray-50">
              <form>
                <Typography variant="h5" className="mb-4">
                  Change Name and Email
                </Typography>
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                  >
                    Name:
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                  >
                    Email:
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <Button
                    className="self-end px-3 py-2 mt-4 flex items-center justify-center gap-2"
                    onClick={handleNameEmailSubmit}
                    disabled={isNameEmailUpdating}
                  >
                    {isNameEmailUpdating && <Spinner className="" />}
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>

            {/* Section 3: Change Username and Password */}
            <div className="flex flex-col w-full gap-4 p-6 mt-8 mb-8 rounded-lg bg-gray-50">
              <form>
                <Typography variant="h5" className="mb-4">
                  Change Password
                </Typography>
                <div className="flex flex-col"></div>

                <div className="flex flex-col">
                  <label
                    htmlFor="currentPassword"
                    className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                  >
                    Current Password:
                  </label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="newPassword"
                    className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                  >
                    New Password:
                  </label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                  >
                    Confirm Password:
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <Button
                    className="self-end px-3 py-2 mt-4 flex items-center justify-center gap-2"
                    onClick={handlePasswordSubmit}
                    disabled={isPasswordUpdating}
                  >
                    {isPasswordUpdating && <Spinner className="" />}
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>

            {user["role"] === "user" && (
              <div className="flex flex-col w-full gap-4 p-6 mt-8 mb-8 rounded-lg bg-gray-50">
                <form>
                  <Typography variant="h5" className="mb-4">
                    Additional Details (Extended User)
                  </Typography>
                  <div className="flex flex-col">
                    <label
                      htmlFor="phoneNumber"
                      className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                    >
                      Phone Number:
                    </label>
                    <Input
                      type="tel"
                      className="w-full"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required={true}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="city"
                      className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                    >
                      Select City:
                    </label>
                    <Select
                      className="w-full"
                      value={cityId?.toString()}
                      onChange={(val) => setCityId(Number(val))}
                    >
                      {cities.map((city) => (
                        <Option key={city.id} value={city.id.toString()}>
                          {city.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex flex-col w-full">
                    <Button
                      className="self-end px-3 py-2 mt-4 flex items-center justify-center gap-2"
                      onClick={handleUserAdditionalDataSubmit}
                      disabled={isUserDetailsUpdating}
                    >
                      {isUserDetailsUpdating && <Spinner className="" />}
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {user["role"] === "shop" && (
              <div className="flex flex-col w-full gap-4 p-6 mb-8 rounded-lg bg-gray-50">
                <form>
                  <Typography variant="h5" className="mb-4">
                    Additional Details (Shop Information)
                  </Typography>
                  <div className="flex flex-col">
                    <label
                      htmlFor="ownerName"
                      className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                    >
                      Owner Name:
                    </label>
                    <Input
                      type="text"
                      className="w-full mb-3"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      required={true}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="description"
                      className="mb-1 text-sm text-gray-700 dark:text-gray-700"
                    >
                      Description:
                    </label>
                    <ReactQuill
                      value={description}
                      onChange={setDescription}
                      className="mb-4"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="shopPhoneNumber"
                      className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                    >
                      Phone Number:
                    </label>
                    <Input
                      type="tel"
                      className="w-full"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required={true}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="address"
                      className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                    >
                      Address:
                    </label>
                    <Input
                      type="text"
                      className="w-full"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required={true}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="shopCity"
                      className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                    >
                      Select City:
                    </label>
                    <Select
                      className="w-full"
                      value={cityId?.toString()}
                      onChange={(val) => setCityId(Number(val))}
                    >
                      {cities.map((city) => (
                        <Option key={city.id} value={city.id.toString()}>
                          {city.name}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="gpsCoordinates"
                      className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                    >
                      GPS Coordinates:
                    </label>
                    {!isLoaded ? (
                      <div>Loading map...</div>
                    ) : (
                      <div className="h-[400px] w-full">
                        <GoogleMap
                          mapContainerClassName="w-full h-full"
                          center={center}
                          zoom={16}
                          onClick={handleMapClick}
                          onLoad={onMapLoad}
                        >
                          {selectedLocation && (
                            <Marker position={selectedLocation} />
                          )}
                        </GoogleMap>
                      </div>
                    )}
                    {selectedLocation && (
                      <div>
                        <Typography variant="small">
                          Selected Location: Lat:{" "}
                          {selectedLocation.lat.toFixed(6)}, Lng:{" "}
                          {selectedLocation.lng.toFixed(6)}
                        </Typography>
                      </div>
                    )}
                  </div>
                  {/* Working Hour Section div start */}
                  <Typography variant="h6" className="mt-6 mb-2">
                    Working Hours:
                  </Typography>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(workingHours).map(([day, hours]) => (
                      <div key={day} className="flex flex-col space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{day}:</span>
                          <Button
                            size="sm"
                            className="px-2 py-1 text-xs"
                            onClick={() => handleClosedChange(day)}
                          >
                            {hours.closed ? "Open" : "Close"}
                          </Button>
                        </div>
                        {hours.closed ? (
                          <span className="text-gray-500">Closed</span>
                        ) : (
                          <div className="flex space-x-2">
                            <Input
                              type="time"
                              value={convertTo24Hour(hours.open)}
                              onChange={(e) =>
                                handleWorkingHoursChange(
                                  day,
                                  "open",
                                  convertTo12Hour(e.target.value)
                                )
                              }
                              className="w-full"
                              containerProps={{ className: "min-w-0" }}
                            />
                            <Input
                              type="time"
                              value={convertTo24Hour(hours.close)}
                              onChange={(e) =>
                                handleWorkingHoursChange(
                                  day,
                                  "close",
                                  convertTo12Hour(e.target.value)
                                )
                              }
                              className="w-full"
                              containerProps={{ className: "min-w-0" }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col space-y-2 mt-3">
                    <Typography variant="h6" className="mt-6 mb-2">
                      Social media Links
                    </Typography>
                    <label
                      htmlFor="facebook"
                      className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                    >
                      Facebook:
                    </label>
                    <Input
                      type="url"
                      className="w-full"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                    />

                    <label
                      htmlFor="instagram"
                      className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                    >
                      Instagram:
                    </label>
                    <Input
                      type="url"
                      className="w-full"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                    />

                    <label
                      htmlFor="twitter"
                      className="mb-1 text-sm text-gray-700 dark:text-gray-200"
                    >
                      Twitter:
                    </label>
                    <Input
                      type="url"
                      className="w-full"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <Button
                      className="self-end px-3 py-2 mt-4 flex items-center justify-center gap-2"
                      onClick={handleShopAdditionalDataSubmit}
                      disabled={isShopDetailsUpdating}
                    >
                      {isShopDetailsUpdating && <Spinner className="" />}
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
