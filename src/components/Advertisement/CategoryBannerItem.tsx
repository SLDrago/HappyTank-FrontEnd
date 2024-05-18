import React from "react";

interface CategoryBannerItemProps {
  imageSrc: string;
  imageAlt: string;
  link: string;
  title: string;
  category: string;
}

const CategoryBannerItem: React.FC<CategoryBannerItemProps> = ({
  imageSrc,
  imageAlt,
  link,
  title,
  category,
}) => {
  return (
    <div className="category-banner-item relative overflow-hidden group h-full rounded-lg">
      <div className="product-img h-full">
        <a href={link} className="h-full block">
          <img
            className="w-full h-full object-cover transition-all duration-[400ms] group-hover:scale-[1.05]"
            src={imageSrc}
            alt={imageAlt}
          />
        </a>
      </div>
      <div className="product-content absolute inset-0 flex justify-center items-center text-center">
        <div className="bg-black bg-opacity-50 w-full h-full p-4 rounded-md lg:pt-6">
          <h3 className="group-hover:text-[#999999] text-white text-lg lg:text-[22px] mb-2 font-bold">
            <a
              className="transition-all hover:text-yellow-700 text-base lg:text-[18px]"
              href={link}
            >
              {title}
            </a>
          </h3>
          <span className="capitalize font-medium leading-[23px] group-hover:text-yellow-700 text-base lg:text-[15px] text-white">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryBannerItem;
