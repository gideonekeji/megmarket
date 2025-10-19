"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import priceicon from "../../../../../public/assets/Image/priceicon.png";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setPriceListing } from "@/app/storeApp/Slice/Listing/PriceSliceListing";
import { useGetPrice } from "@/app/storeApp/api/useGetPrice";
import useTranslation from "@/app/hooks/useTranslation";

const PriceListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const price = useAppSelector((state) => state.PriceSliceListing.price);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { data, refetch } = useGetPrice();

  useEffect(() => {
    refetch();
  }, [refetch]); // Avoid unnecessary re-renders

  // Extract currency symbol dynamically
  const extractCurrencySymbol = (value: string | undefined): string => {
    return value ? value.replace(/[\d,.]/g, "").trim() || "¥" : "¥";
  };

  const currencySymbol = extractCurrencySymbol(data?.min_price || "$");

  sessionStorage.setItem("currencySymbol", currencySymbol);

  // Ensure minPrice and maxPrice are numbers
  const minPrice = data?.min_price ? Number(data.min_price.replace(/[^\d]/g, "")) : 0;
  const maxPrice = data?.max_price ? Number(data.max_price.replace(/[^\d]/g, "")) : 1000;

  // Handle price change
  const updatePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(event.target.value);
    dispatch(setPriceListing(newPrice));
  };

    const { getTranslation } = useTranslation();

  return (
    <div className="flex flex-col w-full h-auto">
      {/* Header */}
      <div className="w-full flex items-center gap-3">
        <Image
          src={priceicon}
          alt="Price Icon"
          className={`h-[1.3rem] w-[1.3rem] object-cover ${
            isDarkMode ? "bg-circle-icon" : ""
          }`}
        />
        <h5
          className={`font-poppins  text-T8  ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
         {getTranslation("Pricing Filter", "Pricing Filter")}
        </h5>
      </div>

      {/* Price Range Input */}
      <div
        className={`rounded-lg mt-5 w-full ${
          isDarkMode ? "bg-transparent" : "bg-white"
        }`}
      >
        <input
          type="range"
          id="price-range"
          className="w-full accent-[#226FE4] cursor-pointer"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updatePrice}
        />

        <div className="flex justify-between">
          <span
            className={`font-poppins ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            {currencySymbol}{minPrice}
          </span>
          <span className="text-[#226FE4] font-poppins">
            {currencySymbol}{price}
          </span>
          <span
            className={`font-poppins ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            {currencySymbol}{maxPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceListing;
