"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import homeSectionMainCardData from "./data";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import { useRef } from "react";
import "./style.css"; // Ensure the custom styles are imported

function CausalSection5() {
  const sliderRef = useRef<Slider | null>(null);

  // Slider settings with breakpoints and custom margin for card gap
  const settings = {
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true, // Enables centering the active slide (optional, can be removed if not desired)
    centerPadding: "0", // Adjusts padding on the center slide (adjust as needed)
    className: "rounded-lg",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
        },
      },
    ],
  };

  return (
    <div
      className="w-full flex items-center justify-center rounded-lg flex-col xl:flex-row "
      style={{ boxShadow: "none", border: "none" }}
    >
      {/* Previous Button */}
      <div className="flex justify-center items-center hidden xl:block">
        <RiArrowLeftWideFill
          size={30}
          className="cursor-pointer hover:text-[#226FE4] text-[#226FE47D]"
          aria-label="Previous"
          onClick={() => sliderRef.current && sliderRef.current.slickPrev()}
        />
      </div>

      <div className="w-full rounded-lg">
        {/* Slider component with ref */}
        <Slider {...settings} ref={sliderRef}>
          {homeSectionMainCardData.map((card, index) => (
            <div key={index} className="px-2 ">
              {" "}
              <Card
                mainimage={card.mainimage}
                category={card.category}
                avatar={card.avatar}
                name={card.name}
                businessName={card.businessName}
                reviews={card.reviews}
                yearsInBusiness={card.yearsInBusiness}
                location={card.location}
                priceRange={card.priceRange}
                featured={card.featured}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Next Button */}
      <div className="flex justify-center items-center hidden xl:block z-50 relative 2xl:right-[-0.3rem] text-[#226FE47D] ">
        <RiArrowRightWideFill
          size={30}
          className="cursor-pointer hover:text-[#226FE4]"
          aria-label="Next"
          onClick={() => sliderRef.current && sliderRef.current.slickNext()}
        />
      </div>

      {/* Mobile version of arrows */}
      <div className="flex w-full justify-center items-center xl:hidden mt-4">
        <div className="flex justify-center items-center xl:hidden">
          <RiArrowLeftWideFill
            size={30}
            className="cursor-pointer hover:text-[#226FE4] text-[#226FE47D]"
            aria-label="Previous"
            onClick={() => sliderRef.current && sliderRef.current.slickPrev()} 
          />
        
        </div>
        <div className="flex justify-center items-center xl:hidden relative 2xl:right-[-0.3rem] text-[#226FE47D]">
          <RiArrowRightWideFill
            size={30}
            className="cursor-pointer hover:text-[#226FE4]"
            aria-label="Next"
            onClick={() => sliderRef.current && sliderRef.current.slickNext()}
          />
        </div>
      </div>
    </div>
  );
}

export default CausalSection5;
