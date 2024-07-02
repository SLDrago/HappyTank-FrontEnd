import React, { useEffect, useState } from "react";
import { Input, Select, Option, Button, Card } from "@material-tailwind/react";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/20/solid";
//import axios from "axios";

//const backEndUrl = import.meta.env.VITE_LARAVEL_APP_URL;

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
  onFilter: (
    filters: {
      searchTerm: string;
      category: string | null;
      minPrice: number | null;
      maxPrice: number | null;
      city: string | null;
    },
    categoryName: string
  ) => void;
  initialSearchTerm: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFilter,
  initialSearchTerm,
}) => {
  // const [categories, setCategories] = useState<{ id: number; name: string }[]>(
  //   []
  // );
  // const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [category, setCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [width] = useWindowSize();

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const isMobile = width <= 768;

  useEffect(() => {
    if (!isMobile) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [isMobile]);

  // useEffect(() => {
  //   // Fetch categories and cities from the backend
  //   axios
  //     .get(`${backEndUrl}/api/getCategories`)
  //     .then((response) => {
  //       setCategories(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching categories:", error);
  //     });

  //   axios
  //     .get(`${backEndUrl}/api/getAllCities`)
  //     .then((response) => {
  //       setCities(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching cities:", error);
  //     });
  // }, []);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handlePriceChange = (value: string) => {
    setPriceRange(value);
  };

  const handleCityChange = (value: string) => {
    setCity(value);
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = () => {
    let minPrice: number | null = null;
    let maxPrice: number | null = null;

    if (priceRange) {
      const priceParts = priceRange.split("-");
      if (priceParts.length === 2) {
        minPrice = parseFloat(priceParts[0]);
        maxPrice = parseFloat(priceParts[1]);
      } else if (priceRange.endsWith("+")) {
        minPrice = parseFloat(priceRange.slice(0, -1));
      }
    }

    const filters = {
      searchTerm,
      category,
      minPrice,
      maxPrice,
      city,
    };

    const selectedCategoryName = getCategoryName(category);
    onFilter(filters, selectedCategoryName);
  };

  const getCategoryName = (categoryId: string) => {
    const categoryMap: { [key: string]: string } = {
      "2": "Aquariums And Tanks",
      "9": "Breeding Supplies",
      "7": "Decorations And Substrate",
      "3": "Equipment",
      "1": "Fish",
      "5": "Foods",
      "8": "Maintenance Tools",
      "6": "Medicines And Supplements",
      "4": "Water Treatment Products",
    };
    return categoryMap[categoryId] || "All";
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
              <Option value="">No Filter</Option>
              <Option value="2">AquariumsAndTanks</Option>
              <Option value="9">BreedingSupplies</Option>
              <Option value="7">DecorationsAndSubstrate</Option>
              <Option value="3">Equipment</Option>
              <Option value="1">Fish</Option>
              <Option value="5">Foods</Option>
              <Option value="8">MaintenanceTools</Option>
              <Option value="6">MedicinesAndSupplements</Option>
              <Option value="4">WaterTreatmentProducts</Option>

              {/* {categories.map((category) => (
                <Option value={String(category.id)} key={category.id}>
                  {category.name}
                </Option>
              ))} */}
            </Select>
            <Select
              size="md"
              label="Price Range"
              value={priceRange}
              onChange={(val) => handlePriceChange(val || "")}
              className="w-full"
            >
              <Option value="">No Range</Option>
              <Option value="0-50">Rs. 0 - Rs. 50</Option>
              <Option value="51-100">Rs. 51 - Rs. 100</Option>
              <Option value="101-500">Rs. 101 - Rs. 500</Option>
              <Option value="501-1000">Rs. 501 - Rs. 1000</Option>
              <Option value="1001+">Rs. 1001+</Option>
            </Select>
            <Select
              size="md"
              label="City"
              value={city}
              onChange={(value) => handleCityChange(String(value))}
              className="w-full"
            >
              <Option value="">No Filter</Option>
              <Option value="1">Colombo</Option>
              <Option value="2">Mount Lavinia</Option>
              <Option value="3">Kesbewa</Option>
              <Option value="4">Maharagama</Option>
              <Option value="5">Moratuwa</Option>
              <Option value="6">Ratnapura</Option>
              <Option value="7">Negombo</Option>
              <Option value="8">Kandy</Option>
              <Option value="9">Sri Jayewardenepura Kotte</Option>
              <Option value="10">Kalmunai</Option>
              <Option value="11">Trincomalee</Option>
              <Option value="12">Galle</Option>
              <Option value="13">Jaffna</Option>
              <Option value="14">Athurugiriya</Option>
              <Option value="15">Weligama</Option>
              <Option value="16">Matara</Option>
              <Option value="17">Kolonnawa</Option>
              <Option value="18">Gampaha</Option>
              <Option value="19">Puttalam</Option>
              <Option value="20">Badulla</Option>
              <Option value="21">Kalutara</Option>
              <Option value="22">Bentota</Option>
              <Option value="23">Mannar</Option>
              <Option value="24">Kurunegala</Option>

              {/* {cities.map((city) => (
              <Option key={city.id} value={city.id.toString()}>
                {city.name}
              </Option>
              ))} */}
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
