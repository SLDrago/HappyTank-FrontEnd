import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Stepper,
  Step,
  Select,
  Button,
  Card,
  Input,
  Typography,
  Option,
} from "@material-tailwind/react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const AdditionalDetails: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [cities, setCities] = useState<City[]>([]);
  const [description, setDescription] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [cityId, setCityId] = useState<number | null>(null);
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [loading, setLoading] = useState(true);
  const { token, user } = useAuth();
  const navigate = useNavigate();

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

  if (user?.role == "user") {
    navigate("/");
  }

  useEffect(() => {
    const checkShopInfo = async () => {
      try {
        const response = await axios.get(`${backEndURL}/api/shop-info/exists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.has_shop_info) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking shop info:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axios.get(`${backEndURL}/api/getAllCities`);
        if (response.data.success) {
          setCities(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    checkShopInfo();
    fetchCities();
  }, [navigate, token]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const center = { lat: 7.8774222, lng: 80.7003428 };

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

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

  const handleSubmit = async () => {
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
      navigate("/");
    } catch (error) {
      toast.error("Error submitting form");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24">
        <div className="text-center">
          <Typography
            variant="h2"
            className="text-2xl md:text-3xl lg:text-4xl mb-2"
          ></Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24">
      <div className="text-center mb-8">
        <Typography
          variant="h2"
          className="text-2xl md:text-3xl lg:text-4xl mb-2"
        >
          Additional Information Required
        </Typography>
        <Typography variant="lead" className="text-lg md:text-xl mb-2">
          These details are required to manage your profile in the system.
        </Typography>
        <Typography variant="small" className="text-sm md:text-base">
          This information will be displayed in your public profile, so please
          provide correct details. You can manage these details in your profile
          settings.
        </Typography>
      </div>

      <Card className="w-full max-w-4xl mx-auto p-4 md:p-8 lg:p-12">
        <div className="mb-8">
          <Stepper
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
          >
            <Step onClick={() => setActiveStep(0)}>1</Step>
            <Step onClick={() => setActiveStep(1)}>2</Step>
            <Step onClick={() => setActiveStep(2)}>3</Step>
          </Stepper>
        </div>

        {activeStep === 0 && (
          <div className="space-y-4">
            <Input
              type="text"
              label="Shop Owner Name"
              className="w-full mb-3"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              required={true}
            />
            <div>
              <label className="mb-2">
                Shop Description:
                <ReactQuill
                  value={description}
                  onChange={setDescription}
                  className="mb-4"
                />
              </label>
            </div>
            <Input
              type="tel"
              label="Phone Number"
              placeholder="+94 **"
              className="w-full"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required={true}
            />
            <Input
              type="text"
              label="Shop Address"
              className="w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required={true}
            />
            <Select
              label="City"
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
        )}

        {activeStep === 1 && (
          <div className="space-y-4">
            <Typography variant="h6" className="mb-2">
              Social Media Links:
            </Typography>
            <Input
              type="url"
              label="Facebook"
              className="w-full"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
            <Input
              type="url"
              label="Twitter"
              className="w-full"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
            <Input
              type="url"
              label="Instagram"
              className="w-full"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />

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
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-4">
            <Typography variant="h6" className="mb-2">
              Select Shop Location:
            </Typography>
            {!isLoaded ? (
              <div>Loading map...</div>
            ) : (
              <div className="h-[400px] w-full">
                <GoogleMap
                  mapContainerClassName="w-full h-full"
                  center={center}
                  zoom={8}
                  onClick={handleMapClick}
                  onLoad={onMapLoad}
                >
                  {selectedLocation && <Marker position={selectedLocation} />}
                </GoogleMap>
              </div>
            )}
            {selectedLocation && (
              <div>
                <Typography variant="small">
                  Selected Location: Lat: {selectedLocation.lat.toFixed(6)},
                  Lng: {selectedLocation.lng.toFixed(6)}
                </Typography>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {!isFirstStep && <Button onClick={handlePrev}>Prev</Button>}
          {isFirstStep && <div></div>}
          {isLastStep && (
            <Button color="green" onClick={handleSubmit}>
              Submit
            </Button>
          )}
          {!isLastStep && (
            <Button onClick={handleNext} disabled={isLastStep}>
              Next
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AdditionalDetails;
