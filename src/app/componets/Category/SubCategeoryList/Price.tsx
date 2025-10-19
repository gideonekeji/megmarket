"use client";

import Image from "next/image";
import React from "react";
import priceicon from "../../../../../public/assets/Image/priceicon.png";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setPrice } from "@/app/storeApp/Slice/category/priceSlice";

const Price: React.FC = () => {
  const dispatch = useAppDispatch();
  const price = useAppSelector((state) => state.price.price);

  const updatePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Dispatching the new price to Redux store
    dispatch(setPrice(Number(event.target.value)));
  };

  return (
    <div className="flex flex-col w-full h-auto">
      {/* heading */}
      <div className="w-full justify-start items-center gap-3 flex">
        <div>
          <Image
            src={priceicon}
            alt="priceicon"
            className="h-[1.3rem] w-[1.3rem] object-cover"
          />
        </div>

        <div>
          <h5 className="font-poppins text-black font-normal">
            Pricing Filter
          </h5>
        </div>
      </div>

      {/* price range input box */}
      <div className="bg-white rounded-lg mt-5 w-full">
        <div>
          <input
            type="range"
            id="price-range"
            className="w-full accent-[#226FE4] cursor-pointer"
            min="0"
            max="1000"
            value={price}
            onChange={updatePrice}
          />
        </div>
        <div className="flex justify-between text-gray-500">
          <span id="minPrice" className="font-poppins text-[#0000004F]">
            $100
          </span>
          <span id="maxPrice" className="text-[#226FE4] font-poppins">
            ${price}
          </span>
          <span id="maxPrice" className="font-poppins text-[#0000004F]">
            $1000
          </span>
        </div>
      </div>
    </div>
  );
};

export default Price;
