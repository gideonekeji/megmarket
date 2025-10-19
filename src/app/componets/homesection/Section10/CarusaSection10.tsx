"use client";

import Slider from "react-slick";

// Make sure slick-carousel's CSS is loaded globally.
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardData from "./CardData";
import Cardsection10 from "./Cardsection10";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import { useRef } from "react";

function CarusaSection10() {
  const sliderRef = useRef(null);
  // Slick slider settings with breakpoints
  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200, // When the screen width is <= 1200px
        settings: {
          slidesToShow: 2, // Show 3 slides
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
        },
      },

      {
        breakpoint: 992, // When the screen width is <= 992px
        settings: {
          slidesToShow: 2, // Show 2 slides
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 600, // When the screen width is <= 600px
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
        },
      },
    ],
  };

  return (
    <div className="w-full flex items-center justify-center  flex-col xl:flex-row">
      {/* Previous Button */}
      <div className="flex justify-center items-center hidden xl:block">
        <RiArrowLeftWideFill
          size={30}
          className="cursor-pointer hover:text-[#226FE4]   text-[#226FE47D]"
          aria-label="Previous"
          onClick={() => sliderRef.current.slickPrev()} // Trigger previous slide on click
        />
      </div>

      <div className="w-full  ">
        {/* Slider component with ref */}
        <Slider {...settings} ref={sliderRef}>
          {/* Cards */}
          {CardData.map((card, index) => (
            <div key={index} className="px-2 ">
              <Cardsection10
                key={index}
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
      <div className="flex justify-center items-center hidden xl:block z-50  relative  2xl:right-[-0.2rem] text-[#226FE47D]">
        <RiArrowRightWideFill
          size={30}
          className="cursor-pointer hover:text-[#226FE4]"
          aria-label="Next"
          onClick={() => sliderRef.current.slickNext()} // Trigger next slide on click
        />
      </div>

      <div className=" w-full flex justify-center items-center gap-4">
        <div className="flex justify-center items-center  xl:hidden">
          <RiArrowLeftWideFill
            size={30}
            className="cursor-pointer hover:text-[#226FE4]   text-[#226FE47D]"
            aria-label="Previous"
            onClick={() => sliderRef.current.slickPrev()} // Trigger previous slide on click
          />
        </div>
        <div className="flex justify-center items-center  xl:hidden   relative  2xl:right-[-0.2rem] text-[#226FE47D]">
          <RiArrowRightWideFill
            size={30}
            className="cursor-pointer hover:text-[#226FE4]"
            aria-label="Next"
            onClick={() => sliderRef.current.slickNext()} // Trigger next slide on click
          />
        </div>
      </div>
    </div>
  );
}

export default CarusaSection10;
