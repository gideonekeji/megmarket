"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { useAppSelector } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { useDispatch } from "react-redux";
import { VendorInfo } from "@/app/storeApp/api/message/VendorInfo";
import Image from "next/image";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import locationicon from "../../../../../public/assets/Image/location.png";
import call from "../../../../../public/assets/Image/call1.png";
import crossicon from "../../../../../public/assets/Image/crossicon.png";
import { useEffect, useState } from "react";

export default function VendorInfoModal() {
  const modalData = useAppSelector((state) => state.modals.VendorInfoModal);
  const dispatch = useDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const [vendorId, setVendorId] = useState<string | null>(null);

  // keep vendorId in sync with sessionStorage
  useEffect(() => {
    const storedId = sessionStorage.getItem("selecteduserid");
    setVendorId(storedId);

    const handleStorageChange = () => {
      setVendorId(sessionStorage.getItem("selecteduserid"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const { data: vendorDetails, isLoading } = VendorInfo(vendorId);

  const rating = parseFloat(vendorDetails?.Vendordetails.average_rating || "0");

  const handleModalClose = () => {
    dispatch(hideModal("VendorInfoModal"));
  };

  return (
    <Dialog open={modalData} onClose={handleModalClose}>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-6">
          <DialogPanel className="w-full max-w-[30rem] rounded-xl relative dark:bg-dark-background bg-white shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out">

            {/* Header */}
            <div
              className={`flex w-full  p-3 items-center justify-between font-poppins rounded-b-lg ${
                isDarkMode ? "bg-[#FFFFFF0A]" : "modalbordercolor"
              }`}
            >
              <h3 className="font-poppins text-lg dark:text-dark-darkcolor font-medium text-center w-full">
                View Profile
              </h3>
              <div
                className="cursor-pointer"
                onClick={handleModalClose}
                aria-label="Close modal"
              >
                <Image
                  src={crossicon}
                  className={`h-8 w-8 ${isDarkMode ? "invert" : ""}`}
                  alt="Close icon"
                />
              </div>
            </div>

            {/* Vendor Info Section */}
            {isLoading ? (
              <div className="p-6 text-center">Loading...</div>
            ) : (
              vendorDetails && (
                <div className="flex w-full items-center gap-4 p-4 ml-4">
                  {/* Vendor Image */}
                  <div className="w-[6rem] h-[5rem] rounded-full overflow-hidden flex justify-center items-center border">
                    <Image
                      src={
                        vendorDetails?.Vendordetails.image ||
                        "/path/to/default/image.png"
                      }
                      alt="vendor"
                      className="w-full h-full object-cover"
                      width={80}
                      height={80}
                    />
                  </div>

                  {/* Vendor Details */}
                  <div className="flex flex-col justify-center w-full gap-3">
                    {/* Name */}
                    <h3 className="text-xl font-semibold font-poppins dark:text-dark-darkcolor text-black">
                      {vendorDetails?.Vendordetails.first_name}{" "}
                      <span>{vendorDetails?.Vendordetails.last_name}</span>
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(Math.floor(rating))].map((_, index) => (
                        <MdOutlineStar
                          key={`full-${index}`}
                          className="text-[#FFA41C] text-lg"
                        />
                      ))}
                      {rating % 1 !== 0 && (
                        <IoIosStarHalf className="text-[#FFA41C] text-lg" />
                      )}
                      {[...Array(5 - Math.ceil(rating))].map((_, index) => (
                        <MdOutlineStar
                          key={`empty-${index}`}
                          className="text-[#D1D1D1] text-lg"
                        />
                      ))}
                      <span className="ml-2 text-sm font-poppins dark:text-dark-darkcolor text-gray-700">
                        ({vendorDetails?.Vendordetails.total_reviews} Review
                        {vendorDetails?.Vendordetails.total_reviews > 1
                          ? "s"
                          : ""}
                        )
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex gap-2 items-center">
                      <div className="h-[2rem] w-[2rem] rounded-full bg-slate-200 flex justify-center items-center">
                        <Image
                          src={locationicon}
                          alt="Location Icon"
                          className="w-[50%] h-[50%] object-contain"
                        />
                      </div>
                      <span className="text-sm font-poppins dark:text-dark-darkcolor line-clamp-2 text-gray-800">
                        {vendorDetails?.Vendordetails.address ||
                          "Address not available"}
                      </span>
                    </div>

                    {/* Phone */}
                    {vendorDetails?.Vendordetails.mobile && (
                      <div className="flex items-center gap-2">
                        <div className="h-[2rem] w-[2rem] rounded-full bg-slate-200 flex justify-center items-center">
                          <Image
                            src={call}
                            alt="Phone Icon"
                            className="w-[50%] h-[50%] object-contain"
                          />
                        </div>
                        <span className="text-sm font-poppins dark:text-dark-darkcolor text-gray-800">
                          {vendorDetails?.Vendordetails.mobile}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
