"use client";

import featureicon from "../../../../../public/assets/Image/cardsection5iconfeacture.png";
import locationicon from "../../../../../public/assets/Image/locationicon.png";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { GoHeart, GoHeartFill } from "react-icons/go";

import Image from "next/image";
import { HomeSectionMainCardRes } from "@/app/types/Restypes";
import { useState } from "react";

const Cardsection10: React.FC<HomeSectionMainCardRes> = ({
  mainimage,
  category,
  avatar,
  name,
  businessName,
  reviews,
  yearsInBusiness,
  location,
  priceRange,
  featured,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const handleClick = () => {
    setIsLiked((prevState) => !prevState);
  };
  return (
    <div className="h-[26rem] 2xl:h-[30rem] w-full relative rounded-xl flex flex-col  mb-2    shadow-md cursor-pointer">
      {/* Image Section (60% height of parent) */}
      <div
        className="relative w-full h-[50%] rounded-t-xl"
        style={{
          backgroundImage: `url(${mainimage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Top-left button */}
        <div className="absolute left-0 h-auto bg-[#226FE4] top-4 w-fit rounded-r-md px-2 py-1 hidden">
          <button className="text-white font-poppins">{category}</button>
        </div>

        {/* Top-right heart icon */}
        <div
          className="absolute bg-[#FFFFFF3D] right-3 group top-4 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer transition-all ease-in-out duration-300 transform hover:scale-110"
          onClick={handleClick} // Add click event handler
        >
          {/* Conditionally render the heart icon based on isLiked */}
          {isLiked ? (
            <GoHeartFill className="w-6 h-6 text-[#FF2929]" />
          ) : (
            <GoHeart className="w-6 h-6 text-black transition-colors duration-200" />
          )}
        </div>
      </div>

      {/* Content Section (40% height of parent) */}
      <div className="w-full h-[55%] sm:h-[50%] md:h-[55%] lg:h-[50%] xl:h-[55%] shadowsection5card flex justify-center items-center rounded-xl relative">
        {/* top right */}
        <div className="absolute right-4 h-auto bg-[#226FE4] top-[-1rem] w-fit px-2 py-1 rounded-lg flex justify-center items-center">
          <Image
            src={featureicon}
            alt="feature icon"
            className="object-contain w-4 h-4"
          />
          <button className="text-white font-poppins text-sm">{featured}</button>
        </div>

        <div className="flex flex-col w-full gap-2  px-4 xl:px-6">
          {/* Avatar with detail */}
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10"
              style={{
                backgroundImage: `url(${avatar})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "50%",
              }}
            ></div>

            <div>
              <h5 className="text-[#636363] font-poppins text-lg font-medium">
                {name}
              </h5>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h3 className="xl:text-xl text-lg font-semibold text-black font-poppins line-clamp-2">
              {businessName}
            </h3>
          </div>

          {/* Location */}
          <div className="flex gap-2">
            <div>
              <p className="text-[#636363 text-sm font-poppins font-normal line-clamp-3 text-[#636363]">
                {location}
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="">
            <a
              href="#"
              className="text-[#226FE4] font-poppins font-medium md:text-lg underline"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardsection10;
