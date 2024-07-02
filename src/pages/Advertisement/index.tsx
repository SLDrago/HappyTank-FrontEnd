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
      imageSrc:
        "https://images.unsplash.com/photo-1586947726958-3d329e3a5d7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z29sZGZpc2h8ZW58MHx8MHx8fDA%3D",
      imageAlt: "Fish",
      link: "",
      title: "Ornamental Fish",
      category: "Fish",
    },
    {
      imageSrc:
        "https://sa1s3optim.patientpop.com/assets/images/provider/photos/2494334.png",
      imageAlt: "Fish Tanks",
      link: "",
      title: "Fish Tanks",
      category: "Tanks",
    },
    {
      imageSrc:
        "https://i5.walmartimages.com/seo/Mascarry-300-Gallon-Adjustable-Silent-Air-Pump-for-Large-Aquarium-Fish-Tank_010f53c4-fe61-45e3-af24-e7ccfa419e1a.c4749756ee02e4d86a8249919706ed2d.jpeg",
      imageAlt: "Air pumps",
      link: "",
      title: "Air pumps",
      category: "Equipments",
    },
    {
      imageSrc:
        "https://cdn.shopify.com/s/files/1/0311/3149/files/small_xtremecommunitycrave_guppycommunitytank.webp?v=1676315792",
      imageAlt: "Fish Foods",
      link: "",
      title: "Fish Foods",
      category: "Food",
    },
    {
      imageSrc:
        "https://rukminim2.flixcart.com/image/850/1000/jwqpocw0/aquarium-plant-anchor/c/m/3/artificial-plants-for-aquarium-fish-tank-decorations-venus-aqua-original-imafhcychguuc9nb.jpeg?q=20&crop=false",
      imageAlt: "Artificial Plants",
      link: "",
      title: "Artificial Plants",
      category: "Decoration",
    },
    {
      imageSrc:
        "https://fishfixsrilanka.lk/wp-content/uploads/2021/09/maxresdefaultfxgcxg.jpg",
      imageAlt: "Fish Treatments",
      link: "",
      title: "Fish Treatments",
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
