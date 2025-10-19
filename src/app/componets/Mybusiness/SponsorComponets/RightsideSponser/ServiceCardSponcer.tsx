"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import locationicon from "../../../../../../public/assets/Image/locationicon.png";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { decodeString, encodeString } from "@/app/utils/enocodeAndDecode";
import { TailSpin } from "react-loader-spinner";

const ServiceCardSponcer: React.FC = () => {
  const service_id = Cookies.get("service_id");
  const router = useRouter();

  const { data, error, isLoading, refetch } = useServiceDetailApi(service_id);

  useEffect(() => {
    if (service_id) refetch();
  }, [service_id, refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <TailSpin color="#226FE4" height={40} width={40} />
      </div>
    );
  }

  if (error || !data?.serviceDetail) {
    return <p className="text-center text-red-500">Error loading service details.</p>;
  }

  const service = data.serviceDetail;
  const vendor = data.vendorDetails || {};
  const ratingValue = parseFloat(service.totalAvgReview || "0");
  const reviewCount = service.totalReviewCount || 0;
  const vendorImage = vendor.image || "";
  const vendorInitial = vendor.first_name?.[0]?.toUpperCase() || "?";

  const handleCardClick = () => {
    if (!service.id || !service.service_name) return;
    const encodedServiceId = encodeString(String(service.id));
    const serviceSlug = service.service_name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/stores/${serviceSlug}/${encodedServiceId}`);
    sessionStorage.setItem("serviceId", decodeString(encodedServiceId));
  };

  return (
    <div
      className="w-full h-auto rounded-lg  dark:bg-[#B4B4B414] border p-3 bordercolordailybudget flex flex-row gap-2 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Left - Image */}
      <div className="w-[50%] md:w-[35%] h-auto relative rounded-lg overflow-hidden">
        <Image
          src={service.service_images?.[0] || "/assets/Image/default-placeholder.png"}
          alt={service.service_name || "Service Image"}
          fill
          className="object-cover"
        />
        {/* Category Badge */}
        {service.category_name && (
          <div className="absolute left-0 top-4 bg-light-button-base rounded-r-md px-2 py-1">
            <span className="text-white text-sm">{service.category_name}</span>
          </div>
        )}
      </div>

      {/* Right - Content */}
      <div className="w-full md:w-[70%] flex flex-col gap-2 p-2 relative">
        {/* Sponsored Tag */}
        {service.is_featured === 0 && (
          <div className="absolute top-0 right-0 bg-[#FF2525] font-poppins text-white text-xs px-2 py-1  rounded-md">
            Sponsored
          </div>
        )}

        {/* Vendor Info */}
        <div className="flex items-center gap-x-2">
          {vendorImage ? (
            <div
              className="w-8 h-8 md:w-10 md:h-10 bg-cover bg-center rounded-full"
              style={{ backgroundImage: `url(${vendorImage})` }}
            ></div>
          ) : (
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#226FE45C] text-white flex items-center justify-center rounded-full font-bold">
              {vendorInitial}
            </div>
          )}
          <h5 className="text-[#636363] font-poppins text-sm   2xl:text-T8 font-medium">
            {vendor.first_name} {vendor.last_name}
          </h5>
        </div>

        {/* Service Name */}
        <h5 className="text-[#000000] font-poppins  dark:text-dark-darkcolor   text-lg font-medium">
          {service.service_name}
        </h5>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(Math.floor(ratingValue))].map((_, index) => (
            <MdOutlineStar key={`full-${index}`} className="text-[#FFA41C]" />
          ))}
          {ratingValue % 1 !== 0 && <IoIosStarHalf className="text-[#FFA41C]" />}
          {[...Array(5 - Math.ceil(ratingValue))].map((_, index) => (
            <MdOutlineStar key={`empty-${index}`} className="text-[#D1D1D1]" />
          ))}
          <p className="text-[#5C5C5C] font-poppins text-[10px] sm:text-sm ml-1">
            ({reviewCount} Review{reviewCount !== 1 && "s"})
          </p>
        </div>

        {/* Address */}
        <div className="flex gap-1 items-center">
          <Image src={locationicon} alt="location" className="w-4 h-4" />
          <p className="text-[#636363] font-poppins text-[12px] md:text-sm line-clamp-1">
            {service.address}
          </p>
        </div>

        {/* Price */}
        <div className="w-full mt-1">
          <div className="w-full border-2 border-light-button-base px-2 md:px-8 py-2 md:py-3 rounded-xl flex justify-center items-center group relative overflow-hidden">
            <span className="text-light-button-base font-medium font-poppins group-hover:text-white z-10 relative text-sm md:text-[16px]">
              {service.price_range && service.price_range !== "$0"
                ? `From ${service.price_range}`
                : "0"}
            </span>
            <div className="absolute top-0 left-0 w-full h-full bg-light-button-base transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSponcer;
