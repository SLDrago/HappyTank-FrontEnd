import React, { useState, useEffect, DragEvent, ChangeEvent } from "react";
import axios from "axios";
import { Typography, Input, Button, Card } from "@material-tailwind/react";
import DefaultLayout from "../../layout/default_layout";
// import FileUpload from "../../components/FileUpload/FileUpload";
import AdCard from "../../components/Advertisement/AdCard";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

interface FishName {
  id: number;
  common_name: string;
  scientific_name: string;
  formatted_name: string;
}

interface FishData {
  id: number;
  common_name: string;
  scientific_name: string;
  aquarium_size: string;
  habitat: string;
  max_standard_length: string;
  temperature: string;
  ph: string;
  diet: string;
  behavior: string;
  sexual_dimorphisms: string;
  reproduction: string;
  notes: string;
  image: string;
}

interface Advertisement {
  id: number;
  title: string;
  small_description: string;
  price: number;
  image_url: string;
  avg_review: number;
  review_count: number;
}

interface AdvertisementResponse {
  advertisements: Advertisement[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export default function Search() {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<FishName[]>([]);
  const [fishList, setFishList] = useState<FishName[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchedFish, setSearchedFish] = useState<FishData | null>(null);
  const [isSearchView, setIsSearchView] = useState<boolean>(true);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [adPage, setAdPage] = useState<number>(1);
  const [adMeta, setAdMeta] = useState<AdvertisementResponse["meta"] | null>(
    null
  );
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [fishName, setFishName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchFishNames();
  }, []);

  const fetchFishNames = async () => {
    try {
      const response = await axios.get(`${backEndURL}/api/getFishNames`);
      setFishList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching fish names:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filteredSuggestions = fishList
        .filter((fish) =>
          fish.formatted_name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 6);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: FishName) => {
    setQuery(suggestion.formatted_name);
    setSuggestions([]);
  };

  const handleSearch = async () => {
    const selectedFish = fishList.find(
      (fish) => fish.formatted_name.toLowerCase() === query.toLowerCase()
    );

    if (selectedFish) {
      try {
        const fishResponse = await axios.post(
          `${backEndURL}/api/fish/getFishByIdWithImages`,
          { id: selectedFish.id }
        );
        setSearchedFish(fishResponse.data);
        setIsSearchView(false);

        // Fetch related advertisements
        fetchAdvertisements(selectedFish.common_name, 1);
      } catch (error) {
        console.error("Error fetching fish data:", error);
      }
    } else {
      alert("Please select a valid fish from the suggestions.");
    }
  };

  const fetchAdvertisements = async (fishName: string, page: number) => {
    try {
      setIsLoadingMore(true);
      const adResponse = await axios.post(
        `${backEndURL}/api/advertisement/searchRelatedFishAdvertisements`,
        {
          fish_name: fishName,
          page: page,
          per_page: 6,
        }
      );
      setAdvertisements((prevAds) => [
        ...prevAds,
        ...adResponse.data.advertisements,
      ]);
      setAdMeta(adResponse.data.meta);
      setAdPage(page);
      setIsLoadingMore(false);
    } catch (error) {
      console.error("Error fetching advertisements:", error);
      setIsLoadingMore(false);
    }
  };

  const handleBackToSearch = () => {
    setIsSearchView(true);
    setSearchedFish(null);
    setQuery("");
    setAdvertisements([]);
    setAdMeta(null);
    setFile(null);
    setFishName(null);
  };

  const handleSeeMore = () => {
    if (searchedFish && adPage < (adMeta?.last_page || 1)) {
      fetchAdvertisements(searchedFish.common_name, adPage + 1);
    }
  };

  const formatValue = (key: string, value: string) => {
    if (key === "temperature") {
      return `${value} °C`;
    } else if (key === "max_standard_length") {
      return `${value} mm`;
    }
    return value;
  };

  if (isLoading) {
    return (
      <DefaultLayout>
        <div></div>
      </DefaultLayout>
    );
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (["image/jpeg", "image/png"].includes(droppedFile.type)) {
        setFile(droppedFile);
        uploadFile(droppedFile);
      }
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (["image/jpeg", "image/png"].includes(selectedFile.type)) {
        setFile(selectedFile);
        uploadFile(selectedFile);
      }
    }
  };

  const uploadFile = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${backEndURL}/api/ai/identifyFish`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.fish_data) {
        setSearchedFish(response.data.fish_data);
        setIsSearchView(false);
        setAdvertisements([]);
        setAdMeta(null);
        fetchAdvertisements(response.data.fish_data.common_name, 1);
        toast.success("Image identified successfully");
      } else {
        setFishName(response.data.fish_name);
        toast.warning("Fish doesn't exist in the database");
      }
    } catch (error) {
      console.error("Error identifying fish:", error);
      toast.error("Failed to identify fish");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setFile(null);
    setFishName(null);
  };

  return (
    <DefaultLayout>
      {isSearchView ? (
        <>
          <Typography
            variant="h1"
            color="blue-gray"
            className="mt-4 mb-10 text-center !text-4xl lg:!text-6xl"
          >
            Want to Know about a Fish?
          </Typography>
          <div className="flex flex-row items-center gap-5 justify-center mt-20">
            <div className="w-1/2 max-w-xl">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search here..."
                  className="!border-2 !border-black bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  value={query}
                  onChange={handleInputChange}
                  labelProps={{ className: "hidden" }}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                  }
                />
                {suggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.formatted_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <Button
              className="text-white w-fit flex items-center text-base px-6 ml-2"
              size="sm"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
          <div className="flex flex-row items-center justify-center">
            <div className="row mt-10 w-1/2 max-w-xl">
              <div className="col-span-full">
                {file && fishName ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Uploaded Fish"
                      className="mx-auto mt-4 max-w-xs"
                    />
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {fishName}
                    </p>
                    <Button onClick={handleBack} className="mt-4 px-4 py-2">
                      Back
                    </Button>
                  </div>
                ) : (
                  <div
                    className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900 px-6 py-10 ${
                      dragging ? "bg-gray-200" : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/jpeg, image/png"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, JPEG up to 10MB
                      </p>
                      {file && (
                        <p className="text-xs leading-5 text-gray-600 mt-2">
                          {file.name}
                        </p>
                      )}
                      {loading && (
                        <p className="text-sm leading-6 text-gray-600">
                          Loading...
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {searchedFish && (
            <>
              <Button
                className="flex items-center gap-3 mb-4"
                onClick={handleBackToSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-left-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
                Back to Search
              </Button>
              <Typography
                variant="h1"
                color="blue-gray"
                className="mt-4 mb-10 !text-base lg:!text-5xl"
              >
                Search Results for:{" "}
                <span className="text-green-500">
                  {searchedFish.common_name}
                </span>
              </Typography>
              <div className="flex flex-col md:flex-row items-start justify-center gap-16">
                <div className="w-full md:w-5/12">
                  <Card>
                    <img
                      src={`${backEndURL}${searchedFish.image}`}
                      alt={searchedFish.common_name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </Card>
                </div>
                <div className="w-full md:w-7/12">
                  <div className="container mx-auto p-4">
                    {Object.entries(searchedFish).map(([key, value]) => {
                      if (key !== "id" && key !== "image") {
                        return (
                          <div className="mb-6" key={key}>
                            <Typography
                              variant="h5"
                              color="gray"
                              className="mb-3"
                            >
                              {key
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </Typography>
                            <Typography variant="paragraph" color="gray">
                              {formatValue(key, value as string)}
                            </Typography>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>

              {/* Advertisements Section */}
              {advertisements.length > 0 && (
                <div className="mt-4 mb-16">
                  {" "}
                  {/* Add margin to bottom here */}
                  <Typography variant="h2" className="mb-2 text-center">
                    Related Advertisements
                  </Typography>
                  <Typography variant="lead" className="mb-14 text-center">
                    These are the advertisements related to the fish you
                    searched.
                  </Typography>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {advertisements.map((ad) => (
                      <AdCard
                        key={ad.id}
                        imageSrc={`${backEndURL}${ad.image_url}`}
                        title={ad.title}
                        description={ad.small_description}
                        rating={ad.avg_review}
                        price={ad.price.toString()}
                      />
                    ))}
                  </div>
                  {adMeta && adPage < adMeta.last_page && (
                    <div className="flex justify-center mt-8">
                      <Button onClick={handleSeeMore} disabled={isLoadingMore}>
                        {isLoadingMore ? "Loading..." : "See More"}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </DefaultLayout>
  );
}
