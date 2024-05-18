import React from "react";
import CategoryBannerItem from "./CategoryBannerItem";
import "../../css/CategoryBanner.css";

interface CategoryBannerProps {
  items: {
    imageSrc: string;
    imageAlt: string;
    link: string;
    title: string;
    category: string;
  }[];
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ items }) => {
  return (
    <div className="category-banner-area pt-[25px]">
      <div className="container">
        <div className="grid gap-[10px] grid-collage-layout">
          {items.map((item, index) => (
            <div key={index} className={`grid-item h-28`}>
              <CategoryBannerItem
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                link={item.link}
                title={item.title}
                category={item.category}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
