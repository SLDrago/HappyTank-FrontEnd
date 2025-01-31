import React, { useState, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import DefaultLayout from "../../layout/default_layout";
import FilterBar from "../../components/Advertisement/FilterBar";
import { Button } from "@material-tailwind/react";
import AdCard from "../../components/Advertisement/AdCard";
import Breadcrumb from "../../components/Advertisement/BreadCrumb";
import axios from "axios";
import AdCardSkeltons from "../../components/Advertisement/AdCardSkeltons";
import NoAdsFound from "../../components/Advertisement/NoAdsFound";
import DiscountBanner from "../../images/DiscountBanner/DiscountBanner.png";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [advertisements, setAdvertisements] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    // Initial fetch when component mounts or searchTerm or category changes
    fetchAdvertisements({
      searchTerm: initialSearchTerm,
      category: initialCategory,
    });
  }, [initialSearchTerm, initialCategory]);

  const fetchAdvertisements = (filters?: {
    searchTerm?: string;
    category?: string;
    minPrice?: number | null;
    maxPrice?: number | null;
    city?: string;
  }) => {
    setIsLoading(true);
    setAdvertisements([]); // Clear previous ads before loading new ones

    axios
      .post(`${backEndURL}/api/advertisement/filterAdvertisements`, {
        search: filters?.searchTerm || "",
        category: filters?.category || "",
        min_price: filters?.minPrice || null,
        max_price: filters?.maxPrice || null,
        city: filters?.city || "",
        page: currentPage,
        per_page: 6,
      })
      .then((response) => {
        setAdvertisements(response.data.advertisements);
        setTotalPages(response.data.meta?.last_page || 1);
        setCurrentPage(1);
        setIsLoading(false);
        setInitialLoad(false); // Set initialLoad to false after the first fetch
      })
      .catch((error) => {
        console.error("Error fetching advertisements:", error);
        setIsLoading(false);
      });
  };

  const handleFilter = (
    filters: {
      searchTerm: string;
      category: string;
      minPrice: number | null;
      maxPrice: number | null;
      city: string;
    },
    categoryName: string
  ) => {
    setCategoryName(categoryName); // Set the category name
    fetchAdvertisements(filters);
  };

  const handleSeeMore = () => {
    const nextPage = currentPage + 1;
    setIsLoading(true);

    axios
      .post(`${backEndURL}/api/advertisement/filterAdvertisements`, {
        search: searchTerm,
        category: initialCategory,
        min_price: null,
        max_price: null,
        city: "",
        page: nextPage,
        per_page: 6,
      })
      .then((response) => {
        setAdvertisements([...advertisements, ...response.data.advertisements]);
        setCurrentPage(nextPage);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching advertisements:", error);
        setIsLoading(false);
      });
  };

  return (
    <DefaultLayout>
      <Breadcrumb />
      <FilterBar
        onFilter={handleFilter}
        initialSearchTerm={searchTerm}
        initialCategory={initialCategory}
      />
      <NavLink to="/advertisements/discount-products">
        <div className="w-full h-auto">
          <img
            className="h-56 w-full rounded-lg object-cover object-center mb-10"
            src={DiscountBanner}
            alt="discount-banner"
          />
        </div>
      </NavLink>
      {isLoading && <AdCardSkeltons />}
      {!isLoading && advertisements.length === 0 && (
        <div className="mt-32">
          <NoAdsFound />
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {advertisements.map((ad) => (
          <AdCard
            key={ad.id}
            imageSrc={backEndURL + ad.image_url}
            title={ad.title}
            description={ad.small_description}
            rating={ad.avg_review}
            price={ad.price}
            discount={ad.discount}
            link={`/advertisements/products/${ad.title}?id=${ad.id}`}
          />
        ))}
      </div>

      {totalPages > currentPage && (
        <Button
          onClick={handleSeeMore}
          className="mx-auto mt-10 flex content-center"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "See More"}
        </Button>
      )}
    </DefaultLayout>
  );
};

export default Products;
