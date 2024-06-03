import { Typography, Input, Button, Card } from "@material-tailwind/react";
import DefaultLayout from "../../layout/default_layout";
import FileUpload from "../../components/FileUpload/FileUpload";
import AdCard from "../../components/Advertisement/AdCard";
import { useState, useEffect } from "react";
import axios from "axios";

interface GoldfishData {
  label: string;
  value: string;
}

export default function Search() {
  const searched = 0; //1 for searched, 0 for not searched
  const fishName = "Gold Fish";

  const goldfishData: GoldfishData[] = [
    { label: "Common Name", value: "Goldfish" },
    { label: "Scientific Name", value: "Carassius Auratus" },
    { label: "Aquarium Size", value: "15 - 30 litres" },
    {
      label: "Habitat",
      value:
        "Goldfish often dig the gravel so choose strong plants, moreover they use to eat plants too and only the anubias seem to be not tasty for them.",
    },
    { label: "Max Standard Length", value: "220mm" },
    { label: "Temperature", value: "18°C – 24°C" },
    { label: "PH", value: "6 - 7" },
    { label: "Diet", value: "Omnivorous" },
    { label: "Behavior/Compatibility", value: "Peaceful" },
    {
      label: "Sexual Dimorphisms",
      value:
        "Males tend to have longer, thinner, more streamlined body shapes than females of the same age and species. Look for a concave vent. A male goldfish’s vent is usually narrow and elongated, making it somewhat ovular in shape.",
    },
    {
      label: "Reproduction",
      value:
        "A young and healthy adult female can spawn from 500 to 1000 eggs. In case you are breeding them inside the aquarium it is better to remove the eggs, otherwise adults would eat them; while if you are breeding them in the pond you can also leave there the eggs, the most would be eaten, anyway fry have a lot of hiding places, and small food already present in the pond water. If you have to feed fry in the aquarium use liquid foods, infusoria and brine shrimps. From the age of three weeks they can eat adult food.",
    },
    {
      label: "Notes",
      value:
        "Goldfish are strong fish anyway they suffer specially of swimming bladder problems and water pollution. As mentioned above, the swimming bladder of goldfish is really delicate and can get damaged by fermented food, infections and hits. If the fish swims slower than usual or in a strange position (a bit turned on a side) leave it without food for a day, because overfeeding is the first cause; if things do not go better maybe the problem is permanent, but is not a serious trouble if the fish can still eat and move. Goldfish suffer water pollution because they need really oxygenated water, when oxygen level is low fish usually breath faster and look stressed; do some water changes, add an oxygenator for some days and solve the cause of water pollution (overfeeding, not working filter, overpopulation, poor oxygenation).",
    },
  ];

  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>([]);

  // const fetchFishNames = async () => {
  //   try {
  //     const response = await axios.get("/api/fishNames");
  //     setWords(response.data);
  //   } catch (error) {
  //     console.error("Error fetching fish names:", error);
  //   }
  // };

  const fishNames = [
    "Salmon",
    "Trout",
    "Bass",
    "Tuna",
    "Carp",
    "Catfish",
    "Herring",
    "Mackerel",
    "Pike",
    "Snapper",
    "Sardine",
    "Perch",
    "Grouper",
    "Flounder",
    "Haddock",
    "Anchovy",
    "Swordfish",
    "Marlin",
    "Barracuda",
    "Tilapia",
  ];

  useEffect(() => {
    setWords(fishNames);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filteredSuggestions = words
        .filter((word) => word.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 6);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string): void => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Search initiated for:", query);
  };

  return (
    <DefaultLayout>
      {searched === 1 ? (
        <>
          <Typography
            variant="h1"
            color="blue-gray"
            className="mt-4 mb-10 !text-base lg:!text-5xl"
          >
            Search Results for:{" "}
            <span className="text-green-500">{fishName}</span>
          </Typography>
          <div className="flex flex-col md:flex-row items-start justify-center gap-16">
            <div className="w-full md:w-5/12">
              <Card>
                <img
                  src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGZpc2h8ZW58MHx8MHx8fDA%3D"
                  alt="Fish"
                  className="w-full h-full object-cover rounded-lg"
                />
              </Card>
            </div>
            <div className="w-full md:w-7/12">
              <div className="container mx-auto p-4">
                {goldfishData.map((item, index) => (
                  <div className="mb-6" key={index}>
                    <Typography variant="h5" color="gray" className="mb-3">
                      {item.label}
                    </Typography>
                    <Typography variant="paragraph" color="gray">
                      {item.value}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mx-auto text-center mb-16 mt-10">
            <Typography variant="h1" className="my-4 text-5xl">
              Want to take this fish Home?
            </Typography>
            <Typography className="!font-normal text-gray-500 mx-auto max-w-2xl">
              Here are few suggested places that you can purchase this fish
            </Typography>
          </div>
          <div className="mx-auto container">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
              <AdCard
                imageSrc="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGZpc2h8ZW58MHx8MHx8fDA%3D"
                title="Gold Fish"
                description="Little Goldfish for Your Home - This small goldfish is the perfect pet! It’s easy to take care of and loves to swim around. With its bright color, it’s fun to watch and makes a great friend. It’s happy in a small bowl or tank and doesn’t need much space. Bring this little fish home and enjoy watching it every day!"
                rating={4.5}
                price="20.00"
              />
              <AdCard
                imageSrc="https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZGZpc2h8ZW58MHx8MHx8fDA%3D"
                title="Fighters"
                description="Bold Fighter Fish: A Tiny Warrior for Your Tank - Meet our fighter fish, a small but mighty pet that’s full of life. With its bright colors and flowing fins, it’s a real eye-catcher. This little warrior is easy to care for and doesn’t need much room. It’s perfect for fish lovers who want a pet with spirit. Bring this fighter fish home and watch it bravely explore its new world!"
                rating={4.6}
              />
              <AdCard
                imageSrc="https://images.unsplash.com/photo-1628006020983-5f032bedb369?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdvbGRmaXNofGVufDB8fDB8fHww"
                title="Black Goldfish"
                description="Black Goldfish: A Rare Beauty for Your Tank - This black goldfish is a rare beauty that will add a touch of elegance to your tank. With its sleek black scales and bright eyes, it’s a stunning fish that’s sure to impress. It’s easy to care for and loves to swim around, making it a joy to watch. Bring this black goldfish home and enjoy its beauty every day!"
                rating={5.0}
              />
            </div>
          </div>
          <Button className="mx-auto mt-10 flex ontent-center" size="lg">
            See More
          </Button>
        </>
      ) : (
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
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
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
              <FileUpload />
            </div>
          </div>
        </>
      )}
    </DefaultLayout>
  );
}
