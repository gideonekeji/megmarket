'use client'

import React, { useState } from 'react'
import image from "../../../../../public/assets/Image/listimage.png"
import Image from 'next/image'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import featureicon from "../../../../../public/assets/Image/cardsection5iconfeacture.png";
import locationicon from "../../../../../public/assets/Image/locationicon.png";
import avatar from "../../../../../public/assets/Image/avatarsection5.png"
import { MdOutlineStar } from 'react-icons/md'
import { IoIosStarHalf } from 'react-icons/io'
import "../style.css"

function Cardlist() {
    const [isLiked, setIsLiked] = useState(false);
    const handleClick = () => {
        setIsLiked((prevState) => !prevState);
    };

    return (
        <div className='w-full h-auto  rounded-lg border-color flex flex-row  gap-2 md:gap-6'>
            {/* Image Section */}
            <div className=' w-[50%]   md:w-[30%]  md:h-[15rem] sm:h-auto relative'>
                <Image
                    src={image}
                    alt="List Image"
                    className='w-full h-full object-cover rounded-lg'
                />
                <div className="absolute left-0 top-4 w-fit bg-[#226FE4] rounded-r-md px-1 md:px-2 pb-1">
                    <button className="text-white font-poppins text-[12px] md:text-sm">Hospital</button>
                </div>

                <div
                    className="absolute top-1 right-[-0.6rem] md:right-3 group w-12 h-12 rounded-full flex justify-center items-center cursor-pointer transition-all ease-in-out duration-300 transform hover:scale-110"
                    onClick={handleClick}
                >
                    {/* Conditionally render the heart icon based on isLiked */}
                    {isLiked ? (
                        <GoHeartFill className="md:w-6 md:h-6 w-5 h-5 text-[#FF2929]" />
                    ) : (
                        <GoHeart className="md:w-6 md:h-6 w-5  h-5 text-black transition-colors duration-200" />
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-[70%] h-full flex justify-center items-center flex-col py-3 md:py-0 sm:rounded-xl relative ">
                {/* Top right "Featured" */}
                <div className="absolute right-1 md:right-5 top-[-0.6rem] md:top-4 w-fit bg-[#226FE4] px-2 py-1 rounded-lg flex items-center gap-1">
                    <Image
                        src={featureicon}
                        alt="feature icon"
                        className="object-contain w-4 h-4"
                    />
                    <button className="text-white font-poppins  text-[12px]  md:text-sm">
                        Featured
                    </button>
                </div>

                <div className="flex flex-col w-full gap-1 md:gap-3 sm:px-6 px-1">
                    {/* Avatar with details */}
                    <div className="flex items-center gap-x-2">
                        <div
                            className="md:w-10 md:h-10 w-7 h-7 bg-cover bg-center rounded-full"
                            style={{
                                backgroundImage: `url(${avatar.src})`,
                            }}
                        ></div>
                        <div>
                            <h5 className="text-[#636363] font-poppins text-sm md:text-lg font-medium">
                                Desirae Bator
                            </h5>
                        </div>
                    </div>

                    {/* Heading */}
                    <div>
                        <h3 className="md:text-xl text-sm  font-semibold text-black font-poppins">
                            St. George s Hospital
                        </h3>
                    </div>

                    {/* Ratings and Business Info */}
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1 ">
                            <MdOutlineStar className="text-[#FFA41C]" />
                            <MdOutlineStar className="text-[#FFA41C]" />
                            <MdOutlineStar className="text-[#FFA41C]" />
                            <MdOutlineStar className="text-[#FFA41C]" />
                            <IoIosStarHalf className="text-[#FFA41C]" />
                            <div>
                                <p className="text-[#5C5C5C] font-poppins text-[10px] sm:text-sm line-clamp-1">
                                    (202 Review)
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-[#636363] font-poppins text-[10px] sm:text-sm line-clamp-1">
                                5 Years in Business
                            </p>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex gap-2">
                        <div className="md:w-6 md:h-6 w-4 h-4" >
                            <Image
                                src={locationicon}
                                alt="location"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div>
                            <p className="text-[#636363] font-poppins text-[12px] md:text-sm line-clamp-1">
                                36 Paramount Drive, Raynham MA 2767
                            </p>
                        </div>
                    </div>

                   
                </div>

                 {/* Button */}
                 <div className=' w-full justify-start items-start flex  pt-2 md:pt-4 md:pl-7 pl-1'>
                 <div className="w-fit border-2 border-light-button-base px-2 md:px-8 py-2 md:py-3 rounded-xl flex justify-center items-center group relative overflow-hidden cursor-pointer">
                        <button className="text-[#226FE4] font-medium font-poppins group-hover:text-white z-10 relative  text-sm md:text-[16px]">
                            From $252-$565 12
                        </button>
                        <div className="absolute top-0 left-0 w-full h-full bg-[#226FE4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                 </div>
                    
            </div>
        </div>
    );
}

export default Cardlist;
