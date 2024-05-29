import React, { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Zoom,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const images = [
  "https://upload.wikimedia.org/wikipedia/commons/b/b9/%E3%83%AF%E3%82%AD%E3%83%B320120701.JPG",
  "https://www.tfhmagazine.com/-/media/Project/OneWeb/TFH/US/articles/227_goldfish_myths_debunked.jpg",
  "https://i.guim.co.uk/img/media/fe264ca51a9eb4fa8bb2b602e42ac678441c04c5/0_24_3931_2359/master/3931.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=e758ec768986f6fa2fe27bf8a741029c",
  "https://images.theconversation.com/files/122082/original/image-20160511-18144-13dx16w.jpg?ixlib=rb-4.1.0&rect=5%2C347%2C1911%2C928&q=45&auto=format&w=1356&h=668&fit=crop",
];

const ProductImage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiper = useSwiper();
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, Zoom]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          controller={{ control: swiper }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full rounded-lg"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Slide ${index}`}
                className="object-cover w-full h-full"
                style={{ aspectRatio: "1 / 1" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl text-gray-600">
          <AiOutlineLeft />
        </div>
        <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl text-gray-600">
          <AiOutlineRight />
        </div>
      </div>
      <div className="flex mt-4 space-x-2 justify-center">
        {images.map((src, index) => (
          <button
            key={index}
            className={`w-12 h-12 overflow-hidden rounded border ${
              activeIndex === index ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => {
              setActiveIndex(index);
              swiper.slideTo(index);
            }}
          >
            <img
              src={src}
              alt={`Thumbnail ${index}`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
