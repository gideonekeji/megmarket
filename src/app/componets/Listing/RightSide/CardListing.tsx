"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import "../../Listing/style.css";
import Image from "next/image";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import { useFilterMutation } from "@/app/storeApp/api/filter";

// Static assets (can remain as normal imports)
import resetico from "../../../../../public/assets/Image/reseticon.png";
import cardlisticon from "../../../../../public/assets/Image/cardlist2.png";
import cardlisticon2 from "../../../../../public/assets/Image/cardlist3.png";
import video from "../../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";

// Redux slices
import {
  clearfilterSliceListing,
  updateFilterDataListing,
} from "@/app/storeApp/Slice/Listing/FilterListingSlice";
import { setSelectedCategoryListing } from "@/app/storeApp/Slice/Listing/CategoryLIstingSlice";
import { clearSearchLocationCategory } from "@/app/storeApp/Slice/category/SerachLocationSlice";
import { setselectedSubCategoryListing } from "@/app/storeApp/Slice/Listing/SubCategoryListing";
import { clearPriceListing } from "@/app/storeApp/Slice/Listing/PriceSliceListing";
import { clearRatingListing } from "@/app/storeApp/Slice/Listing/RatingSliceListing";
import { clearSearchQuery } from "@/app/storeApp/Slice/Listing/searchSlice";
import { decodeString, encodeString } from "@/app/utils/enocodeAndDecode";
import { clearSelectedSubCategory } from "@/app/storeApp/Slice/category/subcategorySlice";
import { resetSubCategory, setselectedSubCategory } from "@/app/storeApp/Slice/AddpostSelectedIDandvalues/SubCategorySelectedIdandValues";
import { resetLocation } from "@/app/storeApp/Slice/locationSearchHomeSlice";

// Icons
import { FcNext, FcPrevious } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";

// Hooks
import useTranslation from "@/app/hooks/useTranslation";
import AvatarWithSpinner from "../../Loading/AvatarWithSpinner";
import GridCard from "../../Category/SubCategeoryList/GridCard";
import ListCard from "../../Category/SubCategeoryList/ListCard";
import CurrentLocation from "../LeftSide/CurrentLocation";
import { sessionService } from "@/app/utils/sessionService.ts";


