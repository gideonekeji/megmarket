"use client";

import Slider from "react-slick";

// Make sure slick-carousel's CSS is loaded globally.
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";

const servicesData = [
  { image: "/assets/Image/servicesimagebg.png", title: "Restaurants" },
  { image: "/assets/Image/servicesimagebg2.png", title: "Hotels" },
  { image: "/assets/Image/servicesimagebg3.png", title: "Education" },
  { image: "/assets/Image/servicesimagebg4.png", title: "Hospitals" },
];

function Resizable() {
  // Slick slider settings
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" h-auto w-full ">
      {" "}
      {/* Ensure full width */}
      <Slider {...settings}>
        {servicesData.map((service, index) => (
          <div key={index} className="px-2 ">
            <Card key={index} image={service.image} title={service.title} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Resizable;
