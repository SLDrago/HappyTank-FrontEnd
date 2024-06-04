import React, { useEffect, useState } from "react";
import { Input, Select, Option, Button, Card } from "@material-tailwind/react";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/20/solid";

const categories = [
  "Everything",
  "Electronics",
  "Books",
  "Clothing",
  "Home",
  "Toys",
];
const locations = [
  "Any Place",
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
];

const useWindowSize = () => {
  const [size, setSize] = useState<[number, number]>([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};

interface FilterBarProps {
  onFilter: (filters: {
    searchTerm: string;
    category: string;
    priceRange: string;
    location: string;
  }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilter }) => {
  const [category, setCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [width] = useWindowSize();

  const isMobile = width <= 768;

  useEffect(() => {
    if (!isMobile) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [isMobile]);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handlePriceChange = (value: string) => {
    setPriceRange(value);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = () => {
    const filters = {
      searchTerm,
      category,
      priceRange,
      location,
    };
    onFilter(filters);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="p-4 bg-white shadow-md rounded-md mb-6 mt-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex w-full items-center gap-4">
          <Input
            type="text"
            size="md"
            placeholder="Search"
            label="Search"
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="w-full"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
          {isMobile && (
            <Button
              size="md"
              onClick={toggleExpanded}
              className="md:hidden flex items-center gap-2 justify-center rounded-full"
            >
              <FunnelIcon className="h-5 w-5" />
            </Button>
          )}
        </div>
        {isExpanded && (
          <div className="flex flex-col md:flex-row md:items-center gap-4 w-full mt-4 md:mt-0">
            <Select
              size="md"
              className="w-full"
              label="Category"
              value={category}
              onChange={(value) => handleCategoryChange(value || "")}
            >
              {categories.map((category) => (
                <Option value={category} key={category}>
                  {category}
                </Option>
              ))}
            </Select>
            <Select
              size="md"
              label="Price Range"
              value={priceRange}
              onChange={(val) => handlePriceChange(val || "")}
              className="w-full"
            >
              <Option value="No Range">No Range</Option>
              <Option value="0-50">Rs. 0 - Rs. 50</Option>
              <Option value="51-100">Rs. 51 - Rs. 100</Option>
              <Option value="101-500">Rs. 101 - Rs. 500</Option>
              <Option value="501-1000">Rs. 501 - Rs. 1000</Option>
              <Option value="1001+">Rs. 1001+</Option>
            </Select>
            <Select
              size="md"
              label="Location"
              value={location}
              onChange={(value) => handleLocationChange(value || "")}
              className="w-full"
            >
              {locations.map((location) => (
                <Option key={location} value={location}>
                  {location}
                </Option>
              ))}
            </Select>
            <Button
              size="md"
              onClick={handleFilter}
              className="w-full flex items-center gap-2 justify-center"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Filter</span>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FilterBar;
