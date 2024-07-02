import DefaultLayout from "../../layout/default_layout";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button, Input, Typography } from "@material-tailwind/react";
import BackGround from "../../images/Backgrounds/fish-and-divers-on-blue-sea.svg";
import axios from "axios";

const defaultValues = {
  name1: "",
  name2: "",
  name3: "",
};

export function CompatibilityTool() {
  const [fishList, setFishList] = useState([]);
  const [showThirdInput, setShowThirdInput] = useState(false);
  const [suggestions, setSuggestions] = useState({
    name1: [],
    name2: [],
    name3: [],
  });
  const [selectedFish, setSelectedFish] = useState({
    name1: null,
    name2: null,
    name3: null,
  });
  const [query, setQuery] = useState({ name1: "", name2: "", name3: "" });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/getFishNames")
      .then((response) => {
        setFishList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching fish names:", error);
      });
  }, []);

  const handleInputChange = (e, inputName) => {
    const value = e.target.value;
    setQuery((prev) => ({ ...prev, [inputName]: value }));

    if (value) {
      const filteredSuggestions = fishList
        .filter((fish) =>
          fish.formatted_name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 6);
      setSuggestions((prev) => ({ ...prev, [inputName]: filteredSuggestions }));
    } else {
      setSuggestions((prev) => ({ ...prev, [inputName]: [] }));
    }
    setValue(inputName, value);
  };

  const handleSuggestionClick = (suggestion, inputName) => {
    setQuery((prev) => ({ ...prev, [inputName]: suggestion.formatted_name }));
    setSuggestions((prev) => ({ ...prev, [inputName]: [] }));
    setSelectedFish((prev) => ({ ...prev, [inputName]: suggestion.id }));
    setValue(inputName, suggestion.formatted_name);
  };

  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const [loading, setLoading] = useState(false);

  const toggleThirdInput = () => {
    setShowThirdInput((prev) => !prev);
    if (!showThirdInput) {
      setQuery((prev) => ({ ...prev, name3: "" }));
      setSelectedFish((prev) => ({ ...prev, name3: null }));
    }
  };

  const onSubmit = (data) => {
    const selectedFishData = {
      fish1: selectedFish.name1,
      fish2: selectedFish.name2,
      fish3: selectedFish.name3,
    };
    axios
      .post(
        "http://127.0.0.1:8000/api/selected-fish-compatibility",
        selectedFishData
      )
      .then((response) => {
        const responseData = response.data;
        navigate("/compatibility/compatibility-result", {
          state: { responseData },
        });
      })
      .catch((error) => {
        console.error("Error submitting fish compatibility:", error);
      });
  };

  const isSubmitDisabled = !selectedFish.name1 || !selectedFish.name2;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BackGround})` }}
    >
      <DefaultLayout>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <section
            className="py-16 px-8 flex flex-col items-center justify-center"
            style={{ minHeight: "calc(100vh - 11rem)" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
              <div className="col-span-1 lg:col-span-7 p-8 lg:p-12 align-middle">
                <Typography
                  variant="h1"
                  className="text-3xl lg:text-4xl text-left mb-3"
                >
                  Want to see how calm will your Aquarium Will be?
                </Typography>
                <Typography
                  variant="paragraph"
                  className="text-xl lg:text-2xl text-left"
                >
                  Select the favorite fishes you like...
                </Typography>
                <Typography
                  variant="small"
                  className="text-md lg:text-md text-left"
                >
                  Disclaimer: Don’t completely rely on this index.
                </Typography>
              </div>

              <div className="col-span-1 w-full lg:col-span-5 p-8 lg:p-12 bg-white shadow-lg rounded-lg flex flex-col justify-center border-2">
                <div className="flex justify-between align-middle">
                  <Typography variant={"h2"} className="text-2xl mb-4">
                    Check Fish Compatibility
                  </Typography>
                  <div
                    onClick={toggleThirdInput}
                    className="rounded-full cursor-pointer"
                  >
                    {!showThirdInput && (
                      <PlusCircleIcon className="h-8 w-8 text-blue-gray-900" />
                    )}
                    {showThirdInput && (
                      <MinusCircleIcon className="h-8 w-8 text-blue-gray-900" />
                    )}
                  </div>
                </div>

                <div className="relative mb-3">
                  <Input
                    label="First Fish"
                    type="text"
                    id="name1"
                    value={query.name1}
                    onChange={(e) => handleInputChange(e, "name1")}
                    className="mb-8"
                    autoComplete="off"
                    required={true}
                  />
                  {suggestions.name1.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg">
                      {suggestions.name1.map((suggestion, index) => (
                        <li
                          key={index}
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() =>
                            handleSuggestionClick(suggestion, "name1")
                          }
                        >
                          {suggestion.formatted_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="relative mb-3">
                  <Input
                    label="Second Fish"
                    type="text"
                    id="name2"
                    value={query.name2}
                    onChange={(e) => handleInputChange(e, "name2")}
                    className="mb-8"
                    autoComplete="off"
                    required={true}
                  />
                  {suggestions.name2.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg">
                      {suggestions.name2.map((suggestion, index) => (
                        <li
                          key={index}
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() =>
                            handleSuggestionClick(suggestion, "name2")
                          }
                        >
                          {suggestion.formatted_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {showThirdInput && (
                  <div className="relative mb-3">
                    <Input
                      label="Third Fish"
                      type="text"
                      id="name3"
                      value={query.name3}
                      onChange={(e) => handleInputChange(e, "name3")}
                      className="mb-8"
                      autoComplete="off"
                    />
                    {suggestions.name3.length > 0 && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg">
                        {suggestions.name3.map((suggestion, index) => (
                          <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() =>
                              handleSuggestionClick(suggestion, "name3")
                            }
                          >
                            {suggestion.formatted_name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                <div className="submit-ctx">
                  <Button
                    type="submit"
                    className="mt-3"
                    disabled={isSubmitDisabled}
                  >
                    {loading && (
                      <svg
                        aria-hidden="true"
                        className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300 mr-2"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67227 50 9.67227C27.4013 9.67227 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5538C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7235 75.2124 7.41288C69.5422 4.10237 63.2754 1.94025 56.7083 1.05113C51.766 0.367007 46.7353 0.446059 41.829 1.27873C39.3706 1.69443 37.8964 4.16848 38.5335 6.5939C39.1706 9.01932 41.6503 10.4816 44.1299 10.106C48.0402 9.48811 52.0163 9.52627 55.8843 10.2157C60.8966 11.0481 65.6484 13.0761 69.8743 16.175C74.1003 19.2739 77.7135 23.3767 80.4853 28.2307C82.881 32.2147 84.6395 36.5756 85.6934 41.151C86.2972 43.5771 89.5416 44.898 91.9676 43.9676Z"
                          fill="currentFill"
                        />
                      </svg>
                    )}
                    {loading
                      ? "Checking Compatibility..."
                      : "Check Compatibility"}
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </form>
      </DefaultLayout>
    </div>
  );
}

export default CompatibilityTool;
