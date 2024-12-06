"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/default_layout";
import CategoryBanner from "../../components/Advertisement/CategoryBanner";
import Breadcrumb from "../../components/Advertisement/BreadCrumb";
import { Button, Typography } from "@material-tailwind/react";
import AdCard from "../../components/Advertisement/AdCard";
import SearchBox from "../../components/SearchBox/SearchBox";
import { NavLink, useNavigate } from "react-router-dom";
import { AdCardSkeltons } from "../../components/Advertisement/AdCardSkeltons";
import NoAdsFound from "../../components/Advertisement/NoAdsFound";
import axios from "axios";
import fishImg from "../../images/Categories/fish.avif";
import decoImg from "../../images/Categories/decoration.webp";
import foodImg from "../../images/Categories/food.webp";
import maintananceImg from "../../images/Categories/maintainance.webp";
import medicineImg from "../../images/Categories/medicine.jpg";
import tankImg from "../../images/Categories/tanks.png";

const backEndUrl = import.meta.env.VITE_LARAVEL_APP_URL;
interface Advertisement {
  id: number;
  title: string;
  small_description: string;
  price: string;
  rating: number;
  image_url: string | null;
}

const Advertisement = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const items = [
    {
      imageSrc: fishImg,
      imageAlt: "Fish",
      link: "/advertisements/products?category=1",
      title: "Ornamental Fish",
      category: "Fish",
    },
    {
      imageSrc: tankImg,
      imageAlt: "Fish Tanks",
      link: "/advertisements/products?category=2",
      title: "Aquariums and Tanks",
      category: "Tanks",
    },
    {
      imageSrc: maintananceImg,
      imageAlt: "Maintainance Tools",
      link: "/advertisements/products?category=8",
      title: "Maintainance Tools",
      category: "Maintainance",
    },
    {
      imageSrc: foodImg,
      imageAlt: "Fish Foods",
      link: "/advertisements/products?category=5",
      title: "Fish Foods",
      category: "Foods",
    },
    {
      imageSrc: decoImg,
      imageAlt: "Artificial Plants",
      link: "/advertisements/products?category=7",
      title: "Decoration and Substrate",
      category: "Decoration",
    },
    {
      imageSrc: medicineImg,
      imageAlt: "Fish Treatments",
      link: "/advertisements/products?category=6",
      title: "Medicines and Supplements",
      category: "Medicine",
    },
  ];

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.post(
          `${backEndUrl}/api/advertisement/getTopRatedAdvertisements`
        );
        setAds(response.data.top_rated_advertisements);
      } catch (error) {
        console.error("Failed to fetch advertisements:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisements();
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/advertisements/products?search=${query}`);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col lg:flex-row justify-between p-4 gap-4 lg:gap-0">
        <Breadcrumb />
        <SearchBox onSearch={handleSearch} />
      </div>
      <CategoryBanner items={items} />
      <Typography
        as="h1"
        className="font-bold text-center mt-10 mb-16 text-5xl"
      >
        Best of the Best
      </Typography>
      {loading ? (
        <AdCardSkeltons />
      ) : error || ads.length === 0 ? (
        <NoAdsFound />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {ads.map((ad) => (
            <AdCard
              key={ad.id}
              imageSrc={`${backEndUrl}${ad.image_url}`} // provide a default image url in case image_url is null
              title={ad.title}
              description={ad.small_description}
              price={ad.price}
              rating={ad.rating}
              link={`/advertisements/products/${ad.title}?id=${ad.id}`}
            />
          ))}
        </div>
      )}
      {!error && !loading && ads.length > 0 && (
        <NavLink to="/advertisements/products">
          <Button className="mx-auto mt-10 flex content-center" size="lg">
            See More
          </Button>
        </NavLink>
      )}
    </DefaultLayout>
  );
};

export default Advertisement;