// Your existing CardListing component
function CardListing() {
  const [viewType, setViewType] = useState("grid");
  const router = useRouter(); // Initialize useRouter
  const user_id = Cookies.get("user_id");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [loadingCategory, setLoadingCategory] = useState<number | null>(null);

  const FilterListingSlice = useAppSelector(
    (state) => state.FilterListingSlice
  );

  console.log("FilterListingSlice", FilterListingSlice);

  const searchQuery = useSelector(
    (state: { search: { query: string } }) => state.search.query
  );

  const categoeryListing = useAppSelector(
    (state) => state.categoryListing.selectedCategoryListing
  );

  const subcategory_id = useAppSelector(
    (state) => state.subcategory.selectedSubCategory
  );

  const selectedratingalues = useAppSelector(
    (state) => state.RatingSliceListing.selectedRating
  );

  const price = useAppSelector((state) => state.PriceSliceListing.price);

  const dispatch = useDispatch();
  const filterslice = useAppSelector((state) => state.FilterListingSlice);
  const [filter, { data, error, isLoading }] = useFilterMutation();

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  console.log(" my api responce data ", data);

  // Handle view type change
  const handleGridView = () => setViewType("grid");
  const handleListView = () => setViewType("list");
  const state = useAppSelector(
    (state) => state.locationSearchHome.selectedLocation
  );

  const { getTranslation } = useTranslation();


  useEffect(() => {
    dispatch(
      updateFilterDataListing({
        category_id: categoeryListing.id,
        subcategory_id: subcategory_id.id,
        state: state,
        review_star: selectedratingalues,
        price: price,
        service_name: searchQuery,
      })
    );
  }, [
    state,
    selectedratingalues,
    price,
    categoeryListing,
    subcategory_id,
    dispatch,
    searchQuery,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const filterData = {
        category_id: filterslice.category_id,
        price: price,
        review_star: filterslice.review_star,
        state: filterslice.state,
        subcategory_id: filterslice.subcategory_id,
        type: filterslice.type,
        user_id: user_id,
        service_name: filterslice.service_name, // Ensure this is included
        page_no: currentPage,      // ✅ Add page number
        per_page: itemsPerPage,
      };

      // Make sure to fetch only if there's data to send
      await filter(filterData);
    };

    fetchData();
  }, [filter, filterslice, price, user_id, searchQuery, currentPage]);



  useEffect(() => {
    if (data?.service_current_page) {
      setCurrentPage(data.service_current_page);
    }
  }, [data?.service_current_page]);

  const serviceFilter = data?.serviceFilter || [];

  const totalPages = data?.total_service_page || 1;

  const [location, setLocation] = useState(
    sessionService.getRecentLocation() || ""
  );

  useEffect(() => {
    const handleLocationUpdate = (event: CustomEvent<string>) => {
      setLocation(event.detail);
    };

    // Add event listener
    window.addEventListener("sessionLocationUpdated", handleLocationUpdate as EventListener);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("sessionLocationUpdated", handleLocationUpdate as EventListener);
    };
  }, []);

  console.log("location@!@!@MINYU" ,location)

  const SubCategoryDetail = useAppSelector(
    (state) => state.subcategory.selectedSubCategory
  );


  const selectedCategory = useAppSelector(
    (state) => state.categoryListing.selectedCategoryListing
  );


  // Handling the case when no data is found
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <AvatarWithSpinner />
      </div>
    );
  }
  const currentItems = serviceFilter;


  console.log("currentItemscurrentItems@@@", currentItems)



  const handleCardClick = (serviceId: string | number, serviceName: string) => {
    setLoadingCategory(serviceId);

    if (!serviceId || !serviceName) {
      console.error("Invalid serviceId or serviceName");
      return;
    }

    const encodedServiceId = encodeString(String(serviceId)); // Encode
    const serviceSlug = serviceName.toLowerCase().replace(/\s+/g, "-"); // Slugify
    const sluglocation = (location ?? "")
      .toLowerCase()
      .trim()
      .replace(/,/g, "")
      .replace(/\s+/g, "-");

    let categoryslug = (selectedCategory?.category_name ?? "")
      .toLowerCase()
      .trim()
      .replace(/,/g, "")
      .replace(/\s+/g, "-");


    //  sub cat

    let subcategoryslug = (SubCategoryDetail?.subcategory_name ?? "")
      .toLowerCase()
      .trim()
      .replace(/,/g, "")
      .replace(/\s+/g, "-");

    // ❌ skip "store" from being part of the route
    if (categoryslug === "store") {
      categoryslug = "";
    }

    // Build route parts dynamically (skip empty ones)
    const parts = [
      sluglocation || null,
      categoryslug || null,
      subcategoryslug || null,
      serviceSlug,
      encodedServiceId,
    ].filter(Boolean);

    // ✅ Always start from root
    const newPath = `/${parts.join("/")}`;

    router
      .push(newPath)
      .finally(() => setLoadingCategory(null));

    // Decode for storing
    const decodedServiceId = decodeString(encodedServiceId);
    sessionStorage.setItem("serviceId", decodedServiceId);
  };



  const type = localStorage.getItem("type");

  console.log("  my type values ", type);

  const handalreset = () => {
    dispatch(clearfilterSliceListing());
    dispatch(setSelectedCategoryListing({ id: null, category_name: "" }));
    dispatch(clearSearchLocationCategory());
    sessionStorage.removeItem("city");
    sessionStorage.removeItem("lat");
    sessionStorage.removeItem("lng");
    sessionStorage.removeItem("Category_Name");
    sessionStorage.removeItem("Category_ID");
    sessionStorage.removeItem("subcategories_id");
    sessionStorage.removeItem("subcategory_name");
    dispatch(setselectedSubCategoryListing({ id: null, subcategory_name: "" }));
    dispatch(clearPriceListing());
    dispatch(clearRatingListing());
    dispatch(clearSearchQuery());
    dispatch(clearSelectedSubCategory());
    dispatch(resetLocation())
  };



  const currencySymbol = sessionStorage.getItem("currencySymbol") || "¥";


  console.log("categoeryListingcategoeryListing", categoeryListing)


  return (
    <div className="w-full h-auto 2xl:pr-6  2xl:mt-1">



      <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center 2xl:mb-9 gap-y-4">
        {/* Selected values (scrollable on small screens) */}
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
          <div className="flex flex-nowrap gap-3 min-w-full">
            {state && (
              <div
                className="flex items-center gap-2 px-3 py-1    bg-light-background  dark:bg-dark-secondarybg  dark:border-none  dark:text-dark-darkcolor rounded-2xl border-2 border-light-button-base cursor-pointer whitespace-nowrap"
                onClick={() => dispatch(resetLocation())}
              >
                <button className="font-poppins font-normal text-sm">{state}</button>
                <RxCross2 className="text-black   dark:text-dark-darkcolor" />
              </div>
            )}

            {price > 0 && (
              <div
                className="flex items-center gap-2 px-3 py-1    bg-light-background  dark:bg-dark-secondarybg  dark:border-none  dark:text-dark-darkcolor rounded-2xl border-2 border-light-button-base cursor-pointer whitespace-nowrap"
                onClick={() => {
                  dispatch(clearPriceListing());
                  sessionStorage.removeItem("price");
                }}
              >
                <button className="font-poppins font-normal text-sm">{currencySymbol}0 to {currencySymbol}{price}</button>
                <RxCross2 className="text-black   dark:text-dark-darkcolor" />

              </div>
            )}

            {categoeryListing.id && (
              <div
                className="flex items-center gap-2 px-3 py-1    bg-light-background  dark:bg-dark-secondarybg  dark:border-none  dark:text-dark-darkcolor rounded-2xl border-2 border-light-button-base cursor-pointer whitespace-nowrap"
                onClick={() => {
                  dispatch(setSelectedCategoryListing({ id: null, category_name: "" }));
                  sessionStorage.removeItem("Category_Name");
                  sessionStorage.removeItem("Category_ID");
                }}
              >
                <button className="font-poppins font-normal text-sm">{categoeryListing.category_name}</button>
                <RxCross2 className="text-black   dark:text-dark-darkcolor" />

              </div>
            )}

            {subcategory_id?.subcategory_name && (
              <div
                className="flex items-center gap-2 px-3 py-1    bg-light-background  dark:bg-dark-secondarybg  dark:border-none  dark:text-dark-darkcolor rounded-2xl border-2 border-light-button-base cursor-pointer whitespace-nowrap"
                onClick={() => {
                  sessionStorage.removeItem("subcategory");
                  dispatch(setselectedSubCategory({ id: null, subcategory_name: "" }));
                  dispatch(setselectedSubCategoryListing({ id: null, subcategory_name: "" }));
                }}
              >
                <button className="font-poppins font-normal text-sm">{subcategory_id.subcategory_name}</button>
                <RxCross2 className="text-black   dark:text-dark-darkcolor" />

              </div>
            )}

            {selectedratingalues && (
              <div
                className="flex items-center gap-2 px-3 py-1    bg-light-background  dark:bg-dark-secondarybg  dark:border-none  dark:text-dark-darkcolor rounded-2xl border-2 border-light-button-base cursor-pointer whitespace-nowrap"
                onClick={() => dispatch(clearRatingListing())}
              >
                <button className="font-poppins font-normal text-sm">{selectedratingalues} star</button>
                <RxCross2 className="text-black   dark:text-dark-darkcolor" />

              </div>
            )}
          </div>
        </div>

        {/* View type & reset buttons */}
        <div className="w-full lg:w-auto flex justify-end items-center gap-3  ">
          <div
            className={`flex items-center gap-2 px-6 py-2 border-2 rounded-lg cursor-pointer flex-none dark:bg-dark-secondarybg  dark:border-none ${isDarkMode ? "text-white hover:bg-zinc-600" : "text-black hover:bg-slate-200 bordercard"}`}
          >
            <div className="w-[1rem] h-[1rem] flex justify-center items-center">
              <Image src={resetico} alt="Reset Filter" className={`h-full w-full object-cover ${isDarkMode ? "bg-circle-icon" : ""}`} />
            </div>
            <button className="font-poppins font-[500]" onClick={handalreset}>
              {getTranslation("Reset Filter", "Reset Filter")}
            </button>
          </div>

          {/* Grid View Button */}
          <div
            className={`flex items-center px-2 py-2 border-2 rounded-lg gap-2    dark:bg-dark-secondarybg dark:border-dark-secondarybg cursor-pointer flex-none ${viewType === "grid" ? "bg-slate-300" : ""} ${isDarkMode ? "text-white hover:bg-zinc-600" : "text-black hover:bg-slate-200 bordercard"}`}
            onClick={handleGridView}
          >
            <div className="w-[1rem] h-[1rem] flex justify-center items-center">
              <Image src={cardlisticon} alt="Grid View Icon" className={`h-full w-full object-cover ${isDarkMode ? "bg-circle-icon" : ""}`} />
            </div>
          </div>

          {/* List View Button */}
          <div
            className={`flex items-center px-2 py-2 border-2 rounded-lg gap-2 dark:bg-dark-secondarybg dark:border-dark-secondarybg  cursor-pointer flex-none ${viewType === "list" ? "bg-slate-300" : ""} ${isDarkMode ? "text-white hover:bg-zinc-600" : "text-black hover:bg-slate-200 bordercard"}`}
            onClick={handleListView}
          >
            <div className="w-[1rem] h-[1rem] flex justify-center items-center">
              <Image src={cardlisticon2} alt="List View Icon" className={`h-full w-full object-cover ${isDarkMode ? "bg-circle-icon" : ""}`} />
            </div>
          </div>
        </div>
      </div>

      {serviceFilter.length === 0 && isLoading ? (
        // 👉 Loading shimmer effect
        <div className={`w-full px-4 py-8 ${viewType === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-4" : "flex flex-col gap-6"}`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <ShimmerEffect key={i} viewType={viewType} />
          ))}
        </div>
      ) : serviceFilter.length === 0 ? (
        // 👉 No data fallback
        <div className="flex h-auto min-h-screen w-full flex-col items-center justify-center text-center">
          <div className="flex h-[8rem] w-[8rem] items-center justify-center">
            <Image
              src={video}
              alt="Loading animation"
              width={100}
              height={100}
            />
          </div>
          <h2
            className={`font-poppins font-medium ${isDarkMode ? "text-white" : "text-black"
              } text-center text-lg sm:text-xl`}
          >
            No Data Found
          </h2>
        </div>
      ) : (
        <div className="w-full h-auto  mt-8">
          {/*  Cards */}
          {viewType === "grid" ? (
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {currentItems.map((card, index) => (
                <GridCard
                  key={index}
                  service_images={{ src: card.cover_image }}
                  category={card.category_name}
                  avatar={card.image}
                  name={`${card.first_name} ${card.last_name || ""}`}
                  service_name={card.service_name}
                  reviews={card.total_review_count}
                  yearsInBusiness={card.published_year}
                  location={card.address}
                  priceRange={card.price_range}
                  featured={card.is_featured}
                  rating={card.average_review_star}
                  isLike={card.isLike}
                  service_id={card.id}
                  onclicknavigate={() =>
                    handleCardClick(card.id, card.service_name, card?.category_name, card?.country, card?.city)
                  }
                  isLoadingloader={loadingCategory === card.id}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-auto flex flex-col gap-6">
              {currentItems.map((card, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(card.id, card.service_name)}
                >
                  <ListCard
                    service_images={{ src: card.cover_image }}
                    category={card.category_name}
                    avatar={card.image}
                    name={`${card.first_name} ${card.last_name || ""}`}
                    service_name={card.service_name}
                    reviews={card.total_review_count}
                    yearsInBusiness={card.published_year}
                    location={card.address}
                    priceRange={card.price_range}
                    featured={card.is_featured ? "sponosor " : "Not Featured"}
                    rating={card.average_review_star}
                    isLike={card.isLike}
                    service_id={card.id}
                    isLoadingloader={loadingCategory === card.id}
                  />
                </div>
              ))}
            </div>
          )}

          {/* 👉 Pagination */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md mr-2 ${currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-200"
                }`}
            >
              <FcPrevious
                className={
                  currentPage === 1 ? "text-gray-400" : "text-[#226FE4]"
                }
              />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md mx-1 ${currentPage === index + 1
                  ? "bg-[#226FE4] text-white"
                  : "bg-gray-200"
                  }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ml-2 ${currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-200"
                }`}
            >
              <FcNext
                className={
                  currentPage === totalPages
                    ? "text-gray-400"
                    : "text-[#226FE4]"
                }
              />
            </button>
          </div>
        </div>
      )}


      <div className="hidden">
        <CurrentLocation />
      </div>
    </div>
  );
}

export default CardListing;
