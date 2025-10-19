"use client";

import React, { useEffect, useState } from "react";
import CardDesignBusiness from "./CardDesignBusiness";
import { useStoreListApi } from "@/app/storeApp/api/usestorelist";
import Cookies from "js-cookie";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useAppSelector } from "@/app/hooks/hooks";
import Image from "next/image";
import video from "../../../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";
import { useRouter } from "next/navigation";
import useTranslation from "@/app/hooks/useTranslation";

function CardlistService() {
  const service_id = Cookies.get("service_id");
  const route = useRouter();
  const { getTranslation } = useTranslation();

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);


  const isapicall = useAppSelector((state) => state.toggle.value)

  console.log("setTruesetTruesetTrue", isapicall)

  // Local state to manage API loading, error, fetched data, and pagination
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch store list via the custom API hook
  const { data, isLoading, refetch } = useStoreListApi(service_id);




  useEffect(() => {
    if (isapicall) {
      refetch()
    }
  }, [isapicall])

  console.log(" my store listgfdgfdgfdgf ", data);

  // Use effect to trigger the API call only once after the page loads
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (service_id) {
          await refetch(); // Call the API to fetch store list
        } else {
          throw new Error("Service ID is missing");
        }
      } catch (err) {
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Trigger fetch on component mount
  }, [service_id, refetch]);

  // Handle loading and error states
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <AvatarWithSpinner />
      </div>
    );
  }

  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  // Check if the store list is empty
  if (data?.StoreList?.length === 0) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center text-center">
        <div className="flex h-[8rem] w-[8rem] items-center justify-center">
          <Image src={video} alt="Loading animation" width={100} height={100} />
        </div>
        <h2
          className={`font-poppins font-medium  ${isDarkMode ? "text-white" : "text-black"
            }`}
        >
          No Service Found
        </h2>
      </div>
    );
  }

  // Calculate the index of the first and last store for the current page
  const indexOfLastStore = currentPage * itemsPerPage;
  const indexOfFirstStore = indexOfLastStore - itemsPerPage;

  //  with pagination
  // const currentStores = data?.ServiceList?.slice(
  //   indexOfFirstStore,
  //   indexOfLastStore
  // );

  const currentStores = data?.ServiceList

  // Pagination logic
  const totalPages = Math.ceil(data?.ServiceList?.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log(" my service name from store list values ", data?.service_name);

  const ServiceName = data?.service_name;

  return (
    <div className=" w-full flex flex-col    ">
      <div className="w-full grid md:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-6 h-auto">
        {currentStores?.map((store) => {
          // Get the first image and avatar (assuming there's one image and avatar per store)
          const mainImage = store.store_images[0]?.url || ""; // Fallback to an empty string if no image is found

          return (
            <CardDesignBusiness
              key={store.id}
              name={store.vendor_details.first_name + " " + store.vendor_details.last_name}
              store_name={store.store_name}
              store_description={store.store_description}
              priceRange={`$${store.price}`}
              mainImage={mainImage}
              avatar={store.vendor_details.image}
              store_id={store.id}
              service_name={ServiceName}
            />
          );
        })}
      </div>

      {/* Pagination Controls */}
      {/* {data?.ServiceList.length > 0 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-md mr-2 hover:bg-gray-300 disabled:opacity-50"
          >
            <FcPrevious />
          </button>
          <span
            className={`px-4 py-2 font-poppins ${isDarkMode ? "text-white" : "text-gray-800"
              }`}
          >
            {`Page ${currentPage} of ${totalPages}`}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-md ml-2 hover:bg-gray-300 disabled:opacity-50"
          >
            <FcNext />
          </button>
        </div>
      )} */}
    </div>
  );
}

export default CardlistService;
