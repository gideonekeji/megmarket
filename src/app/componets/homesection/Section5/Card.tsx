"use client";

import featureicon from "../../../../../public/assets/Image/cardsection5iconfeacture.png";
import locationicon from "../../../../../public/assets/Image/locationicon.png";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

import Image from "next/image";
import { HomeSectionMainCardRes } from "@/app/types/Restypes";
import { useState } from "react";

const Card: React.FC<HomeSectionMainCardRes> = ({
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
    <div className="h-[26rem]  lg:h-[30rem] overflow-hidden  w-full relative rounded-xl flex flex-col   mb-2  shadow-md      ">
      {/* Image Section (60% height of parent) */}
      <div
        className="relative w-full h-[45%] sm:h-[45%] md:h-[50%] rounded-t-xl"
        style={{
          backgroundImage: `url(${mainimage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Top-left button */}
        <div className="absolute left-0 h-auto bg-[#226FE4] top-4 w-fit rounded-r-md px-2 py-1">
          <button className="text-white font-poppins">{category}</button>
        </div>

        {/* Top-right heart icon */}
        <div
          className="absolute  bg-[#FFFFFF3D] right-3 group top-4 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer transition-all ease-in-out duration-300 transform hover:scale-110"
          onClick={handleClick} // Add click event handler
        >
          {/* Conditionally render the heart icon based on isLiked */}
          {isLiked ? (
            <GoHeartFill className="w-6 h-6 text-[#FF2929]" />
          ) : (
            <GoHeart className="w-6 h-6 text-black  transition-colors duration-200" />
          )}
        </div>
      </div>

      {/* Content Section (40% height of parent) */}
      <div className="w-full h-[55%] sm:h-[50%] md:h-[55%] lg:h-[50%] xl:h-[55%]  flex justify-center items-center rounded-xl relative">
        {/* top right */}
        <div className="absolute right-4 h-auto bg-[#226FE4] top-[-1rem] w-fit px-2 py-1 rounded-lg flex justify-center items-center">
          <Image
            src={featureicon}
            alt="feature icon"
            className="object-contain w-4 h-4"
          />
          <button className="text-white font-poppins text-sm">
            {featured} 
          </button>
        </div>

        <div className="flex flex-col w-full  gap-3  ">
          <div className=" flex flex-col gap-3 md:px-6 px-4">
            {/* Avatar with detail */}
            <div className="flex items-center  gap-x-2">
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
              <h3 className="xl:text-[22px] text-xl font-semibold text-black font-poppins">
                {businessName}
              </h3>
            </div>

            {/* Ratings and Business Info */}
            <div className="flex items-center w-full  justify-between">
              <div className="flex items-center justify-center ">
                <MdOutlineStar className="  text-[#FFA41C]" />
                <MdOutlineStar className=" text-[#FFA41C]" />
                <MdOutlineStar className=" text-[#FFA41C]" />
                <MdOutlineStar className=" text-[#FFA41C]" />
                <IoIosStarHalf className=" text-[#FFA41C]" />
                <div>
                  <p className="text-[#5C5C5C] font-poppins text-[12px] xl:text-sm">
                    ({reviews})
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <p className="font-medium font-poppins text-[#636363] text-[12px] xl:text-sm line-clamp-1">
                  {yearsInBusiness}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-2">
              <div className="w-6 h-6">
                <Image
                  src={locationicon}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="text-[#636363] font-poppins font-normal text-sm">
                  {location}
                </p>
              </div>

            </div>

             {/* Button */}
          <div className=" border-2 border-light-button-base px-4 py-3 rounded-xl flex justify-center items-center group relative overflow-hidden cursor-pointer">
            <button className="text-[#226FE4] font-medium font-poppins group-hover:text-white z-10 relative">
              {priceRange}
            </button>
            <div className="absolute top-0 left-0 w-full h-full bg-[#226FE4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Card;
